# 🚀 Quick Start Guide - JobHub

คู่มือเริ่มต้นใช้งานอย่างรวดเร็วสำหรับโปรเจ็กต์ JobHub

---

## 📋 สิ่งที่ต้องเตรียม

### 1. เบราว์เซอร์ที่รองรับ
- ✅ Google Chrome (แนะนำ)
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ✅ Safari (macOS)

### 2. Code Editor (สำหรับการพัฒนา)
- Visual Studio Code (แนะนำ)
- Sublime Text
- Atom
- หรือ Text Editor อื่นๆ

---

## 🎯 การเริ่มต้นใช้งาน (3 ขั้นตอน)

### ขั้นตอนที่ 1: เปิดเว็บไซต์

**วิธีที่ 1 - ใช้ไฟล์ START_HERE.html**
```bash
# เปิดไฟล์นี้ในเบราว์เซอร์
public/START_HERE.html
```

**วิธีที่ 2 - ใช้ไฟล์ index.html**
```bash
# เปิดไฟล์นี้ในเบราว์เซอร์
public/index.html
```

**วิธีที่ 3 - ใช้ Live Server (แนะนำสำหรับนักพัฒนา)**
```bash
# ถ้าใช้ VS Code ติดตั้ง Extension "Live Server"
# คลิกขวาที่ไฟล์ index.html -> "Open with Live Server"
```

### ขั้นตอนที่ 2: ทดสอบฟีเจอร์

1. **ทดสอบการค้นหางาน** 🔍
   - พิมพ์คำค้นหาในช่อง Search
   - กดปุ่ม "ค้นหา"
   - ดูผลลัพธ์ที่แสดง

2. **ทดสอบการเปลี่ยนภาษา** 🌐
   - คลิกที่ไอคอน Globe ใน Navbar
   - เลือก "English" หรือ "ไทย"
   - ตรวจสอบว่าทุก Text เปลี่ยนภาษา

3. **ทดสอบหน้ารายละเอียดงาน** 📄
   - คลิก "ดูรายละเอียด" ที่การ์ดงาน
   - ตรวจสอบว่าข้อมูลแสดงครบถ้วน
   - ทดสอบปุ่ม "สมัครงาน", "บันทึก", "แชร์"

4. **ทดสอบ Responsive Design** 📱
   - กด F12 เปิด Developer Tools
   - คลิกไอคอน Toggle Device Toolbar
   - ทดสอบหน้าจอขนาด Mobile, Tablet, Desktop

### ขั้นตอนที่ 3: เริ่มพัฒนา (ถ้าต้องการ)

```bash
# 1. เปิด Code Editor
# 2. แก้ไขไฟล์ที่ต้องการ
# 3. Refresh เบราว์เซอร์เพื่อดูผลลัพธ์
```

---

## 📂 โครงสร้างไฟล์ที่สำคัญ

```
public/
├── 📄 START_HERE.html          ← เริ่มต้นที่นี่
├── 📄 index.html               ← หน้าแรก
├── 📄 jobs.html                ← รายการงาน
├── 📄 job-detail.html          ← รายละเอียดงาน ⭐
├── 📄 login.html               ← เข้าสู่ระบบ
├── 📄 register.html            ← สมัครสมาชิก
├── 📄 post-job.html            ← ลงประกาศงาน
├── 📄 dashboard.html           ← แดชบอร์ด
│
├── 📁 css/
│   └── style.css               ← Main CSS (Gen Z Theme)
│
├── 📁 js/
│   ├── main.js                 ← Core functions
│   ├── translations.js         ← คลังคำแปล ⭐
│   ├── language.js             ← ระบบภาษา ⭐
│   ├── job-detail.js           ← Job detail functions
│   └── ...
│
├── 📁 data/
│   └── jobs.json               ← ข้อมูล Mock jobs
│
└── 📁 เอกสาร/
    ├── README.md               ← เอกสารหลัก
    ├── MULTI_LANGUAGE_GUIDE.md ← คู่มือระบบภาษา
    ├── CHANGELOG.md            ← บันทึกการเปลี่ยนแปลง
    └── QUICK_START.md          ← ไฟล์นี้
```

---

## 🎯 ฟีเจอร์หลักที่ต้องรู้

### 1. ระบบ Multi-Language 🌐

**การใช้งาน:**
- คลิกไอคอน Globe (🌐) ใน Navbar
- เลือกภาษา: ไทย หรือ English
- ภาษาที่เลือกจะถูกบันทึกอัตโนมัติ

**สำหรับนักพัฒนา:**
```html
<!-- ใช้ data-i18n attribute -->
<button data-i18n="jobs.apply">สมัครเลย</button>

<!-- Placeholder -->
<input data-i18n-placeholder="search.placeholder">

<!-- JavaScript -->
<script>
const text = window.t('jobs.apply');
</script>
```

### 2. การค้นหางาน 🔍

**หน้าแรก:**
- ค้นหาด้วยคำค้น (Keyword)
- แสดงผลงานที่ตรงกับคำค้นหา

**หน้า Jobs:**
- ค้นหาแบบละเอียด (Keyword, Location, Category)
- กรองตาม Type, Experience, Salary
- เรียงลำดับ (Latest, Salary, Relevance)

### 3. รายละเอียดงาน 📄

**ข้อมูลที่แสดง:**
- ✅ ชื่อตำแหน่ง, บริษัท, สถานที่
- ✅ เงินเดือน, ประเภทงาน
- ✅ รายละเอียดงาน
- ✅ คุณสมบัติที่ต้องการ
- ✅ **สวัสดิการ** (Badge สวยงาม) ⭐
- ✅ วันที่ประกาศ, วันหมดเขต
- ✅ จำนวนผู้สมัคร

**การกระทำ:**
- สมัครงาน (Apply)
- บันทึกงาน (Save)
- แชร์งาน (Share to Facebook, Twitter, LINE)

### 4. การสมัครงาน 📝

**ข้อมูลที่ต้องกรอก:**
- ชื่อ-นามสกุล
- อีเมล
- เบอร์โทรศัพท์
- อัพโหลด Resume (PDF)
- จดหมายสมัครงาน (Cover Letter)

**หมายเหตุ:** ต้อง Login ก่อนสมัครงาน

---

## 💡 เคล็ดลับการใช้งาน

### สำหรับผู้ใช้ทั่วไป

1. **ค้นหางานได้หลายวิธี**
   - ค้นหาจากหน้าแรก (Quick Search)
   - ค้นหาจากหน้า Jobs (Advanced Search)
   - คลิกหมวดหมู่ (Categories)

2. **บันทึกงานที่สนใจ**
   - คลิกปุ่ม "บันทึก" (Bookmark icon)
   - ดูงานที่บันทึกได้ที่ Dashboard

3. **แชร์งานให้เพื่อน**
   - คลิกไอคอน Facebook, Twitter, หรือ LINE
   - หรือคัดลอก Link โดยตรง

### สำหรับนักพัฒนา

1. **ดู Console Log**
   ```javascript
   // เปิด Developer Tools (F12)
   // ดู Console tab
   // จะเห็นการทำงานของ language system
   ```

2. **ทดสอบ Responsive**
   ```
   F12 → Toggle Device Toolbar (Ctrl+Shift+M)
   ทดสอบขนาดหน้าจอต่างๆ:
   - Mobile: 375px
   - Tablet: 768px
   - Notebook: 1024px
   - Desktop: 1920px
   ```

3. **แก้ไข Mock Data**
   ```javascript
   // แก้ไขไฟล์ public/data/jobs.json
   // เพิ่มหรือแก้ไขข้อมูลงาน
   ```

---

## 🐛 แก้ปัญหาที่พบบ่อย

### ปัญหา: ภาษาไม่เปลี่ยน
**วิธีแก้:**
1. ตรวจสอบว่าโหลด translations.js และ language.js แล้ว
2. ตรวจสอบ Console มี error หรือไม่
3. ลอง Refresh หน้าเว็บ (Ctrl+F5)

### ปัญหา: สวัสดิการไม่แสดง
**วิธีแก้:**
1. ตรวจสอบว่าไฟล์ jobs.json มีข้อมูล benefits
2. ตรวจสอบ CSS ของ .badge-custom
3. ลอง Clear Cache (Ctrl+Shift+Delete)

### ปัญหา: รูปภาพไม่แสดง
**วิธีแก้:**
1. ตรวจสอบ Internet connection
2. รูปภาพใช้ Unsplash.com (ต้องมี Internet)
3. ถ้าต้องการใช้รูปภาพ Local ให้เปลี่ยน URL

### ปัญหา: Modal ไม่เปิด
**วิธีแก้:**
1. ตรวจสอบว่าโหลด Bootstrap JS แล้ว
2. ตรวจสอบว่าโหลด jQuery แล้ว
3. ดู Console มี error หรือไม่

---

## 📚 เอกสารเพิ่มเติม

### 1. README.md
- ภาพรวมโปรเจ็กต์
- ฟีเจอร์ทั้งหมด
- โครงสร้างไฟล์

### 2. MULTI_LANGUAGE_GUIDE.md
- คู่มือระบบ Multi-Language
- วิธีเพิ่ม Translation Keys
- ตัวอย่างการใช้งาน

### 3. CHANGELOG.md
- บันทึกการเปลี่ยนแปลง
- ฟีเจอร์ใหม่ในแต่ละ Version
- Bug fixes

---

## 🎨 Customization (การปรับแต่ง)

### เปลี่ยนสีธีม

แก้ไขไฟล์ `css/style.css`:

```css
:root {
    /* เปลี่ยนสีหลัก */
    --primary-color: #7c3aed;      /* Purple */
    --secondary-color: #ec4899;    /* Pink */
    --accent-color: #f59e0b;       /* Amber */
    
    /* หรือใช้สีอื่นๆ */
    --primary-color: #3b82f6;      /* Blue */
    --secondary-color: #10b981;    /* Green */
}
```

### เปลี่ยน Font

แก้ไขไฟล์ `css/style.css`:

```css
/* เปลี่ยน Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');

body {
    font-family: 'Kanit', sans-serif;
}
```

### เพิ่มข้อมูลงาน Mock

แก้ไขไฟล์ `data/jobs.json`:

```json
[
  {
    "id": "999",
    "title": "ชื่อตำแหน่งงาน",
    "company": "ชื่อบริษัท",
    "location": "สถานที่",
    "type": "full-time",
    "category": "Technology",
    "salary": "XX,000 - XX,000 บาท",
    "description": "รายละเอียด...",
    "requirements": ["ข้อ 1", "ข้อ 2"],
    "benefits": ["สวัสดิการ 1", "สวัสดิการ 2"],
    "postedDate": "2026-03-05",
    "expiryDate": "2026-04-05",
    "status": "active",
    "applicantsCount": 0
  }
]
```

---

## 🚀 ขั้นตอนต่อไป

### สำหรับผู้ใช้ทั่วไป
1. ✅ สำรวจเว็บไซต์
2. ✅ ทดลองค้นหางาน
3. ✅ ทดลองสมัครงาน
4. ✅ เปลี่ยนภาษา

### สำหรับนักพัฒนา Frontend
1. ✅ ศึกษา Code Structure
2. ✅ เรียนรู้ Multi-Language System
3. ✅ ปรับแต่ง Theme
4. ✅ เพิ่มฟีเจอร์ใหม่

### สำหรับนักพัฒนา Backend (.NET 8)
1. ✅ ศึกษา API Requirements
2. ✅ สร้าง Database Schema
3. ✅ พัฒนา API Endpoints
4. ✅ เชื่อมต่อกับ Frontend

---

## 📞 ต้องการความช่วยเหลือ?

### อ่านเอกสาร
- 📖 README.md - ภาพรวมโปรเจ็กต์
- 🌐 MULTI_LANGUAGE_GUIDE.md - คู่มือระบบภาษา
- 📝 CHANGELOG.md - ประวัติการอัพเดท

### ตรวจสอบ Code
- 💻 เปิด Developer Tools (F12)
- 🔍 ดู Console สำหรับ Errors
- 🐛 Debug ด้วย console.log()

---

## ✅ Checklist การใช้งาน

### ผู้ใช้ทั่วไป
- [ ] เปิดเว็บไซต์สำเร็จ
- [ ] ค้นหางานได้
- [ ] เปลี่ยนภาษาได้
- [ ] ดูรายละเอียดงานได้
- [ ] ทดสอบ Responsive

### นักพัฒนา
- [ ] อ่าน README.md
- [ ] ศึกษา Code Structure
- [ ] เข้าใจระบบ Multi-Language
- [ ] ทดสอบการแก้ไข CSS
- [ ] ทดสอบเพิ่ม Translation Keys
- [ ] เตรียมพร้อมสำหรับ Backend Integration

---

**สรุป**: คุณพร้อมเริ่มใช้งาน JobHub แล้ว! 🎉

**เริ่มต้น**: เปิดไฟล์ `START_HERE.html` หรือ `index.html`

**หากมีคำถาม**: ดูเอกสารประกอบหรือตรวจสอบ Console

**Good Luck!** 🚀

---

**อัพเดทล่าสุด**: 5 มีนาคม 2026  
**Version**: 1.2.0
