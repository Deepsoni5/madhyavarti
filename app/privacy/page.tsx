import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: January 2024</p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-6">
              Madhyavarti Solutions ("we", "us", "our" or "Company") operates the madhyavarti.com website. This page
              informs you of our policies regarding the collection, use, and disclosure of personal data when you use
              our Service and the choices you have associated with that data.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Information Collection and Use</h2>
            <p className="text-muted-foreground mb-4">
              We collect several different types of information for various purposes to provide and improve our Service
              to you.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mt-6 mb-3">Types of Data Collected</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>
                • <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain
                personally identifiable information that can be used to contact or identify you ("Personal Data")
              </li>
              <li>
                • <strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used
                ("Usage Data")
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Security of Data</h2>
            <p className="text-muted-foreground mb-6">
              The security of your data is important to us but remember that no method of transmission over the Internet
              or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
              protect your Personal Data, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
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
