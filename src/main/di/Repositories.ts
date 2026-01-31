import ZaloRepositoryImpl from "../data/repositories/ZaloRepositoryImpl";

export default () => {
  return {
    ZaloRepositoryImpl: new ZaloRepositoryImpl(),
  };
};
