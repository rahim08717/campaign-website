"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, Award, BookOpen, Briefcase, UserCheck, Shield, 
  Heart, Target, Compass, Milestone, Users, GraduationCap, 
  Sprout, CheckCircle2, Quote, MapPin, Phone, Mail, Send,
  Menu, X // মোবাইল টগলের জন্য অফিশিয়াল লুসিড আইকন যুক্ত করা হলো
} from "lucide-react";

// লাইটওয়েট প্রিমিয়াম কাউন্টার কম্পোনেন্ট
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 2000;
    const incrementTime = Math.max(Math.floor(duration / end), 25);

    const timer = setInterval(() => {
      start += Math.ceil(end / 60);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span className="font-mono font-black">{count}{suffix}</span>;
};

export default function AdvancedAboutPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  
  // মোবাইল টগল বারের জন্য স্টেট
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // টাইমলাইন ডাটা
  const timelineData = [
    { year: "", title: "জন্ম ও শেকড়ের গল্প", desc: "৬ নং কামারখোলা ইউনিয়নের ঐতিহাসিক ও ঐতিহ্যবাহী পারজয়নগর গ্রামের এক সম্ভ্রান্ত মুসলিম পরিবারে জন্ম গ্রহণ করেন। তাঁর পিতা এলাকার অত্যন্ত শ্রদ্ধেয় ব্যক্তিত্ব মোঃ মান্নান সানা।" },
    { year: "শৈশব ও কৈশোর", title: "গ্রামের ধূলিম মাটিতে বেড়ে ওঠা", desc: "কোনো শহরের কৃত্রিমতা নয়, বরং পারজয়নগর গ্রামের ধূলিমাটি, সবুজ প্রান্তর আর সাধারণ মানুষের সুখ-দুঃখকে খুব কাছ থেকে দেখে শৈশব ও কৈশোর পার করেছেন। ফলে গ্রামীণ মানুষের স্পন্দন তিনি গভীরভাবে অনুভব করেন।" },
    { year: "২০০০", title: "শিক্ষা জীবন ও মেধার স্বাক্ষর", desc: "স্থানীয় শিক্ষাপ্রতিষ্ঠান থেকে অত্যন্ত কৃতিত্বের সাথে মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা সম্পন্ন করেন। ছাত্রজীবন থেকেই তিনি কুসংস্কার ও অন্যায়ের বিরুদ্ধে সোচ্চার ছিলেন।" },
    { year: "২০০৬", title: "সামাজিক কর্মকাণ্ডে আত্মপ্রকাশ", desc: "এলাকার তরুণ ও যুবসমাজকে সাথে নিয়ে মাদকমুক্ত সমাজ গঠন এবং যুবকদের স্বাবলম্বী করার লক্ষ্যে বিভিন্ন সামাজিক, স্বেচ্ছাসেবী ও সাংস্কৃতিক সংগঠন প্রতিষ্ঠা করেন।" },
    { year: "২০১৫", title: "অবকাঠামোগত উন্নয়ন ও শিক্ষা প্রসার", desc: "কামারখোলার ভাঙাচোরা রাস্তাঘাট সংস্কারে নিজস্ব অর্থায়নে এবং স্বেচ্ছাশ্রমে অবদান রাখতে শুরু করেন। গরীব ও মেধাবী শিক্ষার্থীদের জন্য চালু করেন বিশেষ শিক্ষাবৃত্তি।" },
    { year: "২০২০", title: "করোনাকালীন দুর্যোগে অনন্য অবদান", desc: "মহামারী করোনার কঠিন সময়ে যখন সবাই গৃহবন্দী, তখন নিজের জীবনের ঝুঁকি নিয়ে ৬ নং কামারখোলা ইউনিয়নের প্রতিটি ওয়ার্ডে ঘরে ঘরে খাদ্য সহায়তা ও চিকিৎসা সামগ্রী পৌঁছে দিয়েছেন।" },
    { year: "২০২৬ - বর্তমান", title: "চেয়ারম্যান নির্বাচনের ঐতিহাসিক যাত্রা", desc: "ক্ষমতার লোভ বা ব্যক্তিগত স্বার্থে নয়, বরং কামারখোলা ইউনিয়নকে বাংলাদেশের একটি রোল মডেল, আধুনিক, স্মার্ট ও দুর্নীতিমুক্ত ইউনিয়ন হিসেবে গড়ে তুলতে আপামর জনতার দাবির মুখে চেয়ারম্যান পদে নির্বাচন করার চূড়ান্ত সিদ্ধান্ত গ্রহণ।" }
  ];

  // ট্রাস্ট ফ্যাক্টরের ডাটা
  const trustFactors = [
    { title: "সততা ও স্বচ্ছ নেতৃত্ব", desc: "তৃণমূল থেকে উঠে আসা সম্পূর্ণ নিষ্কলঙ্ক ও দুর্নীতিমুক্ত ইমেজের এক অনন্য জননেতা।", icon: Shield },
    { title: "জনমুখী সেবা", desc: "যেকোনো আপদ-বিপদে সাধারণ মানুষের জন্য তাঁর দোরগোড়া ২৪ ঘণ্টা খোলা থাকে।", icon: UserCheck },
    { title: "জবাবদিহিতা নিশ্চিতকরণ", desc: "ইউনিয়নের প্রতিটি টাকার হিসাব ডিজিটাল ও সাধারণ মানুষের সামনে প্রকাশ করার প্রতিশ্রুতি।", icon: Users },
    { title: "আধুনিক অবকাঠামো", desc: "পারজয়নগরসহ কামারখোলার প্রতিটি অনুন্নত রাস্তার আধুনিকায়ন ও টেকসই কালভার্ট নির্মাণ।", icon: Milestone },
    { title: "যুবশক্তির উন্নয়ন", desc: "তরুণদের ফ্রিল্যান্সিং ও কারিগরি শিক্ষার মাধ্যমে দক্ষ জনশক্তিতে রূপান্তর ও কর্মসংস্থান সৃষ্টি।", icon: GraduationCap },
    { title: "কৃষি ও কৃষকের উন্নয়ন", desc: "লবণাক্ততা দূরীকরণ, আধুনিক সেচ ব্যবস্থা এবং কৃষকদের ন্যায্যমূল্য প্রাপ্তিতে বিশেষ সেল গঠন।", icon: Sprout },
    { title: "মানসম্মত শিক্ষা", desc: "প্রাথমিক ও মাধ্যমিক স্তরের বিদ্যালয়গুলোর আধুনিকায়ন এবং শতভাগ ঝরে পড়া রোধ করা।", icon: BookOpen },
    { title: "সামাজিক নিরাপত্তা", desc: "বয়স্ক ভাতা, বিধবা ভাতা ও সরকারি অনুদান মধ্যস্বত্বভোগী ছাড়া সরাসরি প্রকৃত হকের কাছে পৌঁছানো।", icon: Heart }
  ];

  // অ্যাচিভমেন্ট শোকেস ডাটা
  const achievements = [
    { title: "টেকসই গ্রামীণ রাস্তাঘাট", desc: "বিগত বছরগুলোতে নিজস্ব ও সামাজিক উদ্যোগে বেশ কয়েকটি গুরুত্বপূর্ণ সংযোগ সড়ক চলাচলের উপযোগী করণ।", category: "অবকাঠামো" },
    { title: "মেধাবী ছাত্রবৃত্তি ফান্ড", desc: "অর্থের অভাবে যেন কোনো শিক্ষার্থীর পড়াশোনা বন্ধ না হয়, সেজন্য স্থায়ী তহবিল গঠন ও প্রতিবছর আর্থিক সহায়তা।", category: "শিক্ষা" },
    { title: "ধর্মীয় ও সামাজিক প্রতিষ্ঠান", desc: "ইউনিয়নের বিভিন্ন মসজিদ, মাদ্রাসা ও মন্দিরের অবকাঠামো উন্নয়নে অগ্রণী ভূমিকা পালন।", category: "ধর্ম ও সংস্কৃতি" },
    { title: "জরুরি দুর্যোগকালীন ত্রাণ", desc: "বন্যা, জলোচ্ছ্বাস কিংবা যেকোনো প্রাকৃতিক দুর্যোগে সরকারি বরাদ্দের অপেক্ষা না করে তাৎক্ষণিক ব্যক্তিগত তহবিল থেকে ফুড প্যাক বিতরণ।", category: "কল্যাণমূলক" }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert("অনুগ্রহ করে আপনার নাম ও মোবাইল নম্বর লিখুন।");
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <div className="bg-[#F8F9FA] dark:bg-[#070D19] min-h-screen text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden selection:bg-campaign-green selection:text-white">
      
      {/* ─── প্রিমিয়াম রেসপন্সিভ হেডার (আপনার ইমেজ অনুকরণে শতভাগ মোবাইল ফ্রেন্ডলি) ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070D19] sm:bg-[#070D19]/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* ইমেজ ম্যাচিং লোগো মডিউল */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-gradient-to-br from-red-500 to-campaign-red p-2 rounded-xl text-white shadow-lg shadow-red-500/10 shrink-0">
              {/* স্ক্রিনশটের অনুরূপ ল্যাপটপ + চেক আইকন */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="m9 10 2 2 4-4"/></svg>
            </div>
            <span className="font-black text-sm sm:text-base md:text-lg tracking-tight text-white whitespace-nowrap">
              সাইফুল ইসলাম বাবু
            </span>
          </Link>

          {/* ডেসকটপ ফুল নেভিগেশন (ইমেজ অনুযায়ী সব লিংক সহ - শুধুমাত্র বড় স্ক্রিনে দেখাবে) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-bold text-slate-300">
            <Link href="/" className="hover:text-campaign-red transition-colors py-1">হোম</Link>
            
            {/* পরিচিতি পেজ অ্যাক্টিভ স্টেট (লাল কালার ও আন্ডারলাইন) */}
            <Link href="/about" className="text-campaign-red transition-colors relative py-1 font-black after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[3px] after:bg-campaign-red after:rounded-full">
              পরিচিতি
            </Link>
            
            <Link href="/manifesto" className="hover:text-campaign-red transition-colors py-1">মহাপরিকল্পনা</Link>
            <Link href="/blood-bank" className="hover:text-campaign-red transition-colors py-1">রক্ত ব্যাংক</Link>
            <Link href="/govt-directory" className="hover:text-campaign-red transition-colors py-1">প্রশাসনিক ডিরেক্টরি</Link>
            <Link href="/volunteer" className="hover:text-campaign-red transition-colors py-1">পোস্টার তৈরি করুন</Link>
            <Link href="/volunteer" className="hover:text-campaign-red transition-colors py-1">স্বেচ্ছাসেবক</Link>
          </nav>

          {/* যুক্ত হোন বাটন (ডেসকটপ) */}
          <div className="hidden lg:block shrink-0">
            <Link href="/join" className="bg-campaign-green hover:bg-campaign-green/90 text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md">
              যুক্ত হোন
            </Link>
          </div>

          {/* 📱 হাই-ভিজিবিলিটি মোবাইল রেসপন্সিভ টগল বার বাটন (লুসিড আইকন সহ) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block lg:hidden p-2.5 bg-slate-800/40 text-white hover:bg-slate-800/80 focus:outline-none rounded-xl border border-slate-700/60 transition-all shrink-0"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-campaign-red transition-transform rotate-0" />
            ) : (
              <Menu size={20} className="text-white" />
            )}
          </button>
        </div>

        {/* 📱 মোবাইল ড্রপডাউন টগল মেনু এলিমেন্ট (মোবাইলে ১০০% নির্ভুল দেখাবে) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-[#070D19] border-t border-slate-800/80 overflow-hidden shadow-2xl"
            >
              <div className="px-5 pt-3 pb-8 space-y-1 flex flex-col font-bold text-sm text-slate-300">
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="py-3.5 border-b border-slate-800/50 hover:text-campaign-red transition-colors">হোম</Link>
                
                {/* পরিচিতি একটিভ মোবাইল স্টেট */}
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className="py-3.5 border-b border-slate-800/50 text-campaign-red flex justify-between items-center bg-slate-900/30 px-2 rounded-lg">
                  <span>পরিচিতি</span>
                  <span className="h-2 w-2 rounded-full bg-campaign-red" />
                </Link>
                
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/manifesto" className="py-3.5 border-b border-slate-800/50 hover:text-campaign-red transition-colors">মহাপরিকল্পনা</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/blood-bank" className="py-3.5 border-b border-slate-800/50 hover:text-campaign-red transition-colors">রক্ত ব্যাংক</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/govt-directory" className="py-3.5 border-b border-slate-800/50 hover:text-campaign-red transition-colors">প্রশাসনিক ডিরেক্টরি</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/volunteer" className="py-3.5 border-b border-slate-800/50 hover:text-campaign-red transition-colors">স্বেচ্ছাসেবক</Link>
                
                <Link 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  href="/volunteer" 
                  className="w-full bg-campaign-green text-white text-center py-3.5 rounded-xl font-black mt-5 block shadow-lg shadow-campaign-green/20"
                >
                  যুক্ত হোন
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* ─── হেডার সেকশন শেষ ─── */}


      {/* BACKGROUND GRAPHICS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-30 dark:opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-br from-campaign-green/30 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[20%] right-[-20%] w-[600px] h-[600px] bg-gradient-to-br from-campaign-red/20 to-transparent rounded-full blur-[140px]" />
      </div>

      {/* Hero / Title Header Section */}
      <section className="relative pt-28 sm:pt-36 pb-12 px-4 max-w-7xl mx-auto text-center z-10">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-widest bg-campaign-green/10 text-campaign-green border border-campaign-green/20"
        >
          <Award size={12} /> জনতার নেতা, উন্নয়নের অঙ্গীকার
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-6xl font-black mt-4 tracking-tight leading-tight sm:leading-[1.15]"
        >
          মানুষের পাশে থেকে গড়ে তোলা এক <br />
          <span className="bg-gradient-to-r from-campaign-green via-emerald-500 to-campaign-red bg-clip-text text-transparent">
            দীর্ঘ সেবামূলক যাত্রার গল্প
          </span>
        </motion.h1>
        <div className="h-1 w-16 bg-campaign-red mx-auto mt-4 rounded-full" />
      </section>

      {/* SPLIT SCREEN PROFILE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Side: Premium Image with Floating Badges */}
        <div className="lg:col-span-5 relative flex justify-center w-full my-4 sm:my-0">
          <div className="relative w-full max-w-[290px] sm:max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-white/50 backdrop-blur-md group">
            <Image 
              src="/image.png" 
              alt="মোহাম্মদ সাইফুল ইসলাম বাবু" 
              fill
              className="object-cover object-right transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>

          {/* Floating Badge 1: Experience */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-2 sm:-left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-2.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3"
          >
            <div className="p-2 bg-campaign-green text-white rounded-xl shadow-md">
              <Briefcase size={16} />
            </div>
            <div>
              <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">সামাজিক অভিজ্ঞতা</p>
              <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">২০+ বছর সক্রিয় সেবা</h4>
            </div>
          </motion.div>

          {/* Floating Badge 2: Identity */}
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-2.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3"
          >
            <div className="p-2 bg-campaign-red text-white rounded-xl shadow-md">
              <MapPin size={16} />
            </div>
            <div>
              <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">শেকড়</p>
              <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">পারজয়নগর, কামারখোলা</h4>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Storytelling Biography */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-justify sm:text-left mt-4 sm:mt-0">
          <div className="border-l-4 border-campaign-green pl-3 sm:pl-4">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-campaign-green">পরিচয় ও জীবনসংগ্রাম</h3>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black mt-1 text-slate-900 dark:text-white">মাটি ও মানুষের সন্তান</h2>
          </div>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            মোহাম্মদ সাইফুল ইসলাম বাবু ৬ নং কামারখোলা ইউনিয়নের একজন অত্যন্ত সুপরিচিত, সৎ ও বিনয়ী ব্যক্তিত্ব। তাঁর পিতা এলাকার সর্বজন শ্রদ্ধেয় ব্যক্তিত্ব **মোঃ মান্নান সানা**। কোনো শহরের বিলাসবহুল চার দেয়ালে নয়, বরং কামারখোলার ঐতিহ্যবাহী **পারজয়নগর গ্রামে** ধূলিমাটি মেখে সাধারণ গ্রামীণ মানুষের সাথে তিনি বড় হয়েছেন।
          </p>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            ছোটবেলা থেকেই গ্রামের মানুষের কঠোর জীবন সংগ্রাম, অবহেলিত রাস্তাঘাট এবং কৃষকদের নানাবিধ সংকট দেখে তিনি বড় হয়েছেন। ক্ষমতা কিংবা কোনো লোভ-লালসা নয়, বরং শৈশবের সেই চেনা পারজয়নগর গ্রাম তথা পুরো ৬ নং কামারখোলা ইউনিয়নকে একটি বৈষম্যহীন, আধুনিক ও উন্নত ডিজিটাল মডেল ইউনিয়ন হিসেবে গড়ে তুলতেই তিনি আজ চেয়ারম্যান পদপ্রার্থী।
          </p>
        </div>
      </section>

      {/* PUBLIC IMPACT SECTION (STATISTICS DASHBOARD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="bg-white dark:bg-slate-900/60 rounded-3xl p-4 sm:p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center backdrop-blur-md">
          {[
            { value: 1200, suffix: "+", label: "পরিবারকে সরাসরি সহায়তা" },
            { value: 450, suffix: "+", label: "ক্যাম্পেইন স্কলারশিপ ও উপকরণ" },
            { value: 15, suffix: "+", label: "উন্নয়ন ও সংস্কার প্রকল্প" },
            { value: 35, suffix: "+", label: "সামাজিক ও ধর্মীয় ইভেন্ট" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1 py-2">
              <h3 className="text-xl sm:text-4xl md:text-5xl font-black text-campaign-green dark:text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE VERTICAL TIMELINE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-4xl font-black">এক নজরে জীবন পরিক্রমা</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2">শৈশব থেকে বর্তমান পর্যন্ত জনসেবার এক সততা ও ত্যাগের দীর্ঘ ইতিহাস</p>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-2 sm:ml-32 space-y-8 sm:space-y-12">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* timeline icon dot */}
              <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-white dark:bg-slate-950 border-4 border-campaign-green group-hover:border-campaign-red transition-colors z-10" />
              
              {/* Year flag label */}
              <div className="absolute left-[-130px] top-0 hidden sm:block w-24 text-right font-black text-sm text-campaign-green dark:text-campaign-green/90 bg-campaign-green/5 dark:bg-campaign-green/10 py-1 px-3 rounded-lg border border-campaign-green/10">
                {item.year}
              </div>

              <div className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm group-hover:border-campaign-green/30 transition-all">
                <span className="sm:hidden inline-block text-[10px] font-black text-campaign-green bg-campaign-green/10 px-2 py-0.5 rounded-md mb-2">
                  {item.year}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-campaign-green transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed text-justify sm:text-left">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
        {/* Vision Card */}
        <div className="bg-white/40 dark:bg-slate-900/30 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 rounded-3xl p-5 sm:p-8 shadow-xl transition-all group">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-campaign-green text-white flex items-center justify-center shadow-lg mb-4 sm:mb-6">
            <Target size={20} />
          </div>
          <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-3">আমাদের ভিশন (আমাদের স্বপ্ন)</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base leading-relaxed text-justify sm:text-left">
            ৬ নং কামারখোলা ইউনিয়নকে একটি প্রযুক্তিনির্ভর, দুর্নীতিমুক্ত, স্বনির্ভর এবং আদর্শ মডেল ইউনিয়নে রূপান্তর করা; যেখানে প্রতিটি নাগরিকের সমান অধিকার, নিরাপত্তা এবং মৌলিক সুবিধা শতভাগ নিশ্চিত থাকবে। পারজয়নগরসহ প্রতিটি ওয়ার্ডের সুষম উন্নয়ন সাধন করা।
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white/40 dark:bg-slate-900/30 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 rounded-3xl p-5 sm:p-8 shadow-xl transition-all group">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-campaign-red text-white flex items-center justify-center shadow-lg mb-4 sm:mb-6">
            <Compass size={20} />
          </div>
          <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-3">আমাদের মিশন (বাস্তবায়নের পথ)</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base leading-relaxed text-justify sm:text-left">
            তৃণমূলের প্রতিটি মানুষের দোরগোড়ায় সরকারি ও ডিজিটাল নাগরিক সেবা নির্ভুলভাবে পৌঁছে দেওয়া। প্রশাসনিক স্বচ্ছতা ও জবাবদিহিতা নিশ্চিত করার মাধ্যমে ইউনিয়ন পরিষদ থেকে দালালি উচ্ছেদ করা এবং যুব ও কৃষক সমাজকে আধুনিক সুযোগ-সুবিধা প্রদান করা।
          </p>
        </div>
      </section>

      {/* WHY PEOPLE TRUST HIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-4xl font-black">কেন কামারখোলার মানুষ তাঁকে বিশ্বাস করে?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2">কোনো গালভরা বুলি নয়, কাজের মাধ্যমেই তৈরি হয়েছে এই অবিচল আস্থা ও বিশ্বাস</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustFactors.map((factor, idx) => {
            const Icon = factor.icon;
            return (
              <div key={idx} className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 sm:p-5 hover:border-campaign-green/40 hover:shadow-md transition-all">
                <div className="h-9 w-9 rounded-xl bg-campaign-green/10 text-campaign-green flex items-center justify-center mb-3.5">
                  <Icon size={18} />
                </div>
                <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white mb-1.5">{factor.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{factor.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PREMIUM QUOTE SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-14 text-center relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute -top-6 -left-6 text-white/5 pointer-events-none">
            <Quote size={100} className="sm:w-[180px] sm:h-[180px]" />
          </div>
          <Quote className="mx-auto text-campaign-green mb-4 sm:mb-6" size={32} />
          <h2 className="text-base sm:text-2xl md:text-3xl font-black max-w-3xl mx-auto leading-relaxed tracking-wide text-justify sm:text-center">
            "জনগণের আস্থাই আমার সবচেয়ে বড় শক্তি। ব্যক্তিগত বিলাসিতা নয়, বরং উন্নয়ন, স্বচ্ছতা এবং নিঃস্বার্থ সেবার মাধ্যমে একটি আধুনিক ডিজিটাল ইউনিয়ন গড়ে তোলাই আমার জীবনের একমাত্র লক্ষ্য।"
          </h2>
          <p className="text-[10px] sm:text-sm text-campaign-green/80 uppercase font-black tracking-widest mt-4 sm:mt-6">— মোহাম্মদ সাইফুল ইসলাম বাবু</p>
        </div>
      </section>

      {/* ACHIEVEMENT SHOWCASE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-4xl font-black">বিগত দিনের উন্নয়ন ও সমাজসেবামূলক কাজ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {achievements.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-wider bg-campaign-red/10 text-campaign-red px-2.5 py-1 rounded-md inline-block">
                  {item.category}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-3 sm:mt-4 group-hover:text-campaign-green transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM DYNAMIC CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white dark:bg-slate-900/40 rounded-3xl p-4 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
          
          {/* Left Side: Contact Info Details */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div>
              <span className="text-campaign-red font-black text-[10px] sm:text-xs uppercase bg-campaign-red/10 px-3 py-1 rounded-md border border-campaign-red/20 inline-block">
                যোগাযোগ কেন্দ্র
              </span>
              <h2 className="text-xl sm:text-4xl font-black mt-3">সরাসরি যুক্ত হোন বাবু ভাইয়ের সাথে</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                আপনার কোনো মতামত, অভিযোগ, পরামর্শ বা জরুরি সাহায্যের প্রয়োজন হলে নিচে যোগাযোগ করতে পারেন অথবা ফর্মটি পূরণ করে আপনার বার্তা পাঠাতে পারেন।
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 dark:bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-campaign-green text-white flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-bold text-slate-400">অস্থায়ী নির্বাচনী কার্যালয়</h4>
                  <p className="text-xs sm:text-sm font-black">পারজয়নগর বাজার (৬ নং কামারখোলা ইউনিয়ন)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 dark:bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-campaign-green text-white flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-bold text-slate-400">সরাসরি হটলাইন</h4>
                  <p className="text-xs sm:text-sm font-black font-mono">+880 1714-869885</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 dark:bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-campaign-green text-white flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-bold text-slate-400">অফিশিয়াল ইমেইল</h4>
                  <p className="text-xs sm:text-sm font-black font-mono">babu.kamarkhola@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form Module */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8 sm:py-12 animate-fade-in">
                <CheckCircle2 className="text-campaign-green mb-3 sm:mb-4 animate-bounce" size={48} />
                <h3 className="text-lg sm:text-xl font-black mb-2">আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">সাইফুল ইসলাম বাবু ভাইয়ের মিডিয়া সেল আপনার বার্তাটি অত্যন্ত গুরুত্বের সাথে পর্যালোচনা করে দ্রুত যোগাযোগ করবে।</p>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  
                  // হোয়াটসঅ্যাপ বার্তার জন্য টেক্সট ফরম্যাট তৈরি
                  const whatsappMessage = `*যোগাযোগ কেন্দ্র থেকে নতুন বার্তা* ✉️\n\n` +
                                          `👤 *নাম:* ${formData.name}\n` +
                                          `📞 *মোবাইল নম্বর:* ${formData.phone}\n\n` +
                                          `💬 *বক্তব্য বা মতামত:* \n${formData.message || "কোনো বার্তা দেওয়া হয়নি।"}`;

                  // ইউআরএল ফ্রেন্ডলি করার জন্য বার্তাটি এনকোড করা
                  const encodedMessage = encodeURIComponent(whatsappMessage);
                  
                  // আপনার নির্দিষ্ট করা হোয়াটসঅ্যাপ নাম্বার
                  const whatsappNumber = "8801714869885"; 
                  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                  
                  // নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন করা
                  window.open(whatsappURL, '_blank');

                  // পূর্বের এক্সিস্টিং সাবমিট হ্যান্ডলার ট্রিগার করা (যাতে সাকসেস স্ক্রিন শো করে)
                  if (typeof handleContactSubmit === 'function') {
                    handleContactSubmit(e);
                  }
                }} 
                className="space-y-4 sm:space-y-5"
              >
                <div>
                  <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">আপনার নাম *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: মোঃ কামরুল ইসলাম"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-campaign-green rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm focus:outline-none transition text-slate-800 dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">মোবাইল নম্বর *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="যেমন: 017XXXXXXXX"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-campaign-green rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm focus:outline-none transition text-slate-800 dark:text-white"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">আপনার বক্তব্য বা মতামত</label>
                  <textarea 
                    rows={4}
                    placeholder="বাবু ভাইয়ের উদ্দেশ্যে আপনার পরামর্শ বা সমস্যার কথা বিস্তারিত এখানে লিখুন..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-campaign-green rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm focus:outline-none transition text-slate-800 dark:text-white"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-campaign-green hover:bg-campaign-green/90 text-white font-black py-3 sm:py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xl shadow-campaign-green/10"
                >
                  <Send size={14} /> বার্তা পাঠান
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}