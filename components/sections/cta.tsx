"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background - clean, no gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="rounded-3xl border-2 border-primary bg-card p-12 sm:p-16 lg:p-20 space-y-8">
          {/* Heading */}
          <div className="space-y-4 text-center">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Ready to Transform Your Business 10x Better?
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Join 500+ global companies that have accelerated their growth with Madhyavarti Solutions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contact"
              className="group px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Start Your Transformation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#our-services"
              className="px-8 py-4 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 text-center text-lg"
            >
              Explore Services
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/50">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">500+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Clients Worldwide</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">1000+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">9+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Years</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">99%</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
