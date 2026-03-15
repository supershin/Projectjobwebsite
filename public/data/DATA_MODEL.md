# JobCrew - Job Data Model Documentation

## 📊 Complete Job Data Model (20 Fields)

ระบบ JobCrew ใช้ Job Data Model ที่ประกอบด้วย 20 fields เพื่อจัดเก็บข้อมูลงานอย่างครบถ้วน

---

### **🔑 Core Fields (1-10)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **1. id** | String | ✅ | รหัสประจำตัวงาน (Unique) | `"1"`, `"2"` |
| **2. title** | String | ✅ | ชื่อตำแหน่งงาน | `"Front Office Manager"` |
| **3. company** | String | ✅ | ชื่อบริษัท/โรงแรม | `"Grand Hyatt Erawan Bangkok"` |
| **4. companyLogo** | String (URL) | ❌ | URL โลโก้บริษัท | `"https://..."` |
| **5. location** | String | ✅ | สถานที่ทำงาน | `"Bangkok"`, `"Phuket"`, `"International"` |
| **6. department** | String | ✅ | แผนกงาน | `"Front Office"`, `"Culinary"` |
| **7. type** | String | ✅ | ประเภทงาน | `"full-time"`, `"part-time"`, `"contract"`, `"internship"` |
| **8. salary** | String | ✅ | ช่วงเงินเดือน | `"45,000 - 65,000 บาท"` |
| **9. description** | String | ✅ | รายละเอียดงาน | `"รับสมัคร Front Office Manager..."` |
| **10. requirements** | Array[String] | ✅ | คุณสมบัติที่ต้องการ | `["ปริญญาตรี...", "ประสบการณ์ 3 ปี..."]` |

---

### **💼 Additional Fields (11-20)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **11. benefits** | Array[String] | ✅ | สวัสดิการ | `["ประกันสุขภาพ", "โบนัส", "อาหารฟรี"]` |
| **12. employerId** | String | ✅ | รหัสนายจ้าง | `"emp001"` |
| **13. employerName** | String | ✅ | ชื่อนายจ้าง | `"Grand Hyatt Erawan Bangkok"` |
| **14. postedDate** | String (ISO Date) | ✅ | วันที่ประกาศงาน | `"2026-03-14"` |
| **15. expiryDate** | String (ISO Date) | ✅ | วันหมดเขตรับสมัคร | `"2026-04-14"` |
| **16. status** | String | ✅ | สถานะงาน | `"active"`, `"closed"`, `"expired"` |
| **17. applicantsCount** | Number | ✅ | จำนวนผู้สมัคร | `23`, `45` |
| **18. urgent** | Boolean | ❌ | ต้องการด่วน | `true`, `false` |
| **19. featured** | Boolean | ❌ | งานแนะนำ/เด่น | `true`, `false` |
| **20. recommended** | Boolean | ❌ | งานแนะนำ | `true`, `false` |

---

### **🆕 Extended Fields (Bonus)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **priority** | String | ❌ | ระดับความสำคัญ | `"high"`, `"medium"`, `"low"` |
| **experienceLevel** | String | ❌ | ระดับประสบการณ์ | `"Entry Level"`, `"Mid-Level"`, `"Senior"`, `"Executive"` |
| **educationRequired** | String | ❌ | วุฒิการศึกษา | `"Bachelor's Degree"`, `"High School"`, `"Master's Degree"` |
| **popular** | Boolean | ❌ | งานยอดนิยม | `true`, `false` |

---

## 📍 **Location Values** (7 ตัวเลือก)

| Value | Display Name |
|-------|--------------|
| `Bangkok` | Bangkok – กรุงเทพฯ |
| `Phuket` | Phuket – ภูเก็ต |
| `Chiang Mai` | Chiang Mai – เชียงใหม่ |
| `Pattaya` | Pattaya – พัทยา |
| `Samui` | Samui – สมุย |
| `Hua Hin` | Hua Hin – หัวหิน |
| `International` | International – ต่างประเทศ |

---

## 🏢 **Department Values** (10 แผนก)

| Value | Display Name (TH) | Icon |
|-------|-------------------|------|
| `Front Office` | แผนกต้อนรับ | 🏨 |
| `Housekeeping` | แผนกแม่บ้าน | 🧹 |
| `Engineering` | แผนกวิศวกรรม | 🔧 |
| `Food & Beverage` | อาหารและเครื่องดื่ม | 🍽️ |
| `Culinary` | ครัว | 👨‍🍳 |
| `Human Resources` | ทรัพยากรบุคคล | 👥 |
| `Sales & Marketing` | ขายและการตลาด | 📢 |
| `Revenue & Reservation` | รายได้และจอง | 💰 |
| `Finance & Accounting` | การเงินและบัญชี | 📊 |
| `Hotel Management` | บริหารโรงแรม | 💼 |

---

## 🕒 **Job Type Values**

| Value | Display Name |
|-------|--------------|
| `full-time` | Full-Time – งานประจำ |
| `part-time` | Part-Time – งานพาร์ทไทม์ |
| `internship` | Internship – ฝึกงาน |

---

## ✅ **Status Values**

| Value | Display | Description |
|-------|---------|-------------|
| `active` | เปิดรับสมัคร | งานที่เปิดรับสมัครอยู่ |
| `closed` | ปิดรับสมัคร | งานที่ปิดรับสมัครแล้ว |
| `expired` | หมดเขต | งานที่หมดเขตรับสมัคร |

---

## 🎯 **Priority Values**

| Value | Use Case |
|-------|----------|
| `high` | ตำแหน่งสำคัญ/ด่วนมาก |
| `medium` | ตำแหน่งปกติ |
| `low` | ตำแหน่งทั่วไป |

---

## 👔 **Experience Level Values**

| Value | Description |
|-------|-------------|
| `Entry Level` | จบใหม่/ไม่ต้องมีประสบการณ์ |
| `Mid-Level` | ประสบการณ์ 2-5 ปี |
| `Senior` | ประสบการณ์ 5-10 ปี |
| `Executive` | ระดับผู้บริหาร 10+ ปี |

---

## 📖 **Example Job Object**

```json
{
  "id": "1",
  "title": "Front Office Manager",
  "company": "Grand Hyatt Erawan Bangkok",
  "companyLogo": "https://ui-avatars.com/api/?name=Grand+Hyatt&background=0D4C92&color=fff&size=100",
  "location": "Bangkok",
  "department": "Front Office",
  "type": "full-time",
  "salary": "45,000 - 65,000 บาท",
  "description": "รับสมัคร Front Office Manager เพื่อดูแลและบริหารจัดการแผนกต้อนรับส่วนหน้า...",
  "requirements": [
    "ปริญญาตรี สาขาการโรงแรมและการท่องเที่ยว หรือสาขาที่เกี่ยวข้อง",
    "ประสบการณ์ด้าน Front Office ในโรงแรม 5 ดาวอย่างน้อย 3 ปี",
    "มีทักษะภาษาอังกฤษระดับดี (TOEIC 700+)",
    "มีความเป็นผู้นำและสามารถบริหารทีมงานได้",
    "มีทักษะการแก้ปัญหาและการตัดสินใจที่ดี"
  ],
  "benefits": [
    "ประกันสุขภาพและประกันชีวิต",
    "โบนัสประจำปีตามผลงาน",
    "ส่วนลดห้องพักโรงแรมในเครือ",
    "ชุดยูนิฟอร์มและอาหารพนักงาน",
    "กองทุนสำรองเลี้ยงชีพ"
  ],
  "employerId": "emp001",
  "employerName": "Grand Hyatt Erawan Bangkok",
  "postedDate": "2026-03-14",
  "expiryDate": "2026-04-14",
  "status": "active",
  "applicantsCount": 23,
  "urgent": true,
  "featured": true,
  "recommended": true,
  "priority": "high",
  "experienceLevel": "Senior",
  "educationRequired": "Bachelor's Degree"
}
```

---

## 🔍 **Filter Quick Reference**

### Quick Filter Types (ตัวกรองด่วน)
- `all` - ตำแหน่งงานทั้งหมด
- `latest` - งานใหม่ล่าสุด (7 วันล่าสุด)
- `urgent` - ตำแหน่งที่ต้องการด่วน (`urgent === true` หรือ `priority === "high"`)
- `recommended` - ตำแหน่งแนะนำ (`featured === true` หรือ `recommended === true`)

### Salary Ranges
- `0-20000` - ต่ำกว่า 20,000 บาท
- `20000-40000` - 20,000 - 40,000 บาท
- `40000-60000` - 40,000 - 60,000 บาท
- `60000-80000` - 60,000 - 80,000 บาท
- `80000+` - มากกว่า 80,000 บาท

---

## 📝 **Notes**

1. **Date Format**: ใช้ ISO 8601 format `YYYY-MM-DD`
2. **Boolean Fields**: ใช้ `true`/`false` (lowercase)
3. **Arrays**: ใช้สำหรับ requirements และ benefits
4. **Required Fields**: Fields ที่มี ✅ จำเป็นต้องมีในทุก job object
5. **Company Logo**: ถ้าไม่มี จะใช้ UI Avatars API สร้าง placeholder

---

## 🔄 **Backend Integration**

### API Endpoints (สำหรับ .NET 8 MVC)

```
GET    /api/jobs              - Get all jobs (with filters)
GET    /api/jobs/{id}         - Get job by ID
POST   /api/jobs              - Create new job (Employer only)
PUT    /api/jobs/{id}         - Update job (Employer only)
DELETE /api/jobs/{id}         - Delete job (Admin only)
GET    /api/jobs/search       - Search jobs (with query params)
GET    /api/jobs/filter       - Filter jobs by department, location, type
```

### Query Parameters
- `?department=Front Office` - Filter by department
- `?location=Bangkok` - Filter by location
- `?type=full-time` - Filter by job type
- `?search=Manager` - Search in title and company
- `?urgent=true` - Show only urgent jobs
- `?featured=true` - Show only featured jobs

---

## 📚 **Related Documentation**

สำหรับข้อมูล Data Model อื่นๆ โปรดดูที่:

1. **[USER_MODELS.md](./USER_MODELS.md)** 
   - User Data Model (ผู้ใช้ทั่วไป / ผู้หางาน)
   - Employer Data Model (นายจ้าง / ผู้โพสต์งาน)
   - Admin Data Model (ผู้ดูแลระบบ)
   - Job Application Data Model

2. **[PAYMENT_SUBSCRIPTION.md](./PAYMENT_SUBSCRIPTION.md)**
   - Subscription Plans (แพ็กเกจสมาชิก 4 แบบ)
   - Payment Data Model
   - Invoice Data Model
   - Credit System
   - Promotions & Discounts

3. **[jobs.json](./jobs.json)**
   - ข้อมูลตัวอย่างงาน 34 ตำแหน่ง
   - ครอบคลุมทุกแผนกและประเภทงาน
   - พร้อมสำหรับ Development

---

**Version**: 1.0.0  
**Last Updated**: March 15, 2026  
**Total Jobs**: 34 jobs (30 Full-Time, 1 Part-Time, 4 Internships)