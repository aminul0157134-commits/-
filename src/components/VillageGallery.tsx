import React, { useState } from 'react';
import { Image as ImageIcon, PlusCircle, X, ZoomIn, Calendar, Tag, Camera } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface VillageGalleryProps {
  photos: GalleryPhoto[];
  onAddPhoto: (photo: GalleryPhoto) => void;
}

export const VillageGallery: React.FC<VillageGalleryProps> = ({ photos, onAddPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New photo form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryPhoto['category']>('গ্রামের উন্নয়ন');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const categories = ['সব', 'রক্তদান কর্মসূচি', 'গ্রামের উন্নয়ন', 'খেলাধুলা', 'ঈদ ও উৎসব', 'প্রাকৃতিক দৃশ্য'];

  const filteredPhotos = photos.filter((p) => {
    if (selectedCategory === 'সব') return true;
    return p.category === selectedCategory;
  });

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    const newPhoto: GalleryPhoto = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      category,
      imageUrl: imageUrl.trim(),
      date: 'আজকে',
      description: description.trim() || 'ধনকুন্ডী উত্তর পাড়ার একটি সুন্দর মুহূর্ত।'
    };

    onAddPhoto(newPhoto);
    setTitle('');
    setImageUrl('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Add Button */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
            <Camera className="w-3.5 h-3.5" />
            <span>ধনকুন্ডী উত্তর পাড়া স্মৃতি ও কার্যক্রম বাতায়ন</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            গ্রামের ফটো ও উন্নয়ন গ্যালারি
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            রক্তদান ক্যাম্প, রাস্তা সংস্কার, ফুটবল টুর্নামেন্ট ও উৎসবের অবিস্মরণীয় মুহূর্ত
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন ছবি যুক্ত করুন</span>
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

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:shadow-xl transition-all"
          >
            <div className="aspect-4/3 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                  {photo.category}
                </span>
                <span>{photo.date}</span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {photo.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {photo.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-5 text-white bg-slate-900 border-t border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-bold text-base sm:text-lg">{activePhoto.title}</h3>
                <span className="text-xs text-amber-400 font-medium">{activePhoto.category}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activePhoto.description}</p>
              <div className="mt-2 text-xs text-slate-500">তারিখ: {activePhoto.date} • ধনকুন্ডী উত্তর পাড়া, শেরপুর, বগুড়া</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base sm:text-lg">গ্যালারিতে নতুন ছবি যোগ করুন</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="p-5 space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ছবির শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: উত্তর পাড়া যুব সমাজের ক্রিকেট টুর্নামেন্ট"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
                >
                  <option value="গ্রামের উন্নয়ন">গ্রামের উন্নয়ন</option>
                  <option value="রক্তদান কর্মসূচি">রক্তদান কর্মসূচি</option>
                  <option value="খেলাধুলা">খেলাধুলা</option>
                  <option value="ঈদ ও উৎসব">ঈদ ও উৎসব</option>
                  <option value="প্রাকৃতিক দৃশ্য">প্রাকৃতিক দৃশ্য</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ছবির অনলাইন লিঙ্ক (Image URL) *
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  সংক্ষিপ্ত বিবরণ
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ছবিটি সম্পর্কে কিছু লিখুন..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  ছবি সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
