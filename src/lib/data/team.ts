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
 * The current team — five people, one clean role each.
 * Former team members, advisors and interns are intentionally not listed.
 */
export const team: Record<string, TeamMember> = {
	'stephen-okita': {
		id: 'stephen-okita',
		name: 'Stephen Okita',
		img: '/JPG/stephen-okita.jpg',
		role: 'CEO & CTO',
		bio: 'Founder. Sets the technical architecture and product direction, and leads the raise.',
		linkedin: 'https://www.linkedin.com/in/stephen-okita/',
		website: 'https://stephenokita.com/'
	},
	'hinlun-chen': {
		id: 'hinlun-chen',
		name: 'Hinlun Chen',
		img: '/JPG/hinlin-chen.jpg',
		role: 'COO',
		bio: 'Runs operations and partnerships, including our Hong Kong presence.',
		linkedin: 'https://www.linkedin.com/in/hin-lun-chen/',
		website: 'https://www.hinlun.com/'
	},
	'tanush-pandey': {
		id: 'tanush-pandey',
		name: 'Tanush Pandey',
		img: '/JPG/tanush-pandey-new.jpg',
		role: 'CMO',
		bio: 'Leads marketing, brand and how we tell the Auracare story.',
		linkedin: 'https://www.linkedin.com/in/tanush-pandey-767a60260/'
	},
	'ahnaf-kabir': {
		id: 'ahnaf-kabir',
		name: 'Ahnaf Kabir',
		img: '/JPG/ahnaf-kabir.jpg',
		role: 'Head of IT & Compliance',
		bio: 'Owns security, internal infrastructure and our compliance programme.',
		linkedin: 'https://www.linkedin.com/in/akn101',
		website: 'https://akn.me.uk/'
	},
	'karam-salah': {
		id: 'karam-salah',
		name: 'Karam Salah',
		role: 'Head of ML',
		bio: 'Leads machine learning — the neuro-symbolic core and graph models behind our reasoning.'
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
