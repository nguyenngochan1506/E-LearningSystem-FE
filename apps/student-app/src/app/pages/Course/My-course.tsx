import { Button } from "../../components/ui/button";
import { 
  BookOpen, 
  Clock, 
  PlayCircle,
  CheckCircle,
  Star,
  ChartLineUp,
  ArrowRight,
  MagnifyingGlass,
  Funnel,
  List,
  GridFour
} from 'phosphor-react';

export default function MyCourses() {
  // Sample data for registered courses
  const registeredCourses = [
    {
      id: 1,
      title: "Lập trình Web Fullstack từ A-Z",
      instructor: "Nguyễn Văn A",
      thumbnail: "/course1.jpg",
      progress: 65,
      lastAccessed: "2 ngày trước",
      totalLessons: 45,
      completedLessons: 29,
      rating: 4.8,
      category: "Phát triển Web",
      duration: "30 giờ",
      certified: true
    },
    {
      id: 2,
      title: "Data Science cơ bản với Python",
      instructor: "Trần Thị B",
      thumbnail: "/course2.jpg",
      progress: 32,
      lastAccessed: "1 tuần trước",
      totalLessons: 36,
      completedLessons: 11,
      rating: 4.6,
      category: "Khoa học Dữ liệu",
      duration: "25 giờ",
      certified: false
    },
    {
      id: 3,
      title: "Thiết kế UI/UX chuyên nghiệp",
      instructor: "Lê Văn C",
      thumbnail: "/course3.jpg",
      progress: 100,
      lastAccessed: "3 tuần trước",
      totalLessons: 28,
      completedLessons: 28,
      rating: 4.9,
      category: "Thiết kế",
      duration: "20 giờ",
      certified: true
    }
  ];

  return (
     <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-11 w-11" />
          <h1 className="text-4xl font-bold text-gray-900 text-center">Khóa học của tôi</h1>
        </div>
        <p className="text-gray-600 mt-2 text-center">
          Tiếp tục học tập và khám phá các khóa học bạn đã đăng ký
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlass size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Tìm kiếm khóa học..."
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
              <option>Sắp xếp theo</option>
              <option>Mới nhất</option>
              <option>Tiến độ cao nhất</option>
              <option>Đánh giá cao nhất</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Funnel size={16} className="text-gray-400" />
            </div>
          </div>
          
          <div className="flex bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
            <button className="p-2 border-r border-gray-300 hover:bg-gray-50">
              <List size={20} />
            </button>
            <button className="p-2 hover:bg-gray-50">
              <GridFour size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {registeredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
            <div className="flex flex-col md:flex-row">
              {/* Course Thumbnail */}
              <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 aspect-video flex items-center justify-center">
                <PlayCircle size={48} className="text-indigo-600 opacity-80" />
              </div>
              
              {/* Course Content */}
              <div className="flex-1 p-6">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-gray-600 mb-3">Giảng viên: {course.instructor}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} weight="fill" className="text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-4 text-sm">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">{course.category}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center gap-1">
                        <Clock size={14} />
                        {course.duration}
                      </span>
                  
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Tiến độ: {course.progress}%</span>
                        <span>{course.completedLessons}/{course.totalLessons} bài học</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`} 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Truy cập lần cuối: {course.lastAccessed}
                    </div>
                    
                    <div className="flex gap-3 w-full sm:w-auto">
                      <Button 
                        className={`flex-1 sm:flex-none ${course.progress === 100 ? "border border-indigo-600 text-indigo-600 bg-white hover:bg-gray-50" : ""}`}
                      >
                        <PlayCircle size={18} className="mr-2" />
                        {course.progress === 100 ? 'Xem lại' : 'Tiếp tục học'}
                      </Button>
                  
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Courses Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Khóa học đã hoàn thành</h2>
          <Button className="text-indigo-600 hover:text-indigo-700">
            Xem tất cả
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredCourses.filter(c => c.progress === 100).map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="bg-gray-100 aspect-video flex items-center justify-center relative">
                <PlayCircle size={48} className="text-indigo-600 opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition">
                  <button className="bg-white rounded-full p-3 shadow-lg">
                    <PlayCircle size={24} className="text-indigo-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={16} weight="fill" className="text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">{course.instructor}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">{course.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                    <CheckCircle size={18} weight="fill" />
                    <span>Hoàn thành</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <span>Truy cập lần cuối: {course.lastAccessed}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Stats */}
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Thống kê học tập</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 rounded-lg p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <BookOpen size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Khóa học đang học</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 rounded-lg p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-full">
                <CheckCircle size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Khóa học đã hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <ChartLineUp size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tổng thời gian học</p>
                <p className="text-2xl font-bold text-gray-900">42 giờ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}