import React, { useState } from 'react';
import { 
  Heart, 
  Droplet, 
  Users, 
  HeartHandshake, 
  Bell, 
  Image as ImageIcon, 
  PhoneCall, 
  Moon, 
  Sun, 
  DollarSign, 
  Home, 
  Menu, 
  X,
  Clock,
  Sparkles,
  ShieldCheck,
  Building2,
  Lock
} from 'lucide-react';
import { CornerClock } from './CornerClock';
import { toBengaliDigits } from '../utils/bengaliUtils';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  unreadNotificationCount: number;
  onOpenNotifications: () => void;
  onOpenEmergencyModal: () => void;
  onOpenMonetizationModal: () => void;
  isAdmin: boolean;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isDarkMode,
  onToggleDarkMode,
  unreadNotificationCount,
  onOpenNotifications,
  onOpenEmergencyModal,
  onOpenMonetizationModal,
  isAdmin,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'হোম পেজ', icon: Home },
    { id: 'about', label: 'গ্রাম ও রিভিউ', icon: Building2, badge: '৪.৯★' },
    { id: 'blood', label: 'রক্তদান ও গ্রুপ', icon: Droplet, badge: 'জরুরি' },
    { id: 'members', label: 'সদস্য তালিকা', icon: Users },
    { id: 'donations', label: 'প্রবাসী ও অনুদান ফান্ড', icon: HeartHandshake, highlight: true },
    { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell },
    { id: 'gallery', label: 'গ্যালারি', icon: ImageIcon },
    { id: 'emergency', label: 'জরুরি নম্বর', icon: PhoneCall, alert: true }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white text-[11px] px-3 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-semibold text-emerald-200">অফিসিয়াল পোর্টাল:</span>
          <span className="text-white/90">ধনকুন্ডী উত্তর পাড়া, সীমাবাড়ী ইউনিয়ন, শেরপুর, বগুড়া</span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenEmergencyModal}
            className="hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-rose-400" />
            <span>জরুরি পুলিশ ও ফায়ার সার্ভিস</span>
          </button>
          <span>•</span>
          <button
            onClick={onOpenMonetizationModal}
            className="hover:text-amber-300 flex items-center gap-1 font-bold text-amber-300 transition-colors"
          >
            <DollarSign className="w-3 h-3" />
            <span>টাকা আয় ও AdMob</span>
          </button>
          <span>•</span>
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1 font-bold transition-colors ${isAdmin ? 'text-emerald-300' : 'hover:text-amber-300'}`}
          >
            {isAdmin ? <ShieldCheck className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3" />}
            <span>{isAdmin ? 'এডমিন ড্যাশবোর্ড' : 'এডমিন প্যানেল'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Droplet className="w-5 h-5 sm:w-6 sm:h-6 fill-red-400 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-sm sm:text-lg text-slate-900 dark:text-white leading-tight tracking-tight">
                ধনকুন্ডী উত্তর পাড়া সেবা পরিষদ
              </h1>
              <span className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                শেরপুর, বগুড়া
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-none mt-0.5">
              রক্তদান নেটওয়ার্ক, প্রবাসী অনুদান ও ডিজিটাল সেবা
            </p>
          </div>
        </div>

        {/* Right Action Icons: Live Corner Clock, Dark Mode, Notification, Income */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Live Corner Clock */}
          <div className="hidden lg:block">
            <CornerClock />
          </div>

          {/* AdMob & Monetization Quick Button */}
          <button
            onClick={onOpenMonetizationModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 text-xs font-bold transition-all cursor-pointer"
            title="অ্যাপ থেকে টাকা ইনকাম নির্দেশিকা ও অ্যাডমোব"
          >
            <DollarSign className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">টাকা ইনকাম</span>
          </button>

          {/* Emergency Quick Button */}
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 text-xs font-bold transition-all cursor-pointer"
            title="সরকারি জরুরি নম্বর"
          >
            <PhoneCall className="w-4 h-4 text-red-600 animate-pulse" />
            <span className="hidden sm:inline">জরুরি নম্বর</span>
          </button>

          {/* Admin Panel Button */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:border-emerald-600 shadow-sm'
                : isAdmin
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="এডমিন প্যানেল"
          >
            {isAdmin ? <ShieldCheck className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{isAdmin ? 'এডমিন' : 'লগইন'}</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            title="নোটিফিকেশন"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold flex items-center justify-center animate-bounce">
                {toBengaliDigits(unreadNotificationCount)}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            title={isDarkMode ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:block border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.id === 'blood' ? 'text-red-500' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white text-emerald-700' : 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2 animate-in slide-in-from-top-2">
          {/* Mobile Corner Clock preview */}
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <CornerClock />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all text-left ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className={`col-span-2 p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white dark:bg-emerald-600'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              }`}
            >
              {isAdmin ? <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Lock className="w-4 h-4" />}
              <span>{isAdmin ? 'এডমিন ড্যাশবোর্ড' : 'এডমিন প্যানেলে লগইন'}</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
