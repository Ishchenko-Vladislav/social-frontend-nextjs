/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: true,
  disable: process.env.DEV_MODE == "development",
  disableDevLogs: true,
});

const nextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    APP_URL: process.env.APP_URL,
    DEV_MODE: process.env.DEV_MODE,
  },
};

module.exports = withPWA(nextConfig);
