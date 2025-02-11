import { useMemo, useCallback } from 'react';
import useSWR from 'swr';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductService from '../services/productService';
import { ProductQueryParams, ProductResponse } from '../types/product';

export function useProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const sortBy = searchParams.get("sortBy") || "id";
  const order = (searchParams.get("order") as "asc" | "desc") || "asc";

  const pageSize = 10;

  const queryParams = useMemo(() => ({
    q,
    limit: pageSize,
    skip: (page - 1) * pageSize,
    sortBy,
    order,
  }), [q, page, sortBy, order]);

  const { data, error, isLoading } = useSWR<ProductResponse>(
    ['/products/search', queryParams],
    () => ProductService.getProducts(queryParams),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const setParams = useCallback((newParams: Partial<ProductQueryParams>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        current.set(key, value.toString());
      } else {
        current.delete(key);
      }
    });
    router.push(`?${current.toString()}`);
  }, [searchParams, router]);

  return {
    products: data?.products || [],
    total: data?.total || 0,
    isLoading,
    isError: error,
    q,
    page,
    sortBy,
    order,
    setParams,
  };
}



export const useProductById = (id: number) => {
  const { data, error, mutate } = useSWR(
    '/products/' + id, 
    () => ProductService.getById(id)
  );

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate
  };
};