import useSWR from 'swr';
import { ProductService } from '../services/productService';
import { ProductQueryParams } from '../types/product';

export const useProducts = (params: ProductQueryParams) => {
  const { data, error, mutate } = useSWR(
    ['/products', params], // Key của SWR, giúp caching dựa trên params
    () => ProductService.getProducts(params)
  );

  return {
    products: data ?? [], // Đảm bảo luôn trả về mảng, tránh lỗi undefined
    isLoading: !data && !error,
    isError: error,
    refresh: mutate,
  };
};

export const useProductById = (id: number) => {
  const { data, error, mutate } = useSWR(
    '/products/' + id, 
    () => ProductService.getProductById(id)
  );

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate
  };
};