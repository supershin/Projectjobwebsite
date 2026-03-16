// ========================================
// ADMIN: Hospitality Schools Management
// Complete CRUD Operations
// ========================================

// Load all schools
function loadAdminSchools() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold">
                            <i class="bi bi-mortarboard-fill me-2"></i>
                            จัดการสถาบันการศึกษา
                        </h5>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-primary" onclick="showAddSchoolModal()">
                            <i class="bi bi-plus-circle me-2"></i>เพิ่มสถาบันใหม่
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- Filters -->
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="schoolSearchInput" placeholder="ค้นหาสถาบัน...">
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="schoolLocationFilter">
                            <option value="">ทุกสถานที่</option>
                            <option value="Bangkok">Bangkok</option>
                            <option value="Phuket">Phuket</option>
                            <option value="Chiang Mai">Chiang Mai</option>
                            <option value="Pattaya">Pattaya</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="schoolTypeFilter">
                            <option value="">ทุกประเภท</option>
                            <option value="University">University</option>
                            <option value="College">College</option>
                            <option value="Training Center">Training Center</option>
                            <option value="Vocational School">Vocational School</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-outline-secondary w-100" onclick="clearSchoolFilters()">
                            <i class="bi bi-arrow-clockwise me-2"></i>รีเซ็ต
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="stat-card bg-primary text-white">
                            <div class="stat-icon"><i class="bi bi-building"></i></div>
                            <div class="stat-number" id="totalSchoolsCount">0</div>
                            <div class="stat-label">สถาบันทั้งหมด</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-success text-white">
                            <div class="stat-icon"><i class="bi bi-patch-check"></i></div>
                            <div class="stat-number" id="verifiedSchoolsCount">0</div>
                            <div class="stat-label">Verified</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-warning text-white">
                            <div class="stat-icon"><i class="bi bi-star-fill"></i></div>
                            <div class="stat-number" id="featuredSchoolsCount">0</div>
                            <div class="stat-label">Featured</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-info text-white">
                            <div class="stat-icon"><i class="bi bi-book"></i></div>
                            <div class="stat-number" id="totalProgramsCount">0</div>
                            <div class="stat-label">หลักสูตรทั้งหมด</div>
                        </div>
                    </div>
                </div>

                <!-- Schools Table -->
                <div class="table-responsive">
                    <table class="table table-hover align-middle" id="schoolsTable">
                        <thead class="table-light">
                            <tr>
                                <th width="60">Logo</th>
                                <th>สถาบัน</th>
                                <th>ประเภท</th>
                                <th>สถานที่</th>
                                <th>หลักสูตร</th>
                                <th>สถานะ</th>
                                <th width="200">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody id="schoolsTableBody">
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

    // Load schools data
    loadSchoolsData();

    // Setup event listeners
    setupSchoolFilters();
}

// Load schools data from JSON
let allSchoolsData = [];

async function loadSchoolsData() {
    try {
        const response = await fetch('./data/hospitality-schools.json');
        allSchoolsData = await response.json();
        
        // Update stats
        updateSchoolStats();
        
        // Display schools
        displaySchools(allSchoolsData);
    } catch (error) {
        console.error('Error loading schools:', error);
        $('#schoolsTableBody').html(`
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="bi bi-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
                    <p class="mt-3 text-danger">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                </td>
            </tr>
        `);
    }
}

// Display schools in table
function displaySchools(schools) {
    if (schools.length === 0) {
        $('#schoolsTableBody').html(`
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="bi bi-inbox" style="font-size: 3rem; color: var(--gray-400);"></i>
                    <p class="mt-3 text-muted">ไม่พบสถาบันการศึกษา</p>
                </td>
            </tr>
        `);
        return;
    }

    const rows = schools.map(school => `
        <tr data-school-id="${school.schoolId}">
            <td>
                <img src="${school.logo}" alt="${school.shortName}" 
                     style="width: 50px; height: 50px; object-fit: contain; border-radius: 8px; border: 1px solid #e5e7eb;">
            </td>
            <td>
                <div class="fw-bold">${school.shortName}</div>
                <small class="text-muted">${school.schoolName}</small>
            </td>
            <td>
                <small class="text-muted">${school.type}</small>
            </td>
            <td>
                <i class="bi bi-geo-alt-fill text-primary me-1"></i>
                ${school.location}
            </td>
            <td>
                <span class="badge bg-info">${school.programs.length} หลักสูตร</span>
            </td>
            <td>
                ${school.verified ? '<span class="badge bg-success"><i class="bi bi-patch-check-fill me-1"></i>Verified</span>' : '<span class="badge bg-warning">Pending</span>'}
                ${school.featured ? '<span class="badge bg-primary ms-1"><i class="bi bi-star-fill me-1"></i>Featured</span>' : ''}
            </td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewSchoolDetails('${school.schoolId}')" title="ดูรายละเอียด">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-success" onclick="editSchool('${school.schoolId}')" title="แก้ไข">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteSchool('${school.schoolId}', '${school.shortName}')" title="ลบ">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    $('#schoolsTableBody').html(rows);
}

// Update statistics
function updateSchoolStats() {
    const total = allSchoolsData.length;
    const verified = allSchoolsData.filter(s => s.verified).length;
    const featured = allSchoolsData.filter(s => s.featured).length;
    const totalPrograms = allSchoolsData.reduce((sum, s) => sum + s.programs.length, 0);

    $('#totalSchoolsCount').text(total);
    $('#verifiedSchoolsCount').text(verified);
    $('#featuredSchoolsCount').text(featured);
    $('#totalProgramsCount').text(totalPrograms);
}

// Setup filters
function setupSchoolFilters() {
    $('#schoolSearchInput').on('input', filterSchools);
    $('#schoolLocationFilter').on('change', filterSchools);
    $('#schoolTypeFilter').on('change', filterSchools);
}

// Filter schools
function filterSchools() {
    const searchTerm = $('#schoolSearchInput').val().toLowerCase();
    const location = $('#schoolLocationFilter').val();
    const type = $('#schoolTypeFilter').val();

    let filtered = allSchoolsData.filter(school => {
        const matchSearch = school.schoolName.toLowerCase().includes(searchTerm) ||
                          school.shortName.toLowerCase().includes(searchTerm);
        const matchLocation = !location || school.location === location;
        const matchType = !type || school.type === type;

        return matchSearch && matchLocation && matchType;
    });

    displaySchools(filtered);
}

// Clear filters
function clearSchoolFilters() {
    $('#schoolSearchInput').val('');
    $('#schoolLocationFilter').val('');
    $('#schoolTypeFilter').val('');
    displaySchools(allSchoolsData);
}

// ========================================
// VIEW: View School Details
// ========================================
function viewSchoolDetails(schoolId) {
    // Navigate to view page
    window.location.href = `admin-school-view.html?id=${schoolId}`;
}

// ========================================
// ADD: Add New School
// ========================================
function showAddSchoolModal() {
    // Navigate to add page
    window.location.href = 'admin-school-add.html';
}

// ========================================
// EDIT: Edit School
// ========================================
function editSchool(schoolId) {
    // Navigate to edit page
    window.location.href = `admin-school-edit.html?id=${schoolId}`;
}

// ========================================
// DELETE: Delete School
// ========================================
function deleteSchool(schoolId, schoolName) {
    if (!confirm(`คุณต้องการลบ "${schoolName}" ใช่หรือไม่?\n\nการกระทำนี้ไม่สามารถย้อนกลับได้!`)) {
        return;
    }

    const schoolIndex = allSchoolsData.findIndex(s => s.schoolId === schoolId);
    if (schoolIndex === -1) return;

    allSchoolsData.splice(schoolIndex, 1);

    // Update display
    updateSchoolStats();
    displaySchools(allSchoolsData);

    // Show success message
    showSuccessAlert('ลบสำเร็จ!', `${schoolName} ถูกลบออกจากระบบแล้ว`, 'warning');
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