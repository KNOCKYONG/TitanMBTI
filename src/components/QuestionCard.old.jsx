import ProgressBar from './ProgressBar.jsx';
import { useState } from 'react';

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
  // Removed flip animation state

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6">
      <div className="max-w-md w-full mx-auto">
        {/* Progress Section */}
        <div className="animate-fade-in">
          <ProgressBar current={questionNumber} total={totalQuestions} />
        </div>
        
        {/* Question Card */}
        <div className={`relative animate-scale-in ${isTransitioning ? 'opacity-50' : ''}`}>
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-xl"></div>
            
            {/* Card Content */}
            <div className="relative glass card-base p-4 md:p-6">
            {/* Question Section */}
            <div className="mb-6">
              {/* Question Number Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
                <span className="text-amber-400 text-xs font-medium">질문 {questionNumber}</span>
              </div>
              
              {/* Question Text */}
              <h3 className="text-base md:text-lg font-semibold text-white">
                {question.question}
              </h3>
            </div>
            
            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.type, index)}
                  disabled={isTransitioning}
                  className={`
                    w-full text-left p-4 rounded-xl border transition-all duration-300
                    ${selectedOption === index 
                      ? 'border-amber-500 bg-amber-500/10 scale-[0.98]' 
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50'
                    }
                    group relative overflow-hidden
                    ${!isTransitioning && 'hover:scale-[1.02] active:scale-[0.98]'}
                  `}
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
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0
                      ${selectedOption === index 
                        ? 'border-amber-500 bg-amber-500' 
                        : 'border-gray-600 group-hover:border-gray-500'
                      }
                    `}>
                      {selectedOption === index && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              ))}
            </div>
            
            {/* Navigation */}
            {canGoBack && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={onBack}
                  disabled={isTransitioning}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  이전 질문으로
                </button>
              </div>
            )}
            </div>
          </div>
        
        {/* Tip */}
        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">
            직감적으로 떠오르는 답을 선택해주세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;