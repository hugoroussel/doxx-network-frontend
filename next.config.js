const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
  trailingSlash: true,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    SERVER_IP: process.env.SERVER_IP,
    CHAIN_ID: process.env.CHAIN_ID,
  },
  async exportPathMap() {
    const paths = {
      '/': { page: '/' },
      '/account': { page: '/account' },
      '/check': { page: '/check' },
      '/register': { page: '/register' },
      '/search': { page: '/search' },
    };
    return paths;
  },
};
