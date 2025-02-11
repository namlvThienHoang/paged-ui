import apiClient from '@/lib/api/client';
import { Product, ProductQueryParams, ProductResponse } from '../types/product';
import { ProductFormData } from '../schemas/productSchema';



export const ProductService = {
  getProducts: async (params: ProductQueryParams): Promise<ProductResponse> => {
    const response = await apiClient.get('/products/search', { params });
    return response.data; // Giả sử API trả về { products: Product[], total: number }
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (productData: ProductFormData): Promise<Product> => {
    const response = await apiClient.post('/products/add', productData);
    return response.data;
  },

  updateProduct: async (id: number,productData: ProductFormData): Promise<Product> => {
    const response = await apiClient.put(`/products/update/${id}`, productData);
    return response.data;
  }
}