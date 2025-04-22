"use client";

import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isLogin
        ? 'http://localhost:8080/api/auth/login'
        : 'http://localhost:8080/api/auth/register';
      const body = isLogin
        ? { userName: formData.email, password: formData.password }
        : {
            userName: formData.email,
            passWord: formData.password,
            firstName: formData.name.split(' ').slice(0, -1).join(' ') || formData.name,
            lastName: formData.name.split(' ').slice(-1)[0] || ''
          };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        localStorage.setItem('user', JSON.stringify(data));
        // Chuyển hướng dựa trên role
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
        setIsLogin(true); // Chuyển sang tab Login sau đăng ký
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 py-12 mt-20">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                isLogin
                  ? 'text-red-950 border-b-2 border-red-950'
                  : 'text-gray-500 hover:text-red-950'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                !isLogin
                  ? 'text-red-950 border-b-2 border-red-950'
                  : 'text-gray-500 hover:text-red-950'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-950"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-950"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-950"
                placeholder={isLogin ? 'Enter your password' : 'Create a password'}
              />
            </div>
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-red-950 focus:ring-red-950 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-red-950 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-950 text-white py-2 rounded-md hover:bg-red-800 transition-colors duration-300 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Or continue with</p>
            <div className="flex justify-center gap-4 mt-4">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463 0.099 2.795 0.143v3.24l-1.918 0.001c-1.504 0-1.795 0.715-1.795 1.763v2.313h3.587l-0.467 3.622h-3.12V24h6.116c0.732 0 1.323-0.593 1.323-1.325V1.325C24 0.593 23.407 0 22.675 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}