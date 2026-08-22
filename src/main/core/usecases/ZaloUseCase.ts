import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInfo } from "../entities/User";
import IZaloRepo from "../repositories/IZaloRepo";
import { handleUseCaseError } from "./HandleUseCaseException";
import { LocationData } from "../entities/Zalo";

export class FollowOaUseCase {
  constructor(private readonly zaloRepo: IZaloRepo) {}

  async execute(): Promise<any> {
    await this.zaloRepo.authorizePhoneName();
    const userInfo = await this.zaloRepo.getUserInfo();
    if (!userInfo.followedOA) {
      await this.zaloRepo.requestFollowOA();
    }
    return {
      idByOa: userInfo.idByOA,
    };
  }
}

export class AuthorizePhoneNameAndFollowOaUseCase {
  constructor(private readonly zaloRepo: IZaloRepo) {}

  async execute(): Promise<UserInfo> {
    await this.zaloRepo.authorizePhoneName();

    let userInfo = await this.zaloRepo.getUserInfo();
    const phoneInfo = await this.zaloRepo.getPhone();
    console.log(!userInfo?.followedOA);

    // if (!userInfo?.followedOA) {
    //   await this.zaloRepo.requestFollowOA();
    // }

    if (!userInfo?.idByOA) {
      userInfo = await this.zaloRepo.getUserInfo();
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Sau 1 giây");

    return {
      phone: phoneInfo?.phone,
      name: userInfo?.name,
      avatar: userInfo?.avatar,
      idByOA: userInfo?.idByOA,
      followedOA: userInfo?.followedOA,
    };
  }
}

export class AuthorizePhoneNameUseCase {
  constructor(private readonly zaloRepo: IZaloRepo) {}

  async execute(): Promise<any> {
    await this.zaloRepo.authorizePhoneName();

    const userInfo = await this.zaloRepo.getUserInfo();
    const phoneInfo = await this.zaloRepo.getPhone();

    return {
      phone: phoneInfo?.phone,
      name: userInfo?.name,
      avatar: userInfo?.avatar,
    };
  }
}

export class GetLocationUseCase {
  constructor(private readonly zaloRepo: IZaloRepo) {}

  async execute(): Promise<LocationData> {
    const location = await this.zaloRepo.getLocation();
    return location;
  }
}
