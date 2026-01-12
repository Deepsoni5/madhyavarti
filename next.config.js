/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Empty turbopack config to use Turbopack (Next.js 16 default)

  turbopack: {
    externals: {
      'pdfjs-dist/legacy/build/pdf.worker.entry': 'pdfjs-dist/legacy/build/pdf.worker.entry',
      'pdfjs-dist/build/pdf.worker.min.js': 'pdfjs-dist/build/pdf.worker.min.js',
      'pdfjs-dist/build/pdf.worker.js': 'pdfjs-dist/build/pdf.worker.js',
      'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.entry',
    },
  },
};

export default nextConfig;
