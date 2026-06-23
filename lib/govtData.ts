// lib/govtData.ts

export interface AdminContact {
  id: number;
  name: string;
  designation: string;
  phone: string;
  category: "union" | "upazila" | "police" | "hotline";
  location: string;
}

export const govtContacts: AdminContact[] = [
  // ইউনিয়ন পরিষদ (Union Parishad)
  { id: 1, name: "ইউনিয়ন চেয়ারম্যান", designation: "ইউনিয়ন চেয়ারম্যান", phone: "01711223344", category: "union", location: "১নং ইউনিয়ন পরিষদ" },
  { id: 2, name: "উনিয়ন সচিব", designation: "ইউনিয়ন সচিব (Secretary)", phone: "01911556677", category: "union", location: "১নং ইউনিয়ন পরিষদ" },
  { id: 3, name: "মোঃ রফিকুল ইসলাম", designation: "ইউপি সদস্য (১নং ওয়ার্ড)", phone: "01812345678", category: "union", location: "১নং ওয়ার্ড" },
  { id: 4, name: "মোছাঃ আছিয়া বেগম", designation: "মহিলা ইউপি সদস্য (১,২,৩ নং ওয়ার্ড)", phone: "01715987654", category: "union", location: "সংরক্ষিত আসন" },
  { id: 5, name: "মোঃ জহির উদ্দিন", designation: "দফাদার (Dafadar)", phone: "01673456123", category: "union", location: "ইউনিয়ন পরিষদ" },
  { id: 6, name: "রমজান আলী", designation: "চৌকিদার (Chokidar)", phone: "01554123789", category: "union", location: "৩নং ওয়ার্ড" },

  // উপজেলা ও জেলা প্রশাসন (Upazila & District Administration)
  { id: 21, name: "নাসরিন আক্তার", designation: "উপজেলা নির্বাহী অফিসার (UNO)", phone: "01713552211", category: "upazila", location: "উপজেলা প্রশাসন" },
  { id: 22, name: "ডাঃ সুমিত কুমার", designation: "উপজেলা কৃষি অফিসার", phone: "01819887766", category: "upazila", location: "কৃষি সম্প্রসারণ অধিদপ্তর" },
  { id: 23, name: "মোঃ তানভীর রহমান", designation: "সহকারী কমিশনার (ভূমি) / AC Land", phone: "01714001122", category: "upazila", location: "ভূমি অফিস" },
  { id: 24, name: "মোঃ কামরুল হাসান", designation: "উপজেলা মৎস্য কর্মকর্তা", phone: "01912445566", category: "upazila", location: "মৎস্য অধিদপ্তর" },

  // আইন-শৃঙ্খলা বাহিনী (Police & Law Enforcement)
  { id: 41, name: "মোঃ সাজ্জাদুর রহমান", designation: "পুলিশ সুপার (SP)", phone: "01713373000", category: "police", location: "জেলা পুলিশ হেডকোয়ার্টার্স" },
  { id: 42, name: "খান গোলাম মোস্তফা", designation: "অফিসার ইন চার্জ (OC)", phone: "01713373100", category: "police", location: "থানা মডেল মডেল থানা" },
  { id: 43, name: "মোঃ আসাদুজ্জামান", designation: "ইন্সপেক্টর (তদন্ত) / Daroga", phone: "01713373101", category: "police", location: "থানা পুলিশ" },
  { id: 44, name: "মোঃ মেহেদী হাসান", designation: "সাব-ইন্সপেক্টর (SI)", phone: "01671239458", category: "police", location: "ডিউটি পোস্ট" },
  { id: 45, name: "২৪/৭ ইমারজেন্সি ডেস্ক", designation: "ডিউটি অফিসার (Duty Officer)", phone: "01713373105", category: "police", location: "থানা কন্ট্রোল রুম" },

  // জাতীয় জরুরি হটলাইন (National Hotlines)
  { id: 101, name: "জাতীয় জরুরি সেবা", designation: "ফায়ার সার্ভিস, পুলিশ ও অ্যাম্বুলেন্স", phone: "999", category: "hotline", location: "বাংলাদেশ সরকার" },
  { id: 102, name: "সরকারি তথ্য ও সেবা", designation: "নাগরিক সেবা ও তথ্য হেল্পলাইন", phone: "333", category: "hotline", location: "বাংলাদেশ সরকার" },
  { id: 103, name: "নারী ও শিশু নির্যাতন প্রতিরোধ", designation: "সাহায্য ও আইনি সহায়তা সেল", phone: "109", category: "hotline", location: "মহিলা ও শিশু বিষয়ক মন্ত্রণালয়" },
  { id: 104, name: "জাতীয় পরিচয়পত্র সেবা", designation: "NID কার্ড সংক্রান্ত তথ্য", phone: "105", category: "hotline", location: "নির্বাচন কমিশন" }
];