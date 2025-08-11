const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full mb-8">
      {/* Progress Header */}
      <div className="flex justify-between items-center text-sm mb-3">
        <span className="text-gray-400 font-medium">진행 상황</span>
        <span className="text-white font-semibold">
          <span className="text-amber-400">{current}</span>
          <span className="text-gray-500 mx-1">/</span>
          <span className="text-gray-400">{total}</span>
        </span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Track */}
        <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
          {/* Progress Fill */}
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${percentage}%` }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        {/* Progress Dots */}
        <div className="absolute -top-1 left-0 w-full flex justify-between px-1">
          {[...Array(total)].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index < current
                  ? 'bg-amber-500 scale-100 shadow-lg shadow-amber-500/50'
                  : index === current
                  ? 'bg-orange-500 scale-110 shadow-lg shadow-orange-500/50 animate-pulse'
                  : 'bg-gray-700 scale-75'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Progress Text */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          {current === total ? '마지막 문항입니다!' : `${total - current}개 문항이 남았습니다`}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;