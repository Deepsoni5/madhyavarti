'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';

// Dynamically import ESignEditor with SSR disabled to avoid pdfjs-dist server-side issues
const ESignEditor = dynamic(
    () => import('@/components/esign').then((mod) => ({ default: mod.ESignEditor })),
    {
        ssr: false,
        loading: () => (
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Loading E-Sign Editor...</p>
                </div>
            </div>
        ),
    }
);

export function ESignPage() {
    const router = useRouter();

    const handleComplete = (signedDocument: Blob, fileName: string) => {
        // Document has been downloaded
        console.log('Document signed and downloaded:', fileName);
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex flex-col pt-20 sm:pt-24">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
                    <ESignEditor
                        onComplete={handleComplete}
                        onCancel={handleCancel}
                    />
                </div>
            </main>
        </div>
    );
}
