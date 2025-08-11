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
        </motion.div>
        
        {/* Card Section */}
        <motion.div className="relative" variants={itemVariants}>
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl"></div>
          
          {/* Card Content */}
          <motion.div 
            className="relative glass card-base p-4 md:p-6"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Features */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <FaQuestionCircle className="w-8 h-8 mx-auto mb-1 text-amber-400" />
                <div className="text-lg font-semibold text-amber-400">12</div>
                <div className="text-xs text-gray-400">문항</div>
              </motion.div>
              <motion.div 
                className="text-center border-x border-gray-700"
                whileHover={{ scale: 1.1 }}
              >
                <FaUsers className="w-8 h-8 mx-auto mb-1 text-amber-400" />
                <div className="text-lg font-semibold text-amber-400">16</div>
                <div className="text-xs text-gray-400">캐릭터</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <FaClock className="w-8 h-8 mx-auto mb-1 text-amber-400" />
                <div className="text-lg font-semibold text-amber-400">3</div>
                <div className="text-xs text-gray-400">분</div>
              </motion.div>
            </div>
            
            {/* CTA Button */}
            <motion.button
              onClick={onStart}
              className="w-full btn-base bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg hover:shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                테스트 시작하기
                <FaPlay className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </motion.button>
            
            {/* Trust Indicators */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaCheckCircle className="w-3 h-3" />
                  무료
                </motion.div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaClock className="w-3 h-3" />
                  2-3분 소요
                </motion.div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaShareAlt className="w-3 h-3" />
                  공유 가능
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom Text */}
        <motion.div 
          className="text-center mt-4"
          variants={itemVariants}
        >
          <p className="text-xs text-gray-500">
            벽 안의 당신은 어떤 캐릭터일까요?
          </p>
        </motion.div>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20
            }}
            animate={{ 
              y: -20,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default StartScreen;