// Cloudflare Pages Function for handling Shopify customer subscriptions
export async function onRequest(context) {
  console.log('Function called with method:', context.request.method);
  
  try {
    const { request, env } = context;
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    if (request.method !== 'POST') {
      console.log('Method not allowed:', request.method);
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    const body = await request.json();
    const { email } = body;
    console.log('Received email:', email);

    if (!email) {
      console.log('No email provided');
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const shopifyDomain = env.SHOPIFY_DOMAIN;
    const accessToken = env.SHOPIFY_ACCESS_TOKEN;

    // Debug logging
    console.log('Environment check:', {
      availableKeys: Object.keys(env),
      hasDomain: !!shopifyDomain,
      hasToken: !!accessToken
    });

    if (!shopifyDomain || !accessToken) {
      console.error('Missing environment variables:', {
        domain: !!shopifyDomain,
        token: !!accessToken,
        allEnvKeys: Object.keys(env)
      });
      return new Response(JSON.stringify({ 
        error: 'Shopify configuration missing',
        debug: {
          availableEnvVars: Object.keys(env),
          hasDomain: !!shopifyDomain,
          hasToken: !!accessToken
        }
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
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
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    await response.json();
    console.log('Successfully created customer');
    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully subscribed to email list'
    }), {
      status: 201,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error in customer endpoint:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}