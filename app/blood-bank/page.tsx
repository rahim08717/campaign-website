"use client";

import React, { useState } from "react";
import { bloodDonors, Donor } from "@/lib/bloodData";
import { Phone, Search, AlertCircle, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function BloodBankPage() {
  // ফিল্টারিং স্টেট
  const [searchGroup, setSearchGroup] = useState<string>("ALL");
  const [searchLocation, setSearchLocation] = useState<string>("");

  // ফর্ম স্টেটসমূহ
  const [patientName, setPatientName] = useState("");
  const [requiredGroup, setRequiredGroup] = useState("");
  const [hospital, setHospital] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // সার্চিং ও ফিল্টারিং লজিক
  const filteredDonors = bloodDonors.filter((donor) => {
    const matchesGroup = searchGroup === "ALL" || donor.group === searchGroup;
    const matchesLocation =
      donor.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
      donor.name.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesGroup && matchesLocation;
  });

  // ফর্ম সাবমিশন হ্যান্ডলার
  const handleEmergencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !requiredGroup || !hospital || !contactPhone) {
      alert("অনুগ্রহ করে ফর্মের সবকটি ঘর পূরণ করুন।");
      return;
    }
    
    // এখানে আপনার ব্যাকএন্ড এপিআই বা ডাটাবেস সাবমিশন লজিক যোগ করতে পারেন
    console.log("Emergency Request Submitted:", { patientName, requiredGroup, hospital, contactPhone });
    
    setFormSubmitted(true);
    // ৩ সেকেন্ড পর সাকসেস মেসেজ হাইড করা ও ফর্ম ক্লিয়ার করার জন্য
    setTimeout(() => {
      setFormSubmitted(false);
      setPatientName("");
      setRequiredGroup("");
      setHospital("");
      setContactPhone("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* টপ হেডার */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-red-600 dark:text-red-500 mb-3">
            রক্ত ব্যাংক ও ডাটাবেস ({bloodDonors.length}+ রক্তদাতা)
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            আপনার প্রয়োজনীয় রক্তের গ্রুপটি সিলেক্ট করুন অথবা নাম বা এলাকা দিয়ে সার্চ করুন। কাঙ্ক্ষিত রক্তদাতা খুঁজে না পেলে নিচে দেওয়া ইমারজেন্সি ফর্মটি পূরণ করুন।
          </p>
        </div>

        {/* সার্চ ফিল্টার প্যানেল */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">রক্তের গ্রুপ ফিল্টার</label>
            <select
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-gray-100"
              value={searchGroup}
              onChange={(e) => setSearchGroup(e.target.value)}
            >
              <option value="ALL">সকল গ্রুপ (ALL)</option>
              <option value="A+">A+ (এ পজিটিভ)</option>
              <option value="A-">A- (এ ネগেটিভ)</option>
              <option value="B+">B+ (বি পজিটিভ)</option>
              <option value="B-">B- (বি নেগেটিভ)</option>
              <option value="O+">O+ (ও পজিটিভ)</option>
              <option value="O-">O- (ও নেগেটিভ)</option>
              <option value="AB+">AB+ (এবি পজিটিভ)</option>
              <option value="AB-">AB- (এবি নেগেটিভ)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">নাম অথবা এলাকা দিয়ে খুঁজুন</label>
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="যেমন: ঢাকা, খুলনা, মিরপুর অথবা রক্তদাতার নাম..."
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-gray-100"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* রক্তদাতার তালিকা গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex justify-between items-center hover:border-red-200 dark:hover:border-red-900/50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center border border-red-100 dark:border-red-900/50">
                    <span className="text-red-600 dark:text-red-400 font-black text-sm md:text-base">{donor.group}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm md:text-base line-clamp-1">{donor.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{donor.location}</p>
                  </div>
                </div>

                <a
                  href={`tel:${donor.phone}`}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-green-50 hover:bg-green-100 text-green-600 dark:bg-green-950/20 dark:hover:bg-green-950/40 transition shrink-0"
                  title="কল করুন"
                >
                  <Phone size={16} />
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
              <AlertCircle className="mx-auto text-gray-400 mb-3" size={36} />
              <p className="text-gray-500 dark:text-gray-400 font-medium">এই ফিল্টারে কোনো রক্তদাতার তথ্য পাওয়া যায়নি।</p>
            </div>
          )}
        </div>

        {/* ইমারজেন্সি কন্টাক্ট ফর্ম সেকশন */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 dark:bg-red-950/40 rounded-xl text-red-600 dark:text-red-400">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-800 dark:text-gray-100">
                পছন্দমতো রক্তদাতা পাননি? জরুরি রিকোয়েস্ট পাঠান
              </h2>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                তালিকায় কাউকে না পেলে বা জরুরি রক্তের প্রয়োজন হলে ফর্মটি সাবমিট করুন। আমাদের ভলান্টিয়াররা আপনার সাথে যোগাযোগ করবে।
              </p>
            </div>
          </div>

          {formSubmitted ? (
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-xl p-8 text-center text-green-800 dark:text-green-300 animate-fade-in">
              <CheckCircle2 className="mx-auto text-green-600 dark:text-green-400 mb-3" size={48} />
              <h3 className="text-lg font-bold mb-1">আপনার রিকোয়েস্টটি সফলভাবে পাঠানো হয়েছে!</h3>
              <p className="text-sm opacity-90">আমাদের ভলান্টিয়ার টিম দ্রুত আপনার দেওয়া নাম্বারে যোগাযোগ করছে। একটু অপেক্ষা করুন।</p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();

                // হোয়াটসঅ্যাপ বার্তার জন্য ডাটা ফরম্যাট তৈরি করা
                const whatsappMessage = `*🚨 জরুরি রক্তের রিকোয়েস্ট 🚨*\n\n` +
                                        `👤 *রোগীর নাম:* ${patientName || "দেওয়া হয়নি"}\n` +
                                        `🩸 *রক্তের গ্রুপ:* ${requiredGroup || "সিলেক্ট করা হয়নি"}\n` +
                                        `🏥 *হাসপাতাল ও এলাকা:* ${hospital || "দেওয়া হয়নি"}\n` +
                                        `📞 *যোগাযোগের নাম্বার:* ${contactPhone || "দেওয়া হয়নি"}`;

                // বাংলা কন্টেন্ট এবং স্পেস ইউআরএল ফ্রেন্ডলি করার জন্য এনকোড করা
                const encodedMessage = encodeURIComponent(whatsappMessage);
                
                // আপনার নির্দিষ্ট করা হোয়াটসঅ্যাপ নাম্বার
                const whatsappNumber = "8801714869885"; 
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                
                // নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন করা
                window.open(whatsappURL, '_blank');

                // পূর্বের এক্সিস্টিং সাবমিট হ্যান্ডলার ট্রিগার করা (যাতে সাকসেস মেসেজ শো করে)
                if (typeof handleEmergencySubmit === 'function') {
                  handleEmergencySubmit(e);
                }
              }} 
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">রোগীর নাম</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ করিম আলী"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-gray-100"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">প্রয়োজনীয় ব্লাড গ্রুপ</label>
                <select
                  required
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-gray-100"
                  value={requiredGroup}
                  onChange={(e) => setRequiredGroup(e.target.value)}
                >
                  <option value="">গ্রুপ সিলেক্ট করুন</option>
                  <option value="A+">A+ (এ পজিটিভ)</option>
                  <option value="A-">A- (এ নেগেティブ)</option>
                  <option value="B+">B+ (বি পজিটিভ)</option>
                  <option value="B-">B- (বি নেগেティブ)</option>
                  <option value="O+">O+ (ও পজিটিভ)</option>
                  <option value="O-">O- (ও নেগেティブ)</option>
                  <option value="AB+">AB+ (এবি পজিটিভ)</option>
                  <option value="AB-">AB- (এবি নেগেティブ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">হাসপাতাল ও এলাকা</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: খুলনা মেডিকেল কলেজ হাসপাতাল, খুলনা"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-gray-100"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">যোগাযোগের মোবাইল নাম্বার</label>
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 017XXXXXXXX"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-gray-100"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>

              <div className="md:col-span-2 text-right mt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  {/* হোয়াটসঅ্যাপের মানানসই লুক দেওয়ার জন্য আইকন সহ টেক্সট */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053.953 11.42.953c-5.44 0-9.866 4.372-9.87 9.802 0 1.68.463 3.324 1.34 4.777a.458.458 0 0 1 .067.31L1.933 21.8l3.966-1.019a.46.46 0 0 1 .373.067z"/>
                  </svg>
                  হোয়াটসঅ্যাপে জরুরি রিকোয়েস্ট পাঠান
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}