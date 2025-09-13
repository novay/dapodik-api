const express = require('express');
const router = express.Router();
const DiktiController = require('../controllers/diktiController');

router.get('/dikti', DiktiController.getProvinsi);
router.get('/dikti/:kode_provinsi', DiktiController.getKabupaten);
router.get('/dikti/:kode_provinsi/:kode_kabupaten', DiktiController.getKecamatan);
router.get('/dikti/:kode_provinsi/:kode_kabupaten/:kode_kecamatan', DiktiController.getSekolah);

module.exports = router;