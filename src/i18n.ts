import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Z1Bingo: "Zelda1 Bingo Card",
      resetSeed: "Reset Seed",
    },
  },
  ja: {
    translation: {
      Z1Bingo: "ゼルダの伝説1 ビンゴ カード",
      resetSeed: "Reset Seed",
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
