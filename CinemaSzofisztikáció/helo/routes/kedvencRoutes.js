const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');
const {getkedvencek, postkedvencek} = require('../Controllers/kedvencControllers');

router.get('/getkedvenc', getkedvencek)
router.post('/postkedvenc', postkedvencek)

module.exports=router