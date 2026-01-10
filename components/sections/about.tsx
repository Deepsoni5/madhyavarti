export function About() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">About Madhyavarti Solutions</h2>
            <div className="space-y-4 text-lg text-muted-foreground mb-8 leading-relaxed">
              <p>
                Founded with a vision to build innovative technology platforms that solve real-world challenges, Madhyavarti Solutions has been developing digital-first solutions across India since 2015.
              </p>
              <p>
                Our team of engineers and product specialists collaborates to create scalable, automated, and data-driven platforms that enhance financial accessibility, streamline recruitment, and enable sustainable business growth.
              </p>
              <p>
                Through our platforms, Madhyavarti Solutions has created measurable impact in digital innovation, process improvement, and technology adoption.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-6">Key Milestones:</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-accent min-w-[80px]">100+</div>
                <p className="text-muted-foreground pt-1">Users Impacted through our digital platforms</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-accent min-w-[80px]">50%</div>
                <p className="text-muted-foreground pt-1">Faster deployment time compared to industry standards</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-accent min-w-[80px]">10+</div>
                <p className="text-muted-foreground pt-1">Years of Combined Engineering Excellence</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
              alt="Madhyavarti Solutions team"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
