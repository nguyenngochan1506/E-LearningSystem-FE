import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileText, FloppyDisk , ListChecks, Calendar, BookOpen, X } from 'phosphor-react';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';

const AssignmentCreate = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [assignmentType, setAssignmentType] = useState<'quiz' | 'essay'>('essay');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [questions, setQuestions] = useState<Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex: number, value: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...attachments];
    newFiles.splice(index, 1);
    setAttachments(newFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!title || !deadline) {
      alert(translate('REQUIRED_FIELDS') || 'Vui lòng điền đầy đủ thông tin');
      setIsSubmitting(false);
      return;
    }

    if (assignmentType === 'quiz' && questions.length === 0) {
      alert(translate('ADD_QUESTIONS') || 'Vui lòng thêm câu hỏi trắc nghiệm');
      setIsSubmitting(false);
      return;
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(translate('ASSIGNMENT_CREATED') || 'Bài tập đã được tạo thành công');
      navigate(`/courses/${courseId}/assignments`);
    } catch (error) {
      console.error(error);
      alert(translate('CREATE_ERROR') || 'Có lỗi xảy ra khi tạo bài tập');
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
          {translate('CREATE_ASSIGNMENT') || 'Tạo bài tập mới'}
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
                {translate('ASSIGNMENT_TYPE') || 'Loại bài tập'} *
              </span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`btn ${assignmentType === 'essay' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setAssignmentType('essay')}
              >
                <FileText size={16} className="mr-2" />
                {translate('ESSAY') || 'Tự luận'}
              </button>
              <button
                type="button"
                className={`btn ${assignmentType === 'quiz' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setAssignmentType('quiz')}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                {translate('ATTACHMENTS') || 'Tệp đính kèm'}
              </span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                multiple
              />
              <label
                htmlFor="file-upload"
                className="btn btn-outline btn-sm mb-2"
              >
                {translate('UPLOAD_FILES') || 'Tải lên tệp'}
              </label>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="truncate max-w-xs">{file.name}</span>
                    <button
                      type="button"
                      className="btn btn-circle btn-xs btn-error"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {assignmentType === 'quiz' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ListChecks size={20} />
              {translate('QUIZ_QUESTIONS') || 'Câu hỏi trắc nghiệm'}
            </h2>

            {questions.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                {translate('NO_QUESTIONS') || 'Chưa có câu hỏi nào'}
              </div>
            ) : (
              <div className="space-y-6">
                {questions.map((q, qIndex) => (
                  <div key={qIndex} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">
                        {translate('QUESTION')} {qIndex + 1}
                      </h3>
                      <button
                        type="button"
                        className="btn btn-circle btn-xs btn-error"
                        onClick={() => handleRemoveQuestion(qIndex)}
                      >
                        <X size={12} />
                      </button>
                    </div>

                    <div className="form-control mb-4">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        placeholder={translate('ENTER_QUESTION') || 'Nhập câu hỏi...'}
                      />
                    </div>

                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-answer-${qIndex}`}
                            className="radio radio-primary"
                            checked={q.correctAnswer === oIndex}
                            onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                          />
                          <input
                            type="text"
                            className="input input-bordered flex-1"
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            placeholder={`${translate('OPTION')} ${oIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              className="btn btn-outline btn-primary mt-4"
              onClick={handleAddQuestion}
            >
              {translate('ADD_QUESTION') || 'Thêm câu hỏi'}
            </button>
          </div>
        )}

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
            {translate('SAVE_ASSIGNMENT') || 'Lưu bài tập'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentCreate;