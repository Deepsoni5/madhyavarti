import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Stats } from "@/components/sections/stats"
import { About } from "@/components/sections/about"
import { Features } from "@/components/sections/features"
import { Solutions } from "@/components/sections/solutions"
import { Testimonials } from "@/components/sections/testimonials"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Stats />
      <About />
      <Features />
      <Solutions />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
