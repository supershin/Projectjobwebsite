# Admin Management System - การจัดการผู้ดูแลระบบ

## สรุปการเปลี่ยนแปลง

เราได้เพิ่มระบบ **จัดการผู้ดูแลระบบ (Admin Management)** ใหม่สำหรับโหมด Admin เพื่อรองรับการมีผู้ดูแลระบบมากกว่า 1 คน พร้อมระบบจัดการ Role และ Permissions

---

## 📄 ไฟล์ใหม่ที่สร้าง

### 1. `/public/js/admin-data-model.js`
**Mock Data & Helper Functions สำหรับ Admin Users**

#### Admin Roles:
- 🔴 **Super Admin** - สิทธิ์เต็ม ไม่สามารถลบได้
- 🔵 **Admin** - สิทธิ์จัดการหลักๆ ยกเว้นการจัดการ Admin อื่น
- 🟡 **Moderator** - สิทธิ์จำกัด เฉพาะการจัดการงานและ Content

#### Admin Status:
- ✅ **Active** - ใช้งานปกติ
- ⛔ **Suspended** - ระงับการใช้งาน
- ⚪ **Inactive** - ไม่ได้ใช้งาน

#### Mock Admin Users (6 คน):
```javascript
1. สมชาย ดีเลิศ - Super Admin (Active)
2. สมหญิง ใจดี - Admin (Active)
3. ประเสริฐ มั่นคง - Moderator (Active)
4. วิภา สุขใจ - Admin (Active)
5. นพดล รักษ์งาม - Moderator (Suspended)
6. จิราพร ศรีสุข - Admin (Active)
```

#### Permissions (7 สิทธิ์):
1. ✅ จัดการผู้ใช้ (manageUsers)
2. ✅ จัดการนายจ้าง (manageEmployers)
3. ✅ จัดการงาน (manageJobs)
4. ✅ จัดการผู้ดูแลระบบ (manageAdmins)
5. ✅ จัดการการชำระเงิน (managePayments)
6. ✅ ดูรายงาน (manageReports)
7. ✅ ตั้งค่าระบบ (systemSettings)

#### Helper Functions:
```javascript
// Get Functions
getAllAdmins()                  // ดึงข้อมูล Admin ทั้งหมด
getAdminById(id)               // ดึงข้อมูล Admin ตาม ID
getAdminsByRole(role)          // ดึงข้อมูลตาม Role
getAdminsByStatus(status)      // ดึงข้อมูลตาม Status
getActiveAdmins()              // ดึงข้อมูล Admin ที่ใช้งาน
getSuspendedAdmins()           // ดึงข้อมูล Admin ที่ระงับ

// Display Functions
getAdminRoleDisplay(role)          // แปลง Role เป็นชื่อภาษาไทย
getAdminRoleBadgeClass(role)       // คลาส Badge สำหรับ Role
getAdminStatusDisplay(status)      // แปลง Status เป็นชื่อภาษาไทย
getAdminStatusBadgeClass(status)   // คลาส Badge สำหรับ Status

// Utility Functions
getAdminStats()                // สถิติ Admin
formatLastLogin(datetime)      // จัดรูปแบบเวลา
getPermissionsCount(admin)     // นับสิทธิ์
searchAdmins(query)            // ค้นหา Admin
```

---

### 2. `/public/js/admin-management-functions.js`
**Functions สำหรับจัดการ Admin UI**

#### Main Functions:

##### 1. `loadAdminManagement()`
- แสดงหน้าจัดการผู้ดูแลระบบ
- Stats Cards (ทั้งหมด, ใช้งาน, Super Admin, ระงับ)
- ฟอร์มค้นหาและกรอง
- ตารางรายการ Admin

##### 2. `renderAdminList(admins)`
- Render ตารางรายการ Admin
- แสดงข้อมูล: Avatar, ชื่อ, Username, Email, Role, Permissions, แผนก, Last Login, Status
- ปุ่มจัดการ: ดู, แก้ไข, ระงับ/เปิด, รีเซ็ตรหัสผ่าน, ลบ

##### 3. `setupAdminManagementListeners()`
- Event Listeners สำหรับค้นหา
- Event Listeners สำหรับกรอง Role
- Event Listeners สำหรับกรอง Status

##### 4. `filterAdmins()`
- กรองข้อมูล Admin ตามเงื่อนไข
- ค้นหาตาม: ชื่อ, Username, Email
- กรองตาม: Role, Status

##### 5. `viewAdminDetail(id)`
- Modal แสดงรายละเอียด Admin แบบเต็ม
- ข้อมูลติดต่อ
- ข้อมูลระบบ
- Permissions ทั้งหมด

##### 6. `showAddAdminModal()`
- Modal เพิ่ม Admin ใหม่
- ฟอร์มกรอกข้อมูล: Username, Email, ชื่อ-นามสกุล, โทรศัพท์, แผนก
- เลือก Role
- เลือก Permissions

##### 7. CRUD Functions:
```javascript
editAdmin(id)              // แก้ไขข้อมูล Admin
suspendAdmin(id)           // ระงับการใช้งาน
activateAdmin(id)          // เปิดใช้งาน
resetAdminPassword(id)     // รีเซ็ตรหัสผ่าน
deleteAdmin(id)            // ลบ Admin (ไม่สามารถลบ Super Admin)
```

---

## 🔄 ไฟล์ที่แก้ไข

### 3. `/public/js/dashboard-admin.js`
**เพิ่ม Menu Item และ Switch Case**

#### Menu Item ใหม่:
```javascript
<li class="nav-item">
    <a class="nav-link ${currentView === 'admins' ? 'active' : ''}" 
       href="dashboard.html?view=admins">
        <i class="bi bi-shield-check"></i> 
        <span>จัดการผู้ดูแลระบบ</span>
    </a>
</li>
```

#### Switch Case:
```javascript
case 'admins':
    loadAdminManagement();
    break;
```

---

### 4. `/public/dashboard.html`
**เพิ่ม Script Tags**

เพิ่มการโหลด JS files ใหม่:
```html
<script src="./js/admin-data-model.js"></script>
<script src="./js/admin-management-functions.js"></script>
```

---

### 5. `/public/js/translations.js`
**เพิ่มคำแปล**

เพิ่มคำแปลสำหรับ Menu:
```javascript
'dashboard.admin.admins': 'จัดการผู้ดูแลระบบ'
```

---

## 🎨 UI/UX Features

### 1. Stats Cards
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  📊 ทั้งหมด  │  ✅ ใช้งาน  │ 🔴 Super    │  ⛔ ระงับ   │
│     6       │      5      │  Admin: 1   │      1      │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

### 2. Search & Filters
```
┌───────────────────────────────────────────────────────┐
│ 🔍 [ค้นหาชื่อ, username, email...]                   │
│                                                        │
│ [ทุก Role ▼]  [ทุกสถานะ ▼]  [🔄 รีเซ็ต]            │
└───────────────────────────────────────────────────────┘
```

### 3. Admin Table
```
┌────────────────────────────────────────────────────────────────────────┐
│ ผู้ดูแลระบบ    │ Role        │ สิทธิ์ │ แผนก  │ Last Login │ สถานะ │ จัดการ │
├────────────────────────────────────────────────────────────────────────┤
│ [👤] สมชาย     │ Super Admin │ 7/7    │ IT    │ 9:30      │ ✅    │ [👁️📝⋮] │
│     ดีเลิศ      │ 🔴          │ 🛡️     │       │           │       │        │
│ superadmin     │             │        │       │           │       │        │
│ super@job...   │             │        │       │           │       │        │
├────────────────────────────────────────────────────────────────────────┤
│ [👤] สมหญิง    │ Admin       │ 5/7    │ CS    │ 8:15      │ ✅    │ [👁️📝⋮] │
│     ใจดี        │ 🔵          │ 🛡️     │       │           │       │        │
│ admin01        │             │        │       │           │       │        │
│ admin01@...    │             │        │       │           │       │        │
└────────────────────────────────────────────────────────────────────────┘
```

### 4. Action Buttons
- 👁️ **ดูรายละเอียด** - แสดง Modal รายละเอียดเต็ม
- 📝 **แก้ไข** - แก้ไขข้อมูล Admin
- ⋮ **Dropdown Menu**:
  - ⏸️ ระงับการใช้งาน / ▶️ เปิดใช้งาน
  - 🔑 รีเซ็ตรหัสผ่าน
  - 🗑️ ลบ (ยกเว้น Super Admin)

### 5. Role Badges
- 🔴 **Super Admin** - badge bg-danger
- 🔵 **Admin** - badge bg-primary
- 🟡 **Moderator** - badge bg-warning

### 6. Status Badges
- ✅ **ใช้งาน** - badge bg-success
- ⛔ **ระงับ** - badge bg-danger
- ⚪ **ไม่ใช้งาน** - badge bg-secondary

---

## 📊 Admin Data Structure

### Admin Object:
```javascript
{
    id: 1,
    username: 'superadmin',
    email: 'super@jobhub.com',
    firstName: 'สมชาย',
    lastName: 'ดีเลิศ',
    role: 'super_admin',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=...',
    createdDate: '2024-01-01',
    lastLogin: '2026-03-08 09:30:00',
    permissions: {
        manageUsers: true,
        manageEmployers: true,
        manageJobs: true,
        manageAdmins: true,
        managePayments: true,
        manageReports: true,
        systemSettings: true
    },
    phone: '081-234-5678',
    department: 'IT & Operations'
}
```

---

## 🔐 Permission System

### Permission Matrix:

| Role          | Users | Employers | Jobs | Admins | Payments | Reports | Settings |
|---------------|-------|-----------|------|--------|----------|---------|----------|
| Super Admin   | ✅    | ✅        | ✅   | ✅     | ✅       | ✅      | ✅       |
| Admin         | ✅    | ✅        | ✅   | ❌     | ✅       | ✅      | ❌       |
| Moderator     | ❌    | ❌        | ✅   | ❌     | ❌       | ❌      | ❌       |

---

## 🚀 Features

### ✅ การค้นหา & กรอง
- ค้นหาแบบ Real-time
- กรองตาม Role (Super Admin, Admin, Moderator)
- กรองตาม Status (ใช้งาน, ระงับ, ไม่ใช้งาน)
- รีเซ็ตตัวกรอง

### ✅ การจัดการ Admin
- **เพิ่ม** Admin ใหม่พร้อมกำหนด Role และ Permissions
- **ดู** รายละเอียดเต็มใน Modal
- **แก้ไข** ข้อมูล Admin
- **ระงับ** การใช้งาน (แบบชั่วคราว)
- **เปิด** ใช้งานใหม่
- **รีเซ็ต** รหัสผ่าน
- **ลบ** Admin (ยกเว้น Super Admin)

### ✅ สถิติ & Analytics
- จำนวน Admin ทั้งหมด
- จำนวน Admin ที่ใช้งาน
- จำนวน Super Admin
- จำนวน Admin ที่ระงับ

### ✅ Security Features
- **Super Admin Protection** - ไม่สามารถลบ Super Admin
- **Permission-based Access** - ตรวจสอบสิทธิ์ก่อนทำงาน
- **Activity Logging** - บันทึกการ Login ล่าสุด
- **Status Management** - ระงับ/เปิดใช้งานแบบยืดหยุ่น

---

## 📝 User Workflows

### 1. เพิ่ม Admin ใหม่
```
1. คลิกปุ่ม "เพิ่มผู้ดูแลระบบ"
   ↓
2. กรอกข้อมูล:
   - Username *
   - Email *
   - ชื่อ *
   - นามสกุล *
   - โทรศัพท์
   - แผนก
   - Role *
   - Permissions
   ↓
3. คลิก "เพิ่มผู้ดูแลระบบ"
   ↓
4. แสดง Success Notification
   ↓
5. Reload รายการ Admin
```

### 2. ระงับ Admin
```
1. คลิกเมนู Dropdown ของ Admin
   ↓
2. เลือก "ระงับการใช้งาน"
   ↓
3. ยืนยัน
   ↓
4. Status เปลี่ยนเป็น "ระงับ"
   ↓
5. Admin ไม่สามารถเข้าสู่ระบบได้
```

### 3. รีเซ็ตรหัสผ่าน
```
1. คลิกเมนู Dropdown ของ Admin
   ↓
2. เลือก "รีเซ็ตรหัสผ่าน"
   ↓
3. ยืนยัน
   ↓
4. ส่งลิงก์รีเซ็ตไปยัง Email ของ Admin
```

### 4. ดูรายละเอียด Admin
```
1. คลิกปุ่ม "ดู" (👁️)
   ↓
2. Modal แสดงข้อมูล:
   - Avatar & ชื่อ
   - Role & Status Badges
   - ข้อมูลติดต่อ (Email, Phone, แผนก)
   - ข้อมูลระบบ (สร้างเมื่อ, Login ล่าสุด)
   - Permissions ทั้งหมด (แสดงเป็น Checkboxes)
   ↓
3. คลิก "แก้ไข" หรือ "ปิด"
```

---

## 🎯 Integration Points

### Dashboard Menu
```
Admin Dashboard
├── ภาพรวม
├── จัดการผู้ใช้
├── จัดการนายจ้าง
├── จัดการงาน
├── 🆕 จัดการผู้ดูแลระบบ ⭐
├── แจ้งข่าวสาร
├── การชำระเงิน
├── รายงาน
└── ตั้งค่าระบบ
```

### URL Pattern
```
dashboard.html?view=admins
```

### Required Scripts (Load Order)
```html
1. jquery-3.7.0.min.js
2. bootstrap@5.3.0
3. job-data-model.js
4. admin-data-model.js ⭐ NEW
5. translations.js
6. language.js
7. main.js
8. dashboard-admin.js
9. admin-management-functions.js ⭐ NEW
10. dashboard-functions.js
```

---

## 🧪 Testing Checklist

### ✅ Data & Model
- [ ] MOCK_ADMINS โหลดสำเร็จ
- [ ] getAllAdmins() ส่งคืนข้อมูลถูกต้อง
- [ ] getAdminById() หาข้อมูล Admin ได้
- [ ] getAdminsByRole() กรองได้ถูกต้อง
- [ ] getAdminsByStatus() กรองได้ถูกต้อง
- [ ] searchAdmins() ค้นหาได้ถูกต้อง
- [ ] getAdminStats() คำนวณสถิติถูกต้อง

### ✅ UI/UX
- [ ] Stats Cards แสดงค่าถูกต้อง
- [ ] ตารางแสดง Admin ทั้งหมด
- [ ] Avatar แสดงถูกต้อง
- [ ] Role Badges แสดงสีถูกต้อง
- [ ] Status Badges แสดงสีถูกต้อง
- [ ] Permissions Count แสดงถูกต้อง
- [ ] Last Login Format ถูกต้อง
- [ ] Responsive บน Mobile/Tablet

### ✅ Search & Filter
- [ ] ค้นหา Username ได้
- [ ] ค้นหา Email ได้
- [ ] ค้นหา ชื่อ-นามสกุล ได้
- [ ] กรอง Role ได้
- [ ] กรอง Status ได้
- [ ] รีเซ็ตฟิลเตอร์ได้
- [ ] Real-time Search ทำงาน

### ✅ Actions
- [ ] ดูรายละเอียด Modal ทำงาน
- [ ] เพิ่ม Admin Modal ทำงาน
- [ ] แก้ไข Admin ทำงาน
- [ ] ระงับ Admin ทำงาน
- [ ] เปิดใช้งาน Admin ทำงาน
- [ ] รีเซ็ตรหัสผ่านทำงาน
- [ ] ลบ Admin ทำงาน
- [ ] ป้องกันลบ Super Admin ทำงาน

### ✅ Form Validation
- [ ] Required Fields ตรวจสอบ
- [ ] Email Format ตรวจสอบ
- [ ] Phone Format ตรวจสอบ
- [ ] Role ต้องเลือก
- [ ] Permissions ติ๊กได้

---

## 🔒 Security Considerations

### 1. Role-based Access Control
```javascript
// ตรวจสอบสิทธิ์ก่อนทำงาน
if (currentUser.role !== ADMIN_ROLES.SUPER_ADMIN) {
    if (!currentUser.permissions.manageAdmins) {
        showNotification('คุณไม่มีสิทธิ์เข้าถึงส่วนนี้', 'error');
        return;
    }
}
```

### 2. Super Admin Protection
```javascript
// ไม่สามารถลบ Super Admin
if (admin.role === ADMIN_ROLES.SUPER_ADMIN) {
    showNotification('ไม่สามารถลบ Super Admin ได้', 'error');
    return;
}
```

### 3. Password Reset
```javascript
// ส่งลิงก์รีเซ็ตผ่าน Email
// ไม่แสดงรหัสผ่านใน UI
```

### 4. Activity Logging
```javascript
// บันทึก:
// - เวลา Login ล่าสุด
// - การแก้ไขข้อมูล
// - การเปลี่ยน Status
```

---

## 📈 Future Enhancements

### 1. Activity Log
- บันทึกการกระทำทั้งหมดของ Admin
- Timeline แสดงประวัติ
- Export Log เป็น CSV/PDF

### 2. Advanced Permissions
- Custom Permission Sets
- Permission Templates
- Granular Access Control

### 3. 2FA (Two-Factor Authentication)
- รหัส OTP
- Google Authenticator
- SMS Verification

### 4. Audit Trail
- Who did What, When, Where
- IP Address Logging
- Device Information

### 5. Bulk Actions
- เลือก Admin หลายคนพร้อมกัน
- Bulk Suspend/Activate
- Bulk Delete

### 6. Export/Import
- Export Admin List เป็น Excel
- Import Admin จาก CSV
- Backup/Restore

---

## 🐛 Known Limitations

1. **Mock Data Only** - ยังไม่ต่อกับ Backend API จริง
2. **No Real Authentication** - ยังไม่มีการตรวจสอบ Session จริง
3. **No Email Service** - การรีเซ็ตรหัสผ่านยังเป็น Mock
4. **No Real-time Updates** - ต้อง Reload หน้าเพื่ออัปเดตข้อมูล
5. **Limited Validation** - Form Validation ยังไม่ครบถ้วน

---

## 📞 API Integration (Future)

### Endpoints ที่ต้องการ:

```javascript
// GET - ดึงรายการ Admin
GET /api/admin/admins
GET /api/admin/admins/:id
GET /api/admin/admins?role=admin
GET /api/admin/admins?status=active

// POST - สร้าง Admin ใหม่
POST /api/admin/admins
Body: { username, email, firstName, lastName, role, permissions, ... }

// PUT - แก้ไข Admin
PUT /api/admin/admins/:id
Body: { ... }

// PATCH - อัปเดต Status
PATCH /api/admin/admins/:id/status
Body: { status: 'suspended' }

// PATCH - อัปเดต Permissions
PATCH /api/admin/admins/:id/permissions
Body: { permissions: { ... } }

// POST - รีเซ็ตรหัสผ่าน
POST /api/admin/admins/:id/reset-password

// DELETE - ลบ Admin
DELETE /api/admin/admins/:id
```

---

## 📦 Dependencies

### Required Libraries:
- ✅ jQuery 3.7.0
- ✅ Bootstrap 5.3.0
- ✅ Bootstrap Icons 1.11.0

### Custom Scripts:
- ✅ admin-data-model.js
- ✅ admin-management-functions.js
- ✅ dashboard-admin.js
- ✅ translations.js
- ✅ main.js

---

## 🎓 Usage Examples

### 1. โหลดหน้า Admin Management
```javascript
// จาก URL
window.location.href = 'dashboard.html?view=admins';

// จาก Menu
<a href="dashboard.html?view=admins">จัดการผู้ดูแลระบบ</a>

// จาก JavaScript
loadAdminManagement();
```

### 2. ค้นหา Admin
```javascript
// ค้นหาด้วย searchAdmins()
const results = searchAdmins('somchai');

// กรองตาม Role
const admins = getAdminsByRole(ADMIN_ROLES.ADMIN);

// กรองตาม Status
const activeAdmins = getActiveAdmins();
```

### 3. แสดงข้อมูล Admin
```javascript
// Get Admin
const admin = getAdminById(1);

// Display
console.log(admin.firstName + ' ' + admin.lastName);
console.log('Role: ' + getAdminRoleDisplay(admin.role));
console.log('Status: ' + getAdminStatusDisplay(admin.status));
console.log('Permissions: ' + getPermissionsCount(admin) + '/7');
```

---

**Created:** 2026-03-08  
**Last Updated:** 2026-03-08  
**Status:** ✅ Complete & Ready for Testing  
**Version:** 1.0.0
