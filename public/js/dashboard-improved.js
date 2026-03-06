// ========================================
// Dashboard JavaScript - Improved Version
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

// Toggle sidebar for mobile
function toggleSidebar() {
    $('.sidebar').toggleClass('show');
    $('.sidebar-overlay').toggleClass('show');
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
    
    // Create mobile sidebar overlay
    if (!$('.sidebar-overlay').length) {
        $('body').append('<div class="sidebar-overlay" onclick="toggleSidebar()"></div>');
    }
    
    // Add mobile menu toggle button
    if (!$('.mobile-menu-toggle').length) {
        $('.navbar .container-fluid').prepend(`
            <button class="btn btn-link mobile-menu-toggle d-md-none me-2" onclick="toggleSidebar()">
                <i class="bi bi-list fs-3 text-white"></i>
            </button>
        `);
    }
    
    // Load dashboard based on role
    loadDashboard();
    
    // Setup logout button
    $('#logoutBtn').on('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Close sidebar when clicking menu on mobile
    $(document).on('click', '.sidebar .nav-link', function() {
        if ($(window).width() < 768) {
            toggleSidebar();
        }
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
// USER DASHBOARD - IMPROVED
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
        <li class="nav-item mt-3">
            <a class="nav-link" href="jobs.html">
                <i class="bi bi-search"></i> <span data-i18n="dashboard.search-jobs">ค้นหางาน</span>
            </a>
        </li>
    `);
    
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

// USER: Overview - IMPROVED TABLE
function loadUserOverview() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <!-- Stat Cards -->
            <div class="col-md-3 col-sm-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
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
            <div class="col-md-3 col-sm-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
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
            <div class="col-md-3 col-sm-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
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
            <div class="col-md-3 col-sm-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
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

        <!-- Recent Applications - IMPROVED -->
        <div class="card shadow-sm mb-4">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="mb-0 fw-bold" data-i18n="dashboard.user.recent-applications">ใบสมัครล่าสุด</h5>
            </div>
            <div class="card-body p-0">
                ${generateImprovedApplicationTable()}
            </div>
            <div class="card-footer bg-white text-center border-top">
                <a href="dashboard.html?view=applications" class="btn btn-primary">
                    ดูใบสมัครทั้งหมด <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    `);
    
    translatePage();
}

// Generate improved application table
function generateImprovedApplicationTable() {
    const applications = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Thailand', logo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff', date: '2 มีนาคม 2026', status: 'pending', statusText: 'รอการตอบกลับ', statusClass: 'warning' },
        { id: 2, title: 'UX/UI Designer', company: 'Creative Studio', logo: 'https://ui-avatars.com/api/?name=CS&background=10b981&color=fff', date: '28 กุมภาพันธ์ 2026', status: 'accepted', statusText: 'ได้รับการตอบรับ', statusClass: 'success' },
        { id: 3, title: 'Marketing Manager', company: 'Digital Agency', logo: 'https://ui-avatars.com/api/?name=DA&background=f59e0b&color=fff', date: '25 กุมภาพันธ์ 2026', status: 'reviewing', statusText: 'กำลังตรวจสอบ', statusClass: 'info' },
    ];
    
    return `
        <div class="list-group list-group-flush">
            ${applications.map(app => `
                <div class="list-group-item list-group-item-action p-3 hover-shadow">
                    <div class="row align-items-center">
                        <div class="col-auto d-none d-md-block">
                            <img src="${app.logo}" alt="${app.company}" class="rounded" width="48" height="48">
                        </div>
                        <div class="col">
                            <h6 class="mb-1 fw-bold">${app.title}</h6>
                            <small class="text-muted">
                                <i class="bi bi-building me-1"></i>${app.company}
                                <span class="mx-2">•</span>
                                <i class="bi bi-calendar3 me-1"></i>${app.date}
                            </small>
                        </div>
                        <div class="col-auto">
                            <span class="badge bg-${app.statusClass} px-3 py-2">${app.statusText}</span>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-sm btn-outline-primary" onclick="viewApplication(${app.id})">
                                <i class="bi bi-eye me-1"></i> ดู
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// USER: Applications - IMPROVED WITH DETAIL VIEW
function loadUserApplications() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.user.applications">ใบสมัครของฉัน</h5>
                    </div>
                    <div class="col-auto">
                        <select class="form-select form-select-sm" id="statusFilter" onchange="filterApplications(this.value)">
                            <option value="all">ทั้งหมด</option>
                            <option value="pending">รอการตอบกลับ</option>
                            <option value="reviewing">กำลังตรวจสอบ</option>
                            <option value="accepted">ได้รับการตอบรับ</option>
                            <option value="rejected">ไม่ผ่าน</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-body p-0" id="applicationsTableContainer">
                ${generateImprovedFullApplicationTable()}
            </div>
        </div>
    `);
    
    translatePage();
}

function generateImprovedFullApplicationTable() {
    const applications = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Thailand', logo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff', location: 'กรุงเทพฯ', date: '2 มีนาคม 2026', status: 'pending', statusText: 'รอการตอบกลับ', statusClass: 'warning' },
        { id: 2, title: 'UX/UI Designer', company: 'Creative Studio', logo: 'https://ui-avatars.com/api/?name=CS&background=10b981&color=fff', location: 'กรุงเทพฯ', date: '28 กุมภาพันธ์ 2026', status: 'accepted', statusText: 'ได้รับการตอบรับ', statusClass: 'success' },
        { id: 3, title: 'Marketing Manager', company: 'Digital Agency', logo: 'https://ui-avatars.com/api/?name=DA&background=f59e0b&color=fff', location: 'เชียงใหม่', date: '25 กุมภาพันธ์ 2026', status: 'reviewing', statusText: 'กำลังตรวจสอบ', statusClass: 'info' },
        { id: 4, title: 'Full Stack Developer', company: 'Startup Hub', logo: 'https://ui-avatars.com/api/?name=SH&background=ef4444&color=fff', location: 'กรุงเทพฯ', date: '20 กุมภาพันธ์ 2026', status: 'rejected', statusText: 'ไม่ผ่าน', statusClass: 'danger' },
        { id: 5, title: 'Data Analyst', company: 'Analytics Co.', logo: 'https://ui-avatars.com/api/?name=AC&background=8b5cf6&color=fff', location: 'ปทุมธานี', date: '15 กุมภาพันธ์ 2026', status: 'pending', statusText: 'รอการตอบกลับ', statusClass: 'warning' },
    ];
    
    return `
        <div class="list-group list-group-flush">
            ${applications.map(app => `
                <div class="list-group-item p-3 hover-shadow application-item" data-status="${app.status}">
                    <div class="row align-items-center">
                        <div class="col-auto d-none d-sm-block">
                            <img src="${app.logo}" alt="${app.company}" class="rounded" width="56" height="56">
                        </div>
                        <div class="col">
                            <h6 class="mb-1 fw-bold">${app.title}</h6>
                            <small class="text-muted d-block">
                                <i class="bi bi-building me-1"></i>${app.company}
                            </small>
                            <small class="text-muted">
                                <i class="bi bi-geo-alt me-1"></i>${app.location}
                                <span class="mx-2">•</span>
                                <i class="bi bi-calendar3 me-1"></i>${app.date}
                            </small>
                        </div>
                        <div class="col-auto">
                            <span class="badge bg-${app.statusClass} px-3 py-2">${app.statusText}</span>
                        </div>
                        <div class="col-auto">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" onclick="viewApplicationDetail(${app.id})">
                                    <i class="bi bi-eye me-1"></i> ดู
                                </button>
                                ${app.status === 'pending' ? `
                                    <button class="btn btn-sm btn-outline-danger" onclick="cancelApplication(${app.id})">
                                        <i class="bi bi-x-circle"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// View application detail modal
function viewApplicationDetail(id) {
    const applicationDetails = {
        1: { title: 'Senior Frontend Developer', company: 'TechCorp Thailand', logo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff', location: 'กรุงเทพฯ', salary: '50,000 - 80,000', type: 'Full-time', date: '2 มีนาคม 2026', status: 'รอการตอบกลับ', statusClass: 'warning', description: 'ตำแหน่งนี้เหมาะสำหรับผู้ที่มีประสบการณ์ด้าน Frontend Development อย่างน้อย 3 ปี', requirements: ['React.js', 'Vue.js', 'TypeScript', 'CSS/SCSS'] },
        2: { title: 'UX/UI Designer', company: 'Creative Studio', logo: 'https://ui-avatars.com/api/?name=CS&background=10b981&color=fff', location: 'กรุงเทพฯ', salary: '35,000 - 50,000', type: 'Full-time', date: '28 กุมภาพันธ์ 2026', status: 'ได้รับการตอบรับ', statusClass: 'success', description: 'ออกแบบ UI/UX สำหรับ Web และ Mobile Application', requirements: ['Figma', 'Adobe XD', 'Sketch', 'User Research'] },
    };
    
    const app = applicationDetails[id] || applicationDetails[1];
    
    const modalHtml = `
        <div class="modal fade" id="applicationDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title fw-bold">รายละเอียดใบสมัคร</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex align-items-start mb-4">
                            <img src="${app.logo}" alt="${app.company}" class="rounded me-3" width="80" height="80">
                            <div>
                                <h4 class="fw-bold mb-2">${app.title}</h4>
                                <p class="text-muted mb-2">
                                    <i class="bi bi-building me-2"></i>${app.company}
                                </p>
                                <span class="badge bg-${app.statusClass} px-3 py-2">${app.status}</span>
                            </div>
                        </div>
                        
                        <div class="row g-3 mb-4">
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-geo-alt text-primary fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">สถานที่</small>
                                        <strong>${app.location}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-cash text-success fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">เงินเดือน</small>
                                        <strong>${app.salary} บาท</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-briefcase text-info fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">ประเภท</small>
                                        <strong>${app.type}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-calendar3 text-warning fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">วันที่สมัคร</small>
                                        <strong>${app.date}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <hr>
                        
                        <h6 class="fw-bold mb-3">คุณสมบัติที่ต้องการ</h6>
                        <div class="d-flex flex-wrap gap-2 mb-4">
                            ${app.requirements.map(req => `
                                <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">${req}</span>
                            `).join('')}
                        </div>
                        
                        <h6 class="fw-bold mb-3">รายละเอียดงาน</h6>
                        <p class="text-muted">${app.description}</p>
                        
                        <div class="alert alert-info mt-4">
                            <i class="bi bi-info-circle me-2"></i>
                            <strong>หมายเหตุ:</strong> คุณสามารถติดตามสถานะใบสมัครได้ในหน้านี้
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                        <a href="job-detail.html?id=${id}" class="btn btn-primary">ดูรายละเอียดงานเต็ม</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    $('#applicationDetailModal').remove();
    
    // Add and show modal
    $('body').append(modalHtml);
    $('#applicationDetailModal').modal('show');
}

// Filter applications
function filterApplications(status) {
    if (status === 'all') {
        $('.application-item').show();
    } else {
        $('.application-item').hide();
        $(`.application-item[data-status="${status}"]`).show();
    }
}

// USER: Saved Jobs - IMPROVED BADGES & COLORS
function loadUserSavedJobs() {
    $('#dashboardContent').html(`
        <div class="mb-4">
            <h5 class="fw-bold" data-i18n="dashboard.user.saved-jobs">งานที่บันทึก</h5>
            <p class="text-muted">คุณมี 8 งานที่บันทึกไว้</p>
        </div>
        
        <div class="row g-4">
            ${generateImprovedSavedJobCards()}
        </div>
    `);
    
    translatePage();
}

function generateImprovedSavedJobCards() {
    const jobs = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Thailand', location: 'กรุงเทพ���', salary: '50,000 - 80,000', type: 'Full-time', logo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff' },
        { id: 2, title: 'UX/UI Designer', company: 'Creative Studio', location: 'กรุงเทพฯ', salary: '35,000 - 50,000', type: 'Part-time', logo: 'https://ui-avatars.com/api/?name=CS&background=10b981&color=fff' },
        { id: 3, title: 'Marketing Manager', company: 'Digital Agency', location: 'เชียงใหม่', salary: '45,000 - 60,000', type: 'Full-time', logo: 'https://ui-avatars.com/api/?name=DA&background=f59e0b&color=fff' },
        { id: 4, title: 'Full Stack Developer', company: 'Startup Hub', location: 'กรุงเทพฯ', salary: '40,000 - 70,000', type: 'Contract', logo: 'https://ui-avatars.com/api/?name=SH&background=ef4444&color=fff' },
    ];
    
    return jobs.map(job => `
        <div class="col-md-6 col-lg-4">
            <div class="card job-card h-100 shadow-sm border-0">
                <div class="card-body">
                    <div class="d-flex align-items-start mb-3">
                        <img src="${job.logo}" alt="${job.company}" class="rounded me-3" width="56" height="56">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold">${job.title}</h6>
                            <p class="text-muted mb-0 small">${job.company}</p>
                        </div>
                        <button class="btn btn-sm btn-light border" onclick="unsaveJob(${job.id})" title="ลบ">
                            <i class="bi bi-bookmark-fill text-primary fs-5"></i>
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
                        <span class="badge ${getJobTypeBadgeClass(job.type)}">${job.type}</span>
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

// Get job type badge class
function getJobTypeBadgeClass(type) {
    const classes = {
        'Full-time': 'bg-primary text-white px-3 py-2',
        'Part-time': 'bg-success text-white px-3 py-2',
        'Contract': 'bg-warning text-dark px-3 py-2',
        'Freelance': 'bg-info text-white px-3 py-2',
        'Internship': 'bg-secondary text-white px-3 py-2'
    };
    return classes[type] || 'bg-primary text-white px-3 py-2';
}

// USER: Profile - IMPROVED WITH WORKING FUNCTIONS
function loadUserProfile() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <!-- Personal Info -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.personal-info">ข้อมูลส่วนตัว</h5>
                    </div>
                    <div class="card-body">
                        <form id="profileForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">ชื่อ-นามสกุล</label>
                                    <input type="text" class="form-control" id="fullName" value="สมชาย ใจดี">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">อีเมล</label>
                                    <input type="email" class="form-control" id="email" value="user@demo.com" disabled>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">เบอร์โทรศัพท์</label>
                                    <input type="tel" class="form-control" id="phone" value="081-234-5678">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">วันเกิด</label>
                                    <input type="date" class="form-control" id="birthdate" value="1995-05-15">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">ที่อยู่</label>
                                    <textarea class="form-control" id="address" rows="2">123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Skills -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.skills">ทักษะ</h5>
                        <button class="btn btn-sm btn-outline-primary" onclick="showAddSkillModal()">
                            <i class="bi bi-plus-circle"></i> เพิ่มทักษะ
                        </button>
                    </div>
                    <div class="card-body">
                        <div id="skillsList" class="d-flex flex-wrap gap-2">
                            ${generateSkillBadges()}
                        </div>
                    </div>
                </div>

                <!-- Experience -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold" data-i18n="dashboard.experience">ประสบการณ์ทำงาน</h5>
                        <button class="btn btn-sm btn-outline-primary" onclick="showAddExperienceModal()">
                            <i class="bi bi-plus-circle"></i> เพิ่มประสบการณ์
                        </button>
                    </div>
                    <div class="card-body" id="experienceList">
                        ${generateExperienceList()}
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="col-lg-4">
                <!-- Profile Picture -->
                <div class="card shadow-sm mb-4">
                    <div class="card-body text-center">
                        <img src="https://ui-avatars.com/api/?name=User&size=150&background=6366f1&color=fff" 
                             alt="Profile" class="rounded-circle mb-3" width="150" height="150" id="profileImagePreview">
                        <h5 class="fw-bold mb-1">สมชาย ใจดี</h5>
                        <p class="text-muted mb-3">Frontend Developer</p>
                        <input type="file" id="profileImageInput" class="d-none" accept="image/*" onchange="handleProfileImageUpload(this)">
                        <button class="btn btn-outline-primary btn-sm w-100" onclick="$('#profileImageInput').click()">
                            <i class="bi bi-camera"></i> เปลี่ยนรูปโปรไฟล์
                        </button>
                    </div>
                </div>

                <!-- Resume -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h6 class="mb-0 fw-bold" data-i18n="dashboard.resume">เรซูเม่</h6>
                    </div>
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <i class="bi bi-file-earmark-pdf text-danger fs-3 me-3"></i>
                            <div>
                                <p class="mb-0 small fw-bold" id="resumeFileName">resume_2026.pdf</p>
                                <small class="text-muted">อัพเดท: 1 มีนาคม 2026</small>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="viewResume()">
                                <i class="bi bi-eye"></i> ดู
                            </button>
                            <input type="file" id="resumeInput" class="d-none" accept=".pdf,.doc,.docx" onchange="handleResumeUpload(this)">
                            <button class="btn btn-outline-success btn-sm" onclick="$('#resumeInput').click()">
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

// Generate skill badges
function generateSkillBadges() {
    const skills = ['React.js', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Git', 'Figma'];
    return skills.map(skill => `
        <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 position-relative skill-badge">
            ${skill}
            <button class="btn-close btn-close-sm ms-2" style="font-size: 0.6rem;" onclick="removeSkill('${skill}')" title="ลบ"></button>
        </span>
    `).join('');
}

// Generate experience list
function generateExperienceList() {
    const experiences = [
        { id: 1, position: 'Frontend Developer', company: 'Tech Company Ltd.', period: 'มกราคม 2023 - ปัจจุบัน' },
        { id: 2, position: 'Junior Developer', company: 'Startup Hub', period: 'มิถุนายน 2021 - ธันวาคม 2022' }
    ];
    
    return experiences.map(exp => `
        <div class="experience-item mb-3 pb-3 border-bottom" id="exp-${exp.id}">
            <div class="d-flex justify-content-between">
                <div>
                    <h6 class="fw-bold mb-1">${exp.position}</h6>
                    <p class="text-muted mb-1">${exp.company}</p>
                    <small class="text-muted">${exp.period}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeExperience(${exp.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Show add skill modal
function showAddSkillModal() {
    const modalHtml = `
        <div class="modal fade" id="addSkillModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">เพิ่มทักษะใหม่</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">ชื่อทักษะ</label>
                            <input type="text" class="form-control" id="newSkillInput" placeholder="เช่น Python, Node.js">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="addNewSkill()">เพิ่ม</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#addSkillModal').remove();
    $('body').append(modalHtml);
    $('#addSkillModal').modal('show');
}

// Add new skill
function addNewSkill() {
    const skillName = $('#newSkillInput').val().trim();
    if (!skillName) {
        showNotification('กรุณากรอกชื่อทักษะ', 'warning');
        return;
    }
    
    const newSkillBadge = `
        <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 position-relative skill-badge">
            ${skillName}
            <button class="btn-close btn-close-sm ms-2" style="font-size: 0.6rem;" onclick="removeSkill('${skillName}')" title="ลบ"></button>
        </span>
    `;
    
    $('#skillsList').append(newSkillBadge);
    $('#addSkillModal').modal('hide');
    showNotification('เพิ่มทักษะสำเร็จ', 'success');
}

// Remove skill
function removeSkill(skillName) {
    if (confirm(`ต้องการลบทักษะ "${skillName}" หรือไม่?`)) {
        event.target.closest('.skill-badge').remove();
        showNotification('ลบทักษะสำเร็จ', 'success');
    }
}

// Show add experience modal
function showAddExperienceModal() {
    const modalHtml = `
        <div class="modal fade" id="addExperienceModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">เพิ่มประสบการณ์ทำงาน</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">ตำแหน่ง</label>
                                <input type="text" class="form-control" id="newExpPosition" placeholder="เช่น Senior Developer">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">บริษัท</label>
                                <input type="text" class="form-control" id="newExpCompany" placeholder="เช่น ABC Company">
                            </div>
                            <div class="col-12">
                                <label class="form-label">ช่วงเวลา</label>
                                <input type="text" class="form-control" id="newExpPeriod" placeholder="เช่น มกราคม 2020 - ธันวาคม 2022">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="addNewExperience()">เพิ่ม</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#addExperienceModal').remove();
    $('body').append(modalHtml);
    $('#addExperienceModal').modal('show');
}

// Add new experience
function addNewExperience() {
    const position = $('#newExpPosition').val().trim();
    const company = $('#newExpCompany').val().trim();
    const period = $('#newExpPeriod').val().trim();
    
    if (!position || !company || !period) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    const newId = Date.now();
    const newExp = `
        <div class="experience-item mb-3 pb-3 border-bottom" id="exp-${newId}">
            <div class="d-flex justify-content-between">
                <div>
                    <h6 class="fw-bold mb-1">${position}</h6>
                    <p class="text-muted mb-1">${company}</p>
                    <small class="text-muted">${period}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeExperience(${newId})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    $('#experienceList').append(newExp);
    $('#addExperienceModal').modal('hide');
    showNotification('เพิ่มประสบการณ์สำเร็จ', 'success');
}

// Remove experience
function removeExperience(id) {
    if (confirm('ต้องการลบประสบการณ์นี้หรือไม่?')) {
        $(`#exp-${id}`).remove();
        showNotification('ลบประสบการณ์สำเร็จ', 'success');
    }
}

// Handle profile image upload
function handleProfileImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            $('#profileImagePreview').attr('src', e.target.result);
            showNotification('อัพโหลดรูปภาพสำเร็จ', 'success');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Handle resume upload
function handleResumeUpload(input) {
    if (input.files && input.files[0]) {
        const fileName = input.files[0].name;
        $('#resumeFileName').text(fileName);
        showNotification('อัพโหลดเรซูเม่สำเร็จ', 'success');
    }
}

// View resume
function viewResume() {
    showNotification('กำลังเปิดเรซูเม่...', 'info');
    // In production, open the actual resume file
}

// Save profile
function saveProfile() {
    const profileData = {
        fullName: $('#fullName').val(),
        phone: $('#phone').val(),
        birthdate: $('#birthdate').val(),
        address: $('#address').val()
    };
    
    // In production, send to API
    showNotification('บันทึกข้อมูลสำเร็จ!', 'success');
}

// USER: Settings - IMPROVED WITH WORKING CHANGE PASSWORD
function loadUserSettings() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <!-- Account Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
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
                            <button class="btn btn-outline-primary w-100" onclick="showChangePasswordModal()">
                                <i class="bi bi-key"></i> เปลี่ยนรหัสผ่าน
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Notification Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
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
                    <div class="card-header bg-white py-3 border-bottom">
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
                    <div class="card-header bg-danger bg-opacity-10 py-3 border-danger">
                        <h5 class="mb-0 fw-bold text-danger" data-i18n="dashboard.danger-zone">Danger Zone</h5>
                    </div>
                    <div class="card-body">
                        <p class="text-muted mb-3">การลบบัญชีจะไม่สามารถกู้คืนได้</p>
                        <button class="btn btn-danger" onclick="deleteAccount()">
                            <i class="bi bi-trash"></i> ลบบัญชี
                        </button>
                    </div>
                </div>

                <button class="btn btn-primary" onclick="saveSettings()">
                    <i class="bi bi-save"></i> บันทึกการตั้งค่า
                </button>
            </div>
        </div>
    `);
    
    translatePage();
}

// Show change password modal
function showChangePasswordModal() {
    const modalHtml = `
        <div class="modal fade" id="changePasswordModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">เปลี่ยนรหัสผ่าน</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="changePasswordForm">
                            <div class="mb-3">
                                <label class="form-label">รหัสผ่านปัจจุบัน</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="currentPassword" required>
                                    <button class="btn btn-outline-secondary" type="button" onclick="togglePasswordVisibility('currentPassword')">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">รหัสผ่านใหม่</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="newPassword" required minlength="8">
                                    <button class="btn btn-outline-secondary" type="button" onclick="togglePasswordVisibility('newPassword')">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                                <small class="text-muted">รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ยืนยันรหัสผ่านใหม่</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="confirmPassword" required>
                                    <button class="btn btn-outline-secondary" type="button" onclick="togglePasswordVisibility('confirmPassword')">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="changePassword()">เปลี่ยนรหัสผ่าน</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#changePasswordModal').remove();
    $('body').append(modalHtml);
    $('#changePasswordModal').modal('show');
}

// Toggle password visibility
function togglePasswordVisibility(inputId) {
    const input = $(`#${inputId}`);
    const icon = event.currentTarget.querySelector('i');
    
    if (input.attr('type') === 'password') {
        input.attr('type', 'text');
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        input.attr('type', 'password');
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}

// Change password
function changePassword() {
    const currentPassword = $('#currentPassword').val();
    const newPassword = $('#newPassword').val();
    const confirmPassword = $('#confirmPassword').val();
    
    // Validate
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร', 'warning');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('รหัสผ่านใหม่ไม่ตรงกัน', 'warning');
        return;
    }
    
    // In production, send to API
    showNotification('เปลี่ยนรหัสผ่านสำเร็จ!', 'success');
    $('#changePasswordModal').modal('hide');
    
    // Clear form
    $('#changePasswordForm')[0].reset();
}

// Save settings
function saveSettings() {
    const settings = {
        emailNotif: $('#emailNotif').is(':checked'),
        jobAlerts: $('#jobAlerts').is(':checked'),
        applicationUpdates: $('#applicationUpdates').is(':checked'),
        marketingEmails: $('#marketingEmails').is(':checked'),
        profilePublic: $('#profilePublic').is(':checked'),
        showResume: $('#showResume').is(':checked')
    };
    
    // In production, send to API
    showNotification('บันทึกการตั้งค่าสำเร็จ!', 'success');
}

// Delete account
function deleteAccount() {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบบัญชี? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
        if (confirm('ยืนยันอีกครั้ง: การลบบัญชีจะไม่สามารถกู้คืนได้')) {
            // In production, send to API
            showNotification('กำลังลบบัญชี...', 'info');
            setTimeout(() => {
                logout();
            }, 2000);
        }
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function viewApplication(id) { 
    viewApplicationDetail(id);
}

function cancelApplication(id) { 
    if(confirm('ยืนยันการยกเลิกใบสมัครนี้?')) {
        showNotification('ยกเลิกใบสมัครสำเร็จ', 'success');
        // Reload applications
        setTimeout(() => {
            loadUserApplications();
        }, 1000);
    }
}

function unsaveJob(id) { 
    if(confirm('ต้องการลบงานนี้ออกจากรายการบันทึกหรือไม่?')) {
        showNotification('ลบออกจากรายการบันทึกสำเร็จ', 'success');
        // Reload saved jobs
        setTimeout(() => {
            loadUserSavedJobs();
        }, 1000);
    }
}

function applyJob(id) { 
    window.location.href = 'job-detail.html?id=' + id; 
}

// Placeholder functions for Employer and Admin (keep existing code)
function loadEmployerDashboard() {
    $('#dashboardTitle').text('Dashboard - Employer');
    $('#dashboardMenu').html('<li class="nav-item"><a class="nav-link" href="#">Employer Menu</a></li>');
    $('#dashboardContent').html('<div class="alert alert-info">Employer Dashboard (เก็บโค้ดเดิม)</div>');
}

function loadAdminDashboard() {
    $('#dashboardTitle').text('Dashboard - Admin');
    $('#dashboardMenu').html('<li class="nav-item"><a class="nav-link" href="#">Admin Menu</a></li>');
    $('#dashboardContent').html('<div class="alert alert-info">Admin Dashboard (เก็บโค้ดเดิม)</div>');
}
