import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "InvoicePro — Simple invoicing for small businesses",
  description: "A streamlined SaaS platform that enables small business owners and freelancers to create, send, and track professional invoices with ease. Features au",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="min-h-screen bg-gray-50 antialiased">{children}</body></html>
}