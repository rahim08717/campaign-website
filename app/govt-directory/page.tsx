"use client";

import React, { useState } from "react";
import { govtContacts, AdminContact } from "@/lib/govtData";
import { Phone, Search, Building2, ShieldCheck, HelpCircle, Send, CheckCircle2, User, Landmark, PlusCircle } from "lucide-react";

export default function GovtDirectoryPage() {
  // ক্যাটাগরি ও সার্চ স্টেট
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // রিকোয়েস্ট ফর্ম স্টেট
  const [requesterName, setRequesterName] = useState("");
  const [requesterPhone, setRequesterPhone] = useState("");
  const [neededDesignation, setNeededDesignation] = useState("");
  const [neededArea, setNeededArea] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ফিল্টারিং অ্যালগরিদম
  const filteredContacts = govtContacts.filter((contact) => {
    const matchesTab = activeTab === "all" || contact.category === activeTab;
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // ফর্ম হ্যান্ডলার
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requesterName || !requesterPhone || !neededDesignation) {
      alert("অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং প্রয়োজনীয় পদের নামটি লিখুন।");
      return;
    }

    console.log("New Number Request:", { requesterName, requesterPhone, neededDesignation, neededArea });
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setRequesterName("");
      setRequesterPhone("");
      setNeededDesignation("");
      setNeededArea("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* হেডার ব্যানার */}
        <div className="text-center mb-12">
          <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-wider border border-blue-100 dark:border-blue-900/50">
            নাগরিক তথ্য ও সেবা কেন্দ্র
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mt-4 mb-4 tracking-tight">
            প্রশাসনিক হেল্পডেস্ক ও ডিরেক্টরি
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            আইন-শৃঙ্খলা বাহিনী, উপজেলা প্রশাসন এবং স্থানীয় ইউনিয়ন পরিষদের দায়িত্বপ্রাপ্ত কর্মকর্তাদের জরুরি সরকারি নাম্বার নিচে দেওয়া হলো। সরাসরি মোবাইল থেকে ওয়ান-ক্লিকে কল করতে পারেন।
          </p>
        </div>

        {/* সার্চ এবং ইন্টারেক্টিভ ট্যাব কন্ট্রোল */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
          {/* লাইভ সার্চ বার */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="পদবী, কর্মকর্তার নাম অথবা দপ্তরের নাম দিয়ে খুঁজুন (যেমন: UNO, চেয়ারম্যান, ওসি...)"
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 pl-12 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* ক্যাটাগরি ফিল্টার বাটনস (মোবাইল স্ক্রিনে হরাইজনন্টাল স্ক্রোল হবে) */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            {[
              { id: "all", label: "সকল নাম্বার", icon: Landmark },
              { id: "union", label: "ইউনিয়ন পরিষদ", icon: Building2 },
              { id: "upazila", label: "উপজেলা প্রশাসন", icon: Building2 },
              { id: "police", label: "পুলিশ ও আইন-শৃঙ্খলা", icon: ShieldCheck },
              { id: "hotline", label: "সরকারি হটলাইন", icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap snap-tight transition shrink-0 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* নাম্বার ডিরেক্টরি গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/40 transition group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider ${
                      contact.category === "police" ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400" :
                      contact.category === "upazila" ? "bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400" :
                      contact.category === "hotline" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400" :
                      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                    }`}>
                      {contact.category === "union" ? "ইউনিয়ন" : contact.category === "upazila" ? "উপজেলা" : contact.category === "police" ? "পুলিশ" : "হটলাইন"}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{contact.location}</span>
                  </div>
                  <h3 className="text-base font-black text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {contact.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">
                    {contact.designation}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <span className="font-mono text-sm font-bold text-gray-600 dark:text-gray-300">
                    {contact.phone}
                  </span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-blue-950/20 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white rounded-xl text-xs font-black transition shadow-sm"
                  >
                    <Phone size={14} />
                    কল করুন
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
              <HelpCircle className="mx-auto text-gray-400 mb-3" size={40} />
              <p className="text-gray-500 dark:text-gray-400 font-bold">আপনার খোঁজা অনুযায়ী কোনো তথ্য বা অফিসারের নাম্বার পাওয়া যায়নি।</p>
            </div>
          )}
        </div>

       {/* নতুন নাম্বার অনুরোধ ফর্ম (Advanced Number Request Form) */}
        <div className="bg-gradient-to-br from-gray-900 to-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transform translate-x-10 -translate-y-10">
            <Landmark size={300} />
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-2xl text-blue-400">
                <PlusCircle size={28} />
              </div>
              <div>
                <h2 className="text-xl md:text-3xl font-black tracking-tight">নির্দিষ্ট কোনো কর্মকর্তার নাম্বার প্রয়োজন?</h2>
                <p className="text-gray-400 text-xs md:text-sm mt-1">
                  তালিকায় যদি আপনার কাঙ্ক্ষিত চেয়ারম্যান, মেম্বার বা কোনো দপ্তরের নাম্বার না থাকে, তবে নিচে রিকোয়েস্ট পাঠান। আমরা সেটি দ্রুত যুক্ত করে দেব।
                </p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="bg-blue-600/20 border border-blue-500/40 rounded-2xl p-8 text-center text-blue-200 animate-fade-in">
                <CheckCircle2 className="mx-auto text-blue-400 mb-3 animate-bounce" size={48} />
                <h3 className="text-lg font-bold mb-1">আপনার অনুরোধটি সফলভাবে রেজিস্টার করা হয়েছে!</h3>
                <p className="text-xs md:text-sm text-gray-300">আমাদের অ্যাডমিন টিম দ্রুত নাম্বারটি সংগ্রহ করে ডিরেক্টরিতে আপডেট করে দেবে। ধন্যবাদ।</p>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();

                  // হোয়াটসঅ্যাপ বার্তার জন্য ডেটা ফরম্যাট তৈরি করা
                  const whatsappMessage = `*📞 নতুন নাম্বারের জন্য অনুরোধ 📞*\n\n` +
                                          `👤 *অনুরোধকারীর নাম:* ${requesterName || "দেওয়া হয়নি"}\n` +
                                          `📱 *অনুরোধকারীর মোবাইল:* ${requesterPhone || "দেওয়া হয়নি"}\n\n` +
                                          `🎯 *যার নাম্বার প্রয়োজন:* ${neededDesignation || "দেওয়া হয়নি"}\n` +
                                          `📍 *ইউনিয়ন বা এলাকা:* ${neededArea || "দেওয়া হয়নি"}`;

                  // বাংলা টেক্সট এবং স্পেস ইউআরএল ফ্রেন্ডলি করার জন্য এনকোড করা
                  const encodedMessage = encodeURIComponent(whatsappMessage);
                  
                  // আপনার নির্দিষ্ট করা হোয়াটসঅ্যাপ নাম্বার
                  const whatsappNumber = "8801714869885"; 
                  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                  
                  // নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন করা
                  window.open(whatsappURL, '_blank');

                  // পূর্বের এক্সিস্টিং সাবমিট হ্যান্ডলার ট্রিগার করা (যাতে সাকসেস মেসেজ শো করে)
                  if (typeof handleRequestSubmit === 'function') {
                    handleRequestSubmit(e);
                  }
                }} 
                className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ সাকিব হাসান"
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition"
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">আপনার মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    placeholder="যেমন: 017XXXXXXXX"
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition"
                    value={requesterPhone}
                    onChange={(e) => setRequesterPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">যার নাম্বার প্রয়োজন (পদবী বা নাম) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ২নং ওয়ার্ডের মেম্বার / উপজেলা সাব-রেজিস্ট্রার"
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition"
                    value={neededDesignation}
                    onChange={(e) => setNeededDesignation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">ইউনিয়ন পরিষদ বা এলাকার নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ৩নং ডুমুরিয়া ইউনিয়ন"
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition"
                    value={neededArea}
                    onChange={(e) => setNeededArea(e.target.value)}
                  />
                </div>

                <div className="md:col-span-2 text-right mt-2">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-600/20"
                  >
                    {/* হোয়াটসঅ্যাপের ব্র্যান্ড লুক দেওয়ার জন্য একটি SVG আইকন যুক্ত করা হয়েছে */}
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053.953 11.42.953c-5.44 0-9.866 4.372-9.87 9.802 0 1.68.463 3.324 1.34 4.777a.458.458 0 0 1 .067.31L1.933 21.8l3.966-1.019a.46.46 0 0 1 .373.067z"/>
                    </svg>
                    হোয়াটসঅ্যাপে অনুরোধ পাঠান
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}