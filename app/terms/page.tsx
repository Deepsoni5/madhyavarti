import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Terms() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-8">Terms & Conditions</h1>

          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: January 2024</p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-6">
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or
              on behalf of an entity ("you") and Madhyavarti Solutions ("Company", "we", "us", or "our"), concerning
              your access to and use of the madhyavarti.com website.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p className="text-muted-foreground mb-6">
              Unless otherwise stated, Madhyavarti Solutions and/or its licensors own the intellectual property rights
              for all material on the website. All intellectual property rights are reserved. You may view and print
              pages from the website for personal use, subject to restrictions set in these terms and conditions.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground mb-6">You agree not to:</p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• Republish material from this website</li>
              <li>• Sell, rent or sub-license material from the website</li>
              <li>• Reproduce, duplicate or copy material from this website for commercial purposes</li>
              <li>• Redistribute content unless content is specifically made for redistribution</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">4. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground mb-6">
              The information on this website is provided on an "as is" basis. Madhyavarti Solutions makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">5. Limitations of Liability</h2>
            <p className="text-muted-foreground mb-6">
              In no event shall Madhyavarti Solutions or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use the materials on Madhyavarti Solutions' website.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">6. Modifications</h2>
            <p className="text-muted-foreground mb-6">
              Madhyavarti Solutions may revise these terms of service for its website at any time without notice. By
              using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms and Conditions, please contact us at:
              <br />
              Email: wecare@madhyavarti.com
              <br />
              Phone: +91 8618629391
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
