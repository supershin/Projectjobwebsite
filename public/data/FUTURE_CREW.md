# JobCrew - Future Crew Data Model

## 🎓 Future Crew (นักศึกษาฝึกงานและบัณฑิตจบใหม่)

Data Model สำหรับหน้า Future Crew ที่รวมโอกาสสำหรับนักศึกษาและบัณฑิตจบใหม่

---

## 📋 1. Internship Data Model (15 Fields)

### **Core Information**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **1. internshipId** | String | ✅ | รหัส Internship | `"int001"` |
| **2. title** | String | ✅ | ชื่อตำแหน่ง | `"Hotel Management Internship"` |
| **3. type** | String | ✅ | ประเภท | `"Hotel Internship"`, `"Management Trainee"` |
| **4. employerId** | String | ✅ | รหัสนายจ้าง | `"emp001"` |
| **5. companyName** | String | ✅ | ชื่อบริษัท/โรงแรม | `"Grand Hyatt"` |
| **6. location** | String | ✅ | สถานที่ | `"Bangkok"` |
| **7. department** | String | ✅ | แผนก | `"Front Office"` |
| **8. duration** | String | ✅ | ระยะเวลา | `"3-6 months"` |
| **9. startDate** | String | ✅ | วันเริ่มงาน | `"2026-06-01"` |
| **10. allowance** | String | ✅ | เบี้ยเลี้ยง | `"6,000-10,000 บาท/เดือน"` |
| **11. requirements** | Array[String] | ✅ | คุณสมบัติ | `["กำลังศึกษาปี 3-4", "TOEIC 500+"]` |
| **12. benefits** | Array[String] | ✅ | สิทธิประโยชน์ | `["Free meals", "Accommodation"]` |
| **13. description** | String | ✅ | รายละเอียด | `"Hands-on experience in..."` |
| **14. applicationDeadline** | String | ✅ | วันปิดรับสมัคร | `"2026-05-15"` |
| **15. featured** | Boolean | ❌ | แนะนำ | `true`, `false` |

---

## 📖 Example Internship Object

```json
{
  "internshipId": "int001",
  "title": "Hotel Management Internship",
  "type": "Hotel Internship",
  "employerId": "emp001",
  "companyName": "Grand Hyatt Erawan Bangkok",
  "companyLogo": "https://ui-avatars.com/api/?name=Grand+Hyatt&background=0D4C92&color=fff&size=200",
  "location": "Bangkok",
  "department": "Front Office",
  "duration": "3-6 months",
  "startDate": "2026-06-01",
  "allowance": "8,000-10,000 บาท/เดือน",
  "requirements": [
    "กำลังศึกษาระดับปริญญาตรี ปี 3-4",
    "สาขาการโรงแรมและการท่องเที่ยว หรือสาขาที่เกี่ยวข้อง",
    "TOEIC 500+ หรือเทียบเท่า",
    "มีทักษะการสื่อสารที่ดี",
    "บุคลิกภาพดี มีมนุษยสัมพันธ์"
  ],
  "benefits": [
    "Free meals (3 มื้อ)",
    "Uniform provided",
    "Internship certificate",
    "Hands-on training",
    "Career opportunities"
  ],
  "description": "ฝึกงานด้านการจัดการโรงแรมระดับ 5 ดาว เรียนรู้การดำเนินงานของแผนกต่างๆ และพัฒนาทักษะการบริการระดับมืออาชีพ",
  "applicationDeadline": "2026-05-15",
  "postedDate": "2026-03-01",
  "featured": true,
  "verified": true
}
```

---

## 🎓 2. Hospitality School Data Model (18 Fields)

### **School Information**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **1. schoolId** | String | ✅ | รหัสสถาบัน | `"school001"` |
| **2. schoolName** | String | ✅ | ชื่อสถาบัน | `"Swiss Hotel Management School Thailand"` |
| **3. shortName** | String | ✅ | ชื่อย่อ | `"SHMS Thailand"` |
| **4. logo** | String (URL) | ✅ | โลโก้ | `"https://..."` |
| **5. coverImage** | String (URL) | ✅ | ภาพปก | `"https://..."` |
| **6. type** | String | ✅ | ประเภท | `"University"`, `"College"`, `"Training Center"` |
| **7. location** | String | ✅ | สถานที่ตั้ง | `"Bangkok"` |
| **8. address** | String | ✅ | ที่อยู่ | `"999 Rama 4 Road..."` |
| **9. programs** | Array[Object] | ✅ | หลักสูตร | `[{name: "...", duration: "..."}]` |
| **10. accreditations** | Array[String] | ❌ | การรับรอง | `["MOE", "UNWTO"]` |
| **11. partnerships** | Array[String] | ✅ | พันธมิตร | `["Marriott", "Hyatt"]` |
| **12. facilities** | Array[String] | ❌ | สิ่งอำนวยความสะดวก | `["Training Restaurant", "Hotel Simulation"]` |
| **13. website** | String (URL) | ✅ | เว็บไซต์ | `"https://..."` |
| **14. contactEmail** | String | ✅ | อีเมล | `"info@shms.ac.th"` |
| **15. contactPhone** | String | ✅ | เบอร์โทร | `"02-xxx-xxxx"` |
| **16. tuitionFee** | String | ❌ | ค่าเล่าเรียน | `"250,000-500,000 บาท/ปี"` |
| **17. featured** | Boolean | ❌ | แนะนำ | `true`, `false` |
| **18. verified** | Boolean | ✅ | ยืนยัน | `true`, `false` |

---

## 📖 Example School Object

```json
{
  "schoolId": "school001",
  "schoolName": "Swiss Hotel Management School Thailand",
  "shortName": "SHMS Thailand",
  "logo": "https://ui-avatars.com/api/?name=SHMS&background=c41e3a&color=fff&size=200",
  "coverImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80",
  "type": "University",
  "location": "Bangkok",
  "address": "999 Rama 4 Road, Silom, Bangkok 10500",
  "description": "สถาบันการศึกษาด้านการโรงแรมและการจัดการระดับนานาชาติ มีหลักสูตรที่ได้รับการรับรองจากสวิตเซอร์แลนด์",
  "programs": [
    {
      "name": "Bachelor of Arts in Hospitality Management",
      "duration": "4 years",
      "degree": "Bachelor",
      "description": "หลักสูตรบริหารธุรกิจการโรงแรม"
    },
    {
      "name": "Diploma in Hotel & Restaurant Management",
      "duration": "2 years",
      "degree": "Diploma",
      "description": "ประกาศนียบัตรการจัดการโรงแรมและร้านอาหาร"
    },
    {
      "name": "Certificate in Culinary Arts",
      "duration": "1 year",
      "degree": "Certificate",
      "description": "ศิลปะการประกอบอาหาร"
    }
  ],
  "accreditations": [
    "Ministry of Education (MOE)",
    "UNWTO TedQual Certified",
    "Swiss Education Group",
    "OTHM UK"
  ],
  "partnerships": [
    "Marriott International",
    "Hyatt Hotels Corporation",
    "Accor Hotels",
    "Minor Hotels",
    "Banyan Tree Hotels & Resorts"
  ],
  "facilities": [
    "Training Restaurant",
    "Hotel Simulation Rooms",
    "Professional Kitchen",
    "Library & Learning Center",
    "Computer Lab",
    "Student Lounge"
  ],
  "website": "https://www.shms.ac.th",
  "contactEmail": "info@shms.ac.th",
  "contactPhone": "02-123-4567",
  "socialMedia": {
    "facebook": "https://facebook.com/SHMSThailand",
    "instagram": "https://instagram.com/shmsthailand",
    "line": "@shmsthailand"
  },
  "tuitionFee": "350,000-450,000 บาท/ปี",
  "scholarships": true,
  "internshipPlacement": true,
  "jobPlacementRate": "95%",
  "featured": true,
  "verified": true,
  "lastUpdated": "2026-03-15"
}
```

---

## 🎯 Internship Types

| Type | Description | Duration |
|------|-------------|----------|
| `Hotel Internship` | ฝึกงานโรงแรม (แผนกต่างๆ) | 3-6 months |
| `Management Trainee` | โปรแกรมผู้บริหารฝึกหัด | 6-12 months |

---

## 🏫 School Types

| Type | Description |
|------|-------------|
| `University` | มหาวิทยาลัย |
| `College` | วิทยาลัย |
| `Training Center` | ศูนย์ฝึกอบรม |
| `Vocational School` | โรงเรียนอาชีวศึกษา |

---

## 📊 Program Degrees

| Degree | Duration | Description |
|--------|----------|-------------|
| `Bachelor` | 4 years | ปริญญาตรี |
| `Diploma` | 2-3 years | ประกาศนียบัตรวิชาชีพชั้นสูง |
| `Certificate` | 1 year | ประกาศนียบัตร |
| `Master` | 2 years | ปริญญาโท |

---

## 🔄 API Endpoints

### Internships
```
GET    /api/internships                - Get all internships
GET    /api/internships/{id}           - Get internship by ID
GET    /api/internships/type/{type}    - Get by type (Hotel/Trainee)
GET    /api/internships/location/{loc} - Get by location
GET    /api/internships/featured       - Get featured internships
POST   /api/internships                - Create internship (Employer)
PUT    /api/internships/{id}           - Update internship
DELETE /api/internships/{id}           - Delete internship
```

### Hospitality Schools
```
GET    /api/schools                    - Get all schools
GET    /api/schools/{id}               - Get school by ID
GET    /api/schools/location/{loc}     - Get by location
GET    /api/schools/featured           - Get featured schools
GET    /api/schools/{id}/programs      - Get programs from school
```

### Applications
```
POST   /api/internships/{id}/apply     - Apply for internship
GET    /api/users/{id}/applications    - Get user's applications
```

---

## 📝 Notes

1. **Internship Duration**: โดยทั่วไป 3-6 เดือนสำหรับ Hotel Internship, 6-12 เดือนสำหรับ Management Trainee
2. **Allowance Range**: 6,000-15,000 บาท/เดือน ขึ้นอยู่กับตำแหน่งและโรงแรม
3. **Requirements**: ควรระบุระดับชั้นปี, GPA, ทักษะภาษา
4. **Benefits**: อาจรวม accommodation, meals, uniform, training certificate
5. **Fresh Graduate Jobs**: ดึงจาก jobs.json โดยกรอง experienceLevel = "Entry Level" หรือ tags มี "fresh graduate"
6. **School Partnerships**: โรงแรมที่มีความร่วมมือกับสถาบัน

---

## 🎨 UI Sections

### **Section 1: Hero Banner**
- Title: "Future Crew - สร้างอนาคตของคุณกับเรา"
- Stats: Internships, Schools, Fresh Grads Hired

### **Section 2: Internship Opportunities**
- Tab 1: Hotel Internship (ฝึกงานโรงแรม)
- Tab 2: Management Trainee Programs
- Filter: Location, Department, Duration

### **Section 3: Fresh Graduate Jobs**
- Jobs filtered by experienceLevel = "Entry Level"
- Salary range: 15,000-25,000 บาท
- Training provided

### **Section 4: Hospitality Schools**
- Partner schools grid
- Programs offered
- Accreditations
- Contact information

---

**Version**: 1.0.0  
**Last Updated**: March 15, 2026  
**Target Audience**: Students & Fresh Graduates
