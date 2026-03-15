# JobCrew - User, Employer & Admin Data Models

## 👥 ระบบผู้ใช้งาน 3 ระดับ

JobCrew มีระบบผู้ใช้งาน 3 ระดับ:
1. **User (ผู้ใช้ทั่วไป)** - ผู้หางาน
2. **Employer (นายจ้าง)** - ผู้โพสต์งาน
3. **Admin (ผู้ดูแลระบบ)** - ผู้จัดการระบบ

---

## 👤 User Data Model (ผู้ใช้ทั่วไป / ผู้หางาน)

### **📋 Complete User Fields (18 Fields)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **1. userId** | String | ✅ | รหัสผู้ใช้ (Unique) | `"user001"` |
| **2. email** | String | ✅ | อีเมล (Unique) | `"john.doe@example.com"` |
| **3. password** | String (Hashed) | ✅ | รหัสผ่าน (Encrypted) | `"$2a$10$..."` |
| **4. firstName** | String | ✅ | ชื่อจริง | `"John"` |
| **5. lastName** | String | ✅ | นามสกุล | `"Doe"` |
| **6. phone** | String | ✅ | เบอร์โทรศัพท์ | `"0812345678"` |
| **7. profilePicture** | String (URL) | ❌ | URL รูปโปรไฟล์ | `"https://..."` |
| **8. dateOfBirth** | String (ISO Date) | ❌ | วันเกิด | `"1995-05-15"` |
| **9. gender** | String | ❌ | เพศ | `"male"`, `"female"`, `"other"` |
| **10. nationality** | String | ❌ | สัญชาติ | `"Thai"`, `"International"` |
| **11. location** | String | ❌ | สถานที่พำนัก | `"Bangkok"`, `"Phuket"` |
| **12. education** | String | ❌ | ระดับการศึกษา | `"Bachelor's Degree"`, `"High School"` |
| **13. experience** | String | ❌ | ประสบการณ์ทำงาน | `"Entry Level"`, `"Mid-Level"`, `"Senior"` |
| **14. skills** | Array[String] | ❌ | ทักษะ | `["Customer Service", "English", "MS Office"]` |
| **15. resume** | String (URL/Path) | ❌ | ไฟล์เรซูเม่ | `"/uploads/resume_user001.pdf"` |
| **16. registeredDate** | String (ISO Date) | ✅ | วันที่สมัคร | `"2026-03-15"` |
| **17. lastLogin** | String (ISO DateTime) | ✅ | เข้าสู่ระบบครั้งล่าสุด | `"2026-03-15T10:30:00Z"` |
| **18. status** | String | ✅ | สถานะบัญชี | `"active"`, `"inactive"`, `"suspended"` |

### **🔐 User Extended Fields (Bonus)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **emailVerified** | Boolean | ✅ | ยืนยันอีเมลแล้ว | `true`, `false` |
| **phoneVerified** | Boolean | ❌ | ยืนยันเบอร์โทรแล้ว | `true`, `false` |
| **preferredDepartments** | Array[String] | ❌ | แผนกที่สนใจ | `["Front Office", "Culinary"]` |
| **preferredLocations** | Array[String] | ❌ | สถานที่ที่สนใจ | `["Bangkok", "Phuket"]` |
| **preferredJobTypes** | Array[String] | ❌ | ประเภทงานที่สนใจ | `["full-time", "part-time"]` |
| **savedJobs** | Array[String] | ❌ | งานที่บันทึกไว้ | `["1", "5", "12"]` (Job IDs) |
| **appliedJobs** | Array[Object] | ❌ | งานที่สมัครแล้ว | `[{jobId: "1", appliedDate: "2026-03-15"}]` |
| **notifications** | Boolean | ❌ | รับการแจ้งเตือน | `true`, `false` |

### **📖 Example User Object**

```json
{
  "userId": "user001",
  "email": "somchai.hotel@gmail.com",
  "password": "$2a$10$hashed_password_here",
  "firstName": "สมชาย",
  "lastName": "ใจดี",
  "phone": "0812345678",
  "profilePicture": "https://ui-avatars.com/api/?name=Somchai&background=4f46e5&color=fff",
  "dateOfBirth": "1998-07-20",
  "gender": "male",
  "nationality": "Thai",
  "location": "Bangkok",
  "education": "Bachelor's Degree",
  "experience": "Mid-Level",
  "skills": ["Customer Service", "Front Office Operations", "English (Fluent)", "Opera PMS"],
  "resume": "/uploads/resume_user001.pdf",
  "registeredDate": "2026-01-15",
  "lastLogin": "2026-03-15T14:30:00Z",
  "status": "active",
  "emailVerified": true,
  "phoneVerified": true,
  "preferredDepartments": ["Front Office", "Guest Services"],
  "preferredLocations": ["Bangkok", "Phuket"],
  "preferredJobTypes": ["full-time"],
  "savedJobs": ["1", "5", "12", "18"],
  "appliedJobs": [
    {
      "jobId": "1",
      "appliedDate": "2026-03-10",
      "status": "pending",
      "coverLetter": "I am very interested in this position..."
    },
    {
      "jobId": "5",
      "appliedDate": "2026-03-12",
      "status": "interview",
      "coverLetter": "With 5 years of experience..."
    }
  ],
  "notifications": true
}
```

---

## 🏢 Employer Data Model (นายจ้าง / ผู้โพสต์งาน)

### **📋 Complete Employer Fields (22 Fields)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **1. employerId** | String | ✅ | รหัสนายจ้าง (Unique) | `"emp001"` |
| **2. email** | String | ✅ | อีเมล (Unique) | `"hr@grandhyatt.com"` |
| **3. password** | String (Hashed) | ✅ | รหัสผ่าน (Encrypted) | `"$2a$10$..."` |
| **4. companyName** | String | ✅ | ชื่อบริษัท/โรงแรม | `"Grand Hyatt Erawan Bangkok"` |
| **5. companyNameEN** | String | ✅ | ชื่อบริษัท (English) | `"Grand Hyatt Erawan Bangkok"` |
| **6. companyLogo** | String (URL) | ❌ | URL โลโก้บริษัท | `"https://..."` |
| **7. businessType** | String | ✅ | ประเภทธุรกิจ | `"Hotel"`, `"Resort"`, `"Restaurant"` |
| **8. location** | String | ✅ | ที่ตั้งสำนักงานใหญ่ | `"Bangkok"` |
| **9. address** | String | ✅ | ที่อยู่เต็ม | `"494 Rajdamri Road, Pathumwan, Bangkok 10330"` |
| **10. phone** | String | ✅ | เบอร์โทรศัพท์ | `"02-254-1234"` |
| **11. website** | String (URL) | ❌ | เว็บไซต์บริษัท | `"https://www.hyatt.com"` |
| **12. description** | String | ❌ | รายละเอียดบริษัท | `"โรงแรม 5 ดาวชั้นนำ..."` |
| **13. companySize** | String | ❌ | ขนาดบริษัท | `"1-50"`, `"51-200"`, `"201-500"`, `"500+"` |
| **14. taxId** | String | ✅ | เลขประจำตัวผู้เสียภาษี | `"0123456789012"` |
| **15. contactPerson** | String | ✅ | ผู้ติดต่อ | `"คุณสมหญิง (HR Manager)"` |
| **16. contactEmail** | String | ✅ | อีเมลผู้ติดต่อ | `"somying@grandhyatt.com"` |
| **17. contactPhone** | String | ✅ | เบอร์ผู้ติดต่อ | `"081-234-5678"` |
| **18. registeredDate** | String (ISO Date) | ✅ | วันที่สมัคร | `"2026-01-10"` |
| **19. lastLogin** | String (ISO DateTime) | ✅ | เข้าสู่ระบบครั้งล่าสุด | `"2026-03-15T09:00:00Z"` |
| **20. status** | String | ✅ | สถานะบัญชี | `"active"`, `"inactive"`, `"suspended"`, `"pending"` |
| **21. verified** | Boolean | ✅ | บัญชียืนยันแล้ว | `true`, `false` |
| **22. subscriptionPlan** | String | ✅ | แพ็กเกจสมาชิก | `"free"`, `"basic"`, `"premium"`, `"enterprise"` |

### **🔐 Employer Extended Fields (Bonus)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **emailVerified** | Boolean | ✅ | ยืนยันอีเมลแล้ว | `true`, `false` |
| **documentVerified** | Boolean | ❌ | เอกสารยืนยันแล้ว | `true`, `false` |
| **activeJobs** | Number | ✅ | จำนวนงานที่เปิดรับสมัคร | `12` |
| **totalJobs** | Number | ✅ | จำนวนงานทั้งหมดที่โพสต์ | `45` |
| **totalApplicants** | Number | ✅ | จำนวนผู้สมัครทั้งหมด | `342` |
| **credits** | Number | ❌ | เครดิตคงเหลือ | `50` |
| **subscriptionExpiry** | String (ISO Date) | ❌ | วันหมดอายุแพ็กเกจ | `"2026-12-31"` |
| **paymentHistory** | Array[Object] | ❌ | ประวัติการชำระเงิน | `[{date: "2026-01-10", amount: 5000}]` |
| **socialMedia** | Object | ❌ | โซเชียลมีเดีย | `{facebook: "...", linkedin: "..."}` |

### **📖 Example Employer Object**

```json
{
  "employerId": "emp001",
  "email": "hr@grandhyatt.com",
  "password": "$2a$10$hashed_password_here",
  "companyName": "Grand Hyatt Erawan Bangkok",
  "companyNameEN": "Grand Hyatt Erawan Bangkok",
  "companyLogo": "https://ui-avatars.com/api/?name=Grand+Hyatt&background=0D4C92&color=fff&size=200",
  "businessType": "Hotel",
  "location": "Bangkok",
  "address": "494 Rajdamri Road, Pathumwan, Bangkok 10330",
  "phone": "02-254-1234",
  "website": "https://www.hyatt.com",
  "description": "โรงแรม 5 ดาวชั้นนำใจกลางกรุงเทพฯ มาตรฐานระดับโลก",
  "companySize": "500+",
  "taxId": "0123456789012",
  "contactPerson": "คุณสมหญิง (HR Manager)",
  "contactEmail": "somying@grandhyatt.com",
  "contactPhone": "081-234-5678",
  "registeredDate": "2026-01-10",
  "lastLogin": "2026-03-15T09:00:00Z",
  "status": "active",
  "verified": true,
  "subscriptionPlan": "premium",
  "emailVerified": true,
  "documentVerified": true,
  "activeJobs": 12,
  "totalJobs": 45,
  "totalApplicants": 342,
  "credits": 50,
  "subscriptionExpiry": "2026-12-31",
  "paymentHistory": [
    {
      "invoiceId": "INV-2026-001",
      "date": "2026-01-10",
      "amount": 5000,
      "plan": "premium",
      "duration": "12 months",
      "status": "paid"
    }
  ],
  "socialMedia": {
    "facebook": "https://facebook.com/grandhyattbkk",
    "linkedin": "https://linkedin.com/company/hyatt",
    "instagram": "https://instagram.com/grandhyattbkk"
  }
}
```

---

## 🛡️ Admin Data Model (ผู้ดูแลระบบ)

### **📋 Complete Admin Fields (15 Fields)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **1. adminId** | String | ✅ | รหัสแอดมิน (Unique) | `"admin001"` |
| **2. email** | String | ✅ | อีเมล (Unique) | `"admin@jobcrew.com"` |
| **3. password** | String (Hashed) | ✅ | รหัสผ่าน (Encrypted) | `"$2a$10$..."` |
| **4. firstName** | String | ✅ | ชื่อจริง | `"Admin"` |
| **5. lastName** | String | ✅ | นามสกุล | `"System"` |
| **6. phone** | String | ✅ | เบอร์โทรศัพท์ | `"02-123-4567"` |
| **7. role** | String | ✅ | บทบาท | `"super_admin"`, `"admin"`, `"moderator"` |
| **8. permissions** | Array[String] | ✅ | สิทธิ์การเข้าถึง | `["manage_users", "manage_jobs", "manage_payments"]` |
| **9. profilePicture** | String (URL) | ❌ | URL รูปโปรไฟล์ | `"https://..."` |
| **10. department** | String | ❌ | แผนกที่รับผิดชอบ | `"Operations"`, `"Customer Support"` |
| **11. registeredDate** | String (ISO Date) | ✅ | วันที่สร้างบัญชี | `"2025-01-01"` |
| **12. lastLogin** | String (ISO DateTime) | ✅ | เข้าสู่ระบบครั้งล่าสุด | `"2026-03-15T08:00:00Z"` |
| **13. status** | String | ✅ | สถานะบัญชี | `"active"`, `"inactive"` |
| **14. twoFactorEnabled** | Boolean | ❌ | เปิดใช้ 2FA | `true`, `false` |
| **15. ipWhitelist** | Array[String] | ❌ | IP ที่อนุญาต | `["192.168.1.1", "10.0.0.1"]` |

### **🔐 Admin Extended Fields (Bonus)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **activityLog** | Array[Object] | ❌ | ประวัติการใช้งาน | `[{action: "delete_job", timestamp: "..."}]` |
| **loginHistory** | Array[Object] | ❌ | ประวัติการเข้าสู่ระบบ | `[{ip: "192.168.1.1", timestamp: "..."}]` |
| **canApproveJobs** | Boolean | ✅ | อนุมัติงานได้ | `true`, `false` |
| **canManagePayments** | Boolean | ✅ | จัดการการชำระเงินได้ | `true`, `false` |
| **canBanUsers** | Boolean | ✅ | ระงับผู้ใช้ได้ | `true`, `false` |
| **createdBy** | String | ❌ | สร้างโดย Admin ID | `"admin001"` |

### **📖 Example Admin Object**

```json
{
  "adminId": "admin001",
  "email": "admin@jobcrew.com",
  "password": "$2a$10$hashed_password_here",
  "firstName": "Somsak",
  "lastName": "Administrator",
  "phone": "02-123-4567",
  "role": "super_admin",
  "permissions": [
    "manage_users",
    "manage_employers",
    "manage_jobs",
    "manage_payments",
    "view_analytics",
    "manage_admins",
    "system_settings"
  ],
  "profilePicture": "https://ui-avatars.com/api/?name=Admin&background=dc2626&color=fff",
  "department": "Operations",
  "registeredDate": "2025-01-01",
  "lastLogin": "2026-03-15T08:00:00Z",
  "status": "active",
  "twoFactorEnabled": true,
  "ipWhitelist": [
    "192.168.1.1",
    "10.0.0.1"
  ],
  "activityLog": [
    {
      "action": "delete_job",
      "jobId": "15",
      "reason": "Spam content",
      "timestamp": "2026-03-14T15:30:00Z"
    },
    {
      "action": "suspend_employer",
      "employerId": "emp042",
      "reason": "Violation of terms",
      "timestamp": "2026-03-13T10:00:00Z"
    }
  ],
  "loginHistory": [
    {
      "ip": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2026-03-15T08:00:00Z",
      "success": true
    }
  ],
  "canApproveJobs": true,
  "canManagePayments": true,
  "canBanUsers": true,
  "createdBy": "system"
}
```

---

## 📊 User Status Values (ทุกระดับ)

| Value | Description | Available For |
|-------|-------------|---------------|
| `active` | บัญชีใช้งานได้ปกติ | User, Employer, Admin |
| `inactive` | บัญชีไม่ได้ใช้งาน (ยังไม่ถูกลบ) | User, Employer, Admin |
| `suspended` | ระงับการใช้งานชั่วคราว | User, Employer |
| `pending` | รอการอนุมัติ (ใช้กับ Employer) | Employer |
| `banned` | ถูกระงับถาวร | User, Employer |

---

## 🔐 Admin Roles & Permissions

### **Admin Roles**

| Role | Description | Access Level |
|------|-------------|--------------|
| `super_admin` | ผู้ดูแลระบบสูงสุด | Full Access (100%) |
| `admin` | ผู้ดูแลระบบ | Most Features (80%) |
| `moderator` | ผู้ดูแลเนื้อหา | Content Management (50%) |
| `support` | ฝ่ายสนับสนุน | View Only + Customer Support (30%) |

### **Permission List**

```javascript
const PERMISSIONS = {
  // User Management
  "view_users": "ดูรายการผู้ใช้",
  "edit_users": "แก้ไขข้อมูลผู้ใช้",
  "delete_users": "ลบผู้ใช้",
  "suspend_users": "ระงับผู้ใช้",
  
  // Employer Management
  "view_employers": "ดูรายการนายจ้าง",
  "approve_employers": "อนุมัตินายจ้าง",
  "edit_employers": "แก้ไขข้อมูลนายจ้าง",
  "suspend_employers": "ระงับนายจ้าง",
  
  // Job Management
  "view_jobs": "ดูรายการงาน",
  "approve_jobs": "อนุมัติงาน",
  "edit_jobs": "แก้ไขงาน",
  "delete_jobs": "ลบงาน",
  
  // Payment Management
  "view_payments": "ดูการชำระเงิน",
  "manage_payments": "จัดการการชำระเงิน",
  "refund_payments": "คืนเงิน",
  
  // Analytics & Reports
  "view_analytics": "ดูรายงานและสถิติ",
  "export_data": "ส่งออกข้อมูล",
  
  // System Settings
  "system_settings": "ตั้งค่าระบบ",
  "manage_admins": "จัดการแอดมิน",
  "view_logs": "ดูประวัติการใช้งาน"
};
```

---

## 🔄 Job Application Data Model

### **Application Fields**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **applicationId** | String | ✅ | รหัสใบสมัคร | `"app001"` |
| **jobId** | String | ✅ | รหัสงานที่สมัคร | `"1"` |
| **userId** | String | ✅ | รหัสผู้สมัคร | `"user001"` |
| **employerId** | String | ✅ | รหัสนายจ้าง | `"emp001"` |
| **appliedDate** | String (ISO DateTime) | ✅ | วันที่สมัคร | `"2026-03-15T10:00:00Z"` |
| **status** | String | ✅ | สถานะใบสมัคร | `"pending"`, `"interview"`, `"accepted"`, `"rejected"` |
| **coverLetter** | String | ❌ | จดหมายสมัครงาน | `"I am interested..."` |
| **resumeUrl** | String (URL) | ✅ | URL เรซูเม่ | `"/uploads/resume.pdf"` |
| **notes** | String | ❌ | หมายเหตุจากนายจ้าง | `"Good candidate"` |
| **rating** | Number | ❌ | คะแนนประเมิน (1-5) | `4` |
| **interviewDate** | String (ISO DateTime) | ❌ | วันสัมภาษณ์ | `"2026-03-20T14:00:00Z"` |

### **Application Status Values**

| Value | Display | Description |
|-------|---------|-------------|
| `pending` | รอพิจารณา | ส่งใบสมัครแล้ว รอนายจ้างพิจารณา |
| `reviewing` | กำลังพิจารณา | นายจ้างกำลังพิจารณา |
| `interview` | นัดสัมภาษณ์ | ได้รับการนัดสัมภาษณ์ |
| `accepted` | ผ่านการคัดเลือก | ได้รับการคัดเลือก |
| `rejected` | ไม่ผ่านการคัดเลือก | ไม่ผ่านการคัดเลือก |
| `withdrawn` | ถอนใบสมัคร | ผู้สมัครถอนตัว |

---

## 🔄 Backend Integration

### **API Endpoints (.NET 8 MVC)**

#### User Endpoints
```
POST   /api/users/register        - Register new user
POST   /api/users/login           - Login
GET    /api/users/{id}            - Get user profile
PUT    /api/users/{id}            - Update user profile
DELETE /api/users/{id}            - Delete user account
GET    /api/users/{id}/applications - Get user's applications
POST   /api/users/{id}/apply      - Apply for a job
```

#### Employer Endpoints
```
POST   /api/employers/register    - Register new employer
POST   /api/employers/login       - Login
GET    /api/employers/{id}        - Get employer profile
PUT    /api/employers/{id}        - Update employer profile
GET    /api/employers/{id}/jobs   - Get employer's jobs
POST   /api/employers/{id}/jobs   - Post new job
PUT    /api/employers/{id}/jobs/{jobId} - Update job
DELETE /api/employers/{id}/jobs/{jobId} - Delete job
GET    /api/employers/{id}/applicants - Get all applicants
```

#### Admin Endpoints
```
POST   /api/admin/login           - Admin login
GET    /api/admin/users           - Get all users (with filters)
GET    /api/admin/employers       - Get all employers
GET    /api/admin/jobs            - Get all jobs
PUT    /api/admin/users/{id}/suspend - Suspend user
PUT    /api/admin/employers/{id}/approve - Approve employer
DELETE /api/admin/jobs/{id}       - Delete job
GET    /api/admin/analytics       - Get system analytics
GET    /api/admin/payments        - Get payment history
```

---

## 📝 Notes

1. **Password Storage**: ใช้ bcrypt หรือ Argon2 สำหรับ hash passwords
2. **Date Format**: ใช้ ISO 8601 format (`YYYY-MM-DD` หรือ `YYYY-MM-DDTHH:mm:ssZ`)
3. **Email Uniqueness**: Email ต้อง unique ในแต่ละ user type
4. **File Upload**: Resume และ Profile Picture ควรจำกัดขนาดและประเภทไฟล์
5. **Verification**: Employer ควรผ่านการยืนยันก่อนโพสต์งาน
6. **Security**: Admin ควรใช้ Two-Factor Authentication (2FA)

---

## 🔒 Security Best Practices

1. ✅ **Password Requirements**:
   - ความยาวอย่างน้อย 8 ตัวอักษร
   - มีตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ

2. ✅ **JWT Token**: ใช้สำหรับ Authentication
   - Access Token: 15 นาที
   - Refresh Token: 7 วัน

3. ✅ **Rate Limiting**: จำกัดการเรียก API
   - Login: 5 ครั้ง/นาที
   - Register: 3 ครั้ง/ชั่วโมง

4. ✅ **Email Verification**: ต้องยืนยันอีเมลก่อนใช้งาน

5. ✅ **HTTPS Only**: ทุก API ต้องใช้ HTTPS

---

**Version**: 1.0.0  
**Last Updated**: March 15, 2026  
**Compatible with**: Job Data Model v1.0.0
