import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AccessibilityControl from "@/components/AccessibilityControl";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "মোহাম্মদ সাইফুল ইসলাম বাবু | চেয়ারম্যান পদপ্রার্থী - ৬ নং কামারখোলা ইউনিয়ন",
  description: "মানুষের কল্যাণে, উন্নত কামারখোলা গড়াই আমাদের অঙ্গীকার। সততা, দক্ষতা ও জনসেবার লক্ষ্যে সাইফুল ইসলাম বাবু-কে জয়যুক্ত করুন।",
  openGraph: {
    title: "মোহাম্মদ সাইফুল ইসলাম বাবু | ৬ নং কামারখোলা ইউনিয়ন পরিষদ নির্বাচন",
    description: "আসুন, সবাই মিলে গড়ি উন্নত কামারখোলা। সততা, দক্ষতা, জনসেবা, শিক্ষা ও উন্নয়নের রূপকার।",
    images: [{ url: "/image.png", width: 1200, height: 630 }],
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Candidate Structured Schema (JSON-LD) for Google SEO Search Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Mohammad Saiful Islam Babu",
      "jobTitle": "Union Parishad Chairman Candidate",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kamarkhola Union",
        "addressCountry": "Bangladesh"
      }
    }
  };

  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${hindSiliguri.variable} font-sans bg-[#F8F9FA] dark:bg-[#070D19] text-slate-900 dark:text-slate-100 antialiased`}>
        {/* Dynamic Scroll Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-campaign-green to-campaign-red z-50" />
        
        <Navbar />
        <main>{children}</main>
        <Footer />
        
        {/* স্ক্রিনের নিচের কোণায় অ্যাক্সেসিবিলিটি ও রিডার মোড উইজেট */}
        <AccessibilityControl /> 
      </body>
    </html>
  );
}