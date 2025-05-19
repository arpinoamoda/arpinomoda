// Configuration for @cloudflare/next-on-pages
module.exports = {
  // Explicitly set the output directory to avoid Vercel paths
  outputDir: '.cloudflare',
  // Enable experimental Node.js compatibility mode
  experimentalNodeCompat: true,
  // Include the nodejs_compat flag
  buildCompatibilityFlags: ['nodejs_compat']
};