import { Navigate, Outlet } from 'react-router-dom';
import { useGlobalContext } from '../components/common/GlobalContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { isLogin, user } = useGlobalContext();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    (!user?.roles || !user.roles.some((role) => allowedRoles.includes(role)))
  ) {
    return <Navigate to="/403" replace />;
  }

  return <div>{children}</div>;
};
