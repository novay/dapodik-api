const express = require('express');
const router = express.Router();
const DikmenController = require('../controllers/dikmenController');

router.get('/dikmen', DikmenController.getProvinsi);
router.get('/dikmen/:kode_provinsi', DikmenController.getKabupaten);
router.get('/dikmen/:kode_provinsi/:kode_kabupaten', DikmenController.getKecamatan);
router.get('/dikmen/:kode_provinsi/:kode_kabupaten/:kode_kecamatan', DikmenController.getSekolah);

module.exports = router;