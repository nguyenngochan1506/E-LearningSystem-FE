import * as header from './header.translate';
import * as home from './home.translate';

const Translations: Record<string, Record<string, string>> = {
  ...header.default,
  ...home.default,
};

export const translate = (key: string) => {
  const language = localStorage.getItem('language') || 'vi';

  return Translations[key]?.[language] || key;
};
