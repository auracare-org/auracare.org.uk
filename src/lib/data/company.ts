/**
 * Single source of truth for Auracare marketing-site content.
 *
 * Naming: "Auracare" unqualified is the company. The products are "Auracle"
 * (consumer, ships first) and "Auracare CDSS" (clinical, in development); expand
 * "clinical decision support system (CDSS)" once per page. One shared patient
 * model underneath both.
 *
 * The homepage is the umbrella: it states the structure once and routes out.
 * Product detail lives on /product and /product/auracare; the raise lives on
 * /investors; the consumer sell lives on auracle.health.
 *
 * Nothing here should overclaim: the reasoning core is in development, the CDSS
 * regulatory pathway is not yet confirmed, and Auracle is a general-wellness
 * product, not a medical device. Only the ontology graph is live today. Keep
 * unevidenced deck claims (e.g. CDSS performance percentages) off the site.
 */

export const CONTACT = {
	seed: 'stephen@auracare.org.uk',
	hinlun: 'hinlun@auracare.org.uk',
	tanush: 'tanush@auracare.org.uk',
	general: 'hello@auracare.org.uk',
	clinical: 'clinical@auracare.org.uk',
	privacy: 'privacy@auracare.org.uk',
	legalName: 'Auracare Health Ltd',
	jurisdiction: 'England & Wales',
	ontologyUrl: 'https://ontology.auracare.org.uk',
	locations: ['London', 'Hong Kong', 'San Francisco']
} as const;

export const WAITLIST_URL = 'https://app.auracle.health/waitlist';

/** Auracle's own consumer home, linked from the investor-facing pages. */
export const AURACLE_URL = 'https://auracle.health';

/**
 * The "want to try it?" aside that sits under the investor CTA on the home and
 * Auracle pages. Split so the trailing link can be rendered as an anchor.
 */
export const TRY_TWIN_NOTE = {
	text: 'Auracle v1 launches on iMessage, WhatsApp and RCS. The waitlist is open at',
	linkLabel: 'auracle.health',
	href: AURACLE_URL
} as const;

/* ------------------------------------------------------------------ */
/* Investors: who covers which region, and the deck                    */
/* ------------------------------------------------------------------ */

export type InvestorContactKey = 'stephen' | 'hinlun' | 'tanush';

export interface InvestorContact {
	/** id in team.ts, for name/photo/role. */
	teamId: string;
	email: string;
	/** Shown on the founder card. */
	coverage: string;
	basedIn: string;
}

export const INVESTOR_CONTACTS: Record<InvestorContactKey, InvestorContact> = {
	stephen: {
		teamId: 'stephen-okita',
		email: CONTACT.seed,
		coverage: 'North America',
		basedIn: 'San Francisco'
	},
	hinlun: {
		teamId: 'hinlun-chen',
		email: CONTACT.hinlun,
		coverage: 'Asia-Pacific',
		basedIn: 'Hong Kong'
	},
	tanush: {
		teamId: 'tanush-pandey',
		email: CONTACT.tanush,
		coverage: 'Europe',
		basedIn: 'London'
	}
};

/** Flip `ready` to true once the PDF is in static/ under `url`. */
export const DECK = {
	ready: false,
	url: '/auracare-seed-deck.pdf',
	pendingLabel: 'New pitch deck coming soon'
} as const;

/* ------------------------------------------------------------------ */
/* Two products, one patient model                                    */
/* ------------------------------------------------------------------ */

export type ProductStatus = 'live' | 'ships-soon' | 'in-development';

export interface Product {
	key: string;
	name: string;
	tagline: string;
	blurb: string;
	status: ProductStatus;
	statusLabel: string;
	href?: string;
	external?: boolean;
}

export const PRODUCTS: Product[] = [
	{
		key: 'auracle',
		name: 'Auracle',
		tagline: 'A companion in your messages',
		blurb:
			'Auracare’s social-history engine, shipped as a wellness companion in your messages. It learns your daily life in conversation and builds a history you can share at an appointment.',
		status: 'ships-soon',
		statusLabel: 'Expected August 2026',
		href: '/product/auracle'
	},
	{
		key: 'auracare',
		name: 'Auracare CDSS',
		tagline: 'Decision support inside the consultation',
		blurb:
			'Clinical decision support that runs in the background during the appointment, reasoning over Auracle’s history, live vitals from our own devices and the conversation itself. The clinician keeps their eyes on the patient.',
		status: 'in-development',
		statusLabel: 'Expected May 2027',
		href: '/product/auracare'
	},
	{
		key: 'ontology',
		name: 'One patient model',
		tagline: '532,000 concepts you can see',
		blurb:
			'Both products share one model of the patient, grounded in the terminology medicine already agrees on: SNOMED CT, ICD-11, HPO and LOINC. It is live and explorable today.',
		status: 'live',
		statusLabel: 'Live',
		href: CONTACT.ontologyUrl,
		external: true
	}
];

/* ------------------------------------------------------------------ */
/* The consumer problem Auracle answers (rendered on /product)        */
/* ------------------------------------------------------------------ */

export const TWIN_PROBLEM = {
	stat: '4%',
	line: 'of wellness-app installers are still active a month later. They fail the moment they demand effort: an app for every habit, a form for every log, a streak to keep alive.',
	answer: 'Auracle removes the effort instead.'
} as const;

/* ------------------------------------------------------------------ */
/* Why the consumer product leads: rendered on /investors              */
/* ------------------------------------------------------------------ */

export interface TwinRole {
	stat: string;
	title: string;
	body: string;
}

export const TWIN_ROLE_EYEBROW = 'How the business is sequenced';
export const TWIN_ROLE_HEADING = 'The consumer product leads.';

export const TWIN_ROLE: TwinRole[] = [
	{
		stat: 'Aug 2026',
		title: 'Revenue starts with Auracle',
		body: 'Auracle subscriptions begin earning at launch in August 2026. The CDSS cannot earn before certification in May 2027, so the consumer product carries revenue first.'
	},
	{
		stat: 'One model',
		title: 'The consumer product feeds the clinical one',
		body: 'Auracle builds the bio-psycho-social history a consultation has no time to gather. The patient shares it, and the CDSS reasons over it.'
	},
	{
		stat: 'Continuous',
		title: 'Retention is the data pipeline',
		body: 'Every reply keeps the history current, so CDSS input quality tracks consumer product quality. Retention is the number to hold us to.'
	}
];

/* ------------------------------------------------------------------ */
/* One patient-centred care loop: Auracle + Auracare                  */
/* ------------------------------------------------------------------ */

export interface CareLoopStep {
	title: string;
	body: string;
	/** Which side of the loop is doing the work at this step. */
	actor: 'auracle' | 'auracare';
}

export const CARE_LOOP_LINE = 'One continuous loop: the picture keeps getting richer.';

/* Eight steps, laid out as a snake with arrows: 01 to 04 across the top, down
   into 05, back across the bottom to 08, and a return arrow closing the loop. */
export const CARE_LOOP: CareLoopStep[] = [
	{
		actor: 'auracle',
		title: 'Auracle builds the picture',
		body: 'Connectors and conversation become one living bio-psycho-social history.'
	},
	{
		actor: 'auracle',
		title: 'You share it at the appointment',
		body: 'A complete history, ready for the clinician before the appointment starts.'
	},
	{
		actor: 'auracare',
		title: 'The CDSS reasons over everything',
		body: 'Shared history, acute vitals, transcription, labs and records together. It asks only what is worth asking.'
	},
	{
		actor: 'auracare',
		title: 'Ranked differential',
		body: 'Possible diagnoses, ordered by likelihood. The clinician’s judgement makes the call.'
	},
	{
		actor: 'auracare',
		title: 'Three outputs',
		body: 'A lifestyle plan, a referral or a guideline-aligned medication package, matched to the clinician’s jurisdiction.'
	},
	{
		actor: 'auracare',
		title: 'Notes write themselves',
		body: 'Formatted consultation notes with a reasoning chain for the whole session.'
	},
	{
		actor: 'auracle',
		title: 'Advice becomes routine',
		body: 'The plan returns to Auracle as reminders, tuned to how the person actually lives.'
	},
	{
		actor: 'auracle',
		title: 'Trends get caught early',
		body: 'Auracle watches the follow-through and flags change sooner, so the next appointment starts further ahead.'
	}
];

export const REGULATORY_NOTE =
	'The Auracare CDSS is in development. Its regulatory pathway is not yet confirmed and is under continuous review.';

/* ------------------------------------------------------------------ */
/* Our own medical hardware                                            */
/* ------------------------------------------------------------------ */

export interface HardwareDevice {
	name: string;
	note: string;
}

export const HARDWARE: HardwareDevice[] = [
	{
		name: 'Recording stethoscope',
		note: 'Captures heart and lung sounds as data the core can read.'
	},
	{
		name: 'Blood-pressure monitor',
		note: 'Clinical-grade readings, streamed straight into the reasoning core.'
	},
	{
		name: 'Otoscope',
		note: 'Captured and passed to the core automatically.'
	}
];

export const HARDWARE_MORE =
	'More devices are on the way, extending the same closed hardware-to-software link to new measurements.';

/* ------------------------------------------------------------------ */
/* Company timeline (scroll animation, with the May-2026 fork)        */
/* ------------------------------------------------------------------ */

export interface Milestone {
	date: string;
	title: string;
	body: string;
	era: 'nhs' | 'pivot' | 'ai';
	fork?: boolean;
}

export const TIMELINE: Milestone[] = [
	{
		date: '2025',
		title: 'Auracare is founded',
		body: 'We began inside UK primary care, building NHS data tooling and a pharmacy prescribing product with automated clinical notes.',
		era: 'nhs'
	},
	{
		date: '2025 → early 2026',
		title: '28 pharmacy partnerships',
		body: 'Our prior venture reached twenty-eight UK pharmacies, including a regional director, and showed us the structural gaps inside a public health system first-hand.',
		era: 'nhs'
	},
	{
		date: 'Early 2026',
		title: 'We hit the wall',
		body: 'Our aggregation product was built, but the NHS gates its API behind contracts that do not renew until 2028. We shelved that line and kept the foundation.',
		era: 'nhs'
	},
	{
		date: 'May 2026',
		title: 'We pivot to Auracare AI',
		body: 'A new direction: two products on one patient model, Auracle for people and the Auracare CDSS for clinicians.',
		era: 'pivot',
		fork: true
	},
	{
		date: 'Jul 2026',
		title: 'Auracle MVP',
		body: 'The consumer product reaches its first build: a wellness companion in your messages.',
		era: 'ai'
	},
	{
		date: 'Aug 2026',
		title: 'Auracle public launch',
		body: 'Auracle opens to the public on iMessage, WhatsApp and RCS.',
		era: 'ai'
	},
	{
		date: 'Feb 2027',
		title: 'First clinical trials',
		body: 'Trials begin with hospitals and institutions across Hong Kong and China.',
		era: 'ai'
	},
	{
		date: '2026 → 2027',
		title: 'The core and the hardware',
		body: 'The reasoning core moves from a validated design into build, while our stethoscope, BP monitor and otoscope head toward certification, with more devices in the pipeline.',
		era: 'ai'
	},
	{
		date: 'Jun 2027 onward',
		title: 'Clinical rollout',
		body: 'With consumer and professional hardware certified, Auracare rolls out clinician-side, China-forward via the Greater Bay Area.',
		era: 'ai'
	}
];

/* ------------------------------------------------------------------ */
/* World map: market rollout waves                                     */
/* Coordinates are [longitude, latitude] for d3-geo projection.        */
/* ------------------------------------------------------------------ */

export type MarketTone = 'launch' | 'clinical' | 'crossover' | 'sea' | 'expansion' | 'deferred';

export interface MarketPoint {
	name: string;
	coords: [number, number];
	tone: MarketTone;
	wave: number;
	label: string;
}

export interface MarketArc {
	from: [number, number];
	to: [number, number];
	label: string;
	wave: number;
}

export interface MarketWave {
	order: number;
	key: string;
	title: string;
	tone: MarketTone;
	caption: string;
}

export const MARKET_WAVES: MarketWave[] = [
	{
		order: 0,
		key: 'launch',
		tone: 'launch',
		title: 'Wellness launch',
		caption: 'Auracle goes direct-to-consumer across our first four markets.'
	},
	{
		order: 1,
		key: 'clinical',
		tone: 'clinical',
		title: 'Clinical trials',
		caption:
			'Auracare enters clinical trials with hospitals and institutions in Hong Kong and China.'
	},
	{
		order: 2,
		key: 'crossover',
		tone: 'crossover',
		title: 'Product crossover',
		caption:
			'Auracare follows Auracle into its wellness markets; Auracle follows Auracare into the CAS markets.'
	},
	{
		order: 3,
		key: 'sea',
		tone: 'sea',
		title: 'Asia-Pacific',
		caption: 'Approval portability carries both products across the region.'
	},
	{
		order: 4,
		key: 'expansion',
		tone: 'expansion',
		title: 'Europe & Africa',
		caption: 'Expansion into European and African markets.'
	},
	{
		order: 5,
		key: 'deferred',
		tone: 'deferred',
		title: 'Rest of world',
		caption: 'Everywhere else, more to come.'
	}
];

export const MARKET_POINTS: MarketPoint[] = [
	// Wave 1: wellness launch across English-speaking markets
	{
		name: 'United Kingdom',
		coords: [-0.1278, 51.5074],
		tone: 'launch',
		wave: 0,
		label: 'Auracle launches here'
	},
	{
		name: 'United States',
		coords: [-98.5, 39.5],
		tone: 'launch',
		wave: 0,
		label: 'Wellness launch'
	},
	{
		name: 'Canada',
		coords: [-106.35, 56.13],
		tone: 'launch',
		wave: 0,
		label: 'Wellness launch'
	},
	{
		name: 'Australia',
		coords: [133.7751, -25.2744],
		tone: 'launch',
		wave: 0,
		label: 'Wellness launch'
	},
	// Wave 2: clinical trials in Hong Kong and China (Greater Bay Area)
	{
		name: 'China',
		coords: [113.2644, 23.1291],
		tone: 'clinical',
		wave: 1,
		label: 'Clinical trials with hospitals and institutions, via the Greater Bay Area'
	},
	{
		name: 'Hong Kong',
		coords: [114.1694, 22.3193],
		tone: 'clinical',
		wave: 1,
		label: 'Operations base and gateway to the Greater Bay Area'
	},
	// Wave 3: product crossover, where both products meet in the East Asian hubs
	{
		name: 'Singapore',
		coords: [103.8198, 1.3521],
		tone: 'crossover',
		wave: 2,
		label: 'Auracare and Auracle now both operate here'
	},
	// Wave 4: Southeast Asia
	{
		name: 'Taiwan',
		coords: [121.5654, 25.033],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Malaysia',
		coords: [101.6869, 3.139],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Thailand',
		coords: [100.5018, 13.7563],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Vietnam',
		coords: [106.6297, 10.8231],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Indonesia',
		coords: [106.8456, -6.2088],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'Philippines',
		coords: [121.774, 12.8797],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	{
		name: 'New Zealand',
		coords: [174.7762, -41.2865],
		tone: 'sea',
		wave: 3,
		label: 'Asia-Pacific expansion'
	},
	// Wave 5: Europe & Africa
	{
		name: 'Ireland',
		coords: [-8.2439, 53.4129],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'France',
		coords: [2.2137, 46.2276],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'Germany',
		coords: [10.4515, 51.1657],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'Spain',
		coords: [-3.7492, 40.4637],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'Italy',
		coords: [12.5674, 41.8719],
		tone: 'expansion',
		wave: 4,
		label: 'European expansion'
	},
	{
		name: 'Nigeria',
		coords: [8.6753, 9.082],
		tone: 'expansion',
		wave: 4,
		label: 'African expansion'
	},
	{
		name: 'Kenya',
		coords: [37.9062, -0.0236],
		tone: 'expansion',
		wave: 4,
		label: 'African expansion'
	},
	{
		name: 'Egypt',
		coords: [30.8025, 26.8206],
		tone: 'expansion',
		wave: 4,
		label: 'African expansion'
	},
	{
		name: 'South Africa',
		coords: [24.9916, -28.4793],
		tone: 'expansion',
		wave: 4,
		label: 'African expansion'
	},
	// Wave 6: rest of world, more to come
	{
		name: 'India',
		coords: [78.9629, 20.5937],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world, more to come'
	},
	{
		name: 'Brazil',
		coords: [-51.9253, -14.235],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world, more to come'
	},
	{
		name: 'Japan',
		coords: [138.2529, 36.2048],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world, more to come'
	},
	{
		name: 'Saudi Arabia',
		coords: [46.6753, 24.7136],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world, more to come'
	}
];

export const MARKET_ARCS: MarketArc[] = [
	{
		from: [114.1694, 22.3193],
		to: [113.2644, 23.1291],
		label: 'Hong Kong → Greater Bay Area',
		wave: 1
	},
	{ from: [114.1694, 22.3193], to: [121.5654, 25.033], label: 'Hong Kong → Taiwan', wave: 3 }
];

/* ------------------------------------------------------------------ */
/* Market & traction                                                   */
/* ------------------------------------------------------------------ */

export const TRACTION: { stat: string; label: string }[] = [
	{ stat: '28', label: 'UK pharmacy partnerships from our prior venture' },
	{ stat: '$134k', label: 'UK government funding awarded' },
	{ stat: '$400k', label: 'angel investment, Hong Kong' },
	{ stat: '~$400k', label: 'in resources from the Founders Factory Healthcare accelerator' }
];

/**
 * The foundation box: who is building this and the partnership that opens the
 * clinical door. Not universities-as-partners, but founders' research background,
 * plus the agreed CAS route to trials.
 */
export interface FoundationPoint {
	title: string;
	body: string;
}

export const FOUNDATION_EYEBROW = 'The foundation';
export const FOUNDATION_TITLE = 'Research pedigree, and a route to trials';

export const FOUNDATION_POINTS: FoundationPoint[] = [
	{
		title: 'Imperial College London & UC Berkeley',
		body: 'Founded out of two of the world’s top-ranked programmes, medicine at Imperial and computer science at Berkeley, pairing frontline clinical training with deep engineering from day one.'
	},
	{
		title: 'Chinese Academy of Sciences',
		body: 'A partnership agreed with the CAS gives us access to clinical trials and the resources to run them, our route into the clinic.'
	}
];

/* ------------------------------------------------------------------ */
/* Technology / ontology                                               */
/* ------------------------------------------------------------------ */

export const ONTOLOGY_STATS: { value: string; label: string }[] = [
	{ value: '532k', label: 'SNOMED CT concepts' },
	{ value: '1.3M', label: 'relationships mapped' },
	{ value: 'ICD-11', label: '31.9k categories' },
	{ value: 'LOINC', label: '217k lab codes' }
];

/* ------------------------------------------------------------------ */
/* Consent & safety                                                    */
/* ------------------------------------------------------------------ */

export const TWIN_DOES = [
	'Connects the everyday-life signals you choose to share',
	'Learns your baselines and spots meaningful changes',
	'Checks in with a morning brief and an evening wrap',
	'Nudges you only when your data says something worth saying'
];

export const TWIN_NEVER = [
	'Diagnoses, treats or prescribes',
	'Interprets a reading as a clinical result',
	'Replaces your doctor, pharmacist or emergency services',
	'Shares your data without your explicit, per-source consent'
];

export interface EmergencyRegion {
	region: string;
	lines: { label: string; value: string }[];
}

export const EMERGENCY_ROUTING: EmergencyRegion[] = [
	{
		region: 'United Kingdom',
		lines: [
			{ label: 'Emergency', value: '999' },
			{ label: 'Urgent advice', value: 'NHS 111' },
			{ label: 'Mental health', value: 'Samaritans 116 123' }
		]
	},
	{
		region: 'United States',
		lines: [
			{ label: 'Emergency', value: '911' },
			{ label: 'Mental health', value: '988' },
			{ label: 'Poison control', value: '1-800-222-1222' }
		]
	}
];

export const NON_DEVICE_DISCLAIMER =
	'Auracle is a general-wellness product, not a medical device. It does not diagnose, treat, cure or prevent any disease. Always seek professional medical advice for health concerns.';

export const PLATFORM_NOTE =
	'Auracle v1 launches on iMessage (iOS), plus WhatsApp and RCS for Android. Join the waitlist and we’ll tell you the moment it’s ready for you.';
