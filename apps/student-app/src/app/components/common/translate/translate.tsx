import * as header from './header.translate';
import * as home from './home.translate';

const Translations: Record<string, Record<string, string>> = {
  ...header.default,
  ...home.default,
  QUIZ_TITLE: { vi: 'Bài kiểm tra', en: 'Quiz' },
  QUIZ_QUESTION_1: {
    vi: 'Thủ đô của Pháp là gì?',
    en: 'What is the capital of France?',
  },
  QUIZ_QUESTION_2: { vi: '2 + 2 bằng bao nhiêu?', en: 'What is 2 + 2?' },
  QUIZ_QUESTION_3: {
    vi: 'Hành tinh nào được gọi là Hành tinh Đỏ?',
    en: 'Which planet is known as the Red Planet?',
  },
  QUIZ_QUESTION_4: {
    vi: 'Mô tả về loài động vật có vú lớn nhất trên thế giới.',
    en: 'Describe the largest mammal in the world.',
  },
  QUIZ_QUESTION_5: {
    vi: 'Giải thích tại sao nước lại cần thiết cho sự sống.',
    en: 'Explain why water is essential for life.',
  },
  SUBMIT_QUIZ: { vi: 'Nộp bài kiểm tra', en: 'Submit Quiz' },
  QUIZ_RESULT: { vi: 'Kết quả bài kiểm tra', en: 'Quiz Result' },
  SCORE: { vi: 'Điểm số', en: 'Score' },
  CORRECT_COUNT: { vi: 'Số câu đúng', en: 'Correct' },
  RESTART_QUIZ: { vi: 'Làm lại bài kiểm tra', en: 'Restart Quiz' },
  BACK_TO_COURSES: { vi: 'Quay lại khóa học', en: 'Back to Courses' },
  QUESTION: { vi: 'Câu hỏi', en: 'Question' },
  OF: { vi: 'của', en: 'of' },
  CHOOSE_CORRECT_ANSWER: {
    vi: 'Chọn đáp án đúng bên dưới',
    en: 'Choose the correct answer below',
  },
  SKIP_QUIZ: { vi: 'Bỏ qua bài kiểm tra', en: 'Skip Quiz' },
  REVIEW_VIDEO: { vi: 'Xem lại video', en: 'Review Video' },
  NEXT_QUESTION: { vi: 'Câu hỏi tiếp theo', en: 'Next Question' },
  PREVIOUS_QUESTION: { vi: 'Câu hỏi trước', en: 'Previous Question' },
  YOUR_ANSWER: { vi: 'Câu trả lời của bạn:', en: 'Your Answer:' },
  NOTE: {
    vi: 'Lưu ý: Có thể có nhiều đáp án đúng cho câu hỏi này.',
    en: 'Note: There can be multiple correct answers to this question.',
  },
  TYPE_YOUR_ANSWER: {
    vi: 'Nhập câu trả lời của bạn tại đây...',
    en: 'Type your answer here...',
  },
  SELECTED_FILE: { vi: 'Tệp đã chọn:', en: 'Selected file:' },
  DEADLINE_EXPIRED: {
    vi: 'Bài tập đã hết hạn.',
    en: 'Assignment has expired.',
  },
  ALREADY_SUBMITTED: {
    vi: 'Bạn đã nộp bài. Không thể nộp lại.',
    en: 'You have already submitted this assignment.',
  },
  INVALID_FILE: {
    vi: 'Tệp không hợp lệ hoặc dung lượng vượt quá 10MB.',
    en: 'Invalid file type or size exceeds 10MB.',
  },
  MISSING_ANSWER: {
    vi: 'Bạn chưa hoàn thành tất cả câu hỏi.',
    en: 'Please provide an answer before proceeding.',
  },
  SAVE_ERROR: {
    vi: 'Lưu bài làm thất bại, vui lòng thử lại.',
    en: 'Failed to save submission, please try again.',
  },
  SESSION_EXPIRED: {
    vi: 'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.',
    en: 'Session expired, please log in again.',
  },
  LOAD_ERROR: { vi: 'Tải dữ liệu thất bại.', en: 'Failed to load assignment.' },
  LOADING: { vi: 'Đang tải...', en: 'Loading...' },
};

export const translate = (key: string) => {
  const language = localStorage.getItem('language') || 'vi';
  return Translations[key]?.[language] || key;
};
