const express = require('express');
const router = express.Router();
const YayasanController = require('../controllers/yayasanController');

router.get('/yayasan', YayasanController.getProvinsi);
router.get('/yayasan/:kode_provinsi', YayasanController.getKabupaten);
router.get('/yayasan/:kode_provinsi/:kode_kabupaten', YayasanController.getKecamatan);
router.get('/yayasan/:kode_provinsi/:kode_kabupaten/:kode_kecamatan', YayasanController.getYayasan);
router.get('/yayasan-detail/:id_yayasan', YayasanController.getYayasanById);

module.exports = router;