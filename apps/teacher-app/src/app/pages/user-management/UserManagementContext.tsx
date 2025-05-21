import { createContext, useContext, useState } from 'react';
export interface UserManagementContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isOpenAddUserModal: boolean;
  setIsOpenAddUserModal: (isOpen: boolean) => void;
  isOpenEditUserModal: boolean;
  setIsOpenEditUserModal: (isOpen: boolean) => void;
}

export const UserManagementContext = createContext<
  UserManagementContextType | undefined
>(undefined);
export const UserManagementContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);

  return (
    <UserManagementContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isOpenAddUserModal,
        setIsOpenAddUserModal,
        isOpenEditUserModal,
        setIsOpenEditUserModal,
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagementContext = () => {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error('not exist context');
  }
  return context;
};
