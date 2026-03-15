// ========================================
// ADMIN DASHBOARD - Complete Design
// ========================================

function loadAdminDashboard() {
    $('#dashboardTitle').attr('data-i18n', 'dashboard.admin.title').text('Dashboard - ผู้ดูแลระบบ');
    
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
            <a class="nav-link ${currentView === 'hotels' ? 'active' : ''}" href="dashboard.html?view=hotels">
                <i class="bi bi-building-fill-add"></i> <span>จัดการโรงแรมพันธมิตร</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'admins' ? 'active' : ''}" href="dashboard.html?view=admins">
                <i class="bi bi-shield-check"></i> <span data-i18n="dashboard.admin.admins">จัดการผู้ดูแลระบบ</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${currentView === 'announcements' ? 'active' : ''}" href="dashboard.html?view=announcements">
                <i class="bi bi-megaphone"></i> <span>แจ้งข่าวสาร</span>
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
            <a class="nav-link ${currentView === 'system-settings' ? 'active' : ''}" href="dashboard.html?view=system-settings">
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
        case 'hotels':
            loadAdminHotels();
            break;
        case 'admins':
            loadAdminManagement();
            break;
        case 'announcements':
            loadAdminAnnouncements();
            break;
        case 'payments':
            loadAdminPayments();
            break;
        case 'reports':
            loadAdminReports();
            break;
        case 'system-settings':
            loadAdminSystemSettings();
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
            <div class="col-lg-3 col-md-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                            <i class="bi bi-people fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">2,847</h4>
                            <small class="text-muted">ผู้ใช้ทั้งหมด</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-success bg-opacity-10 text-success rounded-3 p-3 me-3">
                            <i class="bi bi-building fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">156</h4>
                            <small class="text-muted">นายจ้าง</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-warning bg-opacity-10 text-warning rounded-3 p-3 me-3">
                            <i class="bi bi-briefcase fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">1,234</h4>
                            <small class="text-muted">ตำแหน่งงาน</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="stat-card bg-white rounded-3 shadow-sm p-4 h-100">
                    <div class="d-flex align-items-center">
                        <div class="stat-icon bg-info bg-opacity-10 text-info rounded-3 p-3 me-3">
                            <i class="bi bi-cash-stack fs-3"></i>
                        </div>
                        <div>
                            <h4 class="mb-0 fw-bold">฿245k</h4>
                            <small class="text-muted">รายได้เดือนนี้</small>
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
                        <h5 class="mb-0 fw-bold">สถิติผู้ใช้งาน (30 วันล่าสุด)</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="adminUsersChart" height="80"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">สัดส่วนผู้ใช้</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="adminUserTypeChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Revenue Chart -->
        <div class="row g-4 mb-4">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">รายได้ (12 เดือนล่าสุด)</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="adminRevenueChart" height="60"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="mb-0 fw-bold">กิจกรรมล่าสุด</h5>
            </div>
            <div class="card-body p-0">
                ${generateAdminRecentActivity()}
            </div>
        </div>
    `);
    
    initAdminCharts();
    translatePage();
}

function initAdminCharts() {
    // Users Chart
    const ctx1 = document.getElementById('adminUsersChart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: Array.from({length: 30}, (_, i) => `${i+1}`),
                datasets: [{
                    label: 'ผู้ใช้ใหม่',
                    data: Array.from({length: 30}, () => Math.floor(Math.random() * 50) + 20),
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
    
    // User Type Chart
    const ctx2 = document.getElementById('adminUserTypeChart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['ผู้ใช้ทั่วไป', 'นายจ้าง', 'แอดมิน'],
                datasets: [{
                    data: [2691, 156, 0],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b']
                }]
            }
        });
    }
    
    // Revenue Chart
    const ctx3 = document.getElementById('adminRevenueChart');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
                datasets: [{
                    label: 'รายได้ (บาท)',
                    data: [180000, 220000, 245000, 198000, 267000, 289000, 312000, 298000, 276000, 245000, 234000, 256000],
                    backgroundColor: '#10b981'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
}

function generateAdminRecentActivity() {
    const activities = [
        { icon: 'bi-person-plus', color: 'success', text: 'ผู้ใช้ใหม่สมัครสมาชิก', detail: 'สมชาย ใจดี', time: '5 นาทีที่แล้ว' },
        { icon: 'bi-briefcase', color: 'primary', text: 'มีงานใหม่ถูกประกาศ', detail: 'Senior Frontend Developer', time: '15 นาทีที่แล้ว' },
        { icon: 'bi-credit-card', color: 'info', text: 'มีการชำระเงิน', detail: 'Pro Package - ฿2,499', time: '1 ชั่วโมงที่แล้ว' },
        { icon: 'bi-building', color: 'warning', text: 'นายจ้างใหม่สมัครเข้าระบบ', detail: 'Tech Company Ltd.', time: '2 ชั่วโมงที่แล้ว' },
    ];
    
    return `
        <div class="list-group list-group-flush">
            ${activities.map(act => `
                <div class="list-group-item p-3">
                    <div class="d-flex align-items-start">
                        <div class="flex-shrink-0">
                            <div class="rounded-circle bg-${act.color} bg-opacity-10 text-${act.color} p-3">
                                <i class="bi ${act.icon} fs-5"></i>
                            </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <p class="mb-1">${act.text}</p>
                            <p class="mb-1 fw-bold text-muted small">${act.detail}</p>
                            <small class="text-muted">${act.time}</small>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ADMIN: Manage Users
function loadAdminUsers() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold">จัดการผู้ใช้ (2,847 คน)</h5>
                    </div>
                    <div class="col-auto">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="ค้นหาผู้ใช้..." onkeyup="searchUsers(this.value)">
                            <button class="btn btn-outline-secondary">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>ผู้ใช้</th>
                                <th>อีเมล</th>
                                <th>เบอร์โทร</th>
                                <th>วันที่สมัคร</th>
                                <th>สถานะ</th>
                                <th>การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminUsersList()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer bg-white border-top">
                <nav>
                    <ul class="pagination pagination-sm mb-0 justify-content-center">
                        <li class="page-item disabled"><a class="page-link" href="#">ก่อนหน้า</a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">ถัดไป</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    `);
    
    translatePage();
}

function generateAdminUsersList() {
    const users = [
        { id: 1, name: 'สมชาย ใจดี', email: 'somchai@email.com', phone: '081-234-5678', date: '5 มีนาคม 2026', status: 'active', statusText: 'ใช้งาน', statusClass: 'success' },
        { id: 2, name: 'สมหญิง รักดี', email: 'somying@email.com', phone: '082-345-6789', date: '4 มีนาคม 2026', status: 'active', statusText: 'ใช้งาน', statusClass: 'success' },
        { id: 3, name: 'ธนา ทำดี', email: 'thana@email.com', phone: '083-456-7890', date: '3 มีนาคม 2026', status: 'suspended', statusText: 'ระงับ', statusClass: 'danger' },
        { id: 4, name: 'วิชัย สู้ดี', email: 'wichai@email.com', phone: '084-567-8901', date: '2 มีนาคม 2026', status: 'active', statusText: 'ใช้งาน', statusClass: 'success' },
        { id: 5, name: 'มาลี ใจงาม', email: 'malee@email.com', phone: '085-678-9012', date: '1 มีนาคม 2026', status: 'active', statusText: 'ใช้งาน', statusClass: 'success' },
    ];
    
    return users.map(user => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random" 
                         class="rounded-circle me-2" width="40" height="40">
                    <strong>${user.name}</strong>
                </div>
            </td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.date}</td>
            <td><span class="badge bg-${user.statusClass}">${user.statusText}</span></td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary" onclick="viewUserDetail(${user.id})" title="ดู">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" onclick="editUser(${user.id})" title="แก้ไข">
                        <i class="bi bi-pencil"></i>
                    </button>
                    ${user.status === 'active' ? `
                        <button class="btn btn-sm btn-outline-danger" onclick="suspendUser(${user.id})" title="ระงับ">
                            <i class="bi bi-ban"></i>
                        </button>
                    ` : `
                        <button class="btn btn-sm btn-outline-success" onclick="activateUser(${user.id})" title="เปิดใช้">
                            <i class="bi bi-check-circle"></i>
                        </button>
                    `}
                </div>
            </td>
        </tr>
    `).join('');
}

// ADMIN: Manage Employers
function loadAdminEmployers() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold">จัดการนายจ้าง (156 บริษัท)</h5>
                    </div>
                    <div class="col-auto">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="ค้นหาบริษัท...">
                            <button class="btn btn-outline-secondary">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                ${generateAdminEmployersList()}
            </div>
        </div>
    `);
    
    translatePage();
}

function generateAdminEmployersList() {
    const employers = [
        { id: 1, name: 'TechCorp Thailand', logo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff', email: 'contact@techcorp.co.th', jobs: 15, date: '1 มกราคม 2026', status: 'active', statusText: 'ใช้งาน', statusClass: 'success', plan: 'Pro' },
        { id: 2, name: 'Creative Studio', logo: 'https://ui-avatars.com/api/?name=CS&background=10b981&color=fff', email: 'info@creative.com', jobs: 8, date: '15 มกราคม 2026', status: 'active', statusText: 'ใช้งาน', statusClass: 'success', plan: 'Basic' },
        { id: 3, name: 'Digital Agency', logo: 'https://ui-avatars.com/api/?name=DA&background=f59e0b&color=fff', email: 'hello@digital.com', jobs: 12, date: '20 กุมภาพันธ์ 2026', status: 'pending', statusText: 'รออนุมัติ', statusClass: 'warning', plan: 'Pro' },
    ];
    
    return `
        <div class="list-group list-group-flush">
            ${employers.map(emp => `
                <div class="list-group-item p-3 hover-shadow">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img src="${emp.logo}" alt="${emp.name}" class="rounded" width="56" height="56">
                        </div>
                        <div class="col">
                            <h6 class="mb-1 fw-bold">${emp.name}</h6>
                            <small class="text-muted d-block">
                                <i class="bi bi-envelope me-1"></i>${emp.email}
                            </small>
                            <small class="text-muted">
                                <i class="bi bi-briefcase me-1"></i>${emp.jobs} ตำแหน่ง
                                <span class="mx-2">•</span>
                                <span class="badge bg-primary bg-opacity-10 text-primary">${emp.plan}</span>
                            </small>
                        </div>
                        <div class="col-auto">
                            <span class="badge bg-${emp.statusClass} px-3 py-2">${emp.statusText}</span>
                        </div>
                        <div class="col-auto">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" onclick="viewEmployerDetail(${emp.id})">
                                    <i class="bi bi-eye"></i>
                                </button>
                                ${emp.status === 'pending' ? `
                                    <button class="btn btn-sm btn-outline-success" onclick="approveEmployer(${emp.id})">
                                        <i class="bi bi-check-circle"></i>
                                    </button>
                                ` : ''}
                                <button class="btn btn-sm btn-outline-danger" onclick="suspendEmployer(${emp.id})">
                                    <i class="bi bi-ban"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ADMIN: Manage Jobs
function loadAdminJobs() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold">จัดการงาน (1,234 ตำแหน่ง)</h5>
                    </div>
                    <div class="col-auto">
                        <select class="form-select form-select-sm" onchange="filterJobsByStatus(this.value)">
                            <option value="all">ทุกสถานะ</option>
                            <option value="pending">รออนุมัติ</option>
                            <option value="active">กำลังเปิดรับ</option>
                            <option value="closed">ปิดรับแล้ว</option>
                            <option value="rejected">ปฏิเสธ</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                ${generateAdminJobsList()}
            </div>
        </div>
    `);
    
    translatePage();
}

function generateAdminJobsList() {
    const jobs = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Thailand', logo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff', location: 'กรุงเทพฯ', salary: '50,000 - 80,000', type: 'Full-time', date: '5 มีนาคม 2026', status: 'pending', statusText: 'รออนุมัติ', statusClass: 'warning' },
        { id: 2, title: 'UX/UI Designer', company: 'Creative Studio', logo: 'https://ui-avatars.com/api/?name=CS&background=10b981&color=fff', location: 'กรุงเทพฯ', salary: '35,000 - 50,000', type: 'Full-time', date: '4 มีนาคม 2026', status: 'active', statusText: 'กำลังเปิดรับ', statusClass: 'success' },
        { id: 3, title: 'Marketing Manager', company: 'Digital Agency', logo: 'https://ui-avatars.com/api/?name=DA&background=f59e0b&color=fff', location: 'เชียงใหม่', salary: '45,000 - 60,000', type: 'Full-time', date: '3 มีนาคม 2026', status: 'active', statusText: 'กำลังเปิดรับ', statusClass: 'success' },
    ];
    
    return `
        <div class="list-group list-group-flush">
            ${jobs.map(job => `
                <div class="list-group-item p-3 hover-shadow job-item" data-status="${job.status}">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img src="${job.logo}" alt="${job.company}" class="rounded" width="56" height="56">
                        </div>
                        <div class="col">
                            <h6 class="mb-1 fw-bold">${job.title}</h6>
                            <small class="text-muted d-block">
                                <i class="bi bi-building me-1"></i>${job.company}
                            </small>
                            <small class="text-muted">
                                <i class="bi bi-geo-alt me-1"></i>${job.location}
                                <span class="mx-2">•</span>
                                <i class="bi bi-cash me-1"></i>${job.salary} บาท
                                <span class="mx-2">•</span>
                                <span class="badge bg-primary text-white">${job.type}</span>
                            </small>
                        </div>
                        <div class="col-auto">
                            <span class="badge bg-${job.statusClass} px-3 py-2">${job.statusText}</span>
                        </div>
                        <div class="col-auto">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" onclick="viewJobDetail(${job.id})">
                                    <i class="bi bi-eye"></i>
                                </button>
                                ${job.status === 'pending' ? `
                                    <button class="btn btn-sm btn-outline-success" onclick="approveJob(${job.id})">
                                        <i class="bi bi-check-circle"></i>
                                    </button>
                                ` : ''}
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteJobAdmin(${job.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ADMIN: Announcements
function loadAdminAnnouncements() {
    $('#dashboardContent').html(`
        <!-- Add New Announcement Button -->
        <div class="mb-4">
            <button class="btn btn-primary" onclick="showAddAnnouncementModal()">
                <i class="bi bi-plus-circle me-2"></i>สร้างข่าวสารใหม่
            </button>
        </div>

        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="mb-0 fw-bold">จัดการข่าวสาร</h5>
            </div>
            <div class="card-body p-0">
                ${generateAdminAnnouncementsList()}
            </div>
        </div>
    `);
    
    translatePage();
}

function generateAdminAnnouncementsList() {
    const announcements = [
        { id: 1, title: 'การปรับปรุงเว็บไซต์', date: '5 มีนาคม 2026', content: 'เริ่มต้นการปรับปรุงเว็บไซต์เพื่อเพิ่มประสิทธิภาพและประสบการณ์การใช้งาน', target: 'all', targetText: 'ทุกคน' },
        { id: 2, title: 'โปรโมชั่นใหม่สำหรับนายจ้าง', date: '4 มีนาคม 2026', content: 'โปรโมชั่นใหม่สำหรับแพ็คเกจ Pro ลด 20% สำหรับ 1 เดือนแรก', target: 'employer', targetText: 'นายจ้าง' },
        { id: 3, title: 'ฟีเจอร์ใหม่สำหรับผู้สมัครงาน', date: '3 มีนาคม 2026', content: 'เพิ่มฟีเจอร์การติดตามประวัติการสมัครงานของผู้ใช้', target: 'user', targetText: 'ผู้ใช้' },
        { id: 4, title: 'การปรับปรุงระบบชำระเงิน', date: '2 มีนาคม 2026', content: 'ปรับปรุงระบบชำระเงินเพื่อเพิ่มความปลอดภัยและประสิทธิภาพ', target: 'employer', targetText: 'นายจ้าง' },
        { id: 5, title: 'การปรับปรุงการแจ้งเตือน', date: '1 มีนาคม 2026', content: 'ปรับปรุงการแจ้งเตือนเพื่อให้ผู้ใช้ได้รับข้อมูลทันท่วงที', target: 'all', targetText: 'ทุกคน' },
    ];
    
    return `
        <div class="list-group list-group-flush">
            ${announcements.map(ann => `
                <div class="list-group-item p-3 hover-shadow">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <i class="bi bi-megaphone fs-4 text-primary"></i>
                        </div>
                        <div class="col">
                            <h6 class="mb-1 fw-bold">${ann.title}</h6>
                            <small class="text-muted d-block mb-1">
                                <i class="bi bi-calendar me-1"></i>${ann.date}
                                <span class="mx-2">•</span>
                                <i class="bi bi-people me-1"></i>ถึง: <span class="badge bg-info">${ann.targetText}</span>
                            </small>
                            <small class="text-muted">
                                ${ann.content}
                            </small>
                        </div>
                        <div class="col-auto">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" onclick="viewAnnouncementDetail(${ann.id})">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-warning" onclick="editAnnouncement(${ann.id})">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteAnnouncement(${ann.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ADMIN: Payments
function loadAdminPayments() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="stat-icon bg-success bg-opacity-10 text-success rounded-3 p-3 me-3">
                                <i class="bi bi-cash-stack fs-3"></i>
                            </div>
                            <div>
                                <h4 class="mb-0 fw-bold">฿245,000</h4>
                                <small class="text-muted">รายได้เดือนนี้</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="stat-icon bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                                <i class="bi bi-credit-card fs-3"></i>
                            </div>
                            <div>
                                <h4 class="mb-0 fw-bold">89</h4>
                                <small class="text-muted">ธุรกรรมเดือนนี้</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="stat-icon bg-warning bg-opacity-10 text-warning rounded-3 p-3 me-3">
                                <i class="bi bi-clock-history fs-3"></i>
                            </div>
                            <div>
                                <h4 class="mb-0 fw-bold">3</h4>
                                <small class="text-muted">รอการชำระ</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <h5 class="mb-0 fw-bold">ประวัติการชำระเงินทั้งหมด</h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>วันที่</th>
                                <th>บริษัท</th>
                                <th>แพ็คเกจ</th>
                                <th>จำนวนเงิน</th>
                                <th>สถานะ</th>
                                <th>การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateAdminPaymentsList()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    translatePage();
}

function generateAdminPaymentsList() {
    const payments = [
        { id: 1, date: '5 มีนาคม 2026', company: 'TechCorp Thailand', package: 'Pro Package', amount: 2499, status: 'success', statusText: 'สำเร็จ', statusClass: 'success' },
        { id: 2, date: '4 มีนาคม 2026', company: 'Creative Studio', package: 'Basic Package', amount: 999, status: 'success', statusText: 'สำเร็จ', statusClass: 'success' },
        { id: 3, date: '3 มีนาคม 2026', company: 'Digital Agency', package: 'Pro Package', amount: 2499, status: 'pending', statusText: 'รอชำระ', statusClass: 'warning' },
        { id: 4, date: '2 มีนาคม 2026', company: 'Startup Hub', package: 'Enterprise', amount: 4999, status: 'success', statusText: 'สำเร็จ', statusClass: 'success' },
    ];
    
    return payments.map(pay => `
        <tr>
            <td>${pay.date}</td>
            <td>${pay.company}</td>
            <td>${pay.package}</td>
            <td class="fw-bold text-success">฿${pay.amount.toLocaleString()}</td>
            <td><span class="badge bg-${pay.statusClass}">${pay.statusText}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewPaymentDetail(${pay.id})">
                    <i class="bi bi-eye"></i> ดู
                </button>
            </td>
        </tr>
    `).join('');
}

// ADMIN: Reports
function loadAdminReports() {
    $('#dashboardContent').html(`
        <div class="row g-4 mb-4">
            <div class="col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">ผู้ใช้งานรายเดือน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="reportUsersChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">ตำแหน่งงานรายเดือน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="reportJobsChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4 mb-4">
            <div class="col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">รายได้รายเดือน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="reportRevenueChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">แพ็คเกจยอดนิยม</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="reportPackagesChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold">สถิติโดยรวม</h5>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary" onclick="exportReport('pdf')">
                        <i class="bi bi-file-pdf me-1"></i>Export PDF
                    </button>
                    <button class="btn btn-sm btn-outline-success" onclick="exportReport('excel')">
                        <i class="bi bi-file-excel me-1"></i>Export Excel
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td class="fw-bold">จำนวนผู้ใช้ทั้งหมด</td>
                                <td class="text-end">2,847 คน</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">จำนวนนายจ้างทั้งหมด</td>
                                <td class="text-end">156 บริษัท</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">จำนวนตำแหน่งงานทั้งหมด</td>
                                <td class="text-end">1,234 ตำแหน่ง</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">รายได้ทั้งหมด</td>
                                <td class="text-end text-success fw-bold">฿2,450,000</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">อัตราการเติบโตผู้ใช้</td>
                                <td class="text-end text-success">+15.3%</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">อัตราการเติบโตรายได้</td>
                                <td class="text-end text-success">+23.7%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    initReportCharts();
    translatePage();
}

function initReportCharts() {
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'];
    
    // Users Chart
    const ctx1 = document.getElementById('reportUsersChart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'ผู้ใช้',
                    data: [320, 450, 520, 680, 750, 847],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            }
        });
    }
    
    // Jobs Chart
    const ctx2 = document.getElementById('reportJobsChart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'ตำแหน่งงาน',
                    data: [89, 120, 145, 178, 210, 234],
                    backgroundColor: '#10b981'
                }]
            }
        });
    }
    
    // Revenue Chart
    const ctx3 = document.getElementById('reportRevenueChart');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'รายได้ (บาท)',
                    data: [180000, 220000, 245000, 267000, 289000, 312000],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            }
        });
    }
    
    // Packages Chart
    const ctx4 = document.getElementById('reportPackagesChart');
    if (ctx4) {
        new Chart(ctx4, {
            type: 'doughnut',
            data: {
                labels: ['Basic', 'Pro', 'Enterprise'],
                datasets: [{
                    data: [45, 89, 22],
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
                }]
            }
        });
    }
}

// ADMIN: System Settings
function loadAdminSystemSettings() {
    $('#dashboardContent').html(`
        <div class="row">
            <div class="col-lg-8">
                <!-- General Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">การตั้งค่าทั่วไป</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">ชื่อเว็บไซต์</label>
                                <input type="text" class="form-control" value="JobHub">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">อีเมลติดต่อ</label>
                                <input type="email" class="form-control" value="contact@jobhub.com">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">เบอร์โทรติดต่อ</label>
                                <input type="tel" class="form-control" value="02-123-4567">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ที่อยู่</label>
                                <textarea class="form-control" rows="3">123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</textarea>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Email Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">การตั้งค่าอีเมล</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">SMTP Host</label>
                                <input type="text" class="form-control" value="smtp.gmail.com">
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">SMTP Port</label>
                                    <input type="number" class="form-control" value="587">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">SMTP Username</label>
                                    <input type="email" class="form-control" value="noreply@jobhub.com">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">SMTP Password</label>
                                <input type="password" class="form-control" value="********">
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Payment Settings -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h5 class="mb-0 fw-bold">การตั้งค่าการชำระเงิน</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="enablePayments" checked>
                            <label class="form-check-label" for="enablePayments">
                                เปิดใช้งานระบบชำระเงิน
                            </label>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">API Key</label>
                            <input type="text" class="form-control" value="pk_test_xxxxxxxxxxxxx">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Secret Key</label>
                            <input type="password" class="form-control" value="sk_test_xxxxxxxxxxxxx">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <!-- System Status -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h6 class="mb-0 fw-bold">สถานะระบบ</h6>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <span>Database</span>
                            <span class="badge bg-success">Online</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>API Server</span>
                            <span class="badge bg-success">Online</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Email Service</span>
                            <span class="badge bg-success">Online</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Payment Gateway</span>
                            <span class="badge bg-success">Online</span>
                        </div>
                    </div>
                </div>

                <!-- Maintenance Mode -->
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h6 class="mb-0 fw-bold">โหมดปิดปรับปรุง</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="maintenanceMode">
                            <label class="form-check-label" for="maintenanceMode">
                                เปิดโหมดปิดปรับปรุง
                            </label>
                        </div>
                        <small class="text-muted">เมื่อเปิดโหมดนี้ ผู้ใช้ทั่วไปจะไม่สามารถเข้าถึงเว็บไซต์ได้</small>
                    </div>
                </div>

                <!-- Save Button -->
                <button class="btn btn-primary w-100" onclick="saveSystemSettings()">
                    <i class="bi bi-save"></i> บันทึกการตั้งค่า
                </button>

                <!-- Clear Cache -->
                <button class="btn btn-outline-danger w-100 mt-2" onclick="clearSystemCache()">
                    <i class="bi bi-trash"></i> ล้าง Cache
                </button>
            </div>
        </div>
    `);
    
    translatePage();
}

// ========================================
// ADMIN FUNCTIONS
// ========================================

function viewUserDetail(id) {
    showNotification('กำลังโหลดข้อมูลผู้ใช้...', 'info');
}

function editUser(id) {
    showNotification('กำลังเปิดหน้าแก้ไขผู้ใช้...', 'info');
}

function suspendUser(id) {
    if (confirm('ยืนยันการระงับผู้ใช้คนนี้?')) {
        showNotification('ระงับผู้ใช้สำเร็จ', 'success');
        setTimeout(() => loadAdminUsers(), 1000);
    }
}

function activateUser(id) {
    if (confirm('ยืนยันการเปิดใช้งานผู้ใช้คนนี้?')) {
        showNotification('เปิดใช้งานผู้ใช้สำเร็จ', 'success');
        setTimeout(() => loadAdminUsers(), 1000);
    }
}

function viewEmployerDetail(id) {
    showNotification('กำลังโหลดข้อมูลนายจ้าง...', 'info');
}

function approveEmployer(id) {
    if (confirm('ยืนยันการอนุมัตินายจ้างนี้?')) {
        showNotification('อนุมัตินายจ้างสำเร็จ', 'success');
        setTimeout(() => loadAdminEmployers(), 1000);
    }
}

function suspendEmployer(id) {
    if (confirm('ยืนยันการระงับนายจ้างนี้?')) {
        showNotification('ระงับนายจ้างสำเร็จ', 'success');
        setTimeout(() => loadAdminEmployers(), 1000);
    }
}

function viewJobDetail(id) {
    window.open('job-detail.html?id=' + id, '_blank');
}

function approveJob(id) {
    if (confirm('ยืนยันการอนุมัติตำแหน่งงานนี้?')) {
        showNotification('อนุมัติตำแหน่งงานสำเร็จ', 'success');
        setTimeout(() => loadAdminJobs(), 1000);
    }
}

function deleteJobAdmin(id) {
    if (confirm('ยืนยันการลบตำแหน่งงานนี้?')) {
        showNotification('ลบตำแหน่งงานสำเร็จ', 'success');
        setTimeout(() => loadAdminJobs(), 1000);
    }
}

function filterJobsByStatus(status) {
    if (status === 'all') {
        $('.job-item').show();
    } else {
        $('.job-item').hide();
        $(`.job-item[data-status="${status}"]`).show();
    }
}

function viewPaymentDetail(id) {
    showNotification('กำลังโหลดรายละเอียดการชำระเงิน...', 'info');
}

function exportReport(format) {
    showNotification(`กำลัง export รายงานเป็น ${format.toUpperCase()}...`, 'info');
}

function saveSystemSettings() {
    showNotification('บันทึกการตั้งค่าระบบสำเร็จ!', 'success');
}

function clearSystemCache() {
    if (confirm('ยืนยันการล้าง Cache?')) {
        showNotification('ล้าง Cache สำเร็จ!', 'success');
    }
}

function searchUsers(query) {
    // Search logic here
}

// ========================================
// ADMIN ANNOUNCEMENT FUNCTIONS
// ========================================

function showAddAnnouncementModal() {
    const modalHtml = `
        <div class="modal fade" id="addAnnouncementModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">สร้างข่าวสารใหม่</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addAnnouncementForm">
                            <div class="mb-3">
                                <label class="form-label">หัวข้อข่าวสาร <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="announcementTitle" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">เนื้อหา <span class="text-danger">*</span></label>
                                <textarea class="form-control" id="announcementContent" rows="5" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ส่งถึง <span class="text-danger">*</span></label>
                                <select class="form-select" id="announcementTarget" required>
                                    <option value="">เลือกกลุ่มเป้าหมาย</option>
                                    <option value="all">ทุกคน</option>
                                    <option value="user">ผู้ใช้ (ผู้สมัครงาน)</option>
                                    <option value="employer">นายจ้าง (ผู้ประกาศงาน)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ความสำคัญ</label>
                                <select class="form-select" id="announcementPriority">
                                    <option value="normal">ปกติ</option>
                                    <option value="important">สำคัญ</option>
                                    <option value="urgent">เร่งด่วน</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="submitAnnouncement()">
                            <i class="bi bi-send me-2"></i>ส่งข่าวสาร
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    $('#addAnnouncementModal').remove();
    
    // Add modal to body
    $('body').append(modalHtml);
    
    // Show modal
    $('#addAnnouncementModal').modal('show');
}

function submitAnnouncement() {
    const title = $('#announcementTitle').val();
    const content = $('#announcementContent').val();
    const target = $('#announcementTarget').val();
    const priority = $('#announcementPriority').val();
    
    if (!title || !content || !target) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    showNotification('กำลังส่งข่าวสาร...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('ส่งข่าวสารสำเร็จ!', 'success');
        $('#addAnnouncementModal').modal('hide');
        setTimeout(() => loadAdminAnnouncements(), 500);
    }, 1500);
}

function viewAnnouncementDetail(id) {
    // Mock data สำหรับข่าวสาร (ในการใช้งานจริงจะดึงจาก Backend API)
    const announcementsData = {
        1: { id: 1, title: 'การปรับปรุงเว็บไซต์', date: '5 มีนาคม 2026', content: 'เริ่มต้นการปรับปรุงเว็บไซต์เพื่อเพิ่มประสิทธิภาพและประสบการณ์การใช้งาน', target: 'all', priority: 'normal' },
        2: { id: 2, title: 'โปรโมชั่นใหม่สำหรับนายจ้าง', date: '4 มีนาคม 2026', content: 'โปรโมชั่นใหม่สำหรับแพ็คเกจ Pro ลด 20% สำหรับ 1 เดือนแรก', target: 'employer', priority: 'important' },
        3: { id: 3, title: 'ฟีเจอร์ใหม่สำหรับผู้สมัครงาน', date: '3 มีนาคม 2026', content: 'เพิ่มฟีเจอร์การติดตามประวัติการสมัครงานของผู้ใช้', target: 'user', priority: 'important' },
        4: { id: 4, title: 'การปรับปรุงระบบชำระเงิน', date: '2 มีนาคม 2026', content: 'ปรับปรุงระบบชำระเงินเพื่อเพิ่มความปลอดภัยและประสิทธิภาพ', target: 'employer', priority: 'normal' },
        5: { id: 5, title: 'การปรับปรุงการแจ้งเตือน', date: '1 มีนาคม 2026', content: 'ปรับปรุงการแจ้งเตือนเพื่อให้ผู้ใช้ได้รับข้อมูลทันท่วงที', target: 'all', priority: 'normal' },
    };
    
    const announcement = announcementsData[id];
    if (!announcement) {
        showNotification('ไม่พบข่าวสารที่ต้องการ', 'error');
        return;
    }
    
    const targetText = announcement.target === 'all' ? 'ทุกคน' : announcement.target === 'user' ? 'ผู้ใช้' : 'นายจ้าง';
    const priorityText = announcement.priority === 'urgent' ? 'เร่งด่วน' : announcement.priority === 'important' ? 'สำคัญ' : 'ปกติ';
    const priorityClass = announcement.priority === 'urgent' ? 'danger' : announcement.priority === 'important' ? 'warning' : 'info';
    
    const modalHtml = `
        <div class="modal fade" id="viewAnnouncementModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">รายละเอียดข่าวสาร</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label text-muted">หัวข้อข่าวสาร</label>
                            <h5 class="fw-bold">${announcement.title}</h5>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">เนื้อหา</label>
                            <p class="mb-0">${announcement.content}</p>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label class="form-label text-muted">วันที่</label>
                                <p class="mb-0"><i class="bi bi-calendar3 me-2"></i>${announcement.date}</p>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-muted">ส่งถึง</label>
                                <p class="mb-0"><i class="bi bi-people me-2"></i><span class="badge bg-info">${targetText}</span></p>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted">ความสำคัญ</label>
                            <p class="mb-0"><span class="badge bg-${priorityClass}">${priorityText}</span></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                        <button type="button" class="btn btn-warning" onclick="$('#viewAnnouncementModal').modal('hide'); editAnnouncement(${id});">
                            <i class="bi bi-pencil me-2"></i>แก้ไข
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    $('#viewAnnouncementModal').remove();
    
    // Add modal to body
    $('body').append(modalHtml);
    
    // Show modal
    $('#viewAnnouncementModal').modal('show');
}

function editAnnouncement(id) {
    // Mock data สำหรับข่าวสาร (ในการใช้งานจริงจะดึงจาก Backend API)
    const announcementsData = {
        1: { id: 1, title: 'การปรับปรุงเว็บไซต์', date: '5 มีนาคม 2026', content: 'เริ่มต้นการปรับปรุงเว็บไซต์เพื่อเพิ่มประสิทธิภาพและประสบการณ์การใช้งาน', target: 'all', priority: 'normal' },
        2: { id: 2, title: 'โปรโมชั่นใหม่สำหรับนายจ้าง', date: '4 มีนาคม 2026', content: 'โปรโมชั่นใหม่สำหรับแพ็คเกจ Pro ลด 20% สำหรับ 1 เดือนแรก', target: 'employer', priority: 'important' },
        3: { id: 3, title: 'ฟีเจอร์ใหม่สำหรับผู้สมัครงาน', date: '3 มีนาคม 2026', content: 'เพิ่มฟีเจอร์การติดตามประวัติการสมัครงานของผู้ใช้', target: 'user', priority: 'important' },
        4: { id: 4, title: 'การปรับปรุงระบบชำระเงิน', date: '2 มีนาคม 2026', content: 'ปรับปรุงระบบชำระเงินเพื่อเพิ่มความปลอดภัยและประสิทธิภาพ', target: 'employer', priority: 'normal' },
        5: { id: 5, title: 'การปรับปรุงการแจ้งเตือน', date: '1 มีนาคม 2026', content: 'ปรับปรุงการแจ้งเตือนเพื่อให้ผู้ใช้ได้รับข้อมูลทันท่วงที', target: 'all', priority: 'normal' },
    };
    
    const announcement = announcementsData[id];
    if (!announcement) {
        showNotification('ไม่พบข่าวสารที่ต้องการ', 'error');
        return;
    }
    
    const modalHtml = `
        <div class="modal fade" id="editAnnouncementModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">แก้ไขข่าวสาร</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editAnnouncementForm">
                            <input type="hidden" id="editAnnouncementId" value="${announcement.id}">
                            <div class="mb-3">
                                <label class="form-label">หัวข้อข่าวสาร <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="editAnnouncementTitle" value="${announcement.title}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">เนื้อหา <span class="text-danger">*</span></label>
                                <textarea class="form-control" id="editAnnouncementContent" rows="5" required>${announcement.content}</textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ส่งถึง <span class="text-danger">*</span></label>
                                <select class="form-select" id="editAnnouncementTarget" required>
                                    <option value="all" ${announcement.target === 'all' ? 'selected' : ''}>ทุกคน</option>
                                    <option value="user" ${announcement.target === 'user' ? 'selected' : ''}>ผู้ใช้ (ผู้สมัครงาน)</option>
                                    <option value="employer" ${announcement.target === 'employer' ? 'selected' : ''}>นายจ้าง (ผู้ประกาศงาน)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ความสำคัญ</label>
                                <select class="form-select" id="editAnnouncementPriority">
                                    <option value="normal" ${announcement.priority === 'normal' ? 'selected' : ''}>ปกติ</option>
                                    <option value="important" ${announcement.priority === 'important' ? 'selected' : ''}>สำคัญ</option>
                                    <option value="urgent" ${announcement.priority === 'urgent' ? 'selected' : ''}>เร่งด่วน</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="updateAnnouncement()">
                            <i class="bi bi-save me-2"></i>บันทึกการแก้ไข
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    $('#editAnnouncementModal').remove();
    
    // Add modal to body
    $('body').append(modalHtml);
    
    // Show modal
    $('#editAnnouncementModal').modal('show');
}

function updateAnnouncement() {
    const id = $('#editAnnouncementId').val();
    const title = $('#editAnnouncementTitle').val();
    const content = $('#editAnnouncementContent').val();
    const target = $('#editAnnouncementTarget').val();
    const priority = $('#editAnnouncementPriority').val();
    
    if (!title || !content || !target) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    showNotification('กำลังบันทึกการแก้ไข...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('บันทึกการแก้ไขสำเร็จ!', 'success');
        $('#editAnnouncementModal').modal('hide');
        setTimeout(() => loadAdminAnnouncements(), 500);
    }, 1500);
}

function deleteAnnouncement(id) {
    if (confirm('ยืนยันการลบข่าวสารนี้?')) {
        showNotification('ลบข่าวสารสำเร็จ', 'success');
        setTimeout(() => loadAdminAnnouncements(), 1000);
    }
}