'use client';
import { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import { LessonForm } from './LessonForm';
import { Course, Lesson } from './types';
import { createCourseAPI } from './api';

export default function CreateCoursePage() {
  const [course, setCourse] = useState<Course>({
    title: '',
    description: '',
    image: null,
    price: 0,
    category: '',
    teacherId: 1,
    lessons: [],
  });
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCourseChange = (updatedCourse: Course) => {
    setCourse(updatedCourse);
  };

  const handleAddLesson = (lesson: Lesson) => {
    setLessons((prev) => [...prev, lesson]);
    setShowLessonForm(false);
  };

  const handleBackFromLesson = () => {
    if (showLessonForm) {
      const confirmBack = window.confirm('⚠️ Thông tin bài học chưa được lưu, bạn có chắc muốn quay lại?');
      if (confirmBack) {
        setShowLessonForm(false);
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (course.title || lessons.length > 0) {
        e.preventDefault();
        e.returnValue = 'Bạn có chắc muốn rời đi? Thông tin khóa học chưa được lưu sẽ bị mất.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [course, lessons]);

  const handleSubmitCourse = async () => {
    if (!course.title) {
      alert('Vui lòng nhập tên khóa học');
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload image if exists
      let imageUrl = '';
      if (course.image instanceof File) {
        imageUrl = await uploadFile(course.image);
      }

      // Prepare course data
      const courseData = {
        ...course,
        image: imageUrl,
        lessons: lessons.map((lesson) => ({
          ...lesson,
          // Remove file object before sending
          file: undefined,
        })),
      };

      // Submit to API
      const result = await createCourseAPI(courseData);

      if (result.success) {
        alert('✅ Khóa học đã được tạo thành công!');
        // Reset form
        setCourse({
          title: '',
          description: '',
          image: null,
          price: 0,
          category: '',
          teacherId: 1,
          lessons: [],
        });
        setLessons([]);
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('❌ Có lỗi xảy ra khi tạo khóa học');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white shadow-2xl rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800">Tạo Khóa Học Mới</h1>

      {!showLessonForm ? (
        <>
          <CourseForm
            course={{ ...course, lessons }}
            onCourseChange={handleCourseChange}
            onAddLessonClick={() => setShowLessonForm(true)}
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={handleSubmitCourse}
              disabled={isSubmitting || !course.title}
              className={`px-6 py-3 rounded-lg font-medium shadow-md transition-all ${
                isSubmitting || !course.title
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isSubmitting ? 'Đang tạo khóa học...' : 'Tạo Khóa Học'}
            </button>
          </div>
        </>
      ) : (
        <LessonForm onBack={handleBackFromLesson} onSubmit={handleAddLesson} />
      )}
    </div>
  );
}

// export const uploadFile = async (file: File): Promise<string> => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await fetch('/api/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Upload failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     if (!data.url) {
//       throw new Error('No URL returned from server');
//     }

//     return data.url;
//   } catch (error) {
//     console.error('Upload error:', error);
//     throw new Error('Không thể tải lên tệp. Vui lòng thử lại.');
//   }
// };
export const uploadFile = async (file: File): Promise<string> => {
  console.log('Uploading file:', file.name);
  return 'https://example.com/mock-uploaded-file.jpg';
};