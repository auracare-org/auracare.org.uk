<script lang="ts">
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import { CONTACT } from '$lib/data/company';

	let mobileOpen = $state(false);

	const links = [
		{ href: '/product', label: 'Product' },
		{ href: '/technology', label: 'Technology' },
		{ href: '/company', label: 'Company' },
		{ href: '/careers', label: 'Careers' }
	];

	const isActive = (href: string) =>
		page.url.pathname === href || (href !== '/' && page.url.pathname.startsWith(href + '/'));
</script>

<nav class="nav" aria-label="Primary">
	<div class="container-wide nav-inner">
		<a href="/" class="nav-logo" aria-label="Auracare home">
			<img src="/SVG/Asset 5.svg" alt="Auracare" />
		</a>

		<div class="nav-links">
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
		color: var(--color-ink);
	}
	.nav-item.active {
		color: var(--color-ink);
		font-weight: 600;
	}
	.nav-ext {
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
		color: var(--color-primary-600);
		font-weight: 500;
	}
	.nav-ext:hover {
		color: var(--color-primary-700);
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
		border-radius: 10px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.12),
			var(--shadow-xs);
		transition: background 0.15s ease;
		white-space: nowrap;
	}
	.nav-waitlist:hover {
		background: var(--color-primary-700);
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
