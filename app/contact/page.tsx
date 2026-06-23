"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Phone, MessageSquare, MapPin, Mail, Send, 
  CheckCircle2, ArrowLeft, ShieldAlert, Sparkles 
} from "lucide-react";

export default function AdvancedContactPage() {
  // ফর্ম স্টেট হ্যান্ডলিং
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ক্যান্ডিডেটের অফিশিয়াল মোবাইল ও হোয়াটসঅ্যাপ ইনফো
  const targetMobileNumber = "+8801714869885";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ১. হোয়াটসঅ্যাপের জন্য প্রফেশনাল মেসেজ ফরম্যাট তৈরি
    const whatsappMessage = `আসসালামু আলাইকুম বাবু ভাই,\nআমি আপনার নির্বাচনী ওয়েবসাইটের কন্টাক্ট ফর্মের মাধ্যমে যোগাযোগ করছি। আমার তথ্য নিচে দেওয়া হলো:\n\n` +
                            `👤 নাম: ${formData.name}\n` +
                            `📞 মোবাইল: ${formData.phone}\n` +
                            `🏡 গ্রাম/এলাকা: ${formData.village}\n` +
                            `📝 বার্তা: ${formData.message}`;

    // ২. URL এনকোডিং করা (যাতে বাংলা টেক্সট ব্রাউজারে ব্রেক না হয়)
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const dynamicWhatsappUrl = `https://wa.me/8801714869885?text=${encodedMessage}`;

    // ৩. মাইক্রো-অ্যানিমেশন এবং রিডাইরেকশন লজিক
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // সরাসরি নতুন ট্যাবে বা হোয়াটসঅ্যাপ অ্যাপে মেসেজসহ ওপেন হবে
      window.open(dynamicWhatsappUrl, "_blank");
      
      // ফর্ম ক্লিয়ার করা
      setFormData({ name: "", phone: "", village: "", message: "" });
    }, 1200);
  };

  return (
    <div className="bg-[#030712] text-slate-100 min-h-screen font-sans antialiased overflow-x-hidden relative selection:bg-emerald-500 selection:text-slate-950 pt-20 sm:pt-28 pb-16">
      
      {/* ব্যাকগ্রাউন্ড গ্রিড ও অ্যাম্বিয়েন্ট গ্লো */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* ব্যাক বাটন (মোবাইলে সহজে ট্যাপ করার জন্য প্যাডিং বাড়ানো হয়েছে) */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6 sm:mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors group py-2">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> হোমপেজে ফিরে যান
          </Link>
        </motion.div>

        {/* টাইটেল সেকশন */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            <Sparkles className="h-3 w-3 animate-pulse" /> সরাসরি সংযোগ গেটওয়ে
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            বাবু ভাইয়ের সাথে <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              সরাসরি হোয়াটসঅ্যাপে
            </span> যুক্ত হোন
          </h1>
          <p className="text-xs sm:text-base text-slate-400 font-medium max-w-xl leading-relaxed">
            নিচের ফর্মে আপনার বিবরণ লিখুন। সাবমিট বাটনে ক্লিক করামাত্রই আপনার সম্পূর্ণ লেখাটি সরাসরি বাবু ভাইয়ের পার্সোনাল হোয়াটসঅ্যাপ চ্যাটে চলে যাবে।
          </p>
        </div>

        {/* মেইন লেআউট গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* বাম পাশ: কুইক ইনফো নোডস */}
          <div className="lg:col-span-5 space-y-4 order-2 lg:order-1 w-full">
            
            {/* ডাইরেক্ট কল কার্ড */}
            <a 
              href={`tel:${targetMobileNumber}`}
              className="block p-5 sm:p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-emerald-500/30 transition-all duration-300 group shadow-xl active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">জরুরি মোবাইল কল</div>
                  <div className="text-base sm:text-xl font-black text-white mt-0.5 group-hover:text-emerald-400 transition-colors">+৮৮০ ১৭১৪-৮৬৯৮৮৫</div>
                </div>
              </div>
            </a>

            {/* লোকেশন ও টাইম ডেটা */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] space-y-4 shadow-xl">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">কেন্দ্রীয় নির্বাচনী কার্যালয়</div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 leading-relaxed">কামারখোলা বাজার, ৬ নং কামারখোলা ইউনিয়ন পরিষদ এলাকা, দাকোপ, খুলনা।</p>
                </div>
              </div>
              <div className="h-[1px] bg-white/5 w-full" />
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">অফিসিয়াল ইমেইল</div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">contact@saifulislambabu.com</p>
                </div>
              </div>
            </div>

          </div>

          {/* ডান পাশ: প্রিমিয়াম কন্টাক্ট ফর্ম */}
          <div className="lg:col-span-7 order-1 lg:order-2 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl relative"
            >
              
              {/* সাকসেস অ্যালার্ট */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 text-xs sm:text-sm font-semibold"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>হোয়াটসঅ্যাপে রিডাইরেক্ট করা হচ্ছে, দয়া করে অপেক্ষা করুন...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* নাম ও মোবাইল ইনপুট (মোবাইলে শতভাগ রেসপন্সিভ গ্রিড) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">আপনার নাম</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="যেমন: মো: রফিকুল ইসলাম"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all h-12"
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
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all h-12"
                    />
                  </div>
                </div>

                {/* গ্রামের নাম */}
                <div className="space-y-2">
                  <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">আপনার গ্রাম বা এলাকা</label>
                  <input 
                    type="text" 
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({...formData, village: e.target.value})}
                    placeholder="যেমন: জয়নগর / ভিটাভাঙ্গা / বটবুনিয়া"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all h-12"
                  />
                </div>

                {/* বার্তা */}
                <div className="space-y-2">
                  <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">আপনার সুনির্দিষ্ট বার্তা বা পরামর্শ</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="আপনার কথাগুলো বিস্তারিত এখানে লিখুন..."
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all resize-none min-h-[100px]"
                  />
                </div>

                {/* সাবমিট বাটন */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 active:scale-[0.98] disabled:opacity-50 text-slate-950 font-black py-4 rounded-xl shadow-[0_10px_30px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer select-none h-12 mt-2"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      হোয়াটসঅ্যাপে সরাসরি পাঠান <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                {/* সিকিউরিটি গাইডলাইন */}
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 pt-2">
                  <ShieldAlert className="h-4 w-4 text-slate-600 shrink-0" />
                  <span>এটি ইনক্রিপ্টেড ডাটা ট্রান্সফার সিস্টেম; আপনার গোপনীয়তা শতভাগ সুরক্ষিত।</span>
                </div>

              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}