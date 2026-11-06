import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Moon, Sun, ChevronDown, CheckCircle2 } from 'lucide-react';
import { toBengaliDigits, getBengaliDayName, getBengaliMonthName, getBanglaCalendarDate, getSherpurPrayerTimes } from '../utils/bengaliUtils';

export const CornerClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showPrayerTimes, setShowPrayerTimes] = useState(false);
  const [useBengaliDigits, setUseBengaliDigits] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const isPM = hours >= 12;
  const formattedHours = hours % 12 || 12;

  const pad = (n: number) => n.toString().padStart(2, '0');

  const timeString = `${pad(formattedHours)}:${pad(minutes)}:${pad(seconds)}`;
  const ampm = isPM ? 'অপরাহ্ন' : 'পূর্বাহ্ন';

  const dayName = getBengaliDayName(currentTime.getDay());
  const banglaDate = getBanglaCalendarDate(currentTime);
  const gregorianDate = `${toBengaliDigits(currentTime.getDate())} ${getBengaliMonthName(currentTime.getMonth())}, ${toBengaliDigits(currentTime.getFullYear())}`;

  const prayerTimes = getSherpurPrayerTimes();

  return (
    <div className="relative z-30">
      {/* Corner Clock Button */}
      <div 
        onClick={() => setShowPrayerTimes(!showPrayerTimes)}
        className="flex items-center gap-2.5 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-emerald-200/80 dark:border-emerald-800/80 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
        title="নামাজের সময়সূচী ও বিস্তারিত দেখতে ক্লিক করুন"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4 animate-pulse text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-wide text-slate-800 dark:text-slate-100 font-mono">
              {useBengaliDigits ? toBengaliDigits(timeString) : timeString}
            </span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium">
              {ampm}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
            {dayName} • {banglaDate}
          </div>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showPrayerTimes ? 'rotate-180 text-emerald-600' : ''}`} />
      </div>

      {/* Prayer Times & Location Floating Popover */}
      {showPrayerTimes && (
        <div className="absolute right-0 top-12 w-80 sm:w-88 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> শেরপুর, বগুড়া সময়সূচী
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                ধনকুন্ডী উত্তর পাড়া ও সীমাবাড়ী ইউনিয়ন
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setUseBengaliDigits(!useBengaliDigits);
              }}
              className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
            >
              {useBengaliDigits ? 'ইংরেজি সংখ্যা' : 'বাংলা সংখ্যা'}
            </button>
          </div>

          {/* Date info */}
          <div className="mt-3 p-2.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50 flex flex-col gap-1 text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span className="text-slate-500 dark:text-slate-400">ইংরেজি তারিখ:</span>
              <span className="font-semibold">{gregorianDate}</span>
            </div>
            <div className="flex justify-between items-center text-emerald-800 dark:text-emerald-300">
              <span className="text-slate-500 dark:text-slate-400">বাংলা সন:</span>
              <span className="font-bold">{banglaDate}</span>
            </div>
          </div>

          {/* Prayer schedule */}
          <div className="mt-3">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>আজকের ৫ ওয়াক্ত নামাজের সময়</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">শেরপুর অঞ্চল</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {prayerTimes.map((pt, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300">{pt.name}</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{pt.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 text-[11px] text-center text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800">
            ধনকুন্ডী উত্তর পাড়া জামে মসজিদে ওয়াক্ত অনুযায়ী নিয়মিত জামাত অনুষ্ঠিত হয়
          </div>
        </div>
      )}
    </div>
  );
};
