const nextConfig = {
  transpilePackages: [
    "@fullcalendar/common",
    "@babel/preset-react",
    "@fullcalendar/daygrid",
    "@fullcalendar/interaction",
    "@fullcalendar/react",
    "@fullcalendar/timegrid",
  ],

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "tdc-1";
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "104.211.230.191",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "media.example.com",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: '/company/external-site',
        destination: '/company-directory',
        permanent: true,
      },
      {
        source: '/job/[jobId]/[jobSlug]',
        destination: '/job-list',
        permanent: true,
      },
      {
        source: '/company/the-droning-company',
        destination: '/company-directory',
        permanent: true,
      },
      {
        source: '/job/3024/faa-drone-pilot-photography-and-videography-1',
        destination: '/job-list',
        permanent: true,
      },
      {
        source: '/company/[slug]',
        destination: '/company-directory',
        permanent: true,
      },
      {
        source: '/event/[slug]',
        destination: '/events',
        permanent: true,
      },
      {
        source: '/pilot/[slug]',
        destination: '/pilot-list',
        permanent: true,
      },
      {
        source: '/news/categories/[categorySlug]',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/company/laphototeam',
        destination: '/company/la-photo-team',
        permanent: true,
      },
    ]
  },

};

module.exports = nextConfig;

