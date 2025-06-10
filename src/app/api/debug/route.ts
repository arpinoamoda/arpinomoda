import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Simplified response to ensure it works
    return NextResponse.json({
      status: 'ok',
      env: {
        // Non-sensitive checks for environment variables
        shopify_domain: {
          exists: typeof process.env.SHOPIFY_DOMAIN !== 'undefined',
          has_value: !!process.env.SHOPIFY_DOMAIN
        },
        shopify_token: {
          exists: typeof process.env.SHOPIFY_ACCESS_TOKEN !== 'undefined',
          has_value: !!process.env.SHOPIFY_ACCESS_TOKEN
        },
        // List available environment variables (excluding internal ones)
        available_vars: Object.keys(process.env)
          .filter(key => !key.startsWith('NEXT_') && !key.startsWith('NODE_'))
      },
      runtime: {
        // Add runtime info
        edge: true,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    // Simple error response
    return NextResponse.json({ error: 'Debug endpoint error' });
  }
}