"use client"

import { Linkedin, Mail, ArrowRight } from "lucide-react"

export function Team() {
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
      bio: "15+ years in enterprise IT solutions",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      name: "Priya Sharma",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
      bio: "Expert in cloud architecture and DevOps",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      name: "Amit Patel",
      role: "Head of Solutions",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
      bio: "Specializes in digital transformation",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      name: "Neha Verma",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80",
      bio: "Full-stack development and innovation",
      color: "from-orange-500/20 to-red-500/20",
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary">Meet the Team</p>
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground">Our Leadership</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visionary leaders driving innovation and excellence in enterprise transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden bg-card border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Image with animated overlay */}
              <div className="relative overflow-hidden h-96 bg-gradient-to-br from-primary/5 to-accent/5">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${member.color} group-hover:opacity-40 opacity-20 transition-opacity duration-300`}
                ></div>
              </div>

              {/* Content with reveal animation */}
              <div className="p-6 space-y-4">
                {/* Name with slide effect */}
                <div className="space-y-2 overflow-hidden">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-primary">{member.role}</p>
                </div>

                {/* Bio with fade effect */}
                <p className="text-sm text-muted-foreground leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.bio}
                </p>

                {/* Social links with animated appearance */}
                <div className="flex gap-3 pt-4 border-t border-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300 group/btn"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300 group/btn"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                  </button>
                </div>
              </div>

              {/* Arrow indicator on hover */}
              <div className="absolute top-4 right-4 p-2 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
