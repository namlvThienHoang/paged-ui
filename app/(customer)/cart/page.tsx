// src/app/carts/page.tsx
'use client';
import Image from "next/image"
import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/api/client';
import { useAuth } from '@/features/user/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface Cart {
  id: number;
  // Các thuộc tính khác của Cart nếu có
}

const CartsPage = () => {
  const { context } = useAuth();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!context) return;

    console.log(context)

    const fetchCarts = async () => {
      setLoading(true);
      setError('');
      try {
        // Ví dụ: API lấy danh sách carts của user theo user id
        const response = await apiClient.get(`/users/${context.user?.id}/carts`);
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
  }, [context]);

  if (!context) return <div>Đang tải thông tin người dùng...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        {[1, 2].map((item) => (
          <div key={item} className="flex items-center space-x-4 border-b border-gray-200 py-4">
            <Image
              src={`/placeholder.svg?height=100&width=100`}
              alt="Car thumbnail"
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Car Model {item}</h3>
              <p className="text-gray-600">$25,000</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold">1</span>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$50,000</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$5,000</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$55,000</span>
            </div>
          </div>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CartsPage;
