import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/essays': ['./src/app/essays/**/*.mdx'],
    '/essays/*': ['./src/app/essays/**/*.mdx'],
    '/projects': ['./src/app/projects/**/*.mdx'],
    '/projects/*': ['./src/app/projects/**/*.mdx'],
    '/papers': ['./src/app/papers/**/*.mdx'],
    '/papers/*': ['./src/app/papers/**/*.mdx'],
  },
  async redirects() {
    // Essays and papers used to live under /articles; keep old links working.
    // Order matters: the paper rule must come before the generic essay rule.
    return [
      {
        source: '/articles/:slug(paper-\\d+)',
        destination: '/papers/:slug',
        permanent: true,
      },
      { source: '/articles', destination: '/essays', permanent: true },
      { source: '/articles/:slug', destination: '/essays/:slug', permanent: true },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex, rehypePrism],
  },
})

export default withMDX(nextConfig)
