import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Heart, 
  Droplet, 
  Users, 
  Star, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  GraduationCap, 
  Church, 
  Car, 
  CheckCircle2, 
  Plane,
  HeartHandshake
} from 'lucide-react';
import { AppReview } from '../types';
import { toBengaliDigits } from '../utils/bengaliUtils';

interface AboutVillageSectionProps {
  reviews: AppReview[];
  onOpenRatingModal: () => void;
}

export const AboutVillageSection: React.FC<AboutVillageSectionProps> = ({
  reviews,
  onOpenRatingModal
}) => {
  const [activeFilterStar, setActiveFilterStar] = useState<number | 'all'>('all');

  // Calculate rating stats
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r) => r.rating === 4).length;
  const threeStarCount = reviews.filter((r) => r.rating === 3).length;

  const filteredReviews = reviews.filter((r) => {
    if (activeFilterStar === 'all') return true;
    return r.rating === activeFilterStar;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 p-6 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold mb-3 text-amber-300">
            <MapPin className="w-3.5 h-3.5" />
            <span>গ্রাম পরিচিতি ও সেবামূলক বাতায়ন</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            আমাদের প্রিয় গ্রাম: ধনকুন্ডী উত্তর পাড়া
          </h2>

          <p className="mt-3 text-xs sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
            বগুড়া জেলার শেরপুর উপজেলার ৯নং সীমাবাড়ী ইউনিয়ন পরিষদের অন্তর্গত একটি ঐতিহ্যবাহী, শান্তিপ্রিয় ও সুসংগঠিত গ্রাম। সম্প্রীতি, পারস্পরিক ভালোবাসা ও সমাজসেবায় এ গ্রাম এক উজ্জ্বল দৃষ্টান্ত।
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenRatingModal}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Star className="w-4 h-4 fill-slate-950" />
              <span>আমাদেরকে রিভিউ ও রেটিং দিন</span>
            </button>

            <a
              href="#village-details"
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm transition-colors"
            >
              গ্রাম সম্পর্কে বিস্তারিত পড়ুন ↓
            </a>
          </div>
        </div>
      </div>

      {/* Village Quick Info Grid */}
      <div id="village-details" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] text-slate-400">গ্রামের নাম</span>
          <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
            ধনকুন্ডী উত্তর পাড়া
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
            ঐতিহ্যবাহী সমাজ
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] text-slate-400">ইউনিয়ন পরিষদ</span>
          <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
            ৯নং সীমাবাড়ী ইউনিয়ন
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            ২নং ওয়ার্ড
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] text-slate-400">উপজেলা ও জেলা</span>
          <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
            শেরপুর, বগুড়া
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            রাজশাহী বিভাগ
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] text-slate-400">সার্বিক রেটিং</span>
          <div className="font-black text-sm sm:text-base text-amber-500 mt-0.5 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{toBengaliDigits(averageRating)} / ৫.০</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {toBengaliDigits(totalReviews)} টি পর্যালোচনা
          </div>
        </div>
      </div>

      {/* Village Comprehensive Story & About Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Details & History */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Overview */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Compass className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                ভৌগোলিক পরিচিতি ও গ্রামীণ প্রকৃতি
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>ধনকুন্ডী উত্তর পাড়া</strong> বগুড়া জেলার দক্ষিণ অঞ্চলের ঐতিহ্যবাহী শেরপুর উপজেলার সীমাবাড়ী ইউনিয়নের একটি শ্যামল ও সুশোভিত জনপদ। উত্তর পাড়া জুড়ে রয়েছে বিস্তীর্ণ সোনালী ধানের মাঠ, ভুট্টা ও শাকসবজির সবুজ সমারোহ। গ্রামের শান্ত ছায়াঘেরা মেঠোপথ এবং প্রবীণ বটবৃক্ষ ও জামে মসজিদ সংলগ্ন চত্বরে গ্রামবাসীর আন্তরিক আড্ডা গ্রামীণ জীবনের চিরায়ত সৌন্দর্য ফুটিয়ে তোলে।
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              বগুড়া শহরের বিখ্যাত ঐতিহ্য, দই-মিষ্টি ও মেহমানদারির গৌরব বহন করে ধনকুন্ডী উত্তর পাড়ার প্রতিটি পরিবার। এখানে সকল ধর্ম ও মতের মানুষ সম্প্রীতির বন্ধনে আবদ্ধ হয়ে যুগ যুগ ধরে বসবাস করে আসছেন।
            </p>
          </div>

          {/* Section 2: Mission & Social Work */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <HeartHandshake className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                আমাদের সেবা পরিষদ গঠনের মূল উদ্দেশ্য
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 space-y-1">
                <div className="font-bold text-red-700 dark:text-red-300 flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 fill-red-600" /> জরুরি রক্তদান নিশ্চিতকরণ
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  শেরপুর স্বাস্থ্য কমপ্লেক্স বা বগুড়া শজিমেক হাসপাতালে যেকোনো রোগীর জন্য তাৎক্ষণিক রক্তের গ্রুপ ডাটাবেজ থেকে রক্তদাতা পৌঁছানো।
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
                <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-emerald-600" /> দরিদ্র ও অসুস্থদের চিকিৎসা তহবিল
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  অভাবী দিনমজুর ও অসুস্থ ভাইদের ব্যয়বহুল অস্ত্রোপচার ও ওষুধের খরচে গ্রামবাসী ও প্রবাসী ভাইদের সম্মিলিত অনুদান প্রদান।
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-pink-50/60 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/60 space-y-1">
                <div className="font-bold text-pink-700 dark:text-pink-300 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-pink-600" /> দরিদ্র মেয়ের বিবাহ সহায়তা
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  টাকার অভাবে যাতে কোনো অসহায় পিতার কন্যার বিবাহ আটকে না যায়, সেজন্য উপহার ও আর্থিক অনুদান ফান্ড পরিচালনা।
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-1">
                <div className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <Plane className="w-4 h-4 text-amber-600" /> প্রবাসী ভাইদের উন্নয়ন মেলবন্ধন
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  সৌদি, দুবাই, কাতার, কুয়েত প্রবাসীদের কষ্টে উপার্জিত রেমিট্যান্সের মাধ্যমে রাস্তা সংস্কার, মসজিদ উন্নয়ন ও শীতবস্ত্র বিতরণ।
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Route & How to Reach */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Car className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                কীভাবে আমাদের গ্রামে আসবেন (যাতায়াত ব্যবস্থা)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              ঢাকা বা বগুড়া শহর থেকে ঢাকা-বগুড়া জাতীয় মহাসড়ক (এন-৫) ধরে <strong>শেরপুর বাসস্ট্যান্ড</strong> অথবা <strong>সীমাবাড়ী বাজার মোড়</strong>-এ নামতে হবে। সেখান থেকে সিএনজিচালিত অটোরিকশা, ব্যাটারিচালিত রিকশা বা ভ্যানযোগে পাকা রাস্তা ধরে মাত্র ৫ থেকে ১০ মিনিটে সরাসরি ধনকুন্ডী উত্তর পাড়া জামে মসজিদ ও সরকারি প্রাথমিক বিদ্যালয়ে পৌঁছানো যায়।
            </p>
          </div>

        </div>

        {/* Right 1 Col: Key Landmarks & Contact Snapshot */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Building2 className="w-4 h-4 text-emerald-600" /> প্রধান প্রতিষ্ঠান ও ল্যান্ডমার্ক
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Church className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">ধনকুন্ডী উত্তর পাড়া জামে মসজিদ</strong>
                  <p className="text-[11px] text-slate-500">গ্রামের কেন্দ্রীয় এবাদতখানা ও সাপ্তাহিক সম্মিলন</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">ধনকুন্ডী সরকারি প্রাথমিক বিদ্যালয়</strong>
                  <p className="text-[11px] text-slate-500">শাহেনাজ সিরাজ হাই স্কুল ও কারিগরি শিক্ষাপ্রতিষ্ঠান </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">ধনকুন্ডী আয়শা মওলা বক্স দাখিল মাদ্রাসা </strong>
                  <p className="text-[11px] text-slate-500"> সিমাবাড়ী ব্যবসা-বাণিজ্য ও প্রধান যোগাযোগ রুট</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">যুব ও ক্রীড়া সংসদ খেলার মাঠ</strong>
                  <p className="text-[11px] text-slate-500">বার্ষিক ফুটবল ও ক্রিকেট টুর্নামেন্টের ভেন্যু</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Feedback Pitch Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-black">
              <Star className="w-5 h-5 fill-slate-950 text-slate-950" />
            </div>
            <h4 className="font-bold text-base leading-tight">
              আমাদের উদ্যোগ আপনার কেমন লাগছে?
            </h4>
            <p className="text-xs text-slate-900 leading-relaxed font-medium">
              আপনার মতামত, ভালো লাগা বা মূল্যবান পরামর্শ আমাদেরকে গ্রামের মানুষের সেবায় আরও অনুপ্রেরণা জোগাবে।
            </p>
            <button
              onClick={onOpenRatingModal}
              className="w-full py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>রিভিউ ও রেটিং প্রদান করুন</span>
            </button>
          </div>

        </div>

      </div>

      {/* REVIEWS & RATINGS SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Rating Header & Summary Card */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>জনগণের মতামত ও মূল্যায়ন</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">
              গ্রামবাসী ও শুভাকাঙ্ক্ষীদের রিভিউ ও রেটিং
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              ধনকুন্ডী উত্তর পাড়া সেবা পরিষদের স্বচ্ছতা ও কার্যক্রমে মানুষের সন্তুষ্টির চিত্র
            </p>
          </div>

          <button
            onClick={onOpenRatingModal}
            className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Star className="w-4 h-4 fill-slate-950" />
            <span>একটি রিভিউ লিখুন</span>
          </button>
        </div>

        {/* Rating Score Dashboard */}
        <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Big Score */}
          <div className="text-center md:text-left space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-amber-500 font-mono flex items-center justify-center md:justify-start gap-2">
              <span>{toBengaliDigits(averageRating)}</span>
              <span className="text-lg text-slate-400 font-normal">/ ৫.০</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              সর্বমোট {toBengaliDigits(totalReviews)} জন নিবন্ধিত পর্যালোচনা করেছেন
            </p>
          </div>

          {/* Star Breakdown Bars */}
          <div className="md:col-span-2 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-12 font-medium text-slate-600 dark:text-slate-400">৫ স্টার</span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${totalReviews > 0 ? (fiveStarCount / totalReviews) * 100 : 100}%` }}
                ></div>
              </div>
              <span className="w-8 text-right font-mono text-slate-400">{toBengaliDigits(fiveStarCount)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-12 font-medium text-slate-600 dark:text-slate-400">৪ স্টার</span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${totalReviews > 0 ? (fourStarCount / totalReviews) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="w-8 text-right font-mono text-slate-400">{toBengaliDigits(fourStarCount)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-12 font-medium text-slate-600 dark:text-slate-400">৩ স্টার</span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${totalReviews > 0 ? (threeStarCount / totalReviews) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="w-8 text-right font-mono text-slate-400">{toBengaliDigits(threeStarCount)}</span>
            </div>
          </div>

        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFilterStar('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeFilterStar === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            সব রিভিউ ({toBengaliDigits(totalReviews)})
          </button>
          <button
            onClick={() => setActiveFilterStar(5)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeFilterStar === 5
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            ৫ স্টার ({toBengaliDigits(fiveStarCount)})
          </button>
          <button
            onClick={() => setActiveFilterStar(4)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeFilterStar === 4
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            ৪ স্টার ({toBengaliDigits(fourStarCount)})
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-700 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                      {rev.reviewerName.slice(0, 1)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                        {rev.reviewerName}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {rev.reviewerRoleOrLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-2.5">
                  "{rev.feedback}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> যাচাইকৃত পর্যালোচনা
                </span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
