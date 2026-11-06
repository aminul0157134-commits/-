import React, { useState } from 'react';
import { BellRing, Calendar, PlusCircle, AlertCircle, Sparkles, CheckCircle2, User, X } from 'lucide-react';
import { NoticeItem } from '../types';

interface NoticeBoardProps {
  notices: NoticeItem[];
  onAddNotice: (notice: NoticeItem) => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices, onAddNotice }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New notice form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NoticeItem['category']>('জরুরি নোটিশ');
  const [content, setContent] = useState('');
  const [publishedBy, setPublishedBy] = useState('সমাজ কল্যাণ পরিষদ, ধনকুন্ডী উত্তর পাড়া');
  const [isImportant, setIsImportant] = useState(true);

  const categories = ['সব', 'জরুরি নোটিশ', 'সামাজিক উন্নয়ন', 'মিটিং ও সভা', 'খেলাধুলা ও সংস্কৃতি'];

  const filteredNotices = notices.filter((n) => {
    if (selectedCategory === 'সব') return true;
    return n.category === selectedCategory;
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNotice: NoticeItem = {
      id: `not-${Date.now()}`,
      title: title.trim(),
      category,
      date: 'আজকে',
      publishedBy: publishedBy.trim() || 'কার্যনির্বাহী পরিষদ',
      content: content.trim(),
      isImportant
    };

    onAddNotice(newNotice);
    setTitle('');
    setContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Add Button */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-1">
            <BellRing className="w-3.5 h-3.5 text-amber-600" />
            <span>অফিসিয়াল নোটিশ বোর্ড ও জরুরি বার্তা</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            গ্রামের সাম্প্রতিক ঘোষণা ও বিজ্ঞপ্তি
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            ধনকুন্ডী উত্তর পাড়া জামে মসজিদ, স্কুল রোড ও সমাজকল্যাণ পরিষদের সকল তথ্য
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন নোটিশ প্রকাশ করুন</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`p-5 rounded-3xl border transition-all ${
              notice.isImportant
                ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  notice.isImportant
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                }`}>
                  {notice.category}
                </span>

                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{notice.date}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>প্রকাশক: {notice.publishedBy}</span>
              </div>
            </div>

            <div className="mt-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {notice.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {notice.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Notice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BellRing className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base sm:text-lg">নতুন নোটিশ তৈরি করুন</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="p-5 space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  নোটিশের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="আমি মো: আমিনুল ইসলাম  আমি এই সাইটটি তৈরি করেছি কোন ভুল হলে আমাকে জানাবেন আমি পরিবর্তন করে দিবো ধন্যবাদ 💐"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
                  >
                    <option value="জরুরি নোটিশ">জরুরি নোটিশ</option>
                    <option value="সামাজিক উন্নয়ন">সামাজিক উন্নয়ন</option>
                    <option value="মিটিং ও সভা">মিটিং ও সভা</option>
                    <option value="খেলাধুলা ও সংস্কৃতি">খেলাধুলা ও সংস্কৃতি</option>
                    <option value="সাধারণ">সাধারণ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    প্রচারক / কমিটি
                  </label>
                  <input
                    type="text"
                    value={publishedBy}
                    onChange={(e) => setPublishedBy(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  নোটিশের মূল বিবরণ *
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="বিস্তারিত ঘোষণা লিখুন..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm leading-relaxed"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>জরুরি লাল ব্যানার দিয়ে হাইলাইট করুন</span>
              </label>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  নোটিশ প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
