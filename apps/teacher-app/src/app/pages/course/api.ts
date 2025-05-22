import axios from 'axios';

export async function createCourseAPI(course: any) {
  try {
    const res = await axios.post('/api/courses/create', course, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.data;
  } catch (e) {
    alert('Lỗi tạo khóa học.');
    return { success: false };
  }
}

export async function createLessonAPI(lesson: any) {
  try {
    const formData = new FormData();
    formData.append('title', lesson.title);
    formData.append('content', lesson.content);
    formData.append('courseId', lesson.courseId);
    if (lesson.file) {
      formData.append('file', lesson.file);
    }

    const res = await axios.post('/api/lessons/create', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.data;
  } catch (e) {
    alert('Lỗi tạo bài học.');
    return { success: false };
  }
}
