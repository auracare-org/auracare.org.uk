<script lang="ts">
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';

	let mobileOpen = $state(false);
	let ddOpen = $state(false);
	let ddEl = $state<HTMLElement | null>(null);

	/* The header answers the scroll instead of sitting there as a white slab.
	   At the top it is borderless and lets the paper through; past the fold it
	   takes on the page tone, draws its rule, and carries a brand-blue line
	   showing how far down the document you are. The bar's height never
	   changes: the layout measures it into `--header-h` and feeds that to
	   main's padding, so anything that resized it would shift the whole page
	   under the reader's cursor. */
	let scrolled = $state(false);
	let progress = $state(0);

	$effect(() => {
		/* Reading `scrollY` is cheap; reacting to it is not. This used to run on
		   every scroll event, and each run assigned two pieces of state, so
		   Svelte rewrote the progress bar's inline style and the browser
		   recalculated styles once per event — and scroll events fire faster
		   than frames. Two things fix it: a frame throttle, so the work happens
		   at most once per painted frame, and quantising the progress so state
		   is only assigned when the bar would actually move. The bar is 2px of
		   scaleX, so anything finer than a few hundredths of a percent is
		   invisible and not worth a re-render.

		   The scrollable distance is the one expensive read, and it only changes
		   when the document does, so a ResizeObserver caches it. */
		let max = 0;
		let raf = 0;

		const measure = () => {
			raf = 0;
			const y = window.scrollY;
			const isScrolled = y > 8;
			if (isScrolled !== scrolled) scrolled = isScrolled;
			const next = max > 0 ? Math.round(Math.min(1, Math.max(0, y / max)) * 500) / 500 : 0;
			if (next !== progress) progress = next;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(measure);
		};
		const remeasure = () => {
			max = document.documentElement.scrollHeight - window.innerHeight;
			measure();
		};

		const ro = new ResizeObserver(remeasure);
		ro.observe(document.documentElement);
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', remeasure);
		remeasure();

		return () => {
			ro.disconnect();
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', remeasure);
			if (raf) cancelAnimationFrame(raf);
		};
	});

	/* Close on an outside click or Escape. Without this the menu stays open
	   after you click past it, which reads as a stuck UI. */
	$effect(() => {
		if (!ddOpen) return;
		const onDown = (e: MouseEvent) => {
			if (ddEl && !ddEl.contains(e.target as Node)) ddOpen = false;
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') ddOpen = false;
		};
		document.addEventListener('mousedown', onDown);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onDown);
			document.removeEventListener('keydown', onKey);
		};
	});

	const productMenu = [
		{
			href: '/product/auracare',
			label: 'Auracare CDSS',
			desc: 'Decision support inside the consultation',
			tag: 'Clinical'
		},
		{
			href: '/product/auracle',
			label: 'Auracle',
			desc: 'The social history the record cannot supply',
			tag: 'Consumer'
		}
	];

	const links = [
		{ href: '/technology', label: 'Technology' },
		{ href: '/investors', label: 'Investors' },
		{ href: '/careers', label: 'Careers' }
	];

	const isActive = (href: string) =>
		page.url.pathname === href || (href !== '/' && page.url.pathname.startsWith(href + '/'));

	// The Product tab is active on /product and any product sub-page.
	const productActive = () => page.url.pathname.startsWith('/product');
</script>

<nav class="nav" class:nav--scrolled={scrolled} aria-label="Primary">
	<div class="container-wide nav-inner">
		<a href="/" class="nav-logo" aria-label="Auracare home">
			<img src="/SVG/Asset 5.svg" alt="Auracare" />
		</a>

		<div class="nav-links">
			<div class="nav-dd" bind:this={ddEl}>
				<!-- A button, not a link. As an <a href="/product"> a click navigated
				     away before the menu could be used, and a tap on touch opened
				     nothing at all: the menu was CSS :hover only. -->
				<button
					type="button"
					class="nav-item nav-dd-trigger"
					class:active={productActive()}
					aria-expanded={ddOpen}
					aria-haspopup="true"
					onclick={() => (ddOpen = !ddOpen)}
				>
					Products
					<svg
						class="nav-caret"
						width="10"
						height="10"
						viewBox="0 0 12 12"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M3 4.5L6 7.5L9 4.5"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div class="nav-submenu" class:open={ddOpen} role="menu">
					{#each productMenu as item}
						<a
							href={item.href}
							class="nav-sub-item"
							class:active={page.url.pathname === item.href}
							role="menuitem"
							onclick={() => (ddOpen = false)}
						>
							<span class="nav-sub-top">
								<span class="nav-sub-label">{item.label}</span>
								<span class="nav-sub-tag">{item.tag}</span>
							</span>
							<span class="nav-sub-desc">{item.desc}</span>
						</a>
					{/each}
				</div>
			</div>
			{#each links as link}
				<a href={link.href} class="nav-item" class:active={isActive(link.href)}>{link.label}</a>
			{/each}
		</div>

		<div class="nav-cta">
			<a class="nav-waitlist" href="/investors#contact">Enquire</a>
		</div>

		<button
			class="nav-burger"
			aria-label="Menu"
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			{#if mobileOpen}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
					><path
						d="M6 6l12 12M18 6L6 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/></svg
				>
			{:else}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
					><path
						d="M4 7h16M4 12h16M4 17h16"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/></svg
				>
			{/if}
		</button>
	</div>

	{#if mobileOpen}
		<div class="nav-mobile" transition:slide={{ duration: 250 }}>
			<div class="container-wide nav-mobile-inner">
				<span class="nav-mobile-group">Product</span>
				{#each productMenu as item}
					<a
						href={item.href}
						class="nav-mobile-item nav-mobile-sub"
						onclick={() => (mobileOpen = false)}
					>
						<span class="nav-mobile-sub-label">{item.label}</span>
						<span class="nav-mobile-sub-desc">{item.desc}</span>
					</a>
				{/each}
				{#each links as link}
					<a href={link.href} class="nav-mobile-item" onclick={() => (mobileOpen = false)}
						>{link.label}</a
					>
				{/each}
				<div class="nav-mobile-cta">
					<a class="nav-invest" href="/investors" onclick={() => (mobileOpen = false)}
						>For investors</a
					>
					<a class="nav-waitlist" href="/investors#contact" onclick={() => (mobileOpen = false)}
						>Enquire</a
					>
				</div>
			</div>
		</div>
	{/if}

	<span class="nav-progress" style="--p:{progress}" aria-hidden="true"></span>
</nav>

<style>
	.nav {
		position: relative;
		background: transparent;
		border-bottom: 1px solid transparent;
		transition:
			background var(--duration-hover) ease,
			border-color var(--duration-hover) ease;
	}
	/* Opaque paper rather than a blurred translucent pane: glassmorphism is
	   explicitly out of the system, and an opaque bar costs nothing to
	   composite while scrolling. */
	.nav--scrolled {
		background: var(--color-surface-page);
		border-bottom-color: var(--color-rule);
	}
	/* How far through the document you are, drawn on the header's own rule. */
	.nav-progress {
		position: absolute;
		left: 0;
		bottom: -1px;
		height: 2px;
		width: 100%;
		transform: scaleX(var(--p, 0));
		transform-origin: left center;
		background: var(--color-primary-600);
		opacity: 0;
		transition: opacity var(--duration-hover) ease;
		pointer-events: none;
	}
	.nav--scrolled .nav-progress {
		opacity: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.nav,
		.nav-progress {
			transition: none;
		}
	}
	.nav-inner {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding-block: 0.85rem;
	}
	.nav-logo {
		display: inline-flex;
		align-items: center;
		/* Matches the burger's reach, so both ends of the bar are equally
		   tappable without moving the logo. */
		min-height: 44px;
	}
	.nav-logo img {
		height: 1.35rem;
		width: auto;
	}
	.nav-links {
		display: none;
		align-items: center;
		gap: 1.4rem;
		margin-left: 0.5rem;
	}
	.nav-item {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink-soft);
		transition: color var(--duration-hover) ease;
		white-space: nowrap;
	}
	.nav-item:hover {
		color: var(--color-primary-600);
	}
	.nav-item.active {
		color: var(--color-ink);
		font-weight: 600;
	}
	/* Product dropdown */
	.nav-dd {
		position: relative;
		display: inline-flex;
	}
	.nav-dd-trigger {
		background: none;
		border: 0;
		cursor: pointer;
		font-family: inherit;
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
	}
	.nav-caret {
		transition: transform var(--duration-popover) var(--ease-out);
		opacity: 0.7;
	}
	.nav-dd-trigger[aria-expanded='true'] .nav-caret,
	.nav-dd:focus-within .nav-caret {
		transform: rotate(180deg);
	}
	.nav-submenu {
		position: absolute;
		top: calc(100% + 0.6rem);
		left: 50%;
		/* Anchored to the trigger above, so it grows from the trigger rather
		   than from its own centre. */
		transform-origin: top center;
		transform: translateX(-50%) translateY(4px) scale(0.97);
		width: 20rem;
		display: grid;
		gap: 0.15rem;
		padding: 0.5rem;
		background: rgba(252, 252, 253, 0.98);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg, 0 20px 40px rgba(15, 23, 42, 0.14));
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition:
			opacity var(--duration-popover) var(--ease-out),
			transform var(--duration-popover) var(--ease-out),
			visibility var(--duration-popover);
		z-index: 20;
	}
	/* Invisible bridge so the menu doesn't close when crossing the gap. */
	.nav-submenu::before {
		content: '';
		position: absolute;
		top: -0.7rem;
		left: 0;
		right: 0;
		height: 0.7rem;
	}
	.nav-submenu.open,
	.nav-dd:focus-within .nav-submenu {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		transform: translateX(-50%) translateY(0) scale(1);
	}
	.nav-sub-item {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		padding: 0.7rem 0.8rem;
		border-radius: 8px;
		transition: background 0.15s ease;
	}
	.nav-sub-item:hover,
	.nav-sub-item.active {
		background: var(--color-primary-50);
	}
	.nav-sub-top {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.nav-sub-label {
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--color-ink);
	}
	.nav-sub-item:hover .nav-sub-label,
	.nav-sub-item.active .nav-sub-label {
		color: var(--color-primary-700);
	}
	.nav-sub-tag {
		font-family: var(--font-family-mono);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		background: var(--color-primary-50);
		border: 1px solid var(--color-primary-100);
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
	}
	.nav-sub-item:hover .nav-sub-tag,
	.nav-sub-item.active .nav-sub-tag {
		background: #fff;
	}
	.nav-sub-desc {
		font-size: 0.78rem;
		line-height: 1.35;
		color: var(--color-ink-faint);
	}

	.nav-cta {
		display: none;
		align-items: center;
		gap: 0.6rem;
		margin-left: auto;
	}
	.nav-invest {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink-soft);
		padding: 0.5rem 0.4rem;
	}
	.nav-invest:hover {
		color: var(--color-ink);
	}
	.nav-waitlist {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-size: 0.88rem;
		font-weight: 500;
		color: #fff;
		background: var(--color-primary-600);
		padding: 0.7rem 1.4rem;
		border-radius: 2px;
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.12),
			var(--shadow-xs);
		transition:
			background var(--duration-hover) ease,
			transform var(--duration-press) var(--ease-out);
		white-space: nowrap;
	}
	.nav-waitlist:active {
		transform: scale(0.97);
	}
	@media (hover: hover) and (pointer: fine) {
		.nav-waitlist:hover {
			background: #5971cd;
			color: #fff;
		}
	}
	/* The tap area is the button, not the glyph. This was 24x24 — the bare size
	   of the icon — which is the smallest thing on the page and the one control
	   a phone visitor has to hit first. The negative margin keeps the icon
	   optically where it was while the hit area grows around it. */
	.nav-burger {
		margin-left: auto;
		margin-right: -0.625rem;
		color: var(--color-ink);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 44px;
		min-height: 44px;
	}
	.nav-mobile {
		border-top: 1px solid var(--color-border-default);
		background: rgba(252, 252, 253, 0.98);
	}
	.nav-mobile-inner {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding-block: 1rem;
	}
	.nav-mobile-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 44px;
		font-size: 0.98rem;
		font-weight: 500;
		color: var(--color-ink-soft);
		padding: 0.6rem 0;
	}
	.nav-mobile-group {
		font-family: var(--font-family-mono);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		padding: 0.6rem 0 0.15rem;
	}
	.nav-mobile-sub {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		padding: 0.5rem 0 0.5rem 0.9rem;
		border-left: 2px solid var(--color-border-default);
	}
	.nav-mobile-sub-label {
		font-weight: 600;
		color: var(--color-neutral-900);
	}
	.nav-mobile-sub-desc {
		font-size: 0.8rem;
		color: var(--color-ink-faint);
	}
	.nav-mobile-cta {
		display: flex;
		gap: 0.6rem;
		margin-top: 0.6rem;
		padding-top: 0.9rem;
		border-top: 1px solid var(--color-border-default);
	}
	.nav-mobile-cta .nav-waitlist,
	.nav-mobile-cta .nav-invest {
		text-align: center;
	}

	@media (min-width: 940px) {
		.nav-links,
		.nav-cta {
			display: flex;
		}
		.nav-burger {
			display: none;
		}
	}
</style>
