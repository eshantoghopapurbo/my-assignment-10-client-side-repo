
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // এখানে আপনার হোস্টনামটি দিন
        port: '',
        pathname: '/**', // সব ধরনের পাথ এলাও করার জন্য
      },
    ],
  },
};

export default nextConfig;