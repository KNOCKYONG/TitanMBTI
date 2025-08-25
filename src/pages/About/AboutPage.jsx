import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Titan MBTI Test 소개</h1>
      
      <div className="bg-gray-800/50 rounded-lg p-8 space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">세계관이 만나는 성격 테스트</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Titan MBTI Test는 전 세계적으로 사랑받는 애니메이션 "진격의 거인"의 캐릭터와 
            MBTI 성격 유형을 결합한 독특한 성격 테스트 서비스입니다. 우리는 단순한 성격 테스트를 넘어, 
            여러분이 좋아하는 캐릭터와 자신을 연결하는 재미있고 의미 있는 경험을 제공합니다.
          </p>
          <p className="text-gray-300 leading-relaxed">
            12개의 심리학적 질문을 통해 여러분의 성격 유형을 분석하고, 
            진격의 거인 세계관 속 16명의 주요 캐릭터 중 가장 비슷한 성격을 가진 캐릭터를 찾아드립니다.
          </p>
        </section>

        {/* Our Mission */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">우리의 미션</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            우리의 목표는 MBTI라는 심리학 도구를 더 재미있고 접근하기 쉽게 만드는 것입니다. 
            딱딱한 심리 테스트가 아닌, 좋아하는 캐릭터와 함께하는 즐거운 자기 발견의 여정을 제공합니다.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
            <li>자기 이해를 돕는 재미있는 도구 제공</li>
            <li>팬덤 문화와 심리학의 창의적 결합</li>
            <li>전 세계 팬들과 소통할 수 있는 플랫폼 구축</li>
            <li>지속적인 콘텐츠 업데이트와 개선</li>
          </ul>
        </section>

        {/* Why Attack on Titan? */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">왜 진격의 거인인가?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            진격의 거인은 단순한 액션 애니메이션이 아닙니다. 각 캐릭터는 뚜렷한 성격과 신념을 가지고 있으며, 
            복잡한 인간 심리와 도덕적 딜레마를 다룹니다. 이러한 깊이 있는 캐릭터 설정은 MBTI 성격 유형과 
            완벽하게 매칭됩니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-900/50 p-4 rounded">
              <h3 className="text-lg font-semibold text-red-500 mb-2">다양한 성격 스펙트럼</h3>
              <p className="text-gray-400 text-sm">
                리더십의 엘빈, 완벽주의자 리바이, 열정적인 에렌 등 16가지 MBTI 유형을 모두 대표하는 캐릭터들
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded">
              <h3 className="text-lg font-semibold text-red-500 mb-2">깊이 있는 캐릭터</h3>
              <p className="text-gray-400 text-sm">
                각 캐릭터의 배경 스토리와 성장 과정이 MBTI 유형의 특징을 잘 보여줌
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded">
              <h3 className="text-lg font-semibold text-red-500 mb-2">글로벌 팬덤</h3>
              <p className="text-gray-400 text-sm">
                전 세계적으로 사랑받는 작품으로 다양한 문화권의 팬들과 소통 가능
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded">
              <h3 className="text-lg font-semibold text-red-500 mb-2">철학적 깊이</h3>
              <p className="text-gray-400 text-sm">
                자유, 정의, 희생 등 깊은 주제를 다루며 성격 유형과의 연관성 제공
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">주요 기능</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="text-lg font-semibold text-white">정확한 MBTI 분석</h3>
                <p className="text-gray-400">심리학 이론에 기반한 12개의 핵심 질문으로 정확한 성격 유형 도출</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🌍</span>
              <div>
                <h3 className="text-lg font-semibold text-white">15개 언어 지원</h3>
                <p className="text-gray-400">한국어, 영어, 일본어, 중국어 등 15개 언어로 전 세계 팬들과 소통</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="text-lg font-semibold text-white">상세한 분석 결과</h3>
                <p className="text-gray-400">각 유형별 특징, 장단점, 다른 유형과의 관계 등 종합적인 분석 제공</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🔗</span>
              <div>
                <h3 className="text-lg font-semibold text-white">쉬운 공유 기능</h3>
                <p className="text-gray-400">카카오톡, 페이스북, 트위터 등 다양한 플랫폼으로 결과 공유</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="text-lg font-semibold text-white">교육적 콘텐츠</h3>
                <p className="text-gray-400">MBTI 이론, 성격 심리학, 자기계발 관련 블로그 콘텐츠 제공</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">팀 소개</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Titan MBTI Test는 심리학, 애니메이션, 웹 개발에 열정을 가진 팀이 만들었습니다. 
            우리는 사용자들에게 가치 있고 재미있는 경험을 제공하기 위해 지속적으로 노력하고 있습니다.
          </p>
          <div className="bg-gray-900/50 p-6 rounded">
            <p className="text-gray-400 italic">
              "우리는 모두 벽 안의 거인처럼 자신만의 잠재력을 가지고 있습니다. 
              MBTI는 그 잠재력을 발견하고 이해하는 하나의 도구가 될 수 있습니다."
            </p>
            <p className="text-gray-500 mt-2 text-right">- Titan MBTI Team</p>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">통계</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">16</div>
              <div className="text-gray-400 text-sm">캐릭터 유형</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">12</div>
              <div className="text-gray-400 text-sm">분석 질문</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">15</div>
              <div className="text-gray-400 text-sm">지원 언어</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">100%</div>
              <div className="text-gray-400 text-sm">무료 이용</div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-red-900/30 to-gray-900/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">함께 만들어가요</h2>
          <p className="text-gray-300 mb-4">
            서비스 개선을 위한 여러분의 의견을 기다립니다. 버그 제보, 기능 제안, 협업 문의 등 
            무엇이든 환영합니다!
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all"
          >
            문의하기
          </Link>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-white mb-2">면책 조항</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            이 테스트는 재미와 자기 이해를 위한 도구입니다. 전문적인 심리 상담이나 진단을 대체할 수 없으며, 
            심각한 심리적 문제가 있다면 전문가의 도움을 받으시기 바랍니다. 
            진격의 거인은 원작자 및 관련 권리자의 지적 재산입니다.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;