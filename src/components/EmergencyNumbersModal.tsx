import React, { useState } from 'react';
import { Phone, PhoneCall, Copy, Check, Search, Shield, Flame, UserCheck, HeartPulse, Zap, X } from 'lucide-react';
import { EmergencyContact } from '../types';
import { toBengaliDigits } from '../utils/bengaliUtils';

interface EmergencyNumbersProps {
  contacts: EmergencyContact[];
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
}

export const EmergencyNumbersModal: React.FC<EmergencyNumbersProps> = ({
  contacts,
  isOpen = false,
  onClose,
  isInline = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['সব', 'পুলিশ', 'ফায়ার সার্ভিস', 'ইউপি পরিষদ', 'চিকিৎসা', 'বিদ্যুৎ', 'প্রশাসন'];

  const filteredContacts = contacts.filter((c) => {
    const matchesCategory = selectedCategory === 'সব' || c.category === selectedCategory;
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'পুলিশ': return <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'ফায়ার সার্ভিস': return <Flame className="w-4 h-4 text-red-600 dark:text-red-400" />;
      case 'ইউপি পরিষদ': return <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'চিকিৎসা': return <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'বিদ্যুৎ': return <Zap className="w-4 h-4 text-amber-500" />;
      default: return <Phone className="w-4 h-4 text-slate-500" />;
    }
  };

  const content = (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পুলিশ, ফায়ার সার্ভিস, চেয়ারম্যান বা মেম্বার খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-3.5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    {getCategoryIcon(contact.category)}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                      {contact.title}
                    </h5>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                      {contact.name}
                    </p>
                  </div>
                </div>
                {contact.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium shrink-0">
                    {contact.badge}
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 mt-2 space-y-0.5">
                <p className="line-clamp-1">{contact.designation}</p>
                <p className="text-[11px] text-slate-400">অবস্থান: {contact.location} • {contact.available}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
              <div className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                {toBengaliDigits(contact.phone)}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(contact.phone, contact.id)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  title="নম্বর কপি করুন"
                >
                  {copiedId === contact.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>সরাসরি কল</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="p-8 text-center text-slate-400 text-xs">
          কোনো জরুরি নম্বর পাওয়া যায়নি
        </div>
      )}
    </div>
  );

  if (isInline) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-red-500" /> সরকারি ও জরুরি সেবা ডিরেক্টরি
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              শেরপুর থানা পুলিশ, ফায়ার সার্ভিস, সীমাবাড়ী ইউনিয়ন পরিষদ ও অ্যাম্বুলেন্স
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
            ২৪ ঘণ্টা সেবা
          </span>
        </div>
        {content}
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <PhoneCall className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">জরুরি ফোন নম্বর বাতায়ন</h3>
              <p className="text-xs text-red-100">
                ধনকুন্ডী উত্তর পাড়া ও শেরপুর উপজেলা বগুড়া
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-5">{content}</div>
      </div>
    </div>
  );
};
