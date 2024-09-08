/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true
    },
};

export default nextConfig;