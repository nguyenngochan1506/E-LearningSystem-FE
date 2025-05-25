import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FileText, Clock, CheckCircle, Plus , ArrowLeft } from 'phosphor-react';
import { useGlobalContext } from '../../components/common/GlobalContext';
import { translate } from '../../components/common/translate/translate';
interface Assignment {
  id: string;
  title: string;
  type: 'quiz' | 'essay';
  deadline: string;
  totalSubmissions: number;
  gradedSubmissions: number;
}

const AssignmentList = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data - trong thực tế sẽ fetch từ API
  useEffect(() => {
    const mockAssignments: Assignment[] = [
      {
        id: '1',
        title: 'Bài kiểm tra giữa kỳ',
        type: 'quiz',
        deadline: '2025-06-15T23:59:00',
        totalSubmissions: 25,
        gradedSubmissions: 25
      },
      {
        id: '2',
        title: 'Bài luận cuối kỳ',
        type: 'essay',
        deadline: '2025-06-30T23:59:00',
        totalSubmissions: 20,
        gradedSubmissions: 12
      },
      {
        id: '3',
        title: 'Bài tập tuần 5',
        type: 'essay',
        deadline: '2025-05-20T23:59:00',
        totalSubmissions: 22,
        gradedSubmissions: 22
      }
    ];

    setTimeout(() => {
      setAssignments(mockAssignments);
      setCourseTitle('Lập trình ReactJS cơ bản');
      setLoading(false);
    }, 800);
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-ghost mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {courseTitle}
        </h1>
        <div className="ml-auto">
        <Link
          to={`/courses/${courseId}/assignments/create`}
          className="btn btn-primary"
        >
          <Plus size={16} className="mr-2" />
          {translate('CREATE_ASSIGNMENT') || 'Tạo bài tập mới'}
        </Link>
      </div>
      </div>
  

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>{translate('ASSIGNMENT') || 'Bài kiểm tra'}</th>
              <th>{translate('TYPE') || 'Loại'}</th>
              <th>{translate('DEADLINE') || 'Hạn nộp'}</th>
              <th>{translate('SUBMISSIONS') || 'Bài nộp'}</th>
              <th>{translate('STATUS') || 'Trạng thái'}</th>
              <th>{translate('ACTION') || 'Thao tác'}</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-gray-50">
                <td>{assignment.title}</td>
                <td>
                  <span className={`badge ${assignment.type === 'quiz' ? 'badge-info' : 'badge-warning'}`}>
                    {assignment.type === 'quiz' 
                      ? translate('QUIZ') || 'Trắc nghiệm' 
                      : translate('ESSAY') || 'Tự luận'}
                  </span>
                </td>
                <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                <td>
                  {assignment.gradedSubmissions}/{assignment.totalSubmissions}
                </td>
                <td>
                  {assignment.gradedSubmissions === assignment.totalSubmissions ? (
                    <span className="badge badge-success">
                      {translate('COMPLETED') || 'Đã chấm xong'}
                    </span>
                  ) : (
                    <span className="badge badge-error">
                      {translate('PENDING') || 'Cần chấm'}
                    </span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/grading/course/${courseId}/assignment/${assignment.id}`)}
                  >
                    {translate('GRADE') || 'Chấm điểm'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {translate('NO_ASSIGNMENTS') || 'Không có bài kiểm tra nào'}
          </h3>
        </div>
      )}
    </div>
  );
};

export default AssignmentList;