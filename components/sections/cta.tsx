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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Transform Businesses Through Technology and Innovation
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Join the growing network of users and businesses that have benefited from Madhyavarti Solutions’ digital platforms, creating measurable impact through technology-driven solutions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
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
              Explore Our Platforms
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-border/50">
            <div className="text-center space-y-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Users supported through Jobonix and KuCash</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary">100+</p>
              <p className="text-sm text-muted-foreground">Transactions & Matches processed on our platforms</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary">15+</p>
              <p className="text-sm text-muted-foreground">Years of Technology Innovation driving scalable solutions</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary">99%</p>
              <p className="text-sm text-muted-foreground">Secure & Compliant Operations across platforms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
