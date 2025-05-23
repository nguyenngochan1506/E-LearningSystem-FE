import { Route, Routes, Outlet } from 'react-router-dom';
import Login from './pages/login/Login';
import ForgotPassword from './pages/login/ForgotPassword';
import DashBoardLayout from './components/layout/DashBoardLayout';
import DashBoard from './pages/dashboard/DashBoard';
import UserManagement from './pages/user-management/UserManagement';
import CreateCourse from './pages/course/create_course';
import CourseForm from './pages/course/CourseForm';
import GradeAssignment from './pages/grade-assignment/GradeAssignment';
export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<DashBoardLayout children={<Outlet />} />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/course/create_course" element={<CreateCourse />} />
        <Route path="/course/form/:courseId" element={<CourseForm />} />
        <Route
          path="dashboard/grading/:assignmentId"
          element={<GradeAssignment />}
        />
      </Route>
    </Routes>
  );
}

export default App;
