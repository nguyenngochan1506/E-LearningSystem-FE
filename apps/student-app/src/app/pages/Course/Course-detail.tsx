import { Button } from "../../components/ui/button"
import { PlayCircle, User, Clock, VideoCamera, ListBullets, Star, Globe, CheckCircle, SignIn, ChalkboardTeacher, Lifebuoy, CreditCard} from 'phosphor-react';

export default function CourseDetail() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Course Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Course Thumbnail */}
            <div className="w-full md:w-1/3 lg:w-2/5 rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
              <PlayCircle size={48} className="text-indigo-600 opacity-80" />
            </div>
            
            {/* Course Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">BESTSELLER</span>
                <span className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">NEW</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Lập trình Web Fullstack từ A-Z
              </h1>
              
              <p className="text-lg text-gray-600 mb-4">
                Học cách xây dựng ứng dụng web hoàn chỉnh bằng HTML, CSS, JS, React và Node.js.
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={18} 
                      weight={star <= 4 ? "fill" : "regular"} 
                      className="text-yellow-400" 
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium text-gray-700">4.8</span>
                  <span className="mx-1 text-gray-400">|</span>
                  <span className="text-sm text-gray-500">(200 đánh giá)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <User size={16} className="mr-1.5 text-gray-500" />
                  <span>Giảng viên: <span className="font-medium">Nguyễn Văn A</span></span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-1.5 text-gray-500" />
                  <span>30 giờ học</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <VideoCamera size={16} className="mr-1.5 text-gray-500" />
                  <span>45 bài giảng</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ListBullets size={16} className="mr-1.5 text-gray-500" />
                  <span>Cấp độ: Trung bình</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left - Course content */}
        <div className="lg:w-2/3 space-y-8">
          {/* Course Highlights */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Những gì bạn sẽ học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-0.5" />
                <span className="text-gray-700">Nắm vững HTML, CSS, JavaScript căn bản và nâng cao</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-0.5" />
                <span className="text-gray-700">Sử dụng React và Node.js để xây dựng SPA</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-0.5" />
                <span className="text-gray-700">Làm việc với MongoDB, Express, và các API REST</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-0.5" />
                <span className="text-gray-700">Deploy ứng dụng lên Vercel và Render</span>
              </div>
            </div>
          </div>

          {/* Course Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Giới thiệu khóa học</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Khóa học này sẽ giúp bạn hiểu rõ toàn bộ quy trình xây dựng ứng dụng web hiện đại, từ thiết kế giao diện
                đến triển khai backend. Bạn sẽ làm quen với nhiều công cụ và thư viện phổ biến trong ngành, đồng thời được thực hành dự án thực tế.
              </p>
              <p className="mb-4">
                Đây là khóa học toàn diện dành cho những ai muốn trở thành lập trình viên Fullstack. Khóa học được thiết kế bài bản từ cơ bản đến nâng cao, phù hợp cho cả người mới bắt đầu và những ai đã có kinh nghiệm muốn hệ thống lại kiến thức.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Tại sao bạn nên học khóa này?</h3>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Học từ giảng viên có hơn 5 năm kinh nghiệm phát triển web</li>
                <li>Dự án thực tế có thể đưa vào portfolio</li>
                <li>Cộng đồng học viên hỗ trợ 24/7</li>
                <li>Cập nhật công nghệ mới nhất</li>
              </ul>
            </div>
          </div>

          {/* Curriculum */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Nội dung khóa học</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((section) => (
                <div key={section} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">Phần {section}: {section === 1 ? 'Nhập môn Web Development' : 
                        section === 2 ? 'Frontend với React' : 
                        section === 3 ? 'Backend với Node.js' : 'Deploy và Bảo trì'}</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div className="divide-y divide-gray-200">
                    {[1, 2, 3].map((lesson) => (
                      <div key={lesson} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <PlayCircle size={20} className="text-gray-400" />
                          <span className="text-gray-700">{lesson}. {section === 1 ? 'Giới thiệu HTML' : 
                            section === 2 ? 'Cài đặt React' : 
                            section === 3 ? 'Giới thiệu Express' : 'Triển khai lên server'}</span>
                        </div>
                        <span className="text-sm text-gray-500">10:45</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Giảng viên</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  <User size={40} className="text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Nguyễn Văn A</h3>
                <p className="text-gray-600 mb-3">Senior Fullstack Developer tại Công ty TechV</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star size={18} weight="fill" className="text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">4.8/5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChalkboardTeacher size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">5 khóa học</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">1,200+ học viên</span>
                  </div>
                </div>
                <p className="text-gray-700">
                  Với hơn 5 năm kinh nghiệm phát triển ứng dụng web, tôi đã làm việc với nhiều công ty công nghệ hàng đầu và tham gia xây dựng các hệ thống lớn. Tôi mong muốn chia sẻ kiến thức và kinh nghiệm thực tế để giúp các bạn trở thành lập trình viên chuyên nghiệp.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Register Box */}
        <div className="lg:w-1/3 space-y-6">
          <div className="sticky top-6 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Video Preview */}
              <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                <button className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={64} className="text-white opacity-90 hover:opacity-100 transition" />
                </button>
                <span className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  2:45
                </span>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-gray-900">499.000đ</span>
                  <span className="text-lg text-gray-500 line-through">1.200.000đ</span>
                  <span className="text-sm font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">58% OFF</span>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full py-3 text-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition">
                    <SignIn size={20} className="mr-2" />
                    Đăng ký ngay
                  </Button>
            
            
                </div>
                
                <div className="text-center text-sm text-gray-500">
                  <p>100% hoàn tiền nếu không hài lòng sau 7 ngày</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <VideoCamera size={20} className="text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">45 bài giảng video</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">30 giờ nội dung</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">Chứng chỉ hoàn thành</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lifebuoy size={20} className="text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">Hỗ trợ 1:1 với giảng viên</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">Truy cập trọn đời</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Đánh giá khóa học</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">Nguyễn Văn B - "Khóa học rất hay, giảng viên nhiệt tình"</span>
                </div>
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">Trần Thị C - "Nội dung đầy đủ, dễ hiểu"</span>
                </div>
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">Lê Văn D - "Rất đáng tiền, kiến thức thực tế"</span>
                </div>
              </div>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  );
}