import Course from '../../components/ui/Course';
import { CourseType } from '../../types/CourseType';

interface SectionCourseProps {
  title: string;
  courses: CourseType[];
}

const SectionCourse = ({ courses, title }: SectionCourseProps) => {
  return (
    <section className="py-12 px-4 bg-base-300">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default SectionCourse;
