export interface Lesson {
  title: string;
  videoUrl: string | File; 
  content: string;
  file?: File;
}

export interface Course {
  id?: string;
  title: string;
  description: string;
  image: string | File | null;
  price: number;
  category: string;
  teacherId: number;
  lessons: Lesson[];
  createdAt?: string;
  studentCount?: number;
  rating?: number;
}