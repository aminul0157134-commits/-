import React, { useState } from 'react';
import { PlayCircle, DollarSign, ExternalLink, X, RefreshCw, Award, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toBengaliDigits } from '../utils/bengaliUtils';

interface AdMobBannerProps {
  onRewardClaimed?: (amount: number) => void;
  onOpenMonetizationGuide: () => void;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ onRewardClaimed, onOpenMonetizationGuide }) => {
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(8);
  const [adWatchedSuccess, setAdWatchedSuccess] = useState(false);
  const [bannerClosed, setBannerClosed] = useState(false);
  const [adIndex, setAdIndex] = useState(0);

  const sampleAds = [
    {
      title: 'ধনকুন্ডী উত্তর পাড়া মো: নয়ন ইসলাম নিজ বাসায় ঔষধের দোকান ও চিকিৎসা দিয়ে থাকেন।',
      subtitle: '"আমি মো: আমিনুল ইসলাম  আমি এই সাইটটি তৈরি করেছি কোন ভুল হলে আমাকে জানাবেন আমি পরিবর্তন করে দিবো ধন্যবাদ 💐',
      sponsor: 'শেরপুর পৌরসভা, বগুড়া',
      callToAction: 'সিরিয়াল বুক করুন',
      bgGradient: 'from-blue-600 via-indigo-600 to-emerald-600',
      badge: 'লোকাল স্পন্সর এড'
    },
    {
      title: 'বগুড়া সেরা দই ও মিষ্টি সম্ভার - সীমাবাড়ী ব্রাঞ্চ',
      subtitle: 'যেকোনো সামাজিক অনুষ্ঠান ও বিয়েবাড়ির অর্ডারে ফ্রি হোম ডেলিভারি',
      sponsor: 'সীমাবাড়ী বাজার, শেরপুর',
      callToAction: 'অর্ডার করতে কল করুন',
      bgGradient: 'from-amber-600 via-orange-600 to-rose-600',
      badge: 'অ্যাডমোব টেস্ট নেটওয়ার্ক'
    },
    {
      title: 'গ্রামীণ বিকাশ ও নগদ এজেন্ট সার্ভিস - উত্তর পাড়া',
      subtitle: 'প্রবাসী রেমিট্যান্স উত্তোলন ও ক্যাশ-আউটে বিশেষ উপহার',
      sponsor: 'ধনকুন্ডী উত্তর পাড়া, সীমাবাড়ী',
      callToAction: 'বিস্তারিত জানুন',
      bgGradient: 'from-emerald-700 via-teal-700 to-cyan-700',
      badge: 'Google AdMob Banner'
    }
  ];

  const handleStartRewardAd = () => {
    setIsWatchingAd(true);
    setAdCountdown(8);
    setAdWatchedSuccess(false);

    const timer = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsWatchingAd(false);
          setAdWatchedSuccess(true);
          // Trigger confetti & reward
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.85 }
            });
          } catch (e) {
            // fallback
          }
          if (onRewardClaimed) {
            onRewardClaimed(5);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const currentAd = sampleAds[adIndex % sampleAds.length];

  if (bannerClosed) {
    return (
      <div className="flex justify-center my-2">
        <button
          onClick={() => setBannerClosed(false)}
          className="text-xs text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> বিজ্ঞাপন দেখুন (AdMob Banner)
        </button>
      </div>
    );
  }

  return (
    <div className="w-full my-4">
      {/* Rewarded Video Modal Overlay */}
      {isWatchingAd && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full text-center text-white relative shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-spin" /> AdMob Rewarded Video
            </div>

            <h3 className="text-lg font-bold mb-1">ভিডিও বিজ্ঞাপনটি চলছে...</h3>
            <p className="text-xs text-slate-300 mb-4">
              পুরো বিজ্ঞাপনটি শেষ হলে গ্রামের উন্নয়ন ফান্ডে ৳ ৫ টাকা অনুদান স্বয়ংক্রিয়ভাবে জমা হবে।
            </p>

            <div className="my-6 p-6 rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 border border-slate-700">
              <div className="text-5xl font-extrabold text-amber-400 font-mono mb-2">
                {toBengaliDigits(adCountdown)} <span className="text-base text-slate-300">সেকেন্ড বাকি</span>
              </div>
              <p className="text-xs text-slate-300">
                বিজ্ঞাপনদাতা: শেরপুর ডিজিটাল সেবা নেটওয়ার্ক (Google AdMob Partner)
              </p>
            </div>

            <div className="text-xs text-slate-400">
              দয়া করে বিজ্ঞাপন চলাকালীন উইন্ডো বন্ধ করবেন না
            </div>
          </div>
        </div>
      )}

      {/* Rewarded Success Notification */}
      {adWatchedSuccess && (
        <div className="mb-3 p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 rounded-xl flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200">
              <strong>অভিনন্দন!</strong> বিজ্ঞাপনটি দেখার জন্য ধন্যবাদ। গ্রামের চিকিৎসা ও সমাজসেবা তহবিলে <strong>৳ ৫ টাকা</strong> অনুদান সফলভাবে ক্রেডিট হয়েছে!
            </div>
          </div>
          <button
            onClick={() => setAdWatchedSuccess(false)}
            className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Standard Google AdMob Banner Container */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        {/* Top Meta Bar */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-3 py-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
              {currentAd.badge}
            </span>
            <span>•</span>
            <span>বিজ্ঞাপনদাতা: {currentAd.sponsor}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMonetizationGuide}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 font-medium transition-colors"
              title="অ্যাপ থেকে কীভাবে আয় করবেন তার গাইড"
            >
              <DollarSign className="w-3 h-3 text-amber-500" /> আয় করার পদ্ধতি
            </button>
            <button
              onClick={() => setAdIndex((prev) => prev + 1)}
              className="hover:text-slate-700 dark:hover:text-slate-200 p-0.5"
              title="পরের বিজ্ঞাপন"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
            <button
              onClick={() => setBannerClosed(true)}
              className="hover:text-red-500 p-0.5"
              title="বিজ্ঞাপন বন্ধ করুন"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Ad Body Content */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${currentAd.bgGradient} text-white flex items-center justify-center shrink-0 shadow-md font-bold text-lg`}>
              বিজ্ঞাপন
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {currentAd.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {currentAd.subtitle}
              </p>
            </div>
          </div>

          {/* Action Buttons: Watch Rewarded Ad or Click */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <button
              onClick={handleStartRewardAd}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 fill-slate-950 text-amber-400" />
              <span>এড দেখে ফান্ডে ৫৳ দান করুন</span>
            </button>

            <button
              onClick={onOpenMonetizationGuide}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <span>সেটিংস ও ইনকাম</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
