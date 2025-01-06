/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['app', 'components', 'hooks', 'lib', 'test', 'types', 'util'],
  },
  devIndicators: {
    appIsrStatus: false,
  },
  serverExternalPackages: ['@whatwg-node'],
}

export default nextConfig
