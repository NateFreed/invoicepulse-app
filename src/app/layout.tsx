import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvoicePulse — Simple Invoicing for Freelancers",
  description: "Create, send, and track invoices in seconds. AI-powered line items, recurring billing, and instant payment links. From $12/mo.",
  openGraph: {
    title: "InvoicePulse - Fast Invoicing for Freelancers",
    description: "Create professional invoices in seconds. AI line items. From $12/mo.",
    type: "website",
    siteName: "InvoicePulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoicePulse - Fast Invoicing for Freelancers",
    description: "Create professional invoices in seconds. AI line items. From $12/mo.",
  },
  keywords: ["invoicing software", "freelancer invoice", "AI invoicing", "payment tracking", "recurring billing", "small business invoice"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
