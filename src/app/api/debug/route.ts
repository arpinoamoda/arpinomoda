import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Create a safe version of environment variables (no sensitive values)
    const envKeys = Object.keys(process.env).filter(key => 
      !key.startsWith('NEXT_') && 
      !key.startsWith('NODE_')
    );
    
    const envStatus = {
      available_keys: envKeys,
      shopify_domain_exists: typeof process.env.SHOPIFY_DOMAIN !== 'undefined',
      shopify_access_token_exists: typeof process.env.SHOPIFY_ACCESS_TOKEN !== 'undefined'
    };
    
    return NextResponse.json({ 
      status: 'ok',
      environment: envStatus
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json({ error: 'Debug endpoint error' }, { status: 500 });
  }
}