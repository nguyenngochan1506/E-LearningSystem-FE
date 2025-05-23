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
};

export const translate = (key: string) => {
  const language = localStorage.getItem('language') || 'vi';
  return Translations[key]?.[language] || key;
};
