import { Link } from 'react-router-dom';
import { CourseType } from '../../types/CourseType';

interface CourseProps {
  course: CourseType;
}

const Course = ({ course }: CourseProps) => {
  return (
    <div key={course.id} className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={course.image}
          alt={course.title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        {course.type === 'paid' ? (
          <p>{course.price.toLocaleString('vi-VN')} VNĐ</p>
        ) : (
          <p>Miễn phí</p>
        )}
        <div className="card-actions justify-end">
          <Link to={`/course/demo`} className="btn btn-primary">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;

