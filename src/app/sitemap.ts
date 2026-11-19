import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL
    const locales = ['en', 'hi', 'mr']
    const lastModified = new Date()

    // One entry per real page. Fragments (#skills) are not separate URLs to crawlers.
    const pages = [
        { path: '', changeFrequency: 'weekly' as const, priority: 1 },
        { path: '/skills', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/projects', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/certifications', changeFrequency: 'monthly' as const, priority: 0.7 },
        { path: '/game', changeFrequency: 'monthly' as const, priority: 0.5 },
    ]
    const localizedEntries = locales.flatMap((locale) =>
        pages.map(({ path, changeFrequency, priority }) => ({
            url: `${baseUrl}/${locale}${path}`,
            lastModified,
            changeFrequency,
            priority,
        }))
    )

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...localizedEntries,
    ]
}
