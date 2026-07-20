<script lang="ts">
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import { CONTACT } from '$lib/data/company';

	let mobileOpen = $state(false);

	const productMenu = [
		{
			href: '/product',
			label: 'Auratwin',
			desc: 'Your digital twin, in your messages',
			tag: 'Consumer'
		},
		{
			href: '/product/auracare',
			label: 'Auracare',
			desc: 'Decision support inside the consultation',
			tag: 'Clinical'
		}
	];

	const links = [
		{ href: '/technology', label: 'Technology' },
		{ href: '/careers', label: 'Careers' }
	];

	const isActive = (href: string) =>
		page.url.pathname === href || (href !== '/' && page.url.pathname.startsWith(href + '/'));

	// The Product tab is active on /product and any product sub-page.
	const productActive = () => page.url.pathname.startsWith('/product');
</script>

<nav class="nav" aria-label="Primary">
	<div class="container-wide nav-inner">
		<a href="/" class="nav-logo" aria-label="Auracare home">
			<img src="/SVG/Asset 5.svg" alt="Auracare" />
		</a>

		<div class="nav-links">
			<div class="nav-dd">
				<a href="/product" class="nav-item nav-dd-trigger" class:active={productActive()}>
					Product
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
				</a>
				<div class="nav-submenu" role="menu">
					{#each productMenu as item}
						<a
							href={item.href}
							class="nav-sub-item"
							class:active={page.url.pathname === item.href}
							role="menuitem"
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
			<a class="nav-item nav-ext" href={CONTACT.ontologyUrl} target="_blank" rel="noopener">
				Explore the ontology
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M7 17L17 7M17 7H9M17 7v8"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</a>
		</div>

		<div class="nav-cta">
			<a
				class="nav-invest"
				href="mailto:{CONTACT.seed}?subject=Auracare%20AI%20%E2%80%94%20Investor%20enquiry"
				>For investors</a
			>
			<a class="nav-waitlist" href="/#waitlist">Join the waitlist</a>
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
				<a
					class="nav-mobile-item"
					href={CONTACT.ontologyUrl}
					target="_blank"
					rel="noopener"
					onclick={() => (mobileOpen = false)}>Explore the ontology ↗</a
				>
				<div class="nav-mobile-cta">
					<a class="nav-invest" href="mailto:{CONTACT.seed}" onclick={() => (mobileOpen = false)}
						>For investors</a
					>
					<a class="nav-waitlist" href="/#waitlist" onclick={() => (mobileOpen = false)}
						>Join the waitlist</a
					>
				</div>
			</div>
		</div>
	{/if}
</nav>

<style>
	.nav {
		background: rgba(252, 252, 253, 0.88);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom: 1px solid var(--color-border-default);
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
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-ink-soft);
		transition: color 0.15s ease;
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
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
	}
	.nav-caret {
		transition: transform 0.2s ease;
		opacity: 0.7;
	}
	.nav-dd:hover .nav-caret,
	.nav-dd:focus-within .nav-caret {
		transform: rotate(180deg);
	}
	.nav-submenu {
		position: absolute;
		top: calc(100% + 0.6rem);
		left: 50%;
		transform: translateX(-50%) translateY(6px);
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
			opacity 0.18s ease,
			transform 0.18s ease,
			visibility 0.18s;
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
	.nav-dd:hover .nav-submenu,
	.nav-dd:focus-within .nav-submenu {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		transform: translateX(-50%) translateY(0);
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
		font-size: 0.6rem;
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

	.nav-ext {
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
		color: var(--color-ink);
		font-weight: 600;
	}
	.nav-ext:hover {
		color: var(--color-primary-600);
	}
	.nav-cta {
		display: none;
		align-items: center;
		gap: 0.6rem;
		margin-left: auto;
	}
	.nav-invest {
		font-size: 0.88rem;
		font-weight: 500;
		color: var(--color-ink-soft);
		padding: 0.5rem 0.4rem;
	}
	.nav-invest:hover {
		color: var(--color-ink);
	}
	.nav-waitlist {
		font-size: 0.88rem;
		font-weight: 500;
		color: #fff;
		background: var(--color-primary-600);
		padding: 0.55rem 1.1rem;
		border-radius: 6px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.12),
			var(--shadow-xs);
		transition: background 0.15s ease;
		white-space: nowrap;
	}
	.nav-waitlist:hover {
		background: #5971cd;
		color: #fff;
	}
	.nav-burger {
		margin-left: auto;
		color: var(--color-neutral-900);
		display: inline-flex;
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
		font-size: 0.98rem;
		font-weight: 500;
		color: var(--color-neutral-800);
		padding: 0.6rem 0;
	}
	.nav-mobile-group {
		font-family: var(--font-family-mono);
		font-size: 0.68rem;
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
