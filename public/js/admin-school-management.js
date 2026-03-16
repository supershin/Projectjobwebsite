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
    const school = allSchoolsData.find(s => s.schoolId === schoolId);
    if (!school) return;

    const modalHtml = `
        <div class="modal fade" id="viewSchoolModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="bi bi-mortarboard me-2"></i>
                            รายละเอียดสถาบันการศึกษา
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Cover & Logo -->
                        <div class="row mb-4">
                            <div class="col-12">
                                <div style="height: 200px; border-radius: 12px; overflow: hidden; position: relative;">
                                    <img src="${school.coverImage}" alt="Cover" style="width: 100%; height: 100%; object-fit: cover;">
                                    <div style="position: absolute; bottom: 20px; left: 20px; background: white; padding: 10px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                                        <img src="${school.logo}" alt="${school.shortName}" style="width: 80px; height: 80px; object-fit: contain;">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Basic Info -->
                        <div class="row mb-4">
                            <div class="col-md-8">
                                <h4 class="fw-bold">${school.schoolName}</h4>
                                <p class="text-muted mb-3">${school.shortName}</p>
                                <p>${school.description}</p>
                            </div>
                            <div class="col-md-4">
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <h6 class="fw-bold mb-3">ข้อมูลพื้นฐาน</h6>
                                        <p class="mb-2"><strong>School ID:</strong><br><code>${school.schoolId}</code></p>
                                        <p class="mb-2"><strong>Type:</strong><br>${school.type}</p>
                                        <p class="mb-2"><strong>Location:</strong><br>${school.location}</p>
                                        <p class="mb-0"><strong>Status:</strong><br>
                                            ${school.verified ? '<span class="badge bg-success">✓ Verified</span>' : '<span class="badge bg-warning">Pending</span>'}
                                            ${school.featured ? '<span class="badge bg-primary ms-1">★ Featured</span>' : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Address & Contact -->
                        <div class="row mb-4">
                            <div class="col-md-12">
                                <h6 class="fw-bold mb-3"><i class="bi bi-geo-alt me-2"></i>ที่อยู่และการติดต่อ</h6>
                                <p><strong>Address:</strong> ${school.address}</p>
                                <p><strong>Website:</strong> <a href="${school.website}" target="_blank">${school.website}</a></p>
                                <p><strong>Email:</strong> <a href="mailto:${school.contactEmail}">${school.contactEmail}</a></p>
                                <p><strong>Phone:</strong> ${school.contactPhone}</p>
                            </div>
                        </div>

                        <!-- Programs -->
                        <div class="mb-4">
                            <h6 class="fw-bold mb-3"><i class="bi bi-book me-2"></i>หลักสูตร (${school.programs.length})</h6>
                            <div class="row g-3">
                                ${school.programs.map(prog => `
                                    <div class="col-md-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <span class="badge bg-primary mb-2">${prog.degree}</span>
                                                <h6 class="fw-bold">${prog.name}</h6>
                                                <p class="text-muted small mb-0">
                                                    <i class="bi bi-clock me-1"></i>${prog.duration}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Accreditations -->
                        ${school.accreditations && school.accreditations.length > 0 ? `
                            <div class="mb-4">
                                <h6 class="fw-bold mb-3"><i class="bi bi-award me-2"></i>การรับรอง</h6>
                                <div class="d-flex flex-wrap gap-2">
                                    ${school.accreditations.map(acc => `
                                        <span class="badge bg-success">${acc}</span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Partnerships -->
                        ${school.partnerships && school.partnerships.length > 0 ? `
                            <div class="mb-4">
                                <h6 class="fw-bold mb-3"><i class="bi bi-handshake me-2"></i>พันธมิตร (${school.partnerships.length})</h6>
                                <div class="d-flex flex-wrap gap-2">
                                    ${school.partnerships.map(partner => `
                                        <span class="badge" style="background: rgba(255, 107, 53, 0.1); color: var(--primary-color);">${partner}</span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Job Placement & Tuition -->
                        <div class="row">
                            ${school.jobPlacementRate ? `
                                <div class="col-md-6">
                                    <div class="alert alert-success">
                                        <i class="bi bi-graph-up me-2"></i>
                                        <strong>Job Placement Rate:</strong> ${school.jobPlacementRate}
                                    </div>
                                </div>
                            ` : ''}
                            ${school.tuitionFee ? `
                                <div class="col-md-6">
                                    <div class="alert alert-info">
                                        <i class="bi bi-credit-card me-2"></i>
                                        <strong>ค่าเล่าเรียน:</strong> ${school.tuitionFee}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                        <a href="${school.website}" target="_blank" class="btn btn-primary">
                            <i class="bi bi-box-arrow-up-right me-2"></i>เยี่ยมชมเว็บไซต์
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#viewSchoolModal').remove();
    $('body').append(modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('viewSchoolModal'));
    modal.show();
    
    $('#viewSchoolModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

// ========================================
// ADD: Add New School
// ========================================
function showAddSchoolModal() {
    const modalHtml = `
        <div class="modal fade" id="addSchoolModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="bi bi-plus-circle me-2"></i>
                            เพิ่มสถาบันการศึกษาใหม่
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                        <form id="addSchoolForm">
                            <!-- Basic Information -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-info-circle me-2"></i>ข้อมูลพื้นฐาน
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">School Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="schoolName" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Short Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="shortName" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Type <span class="text-danger">*</span></label>
                                    <select class="form-select" id="schoolType" required>
                                        <option value="">เลือกประเภท</option>
                                        <option value="University">University</option>
                                        <option value="College">College</option>
                                        <option value="Training Center">Training Center</option>
                                        <option value="Vocational School">Vocational School</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Location <span class="text-danger">*</span></label>
                                    <select class="form-select" id="location" required>
                                        <option value="">เลือกสถานที่</option>
                                        <option value="Bangkok">Bangkok</option>
                                        <option value="Phuket">Phuket</option>
                                        <option value="Chiang Mai">Chiang Mai</option>
                                        <option value="Pattaya">Pattaya</option>
                                    </select>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Address <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="address" required>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Description <span class="text-danger">*</span></label>
                                    <textarea class="form-control" id="description" rows="3" required></textarea>
                                </div>
                            </div>

                            <!-- Images -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-image me-2"></i>รูปภาพ
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Logo URL</label>
                                    <input type="url" class="form-control" id="logoUrl" placeholder="https://...">
                                    <small class="text-muted">หรือใช้ UI Avatars อัตโนมัติ</small>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Cover Image URL</label>
                                    <input type="url" class="form-control" id="coverImageUrl" placeholder="https://...">
                                </div>
                            </div>

                            <!-- Contact Information -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-telephone me-2"></i>ข้อมูลการติดต่อ
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-4">
                                    <label class="form-label">Website <span class="text-danger">*</span></label>
                                    <input type="url" class="form-control" id="website" required>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Email <span class="text-danger">*</span></label>
                                    <input type="email" class="form-control" id="contactEmail" required>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Phone <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="contactPhone" required>
                                </div>
                            </div>

                            <!-- Programs -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-book me-2"></i>หลักสูตร
                            </h6>
                            <div id="programsContainer" class="mb-4">
                                <div class="program-item mb-3 p-3 border rounded">
                                    <div class="row g-3">
                                        <div class="col-md-5">
                                            <label class="form-label">Program Name</label>
                                            <input type="text" class="form-control program-name" placeholder="Bachelor of Arts in Hospitality">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="form-label">Duration</label>
                                            <input type="text" class="form-control program-duration" placeholder="4 years">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="form-label">Degree</label>
                                            <select class="form-select program-degree">
                                                <option value="Bachelor">Bachelor</option>
                                                <option value="Master">Master</option>
                                                <option value="Diploma">Diploma</option>
                                                <option value="Certificate">Certificate</option>
                                            </select>
                                        </div>
                                        <div class="col-md-1 d-flex align-items-end">
                                            <button type="button" class="btn btn-danger btn-sm" onclick="$(this).closest('.program-item').remove()">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-outline-primary btn-sm mb-4" onclick="addProgramField()">
                                <i class="bi bi-plus-circle me-2"></i>เพิ่มหลักสูตร
                            </button>

                            <!-- Additional Info -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-award me-2"></i>ข้อมูลเพิ่มเติม
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Accreditations (คั่นด้วย comma)</label>
                                    <input type="text" class="form-control" id="accreditations" placeholder="MOE, UNWTO TedQual">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Partnerships (คั่นด้วย comma)</label>
                                    <input type="text" class="form-control" id="partnerships" placeholder="Marriott, Hyatt, Accor">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Tuition Fee</label>
                                    <input type="text" class="form-control" id="tuitionFee" placeholder="250,000-350,000 บาท/ปี">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Job Placement Rate</label>
                                    <input type="text" class="form-control" id="jobPlacementRate" placeholder="95%">
                                </div>
                                <div class="col-md-4 d-flex align-items-end">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="verified">
                                        <label class="form-check-label" for="verified">
                                            <i class="bi bi-patch-check text-success me-1"></i>Verified
                                        </label>
                                    </div>
                                    <div class="form-check form-switch ms-3">
                                        <input class="form-check-input" type="checkbox" id="featured">
                                        <label class="form-check-label" for="featured">
                                            <i class="bi bi-star text-warning me-1"></i>Featured
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="saveNewSchool()">
                            <i class="bi bi-check-circle me-2"></i>บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#addSchoolModal').remove();
    $('body').append(modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('addSchoolModal'));
    modal.show();
    
    $('#addSchoolModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

// Add program field
function addProgramField() {
    const programHtml = `
        <div class="program-item mb-3 p-3 border rounded">
            <div class="row g-3">
                <div class="col-md-5">
                    <label class="form-label">Program Name</label>
                    <input type="text" class="form-control program-name" placeholder="Bachelor of Arts in Hospitality">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Duration</label>
                    <input type="text" class="form-control program-duration" placeholder="4 years">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Degree</label>
                    <select class="form-select program-degree">
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                    </select>
                </div>
                <div class="col-md-1 d-flex align-items-end">
                    <button type="button" class="btn btn-danger btn-sm" onclick="$(this).closest('.program-item').remove()">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    $('#programsContainer').append(programHtml);
}

// Save new school
function saveNewSchool() {
    const form = document.getElementById('addSchoolForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Get programs
    const programs = [];
    $('.program-item').each(function() {
        const name = $(this).find('.program-name').val();
        const duration = $(this).find('.program-duration').val();
        const degree = $(this).find('.program-degree').val();
        if (name && duration) {
            programs.push({ name, duration, degree });
        }
    });

    if (programs.length === 0) {
        alert('กรุณาเพิ่มหลักสูตรอย่างน้อย 1 หลักสูตร');
        return;
    }

    // Generate school ID
    const schoolId = 'school' + String(Date.now()).substr(-6);

    // Generate logo if not provided
    let logo = $('#logoUrl').val();
    if (!logo) {
        const shortName = $('#shortName').val();
        logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(shortName)}&background=${Math.random().toString(16).substr(2,6)}&color=fff&size=200`;
    }

    // Get cover image
    const coverImage = $('#coverImageUrl').val() || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80';

    // Parse arrays
    const accreditations = $('#accreditations').val() ? $('#accreditations').val().split(',').map(s => s.trim()) : [];
    const partnerships = $('#partnerships').val() ? $('#partnerships').val().split(',').map(s => s.trim()) : [];

    // Create new school object
    const newSchool = {
        schoolId,
        schoolName: $('#schoolName').val(),
        shortName: $('#shortName').val(),
        logo,
        coverImage,
        type: $('#schoolType').val(),
        location: $('#location').val(),
        address: $('#address').val(),
        description: $('#description').val(),
        programs,
        accreditations,
        partnerships,
        website: $('#website').val(),
        contactEmail: $('#contactEmail').val(),
        contactPhone: $('#contactPhone').val(),
        tuitionFee: $('#tuitionFee').val() || '',
        jobPlacementRate: $('#jobPlacementRate').val() || '',
        verified: $('#verified').is(':checked'),
        featured: $('#featured').is(':checked')
    };

    // Add to array
    allSchoolsData.unshift(newSchool);

    // Update display
    updateSchoolStats();
    displaySchools(allSchoolsData);

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('addSchoolModal')).hide();

    // Show success message
    showSuccessAlert('เพิ่มสถาบันสำเร็จ!', `${newSchool.shortName} ถูกเพิ่มเข้าระบบแล้ว`);
}

// ========================================
// EDIT: Edit School
// ========================================
function editSchool(schoolId) {
    const school = allSchoolsData.find(s => s.schoolId === schoolId);
    if (!school) return;

    const modalHtml = `
        <div class="modal fade" id="editSchoolModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="bi bi-pencil me-2"></i>
                            แก้ไขสถาบัน: ${school.shortName}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                        <form id="editSchoolForm">
                            <input type="hidden" id="editSchoolId" value="${school.schoolId}">
                            
                            <!-- Basic Information -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-info-circle me-2"></i>ข้อมูลพื้นฐาน
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">School Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="editSchoolName" value="${school.schoolName}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Short Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="editShortName" value="${school.shortName}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Type <span class="text-danger">*</span></label>
                                    <select class="form-select" id="editSchoolType" required>
                                        <option value="University" ${school.type === 'University' ? 'selected' : ''}>University</option>
                                        <option value="College" ${school.type === 'College' ? 'selected' : ''}>College</option>
                                        <option value="Training Center" ${school.type === 'Training Center' ? 'selected' : ''}>Training Center</option>
                                        <option value="Vocational School" ${school.type === 'Vocational School' ? 'selected' : ''}>Vocational School</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Location <span class="text-danger">*</span></label>
                                    <select class="form-select" id="editLocation" required>
                                        <option value="Bangkok" ${school.location === 'Bangkok' ? 'selected' : ''}>Bangkok</option>
                                        <option value="Phuket" ${school.location === 'Phuket' ? 'selected' : ''}>Phuket</option>
                                        <option value="Chiang Mai" ${school.location === 'Chiang Mai' ? 'selected' : ''}>Chiang Mai</option>
                                        <option value="Pattaya" ${school.location === 'Pattaya' ? 'selected' : ''}>Pattaya</option>
                                    </select>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Address <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="editAddress" value="${school.address}" required>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Description <span class="text-danger">*</span></label>
                                    <textarea class="form-control" id="editDescription" rows="3" required>${school.description}</textarea>
                                </div>
                            </div>

                            <!-- Images -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-image me-2"></i>รูปภาพ
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Logo URL</label>
                                    <input type="url" class="form-control" id="editLogoUrl" value="${school.logo}">
                                    <img src="${school.logo}" alt="Logo" class="img-thumbnail mt-2" style="max-height: 100px;">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Cover Image URL</label>
                                    <input type="url" class="form-control" id="editCoverImageUrl" value="${school.coverImage}">
                                    <img src="${school.coverImage}" alt="Cover" class="img-thumbnail mt-2" style="max-height: 100px;">
                                </div>
                            </div>

                            <!-- Contact -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-telephone me-2"></i>ข้อมูลการติดต่อ
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-4">
                                    <label class="form-label">Website</label>
                                    <input type="url" class="form-control" id="editWebsite" value="${school.website}">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" id="editContactEmail" value="${school.contactEmail}">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Phone</label>
                                    <input type="text" class="form-control" id="editContactPhone" value="${school.contactPhone}">
                                </div>
                            </div>

                            <!-- Programs -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-book me-2"></i>หลักสูตร
                            </h6>
                            <div id="editProgramsContainer" class="mb-4">
                                ${school.programs.map((prog, index) => `
                                    <div class="program-item mb-3 p-3 border rounded">
                                        <div class="row g-3">
                                            <div class="col-md-5">
                                                <label class="form-label">Program Name</label>
                                                <input type="text" class="form-control program-name" value="${prog.name}">
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Duration</label>
                                                <input type="text" class="form-control program-duration" value="${prog.duration}">
                                            </div>
                                            <div class="col-md-3">
                                                <label class="form-label">Degree</label>
                                                <select class="form-select program-degree">
                                                    <option value="Bachelor" ${prog.degree === 'Bachelor' ? 'selected' : ''}>Bachelor</option>
                                                    <option value="Master" ${prog.degree === 'Master' ? 'selected' : ''}>Master</option>
                                                    <option value="Diploma" ${prog.degree === 'Diploma' ? 'selected' : ''}>Diploma</option>
                                                    <option value="Certificate" ${prog.degree === 'Certificate' ? 'selected' : ''}>Certificate</option>
                                                </select>
                                            </div>
                                            <div class="col-md-1 d-flex align-items-end">
                                                <button type="button" class="btn btn-danger btn-sm" onclick="$(this).closest('.program-item').remove()">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <button type="button" class="btn btn-outline-primary btn-sm mb-4" onclick="addEditProgramField()">
                                <i class="bi bi-plus-circle me-2"></i>เพิ่มหลักสูตร
                            </button>

                            <!-- Additional Info -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-award me-2"></i>ข้อมูลเพิ่มเติม
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Accreditations (คั่นด้วย comma)</label>
                                    <input type="text" class="form-control" id="editAccreditations" value="${school.accreditations ? school.accreditations.join(', ') : ''}">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Partnerships (คั่นด้วย comma)</label>
                                    <input type="text" class="form-control" id="editPartnerships" value="${school.partnerships ? school.partnerships.join(', ') : ''}">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Tuition Fee</label>
                                    <input type="text" class="form-control" id="editTuitionFee" value="${school.tuitionFee || ''}">
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Job Placement Rate</label>
                                    <input type="text" class="form-control" id="editJobPlacementRate" value="${school.jobPlacementRate || ''}">
                                </div>
                                <div class="col-md-4 d-flex align-items-end">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="editVerified" ${school.verified ? 'checked' : ''}>
                                        <label class="form-check-label" for="editVerified">
                                            <i class="bi bi-patch-check text-success me-1"></i>Verified
                                        </label>
                                    </div>
                                    <div class="form-check form-switch ms-3">
                                        <input class="form-check-input" type="checkbox" id="editFeatured" ${school.featured ? 'checked' : ''}>
                                        <label class="form-check-label" for="editFeatured">
                                            <i class="bi bi-star text-warning me-1"></i>Featured
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-success" onclick="updateSchool()">
                            <i class="bi bi-save me-2"></i>บันทึกการแก้ไข
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#editSchoolModal').remove();
    $('body').append(modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('editSchoolModal'));
    modal.show();
    
    $('#editSchoolModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

// Add program field for edit
function addEditProgramField() {
    const programHtml = `
        <div class="program-item mb-3 p-3 border rounded">
            <div class="row g-3">
                <div class="col-md-5">
                    <label class="form-label">Program Name</label>
                    <input type="text" class="form-control program-name" placeholder="Bachelor of Arts in Hospitality">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Duration</label>
                    <input type="text" class="form-control program-duration" placeholder="4 years">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Degree</label>
                    <select class="form-select program-degree">
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                    </select>
                </div>
                <div class="col-md-1 d-flex align-items-end">
                    <button type="button" class="btn btn-danger btn-sm" onclick="$(this).closest('.program-item').remove()">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    $('#editProgramsContainer').append(programHtml);
}

// Update school
function updateSchool() {
    const schoolId = $('#editSchoolId').val();
    const schoolIndex = allSchoolsData.findIndex(s => s.schoolId === schoolId);
    
    if (schoolIndex === -1) return;

    // Get programs
    const programs = [];
    $('#editProgramsContainer .program-item').each(function() {
        const name = $(this).find('.program-name').val();
        const duration = $(this).find('.program-duration').val();
        const degree = $(this).find('.program-degree').val();
        if (name && duration) {
            programs.push({ name, duration, degree });
        }
    });

    if (programs.length === 0) {
        alert('กรุณาเพิ่มหลักสูตรอย่างน้อย 1 หลักสูตร');
        return;
    }

    // Parse arrays
    const accreditations = $('#editAccreditations').val() ? $('#editAccreditations').val().split(',').map(s => s.trim()) : [];
    const partnerships = $('#editPartnerships').val() ? $('#editPartnerships').val().split(',').map(s => s.trim()) : [];

    // Update school data
    allSchoolsData[schoolIndex] = {
        ...allSchoolsData[schoolIndex],
        schoolName: $('#editSchoolName').val(),
        shortName: $('#editShortName').val(),
        type: $('#editSchoolType').val(),
        location: $('#editLocation').val(),
        address: $('#editAddress').val(),
        description: $('#editDescription').val(),
        logo: $('#editLogoUrl').val(),
        coverImage: $('#editCoverImageUrl').val(),
        website: $('#editWebsite').val(),
        contactEmail: $('#editContactEmail').val(),
        contactPhone: $('#editContactPhone').val(),
        programs,
        accreditations,
        partnerships,
        tuitionFee: $('#editTuitionFee').val(),
        jobPlacementRate: $('#editJobPlacementRate').val(),
        verified: $('#editVerified').is(':checked'),
        featured: $('#editFeatured').is(':checked')
    };

    // Update display
    updateSchoolStats();
    displaySchools(allSchoolsData);

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('editSchoolModal')).hide();

    // Show success message
    showSuccessAlert('อัพเดทสำเร็จ!', 'ข้อมูลสถาบันถูกอัพเดทแล้ว');
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
