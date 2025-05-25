import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, FileText } from 'phosphor-react';
import { useGlobalContext } from '../../components/common/GlobalContext';
import { translate } from '../../components/common/translate/translate';

interface Course {
  id: string;
  title: string;
  image: string;
  pendingAssignments: number;
  totalAssignments: number;
}

const CourseGradingList = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - trong thực tế sẽ fetch từ API
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Lập trình ReactJS cơ bản',
        image: 'https://via.placeholder.com/300x200',
        pendingAssignments: 3,
        totalAssignments: 5
      },
      {
        id: '2',
        title: 'Thiết kế UI/UX với Figma',
        image: 'https://via.placeholder.com/300x200',
        pendingAssignments: 0,
        totalAssignments: 2
      },
      {
        id: '3',
        title: 'Node.js Backend Development',
        image: 'https://via.placeholder.com/300x200',
        pendingAssignments: 5,
        totalAssignments: 5
      }
    ];

    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <FileText size={28} className="text-blue-600" />
        {translate('GRADING_DASHBOARD') || 'Chấm điểm bài kiểm tra'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="card bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/grading/course/${course.id}`)}
          >
            <figure className="relative h-48">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 badge badge-primary">
                {course.pendingAssignments > 0 ? (
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {course.pendingAssignments}/{course.totalAssignments} {translate('PENDING')}
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CheckCircle size={16} />
                    {translate('COMPLETED')}
                  </span>
                )}
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course.title}</h2>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-primary">
                  {translate('VIEW_ASSIGNMENTS') || 'Xem bài kiểm tra'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {translate('NO_COURSES_TO_GRADE') || 'Không có khóa học nào cần chấm điểm'}
          </h3>
        </div>
      )}
    </div>
  );
};

export default CourseGradingList;