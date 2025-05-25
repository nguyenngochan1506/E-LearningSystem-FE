import { BookOpen, FileText, List, User } from 'phosphor-react';

const CourseDetail = () => {
  const mockCourse = {
    title: 'Lập trình React cho người mới bắt đầu',
    description:
      'Khóa học giúp bạn làm quen với ReactJS, JSX, component, state và props thông qua các ví dụ thực tế.',
    teacher: 'Nguyễn Văn A',
    category: 'Frontend',
    price: 500000,
    image:
      'https://placehold.co/600x300/png?text=Course+Banner',
    lessons: [
      { title: 'Giới thiệu React' },
      { title: 'Cài đặt môi trường' },
      { title: 'Component và Props' },
      { title: 'State và sự kiện' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-8 border border-gray-200">
      <img
        src={mockCourse.image}
        alt="Course thumbnail"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 mb-2">
        <BookOpen /> {mockCourse.title}
      </h1>

      <p className="text-gray-600 mb-4">{mockCourse.description}</p>

      <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <User className="text-indigo-500" size={18} />
          Giảng viên: {mockCourse.teacher}
        </div>
        <div className="flex items-center gap-2">
          <List className="text-indigo-500" size={18} />
          Danh mục: {mockCourse.category}
        </div>
        <div className="flex items-center gap-2">
          <FileText className="text-indigo-500" size={18} />
          {mockCourse.lessons.length} bài học
        </div>
      </div>

      <div className="text-2xl font-bold text-green-600 mb-6">
        {mockCourse.price.toLocaleString()} VND
      </div>

      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition text-lg font-semibold w-full">
        Đăng ký học ngay
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">📚 Nội dung khóa học</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {mockCourse.lessons.map((lesson, index) => (
            <li key={index}>{lesson.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetail;
