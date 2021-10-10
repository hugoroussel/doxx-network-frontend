module.exports = {
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
};
