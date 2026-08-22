import { ChangeAvatarUseCase } from "../core/usecases/UpdateImageUseCase";
import IZaloRepo from "../core/repositories/IZaloRepo";
import {
  AuthorizePhoneNameAndFollowOaUseCase,
  AuthorizePhoneNameUseCase,
  FollowOaUseCase,
  GetLocationUseCase,
} from "../core/usecases/ZaloUseCase";

type UseCaseType = "zalo" | "user";

export default (type: UseCaseType, repo: IZaloRepo) => {
  switch (type) {
    case "zalo":
      const zaloRepo = repo as IZaloRepo;
      return {
        followOa: new FollowOaUseCase(zaloRepo),
        authorizePhoneNameAndFollowOa: new AuthorizePhoneNameAndFollowOaUseCase(
          zaloRepo,
        ),
        authorizePhone: new AuthorizePhoneNameUseCase(zaloRepo),
        getLocation: new GetLocationUseCase(zaloRepo),
        changeAvatar: new ChangeAvatarUseCase(),
      };

    default:
      throw new Error("Unknown UseCase type");
  }
};
