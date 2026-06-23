"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Inbox, MapPin, Phone, Trash2, CheckCircle, Clock, Filter, LogOut, ShieldAlert, Loader2 } from "lucide-react";

const wards = ["সব ওয়ার্ড", "১ নং ওয়ার্ড", "২ নং ওয়ার্ড", "৩ নং ওয়ার্ড", "৪ নং ওয়ার্ড", "৫ নং ওয়ার্ড", "৬ নং ওয়ার্ড", "৭ নং ওয়ার্ড", "৮ নং ওয়ার্ড", "৯ নং ওয়ার্ড"];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterWard, setFilterWard] = useState("সব ওয়ার্ড");
  const [filterStatus, setFilterStatus] = useState("All");

  // পাসওয়ার্ড ভ্যালিডেশন
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "babubhai2026") {
      setIsAuthenticated(true);
    } else {
      alert("ভুল পাসওয়ার্ড!");
    }
  };

  // ডাটাবেজ থেকে মেসেজ নিয়ে আসা
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  // স্ট্যাটাস পরিবর্তন করা (MongoDB-তে আপডেট হবে)
  const toggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Pending" ? "Solved" : "Pending";
    try {
      const res = await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (res.ok) {
        setMessages(messages.map(m => m._id === id ? { ...m, status: nextStatus } : m));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // মেসেজ আজীবনের জন্য ডিলিট করা
  const deleteMessage = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত যে এই বার্তাটি ডিলিট করতে চান?")) return;
    try {
      const res = await fetch("/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages(messages.filter(m => m._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchWard = filterWard === "সব ওয়ার্ড" || msg.ward === filterWard;
    const matchStatus = filterStatus === "All" || msg.status === filterStatus;
    return matchWard && matchStatus;
  });

  return (
    <div className="relative w-full overflow-hidden min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="stripe-glow bg-campaign-green top-[-5%] left-[-10%] w-[400px] h-[400px]" />
      <div className="stripe-glow bg-campaign-red top-[60%] right-[-10%] w-[500px] h-[500px]" />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl mt-12 text-center">
            <div className="inline-flex p-4 bg-red-50 dark:bg-red-950/30 rounded-full text-campaign-red mb-4"><Lock className="h-8 w-8" /></div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">কেন্দ্রীয় ড্যাশবোর্ড লগইন</h2>
            <form onSubmit={handleLogin} className="space-y-4 mt-6 text-left">
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm tracking-widest text-slate-900 dark:text-white focus:outline-none" placeholder="পাসওয়ার্ড লিখুন" />
              <button type="submit" className="w-full bg-campaign-green text-white font-black py-3.5 rounded-xl text-sm shadow-md">প্রবেশ করুন</button>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-campaign-green bg-campaign-green/10 px-3 py-1 rounded-full w-fit"><ShieldAlert className="h-3.5 w-3.5" /> অ্যাডমিন মোড সচল</div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1.5">কামারখোলা অভিযোগ মনিটরিং সেল (MongoDB)</h1>
              </div>
              <button onClick={() => setIsAuthenticated(false)} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs"><LogOut className="h-4 w-4" /></button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-4">
                {/* সঠিক ওয়ার্ড ফিল্টার অপশন */}
                <select 
                  value={filterWard} 
                  onChange={(e) => setFilterWard(e.target.value)} 
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  {wards.map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>

                {/* অবস্থা ফিল্টার অপশন */}
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)} 
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  <option value="All">সব অবস্থা</option>
                  <option value="Pending">চলমান</option>
                  <option value="Solved">সমাধানকৃত</option>
                </select>
              </div>
              <div className="text-xs font-bold text-slate-400">মোট: <span className="text-campaign-green">{filteredMessages.length}</span> টি</div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl">
              {loading ? (
                <div className="p-12 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-campaign-green" /></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 text-xs font-bold border-b border-slate-100 dark:border-slate-800">
                        <th className="p-5">ভোটার ও ওয়ার্ড তথ্য</th>
                        <th className="p-5">অভিযোগ/পরামর্শের বিবরণ</th>
                        <th className="p-5">তারিখ</th>
                        <th className="p-5 text-center">অবস্থা</th>
                        <th className="p-5 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                      {filteredMessages.length > 0 ? (
                        filteredMessages.map((msg: any) => (
                          <tr key={msg._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                            <td className="p-5 whitespace-nowrap">
                              <div className="font-bold text-slate-900 dark:text-white">{msg.name}</div>
                              <div className="text-xs text-slate-400 flex items-center gap-1 mt-1"><Phone className="h-3 w-3" /> {msg.phone}</div>
                              <div className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold px-2 py-0.5 rounded-md mt-1 w-fit flex items-center gap-1"><MapPin className="h-2.5 w-2.5 text-campaign-red" /> {msg.ward}</div>
                            </td>
                            <td className="p-5 max-w-md font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{msg.message}</td>
                            <td className="p-5 whitespace-nowrap text-xs font-bold text-slate-400">{msg.date || "আজ"}</td>
                            <td className="p-5 whitespace-nowrap text-center">
                              <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full border ${msg.status === "Processed" || msg.status === "Solved" ? "bg-emerald-500/10 text-campaign-green border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}>{msg.status === "Solved" ? "সমাধানকৃত" : "চলমান"}</span>
                            </td>
                            <td className="p-5 whitespace-nowrap text-right space-x-2">
                              <button onClick={() => toggleStatus(msg._id, msg.status)} className={`p-2 rounded-xl border text-xs font-bold ${msg.status === "Solved" ? "bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200" : "bg-emerald-500 text-white"}`}><CheckCircle className="h-4 w-4" /></button>
                              <button onClick={() => deleteMessage(msg._id)} className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-campaign-red rounded-xl"><Trash2 className="h-4 w-4" /></button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan={5} className="p-12 text-center text-sm text-slate-400 font-medium"><Inbox className="h-8 w-8 mx-auto text-slate-300 mb-2" />কোনো বার্তা পাওয়া যায়নি।</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}