import { PermissionManagementContextProvider } from './PermissionManagementContext';
import PermissionManagement from './PermissionManagement';

const PermissionRoot = () => {
  return (
    <PermissionManagementContextProvider>
      <PermissionManagement />
    </PermissionManagementContextProvider>
  );
};

export default PermissionRoot;
