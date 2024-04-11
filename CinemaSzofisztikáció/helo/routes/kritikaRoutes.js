const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');
const {getKritika} = require('../Controllers/kritikaControllers');

router.get('/kritika', getKritika)

module.exports=router