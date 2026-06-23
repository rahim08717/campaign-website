"use client";
import { useState } from "react";
import { 
  Droplet, ShieldAlert, PhoneCall, HelpCircle, 
  MapPin, Send, CheckCircle2, UserCheck, 
  Search, Phone, Landmark, AlertTriangle 
} from "lucide-react";

// ডেমো ডাটা: ব্লাড ব্যাংক ও ডোনার লিস্ট
const bloodDonorsDemo = [
  { name: "রাকিব হাসান", group: "A+", location: "১ নং ওয়ার্ড, কামারখোলা", phone: "01711000011", status: "Available" },
  { name: "ডাঃ সুমিত রায়", group: "O+", location: "৪ নং ওয়ার্ড, তারাবুনিয়া", phone: "01812000022", status: "Available" },
  { name: "মোঃ জসিম উদ্দিন", group: "B-", location: "৯ নং ওয়ার্ড, দাকোপ", phone: "01913000033", status: "Busy" },
  { name: "মোসাঃ ফাতেমা বেগম", group: "AB+", location: "৬ নং ওয়ার্ড, বাজুয়া", phone: "01514000044", status: "Available" },
];

// ডেমো ডাটা: প্রশাসনিক ও ইউনিয়ন স্তরের হেল্পলাইন
const administrativeContacts = {
  police: [
    { role: "পুলিশ সুপার (SP)", name: "খন্দকার শফিকুর রহমান", phone: "01713920000" },
    { role: "থানার ভারপ্রাপ্ত কর্মকর্তা (OC)", name: "মোহাম্মদ মোস্তফা কামাল", phone: "01713374000" },
    { role: "সাব-ইন্সপেক্টর (SI)", name: "মোঃ রফিকুল ইসলাম", phone: "01725112233" },
    { role: "অ্যাসিস্ট্যান্ট সাব-ইন্সপেক্টর (ASI)", name: "অমিত কুমার দাস", phone: "01911445566" },
  ],
  admin: [
    { role: "উপজেলা নির্বাহী অফিসার (UNO)", name: "মোসাম্মৎ আশরাফুন নাহার", phone: "01713253000" },
    { role: "ইউনিয়ন চেয়ারম্যান (ভারপ্রাপ্ত)", name: "মোঃ আলতাফ হোসেন", phone: "01712556677" },
    { role: "উপজেলা কৃষি অফিসার", name: "কৃষিবিদ মাহফুজুর রহমান", phone: "01819334455" },
  ],
  wardMembers: [
    { role: "১ নং ওয়ার্ড মেম্বার", name: "মোঃ ইউনুস আলী", phone: "01715001122" },
    { role: "২ নং ওয়ার্ড মেম্বার", name: "বাবু প্রসেনজিৎ মন্ডল", phone: "01912334455" },
    { role: "৩ নং ওয়ার্ড মেম্বার", name: "মোঃ শাহজাহান গাজী", phone: "01515667788" },
    { role: "৪ নং ওয়ার্ড মেম্বার", name: "মোসাঃ ছালেহা বেগম (সংরক্ষিত)", phone: "01811990011" },
  ]
};

// ডেমো ডাটা: সরকারি জাতীয় জরুরি সেবা
const govtEmergencyServices = [
  { service: "জাতীয় জরুরি সেবা", number: "999", desc: "পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্সের জন্য যেকোনো সময় ফ্রি কল করুন।" },
  { service: "নারী ও শিশু নির্যাতন প্রতিরোধ", number: "109", desc: "পারিবারিক সহিংসতা বা বাল্যবিয়ে রোধে তাৎক্ষণিক সহায়তা ও আইনি পরামর্শ।" },
  { service: "সরকারি তথ্য ও সেবা", number: "333", desc: "যেকোনো সরকারি সেবা, সামাজিক সমস্যা বা অভিযোগ সরাসরি জানান।" },
  { service: "দুর্নীতি দমন কমিশন (ACC)", number: "106", desc: "যেকোনো দপ্তরে হয়রানি বা দুর্নীতির বিরুদ্ধে সরাসরি অভিযোগ দাখিল।" },
  { service: "কৃষি কল সেন্টার", number: "16123", desc: "ফসল, গবাদিপশু বা মৎস্য চাষের যেকোনো সমস্যায় কৃষি বিশেষজ্ঞদের পরামর্শ।" }
];

export default function CitizenServicesPage() {
  const [activeTab, setActiveTab] = useState("blood"); // blood, report, admin, govt
  const [bloodSearch, setBloodSearch] = useState("");
  
  // ফর্ম স্টেটসমূহ
  const [submitted, setSubmitted] = useState(false);
  const [reportType, setReportType] = useState("problem"); // problem, help

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // ৫ সেকেন্ড পর সাকসেস মেসেজ চলে যাবে
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-16 px-4 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* ক্যাটাগরি সিলেকশন হেডার ট্যাব */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-4xl mx-auto">
        <button 
          onClick={() => setActiveTab("blood")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "blood" ? "bg-red-500 text-white shadow-md shadow-red-500/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          <Droplet className="h-4 w-4" /> রক্ত ব্যাংক ও রিকোয়েস্ট
        </button>
        <button 
          onClick={() => setActiveTab("report")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "report" ? "bg-campaign-green text-white shadow-md shadow-emerald-500/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          <ShieldAlert className="h-4 w-4" /> সমস্যা ও সাহায্য বক্স
        </button>
        <button 
          onClick={() => setActiveTab("admin")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "admin" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          <Landmark className="h-4 w-4" /> প্রশাসনিক ডিরেক্টরি
        </button>
        <button 
          onClick={() => setActiveTab("govt")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "govt" ? "bg-amber-600 text-white shadow-md shadow-amber-600/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          <PhoneCall className="h-4 w-4" /> সরকারি জরুরি হেল্পলাইন
        </button>
      </div>

      {/* ==================== ট্যাব ১: ব্লাড ব্যাংক ও রিকোয়েস্ট ==================== */}
      {activeTab === "blood" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ডোনার লিস্ট সার্চ */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">🟢 জরুরি রক্তদাতা অনুসন্ধান</h2>
                <p className="text-xs text-slate-500 mt-1">কামারখোলা ইউনিয়নের আওতাধীন নিবন্ধিত স্বেচ্ছাসেবক রক্তদাতাগণ</p>
              </div>
              <div className="relative w-full sm:w-48">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="গ্রুপ লিখুন (যেমন: A+)"
                  value={bloodSearch}
                  onChange={(e) => setBloodSearch(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-xs border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bloodDonorsDemo
                .filter(donor => donor.group.toLowerCase().includes(bloodSearch.toLowerCase()))
                .map((donor, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/60 flex justify-between items-center group hover:border-red-500/20 transition-all">
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{donor.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> {donor.location}</p>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold ${donor.status === "Available" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>{donor.status === "Available" ? "রক্ত দিতে প্রস্তুত" : "অক্ষ্যম/ব্যস্ত"}</span>
                    </div>
                    <div className="text-right space-y-2">
                      <span className="inline-flex h-9 w-9 bg-red-500/10 dark:bg-red-500/20 text-red-500 text-sm font-black rounded-xl items-center justify-center shadow-inner">{donor.group}</span>
                      <a href={`tel:${donor.phone}`} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition-all shadow-sm">
                        <Phone className="h-3 w-3" /> কল করুন
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* রক্তের জন্য জরুরি রিকোয়েস্ট ফর্ম */}
          <div className="lg:col-span-5 bg-gradient-to-b from-red-950 to-slate-950 p-6 rounded-3xl text-white border border-red-900/40 shadow-2xl">
            <h3 className="text-lg font-black text-red-400 flex items-center gap-2">🚨 রক্তের জন্য জরুরি পোস্ট করুন</h3>
            <p className="text-xs text-slate-300 mt-1">আপনার রিকোয়েস্টটি সরাসরি ইউনিয়নের সকল ভলান্টিয়ারদের প্যানেলে এবং লাইভ বোর্ডে চলে যাবে।</p>
            
            <form onSubmit={handleFormSubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">রোগীর সমস্যা/স্থান</label>
                <input required type="text" placeholder="উদা: খুলনা সদর হাসপাতাল / সিজার অপারেশন" className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-red-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">রক্তের গ্রুপ</label>
                  <select className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-red-500">
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">রক্তের পরিমাণ (ব্যাগ)</label>
                  <input required type="number" placeholder="১ ব্যাগ" className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-red-500" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">যোগাযোগের মোবাইল নম্বর</label>
                <input required type="tel" placeholder="01XXXXXXXXX" className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-red-500" />
              </div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-xl">
                জরুরি রক্তের রিকোয়েস্ট সাবমিট করুন <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}


      {/* ==================== ট্যাব ২: সমস্যা ও সাহায্য বক্স ==================== */}
      {activeTab === "report" && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">🗳️ নাগরিক অধিকার ও সমস্যা সমাধান পোর্টাল</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">আপনার অভিযোগ বা ব্যক্তিগত সাহায্যের আবেদনটি সরাসরি প্রার্থী সাইফুল ইসলাম বাবুর ভলান্টিয়ার কোর টিমের কাছে চলে যাবে।</p>
            <div className="flex justify-center gap-4 mt-5">
              <button 
                type="button"
                onClick={() => setReportType("problem")}
                className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${reportType === "problem" ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" : "bg-slate-50 dark:bg-slate-950 text-slate-400"}`}
              >
                ⚠️ এলাকার সাধারণ সমস্যা জানান
              </button>
              <button 
                type="button"
                onClick={() => setReportType("help")}
                className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${reportType === "help" ? "bg-emerald-500/10 text-campaign-green border border-emerald-500/20" : "bg-slate-50 dark:bg-slate-950 text-slate-400"}`}
              >
                🤝 ব্যক্তিগত সাহায্যের আবেদন
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-12 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-campaign-green space-y-2">
              <CheckCircle2 className="h-10 w-10 mx-auto" />
              <h4 className="font-black text-lg">আবেদনটি সফলভাবে জমা হয়েছে!</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">খুব শীঘ্রই আপনার দেওয়া মোবাইল নম্বরে আমাদের প্রতিনিধি যোগাযোগ করবেন।</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">আপনার নাম (গোপন রাখা হবে)</label>
                  <input required type="text" placeholder="উদা: আবদুর রহমান" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:ring-2 focus:ring-campaign-green text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">সচল মোবাইল নম্বর</label>
                  <input required type="tel" placeholder="01XXXXXXXXX" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:ring-2 focus:ring-campaign-green text-slate-900 dark:text-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">ওয়ার্ড নম্বর</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:ring-2 focus:ring-campaign-green text-slate-900 dark:text-white">
                    {Array.from({length: 9}).map((_, i) => <option key={i}>{i+1} নং ওয়ার্ড</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">বিষয়ের শিরোনাম</label>
                  <input required type="text" placeholder={reportType === "problem" ? "উদা: ভাঙা কালভার্ট সংস্কার" : "উদা: চিকিৎসা বা পড়াশোনার জন্য অনুদান"} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:ring-2 focus:ring-campaign-green text-slate-900 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">বিস্তারিত বিবরণ</label>
                <textarea required rows={4} placeholder="এখানে আপনার সমস্যাটি পরিষ্কারভাবে বিস্তারিত লিখুন..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:ring-2 focus:ring-campaign-green text-slate-900 dark:text-white resize-none" />
              </div>
              <button type="submit" className="w-full bg-campaign-green hover:bg-emerald-600 text-white font-black py-3.5 rounded-xl text-xs shadow-lg flex items-center justify-center gap-2 transition-all">
                তথ্য জমা দিন <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      )}


      {/* ==================== ট্যাব ৩: প্রশাসনিক ডিরেক্টরি ==================== */}
      {activeTab === "admin" && (
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">📞 উপজেলা ও ইউনিয়ন প্রশাসনিক ডিরেক্টরি</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">যেকোনো আইনি, নিরাপত্তা বা প্রশাসনিক প্রয়োজনে সরাসরি সংশ্লিষ্ট কর্মকর্তাদের সাথে এক ক্লিকে যোগাযোগ করুন।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* আইন-শৃঙ্খলা বাহিনী কন্টাক্ট */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="text-md font-black text-indigo-600 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-1.5">🚓 পুলিশ প্রশাসন (থানা)</h3>
              <div className="space-y-3">
                {administrativeContacts.police.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl flex justify-between items-center border border-slate-100 dark:border-slate-900">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{item.role}</p>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">{item.name}</h4>
                    </div>
                    <a href={`tel:${item.phone}`} className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md transition-all"><Phone className="h-3.5 w-3.5" /></a>
                  </div>
                ))}
              </div>
            </div>

            {/* সরকারি ও উপজেলা প্রশাসন কন্টাক্ট */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="text-md font-black text-emerald-600 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-1.5">🏢 উপজেলা ও সরকারি দপ্তর</h3>
              <div className="space-y-3">
                {administrativeContacts.admin.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl flex justify-between items-center border border-slate-100 dark:border-slate-900">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{item.role}</p>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">{item.name}</h4>
                    </div>
                    <a href={`tel:${item.phone}`} className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-md transition-all"><Phone className="h-3.5 w-3.5" /></a>
                  </div>
                ))}
              </div>
            </div>

            {/* ওয়ার্ড মেম্বারদের কন্টাক্ট */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="text-md font-black text-amber-600 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-1.5">👥 ইউনিয়ন ওয়ার্ড মেম্বারবৃন্দ</h3>
              <div className="space-y-3">
                {administrativeContacts.wardMembers.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl flex justify-between items-center border border-slate-100 dark:border-slate-900">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{item.role}</p>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200">{item.name}</h4>
                    </div>
                    <a href={`tel:${item.phone}`} className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg shadow-md transition-all"><Phone className="h-3.5 w-3.5" /></a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ==================== ট্যাব ৪: সরকারি জরুরি হেল্পলাইন ==================== */}
      {activeTab === "govt" && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">🇧🇩 গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের জাতীয় জরুরি সেবাসমূহ</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">যেকোনো মোবাইল অপারেটর থেকে সম্পূর্ণ টোল-ফ্রি (বিনামূল্যে) ২৪ ঘণ্টা এই নম্বরগুলোতে কল করতে পারবেন।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {govtEmergencyServices.map((govt, idx) => (
              <div key={idx} className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex gap-4 items-start shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 text-slate-100 dark:text-slate-800/20 font-black text-7xl translate-y-4 translate-x-2 select-none group-hover:scale-110 transition-transform">{govt.number}</div>
                <div className="p-3.5 bg-amber-500/10 text-amber-600 rounded-2xl shrink-0"><AlertTriangle className="h-5 w-5" /></div>
                <div className="space-y-1 relative z-10">
                  <h4 className="font-black text-md text-slate-900 dark:text-white flex items-center gap-2">
                    {govt.service} 
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">{govt.desc}</p>
                  <div className="pt-2">
                    <a href={`tel:${govt.number}`} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all">
                      <Phone className="h-3.5 w-3.5" /> ডায়াল করুন: {govt.number}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}