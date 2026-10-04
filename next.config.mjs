/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Rotas do hub antigo → equivalentes no hub v2.
    return [
      {source: "/blog", destination: "/devlog", permanent: true},
      {source: "/blog/:slug", destination: "/devlog", permanent: true},
      {source: "/novidades", destination: "/agora", permanent: true}
    ];
  }
};

export default nextConfig;
