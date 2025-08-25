import { useEffect } from 'react';

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">개인정보처리방침</h1>
      
      <div className="bg-gray-800/50 rounded-lg p-8 space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. 개인정보의 수집 및 이용 목적</h2>
          <p className="mb-3">
            Titan MBTI Test(이하 "서비스")는 다음과 같은 목적으로 개인정보를 수집하고 이용합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>MBTI 성격 테스트 서비스 제공</li>
            <li>테스트 결과 분석 및 제공</li>
            <li>서비스 개선 및 통계 분석</li>
            <li>사용자 문의 응대 및 공지사항 전달</li>
            <li>광고 최적화 및 맞춤형 콘텐츠 제공</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. 수집하는 개인정보 항목</h2>
          <p className="mb-3">
            서비스는 다음과 같은 개인정보를 수집할 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>자동 수집 정보:</strong> IP 주소, 쿠키, 방문 기록, 서비스 이용 기록, 기기 정보, 브라우저 정보</li>
            <li><strong>선택적 정보:</strong> 이메일 주소 (문의 시), 닉네임 (공유 시)</li>
            <li><strong>테스트 관련 정보:</strong> MBTI 테스트 응답 및 결과</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. 개인정보의 보유 및 이용 기간</h2>
          <p className="mb-3">
            서비스는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 
            단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>서비스 이용 기록:</strong> 3개월 (서비스 개선 목적)</li>
            <li><strong>문의 기록:</strong> 3년 (소비자 보호법에 따른 보관)</li>
            <li><strong>부정 이용 기록:</strong> 1년 (부정 이용 방지)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. 개인정보의 제3자 제공</h2>
          <p className="mb-3">
            서비스는 원칙적으로 사용자의 개인정보를 제3자에게 제공하지 않습니다. 
            다만, 다음의 경우는 예외로 합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>사용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. 쿠키(Cookie) 사용</h2>
          <p className="mb-3">
            서비스는 사용자 경험 향상을 위해 쿠키를 사용합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>세션 쿠키:</strong> 브라우저 종료 시 자동 삭제</li>
            <li><strong>지속 쿠키:</strong> 언어 설정, 테마 설정 등 사용자 선호도 저장</li>
            <li><strong>분석 쿠키:</strong> Google Analytics를 통한 서비스 이용 통계</li>
            <li><strong>광고 쿠키:</strong> Google AdSense를 통한 관련 광고 표시</li>
          </ul>
          <p className="mt-3">
            사용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나, 이 경우 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">6. Google 서비스 사용</h2>
          <h3 className="text-xl font-semibold text-white mb-2 mt-4">Google Analytics</h3>
          <p className="mb-3">
            서비스는 Google Analytics를 사용하여 웹사이트 트래픽을 분석합니다. 
            Google Analytics는 쿠키를 사용하여 사용자의 웹사이트 이용 정보를 수집하며, 
            이 정보는 Google의 개인정보처리방침에 따라 처리됩니다.
          </p>
          
          <h3 className="text-xl font-semibold text-white mb-2 mt-4">Google AdSense</h3>
          <p className="mb-3">
            서비스는 Google AdSense를 통해 광고를 게재합니다. 
            Google은 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키를 사용할 수 있으며, 
            사용자는 Google 광고 설정 페이지에서 개인 맞춤 광고를 거부할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">7. 개인정보의 안전성 확보 조치</h2>
          <p className="mb-3">
            서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>개인정보의 암호화: 중요 정보는 암호화하여 저장 및 관리</li>
            <li>접근 제한: 개인정보 처리 직원을 최소한으로 제한</li>
            <li>정기적인 보안 점검 및 업데이트</li>
            <li>SSL 인증서를 통한 데이터 전송 보안</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">8. 이용자의 권리와 행사 방법</h2>
          <p className="mb-3">
            이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리 정지 요구</li>
          </ul>
          <p className="mt-3">
            권리 행사는 이메일을 통해 요청하실 수 있으며, 본인 확인 절차 후 조치하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">9. 아동의 개인정보 보호</h2>
          <p>
            서비스는 만 14세 미만 아동의 개인정보를 수집하지 않습니다. 
            만 14세 미만 아동의 개인정보가 수집된 것을 확인한 경우, 즉시 해당 정보를 삭제하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">10. 개인정보처리방침의 변경</h2>
          <p>
            이 개인정보처리방침은 2024년 1월 1일부터 적용되며, 
            법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있을 경우 
            변경사항의 시행 7일 전부터 공지사항을 통해 고지할 것입니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">11. 문의처</h2>
          <p className="mb-3">
            개인정보 처리에 관한 문의사항이 있으시면 아래로 연락 주시기 바랍니다:
          </p>
          <ul className="list-none space-y-2 ml-4">
            <li><strong>서비스명:</strong> Titan MBTI Test</li>
            <li><strong>이메일:</strong> privacy@titanmbti.com</li>
            <li><strong>문의 페이지:</strong> <a href="/contact" className="text-red-500 hover:text-red-400">문의하기</a></li>
          </ul>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            시행일: 2024년 1월 1일<br />
            최종 수정일: 2024년 1월 1일
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;