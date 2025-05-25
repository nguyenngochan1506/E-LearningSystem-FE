import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/layout/Header';
import Login from './pages/login/Login';
import Quiz from './pages/quiz/Quiz';
import CourseDetail from './pages/Course/Course-detail';
import OngoingExams from './pages/Exams/Ongoing-exams'; 
import ExamResults from './pages/Exams/Results-exams';

import MyCourses from './pages/Course/My-course';
export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz/:assignmentId" element={<Quiz />} />
        <Route path="/course/demo" element={<CourseDetail />} />
        <Route path="/my-courses" element={<MyCourses />} /> 
        <Route path="/exams/ongoing" element={<OngoingExams />} />
        <Route path="/exams/results" element={<ExamResults />} />

      </Routes>
    </div>
  );
}

export default App;
