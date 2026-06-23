"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, Type, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export default function AccessibilityControl() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(100); // শতকরা হিসেবে (১০০%)

  // প্রথমবার লোড হওয়ার সময় লোকাল স্টোরেজ চেক করা
  useEffect(() => {
    // ডার্ক মোড চেক
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // ফন্ট সাইজ চেক
    const savedFontSize = localStorage.getItem("font-size");
    if (savedFontSize) {
      const size = parseInt(savedFontSize);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}%`;
    }
  }, []);

  // ডার্ক মোড টগল হ্যান্ডলার
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // ফন্ট সাইজ পরিবর্তন হ্যান্ডলার
  const changeFontSize = (action: "increase" | "decrease" | "reset") => {
    let newSize = fontSize;
    if (action === "increase" && fontSize < 140) newSize = fontSize + 10; // সর্বোচ্চ ১৪০%
    if (action === "decrease" && fontSize > 90) newSize = fontSize - 10;  // সর্বনিম্ন ৯০%
    if (action === "reset") newSize = 100;

    setFontSize(newSize);
    localStorage.setItem("font-size", newSize.toString());
    
    // পুরো ওয়েবসাইটের রুট ফন্ট সাইজ পরিবর্তন হবে (rem ইউনিট কাজ করবে)
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300">
      
      {/* ডার্ক মোড বাটন */}
      <button
        onClick={toggleDarkMode}
        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all"
        title={isDarkMode ? "লাইট মোড" : "ডার্ক মোড"}
      >
        {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-indigo-600" />}
      </button>

      <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />

      {/* রিডার মোড (ফন্ট কন্ট্রোল) */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => changeFontSize("decrease")}
          disabled={fontSize <= 90}
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-all"
          title="লেখা ছোট করুন"
        >
          <ZoomOut className="h-4 w-4" />
        </button>

        <span className="text-xs font-black text-slate-700 dark:text-slate-300 px-1 min-w-[45px] text-center flex items-center justify-center gap-0.5">
          <Type className="h-3 w-3 shrink-0" /> {fontSize}%
        </span>

        <button
          onClick={() => changeFontSize("increase")}
          disabled={fontSize >= 140}
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-all"
          title="লেখা বড় করুন (বয়স্কদের জন্য)"
        >
          <ZoomIn className="h-4 w-4" />
        </button>

        {fontSize !== 100 && (
          <button
            onClick={() => changeFontSize("reset")}
            className="p-2 rounded-xl text-campaign-red hover:bg-red-500/10 transition-all"
            title="রিসেট করুন"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}