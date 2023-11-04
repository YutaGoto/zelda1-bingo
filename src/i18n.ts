import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Z1Bingo: "Zelda1 Bingo Sheet",
      requiredSeed: "Seed is required",
      updateSeed: "Update Seed",
      resetSeed: "Reset Seed",
      language: "Language",
      contact: "Contact",
    },
  },
  ja: {
    translation: {
      Z1Bingo: "ゼルダの伝説1 ビンゴ シート",
      requiredSeed: "Seedを入力してください",
      updateSeed: "Seedを更新する",
      resetSeed: "Seedをリセット",
      language: "Language",
      contact: "各種リンク",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja",
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
