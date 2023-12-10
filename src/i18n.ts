import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Z1Bingo: "Zelda1 Bingo Sheet",
      requiredSeed: "Seed is required",
      updateSeed: "Update Seed",
      copySeed: "Copy input Seed",
      copyCurrentUrl: "Copy Current URL",
      copyNewSeedUrl: "Copy New Seed URL",
      copiedSeed: "Copied input seed",
      copiedCurrentUrl: "Copied Current URL",
      copiedNewSeedUrl: "Copied New Seed URL",
      resetSeed: "Reset Seed",
      language: "Page Language",
      messageLanguage: "Hint Message Language",
      otherCategories: "Other Categories",
      firstQuest: "First Quest",
      secondQuest: "Second Quest",
      swordless: "Swordless",
      randomizer: "Randomizer",
      contact: "Contact",
    },
  },
  ja: {
    translation: {
      Z1Bingo: "ゼルダの伝説1 ビンゴ シート",
      requiredSeed: "Seedを入力してください",
      updateSeed: "Seedを更新する",
      copySeed: "入力したSeedをコピー",
      copyCurrentUrl: "現在のURLをコピー",
      copyNewSeedUrl: "新しいSeedのURLをコピー",
      copiedSeed: "入力したSeedをコピーしました",
      copiedCurrentUrl: "現在のURLをコピーしました",
      copiedNewSeedUrl: "新しいSeedのURLをコピーしました",
      resetSeed: "Seedをリセット",
      language: "Page Language",
      messageLanguage: "Hint Message Language",
      firstQuest: "First Quest",
      secondQuest: "Second Quest",
      swordless: "ソードレス",
      randomizer: "ランダマイザー",
      otherCategories: "その他のカテゴリ",
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
