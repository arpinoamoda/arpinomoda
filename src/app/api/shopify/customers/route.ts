import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // Type the environment properly
    const env = process.env as Record<string, string | undefined>;

    return NextResponse.json({
      debug: {
        hasProcessEnv: typeof process !== 'undefined',
        processEnvKeys: Object.keys(process?.env || {}).filter((k) => k.includes('SHOPIFY')),
        shopifyVars: {
          domain: env.SHOPIFY_DOMAIN ? 'exists' : 'missing',
          token: env.SHOPIFY_ACCESS_TOKEN ? 'exists' : 'missing',
        },
      },
    });
  } catch (error) {
    // Properly type the error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Debug failed',
        message: errorMessage,
      },
      { status: 500 },
    );
  }
}
