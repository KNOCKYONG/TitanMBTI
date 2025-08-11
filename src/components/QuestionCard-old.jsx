import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ChevronLeft, ChevronRight, Swords } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  onBack,
  canGoBack 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (type, index) => {
    setSelectedOption(index);
    setIsTransitioning(true);
    
    setTimeout(() => {
      onAnswer(type);
      setSelectedOption(null);
      setIsTransitioning(false);
    }, 400);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={questionNumber}
        className="flex flex-col items-center justify-center min-h-screen px-4 py-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="max-w-4xl w-full mx-auto space-y-6">
          {/* Progress Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex justify-between items-center">
              <Badge variant="amber" className="text-sm">
                질문 {questionNumber} / {totalQuestions}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% 완료
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-secondary" />
          </motion.div>
          
          {/* Question Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="backdrop-blur-md bg-card/50 border-amber-900/20 shadow-2xl">
              <CardHeader className="text-center pb-8 pt-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                  className="mb-6"
                >
                  <Swords className="w-12 h-12 mx-auto text-amber-500/50" />
                </motion.div>
                
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold text-foreground"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {question.question}
                </motion.h2>
              </CardHeader>
              
              <CardContent className="pb-12">
                {/* 2-Choice Options - Always side by side */}
                <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {question.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ 
                        opacity: 0, 
                        x: index === 0 ? -50 : 50 
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 0
                      }}
                      transition={{ 
                        delay: 0.4 + index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      <Button
                        onClick={() => handleAnswer(option.type, index)}
                        disabled={isTransitioning}
                        variant={selectedOption === index ? "default" : "outline"}
                        className={`
                          w-full h-auto p-4 md:p-6 text-left justify-start
                          ${selectedOption === index 
                            ? 'bg-gradient-to-br from-amber-500 to-orange-600 border-amber-500 text-white' 
                            : 'hover:border-amber-500/50 hover:bg-amber-500/5'
                          }
                          transition-all duration-300 group relative overflow-hidden
                        `}
                      >
                        {/* Option Number Badge */}
                        <span className={`
                          absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${selectedOption === index 
                            ? 'bg-white/20 text-white' 
                            : 'bg-secondary text-muted-foreground group-hover:bg-amber-500/20 group-hover:text-amber-500'
                          }
                          transition-all duration-300
                        `}>
                          {index + 1}
                        </span>
                        
                        {/* Option Text */}
                        <span className={`
                          block pr-12 text-sm md:text-base lg:text-lg leading-relaxed
                          ${selectedOption === index 
                            ? 'text-white' 
                            : 'text-foreground'
                          }
                        `}>
                          {option.text}
                        </span>
                        
                        {/* Hover Effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-500"
                          initial={false}
                          whileHover={{ scale: 1.5, rotate: 45 }}
                          transition={{ duration: 0.8 }}
                        />
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                {/* Navigation */}
                {canGoBack && (
                  <motion.div 
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      onClick={onBack}
                      disabled={isTransitioning}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-amber-500"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      이전 질문으로
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Tip */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <ChevronRight className="w-4 h-4 animate-pulse" />
              직감적으로 끌리는 선택지를 고르세요
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionCard;