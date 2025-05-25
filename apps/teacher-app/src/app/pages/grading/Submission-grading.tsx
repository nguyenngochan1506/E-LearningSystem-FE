import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, XCircle, Download, ArrowLeft } from 'phosphor-react';
import { useGlobalContext } from '../../components/common/GlobalContext';
import { translate } from '../../components/common/translate/translate';

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  attachments: { name: string; url: string }[];
  grade?: number;
  feedback?: string;
  isQuiz: boolean;
  quizScore?: number;
}

const SubmissionGrading = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const { courseId, assignmentId } = useParams();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [assignmentTitle, setAssignmentTitle] = useState('');

  // Mock data - trong thực tế sẽ fetch từ API
  useEffect(() => {
    const mockSubmission: Submission = {
      id: '1',
      studentId: 'sv001',
      studentName: 'Nguyễn Văn A',
      submittedAt: '2025-06-10T14:30:00',
      content: 'Bài làm của em về React hooks và state management. Em đã sử dụng useContext và useReducer để quản lý state phức tạp.',
      attachments: [
        { name: 'bai-lam.docx', url: '#' },
        { name: 'source-code.zip', url: '#' }
      ],
      isQuiz: false,
      grade: undefined,
      feedback: undefined
    };

    setTimeout(() => {
      setSubmission(mockSubmission);
      setAssignmentTitle('Bài luận cuối kỳ - ReactJS');
      setLoading(false);
    }, 800);
  }, [assignmentId]);

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(e.target.value);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleSubmitGrade = () => {
    if (!grade) {
      alert(translate('GRADE_REQUIRED') || 'Vui lòng nhập điểm');
      return;
    }

    const gradeValue = parseFloat(grade);
    if (isNaN(gradeValue)) {
      alert(translate('INVALID_GRADE') || 'Điểm phải là số');
      return;
    }

    // Gửi điểm lên server
    alert(`Đã chấm điểm ${gradeValue} cho bài nộp`);
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-ghost mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {assignmentTitle}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">
              {translate('STUDENT_INFO') || 'Thông tin sinh viên'}
            </h3>
            <p>{submission?.studentName}</p>
            <p className="text-sm text-gray-500">ID: {submission?.studentId}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">
              {translate('SUBMISSION_TIME') || 'Thời gian nộp'}
            </h3>
            <p>{submission?.submittedAt ? new Date(submission.submittedAt).toLocaleString() : ''}</p>
          </div>

          {submission?.isQuiz && submission.quizScore !== undefined && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                {translate('QUIZ_SCORE') || 'Điểm trắc nghiệm'}
              </h3>
              <p className="text-xl font-bold">
                {submission.quizScore}/10
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {translate('SUBMISSION_CONTENT') || 'Nội dung bài nộp'}
        </h2>
        <div className="prose max-w-none">
          <p>{submission?.content}</p>
        </div>

        {submission?.attachments && submission.attachments.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              {translate('ATTACHMENTS') || 'Tệp đính kèm'}
            </h3>
            <ul className="space-y-2">
              {submission.attachments.map((file, index) => (
                <li key={index} className="flex items-center">
                  <FileText className="mr-2" size={20} />
                  <span className="mr-4">{file.name}</span>
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    <Download size={16} className="mr-1" />
                    {translate('DOWNLOAD') || 'Tải xuống'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {!submission?.isQuiz && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {translate('GRADING') || 'Chấm điểm'}
          </h2>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">
                {translate('GRADE') || 'Điểm'} (0-10)
              </span>
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              className="input input-bordered w-full max-w-xs"
              value={grade}
              onChange={handleGradeChange}
              placeholder="Nhập điểm từ 0 đến 10"
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">
                {translate('FEEDBACK') || 'Nhận xét'}
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder={translate('FEEDBACK_PLACEHOLDER') || 'Nhập nhận xét của bạn...'}
              value={feedback}
              onChange={handleFeedbackChange}
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button 
              className="btn btn-outline"
              onClick={() => navigate(-1)}
            >
              {translate('CANCEL') || 'Hủy'}
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleSubmitGrade}
            >
              {translate('SUBMIT_GRADE') || 'Lưu điểm'}
            </button>
          </div>
        </div>
      )}

      {submission?.isQuiz && (
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <CheckCircle size={32} className="mx-auto text-green-500 mb-2" />
          <p className="font-medium">
            {translate('QUIZ_AUTO_GRADED') || 'Bài kiểm tra trắc nghiệm đã được chấm điểm tự động'}
          </p>
          <p className="text-gray-600">
            {translate('NO_MANUAL_GRADING') || 'Không cần chấm điểm thủ công'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubmissionGrading;