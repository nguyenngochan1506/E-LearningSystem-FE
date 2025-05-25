import * as header from './header.translate';
import * as login from './login.translate';
import * as dashboard from './dashboard.translate';
import * as userManagement from './user-management.translate';
import * as gradeAssignment from './grade-assignment.translate';

const Translations: Record<string, Record<string, string>> = {
  ...header.default,
  ...login.default,
  ...userManagement.default,
  ...dashboard.default,
  ...gradeAssignment.default,
  // Các chuỗi chung cho teacher
  BACK_TO_COURSES: { vi: 'Quay lại khóa học', en: 'Back to Courses' },
  SESSION_EXPIRED: {
    vi: 'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.',
    en: 'Session expired, please log in again.',
  },
  LOAD_ERROR: { vi: 'Tải dữ liệu thất bại.', en: 'Failed to load assignment.' },
  LOADING: { vi: 'Đang tải...', en: 'Loading...' },
  CREATE_ASSIGNMENT: { vi: 'Tạo bài tập mới', en: 'Create Assignment' },
  EDIT_ASSIGNMENT: { vi: 'Chỉnh sửa bài tập', en: 'Edit Assignment' },
  ASSIGNMENTS: { vi: 'Bài tập', en: 'Assignments' },
  ASSIGNMENT_TYPE: { vi: 'Loại bài tập', en: 'Assignment Type' },
  BASIC_INFO: { vi: 'Thông tin cơ bản', en: 'Basic Information' },
  TITLE: { vi: 'Tiêu đề', en: 'Title' },
  ENTER_TITLE: { vi: 'Nhập tiêu đề bài tập...', en: 'Enter assignment title...' },
  DESCRIPTION: { vi: 'Mô tả', en: 'Description' },
  ENTER_DESCRIPTION: { vi: 'Nhập mô tả bài tập...', en: 'Enter assignment description...' },
  DEADLINE: { vi: 'Hạn nộp', en: 'Deadline' },
  ATTACHMENTS: { vi: 'Tệp đính kèm', en: 'Attachments' },
  UPLOAD_FILES: { vi: 'Tải lên tệp', en: 'Upload files' },
  QUIZ_QUESTIONS: { vi: 'Câu hỏi trắc nghiệm', en: 'Quiz Questions' },
  NO_QUESTIONS: { vi: 'Chưa có câu hỏi nào', en: 'No questions yet' },
  QUESTION: { vi: 'Câu hỏi', en: 'Question' },
  ENTER_QUESTION: { vi: 'Nhập câu hỏi...', en: 'Enter question...' },
  OPTION: { vi: 'Lựa chọn', en: 'Option' },
  ADD_QUESTION: { vi: 'Thêm câu hỏi', en: 'Add Question' },
  SAVE_ASSIGNMENT: { vi: 'Lưu bài tập', en: 'Save Assignment' },
  ASSIGNMENT_CREATED: { vi: 'Bài tập đã được tạo thành công', en: 'Assignment created successfully' },
  ASSIGNMENT_UPDATED: { vi: 'Bài tập đã được cập nhật', en: 'Assignment updated successfully' },
  CREATE_ERROR: { vi: 'Có lỗi xảy ra khi tạo bài tập', en: 'Error creating assignment' },
  UPDATE_ERROR: { vi: 'Có lỗi xảy ra khi cập nhật bài tập', en: 'Error updating assignment' },
  REQUIRED_FIELDS: { vi: 'Vui lòng điền đầy đủ thông tin', en: 'Please fill in all required fields' },
  ADD_QUESTIONS: { vi: 'Vui lòng thêm câu hỏi trắc nghiệm', en: 'Please add quiz questions' },
  SEARCH_ASSIGNMENTS: { vi: 'Tìm kiếm bài tập...', en: 'Search assignments...' },
  NO_ASSIGNMENTS_FOUND: { vi: 'Không tìm thấy bài tập nào', en: 'No assignments found' },
  CONFIRM_DELETE_ASSIGNMENT: { vi: 'Bạn có chắc chắn muốn xóa bài tập này?', en: 'Are you sure you want to delete this assignment?' },
  VIEW_SUBMISSIONS: { vi: 'Xem bài nộp', en: 'View Submissions' },
  SAVE_CHANGES: { vi: 'Lưu thay đổi', en: 'Save Changes' },
  CREATED_AT: { vi: 'Tạo lúc', en: 'Created at' },
};

export const translate = (key: string) => {
  const language = localStorage.getItem('language') || 'vi';
  return Translations[key]?.[language] || key;
};
