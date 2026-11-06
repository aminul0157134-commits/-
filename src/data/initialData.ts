import { VillageMember, BloodRequest, BloodReview, EmergencyContact, DonationCampaign, DonationRecord, NoticeItem, GalleryPhoto, AppNotification, AppReview } from '../types';

export const INITIAL_MEMBERS: VillageMember[] = [
  {
    id: 'mem-1',
    name: 'মো: আমিনুল ইসলাম',
    fatherName: 'মরহুম আব্দুল জলিল',
    phone: '01712-895421',
    bloodGroup: 'B+',
    occupation: 'ব্যবসা ও সমাজসেবক',
    role: 'সভাপতি',
    isAvailableForBlood: true,
    totalDonationCount: 7,
    lastDonationDate: '২০২৪-০৯-১২',
    address: 'ধনকুন্ডী উত্তর পাড়া, জামে মসজিদ সংলগ্ন',
    currentLocation: 'ধনকুন্ডী উত্তর পাড়া',
    joinedDate: '২০২০-০১-১৫',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'mem-2',
    name: 'তরিকুল ইসলাম (মিলন)',
    fatherName: 'মো: মজিবর রহমান',
    phone: '01725-443322',
    bloodGroup: 'O+',
    occupation: 'আইটি উদ্যোক্তা ও শিক্ষক',
    role: 'সাধারণ সম্পাদক',
    isAvailableForBlood: true,
    totalDonationCount: 9,
    lastDonationDate: '২০২৪-১০-০৫',
    address: 'ধনকুন্ডী উত্তর পাড়া, স্কুল মোড়',
    currentLocation: 'শেরপুর / ধনকুন্ডী',
    joinedDate: '২০২০-০১-১৫',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'mem-3',
    name: 'মো: রফিকুল আলম (প্রবাসী)',
    fatherName: 'মো: সামছুল হক',
    phone: '+966-501234567',
    altPhone: '01711-987654',
    bloodGroup: 'A+',
    occupation: 'প্রবাসী উদ্যোক্তা',
    role: 'সম্মানিত প্রবাসী সদস্য',
    isAvailableForBlood: false,
    totalDonationCount: 4,
    address: 'ধনকুন্ডী উত্তর পাড়া, সরকার বাড়ি',
    currentLocation: 'রিয়াদ, সৌদি আরব',
    isExpatriate: true,
    joinedDate: '২০২১-০৩-১০',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'mem-4',
    name: 'সোহেল রানা',
    fatherName: 'মো: মোজাম্মেল হক',
    phone: '01834-567890',
    bloodGroup: 'AB+',
    occupation: 'ফার্মেসি ও প্যারামেডিক',
    role: 'স্বাস্থ্য ও রক্তদান বিষয়ক সম্পাদক',
    isAvailableForBlood: true,
    totalDonationCount: 11,
    lastDonationDate: '২০২৪-১১-০১',
    address: 'ধনকুন্ডী উত্তর পাড়া, বাজার রোড',
    currentLocation: 'সীমাবাড়ী বাজার',
    joinedDate: '২০২০-০২-০১',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'mem-5',
    name: 'মো: রাসেল খন্দকার',
    fatherName: 'মো: খলিলুর রহমান',
    phone: '01799-112233',
    bloodGroup: 'O-',
    occupation: 'কৃষিবিদ ও তরুণ সংগঠক',
    role: 'সাংগঠনিক সম্পাদক',
    isAvailableForBlood: true,
    totalDonationCount: 5,
    lastDonationDate: '২০২৪-০৮-২০',
    address: 'ধনকুন্ডী উত্তর পাড়া, পূর্ব পাড়া সংলগ্ন',
    currentLocation: 'ধনকুন্ডী',
    joinedDate: '২০২০-০৬-১০',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'mem-6',
    name: 'মো: জাহিদুল ইসলাম (দুবাই)',
    fatherName: 'মো: আব্দুল বারিক',
    phone: '+971-508765432',
    altPhone: '01733-445566',
    bloodGroup: 'B-',
    occupation: 'প্রবাসী রেমিট্যান্স যোদ্ধা',
    role: 'সম্মানিত প্রবাসী সদস্য',
    isAvailableForBlood: false,
    totalDonationCount: 3,
    address: 'ধনকুন্ডী উত্তর পাড়া, খাঁ বাড়ি',
    currentLocation: 'দুবাই, সংযুক্ত আরব আমিরাত',
    isExpatriate: true,
    joinedDate: '২০২১-০৭-২২',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'mem-7',
    name: 'মোস্তাফিজুর রহমান সুমন',
    fatherName: 'মো: আনোয়ার হোসেন',
    phone: '01716-554433',
    bloodGroup: 'A-',
    occupation: 'অনার্স শিক্ষার্থী ও ভলান্টিয়ার',
    role: 'স্বেচ্ছাসেবক',
    isAvailableForBlood: true,
    totalDonationCount: 6,
    lastDonationDate: '২০২৪-০৭-১৪',
    address: 'ধনকুন্ডী উত্তর পাড়া, মধ্য মাঠ সংলগ্ন',
    currentLocation: 'বগুড়া সরকারি আজিজুল হক কলেজ / ধনকুন্ডী',
    joinedDate: '২০২২-০১-০৫',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'mem-8',
    name: 'আলহাজ্ব শাহিনুর রহমান',
    fatherName: 'মরহুম আফসার আলী',
    phone: '01715-667788',
    bloodGroup: 'B+',
    occupation: 'ব্যবসায়ী ও মুরুব্বি',
    role: 'কোষাধ্যক্ষ',
    isAvailableForBlood: false,
    totalDonationCount: 2,
    address: 'ধনকুন্ডী উত্তর পাড়া, বড় বাড়ি',
    currentLocation: 'ধনকুন্ডী',
    joinedDate: '২০২০-০১-১৫',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: 'req-1',
    patientName: 'মোছা: রহিমা খাতুন (৫৫)',
    patientAge: '৫৫ বছর',
    bloodGroup: 'B+',
    bagsNeeded: 2,
    bagsCollected: 1,
    hospitalName: 'শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স, বগুড়া',
    hospitalLocation: 'শেরপুর, বগুড়া',
    contactPhone: '01712-895421',
    urgencyLevel: 'জরুরি',
    neededDate: 'আজ দুপুর ২:০০ টার মধ্যে',
    status: 'সক্রিয়',
    notes: 'রক্তস্বল্পতা ও অপারেশনের জন্য فوری বি+ রক্ত প্রয়োজন। রক্তদাতার যাতায়াত খরচ দেওয়া হবে।',
    requestedBy: 'মো: শামীম হোসেন (ছেলে)',
    createdAt: 'আজ সকাল ৮:৩০'
  },
  {
    id: 'req-2',
    patientName: 'মো: আব্দুল বাছেদ (৪২)',
    patientAge: '৪২ বছর',
    bloodGroup: 'O-',
    bagsNeeded: 1,
    bagsCollected: 0,
    hospitalName: 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ (SZMC), বগুড়া',
    hospitalLocation: 'বগুড়া শহর',
    contactPhone: '01725-443322',
    urgencyLevel: 'খুব জরুরি',
    neededDate: 'আগামীকাল সকাল ৯:০০ টা',
    status: 'সক্রিয়',
    notes: 'দুর্ঘটনায় আহত, জরুরি ও-নেগেটিভ রক্তের গ্রুপধারী রক্তদাতা ভাইদের সদয় এগিয়ে আসার অনুরোধ।',
    requestedBy: 'তরিকুল ইসলাম মিলন',
    createdAt: 'গতকাল বিকাল ৫:১৫'
  },
  {
    id: 'req-3',
    patientName: 'শিশু ফাহিম (৭)',
    patientAge: '৭ বছর',
    bloodGroup: 'A+',
    bagsNeeded: 1,
    bagsCollected: 1,
    hospitalName: 'টিএমএসএস মেডিকেল কলেজ হাসপাতাল, ঠেঙ্গামারা, বগুড়া',
    hospitalLocation: 'বগুড়া',
    contactPhone: '01834-567890',
    urgencyLevel: 'চলতি সপ্তাহ',
    neededDate: 'রক্ত সংগ্রহ সম্পন্ন',
    status: 'সম্পন্ন',
    notes: 'থ্যালাসেমিয়া রোগী, ধনকুন্ডী যুব সমাজের ভাই সোহেল রানা রক্ত দিয়ে সহযোগিতা করেছেন।',
    requestedBy: 'আরিফ হোসেন (চাচা)',
    createdAt: '৩ দিন আগে'
  }
];

export const INITIAL_BLOOD_REVIEWS: BloodReview[] = [
  {
    id: 'rev-1',
    donorName: 'সোহেল রানা ভাই',
    recipientName: 'আরিফ হোসেন',
    recipientPhone: '01834-XXXXXX',
    bloodGroup: 'AB+',
    hospital: 'টিএমএসএস মেডিকেল কলেজ, বগুড়া',
    comment: 'আমার ভাতিজার থ্যালাসেমিয়ার রক্ত লাগার সাথে সাথে সোহেল ভাই নিজে গিয়ে রক্ত দিয়ে এসেছেন। ধনকুন্ডী উত্তর পাড়ার এই সংগঠনের প্রতি চিরকৃতজ্ঞ। আল্লাহ আপনাদের উত্তম প্রতিদান দিন।',
    rating: 5,
    date: '০৩ দিন আগে',
    verified: true
  },
  {
    id: 'rev-2',
    donorName: 'মোস্তাফিজুর রহমান সুমন',
    recipientName: 'মো: কাওসার আলী',
    recipientPhone: '01716-XXXXXX',
    bloodGroup: 'A-',
    hospital: 'শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স',
    comment: 'রাত ১২টায় ফোন দেওয়ার পরও সুমন ভাই কোনো আপত্তি না করে শেরপুর হাসপাতালে এসে রক্ত দিলেন। রক্তের গ্রুপ যখন বিরল এ-নেগেটিভ তখন এই অ্যাপের সাহায্যেই পাওয়া গেল। অসংখ্য ধন্যবাদ!',
    rating: 5,
    date: 'গত সপ্তাহে',
    verified: true
  },
  {
    id: 'rev-3',
    donorName: 'তরিকুল ইসলাম মিলন',
    recipientName: 'মো: হাফিজুর রহমান',
    recipientPhone: '01725-XXXXXX',
    bloodGroup: 'O+',
    hospital: 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল',
    comment: 'আমার মায়ের অস্ত্রোপচারের সময় খুব দ্রুত ২ ব্যাগ রক্ত প্রয়োজন হয়েছিল। মিলন ভাই এবং গ্রাম পরিষদ তাৎক্ষণিক রক্তদাতার ব্যবস্থা করে দিয়েছেন। চমৎকার উদ্যোগ।',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    verified: true
  }
];

export const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-1',
    title: 'জাতীয় জরুরি সেবা',
    name: 'কল সেন্টার ৯৯৯',
    designation: 'পুলিশ, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস',
    phone: '999',
    category: 'প্রশাসন',
    available: '২৪ ঘণ্টা সার্বক্ষণিক',
    location: 'সারাদেশ',
    badge: 'টোল ফ্রি'
  },
  {
    id: 'em-2',
    title: 'শেরপুর থানা পুলিশ',
    name: 'অফিসার ইনচার্জ (ওসি)',
    designation: 'শেরপুর থানা, বগুড়া জেলা পুলিশ',
    phone: '01320-126789',
    altPhone: '01713-373800',
    category: 'পুলিশ',
    available: '২৪ ঘণ্টা সার্বক্ষণিক',
    location: 'শেরপুর থানা রোড, বগুড়া',
    badge: 'জরুরি আইনশৃঙ্খলা'
  },
  {
    id: 'em-3',
    title: 'শেরপুর ফায়ার সার্ভিস ও সিভিল ডিফেন্স',
    name: 'স্টেশন মাস্টার',
    designation: 'শেরপুর ফায়ার সার্ভিস স্টেশন',
    phone: '01712-454545',
    altPhone: '02589-940555',
    category: 'ফায়ার সার্ভিস',
    available: '২৪ ঘণ্টা সার্বক্ষণিক',
    location: 'বাসস্ট্যান্ড সংলগ্ন, শেরপুর',
    badge: 'অগ্নিনির্বাপণ ও উদ্ধার'
  },
  {
    id: 'em-4',
    title: 'সীমাবাড়ী ইউনিয়ন পরিষদ চেয়ারম্যান',
    name: 'চেয়ারম্যান মহোদয়',
    designation: 'চেয়ারম্যান, সীমাবাড়ী ইউপি',
    phone: '01715-998877',
    category: 'ইউপি পরিষদ',
    available: 'সকাল ৯:০০ - বিকাল ৫:০০',
    location: 'সীমাবাড়ী ইউনিয়ন পরিষদ কার্যালয়',
    badge: 'স্থানীয় সরকার'
  },
  {
    id: 'em-5',
    title: 'ধনকুন্ডী উত্তর পাড়া ইউপি সদস্য (মেম্বার)',
    name: 'ওয়ার্ড মেম্বার',
    designation: 'ইউপি সদস্য, ১নং ওয়ার্ড, সীমাবাড়ী ইউপি',
    phone: '01718-445566',
    category: 'ইউপি পরিষদ',
    available: 'যেকোনো প্রয়োজনে',
    location: 'ধনকুন্ডী উত্তর পাড়া',
    badge: 'গ্রাম প্রতিনিধি'
  },
  {
    id: 'em-6',
    title: 'সংরক্ষিত মহিলা ইউপি সদস্যা',
    name: 'মহিলা মেম্বার',
    designation: 'সংরক্ষিত ১, ২ ও ৩ নং ওয়ার্ড, সীমাবাড়ী',
    phone: '01724-332211',
    category: 'ইউপি পরিষদ',
    available: 'সকাল ১০:০০ - বিকাল ৫:০০',
    location: 'সীমাবাড়ী ইউনিয়ন',
    badge: 'নারী ও সামাজিক অধিকার'
  },
  {
    id: 'em-7',
    title: 'শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স',
    name: 'জরুরি বিভাগ ডাক্তার',
    designation: 'উপজেলা স্বাস্থ্য কমপ্লেক্স, শেরপুর',
    phone: '01730-324888',
    altPhone: '01711-002244',
    category: 'চিকিৎসা',
    available: '২৪ ঘণ্টা ইমার্জেন্সি',
    location: 'শেরপুর পৌরসভা, বগুড়া',
    badge: 'সরকারি হাসপাতাল'
  },
  {
    id: 'em-8',
    title: 'জরুরি অ্যাম্বুলেন্স সার্ভিস',
    name: 'শেরপুর রোগী পরিবহন অ্যাম্বুলেন্স',
    designation: 'দ্রুত রোগী পরিবহন ও অক্সিজেন সুবিধা',
    phone: '01716-990011',
    category: 'চিকিৎসা',
    available: '২৪ ঘণ্টা',
    location: 'শেরপুর / সীমাবাড়ী রোড',
    badge: 'লাইফ সাপোর্ট'
  },
  {
    id: 'em-9',
    title: 'পল্লী বিদ্যুৎ অভিযোগ কেন্দ্র',
    name: 'বগুড়া পল্লী বিদ্যুৎ সমিতি-২ (শেরপুর)',
    designation: 'বিদ্যুৎ বিপর্যয় ও মিটার অভিযোগ',
    phone: '01769-400100',
    altPhone: '01769-400101',
    category: 'বিদ্যুৎ',
    available: '২৪ ঘণ্টা কল সেন্টার',
    location: 'শেরপুর জোনাল অফিস',
    badge: 'বিদ্যুৎ সেবা'
  },
  {
    id: 'em-10',
    title: 'ধনকুন্ডী গ্রাম পুলিশ (দফাদার)',
    name: 'মো: খলিল দফাদার',
    designation: 'গ্রাম পুলিশ, সীমাবাড়ী ইউনিয়ন',
    phone: '01744-887766',
    category: 'পুলিশ',
    available: 'গ্রাম্য শান্তি রক্ষা',
    location: 'ধনকুন্ডী গ্রাম',
    badge: 'গ্রাম পুলিশ'
  }
];

export const INITIAL_CAMPAIGNS: DonationCampaign[] = [
  {
    id: 'camp-1',
    title: 'অসুস্থ রহিম মিয়ার ওপেন হার্ট সার্জারি চিকিৎসা তহবিল',
    category: 'অসুস্থদের চিকিৎসা',
    targetAmount: 150000,
    raisedAmount: 94500,
    beneficiaryName: 'মো: আব্দুর রহিম (দিনমজুর)',
    villageLocation: 'ধনকুন্ডী উত্তর পাড়া (পশ্চিম পাড়ার মোড়)',
    description: 'আমাদের গ্রামের দিনমজুর রহিম মিয়া হার্টের জটিল রোগে আক্রান্ত। চিকিৎসকদের পরামর্শ অনুযায়ী জরুরি ওপেন হার্ট সার্জারি করাতে হবে। পরিবারটির পক্ষে এত টাকা জোগাড় করা অসম্ভব। প্রবাসী ও গ্রামবাসী ভাইদের সহযোগিতা কামনা করছি।',
    status: 'চলমান',
    urgent: true,
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'camp-2',
    title: 'দরিদ্র এতিম ফাতেমার কন্যার বিয়েতে আর্থিক উপহার ও সহায়তা',
    category: 'দরিদ্র মেয়ের বিয়ে',
    targetAmount: 60000,
    raisedAmount: 48000,
    beneficiaryName: 'মরহুম কাদের আলীর কন্যা সুমাইয়া',
    villageLocation: 'ধনকুন্ডী উত্তর পাড়া (সরকার বাড়ি সংলগ্ন)',
    description: 'বাবার অভাবের সংসারে মেয়েটির বিবাহ স্থির হয়েছে। কিন্তু দেনমোহর ও বিয়ে আয়োজন এবং ঘরের প্রয়োজনীয় সামগ্রী ক্রয়ের মতো সামর্থ্য পরিবারটির নেই। গ্রামের মেয়ের সম্মানের জন্য আসুন সবাই মিলে কিছু সাহায্য করি।',
    status: 'চলমান',
    urgent: true,
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'camp-3',
    title: 'প্রবাসী ভাইদের অর্থায়নে উত্তর পাড়া জামে মসজিদ সম্প্রসারণ ও অজুখানা',
    category: 'প্রবাসী ভাইদের ফান্ড',
    targetAmount: 250000,
    raisedAmount: 185000,
    beneficiaryName: 'ধনকুন্ডী উত্তর পাড়া জামে মসজিদ কমিটি',
    villageLocation: 'ধনকুন্ডী উত্তর পাড়া কেন্দ্রীয় জামে মসজিদ',
    description: 'মসজিদে মুসল্লির স্থান সংকুলান ও আধুনিক টাইলসযুক্ত অজুখানা ও ওজুখানা তৈরির কাজ চলছে। আমাদের সৌদি আরব, কুয়েত, ওমান, মালয়েশিয়া ও দুবাই প্রবাসী ভাইদের বিশেষ অনুদানে কাজ দ্রুত এগিয়ে চলেছে।',
    status: 'চলমান',
    urgent: false,
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'camp-4',
    title: 'গ্রামের এতিম ও দুস্থদের মাঝে শীতবস্ত্র ও কম্বল বিতরণ',
    category: 'শীতবস্ত্র ও জরুরি ত্রাণ',
    targetAmount: 40000,
    raisedAmount: 40000,
    beneficiaryName: 'ধনকুন্ডী উত্তর পাড়ার ১০০টি অসহায় পরিবার',
    villageLocation: 'ধনকুন্ডী উত্তর পাড়া',
    description: 'শীতের প্রকোপে বয়োবৃদ্ধ ও শিশুদের উষ্ণতা দিতে ১০০টি প্রিমিয়াম কম্বল বিতরণ কার্যক্রম সফলভাবে সম্পন্ন হয়েছে। সকল দাতাকে জাযাকাল্লাহু খাইরান।',
    status: 'সম্পন্ন',
    urgent: false,
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_DONATION_RECORDS: DonationRecord[] = [
  {
    id: 'don-1',
    donorName: 'মো: রফিকুল আলম',
    donorLocation: 'রিয়াদ, সৌদি আরব',
    isExpatriate: true,
    amount: 25000,
    campaignTitle: 'অসুস্থ রহিম মিয়ার ওপেন হার্ট সার্জারি চিকিৎসা তহবিল',
    paymentMethod: 'Dutch-Bangla Bank',
    trxId: 'DBBL-894210',
    date: '২০২৪-১১-০৩',
    message: 'আল্লাহ রহিম চাচাকে দ্রুত সুস্থতা দান করুন। প্রবাস থেকে দোয়া রইল।'
  },
  {
    id: 'don-2',
    donorName: 'মো: জাহিদুল ইসলাম',
    donorLocation: 'দাইরা, দুবাই (ইউএই)',
    isExpatriate: true,
    amount: 20000,
    campaignTitle: 'দরিদ্র এতিম ফাতেমার কন্যার বিয়েতে আর্থিক উপহার',
    paymentMethod: 'bKash',
    trxId: 'BKSH-789123',
    date: '২০২৪-১১-০২',
    message: 'বোনের সুন্দর দাম্পত্য জীবনের জন্য অগ্রিম শুভেচ্ছা ও দোয়া।'
  },
  {
    id: 'don-3',
    donorName: 'মো: শরিফুল ইসলাম (কুয়েত)',
    donorLocation: 'কুয়েত সিটি, কুয়েত',
    isExpatriate: true,
    amount: 15000,
    campaignTitle: 'উত্তর পাড়া জামে মসজিদ সম্প্রসারণ ও অজুখানা',
    paymentMethod: 'Dutch-Bangla Bank',
    trxId: 'DBBL-442211',
    date: '২০২৪-১০-২৯',
    message: 'মরহুম মা-বাবার মাগফিরাত কামনায় এই ক্ষুদ্র সদকায়ে জারিয়া।'
  },
  {
    id: 'don-4',
    donorName: 'মো: আমিনুল ইসলাম',
    donorLocation: 'ধনকুন্ডী উত্তর পাড়া',
    isExpatriate: false,
    amount: 10000,
    campaignTitle: 'অসুস্থ রহিম মিয়ার ওপেন হার্ট সার্জারি চিকিৎসা তহবিল',
    paymentMethod: 'Nagad',
    trxId: 'NGD-998811',
    date: '২০২৪-১০-২৮',
    message: 'সবাই এগিয়ে আসলে আমাদের গ্রামের কেউ চিকিৎসার অভাবে মারা যাবে না ইনশাআল্লাহ।'
  },
  {
    id: 'don-5',
    donorName: 'নাম প্রকাশে অনিচ্ছুক শুভাকাঙ্ক্ষী',
    donorLocation: 'মালয়েশিয়া প্রবাসী',
    isExpatriate: true,
    amount: 8000,
    campaignTitle: 'দরিদ্র এতিম ফাতেমার কন্যার বিয়েতে আর্থিক উপহার',
    paymentMethod: 'bKash',
    trxId: 'BKSH-332115',
    date: '২০২৪-১০-২৭',
    isAnonymous: true,
    message: 'শুধু আল্লাহর সন্তুষ্টির জন্য।'
  }
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'not-1',
    title: 'জরুরি রক্তের গ্রুপ নির্ণয় ও ফ্রি ডায়াবেটিস পরীক্ষা ক্যাম্পেইন',
    category: 'জরুরি নোটিশ',
    date: '০৮ নভেম্বর ২০২৪, শুক্রবার',
    publishedBy: 'সমাজ কল্যাণ পরিষদ, ধনকুন্ডী উত্তর পাড়া',
    content: 'সকল গ্রামবাসীর অবগতির জন্য জানানো যাচ্ছে যে, আগামী শুক্রবার সকাল ৯:০০ টা থেকে দুপুর ১:০০ টা পর্যন্ত ধনকুন্ডী উত্তর পাড়া সরকারি প্রাথমিক বিদ্যালয় প্রাঙ্গণে বিনামূল্যে রক্তের গ্রুপ নির্ণয় ও ডায়াবেটিস পরীক্ষা ক্যাম্পেইন অনুষ্ঠিত হবে। যুব সমাজের সকল ভলান্টিয়ারকে যথাসময়ে উপস্থিত থাকতে অনুরোধ করা হচ্ছে।',
    isImportant: true
  },
  {
    id: 'not-2',
    title: 'উত্তর পাড়া প্রধান রাস্তা মেরামতে স্বেচ্ছাশ্রম ও আলোচনা সভা',
    category: 'সামাজিক উন্নয়ন',
    date: '০৫ নভেম্বর ২০২৪',
    publishedBy: 'কার্যনির্বাহী কমিটি',
    content: 'বর্ষার পানিতে ক্ষতিগ্রস্ত স্কুল রোড ও উত্তর পাড়া সংযোগ সড়ক মেরামতের জন্য মাটি ভরাট ও খোয়া ফেলার সিদ্ধান্ত নেওয়া হয়েছে। আগামী রবিবার সকাল ৮:০০ টায় প্রত্যেক বাড়ির অন্তত একজন যুবককে কোদাল ও ঝুঁড়ি নিয়ে উপস্থিত হতে আহ্বান জানানো হচ্ছে।',
    isImportant: false
  },
  {
    id: 'not-3',
    title: 'বার্ষিক ফুটবল টুর্নামেন্ট ও যুব উৎসবের নিবন্ধন শুরু',
    category: 'খেলাধুলা ও সংস্কৃতি',
    date: '০১ নভেম্বর ২০২৪',
    publishedBy: 'যুব ও ক্রীড়া সংসদ, ধনকুন্ডী',
    content: 'মাদককে না বলুন, খেলাধুলাকে আপন করুন স্লোগান নিয়ে ধনকুন্ডী উত্তর পাড়া মিনি ফুটবল টুর্নামেন্টের টিম এন্ট্রি শুরু হয়েছে। অংশ নিতে ইচ্ছুক দলগুলোকে আগামী ১০ নভেম্বরের মধ্যে সোহেল রানা বা রাসেল ভাইয়ের সাথে যোগাযোগের নির্দেশ দেওয়া হলো।',
    isImportant: false
  }
];

export const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'ধনকুন্ডী উত্তর পাড়া রক্তদান ক্যাম্প ও যুব সমাজের সংকল্প',
    category: 'রক্তদান কর্মসূচি',
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop&q=80',
    date: 'অক্টোবর ২০২৪',
    description: '৫০ জনের বেশি তরুণ রক্তদান করেছেন এবং রক্তের গ্রুপ ডাটাবেজে অন্তর্ভুক্ত হয়েছেন।'
  },
  {
    id: 'gal-2',
    title: 'প্রবাসী ভাইদের আর্থিক সহায়তায় রাস্তা সংস্কারের শুভ সূচনা',
    category: 'গ্রামের উন্নয়ন',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=800&auto=format&fit=crop&q=80',
    date: 'সেপ্টেম্বর ২০২৪',
    description: 'উত্তর পাড়া থেকে সীমাবাড়ী বাজারমুখী মূল সড়কের কাঁচা অংশে মাটি ভরাট কার্যক্রম।'
  },
  {
    id: 'gal-3',
    title: 'গ্রাম্য ফুটবল টুর্নামেন্ট ফাইনাল ম্যাচ ও পুরস্কার বিতরণ',
    category: 'খেলাধুলা',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    date: 'আগস্ট ২০২৪',
    description: 'ধনকুন্ডী উত্তর পাড়া একাদশ বনাম সীমাবাড়ী বাজার একাদশের রোমাঞ্চকর ফাইনাল।'
  },
  {
    id: 'gal-4',
    title: 'ঈদের জামাত শেষে উত্তর পাড়া কেন্দ্রীয় জামে মসজিদে কোলাকুলি',
    category: 'ঈদ ও উৎসব',
    imageUrl: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop&q=80',
    date: 'ঈদুল ফিতর ২০২৪',
    description: 'গ্রামের প্রবীণ, তরুণ ও প্রবাসী ভাইদের মিলনমেলা।'
  },
  {
    id: 'gal-5',
    title: 'ধনকুন্ডী গ্রামের মনোরম সবুজ সোনালী ফসলের মাঠ ও গ্রামীণ সন্ধ্যা',
    category: 'প্রাকৃতিক দৃশ্য',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    date: 'কার্তিক ২০২৪',
    description: 'আমাদের সুন্দর শান্ত শ্যামল ধনকুন্ডী গ্রাম, শেরপুর, বগুড়া।'
  },
  {
    id: 'gal-6',
    title: 'দরিদ্র শীতার্তদের মাঝে কম্বল বিতরণ উৎসব',
    category: 'গ্রামের উন্নয়ন',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    date: 'জানুয়ারি ২০২৪',
    description: '১০০ জন দুস্থ মা ও মুরুব্বিদের মুখে হাসি ফোটানোর আনন্দঘন মুহূর্ত।'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'জরুরি B+ রক্ত প্রয়োজন!',
    message: 'শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্সে রহিমা খাতুনের জন্য বি+ রক্তের প্রয়োজন। যোগাযোগ: 01712-895421',
    time: '১০ মিনিট আগে',
    type: 'blood',
    read: false,
    linkTab: 'blood'
  },
  {
    id: 'notif-2',
    title: 'নতুন অনুদান জমা হয়েছে',
    message: 'সৌদি আরব প্রবাসী রফিকুল আলম ভাই রহিম মিয়ার চিকিৎসা তহবিলে ২৫,০০০ টাকা প্রদান করেছেন।',
    time: '২ ঘণ্টা আগে',
    type: 'donation',
    read: false,
    linkTab: 'donations'
  },
  {
    id: 'notif-3',
    title: 'ফ্রি মেডিকেল ও রক্তদান ক্যাম্পেইন',
    message: 'আগামী শুক্রবার উত্তর পাড়া সরকারি প্রাথমিক বিদ্যালয়ে ফ্রি ক্যাম্পেইন অনুষ্ঠিত হবে।',
    time: '১ দিন আগে',
    type: 'notice',
    read: true,
    linkTab: 'notices'
  }
];

export const VILLAGE_PAYMENT_ACCOUNTS = {
  bkash: {
    type: 'পার্সোনাল',
    number: '01712-895421',
    holder: 'মো: আমিনুল ইসলাম (সমাজসেবা হিসাব)',
    note: 'সেন্ড মানি করার সময় রেফারেন্সে আপনার নাম বা অনুদানের খাত লিখুন।'
  },
  nagad: {
    type: 'পার্সোনাল',
    number: '01725-443322',
    holder: 'তরিকুল ইসলাম মিলন (কোষাধ্যক্ষ পরিষদ)',
    note: 'সেন্ড মানি করার পর ট্রানজেকশন আইডি দিয়ে ফর্মটি পূরণ করুন।'
  },
  dbbl: {
    bankName: 'ডাচ্-বাংলা ব্যাংক লিমিটেড (DBBL)',
    branch: 'শেরপুর শাখা, শেরপুর, বগুড়া',
    accountName: 'DHANKUNDI UTTAR PARA SEBA PARISHAD',
    accountNumber: '178.101.458921',
    routingNumber: '090101552',
    rocketNumber: '01712-895421-4 (রকেট)'
  }
};

export const INITIAL_APP_REVIEWS: AppReview[] = [
  {
    id: 'app-rev-1',
    reviewerName: 'মো: শহিদুল ইসলাম',
    reviewerRoleOrLocation: 'প্রবাসী ভাই (রিয়াদ, সৌদি আরব)',
    rating: 5,
    feedback: 'প্রবাসে বসে গ্রামের এমন চমৎকার ডিজিটাল সেবা পোর্টাল দেখে বুকটা আনন্দে ভরে যায়। গ্রামের যে ভাইয়েরই রক্ত লাগুক কিংবা যে বোনই বিয়ের আর্থিক সমস্যায় থাকুক, এখন এক ক্লিকেই সহায়তা পৌঁছে দেওয়া সম্ভব হচ্ছে। আমাদের ধনকুন্ডী উত্তর পাড়ার এই পরিষদ দীর্ঘজীবী হোক!',
    date: '০৩ দিন আগে',
    verifiedVillager: true
  },
  {
    id: 'app-rev-2',
    reviewerName: 'আলহাজ্ব মো: আব্দুল মজিদ প্রামানিক',
    reviewerRoleOrLocation: 'মুরুব্বি ও মসজিদ কমিটির উপদেষ্টা (ধনকুন্ডী)',
    rating: 5,
    feedback: 'আমাদের যুব সমাজের এই নিঃস্বার্থ সমাজসেবা ও পারস্পরিক ভ্রাতৃত্ব গ্রামের সুনাম শেরপুর উপজেলাজুড়ে ছড়িয়ে দিয়েছে। বিশেষ করে জরুরি রক্তের গ্রুপ ডাটাবেজ এবং গরিবদের জন্য চিকিৎসা তহবিলের উদ্যোগ অতুলনীয়।',
    date: 'গত সপ্তাহে',
    verifiedVillager: true
  },
  {
    id: 'app-rev-3',
    reviewerName: 'মোছা: নাজমুন নাহার',
    reviewerRoleOrLocation: 'শিক্ষিকা (ধনকুন্ডী উত্তর পাড়া সরকারি প্রাথমিক বিদ্যালয়)',
    rating: 5,
    feedback: 'অ্যাপটির ডিজাইন অত্যন্ত মার্জিত, সহজ এবং পরিষ্কার বাংলায় করা হয়েছে। গ্রামের সাধারণ মানুষও সহজে বুঝতে পারছেন। জরুরি ফায়ার সার্ভিস, থানা পুলিশ ও চেয়ারম্যানের নম্বর এক জায়গায় থাকাটা খুব বেশি ফলপ্রসূ।',
    date: '১০ দিন আগে',
    verifiedVillager: true
  },
  {
    id: 'app-rev-4',
    reviewerName: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    reviewerRoleOrLocation: 'সফটওয়্যার প্রকৌশলী (ঢাকা)',
    rating: 5,
    feedback: 'বিকাশ, নগদ ও ব্যাংকের স্বচ্ছ হিসাব দেখে মন ভরে গেল। গ্রামের যেকোনো উন্নয়নমূলক কাজে এখন প্রবাসী ও শহরবাসী সবাই সক্রিয় অংশ নিতে পারবে। ৫/৫ রেটিং প্রাপ্য!',
    date: '২ সপ্তাহ আগে',
    verifiedVillager: true
  }
];
