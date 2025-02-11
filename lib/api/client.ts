import axios from 'axios';

// Tạo instance của Axios
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Sử dụng biến môi trường để cấu hình base URL
  // withCredentials: true, // Cho phép gửi cookie (nếu cần)
});

// Hàm để refresh token
const refreshToken = async () => {
  try {
    const response = await axios.post(
      'https://dummyjson.com/auth/refresh',
      {
        expiresInMins: 30, // Thời gian sống của access token mới
      },
      {
        headers: { 'Content-Type': 'application/json' },
        // withCredentials: true, // Gửi cookie refresh token
      }
    );

    // Lưu access token mới vào localStorage
    localStorage.setItem('authToken', response.data.accessToken);

    return response.data.accessToken; // Trả về access token mới
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

// Interceptor để thêm token vào header trước khi gửi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor để xử lý lỗi toàn cục và refresh token
apiClient.interceptors.response.use(
  (response) => {
    // Trả về response nếu không có lỗi
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi là 401 (Unauthorized) và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu request này đã thử refresh token

      try {
        // Refresh token
        const newAccessToken = await refreshToken();

        // Cập nhật header Authorization với access token mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Thử lại request gốc với access token mới
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token, logging out...', refreshError);
        localStorage.removeItem('authToken'); // Xóa token
        window.location.href = '/login'; // Redirect về trang login
        return Promise.reject(refreshError);
      }
    }

    // Nếu không phải lỗi 401 hoặc đã thử refresh token mà vẫn lỗi
    return Promise.reject(error);
  }
);

export default apiClient;