import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../components/common/GlobalContex';
import { translate } from '../../components/common/translate/translate';
import { Timer } from 'phosphor-react';

interface QuizQuestion {
  id: number;
  type: 'multiple-choice' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer?: number;
}

interface Assignment {
  id: string;
  title: string;
  type: 'multiple-choice' | 'short-answer';
  deadline: string; // ISO date string
  description?: string;
  questions?: QuizQuestion[];
  submitted?: boolean;
}

interface QuizResult {
  score: number;
  correctCount: number;
  totalQuestions: number;
}

// Dữ liệu tĩnh mẫu (thay vì gọi API)
const sampleAssignment: Assignment = {
  id: '123',
  title: 'Sample Assignment',
  type: 'mixed',
  deadline: '2025-05-23T23:59:59+07:00', // Hết hạn vào 11:59 PM ngày 23/05/2025
  description: 'Complete the following questions within 5 minutes.',
  questions: [
    {
      id: 1,
      type: 'multiple-choice',
      question:
        translate('QUIZ_QUESTION_1') || 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 0,
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: translate('QUIZ_QUESTION_2') || 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
    },
    {
      id: 3,
      type: 'short-answer',
      question:
        translate('QUIZ_QUESTION_4') ||
        'Describe the largest mammal in the world.',
    },
    {
      id: 4,
      type: 'short-answer',
      question:
        translate('QUIZ_QUESTION_5') ||
        'Explain why water is essential for life.',
    },
  ],
  submitted: false,
};

const Quiz = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [assignment, setAssignment] = useState<Assignment | null>(
    sampleAssignment
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [shortAnswer, setShortAnswer] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [answers, setAnswers] = useState<(number | string | null)[]>(
    Array(sampleAssignment.questions?.length || 0).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút = 300 giây
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Kiểm tra thời gian và trạng thái nộp
  useEffect(() => {
    const now = new Date();
    const deadline = new Date(sampleAssignment.deadline);
    if (now > deadline) {
      setError(translate('DEADLINE_EXPIRED') || 'Assignment has expired.');
      return;
    }
    if (sampleAssignment.submitted) {
      setError(
        translate('ALREADY_SUBMITTED') ||
          'You have already submitted this assignment.'
      );
    }
  }, []);

  // Đồng hồ đếm ngược
  useEffect(() => {
    if (timeLeft <= 0 && !showResult) {
      handleSubmitQuiz();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleShortAnswerChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setShortAnswer(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
      ];
      if (!validTypes.includes(file.type) || file.size > 10 * 1024 * 1024) {
        setError(
          translate('INVALID_FILE') || 'Invalid file type or size exceeds 10MB.'
        );
        setFile(null);
        return;
      }
      setFile(file);
    }
  };

  const handleNextQuestion = () => {
    const current = assignment?.questions?.[currentQuestion];
    let newAnswers = [...answers];

    if (current?.type === 'multiple-choice' && selectedAnswer !== null) {
      newAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswer(null);
    } else if (
      current?.type === 'short-answer' &&
      (shortAnswer.trim() !== '' || file)
    ) {
      newAnswers[currentQuestion] = shortAnswer || file?.name || '';
      setShortAnswer('');
      setFile(null);
    } else {
      setError(
        translate('MISSING_ANSWER') ||
          'Please provide an answer before proceeding.'
      );
      return;
    }

    setAnswers(newAnswers);
    if (currentQuestion < (assignment?.questions?.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const savedAnswer = answers[currentQuestion];
      if (
        assignment?.questions?.[currentQuestion].type === 'multiple-choice' &&
        typeof savedAnswer === 'number'
      ) {
        setSelectedAnswer(savedAnswer);
      } else if (
        assignment?.questions?.[currentQuestion].type === 'short-answer' &&
        typeof savedAnswer === 'string'
      ) {
        setShortAnswer(savedAnswer);
      }
    }
  };

  const handleSubmitQuiz = () => {
    if (error || !assignment) return;

    // Giả lập chấm điểm cho bài trắc nghiệm
    const score = answers.reduce((acc, answer, index) => {
      if (
        assignment.questions?.[index].type === 'multiple-choice' &&
        typeof answer === 'number'
      ) {
        return answer === assignment.questions[index].correctAnswer
          ? acc + 1
          : acc;
      }
      return acc;
    }, 0);
    const correctCount = score;
    const totalQuestions = assignment.questions?.length || 0;

    setResult({ score, correctCount, totalQuestions });
    setShowResult(true);
    setAssignment({ ...assignment, submitted: true });
  };

  const isAnswerProvided = () => {
    const current = assignment?.questions?.[currentQuestion];
    if (!current) return false;
    if (current.type === 'multiple-choice') return selectedAnswer !== null;
    return shortAnswer.trim() !== '' || file;
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
          <div className="flex justify-center mb-6">
            {assignment.questions?.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    index === currentQuestion ? 'bg-red-500' : 'bg-white'
                  } border-2 border-white mx-1`}
                ></div>
                {index < (assignment.questions?.length || 0) - 1 && (
                  <div className="w-8 h-1 bg-white mx-1"></div>
                )}
              </div>
            ))}
          </div>
          {!showResult ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {translate('QUESTION')} {currentQuestion + 1}{' '}
                  {translate('OF')} {assignment.questions?.length}
                </h2>
                <div className="flex items-center space-x-2">
                  <Timer size={24} />
                  <span>{`0${Math.floor(timeLeft / 60)}:${
                    timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60
                  }`}</span>
                </div>
              </div>
              <p className="text-lg mb-6">
                {assignment.questions?.[currentQuestion].question}
              </p>
              <div className="flex justify-between items-center">
                <button className="btn btn-sm btn-outline text-white">
                  {translate('CHOOSE_CORRECT_ANSWER') ||
                    'Choose the correct answer below'}
                </button>
                <div className="space-x-2">
                  <button
                    onClick={handlePreviousQuestion}
                    className="btn btn-outline text-white"
                    disabled={currentQuestion === 0}
                  >
                    {translate('PREVIOUS_QUESTION') || 'Previous Question'}
                  </button>
                  <button
                    onClick={() => navigate('/my-courses')}
                    className="btn btn-outline text-white"
                  >
                    {translate('SKIP_QUIZ') || 'Skip Quiz'}
                  </button>
                  <button className="btn btn-outline text-white" disabled>
                    {translate('REVIEW_VIDEO') || 'Review Video'}
                  </button>
                  {currentQuestion ===
                  (assignment.questions?.length || 0) - 1 ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="btn btn-error text-white"
                      disabled={!isAnswerProvided()}
                    >
                      {translate('SUBMIT_QUIZ') || 'Submit Quiz'}
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="btn btn-error text-white"
                      disabled={!isAnswerProvided()}
                    >
                      {translate('NEXT_QUESTION') || 'Next Question'}
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                {translate('QUIZ_RESULT') || 'Quiz Result'}
              </h2>
              <p className="text-lg mb-6">
                {translate('SCORE') || 'Score'}: {result?.score}/
                {result?.totalQuestions} (
                {translate('CORRECT_COUNT') || 'Correct'}:{' '}
                {result?.correctCount})
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setTimeLeft(300);
                  }}
                  className="btn btn-outline text-white"
                >
                  {translate('RESTART_QUIZ') || 'Restart Quiz'}
                </button>
                <Link to="/my-courses" className="btn btn-outline text-white">
                  {translate('BACK_TO_COURSES') || 'Back to Courses'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {!showResult && (
        <div className="bg-gray-50 p-6">
          <div className="container mx-auto">
            <h3 className="text-lg font-semibold mb-4">
              {translate('YOUR_ANSWER') || 'Your Answer:'}
            </h3>
            {assignment.questions?.[currentQuestion].type ===
            'multiple-choice' ? (
              <div className="space-y-2">
                {assignment.questions[currentQuestion].options!.map(
                  (option, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="answer"
                        value={index}
                        checked={selectedAnswer === index}
                        onChange={() => handleAnswerSelect(index)}
                        className="radio radio-primary"
                      />
                      <span>{option}</span>
                    </label>
                  )
                )}
              </div>
            ) : (
              <div>
                <textarea
                  value={shortAnswer}
                  onChange={handleShortAnswerChange}
                  className="textarea textarea-bordered w-full mb-4"
                  rows={5}
                  placeholder={
                    translate('TYPE_YOUR_ANSWER') || 'Type your answer here...'
                  }
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full mb-4"
                  accept=".pdf,.docx,.zip"
                />
                {file && (
                  <p>
                    {translate('SELECTED_FILE') || 'Selected file:'} {file.name}
                  </p>
                )}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4">
              {assignment.description ||
                translate('NOTE') ||
                'Note: There can be multiple correct answers to this question.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
