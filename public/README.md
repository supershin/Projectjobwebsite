# JobHub - Modern Job Portal

เว็บไซต์สมัครงานสไตล์ Gen Z ที่ทันสมัย พัฒนาด้วย HTML, CSS, Bootstrap 5 และ jQuery

## 📁 โครงสร้างไฟล์

```
public/
├── index.html              # หน้าแรก
├── jobs.html               # หน้าค้นหางาน
├── job-detail.html         # หน้ารายละเอียดงาน
├── login.html              # หน้าเข้าสู่ระบบ
├── register.html           # หน้าสมัครสมาชิก
├── dashboard.html          # หน้า Dashboard (3 user roles)
├── post-job.html           # หน้าประกาศงาน (สำหรับนายจ้าง)
├── css/
│   └── style.css           # CSS หลัก (Gen Z Theme)
├── js/
│   ├── main.js             # JavaScript หลัก (API, Utils)
│   ├── home.js             # JavaScript หน้าแรก
│   ├── jobs.js             # JavaScript หน้าค้นหางาน
│   ├── job-detail.js       # JavaScript หน้ารายละเอียด
│   ├── auth.js             # JavaScript Authentication
│   ├── dashboard.js        # JavaScript Dashboard
│   └── post-job.js         # JavaScript ประกาศงาน
└── data/
    └── jobs.json           # Mock data งาน
```

## 🚀 ฟีเจอร์หลัก

### 1. ระบบ 3 User Roles
- **User (ผู้หางาน)**: ค้นหางาน, สมัครงาน, ดูสถานะใบสมัคร, บันทึกงาน
- **Employer (นายจ้าง)**: ประกาศงาน, ดูใบสมัคร, จัดการงาน, ชำระเงิน
- **Admin (ผู้ดูแลระบบ)**: จัดการผู้ใช้, งานทั้งหมด, ดูรายงาน, จัดการการชำระเงิน

### 2. ระบบจัดการงาน
- ค้นหางานด้วยฟิลเตอร์หลายแบบ (หมวดหมู่, ประเภท, สถานที่, เงินเดือน)
- แสดงรายละเอียดงานแบบละเอียด
- ระบบสมัครงานพร้อมอัพโหลด Resume
- แชร์งานผ่าน Social Media

### 3. ระบบประกาศงาน (สำหรับนายจ้าง)
- ฟอร์มประกาศงานที่ครบถ้วน
- ระบบชำระเงิน 299 บาท/ตำแหน่ง
- บันทึกแบบร่างก่อนประกาศ
- จัดการงานที่ประกาศ

### 4. Dashboard แยกตาม Role
- User Dashboard: ดูใบสมัคร, งานที่บันทึก, สถิติ
- Employer Dashboard: จัดการงาน, ดูผู้สมัคร, สถิติการดู
- Admin Dashboard: สถิติทั้งระบบ, จัดการผู้ใช้, รายงาน

### 5. Responsive Design
- รองรับทุกอุปกรณ์ (Mobile, Tablet, Desktop)
- Bootstrap 5 Grid System
- Mobile-First Approach

## 🎨 Design Features

### Gen Z Theme
- สีสันสดใส (Purple Gradient)
- Typography ทันสมัย (Inter Font)
- Micro-interactions
- Glass-morphism Effects
- Smooth Animations

### UI Components
- Modern Cards
- Gradient Buttons
- Custom Badges
- Responsive Navigation
- Modal Dialogs
- Form Validations

## 💻 การติดตั้ง

### วิธีที่ 1: ใช้กับ .NET 8 MVC

1. คัดลอกโฟลเดอร์ `public/` ไปที่โปรเจค .NET ของคุณ:
```
YourProject/
├── wwwroot/
│   ├── index.html
│   ├── jobs.html
│   ├── ...
│   ├── css/
│   ├── js/
│   └── data/
```

2. เปิดไฟล์ `js/main.js` และแก้ไข API_BASE_URL:
```javascript
const API_BASE_URL = '/api'; // หรือ URL API ของคุณ
```

3. สร้าง API Controllers ใน .NET ตาม API Documentation (ดูด้านล่าง)

### วิธีที่ 2: ทดสอบแบบ Static Files

1. เปิดไฟล์ `index.html` ด้วย Live Server หรือ Web Server
2. ระบบจะใช้ Mock Data จากไฟล์ `data/jobs.json`

## 🔑 บัญชีทดสอบ (Demo Accounts)

สามารถใช้บัญชีเหล่านี้เพื่อทดสอบระบบ:

| ประเภท | Email | Password | คำอธิบาย |
|--------|-------|----------|----------|
| User | user@demo.com | demo123 | ผู้หางานทั่วไป |
| Employer | employer@demo.com | demo123 | นายจ้าง/บริษัท |
| Admin | admin@demo.com | demo123 | ผู้ดูแลระบบ |

## 📡 API Endpoints (.NET MVC)

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/me
```

### Jobs
```
GET    /api/jobs              # ดึงงานทั้งหมด (รองรับ filters)
GET    /api/jobs/{id}         # ดึงงานตาม ID
POST   /api/jobs              # สร้างงานใหม่
PUT    /api/jobs/{id}         # แก้ไขงาน
DELETE /api/jobs/{id}         # ลบงาน
GET    /api/jobs/my           # งานของ Employer
```

### Applications (Resume)
```
GET  /api/applications/my           # ใบสมัครของ User
POST /api/applications              # สมัครงาน
GET  /api/applications/job/{jobId}  # ใบสมัครของงานนั้นๆ
PUT  /api/applications/{id}/status  # อัพเดทสถานะใบสมัคร
```

### Payments
```
GET  /api/payments/my          # การชำระเงินของ Employer
POST /api/payments/process     # ชำระเงิน
GET  /api/payments/all         # ทั้งหมด (Admin)
```

### Admin
```
GET  /api/admin/users          # ผู้ใช้ทั้งหมด
PUT  /api/admin/users/{id}     # แก้ไขผู้ใช้
GET  /api/admin/stats          # สถิติระบบ
```

## 🗂️ JSON Data Structure

### Job Object
```json
{
  "id": "string",
  "title": "string",
  "company": "string",
  "companyLogo": "string (URL)",
  "location": "string",
  "type": "full-time|part-time|contract|freelance|internship",
  "category": "string",
  "salary": "string",
  "description": "string",
  "requirements": ["string"],
  "benefits": ["string"],
  "employerId": "string",
  "employerName": "string",
  "postedDate": "ISO 8601 date",
  "expiryDate": "ISO 8601 date",
  "status": "active|closed|draft",
  "applicantsCount": number
}
```

### User Object
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "role": "user|employer|admin",
  "avatar": "string (URL)",
  "createdAt": "ISO 8601 date"
}
```

### Application Object
```json
{
  "id": "string",
  "userId": "string",
  "jobId": "string",
  "fileName": "string",
  "fileUrl": "string",
  "coverLetter": "string",
  "status": "pending|reviewed|accepted|rejected",
  "submittedAt": "ISO 8601 date"
}
```

### Payment Object
```json
{
  "id": "string",
  "employerId": "string",
  "jobId": "string",
  "amount": number,
  "currency": "THB",
  "status": "pending|completed|failed",
  "paymentDate": "ISO 8601 date",
  "paymentMethod": "string"
}
```

## 🔧 การปรับแต่ง

### เปลี่ยนสี Theme
แก้ไขไฟล์ `css/style.css`:
```css
:root {
    --primary-color: #6366f1;      /* สีหลัก */
    --secondary-color: #ec4899;     /* สีรอง */
    --accent-color: #f59e0b;        /* สีเน้น */
}
```

### เปลี่ยน Logo และชื่อ
แก้ไขในทุกไฟล์ HTML:
```html
<a class="navbar-brand fw-bold" href="index.html">
    <i class="bi bi-briefcase-fill"></i> ชื่อเว็บไซต์ของคุณ
</a>
```

### เพิ่มหมวดหมู่งาน
แก้ไขในไฟล์:
- `index.html` (Categories Section)
- `jobs.html` (Category Filter)
- `post-job.html` (Category Select)

## 📱 การทำงานของแต่ละหน้า

### 1. index.html (หน้าแรก)
- Hero Section พร้อมช่องค้นหา
- แสดงหมวดหมู่ยอดนิยม
- แสดงงานแนะนำ 6 อันดับแรก
- ฟีเจอร์ของเว็บไซต์
- Call-to-Action

### 2. jobs.html (หน้าค้นหางาน)
- Sidebar กรองงาน
- แสดงงานทั้งหมดแบบ Card
- Pagination
- Sort (ใหม่ล่าสุด, เงินเดือน)

### 3. job-detail.html (หน้ารายละเอียด)
- แสดงข้อมูลงานแบบละเอียด
- ปุ่มสมัครงาน
- ปุ่มบันทึกงาน
- ปุ่มแชร์ Social Media
- Sidebar ข้อมูลงาน

### 4. login.html (เข้าสู่ระบบ)
- ฟอร์ม Login
- จำฉันไว้
- Social Login (UI)
- ลิงก์ไปหน้าสมัครสมาชิก

### 5. register.html (สมัครสมาชิก)
- เลือกประเภทบัญชี (User/Employer)
- ฟอร์มสมัครสมาชิก
- ยอมรับเงื่อนไข
- Social Register (UI)

### 6. dashboard.html (Dashboard)
- แสดงเนื้อหาตาม Role
- Sidebar Menu
- Stats Cards
- ตารางข้อมูล
- Charts (Chart.js)

### 7. post-job.html (ประกาศงาน)
- ฟอร์มประกาศงาน
- เพิ่ม/ลบคุณสมบัติ
- เพิ่ม/ลบสวัสดิการ
- Modal ชำระเงิน
- บันทึกแบบร่าง

## 📦 Dependencies

### CSS Frameworks
- Bootstrap 5.3.0
- Bootstrap Icons 1.11.0
- Google Fonts (Inter)

### JavaScript Libraries
- jQuery 3.7.0
- Bootstrap 5.3.0 (JS Bundle)
- Chart.js (สำหรับ Dashboard)

ทั้งหมดโหลดจาก CDN ไม่ต้องติดตั้งเพิ่ม

## 🌐 Browser Support
- Chrome (แนะนำ)
- Firefox
- Safari
- Edge
- Opera

## 📄 License
สามารถนำไปใช้และปรับแต่งได้ตามต้องการ

## 👨‍💻 สำหรับนักพัฒนา .NET

### การเชื่อมต่อกับ .NET 8 MVC

1. **สร้าง API Controllers** ตาม endpoints ด้านบน
2. **ใช้ Entity Framework Core** สำหรับจัดการฐานข้อมูล
3. **ใช้ JWT Authentication** สำหรับระบบ Login
4. **อัพโหลดไฟล์** Resume ไปยัง Azure Blob Storage หรือ Local Storage
5. **Payment Gateway** เชื่อมต่อกับ PromptPay, Credit Card Gateway

### ตัวอย่าง Controller (.NET)

```csharp
[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetJobs(
        [FromQuery] string? category,
        [FromQuery] string? type,
        [FromQuery] string? search)
    {
        // Your logic here
        return Ok(jobs);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetJobById(string id)
    {
        // Your logic here
        return Ok(job);
    }
    
    [HttpPost]
    [Authorize(Roles = "Employer")]
    public async Task<IActionResult> CreateJob([FromBody] JobDto job)
    {
        // Your logic here
        return Ok(createdJob);
    }
}
```

## 🆘 การแก้ปัญหา

### ปัญหา: ไม่สามารถโหลด Mock Data ได้
**วิธีแก้**: ตรวจสอบว่าไฟล์ `data/jobs.json` อยู่ในตำแหน่งที่ถูกต้อง และเปิดเว็บผ่าน Web Server (ไม่ใช่เปิดไฟล์โดยตรง)

### ปัญหา: หลังจาก Login แล้วไม่ redirect
**วิธีแก้**: ตรวจสอบ Console (F12) เพื่อดู error และตรวจสอบว่า localStorage ทำงานปกติ

### ปัญหา: รูปภาพไม่แสดง
**วิธีแก้**: รูปภาพโหลดจาก Unsplash API อาจช้า ใน production ควรใช้รูปจาก server ของคุณเอง

## 📧 ติดต่อสอบถาม

หากมีคำถามหรือต้องการความช่วยเหลือ สามารถติดต่อได้ที่ทีมพัฒนา

---

**JobHub** - Modern Job Portal for Gen Z 🚀
