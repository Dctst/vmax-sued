// Mailer — leitet Kontakt-Anfragen via Web3Forms an Stefan weiter.
// Web3Forms ist ein serverless Form-Backend:
//  - kein eigener SMTP nötig
//  - kein Domain-Setup
//  - 250 Mails/Monat im Free-Tier
//  - der Access Key wird beim Onboarding erzeugt und gehört zu einer Empfänger-Mail
// Doc: https://docs.web3forms.com/

const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY || '5c3a711c-0182-4560-89e7-c9991b4e9008';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendContactMail({ vehicle, service, name, email, phone, message, attachment }) {
  const subject = `Neue Anfrage: ${service} — ${vehicle.brand} ${vehicle.model}`;

  // Plain-Text-Version als Fallback
  const plainText = [
    '=== NEUE ANFRAGE ÜBER VMAX-SUED.COM ===',
    '',
    'FAHRZEUG',
    `  Marke:    ${vehicle.brand}`,
    `  Modell:   ${vehicle.model}`,
    `  Baujahr:  ${vehicle.year || '—'}`,
    `  Motor:    ${vehicle.engine || '—'}`,
    '',
    'GEWÜNSCHTER SERVICE',
    `  ${service}`,
    '',
    'KONTAKTDATEN',
    `  Name:     ${name}`,
    `  E-Mail:   ${email}`,
    `  Telefon:  ${phone || '—'}`,
    '',
    'NACHRICHT',
    `  ${message || '—'}`,
    '',
    attachment ? `(Fahrzeugschein-Anhang: ${attachment.filename})` : '(Kein Fahrzeugschein-Anhang)',
    '=========================================',
  ].join('\n');

  // HTML-Mail mit Branding
  const htmlBody = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #141414; color: #F5F5F5;">
      <div style="background: #0A0A0A; padding: 24px 32px; border-bottom: 2px solid #C87533;">
        <h1 style="font-size: 18px; margin: 0; font-weight: 500; color: #F5F5F5;">Neue Anfrage über vmax-sued.com</h1>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td colspan="2" style="padding: 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Fahrzeug</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8; width: 120px;">Marke</td><td style="padding: 4px 0;">${escapeHtml(vehicle.brand)}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Modell</td><td style="padding: 4px 0;">${escapeHtml(vehicle.model)}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Baujahr</td><td style="padding: 4px 0;">${escapeHtml(vehicle.year || '—')}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Motor</td><td style="padding: 4px 0;">${escapeHtml(vehicle.engine || '—')}</td></tr>
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Service</td></tr>
          <tr><td colspan="2" style="padding: 4px 0;">${escapeHtml(service)}</td></tr>
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Kontakt</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Name</td><td style="padding: 4px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">E-Mail</td><td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #C87533;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Telefon</td><td style="padding: 4px 0;"><a href="tel:${escapeHtml(phone)}" style="color: #C87533;">${escapeHtml(phone || '—')}</a></td></tr>
          ${message ? `
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Nachricht</td></tr>
          <tr><td colspan="2" style="padding: 4px 0; white-space: pre-wrap;">${escapeHtml(message)}</td></tr>
          ` : ''}
          ${attachment ? `
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Anhang</td></tr>
          <tr><td colspan="2" style="padding: 4px 0; color: #4ADE80;">📎 Fahrzeugschein: ${escapeHtml(attachment.filename)}</td></tr>
          ` : ''}
        </table>
      </div>
      <div style="padding: 16px 32px; background: #0A0A0A; color: #6B6B6B; font-size: 12px; text-align: center;">
        Gesendet über vmax-sued.com Kontaktformular
      </div>
    </div>
  `;

  // Web3Forms erwartet multipart/form-data wenn ein File dabei ist,
  // sonst tut's auch JSON. Wir nutzen FormData für beide Fälle.
  const form = new FormData();
  form.append('access_key', WEB3FORMS_ACCESS_KEY);
  form.append('subject', subject);
  form.append('from_name', 'Vmax Sued Kontaktformular');
  form.append('replyto', email);
  form.append('name', name);
  form.append('email', email);
  form.append('phone', phone || '');
  form.append('message', plainText);
  form.append('html', htmlBody);
  // Anti-Spam: leeres Botpot-Feld
  form.append('botcheck', '');

  if (attachment && attachment.content && attachment.content.length > 0) {
    const blob = new Blob([attachment.content], {
      type: attachment.contentType || 'application/octet-stream',
    });
    form.append('attachment', blob, attachment.filename || 'fahrzeugschein');
  }

  let res;
  try {
    res = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: form });
  } catch (err) {
    console.error('[mailer] Web3Forms-Request fehlgeschlagen:', err.message);
    throw new Error('Versand fehlgeschlagen. Bitte später erneut versuchen.');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    console.error('[mailer] Web3Forms-Antwort:', res.status, data);
    throw new Error(data.message || 'Web3Forms hat die Anfrage abgelehnt.');
  }

  return { messageId: 'web3forms-' + Date.now() };
}

module.exports = { sendContactMail };
