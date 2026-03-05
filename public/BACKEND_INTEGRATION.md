# 🔌 Backend Integration Guide - JobHub

คู่มือการเชื่อมต่อ Frontend กับ Backend API (.NET 8 MVC)

---

## 📋 ภาพรวม

โปรเจ็กต์ JobHub Frontend ถูกออกแบบมาให้พร้อมเชื่อมต่อกับ Backend API ที่พัฒนาด้วย .NET 8 MVC  
เอกสารนี้จะอธิบายวิธีการเชื่อมต่อและ API Endpoints ที่จำเป็น

---

## 🎯 API Endpoints ที่ต้องการ

### 1. Authentication & User Management

#### POST /api/auth/register
สมัครสมาชิกใหม่

**Request:**
```json
{
  "fullName": "สมชาย ใจดี",
  "email": "somchai@example.com",
  "password": "SecurePass123",
  "accountType": "jobseeker", // or "employer"
  "phone": "0812345678"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "สมัครสมาชิกสำเร็จ",
  "data": {
    "userId": "usr_123456",
    "email": "somchai@example.com",
    "fullName": "สมชาย ใจดี",
    "accountType": "jobseeker"
  }
}
```

#### POST /api/auth/login
เข้าสู่ระบบ

**Request:**
```json
{
  "email": "somchai@example.com",
  "password": "SecurePass123",
  "rememberMe": true
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "เข้าสู่ระบบสำเร็จ",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "usr_123456",
    "email": "somchai@example.com",
    "fullName": "สมชาย ใจดี",
    "accountType": "jobseeker",
    "expiresIn": 3600
  }
}
```

#### GET /api/auth/profile
ดึงข้อมูลโปรไฟล์ผู้ใช้

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "usr_123456",
    "email": "somchai@example.com",
    "fullName": "สมชาย ใจดี",
    "accountType": "jobseeker",
    "phone": "0812345678",
    "profileImage": "https://...",
    "createdAt": "2026-01-15T10:30:00Z"
  }
}
```

#### POST /api/auth/logout
ออกจากระบบ

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "ออกจากระบบสำเร็จ"
}
```

---

### 2. Job Management

#### GET /api/jobs
ดึงรายการงานทั้งหมด (with pagination & filters)

**Query Parameters:**
```
?page=1
&limit=10
&keyword=developer
&location=bangkok
&category=Technology
&type=full-time
&minSalary=30000
&maxSalary=60000
&experience=junior
&sortBy=latest
```

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "job_123",
        "title": "Frontend Developer",
        "company": "Tech Startup Co.",
        "companyLogo": "https://...",
        "location": "Bangkok, Thailand",
        "type": "full-time",
        "category": "Technology",
        "salary": "40,000 - 60,000 บาท",
        "salaryMin": 40000,
        "salaryMax": 60000,
        "description": "...",
        "requirements": ["...", "..."],
        "benefits": ["...", "..."],
        "employerId": "emp_456",
        "employerName": "Tech Startup Co.",
        "postedDate": "2026-03-01T08:00:00Z",
        "expiryDate": "2026-04-01T23:59:59Z",
        "status": "active",
        "applicantsCount": 15,
        "featured": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### GET /api/jobs/{id}
ดึงรายละเอียดงานเฉพาะ

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "job_123",
    "title": "Frontend Developer",
    "company": "Tech Startup Co.",
    "companyLogo": "https://...",
    "location": "Bangkok, Thailand",
    "type": "full-time",
    "category": "Technology",
    "salary": "40,000 - 60,000 บาท",
    "salaryMin": 40000,
    "salaryMax": 60000,
    "description": "รายละเอียดงานแบบเต็ม...",
    "responsibilities": ["หน้าที่ 1", "หน้าที่ 2"],
    "requirements": ["คุณสมบัติ 1", "คุณสมบัติ 2"],
    "benefits": ["สวัสดิการ 1", "สวัสดิการ 2"],
    "employerId": "emp_456",
    "employerName": "Tech Startup Co.",
    "employerDescription": "เกี่ยวกับบริษัท...",
    "postedDate": "2026-03-01T08:00:00Z",
    "expiryDate": "2026-04-01T23:59:59Z",
    "status": "active",
    "applicantsCount": 15,
    "featured": true,
    "views": 1250
  }
}
```

#### POST /api/jobs
สร้างตำแหน่งงานใหม่ (Employer only)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Senior Backend Developer",
  "company": "My Company",
  "location": "Bangkok, Thailand",
  "type": "full-time",
  "category": "Technology",
  "salaryMin": 60000,
  "salaryMax": 100000,
  "description": "รายละเอียดงาน...",
  "responsibilities": ["หน้าที่ 1", "หน้าที่ 2"],
  "requirements": ["คุณสมบัติ 1", "คุณสมบัติ 2"],
  "benefits": ["สวัสดิการ 1", "สวัสดิการ 2"],
  "experienceLevel": "senior",
  "expiryDate": "2026-04-30"
}
```

**Response:**
```json
{
  "success": true,
  "message": "สร้างตำแหน่งงานสำเร็จ",
  "data": {
    "id": "job_789",
    "title": "Senior Backend Developer",
    "status": "active",
    "postedDate": "2026-03-05T10:00:00Z"
  }
}
```

#### PUT /api/jobs/{id}
แก้ไขตำแหน่งงาน (Employer only - own jobs)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:** (Same as POST)

#### DELETE /api/jobs/{id}
ลบตำแหน่งงาน (Employer only - own jobs)

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "ลบตำแหน่งงานสำเร็จ"
}
```

---

### 3. Job Applications

#### POST /api/applications
สมัครงาน (with file upload)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request (Form Data):**
```
jobId: job_123
applicantName: สมชาย ใจดี
applicantEmail: somchai@example.com
applicantPhone: 0812345678
coverLetter: จดหมายสมัครงาน...
resumeFile: [PDF File]
```

**Response:**
```json
{
  "success": true,
  "message": "ส่งใบสมัครสำเร็จ",
  "data": {
    "applicationId": "app_999",
    "jobId": "job_123",
    "jobTitle": "Frontend Developer",
    "company": "Tech Startup Co.",
    "appliedDate": "2026-03-05T14:30:00Z",
    "status": "pending"
  }
}
```

#### GET /api/applications
ดึงรายการใบสมัครของผู้ใช้

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
```
?status=pending  // pending, reviewing, interview, accepted, rejected
&page=1
&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "applicationId": "app_999",
        "jobId": "job_123",
        "jobTitle": "Frontend Developer",
        "company": "Tech Startup Co.",
        "companyLogo": "https://...",
        "appliedDate": "2026-03-05T14:30:00Z",
        "status": "pending",
        "resumeUrl": "https://...",
        "coverLetter": "..."
      }
    ],
    "pagination": { }
  }
}
```

#### GET /api/applications/job/{jobId}
ดึงรายการผู้สมัครของงาน (Employer only)

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "jobTitle": "Frontend Developer",
    "applications": [
      {
        "applicationId": "app_999",
        "applicantId": "usr_123",
        "applicantName": "สมชาย ใจดี",
        "applicantEmail": "somchai@example.com",
        "applicantPhone": "0812345678",
        "appliedDate": "2026-03-05T14:30:00Z",
        "status": "pending",
        "resumeUrl": "https://...",
        "coverLetter": "..."
      }
    ]
  }
}
```

#### PUT /api/applications/{id}/status
อัพเดทสถานะใบสมัคร (Employer only)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "status": "interview", // pending, reviewing, interview, accepted, rejected
  "note": "เชิญสัมภาษณ์วันที่ 10 มีนาคม 2026"
}
```

---

### 4. File Upload

#### POST /api/upload/resume
อัพโหลดไฟล์ Resume

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request:**
```
file: [PDF File]
```

**Response:**
```json
{
  "success": true,
  "message": "อัพโหลดสำเร็จ",
  "data": {
    "fileUrl": "https://storage.example.com/resumes/usr_123/resume_202603051430.pdf",
    "fileName": "resume_202603051430.pdf",
    "fileSize": 245678,
    "uploadedAt": "2026-03-05T14:30:00Z"
  }
}
```

#### POST /api/upload/company-logo
อัพโหลด Company Logo (Employer only)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request:**
```
file: [Image File - JPG/PNG]
```

---

### 5. Saved Jobs

#### POST /api/saved-jobs
บันทึกงาน

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "jobId": "job_123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "บันทึกงานสำเร็จ"
}
```

#### DELETE /api/saved-jobs/{jobId}
ยกเลิกการบันทึกงาน

**Headers:**
```
Authorization: Bearer {token}
```

#### GET /api/saved-jobs
ดึงรายการงานที่บันทึก

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "savedJobs": [
      {
        "jobId": "job_123",
        "title": "Frontend Developer",
        "company": "Tech Startup Co.",
        "companyLogo": "https://...",
        "location": "Bangkok",
        "salary": "40,000 - 60,000 บาท",
        "savedDate": "2026-03-05T12:00:00Z"
      }
    ]
  }
}
```

---

### 6. Dashboard & Statistics

#### GET /api/dashboard/stats
สถิติสำหรับ Dashboard

**Headers:**
```
Authorization: Bearer {token}
```

**Response (Job Seeker):**
```json
{
  "success": true,
  "data": {
    "totalApplications": 12,
    "pendingApplications": 5,
    "interviews": 3,
    "offers": 1,
    "savedJobs": 8,
    "profileViews": 45
  }
}
```

**Response (Employer):**
```json
{
  "success": true,
  "data": {
    "totalJobs": 8,
    "activeJobs": 6,
    "totalApplications": 125,
    "pendingReview": 34,
    "scheduledInterviews": 12,
    "totalViews": 2450
  }
}
```

---

### 7. Payment (ระบบคิดค่าบริการ)

#### GET /api/pricing
ดึงแผนราคา

**Response:**
```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "basic",
        "name": "Basic",
        "price": 299,
        "duration": "per_post",
        "features": [
          "1 ตำแหน่งงาน",
          "แสดง 30 วัน",
          "ดูข้อมูลผู้สมัคร"
        ]
      },
      {
        "id": "pro",
        "name": "Pro",
        "price": 1999,
        "duration": "per_month",
        "features": [
          "10 ตำแหน่งงาน/เดือน",
          "แสดง 60 วัน",
          "Featured listing",
          "ดูข้อมูลผู้สมัครแบบละเอียด"
        ]
      }
    ]
  }
}
```

#### POST /api/payments/create-order
สร้างคำสั่งซื้อ

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "planId": "basic",
  "jobId": "job_123"  // optional for basic plan
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ord_555",
    "amount": 299,
    "paymentUrl": "https://payment.example.com/checkout/ord_555"
  }
}
```

---

## 🔧 การตั้งค่า Frontend

### 1. สร้างไฟล์ Config

สร้างไฟล์ `/public/js/config.js`:

```javascript
// API Configuration
const API_CONFIG = {
    // Development
    DEV_BASE_URL: 'http://localhost:5000/api',
    
    // Production
    PROD_BASE_URL: 'https://api.jobhub.com/api',
    
    // Current environment
    BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api' 
        : 'https://api.jobhub.com/api',
    
    // Timeout
    TIMEOUT: 30000,
    
    // File upload limits
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['application/pdf'],
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg']
};

// API Endpoints
const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    
    // Jobs
    JOBS: '/jobs',
    JOB_DETAIL: (id) => `/jobs/${id}`,
    
    // Applications
    APPLICATIONS: '/applications',
    APPLY_JOB: '/applications',
    
    // Saved Jobs
    SAVED_JOBS: '/saved-jobs',
    
    // Upload
    UPLOAD_RESUME: '/upload/resume',
    
    // Dashboard
    DASHBOARD_STATS: '/dashboard/stats'
};
```

### 2. สร้าง API Service

สร้างไฟล์ `/public/js/api-service.js`:

```javascript
class APIService {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.timeout = API_CONFIG.TIMEOUT;
    }
    
    // Get auth token
    getToken() {
        return localStorage.getItem('authToken');
    }
    
    // Set auth token
    setToken(token) {
        localStorage.setItem('authToken', token);
    }
    
    // Remove auth token
    removeToken() {
        localStorage.removeItem('authToken');
    }
    
    // Make API request
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        // Add auth token if exists
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const config = {
            method: options.method || 'GET',
            headers,
            ...options
        };
        
        // Add body for POST/PUT requests
        if (options.body && config.method !== 'GET') {
            config.body = JSON.stringify(options.body);
        }
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    
    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    // POST request
    async post(endpoint, body) {
        return this.request(endpoint, { 
            method: 'POST', 
            body 
        });
    }
    
    // PUT request
    async put(endpoint, body) {
        return this.request(endpoint, { 
            method: 'PUT', 
            body 
        });
    }
    
    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
    
    // Upload file
    async uploadFile(endpoint, file) {
        const url = `${this.baseURL}${endpoint}`;
        const formData = new FormData();
        formData.append('file', file);
        
        const token = this.getToken();
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: formData
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Upload failed');
            }
            
            return data;
        } catch (error) {
            console.error('Upload Error:', error);
            throw error;
        }
    }
}

// Create instance
const apiService = new APIService();
```

### 3. แก้ไขไฟล์ JavaScript ที่มีอยู่

#### แก้ไข `/public/js/job-detail.js`:

```javascript
// Replace loadJobDetail function
async function loadJobDetail() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');
        
        if (!jobId) {
            showError('ไม่พบรหัสงาน');
            return;
        }
        
        // เรียก API แทน fetch JSON file
        const response = await apiService.get(API_ENDPOINTS.JOB_DETAIL(jobId));
        
        if (response.success) {
            currentJob = response.data;
            displayJobDetail(currentJob);
        } else {
            showError(response.message || 'ไม่พบงานที่ค้นหา');
        }
    } catch (error) {
        console.error('Error loading job:', error);
        showError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    }
}

// Replace submitApplication function
async function submitApplication() {
    if (!isLoggedIn()) {
        showNotification('กรุณาเข้าสู่ระบบก่อนสมัครงาน', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    const name = $('#applicantName').val();
    const email = $('#applicantEmail').val();
    const phone = $('#applicantPhone').val();
    const resumeFile = $('#resumeFile')[0].files[0];
    const coverLetter = $('#coverLetter').val();
    
    if (!name || !email || !phone || !resumeFile) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    try {
        // Upload resume first
        const uploadResponse = await apiService.uploadFile(
            API_ENDPOINTS.UPLOAD_RESUME, 
            resumeFile
        );
        
        // Then submit application
        const applicationData = {
            jobId: currentJob.id,
            applicantName: name,
            applicantEmail: email,
            applicantPhone: phone,
            coverLetter: coverLetter,
            resumeUrl: uploadResponse.data.fileUrl
        };
        
        const response = await apiService.post(
            API_ENDPOINTS.APPLY_JOB, 
            applicationData
        );
        
        if (response.success) {
            showNotification('ส่งใบสมัครสำเร็จ!', 'success');
            $('#applyModal').modal('hide');
            $('#applyForm')[0].reset();
            
            // Update applicants count
            if (currentJob) {
                currentJob.applicantsCount++;
                $('#applicantsCount').text(currentJob.applicantsCount);
            }
        }
    } catch (error) {
        showNotification('เกิดข้อผิดพลาด: ' + error.message, 'error');
    }
}
```

---

## 🔐 Security Considerations

### 1. CORS Configuration (.NET Backend)

```csharp
// Startup.cs or Program.cs
services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:3000", "https://jobhub.com")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

app.UseCors("AllowFrontend");
```

### 2. JWT Authentication

```csharp
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Configuration["Jwt:Issuer"],
            ValidAudience = Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
        };
    });
```

### 3. File Upload Validation

```csharp
[HttpPost("upload/resume")]
public async Task<IActionResult> UploadResume(IFormFile file)
{
    // Validate file
    var allowedExtensions = new[] { ".pdf" };
    var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
    
    if (!allowedExtensions.Contains(extension))
    {
        return BadRequest(new { message = "Only PDF files are allowed" });
    }
    
    if (file.Length > 5 * 1024 * 1024) // 5MB
    {
        return BadRequest(new { message = "File size exceeds 5MB" });
    }
    
    // Process upload...
}
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE Users (
    UserId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Email NVARCHAR(255) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    FullName NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(20),
    AccountType NVARCHAR(20) NOT NULL, -- 'jobseeker', 'employer', 'admin'
    ProfileImage NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);
```

### Jobs Table
```sql
CREATE TABLE Jobs (
    JobId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Title NVARCHAR(255) NOT NULL,
    Company NVARCHAR(255) NOT NULL,
    CompanyLogo NVARCHAR(MAX),
    Location NVARCHAR(255),
    Type NVARCHAR(50), -- 'full-time', 'part-time', 'remote', etc.
    Category NVARCHAR(100),
    SalaryMin DECIMAL(18,2),
    SalaryMax DECIMAL(18,2),
    Description NVARCHAR(MAX),
    Responsibilities NVARCHAR(MAX), -- JSON array
    Requirements NVARCHAR(MAX), -- JSON array
    Benefits NVARCHAR(MAX), -- JSON array
    ExperienceLevel NVARCHAR(50),
    EmployerId UNIQUEIDENTIFIER,
    PostedDate DATETIME2 DEFAULT GETDATE(),
    ExpiryDate DATETIME2,
    Status NVARCHAR(20) DEFAULT 'active', -- 'active', 'closed', 'draft'
    Featured BIT DEFAULT 0,
    Views INT DEFAULT 0,
    FOREIGN KEY (EmployerId) REFERENCES Users(UserId)
);
```

### Applications Table
```sql
CREATE TABLE Applications (
    ApplicationId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    JobId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    ApplicantName NVARCHAR(255),
    ApplicantEmail NVARCHAR(255),
    ApplicantPhone NVARCHAR(20),
    ResumeUrl NVARCHAR(MAX),
    CoverLetter NVARCHAR(MAX),
    Status NVARCHAR(50) DEFAULT 'pending', -- 'pending', 'reviewing', 'interview', 'accepted', 'rejected'
    Note NVARCHAR(MAX),
    AppliedDate DATETIME2 DEFAULT GETDATE(),
    UpdatedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (JobId) REFERENCES Jobs(JobId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
```

### SavedJobs Table
```sql
CREATE TABLE SavedJobs (
    SavedJobId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    JobId UNIQUEIDENTIFIER NOT NULL,
    SavedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (JobId) REFERENCES Jobs(JobId),
    UNIQUE(UserId, JobId)
);
```

---

## ✅ Integration Checklist

### Frontend Tasks
- [ ] เพิ่ม config.js สำหรับ API configuration
- [ ] สร้าง api-service.js สำหรับ HTTP requests
- [ ] แก้ไข job-detail.js ให้เรียก API
- [ ] แก้ไข jobs.js ให้เรียก API
- [ ] แก้ไข auth.js ให้เรียก API
- [ ] แก้ไข post-job.js ให้เรียก API
- [ ] แก้ไข dashboard.js ให้เรียก API
- [ ] เพิ่ม Error handling
- [ ] เพิ่ม Loading states
- [ ] ทดสอบ File upload

### Backend Tasks
- [ ] สร้าง Database schema
- [ ] สร้าง Models และ DTOs
- [ ] พัฒนา Authentication API
- [ ] พัฒนา Jobs API
- [ ] พัฒนา Applications API
- [ ] พัฒนา File Upload API
- [ ] ตั้งค่า CORS
- [ ] เพิ่ม JWT Authentication
- [ ] เพิ่ม Input Validation
- [ ] ทดสอบด้วย Postman/Swagger

---

## 🎓 Next Steps

1. **พัฒนา Backend API** ตาม spec ข้างต้น
2. **ทดสอบ API** ด้วย Postman หรือ Swagger
3. **เชื่อมต่อ Frontend** ด้วย api-service.js
4. **ทดสอบ Integration** ทั้งระบบ
5. **Deploy** ขึ้น Production

---

**Good Luck!** 🚀

**อัพเดทล่าสุด**: 5 มีนาคม 2026
