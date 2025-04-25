import React from 'react'
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function News() {
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <NavBar />

      {/* Banner */}
      <div className="relative bg-cover bg-center h-[400px] w-full" style={{ backgroundImage: "url('/images/news-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">Tin tức mới nhất</h1>
        </div>
      </div>

      {/* Menu lọc (tuỳ chọn) */}
      <div className="flex justify-center gap-4 mt-8 mb-4">
        <button className="px-4 py-2 bg-white shadow rounded hover:bg-blue-100">Tất cả</button>
        <button className="px-4 py-2 bg-white shadow rounded hover:bg-blue-100">Giải đua</button>
        <button className="px-4 py-2 bg-white shadow rounded hover:bg-blue-100">Xe & Công nghệ</button>
        <button className="px-4 py-2 bg-white shadow rounded hover:bg-blue-100">Hậu trường</button>
      </div>

      {/* Danh sách bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-10">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <img
              src={`/images/news${item}.jpg`}
              alt={`News ${item}`}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-xl text-gray-800 mb-2">Tiêu đề tin tức {item}</h2>
              <p className="text-gray-600 text-sm mb-3">
                Đây là nội dung tóm tắt cho bài viết số {item}. Nội dung có thể được cập nhật tùy ý.
              </p>
              <a href="#" className="text-blue-600 hover:underline text-sm">Đọc thêm →</a>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}
