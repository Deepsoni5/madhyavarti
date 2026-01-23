'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import cloudinary from '@/lib/cloudinary'

// --- Projects ---

export async function getProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  return data
}

export async function getProject(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }
  return data
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const owner_client = formData.get('owner_client') as string
  const partner = formData.get('partner') as string
  const department = formData.get('department') as string
  const status = formData.get('status') as string || 'Active'

  const { error } = await supabase.from('projects').insert({
    name,
    description,
    owner_client,
    partner,
    department,
    status,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/documents')
  return { success: true }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()

  // Note: Cascading delete in SQL should handle documents, 
  // but we also need to delete files from Cloudinary.
  // First, fetch documents to get public_ids
  const { data: documents } = await supabase
    .from('madhyavarti_documents')
    .select('public_id')
    .eq('project_id', id)

  if (documents && documents.length > 0) {
    const publicIds = documents.map(doc => doc.public_id)
    try {
      await cloudinary.api.delete_resources(publicIds)
    } catch (err) {
      console.error('Error deleting Cloudinary resources:', err)
      // Continue to delete from DB even if Cloudinary fails
    }
  }

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/documents')
  return { success: true }
}

// --- Documents ---

export async function getDocuments(projectId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('madhyavarti_documents')
    .select('*')
    .eq('project_id', projectId)
    .order('uploaded_at', { ascending: false })

  if (error) {
    console.error('Error fetching documents:', error)
    return []
  }
  return data
}

export async function uploadDocument(projectId: string, formData: FormData) {
  const supabase = await createClient()
  
  const file = formData.get('file') as File
  const title = formData.get('title') as string
  const document_type = formData.get('document_type') as string

  if (!file) return { error: 'No file provided' }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `madhyavarti/${projectId}`, // Organize in Cloudinary folders
          resource_type: 'auto' 
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    // Save to Supabase
    const { error } = await supabase.from('madhyavarti_documents').insert({
      project_id: projectId,
      title,
      document_type,
      public_id: result.public_id,
      file_url: result.secure_url,
      file_format: result.format,
      size: result.bytes
    })

    if (error) throw error

    revalidatePath(`/admin/documents/${projectId}`)
    return { success: true }
  } catch (error: any) {
    console.error('Upload error:', error)
    return { error: error.message || 'Upload failed' }
  }
}

export async function deleteDocument(id: string, public_id: string, projectId: string) {
  const supabase = await createClient()

  try {
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(public_id)
    
    // Delete from DB
    const { error } = await supabase
      .from('madhyavarti_documents')
      .delete()
      .eq('id', id)

    if (error) throw error

    revalidatePath(`/admin/documents/${projectId}`)
    return { success: true }

  } catch (error: any) {
    return { error: error.message }
  }
}

// --- Stats & Analytics ---

export async function getStats() {
  const supabase = await createClient()
  
  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    
  const { count: activeProjects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'Active')

  const { count: docCount } = await supabase
    .from('madhyavarti_documents')
    .select('*', { count: 'exact', head: true })

  // Analytics Stats
  // We fetch last 5000 visits to aggregate in memory for now.
  // Ideally this should be a DB RPC function for scalability.
  const { data: visits } = await supabase
    .from('site_visits')
    .select('visitor_id, page_path, created_at, user_agent, ip_address, country, city')
    .order('created_at', { ascending: false })
    .limit(5000)

  const totalVisits = visits?.length || 0
  
  // Unique Visitors
  const uniqueVisitors = new Set(visits?.map(v => v.visitor_id)).size

  // Top Pages
  const pageCounts: Record<string, number> = {}
  visits?.forEach(v => {
    pageCounts[v.page_path] = (pageCounts[v.page_path] || 0) + 1
  })
  
  const topPages = Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([path, count]) => ({ path, count }))

  // Top Countries
  const countryCounts: Record<string, number> = {}
  visits?.forEach(v => {
    const c = v.country && v.country !== 'Unknown' ? v.country : 'Other'
    countryCounts[c] = (countryCounts[c] || 0) + 1
  })

  const topCountries = Object.entries(countryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([country, count]) => ({ country, count }))

  return {
    projects: projectCount || 0,
    activeProjects: activeProjects || 0,
    documents: docCount || 0,
    totalVisits,
    uniqueVisitors,
    topPages,
    topCountries,
    recentVisits: visits?.slice(0, 5) || []
  }
}

export async function getRecentProjects() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  return data || []
}

export async function getRecentDocuments() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('madhyavarti_documents')
    .select('*, projects(name)')
    .order('uploaded_at', { ascending: false })
    .limit(5)
  return data || []
}
