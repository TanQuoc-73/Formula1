import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormData, AuthBody, User } from '@/types/auth';

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isLogin) {
        // Với đăng nhập, chỉ cần kiểm tra email và password
        if (!formData.email.trim() || !formData.password.trim()) {
            setError('Email and Password are required');
            setLoading(false);
            return;
        }
    } else {
        // Với đăng ký, yêu cầu tất cả các trường
        if (
          !formData.userName.trim() ||
          !formData.password.trim() ||
          !formData.firstName.trim() ||
          !formData.lastName.trim()
        ) {
            setError('All fields are required');
            setLoading(false);
            return;
        }
    }

    try {
      const url = isLogin
        ? 'http://localhost:8080/api/auth/login'
        : 'http://localhost:8080/api/auth/register';
      const body: AuthBody = isLogin
        ? { userName: formData.email, password: formData.password }
        : {
            userName: formData.userName || formData.email, 
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
          };

      console.log('Sending body:', body); // Debug
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data: User = await response.json();
      if (isLogin) {
        localStorage.setItem('user', JSON.stringify(data));
        switch (data.role) {
          case 'Admin':
            router.push('/admin');
            break;
          case 'QuanLy':
            router.push('/manager');
            break;
          case 'ThanhVien':
            router.push('/');
            break;
          default:
            router.push('/');
        }
      } else {
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { isLogin, setIsLogin, formData, handleInputChange, handleSubmit, error, loading };
};