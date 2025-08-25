import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

const Layout = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navigation = [
    { name: '홈', href: '/', key: 'home' },
    { name: 'MBTI 테스트', href: '/test', key: 'test' },
    { name: 'MBTI 유형', href: '/types', key: 'types' },
    { name: '블로그', href: '/blog', key: 'blog' },
    { name: '가이드', href: '/guide', key: 'guide' },
    { name: '소개', href: '/about', key: 'about' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation Header */}
      <nav className="bg-black/50 backdrop-blur-sm sticky top-0 z-50 border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src="/images/logos/wings-of-freedom.svg" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-white">Titan MBTI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-red-500'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <LanguageSelector />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-red-500 bg-gray-900'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-red-900/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/images/logos/wings-of-freedom.svg" alt="Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">Titan MBTI</span>
              </div>
              <p className="text-gray-400 text-sm">
                진격의 거인 캐릭터와 함께하는 MBTI 성격 테스트. 
                당신의 성격 유형을 발견하고 좋아하는 캐릭터와 매칭해보세요.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">바로가기</h3>
              <ul className="space-y-2">
                <li><Link to="/test" className="text-gray-400 hover:text-white text-sm">MBTI 테스트</Link></li>
                <li><Link to="/types" className="text-gray-400 hover:text-white text-sm">MBTI 유형</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white text-sm">블로그</Link></li>
                <li><Link to="/guide" className="text-gray-400 hover:text-white text-sm">가이드</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">정책</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">개인정보처리방침</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">이용약관</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">문의하기</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">소개</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              © 2024 Titan MBTI Test. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;