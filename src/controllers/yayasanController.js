const DapodikService = require('../services/dapodikService');

class YayasanController {
  static async getProvinsi(req, res) {
    try {
      const data = await DapodikService.getProvinsi('yayasan');
      res.status(200).json({
        success: true,
        message: 'Data provinsi Yayasan berhasil ditarik.',
        count: data.length,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getKabupaten(req, res) {
    try {
      const { kode_provinsi } = req.params;
      const data = await DapodikService.getKabupaten('yayasan', kode_provinsi);
      res.status(200).json({
        success: true,
        message: `Data kabupaten/kota Yayasan untuk provinsi ${kode_provinsi} berhasil ditarik.`,
        count: data.length,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getKecamatan(req, res) {
    try {
      const { kode_provinsi, kode_kabupaten } = req.params;
      const data = await DapodikService.getKecamatan('yayasan', kode_provinsi, kode_kabupaten);
      res.status(200).json({
        success: true,
        message: `Data kecamatan Yayasan untuk kabupaten/kota ${kode_kabupaten} berhasil ditarik.`,
        count: data.length,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getYayasan(req, res) {
    try {
      const { kode_provinsi, kode_kabupaten, kode_kecamatan } = req.params;
      const data = await DapodikService.getSekolah('yayasan', kode_provinsi, kode_kabupaten, kode_kecamatan);
      res.status(200).json({
        success: true,
        message: `Data yayasan untuk kecamatan ${kode_kecamatan} berhasil ditarik.`,
        count: data.length,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getYayasanById(req, res) {
    try {
      const { id_yayasan } = req.params;
      const data = await DapodikService.getYayasanById(id_yayasan);
      res.status(200).json({
        success: true,
        message: `Data yayasan dengan ID Yayasan ${id_yayasan} berhasil ditarik.`,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = YayasanController;