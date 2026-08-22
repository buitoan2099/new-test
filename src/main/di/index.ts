import Repositories from "./Repositories";
import UseCases from "./UseCases";

const cRepositories = Repositories();

const cUseCase = UseCases("zalo", cRepositories.ZaloRepositoryImpl);

export default {
  followOaUseCase: cUseCase.followOa,
  authorizePhoneNameAndFollowOaUseCase: cUseCase.authorizePhoneNameAndFollowOa,
  authorizePhoneNameUseCase: cUseCase.authorizePhone,
  getLocationUseCase: cUseCase.getLocation,
  changeAvatarUseCase: cUseCase.changeAvatar,
};
