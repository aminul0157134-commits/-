import React, { useState } from 'react';
import { Users, UserPlus, Phone, Search, MapPin, Briefcase, Award, Globe, Droplet, MessageCircle } from 'lucide-react';
import { VillageMember } from '../types';
import { toBengaliDigits } from '../utils/bengaliUtils';

interface MembersDirectoryProps {
  members: VillageMember[];
  onOpenAddMemberModal: () => void;
}

export const MembersDirectory: React.FC<MembersDirectoryProps> = ({
  members,
  onOpenAddMemberModal
}) => {
  const [filterRole, setFilterRole] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    'সব',
    'কার্যনির্বাহী কমিটি',
    'প্রবাসী ভাইগণ',
    'রক্তদাতা সদস্য',
    'স্বেচ্ছাসেবক'
  ];

  const filteredMembers = members.filter((member) => {
    let matchesTab = true;
    if (filterRole === 'কার্যনির্বাহী কমিটি') {
      matchesTab = ['সভাপতি', 'সহ-সভাপতি', 'সাধারণ সম্পাদক', 'সাংগঠনিক সম্পাদক', 'কোষাধ্যক্ষ', 'সমাজকল্যাণ সম্পাদক'].includes(member.role);
    } else if (filterRole === 'প্রবাসী ভাইগণ') {
      matchesTab = Boolean(member.isExpatriate || member.role === 'সম্মানিত প্রবাসী সদস্য');
    } else if (filterRole === 'রক্তদাতা সদস্য') {
      matchesTab = member.isAvailableForBlood;
    } else if (filterRole === 'স্বেচ্ছাসেবক') {
      matchesTab = member.role === 'স্বেচ্ছাসেবক';
    }

    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery) ||
      member.occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header and Add Member Button */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>ধনকুন্ডী উত্তর পাড়া সমাজ কল্যাণ পরিষদ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            সম্মানিত সদস্য তালিকা ও পরিচিতি
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            গ্রামের উন্নয়ন ও সেবায় নিয়োজিত দেশ-বিদেশের সর্বমোট {toBengaliDigits(members.length)} জন নিবন্ধিত সদস্য
          </p>
        </div>

        <button
          onClick={onOpenAddMemberModal}
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>নতুন সদস্য যুক্ত করুন</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterRole(tab)}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                filterRole === tab
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, পদবি বা ফোন নম্বর দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Members Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group"
          >
            <div>
              {/* Top row with avatar & role badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={member.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
                      alt={member.name}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-emerald-100 dark:border-emerald-900 shadow-xs"
                    />
                    {member.isExpatriate && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px]" title="প্রবাসী সদস্য">
                        ✈
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {member.name}
                    </h4>
                    <span className="inline-block mt-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 flex items-center justify-center font-black text-xs font-mono shrink-0 shadow-xs" title="রক্তের গ্রুপ">
                  {member.bloodGroup}
                </div>
              </div>

              {/* Bio info */}
              <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">পিতা:</span>
                  <span className="font-medium">{member.fatherName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{member.occupation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{member.address}</span>
                </div>
                {member.currentLocation && member.currentLocation !== member.address && (
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span>অবস্থান: {member.currentLocation}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Direct Call & WhatsApp */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                {toBengaliDigits(member.phone)}
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`https://wa.me/880${member.phone.replace(/[^0-9]/g, '').slice(-10)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors"
                  title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`tel:${member.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>কল করুন</span>
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="p-12 text-center text-slate-400 text-xs">
          কোনো সদস্য খুঁজে পাওয়া যায়নি।
        </div>
      )}

    </div>
  );
};
