const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
};

module.exports = withPWA(nextConfig);
