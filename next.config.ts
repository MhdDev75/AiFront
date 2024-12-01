import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/core/i18n/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'qph.cf2.poecdn.net',
            port: '',
            pathname: '/**',
          },
          {
            protocol:"https",
            hostname:"www.techiyan.com",
            pathname:"/wp-content/**",
            port:""
          }
        ],
      },
};

export default withNextIntl(nextConfig);
