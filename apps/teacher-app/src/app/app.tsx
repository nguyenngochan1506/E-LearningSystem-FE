import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import DashBoard from './pages/dashboard/DashBoard';
import DashBoardLayout from './components/layout/DashBoardLayout';
import UserManagement from './pages/user-management/UserManagement';
import GradeAssignment from './pages/grade-assignment/GradeAssignment';
export function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <DashBoardLayout>
              <DashBoard />
            </DashBoardLayout>
          }
        />
        <Route
          path="/users"
          element={
            <DashBoardLayout>
              <UserManagement />
            </DashBoardLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
