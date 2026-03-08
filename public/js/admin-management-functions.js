// ========================================
// ADMIN MANAGEMENT FUNCTIONS
// ========================================

/**
 * Load Admin Management View
 */
function loadAdminManagement() {
    const stats = getAdminStats();
    
    $('#dashboardContent').html(`
        <!-- Header with Stats -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h5 class="fw-bold mb-1">
                    <i class="bi bi-shield-check text-primary me-2"></i>จัดการผู้ดูแลระบบ
                </h5>
                <p class="text-muted mb-0">มีผู้ดูแลระบบทั้งหมด ${stats.total} คน</p>
            </div>
            <button class="btn btn-primary" onclick="showAddAdminModal()">
                <i class="bi bi-plus-circle me-2"></i>เพิ่มผู้ดูแลระบบ
            </button>
        </div>

        <!-- Stats Cards -->
        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="stat-icon bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                                    <i class="bi bi-people fs-4"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h3 class="mb-0 fw-bold">${stats.total}</h3>
                                <small class="text-muted">ทั้งหมด</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="stat-icon bg-success bg-opacity-10 text-success rounded-3 p-3">
                                    <i class="bi bi-check-circle fs-4"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h3 class="mb-0 fw-bold">${stats.active}</h3>
                                <small class="text-muted">ใช้งาน</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="stat-icon bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                                    <i class="bi bi-shield-fill-exclamation fs-4"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h3 class="mb-0 fw-bold">${stats.superAdmins}</h3>
                                <small class="text-muted">Super Admin</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="stat-icon bg-warning bg-opacity-10 text-warning rounded-3 p-3">
                                    <i class="bi bi-x-circle fs-4"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h3 class="mb-0 fw-bold">${stats.suspended}</h3>
                                <small class="text-muted">ระงับ</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters & Search -->
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-md-4">
                        <div class="input-group">
                            <span class="input-group-text bg-white">
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" class="form-control" id="adminSearch" 
                                   placeholder="ค้นหาชื่อ, username, email...">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="adminRoleFilter">
                            <option value="">ทุก Role</option>
                            <option value="${ADMIN_ROLES.SUPER_ADMIN}">Super Admin</option>
                            <option value="${ADMIN_ROLES.ADMIN}">Admin</option>
                            <option value="${ADMIN_ROLES.MODERATOR}">Moderator</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="adminStatusFilter">
                            <option value="">ทุกสถานะ</option>
                            <option value="${ADMIN_STATUS.ACTIVE}">ใช้งาน</option>
                            <option value="${ADMIN_STATUS.SUSPENDED}">ระงับ</option>
                            <option value="${ADMIN_STATUS.INACTIVE}">ไม่ใช้งาน</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-outline-secondary w-100" onclick="resetAdminFilters()">
                            <i class="bi bi-arrow-clockwise me-2"></i>รีเซ็ต
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Admin List -->
        <div class="card border-0 shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="adminTable">
                        <thead class="bg-light">
                            <tr>
                                <th class="border-0 px-4 py-3">ผู้ดูแลระบบ</th>
                                <th class="border-0 px-4 py-3">Role</th>
                                <th class="border-0 px-4 py-3">สิทธิ์</th>
                                <th class="border-0 px-4 py-3">แผนก</th>
                                <th class="border-0 px-4 py-3">เข้าสู่ระบบล่าสุด</th>
                                <th class="border-0 px-4 py-3">สถานะ</th>
                                <th class="border-0 px-4 py-3 text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody id="adminTableBody">
                            ${renderAdminList()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);
    
    // Setup event listeners
    setupAdminManagementListeners();
}

/**
 * Render Admin List
 */
function renderAdminList(admins = null) {
    const adminList = admins || getAllAdmins();
    
    if (adminList.length === 0) {
        return `
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                    <p class="text-muted">ไม่พบข้อมูลผู้ดูแลระบบ</p>
                </td>
            </tr>
        `;
    }
    
    return adminList.map(admin => `
        <tr data-admin-id="${admin.id}">
            <td class="px-4 py-3">
                <div class="d-flex align-items-center">
                    <img src="${admin.avatar}" alt="${admin.firstName}" 
                         class="rounded-circle me-3" width="48" height="48">
                    <div>
                        <div class="fw-semibold">${admin.firstName} ${admin.lastName}</div>
                        <small class="text-muted d-block">
                            <i class="bi bi-person-badge me-1"></i>${admin.username}
                        </small>
                        <small class="text-muted d-block">
                            <i class="bi bi-envelope me-1"></i>${admin.email}
                        </small>
                    </div>
                </div>
            </td>
            <td class="px-4 py-3">
                <span class="badge ${getAdminRoleBadgeClass(admin.role)} px-3 py-2">
                    ${getAdminRoleDisplay(admin.role)}
                </span>
            </td>
            <td class="px-4 py-3">
                <div class="d-flex align-items-center">
                    <i class="bi bi-shield-check text-primary me-2"></i>
                    <span>${getPermissionsCount(admin)}/7</span>
                </div>
            </td>
            <td class="px-4 py-3">
                <small class="text-muted">${admin.department}</small>
            </td>
            <td class="px-4 py-3">
                <small class="text-muted">
                    <i class="bi bi-clock me-1"></i>${formatLastLogin(admin.lastLogin)}
                </small>
            </td>
            <td class="px-4 py-3">
                <span class="badge ${getAdminStatusBadgeClass(admin.status)} px-3 py-2">
                    ${getAdminStatusDisplay(admin.status)}
                </span>
            </td>
            <td class="px-4 py-3 text-center">
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary" 
                            onclick="viewAdminDetail(${admin.id})" 
                            title="ดูรายละเอียด">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" 
                            onclick="editAdmin(${admin.id})"
                            title="แก้ไข">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" 
                                data-bs-toggle="dropdown">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            ${admin.status === ADMIN_STATUS.ACTIVE ? `
                                <li>
                                    <a class="dropdown-item text-warning" href="#" 
                                       onclick="suspendAdmin(${admin.id}); return false;">
                                        <i class="bi bi-pause-circle me-2"></i>ระงับการใช้งาน
                                    </a>
                                </li>
                            ` : admin.status === ADMIN_STATUS.SUSPENDED ? `
                                <li>
                                    <a class="dropdown-item text-success" href="#" 
                                       onclick="activateAdmin(${admin.id}); return false;">
                                        <i class="bi bi-check-circle me-2"></i>เปิดใช้งาน
                                    </a>
                                </li>
                            ` : ''}
                            <li>
                                <a class="dropdown-item" href="#" 
                                   onclick="resetAdminPassword(${admin.id}); return false;">
                                    <i class="bi bi-key me-2"></i>รีเซ็ตรหัสผ่าน
                                </a>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            ${admin.role !== ADMIN_ROLES.SUPER_ADMIN ? `
                                <li>
                                    <a class="dropdown-item text-danger" href="#" 
                                       onclick="deleteAdmin(${admin.id}); return false;">
                                        <i class="bi bi-trash me-2"></i>ลบ
                                    </a>
                                </li>
                            ` : ''}
                        </ul>
                    </div>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * Setup Event Listeners
 */
function setupAdminManagementListeners() {
    // Search
    $('#adminSearch').on('input', function() {
        filterAdmins();
    });
    
    // Role filter
    $('#adminRoleFilter').on('change', function() {
        filterAdmins();
    });
    
    // Status filter
    $('#adminStatusFilter').on('change', function() {
        filterAdmins();
    });
}

/**
 * Filter Admins
 */
function filterAdmins() {
    const searchQuery = $('#adminSearch').val().toLowerCase();
    const roleFilter = $('#adminRoleFilter').val();
    const statusFilter = $('#adminStatusFilter').val();
    
    let filteredAdmins = getAllAdmins();
    
    // Apply search
    if (searchQuery) {
        filteredAdmins = searchAdmins(searchQuery);
    }
    
    // Apply role filter
    if (roleFilter) {
        filteredAdmins = filteredAdmins.filter(admin => admin.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
        filteredAdmins = filteredAdmins.filter(admin => admin.status === statusFilter);
    }
    
    // Update table
    $('#adminTableBody').html(renderAdminList(filteredAdmins));
}

/**
 * Reset Filters
 */
function resetAdminFilters() {
    $('#adminSearch').val('');
    $('#adminRoleFilter').val('');
    $('#adminStatusFilter').val('');
    $('#adminTableBody').html(renderAdminList());
}

/**
 * View Admin Detail
 */
function viewAdminDetail(id) {
    const admin = getAdminById(id);
    if (!admin) {
        showNotification('ไม่พบข้อมูลผู้ดูแลระบบ', 'error');
        return;
    }
    
    const modalHtml = `
        <div class="modal fade" id="adminDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-gradient border-0 text-white">
                        <h5 class="modal-title fw-bold">
                            <i class="bi bi-person-badge me-2"></i>รายละเอียดผู้ดูแลระบบ
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <!-- Admin Info -->
                        <div class="text-center mb-4 pb-4 border-bottom">
                            <img src="${admin.avatar}" alt="${admin.firstName}" 
                                 class="rounded-circle mb-3" width="120" height="120">
                            <h4 class="fw-bold mb-2">${admin.firstName} ${admin.lastName}</h4>
                            <p class="text-muted mb-3">
                                <i class="bi bi-person-badge me-1"></i>${admin.username}
                            </p>
                            <div class="d-flex gap-2 justify-content-center">
                                <span class="badge ${getAdminRoleBadgeClass(admin.role)} px-3 py-2">
                                    ${getAdminRoleDisplay(admin.role)}
                                </span>
                                <span class="badge ${getAdminStatusBadgeClass(admin.status)} px-3 py-2">
                                    ${getAdminStatusDisplay(admin.status)}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Contact Info -->
                        <div class="row g-4 mb-4">
                            <div class="col-md-6">
                                <h6 class="fw-bold mb-3">
                                    <i class="bi bi-envelope text-primary me-2"></i>ข้อมูลการติดต่อ
                                </h6>
                                <table class="table table-sm table-borderless">
                                    <tr>
                                        <td class="text-muted" width="100">Email:</td>
                                        <td>${admin.email}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-muted">โทรศัพท์:</td>
                                        <td>${admin.phone}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-muted">แผนก:</td>
                                        <td>${admin.department}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold mb-3">
                                    <i class="bi bi-calendar text-primary me-2"></i>ข้อมูลระบบ
                                </h6>
                                <table class="table table-sm table-borderless">
                                    <tr>
                                        <td class="text-muted" width="120">สร้างเมื่อ:</td>
                                        <td>${admin.createdDate}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-muted">เข้าสู่ระบบล่าสุด:</td>
                                        <td>${formatLastLogin(admin.lastLogin)}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        
                        <!-- Permissions -->
                        <div>
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-shield-check text-primary me-2"></i>สิทธิ์การใช้งาน
                            </h6>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" 
                                               ${admin.permissions.manageUsers ? 'checked' : ''} disabled>
                                        <label class="form-check-label">จัดการผู้ใช้</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" 
                                               ${admin.permissions.manageEmployers ? 'checked' : ''} disabled>
                                        <label class="form-check-label">จัดการนายจ้าง</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" 
                                               ${admin.permissions.manageJobs ? 'checked' : ''} disabled>
                                        <label class="form-check-label">จัดการงาน</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" 
                                               ${admin.permissions.manageAdmins ? 'checked' : ''} disabled>
                                        <label class="form-check-label">จัดการผู้ดูแลระบบ</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" 
                                               ${admin.permissions.managePayments ? 'checked' : ''} disabled>
                                        <label class="form-check-label">จัดการการชำระเงิน</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" 
                                               ${admin.permissions.manageReports ? 'checked' : ''} disabled>
                                        <label class="form-check-label">ดูรายงาน</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" 
                                               ${admin.permissions.systemSettings ? 'checked' : ''} disabled>
                                        <label class="form-check-label">ตั้งค่าระบบ</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>ปิด
                        </button>
                        <button type="button" class="btn btn-primary" 
                                onclick="editAdmin(${admin.id}); $('#adminDetailModal').modal('hide');">
                            <i class="bi bi-pencil me-2"></i>แก้ไข
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#adminDetailModal').remove();
    $('body').append(modalHtml);
    $('#adminDetailModal').modal('show');
}

/**
 * Show Add Admin Modal
 */
function showAddAdminModal() {
    const modalHtml = `
        <div class="modal fade" id="addAdminModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-gradient border-0 text-white">
                        <h5 class="modal-title fw-bold">
                            <i class="bi bi-person-plus me-2"></i>เพิ่มผู้ดูแลระบบใหม่
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form id="addAdminForm">
                            <div class="row g-3">
                                <!-- Username -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        Username <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" class="form-control" id="newUsername" required>
                                </div>
                                
                                <!-- Email -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        Email <span class="text-danger">*</span>
                                    </label>
                                    <input type="email" class="form-control" id="newEmail" required>
                                </div>
                                
                                <!-- First Name -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        ชื่อ <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" class="form-control" id="newFirstName" required>
                                </div>
                                
                                <!-- Last Name -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        นามสกุล <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" class="form-control" id="newLastName" required>
                                </div>
                                
                                <!-- Phone -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">โทรศัพท์</label>
                                    <input type="tel" class="form-control" id="newPhone">
                                </div>
                                
                                <!-- Department -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">แผนก</label>
                                    <input type="text" class="form-control" id="newDepartment">
                                </div>
                                
                                <!-- Role -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        Role <span class="text-danger">*</span>
                                    </label>
                                    <select class="form-select" id="newRole" required>
                                        <option value="">เลือก Role</option>
                                        <option value="${ADMIN_ROLES.ADMIN}">Admin</option>
                                        <option value="${ADMIN_ROLES.MODERATOR}">Moderator</option>
                                    </select>
                                </div>
                                
                                <!-- Permissions -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold mb-3">สิทธิ์การใช้งาน</label>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="permManageUsers">
                                                <label class="form-check-label" for="permManageUsers">
                                                    จัดการผู้ใช้
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="permManageEmployers">
                                                <label class="form-check-label" for="permManageEmployers">
                                                    จัดการนายจ้าง
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="permManageJobs">
                                                <label class="form-check-label" for="permManageJobs">
                                                    จัดการงาน
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="permManagePayments">
                                                <label class="form-check-label" for="permManagePayments">
                                                    จัดการการชำระเงิน
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="permManageReports">
                                                <label class="form-check-label" for="permManageReports">
                                                    ดูรายงาน
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>ยกเลิก
                        </button>
                        <button type="submit" form="addAdminForm" class="btn btn-primary">
                            <i class="bi bi-check-circle me-2"></i>เพิ่มผู้ดูแลระบบ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#addAdminModal').remove();
    $('body').append(modalHtml);
    $('#addAdminModal').modal('show');
    
    // Form submit handler
    $('#addAdminForm').on('submit', function(e) {
        e.preventDefault();
        const formData = {
            username: $('#newUsername').val(),
            email: $('#newEmail').val(),
            firstName: $('#newFirstName').val(),
            lastName: $('#newLastName').val(),
            phone: $('#newPhone').val(),
            department: $('#newDepartment').val(),
            role: $('#newRole').val(),
            permissions: {
                manageUsers: $('#permManageUsers').is(':checked'),
                manageEmployers: $('#permManageEmployers').is(':checked'),
                manageJobs: $('#permManageJobs').is(':checked'),
                managePayments: $('#permManagePayments').is(':checked'),
                manageReports: $('#permManageReports').is(':checked')
            }
        };
        
        console.log('New Admin Data:', formData);
        showNotification('เพิ่มผู้ดูแลระบบสำเร็จ!', 'success');
        $('#addAdminModal').modal('hide');
        
        // Reload admin list
        setTimeout(() => {
            loadAdminManagement();
        }, 500);
    });
}

/**
 * Edit Admin
 */
function editAdmin(id) {
    showNotification('กำลังแก้ไขข้อมูล Admin ID: ' + id, 'info');
    // TODO: Implement edit modal
}

/**
 * Suspend Admin
 */
function suspendAdmin(id) {
    const admin = getAdminById(id);
    if (!admin) return;
    
    if (confirm(`ยืนยันการระงับการใช้งาน "${admin.firstName} ${admin.lastName}"?`)) {
        showNotification(`ระงับการใช้งาน ${admin.firstName} ${admin.lastName} แล้ว`, 'warning');
        setTimeout(() => {
            loadAdminManagement();
        }, 1000);
    }
}

/**
 * Activate Admin
 */
function activateAdmin(id) {
    const admin = getAdminById(id);
    if (!admin) return;
    
    showNotification(`เปิดใช้งาน ${admin.firstName} ${admin.lastName} แล้ว`, 'success');
    setTimeout(() => {
        loadAdminManagement();
    }, 1000);
}

/**
 * Reset Admin Password
 */
function resetAdminPassword(id) {
    const admin = getAdminById(id);
    if (!admin) return;
    
    if (confirm(`ยืนยันการรีเซ็ตรหัสผ่านสำหรับ "${admin.firstName} ${admin.lastName}"?`)) {
        showNotification('ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง ' + admin.email + ' แล้ว', 'success');
    }
}

/**
 * Delete Admin
 */
function deleteAdmin(id) {
    const admin = getAdminById(id);
    if (!admin) return;
    
    if (admin.role === ADMIN_ROLES.SUPER_ADMIN) {
        showNotification('ไม่สามารถลบ Super Admin ได้', 'error');
        return;
    }
    
    if (confirm(`ยืนยันการลบ "${admin.firstName} ${admin.lastName}"?\nการกระทำนี้ไม่สามารถย้อนกลับได้`)) {
        showNotification(`ลบ ${admin.firstName} ${admin.lastName} แล้ว`, 'success');
        setTimeout(() => {
            loadAdminManagement();
        }, 1000);
    }
}

console.log('✅ Admin Management Functions loaded successfully');
