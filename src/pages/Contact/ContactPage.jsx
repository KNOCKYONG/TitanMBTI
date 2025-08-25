import { useState, useEffect } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 실제 구현 시 백엔드 API 호출
    // 현재는 시뮬레이션
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // 3초 후 상태 메시지 제거
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">문의하기</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">메시지 보내기</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-300 mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
              >
                <option value="">선택하세요</option>
                <option value="bug">버그 제보</option>
                <option value="feature">기능 제안</option>
                <option value="partnership">협업/파트너십</option>
                <option value="advertising">광고 문의</option>
                <option value="other">기타 문의</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">
                메시지 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none resize-none"
                placeholder="문의하실 내용을 자세히 작성해 주세요..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 font-bold rounded-lg transition-all ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white`}
            >
              {isSubmitting ? '전송 중...' : '메시지 전송'}
            </button>

            {submitStatus === 'success' && (
              <div className="p-3 bg-green-900/50 border border-green-500 rounded-lg text-green-300 text-center">
                메시지가 성공적으로 전송되었습니다!
              </div>
            )}
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">연락처 정보</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">이메일</h3>
                  <p className="text-gray-400">contact@titanmbti.com</p>
                  <p className="text-gray-500 text-sm mt-1">24시간 내 답변 드립니다</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">소셜 미디어</h3>
                  <div className="space-y-1 mt-1">
                    <a href="#" className="text-gray-400 hover:text-red-500 block">Twitter: @titanmbti</a>
                    <a href="#" className="text-gray-400 hover:text-red-500 block">Instagram: @titanmbti</a>
                    <a href="#" className="text-gray-400 hover:text-red-500 block">Facebook: /titanmbti</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">웹사이트</h3>
                  <p className="text-gray-400">https://titan-mbti.vercel.app</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">자주 묻는 질문</h2>
            <div className="space-y-3">
              <details className="group">
                <summary className="cursor-pointer text-gray-300 hover:text-white">
                  테스트 결과가 정확하지 않은 것 같아요
                </summary>
                <p className="mt-2 text-gray-400 text-sm pl-4">
                  MBTI는 복잡한 인간 성격을 16가지로 분류하는 도구입니다. 
                  100% 정확할 수 없으며, 참고용으로 활용해 주세요.
                </p>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-gray-300 hover:text-white">
                  광고 제휴는 어떻게 하나요?
                </summary>
                <p className="mt-2 text-gray-400 text-sm pl-4">
                  위 문의 양식에서 '광고 문의'를 선택하여 상세 내용을 보내주세요.
                </p>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-gray-300 hover:text-white">
                  다른 언어 추가를 요청할 수 있나요?
                </summary>
                <p className="mt-2 text-gray-400 text-sm pl-4">
                  네, '기능 제안'을 통해 요청해 주시면 검토 후 추가하겠습니다.
                </p>
              </details>

              <details className="group">
                <summary className="cursor-pointer text-gray-300 hover:text-white">
                  개인정보는 안전한가요?
                </summary>
                <p className="mt-2 text-gray-400 text-sm pl-4">
                  저희는 최소한의 정보만 수집하며, 개인정보처리방침에 따라 안전하게 관리합니다.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900/30 to-gray-900/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-2">응답 시간</h3>
            <p className="text-gray-300 text-sm">
              일반 문의: 24-48시간 내<br />
              버그 제보: 12-24시간 내<br />
              협업 제안: 3-5 영업일 내
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;