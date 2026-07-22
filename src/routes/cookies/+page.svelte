<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';

	const LAST_UPDATED = '20 July 2026';

	interface StorageEntry {
		key: string;
		type: 'localStorage' | 'Cookie' | 'Cookieless';
		category: string;
		purpose: string;
		retention: string;
	}

	const STORAGE: StorageEntry[] = [
		{
			key: 'auracare-seed-dismissed',
			type: 'localStorage',
			category: 'Strictly necessary',
			purpose: 'Remembers that you dismissed the site announcement banner, so it stays hidden.',
			retention: 'Until you clear your browser storage'
		},
		{
			key: 'cookie_consent',
			type: 'localStorage',
			category: 'Strictly necessary',
			purpose:
				'Records your analytics choice from the consent banner, so we honour it and stop asking.',
			retention: 'Until you clear your browser storage'
		},
		{
			key: 'Vercel Web Analytics',
			type: 'Cookieless',
			category: 'Analytics (optional)',
			purpose:
				'Privacy-conscious, aggregate usage measurement. Cookieless, and only loaded once you accept analytics.',
			retention: 'No persistent storage'
		}
	];
</script>

<Seo title="Cookies" description="How Auracare uses cookies and analytics." path="/cookies" />

<section class="cookies-hero aura-space">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Cookie policy</span>
		<h1 use:reveal={{ delay: 60 }}>
			A short, honest note about <span class="text-gradient-l">cookies</span>.
		</h1>
		<p class="lede" use:reveal={{ delay: 140 }}>
			We keep this site deliberately light. We use a couple of small pieces of storage to make it
			work properly, plus optional, privacy-conscious analytics you can decline. No advertising, no
			third-party tracking, no selling your data.
		</p>
		<p class="updated" use:reveal={{ delay: 200 }}>Last updated: {LAST_UPDATED}</p>
	</div>
</section>

<section class="section-y cookies-body">
	<div class="container-wide prose">
		<article>
			<h2 use:reveal>What cookies are</h2>
			<p use:reveal={{ delay: 60 }}>
				Cookies are tiny text files a website can store in your browser. Related technologies, like <code
					>localStorage</code
				>, do a similar job: they let a page remember something small between visits, such as a
				setting you have chosen. We use the plain word &ldquo;cookies&rdquo; loosely on this page to
				cover both.
			</p>

			<h2 use:reveal>Our approach: keep it minimal</h2>
			<p use:reveal={{ delay: 60 }}>
				We only store what earns its place. The essentials keep the site working the way you expect;
				everything else is optional and off until you say yes. We do not use cookies to build an
				advertising profile of you, and we never share this data with ad networks.
			</p>

			<h2 use:reveal>Strictly-necessary storage</h2>
			<p use:reveal={{ delay: 60 }}>
				These are needed for the site to function and to respect the choices you have made. They do
				not track you across other websites, and they cannot be switched off from within the site
				because it would stop things working. Examples:
			</p>
			<ul>
				<li use:reveal={{ delay: 60 }}>
					<strong>Banner dismissal</strong>: when you close the site announcement banner, we note
					that in your browser (<code>localStorage</code>) so it does not reappear on every page.
				</li>
				<li use:reveal={{ delay: 120 }}>
					<strong>Consent choice</strong>: when you accept or decline analytics, we remember that
					decision (the <code>cookie_consent</code> value) so we can honour it and stop asking.
				</li>
			</ul>

			<h2 use:reveal>Analytics (optional)</h2>
			<p use:reveal={{ delay: 60 }}>
				To understand which pages people find useful, we use privacy-conscious product analytics
				provided through Vercel. It measures things in aggregate (page views, rough device and
				referrer information, broad usage patterns) to help us improve the site. It is designed to
				be light-touch and is not used to advertise to you or to track you around the wider web.
			</p>
			<p use:reveal={{ delay: 120 }}>
				Analytics is <strong>optional</strong> and off by default. It only loads once you accept
				from the consent banner; if you decline, we never load it at all. You can change your mind
				at any time by clearing the <code>cookie_consent</code> value (see below) and choosing again.
			</p>

			<h2 use:reveal>No advertising or third-party tracking</h2>
			<p use:reveal={{ delay: 60 }}>
				We do not use advertising cookies, cross-site tracking pixels, social-media trackers, or
				data brokers. There are no third parties following you from this site to another.
			</p>

			<h2 use:reveal>The storage we use</h2>
			<p use:reveal={{ delay: 60 }}>Here is the full, current list. It is short by design.</p>

			<div class="table-wrap" use:reveal={{ delay: 100 }}>
				<table>
					<caption class="sr-only">
						Cookies and browser storage keys used on this site, with their type, category, purpose
						and how long they last.
					</caption>
					<thead>
						<tr>
							<th scope="col">Key</th>
							<th scope="col">Type</th>
							<th scope="col">Category</th>
							<th scope="col">Purpose</th>
							<th scope="col">Retention</th>
						</tr>
					</thead>
					<tbody>
						{#each STORAGE as row}
							<tr>
								<th scope="row"><code>{row.key}</code></th>
								<td>{row.type}</td>
								<td>
									<span
										class="pill {row.category.startsWith('Analytics') ? 'pill-soon' : 'pill-live'}"
									>
										{row.category}
									</span>
								</td>
								<td>{row.purpose}</td>
								<td>{row.retention}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<h2 use:reveal>Managing and clearing cookies</h2>
			<p use:reveal={{ delay: 60 }}>
				You are always in control. You can decline analytics from the banner, and you can clear or
				block storage directly in your browser at any time:
			</p>
			<ul>
				<li use:reveal={{ delay: 60 }}>
					<strong>Chrome / Edge:</strong> Settings → Privacy and security → Cookies and site data, or
					use &ldquo;Clear browsing data&rdquo;.
				</li>
				<li use:reveal={{ delay: 100 }}>
					<strong>Safari:</strong> Settings → Privacy → Manage Website Data, then remove auracare.org.uk.
				</li>
				<li use:reveal={{ delay: 140 }}>
					<strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data → Manage
					Data.
				</li>
			</ul>
			<p use:reveal={{ delay: 60 }}>
				Clearing site data will also remove your saved consent choice and the banner-dismissal flag,
				so you may be asked again on your next visit. Blocking all storage may stop some parts of
				the site from remembering your preferences.
			</p>

			<h2 use:reveal>Changes to this policy</h2>
			<p use:reveal={{ delay: 60 }}>
				As the site evolves, we may update this policy. When we do, we will revise the &ldquo;last
				updated&rdquo; date above. Material changes will be made clear on the page.
			</p>

			<h2 use:reveal>Contact</h2>
			<p use:reveal={{ delay: 60 }}>
				Questions about cookies or your privacy? Email us at
				<a href="mailto:{CONTACT.privacy}">{CONTACT.privacy}</a> and we will be glad to help.
			</p>
		</article>
	</div>
</section>

<style>
	.cookies-hero {
		padding-block: clamp(6rem, 12vw, 9rem) clamp(3rem, 6vw, 4.5rem);
	}
	.cookies-hero h1 {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		line-height: 1.05;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 1.25rem;
		max-width: 20ch;
	}
	.text-gradient-l {
		background: linear-gradient(100deg, #8aa0ff, #cdd9ff);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.cookies-hero .lede {
		font-size: clamp(1rem, 1.6vw, 1.18rem);
		line-height: 1.65;
		max-width: 44rem;
	}
	.cookies-hero .updated {
		margin-top: 1.5rem;
		font-size: 0.85rem;
		opacity: 0.7;
	}

	.prose {
		max-width: 46rem;
	}
	.prose :global(h2) {
		font-size: clamp(1.3rem, 2.4vw, 1.6rem);
		letter-spacing: -0.01em;
		margin-top: 2.75rem;
		margin-bottom: 0.75rem;
		color: var(--color-neutral-900);
	}
	.prose :global(h2:first-child) {
		margin-top: 0;
	}
	.prose :global(p) {
		line-height: 1.7;
		color: var(--color-neutral-700);
		margin-bottom: 1rem;
	}
	.prose :global(ul) {
		margin: 0 0 1.25rem;
		padding-left: 1.25rem;
		display: grid;
		gap: 0.6rem;
	}
	.prose :global(li) {
		line-height: 1.6;
		color: var(--color-neutral-700);
	}
	.prose :global(strong) {
		color: var(--color-neutral-900);
		font-weight: 600;
	}
	.prose :global(a) {
		color: var(--color-primary-600);
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.prose :global(a:hover) {
		color: var(--color-primary-700);
	}
	.prose :global(code) {
		font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.85em;
		background: var(--color-primary-50);
		color: var(--color-primary-700);
		padding: 0.1rem 0.4rem;
		border-radius: 6px;
		white-space: nowrap;
	}

	.table-wrap {
		overflow-x: auto;
		margin: 1.25rem 0 1.5rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-neutral-200);
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
		min-width: 40rem;
	}
	thead th {
		text-align: left;
		font-family: var(--font-family-heading);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-neutral-500);
		background: var(--color-neutral-50);
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--color-neutral-200);
		white-space: nowrap;
	}
	tbody th,
	tbody td {
		padding: 0.85rem 1rem;
		vertical-align: top;
		border-bottom: 1px solid var(--color-neutral-100);
		color: var(--color-neutral-700);
		line-height: 1.5;
	}
	tbody tr:last-child th,
	tbody tr:last-child td {
		border-bottom: 0;
	}
	tbody th {
		text-align: left;
		font-weight: 500;
	}
	tbody th :global(code) {
		white-space: nowrap;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
