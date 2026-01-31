export const handleApiError = (error) => {
  if (error?.code) {
    const statusCode = error.code;

    if (statusCode === -1404) {
      // if (statusCode === -201) {
      return true;
    }
    console.error("API zmp-sdk Error:", error);
  }
  return false;
};
