import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { FaChevronLeft, FaHashtag, FaStar, FaCheckCircle } from 'react-icons/fa';

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  onBack,
  canGoBack 
}) => {
  const { t, i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 질문이 변경될 때마다 상태 초기화
  useEffect(() => {
    setSelectedOption(null);
    setIsTransitioning(false);
  }, [questionNumber]);

  const handleAnswer = (type, index) => {
    if (isTransitioning) return; // 이미 전환 중이면 무시
    
    setSelectedOption(index);
    setIsTransitioning(true);
    
    // 모바일에서 버튼 포커스 제거
    if (document.activeElement) {
      document.activeElement.blur();
    }
    
    // 애니메이션 없이 바로 전환
    requestAnimationFrame(() => {
      onAnswer(type);
    });
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden flex items-center"
      initial={false}
      animate={{ opacity: 1 }}
    >
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
        </div>

        {/* Static Background Orbs - 애니메이션 제거로 성능 향상 */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Section */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              className="mb-8"
            >
              {/* Progress Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-amber-500/20 border-amber-500/30 px-4 py-1.5">
                    <FaHashtag className="w-3 h-3 mr-1 text-amber-400" />
                    <span className="text-amber-300 font-medium">{questionNumber} / {totalQuestions}</span>
                  </Badge>
                  <span className="text-gray-400 text-sm">{t('questionCard.progress.step')}</span>
                </div>
                
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                >
                  <span className="text-sm font-medium text-amber-400">{Math.round(progress)}%</span>
                  <span className="text-xs text-gray-500">{t('questionCard.progress.complete')}</span>
                </motion.div>
              </div>

              {/* Premium Progress Bar */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-xl" />
                <Progress 
                  value={progress} 
                  className="h-3 bg-gray-800/50 border border-gray-700/50 relative [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-orange-600" 
                />
              </div>
            </motion.div>
            
            {/* Main Question Card */}
            <motion.div 
              key={questionNumber}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="glass border-gray-700/50 shadow-2xl overflow-hidden relative">
                {/* Card Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-3xl" />
                
                {/* Question Header */}
                <div className="relative z-10 p-6 md:p-8 text-center border-b border-gray-800/50">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                    className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20"
                  >
                    <FaStar className="w-8 h-8 text-amber-400" />
                  </motion.div>
                  
                  <motion.h2 
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {t(`questions.q${question.id}.question`)}
                  </motion.h2>
                </div>
                
                <CardContent className="p-6 md:p-8">
                  {/* Options - Always Two Column Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
                    {question.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ 
                          opacity: 0, 
                          x: index === 0 ? -50 : 50,
                          scale: 0.9
                        }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          scale: 1
                        }}
                        transition={{ 
                          delay: 0.1 + index * 0.05,
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                      >
                        <Button
                          onClick={() => handleAnswer(option.type, index)}
                          disabled={isTransitioning}
                          variant="outline"
                          className={`
                            w-full min-h-[100px] md:min-h-[120px] p-5 md:p-8 text-left relative overflow-visible group flex items-center
                            border-gray-700/50 hover:border-amber-500/30 hover:bg-gray-800/50
                            transition-all duration-300 transform hover:scale-[1.02]
                            focus:outline-none focus:ring-0 active:scale-[0.98]
                          `}
                        >
                          {/* Left Border Accent */}
                          <div className={`
                            absolute left-0 top-0 bottom-0 w-1 rounded-l-lg transition-all duration-300
                            ${selectedOption === index 
                              ? 'bg-amber-500' 
                              : 'bg-transparent group-hover:bg-amber-500/50'
                            }
                          `} />
                          
                          {/* Option Content */}
                          <div className="relative z-10 flex-1">
                            <span className={`
                              block text-sm md:text-base leading-relaxed
                              text-gray-300 group-hover:text-white
                              transition-colors duration-300
                            `}>
                              {t(`questions.q${question.id}.option${index + 1}`)}
                            </span>
                          </div>
                          
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Navigation */}
                  <motion.div 
                    className="mt-12 flex justify-between items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {/* Back Button */}
                    <div>
                      {canGoBack ? (
                        <Button
                          onClick={onBack}
                          disabled={isTransitioning}
                          variant="ghost"
                          className="text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                        >
                          <FaChevronLeft className="w-5 h-5 mr-2" />
                          {t('questionCard.navigation.previous')}
                        </Button>
                      ) : (
                        <div className="w-24" /> // Spacer
                      )}
                    </div>

                    <div className="w-24" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
    </motion.div>
  );
};

export default QuestionCard;