// ========================================
// ADMIN: Internship (Future Crew) Management
// Complete CRUD Operations
// ========================================

// Load all internships
function loadAdminInternships() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold">
                            <i class="bi bi-briefcase-fill me-2"></i>
                            จัดการตำแหน่งฝึกงาน (Future Crew)
                        </h5>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-primary" onclick="showAddInternshipModal()">
                            <i class="bi bi-plus-circle me-2"></i>เพิ่มตำแหน่งฝึกงานใหม่
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- Filters -->
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="internshipSearchInput" placeholder="ค้นหาตำแหน่ง...">
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="internshipLocationFilter">
                            <option value="">ทุกสถานที่</option>
                            <option value="Bangkok">Bangkok</option>
                            <option value="Phuket">Phuket</option>
                            <option value="Chiang Mai">Chiang Mai</option>
                            <option value="Pattaya">Pattaya</option>
                            <option value="Samui">Samui</option>
                            <option value="Hua Hin">Hua Hin</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="internshipDepartmentFilter">
                            <option value="">ทุกแผนก</option>
                            <option value="Front Office">Front Office</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Housekeeping">Housekeeping</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Sales & Marketing">Sales & Marketing</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-outline-secondary w-100" onclick="clearInternshipFilters()">
                            <i class="bi bi-arrow-clockwise me-2"></i>รีเซ็ต
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="stat-card bg-primary text-white">
                            <div class="stat-icon"><i class="bi bi-briefcase"></i></div>
                            <div class="stat-number" id="totalInternshipsCount">0</div>
                            <div class="stat-label">ตำแหน่งทั้งหมด</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-success text-white">
                            <div class="stat-icon"><i class="bi bi-clock"></i></div>
                            <div class="stat-number" id="openInternshipsCount">0</div>
                            <div class="stat-label">เปิดรับสมัคร</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-warning text-white">
                            <div class="stat-icon"><i class="bi bi-people"></i></div>
                            <div class="stat-number" id="totalApplicantsCount">0</div>
                            <div class="stat-label">ผู้สมัครทั้งหมด</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-info text-white">
                            <div class="stat-icon"><i class="bi bi-currency-dollar"></i></div>
                            <div class="stat-number" id="paidInternshipsCount">0</div>
                            <div class="stat-label">มีค่าตอบแทน</div>
                        </div>
                    </div>
                </div>

                <!-- Internships Table -->
                <div class="table-responsive">
                    <table class="table table-hover align-middle" id="internshipsTable">
                        <thead class="table-light">
                            <tr>
                                <th>ตำแหน่ง</th>
                                <th>แผนก</th>
                                <th>สถานที่</th>
                                <th>ระยะเวลา</th>
                                <th>ตำแหน่งว่าง</th>
                                <th>สถานะ</th>
                                <th width="200">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody id="internshipsTableBody">
                            <tr>
                                <td colspan="7" class="text-center py-5">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    <p class="mt-3 text-muted">กำลังโหลดข้อมูล...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);

    // Load internships data
    loadInternshipsData();

    // Setup event listeners
    setupInternshipFilters();
}

// Load internships data from JSON
let allInternshipsData = [];

async function loadInternshipsData() {
    try {
        const response = await fetch('./data/internships.json');
        allInternshipsData = await response.json();
        
        // Update stats
        updateInternshipStats();
        
        // Display internships
        displayInternships(allInternshipsData);
    } catch (error) {
        console.error('Error loading internships:', error);
        $('#internshipsTableBody').html(`
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="bi bi-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
                    <p class="mt-3 text-danger">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                </td>
            </tr>
        `);
    }
}

// Display internships in table
function displayInternships(internships) {
    if (internships.length === 0) {
        $('#internshipsTableBody').html(`
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="bi bi-inbox" style="font-size: 3rem; color: var(--gray-400);"></i>
                    <p class="mt-3 text-muted">ไม่พบตำแหน่งฝึกงาน</p>
                </td>
            </tr>
        `);
        return;
    }

    const rows = internships.map(internship => {
        const isOpen = new Date(internship.applicationDeadline) > new Date();
        return `
            <tr data-internship-id="${internship.internshipId}">
                <td>
                    <div class="fw-bold">${internship.positionTitle}</div>
                    ${internship.hotelInfo ? `<small class="text-muted">${internship.hotelInfo.name}</small>` : ''}
                </td>
                <td>${internship.department}</td>
                <td>
                    <i class="bi bi-geo-alt-fill text-primary me-1"></i>
                    ${internship.location}
                </td>
                <td>${internship.duration}</td>
                <td>
                    <span class="badge bg-info">${internship.availableSpots} ตำแหน่ง</span>
                </td>
                <td>
                    ${isOpen ? '<span class="badge bg-success">เปิดรับสมัคร</span>' : '<span class="badge bg-secondary">ปิดรับสมัคร</span>'}
                    ${internship.isPaid ? '<span class="badge bg-warning text-dark ms-1">มีค่าตอบแทน</span>' : ''}
                </td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="viewInternshipDetails('${internship.internshipId}')" title="ดูรายละเอียด">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-outline-success" onclick="editInternship('${internship.internshipId}')" title="แก้ไข">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger" onclick="deleteInternship('${internship.internshipId}', '${internship.positionTitle}')" title="ลบ">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    $('#internshipsTableBody').html(rows);
}

// Update statistics
function updateInternshipStats() {
    const total = allInternshipsData.length;
    const open = allInternshipsData.filter(i => new Date(i.applicationDeadline) > new Date()).length;
    const totalApplicants = allInternshipsData.reduce((sum, i) => sum + (i.applicantsCount || 0), 0);
    const paid = allInternshipsData.filter(i => i.isPaid).length;

    $('#totalInternshipsCount').text(total);
    $('#openInternshipsCount').text(open);
    $('#totalApplicantsCount').text(totalApplicants);
    $('#paidInternshipsCount').text(paid);
}

// Setup filters
function setupInternshipFilters() {
    $('#internshipSearchInput').on('input', filterInternships);
    $('#internshipLocationFilter').on('change', filterInternships);
    $('#internshipDepartmentFilter').on('change', filterInternships);
}

// Filter internships
function filterInternships() {
    const searchTerm = $('#internshipSearchInput').val().toLowerCase();
    const location = $('#internshipLocationFilter').val();
    const department = $('#internshipDepartmentFilter').val();

    let filtered = allInternshipsData.filter(internship => {
        const matchSearch = internship.positionTitle.toLowerCase().includes(searchTerm);
        const matchLocation = !location || internship.location === location;
        const matchDepartment = !department || internship.department === department;

        return matchSearch && matchLocation && matchDepartment;
    });

    displayInternships(filtered);
}

// Clear filters
function clearInternshipFilters() {
    $('#internshipSearchInput').val('');
    $('#internshipLocationFilter').val('');
    $('#internshipDepartmentFilter').val('');
    displayInternships(allInternshipsData);
}

// ========================================
// VIEW: View Internship Details
// ========================================
function viewInternshipDetails(internshipId) {
    window.location.href = `admin-internship-view.html?id=${internshipId}`;
}

// ========================================
// ADD: Add New Internship
// ========================================
function showAddInternshipModal() {
    window.location.href = 'admin-internship-add.html';
}

// ========================================
// EDIT: Edit Internship
// ========================================
function editInternship(internshipId) {
    window.location.href = `admin-internship-edit.html?id=${internshipId}`;
}

// ========================================
// DELETE: Delete Internship
// ========================================
function deleteInternship(internshipId, positionTitle) {
    if (!confirm(`คุณต้องการลบ "${positionTitle}" ใช่หรือไม่?\n\nการกระทำนี้ไม่สามารถย้อนกลับได้!`)) {
        return;
    }

    const internshipIndex = allInternshipsData.findIndex(i => i.internshipId === internshipId);
    if (internshipIndex === -1) return;

    allInternshipsData.splice(internshipIndex, 1);

    // Update display
    updateInternshipStats();
    displayInternships(allInternshipsData);

    // Show success message
    showSuccessAlert('ลบสำเร็จ!', `${positionTitle} ถูกลบออกจากระบบแล้ว`, 'warning');
}

// ========================================
// Utility Functions
// ========================================
function showSuccessAlert(title, message, type = 'success') {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" 
             role="alert" style="z-index: 9999; min-width: 400px;">
            <i class="bi bi-check-circle-fill me-2"></i>
            <strong>${title}</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $('body').append(alertHtml);
    
    setTimeout(() => {
        $('.alert').fadeOut(300, function() {
            $(this).remove();
        });
    }, 3000);
}
