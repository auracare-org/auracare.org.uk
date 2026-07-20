<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { reveal } from '$lib/actions/motion';
	import { CONTACT, PLATFORM_NOTE, NON_DEVICE_DISCLAIMER } from '$lib/data/company';

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
			body: 'Three late nights in a row and readiness is sliding. Auratwin flags it once, gently, then leaves it with you.'
		},
		{
			time: '22:00',
			title: 'Evening wrap, then quiet',
			body: 'A calm close on the day and a wind-down reminder. After this it goes silent until morning: quiet hours are on by default.'
		}
	];

	/* Replying is the logging: what you text ➝ what the twin captures. */
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

	/* You reshape the voice the same way you log anything: by texting it.
	   Each pair is a real thing you could send, and how the twin takes it. */
	const tuning = [
		{
			you: 'can you be more blunt with me? less cushioning',
			twin: 'Done. I’ll say it straight from now on and skip the soft landing.'
		},
		{
			you: 'keep it short, I don’t need the pep talk',
			twin: 'Got it, short and to the point, no pep talk.'
		},
		{
			you: 'actually you can be funnier, I like the jokes',
			twin: 'Say less. Expect worse puns. 😏'
		},
		{
			you: 'ease off the nudges this week, I’m swamped',
			twin: 'Backing right off. I’ll only flag something if it genuinely matters.'
		}
	];

	/* Presets are just starting points; every one is a full rewrite of its voice. */
	const personas = [
		{
			name: 'The gentle nudge',
			blurb: 'Soft, encouraging, never pushy. Celebrates the small wins and lets the rest slide.',
			line: '“No pressure at all, but a short walk might feel lovely today. Either way, I’ve got you. 💙”'
		},
		{
			name: 'The drill sergeant',
			blurb: 'Blunt, high-push, zero fluff. Here to hold the line when you asked it to.',
			line: '“Third skipped lunch this week. That stops today. Eat something real in the next hour.”'
		},
		{
			name: 'The dry wit',
			blurb: 'Deadpan, a little sarcastic, quietly on your side the whole time.',
			line: '“4 hours of sleep. Bold strategy. I’ll pencil in a nap you won’t take. ☕”'
		},
		{
			name: 'The quiet analyst',
			blurb: 'Minimal words, maximum signal. Speaks only when the data says something.',
			line: '“Readiness down 12% over 3 days. Cause: sleep debt. Suggest an earlier night.”'
		}
	];

	const boundaries = [
		{
			title: 'A companion, not a clinician',
			body: 'Auratwin never diagnoses, treats or prescribes. It’s general wellness, it helps you notice, not decide.'
		},
		{
			title: 'It knows when to step back',
			body: 'Anything that reads as urgent, and it routes you to real help for where you are, straight away.'
		},
		{
			title: 'Your data, your call',
			body: 'Every source is connected only with your say-so, shown back to you in plain language, and revocable any time.'
		}
	];
</script>

<Seo
	title="Auratwin: the health companion that texts you back"
	description="Auratwin turns the wearables and apps you already use into a living model of you, then checks in over iMessage: a morning brief, a nudge only when it matters, an evening wrap. Replying is the logging. Our consumer product."
	path="/product"
/>

<!-- ================= Hero ================= -->
<section class="hero">
	<div class="hero-bg" aria-hidden="true">
		<span class="blob blob-a"></span>
		<span class="blob blob-b"></span>
	</div>
	<div class="container-wide hero-inner">
		<span class="pill pill-soon" use:reveal>Auratwin · Expected August 2026</span>
		<h1 use:reveal={{ delay: 60 }}>
			Your wellness, <span class="hl">texting you back</span>.
		</h1>
		<p class="hero-sub" use:reveal={{ delay: 130 }}>
			Auratwin is a wellness companion that lives in the app you already open a hundred times a day.
			It turns your everyday signals into a personal digital twin, then checks in like someone who’s
			genuinely paying attention. No new app to learn, and no forms to fill.
		</p>
		<div class="hero-cta" use:reveal={{ delay: 200 }}>
			<a class="btn-solid" href="/#waitlist">Join the waitlist</a>
			<a class="btn-quiet" href="/product/auracare">Meet the clinical side →</a>
		</div>
		<p class="hero-note" use:reveal={{ delay: 260 }}>{PLATFORM_NOTE}</p>
	</div>
</section>

<!-- ================= A day with Auratwin ================= -->
<section class="section-y day-sec">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>A day, held together</span>
		<h2 use:reveal={{ delay: 60 }}>It reaches out first, so remembering isn’t your job.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Most wellness apps wait for you to show up. Auratwin runs the other way round: it comes to
			you, a handful of times a day, and only when there’s something worth saying.
		</p>

		<ol class="day">
			{#each day as slot, i}
				<li class="day-row" use:reveal={{ delay: i * 90 }}>
					<span class="day-time">{slot.time}</span>
					<span class="day-dot" aria-hidden="true"></span>
					<div class="day-card">
						<h3>{slot.title}</h3>
						<p>{slot.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ================= Replying is the logging ================= -->
<section class="section-y log-sec">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Replying is the logging</span>
		<h2 use:reveal={{ delay: 60 }}>Tell it like you’d tell a friend. That’s the whole system.</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			There are no streaks to protect and no fields to fill. You text in your own words; Auratwin
			does the structuring, the remembering, and the noticing.
		</p>

		<div class="log-grid">
			{#each logging as pair, i}
				<div class="log-pair" use:reveal={{ delay: i * 90 }}>
					<p class="log-bubble you"><span class="who">You</span>{pair.you}</p>
					<span class="log-arrow" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none">
							<path
								d="M5 12h14M13 6l6 6-6 6"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
					<p class="log-bubble twin"><span class="who">Auratwin</span>{pair.twin}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ================= Make it yours (personality) ================= -->
<section class="section-y persona-sec aura-space">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Make it yours</span>
		<h2 use:reveal={{ delay: 60 }}>
			Its personality is <span class="hl-inv">entirely yours to write</span>.
		</h2>
		<p class="lede lede-inv" use:reveal={{ delay: 120 }}>
			There’s no fixed Auratwin voice you have to get used to. You shape how it speaks the same way
			you tell it everything else: just say so in a text. Warm or blunt, quiet or chatty, deadpan or
			all heart; ask for a change and it adjusts on the spot. Same twin underneath, whatever
			personality you want on top.
		</p>

		<div class="persona-layout">
			<!-- Just tell it -->
			<div class="tune-panel glass-card" use:reveal={{ delay: 140 }}>
				<div class="tune-head">
					<h3>Just tell it</h3>
					<p>No settings screen, no sliders. You say what you want in a message, and it shifts.</p>
				</div>
				<ul class="tune-thread">
					{#each tuning as t, i}
						<li class="tune-pair" use:reveal={{ delay: 180 + i * 60 }}>
							<p class="tune-bubble you">{t.you}</p>
							<p class="tune-bubble twin">{t.twin}</p>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Preset personas -->
			<div class="persona-side">
				<p class="persona-intro" use:reveal={{ delay: 160 }}>
					Not sure where to start? Ask for one of these by name, then keep nudging it from there. A
					few characters people already text into being:
				</p>
				<div class="persona-grid">
					{#each personas as p, i}
						<div class="persona-card glass-card" use:reveal={{ delay: 200 + i * 70 }}>
							<h4>{p.name}</h4>
							<p class="persona-blurb">{p.blurb}</p>
							<p class="persona-line">{p.line}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<p class="persona-foot" use:reveal>
			These are just a place to begin. There’s nothing to set up and nothing to lock in: a single
			message reshapes the voice whenever you want, so the personality follows you, not the other way
			round.
		</p>
	</div>
</section>

<!-- ================= Everything it draws on ================= -->
<section class="section-y src-sec">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Everything it draws on</span>
		<h2 use:reveal={{ delay: 60 }}>
			The more it can see, the more the guidance is actually yours.
		</h2>
		<p class="lede" use:reveal={{ delay: 120 }}>
			Every source you connect deepens the twin’s picture of your daily life. That high-context view
			of <em>you</em> is what makes a nudge feel personal instead of generic.
		</p>

		<div class="src-grid">
			{#each sources as col, i}
				<div class="glass-card src-card" use:reveal={{ delay: i * 90 }}>
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
			<span class="eyebrow" use:reveal>One plan, not a shelf of them</span>
			<h2 use:reveal={{ delay: 60 }}>One subscription, in place of the pile.</h2>
			<p class="lede" use:reveal={{ delay: 120 }}>
				Wellness has quietly become expensive: a separate app, and a separate bill, for every corner
				of your health. Auratwin folds them into one companion, and starts free.
			</p>

			<ul class="stack" use:reveal={{ delay: 160 }} aria-label="Apps Auratwin replaces">
				{#each stack as s}
					<li class="stack-chip">{s}</li>
				{/each}
				<li class="stack-chip stack-plus">…and the rest</li>
			</ul>
		</div>

		<div class="price-card glass-card" use:reveal={{ delay: 140 }}>
			<span class="price-tag">Free for 6 months</span>
			<div class="price-then">
				<span class="price-num">$10</span>
				<span class="price-per">/ month after</span>
			</div>
			<p class="price-line">
				The free months compound: more context, a smarter twin, more reasons it earns its place.
			</p>
			<ul class="price-list">
				<li>Every connector and check-in</li>
				<li>A personality you can tune, any time</li>
				<li>Cancel whenever; your data leaves with you</li>
			</ul>
			<a class="btn-solid full" href="/#waitlist">Get early access</a>
		</div>
	</div>
</section>

<!-- ================= Boundaries ================= -->
<section class="section-y bound-sec">
	<div class="container-wide">
		<span class="eyebrow" use:reveal>Built with boundaries</span>
		<h2 use:reveal={{ delay: 60 }}>Honest about what it is, and what it isn’t.</h2>
		<div class="bound-grid">
			{#each boundaries as b, i}
				<div class="bound-card" use:reveal={{ delay: i * 80 }}>
					<h3>{b.title}</h3>
					<p>{b.body}</p>
				</div>
			{/each}
		</div>
		<p class="disclaimer" use:reveal>{NON_DEVICE_DISCLAIMER}</p>
	</div>
</section>

<!-- ================= Closing CTA ================= -->
<section class="cta-band aura-space">
	<div class="container-wide cta-inner">
		<h2 use:reveal>Be first to meet your twin.</h2>
		<p use:reveal={{ delay: 80 }}>
			Join the waitlist and we’ll tell you the moment Auratwin is ready for you.
		</p>
		<div class="cta-actions" use:reveal={{ delay: 140 }}>
			<a class="btn-solid" href="/#waitlist">Join the waitlist</a>
			<a
				class="btn-ghost"
				href="mailto:{CONTACT.seed}?subject=Auracare%20AI%20%E2%80%94%20Investor%20enquiry"
				>For investors</a
			>
		</div>
	</div>
</section>

<style>
	/* ---------------- Hero ---------------- */
	.hero {
		position: relative;
		overflow: clip;
		padding-block: clamp(4rem, 10vw, 7.5rem) clamp(3rem, 7vw, 5.5rem);
		background: linear-gradient(180deg, #eef2ff 0%, #f7f9ff 55%, var(--color-surface-page) 100%);
		border-bottom: 1px solid var(--color-border-default);
	}
	.hero-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.blob {
		position: absolute;
		border-radius: 999px;
		filter: blur(60px);
		opacity: 0.55;
	}
	.blob-a {
		width: 32rem;
		height: 32rem;
		top: -12rem;
		right: -8rem;
		background: radial-gradient(circle, rgba(97, 128, 255, 0.5), transparent 70%);
	}
	.blob-b {
		width: 22rem;
		height: 22rem;
		bottom: -10rem;
		left: -6rem;
		background: radial-gradient(circle, rgba(52, 211, 153, 0.28), transparent 70%);
	}
	.hero-inner {
		position: relative;
		z-index: 1;
		max-width: 46rem;
	}
	.hero h1 {
		font-size: clamp(2.3rem, 6vw, 4.1rem);
		line-height: 1.04;
		letter-spacing: -0.025em;
		margin-block: 1rem 1.1rem;
	}
	.hl {
		background: linear-gradient(100deg, var(--color-primary-500), var(--color-primary-700));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.hero-sub {
		font-size: clamp(1.02rem, 1.6vw, 1.2rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 40rem;
	}
	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1.1rem;
		margin-top: 1.9rem;
	}
	.hero-note {
		margin-top: 1.5rem;
		font-size: 0.8rem;
		line-height: 1.55;
		color: var(--color-ink-faint);
		max-width: 30rem;
	}

	/* ---------------- Shared buttons ---------------- */
	.btn-solid {
		background: var(--color-primary-600);
		color: #fff;
		font-weight: 600;
		font-size: 0.95rem;
		padding: 0.8rem 1.5rem;
		border-radius: 999px;
		box-shadow: 0 12px 26px rgba(47, 78, 192, 0.28);
		transition:
			transform 0.2s ease,
			background 0.2s ease;
	}
	.btn-solid:hover {
		transform: translateY(-2px);
		background: var(--color-primary-700);
		color: #fff;
	}
	.btn-solid.full {
		display: block;
		text-align: center;
		margin-top: 1.4rem;
	}
	.btn-quiet {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--color-primary-700);
	}
	.btn-quiet:hover {
		color: var(--color-primary-600);
	}

	/* ---------------- Shared headings ---------------- */
	h2 {
		font-size: clamp(1.7rem, 3.6vw, 2.6rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-block: 0.6rem 0;
		max-width: 24ch;
	}
	.lede {
		margin-top: 1rem;
		font-size: clamp(1rem, 1.4vw, 1.12rem);
		line-height: 1.6;
		color: var(--color-ink-soft);
		max-width: 44rem;
	}

	/* ---------------- Day timeline ---------------- */
	.day {
		list-style: none;
		margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
		padding: 0;
		display: grid;
		gap: 0.4rem;
	}
	.day-row {
		display: grid;
		grid-template-columns: 3.4rem 1.2rem 1fr;
		gap: 0.5rem 0.9rem;
		align-items: start;
	}
	.day-time {
		font-family: var(--font-family-mono);
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--color-primary-600);
		padding-top: 1.1rem;
		text-align: right;
	}
	.day-dot {
		position: relative;
		justify-self: center;
		width: 0.85rem;
		height: 0.85rem;
		margin-top: 1.15rem;
		border-radius: 999px;
		background: var(--color-primary-500);
		box-shadow: 0 0 0 4px rgba(56, 127, 245, 0.14);
	}
	.day-row:not(:last-child) .day-dot::after {
		content: '';
		position: absolute;
		top: 1.1rem;
		left: 50%;
		transform: translateX(-50%);
		width: 2px;
		height: calc(100% + 1.6rem);
		background: linear-gradient(var(--color-primary-200), transparent);
	}
	.day-card {
		padding: 1rem 1.25rem 1.15rem;
		background: var(--color-neutral-0);
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xs);
	}
	.day-card h3 {
		font-size: 1.05rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.3rem;
	}
	.day-card p {
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
	}

	/* ---------------- Replying is the logging ---------------- */
	.log-sec {
		background: var(--color-surface-alt);
		border-block: 1px solid var(--color-border-default);
	}
	.log-grid {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		display: grid;
		gap: 1rem;
	}
	.log-pair {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 0.9rem;
		align-items: center;
		padding: 1.1rem 1.25rem;
		background: var(--color-neutral-0);
		border: 1px solid var(--color-border-default);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xs);
	}
	.log-bubble {
		font-size: 0.92rem;
		line-height: 1.5;
		padding: 0.75rem 0.95rem;
		border-radius: 1.05rem;
	}
	.who {
		display: block;
		font-family: var(--font-family-mono);
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin-bottom: 0.3rem;
		opacity: 0.75;
	}
	.log-bubble.you {
		background: #e9e9eb;
		color: #111;
		border-bottom-left-radius: 0.35rem;
	}
	.log-bubble.twin {
		background: var(--color-primary-600);
		color: #eef2ff;
		border-bottom-right-radius: 0.35rem;
	}
	.log-bubble.twin .who {
		color: #cdd9ff;
		opacity: 1;
	}
	.log-arrow {
		display: inline-flex;
		width: 1.5rem;
		height: 1.5rem;
		color: var(--color-primary-400);
		justify-self: center;
	}
	.log-arrow svg {
		width: 100%;
		height: 100%;
	}

	/* ---------------- Make it yours (personality) ---------------- */
	.persona-sec {
		border-block: 1px solid var(--color-border-dark);
		overflow: clip;
	}
	.hl-inv {
		background: linear-gradient(100deg, #8aa0ff, #cdd9ff);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.lede-inv {
		color: rgba(226, 230, 240, 0.62) !important;
		max-width: 48rem;
	}
	.persona-layout {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		align-items: start;
	}

	/* "Just tell it" thread */
	.tune-panel {
		padding: clamp(1.5rem, 3vw, 2rem);
		border-radius: var(--radius-lg);
	}
	.tune-head h3 {
		font-size: 1.15rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.3rem;
	}
	.tune-head p {
		font-size: 0.88rem;
		line-height: 1.5;
		color: rgba(226, 230, 240, 0.55) !important;
	}
	.tune-thread {
		list-style: none;
		margin: 1.5rem 0 0;
		padding: 0;
		display: grid;
		gap: 1.4rem;
	}
	.tune-pair {
		display: grid;
		gap: 0.4rem;
	}
	.tune-bubble {
		font-size: 0.9rem;
		line-height: 1.5;
		padding: 0.65rem 0.9rem;
		border-radius: 1.05rem;
		max-width: 85%;
		width: fit-content;
	}
	.tune-bubble.you {
		justify-self: end;
		background: var(--color-primary-600);
		color: #eef2ff !important;
		border-bottom-right-radius: 0.35rem;
	}
	.tune-bubble.twin {
		justify-self: start;
		background: rgba(255, 255, 255, 0.07);
		color: rgba(226, 230, 240, 0.82) !important;
		border-bottom-left-radius: 0.35rem;
	}

	/* Preset personas */
	.persona-intro {
		font-size: 0.95rem;
		line-height: 1.55;
		color: rgba(226, 230, 240, 0.6) !important;
		max-width: 34rem;
	}
	.persona-grid {
		margin-top: 1.1rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.9rem;
	}
	.persona-card {
		padding: 1.2rem 1.3rem;
		border-radius: var(--radius-lg);
	}
	.persona-card h4 {
		font-size: 1.02rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.35rem;
	}
	.persona-blurb {
		font-size: 0.88rem;
		line-height: 1.5;
		color: rgba(226, 230, 240, 0.58) !important;
	}
	.persona-line {
		margin-top: 0.85rem;
		padding: 0.7rem 0.9rem;
		font-size: 0.9rem;
		line-height: 1.5;
		font-style: italic;
		color: #dbe4ff !important;
		background: rgba(97, 128, 255, 0.1);
		border-left: 2px solid var(--color-primary-400);
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
	}
	.persona-foot {
		margin-top: clamp(1.75rem, 3vw, 2.25rem);
		font-size: 0.9rem;
		line-height: 1.6;
		color: rgba(226, 230, 240, 0.5) !important;
		max-width: 50rem;
	}

	/* ---------------- Sources ---------------- */
	.src-grid {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.1rem;
	}
	.src-card {
		padding: 1.5rem 1.6rem;
	}
	.src-card h3 {
		font-size: 1.15rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.9rem;
	}
	.src-card ul {
		list-style: none;
		margin: 0 0 1rem;
		padding: 0;
		display: grid;
		gap: 0.5rem;
	}
	.src-card li {
		position: relative;
		padding-left: 1.3rem;
		font-size: 0.95rem;
		color: var(--color-ink);
	}
	.src-card li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5em;
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 999px;
		background: var(--color-primary-500);
	}
	.src-note {
		font-size: 0.85rem;
		line-height: 1.55;
		color: var(--color-ink-faint);
		border-top: 1px solid var(--color-border-default);
		padding-top: 0.9rem;
	}

	/* ---------------- Plan ---------------- */
	.plan-sec {
		background: var(--color-surface-alt);
		border-block: 1px solid var(--color-border-default);
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

	/* ---------------- Boundaries ---------------- */
	.bound-grid {
		margin-top: clamp(2rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	.bound-card {
		padding: 1.35rem 1.5rem;
		border-radius: var(--radius-lg);
		background: var(--color-neutral-0);
		border: 1px solid var(--color-border-default);
		border-left: 3px solid var(--color-primary-400);
	}
	.bound-card h3 {
		font-size: 1.05rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.35rem;
	}
	.bound-card p {
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--color-ink-soft);
	}
	.disclaimer {
		margin-top: 1.75rem;
		font-size: 0.8rem;
		line-height: 1.6;
		color: var(--color-ink-faint);
		max-width: 52rem;
	}

	/* ---------------- CTA band ---------------- */
	.cta-band {
		padding-block: clamp(3.5rem, 7vw, 5.5rem);
		border-top: 1px solid var(--color-border-dark);
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
	.btn-ghost {
		font-weight: 600;
		font-size: 0.95rem;
		color: #eaf0ff;
		padding: 0.8rem 1.4rem;
		border-radius: 999px;
		border: 1px solid var(--color-border-dark-strong);
		transition: border-color 0.2s ease;
	}
	.btn-ghost:hover {
		border-color: #fff;
		color: #fff;
	}

	/* ---------------- Responsive ---------------- */
	@media (min-width: 720px) {
		.src-grid {
			grid-template-columns: repeat(3, 1fr);
		}
		.bound-grid {
			grid-template-columns: repeat(3, 1fr);
		}
		.persona-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 860px) {
		.plan-grid {
			grid-template-columns: 1.1fr 0.9fr;
		}
	}
	@media (min-width: 960px) {
		.persona-layout {
			grid-template-columns: 0.85fr 1.15fr;
			gap: 1.75rem;
		}
		.tune-panel {
			position: sticky;
			top: 5rem;
		}
	}
	@media (max-width: 560px) {
		.log-pair {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
		.log-arrow {
			transform: rotate(90deg);
		}
	}
</style>
