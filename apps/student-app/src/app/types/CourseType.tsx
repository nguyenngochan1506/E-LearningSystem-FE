export type CourseType = {
  id: number;
  title: string;
  image: string;
  type: 'free' | 'paid';
  price: number;
  isNew: boolean;
};
