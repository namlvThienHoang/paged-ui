import { useState, useEffect } from "react";
import { ColumnDef, DataTable } from "@/components/data-table/DataTable";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types/product";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Input } from "@/components/ui/input";

const columns: ColumnDef<Product>[] = [
  { id: "id", header: "ID", accessorKey: "id", cell: ({ getValue }) => getValue() },
  { id: "title", header: "Tên sản phẩm", accessorKey: "title", cell: ({ getValue }) => getValue() },
  { id: "price", header: "Giá", accessorKey: "price", cell: ({ getValue }) => `$${getValue()}` },
  { id: "brand", header: "Thương hiệu", accessorKey: "brand", cell: ({ getValue }) => getValue() },
  { id: "rating", header: "Đánh giá", accessorKey: "rating", cell: ({ getValue }) => getValue() },
  { id: "stock", header: "Tồn kho", accessorKey: "stock", cell: ({ getValue }) => getValue() },
];

export function ProductTable() {
  const { products, total, isLoading, isError, q, page, sortBy, order, setParams } = useProducts();
  const [searchValue, setSearchValue] = useState(q);
  const debouncedSearchValue = useDebounce(searchValue, 500); // Fix destructuring lỗi

  useEffect(() => {
    if (q !== debouncedSearchValue) {
      setParams({ q: debouncedSearchValue, page: "1" }); // Reset về trang 1 khi tìm kiếm
    }
  }, [debouncedSearchValue, setParams, q]); // Thêm `q` vào dependencies để tránh gọi API không cần thiết

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSort = (columnId: string) => {
    setParams({
      sortBy: columnId,
      order: sortBy === columnId && order === "asc" ? "desc" : "asc",
    });
  };

  const handlePageChange = (newPage: number) => {
    setParams({ page: newPage.toString() });
  };

  if (isError) {
    return <div className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu.</div>;
  }

  return (
    <div>
      <Input
        type="text"
        placeholder="Tìm kiếm..."
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-sm mb-4"
      />
      <DataTable<Product>
        columns={columns}
        data={products}
        onSort={handleSort}
        sortBy={sortBy}
        order={order}
        page={page}
        totalPages={Math.ceil(total / 10)}
        totalItems={total}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
}
