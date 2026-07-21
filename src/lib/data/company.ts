/**
 * Single source of truth for Auracare marketing-site content.
 *
 * Positioning: Auracare (the company) builds two products on one shared patient model.
 *   - Auratwin: the consumer digital twin that lives in your messages (B2C).
 *   - Auracare: clinician-facing clinical decision support that works inside the
 *     consultation (B2B), fed by our own medical hardware, ambient transcription and
 *     the twin's lifestyle summary.
 *
 * Nothing here should overclaim: the reasoning core is in development, Auracare's
 * regulatory pathway is not yet confirmed, and Auratwin is a general-wellness product,
 * not a medical device. Only the ontology graph is live today.
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
		key: 'auratwin',
		name: 'Auratwin',
		tagline: 'Your digital twin, in your messages',
		blurb:
			'A personal health digital twin that lives where you already talk. Auratwin learns your patterns and checks in over your favourite messaging app: guidance before you think you need it. Our consumer product.',
		status: 'ships-soon',
		statusLabel: 'Expected August 2026',
		href: '/product'
	},
	{
		key: 'auracare',
		name: 'Auracare',
		tagline: 'Decision support inside the consultation',
		blurb:
			'Clinician-facing clinical decision support that works quietly during the appointment. It reasons over the twin’s summary, live vitals and the conversation itself, so the clinician keeps their eyes on the patient. In development.',
		status: 'in-development',
		statusLabel: 'Expected May 2027',
		href: '/product/auracare'
	},
	{
		key: 'ontology',
		name: 'One patient model',
		tagline: '532,000 concepts you can see',
		blurb:
			'Both products share one model of the patient, grounded in the terminology medicine already agrees on (SNOMED CT, ICD-11, HPO, LOINC) and rendered as a live, explorable graph. This part you can explore today.',
		status: 'live',
		statusLabel: 'Live',
		href: CONTACT.ontologyUrl,
		external: true
	}
];

/* ------------------------------------------------------------------ */
/* Auratwin: the data it draws on, and why replying is the logging     */
/* ------------------------------------------------------------------ */

export interface DataCategory {
	key: string;
	label: string;
	/** Accent shown on hover, mirrors the orbit icon colours in the hero. */
	color: string;
}

/** Categories of everyday-life signal, not brand names: the picture, not the plumbing. */
export const DATA_CATEGORIES: DataCategory[] = [
	{ key: 'sleep', label: 'Sleep', color: '#3f4c78' }, // indigo, matches orbit
	{ key: 'movement', label: 'Movement', color: '#2f7168' }, // teal, matches orbit
	{ key: 'nutrition', label: 'Nutrition', color: '#4e7350' }, // moss, matches orbit
	{ key: 'screen', label: 'Screen time', color: '#8a6d3c' }, // bronze, matches orbit
	{ key: 'location', label: 'Location', color: '#9a5a4c' }, // clay, matches orbit
	{ key: 'wearables', label: 'Wearables', color: '#6a5487' }, // plum, matches orbit
	{ key: 'platforms', label: 'Platforms', color: '#3f6f88' }, // steel blue, no orbit icon
	{ key: 'records', label: 'Health records', color: '#94627a' } // mauve, no orbit icon
];

export const DATA_MOAT_NOTE =
	'Every source you connect deepens the twin’s picture of your daily life. That high-context view of you is what makes the guidance yours, not generic.';

export const EHR_NOTE =
	'Health records can be read into your twin for context, but Auratwin never acts on them clinically, per the FD&C Act §520(o)(1)(B) exclusion.';

export interface Edge {
	title: string;
	body: string;
}

export const AURATWIN_EDGE: Edge[] = [
	{
		title: 'Zero to learn',
		body: 'No new app and no new interface. Auratwin lives in the messages you already use every day.'
	},
	{
		title: 'Replying is the logging',
		body: 'Tell it what you ate or how you slept in a normal text. No forms, no streaks to keep alive.'
	},
	{
		title: 'It reaches out first',
		body: 'It notices the patterns and reaches out first, so nothing gets forgotten. The work of remembering is on us, not you.'
	},
	{
		title: 'A personality you can tune',
		body: 'A sharp, well-rested sibling: funny, specific, and on your side. Set how blunt or gentle it is, say “ease up” any time, and it holds that tone.'
	}
];

/* ------------------------------------------------------------------ */
/* Auracare: the twin comes with you to the appointment                */
/* ------------------------------------------------------------------ */

export const AURACARE_INTRO =
	'Every input arrives automatically, so the clinician never has to break eye contact to search, type, or look something up.';

export interface AuracareStage {
	title: string;
	body: string;
}

export const AURACARE_INPUTS: AuracareStage[] = [
	{
		title: 'The lifestyle summary',
		body: 'The daily-life picture Auratwin has built, shared by the patient as a single, complete lifestyle picture.'
	},
	{
		title: 'Acute vitals, live',
		body: 'Blood pressure, temperature, a heart trace and any other vitals stream from our own devices straight into the core.'
	},
	{
		title: 'Ambient transcription',
		body: 'The consultation is captured as it happens, so no one has to stop the conversation to type.'
	}
];

export const AURACARE_OUTPUTS: AuracareStage[] = [
	{
		title: 'Ranked differentials',
		body: 'Possible diagnoses, ordered by likelihood for the clinician to weigh. The judgement always stays with the clinician.'
	},
	{
		title: 'Next steps, tailored',
		body: 'Guideline-aligned options for each path, aware of what is actually available where the clinician works.'
	},
	{
		title: 'Documentation, automatic',
		body: 'Structured notes written by the core, so there is less time on the screen and more with the patient.'
	}
];

export const AURACARE_HW_USP =
	'A closed hardware-to-software link: our own devices feed the reasoning core directly, with no manual entry and no third-party integration in between.';

export const REGULATORY_NOTE =
	'Auracare is our clinical decision support system, still in development. Its regulatory pathway is not yet confirmed and is under active, continuous review.';

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
		note: 'Captures heart and lung sounds as data the core can read, not just for the ear.'
	},
	{
		name: 'Blood-pressure monitor',
		note: 'Clinical-grade readings, streamed straight into the reasoning core.'
	},
	{
		name: 'Otoscope',
		note: 'A closer look inside, captured and passed on to the core automatically.'
	}
];

export const HARDWARE_MORE =
	'And more devices are on the way, the same closed hardware-to-software link, extended to new measurements.';

export const HARDWARE_NOTE =
	'All three devices are built and ready for certification, manufactured through three factories in China equipped to make medical hardware.';

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
		body: 'Our prior venture reached twenty-eight UK pharmacies, including a regional director, and taught us the structural gaps inside a public health system first-hand.',
		era: 'nhs'
	},
	{
		date: 'Early 2026',
		title: 'We hit the wall',
		body: 'We had already built out our aggregation product, but the NHS gates its API behind contracts that only renew in 2028. Rather than wait, we shelved that line, knowing everything we had built was a foundation we could build on.',
		era: 'nhs'
	},
	{
		date: 'May 2026',
		title: 'We pivot to Auracare AI',
		body: 'A new direction: two products on one patient model, Auratwin for people and Auracare for clinicians.',
		era: 'pivot',
		fork: true
	},
	{
		date: 'Jul 2026',
		title: 'Auratwin MVP',
		body: 'The consumer digital twin reaches its first build: a wellness companion that lives in your messages.',
		era: 'ai'
	},
	{
		date: 'Aug 2026',
		title: 'Public launch & first clinical trials',
		body: 'Auratwin opens to the public, and our partnership with the Chinese Academy of Sciences begins trials with doctors in China.',
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
		caption: 'Auratwin goes direct-to-consumer across every English-speaking market.'
	},
	{
		order: 1,
		key: 'clinical',
		tone: 'clinical',
		title: 'Clinical trial in CAS',
		caption: 'Auracare enters clinical trials with the Chinese Academy of Sciences.'
	},
	{
		order: 2,
		key: 'crossover',
		tone: 'crossover',
		title: 'Product crossover',
		caption:
			'Auracare follows Auratwin into its wellness markets; Auratwin follows Auracare into the CAS markets.'
	},
	{
		order: 3,
		key: 'sea',
		tone: 'sea',
		title: 'Southeast Asia',
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
		caption: 'Everywhere else — more to come.'
	}
];

export const MARKET_POINTS: MarketPoint[] = [
	// Wave 1: wellness launch across English-speaking markets
	{
		name: 'United Kingdom',
		coords: [-0.1278, 51.5074],
		tone: 'launch',
		wave: 0,
		label: 'Auratwin launches here'
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
		name: 'Ireland',
		coords: [-8.2439, 53.4129],
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
	{
		name: 'New Zealand',
		coords: [174.7762, -41.2865],
		tone: 'launch',
		wave: 0,
		label: 'Wellness launch'
	},
	// Wave 2: clinical trial in CAS (China / Greater Bay Area)
	{
		name: 'China',
		coords: [113.2644, 23.1291],
		tone: 'clinical',
		wave: 1,
		label: 'Clinical trials with the Chinese Academy of Sciences, via the Greater Bay Area'
	},
	{
		name: 'Hong Kong',
		coords: [114.1694, 22.3193],
		tone: 'clinical',
		wave: 1,
		label: 'Operations base and gateway to the Greater Bay Area'
	},
	// Wave 3: product crossover — both products meet in the East Asian hubs
	{
		name: 'Taiwan',
		coords: [121.5654, 25.033],
		tone: 'crossover',
		wave: 2,
		label: 'Auracare and Auratwin now both operate here'
	},
	{
		name: 'Singapore',
		coords: [103.8198, 1.3521],
		tone: 'crossover',
		wave: 2,
		label: 'Auracare and Auratwin now both operate here'
	},
	// Wave 4: Southeast Asia
	{ name: 'Malaysia', coords: [101.6869, 3.139], tone: 'sea', wave: 3, label: 'SEA expansion' },
	{ name: 'Thailand', coords: [100.5018, 13.7563], tone: 'sea', wave: 3, label: 'SEA expansion' },
	{ name: 'Vietnam', coords: [106.6297, 10.8231], tone: 'sea', wave: 3, label: 'SEA expansion' },
	{ name: 'Indonesia', coords: [106.8456, -6.2088], tone: 'sea', wave: 3, label: 'SEA expansion' },
	{ name: 'Philippines', coords: [121.774, 12.8797], tone: 'sea', wave: 3, label: 'SEA expansion' },
	// Wave 5: Europe & Africa
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
	// Wave 6: rest of world — more to come
	{
		name: 'India',
		coords: [78.9629, 20.5937],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world — more to come'
	},
	{
		name: 'Brazil',
		coords: [-51.9253, -14.235],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world — more to come'
	},
	{
		name: 'Japan',
		coords: [138.2529, 36.2048],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world — more to come'
	},
	{
		name: 'Saudi Arabia',
		coords: [46.6753, 24.7136],
		tone: 'deferred',
		wave: 5,
		label: 'Rest of world — more to come'
	}
];

export const MARKET_ARCS: MarketArc[] = [
	{
		from: [114.1694, 22.3193],
		to: [113.2644, 23.1291],
		label: 'Hong Kong → Greater Bay Area',
		wave: 1
	},
	{ from: [114.1694, 22.3193], to: [121.5654, 25.033], label: 'Hong Kong → Taiwan', wave: 2 }
];

/* ------------------------------------------------------------------ */
/* Market & traction                                                   */
/* ------------------------------------------------------------------ */

export const TRACTION: { stat: string; label: string }[] = [
	{ stat: '28', label: 'UK pharmacy partnerships from our prior venture' },
	{ stat: '$134k', label: 'UK government funding awarded' },
	{ stat: '$300k', label: 'angel investment, Hong Kong' },
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

export interface MoatPillar {
	title: string;
	body: string;
}

export const MOAT: MoatPillar[] = [
	{
		title: 'One timestamped, high-context patient state',
		body: 'Many have tried; this is the first product that can actually pull it off. Everyday-life signals from the twin, acute vitals streamed straight from our own hardware, and clinical history all map onto one shared clinical vocabulary, each reading timestamped. That builds a longitudinal patient state, not a flat snapshot, so the core reasons over how someone is changing.'
	},
	{
		title: 'Neuro-symbolic: a glass box, not a black box',
		body: 'Neuro-symbolic by design: a learned graph model personalises medical knowledge to this patient and proposes a ranked shortlist, every entry checked against an auditable symbolic layer grounded in SNOMED CT and ICD-11 and traceable to a named source. The clinician makes the final call, choosing one from the list.'
	},
	{
		title: 'A reasoning loop that asks the next-best question',
		body: "A value-of-information loop, not a fixed pipeline: the core keeps a live ranked list of what's likely, then asks only the single question, exam or test that resolves the most uncertainty for its cost, and only ones permitted where the patient actually is."
	}
];

export const MOAT_LINE =
	'The category we are defining sits at the overlap of all three.';

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
	'Auratwin is a general-wellness product, not a medical device. It does not diagnose, treat, cure or prevent any disease. Always seek professional medical advice for health concerns.';

export const PLATFORM_NOTE =
	'Auratwin v1 launches on iMessage (iOS), plus WhatsApp and RCS for Android. Join the waitlist and we’ll tell you the moment it’s ready for you.';
