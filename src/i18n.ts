import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ja: {
    translation: {
      Welcome: "ようこそ",
      Home: "ダッシュボード",
      Dashboard: "ダッシュボード",
      Bookings: "全ての予約",
      Cabins: "全て客室",
      Settings: "設定",
      CreateNewUser: "新規ユーザー登録",
      Account: {
        UpdateAccount: "アカウントを更新",
        UpdateUserData: "個人情報を更新",
        UpdatePW: "パスワードを更新",
      },
      Language: "言語",
      // Add more translations here
    },
  },
  en: {
    translation: {
      Welcome: "Welcome",
      Home: "Home",
      Dashboard: "Dashboard",
      Bookings: "All bookings",
      Cabins: "All cabins",
      Settings: "Settings",
      CreateNewUser: "User",
      Account: {
        UpdateAccount: "Update your account",
        UpdateUserData: "Update user data",
        UpdatePW: "Update password",
      },
      Language: "Language",
      // Add more translations here
    },
  },
  vi: {
    translation: {
      Welcome: "Chào mừng",
      Home: "Trang chính",
      Dashboard: "Bảng điều khiển",
      Bookings: "Tất cả đơn đặt phòng",
      Cabins: "Tất cả phòng",
      Settings: "Cài đặt",
      CreateNewUser: "Tạo mới người dùng",
      Account: {
        UpdateAccount: "Cập nhập thông tin tài khoản",
        UpdateUserData: "Cập nhập thông tin người dùng",
        UpdatePW: "Đổi mật khẩu",
      },
      Language: "Ngôn ngữ",
      // Add more translations here
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja", // Set Japanese as default
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

  export default i18n;