import React, { useState } from 'react';
import { Droplet, Phone, Heart, PlusCircle, MessageSquareHeart, Star, UserCheck, CheckCircle2, AlertCircle, Share2 } from 'lucide-react';
import { BloodGroup, BloodRequest, BloodReview, VillageMember } from '../types';
import { toBengaliDigits } from '../utils/bengaliUtils';

interface BloodBankSectionProps {
  members: VillageMember[];
  requests: BloodRequest[];
  reviews: BloodReview[];
  onOpenRequestModal: () => void;
  onOpenAddDonorModal: () => void;
  onOpenReviewModal: (donorName?: string, bloodGroup?: BloodGroup) => void;
}

export const BloodBankSection: React.FC<BloodBankSectionProps> = ({
  members,
  requests,
  reviews,
  onOpenRequestModal,
  onOpenAddDonorModal,
  onOpenReviewModal
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState('');

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  // Filter blood donors
  const bloodDonors = members.filter((m) => m.isAvailableForBlood);

  const filteredDonors = bloodDonors.filter((donor) => {
    const matchesGroup = selectedGroup === 'সব' || donor.bloodGroup === selectedGroup;
    const matchesSearch =
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.phone.includes(searchQuery) ||
      donor.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  // Calculate count per group
  const getGroupCount = (group: BloodGroup) => {
    return bloodDonors.filter((d) => d.bloodGroup === group).length;
  };

  const activeRequests = requests.filter((r) => r.status === 'সক্রিয়');

  return (
    <div className="space-y-6">
      
      {/* Hero Banner for Blood Bank */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
            <Droplet className="w-4 h-4 fill-white" />
            <span>ধনকুন্ডী উত্তর পাড়া রক্তদান নেটওয়ার্ক</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
            এক ব্যাগ রক্ত, একটি নতুন জীবন
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-red-100 leading-relaxed">
            ধনকুন্ডী উত্তর পাড়া ও সীমাবাড়ীর যেকোনো রোগীর জরুরি রক্তের প্রয়োজনে আমাদের যুব সমাজ প্রস্তুত। সরাসরি রক্তদাতার নম্বরে যোগাযোগ করুন কিংবা রক্তের আবেদন জানান।
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <button
              onClick={onOpenRequestModal}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 active:scale-95 text-red-600 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Droplet className="w-4 h-4 fill-red-600 text-red-600" />
              <span>রক্তের জন্য আবেদন করুন</span>
            </button>

            <button
              onClick={onOpenAddDonorModal}
              className="px-4 py-2.5 rounded-xl bg-red-800/80 hover:bg-red-900 border border-white/20 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>রক্তদাতা হিসেবে যোগ দিন</span>
            </button>

            <button
              onClick={() => onOpenReviewModal()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>রক্ত পেয়ে কমেন্ট করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Urgent Requests Notification */}
      {activeRequests.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
              জরুরি রক্তের চলতি আবেদন ({toBengaliDigits(activeRequests.length)} টি)
            </h3>
            <span className="text-xs text-slate-500">তাত্ক্ষণিক সহায়তা প্রয়োজন</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {activeRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/30 border-2 border-red-300 dark:border-red-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-red-600 text-white font-black text-sm font-mono">
                          {req.bloodGroup}
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                          {req.patientName}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        হাসপাতাল: <strong>{req.hospitalName}</strong>
                      </p>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-[11px] font-bold shrink-0">
                      {req.urgencyLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl">
                    {req.notes}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>প্রয়োজন: <strong>{toBengaliDigits(req.bagsNeeded)} ব্যাগ</strong></span>
                    <span>সময়: <strong>{req.neededDate}</strong></span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-red-200 dark:border-red-900/60 flex items-center justify-between gap-2">
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    {toBengaliDigits(req.contactPhone)}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenReviewModal(undefined, req.bloodGroup)}
                      className="px-2.5 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium hover:bg-rose-100 dark:hover:bg-rose-950 transition-colors"
                    >
                      কমেন্ট দিন
                    </button>
                    <a
                      href={`tel:${req.contactPhone}`}
                      className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>কল করুন</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blood Group Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Droplet className="w-5 h-5 text-red-600" /> রক্তের গ্রুপ অনুযায়ী রক্তদাতা তালিকা
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            রক্তের গ্রুপে চাপ দিয়ে সহজেই নির্দিষ্ট গ্রুপের রক্তদাতা ভাইদের খুঁজে নিন
          </p>
        </div>

        {/* Group Selector Cards */}
        <div className="grid grid-cols-4 sm:grid-cols-9 gap-2">
          <button
            onClick={() => setSelectedGroup('সব')}
            className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all ${
              selectedGroup === 'সব'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <span className="text-xs font-bold">সব গ্রুপ</span>
            <span className="text-[11px] opacity-80 font-mono">
              {toBengaliDigits(bloodDonors.length)}
            </span>
          </button>

          {bloodGroups.map((bg) => {
            const count = getGroupCount(bg);
            const isSelected = selectedGroup === bg;
            return (
              <button
                key={bg}
                onClick={() => setSelectedGroup(bg)}
                className={`p-2 rounded-2xl flex flex-col items-center justify-center border transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600 shadow-md scale-105'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-red-300'
                }`}
              >
                <span className={`text-base font-black font-mono ${isSelected ? 'text-white' : 'text-red-600 dark:text-red-400'}`}>
                  {bg}
                </span>
                <span className={`text-[10px] font-medium ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>
                  {toBengaliDigits(count)} জন
                </span>
              </button>
            );
          })}
        </div>

        {/* Donors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:border-red-300 dark:hover:border-red-800 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={donor.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                      alt={donor.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-red-200 dark:border-red-900"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {donor.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {donor.role}
                      </p>
                    </div>
                  </div>

                  <span className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-xs font-mono shrink-0 shadow-xs">
                    {donor.bloodGroup}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <p>পিতা: {donor.fatherName}</p>
                  <p>ঠিকানা: {donor.address}</p>
                  <p>পেশা: {donor.occupation}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>রক্ত দিয়েছেন: <strong>{toBengaliDigits(donor.totalDonationCount)} বার</strong></span>
                    {donor.lastDonationDate && <span>সর্বশেষ: {donor.lastDonationDate}</span>}
                  </div>
                </div>
              </div>

              {/* Donor Contact Bar */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                  {toBengaliDigits(donor.phone)}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenReviewModal(donor.name, donor.bloodGroup)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs"
                    title="রক্ত নেওয়ার পর রিভিউ ও কমেন্ট দিন"
                  >
                    <MessageSquareHeart className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                  <a
                    href={`https://wa.me/880${donor.phone.replace(/[^0-9]/g, '').slice(-10)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1"
                  >
                    হোয়াটসঅ্যাপ
                  </a>
                  <a
                    href={`tel:${donor.phone}`}
                    className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>কল</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            এই গ্রুপের কোনো রক্তদাতা খুঁজে পাওয়া যায়নি।
          </div>
        )}
      </div>

      {/* Recipient Reviews & Gratitude Comments Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquareHeart className="w-5 h-5 text-rose-500" /> রক্তগ্রহীতাদের কমেন্ট ও রিভিউ
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              রক্ত পেয়ে গ্রামবাসী ভাই ও রোগীরা যে অনুভূতি ও দোয়া জানিয়েছেন
            </p>
          </div>

          <button
            onClick={() => onOpenReviewModal()}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>আপনার কমেন্ট যুক্ত করুন</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/80 text-red-700 dark:text-red-200 font-bold">
                    {rev.bloodGroup}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-rose-100 dark:border-rose-900/40 text-[11px]">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{rev.recipientName}</span>
                  <span className="text-slate-400 font-normal">{rev.date}</span>
                </div>
                <div className="text-emerald-700 dark:text-emerald-400 mt-0.5">
                  রক্তদাতা: <strong>{rev.donorName}</strong> ({rev.hospital})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
