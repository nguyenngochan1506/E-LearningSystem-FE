import { Route, Routes, Outlet } from 'react-router-dom';
import Login from './pages/login/Login';
import ForgotPassword from './pages/login/ForgotPassword';
import ResetPassword from './pages/login/ResetPassword';
import DashBoardLayout from './components/layout/DashBoardLayout';
import DashBoard from './pages/dashboard/DashBoard';
import UserManagement from './pages/user-management/UserManagement';
import CreateCourse from './pages/course/create_course';

import CourseForm from './pages/course/CourseForm';
import RoleRoot from './pages/roles-management/RoleRoot';
// import CourseForm from './pages/course/CourseForm'; // Nếu cần dùng, hãy bỏ comment
import PermissionRoot from './pages/permisson-management/PermissionRoot';
// Các component grading
import CourseGradingList from './pages/grading/Course-grading-list';
import AssignmentList from './pages/grading/Assingnment-list';
import SubmissionGrading from './pages/grading/Submission-grading';
import { ProtectedRoute } from './routers/ProtectedRoute';
export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        element={
          <DashBoardLayout>
            <Outlet />
          </DashBoardLayout>
        }
      >
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['admin', 'teacher']}>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/create_course"
          element={
            <ProtectedRoute allowedRoles={['admin', 'teacher']}>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/form/:courseId"
          element={
            <ProtectedRoute allowedRoles={['admin', 'teacher']}>
              <CourseForm />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/auth"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <RoleRoot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/permissions"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PermissionRoot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grading"
          element={
            <ProtectedRoute allowedRoles={['admin', 'teacher']}>
              <CourseGradingList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grading/course/:courseId"
          element={
            <ProtectedRoute allowedRoles={['admin', 'teacher']}>
              <AssignmentList />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/grading/course/:courseId/assignment/:assignmentId"
        element={
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <SubmissionGrading />
          </ProtectedRoute>
        }
      />

      <Route path="/403" element={<div>403 Forbidden</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
