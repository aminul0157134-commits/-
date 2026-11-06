import React, { useState, useEffect } from 'react';
import { Users, Eye, Activity, Globe2, Sparkles } from 'lucide-react';
import { toBengaliDigits } from '../utils/bengaliUtils';

export const VisitorCounter: React.FC = () => {
  const [totalVisitors, setTotalVisitors] = useState<number>(4892);
  const [todayVisitors, setTodayVisitors] = useState<number>(348);
  const [onlineNow, setOnlineNow] = useState<number>(19);
  const [expatVisitors, setExpatVisitors] = useState<number>(112);

  useEffect(() => {
    // Retrieve or initialize from localStorage
    const savedTotal = localStorage.getItem('dhankundi_total_visitors');
    const savedToday = localStorage.getItem('dhankundi_today_visitors');
    const lastVisitDate = localStorage.getItem('dhankundi_last_visit_date');
    const todayStr = new Date().toDateString();

    let curTotal = savedTotal ? parseInt(savedTotal, 10) : 4892;
    let curToday = savedToday ? parseInt(savedToday, 10) : 348;

    // Increment visitor count once per session
    if (!sessionStorage.getItem('dhankundi_visited_session')) {
      sessionStorage.setItem('dhankundi_visited_session', 'true');
      curTotal += 1;
      if (lastVisitDate === todayStr) {
        curToday += 1;
      } else {
        curToday = 1;
      }
      localStorage.setItem('dhankundi_total_visitors', curTotal.toString());
      localStorage.setItem('dhankundi_today_visitors', curToday.toString());
      localStorage.setItem('dhankundi_last_visit_date', todayStr);
    }

    setTotalVisitors(curTotal);
    setTodayVisitors(curToday);

    // Subtle random fluctuation for live online visitors (e.g. 15-27)
    const interval = setInterval(() => {
      setOnlineNow((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = Math.max(12, Math.min(38, prev + delta));
        return next;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-emerald-950/20 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600/10 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              লাইভ ভিজিটর ও পরিদর্শক সংখ্যা
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              ধনকুন্ডী উত্তর পাড়া সেবা পোর্টালে সক্রিয় পাঠক
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>লাইভ কাউন্টার সক্রিয়</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Visitors */}
        <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-medium">সর্বমোট ভিজিটর</span>
            <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {toBengaliDigits(totalVisitors)}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            গ্রাম ও দেশ-বিদেশ থেকে
          </div>
        </div>

        {/* Today's Visitors */}
        <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-medium">আজকের ভিজিটর</span>
            <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
            {toBengaliDigits(todayVisitors)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            আজকের ২৪ ঘণ্টায়
          </div>
        </div>

        {/* Online Now */}
        <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-medium">এখন লাইভ আছেন</span>
            <div className="relative">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping absolute -top-0.5 -right-0.5"></span>
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
            {toBengaliDigits(onlineNow)}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">জন</span>
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            সরাসরি ব্রাউজ করছেন
          </div>
        </div>

        {/* Expat Visitors */}
        <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-medium">প্রবাসী পরিদর্শক</span>
            <Globe2 className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1.5">
            {toBengaliDigits(expatVisitors)}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">জন</span>
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">
            সৌদি, দুবাই, কুয়েত ও ওমান
          </div>
        </div>
      </div>
    </div>
  );
};
