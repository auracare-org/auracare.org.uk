import { redirect } from '@sveltejs/kit';

/**
 * `/product` used to BE the Auracle page, which made it both the parent of
 * `/product/auracare` and a sibling of it. The nav could not express that: the
 * "Product" trigger and the "Auracle" menu item pointed at the same URL.
 *
 * The two products are now siblings under `/product`, and this route redirects
 * so every link that already exists keeps landing on the page it meant.
 */
export const prerender = false;

export function load() {
	redirect(308, '/product/auracle');
}
