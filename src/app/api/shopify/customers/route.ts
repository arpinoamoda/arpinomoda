import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface DebugInfo {
  error?: string;
  hasProcessEnv?: boolean;
  envKeysCount?: number;
  allKeys?: string[];
  shopifyDomain?: string;
  shopifyToken?: string;
}

export async function POST(request: NextRequest) {
  // Wrap everything in try-catch to catch any initialization errors
  try {
    // Basic checks first
    const hasProcess = typeof process !== 'undefined';
    const hasEnv = hasProcess && typeof process.env !== 'undefined';

    let debugInfo: DebugInfo;

    if (!hasProcess) {
      debugInfo = { error: 'process is undefined' };
    } else if (!hasEnv) {
      debugInfo = { error: 'process.env is undefined' };
    } else {
      // Safe environment access
      debugInfo = {
        hasProcessEnv: true,
        envKeysCount: Object.keys(process.env).length,
        allKeys: Object.keys(process.env),
        shopifyDomain: process.env.SHOPIFY_DOMAIN || 'undefined',
        shopifyToken: process.env.SHOPIFY_ACCESS_TOKEN ? 'has_value' : 'undefined',
      };
    }

    return new Response(JSON.stringify({ debug: debugInfo }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // Most basic error handling
    return new Response(
      JSON.stringify({
        error: 'caught_exception',
        message: String(err),
      }),
      {
        status: 200, // Return 200 so we can see the error
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
