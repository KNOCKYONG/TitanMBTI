import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { characters } from '../../data/characters';

const TypeDetailPage = () => {
  const { mbtiType } = useParams();
  const type = mbtiType?.toUpperCase();
  const character = characters[type];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mbtiType]);

  if (!character) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">유형을 찾을 수 없습니다</h1>
        <Link to="/types" className="text-red-500 hover:text-red-400">
          모든 유형 보기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">{type} - {character.name}</h1>
      <p className="text-xl text-gray-300 mb-8">{character.title}</p>
      
      <div className="bg-gray-800/50 rounded-lg p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">성격 특징</h2>
          <p className="text-gray-300 leading-relaxed">
            {character.description || '상세 설명이 곧 추가될 예정입니다.'}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">강점</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {character.strengths?.map((strength, index) => (
              <li key={index}>{strength}</li>
            )) || <li>곧 추가될 예정입니다.</li>}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">약점</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {character.weaknesses?.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            )) || <li>곧 추가될 예정입니다.</li>}
          </ul>
        </section>
      </div>
      
      <div className="mt-8 text-center">
        <Link
          to="/test"
          className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all mr-4"
        >
          테스트 하기
        </Link>
        <Link
          to="/types"
          className="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all"
        >
          모든 유형 보기
        </Link>
      </div>
    </div>
  );
};

export default TypeDetailPage;