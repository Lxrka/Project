const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');
const {getFilmek, getMesek, getSorozat, kivansaglista, getMusor} = require('../Controllers/musorControllers');


router.get('/filmek', getFilmek)
router.get('/mesek', getMesek)
router.get('/sorozatok', getSorozat)
router.get('/kivansaglista', kivansaglista)
router.get('/getMusor', getMusor)
//router.post('/feltoltes', feltoltes);
module.exports = router;