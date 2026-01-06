import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Users, Zap, Heart, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "About Madhyavarti Solutions | Redefining Opportunity",
  description:
    "Learn about Madhyavarti Solutions - creating pathways to meaningful work and responsible financial solutions for the next generation.",
  openGraph: {
    title: "About Madhyavarti Solutions",
    description: "Redefining opportunity for the next generation through job connectivity and ethical finance.",
  },
}

export default function About() {
  const pillars = [
    {
      icon: Target,
      title: "Opportunity Without Labels",
      description: "We go beyond resumes—matching potential with real possibilities.",
    },
    {
      icon: Heart,
      title: "Inclusive Financial Mediation",
      description: "Connecting underserved individuals to ethical, accessible loan options.",
    },
    {
      icon: Zap,
      title: "Technology with Empathy",
      description: "Leveraging digital tools to solve human problems, not just automate them.",
    },
    {
      icon: TrendingUp,
      title: "Workforce for the 21st Century",
      description: "Empowering hands-on talent for a world that still runs on real work.",
    },
  ]

  const achievements = [
    { number: "50K+", label: "Job Opportunities" },
    { number: "25K+", label: "Successful Placements" },
    { number: "10M+", label: "Loan Mediations" },
    { number: "100+", label: "Partner Organizations" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.05] blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(90deg, var(--color-border) 1px, transparent 1px), linear-gradient(0deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground text-balance">
              Redefining{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-accent">
                Opportunity for the Next Generation
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
              At Madhyavarti Solutions, we believe that everyone deserves access to opportunity—regardless of their
              background, education, or financial status.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Our Mission</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Our mission is to solve real-life challenges faced by everyday people by connecting them to practical,
                  sustainable job opportunities beyond the white-collar world, and by helping those in financial need
                  find the right support through responsible loan mediation.
                </p>
                <p>
                  Whether it's a skilled trade, service-based role, or a local gig that pays the bills, we are here to
                  bridge the gap between talent and opportunity. We work hand-in-hand with communities, businesses, and
                  organizations to create meaningful pathways to work that value hands-on skills and real-world
                  experience.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Our Vision</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p className="text-xl font-semibold text-foreground">
                  A society where no capable person is left behind due to lack of opportunity or financial hardship.
                </p>
                <p>
                  We understand that financial challenges can be overwhelming. That's why we also mediate responsible
                  loan opportunities, helping people in need secure funding through transparent, human-centered systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future-Ready Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Our Future-Ready Pillars</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Core principles guiding everything we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">{achievement.number}</p>
                <p className="text-sm text-muted-foreground font-medium">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">What We Do</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 p-8 rounded-2xl bg-card border border-border">
              <div className="p-3 rounded-lg bg-blue-500/10 w-fit">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Job Connectivity (Jobonix)</h3>
              <p className="text-muted-foreground leading-relaxed">
                We connect job seekers with real opportunities, focusing on practical skills and hands-on work. Our
                platform removes barriers and makes meaningful employment accessible to everyone.
              </p>
            </div>

            <div className="space-y-6 p-8 rounded-2xl bg-card border border-border">
              <div className="p-3 rounded-lg bg-emerald-500/10 w-fit">
                <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Ethical Loan Mediation (Loanery)</h3>
              <p className="text-muted-foreground leading-relaxed">
                We guide people toward responsible financial solutions through transparent loan mediation, helping them
                overcome challenges with dignity and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-foreground text-center">Our Commitment</h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">We are not just a platform</span>—we are a movement. A new
              infrastructure for economic mobility. A catalyst for dignified work. A lifeline for those who need support
              without judgment.
            </p>
            <p>
              Whether you're someone looking for a job that uses your hands and heart, or you're seeking a way to
              overcome financial hurdles, we are here to help you take the next step forward.
            </p>
            <p>
              <span className="font-semibold text-foreground">Let's build a better future—together.</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Ready to Be Part of the Movement?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our platforms and discover how Madhyavarti Solutions can help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center"
            >
              Explore Our Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
