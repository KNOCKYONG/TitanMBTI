import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full mb-6">
      {/* Progress Header */}
      <div className="flex justify-between items-center text-sm mb-3">
        <motion.span 
          className="text-gray-400 font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          진행 상황
        </motion.span>
        <motion.span 
          className="text-white font-semibold"
          key={current}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-amber-400">{current}</span>
          <span className="text-gray-500 mx-1">/</span>
          <span className="text-gray-400">{total}</span>
        </motion.span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Track */}
        <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
          {/* Progress Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Shine Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-100, 200] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "linear",
                repeatDelay: 3
              }}
            />
          </motion.div>
        </div>
        
        {/* Progress Dots */}
        <div className="absolute -top-1 left-0 w-full flex justify-between px-1">
          {[...Array(total)].map((_, index) => (
            <motion.div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index < current
                  ? 'bg-amber-500 shadow-lg shadow-amber-500/50'
                  : index === current
                  ? 'bg-orange-500 shadow-lg shadow-orange-500/50'
                  : 'bg-gray-700'
              }`}
              initial={{ scale: 0 }}
              animate={{ 
                scale: index < current ? 1 : index === current ? [1, 1.2, 1] : 0.75
              }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.3,
                repeat: index === current ? Infinity : 0,
                repeatType: "reverse",
                repeatDelay: 1
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Progress Text */}
      <motion.div 
        className="mt-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.p 
          className="text-xs text-gray-500"
          key={current}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {current === total ? '마지막 문항입니다!' : `${total - current}개 문항이 남았습니다`}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ProgressBar;