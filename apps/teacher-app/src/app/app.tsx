import { Route, Routes, Outlet } from 'react-router-dom';
import Login from './pages/login/Login';
import ForgotPassword from './pages/login/ForgotPassword';
import DashBoardLayout from './components/layout/DashBoardLayout';
import DashBoard from './pages/dashboard/DashBoard';
import UserManagement from './pages/user-management/UserManagement';
import CreateCourse from './pages/course/create_course';

import CourseForm from './pages/course/CourseForm';
import GradeAssignment from './pages/grade-assignment/GradeAssignment';
import ResetPassword from './pages/login/ResetPassword';
import RoleManagement from './pages/roles-management/RoleManagement';
import PermissionManagement from './pages/permisson-management/PermissionManagement';
import PermissionRoot from './pages/permisson-management/PermissionRoot';
export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<DashBoardLayout children={<Outlet />} />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/course/create_course" element={<CreateCourse />} />
        <Route path="/course/form/:courseId" element={<CourseForm />} />
        <Route
          path="dashboard/grading/:assignmentId"
          element={<GradeAssignment />}
        />
         <Route path='/auth' element={<RoleManagement/>} />
        <Route path="/permissions" element={<PermissionRoot/>} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />

    </Routes>
  );
}
export async function createCourseAPI(course: any) {
  console.log('Mock creating course:', course);
  return { success: true, data: course };
}
export default App;
