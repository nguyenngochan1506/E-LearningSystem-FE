import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../components/common/GlobalContex';
import { translate } from '../../components/common/translate/translate';

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  content: string | { fileName: string; type: string; url?: string };
  submissionDate: string; // ISO date string
  grade: number | null;
  feedback: string | null;
  status: 'Pending' | 'Graded';
}

interface Assignment {
  id: string;
  title: string;
  deadline: string; // ISO date string
  submissions: Submission[];
}

const sampleAssignment: Assignment = {
  id: '456',
  title: 'Sample Assignment for Grading',
  deadline: '2025-05-23T23:59:59+07:00', // Hết hạn 23/05/2025 23:59:59
  submissions: [
    {
      id: 'sub1',
      studentId: 'stu1',
      studentName: 'Nguyen Van A',
      content: 'The largest mammal is the Blue Whale.',
      submissionDate: '2025-05-22T14:30:00+07:00',
      grade: null,
      feedback: null,
      status: 'Pending',
    },
    {
      id: 'sub2',
      studentId: 'stu2',
      studentName: 'Tran Thi B',
      content: {
        fileName: 'essay.docx',
        type: 'docx',
        url: 'http://fakeurl.com/essay.docx',
      },
      submissionDate: '2025-05-22T15:00:00+07:00',
      grade: null,
      feedback: null,
      status: 'Pending',
    },
    {
      id: 'sub3',
      studentId: 'stu3',
      studentName: 'Le Van C',
      content: 'Water is essential because it supports life processes.',
      submissionDate: '2025-05-22T16:00:00+07:00',
      grade: null,
      feedback: null,
      status: 'Pending',
    },
  ],
};

const GradeAssignment = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [assignment, setAssignment] = useState<Assignment | null>(
    sampleAssignment
  );
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [gradeInput, setGradeInput] = useState<string>('');
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Kiểm tra token và quyền (giả lập)
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError(
        translate('SESSION_EXPIRED') || 'Session expired, please log in again.'
      );
      navigate('/login');
      return;
    }

    const now = new Date();
    const deadline = new Date(sampleAssignment.deadline);
    if (now > deadline) {
      setError(
        translate('DEADLINE_LOCKED') || 'Cannot grade, assignment is locked.'
      );
      return;
    }

    // Giả lập kiểm tra quyền giảng viên
    const isInstructor = true; // Thay bằng logic thực tế (kiểm tra từ token hoặc API)
    if (!isInstructor) {
      setError(
        translate('NO_PERMISSION') ||
          'You do not have permission to grade this.'
      );
      return;
    }

    // Giả lập gọi API để lấy danh sách bài nộp
    // GET /api/submissions/by-assignment?assignmentId=...
    setAssignment(sampleAssignment);
  }, [navigate]);

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGradeInput(e.target.value);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackInput(e.target.value);
  };

  const handleSaveGrade = () => {
    if (!selectedSubmission) return;

    const gradeValue = parseFloat(gradeInput);
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 10) {
      setError(
        translate('INVALID_GRADE') ||
          'Score must be a valid number between 0 and 10.'
      );
      return;
    }

    // Giả lập lưu điểm và phản hồi (thay bằng PUT /api/submissions/grade)
    const updatedSubmissions = assignment?.submissions.map((sub) =>
      sub.id === selectedSubmission.id
        ? {
            ...sub,
            grade: gradeValue,
            feedback: feedbackInput,
            status: 'Graded',
          }
        : sub
    );
    setAssignment({ ...assignment!, submissions: updatedSubmissions! });
    setSelectedSubmission({
      ...selectedSubmission,
      grade: gradeValue,
      feedback: feedbackInput,
      status: 'Graded',
    });
    setSuccess(translate('GRADE_SUCCESS') || 'Grading successful.');
    setError(null);
    setGradeInput('');
    setFeedbackInput('');

    // Giả lập gửi thông báo đến sinh viên
    console.log(
      `Notification sent to student ${selectedSubmission.studentId}: "Bài tập đã được chấm điểm"`
    );
  };

  const handleSelectSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setGradeInput(submission.grade?.toString() || '');
    setFeedbackInput(submission.feedback || '');
    setError(null);
    setSuccess(null);
  };

  const handleDownloadFile = (fileUrl?: string) => {
    if (fileUrl) {
      // Giả lập tải file
      window.open(fileUrl, '_blank');
    } else {
      setError(translate('FILE_NOT_AVAILABLE') || 'File not available.');
    }
  };

  if (error)
    return <div className="container mx-auto p-6 text-red-500">{error}</div>;
  if (!assignment)
    return (
      <div className="container mx-auto p-6">
        {translate('LOADING') || 'Loading...'}
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-blue-600 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Danh sách sinh viên đã nộp */}
            <div className="w-full md:w-1/3 bg-white text-black p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                {translate('SUBMISSIONS_LIST') || 'Submissions List'}
              </h3>
              {assignment.submissions.length === 0 ? (
                <p>
                  {translate('NO_SUBMISSIONS') || 'No submissions available.'}
                </p>
              ) : (
                assignment.submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-2 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectSubmission(sub)}
                  >
                    {sub.studentName} -{' '}
                    {new Date(sub.submissionDate).toLocaleString()} (
                    {sub.status})
                  </div>
                ))
              )}
            </div>
            {/* Chi tiết bài làm */}
            <div className="w-full md:w-2/3 bg-white text-black p-4 rounded-lg">
              {selectedSubmission ? (
                <>
                  <h3 className="text-lg font-semibold mb-4">
                    {translate('SUBMISSION_DETAIL') || 'Submission Detail'}
                  </h3>
                  <p>
                    <strong>{translate('STUDENT_NAME') || 'Student:'}</strong>{' '}
                    {selectedSubmission.studentName}
                  </p>
                  <p>
                    <strong>{translate('SUBMISSION_DATE') || 'Date:'}</strong>{' '}
                    {new Date(
                      selectedSubmission.submissionDate
                    ).toLocaleString()}
                  </p>
                  <p>
                    <strong>{translate('CONTENT') || 'Content:'}</strong>
                  </p>
                  {typeof selectedSubmission.content === 'string' ? (
                    <p className="mt-2">{selectedSubmission.content}</p>
                  ) : (
                    <div className="mt-2">
                      <p>
                        {translate('ATTACHED_FILE') || 'Attached File:'}{' '}
                        {selectedSubmission.content.fileName} (
                        {selectedSubmission.content.type})
                      </p>
                      <button
                        onClick={() =>
                          handleDownloadFile(selectedSubmission.content.url)
                        }
                        className="btn btn-sm btn-outline mt-2"
                      >
                        {translate('DOWNLOAD_FILE') || 'Download File'}
                      </button>
                    </div>
                  )}
                  <div className="mt-4">
                    <label className="block mb-2">
                      {translate('ENTER_GRADE') || 'Enter Grade (0-10):'}
                    </label>
                    <input
                      type="text"
                      value={gradeInput}
                      onChange={handleGradeChange}
                      className="input input-bordered w-full max-w-xs"
                      placeholder="0-10"
                      disabled={selectedSubmission.status === 'Graded'}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block mb-2">
                      {translate('FEEDBACK') || 'Feedback (Optional):'}
                    </label>
                    <textarea
                      value={feedbackInput}
                      onChange={handleFeedbackChange}
                      className="textarea textarea-bordered w-full"
                      rows={3}
                      placeholder={
                        translate('ENTER_FEEDBACK') || 'Enter feedback here...'
                      }
                      disabled={selectedSubmission.status === 'Graded'}
                    />
                  </div>
                  <button
                    onClick={handleSaveGrade}
                    className="btn btn-primary mt-4"
                    disabled={selectedSubmission.status === 'Graded'}
                  >
                    {translate('SAVE_GRADE') || 'Save Grade'}
                  </button>
                  {selectedSubmission.status === 'Graded' && (
                    <div className="mt-4">
                      <p className="text-green-500">
                        <strong>
                          {translate('GRADED_STATUS') || 'Status:'}
                        </strong>{' '}
                        {translate('GRADED') || 'Graded'}
                      </p>
                      <p className="text-green-500">
                        <strong>{translate('SCORE') || 'Score:'}</strong>{' '}
                        {selectedSubmission.grade}/10
                      </p>
                      {selectedSubmission.feedback && (
                        <p className="text-green-500">
                          <strong>
                            {translate('FEEDBACK') || 'Feedback:'}
                          </strong>{' '}
                          {selectedSubmission.feedback}
                        </p>
                      )}
                    </div>
                  )}
                  {success && <p className="mt-2 text-green-500">{success}</p>}
                  {error && <p className="mt-2 text-red-500">{error}</p>}
                </>
              ) : (
                <p>
                  {translate('SELECT_SUBMISSION') ||
                    'Please select a submission to grade.'}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <Link to="/my-courses" className="btn btn-outline text-white">
              {translate('BACK_TO_COURSES') || 'Back to Courses'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeAssignment;
