import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';
import { LessonForm } from './LessonForm';
import { Course, Lesson } from './types';
import { getCourseById, updateCourseAPI } from './api';

const EditCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course>({
    id: '',
    title: '',
    description: '',
    image: null,
    price: 0,
    category: '',
    teacherId: 1,
    lessons: [],
  });
  const [loading, setLoading] = useState(true);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLessonIndex, setEditingLessonIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Replace with actual API call
        const response = await getCourseById(courseId || '');
        if (response.success) {
          setCourse(response.data);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        alert('Không thể tải thông tin khóa học');
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  const handleCourseChange = (updatedCourse: Course) => {
    setCourse(updatedCourse);
  };

  const handleAddLesson = (lesson: Lesson) => {
    if (editingLessonIndex !== null) {
      // Update existing lesson
      const updatedLessons = [...course.lessons];
      updatedLessons[editingLessonIndex] = lesson;
      setCourse({ ...course, lessons: updatedLessons });
    } else {
      // Add new lesson
      setCourse({ ...course, lessons: [...course.lessons, lesson] });
    }
    setShowLessonForm(false);
    setEditingLessonIndex(null);
  };

  const handleEditLesson = (index: number) => {
    setEditingLessonIndex(index);
    setShowLessonForm(true);
  };

  const handleDeleteLesson = (index: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài học này?')) {
      const updatedLessons = [...course.lessons];
      updatedLessons.splice(index, 1);
      setCourse({ ...course, lessons: updatedLessons });
    }
  };

  const handleBackFromLesson = () => {
    if (showLessonForm) {
      const confirmBack = window.confirm('⚠️ Thông tin bài học chưa được lưu, bạn có chắc muốn quay lại?');
      if (confirmBack) {
        setShowLessonForm(false);
        setEditingLessonIndex(null);
      }
    }
  };

  const handleSubmitCourse = async () => {
    if (!course.title) {
      alert('Vui lòng nhập tên khóa học');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateCourseAPI(course);
      if (result.success) {
        alert('✅ Khóa học đã được cập nhật thành công!');
        navigate('/courses');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('❌ Có lỗi xảy ra khi cập nhật khóa học');
    } finally {
      setIsSubmitting(false);
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
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white shadow-2xl rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800">Chỉnh sửa Khóa học</h1>

      {!showLessonForm ? (
        <>
          <CourseForm
            course={course}
            onCourseChange={handleCourseChange}
            onAddLessonClick={() => setShowLessonForm(true)}
            onEditLesson={handleEditLesson}
            onDeleteLesson={handleDeleteLesson}
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => navigate('/courses')}
              className="btn btn-outline"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSubmitCourse}
              disabled={isSubmitting}
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
            >
              {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </>
      ) : (
        <LessonForm 
          onBack={handleBackFromLesson} 
          onSubmit={handleAddLesson}
          initialLesson={editingLessonIndex !== null ? course.lessons[editingLessonIndex] : undefined}
        />
      )}
    </div>
  );
};

export default EditCoursePage;