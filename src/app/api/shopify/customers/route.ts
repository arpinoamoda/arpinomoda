import { type NextRequest, NextResponse } from 'next/server';

// export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { email } = (await request.json()) as { email: string };

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const shopifyDomain = process.env.SHOPIFY_DOMAIN;
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

    // Debug environment variables
    console.log('Environment variables check:', {
      SHOPIFY_DOMAIN_EXISTS: typeof process.env.SHOPIFY_DOMAIN !== 'undefined',
      SHOPIFY_ACCESS_TOKEN_EXISTS: typeof process.env.SHOPIFY_ACCESS_TOKEN !== 'undefined',
      ENV_KEYS: Object.keys(process.env).filter(
        (key) => !key.startsWith('NEXT_') && !key.startsWith('NODE_'),
      ),
    });

    if (!shopifyDomain || !accessToken) {
      console.error('Missing environment variables:', {
        domain: !!shopifyDomain,
        token: !!accessToken,
      });
      return NextResponse.json({ error: 'Shopify configuration missing' }, { status: 500 });
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
      return NextResponse.json(
        { error: 'Failed to subscribe to email list', details: errorData },
        { status: response.status },
      );
    }
    const customer = await response.json();
    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to email list' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error subscribing to email list:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
