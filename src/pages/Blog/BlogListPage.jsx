import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { blogPosts } from '../../content/blog/blogData';

const BlogListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'mbti-basics', label: 'MBTI 기초' },
    { value: 'character-analysis', label: '캐릭터 분석' },
    { value: 'relationships', label: '관계와 궁합' },
    { value: 'career', label: '진로와 직업' },
    { value: 'self-improvement', label: '자기계발' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          MBTI 인사이트 블로그
        </h1>
        <p className="text-xl text-gray-300">
          MBTI와 진격의 거인에 대한 깊이 있는 분석과 인사이트
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category.value
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <article key={post.slug} className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-800/70 transition-all">
            {post.thumbnail && (
              <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative">
                <img 
                  src={post.thumbnail} 
                  alt={post.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-600/80 text-white text-xs font-semibold rounded-full">
                    {categories.find(c => c.value === post.category)?.label}
                  </span>
                </div>
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {post.date} · {post.readTime}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-red-500 hover:text-red-400 font-medium"
                >
                  읽기 →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">해당 카테고리에 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default BlogListPage;