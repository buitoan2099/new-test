import { LocationData, Phone, ZaloInfo } from "../../core/entities/Zalo";
import IZaloRepo from "../../core/repositories/IZaloRepo";
import { createZaloLocalDataSource } from "../datasource/local/ZaloLocalDataSource";

// Dùng tạm
//  Repository phụ thuộc cứng vào:
//	•	Cách khởi tạo DataSource
//	•	Kiểu DataSource cụ thể
//  => Vi phạm nguyên tắc Dependency Inversion Principle (DIP)
// Đúng chuẩn
// Inject DataSource từ constructor
// constructor(
//    private readonly zaloLocalDataSource: ZaloLocalDataSource
//  ) {}
export default class ZaloRepositoryImpl implements IZaloRepo {
  private zaloLocalDataSource = createZaloLocalDataSource();

  async requestFollowOA(): Promise<void> {
    return this.zaloLocalDataSource.requestFollowOA();
  }

  async authorizePhoneName(): Promise<void> {
    return this.zaloLocalDataSource.authorizePhoneName();
  }

  async getPhone(): Promise<Phone> {
    return this.zaloLocalDataSource.getPhone();
  }

  async getUserInfo(): Promise<ZaloInfo> {
    return this.zaloLocalDataSource.getZaloInfo();
  }

  async getLocation(): Promise<LocationData> {
    return this.zaloLocalDataSource.getLocationUser();
  }
}
