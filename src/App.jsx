import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import SEOMetaTags from './components/SEOMetaTags.jsx';
import { initKakao } from './utils/shareUtils';

function App() {
  // Kakao SDK 초기화
  useEffect(() => {
    // 환경 변수가 있을 경우에만 초기화
    const kakaoKey = import.meta.env.VITE_KAKAO_APP_KEY;
    if (kakaoKey) {
      // SDK 로드 확인 후 초기화
      if (window.Kakao) {
        initKakao(kakaoKey);
      } else {
        // SDK 로드 대기
        const checkKakaoSDK = setInterval(() => {
          if (window.Kakao) {
            initKakao(kakaoKey);
            clearInterval(checkKakaoSDK);
          }
        }, 100);
        
        // 5초 후 타임아웃
        setTimeout(() => {
          clearInterval(checkKakaoSDK);
        }, 5000);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <SEOMetaTags />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;