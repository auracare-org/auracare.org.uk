export interface TeamMember {
	id: string;
	name: string;
	img?: string;
	role: string;
	bio?: string;
	linkedin?: string;
	website?: string;
}

/**
 * The current team: six people, one clean role each. Insertion order here is
 * the render order on the site.
 * Former team members, advisors and interns are intentionally not listed.
 */
export const team: Record<string, TeamMember> = {
	'tanush-pandey': {
		id: 'tanush-pandey',
		name: 'Tanush Pandey',
		img: '/JPG/tanush-pandey-new.jpg',
		role: 'Co-founder · CEO & CMO',
		bio: 'Co-founder and our London presence, reading Medicine at Imperial College London. Leads clinical strategy, safety and the medical evidence behind Auracare.',
		linkedin: 'https://www.linkedin.com/in/tanush-pandey-767a60260/'
	},
	'stephen-okita': {
		id: 'stephen-okita',
		name: 'Stephen Okita',
		img: '/JPG/stephen-okita.jpg',
		role: 'Co-founder · CTO',
		bio: 'Co-founder, computer science at UC Berkeley. Sets the technical architecture and product direction, and leads business relations in San Francisco.',
		linkedin: 'https://www.linkedin.com/in/stephen-okita/',
		website: 'https://stephenokita.com/'
	},
	'hinlun-chen': {
		id: 'hinlun-chen',
		name: 'Hinlun Chen',
		img: '/JPG/hinlin-chen.jpg',
		role: 'Co-founder · COO',
		bio: 'Co-founder, PPE at LSE, and runs an OEM with two factories. Leads operations and partnerships, and business relations in Hong Kong and China.',
		linkedin: 'https://www.linkedin.com/in/hin-lun-chen/',
		website: 'https://www.hinlun.com/'
	},
	'julius-chu': {
		id: 'julius-chu',
		name: 'Julius Chu',
		img: '/JPG/julius-chu.jpg',
		role: 'CPO',
		bio: 'Computer science at NYU. Leads product: the design system, the consumer experience, and how the two products fit together.',
		linkedin: 'https://www.linkedin.com/in/juliuschu'
	},
	'ahnaf-kabir': {
		id: 'ahnaf-kabir',
		name: 'Ahnaf Kabir',
		img: '/JPG/ahnaf-kabir.jpg',
		role: 'CISO',
		bio: 'Former software lead at Slate and co-founder of Auracle Ltd, a medtech company bringing aural health to the home. Manages security operations, technical infrastructure and backend engineering.',
		linkedin: 'https://www.linkedin.com/in/akn101',
		website: 'https://akn.me.uk/'
	},
	'karam-elradie': {
		id: 'karam-elradie',
		name: 'Karam Elradie',
		img: '/JPG/karam-elradie.jpg',
		role: 'Head of ML',
		bio: 'Leads machine learning: the neuro-symbolic core and graph models behind our reasoning.'
	}
};

// Array version for iteration (e.g., on the team section)
export const teamList: TeamMember[] = Object.values(team);

// Get a team member by ID
export function getMember(id: string): TeamMember | undefined {
	return team[id];
}

// Get initials from a name
export function getInitials(name: string): string {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('');
}

// Get member name by ID (for display)
export function getMemberName(id: string): string {
	return team[id]?.name ?? id;
}
