import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: '12개의 심리학적 질문',
      description: 'MBTI 이론에 기반한 정확한 성격 분석',
      icon: '🧠'
    },
    {
      title: '16가지 캐릭터 매칭',
      description: '진격의 거인 캐릭터와 당신의 성격 매칭',
      icon: '⚔️'
    },
    {
      title: '상세한 분석 결과',
      description: '성격 유형별 특징과 장단점 분석',
      icon: '📊'
    },
    {
      title: '다국어 지원',
      description: '15개 언어로 전 세계 팬들과 함께',
      icon: '🌍'
    }
  ];

  const popularTypes = [
    { type: 'INTJ', character: '리바이 아커만', description: '전략가형' },
    { type: 'ENFP', character: '한지 조에', description: '활동가형' },
    { type: 'ISTJ', character: '미카사 아커만', description: '현실주의자형' },
    { type: 'ENTJ', character: '엘빈 스미스', description: '통솔자형' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            진격의 거인 MBTI 테스트
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            당신은 어떤 진격의 거인 캐릭터와 비슷한 성격일까요?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/test"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-all transform hover:scale-105"
            >
              테스트 시작하기
            </Link>
            <Link
              to="/types"
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg text-lg transition-all"
            >
              모든 유형 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            다양한 테스트 모드
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/test" className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-6 text-center hover:from-red-500 hover:to-red-700 transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-white mb-2">MBTI 테스트</h3>
              <p className="text-gray-200">12개 질문으로 찾는 나의 캐릭터</p>
            </Link>
            <Link to="/worldcup" className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-center hover:from-purple-500 hover:to-purple-700 transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">이상형 월드컵</h3>
              <p className="text-gray-200">최애 캐릭터 찾기</p>
            </Link>
            <Link to="/egen" className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-center hover:from-blue-500 hover:to-blue-700 transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">에겐남 테토녀</h3>
              <p className="text-gray-200">나는 어떤 타입?</p>
            </Link>
            <Link to="/romance" className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-lg p-6 text-center hover:from-pink-500 hover:to-pink-700 transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">💕</div>
              <h3 className="text-xl font-bold text-white mb-2">연애 스타일</h3>
              <p className="text-gray-200">나의 연애 유형은?</p>
            </Link>
          </div>
          <div className="flex justify-center mt-6">
            <Link to="/titanquiz" className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg px-8 py-4 text-center hover:from-green-500 hover:to-green-700 transition-all transform hover:scale-105">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white">진격의 거인 퀴즈</h3>
                  <p className="text-gray-200">당신은 진정한 팬인가?</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            왜 Titan MBTI 테스트인가?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-6 text-center hover:bg-gray-800/70 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Types Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            인기 캐릭터 유형
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTypes.map((item, index) => (
              <Link
                key={index}
                to={`/types/${item.type.toLowerCase()}`}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">{item.type}</div>
                  <div className="text-xl font-semibold text-white mb-1">{item.character}</div>
                  <div className="text-gray-400">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-900/30 to-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 당신의 진격의 거인 캐릭터를 찾아보세요!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            5분만 투자하면 당신의 성격 유형과 가장 잘 맞는 캐릭터를 발견할 수 있습니다.
          </p>
          <Link
            to="/test"
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-all transform hover:scale-105"
          >
            무료 테스트 시작하기
          </Link>
        </div>
      </section>

      {/* Recent Blog Posts Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">최신 블로그 글</h2>
            <Link to="/blog" className="text-red-500 hover:text-red-400">
              모든 글 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">MBTI란 무엇인가?</h3>
              <p className="text-gray-400 mb-4">MBTI의 기초 이론과 4가지 선호 지표에 대해 알아봅니다.</p>
              <Link to="/blog/what-is-mbti" className="text-red-500 hover:text-red-400">
                자세히 읽기 →
              </Link>
            </article>
            <article className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">리바이 아커만의 INTJ 성격 분석</h3>
              <p className="text-gray-400 mb-4">인류 최강의 병사 리바이의 성격을 MBTI로 분석해봅니다.</p>
              <Link to="/blog/levi-intj-analysis" className="text-red-500 hover:text-red-400">
                자세히 읽기 →
              </Link>
            </article>
            <article className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">MBTI 유형별 최적의 직업</h3>
              <p className="text-gray-400 mb-4">각 MBTI 유형에 가장 잘 맞는 직업과 진로를 소개합니다.</p>
              <Link to="/blog/mbti-career-guide" className="text-red-500 hover:text-red-400">
                자세히 읽기 →
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;