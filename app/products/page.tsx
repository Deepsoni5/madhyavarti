import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, CheckCircle, Globe, BarChart3, Users, Clock, TrendingUp, Building2, Briefcase, Shield, PenTool, UploadCloud, Share2, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Products | Madhyavarti Solutions",
  description:
    "Discover Jobonix and Loanery - innovative platforms connecting talent with opportunity and providing ethical financial solutions.",
  openGraph: {
    title: "Our Products | Madhyavarti Solutions",
    description: "Jobonix - Job Portal | Loanery - Fintech Solutions | MerzVia - M&A Advisory",
  },
}

export default function Products() {
  const jobonixFeatures = [
    { icon: Users, text: "Smart job matching" },
    { icon: CheckCircle, text: "Skill-based filtering" },
    { icon: Clock, text: "Easy application tracking" },
    { icon: Globe, text: "Employer verification" },
  ]

  const loaneryFeatures = [
    { icon: CheckCircle, text: "Transparent terms" },
    { icon: BarChart3, text: "Multiple lender comparison" },
    { icon: Clock, text: "Quick pre-qualification" },
    { icon: Users, text: "Financial guidance" },
  ]

  const merzviaFeatures = [
    { icon: TrendingUp, text: "Value optimization" },
    { icon: Briefcase, text: "Strategic advisory" },
    { icon: Building2, text: "Global sector reach" },
    { icon: Shield, text: "Absolute discretion" },
  ]

  const esignviaFeatures = [
    { icon: PenTool, text: "Smart E-Signatures" },
    { icon: UploadCloud, text: "Easy Upload" },
    { icon: Share2, text: "Collaboration" },
    { icon: Download, text: "Instant Download" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 mb-20">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Products</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovative platforms designed to bridge gaps and create opportunities
          </p>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Jobonix */}
          <div className="group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="space-y-4 mb-8">
                <div className="inline-flex px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Job Portal</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Jobonix</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  An AI-powered recruitment platform that bridges the gap between talent and opportunity.
                </p>
              </div>

              {/* About Section */}
              <div className="space-y-6 mb-8 pb-8 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">About Jobonix</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Jobonix is an AI-powered recruitment platform that bridges the gap between talent and opportunity. It focuses on real-world skills and practical employment, enabling businesses to find the right candidates efficiently while giving job seekers a straightforward path to meaningful work.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-foreground">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {jobonixFeatures.map((feature, idx) => {
                    const Icon = feature.icon
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{feature.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://jobonix.com"
                  target="_blank"
                  className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-600/30"
                >
                  Visit Website
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* KuCash */}
          <div className="group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="space-y-4 mb-8">
                <div className="inline-flex px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Fintech</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">KuCash</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A technology-driven digital loan facilitation platform that enables users to apply for loans quickly through a paperless, automated process.
                </p>
              </div>

              {/* About Section */}
              <div className="space-y-6 mb-8 pb-8 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">About KuCash</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    KuCash is a technology-driven digital loan facilitation platform that enables users to apply for loans quickly through a paperless, automated process. The platform matches borrowers with suitable lenders using data-driven routing and real-time eligibility assessment, improving access to financial solutions across India.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-foreground">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {loaneryFeatures.map((feature, idx) => {
                    const Icon = feature.icon
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/5">
                        <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{feature.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://kucash.in"
                  target="_blank"
                  className="px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-600/30"
                >
                  Visit Website
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* MerzVia */}
          <div className="group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="space-y-4 mb-8">
                <div className="inline-flex px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30">
                  <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">M&A Advisory</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">MerzVia</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A premier Mergers & Acquisitions firm building ambitious corporate legacies through strategic artistry.
                </p>
              </div>

              {/* About Section */}
              <div className="space-y-6 mb-8 pb-8 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">About MerzVia</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    MerzVia specializes in high-stakes transactions and strategic advisory, combining deep financial expertise with a refined sense of strategic artistry to unlock maximum enterprise value across Technology, Healthcare, Manufacturing, and Renewable Energy sectors.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-foreground">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {merzviaFeatures.map((feature, idx) => {
                    const Icon = feature.icon
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-violet-500/5">
                        <Icon className="w-5 h-5 text-violet-600 dark:text-violet-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{feature.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://merzvia.com"
                  target="_blank"
                  className="px-6 py-3 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-600/30"
                >
                  Visit Website
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* ESignVia */}
          <div className="group relative rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="space-y-4 mb-8">
                <div className="inline-flex px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Digital Signatures</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">ESignVia</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Next-Gen Electronic Signatures. Sign documents smarter and faster.
                </p>
              </div>

              {/* About Section */}
              <div className="space-y-6 mb-8 pb-8 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">About ESignVia</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    ESignVia provides the most intuitive way to upload, sign, and manage your documents. Built for speed, security, and the modern professional.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-foreground">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {esignviaFeatures.map((feature, idx) => {
                    const Icon = feature.icon
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/5">
                        <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{feature.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://esignvia.com"
                  target="_blank"
                  className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-600/30"
                >
                  Visit Website
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why Our Products */}
        <div className="max-w-6xl mx-auto mt-24 pt-24 border-t border-border">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Why Choose Our Products?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built on principles of transparency, innovation, and user empowerment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">User-Centric Design</h3>
                <p className="text-muted-foreground">
                  Intuitive interfaces crafted with real users in mind, making complex processes simple.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Trusted & Reliable</h3>
                <p className="text-muted-foreground">
                  Security, transparency, and reliability are at the core of everything we build.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Continuously Evolving</h3>
                <p className="text-muted-foreground">
                  Regular updates and new features ensuring we stay ahead of market needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-24 pt-24 border-t border-border text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Ready to Experience Innovation?</h2>
          <p className="text-lg text-muted-foreground">
            Explore Jobonix, Loanery, and MerzVia today to see how we're transforming opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
