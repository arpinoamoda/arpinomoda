// Simple test function to verify Cloudflare Functions are working
export async function onRequest(context) {
  return new Response(JSON.stringify({
    status: 'ok',
    message: 'Cloudflare Function is working',
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}