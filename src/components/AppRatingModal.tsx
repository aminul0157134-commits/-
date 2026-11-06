import React, { useState } from 'react';
import { X, Star, Heart, CheckCircle2, User, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppReview } from '../types';

interface AppRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: AppReview) => void;
}

export const AppRatingModal: React.FC<AppRatingModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRoleOrLocation, setReviewerRoleOrLocation] = useState('ধনকুন্ডী উত্তর পাড়ার বাসিন্দা');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim()) {
      setError('আপনার নাম লিখুন');
      return;
    }
    if (!feedback.trim()) {
      setError('আপনার মূল্যবান রিভিউ বা মতামত লিখুন');
      return;
    }

    const newReview: AppReview = {
      id: `app-rev-${Date.now()}`,
      reviewerName: reviewerName.trim(),
      reviewerRoleOrLocation: reviewerRoleOrLocation.trim() || 'শুভাকাঙ্ক্ষী',
      rating,
      feedback: feedback.trim(),
      date: 'আজকে',
      verifiedVillager: true
    };

    onSubmitReview(newReview);

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.65 }
      });
    } catch (e) {
      // ignore
    }

    setReviewerName('');
    setFeedback('');
    setError('');
    onClose();
  };

  const roleSuggestions = [
    'ধনকুন্ডী উত্তর পাড়ার বাসিন্দা',
    'প্রবাসী ভাই (সৌদি আরব)',
    'প্রবাসী ভাই (দুবাই / ইউএই)',
    'প্রবাসী ভাই (কুয়েত / কাতার)',
    'সীমাবাড়ী ইউনিয়নের সাধারণ নাগরিক',
    'শিক্ষার্থী ও তরুণ ভলান্টিয়ার',
    'সম্মানিত মুরুব্বি ও সমাজসেবক'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30">
              <Star className="w-6 h-6 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">আমাদেরকে রিভিউ ও রেটিং দিন</h3>
              <p className="text-xs text-slate-900 font-medium">
                ধনকুন্ডী উত্তর পাড়া সেবা পরিষদের উদ্যোগ কেমন লেগেছে?
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors text-slate-950"
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

          {/* Star Rating Selector */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-center space-y-2">
            <label className="block font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
              আপনার রেটিং নির্বাচন করুন:
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-500 filter drop-shadow-xs'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-xs font-bold text-amber-700 dark:text-amber-300">
              {rating === 5 && '★★★★★ অসাধারণ ও চমৎকার উদ্যোগ!'}
              {rating === 4 && '★★★★☆ খুব ভালো সেবামূলক কাজ'}
              {rating === 3 && '★★★☆☆ ভালো'}
              {rating <= 2 && 'আরো উন্নতির সুযোগ রয়েছে'}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              আপনার পুরো নাম *
            </label>
            <input
              type="text"
              required
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="যেমন: মো: শহিদুল ইসলাম"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              আপনার পরিচয় বা অবস্থান
            </label>
            <input
              type="text"
              value={reviewerRoleOrLocation}
              onChange={(e) => setReviewerRoleOrLocation(e.target.value)}
              placeholder="যেমন: প্রবাসী ভাই (রিয়াদ) / ধনকুন্ডী উত্তর পাড়ার বাসিন্দা"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
            />
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1 mt-1.5">
              {roleSuggestions.slice(0, 3).map((sug) => (
                <button
                  type="button"
                  key={sug}
                  onClick={() => setReviewerRoleOrLocation(sug)}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              আপনার পর্যালোচনা ও মূল্যবান মতামত (কমেন্ট) *
            </label>
            <textarea
              rows={3}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="আমাদের অ্যাপ ও সেবা সম্পর্কে আপনার ভালো লাগা, রক্তদান উদ্যোগ বা যেকোনো উপদেশ লিখুন..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm leading-relaxed"
            />
          </div>

          {/* Action buttons */}
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
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Star className="w-4 h-4 fill-slate-950" />
              <span>রিভিউ জমা দিন</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
