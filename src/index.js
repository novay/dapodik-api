require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paudRoutes = require('./routes/paudRoutes');
const dikdasRoutes = require('./routes/dikdasRoutes');
const dikmenRoutes = require('./routes/dikmenRoutes');
const diktiRoutes = require('./routes/diktiRoutes');
const dikmasRoutes = require('./routes/dikmasRoutes');
const yayasanRoutes = require('./routes/yayasanRoutes');
const programRoutes = require('./routes/programRoutes');
const sekolahRoutes = require('./routes/sekolahRoutes');

// Validasi environment variable
if (!process.env.BASE_URL) {
  console.error('ERROR: BASE_URL environment variable is required');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Definisikan semua endpoint yang tersedia
const endpoints = [
  {
    name: "Sekolah (Detail)",
    path: "/api/sekolah/:npsn",
    description: "Menampilkan detail sekolah berdasarkan NPSN."
  }, 
  {
    name: "Yayasan (Detail)",
    path: "/api/yayasan-detail/:id_yayasan",
    description: "Menampilkan detail yayasan berdasarkan ID Yayasan."
  }, 
  {
    name: "PAUD (Pendidikan Anak Usia Dini)",
    path: "/api/paud",
    description: "Mendapatkan data semua provinsi PAUD"
  }, 
  {
    name: "Dikdas (Pendidikan Dasar)",
    path: "/api/dikdas",
    description: "Mendapatkan data semua provinsi Dikdas"
  }, 
  {
    name: "Dikmen (Pendidikan Menengah)",
    path: "/api/dikmen",
    description: "Mendapatkan data semua provinsi Dikmen"
  },
  {
    name: "Dikti (Pendidikan Tinggi)",
    path: "/api/dikti",
    description: "Mendapatkan data semua provinsi Dikti"
  }, 
  {
    name: "Dikmas (Pendidikan Masyarakat)",
    path: "/api/dikmas",
    description: "Mendapatkan data semua provinsi Dikmas"
  },
  {
    name: "Yayasan (Yayasan Pendidikan)",
    path: "/api/yayasan",
    description: "Mendapatkan data semua provinsi Yayasan"
  },
  // {
  //   name: "Program Layanan",
  //   path: "/api/program",
  //   description: "Mendapatkan data semua program layanan", 
  //   submenu: [
  //     {
  //       name: "PAUD (Pendidikan Anak Usia Dini)", 
  //       path: "/api/program/paud", 
  //       description: "Mendapatkan data provinsi untuk program PAUD"
  //     }, 
  //     {
  //       name: "Kesetaraan", 
  //       path: "/api/program/kesetaraan", 
  //       description: "Mendapatkan data provinsi untuk program Kesetaraan"
  //     }, 
  //     {
  //       name: "Keterampilan Kerja", 
  //       path: "/api/program/terampil", 
  //       description: "Mendapatkan data provinsi untuk program Keterampilan Kerja"
  //     }, 
  //     {
  //       name: "SLB (Sekolah Luar Biasa)", 
  //       path: "/api/program/slb", 
  //       description: "Mendapatkan data provinsi untuk program SLB"
  //     }, 
  //   ]
  // }, 
];

// Routes
app.use('/api', paudRoutes);
app.use('/api', dikdasRoutes);
app.use('/api', dikmenRoutes);
app.use('/api', diktiRoutes);
app.use('/api', dikmasRoutes);
app.use('/api', yayasanRoutes);
app.use('/api', programRoutes);
app.use('/api', sekolahRoutes);

// Health check dengan daftar endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Dapodik API is running!',
    version: '1.0.0',
    author: 'Novianto Rahmadi',
    email: 'novay@btekno.id',
    documentation: "https://github.com/novay/dapodik-api#readme", 
    endpoints: endpoints
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Using base URL: ${process.env.BASE_URL}`);
});