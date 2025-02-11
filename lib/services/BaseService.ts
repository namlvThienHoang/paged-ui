import apiClient from '@/lib/api/client';

export class BaseService<T, CreateDto = Partial<T>, UpdateDto = Partial<T>> {
  constructor(protected baseUrl: string) {}

  async getAll(params?: Record<string, any>): Promise<{ items: T[]; total: number }> {
    const response = await apiClient.get(this.baseUrl, { params });
    return response.data;
  }

  async getById(id: number): Promise<T> {
    const response = await apiClient.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateDto): Promise<T> {
    const response = await apiClient.post(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdateDto): Promise<T> {
    const response = await apiClient.put(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<number> {
    const response = await apiClient.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }
}
