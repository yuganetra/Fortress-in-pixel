const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com','plus.unsplash.com','encrypted-tbn1.gstatic.com','lh5.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:7048/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
