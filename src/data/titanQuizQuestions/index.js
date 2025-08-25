import { titanQuizQuestionsKo } from './ko';
import { titanQuizQuestionsEn } from './en';
import { titanQuizQuestionsJa } from './ja';
import { titanQuizQuestionsZh } from './zh';
import { titanQuizQuestionsEs } from './es';
import { titanQuizQuestionsFr } from './fr';
import { titanQuizQuestionsDe } from './de';
import { titanQuizQuestionsPt } from './pt';
import { titanQuizQuestionsRu } from './ru';
import { titanQuizQuestionsIt } from './it';
import { titanQuizQuestionsAr } from './ar';
import { titanQuizQuestionsHi } from './hi';
import { titanQuizQuestionsTh } from './th';
import { titanQuizQuestionsVi } from './vi';
import { titanQuizQuestionsId } from './id';

// 언어별 퀴즈 데이터 매핑
const questionsByLanguage = {
  ko: titanQuizQuestionsKo,
  en: titanQuizQuestionsEn,
  ja: titanQuizQuestionsJa,
  zh: titanQuizQuestionsZh,
  es: titanQuizQuestionsEs,
  fr: titanQuizQuestionsFr,
  de: titanQuizQuestionsDe,
  pt: titanQuizQuestionsPt,
  ru: titanQuizQuestionsRu,
  it: titanQuizQuestionsIt,
  ar: titanQuizQuestionsAr,
  hi: titanQuizQuestionsHi,
  th: titanQuizQuestionsTh,
  vi: titanQuizQuestionsVi,
  id: titanQuizQuestionsId
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