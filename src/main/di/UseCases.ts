import IZaloRepo from "../core/repositories/IZaloRepo";
import {
  AuthorizePhoneNameAndFollowOaUseCase,
  AuthorizePhoneNameUseCase,
  FollowOaUseCase,
  GetLocationUseCase,
} from "../core/usecases/ZaloUseCase";

export default (zaloRepo: IZaloRepo) => {
  return {
    //zalo
    FollowOaUseCase: new FollowOaUseCase(zaloRepo),
    AuthorizePhoneNameAndFollowOaUseCase:
      new AuthorizePhoneNameAndFollowOaUseCase(zaloRepo),
    AuthorizePhoneNameUseCase: new AuthorizePhoneNameUseCase(zaloRepo),
    GetLocationUseCase: new GetLocationUseCase(zaloRepo),
  };
};
