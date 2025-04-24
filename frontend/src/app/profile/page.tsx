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
  role: string; // role là chuỗi
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
      // Gửi request đến backend để cập nhật thông tin
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
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Cập nhật localStorage
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
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Hồ sơ cá nhân</h1>

        {user ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 font-semibold">Tên người dùng:</label>
                  <p className="text-gray-800">{user.userName}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Họ:</label>
                  <p className="text-gray-800">{user.firstName}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Tên:</label>
                  <p className="text-gray-800">{user.lastName}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Vai trò:</label>
                  <p className="text-gray-800">{user.role}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Ngày tạo:</label>
                  <p className="text-gray-800">{user.createdAt}</p>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-600 font-semibold">Tên người dùng:</label>
                  <p className="text-gray-800">{user.userName}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Họ:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Tên:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Vai trò:</label>
                  <p className="text-gray-800">{user.role}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Ngày tạo:</label>
                  <p className="text-gray-800">{user.createdAt}</p>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <p className="text-gray-600">Đang tải thông tin...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}