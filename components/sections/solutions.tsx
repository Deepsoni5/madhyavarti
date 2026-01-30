"use client"

import Link from "next/link"
import { Users, CheckCircle, Clock, Globe, BarChart3, ArrowRight, Shield, TrendingUp, Building2, Briefcase, PenTool, UploadCloud, Share2, Download } from "lucide-react"

export function Solutions() {
  const products = [
    {
      id: "jobonix",
      title: "Jobonix",
      subtitle: "Job Portal",
      description:
        "An AI-powered recruitment platform that bridges the gap between talent and opportunity.",
      about:
        "Jobonix is an AI-powered recruitment platform that bridges the gap between talent and opportunity. It focuses on real-world skills and practical employment, enabling businesses to find the right candidates efficiently while giving job seekers a straightforward path to meaningful work.",
      features: [
        { icon: Users, text: "Smart Job Matching" },
        { icon: CheckCircle, text: "Skill-Based Filtering" },
        { icon: Clock, text: "Easy Application Tracking" },
        { icon: Globe, text: "Employer Verification" },
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
      id: "kucash",
      title: "KuCash",
      subtitle: "FinTech",
      description:
        "A technology-driven digital loan facilitation platform that enables users to apply for loans quickly through a paperless, automated process.",
      about:
        "KuCash is a technology-driven digital loan facilitation platform that enables users to apply for loans quickly through a paperless, automated process. The platform matches borrowers with suitable lenders using data-driven routing and real-time eligibility assessment, improving access to financial solutions across India.",
      features: [
        { icon: CheckCircle, text: "Automated Loan Matching" },
        { icon: Clock, text: "Paperless & Fast Processing" },
        { icon: Users, text: "Transparent Terms" },
        { icon: Shield, text: "Secure & Ethical Lending" },
      ],
      color: "from-emerald-600 to-teal-600",
      badgeBg: "bg-emerald-500/10",
      badgeBorder: "border-emerald-500/30",
      badgeText: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-500/5",
      iconText: "text-emerald-600 dark:text-emerald-400",
      hoverGradient: "from-emerald-600/10 to-teal-600/10",
      link: "https://kucash.in",
    },
    {
      id: "merzvia",
      title: "MerzVia",
      subtitle: "M&A Advisory",
      description:
        "A premier Mergers & Acquisitions firm building ambitious corporate legacies through strategic artistry.",
      about:
        "MerzVia is a premier Mergers & Acquisitions firm that serves as the architectural force behind the world's most ambitious corporate legacies. Specializing in high-stakes transactions and strategic advisory, we combine deep financial expertise with a refined sense of strategic artistry to unlock maximum enterprise value.",
      features: [
        { icon: TrendingUp, text: "High-Stakes Transactions" },
        { icon: Briefcase, text: "Strategic Advisory" },
        { icon: Building2, text: "Sector Expertise" },
        { icon: Shield, text: "Absolute Discretion" },
      ],
      color: "from-violet-600 to-indigo-600",
      badgeBg: "bg-violet-500/10",
      badgeBorder: "border-violet-500/30",
      badgeText: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-500/5",
      iconText: "text-violet-600 dark:text-violet-400",
      hoverGradient: "from-violet-600/10 to-indigo-600/10",
      link: "https://merzvia.com",
    },
    {
      id: "esignvia",
      title: "ESignVia",
      subtitle: "Digital Signatures",
      description:
        "Next-Gen Electronic Signatures. Sign documents smarter and faster.",
      about:
        "ESignVia provides the most intuitive way to upload, sign, and manage your documents. Built for speed, security, and the modern professional.",
      features: [
        { icon: PenTool, text: "Smart E-Signatures" },
        { icon: UploadCloud, text: "Easy Upload" },
        { icon: Share2, text: "Collaboration" },
        { icon: Download, text: "Instant Download" },
      ],
      color: "from-purple-600 to-pink-600",
      badgeBg: "bg-purple-500/10",
      badgeBorder: "border-purple-500/30",
      badgeText: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-500/5",
      iconText: "text-purple-600 dark:text-purple-400",
      hoverGradient: "from-purple-600/10 to-pink-600/10",
      link: "https://esignvia.com",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
