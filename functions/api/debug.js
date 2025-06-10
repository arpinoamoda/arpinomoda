export async function onRequest(context) {
  try {
    const { env } = context;
    
    // Build response with environment information
    const responseData = {
      status: 'ok',
      env: {
        // Non-sensitive checks for environment variables
        shopify_domain: {
          exists: typeof env.SHOPIFY_DOMAIN !== 'undefined',
          has_value: !!env.SHOPIFY_DOMAIN
        },
        shopify_token: {
          exists: typeof env.SHOPIFY_ACCESS_TOKEN !== 'undefined',
          has_value: !!env.SHOPIFY_ACCESS_TOKEN
        },
        // List available environment variables (excluding internal ones)
        available_vars: Object.keys(env).filter(key => 
          !key.startsWith('NEXT_') && !key.startsWith('NODE_')
        )
      },
      runtime: {
        // Add runtime info
        cloudflare: true,
        timestamp: new Date().toISOString()
      }
    };
    
    return new Response(JSON.stringify(responseData, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Debug endpoint error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}