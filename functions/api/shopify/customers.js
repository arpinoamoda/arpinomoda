// Cloudflare Pages Function for handling Shopify customer subscriptions
export async function onRequest(context) {
  try {
    // First, return debug information to diagnose issues
    const { request, env } = context;
    const method = request.method;
    
    // List all environment variables (without values)
    const envKeys = Object.keys(env);
    
    // Check if the specific environment variables exist
    const hasShopifyDomain = typeof env.SHOPIFY_DOMAIN !== 'undefined';
    const hasAccessToken = typeof env.SHOPIFY_ACCESS_TOKEN !== 'undefined';
    
    // For debugging purposes, we'll return this information
    return new Response(JSON.stringify({
      debug: true,
      method: method,
      environment: {
        available_variables: envKeys,
        has_shopify_domain: hasShopifyDomain,
        has_access_token: hasAccessToken
      },
      request_info: {
        url: request.url,
        headers: Object.fromEntries([...request.headers])
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
    // Note: The original code is commented out for debugging
    // Once we identify the issue, we'll restore the functional code
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