import { Route, Routes, Outlet } from 'react-router-dom';
import Login from './pages/login/Login';
import ForgotPassword from './pages/login/ForgotPassword';
import ResetPassword from './pages/login/ResetPassword';
import DashBoardLayout from './components/layout/DashBoardLayout';
import DashBoard from './pages/dashboard/DashBoard';
import UserManagement from './pages/user-management/UserManagement';
import CreateCourse from './pages/course/create_course';
// import CourseForm from './pages/course/CourseForm'; // Nếu cần dùng, hãy bỏ comment
import RoleManagement from './pages/roles-management/RoleManagement';
import PermissionRoot from './pages/permisson-management/PermissionRoot';
// Các component grading
import CourseGradingList from './pages/grading/Course-grading-list';
import AssignmentList from './pages/grading/Assingnment-list';
import SubmissionGrading from './pages/grading/Submission-grading';
import GradeAssignment from './pages/grade-assignment/GradeAssignment';

import CourseAssignmentList from './pages/assignment/Assignment-list';
import AssignmentCreate from './pages/assignment/Assignment-create';
import AssignmentEdit from './pages/assignment/Assignment-edit';
export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<DashBoardLayout><Outlet /></DashBoardLayout>}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/course/create_course" element={<CreateCourse />} />
        {/* <Route path="/course/form/:courseId" element={<CourseForm />} /> */}
        <Route path="/grading" element={<CourseGradingList />} />
        <Route path="/grading/course/:courseId" element={<AssignmentList />} />
        {/* <Route path="/grading/course/:courseId" element={<GradeAssignment />} /> */}

        <Route path="/grading/course/:courseId/assignment/:assignmentId" element={<SubmissionGrading />} />
        <Route path="/auth" element={<RoleManagement />} />
        <Route path="/permissions" element={<PermissionRoot />} />
        <Route path="/courses/:courseId/assignments" element={<CourseAssignmentList />} />
        <Route path="/courses/:courseId/assignments/create" element={<AssignmentCreate />} />
        <Route path="/courses/:courseId/assignments/:assignmentId/edit" element={<AssignmentEdit />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;