"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 2
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(
            () => {
              current += increment
              if (current >= value) {
                setCount(value)
                clearInterval(timer)
                observer.unobserve(entry.target)
              } else {
                setCount(Math.floor(current))
              }
            },
            (duration * 1000) / steps,
          )
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function Stats() {
  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "Happy Clients",
      description: "Trusted by businesses across industries worldwide",
    },
    {
      number: 1000,
      suffix: "+",
      label: "Projects Completed",
      description: "Successfully delivered innovative solutions",
    },
    {
      number: 95,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Commitment to excellence and quality",
    },
    {
      number: 9,
      suffix: "+",
      label: "Years in Industry",
      description: "Proven track record of success",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Our Impact by Numbers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering measurable results and driving success for our clients
          </p>
        </div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 space-y-4 text-center flex flex-col items-center justify-center h-full">
                  {/* Animated number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                  >
                    <p className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                    </p>
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>

                  {/* Accent line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
