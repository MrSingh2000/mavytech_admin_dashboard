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
  phone?: string;
  imageUrl: string;
  role: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
};
