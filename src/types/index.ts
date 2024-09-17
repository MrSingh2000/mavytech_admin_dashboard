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


export type AdvertisementType = {
  _id: string;
  title: string;
  url: string;
  thumbnail: string;
  targetCity: string[];
  targetCountry: string[];
  active: string;
};

export type DocumentType = {
  _id: string;
  title: string;
  url: string;
};
