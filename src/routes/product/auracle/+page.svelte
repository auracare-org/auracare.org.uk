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

	/* Replying is the logging. Three examples side by side, each headed by what
	   it demonstrates: a passive signal captured in passing, a pattern nobody
	   was tracking, and the piece of history everyone forgets in the room.
	   Each is a real thread rather than a quoted pair, because the claim is
	   that this happens in the messaging app you already use, and a thread is
	   the only thing that looks like that. */
	const logging = [
		{
			label: 'A signal, in passing',
			summary: 'You mention a bad night. It becomes sleep data.',
			messages: [
				{ from: 'you', text: 'slept awful, up around 3 and never really went back' },
				{
					from: 'twin',
					text: 'Logged as fragmented sleep, ~4h. I’ll keep today light.'
				},
				{ from: 'you', text: 'yeah don’t book me anything before 10' },
				{ from: 'twin', text: 'Done. That’s the third short night this week — I’m watching it.' }
			]
		},
		{
			label: 'A pattern, not an incident',
			summary: 'You mention it once. It counts, and it notices.',
			messages: [
				{ from: 'you', text: 'been getting headaches most afternoons' },
				{
					from: 'twin',
					text: 'Logged as a recurring symptom rather than a one-off. Four this fortnight, all after 2pm.'
				},
				{ from: 'you', text: 'huh. never noticed the timing' },
				{
					from: 'twin',
					text: 'That’s the kind of thing worth saying out loud at your next appointment.'
				}
			]
		},
		{
			label: 'The thing you forget in the room',
			summary: 'A passing remark becomes family history.',
			messages: [
				{ from: 'you', text: 'mum was diagnosed with type 2' },
				{ from: 'twin', text: 'Added to family history, with the date you told me.' },
				{ from: 'you', text: 'does that actually matter?' },
				{
					from: 'twin',
					text: 'A clinician will ask. Most people forget it in the room — now you won’t have to remember.'
				}
			]
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
	description="Auracle lives in the messaging apps you already use. It learns your daily life in conversation, connects the sources you choose, and builds a bio-psycho-social history you can share at an appointment. It launches in September 2026."
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
	meta="Consumer · Expected September 2026"
	title={'Your health,\nbefore it becomes'}
	accent="healthcare."
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

		<!-- Three threads side by side, each headed by what it demonstrates, so
		     the range is visible at a glance. Every bubble arrives on its own
		     beat as the column scrolls in, so a thread lands the way a
		     conversation does rather than all at once. -->
		<div class="examples">
			{#each logging as ex, col (ex.label)}
				<article class="example">
					<span class="example-label" use:reveal={{ delay: col * 90 }}>{ex.label}</span>
					<h3 use:reveal={{ delay: col * 90 + 60 }}>{ex.summary}</h3>
					<div class="thread">
						{#each ex.messages as msg, i (msg.text)}
							<p
								class="msg msg--{msg.from}"
								class:msg--last={ex.messages[i + 1]?.from !== msg.from}
								use:reveal={{ delay: col * 90 + 160 + i * 140 }}
							>
								{msg.text}
							</p>
						{/each}
					</div>
				</article>
			{/each}
		</div>

		<p class="log-note" use:reveal>
			Replying is the logging. There is nothing else to fill in — and where a reply touches
			medication or a diagnosis, Auracle records it and points you at your prescriber rather than
			advising.
		</p>
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

		<!-- Numbered, with the hook as the label and the title carrying the size.
		     Uniform rows fixed the ragged grid but left five items reading at
		     one flat weight; the index and the scale give it somewhere to
		     start. -->
		<ol class="keep-list">
			{#each retention as feature, i (feature.title)}
				<li class="keep-row" use:reveal={{ delay: 40 }}>
					<span class="keep-n">{String(i + 1).padStart(2, '0')}</span>
					<div class="keep-head">
						<span class="keep-hook">{feature.hook}</span>
						<h3>{feature.title}</h3>
					</div>
					<p class="keep-body">{feature.body}</p>
				</li>
			{/each}
		</ol>
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

		<!-- The section's claim is that this data already exists and is scattered.
		     So the left side shows it scattered, as loose chips grouped by where
		     it comes from, and the right side shows the single record it becomes.
		     Three equal columns of bullet lists could not make that point. -->
		<div class="gather">
			<div class="gather-from">
				<span class="gather-label">Already being collected</span>
				{#each sources as col (col.group)}
					<div class="src-group">
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

			<div class="gather-into">
				<span class="gather-label">Where it ends up</span>
				<div class="record">
					<h3>One record</h3>
					<p>
						Every signal above, written in the same clinical vocabulary and stamped with when it was
						true. Readable by you, exportable at any time, and legible to a clinician in the room.
					</p>
					<ul class="record-props">
						<li>Timestamped</li>
						<li>Encoded to SNOMED CT</li>
						<li>Yours to export or delete</li>
					</ul>
				</div>
			</div>
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
			Auracle launches on iMessage, WhatsApp and RCS in September 2026. The consumer site is
			auracle.health.
		</p>
		<div class="cta-actions" use:reveal={{ delay: 140 }}>
			<a class="btn-solid" href={WAITLIST_URL}>Join the waitlist</a>
			<a class="btn-ghost" href="/investors">For investors</a>
		</div>
	</div>
</section>

<style>
	/* The closing band. `.cta-inner` and `.cta-actions` were styled further down
	   the file, but `.cta-band` itself was never defined at all — so the section
	   had no vertical padding and rendered with the heading jammed against the
	   top edge of the dark ground and the buttons against the footer. The three
	   rules live together here now, which is also what stopped the stray
	   `max-width: none` down there from cancelling the heading's measure. */
	.cta-band {
		padding-block: clamp(4rem, 8vw, 6.5rem);
		border-top: 1px solid var(--color-rule);
	}
	.cta-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.cta-band h2 {
		font-size: clamp(2.1rem, 4.6vw, 3.4rem);
		line-height: 1.15;
		letter-spacing: -0.035em;
		margin: 0;
		max-width: 18ch;
		color: #fff;
		text-wrap: balance;
	}
	.cta-band p {
		margin: clamp(1.25rem, 3vw, 1.75rem) 0 0;
		font-size: clamp(1rem, 1.35vw, 1.14rem);
		line-height: 1.7;
		max-width: 46ch;
		color: rgba(226, 230, 240, 0.75);
		text-wrap: pretty;
	}
	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.9rem;
		margin-top: clamp(2rem, 4vw, 2.75rem);
	}

	.keep-link {
		color: var(--color-primary-700);
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.keep-link:hover {
		color: var(--color-primary-600);
	}
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
		line-height: 1.65;
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
	.gather {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}
	.gather-label {
		display: block;
		font-size: 0.66rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-ink-faint);
		padding-bottom: 0.9rem;
		border-bottom: 1px solid var(--color-ink);
		margin-bottom: 1.5rem;
	}
	.src-group + .src-group {
		margin-top: 1.5rem;
	}
	.src-group h3 {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		margin: 0 0 0.75rem;
	}
	/* Loose chips, because scattered is the point. */
	.src-group ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0;
		padding: 0;
	}
	.src-group li {
		font-size: 0.85rem;
		color: var(--color-ink);
		background: var(--color-surface-alt);
		border: 1px solid var(--color-rule);
		padding: 0.35rem 0.7rem;
	}
	/* The single record it all resolves into. It used to be a black box, which
	   put dark ink in the middle of a paper page where dark is reserved for the
	   closing bands, and dropped its own body text to a grey that could not be
	   read. It is now a ruled panel like every other panel on the site: the
	   weight it needs comes from the rule above it, not from a fill. */
	.record {
		background: var(--color-surface-raised);
		border: 1px solid var(--color-rule);
		border-top: 2px solid var(--color-ink);
		color: var(--color-ink-soft);
		padding: clamp(1.5rem, 3vw, 2rem);
	}
	.record h3 {
		font-size: clamp(1.3rem, 2.4vw, 1.8rem);
		letter-spacing: -0.025em;
		color: var(--color-ink);
		margin: 0 0 0.9rem;
	}
	.record p {
		font-size: 0.95rem;
		line-height: 1.7;
		margin: 0 0 1.5rem;
	}
	.record-props {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-rule-strong);
	}
	.record-props li {
		padding-block: 0.7rem;
		border-bottom: 1px solid var(--color-rule);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-ink);
	}
	.record-props li:last-child {
		border-bottom: 0;
		padding-bottom: 0;
	}

	.src-note {
		margin: 1rem 0 0;
		font-size: 0.85rem;
		line-height: 1.65;
		color: var(--color-ink-faint);
	}

	.keep-list {
		list-style: none;
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding: 0;
		border-top: 1px solid var(--color-ink);
	}
	.keep-row {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		gap: 0.25rem 1rem;
		padding-block: 1.6rem;
		border-bottom: 1px solid var(--color-rule);
	}
	.keep-n {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-primary-600);
		font-variant-numeric: tabular-nums;
		padding-top: 0.5rem;
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
		font-size: clamp(1.15rem, 2vw, 1.5rem);
		letter-spacing: -0.02em;
		margin: 0;
	}
	.keep-body {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
		max-width: 62ch;
		grid-column: 2;
	}
	@media (min-width: 860px) {
		.keep-row {
			grid-template-columns: 2.5rem minmax(0, 20rem) minmax(0, 1fr);
			align-items: baseline;
			gap: 2.5rem;
		}
		.keep-body {
			grid-column: 3;
		}
	}

	/* Three threads, divided by hairline rules the way the product panels on
	   the homepage are. */
	.examples {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		border-top: 1px solid var(--color-ink);
	}
	.example {
		padding-top: 1.75rem;
		display: flex;
		flex-direction: column;
	}
	.example-label {
		display: block;
		font-size: 0.66rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-primary-600);
		margin-bottom: 0.9rem;
	}
	.example h3 {
		font-size: 1.05rem;
		line-height: 1.45;
		letter-spacing: -0.015em;
		margin: 0 0 1.75rem;
		max-width: 26ch;
	}

	/* The thread. This is the one place on the site that keeps a radius: the
	   claim of the whole section is that it happens inside the messaging app
	   you already use, and a squared-off bubble does not read as that. Tails
	   are asymmetric on the last bubble of each run, which is what makes a
	   stack of blocks read as a conversation. */
	.thread {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		margin-top: auto;
	}
	.msg {
		position: relative;
		margin: 0;
		max-width: 88%;
		padding: 0.65rem 0.95rem;
		font-size: 0.9rem;
		line-height: 1.45;
		border-radius: 18px;
	}
	.msg--you {
		align-self: flex-end;
		background: var(--color-primary-600);
		color: #fff;
	}
	.msg--twin {
		align-self: flex-start;
		background: var(--color-surface-alt);
		border: 1px solid var(--color-rule);
		color: var(--color-ink);
	}
	/* The last bubble of a run gets the tail, and a little more air after it
	   before the other side answers. */
	.msg--you.msg--last {
		border-bottom-right-radius: 5px;
	}
	.msg--twin.msg--last {
		border-bottom-left-radius: 5px;
	}
	.msg--last:not(:last-child) {
		margin-bottom: 0.55rem;
	}

	.log-note {
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-ink);
		font-size: 0.92rem;
		line-height: 1.7;
		color: var(--color-ink-soft);
		max-width: 62ch;
	}
	@media (min-width: 900px) {
		.examples {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 0;
		}
		.example + .example {
			border-left: 1px solid var(--color-rule);
			padding-left: 2.25rem;
		}
		.example:not(:last-child) {
			padding-right: 2.25rem;
		}
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
		line-height: 1.7;
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
		background: var(--color-surface-alt);
		border: 1px dashed var(--color-rule-strong);
		padding: 0.4rem 0.85rem;
		text-decoration: line-through;
		text-decoration-color: var(--color-rule-strong);
	}
	.stack-plus {
		text-decoration: none;
		font-style: italic;
	}
	/* The plan. Same panel treatment and the same column split as the record
	   above it, so the two right-hand blocks share an edge down the page
	   instead of each finding their own. */
	.price-card {
		padding: clamp(1.75rem, 3vw, 2.25rem);
		border-top: 2px solid var(--color-primary-600);
	}
	.price-tag {
		display: block;
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-primary-600);
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
		font-weight: var(--weight-display);
		letter-spacing: -0.03em;
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
		line-height: 1.7;
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
	@media (min-width: 860px) {
		/* One split, shared. The sources grid and the plan grid used to run
		   1.15/0.85 and 1.1/0.9 at two different breakpoints, so the record
		   panel and the price card sat on two different vertical edges. */
		.gather,
		.plan-grid {
			grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
			gap: 3.5rem;
			align-items: start;
		}
	}
</style>
