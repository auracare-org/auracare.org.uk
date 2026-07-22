import type { RequestHandler } from './$types';

export const prerender = true;

const BASE = 'https://auracare.org.uk';

const routes: { path: string; priority: number; changefreq: string }[] = [
	{ path: '/', priority: 1.0, changefreq: 'weekly' },
	{ path: '/product', priority: 0.9, changefreq: 'weekly' },
	{ path: '/product/auracare', priority: 0.9, changefreq: 'weekly' },
	{ path: '/technology', priority: 0.8, changefreq: 'monthly' },
	{ path: '/careers', priority: 0.6, changefreq: 'weekly' },
	{ path: '/privacy', priority: 0.3, changefreq: 'yearly' },
	{ path: '/terms', priority: 0.3, changefreq: 'yearly' },
	{ path: '/cookies', priority: 0.3, changefreq: 'yearly' },
	{ path: '/accessibility', priority: 0.3, changefreq: 'yearly' }
];

// Generated at build time (routes are prerendered), so this reflects the
// last deploy — a reasonable lastmod for a marketing site.
const lastmod = new Date().toISOString().slice(0, 10);

export const GET: RequestHandler = () => {
	const urls = routes
		.map(
			(r) => `	<url>
		<loc>${BASE}${r.path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${r.changefreq}</changefreq>
		<priority>${r.priority.toFixed(1)}</priority>
	</url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'max-age=3600' }
	});
};
