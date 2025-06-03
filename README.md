# Traffic Analysis Dashboard

Aplikasi dashboard untuk analisis data lalu lintas berdasarkan data dari API.

## Fitur
- Menampilkan tabel data lalu lintas dengan highlight pada nilai Saturation (vehicle/hour) tertinggi.
- Visualisasi data Saturation per arm dan waktu menggunakan chart.
- Responsive dan menggunakan Tailwind CSS.

## Cara Menjalankan

1. Install dependencies:
   ```
   npm install
   ```
2. Jalankan aplikasi:
   ```
   npm run dev
   ```
3. Buka di browser: [http://localhost:3000](http://localhost:3000)

## Struktur Data API

Contoh data yang digunakan:
```json
{
  "waktu_puncak": "Day (12.00-13.00)",
  "arm": "east",
  "Saturation (vehicle/hour)": "1660",
  "Flow Ratio": "0.277",
  "Cycle time(s)": 120,
  "Green Time(s)": 25,
  "Capacity (vehicle/hour)": 750
}
```

## Teknologi
- Next.js / React
- Tailwind CSS
- Chart.js

---