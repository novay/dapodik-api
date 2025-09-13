const DapodikService = require('../services/dapodikService');

class ProgramController {
  static async getProvinsi(req, res) {
    try {
      const { program } = req.params;
      const data = await DapodikService.getProvinsi(`program/${program}`);
      res.status(200).json({
        success: true,
        message: `Data provinsi Program ${program} berhasil ditarik.`,
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
      const { program, kode_provinsi } = req.params;
      const data = await DapodikService.getKabupaten(`program/${program}`, kode_provinsi);
      res.status(200).json({
        success: true,
        message: `Data kabupaten/kota Program ${program} untuk provinsi ${kode_provinsi} berhasil ditarik.`,
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
      const { program, kode_provinsi, kode_kabupaten } = req.params;
      const data = await DapodikService.getKecamatan(`program/${program}`, kode_provinsi, kode_kabupaten);
      res.status(200).json({
        success: true,
        message: `Data kecamatan Program ${program} untuk kabupaten/kota ${kode_kabupaten} berhasil ditarik.`,
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
      const { program, kode_provinsi, kode_kabupaten, kode_kecamatan } = req.params;
      const data = await DapodikService.getSekolah(`program/${program}`, kode_provinsi, kode_kabupaten, kode_kecamatan);
      res.status(200).json({
        success: true,
        message: `Data sekolah Program ${program} untuk kecamatan ${kode_kecamatan} berhasil ditarik.`,
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

module.exports = ProgramController;