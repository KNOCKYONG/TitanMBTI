import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Heart, Sparkles, Users, ArrowLeft, ArrowRight,
  Share2, Copy, Shield, Swords, Eye, Flame, Star, HeartHandshake
} from 'lucide-react';
import { shareOnKakao } from '../utils/shareUtils';

// 진격의 거인 작중 관계를 바탕으로 한 연애 스타일
const romanceStyles = {
  'eren-mikasa': {
    id: 'eren-mikasa',
    title: '에렌-미카사형',
    subtitle: '운명적 유대형',
    description: '깊은 유대감과 보호 본능이 강한 연애 스타일. 서로를 지키려는 마음이 크지만 때로는 그 마음을 표현하기 어려워합니다.',
    traits: ['헌신적', '보호 본능', '깊은 유대', '말보다 행동'],
    quote: '"나는 언제나 너를 지킬게"',
    compatibility: ['장-피크형', '아르민-애니형'],
    color: 'from-red-500 to-pink-600',
    icon: Shield
  },
  'levi-petra': {
    id: 'levi-petra',
    title: '리바이-페트라형',
    subtitle: '존경과 신뢰형',
    description: '서로를 깊이 신뢰하고 존경하는 관계. 겉으로는 차가워 보여도 내면에는 따뜻한 마음을 품고 있습니다.',
    traits: ['신뢰', '존경', '프로페셔널', '숨겨진 따뜻함'],
    quote: '"믿고 따라와"',
    compatibility: ['에르빈-리바이형', '한지-모블릿형'],
    color: 'from-gray-600 to-blue-600',
    icon: Eye
  },
  'ymir-historia': {
    id: 'ymir-historia',
    title: '유미르-히스토리아형',
    subtitle: '자유로운 사랑형',
    description: '진정한 자신을 보여주고 받아들이는 관계. 사회적 편견에 구애받지 않고 순수한 마음으로 사랑합니다.',
    traits: ['진정성', '자유로움', '희생정신', '순수한 사랑'],
    quote: '"내 삶을 너를 위해 살겠어"',
    compatibility: ['사샤-니콜로형', '에렌-미카사형'],
    color: 'from-purple-500 to-pink-500',
    icon: Heart
  },
  'jean-pieck': {
    id: 'jean-pieck',
    title: '장-피크형',
    subtitle: '성숙한 이해형',
    description: '서로의 입장을 이해하고 존중하는 성숙한 관계. 갈등 속에서도 상대를 이해하려 노력합니다.',
    traits: ['이해심', '성숙함', '존중', '대화 중시'],
    quote: '"우리는 서로를 이해할 수 있어"',
    compatibility: ['유미르-히스토리아형', '베르톨트-애니형'],
    color: 'from-amber-500 to-orange-600',
    icon: HeartHandshake
  },
  'armin-annie': {
    id: 'armin-annie',
    title: '아르민-애니형',
    subtitle: '지적 교감형',
    description: '대화와 이해를 통해 마음을 여는 관계. 서로의 내면을 깊이 이해하고 지적인 교감을 나눕니다.',
    traits: ['지적 교감', '인내심', '깊은 대화', '내면 이해'],
    quote: '"너의 진짜 모습을 보고 싶어"',
    compatibility: ['리바이-페트라형', '에렌-미카사형'],
    color: 'from-blue-500 to-indigo-600',
    icon: Users
  },
  'sasha-niccolo': {
    id: 'sasha-niccolo',
    title: '사샤-니콜로형',
    subtitle: '순수한 기쁨형',
    description: '일상의 작은 행복을 함께 나누는 관계. 서로에게 기쁨과 웃음을 선사하는 밝은 연애를 합니다.',
    traits: ['일상의 행복', '순수함', '기쁨 공유', '따뜻함'],
    quote: '"너와 함께하는 모든 순간이 행복해"',
    compatibility: ['유미르-히스토리아형', '한지-모블릿형'],
    color: 'from-yellow-500 to-pink-500',
    icon: Sparkles
  },
  'erwin-levi': {
    id: 'erwin-levi',
    title: '에르빈-리바이형',
    subtitle: '전우애형',
    description: '같은 목표를 향해 나아가는 동지적 관계. 말하지 않아도 서로를 이해하는 깊은 신뢰가 있습니다.',
    traits: ['동지애', '무언의 이해', '신념 공유', '절대적 신뢰'],
    quote: '"끝까지 함께 가자"',
    compatibility: ['리바이-페트라형', '베르톨트-애니형'],
    color: 'from-indigo-600 to-purple-600',
    icon: Swords
  },
  'bertholdt-annie': {
    id: 'bertholdt-annie',
    title: '베르톨트-애니형',
    subtitle: '조용한 헌신형',
    description: '말없이 상대를 지켜보고 응원하는 관계. 겉으로 드러내지 않지만 깊은 마음을 품고 있습니다.',
    traits: ['조용한 헌신', '인내', '숨겨진 감정', '묵묵한 지원'],
    quote: '"말하지 못해도 내 마음은 변하지 않아"',
    compatibility: ['장-피크형', '에르빈-리바이형'],
    color: 'from-gray-500 to-green-600',
    icon: Eye
  },
  'hange-moblit': {
    id: 'hange-moblit',
    title: '한지-모블릿형',
    subtitle: '열정 서포트형',
    description: '한 사람의 열정을 다른 사람이 뒷받침하는 관계. 서로의 장단점을 완벽하게 보완합니다.',
    traits: ['상호보완', '서포트', '열정 공유', '균형'],
    quote: '"네가 날개를 펼칠 수 있도록 도울게"',
    compatibility: ['사샤-니콜로형', '리바이-페트라형'],
    color: 'from-green-500 to-teal-600',
    icon: Flame
  }
};

// 질문 데이터
const romanceQuestions = [
  {
    id: 1,
    question: '연애에서 가장 중요하게 생각하는 것은?',
    options: [
      { text: '서로를 지키고 보호하는 것', style: 'eren-mikasa' },
      { text: '깊은 신뢰와 존경', style: 'levi-petra' },
      { text: '진정한 자신을 보여주는 것', style: 'ymir-historia' },
      { text: '일상의 작은 행복 공유', style: 'sasha-niccolo' }
    ]
  },
  {
    id: 2,
    question: '갈등이 생겼을 때 당신의 해결 방식은?',
    options: [
      { text: '행동으로 마음을 증명한다', style: 'eren-mikasa' },
      { text: '차분하게 대화로 해결한다', style: 'armin-annie' },
      { text: '서로의 입장을 이해하려 노력한다', style: 'jean-pieck' },
      { text: '시간을 두고 조용히 기다린다', style: 'bertholdt-annie' }
    ]
  },
  {
    id: 3,
    question: '이상적인 데이트는?',
    options: [
      { text: '함께 목표를 향해 노력하는 활동', style: 'erwin-levi' },
      { text: '맛있는 음식을 함께 즐기기', style: 'sasha-niccolo' },
      { text: '깊은 대화를 나누는 조용한 시간', style: 'armin-annie' },
      { text: '서로의 취미를 함께 즐기기', style: 'hange-moblit' }
    ]
  },
  {
    id: 4,
    question: '사랑을 표현하는 당신의 방식은?',
    options: [
      { text: '보호하고 지켜주는 행동', style: 'eren-mikasa' },
      { text: '믿음직한 모습으로 곁에 있기', style: 'levi-petra' },
      { text: '모든 것을 바칠 수 있는 헌신', style: 'ymir-historia' },
      { text: '말없이 뒤에서 응원하기', style: 'bertholdt-annie' }
    ]
  },
  {
    id: 5,
    question: '연인과의 관계에서 추구하는 것은?',
    options: [
      { text: '운명적인 유대감', style: 'eren-mikasa' },
      { text: '서로를 성장시키는 관계', style: 'jean-pieck' },
      { text: '같은 목표를 향한 동행', style: 'erwin-levi' },
      { text: '편안하고 자유로운 관계', style: 'ymir-historia' }
    ]
  },
  {
    id: 6,
    question: '연인의 어떤 모습에 끌리나요?',
    options: [
      { text: '강인하고 의지가 확고한 모습', style: 'eren-mikasa' },
      { text: '프로페셔널하고 능력 있는 모습', style: 'levi-petra' },
      { text: '순수하고 밝은 에너지', style: 'sasha-niccolo' },
      { text: '열정적이고 독특한 개성', style: 'hange-moblit' }
    ]
  },
  {
    id: 7,
    question: '장거리 연애나 어려운 상황에서는?',
    options: [
      { text: '끝까지 기다리고 지킨다', style: 'eren-mikasa' },
      { text: '인내심을 갖고 이해하려 노력한다', style: 'armin-annie' },
      { text: '상황을 받아들이고 최선을 다한다', style: 'jean-pieck' },
      { text: '조용히 마음속으로 응원한다', style: 'bertholdt-annie' }
    ]
  },
  {
    id: 8,
    question: '연애에서 가장 행복한 순간은?',
    options: [
      { text: '서로를 지켜낸 순간', style: 'eren-mikasa' },
      { text: '깊은 신뢰를 확인한 순간', style: 'levi-petra' },
      { text: '진심을 알아준 순간', style: 'ymir-historia' },
      { text: '함께 웃고 즐거운 순간', style: 'sasha-niccolo' }
    ]
  },
  {
    id: 9,
    question: '이별의 순간이 온다면?',
    options: [
      { text: '끝까지 붙잡으려 노력한다', style: 'eren-mikasa' },
      { text: '상대의 선택을 존중한다', style: 'jean-pieck' },
      { text: '내 모든 것을 바쳐서라도 지킨다', style: 'ymir-historia' },
      { text: '조용히 받아들이고 기억한다', style: 'bertholdt-annie' }
    ]
  },
  {
    id: 10,
    question: '당신이 추구하는 사랑의 형태는?',
    options: [
      { text: '운명적이고 절대적인 사랑', style: 'eren-mikasa' },
      { text: '신뢰와 존경이 바탕인 사랑', style: 'levi-petra' },
      { text: '자유롭고 진정한 사랑', style: 'ymir-historia' },
      { text: '함께 성장하는 사랑', style: 'armin-annie' }
    ]
  }
];

const RomanceStyleTest = ({ onBack }) => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // URL 파라미터 체크 (공유 링크)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedStyle = params.get('romance');
    
    if (sharedStyle && romanceStyles[sharedStyle]) {
      setResult(romanceStyles[sharedStyle]);
      setShowResult(true);
      // URL 파라미터 제거
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handleAnswer = (style) => {
    const newAnswers = { ...answers };
    newAnswers[style] = (newAnswers[style] || 0) + 1;
    setAnswers(newAnswers);

    if (currentQuestion < romanceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers) => {
    // 가장 많이 선택된 스타일 찾기
    let maxCount = 0;
    let resultStyle = 'eren-mikasa';
    
    Object.entries(allAnswers).forEach(([style, count]) => {
      if (count > maxCount) {
        maxCount = count;
        resultStyle = style;
      }
    });
    
    setResult(romanceStyles[resultStyle]);
    setTimeout(() => setShowResult(true), 500);
  };

  const handleBack = () => {
    if (currentQuestion > 0 && !result) {
      setCurrentQuestion(currentQuestion - 1);
      // Remove last answer
      const styles = Object.keys(answers);
      if (styles.length > 0) {
        const lastStyle = styles[styles.length - 1];
        const newAnswers = { ...answers };
        newAnswers[lastStyle]--;
        if (newAnswers[lastStyle] === 0) {
          delete newAnswers[lastStyle];
        }
        setAnswers(newAnswers);
      }
    } else {
      onBack();
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowResult(false);
  };

  const handleKakaoShare = () => {
    if (!result) return;

    const shareUrl = `${window.location.origin}?romance=${result.id}`;
    
    shareOnKakao({
      title: `나의 진격의 거인 연애 스타일은 ${result.title}!`,
      description: result.description,
      imageUrl: `${window.location.origin}/images/romance-share.jpg`,
      buttonTitle: '나도 테스트하기',
      link: shareUrl
    });
  };

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}?romance=${result.id}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      // 복사 완료 피드백
      const button = document.querySelector('.copy-button');
      if (button) {
        button.textContent = '복사 완료!';
        setTimeout(() => {
          button.textContent = '링크 복사';
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (result && showResult) {
    const IconComponent = result.icon;
    
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${result.color}`}>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Result Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="glass border-white/20">
              <CardContent className="p-8">
                {/* Title */}
                <div className="text-center mb-8">
                  <Badge className={`bg-gradient-to-r ${result.color} text-white px-6 py-3 text-lg font-bold mb-4`}>
                    {result.subtitle}
                  </Badge>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {result.title}
                  </h1>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center`}>
                    <IconComponent className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-white/90 text-center mb-8 leading-relaxed">
                  {result.description}
                </p>

                {/* Quote */}
                <div className="text-center mb-8 p-4 bg-white/10 rounded-lg">
                  <p className="text-xl italic text-white">
                    {result.quote}
                  </p>
                </div>

                {/* Traits */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 text-center">
                    연애 스타일 특징
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {result.traits.map((trait, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-white/20 border-white/30 text-white px-4 py-2"
                      >
                        <Star className="w-4 h-4 mr-1" />
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Compatibility */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 text-center">
                    잘 맞는 연애 스타일
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {result.compatibility.map((compat, index) => (
                      <Badge
                        key={index}
                        className="bg-white/10 border-white/20 text-white"
                      >
                        {compat}
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
                      className="copy-button border-white/30 hover:bg-white/10 text-white"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      링크 복사
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleRestart}
                    className={`flex-1 bg-gradient-to-r ${result.color}`}
                  >
                    다시 테스트하기
                  </Button>
                  <Button
                    onClick={onBack}
                    variant="outline"
                    className="flex-1 border-white/30 hover:bg-white/10 text-white"
                  >
                    메인으로
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900 via-red-800 to-pink-900">
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
          <Badge className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-500/30 px-6 py-2 mb-4">
            <Heart className="w-4 h-4 mr-2 text-rose-400" />
            <span className="text-rose-300 font-medium">작중 관계 기반 분석</span>
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            진격의 거인 연애 스타일 테스트
          </h1>
          <p className="text-gray-300">에렌-미카사부터 유미르-히스토리아까지</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result && (
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
                  <span>질문 {currentQuestion + 1}/{romanceQuestions.length}</span>
                  <span>{Math.round((currentQuestion + 1) / romanceQuestions.length * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / romanceQuestions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <Card className="glass border-rose-500/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    {romanceQuestions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {romanceQuestions[currentQuestion].options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleAnswer(option.style)}
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-4 border-gray-600 hover:bg-rose-500/10 hover:border-rose-500/50"
                      >
                        <Heart className="w-5 h-5 mr-3 text-rose-400" />
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

          {result && !showResult && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="glass border-rose-500/20">
                <CardContent className="py-20 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Heart className="w-16 h-16 mx-auto text-rose-400 mb-4" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white">연애 스타일 분석 중...</h2>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RomanceStyleTest;