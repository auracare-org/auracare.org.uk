<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import Roster from '$lib/components/layout/Roster.svelte';
	import { CONTACT } from '$lib/data/company';
	import { teamList } from '$lib/data/team';

	// "London, Hong Kong and San Francisco"
	const locations = $derived(
		CONTACT.locations.length > 1
			? CONTACT.locations.slice(0, -1).join(', ') +
					' and ' +
					CONTACT.locations[CONTACT.locations.length - 1]
			: CONTACT.locations[0]
	);
</script>

<!--
  The team as a ruled roster.

  Six bordered cards each carrying a photo, a role, a bio and two links was the
  densest block on the page and the least skimmable. A roster reads at a
  glance: portrait, name, role on one line, and the detail beside it.
-->
<section class="team section-y">
	<div class="container-wide">
		<h2 use:reveal>A small, founder-led team.</h2>
		<p class="lede" use:reveal={{ delay: 60 }}>Spanning {locations}.</p>

		<Roster people={teamList}>
			{#snippet detail(member)}
				{#if member.bio}<p class="bio">{member.bio}</p>{/if}
				{#if member.linkedin || member.website}
					<p class="links">
						{#if member.linkedin}
							<a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
						{/if}
						{#if member.website}
							<a href={member.website} target="_blank" rel="noopener noreferrer">Website</a>
						{/if}
					</p>
				{/if}
			{/snippet}
		</Roster>

		<div class="raise" use:reveal>
			<h3>We are raising our seed round.</h3>
			<p>One founder replies directly, depending on where you invest from.</p>
			<a class="btn-solid" href="/investors#contact">Talk to a founder</a>
		</div>
	</div>
</section>

<style>
	.team {
		border-top: 1px solid var(--color-rule);
	}
	h2 {
		font-size: clamp(1.9rem, 3.6vw, 3rem);
		line-height: 1.06;
		letter-spacing: -0.03em;
		margin: 0 0 1rem;
	}
	.lede {
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		color: var(--color-ink-soft);
		margin: 0;
	}

	.bio {
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
		max-width: 62ch;
	}
	.links {
		display: flex;
		gap: 1.25rem;
		margin: 0.6rem 0 0;
	}
	.links a {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-ink);
		border-bottom: 1px solid var(--color-rule-strong);
		padding-bottom: 0.15rem;
		transition:
			color var(--duration-hover) ease,
			border-color var(--duration-hover) ease;
	}

	.raise {
		margin-top: clamp(2.5rem, 5vw, 4rem);
		padding-top: clamp(1.75rem, 3vw, 2.5rem);
		border-top: 1px solid var(--color-ink);
	}
	.raise h3 {
		font-size: clamp(1.5rem, 2.8vw, 2.2rem);
		letter-spacing: -0.025em;
		margin: 0 0 0.75rem;
	}
	.raise p {
		font-size: 1rem;
		color: var(--color-ink-soft);
		margin: 0 0 1.75rem;
		max-width: 48ch;
	}

	@media (hover: hover) and (pointer: fine) {
		.links a:hover {
			color: var(--color-primary-600);
			border-color: var(--color-primary-600);
		}
	}
</style>
