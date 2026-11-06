import React, { useState, useEffect } from 'react';
import { X, DollarSign, Smartphone, Globe, ShieldCheck, CheckCircle, Calculator, HelpCircle, Save, ExternalLink } from 'lucide-react';
import { toBengaliDigits, formatTaka } from '../utils/bengaliUtils';

interface MonetizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardedDonationsTotal: number;
}

export const MonetizationModal: React.FC<MonetizationModalProps> = ({
  isOpen,
  onClose,
  rewardedDonationsTotal
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'settings' | 'calculator'>('guide');
  
  // Settings state
  const [admobAppId, setAdmobAppId] = useState('ca-app-pub-3940256099942544~3347511713');
  const [bannerUnitId, setBannerUnitId] = useState('ca-app-pub-3940256099942544/6300978111');
  const [rewardedUnitId, setRewardedUnitId] = useState('ca-app-pub-3940256099942544/5224354917');
  const [interstitialUnitId, setInterstitialUnitId] = useState('ca-app-pub-3940256099942544/1033173712');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculator state
  const [dailyVisitors, setDailyVisitors] = useState(500);
  const [rewardAdsPerDay, setRewardAdsPerDay] = useState(150);

  useEffect(() => {
    const saved = localStorage.getItem('dhankundi_admob_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.appId) setAdmobAppId(parsed.appId);
        if (parsed.bannerId) setBannerUnitId(parsed.bannerId);
        if (parsed.rewardedId) setRewardedUnitId(parsed.rewardedId);
        if (parsed.interstitialId) setInterstitialUnitId(parsed.interstitialId);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      appId: admobAppId,
      bannerId: bannerUnitId,
      rewardedId: rewardedUnitId,
      interstitialId: interstitialUnitId,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('dhankundi_admob_config', JSON.stringify(config));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Projected earnings calculation
  // eCPM estimate for Bangladesh: Banner ~$0.30 - $0.80, Rewarded ~$1.50 - $3.50 (USD to BDT ~120)
  const monthlyBannerImpressions = dailyVisitors * 3 * 30; // 3 pageviews per visit
  const monthlyRewardedViews = rewardAdsPerDay * 30;
  
  const estimatedBannerUSD = (monthlyBannerImpressions / 1000) * 0.50; // $0.50 eCPM
  const estimatedRewardedUSD = (monthlyRewardedViews / 1000) * 2.20; // $2.20 eCPM
  const totalEstimatedUSD = estimatedBannerUSD + estimatedRewardedUSD;
  const totalEstimatedBDT = Math.round(totalEstimatedUSD * 122); // USD to BDT

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <DollarSign className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">
                অ্যাপ থেকে আয় ও অ্যাডমোব (AdMob) সেটআপ
              </h3>
              <p className="text-xs text-emerald-100">
                ধনকুন্ডী উত্তর পাড়া সেবা পোর্টাল মনিটাইজেশন নির্দেশিকা
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-2 gap-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'guide'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            ১. কীভাবে টাকা আয় করবেন?
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'calculator'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            ২. সম্ভাব্য আয়ের ক্যালকুলেটর
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            ৩. AdMob আইডি কনফিগারেশন
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 max-h-[70vh] overflow-y-auto text-slate-800 dark:text-slate-200 space-y-4">
          
          {/* TAB 1: GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-1.5 mb-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-600" /> আপনার প্রশ্নের সরাসরি উত্তর:
                </h4>
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  হ্যাঁ! এই অ্যাপটি থেকে আপনি <strong>গুগল অ্যাডমোব (Google AdMob)</strong> এবং <strong>গুগল অ্যাডসেন্স (Google AdSense)</strong> এর মাধ্যমে প্রতি মাসে নিয়মিত টাকা আয় করতে পারবেন।
                </p>
              </div>

              {/* 4 Methods of Earning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-1 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> ১. অ্যাডমোব রিওয়ার্ডেড ভিডিও
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    গ্রামের মানুষ বা সদস্যরা "এড দেখে ফান্ডে ৫৳ অনুদান দিন" বাটনে চাপ দিয়ে ১০-১৫ সেকেন্ডের ভিডিও বিজ্ঞাপন দেখবে। গুগল আপনাকে প্রতি ১০০০ ভিউতে সর্বোচ্চ রেভিনিউ প্রদান করবে।
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-1 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" /> ২. ব্যানার ও ডিসপ্লে বিজ্ঞাপন
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    অ্যাপের হোমপেজে এবং প্রতিটি পেজের নিচে স্বয়ংক্রিয় বিজ্ঞাপন প্রদর্শিত হবে। দর্শনার্থী অ্যাপ ভিজিট করলেই আপনার অ্যাকাউন্টে টাকা জমা হতে থাকবে।
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" /> ৩. শেরপুর ও সীমাবাড়ী স্পন্সর
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    শেরপুর ও সীমাবাড়ী বাজারের স্থানীয় দোকান, ডায়াগনস্টিক সেন্টার, শোরুম ইত্যাদির ব্যানার বিজ্ঞাপন মাসিক চুক্তিতে প্রচার করে সরাসরি নগদ আয় করতে পারবেন।
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> ৪. ব্যাংক ও বিকাশ পেমেন্ট
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    গুগল অ্যাডমোব থেকে প্রতি মাসের ২১-২৬ তারিখের মধ্যে আপনার ডাচ্-বাংলা ব্যাংক বা যেকোনো বাংলাদেশি ব্যাংক অ্যাকাউন্টে সরাসরি টাকা ট্রান্সফার হয়।
                  </p>
                </div>
              </div>

              {/* Step by step to get started */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
                <h5 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  অ্যাডমোব চালু করার ৩টি সহজ ধাপ:
                </h5>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li><strong>admob.google.com</strong> এ গিয়ে একটি ফ্রি অ্যাকাউন্ট খুলুন (আপনার জিমেইল দিয়ে)।</li>
                  <li>একটি নতুন অ্যাপ তৈরি করে Banner Ad Unit এবং Rewarded Video Ad Unit তৈরি করুন।</li>
                  <li>৩ নম্বর ট্যাবে আপনার ইউনিট আইডিগুলো বসিয়ে <strong>"সেটিংস সংরক্ষণ করুন"</strong> বাটনে ক্লিক করুন।</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1 font-semibold">
                    <span>প্রতিদিন আনুমানিক ভিজিটর সংখ্যা:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                      {toBengaliDigits(dailyVisitors)} জন
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={dailyVisitors}
                    onChange={(e) => setDailyVisitors(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>১০০ জন</span>
                    <span>২,৫০০ জন</span>
                    <span>৫,০০০ জন</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 font-semibold">
                    <span>প্রতিদিন দর্শনার্থীদের মোট ভিডিও এড দেখা:</span>
                    <span className="text-amber-600 dark:text-amber-400 text-sm font-bold">
                      {toBengaliDigits(rewardAdsPerDay)} টি এড
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={rewardAdsPerDay}
                    onChange={(e) => setRewardAdsPerDay(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>১০ টি</span>
                    <span>৫০০ টি</span>
                    <span>১,০০০ টি</span>
                  </div>
                </div>
              </div>

              {/* Result Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-lg text-center space-y-2">
                <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                  আপনার মাসিক সম্ভাব্য মোট ইনকাম
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300">
                  {formatTaka(totalEstimatedBDT)} <span className="text-lg text-white font-normal">/ মাস</span>
                </div>
                <p className="text-xs text-emerald-100 max-w-md mx-auto">
                  (আনুমানিক ${Math.round(totalEstimatedUSD)} ডলার @ ১ ডলার = ১২২ টাকা হিসেবে)। এই টাকা সরাসরি আপনার গ্রামের উন্নয়ন তহবিলে বা ব্যক্তিগত অ্যাকাউন্টে স্থানান্তর করতে পারেন।
                </p>
              </div>

              {rewardedDonationsTotal > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-xs text-amber-900 dark:text-amber-200 text-center font-medium">
                  এই সেশনে সদস্যরা বিজ্ঞাপন দেখে তহবিলে যোগ করেছেন: <strong>{formatTaka(rewardedDonationsTotal)}</strong>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs">
              <p className="text-slate-500 dark:text-slate-400">
                আপনার গুগল অ্যাডমোব ড্যাশবোর্ড থেকে আইডিগুলো এখানে দিয়ে রাখুন। বর্তমানে ডেমো টেস্ট আইডি সক্রিয় রয়েছে যাতে কোনো ব্যান ঝুঁকি ছাড়া লাইভ টেস্ট করা যায়।
              </p>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  AdMob App ID (অ্যাপ্লিকেশন আইডি):
                </label>
                <input
                  type="text"
                  value={admobAppId}
                  onChange={(e) => setAdmobAppId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Banner Ad Unit ID (ব্যানার বিজ্ঞাপন ইউনিট আইডি):
                </label>
                <input
                  type="text"
                  value={bannerUnitId}
                  onChange={(e) => setBannerUnitId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Rewarded Video Ad Unit ID (ভিডিও বিজ্ঞাপন ইউনিট আইডি):
                </label>
                <input
                  type="text"
                  value={rewardedUnitId}
                  onChange={(e) => setRewardedUnitId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX/WWWWWWWWWW"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Interstitial Ad Unit ID (ফুল-স্ক্রিন পপআপ বিজ্ঞাপন আইডি):
                </label>
                <input
                  type="text"
                  value={interstitialUnitId}
                  onChange={(e) => setInterstitialUnitId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX/QQQQQQQQQQ"
                />
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-xl flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  কনফিগারেশন সফলভাবে ব্রাউজারে সংরক্ষিত হয়েছে!
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  বন্ধ করুন
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" /> সেটিংস সংরক্ষণ করুন
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>ধনকুন্ডী উত্তর পাড়া, সীমাবাড়ী, শেরপুর, বগুড়া</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">AdMob Integration Active</span>
        </div>

      </div>
    </div>
  );
};
