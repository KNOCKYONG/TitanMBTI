import { motion } from 'framer-motion';
import { FaPlay, FaQuestionCircle, FaUsers, FaClock, FaCheckCircle, FaShareAlt } from 'react-icons/fa';
import { GiSwordWound } from 'react-icons/gi';

const StartScreen = ({ onStart }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen px-4 py-6 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Titans - Removed for cleaner look */}
      
      {/* Wall Background - Removed for cleaner look */}
      
      <div className="max-w-md w-full mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div className="text-center mb-6" variants={itemVariants}>
          {/* Logo */}
          <motion.div 
            className="w-20 h-20 mx-auto mb-4 relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <GiSwordWound className="w-full h-full text-amber-500" />
          </motion.div>
          
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 text-xs"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="w-1.5 h-1.5 bg-amber-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <span className="text-amber-400 font-medium">성격 분석 테스트</span>
          </motion.div>
          
          {/* Main Title */}
          <h1 className="text-white mb-6">
            <span className="block text-2xl font-bold mb-1 text-amber-400">
              진격의 거인
            </span>
            <span className="block text-lg font-normal text-gray-300">
              MBTI 테스트
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm text-gray-400 max-w-xs mx-auto">
            당신의 성격과 가장 닮은<br/>
            진격의 거인 캐릭터를 찾아보세요
          </p>
        </div>
        
        {/* Card Section */}
        <div className="relative animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl"></div>
          
          {/* Card Content */}
          <div className="relative glass card-base p-4 md:p-6">
            {/* Floating Icons */}
            <div className="absolute -top-4 -right-4 w-12 h-12 text-amber-500/20 animate-pulse">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5z"/>
              </svg>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 text-red-500/20 animate-pulse" style={{ animationDelay: '1s' }}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5z"/>
              </svg>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-1 text-amber-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="text-lg font-semibold text-amber-400">12</div>
                <div className="text-xs text-gray-400">문항</div>
              </div>
              <div className="text-center border-x border-gray-700">
                <div className="w-8 h-8 mx-auto mb-1 text-amber-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div className="text-lg font-semibold text-amber-400">16</div>
                <div className="text-xs text-gray-400">캐릭터</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-1 text-amber-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="text-lg font-semibold text-amber-400">3</div>
                <div className="text-xs text-gray-400">분</div>
              </div>
            </div>
            
            {/* CTA Button */}
            <button
              onClick={onStart}
              className="w-full btn-base bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-base md:text-lg shadow-xl hover:shadow-2xl hover:shadow-amber-500/25 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                테스트 시작하기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
            
            {/* Trust Indicators */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100-2H6V7h5a1 1 0 011 1v5h2a1 1 0 110 2h-2a2 2 0 01-2-2V8a2 2 0 00-2-2H4z"/>
                  </svg>
                  무료
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  2-3분 소요
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                  공유 가능
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Text with Animation */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            벽 안의 당신은 어떤 캐릭터일까요?
          </p>
        </div>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/30 rounded-full animate-pulse"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StartScreen;