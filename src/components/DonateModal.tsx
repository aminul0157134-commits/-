import React, { useState } from 'react';
import { X, HeartHandshake, DollarSign, Globe, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DonationRecord } from '../types';
import { VILLAGE_PAYMENT_ACCOUNTS } from '../data/initialData';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonationSubmitted: (record: DonationRecord) => void;
  defaultCampaignTitle?: string;
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  onDonationSubmitted,
  defaultCampaignTitle
}) => {
  const [donorName, setDonorName] = useState('');
  const [donorLocation, setDonorLocation] = useState('রিয়াদ, সৌদি আরব');
  const [isExpatriate, setIsExpatriate] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [amount, setAmount] = useState<number | ''>(5000);
  const [campaignTitle, setCampaignTitle] = useState(
    defaultCampaignTitle || 'অসুস্থ রহিম মিয়ার ওপেন হার্ট সার্জারি চিকিৎসা তহবিল'
  );
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Dutch-Bangla Bank' | 'নগদ ক্যাশ'>('bKash');
  const [trxId, setTrxId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setError('অনুদানের টাকার পরিমাণ লিখুন');
      return;
    }
    if (!isAnonymous && !donorName.trim()) {
      setError('আপনার নাম লিখুন অথবা নাম প্রকাশে অনিচ্ছুক নির্বাচন করুন');
      return;
    }

    const newRecord: DonationRecord = {
      id: `don-${Date.now()}`,
      donorName: isAnonymous ? 'নাম প্রকাশে অনিচ্ছুক ভাই' : donorName.trim(),
      donorLocation: donorLocation.trim() || (isExpatriate ? 'প্রবাসী ভাই' : 'ধনকুন্ডী'),
      isExpatriate,
      isAnonymous,
      amount: Number(amount),
      campaignTitle,
      paymentMethod,
      trxId: trxId.trim() || undefined,
      date: 'আজকে',
      message: message.trim() || undefined
    };

    onDonationSubmitted(newRecord);

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setAmount('');
    setTrxId('');
    setMessage('');
    setError('');
    onClose();
  };

  const countries = [
    'রিয়াদ, সৌদি আরব',
    'জেদ্দা, সৌদি আরব',
    'মক্কা/মদিনা, সৌদি আরব',
    'দুবাই, সংযুক্ত আরব আমিরাত',
    'আবুধাবি, ইউএই',
    'কুয়েত সিটি, কুয়েত',
    'দোহা, কাতার',
    'মাস্কাট, ওমান',
    'কুয়ালালামপুর, মালয়েশিয়া',
    'সিঙ্গাপুর',
    'রোম / মিলান, ইতালি',
    'লন্ডন, যুক্তরাজ্য',
    'ঢাকা, বাংলাদেশ',
    'বগুড়া শহর',
    'ধনকুন্ডী উত্তর পাড়া'
  ];

  const campaigns = [
    'অসুস্থ রহিম মিয়ার ওপেন হার্ট সার্জারি চিকিৎসা তহবিল',
    'দরিদ্র এতিম ফাতেমার কন্যার বিয়েতে আর্থিক উপহার',
    'প্রবাসী ভাইদের সার্বিক গ্রাম উন্নয়ন ও রাস্তা সংস্কার তহবিল',
    'উত্তর পাড়া জামে মসজিদ সম্প্রসারণ ও অজুখানা',
    'জরুরি শীতবস্ত্র ও সাধারণ সমাজসেবা তহবিল'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <HeartHandshake className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">অনুদানের তথ্য সাবমিট করুন</h3>
              <p className="text-xs text-emerald-100">
                প্রবাসী ও দেশি ভাইদের মানবিক সহায়তা তহবিল
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

        {/* Quick Payment Account Note */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 border-b border-emerald-100 dark:border-emerald-900/60 text-xs">
          <p className="text-emerald-900 dark:text-emerald-200 font-semibold mb-1">
            টাকা পাঠানোর অফিসিয়াল নম্বরসমূহ:
          </p>
          <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-700 dark:text-slate-300 font-mono">
            <span className="p-1 rounded bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-center">
              বিকাশ: {VILLAGE_PAYMENT_ACCOUNTS.bkash.number}
            </span>
            <span className="p-1 rounded bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-center">
              নগদ: {VILLAGE_PAYMENT_ACCOUNTS.nagad.number}
            </span>
            <span className="p-1 rounded bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-center">
              DBBL: {VILLAGE_PAYMENT_ACCOUNTS.dbbl.accountNumber}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800 text-xs font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              যে ফান্ডে দান করতে চান *
            </label>
            <select
              value={campaignTitle}
              onChange={(e) => setCampaignTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm font-semibold"
            >
              {campaigns.map((camp) => (
                <option key={camp} value={camp}>
                  {camp}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                অনুদানের পরিমাণ (টাকা) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
                <input
                  type="number"
                  min="50"
                  step="100"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="5000"
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-600 dark:text-emerald-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                পেমেন্ট মাধ্যম *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              >
                <option value="bKash">বিকাশ (bKash)</option>
                <option value="Nagad">নগদ (Nagad)</option>
                <option value="Dutch-Bangla Bank">ডাচ্-বাংলা ব্যাংক (DBBL / রকেট)</option>
                <option value="নগদ ক্যাশ">সরাসরি ক্যাশ প্রদান</option>
              </select>
            </div>
          </div>

          {/* Donor details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                আপনার নাম *
              </label>
              <input
                type="text"
                disabled={isAnonymous}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder={isAnonymous ? 'নাম প্রকাশে অনিচ্ছুক' : 'যেমন: মো: রফিকুল আলম'}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                আপনার দেশ বা বর্তমান শহর
              </label>
              <select
                value={donorLocation}
                onChange={(e) => setDonorLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                ট্রানজেকশন আইডি (TrxID)
              </label>
              <input
                type="text"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder="যেমন: BKSH-99214 বা ব্যাংক ডিপোজিট স্লিপ"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                দোয়া বা বার্তা
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="যেমন: আল্লাহ রোগীকে শেফা দান করুন"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={isExpatriate}
                onChange={(e) => setIsExpatriate(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>আমি একজন প্রবাসী ভাই</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>নাম গোপন রাখুন</span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>অনুদানের বিবরণ নিশ্চিত করুন</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
