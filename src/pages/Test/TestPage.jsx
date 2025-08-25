import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StartScreen from '../../components/StartScreen.jsx';
import QuestionCard from '../../components/QuestionCard.jsx';
import ResultScreen from '../../components/ResultScreen.jsx';
import { questions } from '../../data/questions';
import { calculateMBTI } from '../../utils/calculateMBTI';

function TestPage() {
  const [gameState, setGameState] = useState('start'); // start, quiz, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [mbtiResult, setMbtiResult] = useState(null);
  const navigate = useNavigate();

  // URL 파라미터 체크 (공유 링크 접근)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedResult = params.get('result');
    
    if (sharedResult && sharedResult.length === 4) {
      setMbtiResult(sharedResult);
      setGameState('result');
    }
  }, []);

  const startQuiz = () => {
    setGameState('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 테스트 완료
      const result = calculateMBTI(newAnswers);
      setMbtiResult(result);
      setGameState('result');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const resetQuiz = () => {
    setGameState('start');
    setCurrentQuestion(0);
    setAnswers([]);
    setMbtiResult(null);
    window.history.replaceState({}, '', '/test');
  };

  const viewDetailedResult = () => {
    if (mbtiResult) {
      navigate(`/types/${mbtiResult.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen">
      {gameState === 'start' && (
        <StartScreen onStart={startQuiz} />
      )}
    
      {gameState === 'quiz' && (
        <QuestionCard
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
          canGoBack={currentQuestion > 0}
        />
      )}
      
      {gameState === 'result' && mbtiResult && (
        <div>
          <ResultScreen
            mbtiType={mbtiResult}
            onRestart={resetQuiz}
          />
          <div className="text-center mt-6">
            <button
              onClick={viewDetailedResult}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
            >
              상세 분석 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;