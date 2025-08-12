import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen.jsx';
import QuestionCard from './components/QuestionCard.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import WorldCup from './components/WorldCup.jsx';
import EgenTest from './components/EgenTest.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import SEOMetaTags from './components/SEOMetaTags.jsx';
import { questions } from './data/questions';
import { calculateMBTI } from './utils/calculateMBTI';
import { initKakao } from './utils/shareUtils';

function App() {
  const [gameState, setGameState] = useState('start'); // start, quiz, result, worldcup, egen
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [mbtiResult, setMbtiResult] = useState(null);


  // Kakao SDK 초기화
  useEffect(() => {
    // 디버깅: 모든 환경 변수 확인
    console.log('환경 변수 확인:', {
      mode: import.meta.env.MODE,
      allEnvKeys: Object.keys(import.meta.env),
      hasKakaoKey: !!import.meta.env.VITE_KAKAO_APP_KEY,
      kakaoKeyLength: import.meta.env.VITE_KAKAO_APP_KEY?.length || 0
    });

    // 환경 변수가 있을 경우에만 초기화
    const kakaoKey = import.meta.env.VITE_KAKAO_APP_KEY;
    if (kakaoKey) {
      console.log('Kakao SDK 초기화 중...', { keyLength: kakaoKey.length });
      
      // SDK 로드 확인 후 초기화
      if (window.Kakao) {
        initKakao(kakaoKey);
      } else {
        // SDK 로드 대기
        const checkKakaoSDK = setInterval(() => {
          if (window.Kakao) {
            console.log('Kakao SDK 로드 완료, 초기화 시작');
            initKakao(kakaoKey);
            clearInterval(checkKakaoSDK);
          }
        }, 100);
        
        // 5초 후 타임아웃
        setTimeout(() => {
          clearInterval(checkKakaoSDK);
          console.error('Kakao SDK 로드 타임아웃');
        }, 5000);
      }
    } else {
      console.warn('VITE_KAKAO_APP_KEY 환경 변수가 설정되지 않았습니다. Vercel 환경 변수를 확인하세요.');
    }
  }, []);

  // URL 파라미터 체크 (공유 링크 접근)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedResult = params.get('result');
    const worldcupMode = params.get('worldcup');
    const worldcupCharacter = params.get('character');
    
    if (sharedResult && sharedResult.length === 4) {
      setMbtiResult(sharedResult);
      setGameState('result');
    } else if (worldcupMode === 'winner' && worldcupCharacter) {
      // 월드컵 우승자 공유 링크로 접근한 경우
      setGameState('worldcup');
      // URL 파라미터 제거
      window.history.replaceState({}, '', '/');
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
    window.history.replaceState({}, '', '/');
  };

  const startWorldCup = () => {
    setGameState('worldcup');
  };

  const handleWorldCupBack = () => {
    // 결과 화면이 아닌 시작 화면으로 돌아가기
    setGameState('start');
  };

  const startEgenTest = () => {
    setGameState('egen');
  };

  const handleEgenBack = () => {
    setGameState('start');
  };


  return (
    <div className="min-h-screen">
        <SEOMetaTags />
        <LanguageSelector />
        
        {gameState === 'start' && (
          <StartScreen onStart={startQuiz} onWorldCup={startWorldCup} onEgenTest={startEgenTest} />
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
          <ResultScreen
            mbtiType={mbtiResult}
            onRestart={resetQuiz}
            onWorldCup={startWorldCup}
          />
        )}
        
        {gameState === 'worldcup' && (
          <WorldCup onBack={handleWorldCupBack} />
        )}
        
        {gameState === 'egen' && (
          <EgenTest onBack={handleEgenBack} />
        )}
    </div>
  );
}

export default App;