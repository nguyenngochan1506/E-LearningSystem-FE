export const LanguageCode = {
  vi: 'vi',
  en: 'en',
};
export type LanguageType = keyof typeof LanguageCode;
export const LanguageFlag = {
  [LanguageCode.vi]: './icons/vi-icon.png',
  [LanguageCode.en]: './icons/en-icon.png',
};

export const LanguageList = [
  {
    code: LanguageCode.vi as LanguageType,
    flag: LanguageFlag[LanguageCode.vi],
  },
  {
    code: LanguageCode.en as LanguageType,
    flag: LanguageFlag[LanguageCode.en],
  },
];
