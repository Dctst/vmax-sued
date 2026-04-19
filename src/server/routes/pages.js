const express = require('express');
const router = express.Router();

// Startseite
router.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'VMAX Süd — Chiptuning & Leistungssteigerung in Westendorf bei Augsburg',
    description: 'Einzelabstimmung statt Softwarepaket. Chiptuning, TÜV-Eintragung und Komplettumbauten bei VMAX Süd in Westendorf. Partner der VMAX Performance Gruppe seit 1997.',
  });
});

// Leistungsseiten
router.get('/chiptuning', (req, res) => {
  res.render('pages/chiptuning', {
    title: 'Chiptuning & Leistungssteigerung — VMAX Süd',
    description: 'Professionelles Chiptuning mit Einzelabstimmung auf dem Prüfstand. Stage 1, Stage 2 und individuelle Kennfeldoptimierung bei VMAX Süd in Westendorf.',
  });
});

router.get('/tuev-eintragung', (req, res) => {
  res.render('pages/tuev-eintragung', {
    title: 'TÜV-Eintragung & Einzelabnahme — VMAX Süd',
    description: 'TÜV-Eintragung für Tuning-Teile und Umbauten. Teilegutachten, Einzelabnahme und Begleitung bis zur Zulassung bei VMAX Süd.',
  });
});

router.get('/komplettumbauten', (req, res) => {
  res.render('pages/komplettumbauten', {
    title: 'Komplettumbauten mit StVO-Abnahme — VMAX Süd',
    description: 'Vom Konzept bis zur Straßenzulassung. Komplettumbauten, Einzelstücke und Eigenbauten mit Abnahme nach StVO bei VMAX Süd.',
  });
});

router.get('/b2b', (req, res) => {
  res.render('pages/b2b', {
    title: 'B2B-Prüftechnik für Unternehmen — VMAX Süd',
    description: 'Betriebsfestigkeits-Ermittlung, Abgastests und Teilegutachten für Tuninghersteller und Werkstätten. B2B-Services von VMAX Süd.',
  });
});

// Weitere Seiten
router.get('/galerie', (req, res) => {
  res.render('pages/galerie', {
    title: 'Galerie — VMAX Süd',
    description: 'Kundenfahrzeuge, Projekte und Prüfstands-Ergebnisse von VMAX Süd in Westendorf.',
  });
});

router.get('/team', (req, res) => {
  res.render('pages/team', {
    title: 'Über uns — Stefan Jung & VMAX Süd',
    description: 'Stefan Jung und das VMAX Süd Team. Erfahrung, Philosophie und Werkstatt in Westendorf bei Augsburg.',
  });
});

router.get('/kontakt', (req, res) => {
  res.render('pages/kontakt', {
    title: 'Kontakt & Termin anfragen — VMAX Süd',
    description: 'Termin für Chiptuning, TÜV-Eintragung oder Beratung anfragen. VMAX Süd in Westendorf bei Augsburg.',
  });
});

// Rechtliches
router.get('/impressum', (req, res) => {
  res.render('pages/impressum', {
    title: 'Impressum — VMAX Süd',
    description: 'Impressum der VMAX Süd, Westendorf.',
  });
});

router.get('/datenschutz', (req, res) => {
  res.render('pages/datenschutz', {
    title: 'Datenschutzerklärung — VMAX Süd',
    description: 'Datenschutzerklärung der VMAX Süd, Westendorf.',
  });
});

router.get('/agb', (req, res) => {
  res.render('pages/agb', {
    title: 'AGB — VMAX Süd',
    description: 'Allgemeine Geschäftsbedingungen der VMAX Süd, Westendorf.',
  });
});

module.exports = router;
