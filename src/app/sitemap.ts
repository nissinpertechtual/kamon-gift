import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

type RouteConfig = {
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}

const ROUTES: RouteConfig[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/column', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/legal', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/en', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/en/products', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/en/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/en/faq', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/en/legal', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/en/column', changeFrequency: 'weekly', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE.url}${path}`,
    changeFrequency,
    priority,
  }))
}
