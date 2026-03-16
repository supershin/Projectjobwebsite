# 🔄 การอัพเดท Admin Pages ทั้งหมด

## สถานะปัจจุบัน

✅ **สำเร็จแล้ว:**
- admin-school-view.html (มี Navbar + Sidebar)
- admin-school-add.html (มี Navbar + Sidebar)

⚠️ **ต้องอัพเดท: 10 หน้า**

---

## 📝 วิธีอัพเดทอย่างรวดเร็ว

### ขั้นตอนที่ 1: เพิ่ม Navbar (ก่อน `<div class="container-fluid">`)

```html
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-gradient fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="index.html">
            <img src="https://supershin.github.io/Project.Job/logo/logo.jpg" alt="JobCrew Logo" class="navbar-brand-logo"> JobCrew
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-center">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=0D4C92&color=fff" alt="Admin" class="rounded-circle me-2" width="32" height="32">
                        <span>Admin</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="dashboard.html?mode=admin"><i class="bi bi-speedometer2"></i> Dashboard</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="index.html"><i class="bi bi-box-arrow-right"></i> ออกจากระบบ</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="dashboard-container">
```

### ขั้นตอนที่ 2: แปลง container-fluid เป็น dashboard structure

**เดิม:**
```html
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <!-- Content -->
        </div>
    </div>
</div>
```

**ใหม่:**
```html
<div class="dashboard-container">
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <nav class="col-md-3 col-lg-2 d-md-block sidebar">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <!-- Menu items -->
                    </ul>
                </div>
            </nav>

            <!-- Main Content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <!-- Original content here -->
            </main>
        </div>
    </div>
</div>
```

---

## 📋 Checklist การอัพเดท

### School Pages
- [x] admin-school-view.html
- [x] admin-school-add.html  
- [ ] admin-school-edit.html

### Hotel Pages
- [ ] admin-hotel-view.html
- [ ] admin-hotel-add.html
- [ ] admin-hotel-edit.html

### Internship Pages
- [ ] admin-internship-view.html
- [ ] admin-internship-add.html
- [ ] admin-internship-edit.html

### Article Pages
- [ ] admin-article-view.html
- [ ] admin-article-add.html
- [ ] admin-article-edit.html

---

## 🎯 ผลลัพธ์ที่คาดหวัง

หลังอัพเดทเสร็จ ทุกหน้าจะมี:
1. ✅ Navbar ด้านบน
2. ✅ Sidebar menu ด้านซ้าย
3. ✅ Main content ตรงกลาง
4. ✅ Responsive design
5. ✅ Consistent UX ทุกหน้า

---

## 💡 Note

เนื่องจากมีหน้าเยอะ (10 หน้า) ผมแนะนำให้:
1. ใช้ Find & Replace ใน VS Code
2. หรือ สร้างสคริปต์ Node.js/Python เพื่ออัพเดทอัตโนมัติ
3. หรือ ให้ผมอัพเดททีละหน้าโดยตรง (แต่จะใช้เวลานานและ tokens เยอะ)

ผมพร้อมช่วยวิธีไหนก็ได้ครับ!
