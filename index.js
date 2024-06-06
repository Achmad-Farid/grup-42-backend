const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const deleteExpireWebinar = require("./middleware/deleteExpire");

const app = express();

const PORT = process.env.PORT || 3000;

const db = require("./config/db");
const allRoutes = require("./routers/inRoute");

db.then(() => {
  console.log("Berhasil Connect Ke MongoDB");
}).catch(() => {
  console.log("gagal konek ke mongoDB");
});

// Menyajikan folder 'uploads' secara statis
app.use("/uploads", express.static("uploads"));

// const corsOptions = {
//   origin: "http://app.example.com", // Mengizinkan hanya dari domain ini
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // batasi setiap IP hingga 100 permintaan per windowMs
  message: "Terlalu banyak permintaan dari IP ini, coba lagi nanti.",
});

app.use(cors());
app.use(limiter); // Terapkan rate limiter untuk semua rute
app.use(helmet());
app.use(express.json());
//diambil dari index.js
app.use(allRoutes);

// hapus webinar yang tanggalnya sudah lewat
deleteExpireWebinar();

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
