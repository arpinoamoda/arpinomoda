export async function onRequest(context) {
  try {
    const { request, env } = context;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const shopifyDomain = env.SHOPIFY_DOMAIN;
    const accessToken = env.SHOPIFY_ACCESS_TOKEN;

    if (!shopifyDomain || !accessToken) {
      return new Response(JSON.stringify({ error: 'Shopify configuration missing' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Get URL parameters for pagination
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit') || '50';
    const sinceId = url.searchParams.get('since_id');

    let apiUrl = `https://${shopifyDomain}/admin/api/2024-01/blogs.json?limit=${limit}`;
    if (sinceId) {
      apiUrl += `&since_id=${sinceId}`;
    }

    const blogsResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
    });

    if (!blogsResponse.ok) {
      const errorData = await blogsResponse.json();
      return new Response(JSON.stringify({
        error: 'Failed to fetch blogs',
        details: errorData,
      }), {
        status: blogsResponse.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const blogsData = await blogsResponse.json();
    
    // For each blog, fetch its articles
    const blogsWithArticles = await Promise.all(
      blogsData.blogs.map(async (blog) => {
        const articlesResponse = await fetch(
          `https://${shopifyDomain}/admin/api/2024-01/blogs/${blog.id}/articles.json?limit=50&published_status=published`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': accessToken,
            },
          }
        );

        if (articlesResponse.ok) {
          const articlesData = await articlesResponse.json();
          return {
            ...blog,
            articles: articlesData.articles.map(article => ({
              id: article.id,
              title: article.title,
              content: article.content,
              summary: article.summary,
              author: article.author,
              created_at: article.created_at,
              updated_at: article.updated_at,
              published_at: article.published_at,
              tags: article.tags,
              handle: article.handle,
              image: article.image,
            }))
          };
        } else {
          return {
            ...blog,
            articles: []
          };
        }
      })
    );

    return new Response(JSON.stringify({
      success: true,
      blogs: blogsWithArticles,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error.message,
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}