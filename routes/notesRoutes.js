const express = require('express');
const router = express.Router();
const mid = require('../middleware/authMiddleware');
const notes = require('../controller/notesController');

router.get('/', mid.auth, notes.getAllNotes);
router.post('/', mid.auth, notes.createNotes);

module.exports = router;