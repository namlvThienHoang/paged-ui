import React from "react";
import { ProductTable } from "./ProductTable";

export const ProductList = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Danh sách sản phẩm</h1>
      <ProductTable />
    </div>
  );
};
