import { LocationData, Phone, ZaloInfo } from "../entities/Zalo";

export default interface IZaloRepo {
  requestFollowOA(): Promise<void>;
  authorizePhoneName(): Promise<void>;
  getPhone(): Promise<Phone>;
  getUserInfo(): Promise<ZaloInfo>;
  getLocation(): Promise<LocationData>;
}
