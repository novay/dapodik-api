const DapodikService = require('../services/dapodikService');

class DikmenController {
  static async getProvinsi(req, res) {
    try {
      const data = await DapodikService.getProvinsi('dikmen');
      res.status(200).json({
        success: true,
        message: 'Data provinsi Dikmen berhasil ditarik.',
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
      const data = await DapodikService.getKabupaten('dikmen', kode_provinsi);
      res.status(200).json({
        success: true,
        message: `Data kabupaten/kota Dikmen untuk provinsi ${kode_provinsi} berhasil ditarik.`,
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
      const data = await DapodikService.getKecamatan('dikmen', kode_provinsi, kode_kabupaten);
      res.status(200).json({
        success: true,
        message: `Data kecamatan Dikmen untuk kabupaten/kota ${kode_kabupaten} berhasil ditarik.`,
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

  static async getSekolah(req, res) {
    try {
      const { kode_provinsi, kode_kabupaten, kode_kecamatan } = req.params;
      const data = await DapodikService.getSekolah('dikmen', kode_provinsi, kode_kabupaten, kode_kecamatan);
      res.status(200).json({
        success: true,
        message: `Data sekolah Dikmen untuk kecamatan ${kode_kecamatan} berhasil ditarik.`,
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
}

module.exports = DikmenController;