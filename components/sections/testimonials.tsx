import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Madhyavarti Solutions transformed our entire digital infrastructure. Their expertise and dedication delivered exceptional results beyond our expectations.",
      name: "Sarah Chen",
      designation: "CEO, TechFlow Industries",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&q=80",
    },
    {
      quote:
        "The team delivered our project ahead of schedule with outstanding quality. They understood our vision and executed flawlessly with cutting-edge solutions.",
      name: "Michael Rodriguez",
      designation: "Director of Operations, Enterprise Solutions",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80",
    },
    {
      quote:
        "Best technology partner we could ask for. Madhyavarti Solutions provided strategic guidance and innovative solutions that accelerated our growth significantly.",
      name: "Emily Watson",
      designation: "Founder, CloudScale Ventures",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&q=80",
    },
    {
      quote:
        "Their support team is exceptional and their solutions are robust. We've seen measurable improvements in efficiency and cost savings since implementation.",
      name: "James Kim",
      designation: "CTO, DataPro Analytics",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&q=80",
    },
    {
      quote:
        "The platform's flexibility and performance have been game-changing for our organization. We scaled from 100 to 500 clients without any issues.",
      name: "Lisa Thompson",
      designation: "VP Technology, FutureNet Inc",
      src: "https://images.unsplash.com/photo-1523819137383-5db282c8b934?w=500&h=500&fit=crop&q=80",
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
