import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Play, Users, Clock, HelpCircle, Sparkles, Award } from 'lucide-react';

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

  const features = [
    { icon: HelpCircle, value: "12", label: "문항", color: "text-amber-500" },
    { icon: Users, value: "16", label: "캐릭터", color: "text-orange-500" },
    { icon: Clock, value: "3", label: "분", color: "text-red-500" },
  ];

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-red-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl w-full mx-auto">
        {/* Hero Section */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          {/* Animated Logo */}
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-12 h-12 text-amber-500" />
          </motion.div>
          
          {/* Title Badge */}
          <motion.div 
            className="inline-block mb-6"
            variants={itemVariants}
          >
            <Badge variant="amber" className="px-4 py-1.5 text-sm">
              <Award className="w-3 h-3 mr-1" />
              MBTI 성격 테스트
            </Badge>
          </motion.div>
          
          {/* Main Title */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              진격의 거인
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            당신의 성격과 가장 닮은 진격의 거인 캐릭터를 찾아보세요
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-md bg-card/50 border-amber-900/20 shadow-2xl shadow-amber-500/10">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">당신은 어떤 캐릭터일까요?</CardTitle>
              <CardDescription className="text-base">
                12개의 간단한 질문으로 알아보는 나의 MBTI 유형
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-2 md:p-4 rounded-lg bg-secondary/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 ${feature.color}`} />
                    <div className="text-xl md:text-2xl font-bold text-foreground whitespace-nowrap">{feature.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">{feature.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={onStart}
                  size="lg"
                  variant="gradient"
                  className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Play className="mr-2 h-5 w-5" />
                  테스트 시작하기
                </Button>
              </motion.div>

              {/* Bottom Info */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  무료
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  2-3분 소요
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  공유 가능
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Text */}
        <motion.p 
          className="text-center mt-8 text-sm text-muted-foreground"
          variants={itemVariants}
        >
          벽 안의 당신은 어떤 캐릭터일까요?
        </motion.p>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: -20,
              x: Math.random() * window.innerWidth,
              scale: Math.random() * 0.5 + 0.5
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default StartScreen;