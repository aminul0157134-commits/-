import React, { useState } from 'react';
import { X, UserPlus, Droplet, Phone, MapPin, Briefcase, Award, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BloodGroup, MemberRole, VillageMember } from '../types';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: VillageMember) => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember
}) => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('B+');
  const [occupation, setOccupation] = useState('');
  const [role, setRole] = useState<MemberRole>('সাধারণ সদস্য');
  const [address, setAddress] = useState('ধনকুন্ডী উত্তর পাড়া');
  const [currentLocation, setCurrentLocation] = useState('ধনকুন্ডী উত্তর পাড়া');
  const [isAvailableForBlood, setIsAvailableForBlood] = useState(true);
  const [isExpatriate, setIsExpatriate] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('সদস্যের নাম লিখুন');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError('সঠিক মোবাইল নম্বর প্রদান করুন');
      return;
    }

    const newMember: VillageMember = {
      id: `mem-${Date.now()}`,
      name: name.trim(),
      fatherName: fatherName.trim() || 'উল্লেখ করা হয়নি',
      phone: phone.trim(),
      altPhone: altPhone.trim() || undefined,
      bloodGroup,
      occupation: occupation.trim() || 'সমাজসেবক',
      role,
      isAvailableForBlood,
      totalDonationCount: 0,
      address: address.trim() || 'ধনকুন্ডী উত্তর পাড়া',
      currentLocation: currentLocation.trim() || 'ধনকুন্ডী উত্তর পাড়া',
      isExpatriate,
      joinedDate: 'আজকে',
      avatarUrl: `https://images.unsplash.com/photo-${isExpatriate ? '1506794778202-cad84cf45f1d' : '1507003211169-0a1dd7228f2d'}?w=300&auto=format&fit=crop&q=80`
    };

    onAddMember(newMember);

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    // Reset form & close
    setName('');
    setFatherName('');
    setPhone('');
    setAltPhone('');
    setOccupation('');
    setError('');
    onClose();
  };

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const roles: MemberRole[] = [
    'সাধারণ সদস্য',
    'স্বেচ্ছাসেবক',
    'সম্মানিত প্রবাসী সদস্য',
    'কার্যনির্বাহী সদস্য',
    'স্বাস্থ্য ও রক্তদান বিষয়ক সম্পাদক',
    'যুব ও ক্রীড়া সম্পাদক',
    'প্রচার ও প্রকাশনা সম্পাদক',
    'সমাজকল্যাণ সম্পাদক',
    'সাংগঠনিক সম্পাদক',
    'কোষাধ্যক্ষ',
    'সহ-সভাপতি',
    'সভাপতি'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">নতুন সদস্য নিবন্ধন ফর্ম</h3>
              <p className="text-xs text-emerald-100">
                ধনকুন্ডী উত্তর পাড়া সমাজ কল্যাণ ও রক্তদান পরিষদ
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
                সদস্যের পুরো নাম *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: মো: আমিনুল ইসলাম"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                পিতা / স্বামীর নাম
              </label>
              <input
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                placeholder="যেমন: মো: আব্দুল জলিল"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XX-XXXXXX"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                রক্তের গ্রুপ *
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm font-bold text-red-600 dark:text-red-400"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg} রক্তের গ্রুপ
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                পেশা
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="যেমন: ব্যবসা, শিক্ষকতা, কৃষি, ছাত্র"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                পদবি / ক্যাটাগরি
              </label>
              <select
                value={role}
                onChange={(e) => {
                  const val = e.target.value as MemberRole;
                  setRole(val);
                  if (val === 'সম্মানিত প্রবাসী সদস্য') {
                    setIsExpatriate(true);
                  }
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                গ্রামের ঠিকানা / বাড়ি
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="যেমন: ধনকুন্ডী উত্তর পাড়া, স্কুল সংলগ্ন"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                বর্তমান অবস্থান (যদি বাইরে থাকেন)
              </label>
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                placeholder="যেমন: সৌদি আরব, ঢাকা, বগুড়া"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={isAvailableForBlood}
                onChange={(e) => setIsAvailableForBlood(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>আমি জরুরি প্রয়োজনে রক্তদানে প্রস্তুত আছি (রক্তদাতা তালিকাভুক্ত)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={isExpatriate}
                onChange={(e) => setIsExpatriate(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>আমি একজন প্রবাসী ভাই (রেমিট্যান্স যোদ্ধা)</span>
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
              <UserPlus className="w-4 h-4" />
              <span>সদস্য হিসেবে যুক্ত হোন</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
