// ========================================
// Dashboard JavaScript
// ========================================

let currentUser = null;

$(document).ready(function() {
    // Check if user is logged in
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = getCurrentUser();
    
    // Update user info
    updateUserInfo();
    
    // Load dashboard based on role
    loadDashboard();
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
// User Dashboard
// ========================================
function loadUserDashboard() {
    $('#dashboardTitle').text('Dashboard - ผู้ใช้งาน');
    
    // Load menu
    $('#dashboardMenu').html(`
        <li class="nav-item">
            <a class="nav-link active" href="#" data-section="overview">
                <i class="bi bi-speedometer2"></i> ภาพรวม
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="my-applications">
                <i class="bi bi-file-earmark-text"></i> ใบสมัครของฉัน
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="saved-jobs">
                <i class="bi bi-bookmark"></i> งานที่บันทึก
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="profile">
                <i class="bi bi-person"></i> โปรไฟล์
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="jobs.html">
                <i class="bi bi-search"></i> ค้นหางาน
            </a>
        </li>
    `);
    
    // Load overview
    loadUserOverview();
    
    // Setup menu handlers
    setupMenuHandlers();
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
                            <small class="text-muted">ใบสมัครทั้งหมด</small>
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
                            <small class="text-muted">ได้รับการตอบรับ</small>
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
                            <small class="text-muted">รอการตอบกลับ</small>
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
                            <small class="text-muted">งานที่บันทึก</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold">ใบสมัครล่าสุด</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ตำแหน่ง</th>
                                        <th>บริษัท</th>
                                        <th>วันที่สมัคร</th>
                                        <th>สถานะ</th>
                                        <th>การดำเนินการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Frontend Developer</strong></td>
                                        <td>Tech Startup Co.</td>
                                        <td>1 มี.ค. 2026</td>
                                        <td><span class="badge bg-warning">รอการตอบกลับ</span></td>
                                        <td><a href="#" class="btn btn-sm btn-outline-primary">ดูรายละเอียด</a></td>
                                    </tr>
                                    <tr>
                                        <td><strong>UX/UI Designer</strong></td>
                                        <td>Creative Agency</td>
                                        <td>28 ก.พ. 2026</td>
                                        <td><span class="badge bg-success">ได้รับการตอบรับ</span></td>
                                        <td><a href="#" class="btn btn-sm btn-outline-primary">ดูรายละเอียด</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
}

// ========================================
// Employer Dashboard
// ========================================
function loadEmployerDashboard() {
    $('#dashboardTitle').text('Dashboard - นายจ้าง');
    
    $('#dashboardMenu').html(`
        <li class="nav-item">
            <a class="nav-link active" href="#" data-section="overview">
                <i class="bi bi-speedometer2"></i> ภาพรวม
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="my-jobs">
                <i class="bi bi-briefcase"></i> งานของฉัน
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="applications">
                <i class="bi bi-file-earmark-text"></i> ใบสมัครทั้งหมด
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="payments">
                <i class="bi bi-credit-card"></i> การชำระเงิน
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="post-job.html">
                <i class="bi bi-plus-circle"></i> ประกาศงานใหม่
            </a>
        </li>
    `);
    
    loadEmployerOverview();
    setupMenuHandlers();
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
                            <small class="text-muted">งานที่เปิดรับ</small>
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
                            <small class="text-muted">ผู้สมัครทั้งหมด</small>
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
                            <small class="text-muted">รอการตรวจสอบ</small>
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
                            <small class="text-muted">จำนวนการดู</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold">งานของคุณ</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ตำแหน่ง</th>
                                        <th>ผู้สมัคร</th>
                                        <th>สถานะ</th>
                                        <th>การดำเนินการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Frontend Developer</strong></td>
                                        <td>15</td>
                                        <td><span class="badge bg-success">เปิดรับสมัคร</span></td>
                                        <td>
                                            <a href="#" class="btn btn-sm btn-outline-primary">ดู</a>
                                            <a href="#" class="btn btn-sm btn-outline-secondary">แก้ไข</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold">สถิติรายเดือน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="monthlyChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    // Create chart
    createMonthlyChart();
}

// ========================================
// Admin Dashboard
// ========================================
function loadAdminDashboard() {
    $('#dashboardTitle').text('Dashboard - ผู้ดูแลระบบ');
    
    $('#dashboardMenu').html(`
        <li class="nav-item">
            <a class="nav-link active" href="#" data-section="overview">
                <i class="bi bi-speedometer2"></i> ภาพรวม
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="users">
                <i class="bi bi-people"></i> จัดการผู้ใช้
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="jobs">
                <i class="bi bi-briefcase"></i> จัดการงาน
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="payments">
                <i class="bi bi-credit-card"></i> การชำระเงิน
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="reports">
                <i class="bi bi-graph-up"></i> รายงาน
            </a>
        </li>
    `);
    
    loadAdminOverview();
    setupMenuHandlers();
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
                            <small class="text-muted">ผู้ใช้ทั้งหมด</small>
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
                            <small class="text-muted">งานทั้งหมด</small>
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
                            <small class="text-muted">รายได้ (บาท)</small>
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
                            <small class="text-muted">นายจ้าง</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold">สถิติรายเดือน</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="adminChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0 fw-bold">กิจกรรมล่าสุด</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mb-0">
                            <li class="mb-3">
                                <small class="text-muted">5 นาทีที่แล้ว</small>
                                <p class="mb-0">ผู้ใช้ใหม่ลงทะเบียน</p>
                            </li>
                            <li class="mb-3">
                                <small class="text-muted">15 นาทีที่แล้ว</small>
                                <p class="mb-0">ประกาศงานใหม่</p>
                            </li>
                            <li class="mb-3">
                                <small class="text-muted">1 ชั่วโมงที่แล้ว</small>
                                <p class="mb-0">การชำระเงินสำเร็จ</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    createAdminChart();
}

// Setup menu handlers
function setupMenuHandlers() {
    $('.sidebar .nav-link').on('click', function(e) {
        if (!$(this).attr('href').startsWith('#')) return;
        
        e.preventDefault();
        
        $('.sidebar .nav-link').removeClass('active');
        $(this).addClass('active');
        
        const section = $(this).data('section');
        loadSection(section);
    });
}

// Load section
function loadSection(section) {
    // In production, load different sections here
    console.log('Loading section:', section);
}

// Create monthly chart
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

// Create admin chart
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
