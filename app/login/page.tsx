// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/features/user/hooks/useAuth';
import { setCookie } from '@/lib/api/cookie';

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
        expiresInMins: 30,
      });
      const data = response.data;

      // Lưu token vào cookie để middleware có thể đọc (lưu 1 ngày với accessToken, 7 ngày với refreshToken)
      setCookie('accessToken', data.accessToken, 1);
      setCookie('refreshToken', data.refreshToken, 7);

      // Lưu thông tin người dùng vào localStorage để sử dụng trong Auth Context
      localStorage.setItem('user', JSON.stringify(data));

      // Cập nhật Auth Context
      setUser(data);

      // Chuyển hướng về trang chính (hoặc dashboard)
      router.push('/');
    } catch (err: any) {
      console.error('Lỗi đăng nhập:', err);
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h1>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <Label htmlFor="username" className="block mb-2 text-gray-700">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Nhập username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password" className="block mb-2 text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Nhập password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
