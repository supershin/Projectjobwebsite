# JobCrew - Hotel Insights Data Model

## 📰 Hotel Insights (บทความและข้อมูลวงการโรงแรม)

Data Model สำหรับหน้า Hotel Insights ที่รวมบทความและข้อมูลสำหรับคนในวงการโรงแรม

---

## 📋 Article Data Model (20 Fields)

### **Core Information**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **1. articleId** | String | ✅ | รหัสบทความ | `"article001"` |
| **2. title** | String | ✅ | หัวข้อบทความ | `"5 ทักษะที่ต้องมีในอาชีพโรงแรม"` |
| **3. category** | String | ✅ | หมวดหมู่ | `"Career Advice"`, `"Industry Trends"`, `"Leadership"` |
| **4. author** | Object | ✅ | ผู้เขียน | `{name, position, avatar}` |
| **5. publishDate** | String | ✅ | วันที่เผยแพร่ | `"2026-03-15"` |
| **6. featuredImage** | String (URL) | ✅ | รูปหลัก | `"https://..."` |
| **7. excerpt** | String | ✅ | สรุปสั้น | `"ทักษะที่จำเป็นสำหรับความสำเร็จ..."` |
| **8. content** | String | ✅ | เนื้อหาบทความ | `"<p>เนื้อหาเต็ม...</p>"` |
| **9. tags** | Array[String] | ✅ | แท็ก | `["Career", "Skills", "Tips"]` |
| **10. readTime** | Number | ✅ | เวลาอ่าน (นาที) | `5` |
| **11. views** | Number | ✅ | จำนวนผู้อ่าน | `1250` |
| **12. likes** | Number | ❌ | จำนวนไลค์ | `87` |
| **13. comments** | Number | ❌ | จำนวนคอมเมนต์ | `15` |
| **14. featured** | Boolean | ❌ | บทความแนะนำ | `true`, `false` |
| **15. trending** | Boolean | ❌ | กำลังฮิต | `true`, `false` |
| **16. relatedArticles** | Array[String] | ❌ | บทความที่เกี่ยวข้อง | `["article002", "article003"]` |
| **17. metaDescription** | String | ❌ | SEO Description | `"เรียนรู้ 5 ทักษะสำคัญ..."` |
| **18. metaKeywords** | Array[String] | ❌ | SEO Keywords | `["hotel career", "skills"]` |
| **19. status** | String | ✅ | สถานะ | `"published"`, `"draft"`, `"archived"` |
| **20. lastUpdated** | String | ❌ | วันที่อัพเดทล่าสุด | `"2026-03-16"` |

---

## 📖 Example Article Object

```json
{
  "articleId": "article001",
  "title": "5 ทักษะที่ต้องมีในอาชีพโรงแรม",
  "category": "Career Advice",
  "author": {
    "name": "ดร.สมชาย วงศ์โรงแรม",
    "position": "HR Director - Grand Hyatt",
    "avatar": "https://ui-avatars.com/api/?name=Somchai&background=0D4C92&color=fff&size=200",
    "bio": "ผู้เชี่ยวชาญด้าน HR ในอุตสาหกรรมโรงแรมมากกว่า 15 ปี"
  },
  "publishDate": "2026-03-15",
  "featuredImage": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
  "excerpt": "ทักษะที่จำเป็นสำหรับความสำเร็จในอาชีพโรงแรม ตั้งแต่ระดับเริ่มต้นจนถึงผู้บริหาร",
  "content": "<h3>1. Communication Skills</h3><p>ทักษะการสื่อสารเป็นหัวใจสำคัญของงานบริการ...</p><h3>2. Problem Solving</h3><p>ความสามารถในการแก้ปัญหาเฉพาะหน้า...</p>",
  "tags": ["Career Development", "Hotel Skills", "Hospitality", "Professional Growth"],
  "readTime": 5,
  "views": 1250,
  "likes": 87,
  "comments": 15,
  "featured": true,
  "trending": true,
  "relatedArticles": ["article002", "article003"],
  "metaDescription": "เรียนรู้ 5 ทักษะสำคัญที่จะช่วยให้คุณประสบความสำเร็จในอาชีพโรงแรม",
  "metaKeywords": ["hotel career", "hospitality skills", "career development"],
  "status": "published",
  "lastUpdated": "2026-03-16"
}
```

---

## 🎯 Categories

### **1️⃣ Hotel Career Advice (คำแนะนำอาชีพโรงแรม)**

**หัวข้อที่ครอบคลุม:**
- ทักษะที่ต้องมี (Must-Have Skills)
- เส้นทางอาชีพ (Career Path)
- เคล็ดลับการสัมภาษณ์ (Interview Tips)
- การพัฒนาตนเอง (Self Development)
- ความก้าวหน้าในงาน (Career Growth)
- การสร้าง Network (Networking)

**Target Audience:**
- นักศึกษาและบัณฑิตจบใหม่
- ผู้ที่เริ่มต้นอาชีพในโรงแรม
- ผู้ที่ต้องการเปลี่ยนสายงาน

---

### **2️⃣ Hospitality Industry Trends (เทรนด์อุตสาหกรรมท่องเที่ยว)**

**หัวข้อที่ครอบคลุม:**
- เทคโนโลยีในโรงแรม (Hotel Technology)
- Sustainability (ความยั่งยืน)
- Digital Transformation
- Guest Experience Trends
- Market Analysis
- Future of Hospitality

**Target Audience:**
- ผู้บริหารโรงแรม
- นายจ้างและเจ้าของกิจการ
- นักศึกษาที่สนใจเทรนด์

---

### **3️⃣ Leadership in Hotels (ภาวะผู้นำในโรงแรม)**

**หัวข้อที่ครอบคลุม:**
- Management Skills
- Team Building
- Employee Motivation
- Conflict Resolution
- Decision Making
- Leadership Styles

**Target Audience:**
- ผู้บริหารและ Department Heads
- Supervisors และ Team Leaders
- ผู้ที่ต้องการเติบโตสู่ตำแหน่งผู้บริหาร

---

## 📊 Additional Data Models

### **Author Object**

```json
{
  "name": "ดร.สมชาย วงศ์โรงแรม",
  "position": "HR Director",
  "company": "Grand Hyatt Erawan Bangkok",
  "avatar": "https://...",
  "bio": "ผู้เชี่ยวชาญด้าน HR มากกว่า 15 ปี",
  "expertise": ["Human Resources", "Talent Development"],
  "linkedin": "https://linkedin.com/in/somchai",
  "email": "somchai@example.com"
}
```

### **Comment Object** (Future Feature)

```json
{
  "commentId": "comment001",
  "articleId": "article001",
  "userId": "user123",
  "userName": "John Doe",
  "userAvatar": "https://...",
  "comment": "บทความดีมากครับ ได้ประโยชน์เยอะ",
  "date": "2026-03-16T10:30:00Z",
  "likes": 5,
  "replies": []
}
```

---

## 🎨 UI Components

### **Article Card (Grid View)**

```
┌────────────────────────────┐
│  [Featured Image]          │
├────────────────────────────┤
│  [Category Badge]          │
│  Article Title             │
│  By Author • 5 min read    │
│  Excerpt text...           │
│                            │
│  [Tags]                    │
│  👁 1.2K  ❤️ 87  💬 15     │
│  [อ่านเพิ่มเติม]            │
└────────────────────────────┘
```

### **Featured Article (Hero)**

```
┌─────────────────────────────────────────┐
│                                         │
│    [Large Featured Image]               │
│                                         │
│    ⭐ Featured Article                  │
│    Article Title                        │
│    By Author • Date • 8 min read        │
│    Excerpt...                           │
│    [อ่านทันที]                          │
└─────────────────────────────────────────┘
```

### **Article Detail Page**

```
┌─────────────────────────────────────────┐
│  [Hero Image]                           │
├─────────────────────────────────────────┤
│  Category • Date                        │
│  Article Title                          │
│  By Author                              │
│  👁 1.2K views • ⏱ 5 min read          │
├─────────────────────────────────────────┤
│  [Content]                              │
│                                         │
│  Lorem ipsum dolor sit amet...          │
│                                         │
├─────────────────────────────────────────┤
│  [Tags]                                 │
│  [Share Buttons]                        │
├─────────────────────────────────────────┤
│  [Related Articles]                     │
└─────────────────────────────────────────┘
```

---

## 🔍 Features

### **1. Filtering & Search**

**Filter by Category:**
```javascript
const categories = [
  "All",
  "Career Advice",
  "Industry Trends", 
  "Leadership"
];
```

**Search:**
- Search in: title, excerpt, content, tags
- Real-time search results

### **2. Sorting**

```javascript
const sortOptions = [
  { value: "latest", label: "ล่าสุด" },
  { value: "popular", label: "ยอดนิยม" },
  { value: "trending", label: "กำลังฮิต" },
  { value: "oldest", label: "เก่าสุด" }
];
```

### **3. Pagination**

- Articles per page: 9 (3 columns × 3 rows)
- Load more button
- Infinite scroll (optional)

### **4. Related Articles**

- Based on category
- Based on tags
- Same author
- Limit: 3 articles

---

## 📱 Responsive Design

| Device | Layout | Articles per Row |
|--------|--------|-----------------|
| **Desktop (≥1200px)** | 3 columns | 3 |
| **Tablet (768-1199px)** | 2 columns | 2 |
| **Mobile (<768px)** | 1 column | 1 |

---

## 🔄 API Endpoints (Future Backend)

### Articles
```
GET    /api/insights                    - Get all articles
GET    /api/insights/{id}               - Get article by ID
GET    /api/insights/category/{cat}     - Get by category
GET    /api/insights/featured           - Get featured articles
GET    /api/insights/trending           - Get trending articles
GET    /api/insights/search?q={query}   - Search articles
POST   /api/insights                    - Create article (Admin)
PUT    /api/insights/{id}               - Update article (Admin)
DELETE /api/insights/{id}               - Delete article (Admin)
```

### Engagement
```
POST   /api/insights/{id}/view          - Increment view count
POST   /api/insights/{id}/like          - Like article
POST   /api/insights/{id}/comment       - Add comment
GET    /api/insights/{id}/comments      - Get comments
```

### Authors
```
GET    /api/insights/authors            - Get all authors
GET    /api/insights/author/{id}        - Get author profile
GET    /api/insights/author/{id}/articles - Get author's articles
```

---

## 📊 Statistics

### **Article Stats**
- Total views
- Total likes
- Total comments
- Average read time
- Engagement rate

### **Category Stats**
- Articles per category
- Most popular category
- Average views per category

### **Author Stats**
- Articles written
- Total views
- Average engagement

---

## 🎯 Content Strategy

### **Article Length**

| Type | Length | Read Time |
|------|--------|-----------|
| **Quick Tips** | 500-800 words | 3-5 min |
| **Standard Article** | 1000-1500 words | 5-8 min |
| **In-depth Guide** | 2000+ words | 10+ min |

### **Publishing Schedule**

| Category | Frequency |
|----------|-----------|
| Career Advice | 2-3 articles/week |
| Industry Trends | 1-2 articles/week |
| Leadership | 1 article/week |

### **Content Mix**

- 40% Career Advice
- 35% Industry Trends
- 25% Leadership

---

## 📝 Content Format

### **Standard Structure**

```html
<article>
  <header>
    <h1>Article Title</h1>
    <div class="meta">
      <span class="category">Category</span>
      <span class="date">Date</span>
      <span class="author">By Author</span>
    </div>
  </header>
  
  <div class="featured-image">
    <img src="..." alt="...">
  </div>
  
  <div class="content">
    <p class="intro">Introduction paragraph...</p>
    
    <h2>Main Point 1</h2>
    <p>Content...</p>
    
    <h2>Main Point 2</h2>
    <p>Content...</p>
    
    <h2>Conclusion</h2>
    <p>Summary...</p>
  </div>
  
  <footer>
    <div class="tags">
      <span class="tag">Tag 1</span>
      <span class="tag">Tag 2</span>
    </div>
    <div class="share">
      <!-- Share buttons -->
    </div>
  </footer>
</article>
```

---

## 🏷️ Tag System

### **Common Tags**

**Career:**
- Career Development
- Interview Tips
- Resume Writing
- Networking
- Skills Development

**Trends:**
- Technology
- Sustainability
- Digital Transformation
- Customer Experience
- Innovation

**Leadership:**
- Management
- Team Building
- Communication
- Decision Making
- Motivation

---

## 🎨 Design Elements

### **Color Coding by Category**

| Category | Color | Badge Style |
|----------|-------|-------------|
| Career Advice | Blue (#3B82F6) | `bg-blue-100 text-blue-800` |
| Industry Trends | Green (#10B981) | `bg-green-100 text-green-800` |
| Leadership | Purple (#8B5CF6) | `bg-purple-100 text-purple-800` |

### **Typography**

- **Title:** 2rem-3rem, font-weight: 800
- **Author:** 1rem, font-weight: 600
- **Body:** 1.125rem, line-height: 1.75
- **Meta:** 0.875rem, text-muted

---

## 📈 SEO Optimization

### **Meta Tags**

```html
<meta name="description" content="Article meta description">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<meta property="og:title" content="Article Title">
<meta property="og:description" content="Article excerpt">
<meta property="og:image" content="Featured image URL">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
```

### **Structured Data (JSON-LD)**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "image": "Featured image URL",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "JobCrew",
    "logo": {
      "@type": "ImageObject",
      "url": "Logo URL"
    }
  },
  "datePublished": "2026-03-15",
  "dateModified": "2026-03-16"
}
```

---

## 📚 Sample Articles (12 Articles)

### **Career Advice (5 articles)**
1. 5 ทักษะที่ต้องมีในอาชีพโรงแรม
2. วิธีเตรียมตัวสัมภาษณ์งานโรงแรม
3. เส้นทางความก้าวหน้าในวงการโรงแรม
4. สร้าง Resume ให้โดดเด่นในอุตสาหกรรมโรงแรม
5. เคล็ดลับการสร้างเครือข่ายในวงการโรงแรม

### **Industry Trends (4 articles)**
1. เทคโนโลยี AI กำลังเปลี่ยนแปลงวงการโรงแรม
2. Sustainability: แนวโน้มสำคัญของโรงแรมยุคใหม่
3. Digital Transformation ในอุตสาหกรรมโรงแรม
4. Guest Experience ยุคใหม่: สิ่งที่ผู้เข้าพักคาดหวัง

### **Leadership (3 articles)**
1. ภาวะผู้นำที่ดีในโรงแรม: คุณสมบัติและทักษะ
2. การสร้างทีมงานที่แข็งแกร่งในโรงแรม
3. การจัดการความขัดแย้งในองค์กร

---

## 🔐 Access Control

### **Public Access:**
- ✅ Read all published articles
- ✅ Search and filter
- ✅ View author profiles
- ❌ Like and comment (requires login)
- ❌ Bookmark articles (requires login)

### **Logged-in Users:**
- ✅ All public features
- ✅ Like and comment
- ✅ Bookmark articles
- ✅ Follow authors
- ✅ Receive notifications

### **Authors:**
- ✅ All user features
- ✅ Submit articles (pending approval)
- ✅ Edit own articles
- ✅ View article analytics

### **Admin:**
- ✅ All features
- ✅ Create/Edit/Delete any article
- ✅ Approve submitted articles
- ✅ Manage authors
- ✅ View full analytics

---

**Version**: 1.0.0  
**Last Updated**: March 16, 2026  
**Content Focus**: Career Development, Industry Insights, Leadership Excellence
