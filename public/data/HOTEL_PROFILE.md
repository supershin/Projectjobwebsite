# JobCrew - Hotel/Employer Profile Data Model

## 🏨 Hotel Profile (โรงแรมพันธมิตร)

Data Model สำหรับหน้าโปรไฟล์โรงแรม/นายจ้างที่แสดงข้อมูลแบบเต็มรูปแบบให้ผู้หางานเห็น

---

## 📋 Complete Hotel Profile Fields (25 Fields)

### **🔑 Core Information (1-8)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **1. hotelId** | String | ✅ | รหัสโรงแรม (Unique) | `"hotel001"` |
| **2. employerId** | String | ✅ | รหัสนายจ้าง (FK) | `"emp001"` |
| **3. brandName** | String | ✅ | ชื่อแบรนด์ | `"Grand Hyatt"` |
| **4. hotelName** | String | ✅ | ชื่อโรงแรม | `"Grand Hyatt Erawan Bangkok"` |
| **5. logo** | String (URL) | ✅ | URL โลโก้โรงแรม | `"https://..."` |
| **6. coverImage** | String (URL) | ✅ | ภาพปก | `"https://..."` |
| **7. tagline** | String | ✅ | คำขวัญ/สโลแกน | `"Where Luxury Meets Hospitality"` |
| **8. location** | String | ✅ | สถานที่ตั้ง | `"Bangkok"` |

---

### **🏢 About the Brand (9-15)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **9. about** | String (Long Text) | ✅ | เกี่ยวกับแบรนด์ | `"Grand Hyatt is a leader..."` |
| **10. brandStory** | String (Long Text) | ❌ | เรื่องราวแบรนด์ | `"Founded in 1980..."` |
| **11. brandValues** | Array[String] | ❌ | ค่านิยมองค์กร | `["Excellence", "Integrity", "Innovation"]` |
| **12. hotelType** | String | ✅ | ประเภทโรงแรม | `"5-Star Luxury Hotel"`, `"Beach Resort"` |
| **13. yearEstablished** | Number | ❌ | ปีที่ก่อตั้ง | `1980` |
| **14. numberOfProperties** | Number | ❌ | จำนวนสาขา | `50` (ทั่วโลก) |
| **15. companySize** | String | ✅ | ขนาดบริษัท | `"500+ employees"` |

---

### **🎯 Work Culture (16-20)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **16. workCulture** | String (Long Text) | ✅ | วัฒนธรรมการทำงาน | `"We believe in work-life balance..."` |
| **17. cultureHighlights** | Array[String] | ✅ | จุดเด่นวัฒนธรรม | `["Work-Life Balance", "Career Growth", "Diversity"]` |
| **18. employeeTestimonials** | Array[Object] | ❌ | คำรับรองจากพนักงาน | `[{name: "...", position: "...", quote: "..."}]` |
| **19. awards** | Array[Object] | ❌ | รางวัลที่ได้รับ | `[{title: "Best Employer 2025", year: 2025}]` |
| **20. certifications** | Array[String] | ❌ | การรับรอง | `["ISO 9001", "Great Place to Work Certified"]` |

---

### **💼 Benefits & Perks (21-23)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **21. benefits** | Array[Object] | ✅ | สวัสดิการ | `[{icon: "...", title: "...", description: "..."}]` |
| **22. perks** | Array[String] | ❌ | สิทธิพิเศษ | `["Free Meals", "Staff Discounts", "Gym Membership"]` |
| **23. trainingPrograms** | Array[Object] | ❌ | โปรแกรมอบรม | `[{name: "Leadership Training", duration: "6 months"}]` |

---

### **📊 Current Opportunities & Media (24-25)**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **24. openPositions** | Number | ✅ | จำนวนตำแหน่งเปิดรับ | `12` |
| **25. gallery** | Object | ✅ | รูปภาพและวิดีโอ | `{photos: [...], videos: [...]}` |

---

## 📖 Example Hotel Profile Object

```json
{
  "hotelId": "hotel001",
  "employerId": "emp001",
  "brandName": "Grand Hyatt",
  "hotelName": "Grand Hyatt Erawan Bangkok",
  "logo": "https://ui-avatars.com/api/?name=Grand+Hyatt&background=0D4C92&color=fff&size=200",
  "coverImage": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920",
  "tagline": "Where Luxury Meets Exceptional Hospitality",
  "location": "Bangkok",
  
  "about": "Grand Hyatt Erawan Bangkok is a premier luxury hotel located in the heart of Bangkok's business and shopping district. With over 40 years of excellence, we provide world-class service and unforgettable experiences.",
  
  "brandStory": "Founded in 1980, Grand Hyatt has been a symbol of luxury hospitality in Thailand. Our commitment to excellence and our people-first culture has made us one of the most sought-after employers in the industry.",
  
  "brandValues": [
    "Excellence in Service",
    "Respect & Integrity", 
    "Innovation & Creativity",
    "Teamwork & Collaboration"
  ],
  
  "hotelType": "5-Star Luxury Hotel",
  "yearEstablished": 1980,
  "numberOfProperties": 50,
  "companySize": "500+ employees",
  
  "workCulture": "At Grand Hyatt, we believe in nurturing talent and fostering a culture of continuous learning. Our team members are our greatest asset, and we invest in their development through comprehensive training programs, mentorship, and career advancement opportunities.",
  
  "cultureHighlights": [
    "Work-Life Balance Programs",
    "Career Growth & Development",
    "Diversity & Inclusion",
    "Employee Recognition Programs",
    "Global Opportunities",
    "Innovation & Technology"
  ],
  
  "employeeTestimonials": [
    {
      "name": "สมชาย ใจดี",
      "position": "Front Office Manager",
      "tenure": "5 years",
      "photo": "https://ui-avatars.com/api/?name=Somchai&background=4f46e5&color=fff",
      "quote": "Grand Hyatt ไม่ใช่แค่ที่ทำงาน แต่เป็นครอบครัวที่สอง ฉันได้เติบโตทั้งในด้านอาชีพและบุคลิกภาพที่นี่",
      "rating": 5
    },
    {
      "name": "วิภา สวยงาม",
      "position": "Executive Chef",
      "tenure": "8 years",
      "photo": "https://ui-avatars.com/api/?name=Wipa&background=ec4899&color=fff",
      "quote": "โอกาสในการพัฒนาทักษะและความคิดสร้างสรรค์ไม่มีที่สิ้นสุด ผู้บริหารให้การสนับสนุนและส่งเสริมอย่างเต็มที่",
      "rating": 5
    }
  ],
  
  "awards": [
    {
      "title": "Best Employer of the Year 2025",
      "issuer": "Thailand HR Awards",
      "year": 2025,
      "icon": "🏆"
    },
    {
      "title": "Top 10 Hotels in Asia",
      "issuer": "Travel + Leisure",
      "year": 2024,
      "icon": "⭐"
    },
    {
      "title": "Excellence in Hospitality",
      "issuer": "Asian Hospitality Awards",
      "year": 2024,
      "icon": "🎖️"
    }
  ],
  
  "certifications": [
    "ISO 9001:2015 Certified",
    "Great Place to Work Certified",
    "Green Hotel Certified",
    "SHA Plus Certified"
  ],
  
  "benefits": [
    {
      "icon": "💰",
      "title": "Competitive Salary",
      "description": "เงินเดือนที่แข่งขันได้พร้อมโบนัสประจำปี"
    },
    {
      "icon": "🏥",
      "title": "Health Insurance",
      "description": "ประกันสุขภาพและประกันชีวิตสำหรับพนักงานและครอบครัว"
    },
    {
      "icon": "🎓",
      "title": "Training & Development",
      "description": "โปรแกรมอบรมและพัฒนาทักษะอย่างต่อเนื่อง"
    },
    {
      "icon": "🌴",
      "title": "Vacation Days",
      "description": "วันหยุดพักผ่อนประจำปี 15-20 วัน"
    },
    {
      "icon": "🍽️",
      "title": "Free Meals",
      "description": "อาหารฟรี 3 มื้อสำหรับพนักงานทุกคน"
    },
    {
      "icon": "🏨",
      "title": "Hotel Discounts",
      "description": "ส่วนลดห้องพักโรงแรมในเครือทั่วโลก 50-70%"
    },
    {
      "icon": "💪",
      "title": "Fitness Center",
      "description": "ฟรีสมาชิกฟิตเนสและสปา"
    },
    {
      "icon": "🚌",
      "title": "Transportation",
      "description": "รถรับส่งพนักงานฟรี"
    },
    {
      "icon": "👶",
      "title": "Childcare Support",
      "description": "เงินสนับสนุนค่าเลี้ยงดูบุตร"
    },
    {
      "icon": "📚",
      "title": "Education Allowance",
      "description": "ทุนการศึกษาสำหรับพนักงานและบุตร"
    }
  ],
  
  "perks": [
    "Uniform & Laundry Service",
    "Birthday Leave",
    "Performance Bonuses",
    "Service Charge",
    "Provident Fund",
    "Social Security",
    "Annual Health Check-up",
    "Employee Recognition Awards",
    "Team Building Activities",
    "Global Career Opportunities"
  ],
  
  "trainingPrograms": [
    {
      "name": "New Employee Orientation",
      "duration": "1 week",
      "description": "ปฐมนิเทศพนักงานใหม่อย่างครบถ้วน"
    },
    {
      "name": "Leadership Development Program",
      "duration": "6 months",
      "description": "พัฒนาทักษะผู้นำสำหรับพนักงานที่มีศักยภาพ"
    },
    {
      "name": "Technical Skills Training",
      "duration": "Ongoing",
      "description": "อบรมทักษะเฉพาะทางตามแผนก"
    },
    {
      "name": "Language Training",
      "duration": "3-6 months",
      "description": "อบรมภาษาต่างประเทศ (อังกฤษ, จีน, ญี่ปุ่น)"
    }
  ],
  
  "openPositions": 12,
  
  "gallery": {
    "photos": [
      {
        "id": "1",
        "url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        "caption": "Hotel Exterior",
        "category": "Building"
      },
      {
        "id": "2",
        "url": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        "caption": "Luxury Lobby",
        "category": "Interior"
      },
      {
        "id": "3",
        "url": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        "caption": "Fine Dining Restaurant",
        "category": "Restaurant"
      },
      {
        "id": "4",
        "url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        "caption": "Our Team",
        "category": "Team"
      },
      {
        "id": "5",
        "url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
        "caption": "Training Session",
        "category": "Training"
      },
      {
        "id": "6",
        "url": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
        "caption": "Guest Services",
        "category": "Service"
      }
    ],
    "videos": [
      {
        "id": "1",
        "title": "A Day in the Life at Grand Hyatt",
        "thumbnail": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
        "url": "https://www.youtube.com/watch?v=example1",
        "duration": "3:45"
      },
      {
        "id": "2",
        "title": "Career Opportunities at Grand Hyatt",
        "thumbnail": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
        "url": "https://www.youtube.com/watch?v=example2",
        "duration": "5:20"
      }
    ]
  },
  
  "socialMedia": {
    "facebook": "https://facebook.com/grandhyattbkk",
    "instagram": "https://instagram.com/grandhyattbkk",
    "linkedin": "https://linkedin.com/company/hyatt",
    "website": "https://www.hyatt.com"
  },
  
  "contact": {
    "hrEmail": "hr@grandhyatt.com",
    "hrPhone": "02-254-1234",
    "address": "494 Rajdamri Road, Pathumwan, Bangkok 10330"
  },
  
  "featured": true,
  "verified": true,
  "lastUpdated": "2026-03-15"
}
```

---

## 🏨 Hotel Types (ประเภทโรงแรม)

| Type | Description |
|------|-------------|
| `5-Star Luxury Hotel` | โรงแรม 5 ดาวหรู |
| `5-Star Beach Resort` | รีสอร์ทชายหาด 5 ดาว |
| `4-Star Hotel` | โรงแรม 4 ดาว |
| `Boutique Hotel` | โรงแรมบูติก |
| `Business Hotel` | โรงแรมธุรกิจ |
| `Resort & Spa` | รีสอร์ทและสปา |
| `City Hotel` | โรงแรมในเมือง |
| `Airport Hotel` | โรงแรมใกล้สนามบิน |

---

## 📊 Gallery Categories

| Category | Description |
|----------|-------------|
| `Building` | ภาพอาคาร/ภายนอก |
| `Interior` | ภาพภายใน |
| `Restaurant` | ร้านอาหาร |
| `Room` | ห้องพัก |
| `Facilities` | สิ่งอำนวยความสะดวก |
| `Team` | ทีมงาน |
| `Training` | การอบรม |
| `Service` | การให้บริการ |
| `Event` | งานกิจกรรม |

---

## 🔄 API Endpoints

### Hotel Profiles
```
GET    /api/hotels                  - Get all hotel profiles
GET    /api/hotels/{id}             - Get hotel profile by ID
GET    /api/hotels/{id}/jobs        - Get jobs from this hotel
GET    /api/hotels/featured         - Get featured hotels
GET    /api/hotels/location/{city}  - Get hotels by location
GET    /api/hotels/search?q={query} - Search hotels
```

---

## 📝 Notes

1. **Gallery Images**: ใช้ Unsplash API หรือ upload เองที่ `/uploads/hotels/`
2. **Videos**: รองรับ YouTube, Vimeo URLs
3. **Testimonials**: ควรมี 2-5 คำรับรอง
4. **Benefits**: ควรมีอย่างน้อย 6-10 ข้อ
5. **Featured Hotels**: แสดงในหน้าแรกและหน้า Hotel Partners

---

**Version**: 1.0.0  
**Last Updated**: March 15, 2026  
**Compatible with**: Employer Data Model v1.0.0
