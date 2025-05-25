import { createContext, useContext, useEffect, useState } from 'react';
import { LanguageType } from '../../types/LanguageType';

export interface GlobalType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const GlobalContext = createContext<GlobalType | undefined>(undefined);
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<LanguageType>('vi');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as LanguageType;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
    const storedIsLogin = localStorage.getItem('accessToken');
    if (storedIsLogin) {
      setIsLogin(storedIsLogin === 'true');
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        language,
        setLanguage,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('not exist context');
  }

  const changeLanguage = (language: LanguageType) => {
    localStorage.setItem('language', language);
    context.setLanguage(language);
  };

  return { ...context, changeLanguage };
};
