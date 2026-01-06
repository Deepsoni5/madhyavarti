"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to a backend service
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", company: "", message: "" })
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-4 text-center">Get In Touch</h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Contact us today to discuss how we can help transform
            your business.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-lg border border-border p-8">
              {submitted && (
                <div className="mb-6 p-4 bg-accent/20 border border-accent rounded-lg text-accent">
                  Thank you! We've received your message and will get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="text-accent mt-1">📍</div>
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-muted-foreground">
                        MADHYAVARTI SOLUTIONS PRIVATE LIMITED
                        <br />
                        NO:8, K.NO.13-3, 28TH CROSS
                        <br />
                        HULIMAVU MAIN ROAD, Hulimavu
                        <br />
                        Bangalore South, Bangalore - 560076
                        <br />
                        Karnataka, India
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-accent">📞</div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a href="tel:+918618629391" className="text-primary hover:text-primary/80">
                        +91 8618629391
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-accent">📧</div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a href="mailto:wecare@madhyavarti.com" className="text-primary hover:text-primary/80">
                        wecare@madhyavarti.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="rounded-lg overflow-hidden border border-border h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7778.901402925576!2d77.607355!3d12.878715!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae152a98db83ad%3A0x19fef03a9fe461e7!2s8%20k%2C%2013%2C%2028th%20Cross%20Rd%2C%20Raghavendra%20Layout%2C%20Hanuman%20Nagar%2C%20Hulimavu%2C%20Bengaluru%2C%20Karnataka%20560076!5e0!3m2!1sen!2sin!4v1767703515407!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
