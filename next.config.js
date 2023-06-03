/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RAWG_API_KEY: process.env.RAWG_API_KEY,
  },
  images: {
    domains: ["cdn.discordapp.com", "media.rawg.io"],
  },
};

module.exports = nextConfig;
