'use client';
import { useState } from 'react';
import CourseForm from './CourseForm';
import LessonForm from './LessonForm';
import { LessonList } from './LessonList';
import { Course, Lesson } from './types';

export default function CreateCoursePage() {
  const [course, setCourse] = useState<Course>({
    title: '',
    description: '',
    image: '',
    price: 0,
    category: '',
    teacherId: 1,
    lessons: [],
  });
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showLessonForm, setShowLessonForm] = useState(false);

  const handleCourseChange = (updatedCourse: Course) => {
    setCourse(updatedCourse);
  };

  const handleAddLesson = (lesson: Lesson) => {
    setLessons((prev) => [...prev, lesson]);
    setShowLessonForm(false);
    alert('✅ Đã thêm bài học thành công');
  };

  const handleBackFromLesson = () => {
    const confirmBack = window.confirm('⚠️ Thông tin bài học chưa được lưu, bạn có chắc muốn quay lại?');
    if (confirmBack) {
      setShowLessonForm(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white shadow-2xl rounded-2xl">
      {!showLessonForm && (
        <CourseForm
          course={{ ...course, lessons }}
          onCourseChange={handleCourseChange}
          onAddLessonClick={() => setShowLessonForm(true)}
        />
      )}

      {showLessonForm && (
        <LessonForm
          onBack={handleBackFromLesson}
          onSubmit={handleAddLesson}
        />
      )}
    </div>
  );
}
