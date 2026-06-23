"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  targetValue: number;
  label: string;
  suffix?: string;
}

export default function StatsCounter({ targetValue, label, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000; // Total duration in ms
    const increment = targetValue / (duration / 16); // 60 FPS approx

    const handle = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        clearInterval(handle);
        setCount(targetValue);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(handle);
  }, [isInView, targetValue]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-sans">
        {count.toLocaleString("bn-BD")}{suffix}
      </div>
      <div className="text-sm sm:text-base text-emerald-100 font-medium max-w-xs mx-auto">
        {label}
      </div>
    </div>
  );
}