import { useEffect } from 'react';

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">이용약관</h1>
      
      <div className="bg-gray-800/50 rounded-lg p-8 space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제1조 (목적)</h2>
          <p>
            이 약관은 Titan MBTI Test(이하 "서비스")가 제공하는 MBTI 성격 테스트 서비스의 이용과 관련하여 
            서비스와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제2조 (정의)</h2>
          <p className="mb-3">이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li><strong>"서비스"</strong>란 Titan MBTI Test가 제공하는 MBTI 성격 테스트 및 관련 콘텐츠 서비스를 의미합니다.</li>
            <li><strong>"이용자"</strong>란 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 모든 사용자를 의미합니다.</li>
            <li><strong>"콘텐츠"</strong>란 서비스 내에서 제공되는 텍스트, 이미지, 동영상, 테스트 결과 등 모든 형태의 정보를 의미합니다.</li>
            <li><strong>"MBTI"</strong>란 Myers-Briggs Type Indicator의 약자로, 16가지 성격 유형으로 분류하는 성격 검사 도구를 의미합니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제3조 (약관의 효력 및 변경)</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.</li>
            <li>서비스는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.</li>
            <li>약관이 변경되는 경우 서비스는 변경사항을 시행일자 7일 전부터 공지합니다.</li>
            <li>이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제4조 (서비스의 제공)</h2>
          <p className="mb-3">서비스는 다음과 같은 서비스를 제공합니다:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>MBTI 성격 유형 테스트</li>
            <li>테스트 결과 분석 및 해석</li>
            <li>진격의 거인 캐릭터와의 매칭 서비스</li>
            <li>MBTI 관련 정보 및 콘텐츠 제공</li>
            <li>결과 공유 기능</li>
            <li>기타 서비스가 정하는 부가 서비스</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제5조 (서비스 이용)</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
            <li>다만, 시스템 점검, 서버 증설 또는 교체, 네트워크 장애 등의 사유로 서비스가 일시 중단될 수 있습니다.</li>
            <li>서비스는 무료로 제공되며, 향후 일부 프리미엄 기능에 대해 유료화할 수 있습니다.</li>
            <li>서비스 내 광고가 게재될 수 있으며, 이는 서비스 운영을 위한 수익원입니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제6조 (이용자의 의무)</h2>
          <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>타인의 정보를 도용하는 행위</li>
            <li>서비스의 운영을 고의로 방해하는 행위</li>
            <li>서비스의 정보를 무단으로 수집, 복제, 배포하는 행위</li>
            <li>타인의 명예를 손상시키거나 불이익을 주는 행위</li>
            <li>음란물을 게재하거나 음란 사이트를 링크하는 행위</li>
            <li>서비스와 관련된 저작권 등 지적재산권을 침해하는 행위</li>
            <li>해킹, 바이러스 유포 등 정보통신망의 안전을 위협하는 행위</li>
            <li>광고성 정보를 무단으로 전송하는 행위</li>
            <li>기타 관련 법령이나 서비스가 정한 규정을 위반하는 행위</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제7조 (지적재산권)</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>서비스가 제공하는 모든 콘텐츠의 저작권 및 지적재산권은 서비스에 귀속됩니다.</li>
            <li>이용자는 서비스의 사전 승낙 없이 콘텐츠를 상업적으로 이용할 수 없습니다.</li>
            <li>MBTI는 The Myers-Briggs Company의 등록상표입니다.</li>
            <li>진격의 거인 관련 콘텐츠의 저작권은 원작자 및 권리자에게 있습니다.</li>
            <li>이용자가 서비스 내에서 생성한 테스트 결과는 개인적 용도로만 사용 가능합니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제8조 (면책조항)</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>서비스가 제공하는 MBTI 테스트는 재미와 오락을 목적으로 하며, 전문적인 심리 상담이나 진단을 대체할 수 없습니다.</li>
            <li>테스트 결과는 참고용이며, 이를 근거로 한 의사결정에 대한 책임은 이용자에게 있습니다.</li>
            <li>서비스는 천재지변, 전쟁, 기타 불가항력적 사유로 인한 서비스 중단에 대해 책임지지 않습니다.</li>
            <li>서비스는 이용자 간 또는 이용자와 제3자 간의 분쟁에 대해 책임지지 않습니다.</li>
            <li>서비스는 무료로 제공되는 서비스에 대해 관련 법령에 특별한 규정이 없는 한 책임을 지지 않습니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제9조 (광고 게재)</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>서비스는 서비스 운영과 관련하여 광고를 게재할 수 있습니다.</li>
            <li>이용자는 서비스 이용 시 노출되는 광고에 대해 동의한 것으로 간주합니다.</li>
            <li>광고주와 이용자 간의 거래에 대해 서비스는 책임을 지지 않습니다.</li>
            <li>이용자는 광고 차단 프로그램 사용 시 서비스 이용에 제한이 있을 수 있음을 인지합니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제10조 (서비스 종료)</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>서비스는 사업상의 이유로 서비스를 종료할 수 있습니다.</li>
            <li>서비스 종료 시 30일 전에 공지사항을 통해 이용자에게 알립니다.</li>
            <li>서비스 종료 시 이용자의 개인정보는 관련 법령에 따라 처리됩니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제11조 (분쟁 해결)</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>서비스와 이용자 간의 분쟁이 발생한 경우, 상호 협의하여 해결함을 원칙으로 합니다.</li>
            <li>협의가 이루어지지 않을 경우, 대한민국 법령에 따라 관할 법원에서 해결합니다.</li>
            <li>이 약관은 대한민국 법률에 따라 규율되고 해석됩니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">제12조 (기타)</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>이 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다.</li>
            <li>서비스 이용 중 발생하는 문의사항은 고객센터를 통해 처리됩니다.</li>
            <li>이용자의 귀책사유로 인한 서비스 이용 장애에 대해 서비스는 책임지지 않습니다.</li>
          </ol>
        </section>

        <section className="mt-8 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">부칙</h2>
          <p className="text-sm text-gray-400">
            1. 이 약관은 2024년 1월 1일부터 시행됩니다.<br />
            2. 2024년 1월 1일 이전 가입자도 개정된 약관의 적용을 받습니다.
          </p>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            공고일: 2024년 1월 1일<br />
            시행일: 2024년 1월 1일<br />
            최종 수정일: 2024년 1월 1일
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;