import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { characters } from '../../data/characters';

const TypesListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // MBTI 그룹별 분류
  const analysts = ['INTJ', 'INTP', 'ENTJ', 'ENTP'];
  const diplomats = ['INFJ', 'INFP', 'ENFJ', 'ENFP'];
  const sentinels = ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'];
  const explorers = ['ISTP', 'ISFP', 'ESTP', 'ESFP'];

  const getTypeGroup = (type) => {
    if (analysts.includes(type)) return '분석가형';
    if (diplomats.includes(type)) return '외교관형';
    if (sentinels.includes(type)) return '관리자형';
    if (explorers.includes(type)) return '탐험가형';
    return '';
  };

  const getGroupColor = (type) => {
    if (analysts.includes(type)) return 'from-purple-600 to-purple-800';
    if (diplomats.includes(type)) return 'from-green-600 to-green-800';
    if (sentinels.includes(type)) return 'from-blue-600 to-blue-800';
    if (explorers.includes(type)) return 'from-yellow-600 to-yellow-800';
    return 'from-gray-600 to-gray-800';
  };

  const TypeCard = ({ type }) => {
    const character = characters[type];
    return (
      <Link
        to={`/types/${type.toLowerCase()}`}
        className="block transform transition-all hover:scale-105"
      >
        <div className={`bg-gradient-to-br ${getGroupColor(type)} rounded-lg p-6 h-full`}>
          <div className="text-center">
            {character.image && (
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-1">{type}</h3>
            <p className="text-xl font-semibold text-white/90 mb-2">{character.name}</p>
            <p className="text-sm text-white/80 mb-3">{character.title}</p>
            <p className="text-xs text-white/70 italic">"{character.motto}"</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          모든 MBTI 유형
        </h1>
        <p className="text-xl text-gray-300">
          16가지 성격 유형과 매칭되는 진격의 거인 캐릭터를 만나보세요
        </p>
      </div>

      {/* 분석가형 (Analysts) */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="bg-purple-600 w-2 h-8 mr-3"></div>
          <h2 className="text-3xl font-bold text-white">분석가형</h2>
          <span className="ml-3 text-gray-400">직관적이고 사고적인 유형</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analysts.map(type => (
            <TypeCard key={type} type={type} />
          ))}
        </div>
      </section>

      {/* 외교관형 (Diplomats) */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="bg-green-600 w-2 h-8 mr-3"></div>
          <h2 className="text-3xl font-bold text-white">외교관형</h2>
          <span className="ml-3 text-gray-400">직관적이고 감정적인 유형</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diplomats.map(type => (
            <TypeCard key={type} type={type} />
          ))}
        </div>
      </section>

      {/* 관리자형 (Sentinels) */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="bg-blue-600 w-2 h-8 mr-3"></div>
          <h2 className="text-3xl font-bold text-white">관리자형</h2>
          <span className="ml-3 text-gray-400">실용적이고 체계적인 유형</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sentinels.map(type => (
            <TypeCard key={type} type={type} />
          ))}
        </div>
      </section>

      {/* 탐험가형 (Explorers) */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="bg-yellow-600 w-2 h-8 mr-3"></div>
          <h2 className="text-3xl font-bold text-white">탐험가형</h2>
          <span className="ml-3 text-gray-400">실용적이고 자발적인 유형</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {explorers.map(type => (
            <TypeCard key={type} type={type} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 text-center bg-gradient-to-r from-red-900/30 to-gray-900/30 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          당신의 유형이 궁금하신가요?
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          12개의 질문으로 당신의 MBTI 유형을 찾아보세요
        </p>
        <Link
          to="/test"
          className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-all transform hover:scale-105"
        >
          테스트 시작하기
        </Link>
      </section>
    </div>
  );
};

export default TypesListPage;