import blogData from './blog/blog-data.json'

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  const staticPages = [
    '/',
    '/about',
    '/features',
    '/prices',
    '/market-prices',
    '/testimonials',
    '/blog',
    '/contact',
    '/faq',
  ]

  const pages = staticPages.map((p) => ({ url: `${base}${p}`, lastModified: new Date().toISOString() }))

  // Add blog posts (exclude admin paths)
  const posts = []
  try {
    if (blogData?.featured) {
      posts.push({ url: `${base}/blog/${blogData.featured.id}`, lastModified: blogData.featured.date })
    }
    if (Array.isArray(blogData?.posts)) {
      for (const post of blogData.posts) {
        posts.push({ url: `${base}/blog/${post.id}`, lastModified: post.date })
      }
    }
  } catch (e) {
    // ignore
  }

  return [...pages, ...posts]
}
