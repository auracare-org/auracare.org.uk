<script lang="ts">
	import { reveal } from '$lib/actions/motion';
	import { CONTACT } from '$lib/data/company';
	import { teamList, getInitials } from '$lib/data/team';

	// "London, Hong Kong and San Francisco"
	const locations = $derived(
		CONTACT.locations.length > 1
			? CONTACT.locations.slice(0, -1).join(', ') +
					' and ' +
					CONTACT.locations[CONTACT.locations.length - 1]
			: CONTACT.locations[0]
	);

	const mailto =
		'mailto:' + CONTACT.seed + '?subject=' + encodeURIComponent('Auracare AI — Investor enquiry');
</script>

<section class="team section-y">
	<div class="container-wide">
		<h2 use:reveal>A small, founder-led team.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>Spanning {locations}.</p>

		<ul class="grid" role="list">
			{#each teamList as member, i (member.id)}
				<li class="card glass-card" use:reveal={{ delay: 140 + i * 60 }}>
					<div class="avatar">
						{#if member.img}
							<img src={member.img} alt="Portrait of {member.name}" loading="lazy" />
						{:else}
							<span class="initials" aria-hidden="true">{getInitials(member.name)}</span>
						{/if}
					</div>

					<div class="body">
						<h3>{member.name}</h3>
						<p class="role">{member.role}</p>
						{#if member.bio}
							<p class="bio">{member.bio}</p>
						{/if}

						{#if member.linkedin || member.website}
							<div class="links">
								{#if member.linkedin}
									<a
										href={member.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="{member.name} on LinkedIn"
									>
										LinkedIn
									</a>
								{/if}
								{#if member.website}
									<a
										href={member.website}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="{member.name}'s website"
									>
										Website
									</a>
								{/if}
							</div>
						{/if}
					</div>
				</li>
			{/each}
		</ul>

		<div class="raise" use:reveal={{ delay: 200 }}>
			<div class="raise-copy">
				<span class="raise-label">Seed</span>
				<h3>We&rsquo;re raising our seed round.</h3>
				<p>
					If you back frontier health &mdash; teams turning real, consented data into agentic
					clinical decision support &mdash; we&rsquo;d love to talk.
				</p>
			</div>
			<a class="raise-cta" href={mailto}>
				Talk to Stephen <span aria-hidden="true">&rarr;</span>
			</a>
		</div>
	</div>
</section>

<style>
	.team h2 {
		font-size: clamp(1.9rem, 4vw, 2.9rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-block: 0.5rem 0.75rem;
	}
	.lede {
		font-size: clamp(1rem, 1.6vw, 1.15rem);
		color: var(--color-ink-soft);
		max-width: 40rem;
	}

	.grid {
		list-style: none;
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.card {
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.avatar {
		width: 4.5rem;
		height: 4.5rem;
		border-radius: var(--radius-md);
		overflow: hidden;
		flex-shrink: 0;
	}
	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.initials {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		font-family: var(--font-family-mono);
		font-weight: 500;
		font-size: 1.2rem;
		color: var(--color-primary-700);
		letter-spacing: 0.02em;
		background: var(--color-primary-50);
		border: 1px solid var(--color-primary-100);
		border-radius: inherit;
	}

	.body h3 {
		font-size: 1.15rem;
		letter-spacing: -0.01em;
		margin: 0;
	}
	.role {
		color: var(--color-primary-600);
		font-weight: 600;
		font-size: 0.85rem;
		margin-top: 0.15rem;
	}
	.bio {
		color: var(--color-ink-soft);
		font-size: 0.9rem;
		line-height: 1.55;
		margin-top: 0.7rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 0.9rem;
	}
	.links a {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--color-primary-600);
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s ease;
	}
	.links a:hover {
		border-bottom-color: currentColor;
	}

	/* Investor CTA — flat brand panel */
	.raise {
		margin-top: clamp(2.5rem, 5vw, 3.75rem);
		padding: clamp(1.75rem, 4vw, 2.75rem);
		border-radius: var(--radius-4xl);
		background: var(--color-primary-700);
		border: 1px solid var(--color-border-dark);
		color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}
	.raise-copy {
		max-width: 44rem;
	}
	.raise-label {
		font-family: var(--font-family-mono);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-white-alpha-80);
	}
	.raise-copy h3 {
		font-size: clamp(1.35rem, 2.4vw, 1.8rem);
		letter-spacing: -0.01em;
		margin: 0.75rem 0 0.5rem;
		color: #fff;
	}
	.raise-copy p {
		color: var(--color-white-alpha-80);
		font-size: 1rem;
		line-height: 1.6;
		margin: 0;
	}
	.raise-cta {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		background: #fff;
		color: var(--color-primary-700);
		font-weight: 500;
		padding: 0.8rem 1.5rem;
		border-radius: var(--radius-sm);
		transition: background 0.15s ease;
	}
	.raise-cta:hover {
		background: var(--color-primary-50);
		color: var(--color-primary-800);
	}

	@media (min-width: 620px) {
		.card {
			flex-direction: row;
			align-items: flex-start;
		}
	}
	@media (min-width: 760px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1080px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
		.card {
			flex-direction: column;
		}
	}
</style>
