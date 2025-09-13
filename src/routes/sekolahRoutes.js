const express = require('express');
const router = express.Router();
const SekolahController = require('../controllers/sekolahController');

router.get('/sekolah/:kode_sekolah', SekolahController.getSekolahByKode);

module.exports = router;