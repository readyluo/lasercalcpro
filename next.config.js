/** @type {import('next').NextConfig} */
const nextConfig = {
  // React 严格模式
  reactStrictMode: true,

  // 编译器配置
  // compiler: {
  //   // 生产环境移除 console
  //   removeConsole: process.env.NODE_ENV === 'production' ? {
  //     exclude: ['error', 'warn'],
  //   } : false,
  // },

  // 不设置 output，保留默认值以支持动态功能
  // Cloudflare Pages 通过 @cloudflare/next-on-pages 支持 SSR
  
  // 图片优化配置
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lasercalcpro.com',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
    ],
  },

  // 环境变量（公开）
  env: {
    SITE_URL: process.env.SITE_URL || 'https://lasercalcpro.com',
  },

  // Webpack 配置（高级）
  webpack: (config, { isServer }) => {
    // 解决潜在的模块问题
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },

  // TypeScript 配置
  typescript: {
    // 生产构建时暂时忽略类型错误（部署后可以修复）
    ignoreBuildErrors: false,
  },

  // ESLint 配置
  eslint: {
    // 生产构建时暂时忽略 lint 错误（部署后可以修复）
    ignoreDuringBuilds: false,
  },

  // 页面扩展名
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // 国际化（未来扩展）
  // i18n: {
  //   locales: ['en', 'zh'],
  //   defaultLocale: 'en',
  // },
};

module.exports = nextConfig;

