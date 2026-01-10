"use client"

import { CheckCircle2, Shield, Zap, Headphones, TrendingUp, Users, Layers } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Innovation-Driven Development",
      description: "Our platforms are developed using agile, iterative, and technology-first approaches, enabling rapid prototyping, continuous improvement, and intelligent automation.",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Secure & Scalable Architecture",
      description: "We implement bank-grade security, data privacy protocols, and cloud-based scalable systems to ensure platforms operate reliably under high volume and diverse use cases.",
      color: "text-purple-500",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Our solutions are engineered for speed, reliability, and efficiency, ensuring that digital platforms like KuCash and Jobonix deliver measurable operational impact.",
      color: "text-amber-500",
    },
    {
      icon: Users,
      title: "Technology Expertise",
      description: "Our team consists of experienced engineers and product specialists skilled in automation, AI, data analytics, and platform engineering, enabling innovative solutions at scale.",
      color: "text-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Proven Innovation Outcomes",
      description: "Through our platforms, we have improved process efficiency, expanded accessibility, and created measurable economic impact across fintech and HR-Tech sectors.",
      color: "text-emerald-500",
    },
    {
      icon: Layers,
      title: "Scalable & Impactful Platforms",
      description: "Our platforms are designed to scale efficiently across India, handling increasing users and transactions while maintaining performance, reliability, and measurable social and economic impact.",
      color: "text-rose-500",
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary">Why Choose Us</p>
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground">Why Choose Madhyavarti Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Partnering with Madhyavarti Solutions means working with a technology-driven, innovation-focused company that builds and scales digital platforms designed to solve real-world challenges.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="group p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className="space-y-4 flex-grow">
                  {/* Icon */}
                  <div className="inline-block p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-all">
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>

                {/* Accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
