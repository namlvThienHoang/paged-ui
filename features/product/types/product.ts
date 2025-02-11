export type Product = {
    id: number;
    title: string;
    price: number;
    brand: string;
    category: string;
    rating: number;
    stock: number;
    thumbnail: string;
  };

  export interface ProductQueryParams {
    q?: string; // Từ khóa tìm kiếm
    limit?: number; // Số lượng sản phẩm trên mỗi trang
    skip?: number; // Số sản phẩm cần bỏ qua (pagination)
    sortBy?: string; // Trường cần sắp xếp
    order?: 'asc' | 'desc'; // Thứ tự sắp xếp
  }


  export interface ProductResponse {
    products?: Product[]; // Từ khóa tìm kiếm
    total?: number; // Số lượng sản phẩm trên mỗi trang
    skip?: number; // Số sản phẩm cần bỏ qua (pagination)
    limit?: number; // Trường cần sắp xếp
  }