"use client"

import { motion, type Variants } from "framer-motion"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

function HeroGeometric({
  badge = "Transforming Businesses Since 2015",
  title1 = "Ready to Transform",
  title2 = "Your Business?",
  description = "Madhyavarti Solutions delivers cutting-edge IT services and digital transformation built for businesses ready to innovate and scale exponentially.",
  button1Text = "Get Started Today",
  button1Link = "/contact",
  button2Text = "Explore Services",
  button2Link = "#our-services",
}: {
  badge?: string
  title1?: string
  title2?: string
  description?: string
  button1Text?: string
  button1Link?: string
  button2Text?: string
  button2Link?: string
}) {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background dark:bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.05] blur-3xl dark:from-indigo-500/[0.05] dark:to-rose-500/[0.05]" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.15] dark:from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-accent/[0.15] dark:from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] dark:bg-white/[0.03] border border-white/[0.08] dark:border-white/[0.08] mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-primary dark:fill-rose-500/80" />
            <span className="text-sm text-foreground/60 dark:text-white/60 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tight text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground dark:from-white to-foreground/80 dark:to-white/80 whitespace-nowrap">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground/90 to-accent dark:from-indigo-300 dark:via-white/90 dark:to-rose-300",
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible" className="text-center">
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground dark:text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href={button1Link}
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 text-center inline-flex items-center justify-center"
            >
              {button1Text}
            </a>
            <a
              href={button2Link}
              className="px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 text-center inline-flex items-center justify-center"
            >
              {button2Text}
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4 pt-12 md:pt-16 border-t border-border/50 dark:border-white/[0.1] mt-12 md:mt-16 text-center"
          >
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary">500+</p>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-white/60">Clients Worldwide</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary">1000+</p>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-white/60">Projects Delivered</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary">9+</p>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-white/60">Years Experience</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-[#030303] via-transparent to-background/80 dark:to-[#030303]/80 pointer-events-none" />
    </div>
  )
}

export { HeroGeometric }
