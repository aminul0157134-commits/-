import React, { useState } from 'react';
import { Bell, BellRing, X, CheckCheck, Send, AlertTriangle, Droplet, Heart, Radio, Volume2 } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onSendBroadcast: (notification: AppNotification) => void;
  onSelectTab: (tab: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSendBroadcast,
  onSelectTab
}) => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState<AppNotification['type']>('blood');

  if (!isOpen) return null;

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;

    // Simulate sound chime
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (err) {
      // AudioContext unavailable
    }

    const newNotification: AppNotification = {
      id: `notif-${Date.now()}`,
      title: broadcastTitle.trim(),
      message: broadcastMessage.trim(),
      time: 'এইমাত্র',
      type: broadcastType,
      read: false,
      linkTab: broadcastType === 'blood' ? 'blood' : broadcastType === 'donation' ? 'donations' : 'notices'
    };

    onSendBroadcast(newNotification);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setIsBroadcasting(false);
  };

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'blood':
        return <Droplet className="w-4 h-4 text-red-500 fill-red-500" />;
      case 'donation':
        return <Heart className="w-4 h-4 text-emerald-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <BellRing className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">জরুরি নোটিফিকেশন বাতায়ন</h3>
              <p className="text-xs text-emerald-100">
                গ্রামের জরুরি রক্তদান, সাহায্য ও তাৎক্ষণিক আপডেট
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

        {/* Action Bar */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={onMarkAllAsRead}
            className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 flex items-center gap-1 font-medium transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" /> সব পড়া হয়েছে হিসেবে চিহ্নিত করুন
          </button>

          <button
            onClick={() => setIsBroadcasting(!isBroadcasting)}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>জরুরি বার্তা প্রচার করুন</span>
          </button>
        </div>

        {/* Broadcast Form (if toggled) */}
        {isBroadcasting && (
          <form onSubmit={handleBroadcast} className="p-4 bg-amber-50/60 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/60 text-xs space-y-2.5 animate-in fade-in">
            <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-amber-600 animate-ping" />
              <span>গ্রামের সকল সদস্যের জন্য জরুরি পুশ নোটিফিকেশন তৈরি করুন</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="শিরোনাম (যেমন: B+ রক্তের জরুরি আহ্বান)"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none"
              />

              <select
                value={broadcastType}
                onChange={(e) => setBroadcastType(e.target.value as any)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none font-medium"
              >
                <option value="blood">রক্তদান অ্যালার্ট</option>
                <option value="donation">অনুদানের খবর</option>
                <option value="alert">জরুরি সামাজিক ঘোষণা</option>
              </select>
            </div>

            <textarea
              rows={2}
              required
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="বিস্তারিত বার্তা ও যোগাযোগের নম্বর..."
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsBroadcasting(false)}
                className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>এখনই প্রচার করুন</span>
              </button>
            </div>
          </form>
        )}

        {/* Notifications List */}
        <div className="p-4 max-h-[55vh] overflow-y-auto space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (notif.linkTab) {
                  onSelectTab(notif.linkTab);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-80'
                  : 'bg-white dark:bg-slate-800/90 border-emerald-300 dark:border-emerald-700/80 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  {getNotificationIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {notif.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  {notif.linkTab && (
                    <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <span>বিস্তারিত দেখতে ক্লিক করুন</span> →
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              কোনো নতুন নোটিফিকেশন নেই
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          জরুরি প্রয়োজনে কল করুন: <strong>01712-895421</strong>
        </div>

      </div>
    </div>
  );
};
