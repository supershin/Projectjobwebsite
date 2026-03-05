# JobHub - เว็บไซต์สมัครงานสำหรับคน Gen Z 🚀

## 📋 ภาพรวมโปรเจ็กต์

JobHub เป็นเว็บไซต์สมัครงานออนไลน์ที่ทันสมัย รองรับทุกอุปกรณ์ (Mobile, Tablet, Notebook, PC Desktop) พร้อมระบบ Multi-Language (ไทย-อังกฤษ) และ Theme ที่เหมาะกับคน Gen Z

## ✨ ฟีเจอร์หลัก

### 1. ระบบผู้ใช้งาน 3 ระดับ
- **User ทั่วไป** - ค้นหางาน, สมัครงาน, บันทึกงาน
- **User Employer** - ลงประกาศงาน, จัดการตำแหน่งงาน, ดูผู้สมัคร
- **Admin** - จัดการระบบทั้งหมด

### 2. ฟังก์ชันการทำงาน
- ✅ ระบบค้นหางานแบบ Advanced (ตามตำแหน่ง, สถานที่, หมวดหมู่)
- ✅ ระบบกรองและเรียงลำดับงาน
- ✅ ระบบสมัครงานพร้อมอัพโหลด Resume (PDF)
- ✅ ระบบบันทึกงานที่สนใจ
- ✅ ระบบแชร์งานผ่าน Social Media (Facebook, Twitter, LINE)
- ✅ ระบบลงประกาศงานสำหรับนายจ้าง
- ✅ ระบบ Dashboard แยกตามประเภทผู้ใช้
- ✅ ระบบ Multi-Language (Thai-English)
- ✅ ระบบแสดงสวัสดิการด้วย Badge ที่สวยงาม

### 3. ข้อมูลที่จัดเก็บ
- ข้อมูลผู้ใช้งาน (User profiles)
- ข้อมูลตำแหน่งงาน (Job listings)
- ข้อมูลการสมัครงาน (Applications)
- ข้อมูล Resume files
- ข้อมูลนายจ้าง (Employer information)
- ระบบคิดค่าบริการต่อ 1 post

## 🎨 Design & Theme

### สีหลัก (Gen Z Vibrant)
- **Primary**: Purple Gradient (#667eea → #764ba2)
- **Secondary**: Pink (#ec4899)
- **Accent**: Amber (#f59e0b), Cyan (#06b6d4), Lime (#84cc16)

### Gradients สุดเท่
- Gradient Cyber: Blue → Purple → Pink
- Gradient Sunset: Red → Yellow → Blue
- Gradient Neon: Pink → Orange → Cyan

### Typography
- **Primary Font**: Inter (สำหรับ Body text)
- **Secondary Font**: Poppins (สำหรับ Headings)

## 📁 โครงสร้างไฟล์

```
public/
├── css/
│   └── style.css              # Main stylesheet with Gen Z theme
├── js/
│   ├── main.js                # Core JavaScript functions
│   ├── auth.js                # Authentication system
│   ├── home.js                # Homepage functionality
│   ├── jobs.js                # Jobs listing page
│   ├── job-detail.js          # Job detail page
│   ├── post-job.js            # Post job page
│   ├── dashboard.js           # Dashboard functionality
│   ├── translations.js        # Multi-language translations
│   └── language.js            # Language manager system
├── data/
│   └── jobs.json              # Mock job data
├── index.html                 # Homepage
├── jobs.html                  # Jobs listing page
├── job-detail.html            # Job detail page (Multi-lang ready ✅)
├── login.html                 # Login page
├── register.html              # Register page
├── post-job.html              # Post job page (for employers)
├── dashboard.html             # Dashboard page
└── README.md                  # This file
```

## 🌐 ระบบ Multi-Language

### การทำงาน
ระบบรองรับ 2 ภาษา: **ไทย (TH)** และ **อังกฤษ (EN)**

### การใช้งาน
1. **HTML Elements**: ใช้ `data-i18n` attribute
```html
<h1 data-i18n="hero.title">ค้นหางานที่ใช่</h1>
```

2. **Placeholders**: ใช้ `data-i18n-placeholder`
```html
<input data-i18n-placeholder="hero.search.placeholder">
```

3. **JavaScript**: ใช้ฟังก์ชัน `t()`
```javascript
const text = window.t('job-detail.apply');
```

### การเพิ่ม Translation ใหม่
แก้ไขไฟล์ `/public/js/translations.js`:
```javascript
const translations = {
    th: {
        'new.key': 'ข้อความภาษาไทย'
    },
    en: {
        'new.key': 'English text'
    }
};
```

## 🎯 หน้า Job Detail (ล่าสุด)

### ฟีเจอร์ที่มี
- ✅ แสดงรายละเอียดงานครบถ้วน
- ✅ แสดงสวัสดิการด้วย Badge สีสวย (Gradient Purple-Pink)
- ✅ ระบบ Multi-Language ครบทุก Element
- ✅ ฟอร์มสมัครงานพร้อม Upload Resume
- ✅ การแชร์งานผ่าน Social Media
- ✅ ระบบบันทึกงาน (Save Job)
- ✅ Responsive Design สำหรับทุกอุปกรณ์

### Translation Keys สำหรับ Job Detail
```javascript
// ตัวอย่าง Translation Keys ที่มี
'job-detail.apply'              // สมัครงานนี้ / Apply for this Job
'job-detail.save'               // บันทึก / Save
'job-detail.back'               // กลับไปหน้างานทั้งหมด / Back to All Jobs
'job-detail.per-month'          // ต่อเดือน / per month
'job-detail.description'        // รายละเอียดงาน / Job Description
'job-detail.requirements'       // คุณสมบัติที่ต้องการ / Requirements
'job-detail.benefits'           // สวัสดิการ / Benefits
'job-detail.posted-date'        // วันที่ประกาศ / Posted Date
'job-detail.applicants'         // ผู้สมัครทั้งหมด / Total Applicants
// ... และอีกมากมาย
```

## 🎨 สไตล์ Badge สวัสดิการ

Badge ในหน้า Job Detail ใช้ Gradient สีม่วง-ชมพูที่มองเห็นชัดบนพื้นขาว:

```css
.job-detail-content .badge-custom {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-full);
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: var(--transition);
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2);
}
```

## 🔧 การพัฒนาต่อ

### 1. การเชื่อมต่อ Backend (.NET 8 MVC)
เตรียม API Endpoints ดังนี้:

```
GET    /api/jobs              - ดึงรายการงานทั้งหมด
GET    /api/jobs/{id}         - ดึงรายละเอียดงาน
POST   /api/jobs              - สร้างตำแหน่งงานใหม่
PUT    /api/jobs/{id}         - แก้ไขตำแหน่งงาน
DELETE /api/jobs/{id}         - ลบตำแหน่งงาน

POST   /api/applications      - ส่งใบสมัครงาน
GET    /api/applications      - ดึงข้อมูลการสมัครงาน
POST   /api/applications/upload-resume - อัพโหลด Resume

POST   /api/auth/login        - เข้าสู่ระบบ
POST   /api/auth/register     - สมัครสมาชิก
GET    /api/auth/profile      - ดึงข้อมูลโปรไฟล์
```

### 2. แก้ไขไฟล์สำหรับ Production
- อัพเดท API URLs ใน `js/main.js`
- เปลี่ยน Mock data เป็น Real API calls
- เพิ่มระบบ Authentication จริง
- เพิ่มระบบจัดการ File uploads

### 3. ฟีเจอร์เพิ่มเติมที่แนะนำ
- [ ] ระบบแจ้งเตือน (Notifications)
- [ ] ระบบแชทระหว่างผู้สมัครกับนายจ้าง
- [ ] ระบบรีวิวบริษัท
- [ ] ระบบแนะนำงานด้วย AI
- [ ] ระบบ Email verification
- [ ] ระบบ Two-Factor Authentication

## 📱 Responsive Breakpoints

```css
Mobile:     < 576px
Tablet:     576px - 768px
Notebook:   768px - 992px
Desktop:    992px - 1200px
Large:      > 1200px
```

## 🚀 วิธีใช้งาน

### 1. เปิดหน้าเว็บไซต์
```
เปิดไฟล์ index.html หรือ START_HERE.html ในเบราว์เซอร์
```

### 2. ทดสอบฟีเจอร์
- ค้นหางาน → ดูรายละเอียด → สมัครงาน
- เปลี่ยนภาษา Thai/English
- ทดสอบ Responsive ในหน้าจอขนาดต่างๆ
- ทดสอบแชร์งานผ่าน Social Media

### 3. ตรวจสอบ Console
เปิด Developer Tools (F12) เพื่อดู log และ debug

## 🎯 สิ่งที่ต้องทำต่อไป

### ด้าน Frontend (ที่นี่)
- [x] ระบบ Multi-Language
- [x] หน้า Job Detail ครบถ้วน
- [x] Badge สวัสดิการสวยงาม
- [x] Responsive Design
- [ ] ระบบ Loading States
- [ ] ระบบ Error Handling ที่ดีขึ้น
- [ ] Form Validation ทุกหน้า
- [ ] Accessibility (ARIA labels)

### ด้าน Backend (.NET 8 MVC)
- [ ] สร้าง Database Schema
- [ ] สร้าง API Endpoints
- [ ] ระบบ Authentication & Authorization
- [ ] ระบบจัดการไฟล์ Resume
- [ ] ระบบคิดค่าบริการ (Payment Gateway)
- [ ] ระบบส่ง Email
- [ ] Unit Tests

## 📞 การติดต่อ & การสนับสนุน

หากมีปัญหาหรือข้อสงสัยในการพัฒนา Backend API:
- ตรวจสอบ API Response Format ใน Console
- ใช้ Postman/Swagger เพื่อทดสอบ API
- ตรวจสอบ CORS settings สำหรับการเชื่อมต่อ

## 📄 License

© 2026 JobHub. All rights reserved.

---

**หมายเหตุ**: โปรเจ็กต์นี้เป็น Frontend เท่านั้น พร้อมสำหรับการเชื่อมต่อกับ Backend API ที่พัฒนาด้วย .NET 8 MVC

**อัพเดทล่าสุด**: 5 มีนาคม 2026
- ✅ แก้ไขระบบ Multi-Language ในหน้า Job Detail
- ✅ เพิ่ม Translation Keys มากกว่า 20 keys
- ✅ ปรับปรุง CSS Badge สวัสดิการให้มองเห็นชัดบนพื้นขาว
- ✅ ทดสอบและยืนยันการทำงานของระบบแปลภาษา
