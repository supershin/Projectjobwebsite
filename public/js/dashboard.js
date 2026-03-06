// ========================================
// Dashboard JavaScript
// ========================================

let currentUser = null;
let currentView = 'overview';

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
            <a class="nav-link ${currentView === 'profile' ? 'active' : ''}" href="dashboard.html?view=profile">
                <i class="bi bi-person"></i> <span data-i18n="dashboard.profile">โปรไฟล์</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'settings' ? 'active' : ''}" href="dashboard.html?view=settings">
                <i class="bi bi-gear"></i> <span data-i18n="dashboard.settings">ตั้งค่า</span>
            </a>
        </li>
        <li class="nav-item">
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

function loadUserOverview() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-primary bg-opacity-10 text-primary me-3">
                            <i class="bi bi-file-earmark-text"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">12</h4>
                            <small class="text-muted" data-i18n="dashboard.user.total-applications">ใบสมัครทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-success bg-opacity-10 text-success me-3">
                            <i class="bi bi-check-circle"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">3</h4>
                            <small class="text-muted" data-i18n="dashboard.user.accepted">ได้รับการตอบรับ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-warning bg-opacity-10 text-warning me-3">
                            <i class="bi bi-clock"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">6</h4>
                            <small class="text-muted" data-i18n="dashboard.user.pending">รอการตอบกลับ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-info bg-opacity-10 text-info me-3">
                            <i class="bi bi-bookmark"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">8</h4>
                            <small class="text-muted" data-i18n="dashboard.user.saved">งานที่บันทึก</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.user.recent-applications">ใบสมัครล่าสุด</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th data-i18n="dashboard.position">ตำแหน่ง</th>
                                        <th data-i18n="dashboard.company">บริษัท</th>
                                        <th data-i18n="dashboard.applied-date">วันที่สมัคร</th>
                                        <th data-i18n="dashboard.status">สถานะ</th>
                                        <th data-i18n="dashboard.actions">การดำเนินการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Frontend Developer</strong></td>
                                        <td>Tech Startup Co.</td>
                                        <td>1 มี.ค. 2026</td>
                                        <td><span class="badge bg-warning" data-i18n="dashboard.status.pending">รอการตอบกลับ</span></td>
                                        <td><a href="#" class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view-details">ดูรายละเอียด</a></td>
                                    </tr>
                                    <tr>
                                        <td><strong>UX/UI Designer</strong></td>
                                        <td>Creative Agency</td>
                                        <td>28 ก.พ. 2026</td>
                                        <td><span class="badge bg-success" data-i18n="dashboard.status.accepted">ได้รับการตอบรับ</span></td>
                                        <td><a href="#" class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view-details">ดูรายละเอียด</a></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Backend Developer</strong></td>
                                        <td>Tech Innovation Ltd.</td>
                                        <td>25 ก.พ. 2026</td>
                                        <td><span class="badge bg-secondary" data-i18n="dashboard.status.reviewing">กำลังตรวจสอบ</span></td>
                                        <td><a href="#" class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view-details">ดูรายละเอียด</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function loadUserApplications() {
    $('#dashboardContent').html(`
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.user.my-applications">ใบสมัครของฉัน</h5>
                <div>
                    <select class="form-select form-select-sm" id="filterStatus">
                        <option value="all" data-i18n="dashboard.filter.all">ทั้งหมด</option>
                        <option value="pending" data-i18n="dashboard.status.pending">รอการตอบกลับ</option>
                        <option value="reviewing" data-i18n="dashboard.status.reviewing">กำลังตรวจสอบ</option>
                        <option value="accepted" data-i18n="dashboard.status.accepted">ได้รับการตอบรับ</option>
                        <option value="rejected" data-i18n="dashboard.status.rejected">ไม่ผ่านการพิจารณา</option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th data-i18n="dashboard.position">ตำแหน่ง</th>
                                <th data-i18n="dashboard.company">บริษัท</th>
                                <th data-i18n="dashboard.applied-date">วันที่สมัคร</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateApplicationsRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function generateApplicationsRows() {
    const applications = [
        { position: 'Frontend Developer', company: 'Tech Startup Co.', date: '1 มี.ค. 2026', status: 'pending' },
        { position: 'UX/UI Designer', company: 'Creative Agency', date: '28 ก.พ. 2026', status: 'accepted' },
        { position: 'Backend Developer', company: 'Tech Innovation Ltd.', date: '25 ก.พ. 2026', status: 'reviewing' },
        { position: 'Full Stack Developer', company: 'Digital Solutions Inc.', date: '20 ก.พ. 2026', status: 'rejected' },
        { position: 'Mobile Developer', company: 'App Studio', date: '15 ก.พ. 2026', status: 'pending' },
    ];
    
    return applications.map(app => {
        const statusClass = app.status === 'accepted' ? 'success' : 
                           app.status === 'rejected' ? 'danger' :
                           app.status === 'reviewing' ? 'secondary' : 'warning';
        return `
            <tr>
                <td><strong>${app.position}</strong></td>
                <td>${app.company}</td>
                <td>${app.date}</td>
                <td><span class="badge bg-${statusClass}" data-i18n="dashboard.status.${app.status}">${app.status}</span></td>
                <td>
                    <a href="#" class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view-details">ดูรายละเอียด</a>
                    <button class="btn btn-sm btn-outline-danger" data-i18n="dashboard.withdraw">ยกเลิก</button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadUserSavedJobs() {
    $('#dashboardContent').html(`
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.user.saved-jobs">งานที่บันทึก</h5>
            </div>
            <div class="card-body">
                <div class="row g-3">
                    ${generateSavedJobsCards()}
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function generateSavedJobsCards() {
    const savedJobs = [
        { title: 'Senior Frontend Developer', company: 'Tech Giants', location: 'Bangkok', salary: '80,000 - 120,000', type: 'Full-time' },
        { title: 'Product Designer', company: 'Creative Studio', location: 'Remote', salary: '60,000 - 90,000', type: 'Full-time' },
        { title: 'DevOps Engineer', company: 'Cloud Services Ltd.', location: 'Bangkok', salary: '90,000 - 130,000', type: 'Full-time' },
        { title: 'Data Scientist', company: 'AI Innovations', location: 'Bangkok', salary: '100,000 - 150,000', type: 'Full-time' },
    ];
    
    return savedJobs.map(job => `
        <div class="col-md-6">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title mb-0">${job.title}</h5>
                        <button class="btn btn-sm btn-outline-danger">
                            <i class="bi bi-bookmark-fill"></i>
                        </button>
                    </div>
                    <h6 class="text-muted mb-3">${job.company}</h6>
                    <p class="mb-2"><i class="bi bi-geo-alt text-primary"></i> ${job.location}</p>
                    <p class="mb-2"><i class="bi bi-currency-dollar text-success"></i> ${job.salary} <span data-i18n="jobs.salary.thb">บาท</span></p>
                    <p class="mb-3"><span class="badge bg-primary">${job.type}</span></p>
                    <div class="d-flex gap-2">
                        <a href="job-detail.html" class="btn btn-primary btn-sm flex-grow-1" data-i18n="jobs.apply">สมัครเลย</a>
                        <a href="job-detail.html" class="btn btn-outline-secondary btn-sm" data-i18n="dashboard.view-details">ดูรายละเอียด</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadUserProfile() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body text-center">
                        <img src="${currentUser.avatar}" alt="avatar" class="rounded-circle img-fluid mb-3" style="width: 150px;">
                        <h5 class="mb-2">${currentUser.name}</h5>
                        <p class="text-muted mb-4">${currentUser.email}</p>
                        <div class="d-flex justify-content-center gap-2">
                            <button class="btn btn-primary btn-sm" data-i18n="dashboard.edit-profile">แก้ไขโปรไฟล์</button>
                            <button class="btn btn-outline-secondary btn-sm" data-i18n="dashboard.upload-resume">อัพโหลด Resume</button>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0" data-i18n="dashboard.profile.skills">ทักษะ</h5>
                    </div>
                    <div class="card-body">
                        <span class="badge bg-primary me-2 mb-2">React</span>
                        <span class="badge bg-primary me-2 mb-2">Vue.js</span>
                        <span class="badge bg-primary me-2 mb-2">TypeScript</span>
                        <span class="badge bg-primary me-2 mb-2">Node.js</span>
                        <span class="badge bg-primary me-2 mb-2">Python</span>
                        <button class="btn btn-sm btn-outline-primary mt-2" data-i18n="dashboard.edit-skills">แก้ไขทักษะ</button>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0" data-i18n="dashboard.profile.personal-info">ข้อมูลส่วนตัว</h5>
                    </div>
                    <div class="card-body">
                        <form id="profileForm">
                            <div class="row mb-3">
                                <label class="col-sm-3 col-form-label" data-i18n="dashboard.profile.full-name">ชื่อ-นามสกุล</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" value="${currentUser.name}">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-3 col-form-label" data-i18n="login.email">อีเมล</label>
                                <div class="col-sm-9">
                                    <input type="email" class="form-control" value="${currentUser.email}">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-3 col-form-label" data-i18n="register.phone">เบอร์โทรศัพท์</label>
                                <div class="col-sm-9">
                                    <input type="tel" class="form-control" value="081-234-5678">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-3 col-form-label" data-i18n="dashboard.profile.birth-date">วันเกิด</label>
                                <div class="col-sm-9">
                                    <input type="date" class="form-control" value="1995-01-15">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-3 col-form-label" data-i18n="jobs.location">สถานที่</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" value="กรุงเทพมหานคร">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-3">
                                    <button type="submit" class="btn btn-primary" data-i18n="dashboard.save-changes">บันทึกการเปลี่ยนแปลง</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0" data-i18n="dashboard.profile.experience">ประสบการณ์</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3 pb-3 border-bottom">
                            <h6 class="fw-bold">Frontend Developer</h6>
                            <p class="text-muted mb-1">ABC Company • 2022 - Present</p>
                            <p>Developing and maintaining web applications using React and Vue.js</p>
                        </div>
                        <div class="mb-3">
                            <h6 class="fw-bold">Junior Developer</h6>
                            <p class="text-muted mb-1">XYZ Studio • 2020 - 2022</p>
                            <p>Built responsive websites and learned modern web technologies</p>
                        </div>
                        <button class="btn btn-outline-primary btn-sm" data-i18n="dashboard.add-experience">เพิ่มประสบการณ์</button>
                    </div>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function loadUserSettings() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0" data-i18n="dashboard.settings.account">การตั้งค่าบัญชี</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="login.email">อีเมล</label>
                                <input type="email" class="form-control" value="${currentUser.email}" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.settings.change-password">เปลี่ยนรหัสผ่าน</label>
                                <button type="button" class="btn btn-outline-primary d-block" data-i18n="dashboard.settings.change-password">เปลี่ยนรหัสผ่าน</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0" data-i18n="dashboard.settings.notifications">การแจ้งเตือน</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="emailNotif" checked>
                            <label class="form-check-label" for="emailNotif" data-i18n="dashboard.settings.email-notif">แจ้งเตือนทางอีเมล</label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="jobAlerts" checked>
                            <label class="form-check-label" for="jobAlerts" data-i18n="dashboard.settings.job-alerts">แจ้งเตือนงานใหม่</label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="applicationUpdates" checked>
                            <label class="form-check-label" for="applicationUpdates" data-i18n="dashboard.settings.app-updates">แจ้งเตือนสถานะใบสมัคร</label>
                        </div>
                        <button class="btn btn-primary" data-i18n="dashboard.save-changes">บันทึกการเปลี่ยนแปลง</button>
                    </div>
                </div>
                
                <div class="card border-danger">
                    <div class="card-header bg-danger bg-opacity-10">
                        <h5 class="mb-0 text-danger" data-i18n="dashboard.settings.danger-zone">โซนอันตราย</h5>
                    </div>
                    <div class="card-body">
                        <p class="text-muted" data-i18n="dashboard.settings.delete-warning">การลบบัญชีจะไม่สามารถกู้คืนได้</p>
                        <button class="btn btn-outline-danger" data-i18n="dashboard.settings.delete-account">ลบบัญชี</button>
                    </div>
                </div>
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
                <i class="bi bi-file-earmark-text"></i> <span data-i18n="dashboard.employer.applications">ใบสมัครทั้งหมด</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'payments' ? 'active' : ''}" href="dashboard.html?view=payments">
                <i class="bi bi-credit-card"></i> <span data-i18n="dashboard.employer.payments">การชำระเงิน</span>
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
        <li class="nav-item">
            <a class="nav-link" href="post-job.html">
                <i class="bi bi-plus-circle"></i> <span data-i18n="dashboard.employer.post-new-job">ประกาศงานใหม่</span>
            </a>
        </li>
    `);
    
    translatePage();
    
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

function loadEmployerOverview() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-primary bg-opacity-10 text-primary me-3">
                            <i class="bi bi-briefcase"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">8</h4>
                            <small class="text-muted" data-i18n="dashboard.employer.active-jobs">งานที่เปิดรับ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-success bg-opacity-10 text-success me-3">
                            <i class="bi bi-people"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">145</h4>
                            <small class="text-muted" data-i18n="dashboard.employer.total-applicants">ผู้สมัครทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-warning bg-opacity-10 text-warning me-3">
                            <i class="bi bi-clock"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">32</h4>
                            <small class="text-muted" data-i18n="dashboard.employer.pending-review">รอการตรวจสอบ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-info bg-opacity-10 text-info me-3">
                            <i class="bi bi-eye"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">2,450</h4>
                            <small class="text-muted" data-i18n="dashboard.employer.total-views">จำนวนการดู</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.your-jobs">งานของคุณ</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th data-i18n="dashboard.position">ตำแหน่ง</th>
                                        <th data-i18n="dashboard.employer.applicants">ผู้สมัคร</th>
                                        <th data-i18n="dashboard.employer.views">ครั้งที่ดู</th>
                                        <th data-i18n="dashboard.status">สถานะ</th>
                                        <th data-i18n="dashboard.actions">การดำเนินการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Frontend Developer</strong></td>
                                        <td>15</td>
                                        <td>342</td>
                                        <td><span class="badge bg-success" data-i18n="dashboard.status.active">เปิดรับสมัคร</span></td>
                                        <td>
                                            <a href="dashboard.html?view=applications&job=1" class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view">ดู</a>
                                            <a href="post-job.html?edit=1" class="btn btn-sm btn-outline-secondary" data-i18n="dashboard.edit">แก้ไข</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Backend Developer</strong></td>
                                        <td>23</td>
                                        <td>456</td>
                                        <td><span class="badge bg-success" data-i18n="dashboard.status.active">เปิดรับสมัคร</span></td>
                                        <td>
                                            <a href="dashboard.html?view=applications&job=2" class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view">ดู</a>
                                            <a href="post-job.html?edit=2" class="btn btn-sm btn-outline-secondary" data-i18n="dashboard.edit">แก้ไข</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>UX/UI Designer</strong></td>
                                        <td>18</td>
                                        <td>298</td>
                                        <td><span class="badge bg-warning" data-i18n="dashboard.status.closed">ปิดรับแล้ว</span></td>
                                        <td>
                                            <a href="dashboard.html?view=applications&job=3" class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view">ดู</a>
                                            <button class="btn btn-sm btn-outline-danger" data-i18n="dashboard.delete">ลบ</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.monthly-stats">สถิติรายเดือน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="monthlyChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
    createMonthlyChart();
}

function loadEmployerJobs() {
    $('#dashboardContent').html(`
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.my-jobs">งานของฉัน</h5>
                <a href="post-job.html" class="btn btn-primary btn-sm">
                    <i class="bi bi-plus-circle"></i> <span data-i18n="dashboard.employer.post-new-job">ประกาศงานใหม่</span>
                </a>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th data-i18n="dashboard.position">ตำแหน่ง</th>
                                <th data-i18n="dashboard.employer.applicants">ผู้สมัคร</th>
                                <th data-i18n="dashboard.employer.views">ครั้งที่ดู</th>
                                <th data-i18n="dashboard.posted-date">วันที่ประกาศ</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateEmployerJobsRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function generateEmployerJobsRows() {
    const jobs = [
        { title: 'Frontend Developer', applicants: 15, views: 342, date: '1 มี.ค. 2026', status: 'active' },
        { title: 'Backend Developer', applicants: 23, views: 456, date: '28 ก.พ. 2026', status: 'active' },
        { title: 'UX/UI Designer', applicants: 18, views: 298, date: '25 ก.พ. 2026', status: 'closed' },
        { title: 'Full Stack Developer', applicants: 31, views: 521, date: '20 ก.พ. 2026', status: 'active' },
        { title: 'Mobile Developer', applicants: 12, views: 234, date: '15 ก.พ. 2026', status: 'active' },
        { title: 'DevOps Engineer', applicants: 8, views: 156, date: '10 ก.พ. 2026', status: 'closed' },
    ];
    
    return jobs.map((job, index) => {
        const statusClass = job.status === 'active' ? 'success' : 'warning';
        return `
            <tr>
                <td><strong>${job.title}</strong></td>
                <td>${job.applicants}</td>
                <td>${job.views}</td>
                <td>${job.date}</td>
                <td><span class="badge bg-${statusClass}" data-i18n="dashboard.status.${job.status}">${job.status}</span></td>
                <td>
                    <a href="dashboard.html?view=applications&job=${index + 1}" class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view">ดู</a>
                    <a href="post-job.html?edit=${index + 1}" class="btn btn-sm btn-outline-secondary" data-i18n="dashboard.edit">แก้ไข</a>
                    <button class="btn btn-sm btn-outline-danger" data-i18n="dashboard.delete">ลบ</button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadEmployerApplications() {
    $('#dashboardContent').html(`
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.applications">ใบสมัครทั้งหมด</h5>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <select class="form-select" id="jobFilter">
                        <option value="all" data-i18n="dashboard.filter.all-jobs">งานทั้งหมด</option>
                        <option value="1">Frontend Developer</option>
                        <option value="2">Backend Developer</option>
                        <option value="3">UX/UI Designer</option>
                    </select>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th data-i18n="dashboard.applicant">ผู้สมัคร</th>
                                <th data-i18n="dashboard.position">ตำแหน่ง</th>
                                <th data-i18n="dashboard.applied-date">วันที่สมัคร</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateEmployerApplicationsRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function generateEmployerApplicationsRows() {
    const applications = [
        { name: 'John Doe', position: 'Frontend Developer', date: '1 มี.ค. 2026', status: 'pending' },
        { name: 'Jane Smith', position: 'Frontend Developer', date: '2 มี.ค. 2026', status: 'reviewing' },
        { name: 'Bob Wilson', position: 'Backend Developer', date: '28 ก.พ. 2026', status: 'accepted' },
        { name: 'Alice Brown', position: 'UX/UI Designer', date: '25 ก.พ. 2026', status: 'rejected' },
        { name: 'Charlie Davis', position: 'Backend Developer', date: '27 ก.พ. 2026', status: 'pending' },
    ];
    
    return applications.map(app => {
        const statusClass = app.status === 'accepted' ? 'success' : 
                           app.status === 'rejected' ? 'danger' :
                           app.status === 'reviewing' ? 'secondary' : 'warning';
        return `
            <tr>
                <td><strong>${app.name}</strong></td>
                <td>${app.position}</td>
                <td>${app.date}</td>
                <td><span class="badge bg-${statusClass}" data-i18n="dashboard.status.${app.status}">${app.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view-resume">ดู Resume</button>
                    <button class="btn btn-sm btn-outline-success" data-i18n="dashboard.accept">ยอมรับ</button>
                    <button class="btn btn-sm btn-outline-danger" data-i18n="dashboard.reject">ปฏิเสธ</button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadEmployerPayments() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.payment-history">ประวัติการชำระเงิน</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th data-i18n="dashboard.employer.invoice">เลขที่ใบแจ้งหนี้</th>
                                        <th data-i18n="dashboard.employer.description">รายละเอียด</th>
                                        <th data-i18n="dashboard.employer.amount">จำนวนเงิน</th>
                                        <th data-i18n="dashboard.employer.date">วันที่</th>
                                        <th data-i18n="dashboard.status">สถานะ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${generatePaymentRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.pricing">แพ็คเกจ</h5>
                    </div>
                    <div class="card-body">
                        <h6 class="text-muted" data-i18n="dashboard.employer.current-plan">แพ็คเกจปัจจุบัน</h6>
                        <h4 class="fw-bold">Basic Plan</h4>
                        <p class="text-muted">฿299 / <span data-i18n="dashboard.employer.per-post">ต่อประกาศ</span></p>
                        <ul class="list-unstyled mb-3">
                            <li><i class="bi bi-check-circle text-success"></i> <span data-i18n="dashboard.employer.feature-1">ประกาศงาน 30 วัน</span></li>
                            <li><i class="bi bi-check-circle text-success"></i> <span data-i18n="dashboard.employer.feature-2">ดู Resume ผู้สมัคร</span></li>
                            <li><i class="bi bi-check-circle text-success"></i> <span data-i18n="dashboard.employer.feature-3">สถิติการดู</span></li>
                        </ul>
                        <button class="btn btn-primary w-100" data-i18n="dashboard.employer.upgrade">อัพเกรดแพ็คเกจ</button>
                    </div>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function generatePaymentRows() {
    const payments = [
        { invoice: 'INV-001', description: 'Frontend Developer Post', amount: '299', date: '1 มี.ค. 2026', status: 'paid' },
        { invoice: 'INV-002', description: 'Backend Developer Post', amount: '299', date: '28 ก.พ. 2026', status: 'paid' },
        { invoice: 'INV-003', description: 'UX/UI Designer Post', amount: '299', date: '25 ก.พ. 2026', status: 'paid' },
        { invoice: 'INV-004', description: 'Full Stack Developer Post', amount: '299', date: '20 ก.พ. 2026', status: 'pending' },
    ];
    
    return payments.map(payment => {
        const statusClass = payment.status === 'paid' ? 'success' : 'warning';
        return `
            <tr>
                <td><strong>${payment.invoice}</strong></td>
                <td>${payment.description}</td>
                <td>฿${payment.amount}</td>
                <td>${payment.date}</td>
                <td><span class="badge bg-${statusClass}" data-i18n="dashboard.status.${payment.status}">${payment.status}</span></td>
            </tr>
        `;
    }).join('');
}

function loadEmployerProfile() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body text-center">
                        <img src="https://ui-avatars.com/api/?name=Company&background=6366f1" alt="company" class="rounded img-fluid mb-3" style="width: 150px;">
                        <h5 class="mb-2">Tech Startup Co.</h5>
                        <p class="text-muted mb-4" data-i18n="dashboard.employer.verified">บริษัทที่ได้รับการยืนยัน</p>
                        <button class="btn btn-primary btn-sm" data-i18n="dashboard.employer.update-logo">อัพเดทโลโก้</button>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.employer.company-info">ข้อมูลบริษัท</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.employer.company-name">ชื่อบริษัท</label>
                                <input type="text" class="form-control" value="Tech Startup Co.">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.employer.industry">อุตสาหกรรม</label>
                                <select class="form-select">
                                    <option>Technology</option>
                                    <option>Finance</option>
                                    <option>Healthcare</option>
                                    <option>Education</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.employer.company-size">ขนาดบริษัท</label>
                                <select class="form-select">
                                    <option>1-10 employees</option>
                                    <option>11-50 employees</option>
                                    <option>51-200 employees</option>
                                    <option>201-500 employees</option>
                                    <option>500+ employees</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.employer.website">เว็บไซต์</label>
                                <input type="url" class="form-control" value="https://techstartup.com">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="jobs.location">ที่อยู่</label>
                                <textarea class="form-control" rows="3">123 Technology Road, Bangkok 10110</textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.employer.description">รายละเอียดบริษัท</label>
                                <textarea class="form-control" rows="4">We are a leading technology startup focused on innovative solutions.</textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" data-i18n="dashboard.save-changes">บันทึกการเปลี่ยนแปลง</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function loadEmployerSettings() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0" data-i18n="dashboard.settings.account">การตั้งค่าบัญชี</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="login.email">อีเมล</label>
                                <input type="email" class="form-control" value="${currentUser.email}" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.settings.change-password">เปลี่ยนรหัสผ่าน</label>
                                <button type="button" class="btn btn-outline-primary d-block" data-i18n="dashboard.settings.change-password">เปลี่ยนรหัสผ่าน</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0" data-i18n="dashboard.settings.notifications">การแจ้งเตือน</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="newApplications" checked>
                            <label class="form-check-label" for="newApplications" data-i18n="dashboard.employer.notif-new-app">แจ้งเตือนเมื่อมีผู้สมัครใหม่</label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="jobExpiring" checked>
                            <label class="form-check-label" for="jobExpiring" data-i18n="dashboard.employer.notif-expiring">แจ้งเตือนเมื่อประกาศใกล้หมดอายุ</label>
                        </div>
                        <button class="btn btn-primary" data-i18n="dashboard.save-changes">บันทึกการเปลี่ยนแปลง</button>
                    </div>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

// ========================================
// ADMIN DASHBOARD
// ========================================
function loadAdminDashboard() {
    $('#dashboardTitle').attr('data-i18n', 'dashboard.admin.title').text('Dashboard - ผู้ดูแลระบบ');
    
    $('#dashboardMenu').html(`
        <li class="nav-item">
            <a class="nav-link ${currentView === 'overview' ? 'active' : ''}" href="dashboard.html?view=overview">
                <i class="bi bi-speedometer2"></i> <span data-i18n="dashboard.overview">ภาพรวม</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'users' ? 'active' : ''}" href="dashboard.html?view=users">
                <i class="bi bi-people"></i> <span data-i18n="dashboard.admin.manage-users">จัดการผู้ใช้</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'employers' ? 'active' : ''}" href="dashboard.html?view=employers">
                <i class="bi bi-building"></i> <span data-i18n="dashboard.admin.manage-employers">จัดการนายจ้าง</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'jobs' ? 'active' : ''}" href="dashboard.html?view=jobs">
                <i class="bi bi-briefcase"></i> <span data-i18n="dashboard.admin.manage-jobs">จัดการงาน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'payments' ? 'active' : ''}" href="dashboard.html?view=payments">
                <i class="bi bi-credit-card"></i> <span data-i18n="dashboard.admin.payments">การชำระเงิน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'reports' ? 'active' : ''}" href="dashboard.html?view=reports">
                <i class="bi bi-graph-up"></i> <span data-i18n="dashboard.admin.reports">รายงาน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'settings' ? 'active' : ''}" href="dashboard.html?view=settings">
                <i class="bi bi-gear"></i> <span data-i18n="dashboard.admin.system-settings">ตั้งค่าระบบ</span>
            </a>
        </li>
    `);
    
    translatePage();
    
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

function loadAdminOverview() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-primary bg-opacity-10 text-primary me-3">
                            <i class="bi bi-people"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">1,250</h4>
                            <small class="text-muted" data-i18n="dashboard.admin.total-users">ผู้ใช้ทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-success bg-opacity-10 text-success me-3">
                            <i class="bi bi-briefcase"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">340</h4>
                            <small class="text-muted" data-i18n="dashboard.admin.total-jobs">งานทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-warning bg-opacity-10 text-warning me-3">
                            <i class="bi bi-currency-dollar"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">101,660</h4>
                            <small class="text-muted" data-i18n="dashboard.admin.revenue">รายได้ (บาท)</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-info bg-opacity-10 text-info me-3">
                            <i class="bi bi-building"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">120</h4>
                            <small class="text-muted" data-i18n="dashboard.admin.total-employers">นายจ้าง</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.monthly-stats">สถิติรายเดือน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="adminChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.recent-activity">กิจกรรมล่าสุด</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mb-0">
                            <li class="mb-3">
                                <small class="text-muted">5 <span data-i18n="dashboard.admin.minutes-ago">นาทีที่แล้ว</span></small>
                                <p class="mb-0" data-i18n="dashboard.admin.activity-new-user">ผู้ใช้ใหม่ลงทะเบียน</p>
                            </li>
                            <li class="mb-3">
                                <small class="text-muted">15 <span data-i18n="dashboard.admin.minutes-ago">นาทีที่แล้ว</span></small>
                                <p class="mb-0" data-i18n="dashboard.admin.activity-new-job">ประกาศงานใหม่</p>
                            </li>
                            <li class="mb-3">
                                <small class="text-muted">1 <span data-i18n="dashboard.admin.hours-ago">ชั่วโมงที่แล้ว</span></small>
                                <p class="mb-0" data-i18n="dashboard.admin.activity-payment">การชำระเงินสำเร็จ</p>
                            </li>
                            <li class="mb-3">
                                <small class="text-muted">2 <span data-i18n="dashboard.admin.hours-ago">ชั่วโมงที่แล้ว</span></small>
                                <p class="mb-0" data-i18n="dashboard.admin.activity-new-employer">นายจ้างใหม่ลงทะเบียน</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
    createAdminChart();
}

function loadAdminUsers() {
    $('#dashboardContent').html(`
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.manage-users">จัดการผู้ใช้</h5>
                <div>
                    <input type="text" class="form-control form-control-sm" placeholder="ค้นหา..." data-i18n-placeholder="dashboard.search">
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th data-i18n="dashboard.admin.name">ชื่อ</th>
                                <th data-i18n="login.email">อีเมล</th>
                                <th data-i18n="dashboard.admin.registered-date">วันที่สมัคร</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminUsersRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function generateAdminUsersRows() {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', date: '1 มี.ค. 2026', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '28 ก.พ. 2026', status: 'active' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', date: '25 ก.พ. 2026', status: 'suspended' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', date: '20 ก.พ. 2026', status: 'active' },
        { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', date: '15 ก.พ. 2026', status: 'active' },
    ];
    
    return users.map(user => {
        const statusClass = user.status === 'active' ? 'success' : 'warning';
        return `
            <tr>
                <td>${user.id}</td>
                <td><strong>${user.name}</strong></td>
                <td>${user.email}</td>
                <td>${user.date}</td>
                <td><span class="badge bg-${statusClass}" data-i18n="dashboard.status.${user.status}">${user.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view">ดู</button>
                    <button class="btn btn-sm btn-outline-warning" data-i18n="dashboard.admin.suspend">ระงับ</button>
                    <button class="btn btn-sm btn-outline-danger" data-i18n="dashboard.delete">ลบ</button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadAdminEmployers() {
    $('#dashboardContent').html(`
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.manage-employers">จัดการนายจ้าง</h5>
                <div>
                    <input type="text" class="form-control form-control-sm" placeholder="ค้นหา..." data-i18n-placeholder="dashboard.search">
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th data-i18n="dashboard.employer.company-name">ชื่อบริษัท</th>
                                <th data-i18n="login.email">อีเมล</th>
                                <th data-i18n="dashboard.admin.active-jobs">งานที่เปิดรับ</th>
                                <th data-i18n="dashboard.admin.registered-date">วันที่สมัคร</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminEmployersRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function generateAdminEmployersRows() {
    const employers = [
        { id: 1, company: 'Tech Startup Co.', email: 'hr@techstartup.com', jobs: 8, date: '1 มี.ค. 2026', status: 'verified' },
        { id: 2, company: 'Creative Agency', email: 'jobs@creative.com', jobs: 5, date: '28 ก.พ. 2026', status: 'verified' },
        { id: 3, company: 'Digital Solutions', email: 'hr@digital.com', jobs: 12, date: '25 ก.พ. 2026', status: 'pending' },
        { id: 4, company: 'App Studio', email: 'jobs@appstudio.com', jobs: 3, date: '20 ก.พ. 2026', status: 'verified' },
    ];
    
    return employers.map(emp => {
        const statusClass = emp.status === 'verified' ? 'success' : 'warning';
        return `
            <tr>
                <td>${emp.id}</td>
                <td><strong>${emp.company}</strong></td>
                <td>${emp.email}</td>
                <td>${emp.jobs}</td>
                <td>${emp.date}</td>
                <td><span class="badge bg-${statusClass}" data-i18n="dashboard.status.${emp.status}">${emp.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view">ดู</button>
                    <button class="btn btn-sm btn-outline-success" data-i18n="dashboard.admin.verify">ยืนยัน</button>
                    <button class="btn btn-sm btn-outline-danger" data-i18n="dashboard.delete">ลบ</button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadAdminJobs() {
    $('#dashboardContent').html(`
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.manage-jobs">จัดการงาน</h5>
                <div>
                    <select class="form-select form-select-sm">
                        <option value="all" data-i18n="dashboard.filter.all">ทั้งหมด</option>
                        <option value="active" data-i18n="dashboard.status.active">เปิดรับสมัคร</option>
                        <option value="closed" data-i18n="dashboard.status.closed">ปิดรับแล้ว</option>
                        <option value="pending" data-i18n="dashboard.status.pending">รออนุมัติ</option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th data-i18n="dashboard.position">ตำแหน่ง</th>
                                <th data-i18n="dashboard.company">บริษัท</th>
                                <th data-i18n="dashboard.employer.applicants">ผู้สมัคร</th>
                                <th data-i18n="dashboard.posted-date">วันที่ประกาศ</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                                <th data-i18n="dashboard.actions">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminJobsRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function generateAdminJobsRows() {
    const jobs = [
        { id: 1, title: 'Frontend Developer', company: 'Tech Startup Co.', applicants: 15, date: '1 มี.ค. 2026', status: 'active' },
        { id: 2, title: 'Backend Developer', company: 'Tech Startup Co.', applicants: 23, date: '28 ก.พ. 2026', status: 'active' },
        { id: 3, title: 'UX/UI Designer', company: 'Creative Agency', applicants: 18, date: '25 ก.พ. 2026', status: 'closed' },
        { id: 4, title: 'Full Stack Developer', company: 'Digital Solutions', applicants: 31, date: '20 ก.พ. 2026', status: 'pending' },
    ];
    
    return jobs.map(job => {
        const statusClass = job.status === 'active' ? 'success' : 
                           job.status === 'closed' ? 'secondary' : 'warning';
        return `
            <tr>
                <td>${job.id}</td>
                <td><strong>${job.title}</strong></td>
                <td>${job.company}</td>
                <td>${job.applicants}</td>
                <td>${job.date}</td>
                <td><span class="badge bg-${statusClass}" data-i18n="dashboard.status.${job.status}">${job.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" data-i18n="dashboard.view">ดู</button>
                    <button class="btn btn-sm btn-outline-success" data-i18n="dashboard.admin.approve">อนุมัติ</button>
                    <button class="btn btn-sm btn-outline-danger" data-i18n="dashboard.delete">ลบ</button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadAdminPayments() {
    $('#dashboardContent').html(`
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.payment-transactions">รายการชำระเงิน</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th data-i18n="dashboard.employer.invoice">เลขที่ใบแจ้งหนี้</th>
                                <th data-i18n="dashboard.company">บริษัท</th>
                                <th data-i18n="dashboard.employer.description">รายละเอียด</th>
                                <th data-i18n="dashboard.employer.amount">จำนวนเงิน</th>
                                <th data-i18n="dashboard.employer.date">วันที่</th>
                                <th data-i18n="dashboard.status">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminPaymentsRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

function generateAdminPaymentsRows() {
    const payments = [
        { invoice: 'INV-001', company: 'Tech Startup Co.', description: 'Frontend Developer Post', amount: '299', date: '1 มี.ค. 2026', status: 'paid' },
        { invoice: 'INV-002', company: 'Tech Startup Co.', description: 'Backend Developer Post', amount: '299', date: '28 ก.พ. 2026', status: 'paid' },
        { invoice: 'INV-003', company: 'Creative Agency', description: 'UX/UI Designer Post', amount: '299', date: '25 ก.พ. 2026', status: 'paid' },
        { invoice: 'INV-004', company: 'Digital Solutions', description: 'Full Stack Developer Post', amount: '299', date: '20 ก.พ. 2026', status: 'pending' },
    ];
    
    return payments.map(payment => {
        const statusClass = payment.status === 'paid' ? 'success' : 'warning';
        return `
            <tr>
                <td><strong>${payment.invoice}</strong></td>
                <td>${payment.company}</td>
                <td>${payment.description}</td>
                <td>฿${payment.amount}</td>
                <td>${payment.date}</td>
                <td><span class="badge bg-${statusClass}" data-i18n="dashboard.status.${payment.status}">${payment.status}</span></td>
            </tr>
        `;
    }).join('');
}

function loadAdminReports() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-12">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.revenue-report">รายงานรายได้</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.user-growth">การเติบโตของผู้ใช้</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="userGrowthChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.job-stats">สถิติงาน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="jobStatsChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
    createRevenueChart();
    createUserGrowthChart();
    createJobStatsChart();
}

function loadAdminSettings() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.admin.system-settings">ตั้งค่าระบบ</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.admin.site-name">ชื่อเว็บไซต์</label>
                                <input type="text" class="form-control" value="JobHub">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.admin.site-email">อีเมลติดต่อ</label>
                                <input type="email" class="form-control" value="contact@jobhub.com">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.admin.job-post-price">ราคาประกาศงาน (บาท)</label>
                                <input type="number" class="form-control" value="299">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="dashboard.admin.job-duration">ระยะเวลาประกาศ (วัน)</label>
                                <input type="number" class="form-control" value="30">
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="maintenanceMode">
                                    <label class="form-check-label" for="maintenanceMode" data-i18n="dashboard.admin.maintenance-mode">โหมดปิดปรับปรุง</label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" data-i18n="dashboard.save-changes">บันทึกการเปลี่ยนแปลง</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `);
    translatePage();
}

// ========================================
// Chart Functions
// ========================================
function createMonthlyChart() {
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
            datasets: [{
                label: 'ผู้สมัคร',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function createAdminChart() {
    const ctx = document.getElementById('adminChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
            datasets: [{
                label: 'งานใหม่',
                data: [45, 52, 48, 60, 55, 68],
                backgroundColor: 'rgba(99, 102, 241, 0.8)'
            }, {
                label: 'ผู้ใช้ใหม่',
                data: [120, 150, 140, 180, 165, 200],
                backgroundColor: 'rgba(16, 185, 129, 0.8)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function createRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
            datasets: [{
                label: 'รายได้ (บาท)',
                data: [13455, 15568, 14343, 17940, 16445, 20298],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function createUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
            datasets: [{
                label: 'ผู้ใช้',
                data: [850, 920, 1000, 1100, 1180, 1250],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true
        }
    });
}

function createJobStatsChart() {
    const ctx = document.getElementById('jobStatsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['เปิดรับสมัคร', 'ปิดรับแล้ว', 'รออนุมัติ'],
            datasets: [{
                data: [250, 70, 20],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(107, 114, 128, 0.8)',
                    'rgba(251, 191, 36, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}
