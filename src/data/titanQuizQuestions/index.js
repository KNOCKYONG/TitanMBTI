import { titanQuizQuestionsKo } from './ko';
import { titanQuizQuestionsEn } from './en';
import { titanQuizQuestionsJa } from './ja';
import { titanQuizQuestionsZh } from './zh';

// 언어별 퀴즈 데이터 매핑
const questionsByLanguage = {
  ko: titanQuizQuestionsKo,
  en: titanQuizQuestionsEn,
  ja: titanQuizQuestionsJa,
  zh: titanQuizQuestionsZh,
  // 다른 언어들은 영어를 기본값으로 사용
  es: titanQuizQuestionsEn,
  fr: titanQuizQuestionsEn,
  de: titanQuizQuestionsEn,
  pt: titanQuizQuestionsEn,
  ru: titanQuizQuestionsEn,
  it: titanQuizQuestionsEn,
  ar: titanQuizQuestionsEn,
  hi: titanQuizQuestionsEn,
  th: titanQuizQuestionsEn,
  vi: titanQuizQuestionsEn,
  id: titanQuizQuestionsEn
};

// 현재 언어에 맞는 퀴즈 문제 가져오기
export const getQuizQuestions = (language) => {
  return questionsByLanguage[language] || questionsByLanguage.en;
};

// 문제 섞기 함수
export const shuffleQuestions = (questions) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 랭킹 관리 함수들
export const getRankings = () => {
  const rankings = localStorage.getItem('titanQuizRankings');
  return rankings ? JSON.parse(rankings) : [];
};

export const saveRanking = (score) => {
  const rankings = getRankings();
  const newEntry = {
    score,
    date: new Date().toISOString(),
    timestamp: Date.now()
  };
  
  rankings.push(newEntry);
  rankings.sort((a, b) => b.score - a.score);
  
  // 상위 10개만 유지
  const top10 = rankings.slice(0, 10);
  localStorage.setItem('titanQuizRankings', JSON.stringify(top10));
  
  return top10;
};

export const getTopScore = () => {
  const rankings = getRankings();
  return rankings.length > 0 ? rankings[0].score : 0;
};

export const getUserRank = (score) => {
  const rankings = getRankings();
  const betterScores = rankings.filter(r => r.score > score).length;
  return betterScores + 1;
};

// 기본 export (기존 호환성 유지)
export const titanQuizQuestions = titanQuizQuestionsKo;