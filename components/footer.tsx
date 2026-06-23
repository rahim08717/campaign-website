import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B1325] text-slate-400 pt-16 pb-8 border-t-4 border-campaign-green relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="space-y-4">
          <h3 className="text-white text-xl font-black">মোহাম্মদ সাইফুল ইসলাম বাবু</h3>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            চেয়ারম্যান পদপ্রার্থী, ৬ নং কামারখোলা ইউনিয়ন। সততা, দক্ষতা ও জনসেবার মাধ্যমে আপনার অধিকার ফিরিয়ে দিতে বদ্ধপরিকর।
          </p>
        </div>

        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4">গুরুত্বপূর্ণ লিংক</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">মূল পাতা (হোম)</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">জীবনবৃত্তান্ত ও কর্মজীবন</Link></li>
            <li><Link href="/manifesto" className="hover:text-white transition-colors">নির্বাচনী ইশতেহার ও রোডম্যাপ</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-black text-xs uppercase tracking-widest">প্রধান ক্যাম্প অফিস</h4>
          <p className="text-sm leading-relaxed">
            পারজয়নগর বাজার,<br />
            ৬ নং কামারখোলা, বাংলাদেশ।
          </p>
          
          {/* সোশ্যাল আইকন সেকশন (নিরাপদ SVG দিয়ে আপডেট করা হয়েছে) */}
          <div className="flex items-center gap-3 pt-2">
            {/* ফেসবুক আইকন */}
            <a href="https://www.facebook.com/profile.php?id=61590375007904" aria-label="Facebook" className="p-2.5 bg-slate-800 hover:bg-campaign-green rounded-full text-white transition-all">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            
            {/* ইউটিউব আইকন */}
            <a href="https://www.facebook.com/profile.php?id=61590375007904" aria-label="YouTube" className="p-2.5 bg-slate-800 hover:bg-campaign-red rounded-full text-white transition-all">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © ২০২৬ সাইফুল ইসলাম বাবু ক্যাম্পেইন টিম। সর্বস্বত্ব সংরক্ষিত।
        </div>
        <div className="flex items-center gap-1.5 text-slate-600 bg-slate-900/50 px-3 py-1.5 rounded-md border border-slate-800">
          <ShieldAlert className="h-3 w-3 text-campaign-red" /> নির্বাচন আচরণবিধি অনুযায়ী সম্পূর্ণ নিয়ন্ত্রিত।
        </div>
      </div>
    </footer>
  );
}