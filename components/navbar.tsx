"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Vote } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 // ... আপনার আগের কোড একই থাকবে, শুধু navItems এডিট করুন:

const navItems = [
  { name: "হোম", path: "/" },
  { name: "পরিচিতি", path: "/about" },
  { name: "মহাপরিকল্পনা", path: "/manifesto" },
  { name: "রক্ত ব্যাংক", path: "/blood-bank" },         // নতুন যোগ করা হয়েছে
  { name: "প্রশাসনিক ডিরেক্টরি", path: "/govt-directory" }, // নতুন যোগ করা হয়েছে
  { name: "পোস্টার তৈরি করুন", path: "/volunteer" }
];

// ... বাকি কোড (Desktop Links এবং Mobile Menu) আগের মতোই থাকবে। 
// যেহেতু আপনি navItems ম্যাপ (map) করেছেন, তাই এখানে নতুন করে কিছু লিখতে হবে না।

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "glass-panel shadow-lg border-b border-white/20" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-campaign-red p-2 rounded-xl text-white shadow-md animate-pulse">
            <Vote className="h-6 w-6" />
          </div>
          <span className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-campaign-green to-campaign-red bg-clip-text text-transparent dark:from-white dark:to-slate-300">
            সাইফুল ইসলাম বাবু
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className={`relative text-sm font-bold tracking-wide transition-colors ${pathname === item.path ? "text-campaign-green dark:text-campaign-red" : "text-slate-600 dark:text-slate-300 hover:text-campaign-green"}`}>
              {item.name}
              {pathname === item.path && (
                <motion.span layoutId="nav-line" className="absolute left-0 right-0 h-[3px] bg-campaign-green dark:bg-campaign-red -bottom-2 rounded-full" />
              )}
            </Link>
          ))}
          <Link href="/volunteer" className="bg-campaign-green hover:bg-campaign-green/90 text-white font-bold px-5 py-2.5 rounded-full text-sm shadow-xl shadow-campaign-green/20 transition-transform hover:-translate-y-0.5">
            যুক্ত হোন
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-700 dark:text-white">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden glass-panel border-b border-slate-200 dark:border-slate-800 absolute top-20 left-0 w-full px-4 py-6 space-y-3 shadow-2xl">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-bold ${pathname === item.path ? "bg-campaign-green/10 text-campaign-green" : "text-slate-700 dark:text-slate-200"}`}>
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}