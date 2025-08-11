import { useState } from 'react';
import { shareKakao, copyLink, shareNative } from '../utils/shareUtils';

const ShareButtons = ({ mbtiType, character }) => {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleCopyLink = async () => {
    const success = await copyLink(mbtiType);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKakaoShare = () => {
    setIsSharing(true);
    shareKakao(mbtiType, character);
    setTimeout(() => setIsSharing(false), 1000);
  };

  const handleNativeShare = async () => {
    const success = await shareNative(mbtiType, character);
    if (!success) {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="h-px bg-gray-700 flex-1"></div>
        <h4 className="text-gray-400 text-xs font-medium">결과 공유하기</h4>
        <div className="h-px bg-gray-700 flex-1"></div>
      </div>
      
      {/* Share Buttons Grid */}
      <div className="grid gap-3">
        {/* Kakao Share */}
        <button
          onClick={handleKakaoShare}
          disabled={isSharing}
          className="relative btn-base bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-medium text-sm shadow-lg hover:shadow-xl hover:shadow-yellow-500/20 disabled:opacity-50"
        >
          <span className="flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.27 2 10.29c0 2.46 1.68 4.65 4.25 5.99L5.5 20.5c-.06.26.15.5.42.5.14 0 .28-.06.37-.17l3.66-4.42c.7.12 1.42.18 2.05.18 5.52 0 10-3.27 10-7.3S17.52 3 12 3z"/>
            </svg>
            {isSharing ? '공유 중...' : '카카오톡으로 공유'}
          </span>
        </button>
        
        {/* Copy Link & Native Share Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className={`
              btn-base border transition-all
              ${copied 
                ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 hover:text-white'
              }
            `}
          >
            <span className="flex items-center justify-center gap-2">
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  복사됨
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  링크 복사
                </>
              )}
            </span>
          </button>
          
          {/* Native Share */}
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="btn-base bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 hover:text-white"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m5.432-5.026a3 3 0 110-2.684m0 2.684C15.886 12.938 16 12.482 16 12c0-.482-.114-.938-.316-1.342" />
                </svg>
                더 보기
              </span>
            </button>
          )}
        </div>
      </div>
      
      {/* Share Stats */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
            </svg>
            <span>친구와 결과를 비교해보세요</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;