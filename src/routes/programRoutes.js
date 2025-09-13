const express = require('express');
const router = express.Router();
const ProgramController = require('../controllers/programController');

router.get('/program/:program', ProgramController.getProvinsi);
router.get('/program/:program/:kode_provinsi', ProgramController.getKabupaten);
router.get('/program/:program/:kode_provinsi/:kode_kabupaten', ProgramController.getKecamatan);
router.get('/program/:program/:kode_provinsi/:kode_kabupaten/:kode_kecamatan', ProgramController.getSekolah);

module.exports = router;