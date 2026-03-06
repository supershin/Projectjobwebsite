# JobHub Dashboard Guide

## 📋 ภาพรวม

ระบบ Dashboard ของ JobHub ถูกออกแบบมาให้ใช้งาน **URL-based navigation** แบบ Single Page โดยมี 3 ระดับผู้ใช้งาน:
- **User (ผู้หางาน)** - สมัครงาน, บันทึกงาน, ดูสถานะใบสมัคร
- **Employer (นายจ้าง)** - ประกาศงาน, ดูผู้สมัคร, ชำระเงิน
- **Admin (ผู้ดูแลระบบ)** - จัดการผู้ใช้, นายจ้าง, งาน, ระบบ

---

## 🔐 บัญชีทดสอบ (Demo Accounts)

```
ผู้ใช้ทั่วไป (User):
Email: user@demo.com
Password: demo123

นายจ้าง (Employer):
Email: employer@demo.com
Password: demo123

แอดมิน (Admin):
Email: admin@demo.com
Password: demo123
```

---

## 🎯 URL Navigation System

ระบบใช้ URL parameter `?view=` เพื่อแสดงหน้าต่างๆ ภายใน `dashboard.html`

### 📱 User Dashboard URLs

```
dashboard.html                      → หน้าภาพรวม (Overview)
dashboard.html?view=overview        → หน้าภาพรวม
dashboard.html?view=applications    → ใบสมัครของฉัน
dashboard.html?view=saved-jobs      → งานที่บันทึก
dashboard.html?view=profile         → โปรไฟล์
dashboard.html?view=settings        → ตั้งค่า
```

### 💼 Employer Dashboard URLs

```
dashboard.html?view=overview        → หน้าภาพรวม
dashboard.html?view=my-jobs         → งานของฉัน
dashboard.html?view=applications    → ใบสมัครทั้งหมด
dashboard.html?view=payments        → การชำระเงิน
dashboard.html?view=profile         → โปรไฟล์บริษัท
dashboard.html?view=settings        → ตั้งค่า
```

### 🛡️ Admin Dashboard URLs

```
dashboard.html?view=overview        → หน้าภาพรวม
dashboard.html?view=users           → จัดการผู้ใช้
dashboard.html?view=employers       → จัดการนายจ้าง
dashboard.html?view=jobs            → จัดการงาน
dashboard.html?view=payments        → การชำระเงิน
dashboard.html?view=reports         → รายงาน
dashboard.html?view=settings        → ตั้งค่าระบบ
```

---

## 🌐 Multi-Language Support

ระบบรองรับ 2 ภาษา:
- **ไทย (TH)** - ภาษาเริ่มต้น
- **English (EN)**

การสลับภาษา:
1. คลิกที่ปุ่ม Language Switcher มุมบนขวา
2. เลือกภาษาที่ต้องการ
3. ระบบจะบันทึกการตั้งค่าใน localStorage

---

## 📊 Features ของแต่ละ Role

### 👤 User (ผู้หางาน)

**Overview:**
- สถิติใบสมัครทั้งหมด
- ใบสมัครที่ได้รับการตอบรับ
- ใบสมัครที่รอการตอบกลับ
- งานที่บันทึกไว้

**My Applications:**
- ตารางแสดงใบสมัครทั้งหมด
- กรองตามสถานะ (ทั้งหมด, รอการตอบกลับ, กำลังตรวจสอบ, ได้รับการตอบรับ, ไม่ผ่าน)
- ดูรายละเอียดและยกเลิกใบสมัคร

**Saved Jobs:**
- แสดง Job Cards ของงานที่บันทึก
- ปุ่มสมัครงานและดูรายละเอียด
- ลบออกจากรายการบันทึก

**Profile:**
- ข้อมูลส่วนตัว
- ทักษะ (Skills)
- ประสบการณ์ (Experience)
- อัพโหลด Resume

**Settings:**
- การตั้งค่าบัญชี
- การแจ้งเตือน
- ลบบัญชี

---

### 💼 Employer (นายจ้าง)

**Overview:**
- งานที่เปิดรับสมัคร
- ผู้สมัครทั้งหมด
- รอการตรวจสอบ
- จำนวนการดู
- กราฟสถิติรายเดือน

**My Jobs:**
- ตารางงานทั้งหมด
- จำนวนผู้สมัคร
- จำนวนการดู
- แก้ไข/ลบประกาศงาน
- ปุ่มประกาศงานใหม่

**Applications:**
- ดูใบสมัครทั้งหมด
- กรองตามงาน
- ดู Resume
- ยอมรับ/ปฏิเสธผู้สมัคร

**Payments:**
- ประวัติการชำระเงิน
- แพ็คเกจปัจจุบัน
- อัพเกรดแพ็คเกจ

**Company Profile:**
- ข้อมูลบริษัท
- โลโก้
- อุตสาหกรรม
- ขนาดบริษัท
- รายละเอียด

**Settings:**
- การตั้งค่าบัญชี
- การแจ้งเตือน

---

### 🛡️ Admin (ผู้ดูแลระบบ)

**Overview:**
- ผู้ใช้ทั้งหมด
- งานทั้งหมด
- รายได้
- นายจ้าง
- กราฟสถิติ
- กิจกรรมล่าสุด

**Manage Users:**
- ตารางผู้ใช้ทั้งหมด
- ค้นหา
- ดู/ระงับ/ลบผู้ใช้

**Manage Employers:**
- ตารางนายจ้างทั้งหมด
- ยืนยันบริษัท
- ดู/ลบนายจ้าง

**Manage Jobs:**
- ตารางงานทั้งหมด
- กรองตามสถานะ
- อนุมัติ/ลบงาน

**Payments:**
- รายการชำระเงินทั้งหมด

**Reports:**
- กราฟรายได้
- กราฟการเติบโตของผู้ใช้
- สถิติงาน

**System Settings:**
- ชื่อเว็บไซต์
- อีเมลติดต่อ
- ราคาประกาศงาน
- ระยะเวลาประกาศ
- โหมดปิดปรับปรุง

---

## 🎨 Theme & Design

- **Bootstrap 5.3.0** - Framework หลัก
- **Bootstrap Icons 1.11.0** - ไอคอน
- **Chart.js** - กราฟและสถิติ
- **Custom CSS** - Gen Z friendly colors
- **Responsive Design** - รองรับทุกอุปกรณ์

### สีหลัก:
```css
Primary: #6366f1 (Indigo)
Success: #10b981 (Green)
Warning: #f59e0b (Amber)
Danger: #ef4444 (Red)
```

---

## 🔧 Technical Details

### Authentication
- ข้อมูลผู้ใช้เก็บใน `localStorage`
- Key: `user`, `token`
- ตรวจสอบการล็อกอินก่อนเข้า dashboard

### Multi-Language
- ไฟล์: `js/translations.js`, `js/language.js`
- เก็บภาษาใน `localStorage` key: `language`
- Attribute: `data-i18n` สำหรับแปลอัตโนมัติ
- Attribute: `data-i18n-placeholder` สำหรับ placeholder

### Charts
- ใช้ Chart.js
- กราฟ Line, Bar, Doughnut
- รองรับ Responsive

---

## 📁 File Structure

```
public/
├── dashboard.html              ← Main dashboard (all roles)
├── login.html                  ← Login page
├── register.html               ← Register page
├── index.html                  ← Homepage
├── jobs.html                   ← Jobs listing
├── job-detail.html             ← Job detail
├── post-job.html               ← Post job (employer)
├── js/
│   ├── dashboard.js            ← Dashboard logic (all views)
│   ├── auth.js                 ← Authentication
│   ├── translations.js         ← Translation keys
│   ├── language.js             ← Language switcher
│   ├── main.js                 ← Common functions
│   └── ...
└── css/
    └── style.css               ← Custom styles
```

---

## 🚀 Quick Start

1. **Login** ด้วย demo account
2. ระบบจะ redirect ไป `dashboard.html`
3. แสดง dashboard ตาม role โดยอัตโนมัติ
4. คลิกเมนูซ้ายเพื่อนำทางไปหน้าต่างๆ
5. URL จะเปลี่ยนเป็น `?view=xxx`

---

## 📝 การพัฒนาต่อ

### เพิ่มหน้าใหม่:
1. เพิ่ม function ใน `dashboard.js` (เช่น `loadUserNewPage()`)
2. เพิ่ม menu item ใน `loadUserDashboard()`
3. เพิ่ม case ใน switch statement
4. เพิ่ม translation keys ใน `translations.js`

### เชื่อมต่อ Backend (.NET 8 MVC):
1. แก้ไข API endpoints ใน functions
2. เปลี่ยน mock data เป็น API calls
3. จัดการ authentication token
4. Handle error responses

---

## 🎯 Best Practices

1. ใช้ `data-i18n` สำหรับทุก text ที่ต้องแปลภาษา
2. เรียก `translatePage()` หลัง render content ใหม่
3. เก็บ state ใน URL parameter เพื่อให้ share link ได้
4. ใช้ Bootstrap utilities มากที่สุด
5. เพิ่ม loading state สำหรับ API calls

---

## 🐛 Troubleshooting

**Dashboard ไม่แสดง:**
- ตรวจสอบ login
- เช็ค localStorage มี user และ token

**ภาษาไม่เปลี่ยน:**
- เช็ค `data-i18n` attribute
- เรียก `translatePage()`

**Charts ไม่แสดง:**
- เช็คว่า Chart.js โหลดแล้ว
- ตรวจสอบ canvas element id

---

## 📞 Support

สำหรับคำถามเพิ่มเติม กรุณาดูที่:
- `BACKEND_INTEGRATION.md` - การเชื่อมต่อ Backend
- `MULTI_LANGUAGE_GUIDE.md` - คู่มือ Multi-Language
- `QUICK_START.md` - Quick Start Guide

---

**Version:** 2.0  
**Last Updated:** March 2026  
**Author:** JobHub Development Team
