"use client"

import { CheckCircle2, Shield, Zap, Headphones, TrendingUp, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Agile Development",
      description: "Flexible, iterative development approach ensuring rapid delivery and continuous optimization.",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with data protection, compliance certifications, and regular audits.",
      color: "text-purple-500",
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Lightning-fast solutions engineered for scalability and high-performance operations.",
      color: "text-amber-500",
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      description: "Round-the-clock support with dedicated specialists to keep your systems running.",
      color: "text-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Demonstrated track record of delivering measurable business growth and ROI.",
      color: "text-emerald-500",
    },
    {
      icon: Users,
      title: "Team Expertise",
      description: "Experienced professionals with industry certifications and deep domain knowledge.",
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
              <p className="text-sm font-semibold text-primary">Our Commitment</p>
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground">Why Choose Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Partnering with Madhyavarti Solutions means access to proven expertise, innovative solutions, and dedicated
            support.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="group p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
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
