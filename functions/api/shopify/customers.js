// Cloudflare Pages Function for handling Shopify customer subscriptions
export async function onRequest(context) {
  try {
    const { request, env } = context;
    
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const shopifyDomain = env.SHOPIFY_DOMAIN;
    const accessToken = env.SHOPIFY_ACCESS_TOKEN;

    if (!shopifyDomain || !accessToken) {
      console.error('Missing environment variables:', {
        domain: !!shopifyDomain,
        token: !!accessToken,
      });
      return new Response(JSON.stringify({ error: 'Shopify configuration missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(`https://${shopifyDomain}/admin/api/2024-01/customers.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({
        customer: {
          email: email,
          accepts_marketing: true,
          verified_email: false,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Shopify API error:', errorData);
      return new Response(JSON.stringify({
        error: 'Failed to subscribe to email list',
        details: errorData
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const customer = await response.json();
    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully subscribed to email list'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in customer endpoint:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}