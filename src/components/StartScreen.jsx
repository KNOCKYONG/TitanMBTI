import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
<<<<<<< HEAD
  FaPlay, FaUsers, FaClock, FaStar, FaArrowRight, FaBolt, FaShieldAlt, FaAward,
  FaChartLine, FaBullseye, FaHeart 
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
=======
  Play, Users, Clock, Star, ArrowRight, Zap, Shield, Award,
  TrendingUp, Target, Heart, Sparkles, Swords, Brain 
} from 'lucide-react';
>>>>>>> fbe4959b5491671c7c8ab56eabf5ac9f9c92a091

const StartScreen = ({ onStart, onWorldCup, onEgenTest, onRomanceTest, onTitanQuiz }) => {
  const { t } = useTranslation();
  
  const stats = [
    { value: "100K+", label: t('startScreen.stats.participants'), icon: FaUsers },
    { value: "97%", label: t('startScreen.stats.satisfaction'), icon: FaHeart },
    { value: "3min", label: t('startScreen.stats.duration'), icon: FaClock },
    { value: "4.9", label: t('startScreen.stats.rating'), icon: FaStar }
  ];

  const features = [
    {
      icon: FaBullseye,
      title: t('startScreen.features.accurate.title'),
      description: t('startScreen.features.accurate.description')
    },
    {
      icon: FaBolt,
      title: t('startScreen.features.fast.title'),
      description: t('startScreen.features.fast.description')
    },
    {
      icon: FaShieldAlt,
      title: t('startScreen.features.privacy.title'),
      description: t('startScreen.features.privacy.description')
    }
  ];

  const testimonials = [
    {
      name: t('startScreen.testimonials.student.name'),
      role: t('startScreen.testimonials.student.role'),
      content: t('startScreen.testimonials.student.content'),
      rating: 5
    },
    {
      name: t('startScreen.testimonials.worker.name'),
      role: t('startScreen.testimonials.worker.role'),
      content: t('startScreen.testimonials.worker.content'),
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Top Badge */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 px-6 py-2">
<<<<<<< HEAD
                <HiSparkles className="w-4 h-4 mr-2 text-amber-400" />
                <span className="text-amber-300 font-medium">{t('startScreen.badge')}</span>
=======
                <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                <span className="text-amber-300 font-medium">{t('startScreen.yearBadge')}</span>
>>>>>>> fbe4959b5491671c7c8ab56eabf5ac9f9c92a091
              </Badge>
            </motion.div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">{t('startScreen.mainTitle.line1')}</span>
                  <br />
                  <span className="text-amber-400">{t('startScreen.mainTitle.line2')}</span>
                  <br />
                  <span className="text-white">{t('startScreen.mainTitle.line3')}</span>
                </h1>

                <div className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed space-y-1">
                  <p>{t('startScreen.mainDescription.line1')}</p>
                  <p>{t('startScreen.mainDescription.line2')}</p>
                </div>

                {/* CTA Buttons - Grid layout for buttons */}
                <div className="grid gap-4 justify-center lg:justify-start">
                  {/* Titan Quiz Button - PRIMARY POSITION */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <div className="absolute -top-2 -right-2 z-10">
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1">
                        <Sparkles className="w-3 h-3 mr-1" />
                        NEW
                      </Badge>
                    </div>
                    <Button 
                      onClick={onTitanQuiz}
                      size="lg"
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-5 text-lg font-bold shadow-2xl shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 group"
                    >
<<<<<<< HEAD
                      <FaPlay className="mr-2 h-5 w-5" />
                      {t('startScreen.buttons.start')}
                      <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
=======
                      <Brain className="h-6 w-6 mr-2" />
                      <span>{t('startScreen.buttons.titanquiz')}</span>
                      <span className="ml-2 text-sm opacity-90">{t('startScreen.buttons.quizQuestions')}</span>
>>>>>>> fbe4959b5491671c7c8ab56eabf5ac9f9c92a091
                    </Button>
                  </motion.div>

                  {/* Second Row - 2 columns */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* MBTI Test Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={onStart}
                        size="lg"
                        className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-4 text-sm font-semibold shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 group"
                      >
                        <div className="flex flex-col items-center">
                          <Play className="h-5 w-5 mb-1" />
                          <span>{t('startScreen.buttons.start')}</span>
                        </div>
                      </Button>
                    </motion.div>
                    
                    {/* Romance Style Test Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={onRomanceTest}
                        size="lg"
                        className="w-full h-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-4 py-4 text-sm font-semibold shadow-2xl shadow-rose-500/25 hover:shadow-rose-500/40 transition-all duration-300 group"
                      >
                        <div className="flex flex-col items-center">
                          <Heart className="h-5 w-5 mb-1" />
                          <span>{t('startScreen.buttons.romance')}</span>
                        </div>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Bottom Row - 2 columns */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Egen Test Button with Trending Badge */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <div className="absolute -top-2 -right-2 z-10">
                        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {t('startScreen.trendingBadge')}
                        </Badge>
                      </div>
                      <Button 
                        onClick={onEgenTest}
                        size="lg"
                        className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-4 text-sm font-semibold shadow-2xl shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 group"
                      >
                        <div className="flex flex-col items-center">
                          <Sparkles className="h-5 w-5 mb-1" />
                          <span>{t('startScreen.buttons.egen')}</span>
                        </div>
                      </Button>
                    </motion.div>
                    
                    {/* WorldCup Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={onWorldCup}
                        size="lg"
                        variant="outline"
                        className="w-full h-full border-amber-500/50 hover:bg-amber-500/10 hover:border-amber-500 text-white px-4 py-4 text-sm font-semibold transition-all duration-300 group"
                      >
                        <div className="flex flex-col items-center">
                          <Swords className="h-5 w-5 mb-1 text-amber-400" />
                          <span>{t('startScreen.buttons.worldcup')}</span>
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <motion.div 
                  className="flex items-center gap-6 mt-8 justify-center lg:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-gray-400">{t('startScreen.trustIndicators.safe')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChartLine className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-gray-400">{t('startScreen.trustIndicators.scientific')}</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Content - Visual */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Glowing Card */}
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-red-500/30 blur-3xl" />
                  
                  {/* Main Card */}
                  <Card className="relative glass border-amber-500/20 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full blur-2xl" />
                    
                    <CardContent className="p-8 relative z-10">
                      {/* Character Preview */}
                      <div className="text-center mb-6">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center animate-pulse-glow">
                          <FaUsers className="w-16 h-16 text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t('startScreen.characterTypes')}</h3>
                        <p className="text-gray-400">{t('startScreen.findCharacter')}</p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {stats.slice(0, 4).map((stat, index) => (
                          <motion.div
                            key={index}
                            className="text-center p-3 md:p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-amber-500/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ y: -2 }}
                          >
                            <stat.icon className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                            <div className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">{stat.value}</div>
                            <div className="text-xs text-gray-400 whitespace-nowrap">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Static Floating Elements - 애니메이션 제거로 성능 향상 */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full opacity-20 blur-xl" />
              </motion.div>
            </div>

            {/* Feature Cards */}
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mt-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="glass border-gray-700/50 hover:border-amber-500/30 transition-all duration-300 h-full group hover-lift">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <feature.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartScreen;