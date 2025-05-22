export type Course = {
  title: string;
  description: string;
  objectives: string;
  thumbnail: string;
  duration: string;
};

export type Lesson = {
  title: string;
  content: string;
  file: File | null;
};
