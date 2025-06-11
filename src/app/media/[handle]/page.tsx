import { Section, SectionInner } from '@/components/ui/components';
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';

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
  body_html: string; // Added this property
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

export async function generateStaticParams() {
  // For static export, we need to fetch directly from Shopify at build time
  const shopifyDomain = process.env.SHOPIFY_DOMAIN;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  if (!shopifyDomain || !accessToken) {
    console.warn('Shopify configuration missing for static generation');
    return [];
  }

  try {
    // Fetch blogs
    const blogsResponse = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/blogs.json?limit=50`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
      },
    );

    if (!blogsResponse.ok) {
      console.error('Failed to fetch blogs for static generation');
      return [];
    }

    const blogsData = (await blogsResponse.json()) as { blogs: Blog[] };

    // Fetch articles for each blog
    const allHandles: string[] = [];

    for (const blog of blogsData.blogs) {
      const articlesResponse = await fetch(
        `https://${shopifyDomain}/admin/api/2024-01/blogs/${blog.id}/articles.json?limit=50&published_status=published`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
          },
        },
      );

      if (articlesResponse.ok) {
        const articlesData = (await articlesResponse.json()) as { articles: Article[] };
        allHandles.push(...articlesData.articles.map((article: Article) => article.handle));
      }
    }

    return allHandles.map((handle) => ({ handle }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function fetchArticle(handle: string): Promise<(Article & { blogTitle: string }) | null> {
  const shopifyDomain = process.env.SHOPIFY_DOMAIN;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  if (!shopifyDomain || !accessToken) {
    return null;
  }

  try {
    // Fetch blogs
    const blogsResponse = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/blogs.json?limit=50`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
      },
    );

    if (!blogsResponse.ok) {
      return null;
    }

    const blogsData = (await blogsResponse.json()) as { blogs: Blog[] };

    // Find the article across all blogs
    for (const blog of blogsData.blogs) {
      const articlesResponse = await fetch(
        `https://${shopifyDomain}/admin/api/2024-01/blogs/${blog.id}/articles.json?limit=50&published_status=published`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken,
          },
        },
      );

      if (articlesResponse.ok) {
        const articlesData = (await articlesResponse.json()) as { articles: Article[] };
        const foundArticle = articlesData.articles.find((article) => article.handle === handle);

        if (foundArticle) {
          return { ...foundArticle, blogTitle: blog.title };
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticleDetail({ params }: { params: { handle: string } }) {
  const article = await fetchArticle(params.handle);

  if (!article) {
    return (
      <section className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center p-8 w-full">
          <div className="text-red-500">Article not found</div>
          <Link
            href="/media"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            ← Back to Media
          </Link>
        </div>
      </section>
    );
  }

  // Fixed console.log statements
  console.log('Full article object:', article);
  console.log('Article body HTML:', article.body_html);

  return (
    <Section>
      <SectionInner>
        <div className="max-w-[800px] mx-auto">
          <div className="mb-4 text-left w-full px-2">
            <Link
              href="/media"
              className="hover:underline"
            >
              Back
            </Link>
          </div>
          <article className="prose prose-lg max-w-none">
            {article.image && (
              <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={article.image.src}
                  alt={article.image.alt || article.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
            )}
            <header>
              <p className="text-4xl font-bold mb-4 text-left">
                {article.title || 'Untitled Article'}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <span>
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString()
                    : 'No date'}
                </span>
                <span>•</span>
                {article.author && <span>By {article.author}</span>}
              </div>
            </header>
            {/* Article content */}
            <div className="prose-content mt-4 text-left">{parse(article.body_html)}</div>
          </article>
        </div>
      </SectionInner>
    </Section>
  );
}
