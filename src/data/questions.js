export const questions = [
  // E/I 축 (외향성/내향성)
  {
    id: 1,
    axis: 'EI',
    question: '주말에 쉬는 시간이 생겼을 때, 나는:',
    options: [
      { type: 'E', text: '친구들과 만나거나 새로운 사람들이 있는 모임에 참여한다' },
      { type: 'I', text: '혼자 집에서 책을 읽거나 영화를 보며 조용히 보낸다' }
    ]
  },
  {
    id: 2,
    axis: 'EI',
    question: '파티나 모임에서 나는:',
    options: [
      { type: 'E', text: '여러 사람과 대화하며 새로운 사람들과 쉽게 친해진다' },
      { type: 'I', text: '잘 아는 소수의 사람들과만 깊은 대화를 나눈다' }
    ]
  },
  {
    id: 3,
    axis: 'EI',
    question: '에너지를 충전하는 방법은:',
    options: [
      { type: 'E', text: '사람들과 어울리며 활동적으로 시간을 보낸다' },
      { type: 'I', text: '혼자만의 시간을 가지며 조용히 휴식한다' }
    ]
  },
  
  // S/N 축 (감각형/직관형)
  {
    id: 4,
    axis: 'SN',
    question: '새로운 것을 배울 때, 나는:',
    options: [
      { type: 'S', text: '구체적인 예시와 실습을 통해 배우는 것을 선호한다' },
      { type: 'N', text: '전체적인 개념과 이론을 먼저 이해하는 것을 선호한다' }
    ]
  },
  {
    id: 5,
    axis: 'SN',
    question: '대화할 때, 나는:',
    options: [
      { type: 'S', text: '실제 경험과 구체적인 사실에 대해 이야기한다' },
      { type: 'N', text: '가능성과 아이디어에 대해 이야기한다' }
    ]
  },
  {
    id: 6,
    axis: 'SN',
    question: '문제를 해결할 때, 나는:',
    options: [
      { type: 'S', text: '검증된 방법과 과거 경험을 활용한다' },
      { type: 'N', text: '새로운 방법과 혁신적인 접근을 시도한다' }
    ]
  },
  
  // T/F 축 (사고형/감정형)
  {
    id: 7,
    axis: 'TF',
    question: '결정을 내릴 때, 나는:',
    options: [
      { type: 'T', text: '논리적 분석과 객관적 사실을 중시한다' },
      { type: 'F', text: '사람들의 감정과 가치를 중시한다' }
    ]
  },
  {
    id: 8,
    axis: 'TF',
    question: '친구가 조언을 구할 때, 나는:',
    options: [
      { type: 'T', text: '문제를 분석하고 해결책을 제시한다' },
      { type: 'F', text: '공감하고 정서적 지원을 제공한다' }
    ]
  },
  {
    id: 9,
    axis: 'TF',
    question: '비판을 받을 때, 나는:',
    options: [
      { type: 'T', text: '비판의 논리적 타당성을 먼저 평가한다' },
      { type: 'F', text: '상대방의 의도와 나의 감정을 먼저 생각한다' }
    ]
  },
  
  // J/P 축 (판단형/인식형)
  {
    id: 10,
    axis: 'JP',
    question: '여행을 갈 때, 나는:',
    options: [
      { type: 'J', text: '상세한 일정과 계획을 미리 세운다' },
      { type: 'P', text: '대략적인 계획만 세우고 즉흥적으로 움직인다' }
    ]
  },
  {
    id: 11,
    axis: 'JP',
    question: '일을 처리할 때, 나는:',
    options: [
      { type: 'J', text: '마감 기한보다 일찍 끝내는 것을 선호한다' },
      { type: 'P', text: '마감 기한에 임박해서 집중력을 발휘한다' }
    ]
  },
  {
    id: 12,
    axis: 'JP',
    question: '일상생활에서 나는:',
    options: [
      { type: 'J', text: '정리정돈된 환경과 규칙적인 루틴을 선호한다' },
      { type: 'P', text: '유연하고 자유로운 환경을 선호한다' }
    ]
  }
];