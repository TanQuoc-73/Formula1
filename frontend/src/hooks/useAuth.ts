import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormData, AuthBody, User } from '@/types/auth';

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
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

    try {
      const url = isLogin
        ? 'http://localhost:8080/api/auth/login'
        : 'http://localhost:8080/api/auth/register';
      const body: AuthBody = isLogin
        ? { userName: formData.email, password: formData.password }
        : {
            userName: formData.email,
            password: formData.password,
            firstName: formData.name.split(' ').slice(0, -1).join(' ') || formData.name,
            lastName: formData.name.split(' ').slice(-1)[0] || '',
          };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data: User = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

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