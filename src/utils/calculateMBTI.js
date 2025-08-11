export const calculateMBTI = (answers) => {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // 답변 집계
  answers.forEach(answer => {
    scores[answer]++;
  });

  // MBTI 결정 (각 축에서 2개 이상인 쪽 선택)
  const mbti = 
    (scores.E >= 2 ? 'E' : 'I') +
    (scores.S >= 2 ? 'S' : 'N') +
    (scores.T >= 2 ? 'T' : 'F') +
    (scores.J >= 2 ? 'J' : 'P');

  return mbti;
};