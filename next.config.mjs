
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', 
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
        {
        protocol: "https",
        hostname: "i.ibb.co",
        port:"",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;