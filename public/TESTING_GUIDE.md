# 🚀 QUICK START - Dashboard Testing

## วิธีทดสอบเร็วที่สุด (30 วินาที)

### วิธีที่ 1: ใช้ไฟล์ทดสอบ ⚡ (แนะนำ)

```
1. เปิดไฟล์ test-dashboard.html ในเบราว์เซอร์
2. คลิกปุ่มตาม Role ที่ต้องการ
3. Dashboard จะเปิดพร้อมข้อมูลทันที!
```

### วิธีที่ 2: Login ปกติ

```
1. เปิด login.html
2. กรอก Email: user@demo.com
3. กรอก Password: demo123
4. กด Login
```

---

## 🎭 Demo Accounts

| Role | Email | Password | ความสามารถ |
|------|-------|----------|-----------|
| 👤 **User** | user@demo.com | demo123 | ค้นหางาน, สมัครงาน, ดูสถานะ |
| 💼 **Employer** | employer@demo.com | demo123 | ประกาศงาน, ดูผู้สมัคร, ชำระเงิน |
| 🛡️ **Admin** | admin@demo.com | demo123 | จัดการทุกอย่าง, ดูรายงาน |

---

## 📱 หน้าจอที่มี

### User (5 หน้า)
- ✅ ภาพรวม - Stat cards + ตารางใบสมัครล่าสุด
- ✅ ใบสมัครของฉัน - ตารางใบสมัครทั้งหมด
- ✅ งานที่บันทึก - Job cards แบบ grid
- ✅ โปรไฟล์ - ฟอร์มข้อมูลส่วนตัว
- ✅ ตั้งค่า - การแจ้งเตือน, ความเป็นส่วนตัว

### Employer (6 หน้า)
- ✅ ภาพรวม - Charts + สถิติ
- ✅ งานของฉัน - ตารางงานที่ประกาศ
- ✅ ใบสมัครทั้งหมด - ตารางผู้สมัคร
- ✅ การชำระเงิน - แพ็คเกจ + ประวัติ
- ✅ โปรไฟล์บริษัท - ข้อมูลบริษัท
- ✅ ตั้งค่า - การแจ้งเตือน

### Admin (7 หน้า)
- ✅ ภาพรวม - Charts + กิจกรรม
- ✅ จัดการผู้ใช้ - CRUD users
- ✅ จัดการนายจ้าง - CRUD employers
- ✅ จัดการงาน - อนุมัติ/ลบงาน
- ✅ การชำระเงิน - ดูรายการทั้งหมด
- ✅ รายงาน - Charts & Analytics
- ✅ ตั้งค่าระบบ - System config

---

## 🎨 Features

- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Multi-language (TH/EN)
- ✅ Modern UI (Gen Z Style)
- ✅ Charts & Graphs (Chart.js)
- ✅ Mock Data (พร้อมใช้งาน)
- ✅ 3 User Roles (User, Employer, Admin)
- ✅ 18 Dashboard Pages (รวมทุก roles)

---

## 🔧 Files

```
public/
├── test-dashboard.html     ← เริ่มที่นี่! (ทดสอบเร็วที่สุด)
├── login.html              ← หรือเริ่มที่นี่ (ทดสอบแบบปกติ)
├── dashboard.html          ← Main dashboard
├── js/
│   ├── dashboard.js        ← Dashboard logic (✅ Fixed!)
│   ├── main.js             ← Common functions
│   ├── language.js         ← Multi-language
│   ├── translations.js     ← Translation keys
│   └── auth.js             ← Authentication
└── css/
    └── style.css           ← Styles

└── DASHBOARD_FIX.md       ← แก้ไขปัญหาที่พบ (อ่านถ้ามีปัญหา)
```

---

## 🐛 มีปัญหา?

### ไม่แสดงเนื้อหา?
```
1. กด Ctrl+Shift+R (Hard Refresh)
2. ตรวจสอบ Console (F12)
3. อ่าน DASHBOARD_FIX.md
```

### Login แล้ว redirect กลับไป login.html?
```
localStorage มีข้อมูลเก่า ให้รัน:
localStorage.clear();
location.reload();
```

### Menu คลิกไม่ได้?
```
ตรวจสอบ Console มี error:
- translatePage is not defined → Hard refresh
- logout is not defined → Hard refresh
```

---

## ✨ Next Steps

1. ✅ ทดสอบทุก Role (User, Employer, Admin)
2. ✅ ทดสอบทุกหน้า (18 หน้า)
3. ✅ ทดสอบ Multi-language (TH/EN)
4. ✅ ทดสอบ Responsive (Mobile/Tablet/Desktop)
5. 🚀 เชื่อมต่อ .NET 8 MVC API

---

## 📞 Support

พบปัญหา? อ่านไฟล์เหล่านี้:
- `DASHBOARD_FIX.md` - แก้ไขปัญหาที่พบ
- `DASHBOARD_GUIDE.md` - คู่มือใช้งาน Dashboard
- `MULTI_LANGUAGE_GUIDE.md` - คู่มือภาษา

---

**Ready to test!** 🎉

เริ่มที่: `test-dashboard.html`
