import { createContext, useContext, useState } from 'react';
import { Permission } from './PermissionManagement';
export interface PermissionManagementContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isOpenAddPermissionModal: boolean;
  setIsOpenAddPermissionModal: (isOpen: boolean) => void;
  isOpenEditPermissionModal: boolean;
  setIsOpenEditPermissionModal: (isOpen: boolean) => void;
  permissions: Permission[];
  setPermissions: (permissions: Permission[]) => void;
  selectedPermission?: Permission;
  setSelectedPermission?: (permission: Permission) => void;
}

export const PermissionManagementContext = createContext<
  PermissionManagementContextType | undefined
>(undefined);
export const PermissionManagementContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAddPermissionModal, setIsOpenAddPermissionModal] = useState(false);
  const [isOpenEditPermissionModal, setIsOpenEditPermissionModal] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<Permission | undefined>(undefined);

  return (
    <PermissionManagementContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isOpenAddPermissionModal,
        setIsOpenAddPermissionModal,
        isOpenEditPermissionModal,
        setIsOpenEditPermissionModal,
        permissions,
        setPermissions,
        selectedPermission,
        setSelectedPermission: (permission: Permission) => {
          setSelectedPermission(permission);
          setIsOpenEditPermissionModal(true);
        },
      }}
    >
      {children}
    </PermissionManagementContext.Provider>
  );
};

export const usePermissionManagementContext = () => {
  const context = useContext(PermissionManagementContext);
  if (!context) {
    throw new Error('not exist context');
  }
  return context;
};
