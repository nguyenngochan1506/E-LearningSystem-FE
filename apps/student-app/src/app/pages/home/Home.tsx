import { CourseType } from '../../types/CourseType';
import Slider from '../../components/ui/Slider';
import SectionCourse from './SectionCourse';
import Footer from '../../components/layout/Footer';
import { useGlobalContext } from '../../components/common/GlobalContext';
import { translate } from '../../components/common/translate/translate';

const courses: CourseType[] = [
  {
    id: 1,
    title: 'Lập trình JavaScript Cơ bản',
    type: 'free',
    image: 'https://placehold.co/300x200',
    price: 0,
    isNew: true,
  },
  {
    id: 2,
    title: 'React Nâng cao',
    type: 'paid',
    image: 'https://placehold.co/300x200',
    price: 499000,
    isNew: false,
  },
  {
    id: 3,
    title: 'HTML & CSS cho người mới',
    type: 'free',
    image: 'https://placehold.co/300x200',
    price: 0,
    isNew: true,
  },
  {
    id: 4,
    title: 'Node.js Chuyên sâu',
    type: 'paid',
    image: 'https://placehold.co/300x200',
    price: 799000,
    isNew: true,
  },
];

const Home = () => {
  const { language } = useGlobalContext();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Slider */}
      <Slider />

      {/* Free Courses */}
      <SectionCourse title={translate('NEW_COURSE')} courses={courses} />

      {/* Paid Courses */}
      <SectionCourse title={translate('FREE_COURSE')} courses={courses} />

      {/* Latest Courses */}
      <SectionCourse title={translate('PAID_COURSE')} courses={courses} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
