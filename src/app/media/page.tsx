'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
  summary: string;
  author: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  tags: string;
  handle: string;
  image?: {
    alt: string;
    src: string;
  };
}

interface Blog {
  id: number;
  title: string;
  handle: string;
  articles: Article[];
}

export default function Media() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/shopify/blogs');
        const data = (await response.json()) as { success: boolean; blogs: Blog[]; error?: string };

        if (data.success) {
          setBlogs(data.blogs);
        } else {
          setError(data.error || 'Failed to fetch blogs');
        }
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center p-8 w-full">
          <div className="animate-pulse">Loading blog posts...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center p-8 w-full">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  const allArticles = blogs
    .flatMap((blog) => blog.articles.map((article) => ({ ...article, blogTitle: blog.title })))
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return (
    <>
      <section className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center p-8 w-full max-w-[1800px] mx-auto">
          {allArticles.length === 0 ? (
            <div className="text-center text-gray-500">No blog posts found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {article.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.image.src}
                        alt={article.image.alt || article.title}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(article.published_at).toLocaleDateString()}
                      {article.author && ` • By ${article.author}`}
                    </div>
                    <p className="text-xl font-bold mb-3 line-clamp-2">{article.title}</p>
                    {article.summary && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
                    )}
                    {article.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.split(',').map((tag) => (
                          <span
                            key={tag.trim()}
                            className="px-2 py-1 bg-gray-100 text-sm rounded"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/media/${article.handle}`}
                      className="hover:underline"
                    >
                      Read Full Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
