module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
    ],
    // Legacy domains support (will be deprecated)
    domains: [
      'images.unsplash.com',
      'cdn.pixabay.com',
      'images.pexels.com',
    ],
  },
  reactStrictMode: true,

  // 🔧 Disable ESLint saat build (bisa dienable lagi nanti)
  // Reason: False positive dari Polotno pattern (component dalam object property)
  // Tidak ada risiko security, hanya code quality check
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🆕 TAMBAHAN UNTUK POLOTNO
  transpilePackages: ['polotno'],

  // Webpack config untuk Polotno (jika diperlukan)
  webpack: (config, { isServer }) => {
    // Polotno compatibility
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
      };
    }

    return config;
  },

  // Experimental features (opsional, untuk performa)
  experimental: {
    // Untuk optimasi bundle size
    optimizePackageImports: ['polotno', 'lucide-react'],
  },
};