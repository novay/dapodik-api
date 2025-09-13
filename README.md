# Dapodik Unofficial API

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/novay/dapodik-api.svg)](https://github.com/novay/dapodik-api/graphs/contributors)

API tidak resmi untuk mengakses data referensi pendidikan dari Dapodik Kemendikdasmen. Dibuat dengan ❤️ menggunakan Node.js dan Express.js.

## 🚀 Fitur

- 📊 Data lengkap untuk semua jenjang pendidikan (PAUD, Dikdas, Dikmen, Dikti, Dikmas)
- 🏢 Data Yayasan Pendidikan
- 🎯 Program Layanan Khusus (Kesetaraan, Keterampilan Kerja, SLB)
- 🗺️ Navigasi hierarkis: Provinsi → Kabupaten/Kota → Kecamatan → Sekolah/Yayasan
- 🔍 Detail lengkap sekolah dan yayasan
- 📍 Informasi koordinat lokasi
- 📱 Response JSON yang bersih dan konsisten
- 🔗 Path langsung untuk navigasi antar level

## 📦 Instalasi

### Prasyarat

- Node.js >= 20.x
- npm atau yarn

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/novay/dapodik-api.git
   cd dapodik-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi environment**
   ```bash
   cp .env.example .env
   ```
   Kemudian edit file `.env` sesuai kebutuhan:
   ```env
   PORT=3000
   BASE_URL=https://referensi.data.kemendikdasmen.go.id/pendidikan/
   ```

4. **Jalankan server**
   ```bash
   # Mode development
   npm run dev
   
   # Mode production
   npm start
   ```

Server akan berjalan di `http://localhost:3000`

## 📖 Cara Penggunaan

### Melihat semua endpoint yang tersedia

```bash
curl http://localhost:3000/
```

### Contoh penggunaan endpoint

#### 1. Mendapatkan data provinsi PAUD

```bash
curl http://localhost:3000/api/paud
```

Response:
```json
{
  "success": true,
  "message": "Data provinsi PAUD berhasil diambil",
  "count": 38,
  "data": [
    {
      "no": 1,
      "nama_provinsi": "D.K.I. Jakarta",
      "kode_provinsi": "010000",
      "tk_sederajat": "2919",
      "kb_sederajat": "589",
      "tpa": "52",
      "sps": "1744",
      "total": "5304",
      "path": "/api/paud/010000"
    }
  ]
}
```

#### 2. Mendapatkan data kabupaten/kota

```bash
curl http://localhost:3000/api/paud/010000
```

#### 3. Mendapatkan data kecamatan

```bash
curl http://localhost:3000/api/paud/010000/010100
```

#### 4. Mendapatkan data sekolah

```bash
curl http://localhost:3000/api/paud/010000/010100/010101
```

#### 5. Mendapatkan detail sekolah

```bash
curl http://localhost:3000/api/sekolah/69768533
```

#### 6. Mendapatkan data yayasan

```bash
curl http://localhost:3000/api/yayasan
```

#### 7. Mendapatkan detail yayasan berdasarkan ID

```bash
curl http://localhost:3000/api/yayasan/id/2C969E7D-95BB-4019-A01E-B3F7ABC0A385
```

## 📋 Daftar Endpoint

### Endpoint Utama

| Endpoint | Deskripsi |
|----------|-----------|
| `GET /` | Informasi API dan daftar endpoint |
| `GET /api/sekolah/:npsn` | Detail data sekolah berdasarkan NPSN |
| `GET /api/yayasan-detail/:id_yayasan` | Detail data yayasan berdasarkan ID Yayasan |

### Data Pendidikan

| Jenjang | Endpoint Provinsi | Endpoint Kabupaten | Endpoint Kecamatan | Endpoint Sekolah |
|---------|------------------|-------------------|-------------------|------------------|
| **PAUD** | `GET /api/paud` | `GET /api/paud/:kode_provinsi` | `GET /api/paud/:kode_provinsi/:kode_kabupaten` | `GET /api/paud/:kode_provinsi/:kode_kabupaten/:kode_kecamatan` |
| **Dikdas** | `GET /api/dikdas` | `GET /api/dikdas/:kode_provinsi` | `GET /api/dikdas/:kode_provinsi/:kode_kabupaten` | `GET /api/dikdas/:kode_provinsi/:kode_kabupaten/:kode_kecamatan` |
| **Dikmen** | `GET /api/dikmen` | `GET /api/dikmen/:kode_provinsi` | `GET /api/dikmen/:kode_provinsi/:kode_kabupaten` | `GET /api/dikmen/:kode_provinsi/:kode_kabupaten/:kode_kecamatan` |
| **Dikti** | `GET /api/dikti` | `GET /api/dikti/:kode_provinsi` | `GET /api/dikti/:kode_provinsi/:kode_kabupaten` | `GET /api/dikti/:kode_provinsi/:kode_kabupaten/:kode_kecamatan` |
| **Dikmas** | `GET /api/dikmas` | `GET /api/dikmas/:kode_provinsi` | `GET /api/dikmas/:kode_provinsi/:kode_kabupaten` | `GET /api/dikmas/:kode_provinsi/:kode_kabupaten/:kode_kecamatan` |

### Yayasan Pendidikan

| Endpoint | Deskripsi |
|----------|-----------|
| `GET /api/yayasan` | Data provinsi yayasan |
| `GET /api/yayasan/:kode_provinsi` | Data kabupaten yayasan |
| `GET /api/yayasan/:kode_provinsi/:kode_kabupaten` | Data kecamatan yayasan |
| `GET /api/yayasan/:kode_provinsi/:kode_kabupaten/:kode_kecamatan` | Data yayasan per kecamatan |
| `GET /api/yayasan-detail/:id_yayasan` | Detail yayasan berdasarkan ID Yayasan |

### Program Layanan (On Progress)

| Program | Endpoint |
|---------|----------|
| **PAUD** | `GET /api/program/paud` |
| **Kesetaraan** | `GET /api/program/kesetaraan` |
| **Keterampilan Kerja** | `GET /api/program/terampil` |
| **SLB** | `GET /api/program/slb` |

## 🔧 Struktur Data per Jenjang

### PAUD

- `tk_sederajat`: Jumlah TK sederajat
- `kb_sederajat`: Jumlah KB sederajat
- `tpa`: Jumlah TPA
- `sps`: Jumlah SPS
- `total`: Total keseluruhan

### Dikdas

- `sd_sederajat`: Jumlah SD sederajat
- `smp_sederajat`: Jumlah SMP sederajat
- `total`: Total keseluruhan

### Dikmen

- `sma_sederajat`: Jumlah SMA sederajat
- `smk_sederajat`: Jumlah SMK sederajat
- `slb`: Jumlah SLB
- `total`: Total keseluruhan

### Dikti

- `akademi`: Jumlah Akademi
- `politeknik`: Jumlah Politeknik
- `sekolah_tinggi`: Jumlah Sekolah Tinggi
- `institut`: Jumlah Institut
- `universitas`: Jumlah Universitas
- `total`: Total keseluruhan

### Dikmas

- `kursus`: Jumlah Lembaga Kursus
- `tbm`: Jumlah TBM
- `pkbm`: Jumlah PKBM
- `skb`: Jumlah SKB
- `ponpes`: Jumlah Ponpes
- `total`: Total keseluruhan

### Yayasan

- `npyp`: Nomor Pokok Yayasan Pendidikan
- `id_yayasan`: ID unik yayasan (UUID)
- `nama_yayasan`: Nama yayasan
- `alamat`: Alamat yayasan
- `kelurahan`: Kelurahan/desa
- `kecamatan`: Kecamatan
- `kabupaten`: Kabupaten/kota
- `provinsi`: Provinsi

### Detail Sekolah

Endpoint ini mengembalikan informasi lengkap tentang sekolah, meliputi:

- `npsn`: Nomor Pokok Sekolah Nasional
- `nama_sekolah`: Nama sekolah
- `nama`: Nama sekolah (alternatif)
- `alamat`: Alamat sekolah
- `desa_kelurahan`: Desa/kelurahan
- `kecamatan`: Kecamatan
- `kabupaten`: Kabupaten/kota
- `provinsi`: Provinsi
- `status`: Status sekolah (Negeri/Swasta)
- `bentuk_pendidikan`: Bentuk pendidikan
- `jenjang_pendidikan`: Jenjang pendidikan
- `kementerian_pembina`: Kementerian pembina
- `naungan`: Naungan
- `npyp`: NPYP (jika ada)
- `no_sk_pendirian`: Nomor SK pendirian
- `tanggal_sk_pendirian`: Tanggal SK pendirian
- `no_sk_operasional`: Nomor SK operasional
- `tanggal_sk_operasional`: Tanggal SK operasional
- `akreditasi`: Nilai akreditasi
- `link_akreditasi`: Link ke halaman akreditasi
- `luas_tanah`: Luas tanah
- `akses_internet`: Informasi akses internet
- `sumber_listrik`: Sumber listrik
- `fax`: Nomor fax
- `telepon`: Nomor telepon
- `email`: Alamat email
- `website`: Alamat website
- `operator`: Nama operator
- `lintang`: Koordinat lintang
- `bujur`: Koordinat bujur

### Detail Yayasan

Endpoint ini mengembalikan informasi lengkap tentang yayasan, meliputi:

- `id_yayasan`: ID unik yayasan (UUID)
- `link_profil`: Link ke profil yayasan
- `npyp`: Nomor Pokok Yayasan Pendidikan
- `nama_yayasan`: Nama yayasan
- `alamat`: Alamat yayasan
- `kelurahan`: Kelurahan/desa
- `kecamatan`: Kecamatan
- `kabupaten`: Kabupaten/kota
- `provinsi`: Provinsi
- `pimpinan_yayasan`: Nama pimpinan yayasan
- `operator_yayasan`: Nama operator yayasan
- `link_operator`: Link ke profil operator
- `telepon`: Nomor telepon
- `fax`: Nomor fax
- `email`: Alamat email
- `kode_pos`: Kode pos
- `no_pendirian`: Nomor pendirian yayasan
- `tgl_pendirian`: Tanggal pendirian yayasan
- `no_pengesahan_pn_ln`: Nomor pengesahan PN LN
- `no_sk_pengesahan`: Nomor SK pengesahan badan hukum Menkumham
- `tgl_sk_pengesahan`: Tanggal SK pengesahan badan hukum Menkumham
- `foto_yayasan`: URL foto yayasan
- `lintang`: Koordinat lintang
- `bujur`: Koordinat bujur
- `sekolah_naungan`: Daftar sekolah yang berada di bawah naungan yayasan

## 📝 Catatan Penting

1. **API Tidak Resmi**: API ini dibuat untuk tujuan pembelajaran dan pengembangan. Harap gunakan dengan bijak dan tidak untuk tujuan komersial tanpa izin.
2. **Rate Limiting**: Tidak ada rate limiting yang diterapkan, namun harap gunakan API dengan wajar agar tidak membebani server sumber.
3. **Data Berubah**: Data dari Dapodik dapat berubah sewaktu-waktu. API ini akan mencoba mengikuti perubahan tersebut, namun mungkin ada delay.
4. **Error Handling**: Jika Anda menemukan error atau data yang tidak akurat, silakan buka issue di GitHub.
5. **Path Navigasi**: Setiap respons menyertakan field `path` yang dapat digunakan untuk navigasi ke level berikutnya.

## 📄 Lisensi

Project ini dilisensikan under MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Terima Kasih

- Terima kasih kepada Kemendikdasmen atas data referensi pendidikan yang disediakan.

## 📞 Kontak

Jika Anda memiliki pertanyaan atau masukan, silakan:

- Buat issue di [GitHub Issues](https://github.com/novay/dapodik-api/issues)
- Email: [novay@btekno.id](mailto:novay@btekno.id)

---

**Dibuat dengan ❤️ oleh [Novianto Rahmadi](https://github.com/novay)**