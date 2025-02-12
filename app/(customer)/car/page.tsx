"use client"

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCars } from '@/features/product/hooks/useProducts';
import { ProductQueryParams } from '@/features/product/types/product';

export default function CarListing() {
  // State cho các tham số
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [year, setYear] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [sort, setSort] = useState('');

  // Tạo object params từ state
  const params : ProductQueryParams = {
    q: brand,
    limit: 9,
    skip: (1 - 1) * 9,
    sortBy: sort,
    order: 'asc'
  };

  // Sử dụng hook useCars với params
  const { products: cars, isLoading, isError } = useCars(params);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Cars</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Bộ lọc</h2>
          <div className="space-y-4">
            {/* Brand Filter */}
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Thương hiệu
              </label>
              <Select onValueChange={(value) => setBrand(value)}>
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Chọn thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Giá
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  id="price-min"
                  placeholder="Min"
                  className="w-1/2"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
                <span>-</span>
                <Input
                  type="number"
                  id="price-max"
                  placeholder="Max"
                  className="w-1/2"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
            </div>

            {/* Year Filter */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Năm sản xuất
              </label>
              <Select onValueChange={(value) => setYear(value)}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Chọn năm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fuel Type Filter */}
            <div>
              <label htmlFor="fuel" className="block text-sm font-medium text-gray-700 mb-1">
                Loại xe
              </label>
              <Select onValueChange={(value) => setFuelType(value)}>
                <SelectTrigger id="fuel">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Hiển thị 1-{cars.length} trong {cars.length} kết quả</p>
            <Select onValueChange={(value) => setSort(value)}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Giá: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hiển thị danh sách xe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <Image
                  src={car.thumbnail || `/placeholder.svg?height=200&width=300`}
                  alt={car.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
                  <p className="text-gray-600 mb-4">${car.price}</p>
                  <Link href={`/cars/${car.id}`}>
                    <Button variant="outline" className="w-full">
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mr-2">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button variant="outline">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}