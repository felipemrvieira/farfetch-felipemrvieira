/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.vercel.com", "images2.imgbox.com", "i.imgur.com"],
    // formats: ["image/jpeg", "image/png"],
  },
};

module.exports = nextConfig;
