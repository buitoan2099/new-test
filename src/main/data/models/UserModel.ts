import { UserInfo } from "../../core/entities/User";

export class UserModel implements UserInfo {
  constructor(
    public name: string,
    public phone: string,
    public avatar: string,
    public idByOA?: string,
    public followedOA?: boolean
  ) {}
}
