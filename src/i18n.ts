import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Z1Bingo: "Zelda1 Bingo Sheet",
      Z1ScoreBoard: "Zelda1 Score Board",
      requiredSeed: "Seed is required",
      updateSeed: "Update Seed",
      copySeed: "Copy input Seed",
      copyCurrentUrl: "Copy Current URL",
      copyNewSeedUrl: "Copy New Seed URL",
      copiedSeed: "Copied input seed",
      copiedCurrentUrl: "Copied Current URL",
      copiedNewSeedUrl: "Copied New Seed URL",
      resetSeed: "Reset Seed",
      mode: "Mode",
      bingo: "Bingo",
      bingoCount_one: "{{count}} line Bingo",
      bingoCount_other: "{{count}} lines Bingo",
      score: "Score Attack",
      singleTasking: "Single Tasking",
      currentPoint: "Current Point",
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
      Z1ScoreBoard: "ゼルダの伝説1 スコアボード",
      requiredSeed: "Seedを入力してください",
      updateSeed: "Seedを更新する",
      copySeed: "入力したSeedをコピー",
      copyCurrentUrl: "現在のURLをコピー",
      copyNewSeedUrl: "新しいSeedのURLをコピー",
      copiedSeed: "入力したSeedをコピーしました",
      copiedCurrentUrl: "現在のURLをコピーしました",
      copiedNewSeedUrl: "新しいSeedのURLをコピーしました",
      resetSeed: "Seedをリセット",
      mode: "モード",
      bingo: "ビンゴ",
      bingoCount: "{{count}} ビンゴ",
      score: "スコアアタック",
      singleTasking: "シングルタスキング",
      currentPoint: "現在のポイント",
      language: "Page Language",
      messageLanguage: "Hint Message Language",
      firstQuest: "First Quest",
      secondQuest: "Second Quest",
      swordless: "Swordless",
      randomizer: "Randomizer",
      otherCategories: "その他のカテゴリ",
      contact: "各種リンク",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
