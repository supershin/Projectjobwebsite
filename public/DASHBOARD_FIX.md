# 🔧 DASHBOARD TROUBLESHOOTING GUIDE

## ปัญหาที่พบและแก้ไขแล้ว

### ✅ แก้ไขเมื่อ: 6 มีนาคม 2026

---

## 🐛 ปัญหา: Dashboard ไม่แสดงเนื้อหาและ Menu คลิกไม่ได้

### อาการ:
- หน้า Dashboard แสดงเฉพาะ Sidebar Menu
- พื้นที่เนื้อหาด้านขวาว่างเปล่า
- คลิก Menu ไม่เกิดอะไร ยังอยู่หน้าเดิม

### สาเหตุ:
1. ไม่มี function `translatePage()` ที่ dashboard.js เรียกใช้
2. ไม่มี function `logout()` ที่ชัดเจน

### การแก้ไข:

#### 1. เพิ่ม function `translatePage()` ใน `/public/js/dashboard.js`

```javascript
// Translate page helper
function translatePage() {
    if (window.langManager) {
        window.langManager.updatePageLanguage();
    }
}
```

#### 2. เพิ่ม function `logout()` ใน `/public/js/dashboard.js`

```javascript
// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    showNotification('ออกจากระบบสำเร็จ', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}
```

---

## 🧪 วิธีทดสอบ

### วิธีที่ 1: ใช้ไฟล์ทดสอบ (แนะนำ)

```
1. เปิดไฟล์ test-dashboard.html ในเบราว์เซอร์
2. คลิกปุ่ม "Login เป็น User" หรือ Role อื่นๆ
3. ระบบจะ redirect ไป dashboard.html พร้อม login อัตโนมัติ
4. ตรวจสอบว่า:
   ✅ Menu แสดงครบถ้วน
   ✅ เนื้อหาด้านขวาแสดง Stat Cards และ Tables
   ✅ คลิก Menu แล้วเปลี่ยนหน้าได้
```

### วิธีที่ 2: Login ปกติ

```
1. เปิด login.html
2. ใช้ Demo Account:
   - User: user@demo.com / demo123
   - Employer: employer@demo.com / demo123
   - Admin: admin@demo.com / demo123
3. กด Login
4. ระบบจะ redirect ไป dashboard.html
```

---

## 📋 Checklist การทำงาน

### ✅ Menu ทั้ง 3 Roles

#### User Menu (5 items):
- [x] ภาพรวม (Overview)
- [x] ใบสมัครของฉัน (My Applications)
- [x] งานที่บันทึก (Saved Jobs)
- [x] โปรไฟล์ (Profile)
- [x] ตั้งค่า (Settings)

#### Employer Menu (6 items):
- [x] ภาพรวม (Overview)
- [x] งานของฉัน (My Jobs)
- [x] ใบสมัครทั้งหมด (Applications)
- [x] การชำระเงิน (Payments)
- [x] โปรไฟล์บริษัท (Company Profile)
- [x] ตั้งค่า (Settings)

#### Admin Menu (7 items):
- [x] ภาพรวม (Overview)
- [x] จัดการผู้ใช้ (Manage Users)
- [x] จัดการนายจ้าง (Manage Employers)
- [x] จัดการงาน (Manage Jobs)
- [x] การชำระเงิน (Payments)
- [x] รายงาน (Reports)
- [x] ตั้งค่าระบบ (System Settings)

### ✅ หน้าจอทั้งหมด

- [x] Overview - แสดง Stat Cards + ตาราง/กราฟ
- [x] Applications - แสดงตารางใบสมัคร
- [x] Saved Jobs - แสดง Job Cards
- [x] Profile - แสดงฟอร์มโปรไฟล์
- [x] Settings - แสดงการตั้งค่า
- [x] My Jobs (Employer) - แสดงตารางงาน
- [x] Payments (Employer) - แสดงแพ็คเกจและประวัติ
- [x] Company Profile (Employer) - แสดงฟอร์มบริษัท
- [x] Manage Users (Admin) - แสดงตารางผู้ใช้
- [x] Manage Employers (Admin) - แสดงตารางนายจ้าง
- [x] Manage Jobs (Admin) - แสดงตารางงาน
- [x] Reports (Admin) - แสดงกราฟรายงาน
- [x] System Settings (Admin) - แสดงฟอร์มตั้งค่าระบบ

---

## 🔍 การ Debug

### ตรวจสอบใน Console (F12)

```javascript
// ตรวจสอบว่า user login หรือไม่
console.log(localStorage.getItem('user'));

// ตรวจสอบ currentView
console.log(new URLSearchParams(window.location.search).get('view'));

// ตรวจสอบว่า functions โหลดหรือไม่
console.log(typeof loadUserDashboard);
console.log(typeof translatePage);
console.log(typeof logout);
```

### ข้อความ Error ที่อาจพบ:

#### ❌ "translatePage is not defined"
**แก้:** Function ถูกเพิ่มแล้ว ให้ Refresh หน้าเว็บ (Ctrl+Shift+R)

#### ❌ "logout is not defined"
**แก้:** Function ถูกเพิ่มแล้ว ให้ Refresh หน้าเว็บ (Ctrl+Shift+R)

#### ❌ "isLoggedIn is not defined"
**แก้:** ตรวจสอบว่า main.js โหลดก่อน dashboard.js

#### ❌ "langManager is not defined"
**แก้:** ตรวจสอบว่า language.js โหลดก่อน dashboard.js

---

## 📝 ไฟล์ที่แก้ไข

1. **`/public/js/dashboard.js`**
   - เพิ่ม function `logout()`
   - เพิ่ม function `translatePage()`

2. **`/public/test-dashboard.html`** (ใหม่)
   - ไฟล์สำหรับทดสอบ Dashboard ง่ายๆ

---

## 💡 Tips

### Hard Refresh เบราว์เซอร์:
- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

### Clear Cache:
```javascript
// รันใน Console เพื่อล้าง localStorage
localStorage.clear();
location.reload();
```

### ดู Network Requests:
1. กด F12 → Network Tab
2. Reload หน้า
3. ตรวจสอบว่า dashboard.js โหลดสำเร็จ (Status 200)

---

## ✅ สรุป

หลังจากแก้ไขแล้ว Dashboard ควรทำงานได้ปกติ:

1. ✅ Menu แสดงครบทั้ง 3 roles
2. ✅ เนื้อหาแสดงตาม view ที่เลือก
3. ✅ คลิก Menu แล้วเปลี่ยนหน้าได้
4. ✅ Logout ทำงานได้
5. ✅ Multi-language ทำงานได้

---

## 🆘 ยังมีปัญหา?

ถ้ายังพบปัญหา ให้:

1. Hard Refresh (Ctrl+Shift+R)
2. ลบ Cache และ localStorage
3. ตรวจสอบ Console มี error อะไรบ้าง
4. ตรวจสอบว่าไฟล์ทั้งหมดอัพเดทแล้ว
5. ลองใช้ test-dashboard.html ทดสอบ

---

**Last Updated:** 6 มีนาคม 2026  
**Status:** ✅ แก้ไขเรียบร้อย
