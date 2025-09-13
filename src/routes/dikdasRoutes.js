const express = require('express');
const router = express.Router();
const DikdasController = require('../controllers/dikdasController');

router.get('/dikdas', DikdasController.getProvinsi);
router.get('/dikdas/:kode_provinsi', DikdasController.getKabupaten);
router.get('/dikdas/:kode_provinsi/:kode_kabupaten', DikdasController.getKecamatan);
router.get('/dikdas/:kode_provinsi/:kode_kabupaten/:kode_kecamatan', DikdasController.getSekolah);

module.exports = router;