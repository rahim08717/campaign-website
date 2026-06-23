"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, Phone, UserPlus, ShieldAlert, MapPin, Droplets, Users } from "lucide-react";

// ডামি বা স্যাম্পল ডাটা (পরবর্তীতে ডাটাবেজ কানেক্ট করা যাবে)
const initialDonors = [
  { id: 1, name: "আব্দুর রহমান", group: "O+", ward: "৩ নং ওয়ার্ড", village: "কামারখোলা গ্রাম", phone: "01711XXXXXX", religion: "Muslim" },
  { id: 2, name: "বিপ্লব কুমার দাস", group: "A+", ward: "৫ নং ওয়ার্ড", village: "হরিশপুর", phone: "01812XXXXXX", religion: "Hindu" },
  { id: 3, name: "মোঃ রফিকুল ইসলাম", group: "B+", ward: "১ নং ওয়ার্ড", village: "পূর্বপাড়া", phone: "01913XXXXXX", religion: "Muslim" },
  { id: 4, name: "অনিল কুমার সরকার", group: "AB+", ward: "৯ নং ওয়ার্ড", village: "মাঝপাড়া", phone: "01514XXXXXX", religion: "Hindu" },
];

const wards = ["১ নং ওয়ার্ড", "২ নং ওয়ার্ড", "৩ নং ওয়ার্ড", "৪ নং ওয়ার্ড", "৫ নং ওয়ার্ড", "৬ নং ওয়ার্ড", "৭ নং ওয়ার্ড", "৮ নং ওয়ার্ড", "৯ নং ওয়ার্ড"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function EmergencyPage() {
  const [donors, setDonors] = useState(initialDonors);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedWard, setSelectedWard] = useState("All");
  const [showForm, setShowForm] = useState(false);

  // নতুন ডোনার রেজিস্ট্রেশন স্টেট
  const [formData, setFormData] = useState({ name: "", group: "A+", ward: "১ নং ওয়ার্ড", village: "", phone: "" });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.village) {
      alert("অনুগ্রহ করে সব তথ্য সঠিকভাবে দিন।");
      return;
    }
    const newDonor = {
      id: donors.length + 1,
      ...formData,
      religion: "General"
    };
    setDonors([newDonor, ...donors]);
    setShowForm(false);
    setFormData({ name: "", group: "A+", ward: "১ নং ওয়ার্ড", village: "", phone: "" });
    alert("সাইফুল ইসলাম বাবু ভাইয়ের পক্ষ থেকে আপনাকে ধন্যবাদ! রক্তদাতা হিসেবে আপনার নাম নিবন্ধিত হয়েছে।");
  };

  const filteredDonors = donors.filter(donor => {
    const matchGroup = selectedGroup === "All" || donor.group === selectedGroup;
    const matchWard = selectedWard === "All" || donor.ward === selectedWard;
    return matchGroup && matchWard;
  });

  return (
    <div className="relative w-full overflow-hidden min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Background Glows */}
      <div className="stripe-glow bg-campaign-green top-[-5%] left-[-10%] w-[400px] h-[400px]" />
      <div className="stripe-glow bg-campaign-red top-[60%] right-[-10%] w-[500px] h-[500px]" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-campaign-red font-black tracking-widest text-xs uppercase bg-campaign-red/10 px-3.5 py-1.5 rounded-full border border-campaign-red/20 inline-flex items-center gap-1.5">
          <Droplets className="h-4 w-4 text-campaign-red animate-pulse" /> কামারখোলা স্পেশাল হেল্পডেস্ক
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-4 leading-tight">
          লাইভ রক্তদান ও <span className="bg-gradient-to-r from-campaign-red to-orange-500 bg-clip-text text-transparent">জরুরি সেবা বক্স</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 font-medium">
          "বিপদে আপদে সবার আগে, সাইফুল ইসলাম বাবু আছে আপনার পাশে।" কামারখোলার যেকোনো রক্তদাতার খোঁজ পেতে বা নিজের নাম তালিকায় যুক্ত করতে নিচে ভিজিট করুন।
        </p>
        <div className="h-1.5 w-20 bg-campaign-green mx-auto mt-4 rounded-full" />
      </div>

      {/* EMERGENCY NUMBERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-red-100 dark:border-red-950/30 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-xl text-campaign-red"><ShieldAlert className="h-6 w-6" /></div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">জরুরি অ্যাম্বুলেন্স</h3>
            <p className="text-lg font-black text-campaign-red mt-0.5">০১৭১২-XXXXXX</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-campaign-green"><Heart className="h-6 w-6" /></div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">ইউনিয়ন ফ্রি মেডিকেল টিম</h3>
            <p className="text-lg font-black text-campaign-green mt-0.5">০১৮২৩-XXXXXX</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-600"><Users className="h-6 w-6" /></div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">বাবু ভাই ক্যাম্পেইন হেল্পলাইন</h3>
            <p className="text-lg font-black text-blue-600 mt-0.5">০১৯৩৪-XXXXXX</p>
          </div>
        </div>
      </div>

      {/* BLOOD DONATION SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Droplets className="h-6 w-6 text-campaign-red" /> রক্তদাতাদের লাইভ ডিরেক্টরি
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">কামারখোলা ইউনিয়নের হিন্দু-মুসলিম সকল রক্তযোদ্ধাদের তালিকা</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center gap-2 bg-campaign-green hover:bg-campaign-green/95 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm shadow-md"
          >
            <UserPlus className="h-4 w-4" /> রক্তদাতা হিসেবে নাম লেখান
          </button>
        </div>

        {/* REGISTRATION MODAL/FORM */}
        <AnimatePresence>
          {showForm && (
            <motion.form 
              onSubmit={handleRegister}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 grid grid-cols-1 sm:grid-cols-12 gap-4 overflow-hidden"
            >
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">আপনার নাম (বাংলায়)</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-sm" placeholder="উদা: মোঃ হাবিব" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">রক্তের গ্রুপ</label>
                <select value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-sm">
                  {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">ওয়ার্ড নম্বর</label>
                <select value={formData.ward} onChange={e => setFormData({...formData, ward: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-sm">
                  {wards.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">গ্রামের নাম</label>
                <input type="text" value={formData.village} onChange={e => setFormData({...formData, village: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-sm" placeholder="উদা: হরিশপুর" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">মোবাইল নম্বর</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-sm" placeholder="017XXXXXXXX" />
              </div>
              <div className="sm:col-span-12 flex justify-end pt-2">
                <button type="submit" className="bg-campaign-red text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-sm hover:bg-campaign-red/95 transition-all">নিবন্ধন সম্পন্ন করুন</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-4 mb-8 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><Search className="h-4 w-4" /> ফিল্টার করুন:</div>
          <select 
            value={selectedGroup} 
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-medium"
          >
            <option value="All">সব রক্তের গ্রুপ</option>
            {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          <select 
            value={selectedWard} 
            onChange={(e) => setSelectedWard(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-medium"
          >
            <option value="All">সব ওয়ার্ড</option>
            {wards.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>

        {/* DONOR CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <motion.div 
                  key={donor.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-100 dark:border-slate-800 relative group overflow-hidden"
                >
                  {/* Blood Group Watermark Tag */}
                  <div className="absolute right-4 top-4 bg-red-500/10 text-campaign-red font-black text-sm px-2.5 py-1 rounded-md">
                    {donor.group}
                  </div>
                  
                  <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                    {donor.name}
                  </h4>
                  
                  <div className="space-y-1 mt-3 text-xs text-slate-500 dark:text-slate-400">
                    <p className="flex items-center gap-1"><MapPin className="h-3 w-3 text-campaign-green" /> {donor.ward}, {donor.village}</p>
                  </div>

                  <a 
                    href={`tel:${donor.phone}`}
                    className="w-full mt-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-campaign-red dark:hover:border-campaign-red hover:text-campaign-red font-bold py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Phone className="h-3 w-3" /> কল করুন
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-sm text-slate-400 font-medium">
                দুঃখিত, এই গ্রুপ বা ওয়ার্ডের কোনো রক্তদাতা এই মুহূর্তে তালিকায় পাওয়া যায়নি।
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}