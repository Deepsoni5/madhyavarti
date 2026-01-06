import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Home, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="flex-1 relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
          {/* 404 Icon */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="relative p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <AlertCircle className="w-20 h-20 text-primary" />
            </div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-6 mb-12">
            <div className="space-y-4">
              <h1 className="text-7xl sm:text-8xl font-bold text-foreground">404</h1>
              <p className="text-4xl sm:text-5xl font-bold text-foreground">
                Page Not{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Found</span>
              </p>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Oops! It seems like you've wandered into uncharted territory. The page you're looking for doesn't exist or
              has been moved.
            </p>

            {/* Additional helpful message */}
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mt-8">
              <p className="text-foreground">
                Don't worry! Let's get you back on track. Explore our latest products, services, or contact us for
                assistance.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/products"
              className="px-8 py-4 rounded-full border border-primary/20 text-foreground font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
            >
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Alternative links */}
          <div className="mt-16 pt-12 border-t border-primary/10 w-full">
            <p className="text-center text-muted-foreground mb-6">Quick Navigation</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/"
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center text-foreground font-medium text-sm"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center text-foreground font-medium text-sm"
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center text-foreground font-medium text-sm"
              >
                Products
              </Link>
              <Link
                href="/contact"
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center text-foreground font-medium text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
