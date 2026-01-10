"use client"

import { Code2, Smartphone, Zap, Cloud, BarChart3, Lightbulb } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: Code2,
      title: "Platform & Product Engineering",
      description:
        "Design and develop enterprise-grade digital platforms, enabling seamless scalability and robust performance for our products like KuCash and Jobonix.",
      gradient: "from-blue-500/20 to-blue-600/10",
      color: "text-blue-500",
    },
    {
      icon: Smartphone,
      title: "Web & Mobile Application Development",
      description: "Create responsive, user-centric applications optimized for engagement, efficiency, and platform-wide performance.",
      gradient: "from-purple-500/20 to-purple-600/10",
      color: "text-purple-500",
    },
    {
      icon: Lightbulb,
      title: "Digital Transformation Enablement",
      description: "Modernize workflows and business processes through automation, intelligent systems, and data-driven decision-making.",
      gradient: "from-amber-500/20 to-amber-600/10",
      color: "text-amber-500",
    },
    {
      icon: Cloud,
      title: "Cloud Architecture & Scalability",
      description: "Implement secure, scalable, cloud-based infrastructure to support high-volume operations and pan-India growth.",
      gradient: "from-cyan-500/20 to-cyan-600/10",
      color: "text-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Data Analytics & Insights",
      description: "Leverage analytics to drive smarter decisions, improve operational efficiency, and enhance platform performance.",
      gradient: "from-emerald-500/20 to-emerald-600/10",
      color: "text-emerald-500",
    },
    {
      icon: Zap,
      title: "Automation & Workflow Orchestration",
      description: "Integrate automated processes and digital workflows to reduce manual intervention, improve speed, and maintain compliance.",
      gradient: "from-rose-500/20 to-rose-600/10",
      color: "text-rose-500",
    },
  ]

  return (
    <section id="our-services" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary">Our Expertise</p>
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground">Our Technology Capabilities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Madhyavarti Solutions leverages cutting-edge technology and engineering expertise to develop and scale innovative digital platforms across FinTech and HR-Tech domains.
            <br className="hidden md:block" />
            <span className="mt-2 block text-lg">
              Our capabilities enable us to build scalable, automated, and data-driven systems that improve processes, enhance efficiency, and deliver measurable impact.
            </span>
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                ></div>

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="inline-block p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-300">
                    <Icon className={`w-6 h-6 ${service.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                  {/* Arrow indicator */}
                  <div className="pt-2 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
