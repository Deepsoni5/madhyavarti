"use client"

import Image from "next/image"

import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-slate-100/95 dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-slate-100/80 dark:supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24">
        <div className="relative h-full w-80">
          <Link href="/" className="absolute left-0 top-[55%] -translate-y-1/2 flex items-center h-44">
            <Image
              src="/mlogo.png"
              alt="Madhyavarti Solutions"
              width={600}
              height={200}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-foreground" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
            About Us
          </Link>
          <Link href="/products" className="text-foreground hover:text-primary transition-colors font-medium">
            Our Products
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Contact Us
          </Link>
          <ThemeToggle />
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border p-4 md:hidden z-50">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                About Us
              </Link>
              <Link href="/products" className="text-foreground hover:text-primary transition-colors font-medium">
                Our Products
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
