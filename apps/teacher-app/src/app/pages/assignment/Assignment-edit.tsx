import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileText, ListChecks, Calendar, BookOpen, FloppyDisk , X } from 'phosphor-react';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';

const AssignmentEdit = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const { courseId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState({
    type: 'essay' as 'quiz' | 'essay',
    title: '',
    description: '',
    deadline: '',
    questions: [] as Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>,
    attachments: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock data - fetch assignment details
    setTimeout(() => {
      setAssignment({
        type: 'essay',
        title: 'Bài luận về React Hooks',
        description: 'Viết bài luận về cách sử dụng React Hooks',
        deadline: '2025-06-30T23:59:00',
        questions: [],
        attachments: ['bai-mau.docx']
      });
    }, 500);
  }, [assignmentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(translate('ASSIGNMENT_UPDATED') || 'Bài tập đã được cập nhật');
      navigate(`/courses/${courseId}/assignments`);
    } catch (error) {
      console.error(error);
      alert(translate('UPDATE_ERROR') || 'Có lỗi xảy ra khi cập nhật bài tập');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-ghost mr-4"
        >
          <X size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {translate('EDIT_ASSIGNMENT') || 'Chỉnh sửa bài tập'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen size={20} />
            {translate('BASIC_INFO') || 'Thông tin cơ bản'}
          </h2>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">
                {translate('ASSIGNMENT_TYPE') || 'Loại bài tập'}
              </span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`btn ${assignment.type === 'essay' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setAssignment({...assignment, type: 'essay'})}
              >
                <FileText size={16} className="mr-2" />
                {translate('ESSAY') || 'Tự luận'}
              </button>
              <button
                type="button"
                className={`btn ${assignment.type === 'quiz' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setAssignment({...assignment, type: 'quiz'})}
              >
                <ListChecks size={16} className="mr-2" />
                {translate('QUIZ') || 'Trắc nghiệm'}
              </button>
            </div>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">
                {translate('TITLE') || 'Tiêu đề'} *
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={assignment.title}
              onChange={(e) => setAssignment({...assignment, title: e.target.value})}
              placeholder={translate('ENTER_TITLE') || 'Nhập tiêu đề bài tập...'}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">
                {translate('DESCRIPTION') || 'Mô tả'}
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={assignment.description}
              onChange={(e) => setAssignment({...assignment, description: e.target.value})}
              placeholder={translate('ENTER_DESCRIPTION') || 'Nhập mô tả bài tập...'}
            ></textarea>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">
                {translate('DEADLINE') || 'Hạn nộp'} *
              </span>
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                className="input input-bordered w-full pl-10"
                value={assignment.deadline}
                onChange={(e) => setAssignment({...assignment, deadline: e.target.value})}
              />
              <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          {assignment.attachments.length > 0 && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  {translate('ATTACHMENTS') || 'Tệp đính kèm'}
                </span>
              </label>
              <div className="space-y-2">
                {assignment.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="truncate max-w-xs">{file}</span>
                    <button
                      type="button"
                      className="btn btn-circle btn-xs btn-error"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate(-1)}
          >
            {translate('CANCEL') || 'Hủy'}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <FloppyDisk  size={16} className="mr-2" />
            )}
            {translate('SAVE_CHANGES') || 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentEdit;