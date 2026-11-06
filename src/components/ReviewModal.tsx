import React, { useState } from 'react';
import { X, MessageSquareHeart, Star, Heart, CheckCircle2, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BloodGroup, BloodReview } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: (review: BloodReview) => void;
  defaultDonorName?: string;
  defaultBloodGroup?: BloodGroup;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewSubmitted,
  defaultDonorName,
  defaultBloodGroup
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [donorName, setDonorName] = useState(defaultDonorName || 'ধনকুন্ডী উত্তর পাড়া রক্তদাতা ভাই');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(defaultBloodGroup || 'B+');
  const [hospital, setHospital] = useState('শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      setError('আপনার নাম লিখুন');
      return;
    }
    if (!comment.trim()) {
      setError('আপনার কমেন্ট বা ধন্যবাদ বার্তাটি লিখুন');
      return;
    }

    const newReview: BloodReview = {
      id: `rev-${Date.now()}`,
      donorName: donorName.trim() || 'রক্তদাতা ভাই',
      recipientName: recipientName.trim(),
      recipientPhone: recipientPhone.trim() ? recipientPhone.trim().replace(/(\d{5})\d+/, '$1-XXXXXX') : 'গোপন রাখা হয়েছে',
      bloodGroup,
      hospital: hospital.trim() || 'শেরপুর হাসপাতাল',
      comment: comment.trim(),
      rating,
      date: 'আজকে',
      verified: true
    };

    onReviewSubmitted(newReview);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore
    }

    setComment('');
    setRecipientName('');
    setError('');
    onClose();
  };

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <MessageSquareHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">রক্তগ্রহীতার কমেন্ট ও রিভিউ</h3>
              <p className="text-xs text-rose-100">
                রক্তদাতা ভাইয়ের প্রতি আপনার কৃতজ্ঞতা বা মতামত প্রকাশ করুন
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800 text-xs font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                আপনার নাম (রক্তগ্রহীতা/স্বজন) *
              </label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="যেমন: আরিফ হোসেন"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                আপনার মোবাইল নম্বর (গোপন থাকবে)
              </label>
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="017XX-XXXXXX"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                যে ভাই রক্ত দিয়েছেন তাঁর নাম
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="যেমন: সোহেল রানা ভাই"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                গৃহীত রক্তের গ্রুপ *
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-bold outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg} গ্রুপ
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              যে হাসপাতালে রক্ত নেওয়া হয়েছে
            </label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="যেমন: শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স / বগুড়া শজিমেক"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm"
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              রক্তদাতা ও গ্রাম পরিষদের সেবায় আপনার রেটিং:
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-amber-500 ml-2">
                {rating === 5 ? 'চমৎকার ও অসাধারণ!' : `${rating} স্টার`}
              </span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              আপনার অনুভূতি ও কৃতজ্ঞতা বার্তা (কমেন্ট) *
            </label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="যেমন: বিপদের সময় রক্তদাতা ভাই কোনো দেরি না করে শেরপুর হাসপাতালে এসে রক্ত দিয়ে আমার রোগীর জীবন বাঁচিয়েছেন। আল্লাহ সবাইকে নেক প্রতিদান দিন..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm leading-relaxed"
            />
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
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>কমেন্ট প্রকাশ করুন</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
