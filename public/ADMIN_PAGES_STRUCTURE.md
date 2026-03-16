# Admin CRUD Pages Structure

## 📋 Overview

ทุก Admin CRUD pages ต้องมีโครงสร้างเดียวกัน ประกอบด้วย:
1. **Navbar** (ด้านบน)
2. **Sidebar Menu** (ด้านซ้าย)
3. **Main Content** (ตรงกลาง)

---

## 🏗️ Standard Template Structure

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[PAGE_TITLE] - Admin - JobCrew</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="./css/style.css" rel="stylesheet">
    <link href="./css/dashboard.css" rel="stylesheet">
</head>
<body>
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
        <div class="container-fluid">
            <div class="row">
                <!-- Sidebar -->
                <nav class="col-md-3 col-lg-2 d-md-block sidebar">
                    <div class="position-sticky pt-3">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link" href="dashboard.html?mode=admin&view=overview">
                                    <i class="bi bi-speedometer2"></i> ภาพรวม
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="dashboard.html?mode=admin&view=users">
                                    <i class="bi bi-people"></i> จัดการผู้ใช้
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="dashboard.html?mode=admin&view=jobs">
                                    <i class="bi bi-briefcase"></i> จัดการงาน
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link [ACTIVE_IF_HOTELS]" href="dashboard.html?mode=admin&view=hotels">
                                    <i class="bi bi-building-fill-add"></i> จัดการโรงแรม
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link [ACTIVE_IF_SCHOOLS]" href="dashboard.html?mode=admin&view=schools">
                                    <i class="bi bi-mortarboard-fill"></i> จัดการสถาบัน
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link [ACTIVE_IF_INTERNSHIPS]" href="dashboard.html?mode=admin&view=internships">
                                    <i class="bi bi-briefcase"></i> จัดการฝึกงาน
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link [ACTIVE_IF_ARTICLES]" href="dashboard.html?mode=admin&view=articles">
                                    <i class="bi bi-newspaper"></i> จัดการบทความ
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <!-- Main Content -->
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <!-- PAGE SPECIFIC CONTENT HERE -->
                </main>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- PAGE SPECIFIC JS HERE -->
</body>
</html>
```

---

## 📂 All Admin CRUD Pages List

### **Schools (สถาบันการศึกษา)**
- ✅ `admin-school-view.html` - ดูรายละเอียด
- ✅ `admin-school-add.html` - เพิ่มใหม่
- ⚠️ `admin-school-edit.html` - แก้ไข (ต้องอัพเดท)

### **Hotels (โรงแรม)**
- ⚠️ `admin-hotel-view.html` - ดูรายละเอียด (ต้องอัพเดท)
- ⚠️ `admin-hotel-add.html` - เพิ่มใหม่ (ต้องอัพเดท)
- ⚠️ `admin-hotel-edit.html` - แก้ไข (ต้องอัพเดท)

### **Internships (ฝึกงาน)**
- ⚠️ `admin-internship-view.html` - ดูรายละเอียด (ต้องอัพเดท)
- ⚠️ `admin-internship-add.html` - เพิ่มใหม่ (ต้องอัพเดท)
- ⚠️ `admin-internship-edit.html` - แก้ไข (ต้องอัพเดท)

### **Articles (บทความ)**
- ⚠️ `admin-article-view.html` - ดูรายละเอียด (ต้องอัพเดท)
- ⚠️ `admin-article-add.html` - เพิ่มใหม่ (ต้องอัพเดท)
- ⚠️ `admin-article-edit.html` - แก้ไข (ต้องอัพเดท)

**รวม: 12 หน้า**

---

## 🎨 Active Menu Highlighting

แต่ละหน้าต้องเพิ่ม class `active` ให้กับ menu ที่ถูกต้อง:

| Page Type | Add `active` to |
|-----------|----------------|
| Schools   | `<a class="nav-link active">... จัดการสถาบัน</a>` |
| Hotels    | `<a class="nav-link active">... จัดการโรงแรม</a>` |
| Internships | `<a class="nav-link active">... จัดการฝึกงาน</a>` |
| Articles  | `<a class="nav-link active">... จัดการบทความ</a>` |

---

## 🔙 Back Button URLs

แต่ละหน้าต้องมี back button ที่ถูกต้อง:

| Page | Back URL |
|------|----------|
| Schools | `dashboard.html?mode=admin&view=schools` |
| Hotels | `dashboard.html?mode=admin&view=hotels` |
| Internships | `dashboard.html?mode=admin&view=internships` |
| Articles | `dashboard.html?mode=admin&view=articles` |

---

## ✅ Checklist สำหรับแต่ละหน้า

- [ ] มี Navbar
- [ ] มี Sidebar Menu
- [ ] Active menu ถูกต้อง
- [ ] Back button ชี้ไปที่ถูกต้อง
- [ ] Load jQuery และ Bootstrap JS
- [ ] Responsive design

---

## 🚀 Next Steps

ต้องอัพเดททุกหน้าที่มี ⚠️ ให้มีโครงสร้างตาม template นี้
