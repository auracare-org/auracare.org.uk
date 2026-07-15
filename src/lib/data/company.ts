/**
 * Single source of truth for Auracare AI marketing-site content.
 *
 * Positioning (see /company): Auracare is building an agentic clinical decision
 * support system (CDSS) grounded in a personal health "digital twin". Twin — the
 * first B2C product — is the initial way we test the digital-organism concept and
 * feed real, consented personal data into that wider agentic system.
 *
 * "Spectrum" is an internal framework name and is intentionally NOT used publicly.
 * Nothing here should overclaim: the reasoning engine is in development; only the
 * ontology graph is live today. Twin is a general-wellness product, not a medical device.
 */

export const CONTACT = {
	seed: 'stephen@auracare.org.uk',
	general: 'hello@auracare.org.uk',
	clinical: 'clinical@auracare.org.uk',
	privacy: 'privacy@auracare.org.uk',
	legalName: 'Auracare Health LTD',
	jurisdiction: 'England & Wales',
	ontologyUrl: 'https://ontology.auracare.org.uk',
	locations: ['London', 'Hong Kong', 'San Francisco']
} as const;

/* ------------------------------------------------------------------ */
/* What we're building now                                            */
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
		key: 'twin',
		name: 'Twin',
		tagline: 'A wellness companion, in your messages',
		blurb:
			'Built on a personal digital twin of your everyday health data, Twin is a wellness companion — it spots your patterns and checks in over iMessage. Our first consumer product, and how we begin building the digital organism.',
		status: 'ships-soon',
		statusLabel: 'Ships soon',
		href: '/product'
	},
	{
		key: 'reasoning',
		name: 'The agentic core',
		tagline: 'A loop, not a pipeline',
		blurb:
			'A neuro-symbolic reasoning engine that pairs a learned graph model with an auditable symbolic layer — the foundation of the agentic clinical decision support we are building. In active development.',
		status: 'in-development',
		statusLabel: 'In development',
		href: '/technology'
	},
	{
		key: 'ontology',
		name: 'The clinical knowledge graph',
		tagline: '532,000 concepts you can see',
		blurb:
			'Our reasoning is grounded in the terminology medicine already agrees on — SNOMED CT, ICD-11, HPO, LOINC — rendered as a live, explorable 3D graph. This part you can explore today.',
		status: 'live',
		statusLabel: 'Live',
		href: CONTACT.ontologyUrl,
		external: true
	}
];

/* ------------------------------------------------------------------ */
/* Connectors                                                         */
/* ------------------------------------------------------------------ */

export interface Connector {
	name: string;
	kind: 'platform' | 'wearable' | 'sensor';
}

export const CONNECTORS: Connector[] = [
	{ name: 'Apple Health', kind: 'platform' },
	{ name: 'Google Health Connect', kind: 'platform' },
	{ name: 'Samsung Health', kind: 'platform' },
	{ name: 'Oura', kind: 'wearable' },
	{ name: 'Whoop', kind: 'wearable' },
	{ name: 'Garmin', kind: 'wearable' },
	{ name: 'Fitbit', kind: 'wearable' },
	{ name: 'Withings', kind: 'sensor' },
	{ name: 'Dexcom', kind: 'sensor' }
];

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
		body: 'We set out to modernise UK primary care, building NHS data-aggregation tooling — including a shipped pharmacy prescribing product with automated clinical notes.',
		era: 'nhs'
	},
	{
		date: '2025 → early 2026',
		title: 'Piloted in 20 UK clinics & pharmacies',
		body: 'We ran real deployments across twenty sites and learned, first-hand, the structural and technological gaps inside a public health system.',
		era: 'nhs'
	},
	{
		date: 'Early 2026',
		title: 'We hit the wall',
		body: 'The NHS gates its API behind contracts that only renew in 2028. Rather than wait, we shelved the aggregation line — and kept everything we had learned about complex health systems.',
		era: 'nhs'
	},
	{
		date: 'May 2026',
		title: 'We pivot to Auracare AI',
		body: 'A new direction: agentic healthcare built on a personal health digital twin. The bigger goal — an agentic clinical decision support system — starts here.',
		era: 'pivot',
		fork: true
	},
	{
		date: 'Jun–Jul 2026',
		title: 'Foundations',
		body: 'A bottom-up market model, a Hong-Kong-first rollout strategy, the first neuro-symbolic reasoner, and a live ontology graph of 532,000 clinical concepts.',
		era: 'ai'
	},
	{
		date: 'Jul 2026',
		title: 'Raising our Seed round',
		body: 'We are raising to bring Twin to market and to build out the agentic core. If you invest in frontier healthcare, we would love to talk.',
		era: 'ai'
	},
	{
		date: 'Coming months',
		title: 'Twin ships',
		body: 'Our first consumer product — a health digital twin that lives in your messages — reaches its first users.',
		era: 'ai'
	},
	{
		date: '2027 → 2030',
		title: 'Clinical rollout',
		body: 'From wellness to clinical decision support: Hong Kong first, then Taiwan and Singapore, across Southeast Asia, and into the wider region.',
		era: 'ai'
	}
];

/* ------------------------------------------------------------------ */
/* World map — market rollout waves                                    */
/* Coordinates are [longitude, latitude] for d3-geo projection.        */
/* ------------------------------------------------------------------ */

export type MarketTone =
	| 'launch'
	| 'clinical'
	| 'sea'
	| 'downstream'
	| 'beachhead'
	| 'researched'
	| 'deferred';

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
		caption: 'Twin launches direct-to-consumer.'
	},
	{
		order: 1,
		key: 'clinical',
		tone: 'clinical',
		title: 'First clinical wave',
		caption: 'One deployment, three regulatory dossiers — the evidence factory.'
	},
	{
		order: 2,
		key: 'sea',
		tone: 'sea',
		title: 'Southeast Asia',
		caption: 'Approval portability carries us across the region.'
	},
	{
		order: 3,
		key: 'downstream',
		tone: 'downstream',
		title: 'Downstream',
		caption: 'The largest markets, reached last and deliberately (2027–2030).'
	},
	{
		order: 4,
		key: 'beachhead',
		tone: 'beachhead',
		title: 'Beachhead sizing',
		caption: 'High-value markets under active evaluation.'
	},
	{
		order: 5,
		key: 'researched',
		tone: 'researched',
		title: 'Researched',
		caption: 'On our map, monitored — not yet sequenced.'
	},
	{
		order: 6,
		key: 'deferred',
		tone: 'deferred',
		title: 'Deferred by design',
		caption: 'Large, slow-approval markets we are choosing to wait on.'
	}
];

export const MARKET_POINTS: MarketPoint[] = [
	// Wave 0 — wellness launch
	{
		name: 'United Kingdom',
		coords: [-0.1278, 51.5074],
		tone: 'launch',
		wave: 0,
		label: 'Twin launches here'
	},
	{
		name: 'United States',
		coords: [-98.5, 39.5],
		tone: 'launch',
		wave: 0,
		label: 'Wellness now, clinical later'
	},
	// Wave 1 — first clinical wave (Hong Kong fires first)
	{
		name: 'Hong Kong',
		coords: [114.1694, 22.3193],
		tone: 'clinical',
		wave: 1,
		label: 'The evidence factory — first clinical deployment'
	},
	{
		name: 'United Kingdom (MHRA Airlock)',
		coords: [-0.1278, 51.5074],
		tone: 'clinical',
		wave: 1,
		label: 'Regulatory sandbox'
	},
	{
		name: 'Taiwan',
		coords: [121.5654, 25.033],
		tone: 'clinical',
		wave: 1,
		label: 'Second clinical market'
	},
	{
		name: 'Singapore',
		coords: [103.8198, 1.3521],
		tone: 'clinical',
		wave: 1,
		label: 'Regional hub'
	},
	// Wave 2 — SEA
	{ name: 'Malaysia', coords: [101.6869, 3.139], tone: 'sea', wave: 2, label: 'SEA wave' },
	{ name: 'Thailand', coords: [100.5018, 13.7563], tone: 'sea', wave: 2, label: 'SEA wave' },
	{ name: 'Vietnam', coords: [106.6297, 10.8231], tone: 'sea', wave: 2, label: 'SEA wave' },
	{ name: 'Indonesia', coords: [106.8456, -6.2088], tone: 'sea', wave: 2, label: 'SEA wave' },
	// Wave 3 — downstream
	{
		name: 'China',
		coords: [121.47, 31.23],
		tone: 'downstream',
		wave: 3,
		label: 'Reached via the Greater Bay Area, 2027–2030'
	},
	// Wave 4 — beachhead
	{
		name: 'United Arab Emirates',
		coords: [55.2708, 25.2048],
		tone: 'beachhead',
		wave: 4,
		label: 'Beachhead sizing'
	},
	{
		name: 'India',
		coords: [72.8777, 19.076],
		tone: 'beachhead',
		wave: 4,
		label: 'Beachhead sizing'
	},
	// Wave 5 — researched
	{
		name: 'Turkey',
		coords: [28.9784, 41.0082],
		tone: 'researched',
		wave: 5,
		label: 'Researched — monitoring'
	},
	{
		name: 'Nigeria',
		coords: [3.3792, 6.5244],
		tone: 'researched',
		wave: 5,
		label: 'Researched — monitoring'
	},
	{
		name: 'Kenya',
		coords: [36.8219, -1.2921],
		tone: 'researched',
		wave: 5,
		label: 'Researched — monitoring'
	},
	{
		name: 'Egypt',
		coords: [31.2357, 30.0444],
		tone: 'researched',
		wave: 5,
		label: 'Researched — monitoring'
	},
	{
		name: 'Brazil',
		coords: [-46.6333, -23.5505],
		tone: 'researched',
		wave: 5,
		label: 'Researched — monitoring'
	},
	{
		name: 'Mexico',
		coords: [-99.1332, 19.4326],
		tone: 'researched',
		wave: 5,
		label: 'Researched — monitoring'
	},
	{
		name: 'Japan',
		coords: [139.6503, 35.6762],
		tone: 'researched',
		wave: 5,
		label: 'Researched — monitoring'
	},
	{
		name: 'Saudi Arabia',
		coords: [46.6753, 24.7136],
		tone: 'researched',
		wave: 5,
		label: 'Researched — monitoring'
	}
];

export const MARKET_ARCS: MarketArc[] = [
	{ from: [114.1694, 22.3193], to: [121.47, 31.23], label: 'Hong Kong → China', wave: 1 },
	{ from: [114.1694, 22.3193], to: [121.5654, 25.033], label: 'Hong Kong → Taiwan', wave: 1 }
];

/* ------------------------------------------------------------------ */
/* Market & traction                                                   */
/* ------------------------------------------------------------------ */

export interface FunnelStage {
	key: string;
	label: string;
	value: string;
	note: string;
}

export const FUNNEL: FunnelStage[] = [
	{
		key: 'tam',
		label: 'TAM',
		value: '~$7B',
		note: 'Frontline diagnostic decision support, 2026 — growing to ~$14–16B by 2030.'
	},
	{
		key: 'sam',
		label: 'SAM',
		value: '~$3B',
		note: 'The markets our approval strategy can actually reach.'
	},
	{
		key: 'beachhead',
		label: 'Beachhead',
		value: '~$0.5B',
		note: 'Our first six sequenced markets.'
	},
	{ key: 'som', label: 'SOM', value: '~$40M', note: 'Target ARR by year five.' }
];

export const TRACTION: { stat: string; label: string }[] = [
	{ stat: '20', label: 'UK clinics & pharmacies piloted' },
	{ stat: '532k', label: 'clinical concepts in our live ontology' },
	{ stat: 'MHRA', label: 'AI Airlock sandbox cohort completed' },
	{ stat: 'FDA', label: 'Pre-Submission underway' }
];

export const MARKET_BASIS =
	'Built bottom-up: ~5.8M frontline diagnostic clinicians (of ~12.8M physicians worldwide, WHO 2024) at roughly $1,200 ARPU. Three independent methods converge on a $5–11B opportunity — no black-box analyst report required.';

/* ------------------------------------------------------------------ */
/* Technology / ontology                                               */
/* ------------------------------------------------------------------ */

export const ONTOLOGY_STATS: { value: string; label: string }[] = [
	{ value: '532k', label: 'SNOMED CT concepts' },
	{ value: '1.3M', label: 'relationships mapped' },
	{ value: 'ICD-11', label: '31.9k categories' },
	{ value: 'LOINC', label: '217k lab codes' }
];

export interface MoatPillar {
	title: string;
	body: string;
}

export const MOAT: MoatPillar[] = [
	{
		title: 'The value-of-information loop',
		body: 'A reasoning loop that asks the next-best question instead of running a fixed pipeline — narrowing uncertainty the way a clinician does.'
	},
	{
		title: 'Multi-modal grounding',
		body: 'Wearables, labs, notes and imaging encoded into one shared health vocabulary, so every signal is comparable and auditable.'
	},
	{
		title: 'A neuro-symbolic engine',
		body: 'Grounded in SNOMED CT and ICD-11: a learned model proposes, an auditable symbolic layer disposes. Every answer traces to a named source.'
	}
];

export const MOAT_LINE =
	'The category we are defining sits at the overlap of all three — most tools hold only one.';

/* ------------------------------------------------------------------ */
/* Consent & safety                                                    */
/* ------------------------------------------------------------------ */

export const TWIN_DOES = [
	'Connects the devices you already own',
	'Learns your baselines and spots meaningful changes',
	'Checks in with a morning brief and an evening wrap',
	'Nudges you only when your data says something worth saying'
];

export const TWIN_NEVER = [
	'Diagnoses, treats or prescribes',
	'Interprets a reading as a clinical result',
	'Replaces your doctor, pharmacist or 999/111',
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
	'Twin is a general-wellness product, not a medical device. It does not diagnose, treat, cure or prevent any disease. Always seek professional medical advice for health concerns.';

export const PLATFORM_NOTE =
	'Twin v1 launches on iMessage (iOS). Android is on the roadmap — join the waitlist and we’ll tell you the moment it’s ready for you.';
