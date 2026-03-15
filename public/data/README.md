# 📚 JobCrew Data Models Documentation

## 🎯 Overview

ยินดีต้อนรับสู่เอกสาร Data Models ของระบบ **JobCrew** - แพลตฟอร์มหางานออนไลน์สำหรับอุตสาหกรรมโรงแรมและการบริการ

ระบบ JobCrew ประกอบด้วย 3 ระดับผู้ใช้งาน:
- 👤 **User** - ผู้ใช้ทั่วไป (ผู้หางาน)
- 🏢 **Employer** - นายจ้าง (ผู้โพสต์งาน)
- 🛡️ **Admin** - ผู้ดูแลระบบ

---

## 📂 File Structure

```
/public/data/
├── README.md                    # คู่มือหลัก (ไฟล์นี้)
├── DATA_MODEL.md               # Job Data Model (20 fields)
├── USER_MODELS.md              # User, Employer & Admin Models
├── PAYMENT_SUBSCRIPTION.md     # Payment & Subscription Plans
└── jobs.json                   # ข้อมูลตัวอย่าง 34 งาน
```

---

## 📖 Documentation Index

### 1️⃣ **[DATA_MODEL.md](./DATA_MODEL.md)** - Job Data Model

**หัวข้อที่ครอบคลุม:**
- ✅ Complete Job Data Model (20 Fields)
- ✅ Core Fields (1-10) และ Additional Fields (11-20)
- ✅ Extended Fields (Bonus)
- ✅ Location Values (7 เมืองท่องเที่ยว)
- ✅ Department Values (10 แผนก)
- ✅ Job Type Values (3 ประเภท: Full-Time, Part-Time, Internship)
- ✅ Status Values (active, closed, expired)
- ✅ Priority Values (high, medium, low)
- ✅ Experience Level Values (Entry Level → Executive)
- ✅ Filter Quick Reference
- ✅ Backend API Integration

**ใช้สำหรับ:**
- ออกแบบ Database Schema สำหรับ Jobs Table
- สร้าง API Endpoints (.NET 8 MVC)
- ตรวจสอบความถูกต้องของข้อมูล Frontend
- Reference สำหรับการพัฒนา

---

### 2️⃣ **[USER_MODELS.md](./USER_MODELS.md)** - User, Employer & Admin Models

**หัวข้อที่ครอบคลุม:**

#### 👤 User Data Model (18 Fields)
- ข้อมูลพื้นฐาน: userId, email, password, firstName, lastName, phone
- ข้อมูลเพิ่มเติม: profilePicture, dateOfBirth, gender, nationality, location
- การศึกษาและประสบการณ์: education, experience, skills, resume
- Extended Fields: savedJobs, appliedJobs, preferredDepartments, notifications

#### 🏢 Employer Data Model (22 Fields)
- ข้อมูลพื้นฐาน: employerId, email, password, companyName, companyLogo
- ข้อมูลธุรกิจ: businessType, location, address, phone, website, taxId
- ข้อมูลการติดต่อ: contactPerson, contactEmail, contactPhone
- สมาชิกและสถานะ: subscriptionPlan, verified, status
- Extended Fields: activeJobs, totalApplicants, credits, paymentHistory

#### 🛡️ Admin Data Model (15 Fields)
- ข้อมูลพื้นฐาน: adminId, email, password, firstName, lastName
- บทบาทและสิทธิ์: role, permissions (super_admin, admin, moderator, support)
- ความปลอดภัย: twoFactorEnabled, ipWhitelist
- Extended Fields: activityLog, loginHistory, permissions management

#### 📋 Job Application Data Model
- applicationId, jobId, userId, employerId
- Status: pending, reviewing, interview, accepted, rejected, withdrawn
- coverLetter, resumeUrl, interviewDate, rating

**ใช้สำหรับ:**
- ออกแบบ Database Schema สำหรับ Users, Employers, Admins Tables
- สร้าง Authentication & Authorization System
- จัดการ User Permissions และ Roles
- Reference สำหรับ Registration และ Login Forms

---

### 3️⃣ **[PAYMENT_SUBSCRIPTION.md](./PAYMENT_SUBSCRIPTION.md)** - Payment & Subscription

**หัวข้อที่ครอบคลุม:**

#### 📦 Subscription Plans (4 แพ็กเกจ)
| Plan | Monthly | Yearly | Job Posts | Features |
|------|---------|--------|-----------|----------|
| **Free** | ฟรี | ฟรี | 1/เดือน | Basic |
| **Basic** | 999฿ | 9,990฿ | 5/เดือน | Standard |
| **Premium** | 2,499฿ | 24,990฿ | 20/เดือน | Advanced + Priority Support |
| **Enterprise** | 4,999฿ | 49,990฿ | Unlimited | Full + VIP Support |

#### 💳 Payment Data Model
- paymentId, invoiceId, employerId, planId
- amount, vat, totalAmount, currency (THB)
- paymentMethod: credit_card, bank_transfer, promptpay, truemoney, linepay
- status: pending, paid, failed, refunded
- subscriptionStart, subscriptionEnd, autoRenew

#### 🧾 Invoice Data Model
- invoiceId, taxId, address, items
- subtotal, vat, discount, total
- issueDate, dueDate, pdfUrl

#### 💰 Credit System
- โพสต์งาน 1 ตำแหน่ง = 10 credits (299฿)
- Featured Job (30 วัน) = 5 credits (149฿)
- Urgent Tag (7 วัน) = 3 credits (89฿)
- Credit Packages: 50, 100, 250, 500 credits

#### 🎁 Promotions & Discounts
- Promo Code Data Model
- Discount Types: percentage, fixed, trial, bonus_credits

**ใช้สำหรับ:**
- ออกแบบ Payment Gateway Integration (Omise, 2C2P, Stripe)
- สร้าง Subscription Management System
- จัดการ Credits และ Invoices
- ตั้งค่า Promotion Campaigns

---

### 4️⃣ **[jobs.json](./jobs.json)** - Sample Data

**ข้อมูลตัวอย่างงาน 34 ตำแหน่ง:**

| จำนวน | ประเภท | รายละเอียด |
|-------|--------|-----------|
| 29 งาน | Full-Time | งานประจำ 85.3% |
| 1 งาน | Part-Time | งานพาร์ทไทม์ 2.9% |
| 4 งาน | Internship | ฝึกงาน 11.8% |

**ครอบคลุมแผนกต่างๆ:**
- Front Office (4 งาน)
- Housekeeping (2 งาน)
- Engineering (2 งาน)
- Food & Beverage (4 งาน)
- Culinary (5 งาน)
- Human Resources (1 งาน)
- Sales & Marketing (2 งาน)
- Revenue & Reservation (2 งาน)
- Finance & Accounting (2 งาน)
- Hotel Management (2 งาน)
- Guest Services (3 งาน)
- Security (1 งาน)
- Spa & Wellness (1 งาน)
- Internships (4 งาน)

**ใช้สำหรับ:**
- Development และ Testing
- Demo ระบบ Frontend
- Mock Data สำหรับ API
- ทดสอบ Filter และ Search Functions

---

## 🔄 Data Model Relationships

### Relationship Diagram

```
┌─────────────┐
│    User     │───────┐
│  (ผู้หางาน)  │       │
└─────────────┘       │
                      │
                      ▼
                ┌──────────────┐
                │ Application  │
                │  (ใบสมัครงาน) │
                └──────────────┘
                      │
                      │
┌─────────────┐       │
│  Employer   │───────┤
│  (นายจ้าง)   │       │
└─────────────┘       │
      │               │
      │               ▼
      │         ┌──────────┐
      │         │   Job    │
      │         │  (งาน)   │
      │         └──────────┘
      │
      ▼
┌──────────────┐
│   Payment    │
│ Subscription │
└──────────────┘

┌─────────────┐
│    Admin    │──────► ทุก Table (Full Access)
│ (ผู้ดูแลระบบ) │
└─────────────┘
```

### Key Relationships:

1. **User → Application → Job**
   - User สมัครงาน (Application) สำหรับ Job
   - 1 User สามารถสมัครหลาย Jobs
   - 1 Job มีหลาย Applications

2. **Employer → Job**
   - Employer โพสต์ Jobs
   - 1 Employer มีหลาย Jobs
   - 1 Job เป็นของ 1 Employer

3. **Employer → Payment/Subscription**
   - Employer ชำระเงินสำหรับ Subscription Plans
   - 1 Employer มี 1 Active Subscription
   - 1 Employer มีหลาย Payment Transactions

4. **Admin → All**
   - Admin จัดการทุก Entity
   - View, Edit, Delete, Approve, Suspend

---

## 🔧 Technology Stack

### Backend (.NET 8 MVC)

**Recommended Database:**
- 🗄️ **SQL Server** (Primary)
- 🗄️ **PostgreSQL** (Alternative)
- 🗄️ **MySQL** (Alternative)

**Recommended Packages:**
```csharp
// Entity Framework Core
Microsoft.EntityFrameworkCore
Microsoft.EntityFrameworkCore.SqlServer

// Authentication
Microsoft.AspNetCore.Authentication.JwtBearer
System.IdentityModel.Tokens.Jwt

// Password Hashing
BCrypt.Net-Next

// Validation
FluentValidation.AspNetCore

// Payment Gateway
Omise.Net (สำหรับตลาดไทย)
```

### Frontend (HTML/CSS/jQuery)

**Current Stack:**
- HTML5
- CSS3 + Tailwind-like utilities
- jQuery 3.7.0
- Bootstrap 5.3.0

**Data Files:**
- jobs.json (Sample Data)
- localStorage (Client-side storage)

---

## 📝 Implementation Checklist

### Phase 1: Database Setup ✅
- [ ] สร้าง Database Schema ตาม DATA_MODEL.md
- [ ] สร้าง Tables: Users, Employers, Admins, Jobs, Applications
- [ ] สร้าง Tables: Payments, Subscriptions, Invoices
- [ ] สร้าง Indexes สำหรับ Performance
- [ ] สร้าง Foreign Keys และ Relationships

### Phase 2: Backend API ⏳
- [ ] สร้าง Models/Entities ตาม Data Models
- [ ] สร้าง Authentication & Authorization
- [ ] สร้าง Job CRUD APIs
- [ ] สร้าง User/Employer Registration & Login
- [ ] สร้าง Application Management APIs
- [ ] สร้าง Payment Integration (Omise/2C2P)
- [ ] สร้าง Admin Dashboard APIs

### Phase 3: Frontend Integration ⏳
- [ ] เชื่อมต่อ Frontend กับ Backend APIs
- [ ] แทนที่ jobs.json ด้วย API Calls
- [ ] สร้าง User Authentication Flow
- [ ] สร้าง Employer Dashboard
- [ ] สร้าง Payment Integration UI
- [ ] สร้าง Admin Dashboard

### Phase 4: Testing & Deployment 🔜
- [ ] Unit Tests
- [ ] Integration Tests
- [ ] E2E Tests
- [ ] Performance Testing
- [ ] Security Audit
- [ ] Production Deployment

---

## 🔒 Security Considerations

### Password Security
```csharp
// ใช้ BCrypt สำหรับ Hash Passwords
var hashedPassword = BCrypt.Net.BCrypt.HashPassword(plainPassword);
var isValid = BCrypt.Net.BCrypt.Verify(plainPassword, hashedPassword);
```

### JWT Authentication
```csharp
// Access Token: 15 นาที
// Refresh Token: 7 วัน
// Token Rotation: ใช้ Refresh Token เพื่อขอ Access Token ใหม่
```

### Data Validation
```csharp
// ใช้ FluentValidation
public class UserValidator : AbstractValidator<User>
{
    public UserValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).MinimumLength(8).Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)");
    }
}
```

### SQL Injection Prevention
```csharp
// ใช้ Parameterized Queries หรือ Entity Framework Core
// ❌ string sql = $"SELECT * FROM Users WHERE Email = '{email}'";
// ✅ var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
```

---

## 📊 Sample Database Schema (SQL)

### Users Table
```sql
CREATE TABLE Users (
    UserId VARCHAR(50) PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    ProfilePicture VARCHAR(500),
    DateOfBirth DATE,
    Gender VARCHAR(20),
    Nationality VARCHAR(50),
    Location VARCHAR(100),
    Education VARCHAR(100),
    Experience VARCHAR(50),
    Skills NVARCHAR(MAX), -- JSON Array
    ResumeUrl VARCHAR(500),
    RegisteredDate DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME,
    Status VARCHAR(20) DEFAULT 'active',
    EmailVerified BIT DEFAULT 0,
    PhoneVerified BIT DEFAULT 0
);
```

### Employers Table
```sql
CREATE TABLE Employers (
    EmployerId VARCHAR(50) PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    CompanyName NVARCHAR(255) NOT NULL,
    CompanyNameEN NVARCHAR(255) NOT NULL,
    CompanyLogo VARCHAR(500),
    BusinessType VARCHAR(100) NOT NULL,
    Location VARCHAR(100) NOT NULL,
    Address NVARCHAR(500) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    Website VARCHAR(255),
    Description NVARCHAR(MAX),
    CompanySize VARCHAR(20),
    TaxId VARCHAR(20) NOT NULL,
    ContactPerson NVARCHAR(255) NOT NULL,
    ContactEmail VARCHAR(255) NOT NULL,
    ContactPhone VARCHAR(20) NOT NULL,
    RegisteredDate DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME,
    Status VARCHAR(20) DEFAULT 'pending',
    Verified BIT DEFAULT 0,
    SubscriptionPlan VARCHAR(50) DEFAULT 'free',
    EmailVerified BIT DEFAULT 0,
    ActiveJobs INT DEFAULT 0,
    TotalJobs INT DEFAULT 0,
    Credits INT DEFAULT 0
);
```

### Jobs Table
```sql
CREATE TABLE Jobs (
    JobId VARCHAR(50) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Company NVARCHAR(255) NOT NULL,
    CompanyLogo VARCHAR(500),
    Location VARCHAR(100) NOT NULL,
    Department VARCHAR(100) NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Salary NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Requirements NVARCHAR(MAX), -- JSON Array
    Benefits NVARCHAR(MAX), -- JSON Array
    EmployerId VARCHAR(50) NOT NULL,
    EmployerName NVARCHAR(255) NOT NULL,
    PostedDate DATE NOT NULL,
    ExpiryDate DATE NOT NULL,
    Status VARCHAR(20) DEFAULT 'active',
    ApplicantsCount INT DEFAULT 0,
    Urgent BIT DEFAULT 0,
    Featured BIT DEFAULT 0,
    Recommended BIT DEFAULT 0,
    Priority VARCHAR(20),
    ExperienceLevel VARCHAR(50),
    EducationRequired VARCHAR(100),
    FOREIGN KEY (EmployerId) REFERENCES Employers(EmployerId)
);
```

---

## 🌐 API Endpoints Reference

### Authentication
```
POST   /api/auth/login              - Login (User/Employer/Admin)
POST   /api/auth/register           - Register (User/Employer)
POST   /api/auth/refresh-token      - Refresh JWT Token
POST   /api/auth/logout             - Logout
POST   /api/auth/forgot-password    - Request Password Reset
POST   /api/auth/reset-password     - Reset Password
```

### Jobs
```
GET    /api/jobs                    - Get all jobs (with filters)
GET    /api/jobs/{id}               - Get job by ID
POST   /api/jobs                    - Create job (Employer)
PUT    /api/jobs/{id}               - Update job (Employer)
DELETE /api/jobs/{id}               - Delete job (Employer/Admin)
GET    /api/jobs/search?q={query}   - Search jobs
```

### Applications
```
POST   /api/applications            - Submit application (User)
GET    /api/applications/user/{id}  - Get user's applications
GET    /api/applications/job/{id}   - Get job's applications (Employer)
PUT    /api/applications/{id}       - Update status (Employer)
```

### Payments
```
POST   /api/payments/create         - Create payment
POST   /api/payments/confirm        - Confirm payment
GET    /api/payments/{id}           - Get payment details
GET    /api/invoices/{id}           - Download invoice PDF
```

---

## 💡 Best Practices

### 1. Data Validation
- ✅ Validate ทั้ง Client-side และ Server-side
- ✅ ใช้ Data Annotations หรือ FluentValidation
- ✅ Sanitize User Input เพื่อป้องกัน XSS

### 2. Error Handling
```csharp
// Standardized API Response
{
    "success": true,
    "data": { ... },
    "message": "Operation successful",
    "errors": []
}
```

### 3. Pagination
```
GET /api/jobs?page=1&limit=20&sort=postedDate&order=desc
```

### 4. Caching
- ✅ Cache ข้อมูลที่ไม่เปลี่ยนบ่อย (Departments, Locations)
- ✅ ใช้ Redis สำหรับ Session Management
- ✅ CDN สำหรับ Static Assets

### 5. Logging
```csharp
// ใช้ Serilog หรือ NLog
_logger.LogInformation("User {UserId} applied for Job {JobId}", userId, jobId);
_logger.LogError(ex, "Payment failed for Employer {EmployerId}", employerId);
```

---

## 📞 Support & Contact

หากมีคำถามหรือต้องการความช่วยเหลือ:

- 📧 Email: dev@jobcrew.com
- 📱 LINE: @jobcrew-dev
- 💬 Discord: JobCrew Developers

---

## 📄 License

© 2026 JobCrew. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: March 15, 2026  
**Status**: ✅ Production Ready

**Data Models Compatibility:**
- Job Data Model: v1.0.0
- User Models: v1.0.0
- Payment Models: v1.0.0
- Sample Data: 34 jobs
