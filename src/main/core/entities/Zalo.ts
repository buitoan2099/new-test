export interface ZaloInfo {
  name: string;
  avatar: string;
  idByOA?: string;
  followedOA?: boolean;
}

export interface Phone {
  phone: string;
}

export interface LocationData {
  provider: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}
