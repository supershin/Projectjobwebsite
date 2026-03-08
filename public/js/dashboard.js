// ========================================
// Dashboard JavaScript - Complete Version
// ========================================

let currentUser = null;
let currentView = 'overview';

// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    showNotification('ออกจากระบบสำเร็จ', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Translate page helper
function translatePage() {
    if (window.langManager) {
        window.langManager.updatePageLanguage();
    }
}

$(document).ready(function() {
    // Check if user is logged in
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = getCurrentUser();
    
    // Update user info
    updateUserInfo();
    
    // Get view from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    currentView = urlParams.get('view') || 'overview';
    
    // Load dashboard based on role
    loadDashboard();
    
    // Setup logout button
    $('#logoutBtn').on('click', function(e) {
        e.preventDefault();
        logout();
    });
});

// Update user info in navbar
function updateUserInfo() {
    $('#userName').text(currentUser.name);
    $('#userAvatar').attr('src', currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=random`);
}

// Load dashboard based on role
function loadDashboard() {
    switch(currentUser.role) {
        case 'user':
            loadUserDashboard();
            break;
        case 'employer':
            loadEmployerDashboard();
            break;
        case 'admin':
            loadAdminDashboard();
            break;
        default:
            loadUserDashboard();
    }
}

// ========================================
// USER DASHBOARD
// ========================================
function loadUserDashboard() {
    $('#dashboardTitle').attr('data-i18n', 'dashboard.user.title').text('Dashboard - ผู้ใช้งาน');
    
    // Load menu
    $('#dashboardMenu').html(`
        <li class="nav-item">
            <a class="nav-link ${currentView === 'overview' ? 'active' : ''}" href="dashboard.html?view=overview">
                <i class="bi bi-speedometer2"></i> <span data-i18n="dashboard.overview">ภาพรวม</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'applications' ? 'active' : ''}" href="dashboard.html?view=applications">
                <i class="bi bi-file-earmark-text"></i> <span data-i18n="dashboard.user.applications">ใบสมัครของฉัน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'saved-jobs' ? 'active' : ''}" href="dashboard.html?view=saved-jobs">
                <i class="bi bi-bookmark"></i> <span data-i18n="dashboard.user.saved-jobs">งานที่บันทึก</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'announcements' ? 'active' : ''}" href="dashboard.html?view=announcements">
                <i class="bi bi-megaphone"></i> <span>ข่าวสาร</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'profile' ? 'active' : ''}" href="dashboard.html?view=profile">
                <i class="bi bi-person"></i> <span data-i18n="dashboard.profile">โปรไฟล์</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'settings' ? 'active' : ''}" href="dashboard.html?view=settings">
                <i class="bi bi-gear"></i> <span data-i18n="dashboard.settings">ตั้งค่า</span>
            </a>
        </li>
        <li class="nav-item mt-3">
            <a class="nav-link" href="jobs.html">
                <i class="bi bi-search"></i> <span data-i18n="dashboard.search-jobs">ค้นหางาน</span>
            </a>
        </li>
    `);
    
    // Translate menu items
    translatePage();
    
    // Load appropriate view
    switch(currentView) {
        case 'overview':
            loadUserOverview();
            break;
        case 'applications':
            loadUserApplications();
            break;
        case 'saved-jobs':
            loadUserSavedJobs();
            break;
        case 'announcements':
            loadUserAnnouncements();
            break;
        case 'profile':
            loadUserProfile();
            break;
        case 'settings':
            loadUserSettings();
            break;
        default:
            loadUserOverview();
    }
}

// USER: Overview
function loadUserOverview() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <!-- Stat Cards -->
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                            <i class="bi bi-file-earmark-text fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">12</h4>
                            <small class="text-muted" data-i18n="dashboard.user.total-applications">ใบสมัครทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-success bg-opacity-10 text-success rounded-3 p-3 me-3">
                            <i class="bi bi-check-circle fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">3</h4>
                            <small class="text-muted" data-i18n="dashboard.user.accepted">ได้รับการตอบรับ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-warning bg-opacity-10 text-warning rounded-3 p-3 me-3">
                            <i class="bi bi-clock-history fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">5</h4>
                            <small class="text-muted" data-i18n="dashboard.user.pending">รอการตอบกลับ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-info bg-opacity-10 text-info rounded-3 p-3 me-3">
                            <i class="bi bi-bookmark fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">8</h4>
                            <small class="text-muted" data-i18n="dashboard.user.saved">งานที่บันทึก</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Applications -->
        <div class="card shadow-sm mb-4">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.user.recent-applications">ใบสมัครล่าสุด</h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th data-i18n="dashboard.job-title">ตำแหน่งงาน</th>
                                <th data-i18n="dashboard.company">บริษัท</th>
                                <th data-i18n="dashboard.applied-date">วันที่สมัคร</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Senior Frontend Developer</strong></td>
                                <td>TechCorp Thailand</td>
                                <td>2 มีนาคม 2026</td>
                                <td><span class="badge bg-warning">รอการตอบกลับ</span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary" onclick="viewApplication(1)">
                                        <i class="bi bi-eye"></i> ดู
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>UX/UI Designer</strong></td>
                                <td>Creative Studio</td>
                                <td>28 กุมภาพันธ์ 2026</td>
                                <td><span class="badge bg-success">ได้รับการตอบรับ</span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary" onclick="viewApplication(2)">
                                        <i class="bi bi-eye"></i> ดู
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Marketing Manager</strong></td>
                                <td>Digital Agency</td>
                                <td>25 กุมภาพันธ์ 2026</td>
                                <td><span class="badge bg-info">กำลังตรวจสอบ</span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary" onclick="viewApplication(3)">
                                        <i class="bi bi-eye"></i> ดู
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer bg-white text-center">
                <a href="dashboard.html?view=applications" class="btn btn-primary">
                    ดูใบสมัครทั้งหมด <i class="bi bi-arrow-right"></i>
                </a>
            </div>
        </div>
    `);
    
    translatePage();
}

// USER: Applications
function loadUserApplications() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.user.applications">ใบสมัครของฉัน</h5>
                    </div>
                    <div class="col-auto">
                        <select class="form-select form-select-sm" id="statusFilter">
                            <option value="all">ทั้งหมด</option>
                            <option value="pending">รอการตอบกลับ</option>
                            <option value="reviewing">กำลังตรวจสอบ</option>
                            <option value="accepted">ได้รับการตอบรับ</option>
                            <option value="rejected">ไม่ผ่าน</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th data-i18n="dashboard.job-title">ตำแหน่งงาน</th>
                                <th data-i18n="dashboard.company">บริษัท</th>
                                <th data-i18n="dashboard.location">สถานที่</th>
                                <th data-i18n="dashboard.applied-date">วันที่สมัคร</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateApplicationRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

function generateApplicationRows() {
    const applications = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Thailand', location: 'กรุงเทพฯ', date: '2 มีนาคม 2026', status: 'pending', statusText: 'รอการตอบกลับ', statusClass: 'warning' },
        { id: 2, title: 'UX/UI Designer', company: 'Creative Studio', location: 'กรุงเทพฯ', date: '28 กุมภาพันธ์ 2026', status: 'accepted', statusText: 'ได้รับการตอบรับ', statusClass: 'success' },
        { id: 3, title: 'Marketing Manager', company: 'Digital Agency', location: 'เชียงใหม่', date: '25 กุมภาพันธ์ 2026', status: 'reviewing', statusText: 'กำลังตรวจสอบ', statusClass: 'info' },
        { id: 4, title: 'Full Stack Developer', company: 'Startup Hub', location: 'กรุงเทพฯ', date: '20 กุมภาพันธ์ 2026', status: 'rejected', statusText: 'ไม่ผ่าน', statusClass: 'danger' },
        { id: 5, title: 'Data Analyst', company: 'Analytics Co.', location: 'ปทุมธานี', date: '15 กุมภาพันธ์ 2026', status: 'pending', statusText: 'รอการตอบกลับ', statusClass: 'warning' },
    ];
    
    return applications.map(app => `
        <tr>
            <td><strong>${app.title}</strong></td>
            <td>${app.company}</td>
            <td><i class="bi bi-geo-alt text-muted"></i> ${app.location}</td>
            <td>${app.date}</td>
            <td><span class="badge bg-${app.statusClass}">${app.statusText}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewApplication(${app.id})">
                    <i class="bi bi-eye"></i> ดู
                </button>
                ${app.status === 'pending' ? `
                    <button class="btn btn-sm btn-outline-danger" onclick="cancelApplication(${app.id})">
                        <i class="bi bi-x-circle"></i> ยกเลิก
                    </button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// USER: Saved Jobs
function loadUserSavedJobs() {
    $('#dashboardContent').html(`
        <div class="mb-4">
            <h5 class="fw-bold" data-i18n="dashboard.user.saved-jobs">งานที่บันทึก</h5>
            <p class="text-muted">คุณมี 8 งานที่บันทึกไว้</p>
        </div>
        
        <div class="row g-4">
            ${generateSavedJobCards()}
        </div>
    `);
    
    translatePage();
}

function generateSavedJobCards() {
    const jobs = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Thailand', location: 'กรุงเทพฯ', salary: '50,000 - 80,000', type: 'Full-time', logo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff' },
        { id: 2, title: 'UX/UI Designer', company: 'Creative Studio', location: 'กรุงเทพฯ', salary: '35,000 - 50,000', type: 'Full-time', logo: 'https://ui-avatars.com/api/?name=CS&background=10b981&color=fff' },
        { id: 3, title: 'Marketing Manager', company: 'Digital Agency', location: 'เชียงใหม่', salary: '45,000 - 60,000', type: 'Full-time', logo: 'https://ui-avatars.com/api/?name=DA&background=f59e0b&color=fff' },
        { id: 4, title: 'Full Stack Developer', company: 'Startup Hub', location: 'กรุงเทพฯ', salary: '40,000 - 70,000', type: 'Full-time', logo: 'https://ui-avatars.com/api/?name=SH&background=ef4444&color=fff' },
    ];
    
    return jobs.map(job => `
        <div class="col-md-6 col-lg-4">
            <div class="card job-card h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-start mb-3">
                        <img src="${job.logo}" alt="${job.company}" class="rounded me-3" width="50" height="50">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold">${job.title}</h6>
                            <p class="text-muted mb-0 small">${job.company}</p>
                        </div>
                        <button class="btn btn-sm btn-light" onclick="unsaveJob(${job.id})" title="ลบ">
                            <i class="bi bi-bookmark-fill text-primary"></i>
                        </button>
                    </div>
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="bi bi-geo-alt"></i> ${job.location}
                        </small>
                    </div>
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="bi bi-cash"></i> ${job.salary} บาท/เดือน
                        </small>
                    </div>
                    <div class="mb-3">
                        <span class="badge badge-custom">${job.type}</span>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-sm" onclick="applyJob(${job.id})">
                            <i class="bi bi-send"></i> สมัครงานนี้
                        </button>
                        <a href="job-detail.html?id=${job.id}" class="btn btn-outline-primary btn-sm">
                            <i class="bi bi-eye"></i> ดูรายละเอียด
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// USER: Profile
function loadUserProfile() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <!-- Personal Info -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.personal-info">ข้อมูลส่วนตัว</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">ชื่อ-นามสกุล</label>
                                    <input type="text" class="form-control" value="สมชาย ใจดี">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">อีเมล</label>
                                    <input type="email" class="form-control" value="user@demo.com" disabled>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">เบอร์โทรศัพท์</label>
                                    <input type="tel" class="form-control" value="081-234-5678">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">วันเกิด</label>
                                    <input type="date" class="form-control" value="1995-05-15">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">ที่อยู่</label>
                                    <textarea class="form-control" rows="2">123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Skills -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.skills">ทักษะ</h5>
                        <button class="btn btn-sm btn-outline-primary" onclick="addSkill()">
                            <i class="bi bi-plus-circle"></i> เพิ่มทักษะ
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="d-flex flex-wrap gap-2">
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">React.js</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">Vue.js</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">JavaScript</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">TypeScript</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">HTML/CSS</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">Tailwind CSS</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">Git</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">Figma</span>
                        </div>
                    </div>
                </div>

                <!-- Experience -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.experience">ประสบการณ์ทำงาน</h5>
                        <button class="btn btn-sm btn-outline-primary" onclick="addExperience()">
                            <i class="bi bi-plus-circle"></i> เพิ่มประสบการณ์
                        </button>
                    </div>
                    <div class="card-body" id="experienceList">
                        <!-- Experience Item 1 -->
                        <div class="experience-item mb-4 pb-4 border-bottom">
                            <div class="d-flex justify-content-between mb-2">
                                <div class="flex-grow-1">
                                    <h6 class="fw-bold mb-1">Frontend Developer</h6>
                                    <p class="text-muted mb-1">
                                        <i class="bi bi-building me-1"></i>Tech Company Ltd.
                                    </p>
                                    <p class="text-muted mb-2">
                                        <i class="bi bi-calendar-event me-1"></i>
                                        <small>มกราคม 2023 - ปัจจุบัน (1 ปี 2 เดือน)</small>
                                    </p>
                                    <!-- รายละเอียดงาน -->
                                    <div class="experience-details mt-2">
                                        <p class="text-muted mb-1 small">
                                            <strong>รายละเอียดงาน:</strong>
                                        </p>
                                        <ul class="small text-muted mb-0 ps-3">
                                            <li>พัฒนาและดูแล Web Application ด้วย React.js และ TypeScript</li>
                                            <li>ทำงานร่วมกับ UX/UI Designer เพื่อนำ Design มาพัฒนาเป็น Component</li>
                                            <li>Implement Responsive Design และ Optimize Performance</li>
                                            <li>Code Review และ Mentoring สำหรับ Junior Developer</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ms-2">
                                    <button class="btn btn-sm btn-outline-secondary me-1" 
                                            onclick="editExperience(1)" 
                                            title="แก้ไข">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" 
                                            onclick="removeExperience(1)"
                                            title="ลบ">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Experience Item 2 -->
                        <div class="experience-item">
                            <div class="d-flex justify-content-between mb-2">
                                <div class="flex-grow-1">
                                    <h6 class="fw-bold mb-1">Junior Developer</h6>
                                    <p class="text-muted mb-1">
                                        <i class="bi bi-building me-1"></i>Startup Hub
                                    </p>
                                    <p class="text-muted mb-2">
                                        <i class="bi bi-calendar-event me-1"></i>
                                        <small>มิถุนายน 2021 - ธันวาคม 2022 (1 ปี 7 เดือน)</small>
                                    </p>
                                    <!-- รายละเอียดงาน -->
                                    <div class="experience-details mt-2">
                                        <p class="text-muted mb-1 small">
                                            <strong>รายละเอียดงาน:</strong>
                                        </p>
                                        <ul class="small text-muted mb-0 ps-3">
                                            <li>พัฒนา Frontend ด้วย Vue.js และ JavaScript</li>
                                            <li>ทำงานในทีม Agile และเข้าร่วม Daily Standup</li>
                                            <li>Fix Bug และ Implement Features ตาม Requirements</li>
                                            <li>เรียนรู้และนำ Best Practices มาใช้ในโปรเจค</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ms-2">
                                    <button class="btn btn-sm btn-outline-secondary me-1" 
                                            onclick="editExperience(2)" 
                                            title="แก้ไข">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" 
                                            onclick="removeExperience(2)"
                                            title="ลบ">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="col-lg-4">
                <!-- Profile Picture -->
                <div class="card shadow-sm mb-4">
                    <div class="card-body text-center">
                        <img src="https://ui-avatars.com/api/?name=User&size=150&background=6366f1&color=fff" 
                             alt="Profile" class="rounded-circle mb-3" width="150" height="150">
                        <h5 class="fw-bold mb-1">สมชาย ใจดี</h5>
                        <p class="text-muted mb-3">Frontend Developer</p>
                        <button class="btn btn-outline-primary btn-sm w-100">
                            <i class="bi bi-camera"></i> เปลี่ยนรูปโปรไฟล์
                        </button>
                    </div>
                </div>

                <!-- Resume -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3">
                        <h6 class="mb-0 fw-bold" data-i18n="dashboard.resume">เรซูเม่</h6>
                    </div>
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <i class="bi bi-file-earmark-pdf text-danger fs-3 me-3"></i>
                            <div>
                                <p class="mb-0 small fw-bold">resume_2026.pdf</p>
                                <small class="text-muted">อัพเดท: 1 มีนาคม 2026</small>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-eye"></i> ดู
                            </button>
                            <button class="btn btn-outline-success btn-sm">
                                <i class="bi bi-upload"></i> อัพโหลดใหม่
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <button class="btn btn-primary w-100" onclick="saveProfile()">
                    <i class="bi bi-save"></i> บันทึกการเปลี่ยนแปลง
                </button>
            </div>
        </div>
    `);
    
    translatePage();
}

// USER: Settings
function loadUserSettings() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <!-- Account Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.account-settings">การตั้งค่าบัญชี</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label">อีเมล</label>
                            <input type="email" class="form-control" value="user@demo.com" disabled>
                            <small class="text-muted">ไม่สามารถเปลี่ยนอีเมลได้</small>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">รหัสผ่าน</label>
                            <button class="btn btn-outline-primary w-100" onclick="changePassword()">
                                <i class="bi bi-key"></i> เปลี่ยนรหัสผ่าน
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Notification Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.notification-settings">การแจ้งเตือน</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="emailNotif" checked>
                            <label class="form-check-label" for="emailNotif">
                                แจ้งเตือนทางอีเมล
                            </label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="jobAlerts" checked>
                            <label class="form-check-label" for="jobAlerts">
                                แจ้งเตือนงานใหม่ที่เหมาะกับคุณ
                            </label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="applicationUpdates" checked>
                            <label class="form-check-label" for="applicationUpdates">
                                อัพเดทสถานะใบสมัคร
                            </label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="marketingEmails">
                            <label class="form-check-label" for="marketingEmails">
                                รับข่าวสารและโปรโมชั่น
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Privacy Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.privacy-settings">ความเป็นส่วนตัว</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="profilePublic" checked>
                            <label class="form-check-label" for="profilePublic">
                                ให้นายจ้างค้นหาโปรไฟล์ของฉันได้
                            </label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="showResume">
                            <label class="form-check-label" for="showResume">
                                แสดงเรซูเม่ให้นายจ้างดู
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Danger Zone -->
                <div class="card shadow-sm border-danger mb-4">
                    <div class="card-header bg-danger bg-opacity-10 py-3">
                        <h5 class="mb-0 fw-bold text-danger" data-i18n="dashboard.danger-zone">Danger Zone</h5>
                    </div>
                    <div class="card-body">
                        <p class="text-muted mb-3">การลบบัญชีจะไม่สามารถกู้คืนได้</p>
                        <button class="btn btn-danger" onclick="deleteAccount()">
                            <i class="bi bi-trash"></i> ลบบัญชี
                        </button>
                    </div>
                </div>

                <button class="btn btn-primary">
                    <i class="bi bi-save"></i> บันทึกการตั้งค่า
                </button>
            </div>
        </div>
    `);
    
    translatePage();
}

// ========================================
// EMPLOYER DASHBOARD
// ========================================
function loadEmployerDashboard() {
    $('#dashboardTitle').attr('data-i18n', 'dashboard.employer.title').text('Dashboard - นายจ้าง');
    
    // Load menu
    $('#dashboardMenu').html(`
        <li class="nav-item">
            <a class="nav-link ${currentView === 'overview' ? 'active' : ''}" href="dashboard.html?view=overview">
                <i class="bi bi-speedometer2"></i> <span data-i18n="dashboard.overview">ภาพรวม</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'my-jobs' ? 'active' : ''}" href="dashboard.html?view=my-jobs">
                <i class="bi bi-briefcase"></i> <span data-i18n="dashboard.employer.my-jobs">งานของฉัน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'applications' ? 'active' : ''}" href="dashboard.html?view=applications">
                <i class="bi bi-people"></i> <span data-i18n="dashboard.employer.applications">ใบสมัคร</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'payments' ? 'active' : ''}" href="dashboard.html?view=payments">
                <i class="bi bi-credit-card"></i> <span data-i18n="dashboard.payments">การชำระเงิน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'profile' ? 'active' : ''}" href="dashboard.html?view=profile">
                <i class="bi bi-building"></i> <span data-i18n="dashboard.employer.company-profile">โปรไฟล์บริษัท</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'settings' ? 'active' : ''}" href="dashboard.html?view=settings">
                <i class="bi bi-gear"></i> <span data-i18n="dashboard.settings">ตั้งค่า</span>
            </a>
        </li>
        <li class="nav-item mt-3">
            <a class="nav-link btn btn-primary text-white" href="post-job.html">
                <i class="bi bi-plus-circle"></i> <span data-i18n="dashboard.post-job">ประกาศงาน</span>
            </a>
        </li>
    `);
    
    translatePage();
    
    // Load appropriate view
    switch(currentView) {
        case 'overview':
            loadEmployerOverview();
            break;
        case 'my-jobs':
            loadEmployerJobs();
            break;
        case 'applications':
            loadEmployerApplications();
            break;
        case 'payments':
            loadEmployerPayments();
            break;
        case 'profile':
            loadEmployerProfile();
            break;
        case 'settings':
            loadEmployerSettings();
            break;
        default:
            loadEmployerOverview();
    }
}

// EMPLOYER: Overview
function loadEmployerOverview() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <!-- Stat Cards -->
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                            <i class="bi bi-briefcase fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">8</h4>
                            <small class="text-muted" data-i18n="dashboard.employer.active-jobs">งานที่เปิดรับ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-success bg-opacity-10 text-success rounded-3 p-3 me-3">
                            <i class="bi bi-people fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">156</h4>
                            <small class="text-muted" data-i18n="dashboard.employer.total-applicants">ผู้สมัครทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-warning bg-opacity-10 text-warning rounded-3 p-3 me-3">
                            <i class="bi bi-clock-history fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">23</h4>
                            <small class="text-muted" data-i18n="dashboard.employer.pending-review">รอการตรวจสอบ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-info bg-opacity-10 text-info rounded-3 p-3 me-3">
                            <i class="bi bi-eye fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">2,450</h4>
                            <small class="text-muted" data-i18n="dashboard.employer.total-views">จำนวนการดู</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="row g-4 mb-4">
            <div class="col-lg-8">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.monthly-stats">สถิติรายเดือน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="employerStatsChart" height="80"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.application-status">สถานะใบสมัคร</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="applicationStatusChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Applications -->
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.recent-applications">ใบสมัครล่าสุด</h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th data-i18n="dashboard.applicant">ผู้สมัคร</th>
                                <th data-i18n="dashboard.position">ตำแหน่ง</th>
                                <th data-i18n="dashboard.applied-date">วันที่สมัคร</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="https://ui-avatars.com/api/?name=John+Doe" class="rounded-circle me-2" width="32" height="32">
                                        <strong>John Doe</strong>
                                    </div>
                                </td>
                                <td>Senior Frontend Developer</td>
                                <td>5 มีนาคม 2026</td>
                                <td><span class="badge bg-warning">รอการตรวจสอบ</span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary" onclick="viewApplicant(1)">
                                        <i class="bi bi-eye"></i> ดู
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="https://ui-avatars.com/api/?name=Jane+Smith" class="rounded-circle me-2" width="32" height="32">
                                        <strong>Jane Smith</strong>
                                    </div>
                                </td>
                                <td>UX/UI Designer</td>
                                <td>4 มีนาคม 2026</td>
                                <td><span class="badge bg-warning">รอการตรวจสอบ</span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary" onclick="viewApplicant(2)">
                                        <i class="bi bi-eye"></i> ดู
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer bg-white text-center">
                <a href="dashboard.html?view=applications" class="btn btn-primary">
                    ดูใบสมัครทั้งหมด <i class="bi bi-arrow-right"></i>
                </a>
            </div>
        </div>
    `);
    
    translatePage();
    
    // Initialize charts
    setTimeout(() => {
        initEmployerCharts();
    }, 100);
}

function initEmployerCharts() {
    // Monthly Stats Chart
    const ctx1 = document.getElementById('employerStatsChart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
                datasets: [{
                    label: 'ผู้สมัคร',
                    data: [12, 19, 28, 25, 32, 42],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                }, {
                    label: 'จำนวนการดู',
                    data: [150, 230, 320, 280, 410, 520],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Application Status Chart
    const ctx2 = document.getElementById('applicationStatusChart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['รอการตรวจสอบ', 'กำลังพิจารณา', 'ได้รับการตอบรับ', 'ไม่ผ่าน'],
                datasets: [{
                    data: [23, 45, 67, 21],
                    backgroundColor: ['#f59e0b', '#06b6d4', '#10b981', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// EMPLOYER: My Jobs
function loadEmployerJobs() {
    $('#dashboardContent').html(`
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h5 class="fw-bold mb-0" data-i18n="dashboard.employer.my-jobs">งานของฉัน</h5>
                <p class="text-muted mb-0">คุณมี 8 ตำแหน่งงานที่เปิดรับสมัคร</p>
            </div>
            <a href="employer-post-job.html" class="btn btn-primary">
                <i class="bi bi-plus-circle"></i> ประกาศงานใหม่
            </a>
        </div>

        <div class="card shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th data-i18n="dashboard.job-title">ตำแหน่งงาน</th>
                                <th data-i18n="dashboard.location">สถานที่</th>
                                <th data-i18n="dashboard.posted-date">วันที่ประกาศ</th>
                                <th data-i18n="dashboard.applicants">ผู้สม��คร</th>
                                <th data-i18n="dashboard.views">การดู</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateEmployerJobRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

function generateEmployerJobRows() {
    const jobs = [
        { id: 1, title: 'Senior Frontend Developer', location: 'กรุงเทพฯ', date: '1 มีนาคม 2026', applicants: 42, views: 523, status: 'active', statusText: 'เปิดรับสมัคร', statusClass: 'success' },
        { id: 2, title: 'UX/UI Designer', location: 'กรุงเทพฯ', date: '28 กุมภาพันธ์ 2026', applicants: 28, views: 412, status: 'active', statusText: 'เปิดรับสมัคร', statusClass: 'success' },
        { id: 3, title: 'Backend Developer', location: 'เชียงใหม่', date: '25 กุมภาพันธ์ 2026', applicants: 35, views: 380, status: 'active', statusText: 'เปิดรับสมัคร', statusClass: 'success' },
        { id: 4, title: 'Project Manager', location: 'กรุงเทพฯ', date: '20 กุมภาพันธ์ 2026', applicants: 19, views: 245, status: 'draft', statusText: 'แบบร่าง', statusClass: 'secondary' },
        { id: 5, title: 'Marketing Manager', location: 'กรุงเทพฯ', date: '15 กุมภาพันธ์ 2026', applicants: 32, views: 298, status: 'closed', statusText: 'ปิดรับสมัคร', statusClass: 'danger' },
    ];
    
    return jobs.map(job => `
        <tr>
            <td><strong>${job.title}</strong></td>
            <td><i class="bi bi-geo-alt text-muted"></i> ${job.location}</td>
            <td>${job.date}</td>
            <td><span class="badge bg-primary">${job.applicants}</span></td>
            <td><span class="badge bg-info">${job.views}</span></td>
            <td><span class="badge bg-${job.statusClass}">${job.statusText}</span></td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewJobApplicants(${job.id})" title="ดูผู้สมัคร">
                        <i class="bi bi-people"></i>
                    </button>
                    <button class="btn btn-outline-secondary" onclick="editJob(${job.id})" title="แก้ไข">
                        <i class="bi bi-pencil"></i>
                    </button>
                    ${job.status === 'active' ? `
                        <button class="btn btn-outline-warning" onclick="closeJob(${job.id})" title="ปิดรับสมัคร">
                            <i class="bi bi-x-circle"></i>
                        </button>
                    ` : ''}
                    ${job.status === 'draft' ? `
                        <button class="btn btn-outline-success" onclick="publishJob(${job.id})" title="เผยแพร่">
                            <i class="bi bi-check-circle"></i>
                        </button>
                    ` : ''}
                    <button class="btn btn-outline-danger" onclick="deleteJob(${job.id})" title="ลบ">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// EMPLOYER: Applications
function loadEmployerApplications() {
    $('#dashboardContent').html(`
        <div class="mb-4">
            <h5 class="fw-bold mb-3" data-i18n="dashboard.employer.applications">ใบสมัครทั้งหมด</h5>
            <div class="row g-3">
                <div class="col-md-4">
                    <select class="form-select" id="jobFilter">
                        <option value="">ตำแหน่งงานทั้งหมด</option>
                        <option value="1">Senior Frontend Developer</option>
                        <option value="2">UX/UI Designer</option>
                        <option value="3">Backend Developer</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <select class="form-select" id="statusFilter">
                        <option value="">สถานะทั้งหมด</option>
                        <option value="pending">รอการตรวจสอบ</option>
                        <option value="reviewing">กำลังพิจารณา</option>
                        <option value="accepted">ได้รับการตอบรับ</option>
                        <option value="rejected">ไม่ผ่าน</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="card shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th data-i18n="dashboard.applicant">ผู้สมัคร</th>
                                <th data-i18n="dashboard.position">ตำแหน่ง</th>
                                <th data-i18n="dashboard.email">อีเมล</th>
                                <th data-i18n="dashboard.phone">เบอร์โทร</th>
                                <th data-i18n="dashboard.applied-date">วันที่สมัคร</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateEmployerApplicationRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

function generateEmployerApplicationRows() {
    const applications = [
        { id: 1, name: 'John Doe', position: 'Senior Frontend Developer', email: 'john@email.com', phone: '081-234-5678', date: '5 มีนาคม 2026', status: 'pending', statusText: 'รอการตรวจสอบ', statusClass: 'warning' },
        { id: 2, name: 'Jane Smith', position: 'UX/UI Designer', email: 'jane@email.com', phone: '082-345-6789', date: '4 มีนาคม 2026', status: 'reviewing', statusText: 'กำลังพิจารณา', statusClass: 'info' },
        { id: 3, name: 'Bob Wilson', position: 'Backend Developer', email: 'bob@email.com', phone: '083-456-7890', date: '3 มีนาคม 2026', status: 'accepted', statusText: 'ได้รับการตอบรับ', statusClass: 'success' },
        { id: 4, name: 'Alice Brown', position: 'Senior Frontend Developer', email: 'alice@email.com', phone: '084-567-8901', date: '2 มีนาคม 2026', status: 'rejected', statusText: 'ไม่ผ่าน', statusClass: 'danger' },
    ];
    
    return applications.map(app => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}" class="rounded-circle me-2" width="32" height="32">
                    <strong>${app.name}</strong>
                </div>
            </td>
            <td>${app.position}</td>
            <td>${app.email}</td>
            <td>${app.phone}</td>
            <td>${app.date}</td>
            <td><span class="badge bg-${app.statusClass}">${app.statusText}</span></td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewApplicant(${app.id})" title="ดูรายละเอียด">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-info" onclick="viewResume(${app.id})" title="ดูเรซูเม่">
                        <i class="bi bi-file-earmark-pdf"></i>
                    </button>
                    ${app.status === 'pending' || app.status === 'reviewing' ? `
                        <button class="btn btn-outline-success" onclick="acceptApplicant(${app.id})" title="ยอมรับ">
                            <i class="bi bi-check-circle"></i>
                        </button>
                        <button class="btn btn-outline-danger" onclick="rejectApplicant(${app.id})" title="ปฏิเสธ">
                            <i class="bi bi-x-circle"></i>
                        </button>
                    ` : ''}
                    <button class="btn btn-outline-secondary" onclick="contactApplicant(${app.id})" title="ติดต่อ">
                        <i class="bi bi-envelope"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// EMPLOYER: Payments
function loadEmployerPayments() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <!-- Current Package -->
            <div class="col-lg-4">
                <div class="card shadow-sm border-primary">
                    <div class="card-header bg-primary text-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.current-package">แพ็คเกจปัจจุบัน</h5>
                    </div>
                    <div class="card-body text-center">
                        <h2 class="fw-bold mb-3">Basic</h2>
                        <p class="text-muted mb-4">299 บาท / ครั้ง</p>
                        <ul class="list-unstyled text-start mb-4">
                            <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> ประกาศงาน 1 ตำแหน่ง</li>
                            <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> เปิดรับสมัคร 30 วัน</li>
                            <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> ผู้สมัครไม่จำกัด</li>
                        </ul>
                        <button class="btn btn-outline-primary w-100" onclick="upgradePackage()">
                            <i class="bi bi-arrow-up-circle"></i> อัพเกรดแพ็คเกจ
                        </button>
                    </div>
                </div>
            </div>

            <!-- Available Packages -->
            <div class="col-lg-8">
                <h5 class="fw-bold mb-3" data-i18n="dashboard.employer.available-packages">แพ็คเกจที่มีให้บริการ</h5>
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="card shadow-sm h-100">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3">Premium</h5>
                                <h3 class="text-primary mb-3">2,499 บาท</h3>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> ประกาศงาน 10 ตำแหน่ง</li>
                                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> เปิดรับสมัคร 90 วัน</li>
                                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> โปรโมตงาน</li>
                                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> สถิติขั้นสูง</li>
                                </ul>
                                <button class="btn btn-primary w-100" onclick="buyPackage('premium')">
                                    <i class="bi bi-cart"></i> ซื้อแพ็คเกจนี้
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card shadow-sm h-100 border-warning">
                            <div class="card-header bg-warning text-dark py-2 text-center">
                                <strong>แนะนำ!</strong>
                            </div>
                            <div class="card-body">
                                <h5 class="fw-bold mb-3">Enterprise</h5>
                                <h3 class="text-primary mb-3">9,999 บาท</h3>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> ประกาศงานไม่จำกัด</li>
                                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> เปิดรับสมัคร 365 วัน</li>
                                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> โปรโมตพิเศษ</li>
                                    <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> Account Manager</li>
                                </ul>
                                <button class="btn btn-warning w-100" onclick="buyPackage('enterprise')">
                                    <i class="bi bi-cart"></i> ซื้อแพ็คเกจนี้
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment History -->
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.payment-history">ประวัติการชำระเงิน</h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th data-i18n="dashboard.date">วันที่</th>
                                <th data-i18n="dashboard.description">รายการ</th>
                                <th data-i18n="dashboard.amount">จำนวนเงิน</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.invoice">ใบเสร็จ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1 มีนาคม 2026</td>
                                <td>ประกาศงาน - Senior Frontend Developer</td>
                                <td class="fw-bold">299 บาท</td>
                                <td><span class="badge bg-success">ชำระแล้ว</span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">
                                        <i class="bi bi-download"></i> ดาวน์โหลด
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>15 กุมภาพันธ์ 2026</td>
                                <td>ประกาศงาน - UX/UI Designer</td>
                                <td class="fw-bold">299 บาท</td>
                                <td><span class="badge bg-success">ชำระแล้ว</span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary">
                                        <i class="bi bi-download"></i> ดาวน์โหลด
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

// EMPLOYER: Profile
function loadEmployerProfile() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.company-info">ข้อมูลบริษัท</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row g-3">
                                <div class="col-12">
                                    <label class="form-label">ชื่อบริษัท</label>
                                    <input type="text" class="form-control" value="TechCorp Thailand Co., Ltd.">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">ประเภทธุรกิจ</label>
                                    <select class="form-select">
                                        <option>Technology</option>
                                        <option>Finance</option>
                                        <option>Education</option>
                                        <option>Healthcare</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">ขนาดบริษัท</label>
                                    <select class="form-select">
                                        <option>1-10 คน</option>
                                        <option>11-50 คน</option>
                                        <option selected>51-200 คน</option>
                                        <option>201-500 คน</option>
                                        <option>500+ คน</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">เว็บไซต์</label>
                                    <input type="url" class="form-control" value="https://techcorp.co.th">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">อีเมลติดต่อ</label>
                                    <input type="email" class="form-control" value="hr@techcorp.co.th">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">เบอร์โทรศัพท์</label>
                                    <input type="tel" class="form-control" value="02-123-4567">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">เลขทะเบียนนิติบุคคล</label>
                                    <input type="text" class="form-control" value="0105123456789">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">ที่อยู่</label>
                                    <textarea class="form-control" rows="3">123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</textarea>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">เกี่ยวกับบริษัท</label>
                                    <textarea class="form-control" rows="4">TechCorp Thailand เป็นบริษัทเทคโนโลยีชั้นนำที่มุ่งเน้นการพัฒนาซอฟต์แวร์และโซลูชันดิจิทัลสำหรับธุรกิจในประเทศไทย</textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <!-- Company Logo -->
                <div class="card shadow-sm mb-4">
                    <div class="card-body text-center">
                        <img src="https://ui-avatars.com/api/?name=TechCorp&size=150&background=6366f1&color=fff" 
                             alt="Logo" class="rounded mb-3" width="150" height="150">
                        <h5 class="fw-bold mb-1">TechCorp Thailand</h5>
                        <p class="text-muted mb-3">Technology Company</p>
                        <button class="btn btn-outline-primary btn-sm w-100">
                            <i class="bi bi-upload"></i> เปลี่ยนโลโก้
                        </button>
                    </div>
                </div>

                <!-- Verification Status -->
                <div class="card shadow-sm mb-4 border-success">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-patch-check-fill text-success fs-2 me-3"></i>
                            <div>
                                <h6 class="fw-bold mb-1">บริษัทได้รับการยืนยันแล้ว</h6>
                                <small class="text-muted">ยืนยันเมื่อ 1 มีนาคม 2026</small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <button class="btn btn-primary w-100" onclick="saveCompanyProfile()">
                    <i class="bi bi-save"></i> บันทึกการเปลี่ยนแปลง
                </button>
            </div>
        </div>
    `);
    
    translatePage();
}

// EMPLOYER: Settings
function loadEmployerSettings() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <!-- Account Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.account-settings">การตั้งค่าบัญชี</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label">อีเมล</label>
                            <input type="email" class="form-control" value="employer@demo.com" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">รหัสผ่าน</label>
                            <button class="btn btn-outline-primary w-100" onclick="changePassword()">
                                <i class="bi bi-key"></i> เปลี่ยนรหัสผ่าน
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Notification Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.notification-settings">การแจ้งเตือน</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="newApplications" checked>
                            <label class="form-check-label" for="newApplications">
                                แจ้งเตือนเมื่อมีผู้สมัครใหม่
                            </label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="jobExpiry" checked>
                            <label class="form-check-label" for="jobExpiry">
                                แจ้งเตือนก่อนประกาศงานหมดอายุ
                            </label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="weeklyReport" checked>
                            <label class="form-check-label" for="weeklyReport">
                                รายงานสถิติรายสัปดาห์
                            </label>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary">
                    <i class="bi bi-save"></i> บันทึกการตั้งค่า
                </button>
            </div>
        </div>
    `);
    
    translatePage();
}

// ========================================
// ADMIN DASHBOARD
// ========================================
function loadAdminDashboard() {
    $('#dashboardTitle').attr('data-i18n', 'dashboard.admin.title').text('Dashboard - แอดมิน');
    
    // Load menu
    $('#dashboardMenu').html(`
        <li class="nav-item">
            <a class="nav-link ${currentView === 'overview' ? 'active' : ''}" href="dashboard.html?view=overview">
                <i class="bi bi-speedometer2"></i> <span data-i18n="dashboard.overview">ภาพรวม</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'users' ? 'active' : ''}" href="dashboard.html?view=users">
                <i class="bi bi-people"></i> <span data-i18n="dashboard.admin.users">จัดการผู้ใช้</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'employers' ? 'active' : ''}" href="dashboard.html?view=employers">
                <i class="bi bi-building"></i> <span data-i18n="dashboard.admin.employers">จัดการนายจ้าง</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'jobs' ? 'active' : ''}" href="dashboard.html?view=jobs">
                <i class="bi bi-briefcase"></i> <span data-i18n="dashboard.admin.jobs">จัดการงาน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'payments' ? 'active' : ''}" href="dashboard.html?view=payments">
                <i class="bi bi-credit-card"></i> <span data-i18n="dashboard.payments">การชำระเงิน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'reports' ? 'active' : ''}" href="dashboard.html?view=reports">
                <i class="bi bi-bar-chart"></i> <span data-i18n="dashboard.admin.reports">รายงาน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'settings' ? 'active' : ''}" href="dashboard.html?view=settings">
                <i class="bi bi-gear"></i> <span data-i18n="dashboard.admin.system-settings">ตั้งค่าระบบ</span>
            </a>
        </li>
    `);
    
    translatePage();
    
    // Load appropriate view
    switch(currentView) {
        case 'overview':
            loadAdminOverview();
            break;
        case 'users':
            loadAdminUsers();
            break;
        case 'employers':
            loadAdminEmployers();
            break;
        case 'jobs':
            loadAdminJobs();
            break;
        case 'payments':
            loadAdminPayments();
            break;
        case 'reports':
            loadAdminReports();
            break;
        case 'settings':
            loadAdminSettings();
            break;
        default:
            loadAdminOverview();
    }
}

// ADMIN: Overview
function loadAdminOverview() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <!-- Stat Cards -->
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                            <i class="bi bi-people fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">1,254</h4>
                            <small class="text-muted" data-i18n="dashboard.admin.total-users">ผู้ใช้ทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-success bg-opacity-10 text-success rounded-3 p-3 me-3">
                            <i class="bi bi-briefcase fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">456</h4>
                            <small class="text-muted" data-i18n="dashboard.admin.total-jobs">งานทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-warning bg-opacity-10 text-warning rounded-3 p-3 me-3">
                            <i class="bi bi-cash-coin fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">฿128,456</h4>
                            <small class="text-muted" data-i18n="dashboard.admin.total-revenue">รายได้ทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-info bg-opacity-10 text-info rounded-3 p-3 me-3">
                            <i class="bi bi-building fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">89</h4>
                            <small class="text-muted" data-i18n="dashboard.admin.total-employers">นายจ้างทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts -->
        <div class="row g-4 mb-4">
            <div class="col-lg-8">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.revenue-stats">สถิติรายได้</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="revenueChart" height="80"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.user-stats">สถิติผู้ใช้</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="userStatsChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activities -->
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.recent-activities">กิจกรรมล่าสุด</h5>
            </div>
            <div class="card-body p-0">
                <div class="list-group list-group-flush">
                    <div class="list-group-item">
                        <div class="d-flex align-items-center">
                            <div class="activity-icon bg-success bg-opacity-10 text-success rounded-circle p-2 me-3">
                                <i class="bi bi-person-plus"></i>
                            </div>
                            <div class="flex-grow-1">
                                <p class="mb-0"><strong>ผู้ใช้ใหม่สมัครสมาชิก</strong></p>
                                <small class="text-muted">john.doe@email.com - 5 นาทีที่แล้ว</small>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex align-items-center">
                            <div class="activity-icon bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-3">
                                <i class="bi bi-briefcase-fill"></i>
                            </div>
                            <div class="flex-grow-1">
                                <p class="mb-0"><strong>มีประกาศงานใหม่</strong></p>
                                <small class="text-muted">TechCorp Thailand - Senior Developer - 15 นาทีที่แล้ว</small>
                            </div>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="d-flex align-items-center">
                            <div class="activity-icon bg-warning bg-opacity-10 text-warning rounded-circle p-2 me-3">
                                <i class="bi bi-credit-card"></i>
                            </div>
                            <div class="flex-grow-1">
                                <p class="mb-0"><strong>มีการชำระเงิน</strong></p>
                                <small class="text-muted">Digital Agency - 299 บาท - 1 ชั่วโมงที่แล้ว</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
    
    // Initialize charts
    setTimeout(() => {
        initAdminCharts();
    }, 100);
}

function initAdminCharts() {
    // Revenue Chart
    const ctx1 = document.getElementById('revenueChart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
                datasets: [{
                    label: 'รายได้ (บาท)',
                    data: [15000, 23000, 18000, 25000, 32000, 28000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // User Stats Chart
    const ctx2 = document.getElementById('userStatsChart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['ผู้หางาน', 'นายจ้าง', 'แอดมิน'],
                datasets: [{
                    data: [1254, 89, 5],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// ADMIN: Users
function loadAdminUsers() {
    $('#dashboardContent').html(`
        <div class="mb-4">
            <div class="row align-items-center">
                <div class="col">
                    <h5 class="fw-bold mb-0" data-i18n="dashboard.admin.manage-users">จัดการผู้ใช้</h5>
                </div>
                <div class="col-auto">
                    <input type="search" class="form-control" placeholder="ค้นหาผู้ใช้...">
                </div>
            </div>
        </div>

        <div class="card shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th data-i18n="dashboard.name">ชื่อ</th>
                                <th data-i18n="dashboard.email">อีเมล</th>
                                <th data-i18n="dashboard.phone">เบอร์โทร</th>
                                <th data-i18n="dashboard.registered">สมัครเมื่อ</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminUserRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

function generateAdminUserRows() {
    const users = [
        { id: 1, name: 'สมชาย ใจดี', email: 'somchai@email.com', phone: '081-234-5678', registered: '1 มีนาคม 2026', status: 'active', statusText: 'ใช้งาน', statusClass: 'success' },
        { id: 2, name: 'สมหญิง สวยงาม', email: 'somying@email.com', phone: '082-345-6789', registered: '28 กุมภาพันธ์ 2026', status: 'active', statusText: 'ใช้งาน', statusClass: 'success' },
        { id: 3, name: 'วิชัย มั่งมี', email: 'wichai@email.com', phone: '083-456-7890', registered: '25 กุมภาพันธ์ 2026', status: 'suspended', statusText: 'ระงับ', statusClass: 'warning' },
    ];
    
    return users.map(user => `
        <tr>
            <td>#${user.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}" class="rounded-circle me-2" width="32" height="32">
                    <strong>${user.name}</strong>
                </div>
            </td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.registered}</td>
            <td><span class="badge bg-${user.statusClass}">${user.statusText}</span></td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewUser(${user.id})" title="ดูรายละเอียด">
                        <i class="bi bi-eye"></i>
                    </button>
                    ${user.status === 'active' ? `
                        <button class="btn btn-outline-warning" onclick="suspendUser(${user.id})" title="ระงับ">
                            <i class="bi bi-pause-circle"></i>
                        </button>
                    ` : `
                        <button class="btn btn-outline-success" onclick="activateUser(${user.id})" title="เปิดใช้งาน">
                            <i class="bi bi-check-circle"></i>
                        </button>
                    `}
                    <button class="btn btn-outline-danger" onclick="deleteUser(${user.id})" title="ลบ">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ADMIN: Employers
function loadAdminEmployers() {
    $('#dashboardContent').html(`
        <div class="mb-4">
            <div class="row align-items-center">
                <div class="col">
                    <h5 class="fw-bold mb-0" data-i18n="dashboard.admin.manage-employers">จัดการนายจ้าง</h5>
                </div>
                <div class="col-auto">
                    <input type="search" class="form-control" placeholder="ค้นหานายจ้าง...">
                </div>
            </div>
        </div>

        <div class="card shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th data-i18n="dashboard.company">บริษัท</th>
                                <th data-i18n="dashboard.email">อีเมล</th>
                                <th data-i18n="dashboard.phone">เบอร์โทร</th>
                                <th data-i18n="dashboard.active-jobs">งานที่เปิด</th>
                                <th data-i18n="dashboard.verified">ยืนยัน</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminEmployerRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

function generateAdminEmployerRows() {
    const employers = [
        { id: 1, company: 'TechCorp Thailand', email: 'hr@techcorp.co.th', phone: '02-123-4567', jobs: 8, verified: true },
        { id: 2, company: 'Digital Agency', email: 'contact@digital.com', phone: '02-234-5678', jobs: 5, verified: true },
        { id: 3, company: 'Startup Hub', email: 'info@startup.co', phone: '02-345-6789', jobs: 3, verified: false },
    ];
    
    return employers.map(emp => `
        <tr>
            <td>#${emp.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(emp.company)}" class="rounded me-2" width="32" height="32">
                    <strong>${emp.company}</strong>
                </div>
            </td>
            <td>${emp.email}</td>
            <td>${emp.phone}</td>
            <td><span class="badge bg-primary">${emp.jobs}</span></td>
            <td>
                ${emp.verified ? 
                    '<span class="badge bg-success"><i class="bi bi-patch-check-fill"></i> ยืนยันแล้ว</span>' :
                    '<span class="badge bg-warning"><i class="bi bi-clock"></i> รอยืนยัน</span>'
                }
            </td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewEmployer(${emp.id})" title="ดูรายละเอียด">
                        <i class="bi bi-eye"></i>
                    </button>
                    ${!emp.verified ? `
                        <button class="btn btn-outline-success" onclick="verifyEmployer(${emp.id})" title="ยืนยัน">
                            <i class="bi bi-check-circle"></i>
                        </button>
                    ` : ''}
                    <button class="btn btn-outline-danger" onclick="deleteEmployer(${emp.id})" title="ลบ">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ADMIN: Jobs
function loadAdminJobs() {
    $('#dashboardContent').html(`
        <div class="mb-4">
            <div class="row align-items-center">
                <div class="col">
                    <h5 class="fw-bold mb-0" data-i18n="dashboard.admin.manage-jobs">จัดการงาน</h5>
                </div>
                <div class="col-auto">
                    <select class="form-select form-select-sm">
                        <option value="">สถานะทั้งหมด</option>
                        <option value="active">เปิดรับสมัคร</option>
                        <option value="pending">รออนุมัติ</option>
                        <option value="closed">ปิดรับสมัคร</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="card shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th data-i18n="dashboard.job-title">ตำแหน่งงาน</th>
                                <th data-i18n="dashboard.company">บริษัท</th>
                                <th data-i18n="dashboard.posted-date">วันที่ประกาศ</th>
                                <th data-i18n="dashboard.applicants">ผู้สมัคร</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminJobRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

function generateAdminJobRows() {
    const jobs = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', date: '1 มีนาคม 2026', applicants: 42, status: 'active', statusText: 'เปิดรับ', statusClass: 'success' },
        { id: 2, title: 'UX/UI Designer', company: 'Creative Studio', date: '28 กุมภาพันธ์ 2026', applicants: 28, status: 'pending', statusText: 'รออนุมัติ', statusClass: 'warning' },
        { id: 3, title: 'Backend Developer', company: 'Startup Hub', date: '25 กุมภาพันธ์ 2026', applicants: 35, status: 'active', statusText: 'เปิดรับ', statusClass: 'success' },
    ];
    
    return jobs.map(job => `
        <tr>
            <td>#${job.id}</td>
            <td><strong>${job.title}</strong></td>
            <td>${job.company}</td>
            <td>${job.date}</td>
            <td><span class="badge bg-primary">${job.applicants}</span></td>
            <td><span class="badge bg-${job.statusClass}">${job.statusText}</span></td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewJob(${job.id})" title="ดูรายละเอียด">
                        <i class="bi bi-eye"></i>
                    </button>
                    ${job.status === 'pending' ? `
                        <button class="btn btn-outline-success" onclick="approveJob(${job.id})" title="อนุมัติ">
                            <i class="bi bi-check-circle"></i>
                        </button>
                    ` : ''}
                    <button class="btn btn-outline-danger" onclick="deleteJob(${job.id})" title="ลบ">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ADMIN: Payments
function loadAdminPayments() {
    $('#dashboardContent').html(`
        <div class="mb-4">
            <h5 class="fw-bold" data-i18n="dashboard.admin.payment-transactions">รายการชำระเงิน</h5>
        </div>

        <div class="card shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th data-i18n="dashboard.date">วันที่</th>
                                <th data-i18n="dashboard.company">บริษัท</th>
                                <th data-i18n="dashboard.description">รายการ</th>
                                <th data-i18n="dashboard.amount">จำนวนเงิน</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminPaymentRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

function generateAdminPaymentRows() {
    const payments = [
        { id: 1, date: '5 มีนาคม 2026', company: 'TechCorp', desc: 'ประกาศงาน - Senior Developer', amount: 299, status: 'completed' },
        { id: 2, date: '4 มีนาคม 2026', company: 'Digital Agency', desc: 'แพ็คเกจ Premium', amount: 2499, status: 'completed' },
        { id: 3, date: '3 มีนาคม 2026', company: 'Startup Hub', desc: 'ประกาศงาน - Marketing', amount: 299, status: 'completed' },
    ];
    
    return payments.map(pay => `
        <tr>
            <td>#${pay.id}</td>
            <td>${pay.date}</td>
            <td>${pay.company}</td>
            <td>${pay.desc}</td>
            <td class="fw-bold">฿${pay.amount.toLocaleString()}</td>
            <td><span class="badge bg-success">ชำระแล้ว</span></td>
        </tr>
    `).join('');
}

// ADMIN: Reports
function loadAdminReports() {
    $('#dashboardContent').html(`
        <div class="row g-4">
            <!-- Revenue Chart -->
            <div class="col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.revenue-chart">กราฟรายได้</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="adminRevenueChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- User Growth Chart -->
            <div class="col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.user-growth">การเติบโตของผู้ใช้</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="userGrowthChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Job Stats Chart -->
            <div class="col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.job-stats">สถิติงาน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="jobStatsChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Application Stats -->
            <div class="col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.application-stats">สถิติการสมัคร</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="applicationStatsChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
    
    // Initialize charts
    setTimeout(() => {
        initAdminReportCharts();
    }, 100);
}

function initAdminReportCharts() {
    // Revenue Chart
    const ctx1 = document.getElementById('adminRevenueChart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
                datasets: [{
                    label: 'รายได้ (บาท)',
                    data: [15000, 23000, 18000, 25000, 32000, 28000],
                    backgroundColor: '#6366f1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    }
    
    // User Growth Chart
    const ctx2 = document.getElementById('userGrowthChart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
                datasets: [{
                    label: 'ผู้ใช้ใหม่',
                    data: [45, 78, 92, 120, 145, 178],
                    borderColor: '#10b981',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    }
    
    // Job Stats Chart
    const ctx3 = document.getElementById('jobStatsChart');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ['เปิดรับ', 'ปิดรับ', 'รออนุมัติ'],
                datasets: [{
                    data: [320, 120, 16],
                    backgroundColor: ['#10b981', '#ef4444', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
    
    // Application Stats Chart
    const ctx4 = document.getElementById('applicationStatsChart');
    if (ctx4) {
        new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
                datasets: [{
                    label: 'ใบสมัคร',
                    data: [240, 350, 420, 380, 510, 620],
                    backgroundColor: '#06b6d4'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}

// ADMIN: Settings
function loadAdminSettings() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.system-settings">ตั้งค่าระบบ</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">ชื่อเว็บไซต์</label>
                                <input type="text" class="form-control" value="JobHub">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">อีเมลติดต่อ</label>
                                <input type="email" class="form-control" value="support@jobhub.com">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ราคาประกาศงาน (บาท)</label>
                                <input type="number" class="form-control" value="299">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ระยะเวลาประกาศงาน (วัน)</label>
                                <input type="number" class="form-control" value="30">
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="maintenanceMode">
                                    <label class="form-check-label" for="maintenanceMode">
                                        โหมดปิดปรับปรุง
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="autoApprove" checked>
                                    <label class="form-check-label" for="autoApprove">
                                        อนุมัติประกาศงานอัตโนมัติ
                                    </label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">
                                <i class="bi bi-save"></i> บันทึกการตั้งค่า
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function viewApplication(id) { alert('View application ' + id); }
function cancelApplication(id) { 
    if(confirm('ยืนยันการยกเลิกใบสมัครนี้?')) {
        alert('Cancel application ' + id); 
    }
}
function unsaveJob(id) { alert('Unsave job ' + id); }
function applyJob(id) { window.location.href = 'job-detail.html?id=' + id; }
function addSkill() { alert('Add skill'); }

// Add/Edit Experience
function addExperience() { 
    showExperienceModal();
}

function editExperience(id) {
    // Mock data - In production, fetch from API
    const experience = {
        id: id,
        position: id === 1 ? 'Frontend Developer' : 'Junior Developer',
        company: id === 1 ? 'Tech Company Ltd.' : 'Startup Hub',
        startDate: id === 1 ? '2023-01' : '2021-06',
        endDate: id === 1 ? '' : '2022-12',
        current: id === 1 ? true : false,
        description: id === 1 ? 
            '• พัฒนาและดูแล Web Application ด้วย React.js และ TypeScript\n• ทำงานร่วมกับ UX/UI Designer เพื่อนำ Design มาพัฒนาเป็น Component\n• Implement Responsive Design และ Optimize Performance\n• Code Review และ Mentoring สำหรับ Junior Developer' :
            '• พัฒนา Frontend ด้วย Vue.js และ JavaScript\n• ทำงานในทีม Agile และเข้าร่วม Daily Standup\n• Fix Bug และ Implement Features ตาม Requirements\n• เรียนรู้และนำ Best Practices มาใช้ในโปรเจค'
    };
    showExperienceModal(experience);
}

function showExperienceModal(experience = null) {
    const isEdit = experience !== null;
    const modalTitle = isEdit ? 'แก้ไขประสบการณ์ทำงาน' : 'เพิ่มประสบการณ์ทำงาน';
    
    const modalHtml = `
        <div class="modal fade" id="experienceModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-gradient border-0 text-white">
                        <h5 class="modal-title fw-bold">
                            <i class="bi bi-briefcase me-2"></i>${modalTitle}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form id="experienceForm">
                            <div class="row g-3">
                                <!-- Position -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        ตำแหน่งงาน <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" class="form-control" id="expPosition" 
                                           value="${experience?.position || ''}" 
                                           placeholder="เช่น Frontend Developer, Project Manager" required>
                                </div>
                                
                                <!-- Company -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        บริษัท <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" class="form-control" id="expCompany" 
                                           value="${experience?.company || ''}" 
                                           placeholder="เช่น Tech Company Ltd." required>
                                </div>
                                
                                <!-- Start Date -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        เริ่มทำงาน <span class="text-danger">*</span>
                                    </label>
                                    <input type="month" class="form-control" id="expStartDate" 
                                           value="${experience?.startDate || ''}" required>
                                </div>
                                
                                <!-- End Date -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        สิ้นสุด
                                    </label>
                                    <input type="month" class="form-control" id="expEndDate" 
                                           value="${experience?.endDate || ''}"
                                           ${experience?.current ? 'disabled' : ''}>
                                </div>
                                
                                <!-- Current Job Checkbox -->
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="expCurrent" 
                                               ${experience?.current ? 'checked' : ''}>
                                        <label class="form-check-label" for="expCurrent">
                                            ฉันยังทำงานที่นี่อยู่
                                        </label>
                                    </div>
                                </div>
                                
                                <!-- Description -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        รายละเอียดงาน
                                        <small class="text-muted">(แนะนำ)</small>
                                    </label>
                                    <textarea class="form-control" id="expDescription" rows="8" 
                                              placeholder="เช่น:&#10;• พัฒนาและดูแล Web Application&#10;• ทำงานร่วมกับทีม UX/UI&#10;• Code Review และ Mentoring&#10;• จัดการโปรเจคด้วย Agile Methodology">${experience?.description || ''}</textarea>
                                    <div class="form-text">
                                        <i class="bi bi-lightbulb text-warning me-1"></i>
                                        <strong>เคล็ดลับ:</strong> ใช้จุด • หรือ - เพื่อแสดงรายละเอียดเป็นข้อๆ แต่ละบรรทัด
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>ยกเลิก
                        </button>
                        <button type="submit" form="experienceForm" class="btn btn-primary">
                            <i class="bi bi-check-circle me-2"></i>${isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มประสบการณ์'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    $('#experienceModal').remove();
    
    // Add modal to body
    $('body').append(modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('experienceModal'));
    modal.show();
    
    // Handle current job checkbox
    $('#expCurrent').on('change', function() {
        $('#expEndDate').prop('disabled', this.checked);
        if (this.checked) {
            $('#expEndDate').val('');
        }
    });
    
    // Form submit handler
    $('#experienceForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            id: experience?.id || Date.now(),
            position: $('#expPosition').val(),
            company: $('#expCompany').val(),
            startDate: $('#expStartDate').val(),
            endDate: $('#expCurrent').is(':checked') ? '' : $('#expEndDate').val(),
            current: $('#expCurrent').is(':checked'),
            description: $('#expDescription').val()
        };
        
        console.log('Experience Data:', formData);
        
        // Show success notification
        showNotification(
            isEdit ? 'แก้ไขประสบการณ์สำเร็จ!' : 'เพิ่มประสบการณ์สำเร็จ!', 
            'success'
        );
        
        // Close modal
        modal.hide();
        
        // In production, send to API and reload experience list
        setTimeout(() => {
            // Reload profile page
            window.location.href = 'dashboard.html?view=profile';
        }, 1000);
    });
}

function removeExperience(id) { 
    if(confirm('ยืนยันการลบประสบการณ์นี้?')) {
        showNotification('ลบประสบการณ์สำเร็จ', 'success');
        // In production, send to API and reload
        setTimeout(() => {
            window.location.href = 'dashboard.html?view=profile';
        }, 1000);
    }
}
function saveProfile() { alert('Save profile'); }
function changePassword() { alert('Change password'); }
function deleteAccount() { 
    if(confirm('คุณแน่ใจหรือไม่ที่จะลบบัญชี? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
        alert('Delete account'); 
    }
}
function viewApplicant(id) { alert('View applicant ' + id); }
function acceptApplicant(id) { 
    if(confirm('ยืนยันการยอมรับผู้สมัครนี้?')) {
        alert('Accept applicant ' + id); 
    }
}
function rejectApplicant(id) { 
    if(confirm('ยืนยันการปฏิเสธผู้สมัครนี้?')) {
        alert('Reject applicant ' + id); 
    }
}
function editJob(id) { window.location.href = 'post-job.html?edit=' + id; }
function viewJobApplicants(id) { window.location.href = 'dashboard.html?view=applications&job=' + id; }
function closeJob(id) { 
    if(confirm('ยืนยันการปิดรับสมัครงานนี้?')) {
        alert('Close job ' + id); 
    }
}
function deleteJob(id) { 
    if(confirm('ยืนยันการลบประกาศงานนี้?')) {
        alert('Delete job ' + id); 
    }
}
function publishJob(id) { alert('Publish job ' + id); }
function viewResume(id) { alert('View resume ' + id); }
function contactApplicant(id) { alert('Contact applicant ' + id); }
function upgradePackage() { alert('Upgrade package'); }
function buyPackage(type) { alert('Buy package: ' + type); }
function saveCompanyProfile() { alert('Save company profile'); }

// USER: Announcements
function loadUserAnnouncements() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="mb-0 fw-bold"><i class="bi bi-megaphone me-2"></i>ข่าวสารจากระบบ</h5>
            </div>
            <div class="card-body p-0">
                ${generateUserAnnouncementsList()}
            </div>
        </div>
    `);
    
    translatePage();
}

function generateUserAnnouncementsList() {
    // Filter announcements for users (target: 'user' or 'all')
    const announcements = [
        { id: 1, title: 'การปรับปรุงเว็บไซต์', date: '5 มีนาคม 2026', content: 'เริ่มต้นการปรับปรุงเว็บไซต์เพื่อเพิ่มประสิทธิภาพและประสบการณ์การใช้งาน', priority: 'normal', isRead: false },
        { id: 3, title: 'ฟีเจอร์ใหม่สำหรับผู้สมัครงาน', date: '3 มีนาคม 2026', content: 'เพิ่มฟีเจอร์การติดตามประวัติการสมัครงานของผู้ใช้', priority: 'important', isRead: false },
        { id: 5, title: 'การปรับปรุงการแจ้งเตือน', date: '1 มีนาคม 2026', content: 'ปรับปรุงการแจ้งเตือนเพื่อให้ผู้ใช้ได้รับข้อมูลทันท่วงที', priority: 'normal', isRead: true },
    ];
    
    if (announcements.length === 0) {
        return `
            <div class="p-5 text-center text-muted">
                <i class="bi bi-inbox fs-1 d-block mb-3"></i>
                <p>ยังไม่มีข่าวสาร</p>
            </div>
        `;
    }
    
    return `
        <div class="list-group list-group-flush">
            ${announcements.map(ann => {
                const priorityColor = ann.priority === 'urgent' ? 'danger' : ann.priority === 'important' ? 'warning' : 'primary';
                const borderClass = ann.isRead ? 'border-start border-3 border-secondary border-opacity-25' : `border-start border-4 border-${priorityColor}`;
                
                return `
                <a href="announcement-detail.html?id=${ann.id}" class="list-group-item list-group-item-action p-4 ${borderClass}" style="text-decoration: none; transition: all 0.3s ease;">
                    <div class="d-flex align-items-start gap-3">
                        <div class="flex-shrink-0">
                            <div class="rounded-3 bg-${priorityColor} bg-opacity-10 p-3 shadow-sm">
                                <i class="bi bi-megaphone-fill fs-4 text-${priorityColor}"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="mb-0 fw-bold text-dark">
                                    ${ann.title}
                                    ${!ann.isRead ? '<span class="badge bg-danger ms-2 pulse-badge">ใหม่</span>' : ''}
                                    ${ann.priority === 'important' ? '<span class="badge bg-warning text-dark ms-2"><i class="bi bi-exclamation-circle-fill"></i> สำคัญ</span>' : ''}
                                    ${ann.priority === 'urgent' ? '<span class="badge bg-danger ms-2"><i class="bi bi-exclamation-triangle-fill"></i> เร่งด่วน</span>' : ''}
                                </h6>
                                <small class="text-muted ms-2"><i class="bi bi-clock"></i> ${ann.date}</small>
                            </div>
                            <p class="mb-2 text-muted" style="line-height: 1.6;">${ann.content}</p>
                            <small class="text-primary"><i class="bi bi-arrow-right-circle"></i> อ่านเพิ่มเติม</small>
                        </div>
                    </div>
                </a>
            `}).join('')}
        </div>
        <style>
            .pulse-badge {
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            .list-group-item-action:hover {
                transform: translateX(5px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
            }
        </style>
    `;
}

function viewAnnouncementUser(id) {
    window.location.href = `announcement-detail.html?id=${id}`;
}

function viewUser(id) { alert('View user ' + id); }
function suspendUser(id) { 
    if(confirm('ยืนยันการระงับผู้ใช้นี้?')) {
        alert('Suspend user ' + id); 
    }
}
function deleteUser(id) { 
    if(confirm('ยืนยันการลบผู้ใช้นี้?')) {
        alert('Delete user ' + id); 
    }
}
function activateUser(id) { alert('Activate user ' + id); }
function viewEmployer(id) { alert('View employer ' + id); }
function deleteEmployer(id) { 
    if(confirm('ยืนยันการลบนายจ้างนี้?')) {
        alert('Delete employer ' + id); 
    }
}
function verifyEmployer(id) { 
    if(confirm('ยืนยันการอนุมัตินายจ้างนี้?')) {
        alert('Verify employer ' + id); 
    }
}
function viewJob(id) { window.location.href = 'job-detail.html?id=' + id; }
function approveJob(id) { 
    if(confirm('ยืนยันการอนุมัติประกาศงานนี้?')) {
        alert('Approve job ' + id); 
    }
}
