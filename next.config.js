//import type { NextConfig } from "next";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";


const nextConfig = {
  /* config options here */
  devIndicators: false,
    experimental: {
        authInterrupts: true,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()];
        }
        return config;
    },
};

export default nextConfig;

