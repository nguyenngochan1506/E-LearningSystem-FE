import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/layout/Header';
import Login from './pages/login/Login';
import Quiz from './pages/quiz/Quiz';
import CourseDetail from './pages/Course/Course-detail';

export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz/:assignmentId" element={<Quiz />} />
       <Route path="/course/demo" element={<CourseDetail />} />
      </Routes>
    </div>
  );
}

export default App;
