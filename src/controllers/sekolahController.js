const DapodikService = require('../services/dapodikService');

class SekolahController {
  static async getSekolahByKode(req, res) {
    try {
      const { kode_sekolah } = req.params;
      const data = await DapodikService.getSekolahByKode(kode_sekolah);
      res.status(200).json({
        success: true,
        message: `Data sekolah dengan kode ${kode_sekolah} berhasil ditarik.`,
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

module.exports = SekolahController;