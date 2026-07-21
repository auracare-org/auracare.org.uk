// The marketing site is fully static (no server load functions), so prerender
// every route to plain HTML at build time. This ships crawler-ready markup and
// removes server render latency, both of which help SEO and Core Web Vitals.
export const prerender = true;
