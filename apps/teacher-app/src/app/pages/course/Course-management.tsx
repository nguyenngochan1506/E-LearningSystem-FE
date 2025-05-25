import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Pencil, Trash, Plus, MagnifyingGlass  } from 'phosphor-react';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';
import { Course } from './types';

const CourseManagement = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Lập trình ReactJS cơ bản',
        description: 'Khóa học lập trình ReactJS từ cơ bản đến nâng cao',
        image: 'https://via.placeholder.com/300x200',
        price: 500000,
        category: 'Lập trình',
        teacherId: 1,
        lessons: [],
        createdAt: '2025-01-15',
        studentCount: 45,
        rating: 4.8
      },
      // Add more mock courses as needed
    ];

    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      setCourses(courses.filter(course => course.id !== id));
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen size={28} className="text-blue-600" />
          {translate('COURSE_MANAGEMENT') || 'Quản lý khóa học'}
        </h1>
        
        <div className="flex gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass  className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder={translate('SEARCH_COURSES') || 'Tìm kiếm khóa học...'}
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Link
            to="/course/create_course"
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            {translate('CREATE_COURSE') || 'Tạo khóa học mới'}
          </Link>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {translate('NO_COURSES_FOUND') || 'Không tìm thấy khóa học nào'}
          </h3>
          <p className="text-gray-500">
            {translate('TRY_DIFFERENT_SEARCH') || 'Hãy thử tìm kiếm với từ khóa khác hoặc tạo khóa học mới'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>{translate('COURSE_NAME') || 'Tên khóa học'}</th>
                <th>{translate('CATEGORY') || 'Danh mục'}</th>
                <th>{translate('PRICE') || 'Giá'}</th>
                <th>{translate('CREATED_AT') || 'Ngày tạo'}</th>
                <th>{translate('STUDENTS') || 'Học viên'}</th>
                <th>{translate('ACTIONS') || 'Thao tác'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={course.image?.toString() || 'https://via.placeholder.com/50'} alt={course.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{course.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{course.description}</div>
                      </div>
                    </div>
                  </td>
                  <td>{course.category}</td>
                  <td>
                    {course.price > 0 
                      ? `${course.price.toLocaleString()} VND` 
                      : translate('FREE') || 'Miễn phí'}
                  </td>
                  <td>{new Date(course.createdAt || '').toLocaleDateString()}</td>
                  <td>{course.studentCount || 0}</td>
                  <td>
                    <div className="flex space-x-2">
                      <Link
                        to={`/course/edit/${course.id}`}
                        className="btn btn-ghost btn-xs"
                        title={translate('EDIT') || 'Chỉnh sửa'}
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(course.id || '')}
                        className="btn btn-ghost btn-xs text-error"
                        title={translate('DELETE') || 'Xóa'}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;