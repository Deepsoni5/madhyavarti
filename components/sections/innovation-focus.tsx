"use client"

import { Layers, Cpu, Globe, ArrowRight } from "lucide-react"

export function InnovationFocus() {
    const features = [
        {
            icon: Layers,
            title: "Digital-First Platforms",
            description:
                "Building digital-first platforms that streamline traditionally manual and fragmented processes, creating unified ecosystems for smoother operations.",
        },
        {
            icon: Cpu,
            title: "AI & Automation",
            description:
                "Leveraging automation, artificial intelligence, and data-driven workflows to improve speed, accessibility, and efficiency across all touchpoints.",
        },
        {
            icon: Globe,
            title: "Scalable Impact",
            description:
                "Creating scalable systems designed for pan-India reach and measurable economic impact, ensuring our solutions grow with the nation's needs.",
        },
    ]

    return (
        <section id="innovation-focus" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background dark:bg-[#030303] overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <p className="text-sm font-semibold text-primary">Govt. Recognized Tech Startup</p>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                        Innovation & <span className="text-primary">Technology Focus</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-6">
                        Madhyavarti Solutions is committed to solving real-world business and economic challenges through technology-led innovation.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 w-fit">
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed flex-grow">
                                        {feature.description}
                                    </p>

                                    <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-3 group-hover:translate-x-0">
                                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom content */}
                <div className="mt-20 text-center max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-background via-card to-background border border-border/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-primary/[0.03] bg-[size:20px_20px]" />
                    <div className="relative z-10">
                        <p className="text-lg md:text-xl font-medium text-foreground/90 leading-relaxed italic">
                            "Our innovation lies in process improvement, intelligent system design, and platform-based execution, enabling our products to deliver real-world value at scale."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
