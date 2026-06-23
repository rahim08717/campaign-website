"use client";

import React, { useState, useRef } from "react";
import { Hind_Siliguri } from "next/font/google";
import Link from "next/link"; // Next.js Link কম্পোনেন্ট ইমপোর্ট করা হলো
import { 
  Download, User, RefreshCw, Share2, Heart, Shield, 
  Users, Award, Edit, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Check, Menu, X
} from "lucide-react";

// ফন্ট কনফিগারেশন (সর্বোচ্চ ওয়েট ৭০০)
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export default function DigitalVolunteerStudio() {
  // ফর্ম ও মোবাইল মেনু স্টেট
  const [volunteerName, setVolunteerName] = useState("মো: রাকিব হাসান");
  const [wardNumber, setWardNumber] = useState("১ নং ওয়ার্ড");
  const [profession, setProfession] = useState("ছাত্র ও সমাজকর্মী");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ক্যানভাস রেফারেন্স
  const downloadPosterRef = useRef<HTMLDivElement>(null);

  // ইমেজ আপলোড প্রসেসর
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("অনুগ্রহ করে ৫ মেগাবাইটের কম সাইজের ছবি আপলোড করুন।");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ডাউনলোড হ্যান্ডলার
  const handleDownload = async (multiplier: number) => {
    if (!downloadPosterRef.current) return;
    setIsExporting(true);
    try {
      const { toPng } = await import("html-to-image");
      await new Promise((resolve) => setTimeout(resolve, 500));
      const dataUrl = await toPng(downloadPosterRef.current, {
        quality: 1.0,
        pixelRatio: multiplier,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `Saiful_Babu_Volunteer_Poster_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      alert("ডাউনলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsExporting(false);
    }
  };

  // সোশ্যাল শেয়ার
  const handleShare = async () => {
    if (!downloadPosterRef.current) return;
    try {
      const { toBlob } = await import("html-to-image");
      const blob = await toBlob(downloadPosterRef.current, { quality: 0.95, pixelRatio: 1.5 });
      if (blob && navigator.share) {
        const file = new File([blob], "volunteer_poster.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "স্বেচ্ছাসেবক পোস্টার",
          text: "আমি সাইফুল ইসলাম বাবুর সমর্থক হিসেবে আমার অফিশিয়াল পোস্টার তৈরি করেছি!",
        });
      } else {
        alert("আপনার ব্রাউজারে সরাসরি শেয়ার সাপোর্ট নেই। পোস্টারটি ডাউনলোড করে ফেসবুকে আপলোড করুন।");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // পোস্টার ডিজাইন কোড
  const renderPosterInnerContent = () => {
    return (
      <div style={{ fontFamily: 'var(--font-hind-siliguri), sans-serif' }} className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-[#F4F1E6]">
        <div className="absolute top-0 left-0 w-full h-[640px] bg-gradient-to-b from-[#012E25] to-[#013D31] z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />
        </div>
        <div className="absolute top-[440px] left-0 w-full h-[320px] z-10">
          <svg viewBox="0 0 1080 320" className="w-full h-full" preserveAspectRatio="none">
            <path d="M-10,120 Q240,230 540,120 T1090,150 L1090,320 L-10,320 Z" fill="#C59B27" opacity="0.3" />
            <path d="M-10,100 Q240,210 540,105 T1090,135 L1090,320 L-10,320 Z" fill="#D4AF37" />
            <path d="M-10,70 Q240,175 540,80 T1090,110 L1090,320 L-10,320 Z" fill="#01261F" />
            <path d="M-10,140 Q240,250 540,140 T1090,170 L1090,320 L-10,320 Z" fill="#F4F1E6" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[320px] bg-[#011C17] border-t-[8px] border-[#D4AF37] z-20" />
        <div className="relative z-30 w-full h-full flex flex-col justify-between p-12 text-center">
          <div className="space-y-2 mt-4">
            <p className="text-[#D4AF37] font-bold text-[24px]">বিসমিল্লাহির রহমানির রাহিম</p>
            <p className="text-slate-300 text-[18px] uppercase opacity-80">জনসেবা     • উন্নয়ন    • সততা    • স্বচ্ছতা</p>
            <h2 className="text-white text-[46px] font-black leading-tight">৬ নং কামারখোলা ইউনিয়ন পরিষদ নির্বাচন ২০২৬</h2>
          </div>
          <div className="grid grid-cols-12 items-center px-6 -mt-4">
            <div className="col-span-5 flex justify-start">
              <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#A61C1C] to-[#D4AF37] p-2 shadow-2xl">
                <div className="w-full h-full rounded-full bg-[#01231B] overflow-hidden border-[6px] border-[#012E25]">
                  <img src="/babu.png" alt="Candidate" className="w-full h-full object-cover scale-105 object-top" />
                </div>
              </div>
            </div>
            <div className="col-span-7 text-left pl-8 space-y-3">
              <h3 className="text-[#D4AF37] text-[68px] font-black leading-none tracking-tight whitespace-nowrap">সাইফুল ইসলাম বাবু</h3>
              <div>
                <span className="inline-block bg-[#A61C1C] text-white text-[28px] font-black px-14 py-2.5 rounded-full shadow-lg border border-red-500/30">চেয়ারম্যান পদপ্রার্থী</span>
              </div>
              <p className="text-white text-[24px] font-medium opacity-90">৬ নং কামারখোলা ইউনিয়ন পরিষদ</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center -mt-6 mb-36">
            <div className="w-[290px] h-[290px] rounded-full bg-gradient-to-b from-[#D4AF37] to-[#012E25] p-2 shadow-2xl relative bg-white">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#012E25] border-2 border-[#D4AF37] text-[#D4AF37] font-bold px-7 py-1 rounded-full text-[14px] whitespace-nowrap shadow-md">গর্বিত স্বেচ্ছাসেবক</div>
              <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden border-2 border-white flex items-center justify-center">
                {uploadedImage ? <img src={uploadedImage} alt="Volunteer" className="w-full h-full object-cover" /> : <User className="h-28 w-28 text-slate-300" />}
              </div>
            </div>
            <div className="text-center mt-4 space-y-1.5 w-full px-4">
              <h4 className="text-[#01261F] font-bold text-[46px] leading-none">{volunteerName}</h4>
              <p className="text-slate-700 font-medium text-[24px] leading-none">{profession}</p>
              <div className="pt-1">
                <span className="inline-block bg-[#01261F] text-white font-bold text-[18px] px-10 py-1 rounded-full shadow-sm">{wardNumber}</span>
              </div>
            </div>
          </div>
          <div className="w-full text-center space-y-3 pb-2 z-30">
            <div className="space-y-1">
              <h2 className="text-[#D4AF37] font-bold text-[40px] leading-tight">‘আধুনিক, নিরাপদ, দুর্নীতিমুক্ত ও স্মার্ট’</h2>
              <h2 className="text-[#D4AF37] font-bold text-[40px] leading-tight">কামারখোলা ইউনিয়ন গড়ার দৃঢ় প্রত্যয়।</h2>
            </div>
            <div className="pt-3 border-t border-emerald-900/40 max-w-3xl mx-auto">
              <p className="text-white/90 font-medium text-[22px]">কোনো কৃত্রিম প্রতিশ্রুতি নয়, আপনার পরামর্শই হবে আমাদের আগামীর পথ চলার শক্তি।</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${hindSiliguri.variable} min-h-screen bg-[#070D19] text-slate-100 font-sans antialiased overflow-x-hidden`}>
      
      {/* ইমেজ image_27b7fd.png অনুকরণে হুবহু প্রিমিয়াম হেডার ডিজাইন */}
      <nav className="border-b border-white/5 bg-[#070D19]/90 backdrop-blur-md sticky top-0 z-50 px-4">
        <div className="container mx-auto max-w-7xl h-20 flex items-center justify-between">
          
          {/* ব্র্যান্ড লোগো এরিয়া */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/10">
              <Check className="text-white h-5 w-5 stroke-[3]" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">সাইফুল ইসলাম বাবু</span>
          </Link>

          {/* ডেক্সটপ নেভিগেশন লিংকসমূহ - <Link> এবং সঠিক Path যুক্ত করা হয়েছে */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-300">
            <Link href="/" className="hover:text-white transition pb-1">হোম</Link>
            <Link href="/about" className="hover:text-white transition">পরিচিতি</Link>
            <Link href="/manifesto" className="hover:text-white transition">মহাপরিকল্পনা</Link>
            <Link href="/blood-bank" className="hover:text-white transition">রক্ত ব্যাংক</Link>
            <Link href="/govt-directory" className="hover:text-white transition">প্রশাসনিক ডিরেক্টরি</Link>
            <Link href="/volunteer" className="text-red-500 border-b-2 border-red-500 pb-1 font-black">স্বেচ্ছাসেবক</Link>
          </div>

          {/* ডেক্সটপ রাইট অ্যাকশন বাটন */}
          <div className="hidden lg:block">
            <Link href="/volunteer">
              <button className="bg-emerald-700 hover:bg-emerald-600 text-white font-black px-6 py-2.5 rounded-full text-xs shadow-lg transition-all">যুক্ত হোন</button>
            </Link>
          </div>

          {/* মোবাইল মেনু টগল বাটন */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-400 hover:text-white transition">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* রেসপনসিভ মোবাইল ড্রপডাউন ড্রয়ার - এখানেও Link যুক্ত করা হয়েছে */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#070D19] border-b border-white/5 px-6 py-6 flex flex-col gap-4 text-sm font-bold shadow-2xl z-50">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-slate-300">হোম</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-slate-300">পরিচিতি</Link>
            <Link href="/plan" onClick={() => setMobileMenuOpen(false)} className="text-slate-300">মহাপরিকল্পনা</Link>
            <Link href="/blood-bank" onClick={() => setMobileMenuOpen(false)} className="text-slate-300">রক্ত ব্যাংক</Link>
            <Link href="/directory" onClick={() => setMobileMenuOpen(false)} className="text-slate-300">প্রশাসনিক ডিরেক্টরি</Link>
            <Link href="/volunteer" onClick={() => setMobileMenuOpen(false)} className="text-red-500">স্বেচ্ছাসেবক</Link>
            <Link href="/join" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full mt-2 bg-emerald-700 text-white py-3 rounded-xl text-center">যুক্ত হোন</button>
            </Link>
          </div>
        )}
      </nav>

      {/* গাইডলাইন স্টেপস */}
      <section className="container mx-auto px-4 max-w-7xl mt-8 mb-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10">
          <h3 className="text-sm sm:text-base font-bold text-emerald-400 mb-6 flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            পোস্টার তৈরি করবেন যেভাবে
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "ধাপ ১", text: "নিজের নাম, ওয়ার্ড ও পেশা লিখুন" },
              { step: "ধাপ ২", text: "আপনার একটি ছবি আপলোড করুন" },
              { step: "ধাপ ৩", text: "আপনার পোস্টার প্রিভিউ দেখুন" },
              { step: "ধাপ ৪", text: "পোস্টার ডাউনলোড করুন এবং শেয়ার করুন।" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 relative">
                <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md whitespace-nowrap">{item.step}</span>
                <p className="text-xs font-medium text-slate-300 leading-snug">{item.text}</p>
                {idx < 3 && <ArrowRight className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4 w-4 z-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* মূল স্টুডিও ওয়ার্কস্পেস */}
      <main className="container mx-auto px-4 pb-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* তথ্য ফরম */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-emerald-950/60 border-b border-white/5 text-white p-4 font-bold text-sm flex items-center gap-2">
                <Edit className="h-4 w-4 text-emerald-400" /> আপনার তথ্য দিন
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">আপনার নাম *</label>
                  <input 
                    type="text" 
                    value={volunteerName} 
                    onChange={(e) => setVolunteerName(e.target.value)} 
                    className="w-full bg-[#0d1527] border border-white/10 p-3.5 rounded-xl text-sm font-semibold text-white focus:border-emerald-500 outline-none" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">ওয়ার্ড নম্বর *</label>
                    <select 
                      value={wardNumber} 
                      onChange={(e) => setWardNumber(e.target.value)} 
                      className="w-full bg-[#0d1527] border border-white/10 p-3.5 rounded-xl text-sm font-semibold text-white focus:border-emerald-500 outline-none appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                        <option key={w} value={`${w} নং ওয়ার্ড`} className="bg-[#0d1527]">{w} নং ওয়ার্ড</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">পেশা *</label>
                    <input 
                      type="text" 
                      value={profession} 
                      onChange={(e) => setProfession(e.target.value)} 
                      className="w-full bg-[#0d1527] border border-white/10 p-3.5 rounded-xl text-sm font-semibold text-white focus:border-emerald-500 outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">আপনার ছবি আপলোড করুন *</label>
                  <div className="border border-dashed border-white/20 hover:border-emerald-500 rounded-2xl bg-[#0d1527] p-5 relative flex items-center justify-between gap-4">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-emerald-600 bg-white/5 flex items-center justify-center flex-shrink-0">
                        {uploadedImage ? (
                          <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-8 w-8 text-slate-600" />
                        )}
                      </div>
                      <div>
                        <button className="bg-white/10 text-slate-200 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
                          <UploadCloud className="h-3 w-3" /> ছবি নির্বাচন করুন
                        </button>
                        <p className="text-[10px] text-slate-400 mt-1">JPG, PNG বা WEBP (Max 5MB)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => handleDownload(1.5)} 
                    disabled={isExporting} 
                    className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    {isExporting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4 stroke-[3]" /> ডাউনলোড করতে চাপুন</>}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* লাইভ প্রিভিউ ডিসপ্লে */}
          <div className="lg:col-span-7 flex flex-col items-center order-1 lg:order-2">
            <div className="w-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-emerald-950/60 border-b border-white/5 text-white p-4 font-bold text-sm flex items-center gap-2">
                <Eye className="h-4 w-4 text-emerald-400" /> পোস্টার প্রিভিউ
              </div>

              <div className="p-4 sm:p-6 bg-[#0d1527]/50 flex flex-col items-center justify-center">
                <div className="w-full max-w-[320px] sm:max-w-[390px] md:max-w-[420px] aspect-[1080/1350] relative bg-slate-900 p-2 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                  <div 
                    style={{ width: "1080px", height: "1350px" }} 
                    className="absolute left-0 top-0 select-none scale-[0.282] sm:scale-[0.347] md:scale-[0.375] origin-top-left bg-[#F4F1E6] overflow-hidden text-white flex flex-col justify-between font-sans"
                  >
                    {renderPosterInnerContent()}
                  </div>
                </div>

                {/* মোবাইল ও ডেক্সটপ ফ্রেন্ডলি বাটন এরিয়া */}
                <div className="w-full max-w-[320px] sm:max-w-[390px] md:max-w-[420px] flex flex-col sm:grid sm:grid-cols-3 gap-2 mt-5">
                  <button onClick={() => handleDownload(1.5)} disabled={isExporting} className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"><Download size={14}/> HD PNG</button>
                  <button onClick={() => handleDownload(2.5)} disabled={isExporting} className="bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"><Award size={14}/> প্রিন্ট কোয়ালিটি</button>
                  <button onClick={handleShare} disabled={isExporting} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"><Share2 size={14}/> শেয়ার করুন</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* অফ-স্ক্রিন এক্সপোর্ট ইঞ্জিন */}
      <div style={{ position: "fixed", left: "-9999px", top: "0", width: "1080px", height: "1350px", zIndex: -100, overflow: "hidden" }}>
        <div ref={downloadPosterRef} style={{ width: "1080px", height: "1350px" }} className="w-[1080px] h-[1350px] bg-[#F4F1E6] relative overflow-hidden text-white flex flex-col justify-between font-sans">
          {renderPosterInnerContent()}
        </div>
      </div>

      {/* ইনফো সেকশন */}
      <section className="bg-[#050b14] border-t border-white/5 py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <h3 className="text-lg font-bold text-center text-white mb-8">কেন স্বেচ্ছাসেবক হবেন?</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { icon: <Users className="text-emerald-400 mx-auto h-5 w-5" />, text: "উন্নয়নের অংশীদার হোন" },
              { icon: <Award className="text-emerald-400 mx-auto h-5 w-5" />, text: "আপনার পরিচিতি প্রচারের সুযোগ" },
              { icon: <Heart className="text-emerald-400 mx-auto h-5 w-5" />, text: "সমাজ ও মানুষের পাশে থাকুন" },
              { icon: <Shield className="text-emerald-400 mx-auto h-5 w-5" />, text: "নির্বাচনী প্রচারণায় অবদান রাখুন" },
              { icon: <Check className="text-emerald-400 mx-auto h-5 w-5 stroke-[3]" />, text: "গড়ুন উন্নত কামারখোলা" }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center space-y-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">{item.icon}</div>
                <p className="text-xs font-bold text-slate-300 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ফুটার */}
      <footer className="bg-[#030912] text-white py-10 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Heart className="text-red-500 h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">আসুন, সবাই মিলে গড়ি উন্নত কামারখোলা</h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">আপনার একটি সমর্থনই পারে বদলে দিতে আগামী দিনের কামারখোলা</p>
            </div>
          </div>
          <div className="md:text-right space-y-0.5">
            <h3 className="text-xl font-bold tracking-wide text-red-400 italic">সাইফুল ইসলাম বাবু</h3>
            <p className="text-xs text-slate-400 font-semibold opacity-95">চেয়ারম্যান পদপ্রার্থী, ۶ নং কামারখোলা ইউনিয়ন।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}