export function About() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">About Madhyavarti Solutions</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Founded with a vision to revolutionize business technology, Madhyavarti Solutions has been delivering
              exceptional IT services and digital solutions across India.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our team of expert engineers and consultants work collaboratively with clients to understand their unique
              challenges and deliver transformative solutions that drive sustainable growth.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div>
                <div className="text-3xl font-bold text-accent">500+</div>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">1000+</div>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">15+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
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
