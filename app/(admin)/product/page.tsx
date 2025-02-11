"use client";

import { ProductList } from "@/features/product/components";
import React from "react";

export default function ProductsPage() {
  return (
    <div className="p-6 space-y-6">
      <ProductList />
    </div>
  );
}