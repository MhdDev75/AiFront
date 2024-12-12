import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./core/i18n/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.iconscout.com',
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
