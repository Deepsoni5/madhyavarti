import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-primary/20 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            {/* Brand section */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <Link href="/">
                  <Image
                    src="/mlogo.png"
                    alt="Madhyavarti Solutions"
                    width={500}
                    height={200}
                    className="h-44 w-auto object-contain -ml-4"
                  />
                </Link>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Leading IT solutions provider transforming businesses through cutting-edge technology and innovation
                since 2015.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-primary" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                  <Twitter className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#our-services" className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Contact</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <a href="tel:+918618629391" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 8618629391
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:wecare@madhyavarti.com"
                    className="text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    wecare@madhyavarti.com
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Bangalore, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary/10"></div>

          {/* Bottom footer */}
          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground">
                &copy; {new Date().getFullYear()} Madhyavarti Solutions. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs mt-1 opacity-75">
                Madhyavarti Solutions Private Limited | CIN: U62099KA2024PTC187663
              </p>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              Made for India 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
