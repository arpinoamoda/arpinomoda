// Default index function for verification
export async function onRequest(context) {
  return new Response(JSON.stringify({
    status: 'ok',
    message: 'Cloudflare Functions root endpoint is working',
    timestamp: new Date().toISOString(),
    routes: ['/api/debug', '/api/shopify/customers', '/test']
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}