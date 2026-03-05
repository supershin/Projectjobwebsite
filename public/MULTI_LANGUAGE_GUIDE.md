# 🌐 คู่มือการใช้งานระบบ Multi-Language

## 📋 ภาพรวม

ระบบ Multi-Language ของ JobHub รองรับ 2 ภาษา:
- 🇹🇭 **ภาษาไทย (Thai)** - ค่าเริ่มต้น
- 🇬🇧 **ภาษาอังกฤษ (English)**

## 🎯 องค์ประกอบหลัก

### 1. ไฟล์ที่เกี่ยวข้อง

```
public/
├── js/
│   ├── translations.js    # คลังคำแปลทั้งหมด
│   └── language.js        # ระบบจัดการภาษา
```

### 2. ไฟล์ที่ใช้งาน Multi-Language

✅ **หน้าที่รองรับแล้ว**:
- `index.html` - หน้าแรก
- `jobs.html` - หน้ารายการงาน
- `job-detail.html` - หน้ารายละเอียดงาน ⭐ ล่าสุด
- `login.html` - หน้าเข้าสู่ระบบ
- `register.html` - หน้าสมัครสมาชิก
- `post-job.html` - หน้าลงประกาศงาน
- `dashboard.html` - หน้าแดชบอร์ด

## 🔧 วิธีการใช้งาน

### 1. การแปล Text Content

ใช้ attribute `data-i18n` กับ element ที่ต้องการแปล:

```html
<!-- ตัวอย่าง: ปุ่มสมัครงาน -->
<button data-i18n="jobs.apply">สมัครเลย</button>

<!-- ผลลัพธ์:
     ภาษาไทย: "สมัครเลย"
     ภาษาอังกฤษ: "Apply Now"
-->
```

### 2. การแปล Placeholder

ใช้ attribute `data-i18n-placeholder`:

```html
<!-- ตัวอย่าง: ช่องค้นหา -->
<input 
    type="text" 
    data-i18n-placeholder="hero.search.placeholder"
    placeholder="ค้นหาตำแหน่งงาน หรือ บริษัท...">

<!-- ผลลัพธ์:
     ภาษาไทย: "ค้นหาตำแหน่งงาน หรือ บริษัท..."
     ภาษาอังกฤษ: "Search job title or company..."
-->
```

### 3. การแปล Title/Tooltip

ใช้ attribute `data-i18n-title`:

```html
<!-- ตัวอย่าง: ไอคอนข้อมูล -->
<i 
    class="bi bi-info-circle" 
    data-i18n-title="job-detail.info"
    title="ข้อมูล">
</i>
```

### 4. การใช้งานใน JavaScript

```javascript
// วิธีที่ 1: ใช้ฟังก์ชัน t() (แนะนำ)
const applyText = window.t('jobs.apply');
console.log(applyText); // "สมัครเลย" หรือ "Apply Now"

// วิธีที่ 2: ใช้ langManager
const titleText = window.langManager.translate('job-detail.title');

// การแปลภาษาแบบ Dynamic
element.textContent = window.t('job-detail.apply');
```

## 📝 การเพิ่ม Translation Keys ใหม่

### ขั้นตอนที่ 1: เพิ่ม Keys ใน translations.js

แก้ไขไฟล์ `/public/js/translations.js`:

```javascript
const translations = {
    th: {
        // เพิ่ม key ใหม่ที่นี่
        'section.new-feature.title': 'ฟีเจอร์ใหม่',
        'section.new-feature.description': 'คำอธิบายฟีเจอร์',
        'button.new-action': 'กดที่นี่'
    },
    en: {
        // เพิ่ม key เดียวกันในภาษาอังกฤษ
        'section.new-feature.title': 'New Feature',
        'section.new-feature.description': 'Feature description',
        'button.new-action': 'Click Here'
    }
};
```

### ขั้นตอนที่ 2: ใช้งานใน HTML

```html
<div class="new-feature">
    <h2 data-i18n="section.new-feature.title">ฟีเจอร์ใหม่</h2>
    <p data-i18n="section.new-feature.description">คำอธิบายฟีเจอร์</p>
    <button data-i18n="button.new-action">กดที่นี่</button>
</div>
```

## 🎨 รูปแบบการตั้งชื่อ Keys (Naming Convention)

### โครงสร้างที่แนะนำ:
```
[section].[subsection].[element]

ตัวอย่าง:
- nav.home                    → Navigation: หน้าแรก
- hero.title                  → Hero Section: หัวข้อ
- jobs.apply                  → Jobs: ปุ่มสมัคร
- job-detail.requirements     → Job Detail: คุณสมบัติ
- dashboard.stats.applications → Dashboard: สถิติการสมัคร
```

### Categories ของ Keys:

1. **Navigation** (`nav.*`)
```javascript
'nav.home'      // หน้าแรก / Home
'nav.jobs'      // งานทั้งหมด / All Jobs
'nav.login'     // เข้าสู่ระบบ / Login
```

2. **Hero Section** (`hero.*`)
```javascript
'hero.title'              // หัวข้อหลัก
'hero.subtitle'           // หัวข้อรอง
'hero.search.placeholder' // placeholder ช่องค้นหา
```

3. **Jobs** (`jobs.*`)
```javascript
'jobs.apply'        // สมัครเลย / Apply Now
'jobs.save'         // บันทึก / Save
'jobs.full-time'    // งานประจำ / Full-time
```

4. **Job Detail** (`job-detail.*`)
```javascript
'job-detail.apply'          // สมัครงานนี้
'job-detail.description'    // รายละเอียดงาน
'job-detail.requirements'   // คุณสมบัติที่ต้องการ
'job-detail.benefits'       // สวัสดิการ
```

5. **Common** (`common.*`)
```javascript
'common.submit'    // ส่ง / Submit
'common.cancel'    // ยกเลิก / Cancel
'common.save'      // บันทึก / Save
```

## 🔄 การเปลี่ยนภาษา

### วิธีที่ 1: ใช้ Language Switcher UI

Language Switcher จะถูกสร้างอัตโนมัติใน Navbar:

```html
<!-- จะถูกสร้างอัตโนมัติโดย language.js -->
<li class="nav-item dropdown language-switcher">
    <a class="nav-link dropdown-toggle" href="#" role="button">
        <i class="bi bi-globe"></i>
        <span class="current-lang-text">ไทย</span>
    </a>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" data-lang="th">ไทย (Thai)</a></li>
        <li><a class="dropdown-item" data-lang="en">English</a></li>
    </ul>
</li>
```

### วิธีที่ 2: ใช้ JavaScript

```javascript
// เปลี่ยนเป็นภาษาไทย
window.langManager.switchLanguage('th');

// เปลี่ยนเป็นภาษาอังกฤษ
window.langManager.switchLanguage('en');

// ตรวจสอบภาษาปัจจุบัน
const currentLang = window.langManager.getCurrentLanguage();
console.log(currentLang); // 'th' หรือ 'en'
```

## 📊 การ Format ตัวเลขและวันที่

### Format ตัวเลข
```javascript
// จะแสดงผลตามภาษาที่เลือก
const formattedNumber = window.langManager.formatNumber(1234567);
// ไทย: "1,234,567"
// อังกฤษ: "1,234,567"
```

### Format เงิน
```javascript
const price = window.langManager.formatCurrency(50000);
// ไทย: "฿50,000.00"
// อังกฤษ: "THB 50,000.00"
```

### Format วันที่
```javascript
const date = new Date();
const formattedDate = window.langManager.formatDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
// ไทย: "5 มีนาคม 2569"
// อังกฤษ: "March 5, 2026"
```

## 🎯 ตัวอย่างการใช้งานจริง

### ตัวอย่างที่ 1: หน้า Job Detail

```html
<!-- HTML -->
<div class="card">
    <h4 data-i18n="job-detail.benefits">สวัสดิการ</h4>
    <div id="jobBenefits">
        <!-- ข้อมูลจะถูก inject ด้วย JavaScript -->
    </div>
</div>

<!-- JavaScript -->
<script>
// แสดงสวัสดิการ
function displayBenefits(benefits) {
    const container = document.getElementById('jobBenefits');
    container.innerHTML = '';
    
    benefits.forEach(benefit => {
        const badge = document.createElement('span');
        badge.className = 'badge badge-custom';
        badge.innerHTML = `<i class="bi bi-star-fill"></i> ${benefit}`;
        container.appendChild(badge);
    });
}
</script>
```

### ตัวอย่างที่ 2: ฟอร์มสมัครงาน

```html
<form id="applyForm">
    <div class="mb-3">
        <label for="applicantName" class="form-label" 
               data-i18n="job-detail.applicant-name">
            ชื่อ-นามสกุล
        </label>
        <input type="text" class="form-control" id="applicantName" required>
    </div>
    
    <div class="mb-3">
        <label for="coverLetter" class="form-label" 
               data-i18n="job-detail.cover-letter">
            จดหมายสมัครงาน
        </label>
        <textarea class="form-control" id="coverLetter" rows="4"
                  data-i18n-placeholder="job-detail.cover-letter-placeholder">
        </textarea>
    </div>
    
    <button type="submit" class="btn btn-primary-custom" 
            data-i18n="job-detail.submit">
        ส่งใบสมัคร
    </button>
</form>
```

## 🔥 Tips & Best Practices

### ✅ ควรทำ

1. **ตั้งชื่อ Key ให้สื่อความหมาย**
```javascript
// ดี ✅
'job-detail.apply-now'
'dashboard.stats.total-applications'

// ไม่ดี ❌
'btn1'
'text123'
```

2. **แยก Keys ตาม Section**
```javascript
// ดี ✅
'login.email'
'login.password'
'login.button'

// ไม่ดี ❌
'email'
'password'
'button'
```

3. **ใช้ Default Text ใน HTML**
```html
<!-- ดี ✅ - มี default text -->
<button data-i18n="jobs.apply">สมัครเลย</button>

<!-- ไม่ดี ❌ - ไม่มี default text -->
<button data-i18n="jobs.apply"></button>
```

### ❌ ไม่ควรทำ

1. **Hard-code ข้อความในหลายภาษา**
```javascript
// ไม่ดี ❌
if (lang === 'th') {
    text = 'สมัครเลย';
} else {
    text = 'Apply Now';
}

// ดี ✅
text = window.t('jobs.apply');
```

2. **ลืมเพิ่มทั้ง 2 ภาษา**
```javascript
// ไม่ดี ❌ - มีแค่ภาษาไทย
th: {
    'new.key': 'ข้อความใหม่'
}

// ดี ✅ - มีครบทั้ง 2 ภาษา
th: {
    'new.key': 'ข้อความใหม่'
},
en: {
    'new.key': 'New Text'
}
```

## 🐛 Troubleshooting

### ปัญหา: ข้อความไม่เปลี่ยนภาษา

**สาเหตุ**: ไม่มี `data-i18n` attribute

**แก้ไข**:
```html
<!-- ก่อน ❌ -->
<button>สมัครเลย</button>

<!-- หลัง ✅ -->
<button data-i18n="jobs.apply">สมัครเลย</button>
```

### ปัญหา: แสดง Key แทนข้อความ

**สาเหตุ**: Key ไม่มีใน translations.js

**แก้ไข**: เพิ่ม key ใน translations.js
```javascript
th: {
    'jobs.apply': 'สมัครเลย'
},
en: {
    'jobs.apply': 'Apply Now'
}
```

### ปัญหา: Placeholder ไม่เปลี่ยน

**สาเหตุ**: ใช้ `data-i18n` แทน `data-i18n-placeholder`

**แก้ไข**:
```html
<!-- ก่อน ❌ -->
<input data-i18n="search.placeholder">

<!-- หลัง ✅ -->
<input data-i18n-placeholder="search.placeholder">
```

## 📈 Translation Keys ทั้งหมด

### ภาพรวมจำนวน Keys

- **Navigation**: 7 keys
- **Hero Section**: 6 keys
- **Categories**: 7 keys
- **Jobs**: 20+ keys
- **Job Detail**: 28 keys ⭐ มากที่สุด
- **Login/Register**: 30+ keys
- **Dashboard**: 15+ keys
- **Common**: 15 keys

**รวมทั้งหมด**: มากกว่า **150 keys**

### Keys สำหรับ Job Detail (ครบทั้งหมด 28 keys)

```javascript
'job-detail.apply'
'job-detail.save'
'job-detail.share'
'job-detail.back'
'job-detail.per-month'
'job-detail.overview'
'job-detail.description'
'job-detail.responsibilities'
'job-detail.requirements'
'job-detail.benefits'
'job-detail.about-company'
'job-detail.similar-jobs'
'job-detail.application'
'job-detail.apply-now'
'job-detail.job-info'
'job-detail.posted-date'
'job-detail.expiry-date'
'job-detail.applicants'
'job-detail.people'
'job-detail.status'
'job-detail.share-job'
'job-detail.apply-modal-title'
'job-detail.applicant-name'
'job-detail.applicant-email'
'job-detail.applicant-phone'
'job-detail.resume-upload'
'job-detail.cover-letter'
'job-detail.cover-letter-placeholder'
'job-detail.login-required'
'job-detail.cancel'
'job-detail.submit'
```

## 🎓 การเรียนรู้เพิ่มเติม

### Event Listeners

รับฟังการเปลี่ยนภาษา:
```javascript
document.addEventListener('languageChanged', (event) => {
    const newLang = event.detail.language;
    console.log('ภาษาเปลี่ยนเป็น:', newLang);
    
    // ทำอะไรบางอย่างเมื่อเปลี่ยนภาษา
    updateDynamicContent();
});
```

### การบันทึกค่าภาษา

ภาษาที่เลือกจะถูกบันทึกใน `localStorage`:
```javascript
// อ่านค่าภาษาที่บันทึก
const savedLang = localStorage.getItem('jobhub_lang');

// บันทึกภาษาใหม่
localStorage.setItem('jobhub_lang', 'en');
```

---

**สรุป**: ระบบ Multi-Language ของ JobHub พร้อมใช้งานและครอบคลุมทุกหน้าแล้ว! 🎉

**อัพเดทล่าสุด**: 5 มีนาคม 2026
