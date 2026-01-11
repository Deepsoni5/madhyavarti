import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Madhyavarti Solutions transformed our entire digital infrastructure. Their expertise in automation and scalable systems delivered exceptional results beyond our expectations.",
      name: "Sanjay Hegde",
      designation: "CEO, Artha Financial Services",
      src: "https://images.unsplash.com/photo-1681165558305-6e65c7e85d51?w=600&auto=format&fit=crop&q=60",
    },
    {
      quote:
        "The team delivered our fintech project ahead of schedule with outstanding quality. They understood our vision and executed flawlessly with cutting-edge solutions.",
      name: "Priya Lakshmi",
      designation: "Director of Engineering, Vistar Tech",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop&q=80",
    },
    {
      quote:
        "Best technology partner we could ask for. Madhyavarti Solutions provided strategic guidance and innovative solutions that accelerated our growth significantly across the pan-India market.",
      name: "Rohan Mehra",
      designation: "Managing Director, Bharat LogiTech",
      src: "https://images.unsplash.com/photo-1627401632925-a4c565d08a80?w=600&auto=format&fit=crop&q=60",
    },
    {
      quote:
        "Their support team is exceptional and their solutions are robust. We've seen measurable improvements in efficiency and cost savings since implementation of their AI platforms.",
      name: "Deepa Nair",
      designation: "Founder, HealthGenix India",
      src: "https://plus.unsplash.com/premium_photo-1670232149329-b3f128058ce8?w=600&auto=format&fit=crop&q=60",
    },
    {
      quote:
        "The platform's flexibility and performance have been game-changing for our organization. We scaled our operations smoothly without any technical debt.",
      name: "Amit Deshpande",
      designation: "CTO, Digital Bharat Solutions",
      src: "https://plus.unsplash.com/premium_photo-1714229505058-3f1d749a2369?w=600&auto=format&fit=crop&q=60",
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-sm font-semibold text-primary">Success Stories</p>
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how Madhyavarti Solutions has transformed businesses globally.
          </p>
        </div>

        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  )
}
