"use client"

import Link from "next/link"
import { Users, CheckCircle, Clock, Globe, BarChart3, ArrowRight } from "lucide-react"

export function Solutions() {
  const products = [
    {
      id: "jobonix",
      title: "Jobonix",
      subtitle: "Job Portal",
      description:
        "A comprehensive job portal platform connecting employers with qualified candidates, streamlining the recruitment process.",
      about:
        "Jobonix is designed to bridge the gap between talent and opportunity, focusing on real-world skills and practical employment. Our platform helps businesses find the right people while giving job seekers a straightforward path to meaningful work.",
      features: [
        { icon: Users, text: "Smart job matching" },
        { icon: CheckCircle, text: "Skill-based filtering" },
        { icon: Clock, text: "Easy application tracking" },
        { icon: Globe, text: "Employer verification" },
      ],
      color: "from-blue-600 to-cyan-600",
      badgeBg: "bg-blue-500/10",
      badgeBorder: "border-blue-500/30",
      badgeText: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/5",
      iconText: "text-blue-600 dark:text-blue-400",
      hoverGradient: "from-blue-600/10 to-cyan-600/10",
      link: "https://jobonix.com",
    },
    {
      id: "loanery",
      title: "Loanery",
      subtitle: "Fintech",
      description:
        "An innovative fintech solution designed to simplify loan processing and connect borrowers with suitable lending options.",
      about:
        "Loanery makes financial solutions accessible to everyone, regardless of background. We provide transparent, ethical loan mediation services that help people overcome financial hurdles with dignity and confidence.",
      features: [
        { icon: CheckCircle, text: "Transparent terms" },
        { icon: BarChart3, text: "Multiple lender comparison" },
        { icon: Clock, text: "Quick pre-qualification" },
        { icon: Users, text: "Financial guidance" },
      ],
      color: "from-emerald-600 to-teal-600",
      badgeBg: "bg-emerald-500/10",
      badgeBorder: "border-emerald-500/30",
      badgeText: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-500/5",
      iconText: "text-emerald-600 dark:text-emerald-400",
      hoverGradient: "from-emerald-600/10 to-teal-600/10",
      link: "https://loanery.com",
    },
  ]

  return (
    <section id="our-products" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary">Flagship Products</p>
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground">Our Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Innovative platforms designed to bridge gaps and create opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${product.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between">
                {/* Header */}
                <div className="space-y-4 mb-8">
                  <div
                    className={`inline-flex px-4 py-2 rounded-full ${product.badgeBg} border ${product.badgeBorder}`}
                  >
                    <span className={`text-sm font-semibold ${product.badgeText}`}>{product.subtitle}</span>
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-bold text-foreground">{product.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
                </div>

                {/* About Section */}
                <div className="space-y-6 mb-8 pb-8 border-b border-border">
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-3">About {product.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{product.about}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-xl font-bold text-foreground">Key Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {product.features.map((feature, idx) => {
                      const Icon = feature.icon
                      return (
                        <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${product.iconBg}`}>
                          <Icon className={`w-5 h-5 ${product.iconText} flex-shrink-0`} />
                          <span className="text-sm font-medium text-foreground">{feature.text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={product.link}
                    target="_blank"
                    className={`px-6 py-3 rounded-full bg-gradient-to-r ${product.color} text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                    style={{
                      boxShadow: `0 10px 25px -5px rgba(59, 130, 246, 0.2)`,
                    }}
                  >
                    Visit Website
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="px-6 py-3 rounded-full border border-primary/20 text-foreground font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
