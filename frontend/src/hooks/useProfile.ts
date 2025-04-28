"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/User';

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/signin');
      return;
    }

    let parsedUser: User;
    try {
      parsedUser = JSON.parse(storedUser);
      // Kiểm tra và sửa createdAt nếu không hợp lệ
      const createdAtDate = new Date(parsedUser.createdAt);
      if (isNaN(createdAtDate.getTime())) {
        console.warn('Invalid createdAt in localStorage, setting to current time:', parsedUser.createdAt);
        parsedUser.createdAt = new Date().toISOString();
      }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Kiểm tra và định dạng createdAt
      let formattedCreatedAt: string;
      const createdAtDate = new Date(user.createdAt);
      if (isNaN(createdAtDate.getTime())) {
        console.warn('Invalid createdAt value, using current time as fallback:', user.createdAt);
        formattedCreatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
      } else {
        formattedCreatedAt = createdAtDate.toISOString().replace('T', ' ').substring(0, 19);
      }

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
          createdAt: formattedCreatedAt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Không thể cập nhật thông tin');
      }

      const updatedUser: User = await response.json();
      // Kiểm tra và định dạng createdAt từ phản hồi
      const updatedCreatedAt = new Date(updatedUser.createdAt);
      if (isNaN(updatedCreatedAt.getTime())) {
        console.warn('Invalid createdAt in response, using current time as fallback:', updatedUser.createdAt);
        updatedUser.createdAt = new Date().toISOString();
      } else {
        updatedUser.createdAt = updatedCreatedAt.toISOString();
      }

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/signin');
  };

  return {
    user,
    isEditing,
    formData,
    error,
    success,
    setIsEditing,
    handleInputChange,
    handleSubmit,
    handleLogout,
  };
};