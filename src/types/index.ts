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
