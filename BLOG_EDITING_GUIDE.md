# Panduan Mengubah Konten Blog GoTani

## Cara Mengubah Artikel di Blog

Semua data artikel blog disimpan dalam file **`app/blog/blog-data.json`**. Anda bisa mengedit file ini untuk menambah, mengubah, atau menghapus artikel.

### Struktur File

File `blog-data.json` memiliki struktur seperti ini:

\`\`\`json
{
  "featured": { ... },  // Artikel unggulan yang ditampilkan besar di halaman blog
  "posts": [ ... ]      // Daftar semua artikel lainnya
}
\`\`\`

---

## 1. Mengubah Artikel Unggulan (Featured Post)

Artikel unggulan adalah artikel yang ditampilkan besar di bagian atas halaman blog.

### Contoh Format:

\`\`\`json
"featured": {
  "id": 1,
  "title": "Judul Artikel Anda",
  "excerpt": "Ringkasan singkat artikel (1-2 kalimat)",
  "date": "2025-01-15",
  "author": "Nama Penulis",
  "category": "Kategori (mis: Tips & Panduan)",
  "readTime": "8 menit",
  "image": "/path-ke-gambar.jpg"
}
\`\`\`

### Cara Mengedit:
1. Buka file `app/blog/blog-data.json`
2. Ubah nilai `featured` sesuai keinginan
3. Pastikan gambar ada di folder `public/` dan path benar

---

## 2. Menambah/Mengubah Artikel Biasa

Semua artikel ditampilkan dalam grid di bawah artikel unggulan.

### Contoh Format:

\`\`\`json
{
  "id": 2,
  "title": "Judul Artikel",
  "excerpt": "Ringkasan singkat artikel",
  "date": "2025-01-10",
  "author": "Nama Penulis",
  "category": "Tips & Panduan",
  "readTime": "10 menit",
  "image": "/nama-gambar.jpg"
}
\`\`\`

### Cara Menambah Artikel Baru:
1. Buka `app/blog/blog-data.json`
2. Temukan array `posts`
3. Tambahkan object baru di akhir array (sebelum `]` terakhir)
4. Perhatikan tanda koma di antara artikel

### Contoh Penambahan:

\`\`\`json
"posts": [
  { ... artikel 1 ... },
  { ... artikel 2 ... },
  {
    "id": 10,
    "title": "Artikel Baru Saya",
    "excerpt": "Ini adalah artikel baru",
    "date": "2025-01-20",
    "author": "Nama Anda",
    "category": "Teknologi",
    "readTime": "5 menit",
    "image": "/artikel-baru.jpg"
  }  // Pastikan tidak ada koma di elemen terakhir
]
\`\`\`

---

## 3. Kategori yang Tersedia

Gunakan salah satu dari kategori berikut:
- Tips & Panduan
- Analisis Pasar
- Kisah Sukses
- Sustainability
- Teknologi
- Bisnis
- (Atau buat kategori baru sendiri)

---

## 4. Format Tanggal

Gunakan format: `YYYY-MM-DD` (contoh: `2025-01-15`)

---

## 5. Gambar untuk Artikel

1. Simpan gambar di folder `public/`
2. Referensi dengan path: `/nama-gambar.jpg` atau `/folder/nama-gambar.jpg`
3. Ukuran rekomendasi: 800x600px atau lebih besar

---

## 6. Cara Membuat Artikel Muncul di Halaman Detail

Untuk membuat halaman detail artikel (ketika diklik), artikel perlu ditampilkan di file `app/blog/[id]/page.tsx`.

Konten lengkap artikel disimpan langsung di file tersebut dalam variable `post.content` menggunakan format HTML.

### Jika ingin menambah halaman artikel baru:
1. Pastikan artikel sudah ditambah di `blog-data.json` (langkah 2 di atas)
2. Edit file `app/blog/[id]/page.tsx`
3. Ubah judul, excerpt, author, dan konten sesuai kebutuhan

---

## 7. Contoh Lengkap Perubahan

### Sebelum:
\`\`\`json
{
  "id": 2,
  "title": "Lama: Tren Harga Q1 2025",
  "excerpt": "Analisis harga",
  "date": "2025-01-10",
  "author": "Riset GoTani",
  "category": "Analisis Pasar",
  "readTime": "10 menit",
  "image": "/market-analysis-board.png"
}
\`\`\`

### Sesudah:
\`\`\`json
{
  "id": 2,
  "title": "Tren Harga Sayuran Musim Hujan 2025",
  "excerpt": "Analisis mendalam tentang perubahan harga sayuran selama musim hujan dan strategi petani untuk tetap menguntungkan",
  "date": "2025-01-20",
  "author": "Dr. Budi Santoso",
  "category": "Tips & Panduan",
  "readTime": "12 menit",
  "image": "/sayuran-musim-hujan.jpg"
}
\`\`\`

---

## 8. Tips

- **Selalu gunakan tanda koma** di antara object dalam array
- **Jangan gunakan tanda koma** pada object terakhir dalam array
- **Hindari karakter khusus** di dalam title/excerpt (gunakan apostrof `'` bukan kutip `"`)
- **Pastikan ID unik** - setiap artikel harus punya ID berbeda
- **Gunakan format valid JSON** - cek di https://jsonlint.com/ jika ada error

---

## Pertanyaan?

Hubungi tim GoTani untuk bantuan lebih lanjut!
