"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function VolunteerJoinPage() {
  // ফর্ম স্টেট হ্যান্ডলিং
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    bloodGroup: "জানিনা",
    role: "প্রচার-প্রচারণা ও গণসংযোগ",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ১. হোয়াটসঅ্যাপের জন্য প্রফেশনাল স্বেচ্ছাসেবক ডাটা ফরম্যাট
    const whatsappMessage = `আসসালামু আলাইকুম বাবু ভাই,\nআমি আপনার নির্বাচনী ক্যাম্পে একজন *স্বেচ্ছাসেবক (Volunteer)* হিসেবে যোগ দিতে আগ্রহী। আমার তথ্য নিচে দেওয়া হলো:\n\n` +
                            `👤 নাম: ${formData.name}\n` +
                            `📞 মোবাইল: ${formData.phone}\n` +
                            `🏡 গ্রাম/এলাকা: ${formData.village}\n` +
                            `🩸 রক্তের গ্রুপ: ${formData.bloodGroup}\n` +
                            `🛠️ পছন্দের ভূমিকা: ${formData.role}`;

    // ২. URL এনকোডিং (বাংলা টেক্সট ও ইমোজির জন্য সুরক্ষিত)
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const volunteerWhatsappUrl = `https://wa.me/8801714869885?text=${encodedMessage}`;

    // ৩. মাইক্রো-অ্যানিমেশন এবং রিডাইরেকশন
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন হবে
      window.open(volunteerWhatsappUrl, "_blank");
      
      // ফর্ম ক্লিয়ার
      setFormData({ name: "", phone: "", village: "", bloodGroup: "জানিনা", role: "প্রচার-প্রচারণা ও গণসংযোগ" });
    }, 1200);
  };

  return (
    <div className="bg-[#030712] text-slate-100 min-h-screen font-sans antialiased overflow-x-hidden relative pt-24 pb-16">
      
      {/* ব্যাকগ্রাউন্ড প্রিমিয়াম গ্রিড ও গ্লো এফেক্ট */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-teal-500/10 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        {/* ব্যাক টু হোম বাটন */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors group py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            হোমপেজে ফিরে যান
          </Link>
        </div>

        {/* হেডার টেক্সট */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            💥 টিম বাবু ভাই ২০২৬
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            স্বেচ্ছাসেবক হিসেবে <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300">
              আমাদের সাথে যুক্ত হোন
            </span>
          </h1>
          <p className="text-xs sm:text-base text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            কামারখোলা ইউনিয়নকে একটি আধুনিক, বৈষম্যহীন ও স্মার্ট ইউনিয়ন হিসেবে গড়ে তুলতে তরুণ জননেতা সাইফুল ইসলাম বাবুর হাতকে শক্তিশালী করুন। আপনার মেধা ও শ্রম দিয়ে পরিবর্তনের অংশ হোন।
          </p>
        </div>

        {/* প্রিমিয়াম টাচ-রেসপন্সিভ ফর্ম কার্ড */}
        <div className="p-5 sm:p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
          
          {/* সাকসেস মেসেজ */}
          {isSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 text-xs sm:text-sm font-semibold animate-fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              <span>আপনাকে ধন্যবাদ! তথ্যসহ হোয়াটসঅ্যাপে রিডাইরেক্ট করা হচ্ছে...</span>
            </div>
          )}

          <form onSubmit={handleVolunteerSubmit} className="space-y-6">
            
            {/* নাম এবং মোবাইল গ্রিড (মোবাইলে নিচে নিচে, বড় স্ক্রিনে পাশাপাশি) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">আপনার পুরো নাম</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="যেমন: শামীম আহমেদ"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all h-12"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">মোবাইল নাম্বার</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="যেমন: 017XXXXXXXX"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all h-12"
                />
              </div>
            </div>

            {/* গ্রাম এবং রক্তের গ্রুপ (১০০% রেসপন্সিভ কম্বো) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">আপনার গ্রাম / এলাকা</label>
                <input 
                  type="text" 
                  required
                  value={formData.village}
                  onChange={(e) => setFormData({...formData, village: e.target.value})}
                  placeholder="যেমন:জয়নগর"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all h-12"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">রক্তের গ্রুপ (জরুরি সেবার জন্য)</label>
                <select 
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                  className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all h-12 cursor-pointer"
                >
                  <option value="জানিনা">জানিনা / দরকার নেই</option>
                  <option value="A+">A+ (এ পজিটিভ)</option>
                  <option value="A-">A- (এ নেগেটিভ)</option>
                  <option value="B+">B+ (বি পজিটিভ)</option>
                  <option value="B-">B- (বি নেগেটিভ)</option>
                  <option value="O+">O+ (ও পজিটিভ)</option>
                  <option value="O-">O- (ও নেগেটিভ)</option>
                  <option value="AB+">AB+ (এবি পজিটিভ)</option>
                  <option value="AB-">AB- (এবি নেগেটিভ)</option>
                </select>
              </div>
            </div>

            {/* আপনি কি ভূমিকা পালন করতে চান */}
            <div className="space-y-2">
              <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">আপনার পছন্দের কাজের ক্ষেত্র</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all h-12 cursor-pointer"
              >
                <option value="প্রচার-প্রচারণা ও গণসংযোগ">মাঠ পর্যায়ে প্রচার-প্রচারণা ও গণসংযোগ</option>
                <option value="সোশ্যাল মিডিয়া ও আইটি সাপোর্ট">সোশ্যাল মিডিয়া ক্যাম্পেইন ও আইটি সাপোর্ট</option>
                <option value="নির্বাচনী ক্যাম্প অফিস ম্যানেজমেন্ট">নির্বাচনী ক্যাম্প অফিস ম্যানেজমেন্ট</option>
                <option value="ভোটার গাইড ও সচেতনতা তৈরি">ভোটার গাইড ও সচেতনতা তৈরি</option>
                <option value="জরুরি ও মেডিকেল টিম সাপোর্ট">জরুরি ও মেডিকেল টিম (রক্তদান ও সেবা)</option>
              </select>
            </div>

            {/* সাবমিট বাটন */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-emerald-600 active:scale-[0.98] disabled:opacity-50 text-slate-950 font-black py-4 rounded-xl shadow-[0_10px_30px_rgba(20,184,166,0.2)] transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer h-12 mt-4 select-none"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  আবেদন সম্পন্ন করুন 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </>
              )}
            </button>

            {/* প্রাইভেসী নোটিশ */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 pt-2 border-t border-white/[0.03]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>সুরক্ষা বার্তা: একজন সচেতন নাগরিক হিসেবে আপনার দেওয়া তথ্যের গোপনীয়তা টিম বাবু ভাই রক্ষা করবে।</span>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}