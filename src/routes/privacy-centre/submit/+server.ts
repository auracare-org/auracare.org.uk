import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const REQUEST_LABELS: Record<string, string> = {
	delete: 'Account & Data Deletion',
	access: 'Data Access',
	rectify: 'Data Rectification',
	portability: 'Data Portability',
	restrict: 'Restrict Processing',
	object: 'Object to Processing'
};

export const POST: RequestHandler = async ({ request }) => {
	let body: { type?: string; phone?: string; email?: string; additionalInfo?: string };

	try {
		body = await request.json();
	} catch {
		return Response.json({ message: 'Invalid request body.' }, { status: 400 });
	}

	const { type, phone, email, additionalInfo } = body;

	if (!type || !phone || !email) {
		return Response.json({ message: 'type, phone and email are required.' }, { status: 400 });
	}

	if (!Object.keys(REQUEST_LABELS).includes(type)) {
		return Response.json({ message: 'Unknown request type.' }, { status: 400 });
	}

	const label = REQUEST_LABELS[type];
	const ts = new Date().toISOString();
	const subject = `[Privacy Centre] ${label} request`;

	const htmlBody = `
<h2 style="font-family:sans-serif;color:#1a1a2e">Privacy Centre Request</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:500px">
  <tr>
    <td style="padding:8px 12px;background:#f5f5ff;font-weight:600;width:140px">Request type</td>
    <td style="padding:8px 12px">${label}</td>
  </tr>
  <tr>
    <td style="padding:8px 12px;background:#f5f5ff;font-weight:600">Phone number</td>
    <td style="padding:8px 12px">${phone}</td>
  </tr>
  <tr>
    <td style="padding:8px 12px;background:#f5f5ff;font-weight:600">Email</td>
    <td style="padding:8px 12px">${email}</td>
  </tr>
  ${
		additionalInfo
			? `<tr>
    <td style="padding:8px 12px;background:#f5f5ff;font-weight:600;vertical-align:top">Additional info</td>
    <td style="padding:8px 12px">${additionalInfo.replace(/\n/g, '<br>')}</td>
  </tr>`
			: ''
	}
  <tr>
    <td style="padding:8px 12px;background:#f5f5ff;font-weight:600">Submitted at</td>
    <td style="padding:8px 12px">${ts}</td>
  </tr>
</table>
<p style="font-family:sans-serif;font-size:13px;color:#666;margin-top:20px">
  Respond within 30 days. Verify identity before processing delete/access/portability requests.
</p>
`;

	const textBody = `Privacy Centre Request
======================
Type:         ${label}
Phone:        ${phone}
Email:        ${email}
${additionalInfo ? `Details:      ${additionalInfo}\n` : ''}Submitted:    ${ts}

Remember: respond within 30 days. Verify identity before processing delete/access/portability.
`;

	// Send via MailerSend
	// MAILERSEND_API_KEY should be the MailerSend API token (same value as SMTP password)
	const apiKey = env.MAILERSEND_API_KEY;
	if (!apiKey) {
		console.error('[privacy-centre] MAILERSEND_API_KEY not set');
		return Response.json(
			{ message: 'Email service not configured. Please contact privacy@auracare.org.uk directly.' },
			{ status: 503 }
		);
	}

	const msRes = await fetch('https://api.mailersend.com/v1/email', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: { email: 'id@ml.akn.me.uk', name: 'Auracare Privacy Centre' },
			to: [{ email: 'privacy@auracare.org.uk', name: 'Auracare Privacy' }],
			reply_to: { email, name: email },
			subject,
			text: textBody,
			html: htmlBody
		})
	});

	if (!msRes.ok) {
		const err = await msRes.text().catch(() => '');
		console.error('[privacy-centre] MailerSend error', msRes.status, err);
		return Response.json(
			{ message: 'Failed to send request. Please email privacy@auracare.org.uk directly.' },
			{ status: 502 }
		);
	}

	return Response.json({ ok: true }, { status: 200 });
};
