const axios = require('axios');
const cheerio = require('cheerio');

class DapodikService {
  static getBaseUrl() {
    return process.env.BASE_URL || 'https://referensi.data.kemendikdasmen.go.id/pendidikan/';
  }

  static async fetchData(endpoint) {
    try {
      const baseUrl = this.getBaseUrl();
      const url = `${baseUrl}${endpoint}`;
      const response = await axios.get(url);
      return cheerio.load(response.data);
    } catch (error) {
      throw new Error(`Gagal mengambil data dari ${endpoint}: ${error.message}`);
    }
  }

  // Metode umum untuk mengambil data provinsi berdasarkan jenis
  static async getProvinsi(jenis) {
    try {
      const $ = await this.fetchData(jenis);
      const provinsiList = [];
      
      $('#table1 tbody tr').each((index, element) => {
        const columns = $(element).find('td');
        const link = $(columns[1]).find('a').attr('href');
        const kode = link ? link.split('/')[5] : '';
        
        // Ambil data berdasarkan jenis
        const provinsiData = {
          no: parseInt($(columns[0]).text().trim()),
          nama_provinsi: $(columns[1]).text().trim(),
          kode_provinsi: kode,
          path: `/api/${jenis}/${kode}`
        };

        // Tambahkan data spesifik berdasarkan jenis
        switch(jenis) {
          case 'paud':
            provinsiData.tk_sederajat = parseInt($(columns[2]).text().trim());
            provinsiData.kb_sederajat = parseInt($(columns[3]).text().trim());
            provinsiData.tpa = parseInt($(columns[4]).text().trim());
            provinsiData.sps = parseInt($(columns[5]).text().trim());
            provinsiData.total = parseInt($(columns[6]).text().trim());
            break;
          case 'dikdas':
            provinsiData.sd_sederajat = parseInt($(columns[2]).text().trim());
            provinsiData.smp_sederajat = parseInt($(columns[3]).text().trim());
            provinsiData.total = parseInt($(columns[4]).text().trim());
            break;
          case 'dikmen':
            provinsiData.sma_sederajat = parseInt($(columns[2]).text().trim());
            provinsiData.smk_sederajat = parseInt($(columns[3]).text().trim());
            provinsiData.slb = parseInt($(columns[4]).text().trim());
            provinsiData.total = parseInt($(columns[5]).text().trim());
            break;
          case 'dikti':
            provinsiData.akademi = parseInt($(columns[2]).text().trim());
            provinsiData.politeknik = parseInt($(columns[3]).text().trim());
            provinsiData.sekolah_tinggi = parseInt($(columns[4]).text().trim());
            provinsiData.institut = parseInt($(columns[5]).text().trim());
            provinsiData.universitas = parseInt($(columns[6]).text().trim());
            provinsiData.total = parseInt($(columns[7]).text().trim());
            break;
          case 'dikmas':
            provinsiData.kursus = parseInt($(columns[2]).text().trim());
            provinsiData.tbm = parseInt($(columns[3]).text().trim());
            provinsiData.pkbm = parseInt($(columns[4]).text().trim());
            provinsiData.skb = parseInt($(columns[5]).text().trim());
            provinsiData.ponpes = parseInt($(columns[6]).text().trim());
            provinsiData.total = parseInt($(columns[7]).text().trim());
            break;
          case 'yayasan':
            provinsiData.total = parseInt($(columns[2]).text().trim());
            break;
          default:
            // Untuk program (paud, kesetaraan, terampil, slb)
            provinsiData.total = parseInt($(columns[2]).text().trim());
            break;
        }
        
        provinsiList.push(provinsiData);
      });
      
      return provinsiList;
    } catch (error) {
      throw new Error(`Gagal mengambil data provinsi: ${error.message}`);
    }
  }

  // Metode umum untuk mengambil data kabupaten berdasarkan jenis
  static async getKabupaten(jenis, kodeProvinsi) {
    try {
      const $ = await this.fetchData(`${jenis}/${kodeProvinsi}/1`);
      const kabupatenList = [];
      
      $('#table1 tbody tr').each((index, element) => {
        const columns = $(element).find('td');
        const link = $(columns[1]).find('a').attr('href');
        const kode = link ? link.split('/')[5] : '';
        
        // Ambil data berdasarkan jenis
        const kabupatenData = {
          no: parseInt($(columns[0]).text().trim()),
          nama_kabupaten: $(columns[1]).text().trim(),
          kode_kabupaten: kode,
          path: `/api/${jenis}/${kodeProvinsi}/${kode}`
        };

        // Tambahkan data spesifik berdasarkan jenis
        switch(jenis) {
          case 'paud':
            kabupatenData.tk_sederajat = parseInt($(columns[2]).text().trim());
            kabupatenData.kb_sederajat = parseInt($(columns[3]).text().trim());
            kabupatenData.tpa = parseInt($(columns[4]).text().trim());
            kabupatenData.sps = parseInt($(columns[5]).text().trim());
            kabupatenData.total = parseInt($(columns[6]).text().trim());
            break;
          case 'dikdas':
            kabupatenData.sd_sederajat = parseInt($(columns[2]).text().trim());
            kabupatenData.smp_sederajat = parseInt($(columns[3]).text().trim());
            kabupatenData.total = parseInt($(columns[4]).text().trim());
            break;
          case 'dikmen':
            kabupatenData.sma_sederajat = parseInt($(columns[2]).text().trim());
            kabupatenData.smk_sederajat = parseInt($(columns[3]).text().trim());
            kabupatenData.slb = parseInt($(columns[4]).text().trim());
            kabupatenData.total = parseInt($(columns[5]).text().trim());
            break;
          case 'dikti':
            kabupatenData.akademi = parseInt($(columns[2]).text().trim());
            kabupatenData.politeknik = parseInt($(columns[3]).text().trim());
            kabupatenData.sekolah_tinggi = parseInt($(columns[4]).text().trim());
            kabupatenData.institut = parseInt($(columns[5]).text().trim());
            kabupatenData.universitas = parseInt($(columns[6]).text().trim());
            kabupatenData.total = parseInt($(columns[7]).text().trim());
            break;
          case 'dikmas':
            kabupatenData.kursus = parseInt($(columns[2]).text().trim());
            kabupatenData.tbm = parseInt($(columns[3]).text().trim());
            kabupatenData.pkbm = parseInt($(columns[4]).text().trim());
            kabupatenData.skb = parseInt($(columns[5]).text().trim());
            kabupatenData.ponpes = parseInt($(columns[6]).text().trim());
            kabupatenData.total = parseInt($(columns[7]).text().trim());
            break;
          case 'yayasan':
            kabupatenData.total = parseInt($(columns[2]).text().trim());
            break;
          default:
            // Untuk program (paud, kesetaraan, terampil, slb)
            kabupatenData.total = parseInt($(columns[2]).text().trim());
            break;
        }
        
        kabupatenList.push(kabupatenData);
      });
      
      return kabupatenList;
    } catch (error) {
      throw new Error(`Gagal mengambil data kabupaten: ${error.message}`);
    }
  }

  // Metode umum untuk mengambil data kecamatan berdasarkan jenis
  static async getKecamatan(jenis, kodeProvinsi, kodeKabupaten) {
    try {
      const $ = await this.fetchData(`${jenis}/${kodeKabupaten}/2`);
      const kecamatanList = [];
      
      $('#table1 tbody tr').each((index, element) => {
        const columns = $(element).find('td');
        const link = $(columns[1]).find('a').attr('href');
        const kode = link ? link.split('/')[5] : '';
        
        // Ambil data berdasarkan jenis
        const kecamatanData = {
          no: parseInt($(columns[0]).text().trim()),
          nama_kecamatan: $(columns[1]).text().trim(),
          kode_kecamatan: kode,
          path: `/api/${jenis}/${kodeProvinsi}/${kodeKabupaten}/${kode}`
        };

        // Tambahkan data spesifik berdasarkan jenis
        switch(jenis) {
          case 'paud':
            kecamatanData.tk_sederajat = parseInt($(columns[2]).text().trim());
            kecamatanData.kb_sederajat = parseInt($(columns[3]).text().trim());
            kecamatanData.tpa = parseInt($(columns[4]).text().trim());
            kecamatanData.sps = parseInt($(columns[5]).text().trim());
            kecamatanData.total = parseInt($(columns[6]).text().trim());
            break;
          case 'dikdas':
            kecamatanData.sd_sederajat = parseInt($(columns[2]).text().trim());
            kecamatanData.smp_sederajat = parseInt($(columns[3]).text().trim());
            kecamatanData.total = parseInt($(columns[4]).text().trim());
            break;
          case 'dikmen':
            kecamatanData.sma_sederajat = parseInt($(columns[2]).text().trim());
            kecamatanData.smk_sederajat = parseInt($(columns[3]).text().trim());
            kecamatanData.slb = parseInt($(columns[4]).text().trim());
            kecamatanData.total = parseInt($(columns[5]).text().trim());
            break;
          case 'dikti':
            kecamatanData.akademi = parseInt($(columns[2]).text().trim());
            kecamatanData.politeknik = parseInt($(columns[3]).text().trim());
            kecamatanData.sekolah_tinggi = parseInt($(columns[4]).text().trim());
            kecamatanData.institut = parseInt($(columns[5]).text().trim());
            kecamatanData.universitas = parseInt($(columns[6]).text().trim());
            kecamatanData.total = parseInt($(columns[7]).text().trim());
            break;
          case 'dikmas':
            kecamatanData.kursus = parseInt($(columns[2]).text().trim());
            kecamatanData.tbm = parseInt($(columns[3]).text().trim());
            kecamatanData.pkbm = parseInt($(columns[4]).text().trim());
            kecamatanData.skb = parseInt($(columns[5]).text().trim());
            kecamatanData.ponpes = parseInt($(columns[6]).text().trim());
            kecamatanData.total = parseInt($(columns[7]).text().trim());
            break;
          case 'yayasan':
            kecamatanData.total = parseInt($(columns[2]).text().trim());
            break;
          default:
            // Untuk program (paud, kesetaraan, terampil, slb)
            kecamatanData.total = parseInt($(columns[2]).text().trim());
            break;
        }
        
        kecamatanList.push(kecamatanData);
      });
      
      return kecamatanList;
    } catch (error) {
      throw new Error(`Gagal mengambil data kecamatan: ${error.message}`);
    }
  }

  // Metode umum untuk mengambil data sekolah berdasarkan jenis
  static async getSekolah(jenis, kodeProvinsi, kodeKabupaten, kodeKecamatan) {
    try {
      const $ = await this.fetchData(`${jenis}/${kodeKecamatan}/3`);
      const sekolahList = [];
      
      $('#table1 tbody tr').each((index, element) => {
        const columns = $(element).find('td');
        
        // Untuk Yayasan
        if (jenis === 'yayasan') {
          const link = $(columns[1]).find('a').attr('href');
          const npyp = $(columns[1]).text().trim();

          // Ekstrak id_yayasan dari URL
          let id_yayasan = '';
          const idMatch = link.match(/yayasan_id=([A-F0-9-]+)/);
          if (idMatch && idMatch[1]) {
            id_yayasan = idMatch[1];
          }
          
          sekolahList.push({
            no: parseInt($(columns[0]).text().trim()),
            npyp: npyp,
            id_yayasan: id_yayasan,
            nama_yayasan: $(columns[2]).text().trim(),
            alamat: $(columns[3]).text().trim(),
            kelurahan: $(columns[4]).text().trim(),
            path: `/api/yayasan-detail/${id_yayasan}`
          });
        } 
        // Untuk sekolah (PAUD, Dikdas, Dikmen, Dikti, Dikmas, Program)
        else {
          const link = $(columns[1]).find('a').attr('href');
          const npsn = $(columns[1]).text().trim();
          
          sekolahList.push({
            no: parseInt($(columns[0]).text().trim()),
            npsn: npsn,
            nama_sekolah: $(columns[2]).text().trim(),
            alamat: $(columns[3]).text().trim(),
            kelurahan: $(columns[4]).text().trim(),
            status: $(columns[5]).text().trim(),
            path: `/api/sekolah/${npsn}`
          });
        }
      });
      
      return sekolahList;
    } catch (error) {
      throw new Error(`Gagal mengambil data sekolah: ${error.message}`);
    }
  }

  static async getSekolahByKode(kodeSekolah) {
    try {
      // Untuk endpoint sekolah, kita menggunakan URL /pendidikan/npsn/[NPSN]
      const baseUrl = this.getBaseUrl();
      const url = `${baseUrl}npsn/${kodeSekolah}`;
      console.log(`Fetching school data from: ${url}`);
      
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      // Ekstrak data sekolah dari halaman detail
      const sekolahData = {
        npsn: kodeSekolah,
        nama_sekolah: $('.main-content h4').text().trim(),
      };

      console.log('Initial data extracted:', sekolahData);

      // Ekstrak data dari tab "Identitas Satuan Pendidikan"
      // Menggunakan selector yang lebih spesifik untuk tab pertama
      const identitasTab = $('.tabby-tab').first().find('.tabby-content');
      console.log('Identitas tab found:', identitasTab.length > 0);
      
      if (identitasTab.length > 0) {
        identitasTab.find('tr').each((index, element) => {
          const columns = $(element).find('td');
          if (columns.length >= 4) {
            const label = $(columns[1]).text().trim();
            const value = $(columns[3]).text().trim();
            
            // Skip jika label kosong
            if (!label) return;
            
            console.log(`Processing row ${index}: ${label} = ${value}`);
            
            switch(label) {
              case 'Nama':
                sekolahData.nama = value;
                break;
              case 'NPSN':
                const npsnLink = $(columns[3]).find('a');
                sekolahData.npsn = npsnLink.length > 0 ? npsnLink.text().trim() : value;
                break;
              case 'Alamat':
                sekolahData.alamat = value;
                break;
              case 'Desa/Kelurahan':
                sekolahData.desa_kelurahan = value;
                break;
              case 'Kecamatan/Kota (LN)':
                sekolahData.kecamatan = value;
                break;
              case 'Kab.-Kota/Negara (LN)':
                sekolahData.kabupaten = value;
                break;
              case 'Propinsi/Luar Negeri (LN)':
                sekolahData.provinsi = value;
                break;
              case 'Status Sekolah':
                sekolahData.status = value;
                break;
              case 'Bentuk Pendidikan':
                sekolahData.bentuk_pendidikan = value;
                break;
              case 'Jenjang Pendidikan':
                sekolahData.jenjang_pendidikan = value;
                break;
            }
          }
        });
      }

      // Ekstrak data dari tab "Dokumen dan Perijinan"
      // Menggunakan selector untuk tab kedua
      const dokumenTab = $('.tabby-tab').eq(1).find('.tabby-content');
      console.log('Dokumen tab found:', dokumenTab.length > 0);
      
      if (dokumenTab.length > 0) {
        dokumenTab.find('tr').each((index, element) => {
          const columns = $(element).find('td');
          if (columns.length >= 4) {
            const label = $(columns[1]).text().trim();
            const value = $(columns[3]).text().trim();
            
            // Skip jika label kosong
            if (!label) return;
            
            switch(label) {
              case 'Kementerian Pembina':
                sekolahData.kementerian_pembina = value;
                break;
              case 'Naungan':
                sekolahData.naungan = value;
                break;
              case 'NPYP':
                sekolahData.npyp = value;
                break;
              case 'No. SK. Pendirian':
                sekolahData.no_sk_pendirian = value;
                break;
              case 'Tanggal SK. Pendirian':
                sekolahData.tanggal_sk_pendirian = value;
                break;
              case 'Nomor SK Operasional':
                sekolahData.no_sk_operasional = value;
                break;
              case 'Tanggal SK Operasional':
                sekolahData.tanggal_sk_operasional = value;
                break;
              case 'Akreditasi':
                const akreditasiLink = $(columns[3]).find('a');
                if (akreditasiLink.length > 0) {
                  sekolahData.akreditasi = akreditasiLink.text().trim();
                  sekolahData.link_akreditasi = akreditasiLink.attr('href');
                } else {
                  sekolahData.akreditasi = value;
                }
                break;
            }
          }
        });
      }

      // Ekstrak data dari tab "Sarana dan Prasarana"
      // Menggunakan selector untuk tab ketiga
      const saranaTab = $('.tabby-tab').eq(2).find('.tabby-content');
      console.log('Sarana tab found:', saranaTab.length > 0);
      
      if (saranaTab.length > 0) {
        saranaTab.find('tr').each((index, element) => {
          const columns = $(element).find('td');
          if (columns.length >= 4) {
            const label = $(columns[1]).text().trim();
            const value = $(columns[3]).text().trim();
            
            // Skip jika label kosong
            if (!label) return;
            
            switch(label) {
              case 'Luas Tanah':
                sekolahData.luas_tanah = value;
                break;
              case 'Akses Internet':
                if (!sekolahData.akses_internet) {
                  sekolahData.akses_internet = [];
                }
                if (value && value !== '') {
                  sekolahData.akses_internet.push(value);
                }
                break;
              case 'Sumber Listrik':
                sekolahData.sumber_listrik = value;
                break;
            }
          }
        });
      }

      // Ekstrak data dari tab "Kontak"
      // Menggunakan selector untuk tab keempat
      const kontakTab = $('.tabby-tab').eq(3).find('.tabby-content');
      console.log('Kontak tab found:', kontakTab.length > 0);
      
      if (kontakTab.length > 0) {
        kontakTab.find('tr').each((index, element) => {
          const columns = $(element).find('td');
          if (columns.length >= 4) {
            const label = $(columns[1]).text().trim();
            const value = $(columns[3]).text().trim();
            
            // Skip jika label kosong
            if (!label) return;
            
            switch(label) {
              case 'Fax':
                sekolahData.fax = value;
                break;
              case 'Telepon':
                sekolahData.telepon = value;
                break;
              case 'Email':
                sekolahData.email = value;
                break;
              case 'Website':
                sekolahData.website = value;
                break;
              case 'Operator':
                sekolahData.operator = value;
                break;
            }
          }
        });
      }

      // Ekstrak data dari tab "Peta"
      // Menggunakan selector untuk tab kelima
      const petaTab = $('.tabby-tab').eq(4).find('.tabby-content');
      console.log('Peta tab found:', petaTab.length > 0);
      
      if (petaTab.length > 0) {
        // Koordinat berada dalam div dengan class col-lg-4 col-md-4
        const koordinatDiv = petaTab.find('.col-lg-4.col-md-4');
        
        if (koordinatDiv.length > 0) {
          const koordinatText = koordinatDiv.html();
          console.log('Koordinat text:', koordinatText);
          
          // Gunakan regex untuk mengekstrak koordinat
          const lintangMatch = koordinatText.match(/Lintang:\s*([-\d.]+)/);
          const bujurMatch = koordinatText.match(/Bujur:\s*([-\d.]+)/);
          
          if (lintangMatch && lintangMatch[1]) {
            sekolahData.lintang = lintangMatch[1];
            console.log('Lintang found:', lintangMatch[1]);
          }
          if (bujurMatch && bujurMatch[1]) {
            sekolahData.bujur = bujurMatch[1];
            console.log('Bujur found:', bujurMatch[1]);
          }
        }
      }

      console.log('Final data extracted:', sekolahData);
      return sekolahData;
    } catch (error) {
      console.error('Error detail:', error);
      throw new Error(`Gagal mengambil data sekolah: ${error.message}`);
    }
  }

  static async getYayasanById(id_yayasan) {
    try {
      // URL untuk detail yayasan berdasarkan ID
      const url = `https://vervalyayasan.data.kemdikbud.go.id/index.php/Chome/profil?yayasan_id=${id_yayasan}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      // Ekstrak data yayasan dari halaman detail
      const yayasanData = {
        id_yayasan: id_yayasan,
        link_profil: url
      };

      // Ekstrak data dari header
      const headerText = $('.page-header').text();
      const npypMatch = headerText.match(/\(([^)]+)\)/);
      if (npypMatch && npypMatch[1]) {
        yayasanData.npyp = npypMatch[1].trim();
      }

      const namaYayasanMatch = headerText.match(/\)\s*(.+?)\s*</);
      if (namaYayasanMatch && namaYayasanMatch[1]) {
        yayasanData.nama_yayasan = namaYayasanMatch[1].trim();
      }

      const alamatMatch = headerText.match(/<font[^>]*>([^<]+)<\/font>/);
      if (alamatMatch && alamatMatch[1]) {
        const alamatParts = alamatMatch[1].split(',');
        if (alamatParts.length >= 1) {
          yayasanData.alamat = alamatParts[0].replace(/^Jl\./, '').trim();
        }
        if (alamatParts.length >= 2) {
          yayasanData.kelurahan = alamatParts[1].trim();
        }
        if (alamatParts.length >= 3) {
          const kecamatanMatch = alamatParts[2].match(/Kec\.\s*(.+)/);
          if (kecamatanMatch && kecamatanMatch[1]) {
            yayasanData.kecamatan = kecamatanMatch[1].trim();
          }
        }
        if (alamatParts.length >= 4) {
          const kabupatenMatch = alamatParts[3].match(/(Kota|Kab\.)\s*(.+)/);
          if (kabupatenMatch && kabupatenMatch[2]) {
            yayasanData.kabupaten = `${kabupatenMatch[1]} ${kabupatenMatch[2]}`.trim();
          }
        }
        if (alamatParts.length >= 5) {
          const provinsiMatch = alamatParts[4].match(/Prov\.\s*(.+)/);
          if (provinsiMatch && provinsiMatch[1]) {
            yayasanData.provinsi = provinsiMatch[1].trim();
          }
        }
      }

      // Ekstrak data dari list-group
      $('.list-group-item').each((index, element) => {
        const text = $(element).text().trim();
        
        // Pimpinan Yayasan
        const pimpinanMatch = text.match(/Pimpinan Yayasan\s*:\s*(.+)/);
        if (pimpinanMatch && pimpinanMatch[1]) {
          yayasanData.pimpinan_yayasan = pimpinanMatch[1].trim();
        }
        
        // Operator Yayasan
        const operatorMatch = text.match(/Operator Yayasan\s*:\s*(.+)/);
        if (operatorMatch && operatorMatch[1]) {
          yayasanData.operator_yayasan = operatorMatch[1].trim();
          
          // Ekstrak link operator jika ada
          const operatorLink = $(element).find('a').attr('href');
          if (operatorLink) {
            yayasanData.link_operator = operatorLink;
          }
        }
        
        // Telp
        const telpMatch = text.match(/Telp\s*:\s*(.+)/);
        if (telpMatch && telpMatch[1]) {
          yayasanData.telepon = telpMatch[1].trim();
        }
        
        // Fax
        const faxMatch = text.match(/Fax\s*:\s*(.+)/);
        if (faxMatch && faxMatch[1]) {
          yayasanData.fax = faxMatch[1].trim();
        }
        
        // Email
        const emailMatch = text.match(/Email\s*:\s*(.+)/);
        if (emailMatch && emailMatch[1]) {
          yayasanData.email = emailMatch[1].trim();
        }
        
        // Kode Pos
        const kodePosMatch = text.match(/Kode Pos\s*:\s*(.+)/);
        if (kodePosMatch && kodePosMatch[1]) {
          yayasanData.kode_pos = kodePosMatch[1].trim();
        }
        
        // No. Pendirian Yayasan
        const noPendirianMatch = text.match(/No\. Pendirian Yayasan\s*:\s*(.+)/);
        if (noPendirianMatch && noPendirianMatch[1]) {
          yayasanData.no_pendirian = noPendirianMatch[1].trim();
        }
        
        // Tgl Pendirian Yayasan
        const tglPendirianMatch = text.match(/Tgl Pendirian Yayasan\s*:\s*(.+)/);
        if (tglPendirianMatch && tglPendirianMatch[1]) {
          yayasanData.tgl_pendirian = tglPendirianMatch[1].trim();
        }
        
        // No. Pengesahan PN LN
        const noPengesahanMatch = text.match(/No\. Pengesahan PN LN\s*:\s*(.+)/);
        if (noPengesahanMatch && noPengesahanMatch[1]) {
          yayasanData.no_pengesahan_pn_ln = noPengesahanMatch[1].trim();
        }
        
        // No. SK Pengesahan Badan Hukum Menkumham
        const noSkMatch = text.match(/No\. SK Pengesahan Badan Hukum Menkumham\s*:\s*(.+)/);
        if (noSkMatch && noSkMatch[1]) {
          yayasanData.no_sk_pengesahan = noSkMatch[1].trim();
        }
        
        // Tgl SK Pengesahan Badan Hukum Menkumham
        const tglSkMatch = text.match(/Tgl SK Pengesahan Badan Hukum Menkumham\s*:\s*(.+)/);
        if (tglSkMatch && tglSkMatch[1]) {
          yayasanData.tgl_sk_pengesahan = tglSkMatch[1].trim();
        }
      });

      // Ekstrak foto yayasan
      const fotoYayasan = $('.carousel-inner img').first().attr('src');
      if (fotoYayasan) {
        yayasanData.foto_yayasan = fotoYayasan.startsWith('http') ? fotoYayasan : `https://vervalyayasan.data.kemdikbud.go.id${fotoYayasan}`;
      }

      // Ekstrak koordinat dari script peta
      const mapScript = $('script').filter((i, el) => $(el).text().includes('L.map')).html();
      if (mapScript) {
        const latMatch = mapScript.match(/setView\(\[([^,]+)/);
        const lngMatch = mapScript.match(/setView\(\[[^,]+,\s*([^,\]]+)/);
        
        if (latMatch && latMatch[1]) {
          yayasanData.lintang = latMatch[1].trim();
        }
        if (lngMatch && lngMatch[1]) {
          yayasanData.bujur = lngMatch[1].trim();
        }
      }

      // Ekstrak sekolah naungan
      const sekolahNaungan = [];
      $('#tabelsekolah tbody tr').each((index, element) => {
        const columns = $(element).find('td');
        if (columns.length >= 6) {
          const npsnLink = $(columns[0]).find('a');
          const npsnText = $(columns[0]).text().trim();
          const npsnMatch = npsnText.match(/\d+/);
          
          sekolahNaungan.push({
            npsn: npsnMatch ? npsnMatch[0] : '',
            nama_sekolah: $(columns[1]).text().trim(),
            jenjang: $(columns[2]).text().trim(),
            kecamatan: $(columns[3]).text().trim(),
            kabupaten: $(columns[4]).text().trim(),
            provinsi: $(columns[5]).text().trim(),
            link_sekolah: npsnLink.attr('href')
          });
        }
      });
      
      if (sekolahNaungan.length > 0) {
        yayasanData.sekolah_naungan = sekolahNaungan;
      }

      return yayasanData;
    } catch (error) {
      console.error('Error detail:', error);
      throw new Error(`Gagal mengambil data yayasan: ${error.message}`);
    }
  }
}

module.exports = DapodikService;