import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import ProgressBar from './ProgressBar.jsx';

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
    
    // Quick transition before moving to next question
    setTimeout(() => {
      onAnswer(type);
      setSelectedOption(null);
      setIsTransitioning(false);
    }, 400);
  };

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
        className="flex flex-col items-center justify-center min-h-screen px-4 py-6"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="max-w-2xl w-full mx-auto">
          {/* Progress Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ProgressBar current={questionNumber} total={totalQuestions} />
          </motion.div>
          
          {/* Question Card */}
          <motion.div 
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-3xl blur-2xl"></div>
            
            {/* Card Content */}
            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-amber-900/20 shadow-2xl">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-8">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{questionNumber}</span>
                  </div>
                  <div className="h-8 w-px bg-gradient-to-b from-amber-500/50 to-transparent"></div>
                  <span className="text-amber-400/80 text-sm font-medium">질문 {questionNumber} / {totalQuestions}</span>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
                >
                  <GiCrossedSwords className="w-8 h-8 text-amber-500/30" />
                </motion.div>
              </div>
              
              {/* Question Text */}
              <motion.h3 
                className="text-xl md:text-2xl font-bold text-white mb-10 text-center leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {question.question}
              </motion.h3>
              
              {/* 2-Choice Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option.type, index)}
                    disabled={isTransitioning}
                    className={`
                      relative p-6 rounded-2xl border-2 transition-all duration-300
                      ${selectedOption === index 
                        ? 'border-amber-500 bg-gradient-to-br from-amber-500/20 to-orange-500/20' 
                        : 'border-gray-700 bg-gray-800/50 hover:border-amber-600/50 hover:bg-gray-800/80'
                      }
                      group overflow-hidden
                    `}
                    initial={{ 
                      opacity: 0, 
                      x: index === 0 ? -50 : 50 
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      scale: selectedOption === index ? 0.98 : 1
                    }}
                    whileHover={{ 
                      scale: selectedOption === null ? 1.02 : 1,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                      delay: 0.4 + index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    {/* Option Number */}
                    <div className={`
                      absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${selectedOption === index 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-gray-700 text-gray-400 group-hover:bg-amber-600/20 group-hover:text-amber-400'
                      }
                      transition-all duration-300
                    `}>
                      {index + 1}
                    </div>
                    
                    {/* Option Text */}
                    <div className="pt-8">
                      <p className={`
                        text-sm md:text-base leading-relaxed
                        ${selectedOption === index 
                          ? 'text-amber-300' 
                          : 'text-gray-300 group-hover:text-white'
                        }
                        transition-colors duration-300
                      `}>
                        {option.text}
                      </p>
                    </div>
                    
                    {/* Selection Indicator */}
                    {selectedOption === index && (
                      <motion.div
                        className="absolute inset-0 border-2 border-amber-500 rounded-2xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-500 rounded-2xl" />
                  </motion.button>
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
                  <motion.button
                    onClick={onBack}
                    disabled={isTransitioning}
                    className="inline-flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-amber-400 text-sm font-medium transition-colors duration-200 group"
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    이전 질문으로
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Tip */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-xs text-gray-500">
              직감적으로 끌리는 선택지를 고르세요
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionCard;