import * as header from './header.translate';
import * as login from './login.translate';

const Translations: Record<string, Record<string, string>> = {
  ...header.default,
  ...login.default,
};

export const translate = (key: string) => {
  const language = localStorage.getItem('language') || 'vi';

  return Translations[key]?.[language] || key;
};
