import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      permissionless: false,
      // Excluded due SSR issues in local :/
    }
    return config
  },
}

export default nextConfig
