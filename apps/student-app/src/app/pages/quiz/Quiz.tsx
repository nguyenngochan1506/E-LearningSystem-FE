import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../components/common/GlobalContex';
import { translate } from '../../components/common/translate/translate';
import { Timer } from 'phosphor-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index của đáp án đúng
}

interface QuizResult {
  score: number;
  total: number;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: translate('QUIZ_QUESTION_1') || 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: translate('QUIZ_QUESTION_2') || 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
  },
  {
    id: 3,
    question:
      translate('QUIZ_QUESTION_3') ||
      'Which planet is known as the Red Planet?',
    options: ['Mars', 'Jupiter', 'Venus', 'Mercury'],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: translate('QUIZ_QUESTION_4') || 'What is the largest mammal?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 1,
  },
  {
    id: 5,
    question:
      translate('QUIZ_QUESTION_5') || 'What is the chemical symbol for water?',
    options: ['H2O', 'CO2', 'O2', 'N2'],
    correctAnswer: 0,
  },
];

const Quiz = () => {
  const { language } = useGlobalContext();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(14); // 14 giây cho mỗi câu hỏi
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult>({
    score: 0,
    total: quizData.length,
  });

  // Đồng hồ đếm ngược
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);
      setTimeLeft(14); // Reset thời gian cho câu hỏi tiếp theo

      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Tính điểm
        const score = newAnswers.reduce((acc, answer, index) => {
          return answer === quizData[index].correctAnswer ? acc + 1 : acc;
        }, 0);
        setResult({ score, total: quizData.length });
        setShowResult(true);
      }
    }
  };

  const handleSkipQuiz = () => {
    navigate('/');
  };

  const handleReviewVideo = () => {
    alert('Review video functionality to be implemented.');
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setTimeLeft(14);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Phần trên - Màu xanh */}
      <div className="bg-blue-600 text-white p-6">
        <div className="container mx-auto">
          {/* Tiến độ câu hỏi */}
          <div className="flex justify-center mb-6">
            {quizData.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    index === currentQuestion ? 'bg-red-500' : 'bg-white'
                  } border-2 border-white mx-1`}
                ></div>
                {index < quizData.length - 1 && (
                  <div className="w-8 h-1 bg-white mx-1"></div>
                )}
              </div>
            ))}
          </div>

          {/* Tiêu đề và câu hỏi */}
          {!showResult ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {translate('QUESTION')} {currentQuestion + 1}{' '}
                  {translate('OF')} {quizData.length}
                </h2>
                <div className="flex items-center space-x-2">
                  <Timer size={24} />
                  <span>{`00:${
                    timeLeft < 10 ? `0${timeLeft}` : timeLeft
                  }`}</span>
                </div>
              </div>
              <p className="text-lg mb-6">
                {quizData[currentQuestion].question}
              </p>

              {/* Nút điều hướng */}
              <div className="flex justify-between items-center">
                <button className="btn btn-sm btn-outline text-white">
                  {translate('CHOOSE_CORRECT_ANSWER') ||
                    'Choose the correct answer below'}
                </button>
                <div className="space-x-2">
                  <button
                    onClick={handleSkipQuiz}
                    className="btn btn-outline text-white"
                  >
                    {translate('SKIP_QUIZ') || 'Skip Quiz'}
                  </button>
                  <button
                    onClick={handleReviewVideo}
                    className="btn btn-outline text-white"
                  >
                    {translate('REVIEW_VIDEO') || 'Review Video'}
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="btn btn-error text-white"
                    disabled={selectedAnswer === null}
                  >
                    {translate('NEXT_QUESTION') || 'Next Question'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                {translate('QUIZ_RESULT') || 'Quiz Result'}
              </h2>
              <p className="text-lg mb-6">
                {translate('SCORE') || 'Score'}: {result.score}/{result.total}
              </p>
              <div className="space-x-4">
                <button
                  onClick={handleRestart}
                  className="btn btn-outline text-white"
                >
                  {translate('RESTART_QUIZ') || 'Restart Quiz'}
                </button>
                <Link to="/" className="btn btn-outline text-white">
                  {translate('BACK_TO_HOME') || 'Back to Home'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phần dưới - Màu trắng */}
      {!showResult && (
        <div className="bg-gray-50 p-6">
          <div className="container mx-auto">
            <h3 className="text-lg font-semibold mb-4">
              {translate('YOUR_ANSWER') || 'Your Answer:'}
            </h3>
            <div className="space-y-2">
              {quizData[currentQuestion].options.map((option, index) => (
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
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              {translate('NOTE') ||
                'Note: There can be multiple correct answers to this question.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
