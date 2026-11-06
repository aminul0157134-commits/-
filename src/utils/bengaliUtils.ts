/**
 * Bengali utility functions for numbers, dates, currency, and local times
 */

export const toBengaliDigits = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return '';
  const str = num.toString();
  const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (w) => bengaliNumbers[+w]);
};

export const formatTaka = (amount: number): string => {
  const formatted = amount.toLocaleString('en-IN');
  return `৳ ${toBengaliDigits(formatted)}`;
};

export const getBengaliDayName = (dayIndex: number): string => {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  return days[dayIndex] || '';
};

export const getBengaliMonthName = (monthIndex: number): string => {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  return months[monthIndex] || '';
};

// Approximate Bengali calendar date converter
export const getBanglaCalendarDate = (date: Date): string => {
  // Traditional Bengali Panjika approximation
  const day = date.getDate();
  const month = date.getMonth(); // 0-indexed
  
  const banglaMonths = [
    'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
    'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
  ];

  // Standard offset for Bangla year (Gregorian year - 593 or 594)
  const currentYear = date.getFullYear();
  let banglaYear = currentYear - 593;
  if (month < 3 || (month === 3 && day < 14)) {
    banglaYear = currentYear - 594;
  }

  // Simplified Bangla month determination (starts mid-April ~ Apr 14)
  let bMonth = 0;
  let bDay = 1;

  if (month === 3 && day >= 14) { bMonth = 0; bDay = day - 13; }
  else if (month === 4 && day < 15) { bMonth = 0; bDay = day + 17; }
  else if (month === 4 && day >= 15) { bMonth = 1; bDay = day - 14; }
  else if (month === 5 && day < 15) { bMonth = 1; bDay = day + 17; }
  else if (month === 5 && day >= 15) { bMonth = 2; bDay = day - 14; }
  else if (month === 6 && day < 16) { bMonth = 2; bDay = day + 16; }
  else if (month === 6 && day >= 16) { bMonth = 3; bDay = day - 15; }
  else if (month === 7 && day < 16) { bMonth = 3; bDay = day + 16; }
  else if (month === 7 && day >= 16) { bMonth = 4; bDay = day - 15; }
  else if (month === 8 && day < 16) { bMonth = 4; bDay = day + 16; }
  else if (month === 8 && day >= 16) { bMonth = 5; bDay = day - 15; }
  else if (month === 9 && day < 16) { bMonth = 5; bDay = day + 15; }
  else if (month === 9 && day >= 16) { bMonth = 6; bDay = day - 15; }
  else if (month === 10 && day < 15) { bMonth = 6; bDay = day + 15; }
  else if (month === 10 && day >= 15) { bMonth = 7; bDay = day - 14; }
  else if (month === 11 && day < 15) { bMonth = 7; bDay = day + 16; }
  else if (month === 11 && day >= 15) { bMonth = 8; bDay = day - 14; }
  else if (month === 0 && day < 15) { bMonth = 8; bDay = day + 17; }
  else if (month === 0 && day >= 15) { bMonth = 9; bDay = day - 14; }
  else if (month === 1 && day < 14) { bMonth = 9; bDay = day + 17; }
  else if (month === 1 && day >= 14) { bMonth = 10; bDay = day - 13; }
  else if (month === 2 && day < 15) { bMonth = 10; bDay = day + 15; }
  else if (month === 2 && day >= 15) { bMonth = 11; bDay = day - 14; }
  else if (month === 3 && day < 14) { bMonth = 11; bDay = day + 17; }

  return `${toBengaliDigits(bDay)} ${banglaMonths[bMonth]}, ${toBengaliDigits(banglaYear)} বঙ্গাব্দ`;
};

// Prayer Times approximation for Sherpur, Bogura, Bangladesh (Lat 24.67°, Long 89.42°)
export const getSherpurPrayerTimes = () => {
  return [
    { name: 'ফজর', time: '০৪:৫৮ মিনিট', status: 'ভোর' },
    { name: 'সূর্যোদয়', time: '০৬:১৫ মিনিট', status: 'সকাল' },
    { name: 'যোহর', time: '১২:০২ মিনিট', status: 'দুপুর' },
    { name: 'আসর', time: '০৩:৪৮ মিনিট', status: 'বিকাল' },
    { name: 'মাগরিব', time: '০৫:২৬ মিনিট', status: 'সন্ধ্যা' },
    { name: 'এশা', time: '০৬:৪৫ মিনিট', status: 'রাত' },
  ];
};
