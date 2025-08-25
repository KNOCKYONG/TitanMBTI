import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const GuidePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">MBTI 테스트 가이드</h1>
      
      <div className="space-y-8">
        {/* How to Take the Test */}
        <section className="bg-gray-800/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">📝 테스트 방법</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-300">
            <li>
              <strong>편안한 환경 만들기:</strong> 조용하고 방해받지 않는 환경에서 테스트를 진행하세요.
            </li>
            <li>
              <strong>솔직하게 답하기:</strong> 이상적인 모습이 아닌, 실제 자신의 모습을 기준으로 답해주세요.
            </li>
            <li>
              <strong>첫 느낌으로 선택:</strong> 너무 오래 고민하지 말고, 직관적으로 끌리는 선택지를 고르세요.
            </li>
            <li>
              <strong>일관성 유지:</strong> 특정 상황이 아닌, 평소 일반적인 성향을 기준으로 답해주세요.
            </li>
            <li>
              <strong>12개 질문 완료:</strong> 모든 질문에 답하면 자동으로 결과가 계산됩니다.
            </li>
          </ol>
        </section>

        {/* Understanding MBTI */}
        <section className="bg-gray-800/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">🧠 MBTI 이해하기</h2>
          <p className="text-gray-300 mb-4">
            MBTI는 4가지 선호 지표를 통해 16가지 성격 유형을 분류합니다:
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-semibold text-white">E/I (외향/내향)</h3>
              <p className="text-gray-400">에너지의 방향 - 외부 활동 vs 내면 세계</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-white">S/N (감각/직관)</h3>
              <p className="text-gray-400">정보 인식 방식 - 구체적 사실 vs 패턴과 가능성</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-white">T/F (사고/감정)</h3>
              <p className="text-gray-400">의사 결정 방식 - 논리적 분석 vs 가치와 감정</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-semibold text-white">J/P (판단/인식)</h3>
              <p className="text-gray-400">생활 방식 - 계획적 vs 유연한</p>
            </div>
          </div>
        </section>

        {/* Interpreting Results */}
        <section className="bg-gray-800/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">📊 결과 해석하기</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong>캐릭터 매칭:</strong> 당신의 MBTI 유형과 가장 유사한 진격의 거인 캐릭터를 보여줍니다.
            </p>
            <p>
              <strong>성격 특징:</strong> 해당 유형의 주요 특징, 강점, 약점을 확인할 수 있습니다.
            </p>
            <p>
              <strong>관계 궁합:</strong> 다른 유형과의 관계에서 나타나는 특징을 알아볼 수 있습니다.
            </p>
            <p>
              <strong>성장 조언:</strong> 자신의 잠재력을 발휘하기 위한 조언을 제공합니다.
            </p>
          </div>
        </section>

        {/* Tips for Accuracy */}
        <section className="bg-gray-800/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">💡 정확도 높이는 팁</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>피곤하거나 스트레스받는 상태에서는 테스트를 피하세요</li>
            <li>다른 사람의 기대가 아닌, 자신의 진짜 모습을 생각하세요</li>
            <li>어린 시절부터 지금까지 일관된 성향을 고려하세요</li>
            <li>상황에 따라 달라지는 행동보다는 본질적 성향에 집중하세요</li>
            <li>결과가 100% 맞지 않을 수 있음을 인지하고 참고용으로 활용하세요</li>
          </ul>
        </section>

        {/* Using Your Results */}
        <section className="bg-gray-800/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">🎯 결과 활용하기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded">
              <h3 className="text-lg font-semibold text-red-500 mb-2">자기 이해</h3>
              <p className="text-gray-400 text-sm">
                자신의 성향을 객관적으로 이해하고 장단점을 파악하세요
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded">
              <h3 className="text-lg font-semibold text-red-500 mb-2">대인 관계</h3>
              <p className="text-gray-400 text-sm">
                타인의 성향을 이해하고 더 나은 소통 방법을 찾으세요
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded">
              <h3 className="text-lg font-semibold text-red-500 mb-2">진로 선택</h3>
              <p className="text-gray-400 text-sm">
                자신의 성향에 맞는 직업과 환경을 탐색해보세요
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded">
              <h3 className="text-lg font-semibold text-red-500 mb-2">자기 계발</h3>
              <p className="text-gray-400 text-sm">
                약점을 보완하고 강점을 더욱 발전시키는 방법을 찾으세요
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-800/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">❓ 자주 묻는 질문</h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="cursor-pointer text-white hover:text-red-400">
                MBTI는 과학적으로 검증된 테스트인가요?
              </summary>
              <p className="mt-2 text-gray-400 pl-4">
                MBTI는 심리학 이론에 기반하지만, 완벽한 과학적 도구는 아닙니다. 
                자기 이해를 위한 참고 도구로 활용하는 것이 좋습니다.
              </p>
            </details>
            
            <details className="group">
              <summary className="cursor-pointer text-white hover:text-red-400">
                MBTI 유형은 바뀔 수 있나요?
              </summary>
              <p className="mt-2 text-gray-400 pl-4">
                핵심 성향은 잘 바뀌지 않지만, 상황이나 나이에 따라 행동 패턴은 변할 수 있습니다. 
                테스트 결과도 시기에 따라 조금씩 달라질 수 있습니다.
              </p>
            </details>
            
            <details className="group">
              <summary className="cursor-pointer text-white hover:text-red-400">
                어떤 MBTI 유형이 가장 좋나요?
              </summary>
              <p className="mt-2 text-gray-400 pl-4">
                모든 유형은 고유한 강점과 가치를 가지고 있습니다. 
                좋고 나쁜 유형은 없으며, 각자의 특성을 이해하고 활용하는 것이 중요합니다.
              </p>
            </details>
            
            <details className="group">
              <summary className="cursor-pointer text-white hover:text-red-400">
                결과를 어떻게 공유하나요?
              </summary>
              <p className="mt-2 text-gray-400 pl-4">
                테스트 결과 페이지에서 카카오톡, 링크 복사 등 다양한 공유 옵션을 제공합니다. 
                친구들과 결과를 비교해보세요!
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">준비되셨나요?</h2>
          <p className="text-gray-300 mb-6">
            가이드를 읽으셨다면, 이제 테스트를 시작해보세요!
          </p>
          <Link
            to="/test"
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-all transform hover:scale-105"
          >
            테스트 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;