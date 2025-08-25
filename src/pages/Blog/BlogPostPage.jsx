import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { blogPosts } from '../../content/blog/blogData';
import ShareButtons from '../../components/ShareButtons';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">포스트를 찾을 수 없습니다</h1>
        <Link to="/blog" className="text-red-500 hover:text-red-400">
          블로그 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4">
          <Link to="/blog" className="text-red-500 hover:text-red-400">
            ← 블로그 목록
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-400">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={post.thumbnail} 
            alt={post.title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg prose-invert max-w-none">
        <div className="bg-gray-800/50 rounded-lg p-8 space-y-6 text-gray-300">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="space-y-4">
              <p className="leading-relaxed">
                {post.excerpt}
              </p>
              <p className="text-center text-gray-500 py-12">
                [전체 콘텐츠가 곧 추가될 예정입니다]
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Share Section */}
      <div className="mt-8 pt-8 border-t border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">이 글 공유하기</h3>
        <ShareButtons 
          title={post.title}
          description={post.excerpt}
        />
      </div>

      {/* Related Posts */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <h3 className="text-2xl font-semibold text-white mb-6">관련 글</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogPosts
            .filter(p => p.slug !== slug && p.category === post.category)
            .slice(0, 2)
            .map(relatedPost => (
              <Link
                key={relatedPost.slug}
                to={`/blog/${relatedPost.slug}`}
                className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all"
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  {relatedPost.title}
                </h4>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {relatedPost.excerpt}
                </p>
              </Link>
            ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-between">
        <Link
          to="/blog"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all"
        >
          목록으로
        </Link>
        <Link
          to="/test"
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all"
        >
          테스트 하기
        </Link>
      </div>
    </article>
  );
};

export default BlogPostPage;