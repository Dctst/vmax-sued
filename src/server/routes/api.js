const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { sendContactMail } = require('../utils/mailer');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Zu viele Anfragen. Bitte versuchen Sie es in 15 Minuten erneut.' },
});

router.post('/contact', contactLimiter, async (req, res) => {
  try {
    const { vehicle, service, name, email, phone, message, privacy } = req.body;

    // Validation
    const errors = [];
    if (!vehicle || !vehicle.brand) errors.push('Bitte wählen Sie eine Marke.');
    if (!vehicle || !vehicle.model) errors.push('Bitte geben Sie ein Modell an.');
    if (!service) errors.push('Bitte wählen Sie einen Service.');
    if (!name || name.trim().length < 2) errors.push('Bitte geben Sie Ihren Namen an.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Bitte geben Sie eine gültige E-Mail-Adresse an.');
    if (!privacy) errors.push('Bitte stimmen Sie der Datenschutzerklärung zu.');

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Sanitize
    const sanitized = {
      vehicle: {
        brand: String(vehicle.brand).slice(0, 100),
        model: String(vehicle.model).slice(0, 100),
        year: String(vehicle.year || '').slice(0, 10),
        engine: String(vehicle.engine || '').slice(0, 100),
      },
      service: String(service).slice(0, 200),
      name: String(name).trim().slice(0, 200),
      email: String(email).trim().slice(0, 200),
      phone: String(phone || '').trim().slice(0, 50),
      message: String(message || '').trim().slice(0, 2000),
    };

    await sendContactMail(sanitized);

    res.json({ success: true, message: 'Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns zeitnah bei Ihnen.' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.' });
  }
});

module.exports = router;
