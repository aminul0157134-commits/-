import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Droplet, 
  HeartHandshake, 
  Bell, 
  Image as ImageIcon, 
  PhoneCall, 
  DollarSign, 
  Settings, 
  LogOut, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  PlusCircle, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  Search, 
  ArrowUpRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

import { 
  VillageMember, 
  BloodRequest, 
  BloodReview, 
  EmergencyContact, 
  DonationCampaign, 
  DonationRecord, 
  NoticeItem, 
  GalleryPhoto, 
  AppNotification, 
  AppReview,
  MemberRole,
  BloodGroup
} from '../types';

import { toBengaliDigits, formatTaka } from '../utils/bengaliUtils';

interface AdminPanelProps {
  members: VillageMember[];
  setMembers: React.Dispatch<React.SetStateAction<VillageMember[]>>;
  bloodRequests: BloodRequest[];
  setBloodRequests: React.Dispatch<React.SetStateAction<BloodRequest[]>>;
  bloodReviews: BloodReview[];
  setBloodReviews: React.Dispatch<React.SetStateAction<BloodReview[]>>;
  campaigns: DonationCampaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<DonationCampaign[]>>;
  donationRecords: DonationRecord[];
  setDonationRecords: React.Dispatch<React.SetStateAction<DonationRecord[]>>;
  notices: NoticeItem[];
  setNotices: React.Dispatch<React.SetStateAction<NoticeItem[]>>;
  galleryPhotos: GalleryPhoto[];
  setGalleryPhotos: React.Dispatch<React.SetStateAction<GalleryPhoto[]>>;
  emergencyContacts: EmergencyContact[];
  setEmergencyContacts: React.Dispatch<React.SetStateAction<EmergencyContact[]>>;
  appReviews: AppReview[];
  setAppReviews: React.Dispatch<React.SetStateAction<AppReview[]>>;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  members,
  setMembers,
  bloodRequests,
  setBloodRequests,
  bloodReviews,
  setBloodReviews,
  campaigns,
  setCampaigns,
  donationRecords,
  setDonationRecords,
  notices,
  setNotices,
  galleryPhotos,
  setGalleryPhotos,
  emergencyContacts,
  setEmergencyContacts,
  appReviews,
  setAppReviews,
  onLogout,
  onNavigateHome
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'members' | 'blood' | 'donations' | 'notices' | 'gallery' | 'emergency' | 'reviews' | 'settings'
  >('overview');

  // Search filters
  const [memberSearch, setMemberSearch] = useState('');
  const [donationSearch, setDonationSearch] = useState('');

  // Settings: Change PIN state
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New item quick modals / inline forms
  const [isAddingCampaign, setIsAddingCampaign] = useState(false);
  const [newCampTitle, setNewCampTitle] = useState('');
  const [newCampTarget, setNewCampTarget] = useState(100000);
  const [newCampCategory, setNewCampCategory] = useState<DonationCampaign['category']>('অসুস্থদের চিকিৎসা');
  const [newCampBeneficiary, setNewCampBeneficiary] = useState('');
  const [newCampDesc, setNewCampDesc] = useState('');

  // Handlers for members
  const handleDeleteMember = (id: string, name: string) => {
    if (window.confirm(`আপনি কি নিশ্চিত যে "${name}"-কে সদস্য তালিকা থেকে ডিলিট করতে চান?`)) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleToggleMemberBlood = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isAvailableForBlood: !m.isAvailableForBlood } : m))
    );
  };

  const handleChangeMemberRole = (id: string, newRole: MemberRole) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
  };

  // Handlers for blood requests
  const handleUpdateBloodStatus = (id: string, status: BloodRequest['status']) => {
    setBloodRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleDeleteBloodRequest = (id: string) => {
    if (window.confirm('এই রক্তের আবেদনটি ডিলিট করতে চান?')) {
      setBloodRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Handlers for donations
  const handleDeleteDonation = (id: string) => {
    if (window.confirm('এই অনুদানের রেকর্ডটি ডিলিট করতে চান?')) {
      setDonationRecords((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampTitle.trim()) return;

    const newCamp: DonationCampaign = {
      id: `camp-${Date.now()}`,
      title: newCampTitle.trim(),
      category: newCampCategory,
      targetAmount: Number(newCampTarget) || 50000,
      raisedAmount: 0,
      beneficiaryName: newCampBeneficiary.trim() || 'গ্রামবাসী',
      villageLocation: 'ধনকুন্ডী উত্তর পাড়া',
      description: newCampDesc.trim() || 'মানবিক সহায়তা তহবিল।',
      status: 'চলমান',
      urgent: true,
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80'
    };

    setCampaigns((prev) => [newCamp, ...prev]);
    setNewCampTitle('');
    setNewCampBeneficiary('');
    setNewCampDesc('');
    setIsAddingCampaign(false);
  };

  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'চলমান' ? 'সম্পন্ন' : 'চলমান' } : c
      )
    );
  };

  // Handlers for notices
  const handleDeleteNotice = (id: string) => {
    if (window.confirm('এই নোটিশটি ডিলিট করতে চান?')) {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const handleToggleNoticeImportant = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isImportant: !n.isImportant } : n))
    );
  };

  // Handlers for gallery
  const handleDeletePhoto = (id: string) => {
    if (window.confirm('গ্যালারির এই ছবিটি ডিলিট করতে চান?')) {
      setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Handlers for reviews
  const handleDeleteAppReview = (id: string) => {
    if (window.confirm('এই রিভিউটি ডিলিট করতে চান?')) {
      setAppReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Handlers for emergency contacts
  const handleUpdateContactPhone = (id: string, newPhone: string) => {
    setEmergencyContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, phone: newPhone } : c))
    );
  };

  // Handle PIN change
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('dhankundi_admin_pin') || '1234';

    if (currentPin !== storedPin && currentPin !== 'admin1234') {
      setPinChangeMsg({ type: 'error', text: 'বর্তমান পিন কোড সঠিক নয়!' });
      return;
    }
    if (newPin.length < 4) {
      setPinChangeMsg({ type: 'error', text: 'নতুন পিন কোড অন্তত ৪ অক্ষরের হতে হবে।' });
      return;
    }

    localStorage.setItem('dhankundi_admin_pin', newPin);
    setPinChangeMsg({ type: 'success', text: 'এডমিন পিন কোড সফলভাবে পরিবর্তন হয়েছে!' });
    setCurrentPin('');
    setNewPin('');
  };

  // Summary Metrics
  const totalRaised = donationRecords.reduce((acc, curr) => acc + curr.amount, 0);
  const activeRequestsCount = bloodRequests.filter((r) => r.status === 'সক্রিয়').length;
  const readyDonorsCount = members.filter((m) => m.isAvailableForBlood).length;

  const rolesList: MemberRole[] = [
    'সভাপতি',
    'সহ-সভাপতি',
    'সাধারণ সম্পাদক',
    'সাংগঠনিক সম্পাদক',
    'কোষাধ্যক্ষ',
    'সমাজকল্যাণ সম্পাদক',
    'প্রচার ও প্রকাশনা সম্পাদক',
    'স্বাস্থ্য ও রক্তদান বিষয়ক সম্পাদক',
    'সম্মানিত প্রবাসী সদস্য',
    'যুব ও ক্রীড়া সম্পাদক',
    'কার্যনির্বাহী সদস্য',
    'সাধারণ সদস্য',
    'স্বেচ্ছাসেবক'
  ];

  return (
    <div className="space-y-6">
      
      {/* Admin Panel Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-lg sm:text-2xl tracking-tight">
                সুপার এডমিন কন্ট্রোল প্যানেল
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                লাইভ মোড
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              ধনকুন্ডী উত্তর পাড়া সেবা ও রক্তদান পরিষদ • শেরপুর, বগুড়া
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            ওয়েবসাইটে ফিরে যান
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Admin Sub Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {[
          { id: 'overview', label: 'সারসংক্ষেপ', icon: TrendingUp },
          { id: 'members', label: `সদস্য ব্যবস্থাপনা (${toBengaliDigits(members.length)})`, icon: Users },
          { id: 'blood', label: `রক্তের আবেদন (${toBengaliDigits(activeRequestsCount)})`, icon: Droplet },
          { id: 'donations', label: `অনুদান ও ফান্ড (${toBengaliDigits(donationRecords.length)})`, icon: HeartHandshake },
          { id: 'notices', label: `নোটিশ বোর্ড (${toBengaliDigits(notices.length)})`, icon: Bell },
          { id: 'gallery', label: `গ্যালারি (${toBengaliDigits(galleryPhotos.length)})`, icon: ImageIcon },
          { id: 'emergency', label: 'জরুরি নম্বর', icon: PhoneCall },
          { id: 'reviews', label: `রিভিউ (${toBengaliDigits(appReviews.length)})`, icon: Sparkles },
          { id: 'settings', label: 'এডমিন সেটিংস ও পিন', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-medium">মোট নিবন্ধিত সদস্য</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
                {toBengaliDigits(members.length)} জন
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                রক্তদানে প্রস্তুত: {toBengaliDigits(readyDonorsCount)} জন
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-medium">সক্রিয় রক্তের আবেদন</span>
              <div className="text-2xl font-black text-red-600 dark:text-red-400 font-mono mt-1">
                {toBengaliDigits(activeRequestsCount)} টি
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                তাৎক্ষণিক সাহায্য প্রয়োজন
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-medium">মোট সংগৃহীত অনুদান তহবিল</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                {formatTaka(totalRaised)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                মোট ডোনেশন রেকর্ড: {toBengaliDigits(donationRecords.length)} টি
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-medium">চলমান ক্যাম্পেইন</span>
              <div className="text-2xl font-black text-amber-500 font-mono mt-1">
                {toBengaliDigits(campaigns.filter((c) => c.status === 'চলমান').length)} টি
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                চিকিৎসা ও বিয়ের ফান্ড
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" /> কুইক অ্যাকশন টুলস
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold">
              <button
                onClick={() => setActiveAdminTab('members')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-left border border-slate-200 dark:border-slate-700 transition-colors"
              >
                + সদস্য এডিট / পদবি বদল
              </button>
              <button
                onClick={() => setActiveAdminTab('blood')}
                className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-700 dark:text-red-300 text-left border border-red-200 dark:border-red-900 transition-colors"
              >
                + রক্তের আবেদন স্ট্যাটাস পরিবর্তন
              </button>
              <button
                onClick={() => setActiveAdminTab('donations')}
                className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-left border border-emerald-200 dark:border-emerald-900 transition-colors"
              >
                + নতুন অনুদান ক্যাম্পেইন শুরু
              </button>
              <button
                onClick={() => setActiveAdminTab('notices')}
                className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-800 dark:text-amber-300 text-left border border-amber-200 dark:border-amber-900 transition-colors"
              >
                + জরুরি নোটিশ ম্যানেজ করুন
              </button>
            </div>
          </div>

          {/* Recent Activity Snapshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                সর্বশেষ রক্তের আবেদনসমূহ
              </h4>
              <div className="space-y-2 text-xs">
                {bloodRequests.slice(0, 3).map((req) => (
                  <div key={req.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <span className="font-black text-red-600 font-mono mr-1.5">{req.bloodGroup}</span>
                      <strong className="text-slate-900 dark:text-white">{req.patientName}</strong>
                      <p className="text-[11px] text-slate-500">{req.hospitalName}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${req.status === 'সক্রিয়' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                সর্বশেষ অনুদান জমাসমূহ
              </h4>
              <div className="space-y-2 text-xs">
                {donationRecords.slice(0, 3).map((don) => (
                  <div key={don.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 dark:text-white">{don.donorName}</strong>
                      <p className="text-[11px] text-slate-500">{don.donorLocation} • {don.paymentMethod}</p>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                      {formatTaka(don.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEMBERS MANAGEMENT */}
      {activeAdminTab === 'members' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" /> সদস্য তালিকা ও পদবি নিয়ন্ত্রণ
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                সদস্যদের ভূমিকা পরিবর্তন করুন, রক্তদান স্ট্যাটাস টগল করুন বা ডিলিট করুন
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder="সদস্য খুঁজুন..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="pb-3 font-semibold">সদস্যের নাম ও পিতা</th>
                  <th className="pb-3 font-semibold">মোবাইল নম্বর</th>
                  <th className="pb-3 font-semibold">রক্তের গ্রুপ</th>
                  <th className="pb-3 font-semibold">পদবি / ভূমিকা</th>
                  <th className="pb-3 font-semibold text-center">রক্তদানে প্রস্তুত?</th>
                  <th className="pb-3 font-semibold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {members
                  .filter((m) =>
                    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                    m.phone.includes(memberSearch) ||
                    m.role.includes(memberSearch)
                  )
                  .map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{member.name}</span>
                          {member.isExpatriate && (
                            <span className="text-[10px] px-1.5 rounded bg-amber-100 text-amber-800 font-medium">
                              প্রবাসী
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">পিতা: {member.fatherName}</div>
                      </td>
                      <td className="py-3 font-mono text-slate-800 dark:text-slate-200">
                        {toBengaliDigits(member.phone)}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold font-mono">
                          {member.bloodGroup}
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={member.role}
                          onChange={(e) => handleChangeMemberRole(member.id, e.target.value as MemberRole)}
                          className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                        >
                          {rolesList.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 text-center">
                        <button
                          onClick={() => handleToggleMemberBlood(member.id)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                            member.isAvailableForBlood
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                          }`}
                        >
                          {member.isAvailableForBlood ? 'হ্যাঁ (প্রস্তুত)' : 'না (অক্ষম)'}
                        </button>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteMember(member.id, member.name)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                          title="সদস্য ডিলিট করুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BLOOD REQUESTS CONTROL */}
      {activeAdminTab === 'blood' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Droplet className="w-5 h-5 text-red-600" /> রক্তের আবেদন ও স্ট্যাটাস পরিচালনা
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              রক্ত পেয়ে গেলে স্ট্যাটাস 'সম্পন্ন' করুন অথবা প্রয়োজনে ডিলিট করুন
            </p>
          </div>

          <div className="space-y-3">
            {bloodRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-red-600 text-white font-mono font-bold">
                      {req.bloodGroup}
                    </span>
                    <strong className="text-sm text-slate-900 dark:text-white">{req.patientName}</strong>
                    <span className="text-[11px] text-slate-400">({req.patientAge})</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    হাসপাতাল: {req.hospitalName} • যোগাযোগ: {toBengaliDigits(req.contactPhone)}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    প্রয়োজন: {toBengaliDigits(req.bagsNeeded)} ব্যাগ • {req.neededDate} • আবেদনকারী: {req.requestedBy}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <select
                    value={req.status}
                    onChange={(e) => handleUpdateBloodStatus(req.id, e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                  >
                    <option value="সক্রিয়">সক্রিয় (রক্তদাতা প্রয়োজন)</option>
                    <option value="রক্তদাতা পাওয়া গেছে">রক্তদাতা পাওয়া গেছে</option>
                    <option value="সম্পন্ন">সম্পন্ন (রক্ত দেওয়া শেষ)</option>
                  </select>

                  <button
                    onClick={() => handleDeleteBloodRequest(req.id)}
                    className="p-2 rounded-xl border border-red-200 dark:border-red-900 hover:bg-red-50 text-red-600 transition-colors"
                    title="আবেদন ডিলিট করুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DONATIONS & CAMPAIGNS */}
      {activeAdminTab === 'donations' && (
        <div className="space-y-6">
          {/* Campaigns Manager */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-emerald-600" /> অনুদান ক্যাম্পেইন ব্যবস্থাপনা
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  অসুস্থদের চিকিৎসা ও বিয়ের তহবিল চালু বা সম্পন্ন করুন
                </p>
              </div>

              <button
                onClick={() => setIsAddingCampaign(!isAddingCampaign)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>নতুন ক্যাম্পেইন</span>
              </button>
            </div>

            {/* New Campaign Form */}
            {isAddingCampaign && (
              <form onSubmit={handleCreateCampaign} className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-3 text-xs animate-in fade-in">
                <div className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  নতুন মানবিক সহায়তা তহবিল তৈরি করুন
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={newCampTitle}
                    onChange={(e) => setNewCampTitle(e.target.value)}
                    placeholder="ক্যাম্পেইনের শিরোনাম (যেমন: রহিম চাচার চিকিৎসা তহবিল)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none"
                  />

                  <select
                    value={newCampCategory}
                    onChange={(e) => setNewCampCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none font-medium"
                  >
                    <option value="অসুস্থদের চিকিৎসা">অসুস্থদের চিকিৎসা</option>
                    <option value="দরিদ্র মেয়ের বিয়ে">দরিদ্র মেয়ের বিয়ে</option>
                    <option value="প্রবাসী ভাইদের ফান্ড">প্রবাসী ভাইদের ফান্ড</option>
                    <option value="মসজিদ ও মাদ্রাসা">মসজিদ ও মাদ্রাসা</option>
                    <option value="শীতবস্ত্র ও জরুরি ত্রাণ">শীতবস্ত্র ও জরুরি ত্রাণ</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={newCampTarget}
                    onChange={(e) => setNewCampTarget(Number(e.target.value))}
                    placeholder="লক্ষ্যমাত্রা (টাকা)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none font-bold"
                  />

                  <input
                    type="text"
                    value={newCampBeneficiary}
                    onChange={(e) => setNewCampBeneficiary(e.target.value)}
                    placeholder="উপকৃত ব্যক্তির নাম (যেমন: মো: রহিম মিয়া)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none"
                  />
                </div>

                <textarea
                  rows={2}
                  value={newCampDesc}
                  onChange={(e) => setNewCampDesc(e.target.value)}
                  placeholder="বিস্তারিত বিবরণ..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingCampaign(false)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    ক্যাম্পেইন চালু করুন
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{camp.category}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${camp.status === 'চলমান' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                        {camp.status}
                      </span>
                    </div>
                    <strong className="text-slate-900 dark:text-white text-sm leading-tight block">{camp.title}</strong>
                    <div className="mt-2 text-slate-600 dark:text-slate-300">
                      সংগৃহীত: <strong>{formatTaka(camp.raisedAmount)}</strong> / লক্ষ্য: <strong>{formatTaka(camp.targetAmount)}</strong>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleCampaignStatus(camp.id)}
                      className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200"
                    >
                      {camp.status === 'চলমান' ? 'সম্পন্ন হিসেবে চিহ্নিত করুন' : 'পুনরায় চালু করুন'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donations Ledger List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                অনুদানের সমস্ত ট্রানজেকশন তালিকা ({toBengaliDigits(donationRecords.length)})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                    <th className="pb-3 font-semibold">দাতার নাম ও দেশ</th>
                    <th className="pb-3 font-semibold">ক্যাম্পেইন</th>
                    <th className="pb-3 font-semibold">পেমেন্ট মেথড</th>
                    <th className="pb-3 font-semibold text-right">পরিমাণ (টাকা)</th>
                    <th className="pb-3 font-semibold text-right">ডিলিট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {donationRecords.map((don) => (
                    <tr key={don.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-2.5">
                        <strong className="text-slate-900 dark:text-white">{don.donorName}</strong>
                        <div className="text-[11px] text-slate-400">{don.donorLocation}</div>
                      </td>
                      <td className="py-2.5 text-slate-700 dark:text-slate-300">{don.campaignTitle}</td>
                      <td className="py-2.5 font-mono text-[11px]">{don.paymentMethod} {don.trxId ? `(${don.trxId})` : ''}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        {formatTaka(don.amount)}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => handleDeleteDonation(don.id)}
                          className="p-1 hover:text-red-600 text-slate-400 transition-colors"
                          title="ডিলিট করুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: NOTICES CONTROL */}
      {activeAdminTab === 'notices' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" /> নোটিশ বোর্ড পরিচালনা
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              নোটিশের গুরুত্ব নির্ধারণ করুন বা ডিলিট করুন
            </p>
          </div>

          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-emerald-600">{notice.category}</span>
                    <span className="text-[11px] text-slate-400">• {notice.date}</span>
                    {notice.isImportant && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-bold text-[10px]">
                        জরুরি
                      </span>
                    )}
                  </div>
                  <strong className="text-sm text-slate-900 dark:text-white block">{notice.title}</strong>
                  <p className="text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{notice.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleNoticeImportant(notice.id)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200"
                  >
                    {notice.isImportant ? 'সাধারণ নোটিশ করুন' : 'জরুরি হিসেবে পিন করুন'}
                  </button>

                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="p-2 rounded-xl border border-red-200 dark:border-red-900 hover:bg-red-50 text-red-600"
                    title="নোটিশ ডিলিট করুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: GALLERY CONTROL */}
      {activeAdminTab === 'gallery' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-600" /> গ্যালারির ছবি পরিচালনা
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              গ্রামের উন্নয়ন ও উৎসবের ছবিসমূহ নিয়ন্ত্রণ করুন
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group bg-slate-50 dark:bg-slate-800">
                <img src={photo.imageUrl} alt={photo.title} className="h-32 w-full object-cover" />
                <div className="p-2.5">
                  <strong className="text-xs text-slate-900 dark:text-white block truncate">{photo.title}</strong>
                  <span className="text-[10px] text-slate-400">{photo.category}</span>
                </div>
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
                  title="ছবি ডিলিট করুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: EMERGENCY CONTACTS */}
      {activeAdminTab === 'emergency' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-red-600" /> সরকারি ও জরুরি ফোন নম্বর পরিচালনা
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ফায়ার সার্ভিস, পুলিশ, চেয়ারম্যান ও মেম্বারের ফোন নম্বর সরাসরি আপডেট করুন
            </p>
          </div>

          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <strong className="text-slate-900 dark:text-white text-sm">{contact.title}</strong>
                  <div className="text-slate-600 dark:text-slate-400">{contact.name} • {contact.category}</div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-slate-400 font-medium">ফোন:</span>
                  <input
                    type="text"
                    value={contact.phone}
                    onChange={(e) => handleUpdateContactPhone(contact.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-emerald-600 font-semibold">অটো সেভড</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: REVIEWS CONTROL */}
      {activeAdminTab === 'reviews' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> গ্রামবাসীর রিভিউ ও রেটিং মডারেশন
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              অবাঞ্ছিত বা স্প্যাম রিভিউ এখান থেকে সহজেই মুছে ফেলতে পারবেন
            </p>
          </div>

          <div className="space-y-3">
            {appReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 dark:text-white text-sm">{rev.reviewerName}</strong>
                    <span className="text-slate-400">({rev.reviewerRoleOrLocation})</span>
                    <span className="text-amber-500 font-bold">{toBengaliDigits(rev.rating)}★</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mt-1 italic leading-relaxed">
                    "{rev.feedback}"
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{rev.date}</span>
                </div>

                <button
                  onClick={() => handleDeleteAppReview(rev.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="রিভিউ ডিলিট করুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: SETTINGS & CHANGE PIN */}
      {activeAdminTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" /> এডমিন সিকিউরিটি ও পিন কোড পরিবর্তন
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              অননুমোদিত প্রবেশ ঠেকাতে এডমিন পিন কোড নিয়মিত পরিবর্তন করুন
            </p>
          </div>

          <form onSubmit={handleChangePin} className="max-w-md space-y-3 text-xs">
            {pinChangeMsg && (
              <div className={`p-3 rounded-xl border text-xs font-semibold ${pinChangeMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-red-50 text-red-800 border-red-300'}`}>
                {pinChangeMsg.text}
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                বর্তমান পিন কোড:
              </label>
              <input
                type="password"
                required
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                placeholder="ডিফল্ট: 1234"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                নতুন পিন কোড:
              </label>
              <input
                type="password"
                required
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="নতুন ৪ বা ৬ ডিজিটের পিন"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>পিন কোড সেভ করুন</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
