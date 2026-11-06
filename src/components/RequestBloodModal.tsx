import React, { useState } from 'react';
import { X, Droplet, Heart, Phone, Hospital, Calendar, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BloodGroup, BloodRequest } from '../types';

interface RequestBloodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted: (request: BloodRequest) => void;
}

export const RequestBloodModal: React.FC<RequestBloodModalProps> = ({
  isOpen,
  onClose,
  onRequestSubmitted
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('B+');
  const [bagsNeeded, setBagsNeeded] = useState(1);
  const [hospitalName, setHospitalName] = useState('শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স, বগুড়া');
  const [hospitalLocation, setHospitalLocation] = useState('শেরপুর, বগুড়া');
  const [contactPhone, setContactPhone] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<'জরুরি' | 'খুব জরুরি' | 'চলতি সপ্তাহ'>('জরুরি');
  const [neededDate, setNeededDate] = useState('আজকের মধ্যে');
  const [requestedBy, setRequestedBy] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError('রোগীর নাম লিখুন');
      return;
    }
    if (!contactPhone.trim() || contactPhone.length < 10) {
      setError('যোগাযোগের সঠিক মোবাইল নম্বর লিখুন');
      return;
    }

    const newRequest: BloodRequest = {
      id: `req-${Date.now()}`,
      patientName: patientName.trim(),
      patientAge: patientAge.trim() || 'বয়স উল্লেখ নেই',
      bloodGroup,
      bagsNeeded: Number(bagsNeeded) || 1,
      bagsCollected: 0,
      hospitalName: hospitalName.trim(),
      hospitalLocation: hospitalLocation.trim(),
      contactPhone: contactPhone.trim(),
      urgencyLevel,
      neededDate: neededDate.trim() || 'জরুরি প্রয়োজন',
      status: 'সক্রিয়',
      notes: notes.trim() || 'রোগীর জন্য রক্তদাতার সদয় উপস্থিতি কামনা করছি।',
      requestedBy: requestedBy.trim() || 'পরিবারের সদস্য',
      createdAt: 'এইমাত্র'
    };

    onRequestSubmitted(newRequest);
    setError('');
    onClose();
  };

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <Droplet className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">জরুরি রক্তের আবেদন</h3>
              <p className="text-xs text-red-100">
                ধনকুন্ডী উত্তর পাড়া রক্তদান নেটওয়ার্ক
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
                রোগীর নাম *
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="যেমন: রহিমা খাতুন"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                রোগীর বয়স
              </label>
              <input
                type="text"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="যেমন: ৪৫ বছর"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                প্রয়োজনীয় রক্তের গ্রুপ *
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-red-600 dark:text-red-400 font-bold outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg} গ্রুপ
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                কত ব্যাগ রক্ত লাগবে?
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={bagsNeeded}
                onChange={(e) => setBagsNeeded(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                জরুরিতার মাত্রা *
              </label>
              <select
                value={urgencyLevel}
                onChange={(e) => setUrgencyLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
              >
                <option value="জরুরি">জরুরি (আজকের মধ্যে)</option>
                <option value="খুব জরুরি">খুব জরুরি (অবিলম্বে / ২ ঘণ্টার মধ্যে)</option>
                <option value="চলতি সপ্তাহ">চলতি সপ্তাহ (অপারেশন শিডিউল)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                কবে / কখন প্রয়োজন?
              </label>
              <input
                type="text"
                value={neededDate}
                onChange={(e) => setNeededDate(e.target.value)}
                placeholder="যেমন: আজ দুপুর ১২:০০ টায়"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              হাসপাতালের নাম ও ঠিকানা *
            </label>
            <input
              type="text"
              required
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              placeholder="যেমন: শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স / শহীদ জিয়াউর রহমান মেডিকেল কলেজ"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                যোগাযোগের মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="017XX-XXXXXX"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                আবেদনকারীর নাম / সম্পর্ক
              </label>
              <input
                type="text"
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                placeholder="যেমন: শামীম (রোগীর ছেলে)"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              অতিরিক্ত কোনো তথ্য বা রক্তের কারণ
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="অপারেশন বা রক্তস্বল্পতা সম্পর্কে বিস্তারিত..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm"
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
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Droplet className="w-4 h-4 fill-white" />
              <span>রক্তের আবেদন পোস্ট করুন</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
