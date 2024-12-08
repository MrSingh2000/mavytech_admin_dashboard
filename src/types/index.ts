import { SUBSCRIPTION_TIER } from '@/enum';

export type APIResponse<T = any> = {
  message?: string;
  code?: number;
  value?: T;
};

export type EquipmentType = {
  _id: string;
  name: string;
  machineModel: string;
  description: string;
  image: string;
  userManual: string;
  serviceManual: string;
};

export type ModelType = {
  _id: string;
  machineModel: string;
  userManual: string;
  serviceManual: string;
};

export type MachineType = {
  name: string;
  image: string;
  description: string;
  models: ModelType[];
};

export type EquipmentState = {
  data: MachineType[];
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
  selectedEquipment: EquipmentType | null;
};
export type ApprovalType = {
  _id: string;
  name: string;
  machineModel: string;
  description: string;
  image: string;
  userManual: string;
  serviceManual: string;
  approved: boolean;
  createdAt: string;
};

export enum FlaggedModels {
  SERVICES = 'Services',
  SALES = 'Sales',
  NEWS = 'News',
}

export type ServicesType = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string[];
  postedBy: UserType;
  equipmentName: string;
  equipmentModel: string;
  state: string;
  country: string;
  createdAt: string;
};

export type SalesType = ServicesType & {
  location: string;
  price: string;
};
export type NewsType = {
  title: string;
  description: string;
  imageUrl: string;
  likes: string[];
  postedBy: UserType;
  tags: string[];
  _id: string;
  createdAt: string;
};

export type FlaggedType = {
  _id: string;
  postId: string;
  postModel: FlaggedModels;
  reportedBy: UserType;
  category: string;
  createdAt: string;
  updatedAt: string;
  postDetails: ServicesType | NewsType | SalesType;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  dob: string;
  phone: string;
  imageUrl: string;
  role: string;
  state: string;
  country: string;
  createdAt: string;
};

export type AdvertisementType = {
  _id: string;
  title: string;
  url: string;
  thumbnail: string;
  targetCity: string[];
  targetCountry: string[];
  active: boolean;
};

export type DocumentType = {
  _id: string;
  title: string;
  url: string;
};

export type AuthType = {
  authToken: string;
};

export type UserObjType = {
  _id: string;
  name: string;
  email: string;
  dob?: string;
  phone?: {
    code: string;
    number: string;
  };
  imageUrl: string;
  role: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  subscriptionStatus: SUBSCRIPTION_TIER;
  subscriptionExpirationDate: string;
};

export type AppConstantsType = {
  minimalWithdrawalAmount: number;
  referralAwardPoints: number;
  rewardPointEquivalent: number;
  subTier1Price: number;
  subTier2Price: number;
  subTier3Price: number;
  subTier4Price: number;
  learningOffer: {
    discount: number;
    title: string;
    description: string;
  };
};

export type WithdrawalTransactionType = {
  amount: string;
  type: 'debit' | 'credit';
  isWithdrawalRequest: boolean;
  status: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type WithdrawalRequestType = {
  _id: string;
  userId: string;
  user: UserObjType;
  credit: WithdrawalTransactionType[];
  debit: WithdrawalTransactionType[];
  total: number;
  updatedAt: string;
  createdAt: string;
};

export type LearningVideo = {
  _id: string;
  title: string;
  description: string;
  paid: boolean;
  price: number;
  link: string;
  equipmentRelated: string;
  modelRelated: string;
  buyers: string[];
  reviews: any[]; // not being used here so type is not defined
  updatedAt: string;
};

export type LearningPlaylist = {
  _id: string;
  title: string;
  description: string;
  paid: boolean;
  price: number;
  videos: string[];
  equipmentRelated: string;
  modelRelated: string;
  buyers: string[];
  updatedAt: string;
};
