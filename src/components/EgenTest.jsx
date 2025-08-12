import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Heart, Sparkles, TrendingUp, Users, ArrowLeft, ArrowRight,
  Share2, Copy, CheckCircle, User, ChevronRight, Star
} from 'lucide-react';
import { shareOnKakao } from '../utils/shareUtils';
import { characters } from '../data/characters';

// 에겐남/테토녀 테스트 결과 매핑
const egenResults = {
  'male': {
    'egen': {
      character: 'ENTJ', // 에렌 예거
      type: 'egen',
      title: '에겐남',
      description: '열정적이고 직진하는 연애 스타일! 사랑에 올인하는 당신은 진격의 거인의 에렌과 같은 타입입니다.',
      traits: ['열정적', '직진', '헌신적', '솔직함']
    },
    'teto': {
      character: 'ISTP', // 리바이 아커만
      type: 'teto',
      title: '테토남',
      description: '쿨하고 독립적인 연애 스타일! 자신만의 페이스를 지키는 당신은 리바이와 같은 타입입니다.',
      traits: ['독립적', '침착함', '신중함', '프로페셔널']
    }
  },
  'female': {
    'egen': {
      character: 'INFP', // 히스토리아 레이스
      type: 'egen',
      title: '에겐녀',
      description: '순수하고 헌신적인 연애 스타일! 진심을 다해 사랑하는 당신은 히스토리아와 같은 타입입니다.',
      traits: ['순수함', '헌신적', '진실함', '따뜻함']
    },
    'teto': {
      character: 'ISTP', // 애니 레온하트 (ISFP에서 변경)
      type: 'teto',
      title: '테토녀',
      description: '독립적이고 신비로운 연애 스타일! 자신만의 매력을 가진 당신은 애니와 같은 타입입니다.',
      traits: ['독립적', '신비로움', '강인함', '매력적']
    }
  }
};

// 질문 데이터
const egenQuestions = [
  {
    id: 1,
    question: '연인과의 데이트 스타일은?',
    options: [
      { text: '계획적이고 특별한 이벤트를 준비한다', score: 'egen' },
      { text: '자연스럽고 편안한 시간을 보낸다', score: 'teto' }
    ]
  },
  {
    id: 2,
    question: '연인에게 감정 표현을 할 때',
    options: [
      { text: '적극적으로 사랑을 표현한다', score: 'egen' },
      { text: '행동으로 조용히 보여준다', score: 'teto' }
    ]
  },
  {
    id: 3,
    question: '연인과 갈등이 생겼을 때',
    options: [
      { text: '즉시 해결하려고 대화를 시도한다', score: 'egen' },
      { text: '시간을 두고 차분히 생각한다', score: 'teto' }
    ]
  },
  {
    id: 4,
    question: '이상적인 연애 관계는?',
    options: [
      { text: '서로에게 올인하는 열정적인 관계', score: 'egen' },
      { text: '독립적이면서도 신뢰하는 관계', score: 'teto' }
    ]
  },
  {
    id: 5,
    question: '연인의 친구들을 만날 때',
    options: [
      { text: '적극적으로 친해지려고 노력한다', score: 'egen' },
      { text: '자연스럽게 거리를 유지한다', score: 'teto' }
    ]
  },
  {
    id: 6,
    question: '기념일을 챙기는 스타일은?',
    options: [
      { text: '모든 기념일을 특별하게 챙긴다', score: 'egen' },
      { text: '중요한 날만 심플하게 챙긴다', score: 'teto' }
    ]
  },
  {
    id: 7,
    question: '연인과의 미래 계획은?',
    options: [
      { text: '구체적인 계획을 함께 세운다', score: 'egen' },
      { text: '자연스럽게 흘러가는 대로 둔다', score: 'teto' }
    ]
  }
];

const EgenTest = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState('gender'); // gender, questions, result
  const [gender, setGender] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // URL 파라미터 체크 (공유 링크)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedType = params.get('egen');
    const sharedGender = params.get('gender');
    
    if (sharedType && sharedGender && egenResults[sharedGender]?.[sharedType]) {
      setGender(sharedGender);
      setResult(egenResults[sharedGender][sharedType]);
      setStep('result');
      setShowResult(true);
      // URL 파라미터 제거
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setStep('questions');
  };

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < egenQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 결과 계산
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers) => {
    const egenCount = allAnswers.filter(a => a === 'egen').length;
    const tetoCount = allAnswers.filter(a => a === 'teto').length;
    
    const resultType = egenCount > tetoCount ? 'egen' : 'teto';
    const finalResult = egenResults[gender][resultType];
    
    setResult(finalResult);
    setStep('result');
    setTimeout(() => setShowResult(true), 500);
  };

  const handleBack = () => {
    if (step === 'questions' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    } else if (step === 'questions' && currentQuestion === 0) {
      setStep('gender');
      setAnswers([]);
    } else if (step === 'gender' || step === 'result') {
      onBack();
    }
  };

  const handleRestart = () => {
    setStep('gender');
    setGender(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowResult(false);
  };

  const handleKakaoShare = () => {
    if (!result) return;

    const character = characters[result.character];
    const shareUrl = `${window.location.origin}?egen=${result.type}&gender=${gender}`;
    
    shareOnKakao({
      title: `나는 ${result.title}! ${character.name} 타입`,
      description: result.description,
      imageUrl: `${window.location.origin}${character.image}`,
      buttonTitle: '나도 테스트하기',
      link: shareUrl
    });
  };

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}?egen=${result.type}&gender=${gender}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      // 복사 완료 피드백
      const button = document.querySelector('.copy-button');
      if (button) {
        button.textContent = t('shareButtons.copySuccess');
        setTimeout(() => {
          button.textContent = t('shareButtons.copyLink');
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-800 to-indigo-900">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30 px-6 py-2 mb-4">
            <TrendingUp className="w-4 h-4 mr-2 text-pink-400" />
            <span className="text-pink-300 font-medium">2025년 최신 트렌드</span>
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            에겐남 테토녀 테스트
          </h1>
          <p className="text-gray-300">진격의 거인 캐릭터로 알아보는 연애 스타일</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Gender Selection */}
          {step === 'gender' && (
            <motion.div
              key="gender"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="glass border-pink-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white text-center">
                    당신의 성별을 선택해주세요
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-center">
                    성별에 따라 다른 결과를 보여드립니다
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => handleGenderSelect('male')}
                      className="w-full h-24 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    >
                      <User className="w-8 h-8 mr-3" />
                      <span className="text-xl">남성</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => handleGenderSelect('female')}
                      className="w-full h-24 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      <User className="w-8 h-8 mr-3" />
                      <span className="text-xl">여성</span>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>

              <Button
                onClick={handleBack}
                variant="ghost"
                className="mt-4 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </motion.div>
          )}

          {/* Questions */}
          {step === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>질문 {currentQuestion + 1}/{egenQuestions.length}</span>
                  <span>{Math.round((currentQuestion + 1) / egenQuestions.length * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / egenQuestions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <Card className="glass border-pink-500/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    {egenQuestions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {egenQuestions[currentQuestion].options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleAnswer(option.score)}
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-4 border-gray-600 hover:bg-pink-500/10 hover:border-pink-500/50"
                      >
                        <ChevronRight className="w-5 h-5 mr-3 text-pink-400" />
                        <span className="text-white">{option.text}</span>
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Button
                onClick={handleBack}
                variant="ghost"
                className="mt-4 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                이전
              </Button>
            </motion.div>
          )}

          {/* Result */}
          {step === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto"
            >
              {!showResult ? (
                <Card className="glass border-pink-500/20">
                  <CardContent className="py-20 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-16 h-16 mx-auto text-pink-400 mb-4" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white">분석 중...</h2>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Result Card */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="glass border-pink-500/20 mb-6">
                      <CardContent className="p-8">
                        {/* Result Badge */}
                        <div className="text-center mb-6">
                          <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 text-lg font-bold">
                            {result.title}
                          </Badge>
                        </div>

                        {/* Character Info */}
                        <div className="text-center mb-8">
                          <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                            <img 
                              src={characters[result.character].image} 
                              alt={characters[result.character].name}
                              className="w-36 h-36 rounded-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div class="text-6xl">👤</div>';
                              }}
                            />
                          </div>
                          <h2 className="text-3xl font-bold text-white mb-2">
                            {characters[result.character].name}
                          </h2>
                          <p className="text-gray-300 text-lg mb-4">
                            {result.description}
                          </p>
                        </div>

                        {/* Traits */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-white mb-4 text-center">
                            당신의 연애 스타일
                          </h3>
                          <div className="flex flex-wrap justify-center gap-2">
                            {result.traits.map((trait, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-pink-500/20 border-pink-500/30 text-pink-300 px-4 py-2"
                              >
                                <Star className="w-4 h-4 mr-1" />
                                {trait}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Share Buttons */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-white text-center mb-3">
                            결과 공유하기
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              onClick={handleKakaoShare}
                              className="bg-yellow-400 hover:bg-yellow-500 text-black"
                            >
                              <Share2 className="w-4 h-4 mr-2" />
                              카카오톡
                            </Button>
                            <Button
                              onClick={handleCopyLink}
                              variant="outline"
                              className="copy-button border-gray-600 hover:bg-white/10"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              링크 복사
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleRestart}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      다시 테스트하기
                    </Button>
                    <Button
                      onClick={onBack}
                      variant="outline"
                      className="flex-1 border-gray-600 hover:bg-white/10"
                    >
                      메인으로
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EgenTest;