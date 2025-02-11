import { ProductForm } from "@/features/product/components/ProductForm";
import { useProductById } from "@/features/product/hooks/useProducts";
import { Product } from "@/features/product/types/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product>();


  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const productId = Number(id); // Chuyển id sang kiểu number
        const { products, isLoading, isError } = useProductById(productId);
        setProduct(products);
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <ProductForm initialValues={product} />
    </div>
  );
}
