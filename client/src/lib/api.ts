const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: any[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Don't set Content-Type for FormData - let browser set it with boundary
    const isFormData = options.body instanceof FormData;
    const defaultHeaders: Record<string, string> = {};
    
    if (!isFormData) {
      defaultHeaders['Content-Type'] = 'application/json';
    }
    
    const config: RequestInit = {
      credentials: 'include',
      headers: {
        ...defaultHeaders,
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json?.message || 'An error occurred');
      }

      // Normalize API shape so callers can always read from data
      const normalized: ApiResponse<T> = (json && typeof json === 'object' && 'data' in json)
        ? json
        : { data: json } as ApiResponse<T>;

      return normalized;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    const response = await this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    const token = (response as any)?.data?.token;
    if (token) {
      this.setToken(token);
    }
    
    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    const token = (response as any)?.data?.token || (response as any)?.token;
    if (token) {
      this.setToken(token);
    }
    
    return response;
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Issues endpoints
  async getIssues(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: number;
    priority?: string;
    city?: string;
    state?: string;
    search?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    return this.request(`/issues${queryString ? `?${queryString}` : ''}`);
  }

  async getIssue(id: number) {
    return this.request(`/issues/${id}`);
  }

  async createIssue(issueData: {
    title: string;
    description: string;
    categoryId: number;
    priority: string;
    locationAddress: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    pincode: string;
    streetName: string;
    nearbyLandmark: string;
  }, images?: File[]) {
    const formData = new FormData();
    
    Object.entries(issueData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    
    if (images) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    return this.request('/issues', {
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it with boundary for FormData
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }

  async updateIssueStatus(
    id: number,
    statusData: {
      status: string;
      assignedTo?: number;
      resolutionNotes?: string;
      reason?: string;
    }
  ) {
    return this.request(`/issues/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(statusData),
    });
  }

  async addComment(
    issueId: number,
    commentData: {
      comment: string;
      isInternal?: boolean;
    }
  ) {
    return this.request(`/issues/${issueId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async getComments(issueId: number) {
    return this.request(`/issues/${issueId}/comments`);
  }

  // Categories endpoints
  async getCategories() {
    return this.request('/categories');
  }

  async getCategory(id: number) {
    return this.request(`/categories/${id}`);
  }

  // Notifications endpoints
  async getNotifications(params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    return this.request(`/notifications${queryString ? `?${queryString}` : ''}`);
  }

  async getUnreadCount() {
    return this.request('/notifications/unread-count');
  }

  async markNotificationRead(id: number) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsRead() {
    return this.request('/notifications/mark-all-read', {
      method: 'PATCH',
    });
  }

  async deleteNotification(id: number) {
    return this.request(`/notifications/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
