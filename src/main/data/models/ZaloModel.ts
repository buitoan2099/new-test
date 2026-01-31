import { LocationData, Phone, ZaloInfo } from "../../core/entities/Zalo";

export class ZaloInfoModel implements ZaloInfo {
  constructor(
    public name: string,
    public avatar: string,
    public idByOA?: string,
    public followedOA?: boolean,
  ) {}
}

export class PhoneModel implements Phone {
  constructor(public phone: string) {}
}

export class LocationModel implements LocationData {
  constructor(
    public provider: string,
    public latitude: number,
    public longitude: number,
    public timestamp: string,
  ) {}
}
