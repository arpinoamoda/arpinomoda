# Arpino Moda Website

This project is a Next.js website deployed on Cloudflare Pages with both Next.js API Routes (for local development) and Cloudflare Pages Functions (for production).

## Development Setup

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
SHOPIFY_DOMAIN=your-shopify-domain
SHOPIFY_ACCESS_TOKEN=your-shopify-access-token
```

### Local Development

```bash
# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment Architecture

This project uses a dual API setup:

1. **Local Development**: Uses Next.js API Routes in `src/app/api/`
2. **Production (Cloudflare)**: Uses Cloudflare Pages Functions in `functions/`

When deploying to Cloudflare, the Pages Functions in the `functions/` directory will be used instead of the Next.js API routes.

## Cloudflare Pages Deployment

### Environment Variables

In the Cloudflare Dashboard:
1. Go to your Pages project
2. Navigate to Settings > Environment variables
3. Add the following variables for the Production environment:
   - `SHOPIFY_DOMAIN`: Your Shopify domain
   - `SHOPIFY_ACCESS_TOKEN`: Your Shopify access token

### Deployment

Deployments are handled via GitHub Actions or Cloudflare's Git integration. When pushing to the main branch, the site will be automatically deployed.

## Troubleshooting

If you're experiencing issues with environment variables in Cloudflare:

1. Check the debug endpoint at `/api/debug` to see what environment variables are available
2. Verify that the variables are set correctly in the Cloudflare Dashboard
3. Ensure you've set the variables for the correct environment (Production vs Preview)

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/functions/bindings/#environment-variables)