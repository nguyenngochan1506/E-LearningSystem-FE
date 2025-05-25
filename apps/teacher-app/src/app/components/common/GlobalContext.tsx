import { createContext, useContext, useEffect, useState } from 'react';
import { LanguageType } from '../../types/LanguageType';

import { UserType } from '../../types/UserType'; 
export interface GlobalType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  user: UserType | null;
  setUser: (user: UserType) => void;
}

export const GlobalContext = createContext<GlobalType | undefined>(undefined);
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<LanguageType>('vi');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as LanguageType;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
    const storedIsLogin = localStorage.getItem('accessToken');
    if (storedIsLogin) {
      setIsLogin(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        console.log('Stored user data found:', storedUser);
        
        try {
          setUser(JSON.parse(storedUser) as UserType);
        } catch (error) {
          console.error('Failed to parse user data from localStorage', error);
          setUser(null);
        }
      }
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        language,
        setLanguage,
        isLogin,
        setIsLogin,
        user,
        setUser
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
