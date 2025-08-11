import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trophy, Quote, RotateCcw, Heart, Star, Share2, Sparkles } from 'lucide-react';
import { characters } from '../data/characters';
import ShareButtons from './ShareButtons.jsx';
import CharacterIllustration from './illustrations/CharacterIllustration';

const ResultScreen = ({ mbtiType, onRestart }) => {
  const character = characters[mbtiType];
  const [isRevealing, setIsRevealing] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealing(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  if (!character) {
    return <div className="text-gray-400 text-center">결과를 찾을 수 없습니다.</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl w-full mx-auto">
        {/* Result Reveal Animation */}
        {isRevealing ? (
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full shadow-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360, 720]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            <motion.p 
              className="text-xl text-muted-foreground"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              당신의 MBTI를 분석하고 있습니다...
            </motion.p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Result Badge */}
            <motion.div 
              className="text-center"
              variants={itemVariants}
            >
              <Badge variant="amber" className="px-4 md:px-6 py-2 text-base md:text-lg whitespace-nowrap">
                <Trophy className="w-4 h-4 mr-2" />
                분석 완료 • {mbtiType}
              </Badge>
            </motion.div>
            
            {/* Main Result Card */}
            <motion.div variants={itemVariants}>
              <Card className="backdrop-blur-md bg-card/50 border-amber-900/20 shadow-2xl overflow-hidden">
                {/* Character Header */}
                <div className="relative h-64 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-red-900/30">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Character Illustration */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="w-40 h-40 text-amber-500">
                      <CharacterIllustration mbtiType={mbtiType} />
                    </div>
                  </motion.div>
                </div>
                
                <CardHeader className="text-center -mt-8 relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                  >
                    <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 px-4 py-1.5">
                      {mbtiType} TYPE
                    </Badge>
                  </motion.div>
                  <CardTitle className="text-3xl md:text-4xl font-bold">
                    {character.name}
                  </CardTitle>
                  <CardDescription className="text-lg text-amber-500 font-semibold">
                    {character.title}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Description */}
                  <motion.p 
                    className="text-center text-muted-foreground text-lg leading-relaxed"
                    variants={itemVariants}
                  >
                    {character.description}
                  </motion.p>
                  
                  {/* Quote */}
                  {character.quote && (
                    <motion.div variants={itemVariants}>
                      <Card className="bg-secondary/50 border-amber-500/20">
                        <CardContent className="p-6">
                          <Quote className="w-8 h-8 text-amber-500/50 mb-3" />
                          <p className="text-muted-foreground italic text-lg">
                            "{character.quote}"
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                  
                  {/* Traits & Compatibility */}
                  <motion.div 
                    className="grid md:grid-cols-2 gap-6"
                    variants={itemVariants}
                  >
                    {/* Traits */}
                    <Card className="bg-secondary/30 border-amber-500/20">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Star className="w-5 h-5 text-amber-500" />
                          성격 특징
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {character.traits.map((trait, index) => (
                            <motion.div
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Badge variant="amber" className="px-3 py-1">
                                {trait}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Compatibility */}
                    <Card className="bg-secondary/30 border-green-500/20">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Heart className="w-5 h-5 text-green-500" />
                          좋은 궁합
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {character.compatibility.map((type, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-center justify-between p-2 rounded-lg bg-background/50"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Badge variant="outline" className="text-green-500 border-green-500/50">
                                {type}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {characters[type].name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  {/* Actions */}
                  <motion.div 
                    className="space-y-4"
                    variants={itemVariants}
                  >
                    {/* Share Section */}
                    <Card className="bg-secondary/30 border-amber-500/20">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Share2 className="w-5 h-5 text-amber-500" />
                          결과 공유하기
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ShareButtons mbtiType={mbtiType} character={character} />
                      </CardContent>
                    </Card>
                    
                    {/* Restart Button */}
                    <Button
                      onClick={onRestart}
                      size="lg"
                      variant="outline"
                      className="w-full hover:bg-amber-500/10 hover:border-amber-500/50"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      다시 테스트하기
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultScreen;