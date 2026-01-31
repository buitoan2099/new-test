declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare interface Window {
  ZaloJavaScriptInterface?: {
    getStatusBarHeight: () => number;
  };
}

declare interface Window {
  APP_ID?: string;
  BASE_PATH?: string;
  APP_CONFIG: any;
}
