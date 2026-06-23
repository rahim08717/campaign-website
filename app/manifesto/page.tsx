"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { 
  Shield, UserCheck, Users, Milestone, GraduationCap, Sprout, 
  BookOpen, Heart, Target, Compass, Search, Filter, MessageSquare, 
  MapPin, Phone, Send, CheckCircle2, AlertTriangle, UploadCloud, 
  ArrowUp, Sparkles, Sliders, Check, HelpCircle, Eye, EyeOff, ClipboardCheck
} from "lucide-react";

// --- TIGHT ZOD VALIDATION SCHEMA ---
const formSchema = z.object({
  fullName: z.string().min(3, "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"),
  mobileNumber: z.string().regex(/^01[3-9]\d{8}$/, "সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন"),
  wardNumber: z.string().min(1, "ওয়ার্ড নম্বর নির্বাচন করুন"),
  villageName: z.string().min(2, "গ্রামের নাম লিখুন"),
  occupation: z.string().min(2, "পেশা লিখুন"),
  age: z.string().refine((val) => {
    const num = parseInt(val, 10);
    return num >= 18 && num <= 110;
  }, { message: "বয়স অবশ্যই ১৮ থেকে ১১০ এর মধ্যে হতে হবে" }),
  email: z.string().email("সঠিক ইমেইল ঠিকানা দিন").optional().or(z.literal("")),
  category: z.string().min(1, "সমস্যার ক্যাটাগরি নির্বাচন করুন"),
  description: z.string().min(15, "বিবরণ কমপক্ষে ১৫ অক্ষরের হতে হবে"),
  suggestion: z.string().min(15, "পরামর্শ কমপক্ষে ১৫ অক্ষরের হতে হবে"),
  priority: z.enum(["High", "Medium", "Low"], { required_error: "অগ্রাধিকার লেভেল সিলেক্ট করুন" }),
  consent: z.boolean().refine((val) => val === true, "ক্যাম্পেইন টিমের পর্যালোচনার জন্য সম্মতি আবশ্যক"),
});

type FormData = z.infer<typeof formSchema>;

// --- INTERACTIVE MANIFESTO DATA ---
const manifestoItems = [
  { id: 1, category: "social", title: "মাদকমুক্ত কামারখোলা ইউনিয়ন গঠন", icon: Shield, summary: "মাদক ব্যবসার হটস্পট নির্মূল এবং যুবসমাজকে রক্ষা করা।", details: "আইনশৃঙ্খলা বাহিনীর সাথে সমন্বয় করে মাদক কারবারীদের বিরুদ্ধে কঠোর ব্যবস্থা গ্রহণ করা হবে। প্রতিটি ওয়ার্ডে 'মাদকবিরোধী সামাজিক কমিটি' গঠন করে স্কুল-কলেজে সচেতনতামূলক ক্যাম্পেইন পরিচালনা করা হবে।", impact: "১০০% নিরাপদ ও মাদকমুক্ত যুবসমাজ গড়ে তোলা।", timeline: "প্রথম ৬ মাস (অগ্রাধিকার)", progress: 0 },
  { id: 2, category: "social", title: "জুয়ামুক্ত ও অবক্ষয়মুক্ত সমাজ", icon: UserCheck, summary: "অনলাইন ও অফলাইন জুয়ার আসর সম্পূর্ণ বন্ধ করা।", details: "জুয়ার আসর ও ক্ষতিকর অনলাইন গ্যাম্বলিং-এর বিরুদ্ধে শক্তিশালী সামাজিক আন্দোলন গড়ে তোলা হবে। যুব সমাজকে ধ্বংসের হাত থেকে বাঁচাতে ওয়ার্ডভিত্তিক যুব উন্নয়ন ক্লাব গঠন করা হবে।", impact: "পারিবারিক শৃঙ্খলা ও সামাজিক শান্তি পুনরুদ্ধার।", timeline: "প্রথম ৩ মাস", progress: 0 },
  { id: 3, category: "infrastructure", title: "টেকসই নদীভাঙন প্রতিরোধ কর্মসূচি", icon: Milestone, summary: "জয়নগর, ভিটাভাঙ্গা ও বটবুনিয়া রক্ষা প্রকল্প।", details: "ভাঙনপ্রবণ এলাকার জন্য দীর্ঘমেয়াদি মাস্টারপ্ল্যান প্রণয়ন করা হবে। টেকসই ব্লক বর্ডার বা বেড়িবাঁধের জন্য সংশ্লিষ্ট মন্ত্রণালয়ে জোরালো দাবি উত্থাপন এবং প্রকল্প বাস্তবায়নে শতভাগ স্বচ্ছতা ও সিটিজেন ওভারসাইট নিশ্চিত করা হবে।", impact: "হাজারো পরিবারের ভিটেমাটি রক্ষা ও স্থায়ী সমাধান।", timeline: "১ম বছর থেকে চলমান", progress: 0 },
  { id: 4, category: "technology", title: "ডিজিটাল ইউনিয়ন পরিষদ ও নাগরিক সেবা", icon: Sparkles, summary: "অনলাইনে জন্ম-মৃত্যু নিবন্ধন ও সকল নাগরিক সনদ প্রাপ্তি।", details: "ইউনিয়ন তথ্যসেবা কেন্দ্রকে সম্পূর্ণ আধুনিকায়ন করা হবে। ডিজিটাল নাগরিক সহায়তা ডেস্ক এবং অভিযোগ ব্যবস্থাপনা চালুর মাধ্যমে ঘরে বসেই SMS নোটিফিকেশনে সেবার ট্র্যাকিং করা যাবে। দালালি উচ্ছেদ করা হবে।", impact: "দুর্নীতিমুক্ত, দ্রুত ও হয়রানিমুক্ত সরকারি সেবা নিশ্চিতকরণ।", timeline: "প্রথম ৯ মাস", progress: 0 },
  { id: 5, category: "education", title: "শিক্ষা ও আধুনিক তথ্যপ্রযুক্তি উন্নয়ন", icon: BookOpen, summary: "প্রতিটি হাই স্কুলে কম্পিউটার ল্যাব ও আইসিটি ট্রেনিং।", details: "মাধ্যমিক স্তরের সকল শিক্ষাপ্রতিষ্ঠানে শেখ রাসেল ডিজিটাল ল্যাব কার্যকর করা হবে। দরিদ্র ও মেধাবী শিক্ষার্থীদের জন্য স্থায়ী 'শিক্ষা সহায়তা তহবিল' গঠন এবং ক্যারিয়ার গাইডিং সেমিনার আয়োজন করা হবে।", impact: "তৃণমূলের শিক্ষার্থীদের বৈশ্বিক প্রতিযোগিতায় যোগ্য করে তোলা।", timeline: "২য় বছর", progress: 0 },
  { id: 6, category: "employment", title: "যুব ও নারী কর্মসংস্থান কর্মসূচি", icon: GraduationCap, summary: "ফ্রি ফ্রিল্যান্সিং ও কারিগরি দক্ষতা উন্নয়ন প্রশিক্ষণ।", details: "বিভিন্ন NGO ও সরকারি কারিগরি প্রতিষ্ঠানের সহায়তায় প্রশিক্ষণ কেন্দ্র স্থাপন করা হবে। যুবকদের আইটি/ফ্রিল্যান্সিং এবং নারীদের সেলাই, হস্তশিল্প ও ক্ষুদ্র উদ্যোক্তা তৈরির জন্য বিশেষ ফান্ডিং ট্রাস্ট গঠন করা হবে।", impact: "বেকারত্ব দূরীকরণ এবং স্বনির্ভর অর্থনৈতিক কাঠামো তৈরি।", timeline: "১ম বছর থেকে চলমান", progress: 0 },
  { id: 7, category: "health", title: "আধুনিক জরুরি স্বাস্থ্যসেবা ও চিকিৎসা", icon: Heart, summary: "২৪ ঘণ্টা ফ্রি অ্যাম্বুলেন্স ও নিয়মিত মেডিকেল ক্যাম্প।", details: "বেসরকারি ও সরকারি যৌথ উদ্যোগে একটি আধুনিক হাসপাতাল বা ডেডিকেটেড ম্যাটারনিটি ক্লিনিক প্রতিষ্ঠার জোরালো উদ্যোগ। মা ও শিশুর সুরক্ষায় প্রতি মাসে বিনামূল্যে ঔষধসহ ফ্রি হেলথ ক্যাম্প পরিচালনা করা হবে।", impact: "জরুরি মুহূর্তে ইউনিয়নের প্রান্তিক মানুষের চিকিৎসা সুবিধা নিশ্চিত।", timeline: "১ম বছর", progress: 0 },
  { id: 8, category: "water", title: "বিশুদ্ধ সুপেয় পানি ও উন্নত স্যানিটেশন", icon: Sprout, summary: "লবণাক্ততা ও আর্সেনিকমুক্ত গভীর নলকূপ স্থাপন।", details: "সুপেয় পানির অভাব দূর করতে প্রতিটি পাড়ায় আর্টেসিয়ান ও গভীর টিউবওয়েল স্থাপন নিশ্চিত করা হবে। শতভাগ স্বাস্থ্যসম্মত স্যানিটেশন ব্যবস্থার আওতায় দরিদ্র পরিবারগুলোকে সরকারি স্যানিটারি কিট সরবরাহ করা হবে।", impact: "পানিবাহিত রোগ থেকে মুক্তি ও জনস্বাস্থ্য রক্ষা।", timeline: "১ম বছর", progress: 0 },
  { id: 9, category: "social", title: "ধর্মীয় ও সামাজিক সম্প্রীতি উন্নয়ন", icon: Users, summary: "মসজিদ, মন্দির ও কবরস্থান-শ্মশানের অবকাঠামোগত উন্নয়ন।", details: "ইউনিয়নের সাম্প্রদায়িক সম্প্রীতি অক্ষুণ্ণ রাখতে সর্বজনীন টিম গঠন করা হবে। সকল ধর্মীয় প্রতিষ্ঠানের জন্য সরকারি বরাদ্দ সমতার ভিত্তিতে বণ্টন এবং সীমানা প্রাচীর ও যাতায়াতের রাস্তা পাকাকরণ করা হবে। প্রবীণদের জন্য নৈতিক শিক্ষা ক্লাসের ব্যবস্থা।", impact: "আদর্শ ও সম্প্রীতিময় শান্তিময় সমাজ বিনির্মাণ।", timeline: "চলমান প্রজেক্ট", progress: 0 },
  { id: 10, category: "governance", title: "দুর্নীতিমুক্ত ও জবাবদিহিমূলক প্রশাসন", icon: Compass, summary: "উন্মুক্ত বাজেট ও সোশ্যাল অডিটের মাধ্যমে স্বচ্ছতা আনয়ন।", details: "সকল উন্নয়ন প্রকল্পের হিসাব এবং বাজেট সাধারণ জনগণের সামনে ওয়েবসাইটে ও পাবলিক নোটিশে উন্মুক্ত রাখা হবে। অনিয়ম ও দুর্নীতির বিরুদ্ধে জিরো টলারেন্স নীতি এবং জনগণের অংশগ্রহণে উন্মুক্ত ওয়ার্ড সভা আয়োজন করা হবে।", impact: "ইউনিয়ন পরিষদের প্রতিটি টাকার শতভাগ সঠিক ব্যবহার।", timeline: "তাৎক্ষণিক ও স্থায়ী", progress: 0 },
  { id: 11, category: "agriculture", title: "স্মার্ট কৃষি ও কৃষক সহায়তা কর্মসূচি", icon: Sprout, summary: "আধুনিক কৃষি প্রশিক্ষণ, বীজ ও ন্যায্যমূল্য প্রাপ্তি সেল।", details: "কৃষকদের সরকারি ভর্তুকির সেচ পাম্প, উন্নত বীজ এবং সার সরাসরি মধ্যস্বত্বভোগী ছাড়া পৌঁছে দেওয়া হবে। প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্ত চাষীদের তাৎক্ষণিক সহায়তা ও কৃষি বাজার সংযোগ তৈরি।", impact: "লবণাক্ততা মোকাবেলা করে কৃষকদের উৎপাদন দ্বিগুণ করা।", timeline: "২য় বছর", progress: 0 },
  { id: 12, category: "infrastructure", title: "রাস্তা, সেতু ও গ্রামীণ যোগাযোগ ব্যবস্থার আধুনিকায়ন", icon: Milestone, summary: "কাঁচা রাস্তা টেকসই কার্পেটিং ও ভাঙা কালভার্ট মেরামত।", details: "মাঠ থেকে ফসল সহজে বাজারে আনার জন্য এবং যোগাযোগের সুষম উন্নয়নে প্রতিটি ওয়ার্ডের গুরুত্বপূর্ণ সংযোগ সড়ক পাকা করা হবে। টেকসই কালভার্ট ও ড্রেনেজ নেটওয়ার্ক তৈরি করা হবে যাতে জলাবদ্ধতা না হয়।", impact: "কামারখোলার ভেতর নির্বিঘ্ন ও নিরাপদ যোগাযোগ ব্যবস্থা।", timeline: "৩ বছরের মহাপরিকল্পনা", progress: 0 },
  { id: 13, category: "social", title: "নারীর নিরাপত্তা ও সমাজিক ক্ষমতায়ন", icon: Shield, summary: "ডেডিকেটেড নারী সহায়তা সেল ও কিশোরী সুরক্ষা টিম।", details: "পারিবারিক সহিংসতা, ইভটিজিং বা যেকোনো আইনি সমস্যায় নারীদের তাৎক্ষণিক বিনামূল্যে আইনি সহায়তা দিতে একটি বিশেষ সেল গঠন করা হবে। নারী উদ্যোক্তাদের জন্য জামানতবিহীন ঋণ প্রাপ্তিতে সহায়তা।", impact: "সমাজে নারীদের সর্বোচ্চ নিরাপত্তা ও আত্মমর্যাদা প্রতিষ্ঠা।", timeline: "প্রথম ৬ মাস", progress: 0 },
  { id: 14, category: "education", title: "যুব উন্নয়ন, খেলাধুলা ও সাংস্কৃতিক বিকাশ", icon: GraduationCap, summary: "ওয়ার্ডভিত্তিক মিনি স্টেডিয়াম ও ফ্লাডলাইট টুর্নামেন্ট।", details: "তরুণদের সুস্থ বিনোদনের সুযোগ দিতে খেলার মাঠগুলোর সংস্কার ও স্পোর্টস সামগ্রী বিতরণ করা হবে। প্রতি বছর চেয়ারম্যান কাপ টুর্নামেন্ট ও সমাজ সচেতনতামূলক নাট্যোৎসবের আয়োজন করা হবে।", impact: "অপসংস্কৃতি ও স্ক্রিন অ্যাডিকশন থেকে যুবসমাজকে মুক্ত রাখা।", timeline: "১ম বছর থেকে প্রতি বছর", progress: 0 },
  { id: 15, category: "governance", title: "প্রবীণ, প্রবাসীবান্ধব ও প্রতিবন্ধী কল্যাণ কল্যাণসেবা", icon: UserCheck, summary: "বিশেষ ওয়ান-স্টপ সাপোর্ট ডেস্ক ও দ্রুত ভাতা নিশ্চিতকরণ।", details: "বয়স্ক ভাতা, বিধবা ভাতা এবং প্রতিবন্ধী কার্ড সম্পূর্ণ ডিজিটাল উপায়ে প্রকৃত হকদারদের কাছে পাঠানো হবে। কোনো প্রকার ঘুষ বা অতিরিক্ত ফি নেওয়া কঠোরভাবে নিষিদ্ধ থাকবে। প্রতিবন্ধীদের জন্য বিশেষ হুইলচেয়ার ও উপকরণ বিতরণ।", impact: "অসহায় ও পিছিয়ে পড়া জনগোষ্ঠীর সামাজিক নিরাপত্তা বেষ্টনী শক্তিশালীকরণ।", timeline: "প্রথম ৩ মাস", progress: 0 }
];

// --- 9 WARDS DATA ---
const wardManifestos: { [key: string]: { plan: string[]; highlight: string } } = {
  "১ নং ওয়ার্ড": { highlight: "জলাবদ্ধতা নিরসন ও টেকসই বেড়িবাঁধ সংস্কার", plan: ["বর্ষা মৌসুমে পূর্বপাড়ার জলাবদ্ধতা দূরীকরণে আধুনিক ড্রেনেজ ব্যবস্থা ও কালভার্ট নির্মাণ করা হবে।", "নদী তীরবর্তী এলাকার সুরক্ষায় টেকসই ব্লক বর্ডার বা বেড়িবাঁধের জন্য বিশেষ বাজেট বরাদ্দ দেওয়া হবে।"] },
  "২ নং ওয়ার্ড": { highlight: "আদর্শ ডিজিটাল এডুকেশন হাব ও ফ্রি ওয়াইফাই জোন", plan: ["২ নং ওয়ার্ডের স্থানীয় বিদ্যালয়গুলোতে ‘স্মার্ট ক্লাসরুম’ এবং শেখ রাসেল ডিজিটাল ল্যাব স্থাপন করা হবে।", "তরুণদের ফ্রিল্যান্সিং ও কর্মসংস্থান সুবিধার জন্য গুরুত্বপূর্ণ বাজারে ফ্রি হাই-স্পিড ওয়াইফাই জোন চালু হবে।"] },
  "৩ নং ওয়ার্ড": { highlight: "সাম্প্রদায়িক সম্প্রীতি রক্ষা ও শ্মশান/কবরস্থান সংস্কার", plan: ["হিন্দু-মুসলিম ধর্মীয় সম্প্রীতি অক্ষুণ্ণ রাখতে প্রতি বছর ‘সর্বজনীন সম্প্রীতি সমাবেশ’ ও নিরাপত্তা টিম গঠন।", "ওয়ার্ডের কেন্দ্রীয় কবরস্থান এবং সনাতন ধর্মাবলম্বীদের শ্মশানের সীমানা প্রাচীর ও রাস্তা পাকাকরণ।"] },
  "৪ নং ওয়ার্ড": { highlight: "কৃষি বান্ধব সেচ ব্যবস্থা ও কাঁচা রাস্তা পাকাকরণ", plan: ["কৃষকদের সুবিধার্থে সরকারি ভর্তুকিতে আধুনিক সেচ পাম্প এবং গভীর নলকূপ স্থাপন নিশ্চিত করা হবে।", "মাঠ থেকে ফসল সহজে বাজারে আনার জন্য প্রধান ২টি কাঁচা রাস্তা কার্পেটিং করা হবে।"] },
  "৫ নং ওয়ার্ড": { highlight: "মাদকমুক্ত সমাজ ও আধুনিক স্পোর্টস কমপ্লেক্স", plan: ["তরুণ সমাজকে মাদক ও অপসংস্কৃতি থেকে দূরে রাখতে ওয়ার্ডভিত্তিক ডেডিকেটেড খেলার মাঠ ও স্পোর্টস ক্লাব গঠন।", "নৈশকালীন টুর্নামেন্টের জন্য খেলার মাঠে লাইটিং বা ফ্লাডলাইটের ব্যবস্থা করা হবে।"] },
  "৬ নং ওয়ার্ড": { highlight: "সনার জন্য সুপেয় পানি ও সোলার স্ট্রিট লাইট", plan: ["আর্সেনিকমুক্ত ও নিরাপদ সুপেয় পানির অভাব দূর করতে প্রতিটি পাড়ায় আর্টেসিয়ান ও গভীর টিউবওয়েল স্থাপন।", "রাতের বেলা গ্রামীণ রাস্তা নিরাপদ রাখতে প্রতিটি মোড়ে এবং ধর্মীয় উপাসনালয়ে সোলার স্ট্রিট লাইট প্যানেল বসানো।"] },
  "৭ নং ওয়ার্ড": { highlight: "মাতৃত্বকালীন স্বাস্থ্যসেবা ও কমিউনিটি ক্লিনিক উন্নয়ন", plan: ["স্থানীয় কমিউনিটি ক্লিনিকে ২৪/৭ প্রাথমিক জরুরি চিকিৎসা ও বিনামূল্যে ২৪ প্রকার সরকারি ওষুধ বিতরণ নিশ্চিতকরণ।", "গর্ভবতী মা ও শিশুদের জন্য প্রতি মাসে ফ্রি মেডিকেল ক্যাম্প এবং ফ্রি পুষ্টি উপাদান বিতরণ।"] },
  "৮ নং ওয়ার্ড": { highlight: "কুটির শিল্প সম্প্রসারণ ও স্বাবলম্বী নারী কর্মসংস্থান", plan: ["অসহায়, বিধবা ও দুস্থ নারীদের সেলাই এবং হস্তশিল্পের ফ্রি প্রশিক্ষণ দিয়ে স্বাবলম্বী করার তহবিল গঠন।", "তৃণমূলের উৎপাদিত পণ্য সরাসরি শহরের বাজারে বিক্রির জন্য ‘ভলান্টিয়ার ই-কমার্স ট্রান্সপোর্ট’ চালু।"] },
  "৯ নং ওয়ার্ড": { highlight: "আদর্শ মডেল ওয়ার্ড ও শতভাগ জবাবদিহিতা", plan: ["৯ নং ওয়ার্ডকে কামারখোলার প্রবেশদ্বার হিসেবে একটি সুদৃশ্য তোরণ ও সিসিটিভি নিয়ন্ত্রিত আদর্শ নিরাপদ জোন করা হবে।", "চেয়ারম্যানের তহবিল থেকে প্রতি ৩ মাস পর পর জনগণের উপস্থিতিতে উম্মুক্ত বাজেট ও জবাবদিহিতা সভা।"] }
};

export default function PremiumManifestoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState("১ নং ওয়ার্ড");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  // Scroll indicator mapping
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // React Hook Form initialization
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { priority: "Medium", consent: false, wardNumber: "", category: "" }
  });

  // Dark Mode Side Effect Toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const onFormSubmit = (data: FormData) => {
    console.log("Submitted Citizen Feedback:", data, imageFile?.name);
    setIsSuccessModalOpen(true);
    reset();
    setImageFile(null);
  };

  const filteredManifesto = manifestoItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#FAFBFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 min-h-screen antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      
      {/* 1. SCROLL PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-rose-500 z-50 origin-[0%]" style={{ scaleX }} />

      {/* 2. STICKY TOP SMART NAVIGATION BAR */}
      <header className="sticky top-0 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-500/20">ব</div>
            <div>
<a href="/">
  <h4 className="text-sm font-black tracking-wide cursor-pointer hover:text-emerald-400 inline-block">
    সাইফুল ইসলাম বাবু
  </h4>
</a>              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">কামারখোলা ইউনিয়ন ২০২৬</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold opacity-80">
            <a href="/" className="hover:text-emerald-500 transition">হোম</a>
            <a href="/about" className="hover:text-emerald-500 transition">পরিচিতি</a>
            <a href="/manifesto" className="hover:text-emerald-500 transition">মূল ইশতেহার</a>
            <a href="/blood-bank" className="hover:text-emerald-500 transition">রক্ত ব্যাংক</a>
            <a href="/govt-directory" className="hover:text-emerald-500 transition">প্রশাসনিক ডিরেক্টরি</a>
                        <a href="/volunteer" className="hover:text-emerald-500 transition">পোস্টার তৈরি করুন</a>

          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:scale-105 transition active:scale-95"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "☀️ লাইট মোড" : "🌙 ডার্ক মোড"}
            </button>
            <a 
              href="#feedback" 
              className="hidden sm:inline-flex bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition active:translate-y-0"
            >
              পরামর্শ দিন
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Apple & Stripe Vibe Layout) */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-24 overflow-hidden px-4">
        {/* Advanced Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-500/5 dark:bg-rose-500/5 blur-[140px] pointer-events-none" />
        
        {/* Mesh Dots Background Grid Matrix */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Left Text Grid Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
            >
              <Sparkles size={14} className="animate-spin" /> কামারখোলা ইউনিয়নের উন্নয়ন অঙ্গীকার ২০২৬
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]"
            >
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">জনগণের মতামত ও</span> <br />
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent">অংশগ্রহণের আধুনিক ইশতেহার</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              "আধুনিক, নিরাপদ, দুর্নীতিমুক্ত ও স্মার্ট কামারখোলা ইউনিয়ন গড়ার দৃঢ় প্রত্যয়।" কোনো কৃত্রিম প্রতিশ্রুতি নয়, আপনার পরামর্শই হবে আমাদের আগামীর পথ চলার শক্তি।
            </motion.p>

            {/* Video Placeholder Box / Call to Action Interactions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a href="#manifesto" className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-8 py-4 rounded-xl text-sm font-black shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                সম্পূর্ণ ইশতেহার পড়ুন
              </a>
              <a href="#feedback" className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center justify-center gap-2">
                <MessageSquare size={16} /> মতামত ও অভিযোগ জমা দিন
              </a>
            </motion.div>

            {/* Premium Floating Dynamic Analytics Display Block */}
            <div className="pt-10 grid grid-cols-3 gap-4 border-t border-slate-200/60 dark:border-slate-800/60 max-w-md mx-auto lg:mx-0">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-emerald-500">15+</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">বছর সামাজিক সেবা</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-teal-500">৯টি</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">ওয়ার্ডের সুষম প্ল্যান</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-rose-500">১০০%</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">স্বচ্ছতার অঙ্গীকার</p>
              </div>
            </div>
          </div>

          {/* Right Premium Graphic Column (Candidate Image Structure Overlay) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-sm aspect-[4/5] sm:aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-900"
            >
              {/* Premium Background Grid/Video Mock Effect Placeholder within Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-transparent z-10 opacity-70" />
              <div className="absolute inset-0 bg-emerald-900/10 dark:bg-emerald-900/20 z-0 animate-pulse" />
              
              {/* Fallback Display Graphic Elements when live image config is pending */}
              <Image 
                src="/image.png" 
                alt="Saiful Islam Babu - Premium Portrait"
                fill
                priority
                className="object-cover z-0 hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-w-768px) 100vw, 400px"
              />

              {/* Floating Embedded Smart Badge Element inside Container */}
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/10 dark:bg-slate-950/40 backdrop-blur-xl border border-white/20 dark:border-slate-800/40 p-5 rounded-2xl">
                <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">চেয়ারম্যান পদপ্রার্থী</span>
                <h3 className="text-xl font-black text-white mt-0.5">মোহাম্মদ সাইফুল ইসলাম বাবু</h3>
                <p className="text-xs text-slate-300 font-medium mt-1">"মাদকমুক্ত সমাজ, দুর্নীতিমুক্ত প্রশাসন ও প্রযুক্তিনির্ভর আধুনিক কামারখোলা।"</p>
              </div>
            </motion.div>

            {/* Micro Scroll Down Interactive Indicator */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 opacity-40">
              <span className="text-[10px] font-bold tracking-widest uppercase">স্ক্রল করুন</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-4 w-1 bg-slate-400 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. MANIFESTO OVERVIEW (Glassmorphism Core Philosophy Blocks) */}
      <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mission Card Template Component */}
          <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 rounded-3xl p-8 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner mb-6">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white">আমাদের মিশন (Mission)</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              তৃণমূলের প্রতিটি নাগরিকের জন্য সরকারি সুযোগ-সুবিধা দালালি ও দুর্নীতিমুক্ত উপায়ে দোরগোড়ায় পৌঁছে দেওয়া। ডিজিটাল ও আধুনিক অবকাঠামোগত উন্নয়নের মাধ্যমে প্রতিটি ওয়ার্ডের মৌলিক বৈষম্যসমূহ দূর করা।
            </p>
          </div>

          {/* Vision Card Template Component */}
          <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 rounded-3xl p-8 shadow-xl relative overflow-hidden group hover:border-teal-500/40 transition-all duration-300">
            <div className="h-14 w-14 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center shadow-inner mb-6">
              <Compass size={28} />
            </div>
            <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white">আমাদের ভিশন (Vision)</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              আগামী ৫ বছরের মধ্যে ৬ নং কামারখোলা ইউনিয়নকে বাংলাদেশের একটি অন্যতম স্বনির্ভর, শতভাগ মাদকমুক্ত, অপরাধহীন, প্রযুক্তিনির্ভর এবং পরিবেশবান্ধব স্মার্ট মডেল ইউনিয়ন হিসেবে প্রতিষ্ঠা করা।
            </p>
          </div>

          {/* Core Values Card Template Component */}
          <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 rounded-3xl p-8 shadow-xl relative overflow-hidden group hover:border-rose-500/40 transition-all duration-300">
            <div className="h-14 w-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shadow-inner mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white">মূল্যবোধ (Core Values)</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              শতভাগ সততা, প্রশাসনিক জবাবদিহিতা, ধর্মীয় ও জাতিগত সম্প্রীতি, সাধারণ মানুষের অধিকার রক্ষা এবং যেকোনো অন্যায় ও অনিয়মের বিরুদ্ধে আপসহীন জিরো টলারেন্স নীতি।
            </p>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE MAIN MANIFESTO SECTION (Search, Filtering & Expandable Grid Controls) */}
      <section id="manifesto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">নির্বাচনী অঙ্গীকার ও কর্মপরিকল্পনা</h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
            কামারখোলা ইউনিয়নের সার্বিক সামাজিক ও অর্থনৈতিক রূপান্তরের জন্য সুনির্দিষ্ট ১৫টি নির্বাচনী ইশতেহার ও বাস্তবায়ন রোডম্যাপ।
          </p>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full" />
        </div>

        {/* Search Input and Custom Category Filter Bars Area */}
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-10 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="ইশতেহার খুঁজুন (উদা: মাদক, ডিজিটাল)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
          
          {/* Quick Categories Buttons Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            {[
              { id: "all", label: "সব ইশতেহার" },
              { id: "social", label: "সামাজিক নিরাপত্তা" },
              { id: "infrastructure", label: "অবকাঠামো উন্নয়ন" },
              { id: "technology", label: "ডিজিটাল ও আইটি" },
              { id: "education", label: "শিক্ষা ও কর্মসংস্থান" },
              { id: "governance", label: "সুশাসন ও স্বচ্ছতা" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeCategory === cat.id 
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10" 
                  : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid Matrix Display Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredManifesto.map((item, idx) => {
              const IconComponent = item.icon;
              const isExpanded = expandedCard === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white dark:bg-slate-900 border ${
                    isExpanded ? "border-emerald-500 shadow-xl ring-1 ring-emerald-500/20" : "border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                  } rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between`}
                  onClick={() => setExpandedCard(isExpanded ? null : item.id)}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${isExpanded ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-950 text-emerald-500"}`}>
                        <IconComponent size={20} />
                      </div>
                      <span className="text-[9px] uppercase font-black tracking-widest bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-md text-slate-400">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {item.id}. {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                      {item.summary}
                    </p>

                    {/* Detailed Accordion Expandable Information Area */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 overflow-hidden text-xs sm:text-sm"
                        >
                          <div>
                            <span className="font-black text-emerald-500">মূল পরিকল্পনা: </span>
                            <span className="text-slate-600 dark:text-slate-300 font-medium">{item.details}</span>
                          </div>
                          <div>
                            <span className="font-black text-teal-500">প্রত্যাশিত প্রভাব: </span>
                            <span className="text-slate-600 dark:text-slate-300 font-medium">{item.impact}</span>
                          </div>
                          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 mt-2">
                            <span className="text-[11px] font-black uppercase text-slate-400">বাস্তবায়ন সময়কাল:</span>
                            <span className="text-[11px] font-black text-rose-500">{item.timeline}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>{isExpanded ? "সংক্ষিপ্ত করুন" : "বিস্তারিত দেখুন"}</span>
                    <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[10%]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. INTERACTIVE WARD-BASED MANIFESTO MODULE */}
      <section id="ward" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-500 font-black px-3.5 py-1 rounded-full text-xs border border-rose-500/20">
              <MapPin size={12} /> প্রতিটি ওয়ার্ডের জন্য আলাদা পরিকল্পনা
            </div>
            <h3 className="text-2xl sm:text-4xl font-black">আপনার ওয়ার্ডের সুনির্দিষ্ট উন্নয়ন রোডম্যাপ দেখুন</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              কামারখোলার প্রতিটি অঞ্চলের সমস্যা ও ভৌগোলিক বাস্তবতা ভিন্ন। তাই প্রতিটি ওয়ার্ডের সুনির্দিষ্ট সমস্যা পর্যালোচনা করে আলাদা বাজেট ও টার্গেট ঠিক করা হয়েছে।
            </p>
            
            {/* Native Clean Dropdown Ward Selectors Panel */}
            <div className="pt-2">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wide mb-2">ওয়ার্ড সিলেক্ট করুন</label>
              <select 
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-black text-slate-800 dark:text-white rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer shadow-sm transition-all"
              >
                {Object.keys(wardManifestos).map(ward => (
                  <option key={ward} value={ward}>{ward}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamic Interactive Panel Rendering Data based on States */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800/80 space-y-6 min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedWard}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="p-4 bg-emerald-500/10 dark:bg-emerald-500/20 border-l-4 border-emerald-500 rounded-r-xl">
                  <span className="text-[10px] font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">প্রধান লক্ষ্য ও ফোকাস এলাকা:</span>
                  <h4 className="text-lg sm:text-xl font-black mt-1 text-slate-900 dark:text-white">{wardManifestos[selectedWard].highlight}</h4>
                </div>

                <div className="space-y-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">পরিকল্পনাসমূহ:</span>
                  {wardManifestos[selectedWard].plan.map((planText, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                      <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">{planText}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="text-[11px] text-slate-400 font-bold border-t border-slate-200 dark:border-slate-800/60 pt-4 flex items-center gap-2">
              ⚠️ এই পরিকল্পনা স্থানীয় জনগণের সরাসরি মতামতের ভিত্তিতে সংযোজন করা হয়েছে।
            </p>
          </div>

        </div>
      </section>

      {/* 7. PEOPLE'S VOICE & ADVANCED CITIZEN FEEDBACK FORM SECTION */}
     <section id="feedback" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black">আপনার মতামত আমাদের উন্নয়নের শক্তি</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            কামারখোলা ইউনিয়নের উন্নয়নে আপনার মূল্যবান পরামর্শ বা সুনির্দিষ্ট এলাকার সমস্যার কথা সরাসরি জানান।
          </p>
          <div className="h-1.5 w-16 bg-rose-500 mx-auto rounded-full" />
        </div>

        {/* Core Form Card Wrap */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
          
          <form 
            onSubmit={handleSubmit((data) => {
              // অগ্রাধিকার স্তরের বাংলা লেবেল তৈরি
              const priorityLabels = {
                High: "🚨 অতি জরুরী (High)",
                Medium: "⚡ মাঝারি (Medium)",
                Low: "⏳ সাধারণ (Low)"
              };

              // হোয়াটসঅ্যাপ বার্তার জন্য সাজানো ডাটা ফরম্যাট
              const whatsappMessage = `*নতুন পরামর্শ ও সমস্যা রিপোর্ট* 📝\n\n` +
                                      `👤 *নাম:* ${data.fullName}\n` +
                                      `📞 *মোবাইল:* ${data.mobileNumber}\n` +
                                      `📍 *ওয়ার্ড নম্বর:* ${data.wardNumber || "বাছাই করা হয়নি"}\n` +
                                      `🏡 *গ্রামের নাম:* ${data.villageName}\n` +
                                      `💼 *পেশা:* ${data.occupation}\n` +
                                      `🎂 *বয়স:* ${data.age} বছর\n` +
                                      `📧 *ইমেইল:* ${data.email || "দেওয়া হয়নি"}\n\n` +
                                      `🗂️ *সমস্যার ক্যাটাগরি:* ${data.category || "বাছাই করা হয়নি"}\n` +
                                      `⚠️ *অগ্রাধিকার স্তর:* ${priorityLabels[data.priority] || data.priority || "বাছাই করা হয়নি"}\n\n` +
                                      `💬 *সমস্যার বিস্তারিত বিবরণ:* \n${data.description}\n\n` +
                                      `💡 *ইশতেহারে যুক্ত করার পরামর্শ:* \n${data.suggestion}`;

              // বাংলা লেখা ও স্পেস ইউআরএল ফ্রেন্ডলি করার জন্য এনকোড করা
              const encodedMessage = encodeURIComponent(whatsappMessage);
              
              // আপনার দেওয়া নির্দিষ্ট হোয়াটসঅ্যাপ নাম্বার
              const whatsappNumber = "8801714869885"; 
              
              // লিঙ্ক তৈরি করে নতুন উইন্ডো বা ট্যাবে ওপেন করা
              const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
              window.open(whatsappURL, '_blank');
            })} 
            className="space-y-6"
          >
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name Input Field */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-wide">আপনার পূর্ণ নাম *</label>
                <input 
                  type="text" 
                  placeholder="উদা: মোঃ কামরুল ইসলাম"
                  {...register("fullName")}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-900 dark:text-white"
                />
                {errors.fullName && <p className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> {errors.fullName.message}</p>}
              </div>

              {/* Mobile Number Input Field */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-wide">মোবাইল নম্বর *</label>
                <input 
                  type="tel" 
                  placeholder="যেমন: 017XXXXXXXX"
                  {...register("mobileNumber")}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-mono text-slate-900 dark:text-white"
                />
                {errors.mobileNumber && <p className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> {errors.mobileNumber.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Ward Dropdown Dynamic Input Field */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-wide">ওয়ার্ড নম্বর *</label>
                <select 
                  {...register("wardNumber")}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-800 dark:text-white"
                >
                  <option value="">বাছাই করুন</option>
                  {Object.keys(wardManifestos).map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                {errors.wardNumber && <p className="text-rose-500 text-xs font-bold"><AlertTriangle size={12} className="inline mr-1" /> {errors.wardNumber.message}</p>}
              </div>

              {/* Village Input Field */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-wide">গ্রামের নাম *</label>
                <input 
                  type="text" 
                  placeholder="যেমন: পরজয়নগর"
                  {...register("villageName")}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-900 dark:text-white"
                />
                {errors.villageName && <p className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> {errors.villageName.message}</p>}
              </div>

              {/* Occupation Input Field */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-wide">আপনার পেশা *</label>
                <input 
                  type="text" 
                  placeholder="যেমন: ব্যবসায়ী, কৃষক"
                  {...register("occupation")}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-900 dark:text-white"
                />
                {errors.occupation && <p className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> {errors.occupation.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Age Input Field */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-wide">আপনার বয়স *</label>
                <input 
                  type="number" 
                  placeholder="উদা: ৩৫"
                  {...register("age")}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-900 dark:text-white"
                />
                {errors.age && <p className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> {errors.age.message}</p>}
              </div>

              {/* Email Input Field (Optional) */}
              <div className="grid sm:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-wide">ইমেইল ঠিকানা (ঐচ্ছিক)</label>
                <input 
                  type="email" 
                  placeholder="example@mail.com"
                  {...register("email")}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-900 dark:text-white"
                />
                {errors.email && <p className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> {errors.email.message}</p>}
              </div>
            </div>

            {/* Problem Category Selectors Field Options */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wide">সমস্যার প্রধান ক্যাটাগরি *</label>
              <select 
                {...register("category")}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-800 dark:text-white"
              >
                <option value="">ক্যাটাগরি নির্ধারণ করুন</option>
                <option value="Roads">রাস্তাঘাট ও কালভার্ট সমস্যা (Roads)</option>
                <option value="River Erosion">নদীভাঙন এলাকা সংক্রান্ত (River Erosion)</option>
                <option value="Education">শিক্ষা প্রতিষ্ঠান ও সুযোগ সুবিধা (Education)</option>
                <option value="Health">চিকিৎসা ও স্বাস্থ্যসেবা (Health)</option>
                <option value="Water">বিশুদ্ধ সুপেয় পানি সমস্যা (Water)</option>
                <option value="Agriculture">কৃষি ও কৃষক সহযোগিতা (Agriculture)</option>
                <option value="Employment">कर्मসংস্থান ও কারিগরি প্রশিক্ষণ (Employment)</option>
                <option value="Social Safety">সামাজিক নিরাপত্তা ও সরকারি ভাতা (Social Safety)</option>
                <option value="Technology">ডিজিটাল সার্ভিস ও তথ্য কেন্দ্র (Technology)</option>
                <option value="Other">অন্যান্য সমস্যা (Other)</option>
              </select>
              {errors.category && <p className="text-rose-500 text-xs font-bold"><AlertTriangle size={12} className="inline mr-1" /> {errors.category.message}</p>}
            </div>

            {/* Problem Description Large Text Area */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wide">সমস্যার বিস্তারিত বিবরণ *</label>
              <textarea 
                rows={4} 
                placeholder="আপনার এলাকার সমস্যাটির কথা বিস্তারিত এখানে তুলে ধরুন..."
                {...register("description")}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition focus:outline-none resize-none text-slate-900 dark:text-white"
              />
              {errors.description && <p className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> {errors.description.message}</p>}
            </div>

            {/* Suggestions Text Area Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wide">ইশতেহারে যুক্ত করার জন্য আপনার পরামর্শ *</label>
              <textarea 
                rows={3} 
                placeholder="এই সমস্যা সমাধানে চেয়ারম্যান প্রার্থীর ইশতেহারে কী ধরনের পদক্ষেপ যুক্ত করা উচিত বলে আপনি মনে করেন..."
                {...register("suggestion")}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition focus:outline-none resize-none text-slate-900 dark:text-white"
              />
              {errors.suggestion && <p className="text-rose-500 text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> {errors.suggestion.message}</p>}
            </div>

            {/* Priority Radio Selection Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wide block">এই সমস্যার সমাধানের অগ্রাধিকার স্তর *</label>
              <div className="flex items-center gap-6 pt-1">
                {["High", "Medium", "Low"].map((level) => (
                  <label key={level} className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                    <input 
                      type="radio" 
                      value={level} 
                      {...register("priority")}
                      className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 bg-slate-100 border-slate-300 dark:bg-slate-950 dark:border-slate-800" 
                    />
                    {level === "High" ? "🚨 অতি জরুরী (High)" : level === "Medium" ? "⚡ মাঝারি (Medium)" : "⏳ সাধারণ (Low)"}
                  </label>
                ))}
              </div>
            </div>

            {/* Native Image Upload Box Placeholder UI */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wide block">सहায়ক ছবি আপলোড করুন (ঐচ্ছিক)</label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-950/50 transition cursor-pointer relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    if(e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
                <UploadCloud className="mx-auto text-slate-400 h-8 w-8 mb-2" />
                <p className="text-xs font-bold text-slate-500">{imageFile ? `নির্বাচিত ফাইল: ${imageFile.name}` : "সমস্যার স্পষ্ট ছবি এখানে ড্রপ করুন অথবা ব্রাউজ করুন"}</p>
                <p className="text-[10px] text-slate-400 mt-1">PNG, JPG বা JPEG ফরম্যাট (সর্বোচ্চ ৫ মেগাবাইট)</p>
              </div>
            </div>

            {/* Legal Consent Checkbox Module Component */}
            <div className="space-y-2">
              <label className="flex items-start gap-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer">
                <input 
                  type="checkbox" 
                  {...register("consent")}
                  className="mt-0.5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 dark:bg-slate-950 dark:border-slate-800 h-4 w-4" 
                />
                <span>আমি সম্মতি দিচ্ছি যে আমার এই বাস্তব পরামর্শ বা অভিযোগটি নির্বাচনী ক্যাম্পেইন টিম দ্বারা বিশদ পর্যালোচনা করা হবে।</span>
              </label>
              {errors.consent && <p className="text-rose-500 text-xs font-bold">{errors.consent.message}</p>}
            </div>

            {/* Submission Interactive Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black py-4 px-6 rounded-xl transition text-sm shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 hover:opacity-95"
            >
              {/* ইনলাইন এসভিজি হোয়াটসঅ্যাপ আইকন */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053.953 11.42.953c-5.44 0-9.866 4.372-9.87 9.802 0 1.68.463 3.324 1.34 4.777a.458.458 0 0 1 .067.31L1.933 21.8l3.966-1.019a.46.46 0 0 1 .373.067z"/>
              </svg>
              হোয়াটসঅ্যাপে মতামত পাঠান
            </button>

          </form>
        </div>
      </section>

      {/* 8. DYNAMIC FIXED FLOAT FLOATING ACTION BUTTONS (FAB) / BACK TO TOP / WHATSAPP INTERACTIVITY */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
        
        {/* WhatsApp Live Support Redirect Button Widget */}
        <a 
          href="https://wa.me/8801714869885?text=আসসালামু%20আলাইকুম,%20কামারখোলা%20ইউনিয়নের%20উন্নয়নে%20আমার%20একটি%20পরামর্শ%20আছে।"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative"
          aria-label="Contact via WhatsApp"
        >
          <span className="absolute right-14 bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded-md font-black opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none whitespace-nowrap">হোয়াটসঅ্যাপ যোগাযোগ</span>
          <Phone size={22} className="stroke-[2.5]" />
        </a>

        {/* Dynamic Back To Top Navigation Action Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition"
          aria-label="Back To Top"
        >
          <ArrowUp size={22} className="stroke-[2.5]" />
        </button>
      </div>

      {/* 9. SUBMISSION SUCCESS MODAL INTERACTIVE PANEL DIALOG */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-5"
            >
              <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle2 size={40} className="stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">পরামর্শ সফলভাবে গৃহিত!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  ধন্যবাদ। আপনার মূল্যবান মতামত ও সুনির্দিষ্ট অভিযোগটি কামারখোলা ইউনিয়নের ভবিষ্যৎ উন্নয়ন পরিকল্পনায় এবং নির্বাচনী চূড়ান্ত ইশতেহারে গুরুত্বপূর্ণ ভূমিকা রাখবে।
                </p>
              </div>
              <button 
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 py-3.5 rounded-xl font-black text-sm transition"
              >
                উইন্ডো বন্ধ করুন
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. PREMIUM MODERN FOOTER BRAND LAYOUT MODULE */}
      <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-black">মোহাম্মদ সাইফুল ইসলাম বাবু</h4>
            <p className="text-xs text-slate-400 font-bold">চেয়ারম্যান পদপ্রার্থী | ৬ নং কামারখোলা ইউনিয়ন পরিষদ নির্বাচন ২০২৬</p>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            © ২০২৬ ক্যাম্পেইন মিডিয়া সেল। সর্বস্বত্ব সংরক্ষিত। ডিজাইন ও প্রযুক্তিগত সহযোগিতায় কামারখোলা আইটি টিম।
          </p>
        </div>
      </footer>

    </div>
  );
}