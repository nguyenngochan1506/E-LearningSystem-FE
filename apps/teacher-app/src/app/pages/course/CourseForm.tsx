import { useState, useEffect } from 'react';
import { Plus } from 'phosphor-react';
import { Course, Lesson } from './types';

interface CourseFormProps {
  course: Course;
  onCourseChange: (course: Course) => void;
  onAddLessonClick: () => void;
}

export default function CourseForm({
  course,
  onCourseChange,
  onAddLessonClick,
}: CourseFormProps) {
  const [localCourse, setLocalCourse] = useState(course);

  useEffect(() => {
    onCourseChange(localCourse);
  }, [localCourse]);

  const handleChange = (field: keyof Course, value: any) => {
    setLocalCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCourseChange(localCourse);
    console.log('Submit course data:', localCourse);
    alert('✅ Đã lưu thông tin khóa học (tạm thời)');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Tạo khóa học mới</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tên khóa học"
          value={localCourse.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Mô tả"
          value={localCourse.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Link ảnh (URL)"
          value={localCourse.image}
          onChange={(e) => handleChange('image', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Giá (VND)"
          value={localCourse.price}
          onChange={(e) => handleChange('price', parseFloat(e.target.value))}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Danh mục"
          value={localCourse.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition"
        >
          Lưu khóa học
        </button>
      </form>

      <button
        onClick={onAddLessonClick}
        className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow transition flex items-center justify-center gap-2"
      >
        <Plus /> Thêm bài học
      </button>

      {localCourse.lessons.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Bài học đã thêm:</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {localCourse.lessons.map((lesson, idx) => (
              <li key={idx}>{lesson.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
