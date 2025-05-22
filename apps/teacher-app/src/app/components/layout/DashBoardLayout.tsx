import Header from './Header';
import Footer from './Footer';

const actions = [
  {
    iconSrc: '/icons/icon_book.png',
    title: 'Tạo khóa học',
    description: 'Bắt đầu một khóa học mới.',
    href: '/dashboard/create-course',
    bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
  },
  {
    iconSrc: '/icons/icon_edit.png',
    title: 'Quản lý khóa học',
    description: 'Chỉnh sửa nội dung khóa học.',
    href: '/dashboard/my-courses',
    bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
  },
  {
    iconSrc: '/icons/fileText.png',
    title: 'Giao bài tập',
    description: 'Tạo bài tập cho học viên.',
    href: '/dashboard/assignments',
    bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
  },
  {
    iconSrc: '/icons/clipboardCheck.png',
    title: 'Chấm điểm',
    description: 'Xem bài nộp và chấm điểm.',
    href: '/dashboard/grading',
    bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
  },
];

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 px-6 py-8">
        <div className="w-3/4 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {actions.map((action, index) => (
              <div
                key={index}
                onClick={() => (window.location.href = action.href)}
                className={`cursor-pointer ${action.bgColor} rounded-2xl p-6 h-[240px] w-full flex flex-col justify-between shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white shadow mb-4">
                    <img src={action.iconSrc} alt={action.title} className="w-14 h-14 object-contain" />
                  </div>
                  <h2 className="text-4xl font-semibold text-gray-800 text-center">{action.title}</h2>
                  <p className="text-base text-gray-600 text-center">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
