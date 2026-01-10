"use client"

"use client"

import { Linkedin, Mail, Quote } from "lucide-react"
import { motion } from "framer-motion"

export function Team() {
  const leaders = [
    {
      name: "Balakrishna Cherukuri",
      role: "Founder",
      qualification: "M.Tech (IT) & MBA (HR)",
      image: "/pf2.jpeg",
      experience: "15+ Years Experience",
      bio: "Backed with 15+ years of hands-on entrepreneurial and Finance experience, he has built and operated multiple ventures across foodtech, HR tech, staffing, and technology-driven industries. Known for his clarity, sharp decision-making, and team-building abilities, he drives KuCash with a clear purpose — to create a transparent global ecosystem where trust becomes the core of lending.",
      color: "from-blue-600 to-cyan-600",
    },
    {
      name: "Kiran Biradar",
      role: "Co-Founder",
      qualification: "B.Sc (CS)",
      image: "/pf1.jpeg",
      experience: "5+ Years Experience in Finance",
      bio: "With over 5 years of solid experience in Finance, he brings a robust entrepreneurial and operational background spanning the fintech, fashion-tech, and manpower industries. He possesses an exceptional ability to understand borrower psychology and align large teams toward a common mission of financial inclusion. His practical experience in managing complex operations makes him an ideal counterpart to the founder, ensuring KuCash builds a scalable, people-first platform.",
      color: "from-emerald-600 to-teal-600",
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary">Our Leadership</p>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Meet Our Leadership</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The visionaries behind KuCash's mission to transform lending in India
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {leaders.map((leader, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              key={index}
              className="group relative rounded-3xl bg-card border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              {/* Top Gradient Bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${leader.color}`} />

              <div className="p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-start">

                {/* Image Section */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-2 border-primary/10 group-hover:border-primary/30 transition-colors">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Qualification tag on image */}
                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white shadow-sm">
                        {leader.qualification}
                      </span>
                    </div>
                  </div>

                  {/* Experience Badge under image on desktop, or beside on mobile */}
                  <div className="mt-4 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${leader.color} text-white shadow-md`}>
                      {leader.experience}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {leader.name}
                    </h3>
                    <p className={`text-lg font-medium bg-gradient-to-r ${leader.color} bg-clip-text text-transparent`}>
                      {leader.role}
                    </p>
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-3 w-8 h-8 text-primary/10 -z-10 transform -scale-x-100" />
                    <p className="text-muted-foreground leading-relaxed italic relative z-10 text-sm sm:text-base">
                      "{leader.bio}"
                    </p>
                  </div>

                  {/* Social/Contact placeholders - Optional */}
                  <div className="pt-6 flex gap-3 border-t border-border mt-auto">
                    <button className="p-2 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
