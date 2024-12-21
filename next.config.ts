import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./core/i18n/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://64.44.167.150:7001/", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.iconscout.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t.me/i/userpic",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "qph.cf2.poecdn.net",
        pathname: "/**",
        port: "",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
