/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Droplet, 
  Users, 
  HeartHandshake, 
  Bell, 
  Image as ImageIcon, 
  PhoneCall, 
  DollarSign, 
  UserPlus, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  MessageSquareHeart, 
  ExternalLink,
  Info
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
  BloodGroup,
  AppReview 
} from './types';

import { 
  INITIAL_MEMBERS, 
  INITIAL_BLOOD_REQUESTS, 
  INITIAL_BLOOD_REVIEWS, 
  INITIAL_EMERGENCY_CONTACTS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_DONATION_RECORDS, 
  INITIAL_NOTICES, 
  INITIAL_GALLERY_PHOTOS, 
  INITIAL_NOTIFICATIONS,
  INITIAL_APP_REVIEWS,
  VILLAGE_PAYMENT_ACCOUNTS 
} from './data/initialData';

import { toBengaliDigits, formatTaka } from './utils/bengaliUtils';
import { Navbar } from './components/Navbar';
import { VisitorCounter } from './components/VisitorCounter';
import { BloodBankSection } from './components/BloodBankSection';
import { MembersDirectory } from './components/MembersDirectory';
import { DonationSection } from './components/DonationSection';
import { NoticeBoard } from './components/NoticeBoard';
import { VillageGallery } from './components/VillageGallery';
import { EmergencyNumbersModal } from './components/EmergencyNumbersModal';
import { AdMobBanner } from './components/AdMobBanner';
import { MonetizationModal } from './components/MonetizationModal';
import { NotificationModal } from './components/NotificationModal';
import { AddMemberModal } from './components/AddMemberModal';
import { RequestBloodModal } from './components/RequestBloodModal';
import { ReviewModal } from './components/ReviewModal';
import { DonateModal } from './components/DonateModal';
import { CornerClock } from './components/CornerClock';
import { AboutVillageSection } from './components/AboutVillageSection';
import { AppRatingModal } from './components/AppRatingModal';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('dhankundi_theme') === 'dark';
  });

  // Data states with localStorage persistence
  const [members, setMembers] = useState<VillageMember[]>(() => {
    const saved = localStorage.getItem('dhankundi_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(() => {
    const saved = localStorage.getItem('dhankundi_blood_requests');
    return saved ? JSON.parse(saved) : INITIAL_BLOOD_REQUESTS;
  });

  const [bloodReviews, setBloodReviews] = useState<BloodReview[]>(() => {
    const saved = localStorage.getItem('dhankundi_blood_reviews');
    return saved ? JSON.parse(saved) : INITIAL_BLOOD_REVIEWS;
  });

  const [campaigns, setCampaigns] = useState<DonationCampaign[]>(() => {
    const saved = localStorage.getItem('dhankundi_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem('dhankundi_donations');
    return saved ? JSON.parse(saved) : INITIAL_DONATION_RECORDS;
  });

  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    const saved = localStorage.getItem('dhankundi_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('dhankundi_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY_PHOTOS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('dhankundi_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [appReviews, setAppReviews] = useState<AppReview[]>(() => {
    const saved = localStorage.getItem('dhankundi_app_reviews');
    return saved ? JSON.parse(saved) : INITIAL_APP_REVIEWS;
  });

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(() => {
    const saved = localStorage.getItem('dhankundi_emergency_contacts');
    return saved ? JSON.parse(saved) : INITIAL_EMERGENCY_CONTACTS;
  });

  const [rewardedDonationsTotal, setRewardedDonationsTotal] = useState<number>(() => {
    const saved = localStorage.getItem('dhankundi_rewarded_donations');
    return saved ? Number(saved) : 0;
  });

  // Modal control states
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isMonetizationModalOpen, setIsMonetizationModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isRequestBloodModalOpen, setIsRequestBloodModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isAppRatingModalOpen, setIsAppRatingModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('dhankundi_is_admin') === 'true';
  });

  // Review modal prefilled props
  const [reviewDonorName, setReviewDonorName] = useState<string | undefined>();
  const [reviewBloodGroup, setReviewBloodGroup] = useState<BloodGroup | undefined>();
  const [donateCampaignTitle, setDonateCampaignTitle] = useState<string | undefined>();

  // Sync dark mode class with root html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dhankundi_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dhankundi_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist data
  useEffect(() => {
    localStorage.setItem('dhankundi_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('dhankundi_blood_requests', JSON.stringify(bloodRequests));
  }, [bloodRequests]);

  useEffect(() => {
    localStorage.setItem('dhankundi_blood_reviews', JSON.stringify(bloodReviews));
  }, [bloodReviews]);

  useEffect(() => {
    localStorage.setItem('dhankundi_donations', JSON.stringify(donationRecords));
  }, [donationRecords]);

  useEffect(() => {
    localStorage.setItem('dhankundi_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('dhankundi_gallery', JSON.stringify(galleryPhotos));
  }, [galleryPhotos]);

  useEffect(() => {
    localStorage.setItem('dhankundi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('dhankundi_app_reviews', JSON.stringify(appReviews));
  }, [appReviews]);

  useEffect(() => {
    localStorage.setItem('dhankundi_emergency_contacts', JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);

  useEffect(() => {
    localStorage.setItem('dhankundi_rewarded_donations', rewardedDonationsTotal.toString());
  }, [rewardedDonationsTotal]);

  // Handlers
  const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleAddAppReview = (newReview: AppReview) => {
    setAppReviews((prev) => [newReview, ...prev]);
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'নতুন পর্যালোচনা ও রিভিউ জমা হয়েছে',
      message: `${newReview.reviewerName} (${newReview.reviewerRoleOrLocation}) ${toBengaliDigits(newReview.rating)} স্টার রিভিউ দিয়েছেন: "${newReview.feedback.slice(0, 50)}..."`,
      time: 'এইমাত্র',
      type: 'alert',
      read: false,
      linkTab: 'about'
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleAddMember = (newMember: VillageMember) => {
    setMembers((prev) => [newMember, ...prev]);
    // Create notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'নতুন সদস্য যুক্ত হয়েছেন',
      message: `${newMember.name} (${newMember.role}) আমাদের সেবা পরিষদে যুক্ত হয়েছেন। রক্তের গ্রুপ: ${newMember.bloodGroup}`,
      time: 'এইমাত্র',
      type: 'alert',
      read: false,
      linkTab: 'members'
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleRequestBlood = (newRequest: BloodRequest) => {
    setBloodRequests((prev) => [newRequest, ...prev]);
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `জরুরি ${newRequest.bloodGroup} রক্ত প্রয়োজন!`,
      message: `${newRequest.hospitalName}-এ রোগীর জন্য ${newRequest.bloodGroup} রক্তের প্রয়োজন। যোগাযোগ: ${newRequest.contactPhone}`,
      time: 'এইমাত্র',
      type: 'blood',
      read: false,
      linkTab: 'blood'
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleAddReview = (newReview: BloodReview) => {
    setBloodReviews((prev) => [newReview, ...prev]);
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'রক্তগ্রহীতার ধন্যবাদ ও কমেন্ট',
      message: `${newReview.recipientName} রক্ত পেয়ে কৃতজ্ঞতা জানিয়েছেন: "${newReview.comment.slice(0, 60)}..."`,
      time: 'এইমাত্র',
      type: 'blood',
      read: false,
      linkTab: 'blood'
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleAddDonation = (newRecord: DonationRecord) => {
    setDonationRecords((prev) => [newRecord, ...prev]);
    // Update campaign raised amount if matching
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.title === newRecord.campaignTitle) {
          return { ...c, raisedAmount: c.raisedAmount + newRecord.amount };
        }
        return c;
      })
    );
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'নতুন অনুদান জমা হয়েছে',
      message: `${newRecord.donorName} (${newRecord.donorLocation}) ${formatTaka(newRecord.amount)} অনুদান পাঠিয়েছেন।`,
      time: 'এইমাত্র',
      type: 'donation',
      read: false,
      linkTab: 'donations'
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleAddNotice = (newNotice: NoticeItem) => {
    setNotices((prev) => [newNotice, ...prev]);
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `নতুন নোটিশ: ${newNotice.title}`,
      message: newNotice.content.slice(0, 80) + '...',
      time: 'এইমাত্র',
      type: 'notice',
      read: false,
      linkTab: 'notices'
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const handleAddPhoto = (newPhoto: GalleryPhoto) => {
    setGalleryPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleRewardClaimed = (amount: number) => {
    setRewardedDonationsTotal((prev) => prev + amount);
    // Add micro donation record
    const microRecord: DonationRecord = {
      id: `rew-${Date.now()}`,
      donorName: 'বিজ্ঞাপন দর্শক (AdMob Reward)',
      donorLocation: 'ধনকুন্ডী ভিজিটর',
      isExpatriate: false,
      amount,
      campaignTitle: 'প্রবাসী ভাইদের সার্বিক গ্রাম উন্নয়ন ও রাস্তা সংস্কার তহবিল',
      paymentMethod: 'bKash',
      date: 'আজকে',
      message: 'বিজ্ঞাপন দেখে উন্নয়ন তহবিলে ৫৳ উপহার ক্রেডিট'
    };
    handleAddDonation(microRecord);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const activeRequestsCount = bloodRequests.filter((r) => r.status === 'সক্রিয়').length;
  const totalRaisedFunds = donationRecords.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Navbar with Sticky header and live corner clock */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        unreadNotificationCount={unreadCount}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
        onOpenMonetizationModal={() => setIsMonetizationModalOpen(true)}
        isAdmin={isAdmin}
        onOpenAdmin={() => {
          if (isAdmin) {
            setActiveTab('admin');
          } else {
            setIsAdminLoginModalOpen(true);
          }
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-7">
        
        {/* HOMEPAGE VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 p-6 sm:p-10 text-white shadow-xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold mb-3 text-amber-300">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ধনকুন্ডী উত্তর পাড়া, ৩নং সীমাবাড়ী ইউনিয়ন পরিষদ, শেরপুর, বগুড়া</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  গ্রামের সেবা, রক্তদান ও প্রবাসী অনুদান ডিজিটাল বাতায়ন
                </h1>

                <p className="mt-3 text-xs sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
                  আমাদের গ্রামের কারও রক্তের প্রয়োজনে তাৎক্ষণিক রক্তদাতা পেতে, দিনমজুর ও অসুস্থ ভাইদের চিকিৎসা সহায়তায় কিংবা দরিদ্র মেয়ের বিয়েতে বিদেশী ও গ্রামবাসী ভাইদের অনুদান একত্রিত করতে এই সমন্বিত ডিজিটাল সেবা প্ল্যাটফর্ম।
                </p>

                {/* Main Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setActiveTab('blood')}
                    className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Droplet className="w-4 h-4 fill-white" />
                    <span>জরুরি রক্ত চাই / রক্ত দিন</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('about')}
                    className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>গ্রাম পরিচিতি ও রিভিউ (৪.৯★)</span>
                  </button>

                  <button
                    onClick={() => setIsAddMemberModalOpen(true)}
                    className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-emerald-800 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 text-emerald-700" />
                    <span>নতুন সদস্য যুক্ত হোন</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('donations')}
                    className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <HeartHandshake className="w-4 h-4 fill-white" />
                    <span>প্রবাসী ও চিকিৎসা ফান্ড</span>
                  </button>

                  <button
                    onClick={() => setIsEmergencyModalOpen(true)}
                    className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-rose-400" />
                    <span>সরকারি জরুরি নম্বর</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Visitor Counter */}
            <VisitorCounter />

            {/* AdMob Banner & Monetization Callout */}
            <AdMobBanner
              onRewardClaimed={handleRewardClaimed}
              onOpenMonetizationGuide={() => setIsMonetizationModalOpen(true)}
            />

            {/* Urgent Blood Requests Alert on Homepage (if any) */}
            {activeRequestsCount > 0 && (
              <div className="p-4 sm:p-5 rounded-3xl bg-red-50 dark:bg-red-950/40 border-2 border-red-300 dark:border-red-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 animate-bounce">
                    <Droplet className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-red-900 dark:text-red-200 flex items-center gap-2">
                      <span>জরুরি রক্তের আবেদন সক্রিয় রয়েছে! ({toBengaliDigits(activeRequestsCount)} টি)</span>
                    </h3>
                    <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                      শেরপুর হাসপাতাল ও বগুড়া শজিমেক-এ রোগীদের জন্য জরুরি রক্তের গ্রুপধারীদের সদয় রক্তদানের আহ্বান।
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('blood')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs whitespace-nowrap cursor-pointer"
                >
                  রক্তদাতাদের তালিকা ও নম্বর দেখুন →
                </button>
              </div>
            )}

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Blood Network */}
              <div
                onClick={() => setActiveTab('blood')}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-400 dark:hover:border-red-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Droplet className="w-6 h-6 fill-red-600" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">রক্তদান নেটওয়ার্ক</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  সব রক্তের গ্রুপের তালিকা, সরাসরি কল, রক্তের আবেদন ও রক্ত নিয়ে কমেন্ট করার ব্যবস্থা।
                </p>
                <div className="mt-3 text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span>রক্তদাতাদের তালিকা ({toBengaliDigits(members.filter(m => m.isAvailableForBlood).length)} জন)</span> →
                </div>
              </div>

              {/* Card 2: Foreign Donations */}
              <div
                onClick={() => setActiveTab('donations')}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">প্রবাসী ও অনুদান ফান্ড</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  অসুস্থদের চিকিৎসা ও দরিদ্র মেয়ের বিয়েতে বিকাশ, নগদ ও ডাচ্-বাংলা ব্যাংকে সরাসরি সাহায্য।
                </p>
                <div className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span>সংগৃহীত: {formatTaka(totalRaisedFunds)}</span> →
                </div>
              </div>

              {/* Card 3: Members Directory */}
              <div
                onClick={() => setActiveTab('members')}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">সদস্য তালিকা ও পরিচিতি</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  গ্রামের সম্মানিত সদস্য, প্রবাসী ভাইদের যোগাযোগ নম্বর ও নতুন সদস্য এড করার সুবিধা।
                </p>
                <div className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <span>মোট সদস্য: {toBengaliDigits(members.length)} জন</span> →
                </div>
              </div>

              {/* Card 4: Emergency Contacts */}
              <div
                onClick={() => setIsEmergencyModalOpen(true)}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 dark:hover:border-amber-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">সরকারি জরুরি নম্বর</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  শেরপুর থানা, ফায়ার সার্ভিস, সীমাবাড়ী চেয়ারম্যান, মেম্বার ও হাসপাতালের ২৪ ঘণ্টার নম্বর।
                </p>
                <div className="mt-3 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <span>সব নম্বর দেখুন</span> →
                </div>
              </div>

            </div>

            {/* Quick Notice & Gratitude Review Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Notice snippet */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-500" /> সাম্প্রতিক জরুরি নোটিশ
                    </h3>
                    <button
                      onClick={() => setActiveTab('notices')}
                      className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      সব নোটিশ ({toBengaliDigits(notices.length)})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {notices.slice(0, 2).map((notice) => (
                      <div key={notice.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{notice.category}</span>
                          <span>{notice.date}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{notice.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{notice.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('notices')}
                  className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors text-center"
                >
                  নোটিশ বোর্ডে যান
                </button>
              </div>

              {/* Blood Recipient Gratitude snippet */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <MessageSquareHeart className="w-4 h-4 text-rose-500" /> রক্তগ্রহীতার সাম্প্রতিক কমেন্ট
                    </h3>
                    <button
                      onClick={() => setIsReviewModalOpen(true)}
                      className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                    >
                      + কমেন্ট লিখুন
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bloodReviews.slice(0, 2).map((rev) => (
                      <div key={rev.id} className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60">
                        <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                          "{rev.comment}"
                        </p>
                        <div className="mt-2 text-[11px] font-bold text-slate-900 dark:text-white flex items-center justify-between">
                          <span>{rev.recipientName} ({rev.bloodGroup} রক্তগ্রহীতা)</span>
                          <span className="text-emerald-600 dark:text-emerald-400">রক্তদাতা: {rev.donorName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('blood')}
                  className="mt-4 w-full py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-700 dark:text-rose-300 text-xs font-bold transition-colors text-center"
                >
                  সব রিভিউ ও রক্তদাতাদের তালিকা দেখুন
                </button>
              </div>

            </div>

            {/* Inline Emergency Contacts Section */}
            <EmergencyNumbersModal contacts={emergencyContacts} isInline={true} />

          </div>
        )}

        {/* ABOUT VILLAGE & REVIEWS TAB */}
        {activeTab === 'about' && (
          <AboutVillageSection
            reviews={appReviews}
            onOpenRatingModal={() => setIsAppRatingModalOpen(true)}
          />
        )}

        {/* BLOOD BANK TAB */}
        {activeTab === 'blood' && (
          <BloodBankSection
            members={members}
            requests={bloodRequests}
            reviews={bloodReviews}
            onOpenRequestModal={() => setIsRequestBloodModalOpen(true)}
            onOpenAddDonorModal={() => setIsAddMemberModalOpen(true)}
            onOpenReviewModal={(donorName, bloodGroup) => {
              setReviewDonorName(donorName);
              setReviewBloodGroup(bloodGroup);
              setIsReviewModalOpen(true);
            }}
          />
        )}

        {/* MEMBERS DIRECTORY TAB */}
        {activeTab === 'members' && (
          <MembersDirectory
            members={members}
            onOpenAddMemberModal={() => setIsAddMemberModalOpen(true)}
          />
        )}

        {/* DONATIONS & REMITTANCE TAB */}
        {activeTab === 'donations' && (
          <DonationSection
            campaigns={campaigns}
            donationRecords={donationRecords}
            onOpenDonateModal={(title) => {
              setDonateCampaignTitle(title);
              setIsDonateModalOpen(true);
            }}
          />
        )}

        {/* NOTICES TAB */}
        {activeTab === 'notices' && (
          <NoticeBoard
            notices={notices}
            onAddNotice={handleAddNotice}
          />
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <VillageGallery
            photos={galleryPhotos}
            onAddPhoto={handleAddPhoto}
          />
        )}

        {/* EMERGENCY DIRECTORY TAB */}
        {activeTab === 'emergency' && (
          <div className="space-y-4">
            <EmergencyNumbersModal
              contacts={emergencyContacts}
              isInline={true}
            />
          </div>
        )}

        {/* ADMIN PANEL TAB */}
        {activeTab === 'admin' && (
          <AdminPanel
            members={members}
            setMembers={setMembers}
            bloodRequests={bloodRequests}
            setBloodRequests={setBloodRequests}
            bloodReviews={bloodReviews}
            setBloodReviews={setBloodReviews}
            campaigns={campaigns}
            setCampaigns={setCampaigns}
            donationRecords={donationRecords}
            setDonationRecords={setDonationRecords}
            notices={notices}
            setNotices={setNotices}
            galleryPhotos={galleryPhotos}
            setGalleryPhotos={setGalleryPhotos}
            emergencyContacts={emergencyContacts}
            setEmergencyContacts={setEmergencyContacts}
            appReviews={appReviews}
            setAppReviews={setAppReviews}
            onLogout={() => {
              localStorage.removeItem('dhankundi_is_admin');
              setIsAdmin(false);
              setActiveTab('home');
            }}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}

      </main>

      {/* Floating Bottom Navigation Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition-colors ${
            activeTab === 'home' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'
          }`}
        >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span>হোম</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition-colors ${
            activeTab === 'about' ? 'text-amber-500' : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-amber-500" />
          <span>গ্রাম ও রিভিউ</span>
        </button>

        <button
          onClick={() => setIsAddMemberModalOpen(true)}
          className="flex flex-col items-center justify-center -mt-4 w-11 h-11 rounded-full bg-emerald-600 text-white shadow-lg active:scale-95"
          title="নতুন সদস্য যুক্ত করুন"
        >
          <UserPlus className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('blood')}
          className={`flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition-colors ${
            activeTab === 'blood' ? 'text-red-600 dark:text-red-400' : 'text-slate-500'
          }`}
        >
          <Droplet className="w-4 h-4 mb-0.5 fill-current" />
          <span>রক্তদান</span>
        </button>

        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold text-rose-600"
        >
          <PhoneCall className="w-4 h-4 mb-0.5 animate-pulse" />
          <span>জরুরি</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
              <Droplet className="w-4 h-4 fill-red-500 text-red-500" />
              <span>ধনকুন্ডী উত্তর পাড়া সেবা ও রক্তদান পরিষদ</span>
            </div>
            <p className="mt-1 text-slate-500">
              গ্রাম: ধনকুন্ডী উত্তর পাড়া • ৩নং সীমাবাড়ী ইউনিয়ন পরিষদ • উপজেলা: শেরপুর • জেলা: বগুড়া
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              জরুরি হটলাইন: 01712-895421 • জাতীয় সেবা: ৯৯৯ • তথ্য সেবা: ৩৩৩
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <button
              onClick={() => setActiveTab('about')}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>গ্রাম পরিচিতি ও রিভিউ (৪.৯★)</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsMonetizationModalOpen(true)}
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <DollarSign className="w-3.5 h-3.5 text-amber-500" />
              <span>টাকা আয় ও AdMob</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="hover:underline"
            >
              জরুরি নম্বর
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('donations')}
              className="hover:underline"
            >
              প্রবাসী ফান্ড
            </button>
            <span>•</span>
            <button
              onClick={() => {
                if (isAdmin) {
                  setActiveTab('admin');
                } else {
                  setIsAdminLoginModalOpen(true);
                }
              }}
              className="text-slate-600 dark:text-slate-300 font-semibold hover:text-emerald-600 flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isAdmin ? 'এডমিন ড্যাশবোর্ড' : 'এডমিন লগইন'}</span>
            </button>
            <span>•</span>
            <button
              onClick={handleToggleDarkMode}
              className="hover:underline"
            >
              {isDarkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>© ২০২৪ ধনকুন্ডী উত্তর পাড়া সেবা পরিষদ। সর্বস্বত্ব সংরক্ষিত।</span>
          <span className="flex items-center gap-1">
            <span>গ্রামের কল্যাণে সার্বক্ষণিক সেবা বাতায়ন</span> • 
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">শেরপুর, বগুড়া</span>
          </span>
        </div>
      </footer>

      {/* All Application Modals */}
      <EmergencyNumbersModal
        contacts={emergencyContacts}
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <MonetizationModal
        isOpen={isMonetizationModalOpen}
        onClose={() => setIsMonetizationModalOpen(false)}
        rewardedDonationsTotal={rewardedDonationsTotal}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSendBroadcast={(notif) => setNotifications((prev) => [notif, ...prev])}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsNotificationModalOpen(false);
        }}
      />

      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
      />

      <RequestBloodModal
        isOpen={isRequestBloodModalOpen}
        onClose={() => setIsRequestBloodModalOpen(false)}
        onRequestSubmitted={handleRequestBlood}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setReviewDonorName(undefined);
          setReviewBloodGroup(undefined);
        }}
        onReviewSubmitted={handleAddReview}
        defaultDonorName={reviewDonorName}
        defaultBloodGroup={reviewBloodGroup}
      />

      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => {
          setIsDonateModalOpen(false);
          setDonateCampaignTitle(undefined);
        }}
        onDonationSubmitted={handleAddDonation}
        defaultCampaignTitle={donateCampaignTitle}
      />

      <AppRatingModal
        isOpen={isAppRatingModalOpen}
        onClose={() => setIsAppRatingModalOpen(false)}
        onSubmitReview={handleAddAppReview}
      />

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setActiveTab('admin');
        }}
      />

    </div>
  );
}
