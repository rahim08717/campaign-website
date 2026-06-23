"use client";

import React, { useState, useRef } from "react";
import { Hind_Siliguri } from "next/font/google";
import Link from "next/link";
import { 
  Download, User, RefreshCw, Share2, Heart, Shield, 
  Users, Award, Edit, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Check, Menu, X,
  MapPin, Phone, MessageSquare, Image as ImageIcon, Video, FileText, ChevronRight
} from "lucide-react";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export default function PremiumElectionHomepage() {
  // মোবাইল মেনু ও পোস্টার জেনারেটর স্টেট
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [volunteerName, setVolunteerName] = useState("মো: রাকিব হাসান");
  const [wardNumber, setWardNumber] = useState("১ নং ওয়ার্ড");
  const [profession, setProfession] = useState("ছাত্র ও সমাজকর্মী");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // জীবনবৃত্তান্ত (Biography) সেকশনের অ্যাক্টিভ ট্যাব স্টেট
  const [activeBioTab, setActiveBioTab] = useState("শৈশব");

  // গ্যালারি ফিল্টার স্টেট
  const [galleryFilter, setGalleryFilter] = useState("all");

  // ওয়ার্ড ভিত্তিক উন্নয়ন ট্র্যাকার স্টেট
  const [selectedWard, setSelectedWard] = useState("");

  const downloadPosterRef = useRef<HTMLDivElement>(null);

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
      link.download = `Saiful_Babu_Poster_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      alert("ডাউনলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!downloadPosterRef.current) return;
    try {
      const { toBlob } = await import("html-to-image");
      const blob = await toBlob(downloadPosterRef.current, { quality: 0.95, pixelRatio: 1.5 });
      if (blob && navigator.share) {
        const file = new File([blob], "volunteer_poster.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "ডিজিটাল নির্বাচনী পোস্টার",
          text: "আমি সাইফুল ইসলাম বাবুর সমর্থক হিসেবে আমার অফিশিয়াল পোস্টার তৈরি করেছি!",
        });
      } else {
        alert("আপনার ব্রাউজারে সরাসরি শেয়ার সাপোর্ট নেই। পোস্টারটি ডাউনলোড করে ফেসবুকে আপলোড করুন।");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // জীবনবৃত্তান্তের তথ্য ডেটাবেস
  const bioData = {
    "শৈশব": {
      title: "মাটির টানে বড় হওয়া",
      text: "কামারখোলার আলো-বাতাসে বেড়ে ওঠা। মেহনতি মানুষের দৈনন্দিন সুখ-দুঃখ খুব কাছ থেকে অনুভব করা এবং বাল্যকাল থেকেই সমাজসেবামূলক কাজে অবিনাশী আগ্রহ।"
    },
    "শিক্ষা": {
      title: "শিক্ষা জীবন ও আদর্শিক ভিত্তি",
      text: "উচ্চশিক্ষা সম্পন্ন করে আধুনিক ও বিজ্ঞানমনস্ক দৃষ্টিভঙ্গি নিয়ে এলাকার তরুণ সমাজকে সুশিক্ষিত এবং দক্ষ জনশক্তিতে রূপান্তর করার স্বপ্ন ও পরিকল্পনা।"
    },
    "সামাজিক": {
      title: "সামাজিক অবদান ও উন্নয়ন",
      text: "বিগত বছরগুলোতে যেকোনো দুর্যোগে সাধারণ মানুষের পাশে দাঁড়িয়েছেন। রাস্তাঘাট মেরামত, রক্তদান কর্মসূচি পরিচালনা এবং তরুণদের খেলাধুলায় উদ্বুদ্ধকরণে কাজ করেছেন।"
    },
    "নেতৃত্ব": {
      title: "নেতৃত্বের অভিযাত্রা ও সততা",
      text: "কোনো অন্যায় বা দুর্নীতির সাথে আপোষ না করে সততা ও সাহসিকতার সাথে তরুণ প্রজন্মের একনিষ্ঠ আইকন হিসেবে ইউনিয়নব্যাপী কাজ করে যাচ্ছেন।"
    },
    "ভিশন": {
      title: "বর্তমান ভিশন ২০২৬",
      text: "৬ নং কামারখোলা ইউনিয়নকে একটি বৈষম্যহীন, প্রযুক্তি-বান্ধব, নিরাপদ এবং মাদকমুক্ত স্মার্ট ইউনিয়ন হিসেবে গড়ে তোলার মহাপরিকল্পনা।"
    }
  };

  // নির্বাচনী অঙ্গীকারসমূহ
  const commitments = [
    { id: "১", title: "তথ্যপ্রযুক্তিনির্ভর ইউনিয়ন গঠন", desc: "ফ্রি ওয়াই-ফাই জোন ও ইউনিয়ন ডিজিটাল সেবা।" },
    { id: "২", title: "স্বচ্ছতা ও জবাবদিহিতা", desc: "শতভাগ বাজেট প্রকাশ ও উন্মুক্ত গণশুনানি।" },
    { id: "৩", title: "২৪ ঘণ্টা জরুরি চিকিৎসাসেবা", desc: "বিনামূল্যে অ্যাম্বুলেন্স ও ফ্রি মেডিকেল ক্যাম্প।" },
    { id: "৪", title: "ডিজিটাল কৃষি ও কৃষক সেবা", desc: "সঠিক মূল্যে সার-বীজ বিতরণ ও আধুনিক পরামর্শ।" },
    { id: "৫", title: "শিক্ষা ও আধুনিক লাইব্রেরি", desc: "মেধাবী শিক্ষার্থীদের বৃত্তি ও তথ্যকেন্দ্র স্থাপন।" },
    { id: "৬", title: "যুব ও নারী কর্মসংস্থান", desc: "ফ্রি ফ্রিল্যান্সিং ও কুটির শিল্পের ট্রেনিং।" },
    { id: "৭", title: "আধুনিক ড্রেনেজ ও সংস্কার", desc: "স্থায়ী জলাবদ্ধতা দূরীকরণ ও রাস্তা পাকাকরণ।" },
    { id: "৮", title: "বিশুদ্ধ সুপেয় পানির ব্যবস্থা", desc: "প্রয়োজনীয় স্থানে গভীর নলকূপ ও আর্সেনিক মুক্তি।" },
    { id: "৯", title: "ধর্মীয় ও সামাজিক প্রতিষ্ঠানের উন্নয়ন", desc: "মসজিদ, মন্দির ও কবরস্থানের সংস্কার।" },
    { id: "১০", title: "দুর্নীতিমুক্ত ও হয়রানিমুক্ত প্রশাসন", desc: "দালাল চক্র উচ্ছেদ ও সম্পূর্ণ স্বচ্ছ সার্টিফিকেট।" },
    { id: "১১", title: "স্মার্ট কৃষি ও সেচ সাহায্য", desc: "সেচ পাম্পের সহজলভ্যতা ও বিদ্যুৎ কার্ড নিশ্চিতকরণ।" },
    { id: "১২", title: "বয়স্ক, বিধবা ও প্রতিবন্ধী ভাতা", desc: "স্বচ্ছ তালিকার মাধ্যমে শতভাগ প্রাপ্য অধিকার প্রদান।" },
    { id: "১৩", title: "আইন-শৃঙ্খলা ও সিসিটিভি", desc: "গুরুত্বপূর্ণ মোড়ে সিসিটিভি ক্যামেরা ও নাইট গার্ড।" },
    { id: "১৪", title: "যুব বিজ্ঞান, খেলাধুলা ও সাংস্কৃতিক বিকাশ", desc: "বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক ক্লাব।" },
    { id: "১৫", title: "ক্লিন, গ্রিন ও পরিবেশবান্ধব কামারখোলা", desc: "নদী ভাঙন রোধে বৃক্ষরোপণ ও ময়লা নিষ্কাশন।" }
  ];

 // গ্যালারি ডেটা (পাবলিক ফোল্ডারের ইমেজ লিংক এবং আসল স্ক্রিনশটের টাইটেলসহ)
const galleryItems = [
  { 
    type: "image", 
    src: "/babu1.jpg", 
    title: "কামারখোলা ইউনিয়নের সর্বস্তরের মানুষের সাথে সাইফুল ইসলাম বাবুর মতবিনিময় সভা সম্পন্ন।" 
  },
  { 
    type: "image", 
    src: "/babu2.jpg", 
    title: "জয়নগর এলাকায় নির্বাচনী গণসংযোগ ও উঠান বৈঠক সফলভাবে সম্পন্ন।" 
  },
  { 
    type: "image", 
    src: "/babu3.jpg", 
    title: "স্মার্ট কামারখোলা ইউনিয়ন বিনির্মাণের লক্ষ্যে ইশতেহার ও মহাপরিকল্পনা প্রকাশ।" 
  }
];

  const filteredGallery = galleryFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.type === galleryFilter);

  // পোস্টার ইন্টারনাল কনটেন্ট রেন্ডারার
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
            <p className="text-slate-300 text-[18px] uppercase opacity-80">জনসেবা     • উন্নয়ন     • সততা     • স্বচ্ছতা</p>
            <h2 className="text-white text-[46px] font-black leading-tight">৬ নং কামারখোলা ইউনিয়ন পরিষদ নির্বাচন ২০২৬</h2>
          </div>
          <div className="grid grid-cols-12 items-center px-6 -mt-4">
            <div className="col-span-5 flex justify-start">
              <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#A61C1C] to-[#D4AF37] p-2 shadow-2xl">
                <div className="w-full h-full rounded-full bg-[#01231B] overflow-hidden border-[6px] border-[#012E25]">
                  <img src="babu.png" />
                </div>
              </div>
            </div>
            <div className="col-span-7 text-left pl-8 space-y-3">
              <h3 className="text-[#D4AF37] text-[68px] font-black leading-none tracking-tight whitespace-nowrap">সাইফুল ইসলাম বাবু</h3>
              <div>
                <span className="inline-block bg-[#A61C1C] text-white text-[28px] font-black px-14 py-2.5 rounded-full shadow-lg border border-red-500/30">চেয়ারম্যান পদপ্রার্থী</span>
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
      
      {/* ─────────────────────────────────────────────────────────
          IMAGE_636D06.PNG অনুকরণে প্রিমিয়াম আল্ট্রা রেসপনসিভ হেডার ডিজাইন
          ───────────────────────────────────────────────────────── */}
      <nav className="border-b border-white/5 bg-[#070D19]/90 backdrop-blur-md sticky top-0 z-50 px-4 transition-all">
        <div className="container mx-auto max-w-7xl h-20 flex items-center justify-between">
          
          {/* ব্র্যান্ড লোগো ও ভেরিফাইড প্রোফাইল আইকন এরিয়া */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center font-black text-white text-lg shadow-inner">
              N
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-red-900/30 border border-red-500/20 flex items-center justify-center">
                <Check className="text-red-500 h-4 w-4 stroke-[3]" />
              </div>
              <span className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-red-400 transition">
                সাইফুল ইসলাম বাবু
              </span>
            </div>
          </Link>

          {/* ডেক্সটপ নেভিগেশন লিংকসমূহ (ঠিক image_636d06.png এর ন্যায়) */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-300">
            <Link href="/" className="text-red-500 border-b-2 border-red-500 pb-1 font-black">হোম</Link>
            <Link href="/about" className="hover:text-white transition">পরিচিতি</Link>
            <Link href="/manifesto" className="hover:text-white transition">মহাপরিকল্পনা</Link>
            <Link href="/blood-bank" className="hover:text-white transition">রক্ত ব্যাংক</Link>
            <Link href="/govt-directory" className="hover:text-white transition">প্রশাসনিক ডিরেক্টরি</Link>
            <Link href="/volunteer" className="hover:text-white transition">পোস্টার তৈরি করুন</Link>
          </div>

          {/* ডেক্সটপ রাইট যুক্ত হোন বাটন */}
          <div className="hidden lg:block">
            <Link href="#feedback">
              <button className="bg-[#027A48] hover:bg-emerald-600 text-white font-black px-6 py-2.5 rounded-full text-sm shadow-xl hover:scale-105 transition-all">
                যুক্ত হোন
              </button>
            </Link>
          </div>

          {/* মোবাইল মেনু টগল বাটন (৯৯% মোবাইল ইউজারের জন্য হাইপার অপ্টিমাইজড) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white transition active:scale-95"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* রেসপনসিভ মোবাইল ড্রপডাউন ড্রয়ার */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#070D19]/98 backdrop-blur-lg border-b border-white/5 px-6 py-6 flex flex-col gap-4 text-sm font-bold shadow-2xl z-50 animate-in fade-in slide-in-from-top-5 duration-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-red-500 border-l-2 border-red-500 pl-2">হোম</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">পরিচিতি</Link>
            <Link href="/manifesto" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">মহাপরিকল্পনা</Link>
            <Link href="/blood-bank" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">রক্ত ব্যাংক</Link>
            <Link href="/govt-directory" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">প্রশাসনিক ডিরেক্টরি</Link>
            <Link href="/volunteer" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">পোস্টার তৈরি করুন</Link>
            <Link href="/volunteer" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full mt-2 bg-[#027A48] text-white py-3.5 rounded-xl text-center text-sm font-black active:bg-emerald-700">
                যুক্ত হোন
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* ─────────────────────────────────────────────────────────
          HERO SECTION (Image_c5f3c7.jpg এর আধুনিক রূপ)
          ───────────────────────────────────────────────────────── */}
      <section id="home" className="relative pt-10 pb-20 overflow-hidden px-4">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> কামারখোলা ইউনিয়ন পরিষদ নির্বাচন ২০২৬
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              জনগণের মতামত ও অংশগ্রহণের <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                আধুনিক ও জবাবদিহিমূলক ইশতেহার
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              "আধুনিক, নিরাপদ, দুর্নীতিমুক্ত ও স্মার্ট কামারখোলা ইউনিয়ন গড়ার দৃঢ় প্রত্যয়।" কোনো কৃত্রিম প্রতিশ্রুতি নয়, আপনার মূল্যবান পরামর্শই হবে আমাদের আগামীর পথ চলার প্রধান শক্তি।
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="#poster-studio" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20">
                  <Edit size={16}/> নিজস্ব পোস্টার তৈরি করুন
                </button>
              </Link>
              <Link href="#manifesto" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-4 rounded-xl text-sm transition flex items-center justify-center gap-2">
                  <FileText size={16}/> কর্মপরিকল্পনা দেখুন
                </button>
              </Link>
            </div>

            {/* ইমপ্যাক্ট কাউন্টার্স */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-white">15+</h3>
                <p className="text-xs text-slate-400 mt-1">জনসেবামূলক কাজ</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-emerald-400">৯টি</h3>
                <p className="text-xs text-slate-400 mt-1">স্মার্ট ওয়ার্ড ভিশন</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-amber-400">১০০%</h3>
                <p className="text-xs text-slate-400 mt-1">স্বচ্ছতার অঙ্গীকার</p>
              </div>
            </div>
          </div>

          {/* ক্যান্ডিডেট প্রোফাইল কার্ড */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-amber-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition duration-500" />
              <div className="relative rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 p-3 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
                <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-slate-900 relative">
                  <img 
                    src="/babu.png"
                    alt="Saiful Islam Babu" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-left space-y-1">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white font-black text-[11px] uppercase tracking-wider rounded-md">
                      চেয়ারম্যান পদপ্রার্থী
                    </span>
                    <h2 className="text-2xl font-black text-white">সাইফুল ইসলাম বাবু</h2>
                    <p className="text-xs text-slate-300">৬ নং কামারখোলা ইউনিয়ন পরিষদ নির্বাচন ২০২৬</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          MISSION / VISION / CORE VALUES GRID
          ───────────────────────────────────────────────────────── */}
      <section className="py-12 border-t border-white/5 bg-slate-950/40 px-4">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition group">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
              <Shield size={22} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">আমাদের লক্ষ্য (Mission)</h3>
            <p className="text-sm text-slate-400 leading-relaxed">তৃণমূল পর্যায়ে দুর্নীতিমুক্ত, আধুনিক শাসন ব্যবস্থা ও দ্রুত নাগরিক সেবা নিশ্চিতের মাধ্যমে প্রতিটি সাধারণ পরিবারের অধিকার সুপ্রতিষ্ঠিত করা।</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition group">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition">
              <Eye size={22} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">আমাদের ভিশন (Vision)</h3>
            <p className="text-sm text-slate-400 leading-relaxed">আগামী ২০২৬ সালের মধ্যে ৬ নং কামারখোলা ইউনিয়নকে একটি স্বনির্ভর, প্রযুক্তিনির্ভর এবং দেশের মধ্যে রোল মডেল স্মার্ট ইউনিয়ন হিসেবে রূপান্তর করা।</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition group">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition">
              <Users size={22} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">মূল্যবোধ (Core Values)</h3>
            <p className="text-sm text-slate-400 leading-relaxed">একচ্ছত্র সততা, সামাজিক সমতা, প্রশাসনিক স্বচ্ছতা ও আপামর জনগণের প্রত্যক্ষ মতামতকে সর্বোচ্চ প্রাধান্য দিয়ে সমাজ বিনির্মাণ করা।</p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          IMAGE_C5F3A8.PNG অনুকরণে ইন্টারেক্টিভ জীবনবৃত্তান্ত সেকশন
          ───────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">জীবনবৃত্তান্ত</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">নেতৃত্বের সততা ও দীর্ঘ পথচলা</h2>
            <div className="h-1 w-12 bg-emerald-500 mx-auto rounded-full mt-2" />
          </div>

          {/* ট্যাব এবং কনটেন্ট আর্কিটেকচার (মোবাইলে স্ক্রোলযোগ্য, ডেস্কটপে সাইডবার) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white/5 rounded-3xl p-4 sm:p-8 border border-white/10 backdrop-blur-md">
            
            {/* বাম পাশের ট্যাব বাটনসমূহ */}
            <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 no-scrollbar snap-x whitespace-nowrap lg:whitespace-normal">
              {[
                { id: "শৈশব", label: "শৈশব ও প্রারম্ভ" },
                { id: "শিক্ষা", label: "শিক্ষা জীবন" },
                { id: "সামাজিক", label: "সামাজিক অবদান" },
                { id: "নেতৃত্ব", label: "নেতৃত্বের অভিযাত্রা" },
                { id: "ভিশন", label: "বর্তমান ভিশন" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveBioTab(tab.id)}
                  className={`px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-left transition-all flex items-center justify-between snap-center min-w-[140px] lg:w-full ${
                    activeBioTab === tab.id 
                      ? "bg-[#012E25] text-emerald-400 border border-emerald-500/30 shadow-inner" 
                      : "bg-slate-900/50 text-slate-400 hover:text-white border border-transparent"
                  }`}
                >
                  <span>{tab.label}</span>
                  <ChevronRight size={14} className="hidden lg:block opacity-60" />
                </button>
              ))}
            </div>

            {/* ডান পাশের কনটেন্ট চেঞ্জার এরিয়া */}
            <div className="lg:col-span-8 bg-[#091122] rounded-2xl p-6 sm:p-8 border border-white/5 relative min-h-[220px] flex flex-col justify-center animate-in fade-in duration-300">
              <div className="absolute right-6 bottom-6 text-[8rem] font-black text-white/5 pointer-events-none select-none">
                01
              </div>
              <span className="text-xs font-bold text-amber-400">{activeBioTab} ও প্রারম্ভিক অধ্যায়</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1 mb-4">
                {bioData[activeBioTab as keyof typeof bioData].title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {bioData[activeBioTab as keyof typeof bioData].text}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          নির্বাচনী অঙ্গীকার ও কর্মপরিকল্পনা (15 COMMITMENTS GRID)
          ───────────────────────────────────────────────────────── */}
      <section id="manifesto" className="py-20 bg-[#040914] px-4 border-t border-b border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">নির্বাচনী অঙ্গীকার ও কর্মপরিকল্পনা</h2>
            <p className="text-slate-400 text-xs sm:text-sm">কামারখোলা ইউনিয়নকে আধুনিক ও স্মার্ট নাগরিক ট্র্যাকিংয়ের মাধ্যমে শতভাগ উন্নত করার ১৫টি বিশেষ রূপরেখা</p>
            <div className="h-1 w-16 bg-emerald-500 mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4sm:gap-6">
            {commitments.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 hover:bg-slate-900/50 transition duration-300 flex items-start gap-4">
                <span className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                  {item.id}
                </span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          ওয়ার্ড ভিত্তিক সুনির্দিষ্ট উন্নয়ন ট্র্যাকার
          ───────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-slate-950/20">
        <div className="container mx-auto max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 space-y-2">
              <span className="text-xs font-black text-red-400 uppercase">নির্দিষ্ট পরিকল্পনা</span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">আপনার ওয়ার্ডের সুনির্দিষ্ট উন্নয়ন প্রোফাইল দেখুন</h3>
              <p className="text-xs text-slate-400">ওয়ার্ডটি সিলেক্ট করে আপনার এলাকার জন্য নির্ধারিত বিশেষ বাজেট ও উন্নয়ন রোডম্যাপ তাৎক্ষণিক যাচাই করুন।</p>
            </div>
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">ওয়ার্ড নির্বাচন করুন</label>
                <select 
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full bg-[#0d1527] border border-white/10 p-4 rounded-xl text-sm font-semibold text-white focus:border-emerald-500 outline-none appearance-none"
                >
                  <option value="">নির্বাচন করুন...</option>
                  {[1,2,3,4,5,6,7,8,9].map(w => (
                    <option key={w} value={w}>{w} নং ওয়ার্ড</option>
                  ))}
                </select>
              </div>
              {selectedWard && (
                <div className="p-4 rounded-xl bg-[#012E25]/50 border border-emerald-500/20 text-xs sm:text-sm text-emerald-300 animate-in fade-in duration-200">
                  <p className="font-bold mb-1">✓ {selectedWard} নং ওয়ার্ডের প্রধান মহাপরিকল্পনা:</p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300 text-xs">
                    <li>সিসিটিভি সিকিউরিটি নিশ্চিতকরণ এবং সোলার স্ট্রিট লাইট স্থাপন।</li>
                    <li>প্রধান সংযোগ সড়ক আরসিসি ঢালাইকরণ ও জলাবদ্ধতা নিরসন ড্রেন নির্মাণ।</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          পোস্টার মেকার স্টুডিও সেকশন (EMBEDDED WITH HIGHEST RESPONSIVENESS)
          ───────────────────────────────────────────────────────── */}
      <section id="poster-studio" className="py-20 bg-gradient-to-b from-[#070D19] to-[#040811] px-4">
        <div className="container mx-auto max-w-7xl">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">ডিজিটাল ভলান্টিয়ার স্টুডিও</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">স্বেচ্ছাসেবক পোস্টার তৈরি করুন</h2>
            <div className="h-1 w-12 bg-emerald-500 mx-auto rounded-full mt-2" />
          </div>

          {/* গাইডলাইন স্টেপস */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 mb-8 max-w-5xl mx-auto">
            <h3 className="text-sm sm:text-base font-bold text-emerald-400 mb-6 flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              পোস্টার তৈরি করবেন যেভাবে
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "ধাপ ১", text: "নিজের নাম, ওয়ার্ড ও পেশা লিখুন" },
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

          {/* মূল স্টুডিও ওয়ার্কস্পেস */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
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

                  {/* মোবাইল ফ্রেন্ডলি বাটন এরিয়া */}
                  <div className="w-full max-w-[320px] sm:max-w-[390px] md:max-w-[420px] flex flex-col sm:grid sm:grid-cols-3 gap-2 mt-5">
                    <button onClick={() => handleDownload(1.5)} disabled={isExporting} className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"><Download size={14}/> HD PNG</button>
                    <button onClick={() => handleDownload(2.5)} disabled={isExporting} className="bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"><Award size={14}/> প্রিন্ট কোয়ালিটি</button>
                    <button onClick={handleShare} disabled={isExporting} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"><Share2 size={14}/> শেয়ার করুন</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* অফ-স্ক্রিন এক্সপোর্ট ইঞ্জিন */}
      <div style={{ position: "fixed", left: "-9999px", top: "0", width: "1080px", height: "1350px", zIndex: -100, overflow: "hidden" }}>
        <div ref={downloadPosterRef} style={{ width: "1080px", height: "1350px" }} className="w-[1080px] h-[1350px] bg-[#F4F1E6] relative overflow-hidden text-white flex flex-col justify-between font-sans">
          {renderPosterInnerContent()}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          PREMIUM GALLERY SECTION (ফটো ও ভিডিও গ্যালারি)
          ───────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-20 bg-slate-950/40 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">মিডিয়া গ্যালারি</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">আলোকচিত্রে নির্বাচনী কার্যক্রম</h2>
            <div className="h-1 w-12 bg-emerald-500 mx-auto rounded-full mt-2" />
          </div>

          {/* ফিল্টার বাটনসমূহ */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button 
              onClick={() => setGalleryFilter("all")} 
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${galleryFilter === "all" ? "bg-emerald-700 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}
            >
              সব মিডিয়া
            </button>
            <button 
              onClick={() => setGalleryFilter("image")} 
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${galleryFilter === "image" ? "bg-emerald-700 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}
            >
              <ImageIcon size={14}/> ছবি
            </button>
            <button 
              onClick={() => setGalleryFilter("video")} 
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${galleryFilter === "video" ? "bg-emerald-700 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}
            >
              <Video size={14}/> ভিডিও
            </button>
          </div>

          {/* মিডিয়া গ্রিড */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/5 aspect-[4/3] shadow-lg animate-in fade-in duration-300">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                {item.type === "video" && (
                  <div className="absolute top-4 right-4 h-7 w-7 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-amber-400">
                    <Video size={14} />
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-sm font-bold text-white line-clamp-1">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          PUBLIC FEEDBACK / OPINION FORM (আপনার মতামত আমাদের শক্তি)
          ───────────────────────────────────────────────────────── */}
  <section id="feedback" className="py-20 bg-[#060B15] border-t border-white/5 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">আপনার মতামত আমাদের উন্নয়নের শক্তি</h2>
            <p className="text-slate-400 text-xs sm:text-sm">কোনো সুনির্দিষ্ট অভিযোগ বা ইউনিয়নের পরিবর্তনের জন্য আপনার পরামর্শ সরাসরি আমাদের জানান।</p>
            <div className="h-1 w-12 bg-emerald-500 mx-auto rounded-full mt-2" />
          </div>

          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              
              // ফর্মের ইনপুট ভ্যালুগুলো সংগ্রহ করা
              const name = e.target.elements.name.value;
              const phone = e.target.elements.phone.value;
              const ward = e.target.elements.ward.value;
              const village = e.target.elements.village.value || "উল্লেখ করা হয়নি";
              const message = e.target.elements.message.value;

              // হোয়াটসঅ্যাপের জন্য সুন্দর একটি মেসেজ ফরম্যাট তৈরি করা
              const whatsappMessage = `*নতুন পরামর্শ/মতামত* 📝\n\n` +
                                      `👤 *নাম:* ${name}\n` +
                                      `📞 *মোবাইল:* ${phone}\n` +
                                      `📍 *ওয়ার্ড নম্বর:* ${ward} নং ওয়ার্ড\n` +
                                      `🏡 *গ্রাম/পাড়া:* ${village}\n\n` +
                                      `💬 *পরামর্শ:* \n${message}`;

              // ইউআরএল এনকোড করা (যাতে স্পেস এবং বাংলা লেখা ঠিকঠাক কাজ করে)
              const encodedMessage = encodeURIComponent(whatsappMessage);
              
              // আপনার হোয়াটসঅ্যাপ নম্বর (লিঙ্কের জন্য ফরম্যাট করা)
              const whatsappNumber = "8801714869885"; 
              
              // হোয়াটসঅ্যাপ লিঙ্ক তৈরি এবং নতুন ট্যাবে ওপেন করা
              const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
              window.open(whatsappURL, '_blank');
            }} 
            className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 backdrop-blur-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">আপনার নাম *</label>
                <input required id="name" type="text" placeholder="যেমন: আবদুর রহমান" className="w-full bg-[#0d1527] border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">মোবাইল নম্বর *</label>
                <input required id="phone" type="tel" placeholder="যেমন: 017XXXXXXXX" className="w-full bg-[#0d1527] border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-emerald-500 outline-none" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">ওয়ার্ড নম্বর *</label>
                <select required id="ward" className="w-full bg-[#0d1527] border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-emerald-500 outline-none">
                  {[1,2,3,4,5,6,7,8,9].map(w => (
                    <option key={w} value={w}>{w} নং ওয়ার্ড</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">গ্রাম / পাড়া</label>
                <input id="village" type="text" placeholder="যেমন: পশ্চিম কামারখোলা" className="w-full bg-[#0d1527] border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-emerald-500 outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">আপনার পরামর্শ বা বার্তা *</label>
              <textarea required id="message" rows={4} placeholder="আপনার মূল্যবান পরামর্শটি এখানে বিস্তারিত লিখুন..." className="w-full bg-[#0d1527] border border-white/10 p-3.5 rounded-xl text-sm text-white focus:border-emerald-500 outline-none resize-none"></textarea>
            </div>
            
            <button type="submit" className="w-full bg-[#027A48] hover:bg-emerald-600 text-white font-bold py-4 rounded-xl text-sm shadow-xl transition-all flex items-center justify-center gap-2">
              {/* একটি সুন্দর হোয়াটসঅ্যাপ আইকন অ্যাড করে দেওয়া হলো */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053.953 11.42.953c-5.44 0-9.866 4.372-9.87 9.802 0 1.68.463 3.324 1.34 4.777a.458.458 0 0 1 .067.31L1.933 21.8l3.966-1.019a.46.46 0 0 1 .373.067z"/>
              </svg>
              হোয়াটসঅ্যাপে পরামর্শ পাঠান
            </button>
          </form>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          কেন স্বেচ্ছাসেবক হবেন সেকশন
          ───────────────────────────────────────────────────────── */}
      <section className="bg-[#050b14] border-t border-white/5 py-14 px-4">
        <div className="container mx-auto max-w-7xl">
          <h3 className="text-base sm:text-lg font-bold text-center text-white mb-8">কেন স্বেচ্ছাসেবক হবেন?</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { icon: <Users className="text-emerald-400 mx-auto h-5 w-5" />, text: "উন্নয়নের অংশীদার হোন" },
              { icon: <Award className="text-emerald-400 mx-auto h-5 w-5" />, text: "আপনার পরিচিতি প্রচারের সুযোগ" },
              { icon: <Heart className="text-emerald-400 mx-auto h-5 w-5" />, text: "সমাজ ও মানুষের পাশে থাকুন" },
              { icon: <Shield className="text-emerald-400 mx-auto h-5 w-5" />, text: "নির্বাচনী প্রচারণায় অবদান রাখুন" },
              { icon: <Check className="text-emerald-400 mx-auto h-5 w-5 stroke-[3]" />, text: "গড়ুন উন্নত কামারখোলা" }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center space-y-3 hover:border-white/10 transition">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">{item.icon}</div>
                <p className="text-xs font-bold text-slate-300 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          FOOTER DESIGN
          ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#030912] text-white py-12 border-t border-white/5 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
              <Heart className="text-red-500 h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">আসুন, সবাই মিলে গড়ি উন্নত কামারখোলা</h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">আপনার একটি সমর্থনই পারে বদলে দিতে আগামী দিনের কামারখোলা</p>
            </div>
          </div>
          <div className="md:text-right space-y-1">
            <h3 className="text-xl font-bold tracking-wide text-red-400 italic">সাইফুল ইসলাম বাবু</h3>
            <p className="text-xs text-slate-400 font-semibold opacity-95">চেয়ারম্যান পদপ্রার্থী, ৬ নং কামারখোলা ইউনিয়ন।</p>
            <p className="text-[10px] text-slate-600">© ২০২৬ সাইফুল ইসলাম বাবু ক্যাম্পেইন। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}