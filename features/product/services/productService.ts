import { Product, ProductQueryParams, ProductResponse } from '../types/product';
import { ProductFormData } from '../schemas/productSchema';
import { BaseService } from '@/lib/services/BaseService';
import apiClient from '@/lib/api/client';

class ProductService extends BaseService<Product, ProductFormData, ProductFormData> {
  constructor() {
    super('/products');
  }

  async getProducts(params: ProductQueryParams): Promise<ProductResponse> {
    const response = await apiClient.get(`${this.baseUrl}/search`, { params });
    return response.data;
  }
}

export default new ProductService();
