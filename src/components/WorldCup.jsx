import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Trophy, Crown, Swords, Star, ChevronLeft, RotateCcw, Share2,
  Users, Award, Sparkles, Heart, Target, Link2, MessageCircle
} from 'lucide-react';
import { characters } from '../data/characters';
import ShareButtons from './ShareButtons';
import { shareOnKakao } from '../utils/shareUtils';

const WorldCup = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const [currentRound, setCurrentRound] = useState(16);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [winners, setWinners] = useState([]);
  const [finalWinner, setFinalWinner] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [matchHistory, setMatchHistory] = useState([]);
  const [imageLoadStatus, setImageLoadStatus] = useState({});
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Initialize candidates
  useEffect(() => {
    const allCharacters = Object.entries(characters).map(([type, char]) => ({
      ...char,
      mbtiType: type
    }));
    
    // Shuffle and select 16 characters
    const shuffled = [...allCharacters].sort(() => Math.random() - 0.5);
    setCandidates(shuffled.slice(0, 16));
  }, []);

  // Handle image loading
  const handleImageLoad = useCallback((mbtiType) => {
    setImageLoadStatus(prev => ({ ...prev, [mbtiType]: 'loaded' }));
  }, []);

  const handleImageError = useCallback((mbtiType) => {
    setImageLoadStatus(prev => ({ ...prev, [mbtiType]: 'error' }));
  }, []);

  // Get current match pair
  const getCurrentPair = () => {
    const startIdx = currentMatch * 2;
    return [candidates[startIdx], candidates[startIdx + 1]];
  };

  // Handle selection
  const handleSelect = (winner) => {
    if (isTransitioning) return;
    
    setSelectedCandidate(winner);
    setIsTransitioning(true);
    
    // Add to match history
    const pair = getCurrentPair();
    const loser = pair.find(c => c.mbtiType !== winner.mbtiType);
    setMatchHistory(prev => [...prev, { winner, loser, round: currentRound }]);
    
    setTimeout(() => {
      setWinners(prev => [...prev, winner]);
      
      if (currentMatch + 1 >= candidates.length / 2) {
        // Round complete
        if (currentRound === 2) {
          // Final winner
          setFinalWinner(winner);
        } else {
          // Move to next round
          const nextRound = currentRound / 2;
          setCurrentRound(nextRound);
          setCandidates([...winners, winner]);
          setWinners([]);
          setCurrentMatch(0);
        }
      } else {
        // Next match in current round
        setCurrentMatch(prev => prev + 1);
      }
      
      setSelectedCandidate(null);
      setIsTransitioning(false);
    }, 800);
  };

  // Restart tournament
  const handleRestart = () => {
    const allCharacters = Object.entries(characters).map(([type, char]) => ({
      ...char,
      mbtiType: type
    }));
    
    const shuffled = [...allCharacters].sort(() => Math.random() - 0.5);
    setCandidates(shuffled.slice(0, 16));
    setWinners([]);
    setCurrentRound(16);
    setCurrentMatch(0);
    setFinalWinner(null);
    setMatchHistory([]);
    setSelectedCandidate(null);
  };

  // Get round title
  const getRoundTitle = () => {
    if (currentRound === 2) return t('worldCup.rounds.final');
    if (currentRound === 4) return t('worldCup.rounds.semiFinal');
    if (currentRound === 8) return t('worldCup.rounds.quarterFinal');
    return t('worldCup.rounds.round16');
  };

  // Handle Kakao share
  const handleKakaoShare = () => {
    if (!finalWinner) {
      console.error('No winner to share');
      return;
    }

    console.log('Sharing winner:', finalWinner);
    
    const currentUrl = window.location.origin;
    const shareUrl = `${currentUrl}?worldcup=winner&character=${finalWinner.mbtiType}`;
    
    const shareData = {
      title: t('worldCup.sharing.kakaoTitle', { characterName: finalWinner.name }),
      description: t('worldCup.sharing.kakaoDescription', { 
        characterName: finalWinner.name,
        mbtiType: finalWinner.mbtiType 
      }),
      imageUrl: `${currentUrl}/images/characters/${finalWinner.mbtiType}/profile.png`,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
      buttons: [
        {
          title: t('worldCup.sharing.kakaoButton'),
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    };

    console.log('Share data:', shareData);
    shareOnKakao(shareData);
  };

  // Handle copy link
  const handleCopyLink = async () => {
    const currentUrl = window.location.origin;
    const shareUrl = `${currentUrl}?worldcup=winner&character=${finalWinner.mbtiType}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Render final winner screen
  if (finalWinner) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-500"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0
              }}
              animate={{ 
                y: window.innerHeight + 20,
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Crown animation */}
            <motion.div 
              className="inline-block mb-8"
              animate={{ 
                y: [0, -20, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Crown className="w-24 h-24 text-yellow-400 drop-shadow-lg" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
              <span className="text-gradient animate-gradient">{t('worldCup.winner.title')}</span>
            </h1>

            {/* Winner card */}
            <Card className="glass border-amber-500/30 shadow-2xl overflow-hidden max-w-md mx-auto mb-8">
              <div className="relative h-80 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-red-900/30">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-amber-500/50 shadow-2xl bg-gray-800">
                    {imageLoadStatus[finalWinner.mbtiType] !== 'loaded' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {imageLoadStatus[finalWinner.mbtiType] === 'error' ? (
                          <Trophy className="w-32 h-32 text-amber-500/50" />
                        ) : (
                          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                        )}
                      </div>
                    )}
                    <img 
                      src={`/images/characters/${finalWinner.mbtiType}/profile.png`}
                      alt={finalWinner.name}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoadStatus[finalWinner.mbtiType] === 'loaded' ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(finalWinner.mbtiType)}
                      onError={() => handleImageError(finalWinner.mbtiType)}
                    />
                  </div>
                </motion.div>
              </div>
              
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold text-white mb-2">{finalWinner.name}</h2>
                <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 px-4 py-1">
                  <span className="text-amber-300 font-medium">{finalWinner.mbtiType}</span>
                </Badge>
                <p className="text-amber-400 font-medium mt-4">{finalWinner.title}</p>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
              <Card className="glass border-gray-700/50">
                <CardContent className="p-4">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-xl font-bold text-white">1st</p>
                  <p className="text-xs text-gray-400">{t('worldCup.winner.place')}</p>
                </CardContent>
              </Card>
              <Card className="glass border-gray-700/50">
                <CardContent className="p-4">
                  <Swords className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                  <p className="text-xl font-bold text-white">5</p>
                  <p className="text-xs text-gray-400">{t('worldCup.winner.victories')}</p>
                </CardContent>
              </Card>
              <Card className="glass border-gray-700/50">
                <CardContent className="p-4">
                  <Star className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <p className="text-xl font-bold text-white">100%</p>
                  <p className="text-xs text-gray-400">{t('worldCup.winner.winRate')}</p>
                </CardContent>
              </Card>
            </div>

            {/* Share Section */}
            <Card className="glass border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5 max-w-md mx-auto mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <Share2 className="w-5 h-5 text-amber-400" />
                  {t('worldCup.sharing.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleKakaoShare}
                    size="lg"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('worldCup.sharing.kakao')}
                  </Button>
                  
                  <Button
                    onClick={handleCopyLink}
                    size="lg"
                    variant="outline"
                    className="w-full hover:bg-amber-500/10 hover:border-amber-500/50 text-white"
                  >
                    <Link2 className="w-5 h-5 mr-2" />
                    {copySuccess ? t('worldCup.sharing.copied') : t('worldCup.sharing.copyLink')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 max-w-md mx-auto">
              <Button
                onClick={handleRestart}
                size="lg"
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {t('worldCup.actions.restart')}
              </Button>
              <Button
                onClick={onBack}
                size="lg"
                variant="outline"
                className="flex-1 hover:bg-amber-500/10 hover:border-amber-500/50 text-white"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                {t('worldCup.actions.back')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Render match screen
  const pair = getCurrentPair();
  if (!pair || !pair[0] || !pair[1]) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            {t('worldCup.actions.back')}
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 px-6 py-2 mb-4">
              <Trophy className="w-4 h-4 mr-2 text-amber-400" />
              <span className="text-amber-300 font-medium">{getRoundTitle()}</span>
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {t('worldCup.title')}
            </h1>
            
            <p className="text-gray-400">
              {t('worldCup.match')} {currentMatch + 1} / {candidates.length / 2}
            </p>
          </motion.div>
        </div>

        {/* VS Section */}
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-4 md:gap-20 items-center">
            {/* Left candidate */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              key={`left-${pair[0].mbtiType}`}
            >
              <Card 
                className={`glass border-gray-700/50 cursor-pointer transition-all hover:scale-105 hover:border-amber-500/50 ${
                  selectedCandidate?.mbtiType === pair[0].mbtiType ? 'ring-2 ring-amber-500' : ''
                }`}
                onClick={() => handleSelect(pair[0])}
              >
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-red-900/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-700/50 shadow-xl bg-gray-800">
                      {imageLoadStatus[pair[0].mbtiType] !== 'loaded' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {imageLoadStatus[pair[0].mbtiType] === 'error' ? (
                            <Users className="w-24 h-24 text-amber-500/50" />
                          ) : (
                            <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                          )}
                        </div>
                      )}
                      <img 
                        src={`/images/characters/${pair[0].mbtiType}/profile.png`}
                        alt={pair[0].name}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoadStatus[pair[0].mbtiType] === 'loaded' ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(pair[0].mbtiType)}
                        onError={() => handleImageError(pair[0].mbtiType)}
                      />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{pair[0].name}</h3>
                  <Badge variant="outline" className="text-amber-400 border-amber-400/50">
                    {pair[0].mbtiType}
                  </Badge>
                  <p className="text-gray-400 mt-2">{pair[0].title}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right candidate */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              key={`right-${pair[1].mbtiType}`}
            >
              <Card 
                className={`glass border-gray-700/50 cursor-pointer transition-all hover:scale-105 hover:border-amber-500/50 ${
                  selectedCandidate?.mbtiType === pair[1].mbtiType ? 'ring-2 ring-amber-500' : ''
                }`}
                onClick={() => handleSelect(pair[1])}
              >
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-red-900/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-700/50 shadow-xl bg-gray-800">
                      {imageLoadStatus[pair[1].mbtiType] !== 'loaded' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {imageLoadStatus[pair[1].mbtiType] === 'error' ? (
                            <Users className="w-24 h-24 text-amber-500/50" />
                          ) : (
                            <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                          )}
                        </div>
                      )}
                      <img 
                        src={`/images/characters/${pair[1].mbtiType}/profile.png`}
                        alt={pair[1].name}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoadStatus[pair[1].mbtiType] === 'loaded' ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(pair[1].mbtiType)}
                        onError={() => handleImageError(pair[1].mbtiType)}
                      />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{pair[1].name}</h3>
                  <Badge variant="outline" className="text-amber-400 border-amber-400/50">
                    {pair[1].mbtiType}
                  </Badge>
                  <p className="text-gray-400 mt-2">{pair[1].title}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* VS Badge - Centered between cards */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <motion.div
                className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-full p-6 shadow-2xl border-4 border-white/20"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Swords className="w-10 h-10 text-white" />
              </motion.div>
              <motion.p 
                className="text-white font-bold text-3xl mt-3 drop-shadow-lg"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                VS
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gray-800/50 rounded-full h-2 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((winners.length + (currentRound === 16 ? 0 : 16 - currentRound)) / 15) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldCup;