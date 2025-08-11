import { characters } from '../data/characters';
import ShareButtons from './ShareButtons.jsx';
import { useState, useEffect } from 'react';
import CharacterIllustration from './illustrations/CharacterIllustration';
import TitanSilhouette from './illustrations/TitanSilhouette';

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 text-gray-400">
          <TitanSilhouette type="colossal" />
        </div>
        <div className="absolute bottom-20 left-20 w-80 h-80 text-gray-400 transform -rotate-12">
          <TitanSilhouette type="armored" />
        </div>
      </div>
      
      <div className="max-w-md w-full mx-auto relative z-10">
        {/* Result Reveal Animation */}
        {isRevealing ? (
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-6 animate-pulse"></div>
              <p className="text-lg text-gray-400">당신의 MBTI를 분석하고 있습니다...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Result Badge */}
            <div className="text-center mb-4 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-3">
                <span className="text-amber-400 text-xs font-medium">분석 완료</span>
                <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                <span className="text-white text-xs font-bold">{mbtiType}</span>
              </div>
            </div>
            
            {/* Main Result Card */}
            <div className="relative animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl"></div>
              
              {/* Card Content */}
              <div className="relative glass card-base overflow-hidden">
                {/* Character Header */}
                <div className="relative h-48 bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-red-900/20">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-red-500"></div>
                  </div>
                  
                  {/* Character Circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Character Illustration */}
                      <div className="w-32 h-32 text-amber-500">
                        <CharacterIllustration mbtiType={mbtiType} />
                      </div>
                      {/* MBTI Type Badge */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 rounded-full shadow-lg">
                        <span className="text-lg font-black text-white">{mbtiType}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                
                {/* Character Info */}
                <div className="p-4 md:p-6">
                  {/* Name & Title */}
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {character.name}
                    </h2>
                    <p className="text-sm text-amber-400 font-medium">{character.title}</p>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-300 text-center mb-4">
                    {character.description}
                  </p>
                  
                  {/* Quote */}
                  {character.quote && (
                    <div className="relative mb-6">
                      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl blur-lg"></div>
                      <blockquote className="relative bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                        <svg className="w-6 h-6 text-amber-500/30 mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <p className="text-xs text-gray-400 italic">{character.quote}</p>
                      </blockquote>
                    </div>
                  )}
                  
                  {/* Traits & Compatibility Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {/* Traits */}
                    <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                      <h4 className="font-semibold text-amber-400 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        성격 특징
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {character.traits.map((trait, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-medium border border-amber-500/20"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Compatibility */}
                    <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                      <h4 className="font-semibold text-green-400 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                        </svg>
                        좋은 궁합
                      </h4>
                      <div className="space-y-2">
                        {character.compatibility.map((type, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-green-400 font-medium">{type}</span>
                            <span className="text-gray-400">{characters[type].name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Share Section */}
                  <ShareButtons mbtiType={mbtiType} character={character} />
                  
                  {/* Restart Button */}
                  <button
                    onClick={onRestart}
                    className="w-full mt-6 btn-base bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                  >
                    다시 테스트하기
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultScreen;