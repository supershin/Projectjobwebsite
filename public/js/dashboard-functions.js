// ========================================
// Quick Fix: Add improved translations & functions
// ========================================

// เพิ่ม translations สำหรับ menu
if (typeof translations !== 'undefined') {
    translations.th = translations.th || {};
    translations.th.dashboard = translations.th.dashboard || {};
    translations.th.dashboard.employer = translations.th.dashboard.employer || {};
    translations.th.dashboard.employer['post-new-job'] = 'ประกาศงานใหม่';
    
    translations.en = translations.en || {};
    translations.en.dashboard = translations.en.dashboard || {};
    translations.en.dashboard.employer = translations.en.dashboard.employer || {};
    translations.en.dashboard.employer['post-new-job'] = 'Post New Job';
}

// Fix Employer Tab Colors
$(document).ready(function() {
    // เพิ่ม CSS สำหรับ Tabs
    if ($('#jobsTabs').length) {
        $('<style>')
            .text(`
                #jobsTabs .nav-link {
                    color: #495057 !important;
                    background-color: transparent;
                    border-color: transparent;
                }
                #jobsTabs .nav-link:hover {
                    color: #0d6efd !important;
                    border-color: transparent;
                }
                #jobsTabs .nav-link.active {
                    color: #0d6efd !important;
                    background-color: #fff !important;
                    border-color: #dee2e6 #dee2e6 #fff !important;
                }
            `)
            .appendTo('head');
    }
});

// ===========================================
// ADMIN: View & Edit Functions
// ===========================================

function viewUserDetail(id) {
    const users = {
        1: { name: 'สมชาย ใจดี', email: 'somchai@email.com', phone: '081-234-5678', date: '5 มีนาคม 2026', status: 'active', applications: 12 },
        2: { name: 'สมหญิง รักดี', email: 'somying@email.com', phone: '082-345-6789', date: '4 มีนาคม 2026', status: 'active', applications: 8 },
    };
    
    const user = users[id] || users[1];
    
    const modalHtml = `
        <div class="modal fade" id="userDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">รายละเอียดผู้ใช้</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=100&background=6366f1&color=fff" 
                                 class="rounded-circle mb-3" width="100" height="100">
                            <h4 class="fw-bold">${user.name}</h4>
                            <span class="badge bg-${user.status === 'active' ? 'success' : 'danger'}">${user.status === 'active' ? 'ใช้งาน' : 'ระงับ'}</span>
                        </div>
                        
                        <div class="row g-3 mb-4">
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-envelope text-primary fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">อีเมล</small>
                                        <strong>${user.email}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-phone text-success fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">เบอร์โทร</small>
                                        <strong>${user.phone}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-calendar text-info fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">วันที่สมัคร</small>
                                        <strong>${user.date}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-file-earmark text-warning fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">ใบสมัคร</small>
                                        <strong>${user.applications} รายการ</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                        <button type="button" class="btn btn-primary" onclick="$('#userDetailModal').modal('hide'); editUser(${id})">แก้ไข</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#userDetailModal').remove();
    $('body').append(modalHtml);
    $('#userDetailModal').modal('show');
}

function editUser(id) {
    const users = {
        1: { name: 'สมชาย ใจดี', email: 'somchai@email.com', phone: '081-234-5678', status: 'active' },
        2: { name: 'สมหญิง รักดี', email: 'somying@email.com', phone: '082-345-6789', status: 'active' },
    };
    
    const user = users[id] || users[1];
    
    const modalHtml = `
        <div class="modal fade" id="editUserModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">แก้ไขผู้ใช้</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editUserForm">
                            <div class="mb-3">
                                <label class="form-label">ชื่อ-นามสกุล</label>
                                <input type="text" class="form-control" id="editUserName" value="${user.name}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">อีเมล</label>
                                <input type="email" class="form-control" id="editUserEmail" value="${user.email}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">เบอร์โทร</label>
                                <input type="tel" class="form-control" id="editUserPhone" value="${user.phone}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">สถานะ</label>
                                <select class="form-select" id="editUserStatus">
                                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>ใช้งาน</option>
                                    <option value="suspended" ${user.status === 'suspended' ? 'selected' : ''}>ระงับ</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="saveUserEdit(${id})">บันทึก</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#editUserModal').remove();
    $('body').append(modalHtml);
    $('#editUserModal').modal('show');
}

function saveUserEdit(id) {
    const name = $('#editUserName').val();
    const email = $('#editUserEmail').val();
    const phone = $('#editUserPhone').val();
    const status = $('#editUserStatus').val();
    
    if (!name || !email || !phone) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    showNotification('บันทึกข้อมูลผู้ใช้สำเร็จ!', 'success');
    $('#editUserModal').modal('hide');
    setTimeout(() => {
        if (typeof loadAdminUsers === 'function') loadAdminUsers();
    }, 1000);
}

function viewEmployerDetail(id) {
    const employers = {
        1: { name: 'TechCorp Thailand', logo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff', email: 'contact@techcorp.co.th', phone: '02-123-4567', jobs: 15, plan: 'Pro', status: 'active', date: '1 มกราคม 2026' },
    };
    
    const emp = employers[id] || employers[1];
    
    const modalHtml = `
        <div class="modal fade" id="employerDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">รายละเอียดนายจ้าง</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex align-items-start mb-4">
                            <img src="${emp.logo}" alt="${emp.name}" class="rounded me-3" width="80" height="80">
                            <div>
                                <h4 class="fw-bold mb-2">${emp.name}</h4>
                                <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">${emp.plan} Plan</span>
                                <span class="badge bg-success ms-2">${emp.status === 'active' ? 'ใช้งาน' : 'รออนุมัติ'}</span>
                            </div>
                        </div>
                        
                        <div class="row g-3 mb-4">
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-envelope text-primary fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">อีเมล</small>
                                        <strong>${emp.email}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-phone text-success fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">เบอร์โทร</small>
                                        <strong>${emp.phone}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-briefcase text-warning fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">จำนวนงาน</small>
                                        <strong>${emp.jobs} ตำแหน่ง</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-calendar text-info fs-5 me-2"></i>
                                    <div>
                                        <small class="text-muted d-block">วันที่สมัคร</small>
                                        <strong>${emp.date}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                        <button type="button" class="btn btn-primary" onclick="$('#employerDetailModal').modal('hide'); editEmployer(${id})">แก้ไข</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#employerDetailModal').remove();
    $('body').append(modalHtml);
    $('#employerDetailModal').modal('show');
}

function editEmployer(id) {
    const employers = {
        1: { name: 'TechCorp Thailand', email: 'contact@techcorp.co.th', phone: '02-123-4567', plan: 'Pro', status: 'active' },
    };
    
    const emp = employers[id] || employers[1];
    
    const modalHtml = `
        <div class="modal fade" id="editEmployerModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">แก้ไขนายจ้าง</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editEmployerForm">
                            <div class="mb-3">
                                <label class="form-label">ชื่อบริษัท</label>
                                <input type="text" class="form-control" id="editEmpName" value="${emp.name}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">อีเมล</label>
                                <input type="email" class="form-control" id="editEmpEmail" value="${emp.email}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">เบอร์โทร</label>
                                <input type="tel" class="form-control" id="editEmpPhone" value="${emp.phone}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">แพ็คเกจ</label>
                                <select class="form-select" id="editEmpPlan">
                                    <option value="Basic" ${emp.plan === 'Basic' ? 'selected' : ''}>Basic</option>
                                    <option value="Pro" ${emp.plan === 'Pro' ? 'selected' : ''}>Pro</option>
                                    <option value="Enterprise" ${emp.plan === 'Enterprise' ? 'selected' : ''}>Enterprise</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">สถานะ</label>
                                <select class="form-select" id="editEmpStatus">
                                    <option value="active" ${emp.status === 'active' ? 'selected' : ''}>ใช้งาน</option>
                                    <option value="pending" ${emp.status === 'pending' ? 'selected' : ''}>รออนุมัติ</option>
                                    <option value="suspended" ${emp.status === 'suspended' ? 'selected' : ''}>ระงับ</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="saveEmployerEdit(${id})">บันทึก</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#editEmployerModal').remove();
    $('body').append(modalHtml);
    $('#editEmployerModal').modal('show');
}

function saveEmployerEdit(id) {
    const name = $('#editEmpName').val();
    const email = $('#editEmpEmail').val();
    const phone = $('#editEmpPhone').val();
    
    if (!name || !email || !phone) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    showNotification('บันทึกข้อมูลนายจ้างสำเร็จ!', 'success');
    $('#editEmployerModal').modal('hide');
    setTimeout(() => {
        if (typeof loadAdminEmployers === 'function') loadAdminEmployers();
    }, 1000);
}

function editJobAdmin(id) {
    const jobs = {
        1: { title: 'Senior Frontend Developer', company: 'TechCorp Thailand', location: 'กรุงเทพฯ', salary: '50,000 - 80,000', type: 'Full-time', status: 'pending' },
    };
    
    const job = jobs[id] || jobs[1];
    
    const modalHtml = `
        <div class="modal fade" id="editJobModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">แก้ไขงาน</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editJobForm">
                            <div class="row g-3">
                                <div class="col-md-8">
                                    <label class="form-label">ตำแหน่งงาน</label>
                                    <input type="text" class="form-control" id="editJobTitle" value="${job.title}">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">ประเภท</label>
                                    <select class="form-select" id="editJobType">
                                        <option value="Full-time" ${job.type === 'Full-time' ? 'selected' : ''}>Full-time</option>
                                        <option value="Part-time" ${job.type === 'Part-time' ? 'selected' : ''}>Part-time</option>
                                        <option value="Contract" ${job.type === 'Contract' ? 'selected' : ''}>Contract</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">สถานที่</label>
                                    <input type="text" class="form-control" id="editJobLocation" value="${job.location}">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">เงินเดือน</label>
                                    <input type="text" class="form-control" id="editJobSalary" value="${job.salary}">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">สถานะ</label>
                                    <select class="form-select" id="editJobStatus">
                                        <option value="pending" ${job.status === 'pending' ? 'selected' : ''}>รออนุมัติ</option>
                                        <option value="active" ${job.status === 'active' ? 'selected' : ''}>กำลังเปิดรับ</option>
                                        <option value="closed" ${job.status === 'closed' ? 'selected' : ''}>ปิดรับแล้ว</option>
                                        <option value="rejected" ${job.status === 'rejected' ? 'selected' : ''}>ปฏิเสธ</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="saveJobEdit(${id})">บันทึก</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#editJobModal').remove();
    $('body').append(modalHtml);
    $('#editJobModal').modal('show');
}

function saveJobEdit(id) {
    const title = $('#editJobTitle').val();
    const location = $('#editJobLocation').val();
    
    if (!title || !location) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    showNotification('บันทึกข้อมูลงานสำเร็จ!', 'success');
    $('#editJobModal').modal('hide');
    setTimeout(() => {
        if (typeof loadAdminJobs === 'function') loadAdminJobs();
    }, 1000);
}

// ===========================================
// EMPLOYER: View & Edit Functions
// ===========================================

function editJob(id) {
    showNotification('กำลังเปิดหน้าแก้ไขงาน...', 'info');
    // TODO: Implement full edit form
    editJobAdmin(id);
}

function viewJobStats(id) {
    const modalHtml = `
        <div class="modal fade" id="jobStatsModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">สถิติงาน</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-4 mb-4">
                            <div class="col-md-3">
                                <div class="text-center p-3 bg-primary bg-opacity-10 rounded">
                                    <h3 class="fw-bold text-primary mb-0">320</h3>
                                    <small class="text-muted">การดู</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="text-center p-3 bg-success bg-opacity-10 rounded">
                                    <h3 class="fw-bold text-success mb-0">45</h3>
                                    <small class="text-muted">ใบสมัคร</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="text-center p-3 bg-warning bg-opacity-10 rounded">
                                    <h3 class="fw-bold text-warning mb-0">12</h3>
                                    <small class="text-muted">รอตรวจสอบ</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="text-center p-3 bg-info bg-opacity-10 rounded">
                                    <h3 class="fw-bold text-info mb-0">8</h3>
                                    <small class="text-muted">อนุมัติ</small>
                                </div>
                            </div>
                        </div>
                        <canvas id="jobStatsChart" height="100"></canvas>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#jobStatsModal').remove();
    $('body').append(modalHtml);
    $('#jobStatsModal').modal('show');
    
    // Create chart
    const ctx = document.getElementById('jobStatsChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
                datasets: [{
                    label: 'การดู',
                    data: [45, 52, 48, 67, 58, 42, 38],
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
}

console.log('✅ Dashboard functions loaded successfully!');
