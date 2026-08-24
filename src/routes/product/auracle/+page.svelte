<script lang="ts">
	import PageHero from '$lib/components/layout/PageHero.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import SafetyRouting from '$lib/components/SafetyRouting.svelte';
	import { reveal } from '$lib/actions/motion';
	import { TRY_TWIN_NOTE, WAITLIST_URL, TWIN_PROBLEM } from '$lib/data/company';

	/* A single day, held together by proactive check-ins. */
	const day = [
		{
			time: '07:12',
			title: 'Morning brief',
			body: 'A short read on how you slept and what today has room for. You didn’t open an app. It came to you.'
		},
		{
			time: '13:30',
			title: 'You reply, it logs',
			body: '“chicken salad + a flat white” is all you send back. That’s the meal logged. No form, no photo, no calorie field.'
		},
		{
			time: '18:40',
			title: 'A nudge, only because it matters',
			body: 'Three late nights in a row and readiness is sliding. Auracle flags it once, gently, then leaves it with you.'
		},
		{
			time: '22:00',
			title: 'Evening wrap, then quiet',
			body: 'A close on the day and a wind-down reminder, then silence until morning. Quiet hours are on by default.'
		}
	];

	/* Replying is the logging: what you text ➝ what Auracle captures. */
	const logging = [
		{
			you: 'slept awful, up around 3 and never really went back',
			twin: 'Sleep logged as fragmented, ~4h. I’ll keep today light and check the pattern over the week.'
		},
		{
			you: 'did a 5k this morning, legs are toast',
			twin: 'Run captured, recovery flagged. I’ll hold off suggesting anything hard tomorrow.'
		},
		{
			you: 'skipped lunch, just coffee',
			twin: 'Noted. Third low-fuel afternoon this week. Want me to nudge you at midday next time?'
		},
		{
			you: 'been getting headaches most afternoons',
			twin: 'Logged as a recurring symptom rather than a one-off. Four this fortnight, all after 2pm.'
		},
		{
			you: 'started sertraline last week, 50mg',
			twin: 'Recorded with a start date, so the change shows against your sleep and energy from here. I don’t advise on medication; your prescriber owns that.'
		},
		{
			you: 'mum was diagnosed with type 2',
			twin: 'Added to family history. That is the kind of thing a clinician asks for and most people forget in the room.'
		}
	];

	/* Everything it draws on, grouped: the picture, not the plumbing. */
	const sources = [
		{
			group: 'Your body',
			items: ['Sleep & recovery', 'Movement & workouts', 'Heart rate & wearables'],
			note: 'From the devices you already wear, synced automatically, no typing.'
		},
		{
			group: 'Your day',
			items: ['Meals & hydration', 'Screen time', 'Location & routine'],
			note: 'The context that a wearable can’t see, added the moment you mention it.'
		},
		{
			group: 'Your history',
			items: ['Health records', 'Past notes you share', 'Connected platforms'],
			note: 'Read in for context only, never acted on as a clinical result.'
		}
	];

	/* One plan vs. the usual pile of single-purpose subscriptions. */
	const stack = [
		'Sleep tracker',
		'Nutrition logger',
		'Workout coach',
		'Habit app',
		'Mindfulness sub',
		'Symptom checker'
	];

	/* The engagement hooks, drawn from the live consumer site (auracle.health).
	   Each one exists to earn the next reply; each reply deepens the social
	   history the clinical core runs on. */
	const retention = [
		{
			hook: 'The daily open',
			title: 'Animal states',
			body: 'Sleep, recovery, stress and activity, summed up each day as a creature you want to check on. People open the chat to see what they got, and the explanation is the insight.'
		},
		{
			hook: 'The Sunday ritual',
			title: 'The weekly review',
			body: 'A dashboard of the week, made legible: sleep, movement, screen time, spending, even what you listened to. The recap people actually share.'
		},
		{
			hook: 'Useful on off-days',
			title: 'Environmental check-ins',
			body: 'UV, pollen and weather, tied to where you actually are, so Auracle earns its place on days you would never open a health app.'
		},
		{
			hook: 'Never gets muted',
			title: 'Quiet hours',
			body: 'Silent by default from 10pm to 8am, and it steps back the moment you ask. Knowing when to stop talking is why people keep it.'
		},
		{
			hook: 'Trust compounds',
			title: 'Your data, your rules',
			body: 'Everything Auracle knows can be inspected, edited and exported from the web app; every source is opt-in and revocable.'
		}
	];
</script>

<Seo
	title="Auracle: a wellness companion in your messages"
	description="Auracle lives in the messaging apps you already use. It learns your daily life in conversation, connects the sources you choose, and builds a bio-psycho-social history you can share at an appointment. It launches in August 2026."
	path="/product/auracle"
/>

<svelte:head>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"name": "Auracle",
			"applicationCategory": "HealthApplication",
			"operatingSystem": "iOS, Android",
			"url": "https://auracare.org.uk/product/auracle",
			"description": "A personal health companion that lives in your messages. Auracle learns your patterns from the wearables and apps you already use, then checks in with a morning brief, a nudge only when it matters, and an evening wrap. A general-wellness product, not a medical device.",
			"publisher": { "@id": "https://auracare.org.uk/#organization" },
			"offers": { "@type": "Offer", "availability": "https://schema.org/PreOrder" }
		}
	</script>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{
					"@type": "ListItem",
					"position": 1,
					"name": "Home",
					"item": "https://auracare.org.uk"
				},
				{
					"@type": "ListItem",
					"position": 2,
					"name": "Auracle",
					"item": "https://auracare.org.uk/product/auracle"
				}
			]
		}
	</script>
</svelte:head>

<!-- ================= Hero ================= -->
<PageHero
	meta="Consumer · Expected August 2026"
	title="Six months of texting becomes"
	accent="a history your doctor can read."
	accentOwnLine
	sub="Auracle is a wellness companion in the apps you already use. What you tell it is encoded into clinical terminology as you go, so conversation ends up as a social history you can hand to a clinician."
/>

<!-- ================= A day with Auracle ================= -->
<section class="section-y day-sec">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>It reaches out first, so remembering isn’t your job.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Most wellness apps wait for you to show up. Auracle comes to you, a handful of times a day,
			and only when there is something worth saying.
		</p>

		<!-- The day drawn as a day: one rule running 07:00 to 22:00 with the four
		     moments marked on it, and the long quiet stretches visible as the gaps
		     between them. A plain list could not show that it only speaks four
		     times, which is the entire claim. -->
		<ol class="day" use:reveal={{ delay: 100 }}>
			{#each day as slot (slot.time)}
				<li class="day-row">
					<span class="day-time">{slot.time}</span>
					<div class="day-body">
						<h3>{slot.title}</h3>
						<p>{slot.body}</p>
					</div>
				</li>
			{/each}
		</ol>
		<p class="day-quiet" use:reveal>
			Four moments. The rest of the day it says nothing, and quiet hours run from 22:00 to 07:00.
		</p>
	</div>
</section>

<!-- ================= Replying is the logging ================= -->
<section class="section-y log-sec">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>Tell it like you’d tell a friend.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			There are no streaks to protect and no fields to fill. You text in your own words; Auracle
			does the structuring, the remembering, and the noticing.
		</p>

		<!-- One thread, not three side-by-side pairs. The exchange only reads as
		     texting if it is stacked the way a thread is: your message right,
		     the reply left, in sequence down a single column. -->
		<div class="thread">
			{#each logging as pair, i (pair.you)}
				<!-- Each message dissolves in on its own beat, so the thread arrives
				     the way a conversation does rather than all at once. -->
				<p class="msg msg--you" use:reveal={{ delay: i * 110 }}>{pair.you}</p>
				<p class="msg msg--them" use:reveal={{ delay: i * 110 + 55 }}>{pair.twin}</p>
			{/each}
			<p class="thread-note" use:reveal>
				Replying is the logging. There is nothing else to fill in.
			</p>
		</div>
	</div>
</section>

<!-- ================= Built for retention ================= -->
<section class="section-y keep-sec">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>What keeps people replying.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Only {TWIN_PROBLEM.stat} of wellness-app installers are still active a month after install: the
			apps fail the moment they demand effort. These are the features that remove it, live on
			<a class="keep-link" href="https://auracle.health" rel="noopener">auracle.health</a>.
		</p>

		<!-- Five items do not divide into a grid without one row being a
		     different width from the others, which is what made this look
		     messy. As ruled rows every entry is the same shape. -->
		<dl class="keep-list">
			{#each retention as feature (feature.title)}
				<div class="keep-row" use:reveal={{ delay: 40 }}>
					<dt>
						<span class="keep-hook">{feature.hook}</span>
						<h3>{feature.title}</h3>
					</dt>
					<dd>{feature.body}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<!-- ================= Everything it draws on ================= -->
<section class="section-y src-sec">
	<div class="container-wide">
		<h2 use:reveal={{ delay: 60 }}>Your data already exists. This is where you get it back.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			The services you use collect this data every day; you just never see it in one place. Auracle
			hands it back as one bio-psycho-social history you can read, edit, export, and share with a
			clinician.
		</p>

		<div class="src-grid">
			{#each sources as col (col.group)}
				<div class="src-col" use:reveal={{ delay: 40 }}>
					<h3>{col.group}</h3>
					<ul>
						{#each col.items as item}
							<li>{item}</li>
						{/each}
					</ul>
					<p class="src-note">{col.note}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ================= One plan ================= -->
<section class="section-y plan-sec">
	<div class="container-wide plan-grid">
		<div class="plan-copy">
			<h2 use:reveal={{ delay: 60 }}>One subscription, in place of the pile.</h2>
			<p class="lede" use:reveal={{ delay: 120 }}>
				Wellness has become expensive: a separate app, and a separate bill, for every corner of your
				health. Auracle folds them into one companion, and starts free.
			</p>

			<ul class="stack" use:reveal={{ delay: 160 }} aria-label="Apps Auracle replaces">
				{#each stack as s}
					<li class="stack-chip">{s}</li>
				{/each}
				<li class="stack-chip stack-plus">…and the rest</li>
			</ul>
		</div>

		<div class="price-card glass-card" use:reveal={{ delay: 140 }}>
			<span class="price-tag">Early adopters: 3 months free</span>
			<div class="price-then">
				<span class="price-num">$10</span>
				<span class="price-per">/ month after</span>
			</div>
			<p class="price-line">
				The free months compound: more context, sharper guidance, more reasons it earns its place.
			</p>
			<ul class="price-list">
				<li>Every connector and check-in</li>
				<li>A personality you can tune, any time</li>
				<li>Cancel whenever; your data leaves with you</li>
			</ul>
			<a class="btn-solid full" href={WAITLIST_URL}>Get early access</a>
		</div>
	</div>
</section>

<!-- ================= Safety & routing ================= -->
<SafetyRouting />

<!-- ================= Closing CTA ================= -->
<section class="cta-band aura-space">
	<div class="container-wide cta-inner">
		<h2 use:reveal>The waitlist is open.</h2>
		<p use:reveal={{ delay: 80 }}>
			Auracle launches on iMessage, WhatsApp and RCS in August 2026. The consumer site is
			auracle.health.
		</p>
		<div class="cta-actions" use:reveal={{ delay: 140 }}>
			<a class="btn-solid" href={WAITLIST_URL}>Join the waitlist</a>
			<a class="btn-ghost" href="/investors">For investors</a>
		</div>
	</div>
</section>

<style>
	.keep-link {
		color: var(--color-primary-700);
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.keep-link:hover {
		color: var(--color-primary-600);
	}
	/* A message thread. Bubbles alternate sides and the tails are asymmetric,
	   which is what makes it read as a conversation rather than as two
	   columns of quoted text. */
	/* The day. One vertical rule with the four moments pinned to it; the space
	   between them is the point, so the rows are spaced by time, not evenly. */
	.day {
		list-style: none;
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding: 0 0 0 5.5rem;
		position: relative;
	}
	.day::before {
		content: '';
		position: absolute;
		left: 4.25rem;
		top: 0.6rem;
		bottom: 0.6rem;
		width: 1px;
		background: var(--color-rule-strong);
	}
	.day-row {
		position: relative;
		padding-block: 1.4rem;
	}
	.day-row::before {
		content: '';
		position: absolute;
		left: -1.32rem;
		top: 1.85rem;
		width: 9px;
		height: 9px;
		border-radius: 999px;
		background: var(--color-surface-page);
		border: 1.5px solid var(--color-primary-600);
	}
	.day-time {
		position: absolute;
		left: -5.5rem;
		top: 1.55rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-ink);
		font-variant-numeric: tabular-nums;
	}
	.day-row h3 {
		font-size: 1.05rem;
		letter-spacing: -0.01em;
		margin: 0 0 0.3rem;
	}
	.day-row p {
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
		margin: 0;
		max-width: 56ch;
	}
	.day-quiet {
		margin: 1.75rem 0 0;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-rule);
		font-size: 0.88rem;
		color: var(--color-ink-faint);
	}

	/* Sources: three ruled columns. */
	.src-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		border-top: 1px solid var(--color-ink);
	}
	.src-col {
		padding-top: 1.5rem;
	}
	.src-col h3 {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		margin: 0 0 1rem;
	}
	.src-col ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.src-col li {
		padding-block: 0.6rem;
		border-top: 1px solid var(--color-rule);
		font-size: 0.95rem;
		color: var(--color-ink);
	}
	.src-note {
		margin: 1rem 0 0;
		font-size: 0.85rem;
		line-height: 1.5;
		color: var(--color-ink-faint);
	}
	@media (min-width: 860px) {
		.src-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 2.5rem;
		}
		.src-col + .src-col {
			border-left: 1px solid var(--color-rule);
			padding-left: 2.5rem;
		}
	}

	.keep-list {
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		border-top: 1px solid var(--color-ink);
	}
	.keep-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;
		padding-block: 1.5rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.keep-hook {
		display: block;
		font-size: 0.64rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		margin-bottom: 0.4rem;
	}
	.keep-row h3 {
		font-size: 1.08rem;
		letter-spacing: -0.01em;
		margin: 0;
	}
	.keep-row dd {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
		max-width: 60ch;
	}
	@media (min-width: 860px) {
		.keep-row {
			grid-template-columns: 18rem minmax(0, 1fr);
			gap: 2.5rem;
			align-items: baseline;
		}
	}

	.thread {
		max-width: 34rem;
		margin: clamp(2.5rem, 5vw, 3.5rem) auto 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}
	.msg {
		margin: 0;
		max-width: 78%;
		padding: 0.75rem 1.05rem;
		font-size: 0.95rem;
		line-height: 1.45;
		border-radius: 18px;
	}
	.msg--you {
		align-self: flex-end;
		background: var(--color-primary-600);
		color: #fff;
		border-bottom-right-radius: 5px;
	}
	.msg--them {
		align-self: flex-start;
		background: var(--color-surface-alt);
		color: var(--color-ink);
		border-bottom-left-radius: 5px;
		margin-bottom: 0.9rem;
	}
	.msg--them:last-of-type {
		margin-bottom: 0;
	}
	.thread-note {
		margin: 1.5rem 0 0;
		text-align: center;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
	}

	.btn-solid:active {
		transform: scale(0.97);
		transition-duration: var(--duration-press);
	}
	@media (hover: hover) and (pointer: fine) {
		.btn-solid:hover {
			transform: translateY(-2px);
			background: var(--color-primary-700);
			color: #fff;
		}
		.btn-solid:hover:active {
			transform: translateY(-2px) scale(0.97);
		}
	}
	.btn-solid.full {
		display: block;
		text-align: center;
		margin-top: 1.4rem;
	}
	.lede {
		margin-top: 1rem;
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 44rem;
	}
	.plan-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
	}
	.stack {
		list-style: none;
		margin: 1.75rem 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.stack-chip {
		font-size: 0.82rem;
		color: var(--color-ink-faint);
		background: var(--color-neutral-0);
		border: 1px dashed var(--color-border-strong);
		border-radius: 999px;
		padding: 0.4rem 0.85rem;
		text-decoration: line-through;
		text-decoration-color: rgba(120, 130, 150, 0.5);
	}
	.stack-plus {
		text-decoration: none;
		font-style: italic;
	}
	.price-card {
		padding: clamp(1.75rem, 3vw, 2.25rem);
		border-radius: var(--radius-4xl);
	}
	.price-tag {
		display: inline-block;
		font-family: var(--font-family-mono);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #0f9d6b;
		background: rgba(52, 211, 153, 0.14);
		border: 1px solid rgba(52, 211, 153, 0.35);
		padding: 0.3rem 0.75rem;
		border-radius: 999px;
	}
	.price-then {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		margin-top: 1.1rem;
	}
	.price-num {
		font-family: var(--font-family-heading);
		font-size: clamp(2.6rem, 6vw, 3.4rem);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		color: var(--color-ink);
	}
	.price-per {
		font-size: 0.95rem;
		color: var(--color-ink-faint);
	}
	.price-line {
		margin-top: 0.8rem;
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
	}
	.price-list {
		list-style: none;
		margin: 1.25rem 0 0;
		padding: 1.25rem 0 0;
		border-top: 1px solid var(--color-border-default);
		display: grid;
		gap: 0.65rem;
	}
	.price-list li {
		position: relative;
		padding-left: 1.6rem;
		font-size: 0.92rem;
		color: var(--color-ink);
	}
	.price-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		top: 0;
		color: #0f9d6b;
		font-weight: 700;
	}
	.cta-inner {
		text-align: center;
		max-width: 40rem;
	}
	.cta-inner h2 {
		max-width: none;
		font-size: clamp(1.9rem, 4.5vw, 3rem);
	}
	.cta-inner p {
		margin: 0.9rem auto 0;
		font-size: 1.05rem;
		max-width: 30rem;
	}
	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.8rem 1rem;
		margin-top: 1.9rem;
	}
	@media (min-width: 1000px) {
		/* Five hooks over two rows. The last two widen to span half the grid
		   each rather than sitting centred under the row above: a centred
		   orphan row reads as a misalignment, a filled row reads as a choice. */
	}
	@media (min-width: 860px) {
		.plan-grid {
			grid-template-columns: 1.1fr 0.9fr;
		}
	}
	@media (max-width: 560px) {
	}
</style>
