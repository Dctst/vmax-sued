const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
});

// Contact form endpoint (implemented in Deliverable 7)
router.post('/contact', contactLimiter, (req, res) => {
  res.status(501).json({ error: 'Kontaktformular wird in Phase 2 implementiert.' });
});

module.exports = router;
