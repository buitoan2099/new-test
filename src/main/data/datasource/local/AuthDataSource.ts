import axios from "axios";
import tokeZaloInstance from "zmp-sdk/apis/common/token"; // instance gốc

const MODE = import.meta.env.MODE;

class TokenZaloCustom {
  private tokenZalo = tokeZaloInstance;

  async getTokenObject() {
    const accessToken = await this.tokenZalo.getAccessToken();

    const refreshToken = this.tokenZalo.refreshToken || "";
    return { accessToken, refreshToken };
  }

  async getAccessToken() {
    const token = await this.tokenZalo.getAccessToken();
    return token;
  }

  getRefreshToken() {
    return this.tokenZalo.refreshToken || "";
  }
}

const tokenZaloCustom = new TokenZaloCustom();
export default tokenZaloCustom;

export const createAuthDataSource = () => ({
  // Hàm refresh token
  refreshTokenZalo: async (refresh_token: string) => {
    try {
      let accessToken: string = "";
      let refreshToken: string = "";
      const route = `https://oauth.zaloapp.com/v4/access_token`;

      const body = new URLSearchParams({
        grant_type: "refresh_token",
        app_id: import.meta.env.VITE_APP_ID_REFRESH || "",
        refresh_token: refresh_token,
      });

      const secretKey = import.meta.env.VITE_APP_SECRET;

      const res: any = await axios.post(route, body.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          secret_key: secretKey,
        },
      });
      if (!res?.data?.access_token) {
        throw Error("expired");
      }

      accessToken = res?.data?.access_token || "";
      refreshToken = res?.data?.refresh_token || "";
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  },

  // Hàm lấy token custom
  getTokenZaloCustom: async () => {
    let accessToken: string = "";
    let refreshToken: string = "";
    if (MODE.toLowerCase() === "development") {
      if (!accessToken) {
        accessToken = import.meta.env.VITE_ZALO_APP_TOKEN;
        refreshToken = import.meta.env.VITE_ZALO_APP_TOKEN_REFRESH;
      }
    } else {
      if (!accessToken) {
        const tokenData = await tokenZaloCustom.getTokenObject();
        accessToken = tokenData.accessToken;
        refreshToken = tokenData.refreshToken;
      }
    }

    return { accessToken, refreshToken };
  },
});
