import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./core/i18n/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
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
