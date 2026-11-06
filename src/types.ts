export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export type MemberRole = 
  | 'সভাপতি'
  | 'সহ-সভাপতি'
  | 'সাধারণ সম্পাদক'
  | 'সাংগঠনিক সম্পাদক'
  | 'কোষাধ্যক্ষ'
  | 'সমাজকল্যাণ সম্পাদক'
  | 'প্রচার ও প্রকাশনা সম্পাদক'
  | 'স্বাস্থ্য ও রক্তদান বিষয়ক সম্পাদক'
  | 'সম্মানিত প্রবাসী সদস্য'
  | 'যুব ও ক্রীড়া সম্পাদক'
  | 'কার্যনির্বাহী সদস্য'
  | 'সাধারণ সদস্য'
  | 'স্বেচ্ছাসেবক';

export interface VillageMember {
  id: string;
  name: string;
  fatherName: string;
  phone: string;
  altPhone?: string;
  bloodGroup: BloodGroup;
  occupation: string;
  role: MemberRole;
  isAvailableForBlood: boolean;
  totalDonationCount: number;
  lastDonationDate?: string;
  address: string; // যেমন: উত্তর পাড়া, ধনকুন্ডী
  currentLocation?: string; // যেমন: ঢাকা, বগুড়া, সৌদি আরব, ধনকুন্ডী
  isExpatriate?: boolean;
  avatarUrl?: string;
  joinedDate: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  patientAge: string;
  bloodGroup: BloodGroup;
  bagsNeeded: number;
  bagsCollected: number;
  hospitalName: string;
  hospitalLocation: string; // শেরপুর / বগুড়া
  contactPhone: string;
  urgencyLevel: 'জরুরি' | 'খুব জরুরি' | 'চলতি সপ্তাহ';
  neededDate: string;
  status: 'সক্রিয়' | 'রক্তদাতা পাওয়া গেছে' | 'সম্পন্ন';
  notes: string;
  requestedBy: string;
  createdAt: string;
}

export interface BloodReview {
  id: string;
  requestId?: string;
  donorName?: string;
  donorPhone?: string;
  recipientName: string;
  recipientPhone: string;
  bloodGroup: BloodGroup;
  hospital: string;
  comment: string;
  rating: number; // 1 to 5
  date: string;
  verified: boolean;
}

export interface EmergencyContact {
  id: string;
  title: string;
  name: string;
  designation: string;
  phone: string;
  altPhone?: string;
  category: 'প্রশাসন' | 'পুলিশ' | 'ফায়ার সার্ভিস' | 'ইউপি পরিষদ' | 'চিকিৎসা' | 'বিদ্যুৎ' | 'অন্যান্য';
  available: string;
  location: string;
  badge?: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  category: 'অসুস্থদের চিকিৎসা' | 'দরিদ্র মেয়ের বিয়ে' | 'প্রবাসী ভাইদের ফান্ড' | 'মসজিদ ও মাদ্রাসা' | 'শীতবস্ত্র ও জরুরি ত্রাণ';
  targetAmount: number;
  raisedAmount: number;
  description: string;
  beneficiaryName: string;
  villageLocation: string;
  status: 'চলমান' | 'সম্পন্ন';
  imageUrl?: string;
  urgent: boolean;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  donorLocation: string; // যেমন: রিয়াদ (সৌদি আরব), দুবাই (ইউএই), ঢাকা, বগুড়া, ধনকুন্ডী
  isExpatriate: boolean;
  amount: number;
  campaignTitle: string;
  paymentMethod: 'bKash' | 'Nagad' | 'Dutch-Bangla Bank' | 'নগদ ক্যাশ';
  trxId?: string;
  date: string;
  message?: string;
  isAnonymous?: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: 'জরুরি নোটিশ' | 'সামাজিক উন্নয়ন' | 'মিটিং ও সভা' | 'খেলাধুলা ও সংস্কৃতি' | 'সাধারণ';
  date: string;
  publishedBy: string;
  content: string;
  isImportant: boolean;
  attachments?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'রক্তদান কর্মসূচি' | 'গ্রামের উন্নয়ন' | 'খেলাধুলা' | 'ঈদ ও উৎসব' | 'প্রাকৃতিক দৃশ্য';
  imageUrl: string;
  date: string;
  description: string;
  photographer?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'blood' | 'donation' | 'notice' | 'alert';
  read: boolean;
  linkTab?: string;
}

export interface AppReview {
  id: string;
  reviewerName: string;
  reviewerRoleOrLocation: string; // যেমন: গ্রামবাসী, প্রবাসী (সৌদি আরব), শিক্ষার্থী, সমাজসেবক
  rating: number; // 1 to 5
  feedback: string;
  date: string;
  verifiedVillager: boolean;
}
