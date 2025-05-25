import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FileText, ListChecks, Calendar, PenNib , Trash, Plus, MagnifyingGlass  } from 'phosphor-react';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';

interface Assignment {
  id: string;
  title: string;
  type: 'quiz' | 'essay';
  description: string;
  deadline: string;
  createdAt: string;
  submissions: number;
}

const AssignmentList = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockAssignments: Assignment[] = [
      {
        id: '1',
        title: 'Bài luận về React Hooks',
        type: 'essay',
        description: 'Viết bài luận về cách sử dụng React Hooks',
        deadline: '2025-06-30T23:59:00',
        createdAt: '2025-05-15',
        submissions: 15
      },
      {
        id: '2',
        title: 'Bài kiểm tra giữa kỳ',
        type: 'quiz',
        description: 'Kiểm tra kiến thức React cơ bản',
        deadline: '2025-06-15T23:59:00',
        createdAt: '2025-05-10',
        submissions: 20
      },
      {
        id: '3',
        title: 'Bài tập Redux',
        type: 'essay',
        description: 'Triển khai ứng dụng sử dụng Redux',
        deadline: '2025-07-10T23:59:00',
        createdAt: '2025-05-20',
        submissions: 12
      }
    ];

    setTimeout(() => {
      setAssignments(mockAssignments);
      setCourseTitle('Lập trình ReactJS cơ bản');
      setLoading(false);
    }, 800);
  }, [courseId]);

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm(translate('CONFIRM_DELETE_ASSIGNMENT') || 'Bạn có chắc chắn muốn xóa bài tập này?')) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {courseTitle} - {translate('ASSIGNMENTS') || 'Bài tập'}
        </h1>
        <Link
          to={`/courses/${courseId}/assignments/create`}
          className="btn btn-primary"
        >
          <Plus size={16} className="mr-2" />
          {translate('CREATE_ASSIGNMENT') || 'Tạo bài tập mới'}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlass  className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder={translate('SEARCH_ASSIGNMENTS') || 'Tìm kiếm bài tập...'}
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredAssignments.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {translate('NO_ASSIGNMENTS_FOUND') || 'Không tìm thấy bài tập nào'}
          </h3>
          <p className="text-gray-500">
            {translate('TRY_DIFFERENT_SEARCH') || 'Hãy thử tìm kiếm với từ khóa khác hoặc tạo bài tập mới'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="card bg-white shadow-md">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title">
                      {assignment.title}
                      <span className={`badge ml-2 ${assignment.type === 'quiz' ? 'badge-info' : 'badge-warning'}`}>
                        {assignment.type === 'quiz' ? (
                          <ListChecks size={16} className="mr-1" />
                        ) : (
                          <FileText size={16} className="mr-1" />
                        )}
                        {translate(assignment.type.toUpperCase())}
                      </span>
                    </h2>
                    <p className="text-gray-600">{assignment.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                    className="btn btn-circle btn-sm btn-outline"
                    onClick={() => navigate(`/courses/${courseId}/assignments/${assignment.id}/edit`)}>
                        <PenNib size={16} />
                    </button>
                    <button
                      className="btn btn-circle btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(assignment.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="font-medium">{translate('CREATED_AT') || 'Tạo lúc'}:</span>
                    <span>{new Date(assignment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="font-medium">{translate('DEADLINE') || 'Hạn nộp'}:</span>
                    <span>{new Date(assignment.deadline).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-500" />
                    <span className="font-medium">{translate('SUBMISSIONS') || 'Bài nộp'}:</span>
                    <span>{assignment.submissions}</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/grading/course/${courseId}/assignment/${assignment.id}`)}
                  >
                    {translate('VIEW_SUBMISSIONS') || 'Xem bài nộp'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentList;