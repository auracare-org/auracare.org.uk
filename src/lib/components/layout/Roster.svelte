<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/motion';
	import { getInitials, type TeamMember } from '$lib/data/team';

	/**
	 * The one way people are listed on this site.
	 *
	 * A ruled roster: portrait, name and role on the left, whatever that page
	 * needs to say about the person on the right. The homepage team section and
	 * the investors contact list were built separately and drifted into two
	 * different treatments of the same six faces; the treatment lives here now
	 * so they cannot drift again. Only the detail column differs, and it is
	 * passed in.
	 */
	let {
		people,
		detail,
		under,
		maxWidth = ''
	}: {
		people: TeamMember[];
		/** Rendered in the right-hand column for each person. */
		detail?: Snippet<[TeamMember]>;
		/**
		 * Rendered directly beneath the role, in the name column. For anything
		 * that belongs to the person rather than to what the page is saying
		 * about them — a contact address, a handle.
		 */
		under?: Snippet<[TeamMember]>;
		/**
		 * Caps the roster and centres it. A page whose detail column is two
		 * short lines leaves most of a full-width roster empty; the homepage,
		 * whose detail is a full bio, wants the whole width and leaves this
		 * unset.
		 */
		maxWidth?: string;
	} = $props();
</script>

<ul class="roster" role="list" style={maxWidth ? `--roster-max:${maxWidth}` : ''}>
	{#each people as member (member.id)}
		<li class="member" use:reveal={{ delay: 40 }}>
			<div class="avatar">
				{#if member.img}
					<img src={member.img} alt="Portrait of {member.name}" loading="lazy" />
				{:else}
					<span class="initials" aria-hidden="true">{getInitials(member.name)}</span>
				{/if}
			</div>

			<div class="who">
				<h3>{member.name}</h3>
				<p class="role">{member.role}</p>
				{@render under?.(member)}
			</div>

			<div class="detail">
				{@render detail?.(member)}
			</div>
		</li>
	{/each}
</ul>

<style>
	.roster {
		list-style: none;
		max-width: var(--roster-max, none);
		margin: clamp(2.5rem, 5vw, 4rem) auto 0;
		padding: 0;
		border-top: 1px solid var(--color-ink);
	}
	.member {
		display: grid;
		grid-template-columns: 3.25rem minmax(0, 1fr);
		gap: 1rem;
		align-items: start;
		padding-block: 1.5rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.avatar {
		width: 3.25rem;
		height: 3.25rem;
		overflow: hidden;
		background: var(--color-surface-alt);
		display: grid;
		place-items: center;
	}
	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.initials {
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: var(--color-ink-faint);
	}
	.who h3 {
		font-size: 1.08rem;
		letter-spacing: -0.01em;
		margin: 0;
	}
	.role {
		margin: 0.15rem 0 0;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-primary-600);
	}

	@media (min-width: 900px) {
		.member {
			grid-template-columns: 3.25rem 16rem minmax(0, 1fr);
			gap: 1.5rem;
			align-items: center;
		}
	}
</style>
