<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';

	const lastUpdated = '14 July 2026';

	const measures = [
		{
			title: 'Motion you can switch off',
			body: 'We honour your <code>prefers-reduced-motion</code> setting. When it is on, our heavier animations — the orbiting hero, the scroll-driven timeline, the world-map waves and the counting statistics — are disabled or reduced to a simple fade, and every piece of content stays readable without any of them.'
		},
		{
			title: 'Keyboard-operable throughout',
			body: 'Navigation, menus, dialogs and interactive controls can be reached and operated with a keyboard alone. Focus order follows the reading order, and focus is never trapped.'
		},
		{
			title: 'Text alternatives for visuals',
			body: 'Our animated world map, company timeline and market charts each carry a plain-language text equivalent, so the underlying data does not depend on seeing — or animating — the graphic.'
		},
		{
			title: 'Sufficient colour contrast',
			body: 'Text and essential interface elements are chosen to meet WCAG AA contrast ratios against their background, on both our light sections and our dark, luminous ones.'
		},
		{
			title: 'Semantic structure',
			body: 'Pages use proper landmarks and a single, ordered heading outline, with descriptive alt text on meaningful images and accessible names on icon-only buttons — so assistive technology can navigate the page the way it is meant to be read.'
		},
		{
			title: 'Responsive and zoomable',
			body: 'The layout reflows for small screens and remains usable when text is enlarged or the page is zoomed, without loss of content or horizontal scrolling of the page body.'
		}
	];
</script>

<Seo
	title="Accessibility"
	description="Auracare's commitment to an accessible website, and the measures we've taken."
	path="/accessibility"
/>

<section class="acc-hero aura-space">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Accessibility</span>
		<h1 use:reveal={{ delay: 60 }}>
			Built to be used by <span class="text-gradient">everyone</span>.
		</h1>
		<p class="lede" use:reveal={{ delay: 140 }}>
			We want the whole Auracare site to be perceivable, operable and understandable — whatever
			device, browser or assistive technology you use. This statement sets out what we aim for, what
			we have done, and how to tell us where we fall short.
		</p>
		<p class="updated" use:reveal={{ delay: 200 }}>Last updated: {lastUpdated}</p>
	</div>
</section>

<section class="acc-body section-y">
	<div class="container-wide prose">
		<div class="block" use:reveal>
			<h2>Our commitment</h2>
			<p>
				We aim to meet the <strong
					>Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA</strong
				> as our target across this website. Accessibility is not a one-off task for us: as we add new
				pages and features, we test against that same standard and treat regressions as bugs.
			</p>
		</div>

		<div class="block" use:reveal>
			<h2>Measures we have taken</h2>
			<p>
				This site leans on rich motion and data visualisation to tell our story. We have made
				deliberate choices so that nothing important depends on being able to see or run those
				effects.
			</p>
			<div class="measure-grid">
				{#each measures as m, i}
					<article class="glass-card measure" use:reveal={{ delay: 60 + i * 60 }}>
						<h3>{m.title}</h3>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<p>{@html m.body}</p>
					</article>
				{/each}
			</div>
		</div>

		<div class="block" use:reveal>
			<h2>Known limitations</h2>
			<p>
				We are honest about where we are. A few of our data visualisations — most notably the
				animated market map, the scrolling timeline and the count-up statistics — are enhanced with
				motion, and their richest form is the animated one. For each of these we provide a text
				equivalent that conveys the same information, but we know a text summary is not always a
				perfect substitute for an interactive graphic.
			</p>
			<p>
				Some third-party content, such as the externally hosted 3D ontology explorer, may not yet
				meet our own standard end to end. We are improving the site continuously and will update
				this statement as we close these gaps.
			</p>
		</div>

		<div class="block" use:reveal>
			<h2>Feedback and requesting an accessible format</h2>
			<p>
				If you come across a barrier, need this content in a different format, or have any
				suggestion that would make the site easier to use, please tell us — we take every report
				seriously and will do our best to put things right.
			</p>
			<p>
				Email <a href="mailto:{CONTACT.general}">{CONTACT.general}</a>. Let us know the page, what
				you were trying to do, and the browser or assistive technology you were using, and we will
				get back to you.
			</p>
		</div>
	</div>
</section>

<style>
	.acc-hero {
		padding-block: clamp(7rem, 12vw, 10rem) clamp(3rem, 7vw, 5rem);
	}
	.acc-hero h1 {
		font-size: clamp(2.2rem, 5.5vw, 3.6rem);
		line-height: 1.06;
		letter-spacing: -0.02em;
		margin-block: 0.75rem 1.25rem;
		max-width: 20ch;
	}
	.lede {
		font-size: clamp(1rem, 1.6vw, 1.2rem);
		line-height: 1.65;
		max-width: 46rem;
	}
	.updated {
		margin-top: 1.5rem;
		font-size: 0.85rem;
		opacity: 0.7;
	}

	.prose {
		max-width: 54rem;
	}
	.block + .block {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}
	.prose h2 {
		font-size: clamp(1.5rem, 2.6vw, 2rem);
		letter-spacing: -0.01em;
		margin-bottom: 1rem;
	}
	.prose p {
		font-size: 1.02rem;
		line-height: 1.7;
		color: var(--color-neutral-700);
	}
	.prose p + p {
		margin-top: 1rem;
	}
	.prose a {
		color: var(--color-primary-600);
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.prose a:hover {
		color: var(--color-primary-700);
	}
	.prose :global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.86em;
		background: var(--color-primary-50);
		color: var(--color-primary-700);
		padding: 0.1em 0.4em;
		border-radius: 6px;
	}

	.measure-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: 1.75rem;
	}
	.measure {
		padding: 1.5rem;
		border-radius: var(--radius-2xl);
	}
	.measure h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}
	.measure p {
		font-size: 0.96rem;
		line-height: 1.6;
		margin: 0;
	}

	@media (min-width: 720px) {
		.measure-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
