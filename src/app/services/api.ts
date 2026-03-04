// API Service Layer
// เชื่อมต่อกับ Backend API ของคุณเองที่นี่
// แก้ไข BASE_URL ให้ตรงกับ backend ของคุณ

const BASE_URL = 'http://localhost:3000/api'; // แก้ไข URL นี้

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'employer' | 'admin';
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  category: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  employerId: string;
  employerName: string;
  postedDate: string;
  expiryDate: string;
  status: 'active' | 'closed' | 'draft';
  applicantsCount: number;
}

export interface Resume {
  id: string;
  userId: string;
  jobId: string;
  fileName: string;
  fileUrl: string;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  submittedAt: string;
}

export interface Payment {
  id: string;
  employerId: string;
  jobId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  paymentMethod: string;
}

// Mock Data สำหรับการทดสอบ
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Startup Co.',
    companyLogo: 'https://source.unsplash.com/100x100/?company,tech',
    location: 'Bangkok, Thailand',
    type: 'full-time',
    category: 'Technology',
    salary: '40,000 - 60,000 บาท',
    description: 'เราต้องการ Frontend Developer ที่มีความสามารถและหลงใหล่ในการสร้าง UI/UX ที่ยอดเยี่ยม',
    requirements: ['React.js', 'TypeScript', 'Tailwind CSS', 'API Integration'],
    benefits: ['ประกันสุขภาพ', 'โบนัสประจำปี', 'Work from Home', 'อุปกรณ์ทำงานครบ'],
    employerId: 'emp1',
    employerName: 'Tech Startup Co.',
    postedDate: '2026-03-01',
    expiryDate: '2026-04-01',
    status: 'active',
    applicantsCount: 15
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Creative Agency',
    companyLogo: 'https://source.unsplash.com/100x100/?design,creative',
    location: 'Remote',
    type: 'full-time',
    category: 'Design',
    salary: '35,000 - 50,000 บาท',
    description: 'ต้องการ Designer ที่สามารถสร้างประสบการณ์ผู้ใช้ที่น่าประทับใจ',
    requirements: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    benefits: ['ทำงานที่ไหนก็ได้', 'ค่าอุปกรณ์', 'ฝึกอบรม', 'โบนัส'],
    employerId: 'emp2',
    employerName: 'Creative Agency',
    postedDate: '2026-03-02',
    expiryDate: '2026-04-02',
    status: 'active',
    applicantsCount: 8
  },
  {
    id: '3',
    title: 'Marketing Manager',
    company: 'E-commerce Giant',
    companyLogo: 'https://source.unsplash.com/100x100/?ecommerce,business',
    location: 'Chiang Mai, Thailand',
    type: 'full-time',
    category: 'Marketing',
    salary: '50,000 - 80,000 บาท',
    description: 'หา Marketing Manager ที่มีประสบการณ์ในด้าน Digital Marketing',
    requirements: ['Digital Marketing', 'SEO/SEM', 'Analytics', 'Team Management'],
    benefits: ['ประกันสุขภาพครอบครัว', 'โบนัส', 'ส่วนลดสินค้า', 'ลาพักร้อน'],
    employerId: 'emp3',
    employerName: 'E-commerce Giant',
    postedDate: '2026-03-03',
    expiryDate: '2026-04-03',
    status: 'active',
    applicantsCount: 23
  }
];

let mockUser: User | null = null;

// API Functions
class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      // ใช้ mock data สำหรับ demo
      return this.getMockData<T>(endpoint);
    }
  }

  private getMockData<T>(endpoint: string): T {
    // Mock data fallback
    if (endpoint.includes('/jobs')) {
      return mockJobs as T;
    }
    return {} as T;
  }

  // Auth APIs
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password })
    // });

    // Mock response สำหรับ demo
    await new Promise(resolve => setTimeout(resolve, 500));
    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : email.includes('employer') ? 'employer' : 'user',
      createdAt: new Date().toISOString()
    };
    mockUser = user;
    const token = 'mock_token_' + Math.random().toString(36);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  }

  async register(data: { email: string; password: string; name: string; role: 'user' | 'employer' }): Promise<{ user: User; token: string }> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest('/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });

    // Mock response สำหรับ demo
    await new Promise(resolve => setTimeout(resolve, 500));
    const user: User = {
      id: Math.random().toString(36),
      email: data.email,
      name: data.name,
      role: data.role,
      createdAt: new Date().toISOString()
    };
    mockUser = user;
    const token = 'mock_token_' + Math.random().toString(36);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    mockUser = null;
  }

  async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  // Job APIs
  async getJobs(filters?: { category?: string; type?: string; location?: string; search?: string }): Promise<Job[]> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // const queryParams = new URLSearchParams(filters as any).toString();
    // return this.makeRequest(`/jobs?${queryParams}`);

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 300));
    let filtered = [...mockJobs];
    
    if (filters?.category) {
      filtered = filtered.filter(j => j.category === filters.category);
    }
    if (filters?.type) {
      filtered = filtered.filter(j => j.type === filters.type);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(j => 
        j.title.toLowerCase().includes(search) || 
        j.company.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  }

  async getJobById(id: string): Promise<Job | null> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest(`/jobs/${id}`);

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockJobs.find(j => j.id === id) || null;
  }

  async createJob(jobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount'>): Promise<Job> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest('/jobs', {
    //   method: 'POST',
    //   body: JSON.stringify(jobData)
    // });

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 500));
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36),
      postedDate: new Date().toISOString(),
      applicantsCount: 0
    };
    mockJobs.push(newJob);
    return newJob;
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest(`/jobs/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(jobData)
    // });

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockJobs.findIndex(j => j.id === id);
    if (index >= 0) {
      mockJobs[index] = { ...mockJobs[index], ...jobData };
      return mockJobs[index];
    }
    throw new Error('Job not found');
  }

  async deleteJob(id: string): Promise<void> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest(`/jobs/${id}`, { method: 'DELETE' });

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockJobs.findIndex(j => j.id === id);
    if (index >= 0) {
      mockJobs.splice(index, 1);
    }
  }

  // Resume APIs
  async submitResume(data: { jobId: string; file: File; coverLetter: string }): Promise<Resume> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // const formData = new FormData();
    // formData.append('file', data.file);
    // formData.append('jobId', data.jobId);
    // formData.append('coverLetter', data.coverLetter);
    // return this.makeRequest('/resumes', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {} // Let browser set Content-Type for FormData
    // });

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Math.random().toString(36),
      userId: mockUser?.id || '1',
      jobId: data.jobId,
      fileName: data.file.name,
      fileUrl: URL.createObjectURL(data.file),
      coverLetter: data.coverLetter,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
  }

  async getMyResumes(): Promise<Resume[]> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest('/resumes/my');

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  }

  async getJobResumes(jobId: string): Promise<Resume[]> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest(`/jobs/${jobId}/resumes`);

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  }

  // Payment APIs
  async createPayment(jobId: string): Promise<Payment> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest('/payments', {
    //   method: 'POST',
    //   body: JSON.stringify({ jobId })
    // });

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: Math.random().toString(36),
      employerId: mockUser?.id || '1',
      jobId,
      amount: 299,
      currency: 'THB',
      status: 'completed',
      paymentDate: new Date().toISOString(),
      paymentMethod: 'credit_card'
    };
  }

  async getMyPayments(): Promise<Payment[]> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest('/payments/my');

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  }

  // Admin APIs
  async getAllUsers(): Promise<User[]> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest('/admin/users');

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'user',
        createdAt: '2026-01-01'
      },
      {
        id: '2',
        email: 'employer@example.com',
        name: 'Company ABC',
        role: 'employer',
        createdAt: '2026-01-15'
      }
    ];
  }

  async getAllPayments(): Promise<Payment[]> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest('/admin/payments');

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  }

  async updateUserStatus(userId: string, status: string): Promise<User> {
    // TODO: เชื่อมต่อกับ backend API ของคุณ
    // return this.makeRequest(`/admin/users/${userId}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ status })
    // });

    // Mock response
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: userId,
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user',
      createdAt: '2026-01-01'
    };
  }
}

export const api = new ApiService();
