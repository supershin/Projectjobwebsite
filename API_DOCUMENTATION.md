# JobHub - Job Board Website

เว็บไซต์สมัครงานสไตล์ Gen Z ที่ทันสมัยและใช้งานง่าย

## 🎨 Features

### สำหรับผู้หางาน (User)
- ค้นหางานตามตำแหน่ง, สถานที่, หมวดหมู่
- กรองงานตามประเภท (เต็มเวลา, พาร์ทไทม์, ฟรีแลนซ์, ฯลฯ)
- ดูรายละเอียดงานและสมัครงานออนไลน์
- อัพโหลด Resume (PDF, DOC, DOCX)
- เขียน Cover Letter
- ติดตามสถานะการสมัครงาน
- Dashboard สำหรับดูประวัติการสมัครงาน

### สำหรับผู้ประกาศงาน (Employer)
- ประกาศตำแหน่งงาน
- จัดการประกาศงาน (ดู, แก้ไข, ลบ)
- ดูจำนวนผู้สมัคร
- ระบบชำระเงิน (299 บาท/ประกาศ)
- Dashboard สำหรับจัดการประกาศและติดตามผลการสมัคร

### สำหรับแอดมิน (Admin)
- ดูภาพรวมของระบบ
- จัดการผู้ใช้ทั้งหมด
- จัดการประกาศงาน
- ดูรายงานการเงิน
- สถิติและข้อมูลการใช้งาน

## 🚀 Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)

## 📡 API Integration

### การเชื่อมต่อ Backend API

แก้ไขไฟล์ `/src/app/services/api.ts`:

```typescript
const BASE_URL = 'YOUR_BACKEND_API_URL'; // แก้ไข URL นี้
```

### API Endpoints ที่ต้องมี

#### Authentication APIs

**POST /api/auth/login**
```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user" | "employer" | "admin",
    "avatar": "url",
    "createdAt": "2026-03-04T00:00:00Z"
  },
  "token": "jwt_token_here"
}
```

**POST /api/auth/register**
```json
// Request
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "user" | "employer"
}

// Response
{
  "user": { /* same as login */ },
  "token": "jwt_token_here"
}
```

#### Job APIs

**GET /api/jobs**
- Query params: `?search=&location=&category=&type=`
- Response: Array of Job objects

**GET /api/jobs/:id**
- Response: Single Job object

**POST /api/jobs** (Employer only)
```json
// Request
{
  "title": "Frontend Developer",
  "company": "Tech Company",
  "location": "Bangkok, Thailand",
  "type": "full-time",
  "category": "Technology",
  "salary": "40,000 - 60,000 บาท",
  "description": "Job description...",
  "requirements": ["React.js", "TypeScript"],
  "benefits": ["ประกันสุขภาพ", "โบนัส"],
  "expiryDate": "2026-04-04",
  "status": "active"
}

// Response
{
  "id": "job_id",
  /* ... all job fields */
}
```

**PUT /api/jobs/:id** (Employer only)
- Request: Partial Job object
- Response: Updated Job object

**DELETE /api/jobs/:id** (Employer only)
- Response: 204 No Content

#### Resume APIs

**POST /api/resumes** (User only)
- Content-Type: multipart/form-data
```
FormData:
- file: Resume file (PDF, DOC, DOCX)
- jobId: Job ID
- coverLetter: Cover letter text
```

**GET /api/resumes/my** (User only)
- Response: Array of Resume objects

**GET /api/jobs/:jobId/resumes** (Employer only)
- Response: Array of Resume objects for specific job

#### Payment APIs

**POST /api/payments** (Employer only)
```json
// Request
{
  "jobId": "job_id"
}

// Response
{
  "id": "payment_id",
  "employerId": "employer_id",
  "jobId": "job_id",
  "amount": 299,
  "currency": "THB",
  "status": "completed",
  "paymentDate": "2026-03-04T00:00:00Z",
  "paymentMethod": "credit_card"
}
```

**GET /api/payments/my** (Employer only)
- Response: Array of Payment objects

#### Admin APIs

**GET /api/admin/users** (Admin only)
- Response: Array of User objects

**GET /api/admin/payments** (Admin only)
- Response: Array of all Payment objects

**PUT /api/admin/users/:userId** (Admin only)
```json
// Request
{
  "status": "active" | "suspended" | "banned"
}

// Response
Updated User object
```

### Data Types

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'employer' | 'admin';
  avatar?: string;
  phone?: string;
  createdAt: string;
}

interface Job {
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

interface Resume {
  id: string;
  userId: string;
  jobId: string;
  fileName: string;
  fileUrl: string;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  submittedAt: string;
}

interface Payment {
  id: string;
  employerId: string;
  jobId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  paymentMethod: string;
}
```

## 🔐 Authentication

API ใช้ JWT Bearer Token authentication:

```typescript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

Token จะถูกเก็บใน localStorage หลังจาก login สำเร็จ

## 🎭 Demo Accounts

สำหรับการทดสอบ (Mock data):
- **User**: `user@demo.com` / `demo123`
- **Employer**: `employer@demo.com` / `demo123`
- **Admin**: `admin@demo.com` / `demo123`

## 📱 Responsive Design

เว็บไซต์รองรับทุกอุปกรณ์:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🎨 Design Features

- **Gen Z Style**: สีสันสดใส, Gradient, Modern UI
- **Glassmorphism**: ใช้ backdrop-blur สำหรับ effect แบบกระจก
- **Smooth Animations**: Animation ที่ลื่นไหล
- **Micro-interactions**: Hover effects, Transitions
- **Accessibility**: รองรับ keyboard navigation

## 🔧 Customization

### เปลี่ยนสี Theme
แก้ไขไฟล์ `/src/styles/theme.css`

### เพิ่ม/แก้ไข Categories
แก้ไขใน `/src/app/pages/JobsPage.tsx` และ `/src/app/pages/PostJobPage.tsx`

## 📦 File Structure

```
/src
  /app
    /components
      /dashboards
        - UserDashboard.tsx
        - EmployerDashboard.tsx
        - AdminDashboard.tsx
      /ui
        - (Radix UI components)
      - Navbar.tsx
      - JobCard.tsx
    /context
      - AuthContext.tsx
    /pages
      - HomePage.tsx
      - JobsPage.tsx
      - JobDetailPage.tsx
      - LoginPage.tsx
      - RegisterPage.tsx
      - DashboardPage.tsx
      - PostJobPage.tsx
    /services
      - api.ts (API Integration)
    - App.tsx
    - routes.tsx
  /styles
    - theme.css
    - tailwind.css
    - fonts.css
```

## 🚨 Important Notes

1. **Security**: ปรับปรุง security สำหรับ production:
   - ใช้ HTTPS
   - เพิ่ม rate limiting
   - Validate input ทั้งหมด
   - Sanitize file uploads

2. **File Upload**: ตั้งค่า max file size และ allowed types
   - Max: 5MB
   - Types: PDF, DOC, DOCX

3. **Payment**: ตอนนี้เป็น mock payment เท่านั้น
   - ต้องเชื่อมต่อกับ Payment Gateway จริง (Stripe, Omise, etc.)

4. **Database**: ต้องมี tables:
   - users
   - jobs
   - resumes
   - payments

## 🎯 Next Steps

1. สร้าง Backend API ตาม endpoints ที่กำหนด
2. ตั้งค่า Database
3. เชื่อมต่อ Payment Gateway
4. Deploy Frontend และ Backend
5. ตั้งค่า Domain และ SSL

## 📞 Support

หากมีคำถามเพิ่มเติม สามารถดู:
- `/src/app/services/api.ts` - API Service Layer
- `/src/app/context/AuthContext.tsx` - Authentication Logic
- Component files - UI Implementation

---

Built with ❤️ for Gen Z
