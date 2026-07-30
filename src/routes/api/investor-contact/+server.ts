import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import { CONTACT, INVESTOR_CONTACTS, INVESTOR_REGIONS } from '$lib/data/company';
import { getMemberName } from '$lib/data/team';

// The rest of the site is prerendered; this endpoint must run on Vercel.
export const prerender = false;

const MAX = { name: 200, email: 320, firm: 200, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// A human can't read the page and write a message in under 3 seconds.
const MIN_FILL_MS = 3000;

const oneLine = (v: unknown) =>
	String(v ?? '')
		.replace(/[\r\n]+/g, ' ')
		.trim();

const fail = (error: string, status = 400) => json({ ok: false, error }, { status });

export const POST: RequestHandler = async ({ request }) => {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return fail('Invalid request.');
	}

	const name = oneLine(body.name);
	const email = oneLine(body.email);
	const firm = oneLine(body.firm);
	const region = oneLine(body.region);
	const message = String(body.message ?? '').trim();
	const honeypot = String(body.website ?? '');
	const startedAt = Number(body.startedAt ?? 0);

	// Bots fill the hidden field or submit instantly; answer OK so they move on.
	if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
		return json({ ok: true });
	}

	const regionDef = INVESTOR_REGIONS.find((r) => r.value === region);
	if (!name || name.length > MAX.name) return fail('Please add your name.');
	if (!EMAIL_RE.test(email) || email.length > MAX.email)
		return fail('That email address doesn’t look right.');
	if (firm.length > MAX.firm) return fail('That firm name is too long.');
	if (!regionDef) return fail('Please pick where you’re based.');
	if (!message) return fail('Please add a short message.');
	if (message.length > MAX.message) return fail('That message is too long for the form.');

	if (!env.RESEND_API_KEY) {
		console.error('investor-contact: RESEND_API_KEY is not set');
		return fail('The form isn’t connected yet. Please email us directly instead.', 503);
	}

	const recipient = INVESTOR_CONTACTS[regionDef.contact];
	const lines = [
		`Name:    ${name}`,
		firm ? `Firm:    ${firm}` : null,
		`Email:   ${email}`,
		`Region:  ${regionDef.label}`,
		'',
		message
	].filter((l): l is string => l !== null);

	const resend = new Resend(env.RESEND_API_KEY);
	const { error } = await resend.emails.send({
		from: 'Auracare website <notifications@auracare.org.uk>',
		to: [recipient.email],
		bcc: [CONTACT.general],
		replyTo: email,
		subject: `Investor enquiry — ${name}${firm ? `, ${firm}` : ''} (${regionDef.label})`,
		text: lines.join('\n')
	});

	if (error) {
		console.error('investor-contact: send failed', error);
		return fail('Sending failed on our side. Please email us directly instead.', 502);
	}

	return json({ ok: true, recipient: getMemberName(recipient.teamId) });
};
