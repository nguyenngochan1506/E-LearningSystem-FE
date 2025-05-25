// pages/exams/results.tsx
import { CheckCircle, ChartBar, Clock, Calendar } from 'phosphor-react';

export default function ExamResults() {
  const completedExams = [
    {
      id: 1,
      title: "Bài kiểm tra tiến độ - HTML/CSS",
      course: "Lập trình Web Frontend",
      date: "15/05/2024",
      score: 8.5,
      maxScore: 10,
      correctAnswers: 17,
      totalQuestions: 20,
      timeSpent: "42 phút",
      timeLimit: "60 phút",
      rank: 5,
      totalParticipants: 50,
      passed: true
    },
    {
      id: 2,
      title: "Bài test JavaScript cơ bản",
      course: "JavaScript Căn bản",
      date: "10/05/2024",
      score: 7.2,
      maxScore: 10,
      correctAnswers: 14,
      totalQuestions: 20,
      timeSpent: "35 phút",
      timeLimit: "45 phút",
      rank: 12,
      totalParticipants: 45,
      passed: true
    },
    {
      id: 3,
      title: "Kiểm tra ReactJS",
      course: "ReactJS Nâng cao",
      date: "05/05/2024",
      score: 5.8,
      maxScore: 10,
      correctAnswers: 11,
      totalQuestions: 20,
      timeSpent: "50 phút",
      timeLimit: "60 phút",
      rank: 28,
      totalParticipants: 30,
      passed: false
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-11 w-11" />
          <h1 className="text-4xl font-bold text-gray-900 text-center">
          Kết quả bài kiểm tra
          </h1>
        </div>
        <p className="text-gray-600 mt-2 text-center">
         Danh sách các bài kiểm tra bạn đã hoàn thành và kết quả chi tiết
        </p>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedExams.map((exam) => (
          <div 
            key={exam.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 line-clamp-2">{exam.title}</h2>
                {exam.passed ? (
                  <CheckCircle size={24} className="text-green-500" weight="fill" />
                ) : (
                  <CheckCircle size={24} className="text-red-500" />
                )}
              </div>
              
              <p className="text-gray-600 mb-4">Môn học: {exam.course}</p>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Điểm số:</span>
                  <span className={`text-lg font-bold ${exam.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {exam.score}/{exam.maxScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${exam.passed ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${(exam.score / exam.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    Thời gian làm bài:
                  </span>
                  <span>{exam.timeSpent} / {exam.timeLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <ChartBar size={16} className="text-gray-500" />
                    Câu đúng:
                  </span>
                  <span>{exam.correctAnswers}/{exam.totalQuestions}</span>
                </div>
        
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    Ngày làm bài:
                  </span>
                  <span>{exam.date}</span>
                </div>
              </div>
              
              <a 
                href={`/exams/${exam.id}/review`}
                className="mt-6 inline-flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Xem lại bài làm
              </a>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}