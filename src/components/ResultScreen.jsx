import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Trophy, Quote, RotateCcw, Heart, Star, Share2, Sparkles,
  Download, Users, Target, TrendingUp, ChevronRight, Award
} from 'lucide-react';
import { characters } from '../data/characters';
import ShareButtons from './ShareButtons.jsx';

const ResultScreen = ({ mbtiType, onRestart }) => {
  const character = characters[mbtiType];
  const [isRevealing, setIsRevealing] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // mbtiType이 변경될 때 이미지 상태 리셋
    setImageLoaded(false);
    setImageError(false);
  }, [mbtiType]);
  
  if (!character) {
    return <div className="text-gray-400 text-center">결과를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
      </div>

      {/* Static Background Elements - 애니메이션 제거로 성능 향상 */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Result Reveal Animation */}
        {isRevealing ? (
          <motion.div 
            className="min-h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.div 
                className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
              >
                <Sparkles className="w-16 h-16 text-amber-400" />
              </motion.div>
              
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                분석 중...
              </motion.h2>
              
              <motion.p className="text-gray-400">
                당신의 성격 유형을 찾고 있습니다
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
              {/* Hero Result Section */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 px-6 py-2 mb-6">
                  <Trophy className="w-4 h-4 mr-2 text-amber-400" />
                  <span className="text-amber-300 font-medium">분석 완료</span>
                </Badge>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  당신은 <span className="text-gradient animate-gradient">{character.name}</span> 타입!
                </motion.h1>
                
                <p className="text-xl text-gray-300">
                  MBTI 유형: <span className="text-amber-400 font-semibold">{mbtiType}</span>
                </p>
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Character Card */}
                <motion.div 
                  className="lg:col-span-1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass border-amber-500/20 shadow-2xl overflow-hidden h-full">
                    {/* Character Visual */}
                    <div className="relative h-64 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-red-900/30">
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ 
                          y: [0, -10, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 3,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-2xl bg-gray-800 relative">
                          {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                            </div>
                          )}
                          {imageError && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Users className="w-24 h-24 text-amber-500/50" />
                            </div>
                          )}
                          <img 
                            src={`${import.meta.env.BASE_URL}images/characters/${mbtiType}/profile.png`}
                            alt={character.name}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => {
                              setImageLoaded(true);
                              setImageError(false);
                            }}
                            onError={(e) => {
                              console.error(`Failed to load image: ${e.target.src}`);
                              setImageError(true);
                              setImageLoaded(false);
                            }}
                          />
                        </div>
                      </motion.div>
                    </div>
                    
                    <CardContent className="p-6 text-center">
                      <h2 className="text-2xl font-bold text-white mb-2">{character.name}</h2>
                      <p className="text-amber-400 font-medium mb-4">{character.title}</p>
                      
                      {/* Character Stats */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                          <Award className="w-6 h-6 mx-auto mb-1 text-amber-400" />
                          <p className="text-xs text-gray-400">타입</p>
                          <p className="text-sm font-bold text-white">{mbtiType}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                          <Star className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                          <p className="text-xs text-gray-400">희귀도</p>
                          <p className="text-sm font-bold text-white">★★★★</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Right Column - Details */}
                <motion.div 
                  className="lg:col-span-2 space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Description Card */}
                  <Card className="glass border-gray-700/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl text-white">
                        <Target className="w-5 h-5 text-amber-400" />
                        성격 분석
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white leading-relaxed text-lg">
                        {character.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Quote Card */}
                  {character.quote && (
                    <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                      <CardContent className="p-6">
                        <Quote className="w-8 h-8 text-amber-500/50 mb-4" />
                        <p className="text-lg text-white italic leading-relaxed">
                          "{character.quote}"
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Traits and Compatibility Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Traits */}
                    <Card className="glass border-gray-700/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-white">
                          <Sparkles className="w-5 h-5 text-amber-400" />
                          핵심 특징
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {character.traits.map((trait, index) => (
                            <motion.div
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              <Badge 
                                variant="secondary" 
                                className="bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20 text-white transition-colors"
                              >
                                {trait}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Compatibility */}
                    <Card className="glass border-gray-700/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-white">
                          <Heart className="w-5 h-5 text-red-400" />
                          최고의 궁합
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {character.compatibility.slice(0, 3).map((type, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                            >
                              <div className="flex items-center gap-3">
                                <Badge variant="outline" className="text-green-400 border-green-400/50">
                                  {type}
                                </Badge>
                                <span className="text-sm text-white">
                                  {characters[type].name}
                                </span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-500" />
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Section */}
                  <Card className="glass border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl text-white">
                        <Share2 className="w-5 h-5 text-amber-400" />
                        결과 공유하기
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        친구들과 결과를 공유하고 서로의 성격 유형을 알아보세요
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ShareButtons mbtiType={mbtiType} character={character} />
                      
                      <Button
                        onClick={onRestart}
                        size="lg"
                        variant="outline"
                        className="w-full hover:bg-amber-500/10 hover:border-amber-500/50 text-white"
                      >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        다시 테스트
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Bottom Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { icon: Users, label: "같은 유형", value: "3.2%" },
                  { icon: TrendingUp, label: "정확도", value: "95%" },
                  { icon: Star, label: "평균 평점", value: "4.8" },
                  { icon: Heart, label: "만족도", value: "98%" }
                ].map((stat, index) => (
                  <Card key={index} className="glass border-gray-700/50 hover:border-amber-500/30 transition-colors">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultScreen;