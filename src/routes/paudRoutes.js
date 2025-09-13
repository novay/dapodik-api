const express = require('express');
const router = express.Router();
const PaudController = require('../controllers/paudController');

router.get('/paud', PaudController.getProvinsi);
router.get('/paud/:kode_provinsi', PaudController.getKabupaten);
router.get('/paud/:kode_provinsi/:kode_kabupaten', PaudController.getKecamatan);
router.get('/paud/:kode_provinsi/:kode_kabupaten/:kode_kecamatan', PaudController.getSekolah);

module.exports = router;