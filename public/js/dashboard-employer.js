// ========================================
// EMPLOYER DASHBOARD - Complete Design
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
                <i class="bi bi-file-earmark-text"></i> <span data-i18n="dashboard.employer.applications">ใบสมัครทั้งหมด</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'search-resume' ? 'active' : ''}" href="dashboard.html?view=search-resume">
                <i class="bi bi-search"></i> <span data-i18n="dashboard.employer.search-resume">ค้นหา Resume</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'announcements' ? 'active' : ''}" href="dashboard.html?view=announcements">
                <i class="bi bi-megaphone"></i> <span>ข่าวสาร</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'payments' ? 'active' : ''}" href="dashboard.html?view=payments">
                <i class="bi bi-credit-card"></i> <span data-i18n="dashboard.employer.payments">การชำระเงิน</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'company-profile' ? 'active' : ''}" href="dashboard.html?view=company-profile">
                <i class="bi bi-building"></i> <span data-i18n="dashboard.employer.company-profile">โปรไฟล์บริษัท</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'settings' ? 'active' : ''}" href="dashboard.html?view=settings">
                <i class="bi bi-gear"></i> <span data-i18n="dashboard.settings">ตั้งค่า</span>
            </a>
        </li>
        <li class="nav-item mt-3">
            <a class="nav-link btn btn-primary text-white" href="employer-post-job.html">
                <i class="bi bi-plus-circle"></i> <span data-i18n="dashboard.employer.post-job">ประกาศงานใหม่</span>
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
        case 'search-resume':
            loadEmployerSearchResume();
            break;
        case 'announcements':
            loadEmployerAnnouncements();
            break;
        case 'payments':
            loadEmployerPayments();
            break;
        case 'company-profile':
            loadEmployerCompanyProfile();
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
            <div class="col-md-3 col-sm-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                            <i class="bi bi-briefcase fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">15</h4>
                            <small class="text-muted">งานที่เปิดรับ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-success bg-opacity-10 text-success rounded-3 p-3 me-3">
                            <i class="bi bi-people fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">248</h4>
                            <small class="text-muted">ใบสมัครทั้งหมด</small>
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
                            <h4 class="mb-0 fw-bold">32</h4>
                            <small class="text-muted">รอการตรวจสอบ</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-info bg-opacity-10 text-info rounded-3 p-3 me-3">
                            <i class="bi bi-eye fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">1.2k</h4>
                            <small class="text-muted">จำนวนการดู</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="row g-4 mb-4">
            <div class="col-lg-8">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">สถิติใบสมัคร (7 วันล่าสุด)</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="applicationsChart" height="80"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">สถานะใบสมัคร</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="statusChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Applications -->
        <div class="card shadow-sm mb-4">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="mb-0 fw-bold">ใบสมัครล่าสุด</h5>
            </div>
            <div class="card-body p-0">
                ${generateEmployerRecentApplications()}
            </div>
            <div class="card-footer bg-white text-center border-top">
                <a href="dashboard.html?view=applications" class="btn btn-primary">
                    ดูใบสมัครทั้งหมด <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    `);
    
    // Initialize charts
    initEmployerCharts();
    translatePage();
}

function generateEmployerRecentApplications() {
    const applications = [
        { id: 1, name: 'สมชาย ใจดี', position: 'Senior Frontend Developer', photo: 'https://ui-avatars.com/api/?name=สมชาย&background=6366f1&color=fff', date: '5 มีนาคม 2026', status: 'pending', statusText: 'รอการตรวจสอบ', statusClass: 'warning' },
        { id: 2, name: 'สมหญิง รักดี', position: 'UX/UI Designer', photo: 'https://ui-avatars.com/api/?name=สมหญิง&background=10b981&color=fff', date: '5 มีนาคม 2026', status: 'reviewing', statusText: 'กำลังตรวจสอบ', statusClass: 'info' },
        { id: 3, name: 'ธนา ทำดี', position: 'Marketing Manager', photo: 'https://ui-avatars.com/api/?name=ธนา&background=f59e0b&color=fff', date: '4 มีนาคม 2026', status: 'pending', statusText: 'รอการตรวจสอบ', statusClass: 'warning' },
    ];
    
    return `
        <div class="list-group list-group-flush">
            ${applications.map(app => `
                <div class="list-group-item p-3 hover-shadow">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img src="${app.photo}" alt="${app.name}" class="rounded-circle" width="56" height="56">
                        </div>
                        <div class="col">
                            <h6 class="mb-1 fw-bold">${app.name}</h6>
                            <small class="text-muted d-block">
                                <i class="bi bi-briefcase me-1"></i>${app.position}
                            </small>
                            <small class="text-muted">
                                <i class="bi bi-calendar3 me-1"></i>${app.date}
                            </small>
                        </div>
                        <div class="col-auto">
                            <span class="badge bg-${app.statusClass} px-3 py-2">${app.statusText}</span>
                        </div>
                        <div class="col-auto">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" onclick="viewApplicantDetail(${app.id})">
                                    <i class="bi bi-eye me-1"></i> ดู
                                </button>
                                <button class="btn btn-sm btn-outline-success" onclick="acceptApplicant(${app.id})">
                                    <i class="bi bi-check-circle"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="rejectApplicant(${app.id})">
                                    <i class="bi bi-x-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function initEmployerCharts() {
    // Applications Chart
    const ctx1 = document.getElementById('applicationsChart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
                datasets: [{
                    label: 'ใบสมัคร',
                    data: [12, 19, 15, 25, 22, 18, 24],
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
                }
            }
        });
    }
    
    // Status Chart
    const ctx2 = document.getElementById('statusChart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['รอตรวจสอบ', 'กำลังตรวจสอบ', 'อนุมัติ', 'ปฏิเสธ'],
                datasets: [{
                    data: [32, 45, 89, 82],
                    backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
}

// EMPLOYER: My Jobs
function loadEmployerJobs() {
    $('#dashboardContent').html(`
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="fw-bold mb-0">งานของฉัน (15 ตำแหน่ง)</h5>
            <a href="employer-post-job.html" class="btn btn-primary">
                <i class="bi bi-plus-circle me-2"></i>ประกาศงานใหม่
            </a>
        </div>

        <!-- Tabs -->
        <ul class="nav nav-tabs mb-4" id="jobsTabs">
            <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#active-jobs">กำลังเปิดรับ (12)</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#closed-jobs">ปิดรับแล้ว (3)</a>
            </li>
        </ul>

        <div class="tab-content">
            <div class="tab-pane fade show active" id="active-jobs">
                ${generateEmployerJobsList('active')}
            </div>
            <div class="tab-pane fade" id="closed-jobs">
                ${generateEmployerJobsList('closed')}
            </div>
        </div>
    `);
    
    translatePage();
}

function generateEmployerJobsList(type) {
    const jobs = [
        { id: 1, title: 'Senior Frontend Developer', location: 'กรุงเทพฯ', salary: '50,000 - 80,000', type: 'Full-time', applicants: 45, views: 320, posted: '3 วันที่แล้ว', status: 'active' },
        { id: 2, title: 'UX/UI Designer', location: 'กรุงเทพฯ', salary: '35,000 - 50,000', type: 'Full-time', applicants: 32, views: 280, posted: '5 วันที่แล้ว', status: 'active' },
        { id: 3, title: 'Marketing Manager', location: 'เชียงใหม่', salary: '45,000 - 60,000', type: 'Full-time', applicants: 28, views: 195, posted: '7 วันที่แล้ว', status: type === 'closed' ? 'closed' : 'active' },
    ];
    
    const filteredJobs = jobs.filter(j => type === 'closed' ? j.status === 'closed' : j.status === 'active');
    
    return `
        <div class="row g-4">
            ${filteredJobs.map(job => `
                <div class="col-lg-6">
                    <div class="card job-card h-100 shadow-sm border-0">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h5 class="fw-bold mb-2">${job.title}</h5>
                                    <p class="text-muted mb-2">
                                        <i class="bi bi-geo-alt me-1"></i>${job.location}
                                        <span class="mx-2">•</span>
                                        <i class="bi bi-cash me-1"></i>${job.salary} บาท
                                    </p>
                                    <span class="badge bg-primary text-white px-3 py-2">${job.type}</span>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-light" data-bs-toggle="dropdown">
                                        <i class="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" href="#" onclick="editJob(${job.id})"><i class="bi bi-pencil me-2"></i>แก้ไข</a></li>
                                        <li><a class="dropdown-item" href="#" onclick="viewJobStats(${job.id})"><i class="bi bi-graph-up me-2"></i>สถิติ</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item text-danger" href="#" onclick="deleteJob(${job.id})"><i class="bi bi-trash me-2"></i>ลบ</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="row g-3 mb-3">
                                <div class="col-6">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-people text-success fs-4 me-2"></i>
                                        <div>
                                            <div class="fw-bold">${job.applicants}</div>
                                            <small class="text-muted">ใบสมัคร</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-eye text-info fs-4 me-2"></i>
                                        <div>
                                            <div class="fw-bold">${job.views}</div>
                                            <small class="text-muted">การดู</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">
                                    <i class="bi bi-clock me-1"></i>โพสต์เมื่อ ${job.posted}
                                </small>
                                <div class="btn-group">
                                    <a href="dashboard.html?view=applications&job=${job.id}" class="btn btn-sm btn-outline-primary">
                                        <i class="bi bi-people me-1"></i>ดูใบสมัคร
                                    </a>
                                    <a href="job-detail.html?id=${job.id}" class="btn btn-sm btn-outline-secondary" target="_blank">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// EMPLOYER: Applications
function loadEmployerApplications() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold">ใบสมัครทั้งหมด (248)</h5>
                    </div>
                    <div class="col-auto">
                        <div class="d-flex gap-2">
                            <select class="form-select form-select-sm" onchange="filterByJob(this.value)">
                                <option value="all">ทุกตำแหน่ง</option>
                                <option value="1">Senior Frontend Developer</option>
                                <option value="2">UX/UI Designer</option>
                                <option value="3">Marketing Manager</option>
                            </select>
                            <select class="form-select form-select-sm" onchange="filterByStatus(this.value)">
                                <option value="all">ทุกสถานะ</option>
                                <option value="pending">รอตรวจสอบ</option>
                                <option value="reviewing">กำลังตรวจสอบ</option>
                                <option value="accepted">อนุมัติ</option>
                                <option value="rejected">ปฏิเสธ</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                ${generateEmployerApplicationsList()}
            </div>
        </div>
    `);
    
    translatePage();
}

function generateEmployerApplicationsList() {
    const applications = [
        { id: 1, name: 'สมชาย ใจดี', position: 'Senior Frontend Developer', photo: 'https://ui-avatars.com/api/?name=สมชาย&background=6366f1&color=fff', date: '5 มีนาคม 2026', experience: '5 ปี', status: 'pending', statusText: 'รอตรวจสอบ', statusClass: 'warning' },
        { id: 2, name: 'สมหญิง รักดี', position: 'UX/UI Designer', photo: 'https://ui-avatars.com/api/?name=สมหญิง&background=10b981&color=fff', date: '5 มีนาคม 2026', experience: '3 ปี', status: 'reviewing', statusText: 'กำลังตรวจสอบ', statusClass: 'info' },
        { id: 3, name: 'ธนา ทำดี', position: 'Marketing Manager', photo: 'https://ui-avatars.com/api/?name=ธนา&background=f59e0b&color=fff', date: '4 มีนาคม 2026', experience: '4 ปี', status: 'accepted', statusText: 'อนุมัติ', statusClass: 'success' },
        { id: 4, name: 'วิชัย สู้ดี', position: 'Senior Frontend Developer', photo: 'https://ui-avatars.com/api/?name=วิชัย&background=ef4444&color=fff', date: '4 มีนาคม 2026', experience: '6 ปี', status: 'pending', statusText: 'รอตรวจสอบ', statusClass: 'warning' },
        { id: 5, name: 'มาลี ใจงาม', position: 'UX/UI Designer', photo: 'https://ui-avatars.com/api/?name=มาลี&background=8b5cf6&color=fff', date: '3 มีนาคม 2026', experience: '2 ปี', status: 'rejected', statusText: 'ปฏิเสธ', statusClass: 'danger' },
    ];
    
    return `
        <div class="list-group list-group-flush">
            ${applications.map(app => `
                <div class="list-group-item p-3 hover-shadow applicant-item" data-status="${app.status}">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img src="${app.photo}" alt="${app.name}" class="rounded-circle" width="56" height="56">
                        </div>
                        <div class="col">
                            <h6 class="mb-1 fw-bold">${app.name}</h6>
                            <small class="text-muted d-block">
                                <i class="bi bi-briefcase me-1"></i>${app.position}
                            </small>
                            <small class="text-muted">
                                <i class="bi bi-award me-1"></i>${app.experience} ประสบการณ์
                                <span class="mx-2">•</span>
                                <i class="bi bi-calendar3 me-1"></i>${app.date}
                            </small>
                        </div>
                        <div class="col-auto">
                            <span class="badge bg-${app.statusClass} px-3 py-2">${app.statusText}</span>
                        </div>
                        <div class="col-auto">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" onclick="viewApplicantDetail(${app.id})">
                                    <i class="bi bi-eye me-1"></i> ดู
                                </button>
                                ${app.status === 'pending' || app.status === 'reviewing' ? `
                                    <button class="btn btn-sm btn-outline-success" onclick="acceptApplicant(${app.id})" title="อนุมัติ">
                                        <i class="bi bi-check-circle"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" onclick="rejectApplicant(${app.id})" title="ปฏิเสธ">
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

// EMPLOYER: Search Resume
function loadEmployerSearchResume() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="mb-0 fw-bold">ค้นหา Resume</h5>
            </div>
            <div class="card-body">
                <form id="searchResumeForm">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">ตำแหน่งงาน</label>
                            <input type="text" class="form-control" id="jobTitle" placeholder="เช่น Senior Frontend Developer">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">ประสบการณ์</label>
                            <select class="form-select" id="experience">
                                <option value="all">ทุกประสบการณ์</option>
                                <option value="0-1">0-1 ปี</option>
                                <option value="1-3">1-3 ปี</option>
                                <option value="3-5">3-5 ปี</option>
                                <option value="5+">5+ ปี</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">ทักษะ</label>
                            <input type="text" class="form-control" id="skills" placeholder="เช่น React.js, Vue.js">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">สถานที่</label>
                            <input type="text" class="form-control" id="location" placeholder="เช่น กรุงเทพฯ">
                        </div>
                        <div class="col-12">
                            <button type="button" class="btn btn-primary" onclick="searchResumes()">
                                <i class="bi bi-search me-2"></i>ค้นหา
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Search Results -->
        <div id="searchResults" class="mt-4">
            ${generateSearchResults()}
        </div>
    `);
    
    translatePage();
}

function generateSearchResults() {
    const results = [
        { id: 1, name: 'สมชาย ใจดี', position: 'Senior Frontend Developer', photo: 'https://ui-avatars.com/api/?name=สมชาย&background=6366f1&color=fff', date: '5 มีนาคม 2026', experience: '5 ปี', skills: 'React.js, Vue.js, TypeScript, Node.js', location: 'กรุงเทพฯ', salary: '60,000 - 80,000 บาท' },
        { id: 2, name: 'สมหญิง รักดี', position: 'UX/UI Designer', photo: 'https://ui-avatars.com/api/?name=สมหญิง&background=10b981&color=fff', date: '5 มีนาคม 2026', experience: '3 ปี', skills: 'Adobe XD, Sketch, Figma', location: 'เชียงใหม่', salary: '40,000 - 55,000 บาท' },
        { id: 3, name: 'ธนา ทำดี', position: 'Marketing Manager', photo: 'https://ui-avatars.com/api/?name=ธนา&background=f59e0b&color=fff', date: '4 มีนาคม 2026', experience: '4 ปี', skills: 'SEO, SEM, Google Analytics', location: 'กรุงเทพฯ', salary: '50,000 - 70,000 บาท' },
        { id: 4, name: 'จิราพร สวยงาม', position: 'Backend Developer', photo: 'https://ui-avatars.com/api/?name=จิราพร&background=ec4899&color=fff', date: '3 มีนาคม 2026', experience: '6 ปี', skills: 'Node.js, Python, PostgreSQL', location: 'กรุงเทพฯ', salary: '70,000 - 90,000 บาท' },
        { id: 5, name: 'วิชัย กล้าหาญ', position: 'Data Analyst', photo: 'https://ui-avatars.com/api/?name=วิชัย&background=06b6d4&color=fff', date: '3 มีนาคม 2026', experience: '2 ปี', skills: 'Python, SQL, Tableau', location: 'ภูเก็ต', salary: '35,000 - 50,000 บาท' },
        { id: 6, name: 'นภัสวรรณ รักเรียน', position: 'HR Manager', photo: 'https://ui-avatars.com/api/?name=นภัสวรรณ&background=8b5cf6&color=fff', date: '2 มีนาคม 2026', experience: '7 ปี', skills: 'Recruitment, HRIS, Labor Law', location: 'กรุงเทพฯ', salary: '55,000 - 75,000 บาท' },
        { id: 7, name: 'สุรชัย แข็งแรง', position: 'DevOps Engineer', photo: 'https://ui-avatars.com/api/?name=สุรชัย&background=ef4444&color=fff', date: '2 มีนาคม 2026', experience: '4 ปี', skills: 'Docker, Kubernetes, AWS', location: 'กรุงเทพฯ', salary: '65,000 - 85,000 บาท' },
        { id: 8, name: 'ปิยะนุช ใจเย็น', position: 'Content Writer', photo: 'https://ui-avatars.com/api/?name=ปิยะนุช&background=f97316&color=fff', date: '1 มีนาคม 2026', experience: '3 ปี', skills: 'SEO Writing, Copywriting', location: 'เชียงใหม่', salary: '30,000 - 45,000 บาท' },
        { id: 9, name: 'ธีรพงษ์ เจริญ', position: 'Mobile Developer', photo: 'https://ui-avatars.com/api/?name=ธีรพงษ์&background=14b8a6&color=fff', date: '1 มีนาคม 2026', experience: '5 ปี', skills: 'React Native, Flutter, Swift', location: 'กรุงเทพฯ', salary: '60,000 - 80,000 บาท' },
    ];
    
    return `
        <div class="row g-4">
            ${results.map(res => `
                <div class="col-lg-4 col-md-6">
                    <div class="card shadow-sm h-100 hover-shadow" style="transition: all 0.3s ease;">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <img src="${res.photo}" alt="${res.name}" class="rounded-circle mb-3" width="100" height="100" style="border: 3px solid #f3f4f6;">
                                <h5 class="mb-1 fw-bold">${res.name}</h5>
                                <p class="text-primary mb-2">${res.position}</p>
                            </div>
                            
                            <div class="mb-3">
                                <small class="text-muted d-block mb-2">
                                    <i class="bi bi-award text-warning me-1"></i>
                                    <strong>ประสบการณ์:</strong> ${res.experience}
                                </small>
                                <small class="text-muted d-block mb-2">
                                    <i class="bi bi-geo-alt text-danger me-1"></i>
                                    <strong>สถานที่:</strong> ${res.location}
                                </small>
                                <small class="text-muted d-block mb-2">
                                    <i class="bi bi-cash text-success me-1"></i>
                                    <strong>เงินเดือนที่ต้องการ:</strong> ${res.salary}
                                </small>
                                <small class="text-muted d-block mb-2">
                                    <i class="bi bi-calendar3 text-info me-1"></i>
                                    <strong>อัพเดท:</strong> ${res.date}
                                </small>
                            </div>
                            
                            <div class="mb-3">
                                <small class="text-muted d-block mb-1">
                                    <i class="bi bi-tools me-1"></i><strong>ทักษะ:</strong>
                                </small>
                                <div class="d-flex flex-wrap gap-1">
                                    ${res.skills.split(', ').map(skill => `
                                        <span class="badge bg-light text-dark border" style="font-size: 0.7rem;">${skill}</span>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary btn-sm" onclick="window.location.href='resume-detail.html?id=${res.id}'">
                                    <i class="bi bi-eye me-1"></i> ดูรายละเอียด
                                </button>
                                <button class="btn btn-outline-success btn-sm" onclick="downloadResume(${res.id})">
                                    <i class="bi bi-download me-1"></i> ดาวน์โหลด Resume
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Pagination -->
        <nav aria-label="Resume search pagination" class="mt-4">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">
                        <i class="bi bi-chevron-left"></i>
                    </a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">4</a></li>
                <li class="page-item"><a class="page-link" href="#">5</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">
                        <i class="bi bi-chevron-right"></i>
                    </a>
                </li>
            </ul>
        </nav>
    `;
}

function searchResumes() {
    showNotification('กำลังค้นหา Resume...', 'info');
    setTimeout(() => {
        $('#searchResults').html(generateSearchResults());
    }, 1000);
}

// EMPLOYER: Payments
function loadEmployerPayments() {
    $('#dashboardContent').html(`
        <!-- Packages -->
        <div class="mb-5">
            <h5 class="fw-bold mb-4">เลือกแพ็คเกจ</h5>
            <div class="row g-4">
                ${generatePackageCards()}
            </div>
        </div>

        <!-- Payment History -->
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="mb-0 fw-bold">ประวัติการชำระเงิน</h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>วันที่</th>
                                <th>แพ็คเกจ</th>
                                <th>จำนวนเงิน</th>
                                <th>สถานะ</th>
                                <th>ใบเสร็จ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generatePaymentHistory()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

function generatePackageCards() {
    const packages = [
        { id: 1, name: 'Basic', price: 999, posts: 3, days: 30, popular: false, features: ['3 ตำแหน่งงาน', 'โพสต์ได้ 30 วัน', 'รองรับพื้นฐาน'] },
        { id: 2, name: 'Pro', price: 2499, posts: 10, days: 30, popular: true, features: ['10 ตำแหน่งงาน', 'โพสต์ได้ 30 วัน', 'แสดงผลเด่น', 'สถิติรายละเอียด'] },
        { id: 3, name: 'Enterprise', price: 4999, posts: 'Unlimited', days: 30, popular: false, features: ['ไม่จำกัดตำแหน่ง', 'โพสต์ได้ 30 วัน', 'แสดงผลเด่นพิเศษ', 'สถิติครบถ้วน', 'ซัพพอร์ตเฉพาะ'] }
    ];
    
    return packages.map(pkg => `
        <div class="col-lg-4">
            <div class="card h-100 shadow-sm ${pkg.popular ? 'border-primary' : ''}">
                ${pkg.popular ? '<div class="card-header bg-primary text-white text-center py-2"><small class="fw-bold">แนะนำ</small></div>' : ''}
                <div class="card-body text-center">
                    <h4 class="fw-bold mb-3">${pkg.name}</h4>
                    <div class="display-4 fw-bold text-primary mb-1">฿${pkg.price.toLocaleString()}</div>
                    <small class="text-muted">ต่อเดือน</small>
                    
                    <hr class="my-4">
                    
                    <ul class="list-unstyled text-start">
                        ${pkg.features.map(f => `
                            <li class="mb-2">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>${f}
                            </li>
                        `).join('')}
                    </ul>
                    
                    <button class="btn btn-${pkg.popular ? 'primary' : 'outline-primary'} w-100 mt-3" onclick="purchasePackage(${pkg.id})">
                        เลือกแพ็คเกจนี้
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function generatePaymentHistory() {
    const payments = [
        { id: 1, date: '1 มีนาคม 2026', package: 'Pro Package', amount: 2499, status: 'success', statusText: 'สำเร็จ' },
        { id: 2, date: '1 กุมภาพันธ์ 2026', package: 'Basic Package', amount: 999, status: 'success', statusText: 'สำเร็จ' },
        { id: 3, date: '1 มกราคม 2026', package: 'Pro Package', amount: 2499, status: 'success', statusText: 'สำเร็จ' },
    ];
    
    return payments.map(pay => `
        <tr>
            <td>${pay.date}</td>
            <td>${pay.package}</td>
            <td class="fw-bold">฿${pay.amount.toLocaleString()}</td>
            <td><span class="badge bg-success">${pay.statusText}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="downloadReceipt(${pay.id})">
                    <i class="bi bi-download"></i> ดาวน์โหลด
                </button>
            </td>
        </tr>
    `).join('');
}

// EMPLOYER: Company Profile
function loadEmployerCompanyProfile() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">ข้อมูลบริษัท</h5>
                    </div>
                    <div class="card-body">
                        <form id="companyForm">
                            <div class="row g-3">
                                <div class="col-12">
                                    <label class="form-label">ชื่อบริษัท</label>
                                    <input type="text" class="form-control" id="companyName" value="TechCorp Thailand Co., Ltd.">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">อีเมลบริษัท</label>
                                    <input type="email" class="form-control" id="companyEmail" value="contact@techcorp.co.th">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">เบอร์โทรศัพท์</label>
                                    <input type="tel" class="form-control" id="companyPhone" value="02-123-4567">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">เว็บไซต์</label>
                                    <input type="url" class="form-control" id="companyWebsite" value="https://techcorp.co.th">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">ประเภทธุรกิจ</label>
                                    <select class="form-select" id="companyType">
                                        <option selected>Technology</option>
                                        <option>Finance</option>
                                        <option>Healthcare</option>
                                        <option>Education</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">จำนวนพนักงาน</label>
                                    <select class="form-select" id="companySize">
                                        <option>1-10</option>
                                        <option selected>11-50</option>
                                        <option>51-200</option>
                                        <option>201-500</option>
                                        <option>500+</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">ปีที่ก่อตั้ง</label>
                                    <input type="number" class="form-control" id="companyFounded" value="2015">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">ที่อยู่</label>
                                    <textarea class="form-control" id="companyAddress" rows="3">123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</textarea>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">เกี่ยวกับบริษัท</label>
                                    <textarea class="form-control" id="companyDescription" rows="5">เราคือบริษัทเทคโนโลยีชั้นนำที่มุ่งเน้นการพัฒนาซอฟต์แวร์และแอพพลิเคชันสมัยใหม่</textarea>
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
                        <img src="https://ui-avatars.com/api/?name=TC&size=150&background=6366f1&color=fff" 
                             alt="Company Logo" class="rounded mb-3" width="150" height="150" id="companyLogoPreview">
                        <h6 class="fw-bold mb-3">โลโก้บริษัท</h6>
                        <input type="file" id="companyLogoInput" class="d-none" accept="image/*" onchange="handleCompanyLogoUpload(this)">
                        <button class="btn btn-outline-primary btn-sm w-100" onclick="$('#companyLogoInput').click()">
                            <i class="bi bi-upload"></i> เปลี่ยนโลโก้
                        </button>
                    </div>
                </div>

                <!-- Current Package -->
                <div class="card shadow-sm mb-4 border-primary">
                    <div class="card-header bg-primary text-white py-3">
                        <h6 class="mb-0 fw-bold">
                            <i class="bi bi-star-fill me-2"></i>แพ็คเกจปัจจุบัน
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="text-center mb-3">
                            <h4 class="fw-bold text-primary mb-2">Pro Package</h4>
                            <div class="h2 fw-bold text-primary mb-1">฿2,499</div>
                            <small class="text-muted">ต่อเดือน</small>
                        </div>
                        
                        <hr>
                        
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-2">
                                <small class="text-muted">วันเริ่มต้น</small>
                                <small class="fw-bold">1 มี��าคม 2026</small>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <small class="text-muted">วันหมดอายุ</small>
                                <small class="fw-bold">31 มีนาคม 2026</small>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <small class="text-muted">สถานะ</small>
                                <span class="badge bg-success">ใช้งานอยู่</span>
                            </div>
                        </div>
                        
                        <hr>
                        
                        <h6 class="fw-bold mb-3">สิทธิประโยชน์</h6>
                        <ul class="list-unstyled small">
                            <li class="mb-2">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>10 ตำแหน่งงาน
                            </li>
                            <li class="mb-2">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>โพสต์ได้ 30 วัน
                            </li>
                            <li class="mb-2">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>แสดงผลเด่น
                            </li>
                            <li class="mb-2">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>สถิติรายละเอียด
                            </li>
                            <li class="mb-2">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>ค้นหา Resume ได้
                            </li>
                        </ul>
                        
                        <div class="d-grid gap-2 mt-3">
                            <a href="dashboard.html?view=payments" class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-arrow-up-circle me-2"></i>อัพเกรดแพ็คเกจ
                            </a>
                            <button class="btn btn-outline-secondary btn-sm" onclick="viewPaymentHistory()">
                                <i class="bi bi-receipt me-2"></i>ประวัติการชำระเงิน
                            </button>
                        </div>
                        
                        <div class="alert alert-info mt-3 mb-0 small">
                            <i class="bi bi-info-circle me-2"></i>
                            <strong>เหลืออีก 24 วัน</strong> ก่อนแพ็คเกจหมดอายุ
                        </div>
                    </div>
                </div>

                <!-- Social Media -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h6 class="mb-0 fw-bold">โซเชียลมีเดีย</h6>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label small">Facebook</label>
                            <input type="url" class="form-control form-control-sm" placeholder="https://facebook.com/...">
                        </div>
                        <div class="mb-3">
                            <label class="form-label small">LinkedIn</label>
                            <input type="url" class="form-control form-control-sm" placeholder="https://linkedin.com/...">
                        </div>
                        <div class="mb-3">
                            <label class="form-label small">Twitter</label>
                            <input type="url" class="form-control form-control-sm" placeholder="https://twitter.com/...">
                        </div>
                    </div>
                </div>

                <!-- Save Button -->
                <button class="btn btn-primary w-100" onclick="saveCompanyProfile()">
                    <i class="bi bi-save"></i> บันทึกข้อมูล
                </button>
            </div>
        </div>
    `);
    
    translatePage();
}

// EMPLOYER: Settings
function loadEmployerSettings() {
    loadUserSettings(); // Use same settings as user
}

// ========================================
// EMPLOYER FUNCTIONS
// ========================================

function showPostJobModal() {
    const modalHtml = `
        <div class="modal fade" id="postJobModal" tabindex="-1">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-gradient border-0 text-white">
                        <h5 class="modal-title fw-bold">
                            <i class="bi bi-megaphone-fill me-2"></i>ประกาศงานใหม่
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form id="postJobForm">
                            <div class="row g-4">
                                <!-- แบบงาน -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-grid-3x3 text-primary me-2"></i>แบบงาน
                                    </label>
                                    <select class="form-select" id="jobPattern">
                                        <option value="">กรอกเลือกจากตัวอย่าง</option>
                                        <option value="office">งานออฟฟิศ</option>
                                        <option value="remote">งาน Remote</option>
                                        <option value="hybrid">งาน Hybrid</option>
                                        <option value="onsite">งาน Onsite</option>
                                    </select>
                                </div>

                                <!-- ตำแหน่ง -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-briefcase text-primary me-2"></i>ตำแหน่ง <span class="text-danger">*</span>
                                    </label>
                                    <select class="form-select" id="jobPosition" required>
                                        <option value="">เลือกตำแหน่งงาน</option>
                                        <option value="developer">นักพัฒนาซอฟต์แวร์</option>
                                        <option value="designer">นักออกแบบ</option>
                                        <option value="marketing">นักการตลาด</option>
                                        <option value="sales">พนักงานขาย</option>
                                        <option value="engineer">วิศวกร</option>
                                        <option value="accountant">นักบัญชี</option>
                                        <option value="hr">ฝ่ายทรัพยากรบุคคล</option>
                                        <option value="other">อื่นๆ</option>
                                    </select>
                                </div>

                                <!-- ชื่อประกาศ -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-text-left text-primary me-2"></i>ชื่อประกาศ
                                    </label>
                                    <input type="text" class="form-control" id="jobTitle" maxlength="100" 
                                           placeholder="กรอกชื่อประกาศงาน...">
                                    <div class="d-flex justify-content-between align-items-start mt-2">
                                        <div>
                                            <small class="text-muted">
                                                <i class="bi bi-info-circle text-danger me-1"></i>
                                                <strong>Note:</strong> ชื่อประกาศตรงตามงานจริง ทั้งนี้ผู้ใช้ต้นเจอนิเม่าค้นได้
                                            </small>
                                            <br>
                                            <small class="text-warning">
                                                <i class="bi bi-lightbulb-fill me-1"></i>
                                                <strong>Tip:</strong> ให้คำสำคัญง่ายต่อการค้นหาเพิ่มโอกาสค้นพบประกาศ
                                            </small>
                                        </div>
                                        <span class="badge bg-secondary" id="titleCounter">0/100 ตัวอักษร</span>
                                    </div>
                                </div>

                                <!-- ตำแหน่งจำกัดงวน -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-calendar-x text-primary me-2"></i>ตำแหน่งจำกัดงวน
                                    </label>
                                    <div class="d-flex gap-4 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="limitDuration" id="limitYes" value="yes">
                                            <label class="form-check-label" for="limitYes">
                                                ใช่ ❌
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="limitDuration" id="limitNo" value="no" checked>
                                            <label class="form-check-label" for="limitNo">
                                                ไม่ใช่ ⭕
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- ตำแหน่งจำกัดงานหีก (with NEW badge) -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-star text-primary me-2"></i>ตำแหน่งจำกัดงานพิเศษ
                                        <span class="badge bg-success ms-2">NEW</span>
                                    </label>
                                    <div class="form-check form-switch mt-2">
                                        <input class="form-check-input" type="checkbox" id="specialPosition" style="width: 50px; height: 25px;">
                                        <label class="form-check-label ms-2" for="specialPosition">
                                            เปิดใช้งาน
                                        </label>
                                    </div>
                                </div>

                                <!-- ประเภทงาน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-tag text-primary me-2"></i>ประเภทงาน
                                    </label>
                                    <div class="d-flex flex-wrap gap-3 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="jobType" id="fulltime" value="fulltime" checked>
                                            <label class="form-check-label" for="fulltime">
                                                งานประจำ ⭕
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="jobType" id="parttime" value="parttime">
                                            <label class="form-check-label" for="parttime">
                                                งานพาร์ทไทม์
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="jobType" id="freelance" value="freelance">
                                            <label class="form-check-label" for="freelance">
                                                ฟรีแลนซ์
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="jobType" id="temporary" value="temporary">
                                            <label class="form-check-label" for="temporary">
                                                ร่วมงานชั่วคราวและเป็นทีม
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- จำนวน -->
                                <div class="col-md-4">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-people text-primary me-2"></i>จำนวน
                                    </label>
                                    <select class="form-select" id="quantity">
                                        <option value="1" selected>1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20+</option>
                                    </select>
                                </div>

                                <!-- เพศ -->
                                <div class="col-md-4">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-gender-ambiguous text-primary me-2"></i>เพศ
                                    </label>
                                    <select class="form-select" id="gender">
                                        <option value="any" selected>ไม่ระบุเพศ</option>
                                        <option value="male">ชาย</option>
                                        <option value="female">หญิง</option>
                                    </select>
                                </div>

                                <!-- อายุ -->
                                <div class="col-md-4">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-calendar-range text-primary me-2"></i>อายุ
                                    </label>
                                    <select class="form-select" id="age">
                                        <option value="any" selected>ไม่ระบุอายุ</option>
                                        <option value="18-25">18-25 ปี</option>
                                        <option value="25-35">25-35 ปี</option>
                                        <option value="35-45">35-45 ปี</option>
                                        <option value="45+">45+ ปี</option>
                                    </select>
                                </div>

                                <!-- ประเภทเงินเดือน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-cash text-primary me-2"></i>ประเภทเงินเดือน
                                    </label>
                                    <div class="d-flex flex-wrap gap-3 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="salaryType" id="noSalary" value="no">
                                            <label class="form-check-label" for="noSalary">
                                                ไม่มี
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="salaryType" id="notSpecified" value="notspecified" checked>
                                            <label class="form-check-label" for="notSpecified">
                                                ไม่เจาะจงระบุพิมพ์ทั้ง ⭕
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="salaryType" id="negotiable" value="negotiable">
                                            <label class="form-check-label" for="negotiable">
                                                ระบบขั้งามารถ
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- การศึกษา -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-mortarboard text-primary me-2"></i>การศึกษา
                                    </label>
                                    <select class="form-select" id="education">
                                        <option value="">=== เลือกระดับการศึกษา ===</option>
                                        <option value="high-school">มัธยมศึกษา</option>
                                        <option value="vocational">ปวช./ปวส.</option>
                                        <option value="bachelor">ปริญญาตรี</option>
                                        <option value="master">ปริญญาโท</option>
                                        <option value="doctorate">ปริญญาเอก</option>
                                    </select>
                                </div>

                                <!-- ประสบการณ์ -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-award text-primary me-2"></i>ประสบการณ์
                                    </label>
                                    <select class="form-select" id="experience">
                                        <option value="0" selected>0</option>
                                        <option value="1">1 ปี</option>
                                        <option value="2">2 ปี</option>
                                        <option value="3">3 ปี</option>
                                        <option value="5">5 ปี</option>
                                        <option value="10">10+ ปี</option>
                                    </select>
                                </div>

                                <!-- ที่พักจ้างปัจจุบัน -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-building text-primary me-2"></i>ที่พักจ้างปัจจุบัน
                                    </label>
                                    <div class="d-flex gap-4 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="currentEmployment" id="anyEmployment" value="any" checked>
                                            <label class="form-check-label" for="anyEmployment">
                                                ไม่จำเพาะ ⭕
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="currentEmployment" id="noEmployment" value="no">
                                            <label class="form-check-label" for="noEmployment">
                                                ไม่มี
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- ที่พักจ้างหลายหัวที่ -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-buildings text-primary me-2"></i>ที่พักจ้างหลายหัวที่
                                    </label>
                                    <div class="d-flex gap-4 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="multiplePositions" id="anyMultiple" value="any" checked>
                                            <label class="form-check-label" for="anyMultiple">
                                                ไม่จำเพาะ ⭕
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="multiplePositions" id="noMultiple" value="no">
                                            <label class="form-check-label" for="noMultiple">
                                                ไม่มี
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- รายละเอียดงาน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-file-text text-primary me-2"></i>รายละเอียดงาน (Job Description)
                                    </label>
                                    <textarea class="form-control" id="jobDescription" rows="6" 
                                              placeholder="อธิบายรายละเอียดงาน หน้าที่ความรับผิดชอบ..."></textarea>
                                </div>

                                <!-- คุณสมบัติผู้สมัครงาน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-list-check text-primary me-2"></i>คุณสมบัติผู้สมัครงาน (Qualification)
                                    </label>
                                    <textarea class="form-control" id="qualification" rows="6" 
                                              placeholder="ระบุคุณสมบัติที่ต้องการ เช่น ทักษะ ความรู้ ประสบการณ์..."></textarea>
                                </div>

                                <!-- สวัสดิการ -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-gift text-primary me-2"></i>สวัสดิการ (Welfare)
                                    </label>
                                    <textarea class="form-control" id="welfare" rows="6" 
                                              placeholder="ระบุสวัสดิการที่บริษัทมอบให้ เช่น ประกันสุขภาพ โบนัส..."></textarea>
                                </div>

                                <!-- เงินเดือน -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-currency-dollar text-primary me-2"></i>เงินเดือน
                                    </label>
                                    <select class="form-select" id="salary">
                                        <option value="0-10000" selected>0 - 10,000</option>
                                        <option value="10000-20000">10,000 - 20,000</option>
                                        <option value="20000-30000">20,000 - 30,000</option>
                                        <option value="30000-40000">30,000 - 40,000</option>
                                        <option value="40000-50000">40,000 - 50,000</option>
                                        <option value="50000+">50,000+</option>
                                    </select>
                                </div>

                                <!-- ประเทศ -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-flag text-primary me-2"></i>ประเทศ
                                    </label>
                                    <select class="form-select" id="country">
                                        <option value="thailand" selected>ประเทศไทย</option>
                                        <option value="singapore">สิงคโปร์</option>
                                        <option value="japan">ญี่ปุ่น</option>
                                        <option value="usa">สหรัฐอเมริกา</option>
                                    </select>
                                </div>

                                <!-- สถานที่ปฏิบัติงาน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-geo-alt text-primary me-2"></i>สถานที่ปฏิบัติงาน
                                    </label>
                                    <select class="form-select" id="location">
                                        <option value="">===กรุณาเลือกจังหวัด===</option>
                                        <option value="bangkok">กรุงเทพมหานคร</option>
                                        <option value="chiang-mai">เชียงใหม่</option>
                                        <option value="phuket">ภูเก็ต</option>
                                        <option value="chonburi">ชลบุรี</option>
                                        <option value="nonthaburi">นนทบุรี</option>
                                        <option value="pathum-thani">ปทุมธานี</option>
                                        <option value="samut-prakan">สมุทรปรากา���</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-0 bg-light">
                        <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>ยกเลิก
                        </button>
                        <button type="button" class="btn btn-primary px-4" onclick="submitJob()">
                            <i class="bi bi-send-fill me-2"></i>ลงประกาศ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#postJobModal').remove();
    $('body').append(modalHtml);
    
    // Character counter for job title
    $('#jobTitle').on('input', function() {
        const length = $(this).val().length;
        $('#titleCounter').text(`${length}/100 ตัวอักษร`);
    });
    
    $('#postJobModal').modal('show');
}

function submitJob() {
    showNotification('ประกาศงานสำเร็จ!', 'success');
    $('#postJobModal').modal('hide');
    setTimeout(() => {
        loadEmployerJobs();
    }, 1000);
}

function viewApplicantDetail(id) {
    const modalHtml = `
        <div class="modal fade" id="applicantDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title fw-bold">รายละเอียดผู้สมัคร</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <img src="https://ui-avatars.com/api/?name=User&size=100&background=6366f1&color=fff" class="rounded-circle mb-3" width="100" height="100">
                            <h4 class="fw-bold">สมชาย ใจดี</h4>
                            <p class="text-muted">Frontend Developer • 5 ปีประสบการณ์</p>
                        </div>
                        
                        <div class="row g-3 mb-4">
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-envelope text-primary fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">อีเมล</small>
                                        <strong>somchai@email.com</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-phone text-success fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">เบอร์โทร</small>
                                        <strong>081-234-5678</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h6 class="fw-bold mb-3">ทักษะ</h6>
                        <div class="d-flex flex-wrap gap-2 mb-4">
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">React.js</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">Vue.js</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">TypeScript</span>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">Node.js</span>
                        </div>
                        
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary" onclick="downloadResume(${id})">
                                <i class="bi bi-download me-2"></i>ดาวน์โหลดเรซูเม่
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-danger" onclick="rejectApplicant(${id})">
                            <i class="bi bi-x-circle me-2"></i>ปฏิเสธ
                        </button>
                        <button type="button" class="btn btn-success" onclick="acceptApplicant(${id})">
                            <i class="bi bi-check-circle me-2"></i>อนุมัติ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#applicantDetailModal').remove();
    $('body').append(modalHtml);
    $('#applicantDetailModal').modal('show');
}

function acceptApplicant(id) {
    if (confirm('ยืนยันการอนุมัติผู้สมัครคนนี้?')) {
        showNotification('อนุมัติผู้สมัครสำเร็จ', 'success');
        $('#applicantDetailModal').modal('hide');
        setTimeout(() => {
            loadEmployerApplications();
        }, 1000);
    }
}

function rejectApplicant(id) {
    if (confirm('ยืนยันการปฏิเสธผู้สมัครคนนี้?')) {
        showNotification('ปฏิเสธผู้สมัครแล้ว', 'info');
        $('#applicantDetailModal').modal('hide');
        setTimeout(() => {
            loadEmployerApplications();
        }, 1000);
    }
}

function editJob(id) {
    showNotification('กำลั���เปิดหน้าแก้ไขงาน...', 'info');
}

function deleteJob(id) {
    if (confirm('ยืนยันการลบตำแหน่งงานนี้?')) {
        showNotification('ลบตำแหน่งงานสำเร็จ', 'success');
        setTimeout(() => {
            loadEmployerJobs();
        }, 1000);
    }
}

function viewJobStats(id) {
    showNotification('กำลังโหลดสถิติ...', 'info');
}

function purchasePackage(id) {
    showNotification('กำลังเปิดหน้าชำระเงิน...', 'info');
}

function downloadReceipt(id) {
    showNotification('กำลังดาวน์โหลดใบเสร็จ...', 'info');
}

// EMPLOYER: Announcements
function loadEmployerAnnouncements() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="mb-0 fw-bold"><i class="bi bi-megaphone me-2"></i>ข่าวสารจากระบบ</h5>
            </div>
            <div class="card-body p-0">
                ${generateEmployerAnnouncementsList()}
            </div>
        </div>
    `);
    
    translatePage();
}

function generateEmployerAnnouncementsList() {
    // Filter announcements for employers (target: 'employer' or 'all')
    const announcements = [
        { id: 1, title: 'การปรับปรุงเว็บไซต์', date: '5 มีนาคม 2026', content: 'เริ่มต้นการปรับปรุงเว็บไซต์เพื่อเพิ่มประสิทธิภาพและประสบการณ์การใช้งาน', priority: 'normal', isRead: false },
        { id: 2, title: 'โปรโมชั่นใหม่สำหรับนายจ้าง', date: '4 มีนาคม 2026', content: 'โปรโมชั่นใหม่สำหรับแพ็คเกจ Pro ลด 20% สำหรับ 1 เดือนแรก', priority: 'important', isRead: false },
        { id: 4, title: 'การปรับปรุงระบบชำระเงิน', date: '2 มีนาคม 2026', content: 'ปรับปรุงระบบชำระเงินเพื่อเพิ่มความปลอดภัยและประสิทธิภาพ', priority: 'normal', isRead: true },
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

function handleCompanyLogoUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            $('#companyLogoPreview').attr('src', e.target.result);
            showNotification('อัพโหลดโลโก้สำเร็จ', 'success');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function saveCompanyProfile() {
    showNotification('บันทึกข้อมูลบริษัทสำเร็จ!', 'success');
}

function filterByJob(jobId) {
    // Filter logic here
}

function filterByStatus(status) {
    if (status === 'all') {
        $('.applicant-item').show();
    } else {
        $('.applicant-item').hide();
        $(`.applicant-item[data-status="${status}"]`).show();
    }
}

function downloadResume(id) {
    showNotification('กำลังดาวน์โหลดเรซูเม่...', 'info');
}

function viewPaymentHistory() {
    window.location.href = 'dashboard.html?view=payments';
}