export interface Lesson {
  title: string;
  videoUrl: string | File; 
  content: string;
  file?: File;
}

export interface Course {
  title: string;
  description: string;
  image: string | File | null; 
  price: number;
  category: string;
  teacherId: number;
  lessons: Lesson[];
}