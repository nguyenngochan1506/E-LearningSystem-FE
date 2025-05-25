import { createContext, useContext, useState } from 'react';
import { Role } from './RoleManagement';
export interface RoleManagementContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isOpenAddRoleModal: boolean;
  setIsOpenAddRoleModal: (isOpen: boolean) => void;
  isOpenEditRoleModal: boolean;
  setIsOpenEditRoleModal: (isOpen: boolean) => void;
  roles: Role[];
  setRoles: (roles: Role[]) => void;
}

export const RoleManagementContext = createContext<
  RoleManagementContextType | undefined
>(undefined);
export const RoleManagementContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAddRoleModal, setIsOpenAddRoleModal] = useState(false);
  const [isOpenEditRoleModal, setIsOpenEditRoleModal] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);

  return (
    <RoleManagementContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isOpenAddRoleModal,
        setIsOpenAddRoleModal,
        isOpenEditRoleModal,
        setIsOpenEditRoleModal,
        roles,
        setRoles,
      }}
    >
      {children}
    </RoleManagementContext.Provider>
  );
};

export const useRoleManagementContext = () => {
  const context = useContext(RoleManagementContext);
  if (!context) {
    throw new Error('not exist context');
  }
  return context;
};
