import { Course } from "./types";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function createCourseAPI(course: any) {
  try {
    const formData = new FormData();
    
    // Append all course data
    Object.keys(course).forEach(key => {
      if (key !== 'image' && key !== 'lessons') {
        formData.append(key, course[key]);
      }
    });

    // Append image if it's a File
    if (course.image instanceof File) {
      formData.append('image', course.image);
    }

    // Append lessons
    formData.append('lessons', JSON.stringify(course.lessons));

    const res = await axios.post(`${API_BASE_URL}/courses`, formData, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      },
    });
    return res.data;
  } catch (e) {
    console.error('Error creating course:', e);
    throw new Error('Lỗi tạo khóa học');
  }
}

export async function createLessonAPI(lesson: any) {
  try {
    const formData = new FormData();
    formData.append('title', lesson.title);
    formData.append('content', lesson.content);
    formData.append('courseId', lesson.courseId);
    
    if (lesson.videoUrl instanceof File) {
      formData.append('video', lesson.videoUrl);
    }

    const res = await axios.post(`${API_BASE_URL}/lessons`, formData, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      },
    });
    return res.data;
  } catch (e) {
    console.error('Error creating lesson:', e);
    throw new Error('Lỗi tạo bài học');
  }
}
export async function updateCourseAPI(course: Course) {
  console.log('Mock updating course:', course);
  return {
    success: true,
    data: {
      ...course,
      updatedAt: new Date().toISOString(),
    },
  };
}

export async function getCourseById(courseId: string) {
  console.log('Mock fetching course:', courseId);
  return {
    success: true,
    data: {
      id: courseId,
      title: 'Khóa học mẫu',
      description: 'Mô tả khóa học mẫu',
      image: 'https://example.com/course-image.jpg',
      price: 500000,
      category: 'Lập trình',
      teacherId: 1,
      lessons: [],
      createdAt: new Date().toISOString(),
    },
  };
}