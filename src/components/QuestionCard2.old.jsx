import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
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
    }, 300);
  };

  const containerVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, x: -50 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
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
        <div className="max-w-md w-full mx-auto">
          {/* Progress Section */}
          <motion.div variants={itemVariants}>
            <ProgressBar current={questionNumber} total={totalQuestions} />
          </motion.div>
          
          {/* Question Card */}
          <motion.div 
            className={`relative ${isTransitioning ? 'opacity-50' : ''}`}
            variants={itemVariants}
          >
            {/* Card Content */}
            <motion.div 
              className="relative glass card-base p-4 md:p-6 mt-6"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* Question Section */}
              <div className="mb-6">
                {/* Question Number Badge */}
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <span className="text-amber-400 text-xs font-medium">질문 {questionNumber}</span>
                </motion.div>
                
                {/* Question Text */}
                <motion.h3 
                  className="text-base md:text-lg font-semibold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {question.question}
                </motion.h3>
              </div>
              
              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option.type, index)}
                    disabled={isTransitioning}
                    className={`
                      w-full text-left p-4 rounded-xl border transition-all duration-300
                      ${selectedOption === index 
                        ? 'border-amber-500 bg-amber-500/10' 
                        : 'border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50'
                      }
                      group relative overflow-hidden
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Option Content */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className={`
                        text-sm font-normal pr-3
                        ${selectedOption === index ? 'text-amber-400' : 'text-gray-300 group-hover:text-white'}
                      `}>
                        {option.text}
                      </span>
                      
                      {/* Selection Indicator */}
                      <motion.div 
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0
                          ${selectedOption === index 
                            ? 'border-amber-500 bg-amber-500' 
                            : 'border-gray-600 group-hover:border-gray-500'
                          }
                        `}
                        whileHover={{ scale: 1.1 }}
                      >
                        {selectedOption === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <FaCheck className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                    
                    {/* Hover Gradient Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                ))}
              </div>
              
              {/* Navigation */}
              {canGoBack && (
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={onBack}
                    disabled={isTransitioning}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 group"
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaChevronLeft className="w-3 h-3" />
                    이전 질문으로
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          
          {/* Tip */}
          <motion.div 
            className="text-center mt-3"
            variants={itemVariants}
          >
            <p className="text-xs text-gray-500">
              직감적으로 떠오르는 답을 선택해주세요
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionCard;