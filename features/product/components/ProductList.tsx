import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useProducts } from "../hooks/useProducts";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Product } from "@/features/product/types/product";
import { Input } from "@/components/ui/input";

export const ProductList = () => {
  // State cho tìm kiếm, phân trang, sắp xếp
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  // Gọi API với các tham số
  const { products, isLoading, isError, refresh } = useProducts({
    q: searchTerm,
    limit: pageSize,
    skip: (page - 1) * pageSize,
    sortBy,
    order: "asc",
  });

  const columns: ColumnDef<Product>[] = [
    { id: "id", header: "ID", accessorKey: "id", cell: ({ getValue }) => getValue() },
    { id: "title", header: "Tên sản phẩm", accessorKey: "title", cell: ({ getValue }) => getValue() },
    { id: "price", header: "Giá", accessorKey: "price", cell: ({ getValue }) => `$${getValue()}` },
    { id: "brand", header: "Thương hiệu", accessorKey: "brand", cell: ({ getValue }) => getValue() },
    { id: "rating", header: "Đánh giá", accessorKey: "rating", cell: ({ getValue }) => getValue() },
    { id: "stock", header: "Tồn kho", accessorKey: "stock", cell: ({ getValue }) => getValue() },
  ];

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>

      {/* Thanh tìm kiếm */}
      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => refresh()}>Làm mới</Button>
      </div>

      {/* Xử lý lỗi */}
      {isError && <div className="text-red-500">⚠ Lỗi khi tải dữ liệu sản phẩm</div>}

      {/* Loading state */}
      {isLoading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <DataTable<Product>
          columns={columns}
          data={products}
          isLoading={isLoading}
          addNewRoute="/product/create"
          initialPageSize={pageSize}
          rowActions={(row) => (
            <>
              <Button variant="ghost" size="sm" onClick={() => console.log("Sửa", row)}>Sửa</Button>
              <Button variant="ghost" size="sm" onClick={() => console.log("Xóa", row)}>Xóa</Button>
            </>
          )}
        />
      )}
    </Card>
  );
};
