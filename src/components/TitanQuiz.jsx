import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Trophy, Crown, Target, ArrowLeft, RotateCcw, Share2,
  Copy, CheckCircle, XCircle, Sparkles, Award, TrendingUp,
  Timer, Brain, Zap, Star, StopCircle
} from 'lucide-react';
import { shareOnKakao } from '../utils/shareUtils';
import { 
  titanQuizQuestions, 
  shuffleQuestions, 
  saveRanking, 
  getRankings, 
  getTopScore,
  getUserRank 
} from '../data/titanQuizQuestions';

const TitanQuiz = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [score, setScore] = useState(0);
  const [rankings, setRankings] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [topScore, setTopScore] = useState(0);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // 퀴즈 초기화
  useEffect(() => {
    const shuffled = shuffleQuestions(titanQuizQuestions);
    setQuestions(shuffled);
    setTopScore(getTopScore());
    setRankings(getRankings());
  }, []);

  // 답변 선택 처리
  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null || isTransitioning) return;

    const isCorrect = answerIndex + 1 === questions[currentQuestion].correctAnswer;
    setSelectedAnswer(answerIndex);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // 피드백 표시 후 다음 문제로
    setTimeout(() => {
      setAnswers([...answers, { 
        questionId: questions[currentQuestion].id, 
        answer: answerIndex, 
        isCorrect 
      }]);

      if (currentQuestion < questions.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setIsTransitioning(false);
        }, 100);
      } else {
        // 퀴즈 완료
        finishQuiz();
      }
    }, 300);
  };

  // 퀴즈 완료 처리
  const finishQuiz = () => {
    const finalScore = score;
    const updatedRankings = saveRanking(finalScore);
    setRankings(updatedRankings);
    setUserRank(getUserRank(finalScore));
    setShowResult(true);
  };

  // 퀴즈 중단 처리
  const handleQuit = () => {
    setShowQuitConfirm(true);
  };

  // 중단 확인
  const confirmQuit = () => {
    // 현재까지의 점수로 결과 보여주기
    const finalScore = score;
    const updatedRankings = saveRanking(finalScore);
    setRankings(updatedRankings);
    setUserRank(getUserRank(finalScore));
    setShowResult(true);
    setShowQuitConfirm(false);
  };

  // 중단 취소
  const cancelQuit = () => {
    setShowQuitConfirm(false);
  };

  // 퀴즈 재시작
  const restartQuiz = () => {
    const shuffled = shuffleQuestions(titanQuizQuestions);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserRank(null);
    setIsTransitioning(false);
  };

  // 공유 링크 복사
  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}?titanquiz=true`;
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // 카카오톡 공유
  const handleKakaoShare = () => {
    const shareData = {
      title: `진격의 거인 퀴즈 도전 결과!`,
      description: `50문제 중 ${score}개 정답! 나는 진정한 조사병단인가? 당신도 도전해보세요!`,
      imageUrl: `${window.location.origin}/images/characters/ISFJ/profile.png`, // 히스토리아 이미지
      link: window.location.origin,
      buttonTitle: '퀴즈 도전하기',
      score: score,
      total: 50
    };
    shareOnKakao(shareData);
  };

  // 결과 화면
  if (showResult) {
    const totalAnswered = currentQuestion + (selectedAnswer !== null ? 1 : 0);
    const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
    const grade = 
      percentage >= 90 ? 'S' :
      percentage >= 80 ? 'A' :
      percentage >= 70 ? 'B' :
      percentage >= 60 ? 'C' : 'D';

    const gradeColors = {
      'S': 'from-yellow-400 to-yellow-600',
      'A': 'from-purple-400 to-purple-600',
      'B': 'from-blue-400 to-blue-600',
      'C': 'from-green-400 to-green-600',
      'D': 'from-gray-400 to-gray-600'
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-black p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-black/80 border-red-800">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mx-auto mb-4"
              >
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${gradeColors[grade]} flex items-center justify-center`}>
                  <span className="text-5xl font-bold text-white">{grade}</span>
                </div>
              </motion.div>
              <CardTitle className="text-3xl text-white mb-2">
                {t('titanQuiz.complete')}
              </CardTitle>
              <CardDescription className="text-xl text-gray-300">
                {t('titanQuiz.yourScore')}: {score} / {totalAnswered}
                {totalAnswered < 50 && (
                  <span className="block text-sm text-yellow-400 mt-1">
                    ({totalAnswered}문제 도전)
                  </span>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 점수 통계 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">{t('titanQuiz.accuracy')}</p>
                  <p className="text-2xl font-bold text-white">{percentage}%</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">{t('titanQuiz.ranking')}</p>
                  <p className="text-2xl font-bold text-white">#{userRank}</p>
                </div>
              </div>

              {/* 현재 1등 점수 */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    <span className="text-white font-semibold">{t('titanQuiz.topScore')}</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-400">
                    {topScore} / {questions.length}
                  </span>
                </div>
                {score >= topScore && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-yellow-300 text-sm mt-2 text-center"
                  >
                    🎉 {t('titanQuiz.newRecord')} 🎉
                  </motion.p>
                )}
              </div>

              {/* 랭킹 리스트 */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {t('titanQuiz.topRankings')}
                </h3>
                <div className="space-y-2">
                  {rankings.slice(0, 5).map((rank, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded ${
                        rank.timestamp === rankings[userRank - 1]?.timestamp 
                          ? 'bg-red-900/50 border border-red-600' 
                          : 'bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">#{index + 1}</span>
                        {index === 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <span className="text-white font-semibold">{rank.score}/{questions.length}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex gap-3">
                <Button
                  onClick={restartQuiz}
                  className="flex-1 bg-red-700 hover:bg-red-600 text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t('titanQuiz.retry')}
                </Button>
                <Button
                  onClick={() => setShowShareButtons(!showShareButtons)}
                  className="flex-1 bg-blue-700 hover:bg-blue-600 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t('titanQuiz.share')}
                </Button>
              </div>

              {/* 공유 버튼들 */}
              <AnimatePresence>
                {showShareButtons && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <Button
                      onClick={handleKakaoShare}
                      className="w-full bg-yellow-600 hover:bg-yellow-500 text-black"
                    >
                      {t('titanQuiz.shareKakao')}
                    </Button>
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      className="w-full border-gray-600 text-white hover:bg-gray-800"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copySuccess ? t('titanQuiz.copied') : t('titanQuiz.copyLink')}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                onClick={onBack}
                variant="ghost"
                className="w-full text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('titanQuiz.backToMain')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // 퀴즈 진행 화면
  const currentQ = questions[currentQuestion];
  if (!currentQ) return null;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-black p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Badge className="bg-red-900 text-white">
              {currentQuestion + 1} / {questions.length}
            </Badge>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-yellow-500" />
              <span className="text-white font-semibold">{score}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Progress value={progress} className="flex-1 h-2 bg-gray-800" />
            <Button
              onClick={handleQuit}
              size="sm"
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-900/50"
            >
              <StopCircle className="w-4 h-4 mr-1" />
              {t('titanQuiz.quit')}
            </Button>
          </div>
        </motion.div>

        {/* 질문 카드 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black/80 border-red-800">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-red-500" />
                  <Badge variant="outline" className="text-gray-400 border-gray-600">
                    {t(`titanQuiz.category.${currentQ.category}`)}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white">
                  {currentQ.question}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index + 1 === currentQ.correctAnswer;
                  const showFeedback = selectedAnswer !== null;

                  let buttonClass = "w-full justify-start text-left p-4 h-auto ";
                  
                  if (showFeedback) {
                    if (isCorrect) {
                      buttonClass += "bg-green-900 hover:bg-green-900 border-green-600";
                    } else if (isSelected && !isCorrect) {
                      buttonClass += "bg-red-900 hover:bg-red-900 border-red-600";
                    } else {
                      buttonClass += "bg-gray-800 hover:bg-gray-800 border-gray-700 opacity-50";
                    }
                  } else {
                    buttonClass += "bg-gray-800 hover:bg-gray-700 border-gray-600";
                  }

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        variant="outline"
                        className={buttonClass}
                      >
                        <span className="flex items-center justify-between w-full">
                          <span className="text-white">{index + 1}. {option}</span>
                          {showFeedback && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                          )}
                          {showFeedback && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-400 ml-2" />
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* 현재 1등 점수 표시 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 text-gray-400">
            <Crown className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">
              {t('titanQuiz.currentTop')}: <span className="text-yellow-400 font-semibold">{topScore}/{questions.length}</span>
            </span>
          </div>
        </motion.div>

        {/* 중단 확인 모달 */}
        <AnimatePresence>
          {showQuitConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              onClick={cancelQuit}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 border border-red-800 rounded-lg p-6 max-w-sm w-full"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {t('titanQuiz.quitConfirm')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('titanQuiz.quitMessage')}
                </p>
                <div className="bg-gray-800 rounded p-3 mb-4">
                  <p className="text-sm text-gray-400">{t('titanQuiz.currentProgress')}</p>
                  <p className="text-lg font-semibold text-white">
                    {score} / {currentQuestion + 1} {t('titanQuiz.correct')}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={confirmQuit}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <StopCircle className="w-4 h-4 mr-2" />
                    {t('titanQuiz.quitAndSee')}
                  </Button>
                  <Button
                    onClick={cancelQuit}
                    variant="outline"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-800"
                  >
                    {t('titanQuiz.continue')}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TitanQuiz;