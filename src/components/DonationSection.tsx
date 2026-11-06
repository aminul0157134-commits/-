import React, { useState } from 'react';
import { HeartHandshake, Copy, Check, Plane, Heart, ShieldCheck, ArrowRight, Sparkles, Building2, Smartphone, Users } from 'lucide-react';
import { DonationCampaign, DonationRecord } from '../types';
import { VILLAGE_PAYMENT_ACCOUNTS } from '../data/initialData';
import { formatTaka, toBengaliDigits } from '../utils/bengaliUtils';

interface DonationSectionProps {
  campaigns: DonationCampaign[];
  donationRecords: DonationRecord[];
  onOpenDonateModal: (campaignTitle?: string) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  campaigns,
  donationRecords,
  onOpenDonateModal
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('সব');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const totalRaised = donationRecords.reduce((acc, curr) => acc + curr.amount, 0);
  const expatRaised = donationRecords
    .filter((d) => d.isExpatriate)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const filteredCampaigns = campaigns.filter((c) => {
    if (filterCategory === 'সব') return true;
    return c.category === filterCategory;
  });

  const filteredRecords = donationRecords.filter((d) => {
    const matchSearch =
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.donorLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Stats */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-6 sm:p-8 text-white shadow-lg">
        {/* Decorative background glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-semibold mb-3">
            <HeartHandshake className="w-4 h-4" />
            <span>ধনকুন্ডী উত্তর পাড়া মানবিক সহায়তা ও প্রবাসী কল্যাণ তহবিল</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black leading-tight tracking-tight">
            অসুস্থদের চিকিৎসা ও দরিদ্র মেয়ের বিয়েতে আমাদের অঙ্গীকার
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            গ্রামে কেউ অর্থাভাবে বিনা চিকিৎসায় কষ্ট পাবে না, কিংবা কোনো দরিদ্র ঘরের মেয়ের বিয়ে আটকে থাকবে না। দেশ ও বিদেশের সকল ভাই-বোনের সম্মিলিত সহযোগিতায় গড়ে উঠেছে এই গণতহবিল।
          </p>

          {/* Quick Metrics */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
              <span className="text-[11px] text-emerald-200">মোট সংগৃহীত অনুদান</span>
              <div className="text-lg sm:text-xl font-bold text-amber-300 font-mono mt-0.5">
                {formatTaka(totalRaised)}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
              <span className="text-[11px] text-emerald-200">প্রবাসী ভাইদের অনুদান</span>
              <div className="text-lg sm:text-xl font-bold text-emerald-300 font-mono mt-0.5">
                {formatTaka(expatRaised)}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
              <span className="text-[11px] text-emerald-200">চলমান ক্যাম্পেইন</span>
              <div className="text-lg sm:text-xl font-bold text-white font-mono mt-0.5">
                {toBengaliDigits(campaigns.filter((c) => c.status === 'চলমান').length)} টি
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
              <span className="text-[11px] text-emerald-200">মোট সাহায্যকারী</span>
              <div className="text-lg sm:text-xl font-bold text-white font-mono mt-0.5">
                {toBengaliDigits(donationRecords.length)} জন
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <button
              onClick={() => onOpenDonateModal()}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>এখনই অনুদান প্রদান করুন</span>
            </button>
            <a
              href="#payment-accounts"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5"
            >
              <span>বিকাশ / নগদ / ব্যাংক নম্বর দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Payment Channels Section */}
      <div id="payment-accounts" className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" /> টাকা পাঠানোর অফিসিয়াল চ্যানেল
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              বিকাশ, নগদ বা ডাচ্-বাংলা ব্যাংকে সরাসরি টাকা পাঠিয়ে নিচে ফর্মটি পূরণ করুন
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            ১০০% নিরাপদ ও স্বচ্ছ হিসাব
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* bKash Card */}
          <div className="p-4 rounded-2xl bg-pink-50/60 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-pink-600 text-white text-[11px] font-bold">
                  বিকাশ (bKash)
                </span>
                <span className="text-[11px] text-pink-700 dark:text-pink-300 font-medium">
                  {VILLAGE_PAYMENT_ACCOUNTS.bkash.type}
                </span>
              </div>
              <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 dark:text-white my-1">
                {VILLAGE_PAYMENT_ACCOUNTS.bkash.number}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                হিসাবধারক: {VILLAGE_PAYMENT_ACCOUNTS.bkash.holder}
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                {VILLAGE_PAYMENT_ACCOUNTS.bkash.note}
              </p>
            </div>

            <button
              onClick={() => handleCopy(VILLAGE_PAYMENT_ACCOUNTS.bkash.number, 'bkash')}
              className="mt-4 w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedType === 'bkash' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>নম্বর কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>বিকাশ নম্বর কপি করুন</span>
                </>
              )}
            </button>
          </div>

          {/* Nagad Card */}
          <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-orange-600 text-white text-[11px] font-bold">
                  নগদ (Nagad)
                </span>
                <span className="text-[11px] text-orange-700 dark:text-orange-300 font-medium">
                  {VILLAGE_PAYMENT_ACCOUNTS.nagad.type}
                </span>
              </div>
              <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 dark:text-white my-1">
                {VILLAGE_PAYMENT_ACCOUNTS.nagad.number}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                হিসাবধারক: {VILLAGE_PAYMENT_ACCOUNTS.nagad.holder}
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                {VILLAGE_PAYMENT_ACCOUNTS.nagad.note}
              </p>
            </div>

            <button
              onClick={() => handleCopy(VILLAGE_PAYMENT_ACCOUNTS.nagad.number, 'nagad')}
              className="mt-4 w-full py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedType === 'nagad' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>নম্বর কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>নগদ নম্বর কপি করুন</span>
                </>
              )}
            </button>
          </div>

          {/* Dutch-Bangla Bank Card */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-blue-700 text-white text-[11px] font-bold">
                  ডাচ্-বাংলা ব্যাংক (DBBL)
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 font-medium">
                  {VILLAGE_PAYMENT_ACCOUNTS.dbbl.branch}
                </span>
              </div>
              <div className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
                অ্যাকাউন্ট: {VILLAGE_PAYMENT_ACCOUNTS.dbbl.accountNumber}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                নাম: {VILLAGE_PAYMENT_ACCOUNTS.dbbl.accountName}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                {VILLAGE_PAYMENT_ACCOUNTS.dbbl.rocketNumber}
              </p>
            </div>

            <button
              onClick={() => handleCopy(VILLAGE_PAYMENT_ACCOUNTS.dbbl.accountNumber, 'dbbl')}
              className="mt-4 w-full py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedType === 'dbbl' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>অ্যাকাউন্ট নম্বর কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>ব্যাংক হিসাব নম্বর কপি করুন</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Expatriate Brothers' Special Spotlight */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Plane className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              প্রবাসী রেমিট্যান্স যোদ্ধা ভাইদের কর্নার
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              সৌদি আরব, কুয়েত, কাতার, দুবাই, ওমান, মালয়েশিয়া থেকে গ্রামের যে ভাইয়েরা নিয়মিত অবদান রাখছেন
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenDonateModal('প্রবাসী ভাইদের সার্বিক গ্রাম উন্নয়ন ও রাস্তা সংস্কার তহবিল')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs whitespace-nowrap cursor-pointer"
        >
          প্রবাস থেকে ডোনেশন দিন
        </button>
      </div>

      {/* Campaigns Grid */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" /> মানবিক অনুদান ক্যাম্পেইনসমূহ
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              যে খাতে আপনার অনুদান সরাসরি অসহায় মানুষের কল্যাণে ব্যয়িত হবে
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
            {['সব', 'অসুস্থদের চিকিৎসা', 'দরিদ্র মেয়ের বিয়ে', 'প্রবাসী ভাইদের ফান্ড'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCampaigns.map((camp) => {
            const progress = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));
            return (
              <div
                key={camp.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
              >
                <div>
                  {camp.imageUrl && (
                    <div className="h-40 w-full rounded-2xl overflow-hidden mb-3 relative">
                      <img
                        src={camp.imageUrl}
                        alt={camp.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold">
                        {camp.category}
                      </div>
                      {camp.urgent && (
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold animate-pulse">
                          জরুরি আবেদন
                        </div>
                      )}
                    </div>
                  )}

                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {camp.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {camp.description}
                  </p>

                  <div className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
                    উপকৃত: <strong>{camp.beneficiaryName}</strong> ({camp.villageLocation})
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">সংগৃহীত: <strong className="text-emerald-600 dark:text-emerald-400">{formatTaka(camp.raisedAmount)}</strong></span>
                      <span className="text-slate-500">লক্ষ্য: <strong>{formatTaka(camp.targetAmount)}</strong></span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <div className="text-right text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {toBengaliDigits(progress)}% সম্পন্ন হয়েছে
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${camp.status === 'চলমান' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    {camp.status}
                  </span>

                  <button
                    onClick={() => onOpenDonateModal(camp.title)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>এই ফান্ডে অনুদান দিন</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Transparent Ledger of Donations */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> স্বচ্ছ হিসাব ও দাতাদের তালিকা
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              গ্রামবাসী ও প্রবাসী ভাইদের জমাকৃত প্রতিটি টাকার হিসাব এখানে সংরক্ষিত
            </p>
          </div>

          <button
            onClick={() => onOpenDonateModal()}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer"
          >
            + অনুদান এন্ট্রি করুন
          </button>
        </div>

        {/* Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="pb-3 font-semibold">দাতার নাম ও অবস্থান</th>
                <th className="pb-3 font-semibold">ফান্ডের খাত</th>
                <th className="pb-3 font-semibold">পেমেন্ট মাধ্যম</th>
                <th className="pb-3 font-semibold text-right">পরিমাণ (টাকা)</th>
                <th className="pb-3 font-semibold text-right">তারিখ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {record.donorName}
                      {record.isExpatriate && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-medium">
                          প্রবাসী
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {record.donorLocation}
                    </div>
                    {record.message && (
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400 italic mt-0.5">
                        "{record.message}"
                      </div>
                    )}
                  </td>
                  <td className="py-3 text-slate-700 dark:text-slate-300">
                    {record.campaignTitle}
                  </td>
                  <td className="py-3">
                    <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      {record.paymentMethod} {record.trxId ? `(${record.trxId})` : ''}
                    </span>
                  </td>
                  <td className="py-3 text-right font-bold text-emerald-600 dark:text-emerald-400 text-sm font-mono">
                    {formatTaka(record.amount)}
                  </td>
                  <td className="py-3 text-right text-slate-500 dark:text-slate-400">
                    {record.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
