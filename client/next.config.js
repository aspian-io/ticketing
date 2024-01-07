/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};

module.exports = nextConfig;
