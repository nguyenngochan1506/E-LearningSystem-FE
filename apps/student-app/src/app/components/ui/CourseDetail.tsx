import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  // const { courseId } = useParams(); // Có thể comment dòng này nếu chưa cần dùng
  // Hiển thị dữ liệu mẫu
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chi tiết khóa học (Demo)</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Tên khóa học:</strong> Lập trình JavaScript Cơ bản</p>
        <p><strong>Giá:</strong> Miễn phí</p>
        <p><strong>Mô tả:</strong> Đây là khóa học demo để bạn xem thử giao diện chi tiết khóa học.</p>
      </div>
    </div>
  );
};

export default CourseDetail;