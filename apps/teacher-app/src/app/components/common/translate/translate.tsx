import * as header from './header.translate';
import * as login from './login.translate';
import * as dashboard from './dashboard.translate';
import * as userManagement from './user-management.translate';

const Translations: Record<string, Record<string, string>> = {
  ...header.default,
  ...login.default,
  ...userManagement.default,
  ...dashboard.default,
};

export const translate = (key: string) => {
  const language = localStorage.getItem('language') || 'vi';

  return Translations[key]?.[language] || key;
};
