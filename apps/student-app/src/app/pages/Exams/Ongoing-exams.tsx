
import { Clock,Exam, Users, Calendar, Hourglass, ArrowRight } from 'phosphor-react';

export default function OngoingExams() {
  const ongoingExams = [
    {
      id: 1,
      title: "Kiểm tra tiến độ - Lập trình Web",
      course: "Lập trình Web Fullstack",
      duration: "60 phút",
      startTime: "14:00 25/05/2024",
      endTime: "15:00 25/05/2024",
      participants: 45,
      remainingTime: "32 phút",
      status: "in_progress" // "upcoming" | "in_progress"
    },
    {
      id: 2,
      title: "Bài test JavaScript nâng cao",
      course: "JavaScript Chuyên sâu",
      duration: "45 phút",
      startTime: "09:00 28/05/2024",
      endTime: "09:45 28/05/2024",
      participants: 32,
      remainingTime: "2 ngày 18 giờ",
      status: "upcoming"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-11 w-11" />
          <h1 className="text-4xl font-bold text-gray-900 text-center">Bài kiểm tra đang diễn ra</h1>
        </div>
        <p className="text-gray-600 mt-2 text-center">
          Danh sách các bài kiểm tra bạn đang tham gia
        </p>
      </div>

      <div className="space-y-6">
        {ongoingExams.map((exam) => (
          <div 
            key={exam.id} 
            className={`bg-white rounded-xl shadow-sm border ${exam.status === 'in_progress' ? 'border-indigo-300' : 'border-gray-200'} overflow-hidden hover:shadow-md transition`}
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{exam.title}</h2>
                    {exam.status === 'in_progress' && (
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                        Đang diễn ra
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">Môn học: {exam.course}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock size={16} className="text-gray-500" />
                      <span>{exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={16} className="text-gray-500" />
                      <span>{exam.startTime} - {exam.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users size={16} className="text-gray-500" />
                      <span>{exam.participants} thí sinh</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <div className={`flex items-center gap-2 ${exam.status === 'in_progress' ? 'text-red-600' : 'text-gray-700'}`}>
                    <Hourglass size={20} />
                    <span className="font-medium">{exam.remainingTime}</span>
                  </div>
                  
                  <a 
                    href={`/exams/${exam.id}`}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${exam.status === 'in_progress' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-colors`}
                  >
                    {exam.status === 'in_progress' ? 'Vào làm bài' : 'Xem chi tiết'}
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}