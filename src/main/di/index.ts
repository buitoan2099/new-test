import Repositories from "./Repositories";
import UseCases from "./UseCases";

const cRepositories = Repositories();

const cUseCase = UseCases(cRepositories.ZaloRepositoryImpl);

export default {
  FollowOaUseCase: cUseCase.FollowOaUseCase,
  AuthorizePhoneNameAndFollowOaUseCase:
    cUseCase.AuthorizePhoneNameAndFollowOaUseCase,
  AuthorizePhoneNameUseCase: cUseCase.AuthorizePhoneNameUseCase,
  GetLocationUseCase: cUseCase.GetLocationUseCase,
};
