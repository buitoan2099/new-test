import { chooseImage } from "zmp-sdk";

export class ChangeAvatarUseCase {
  //   constructor(private avatarRepo: AvatarRepository) {}

  async execute(filePath: string) {
    const file = new File([filePath], "avatar.jpg", {
      type: "image/jpeg",
    }); // ✅ Validate dung lượng (ví dụ < 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Ảnh quá lớn (tối đa 5MB)");
    }

    // ✅ Validate loại file
    if (!file.type.startsWith("image/")) {
      throw new Error("File không phải ảnh");
    }

    // return await this.avatarRepo.uploadAvatar(file);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Sau 1 giây");

    return {
      url: "",
    };
  }
}
