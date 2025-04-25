"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Định nghĩa interface cho User
interface User {
  userId: number;
  userName: string;
  passWord: string;
  firstName: string;
  lastName: string;
  role: string; 
  createdAt: string;
  email?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();

  // Kiểm tra đăng nhập và lấy thông tin user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/signin');
      return;
    }

    let parsedUser: User;
    try {
      parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
        email: parsedUser.email || '',
      });
    } catch (err) {
      console.error('Lỗi khi parse user từ localStorage:', err);
      router.push('/signin');
      return;
    }
  }, [router]);

  // Xử lý thay đổi input trong form chỉnh sửa
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý submit form chỉnh sửa
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          userName: user.userName,
          passWord: user.passWord,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: user.role,
          createdAt: user.createdAt,
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể cập nhật thông tin');
      }

      const updatedUser: User = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
      setSuccess('Cập nhật thông tin thành công!');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
      setSuccess('');
    }
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/signin');
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <NavBar />
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Hồ sơ cá nhân</h1>

        {user ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Thông báo lỗi hoặc thành công */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg">
                <p>{success}</p>
              </div>
            )}

            {/* Avatar và tên người dùng */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-bold border-4 border-gray-300">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">{user.role}</p>
            </div>

            {/* Thông tin người dùng */}
            {!isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tên người dùng</label>
                    <p className="mt-1 text-lg text-gray-800">{user.userName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Họ</label>
                    <p className="mt-1 text-lg text-gray-800">{user.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tên</label>
                    <p className="mt-1 text-lg text-gray-800">{user.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Vai trò</label>
                    <p className="mt-1 text-lg text-gray-800">{user.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ngày tạo</label>
                    <p className="mt-1 text-lg text-gray-800">{user.createdAt}</p>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tên người dùng</label>
                    <p className="mt-1 text-lg text-gray-800">{user.userName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Họ</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tên</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Vai trò</label>
                    <p className="mt-1 text-lg text-gray-800">{user.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ngày tạo</label>
                    <p className="mt-1 text-lg text-gray-800">{user.createdAt}</p>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-600 animate-pulse">Đang tải thông tin...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}