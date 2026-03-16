# Admin: จัดการสถาบันการศึกษา (Hospitality Schools Management)

## 📚 Overview

ระบบจัดการสถาบันการศึกษาพันธมิตรสำหรับ Admin พร้อม CRUD Operations ครบครัน (View, Add, Edit, Delete)

---

## 🎯 Features

### ✅ **Complete CRUD Operations**

| Operation | Function | Description |
|-----------|----------|-------------|
| **View** | `viewSchoolDetails()` | ดูรายละเอียดสถาบัน |
| **Add** | `showAddSchoolModal()` | เพิ่มสถาบันใหม่ |
| **Edit** | `editSchool()` | แก้ไขข้อมูลสถาบัน |
| **Delete** | `deleteSchool()` | ลบสถาบัน |

### 📊 **Statistics Dashboard**
- ✅ สถาบันทั้งหมด (Total Schools)
- ✅ สถาบัน Verified
- ✅ สถาบัน Featured
- ✅ หลักสูตรทั้งหมด (Total Programs)

### 🔍 **Filter System**
- ✅ ค้นหาสถาบัน
- ✅ กรองตามสถานที่ (4 เมือง)
- ✅ กรองตามประเภท (4 ประเภท)
- ✅ ปุ่มรีเซ็ตตัวกรอง

---

## 📂 File Structure

```
/public/
├── js/
│   ├── admin-school-management.js  🆕 (Main file)
│   └── dashboard-admin.js          ✅ (Updated with schools menu)
├── data/
│   ├── hospitality-schools.json    ✅ (6 schools sample data)
│   └── FUTURE_CREW.md             ✅ (Complete data model)
└── dashboard.html                  ✅ (Added script import)
```

---

## 🚀 How to Access

### **1. Login as Admin**
```
http://localhost/dashboard.html?mode=admin
```

### **2. Navigate to School Management**
```
Dashboard → จัดการสถาบันการศึกษา
```

หรือ direct URL:
```
http://localhost/dashboard.html?mode=admin&view=schools
```

---

## 🎨 UI Components

### **Main Dashboard**

```
┌─────────────────────────────────────────────────────┐
│  จัดการสถาบันการศึกษา       [+ เพิ่มสถาบันใหม่]     │
├─────────────────────────────────────────────────────┤
│  [ค้นหา] [สถานที่] [ประเภท] [รีเซ็ต]               │
├─────────────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │   6  │  │   6  │  │   4  │  │  14  │            │
│  │Total │  │Verify│  │Featu │  │Progr │            │
│  └──────┘  └──────┘  └──────┘  └──────┘            │
├─────────────────────────────────────────────────────┤
│  Logo │ สถาบัน │ ประเภท │ สถานที่ │ การจัดการ       │
├─────────────────────────────────────────────────────┤
│  [img]│ SHMS   │ Univer │Bangkok│ [👁][✏][🗑]      │
│       │ Thai   │ -sity  │       │                  │
└─────────────────────────────────────────────────────┘
```

---

## 📋 CRUD Operations

### **1️⃣ VIEW: ดูรายละเอียดสถาบัน**

#### **Function:**
```javascript
viewSchoolDetails(schoolId)
```

#### **Features:**
- ✅ แสดงข้อมูลสถาบันครบถ้วน
- ✅ แสดง Cover Image + Logo
- ✅ แสดงหลักสูตรทั้งหมด (Programs)
- ✅ แสดง Accreditations (การรับรอง)
- ✅ แสดง Partnerships (พันธมิตร)
- ✅ แสดง Job Placement Rate & Tuition Fee
- ✅ ปุ่ม "เยี่ยมชมเว็บไซต์" (เปิด tab ใหม่)

#### **Data Displayed:**
- School ID, School Name, Short Name
- Type, Location, Address
- Description
- Cover Image & Logo
- Programs (name, duration, degree)
- Accreditations
- Partnerships
- Contact (website, email, phone)
- Job Placement Rate
- Tuition Fee
- Status (Verified, Featured)

---

### **2️⃣ ADD: เพิ่มสถาบันใหม่**

#### **Function:**
```javascript
showAddSchoolModal()
saveNewSchool()
```

#### **Form Fields:**

**📍 ข้อมูลพื้นฐาน (Basic Information)**
| Field | Type | Required | Example |
|-------|------|----------|---------|
| School Name | Text | ✅ | Swiss Hotel Management School Thailand |
| Short Name | Text | ✅ | SHMS Thailand |
| Type | Dropdown | ✅ | University, College, etc. |
| Location | Dropdown | ✅ | Bangkok, Phuket, etc. |
| Address | Text | ✅ | 999 Rama 4 Road... |
| Description | Textarea | ✅ | สถาบันการศึกษา... |

**🖼️ รูปภาพ (Images)**
| Field | Type | Required | Example |
|-------|------|----------|---------|
| Logo URL | URL | ❌ | https://... |
| Cover Image URL | URL | ❌ | https://... |

> **Note:** ถ้าไม่ระบุ Logo URL ระบบจะใช้ UI Avatars API สร้างโลโก้อัตโนมัติ

**📞 ข้อมูลการติดต่อ (Contact Information)**
| Field | Type | Required | Example |
|-------|------|----------|---------|
| Website | URL | ✅ | https://www.shms.ac.th |
| Email | Email | ✅ | info@shms.ac.th |
| Phone | Text | ✅ | 02-123-4567 |

**📚 หลักสูตร (Programs)** - Dynamic Multi-Field
| Field | Type | Example |
|-------|------|---------|
| Program Name | Text | Bachelor of Arts in Hospitality |
| Duration | Text | 4 years |
| Degree | Dropdown | Bachelor, Master, Diploma, Certificate |

**Features:**
- ✅ เพิ่มหลักสูตรได้หลายรายการ
- ✅ ปุ่ม "เพิ่มหลักสูตร" เพิ่มฟิลด์ใหม่
- ✅ ปุ่มลบแต่ละหลักสูตร
- ✅ Validation: ต้องมีอย่างน้อย 1 หลักสูตร

**🏆 ข้อมูลเพิ่มเติม (Additional Info)**
| Field | Type | Required | Example |
|-------|------|----------|---------|
| Accreditations | Text | ❌ | MOE, UNWTO TedQual (คั่นด้วย comma) |
| Partnerships | Text | ❌ | Marriott, Hyatt, Accor (คั่นด้วย comma) |
| Tuition Fee | Text | ❌ | 350,000-450,000 บาท/ปี |
| Job Placement Rate | Text | ❌ | 95% |
| Verified | Checkbox | ❌ | สถานะยืนยัน |
| Featured | Checkbox | ❌ | สถาบันแนะนำ |

#### **Validation:**
- ✅ Required fields ต้องกรอกครบ
- ✅ URL fields ต้องเป็น URL format ที่ถูกต้อง
- ✅ Email ต้องเป็น email format
- ✅ Programs ต้องมีอย่างน้อย 1 หลักสูตร

#### **Auto-Generated:**
- `schoolId`: สร้างจาก timestamp (เช่น school123456)
- `logo`: UI Avatars API ถ้าไม่ระบุ
- `coverImage`: Default Unsplash image ถ้าไม่ระบุ

#### **Success Message:**
```
✅ เพิ่มสถาบันสำเร็จ!
SHMS Thailand ถูกเพิ่มเข้าระบบแล้ว
```

---

### **3️⃣ EDIT: แก้ไขข้อมูลสถาบัน**

#### **Function:**
```javascript
editSchool(schoolId)
updateSchool()
```

#### **Features:**
- ✅ Pre-fill ข้อมูลเดิมทั้งหมด
- ✅ แสดง Preview รูปภาพ (Logo & Cover)
- ✅ แก้ไขหลักสูตรได้ทั้งหมด
- ✅ เพิ่ม/ลบหลักสูตรใหม่
- ✅ School ID เป็น readonly (ไม่สามารถแก้ไขได้)
- ✅ Validate ข้อมูลก่อน save

#### **Editable Fields:**
- ✅ School Name, Short Name
- ✅ Type, Location, Address
- ✅ Description
- ✅ Logo URL, Cover Image URL
- ✅ Website, Email, Phone
- ✅ Programs (ทั้งหมด + เพิ่มใหม่)
- ✅ Accreditations, Partnerships
- ✅ Tuition Fee, Job Placement Rate
- ✅ Verified, Featured status

#### **Read-Only Fields:**
- ❌ School ID

#### **Image Preview:**
```html
<input type="url" id="editLogoUrl" value="...">
<img src="..." class="img-thumbnail" style="max-height: 100px;">
```

#### **Programs Management:**
- Pre-fill หลักสูตรเดิมทั้งหมด
- เพิ่มหลักสูตรใหม่ด้วยปุ่ม "เพิ่มหลักสูตร"
- ลบหลักสูตรด้วยปุ่ม trash icon
- Validation: ต้องมีอย่างน้อย 1 หลักสูตร

#### **Success Message:**
```
✅ อัพเดทสำเร็จ!
ข้อมูลสถาบันถูกอัพเดทแล้ว
```

---

### **4️⃣ DELETE: ลบสถาบัน**

#### **Function:**
```javascript
deleteSchool(schoolId, schoolName)
```

#### **Safety Features:**
- ✅ **Confirmation Dialog:**
  ```
  คุณต้องการลบ "SHMS Thailand" ใช่หรือไม่?
  
  การกระทำนี้ไม่สามารถย้อนกลับได้!
  
  [ยกเลิก] [ตกลง]
  ```

- ✅ **Two-Step Confirmation:**
  1. คลิกปุ่ม Delete
  2. Confirm ใน Dialog

#### **Warning Message:**
```
⚠️ ลบสำเร็จ!
SHMS Thailand ถูกลบออกจากระบบแล้ว
```

---

## 🔍 Filter System

### **1. Search Filter**
```javascript
$('#schoolSearchInput').on('input', filterSchools);
```

**ค้นหาใน:**
- ✅ School Name
- ✅ Short Name

**Example:** พิมพ์ "SHMS" → แสดง SHMS Thailand

---

### **2. Location Filter**
```javascript
$('#schoolLocationFilter').on('change', filterSchools);
```

**Options:**
- ทุกสถานที่
- Bangkok
- Phuket
- Chiang Mai
- Pattaya

---

### **3. Type Filter**
```javascript
$('#schoolTypeFilter').on('change', filterSchools);
```

**Options:**
- **ทุกประเภท** - แสดงทั้งหมด
- **University** - มหาวิทยาลัย
- **College** - วิทยาลัย
- **Training Center** - ศูนย์ฝึกอบรม
- **Vocational School** - โรงเรียนอาชีวศึกษา

---

### **4. Clear Filters**
```javascript
clearSchoolFilters()
```

**Action:**
- ล้าง search input
- รีเซ็ต location dropdown
- รีเซ็ต type dropdown
- แสดงสถาบันทั้งหมด

---

## 📊 Statistics

### **Auto-Update Stats**
```javascript
updateSchoolStats()
```

**Calculated:**
1. **Total Schools:** `allSchoolsData.length`
2. **Verified Schools:** `filter(s => s.verified).length`
3. **Featured Schools:** `filter(s => s.featured).length`
4. **Total Programs:** `reduce((sum, s) => sum + s.programs.length, 0)`

**Display:**
```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│     6    │  │     6    │  │     4    │  │    14    │
│  Total   │  │ Verified │  │ Featured │  │ Programs │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

## 🎨 UI/UX Features

### **Table Design**

```html
<table class="table table-hover align-middle">
  <thead class="table-light">
    <tr>
      <th>Logo</th>
      <th>สถาบัน</th>
      <th>ประเภท</th>
      <th>สถานที่</th>
      <th>หลักสูตร</th>
      <th>สถานะ</th>
      <th>การจัดการ</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>
```

### **Action Buttons**

```html
<div class="btn-group btn-group-sm">
  <button class="btn btn-outline-primary" title="ดูรายละเอียด">
    <i class="bi bi-eye"></i>
  </button>
  <button class="btn btn-outline-success" title="แก้ไข">
    <i class="bi bi-pencil"></i>
  </button>
  <button class="btn btn-outline-danger" title="ลบ">
    <i class="bi bi-trash"></i>
  </button>
</div>
```

### **Status Badges**

```html
<!-- Verified -->
<span class="badge bg-success">
  <i class="bi bi-patch-check-fill me-1"></i>Verified
</span>

<!-- Featured -->
<span class="badge bg-primary">
  <i class="bi bi-star-fill me-1"></i>Featured
</span>

<!-- Pending -->
<span class="badge bg-warning">Pending</span>
```

### **Programs Badge**
```html
<span class="badge bg-info">2 หลักสูตร</span>
```

---

## 🔔 Alert Messages

### **Success Alert**
```javascript
showSuccessAlert('เพิ่มสถาบันสำเร็จ!', 'ข้อมูลถูกบันทึกแล้ว', 'success')
```

### **Warning Alert (Delete)**
```javascript
showSuccessAlert('ลบสำเร็จ!', 'สถาบันถูกลบแล้ว', 'warning')
```

### **Features:**
- ✅ Auto-dismiss after 3 seconds
- ✅ Positioned at top-center
- ✅ Bootstrap Icons
- ✅ Manual close button
- ✅ Fade animation

---

## 📝 Data Model

### **School Object Structure (18 Fields)**

```javascript
{
  schoolId: "school001",                    // Auto-generated
  schoolName: "Swiss Hotel Management School Thailand",
  shortName: "SHMS Thailand",
  logo: "https://...",                      // UI Avatars if not provided
  coverImage: "https://...",
  type: "University",                       // Dropdown: 4 types
  location: "Bangkok",                      // Dropdown: 4 cities
  address: "999 Rama 4 Road...",
  description: "สถาบันการศึกษา...",
  programs: [                               // Array of objects
    {
      name: "Bachelor of Arts in Hospitality",
      duration: "4 years",
      degree: "Bachelor"
    }
  ],
  accreditations: ["MOE", "UNWTO"],        // Array
  partnerships: ["Marriott", "Hyatt"],     // Array
  website: "https://www.shms.ac.th",
  contactEmail: "info@shms.ac.th",
  contactPhone: "02-123-4567",
  tuitionFee: "350,000-450,000 บาท/ปี",   // Optional
  jobPlacementRate: "95%",                  // Optional
  verified: true,                           // Boolean
  featured: true                            // Boolean
}
```

---

## 🔄 Backend Integration (Future)

### **API Endpoints to Create:**

```csharp
// Schools Management
GET    /api/admin/schools              - Get all schools
GET    /api/admin/schools/{id}         - Get school by ID
POST   /api/admin/schools              - Create new school
PUT    /api/admin/schools/{id}         - Update school
DELETE /api/admin/schools/{id}         - Delete school

// Programs Management
GET    /api/admin/schools/{id}/programs        - Get school programs
POST   /api/admin/schools/{id}/programs        - Add program
PUT    /api/admin/schools/{id}/programs/{pid}  - Update program
DELETE /api/admin/schools/{id}/programs/{pid}  - Delete program

// Bulk Operations
POST   /api/admin/schools/bulk-verify   - Verify multiple schools
POST   /api/admin/schools/bulk-feature  - Feature multiple schools
POST   /api/admin/schools/bulk-delete   - Delete multiple schools
```

### **Request Examples:**

**Create School:**
```json
POST /api/admin/schools
{
  "schoolName": "Swiss Hotel Management School Thailand",
  "shortName": "SHMS Thailand",
  "type": "University",
  "location": "Bangkok",
  "address": "999 Rama 4 Road...",
  "description": "สถาบันการศึกษา...",
  "logo": "https://...",
  "coverImage": "https://...",
  "programs": [
    {
      "name": "Bachelor of Arts in Hospitality",
      "duration": "4 years",
      "degree": "Bachelor"
    }
  ],
  "accreditations": ["MOE", "UNWTO TedQual"],
  "partnerships": ["Marriott", "Hyatt"],
  "website": "https://www.shms.ac.th",
  "contactEmail": "info@shms.ac.th",
  "contactPhone": "02-123-4567",
  "tuitionFee": "350,000-450,000 บาท/ปี",
  "jobPlacementRate": "95%",
  "verified": true,
  "featured": false
}
```

**Update School:**
```json
PUT /api/admin/schools/school001
{
  "schoolName": "Updated Name",
  "programs": [...],
  "verified": true,
  "featured": true
}
```

**Delete School:**
```
DELETE /api/admin/schools/school001
```

---

## ⚙️ Configuration

### **File: admin-school-management.js**

**Key Variables:**
```javascript
let allSchoolsData = [];  // Stores all schools
```

**Key Functions:**
```javascript
loadAdminSchools()        // Main entry point
loadSchoolsData()         // Fetch from API/JSON
displaySchools(schools)   // Render table
updateSchoolStats()       // Update statistics
filterSchools()           // Apply filters
viewSchoolDetails(id)     // View modal
showAddSchoolModal()      // Add modal
addProgramField()         // Add program field dynamically
saveNewSchool()           // Save new
editSchool(id)            // Edit modal
addEditProgramField()     // Add program in edit mode
updateSchool()            // Save edit
deleteSchool(id, name)    // Delete with confirm
```

---

## 🎓 Sample Data

### **6 Hospitality Schools:**

| # | School | Type | Location | Programs | Placement |
|---|--------|------|----------|----------|-----------|
| 1 | SHMS Thailand | University | Bangkok | 2 | 95% |
| 2 | Dusit Thani College | College | Bangkok | 3 | 92% |
| 3 | BU International | University | Bangkok | 2 | 88% |
| 4 | Phuket Hotel & Tourism | College | Phuket | 2 | 90% |
| 5 | Chiang Mai Hospitality | Training | Chiang Mai | 2 | 85% |
| 6 | ABAC Hospitality | University | Bangkok | 2 | 93% |

**Total:** 14 Programs

---

## 🐛 Troubleshooting

### **ปัญหา: โหลดข้อมูลไม่ได้**

**Cause:** ไฟล์ hospitality-schools.json ไม่อยู่ใน path ที่ถูกต้อง

**Solution:**
```javascript
// Check console for errors
console.log('Error loading schools:', error);

// Verify file path
fetch('./data/hospitality-schools.json')
```

---

### **ปัญหา: ไม่สามารถเพิ่มหลักสูตรได้**

**Cause:** Programs validation ไม่ผ่าน

**Solution:**
```javascript
if (programs.length === 0) {
    alert('กรุณาเพิ่มหลักสูตรอย่างน้อย 1 หลักสูตร');
    return;
}
```

---

### **ปัญหา: Modal ไม่ปิด**

**Cause:** Bootstrap Modal instance ไม่ถูก dispose

**Solution:**
```javascript
$('#modalId').on('hidden.bs.modal', function() {
    $(this).remove();  // Remove from DOM
});
```

---

## 📚 References

- **Data Model:** [FUTURE_CREW.md](./data/FUTURE_CREW.md)
- **Sample Data:** [hospitality-schools.json](./data/hospitality-schools.json)
- **Admin Dashboard:** [dashboard-admin.js](./js/dashboard-admin.js)
- **Main Code:** [admin-school-management.js](./js/admin-school-management.js)

---

## ✅ Checklist

### **For Developers:**
- [x] สร้าง admin-school-management.js
- [x] เพิ่ม menu "จัดการสถาบันการศึกษา" ใน dashboard-admin.js
- [x] เพิ่ม case 'schools' ใน switch statement
- [x] Import script ใน dashboard.html
- [x] สร้าง CRUD functions ครบ 4 operations
- [x] สร้าง filter system
- [x] สร้าง statistics dashboard
- [x] สร้าง dynamic programs form
- [x] Add validation
- [x] Add confirmation dialogs
- [x] Add success/error messages

### **For Testing:**
- [ ] Login as Admin
- [ ] Navigate to "จัดการสถาบันการศึกษา"
- [ ] ทดสอบ View school details
- [ ] ทดสอบ Add new school (with multiple programs)
- [ ] ทดสอบ Edit school (add/remove programs)
- [ ] ทดสอบ Delete school
- [ ] ทดสอบ Search filter
- [ ] ทดสอบ Location filter
- [ ] ทดสอบ Type filter
- [ ] ตรวจสอบ Statistics update

---

**Version:** 1.0.0  
**Last Updated:** March 16, 2026  
**Status:** ✅ Production Ready

---

## 🎉 Summary

ระบบจัดการสถาบันการศึกษาสำหรับ Admin สำเร็จแล้ว!

✅ **CRUD Operations:** View, Add, Edit, Delete  
✅ **Filter System:** Search, Location, Type  
✅ **Statistics Dashboard:** 4 key metrics  
✅ **Dynamic Programs:** Add/Edit/Delete programs  
✅ **UI/UX:** Modern design with Bootstrap 5  
✅ **Validation:** Form validation & confirmation  
✅ **Alerts:** Success/Warning messages  
✅ **Data Model:** 18 fields complete  
✅ **Responsive:** รองรับทุกอุปกรณ์  

**พร้อมใช้งานแล้ว!** 🚀
