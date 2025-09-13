const express = require('express');
const router = express.Router();
const DikmasController = require('../controllers/dikmasController');

router.get('/dikmas', DikmasController.getProvinsi);
router.get('/dikmas/:kode_provinsi', DikmasController.getKabupaten);
router.get('/dikmas/:kode_provinsi/:kode_kabupaten', DikmasController.getKecamatan);
router.get('/dikmas/:kode_provinsi/:kode_kabupaten/:kode_kecamatan', DikmasController.getSekolah);

module.exports = router;