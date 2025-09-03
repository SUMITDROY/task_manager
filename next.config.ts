const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // 🚀 This ignores ALL TS errors during build
  },
};

module.exports = nextConfig;
