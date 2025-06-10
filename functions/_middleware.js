// Middleware to add CORS headers to all responses
export async function onRequest(context) {
  // Extract request object from context
  const { request, next } = context;
  
  // Call the next handler to get the response
  const response = await next();
  
  // Clone the response and add CORS headers
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  // Return the modified response
  return newResponse;
}