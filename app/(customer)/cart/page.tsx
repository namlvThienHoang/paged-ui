// src/app/carts/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/api/client';
import { useAuth } from '@/features/user/hooks/useAuth';

interface Cart {
  id: number;
  // Các thuộc tính khác của Cart nếu có
}

const CartsPage = () => {
  const { user } = useAuth();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    console.log(user)

    const fetchCarts = async () => {
      setLoading(true);
      setError('');
      try {
        // Ví dụ: API lấy danh sách carts của user theo user id
        const response = await apiClient.get(`/users/${user.id}/carts`);
        // Giả sử API trả về: { carts: [...] }
        setCarts(response.data.carts);
      } catch (err) {
        console.error(err);
        setError('Lấy danh sách carts thất bại.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, [user]);

  if (!user) return <div>Đang tải thông tin người dùng...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Danh sách Carts của {user.firstName}</h1>
      {loading && <p>Đang tải carts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {carts.map((cart) => (
          <li key={cart.id}>Cart #{cart.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default CartsPage;
