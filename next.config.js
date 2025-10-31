/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode
  reactStrictMode: true,

  // Compiler configuration
  compiler: {
    // Remove console in production (keep error and warn)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Performance optimization
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // Experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lasercalcpro.com',
      },
      {
        protocol: 'https',
        hostname: 'www.lasercalcpro.com',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
    ],
  },

  // Public environment variables
  env: {
    SITE_URL: process.env.SITE_URL || 'https://www.lasercalcpro.com',
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Resolve module issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },

  async redirects() {
    return [
      // Force www canonical host
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'lasercalcpro.com',
          },
        ],
        destination: 'https://www.lasercalcpro.com/:path*',
        permanent: true,
      },
      // Legacy redirects
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // TypeScript configuration
  typescript: {
    // Temporarily ignore type errors during build
    ignoreBuildErrors: true,
  },

  // ESLint configuration
  eslint: {
    // Temporarily ignore lint errors during build
    ignoreDuringBuilds: true,
  },

  // Page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Internationalization (future expansion)
  // i18n: {
  //   locales: ['en', 'zh'],
  //   defaultLocale: 'en',
  // },
};

module.exports = nextConfig;

