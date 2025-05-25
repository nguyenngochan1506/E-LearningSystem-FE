

const MyCourses = () => {
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Khóa học của tôi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {registeredCourses.map((course) => (
          <div key={course.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course.title}</h2>
              <p>Giảng viên: {course.instructor}</p>
              <p>Tiến độ: {course.progress}%</p>
              <p>Đã học: {course.completedLessons}/{course.totalLessons} bài</p>
              <p>Đánh giá: {course.rating} ⭐</p>
              <p>Danh mục: {course.category}</p>
              <p>Thời lượng: {course.duration}</p>
              {course.certified && (
                <span className="badge badge-success">Chứng nhận</span>
              )}
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary">Xem chi tiết</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
