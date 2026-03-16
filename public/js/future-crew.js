// ========================================
// Future Crew - Main JavaScript
// ========================================

let allInternships = [];
let allSchools = [];
let allJobs = [];
let currentInternshipType = 'all';

$(document).ready(function() {
    // Load all data
    loadInternships();
    loadSchools();
    loadFreshGradJobs();
    
    // Setup event listeners
    setupEventListeners();
});

// ========================================
// Load Internships
// ========================================
async function loadInternships() {
    try {
        const response = await fetch('./data/internships.json');
        allInternships = await response.json();
        
        // Update total count
        $('#totalInternships').text(allInternships.length + '+');
        
        // Display internships
        displayInternships(allInternships);
    } catch (error) {
        console.error('Error loading internships:', error);
        $('#internshipsList').html(`
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle me-2"></i>
                ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง
            </div>
        `);
    }
}

// Display internships
function displayInternships(internships) {
    if (internships.length === 0) {
        $('#internshipsList').html(`
            <div class="text-center py-5">
                <i class="bi bi-inbox" style="font-size: 4rem; color: var(--gray-400);"></i>
                <h5 class="mt-3 text-muted">ไม่พบตำแหน่งฝึกงาน</h5>
            </div>
        `);
        $('#internshipCount').text('0');
        return;
    }

    $('#internshipCount').text(internships.length);

    const html = internships.map(intern => `
        <div class="internship-card">
            <div class="internship-header">
                <div class="internship-logo">
                    <img src="${intern.companyLogo}" alt="${intern.companyName}">
                </div>
                <div class="flex-grow-1">
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <h3 class="internship-title mb-0">${intern.title}</h3>
                        ${intern.featured ? '<span class="featured-badge"><i class="bi bi-star-fill"></i> Featured</span>' : ''}
                    </div>
                    <div class="internship-company">${intern.companyName}</div>
                    <div class="internship-meta">
                        <div class="internship-meta-item">
                            <i class="bi bi-geo-alt-fill text-primary"></i>
                            <span>${intern.location}</span>
                        </div>
                        <div class="internship-meta-item">
                            <i class="bi bi-building text-success"></i>
                            <span>${intern.department}</span>
                        </div>
                        <div class="internship-meta-item">
                            <i class="bi bi-clock text-info"></i>
                            <span>${intern.duration}</span>
                        </div>
                        <div class="internship-meta-item">
                            <i class="bi bi-cash text-warning"></i>
                            <span>${intern.allowance}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="type-badge ${intern.type === 'Hotel Internship' ? 'hotel' : 'trainee'}">
                        ${intern.type}
                    </span>
                </div>
            </div>
            
            <div class="mb-3">
                <p>${intern.description}</p>
            </div>
            
            <div class="row g-3">
                <div class="col-md-6">
                    <strong><i class="bi bi-check-circle me-2 text-success"></i>คุณสมบัติ:</strong>
                    <ul class="mt-2 mb-0">
                        ${intern.requirements.slice(0, 3).map(req => `<li><small>${req}</small></li>`).join('')}
                        ${intern.requirements.length > 3 ? `<li><small class="text-muted">และอื่นๆ...</small></li>` : ''}
                    </ul>
                </div>
                <div class="col-md-6">
                    <strong><i class="bi bi-gift me-2 text-primary"></i>สิทธิประโยชน์:</strong>
                    <ul class="mt-2 mb-0">
                        ${intern.benefits.slice(0, 3).map(ben => `<li><small>${ben}</small></li>`).join('')}
                        ${intern.benefits.length > 3 ? `<li><small class="text-muted">และอื่นๆ...</small></li>` : ''}
                    </ul>
                </div>
            </div>
            
            <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                <div>
                    <small class="text-muted">
                        <i class="bi bi-calendar me-1"></i>เริ่มงาน: ${formatDate(intern.startDate)}
                        <span class="mx-2">|</span>
                        <i class="bi bi-hourglass me-1"></i>ปิดรับ: ${formatDate(intern.applicationDeadline)}
                    </small>
                </div>
                <div>
                    <button class="btn btn-outline-primary btn-sm me-2" onclick="viewInternshipDetails('${intern.internshipId}')">
                        <i class="bi bi-eye me-1"></i>รายละเอียด
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="applyInternship('${intern.internshipId}')">
                        <i class="bi bi-send me-1"></i>สมัครเลย
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    $('#internshipsList').html(html);
}

// ========================================
// Load Schools
// ========================================
async function loadSchools() {
    try {
        const response = await fetch('./data/hospitality-schools.json');
        allSchools = await response.json();
        displaySchools(allSchools);
    } catch (error) {
        console.error('Error loading schools:', error);
        $('#schoolsList').html(`
            <div class="col-12">
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    ไม่สามารถโหลดข้อมูลสถาบันการศึกษาได้
                </div>
            </div>
        `);
    }
}

// Display schools
function displaySchools(schools) {
    const html = schools.map(school => `
        <div class="col-md-6 col-lg-4">
            <div class="school-card">
                <div class="school-cover">
                    <img src="${school.coverImage}" alt="${school.schoolName}">
                    <div class="school-logo-wrapper">
                        <img src="${school.logo}" alt="${school.shortName}">
                    </div>
                </div>
                <div class="school-body">
                    <h5 class="school-name">${school.shortName}</h5>
                    <div class="school-type">
                        <i class="bi bi-building me-1"></i>${school.type} • ${school.location}
                    </div>
                    <p class="text-muted small">${school.description.substring(0, 100)}...</p>
                    
                    <div class="school-programs">
                        <strong><i class="bi bi-book me-2"></i>หลักสูตร (${school.programs.length})</strong>
                        ${school.programs.slice(0, 2).map(prog => `
                            <div class="program-item">
                                <div class="fw-semibold">${prog.degree}</div>
                                <small class="text-muted">${prog.name} (${prog.duration})</small>
                            </div>
                        `).join('')}
                        ${school.programs.length > 2 ? `<small class="text-muted">และอื่นๆ...</small>` : ''}
                    </div>
                    
                    ${school.partnerships && school.partnerships.length > 0 ? `
                        <div class="school-partnerships">
                            <small class="text-muted d-block mb-2"><i class="bi bi-handshake me-1"></i>พันธมิตร:</small>
                            ${school.partnerships.slice(0, 3).map(p => `<span class="partnership-badge">${p}</span>`).join('')}
                            ${school.partnerships.length > 3 ? `<span class="partnership-badge">+${school.partnerships.length - 3}</span>` : ''}
                        </div>
                    ` : ''}
                    
                    <div class="mt-3 pt-3 border-top">
                        ${school.jobPlacementRate ? `
                            <div class="mb-2">
                                <i class="bi bi-graph-up text-success me-2"></i>
                                <strong>Job Placement:</strong> ${school.jobPlacementRate}
                            </div>
                        ` : ''}
                        ${school.tuitionFee ? `
                            <div class="mb-2">
                                <i class="bi bi-credit-card text-primary me-2"></i>
                                <small>ค่าเล่าเรียน: ${school.tuitionFee}</small>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="d-grid gap-2 mt-3">
                        <a href="${school.website}" target="_blank" class="btn btn-primary btn-sm">
                            <i class="bi bi-globe me-2"></i>เยี่ยมชมเว็บไซต์
                        </a>
                        <a href="mailto:${school.contactEmail}" class="btn btn-outline-secondary btn-sm">
                            <i class="bi bi-envelope me-2"></i>ติดต่อสอบถาม
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    $('#schoolsList').html(html);
}

// ========================================
// Load Fresh Graduate Jobs
// ========================================
async function loadFreshGradJobs() {
    try {
        const response = await fetch('./data/jobs.json');
        allJobs = await response.json();
        
        // Filter for fresh graduate jobs (entry level or fresh graduate tags)
        const freshGradJobs = allJobs.filter(job => 
            job.experienceLevel === 'Entry Level' || 
            job.tags?.includes('Fresh Graduate') ||
            job.title.toLowerCase().includes('junior') ||
            job.title.toLowerCase().includes('entry')
        ).slice(0, 10); // Show top 10
        
        displayFreshGradJobs(freshGradJobs);
    } catch (error) {
        console.error('Error loading jobs:', error);
        $('#freshGradJobsList').html(`
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle me-2"></i>
                ไม่สามารถโหลดข้อมูลงานได้
            </div>
        `);
    }
}

// Display fresh grad jobs
function displayFreshGradJobs(jobs) {
    if (jobs.length === 0) {
        $('#freshGradJobsList').html(`
            <div class="text-center py-5">
                <i class="bi bi-inbox" style="font-size: 4rem; color: var(--gray-400);"></i>
                <h5 class="mt-3 text-muted">ไม่พบงานสำหรับบัณฑิตจบใหม่ในขณะนี้</h5>
            </div>
        `);
        return;
    }

    const html = jobs.map(job => `
        <div class="internship-card">
            <div class="internship-header">
                <div class="flex-grow-1">
                    <h3 class="internship-title">${job.title}</h3>
                    <div class="internship-company">${job.company}</div>
                    <div class="internship-meta">
                        <div class="internship-meta-item">
                            <i class="bi bi-geo-alt-fill text-primary"></i>
                            <span>${job.location}</span>
                        </div>
                        <div class="internship-meta-item">
                            <i class="bi bi-building text-success"></i>
                            <span>${job.department}</span>
                        </div>
                        <div class="internship-meta-item">
                            <i class="bi bi-clock text-info"></i>
                            <span>${job.type}</span>
                        </div>
                        <div class="internship-meta-item">
                            <i class="bi bi-cash text-warning"></i>
                            <span>${job.salary}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="badge bg-success">Entry Level</span>
                </div>
            </div>
            
            <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                <div>
                    <span class="badge bg-primary">${job.applicantsCount} applicants</span>
                    <small class="text-muted ms-3">
                        <i class="bi bi-clock me-1"></i>Posted ${formatDateAgo(job.postedDate)}
                    </small>
                </div>
                <div>
                    <a href="jobs.html?id=${job.id}" class="btn btn-outline-primary btn-sm me-2">
                        <i class="bi bi-eye me-1"></i>ดูรายละเอียด
                    </a>
                    <a href="jobs.html?id=${job.id}" class="btn btn-primary btn-sm">
                        <i class="bi bi-send me-1"></i>สมัครงาน
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    $('#freshGradJobsList').html(html);
}

// ========================================
// Event Listeners
// ========================================
function setupEventListeners() {
    // Internship type tabs
    $('#internshipTypeTabs .nav-link').on('click', function() {
        $('#internshipTypeTabs .nav-link').removeClass('active');
        $(this).addClass('active');
        
        currentInternshipType = $(this).data('type');
        filterInternships();
    });
    
    // Filters
    $('#internshipSearch').on('input', filterInternships);
    $('#internshipLocation').on('change', filterInternships);
    $('#internshipDepartment').on('change', filterInternships);
}

// Filter internships
function filterInternships() {
    const searchTerm = $('#internshipSearch').val().toLowerCase();
    const location = $('#internshipLocation').val();
    const department = $('#internshipDepartment').val();

    let filtered = allInternships.filter(intern => {
        const matchSearch = intern.title.toLowerCase().includes(searchTerm) ||
                          intern.companyName.toLowerCase().includes(searchTerm) ||
                          intern.description.toLowerCase().includes(searchTerm);
        const matchLocation = !location || intern.location === location;
        const matchDepartment = !department || intern.department === department;
        const matchType = currentInternshipType === 'all' || intern.type === currentInternshipType;

        return matchSearch && matchLocation && matchDepartment && matchType;
    });

    displayInternships(filtered);
}

// Clear filters
function clearInternshipFilters() {
    $('#internshipSearch').val('');
    $('#internshipLocation').val('');
    $('#internshipDepartment').val('');
    currentInternshipType = 'all';
    $('#internshipTypeTabs .nav-link').removeClass('active');
    $('#internshipTypeTabs .nav-link').first().addClass('active');
    displayInternships(allInternships);
}

// ========================================
// View Details & Apply
// ========================================
function viewInternshipDetails(internshipId) {
    const intern = allInternships.find(i => i.internshipId === internshipId);
    if (!intern) return;

    const modalHtml = `
        <div class="modal fade" id="internshipDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${intern.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex align-items-center gap-3 mb-4">
                            <img src="${intern.companyLogo}" alt="${intern.companyName}" style="width: 80px; height: 80px; object-fit: contain; border-radius: 12px; border: 1px solid #e5e7eb;">
                            <div>
                                <h5 class="mb-1">${intern.companyName}</h5>
                                <div class="text-muted">
                                    <i class="bi bi-geo-alt"></i> ${intern.location} • 
                                    <i class="bi bi-building"></i> ${intern.department}
                                </div>
                            </div>
                        </div>
                        
                        <h6 class="fw-bold">รายละเอียด</h6>
                        <p>${intern.description}</p>
                        
                        <h6 class="fw-bold mt-4">คุณสมบัติ</h6>
                        <ul>
                            ${intern.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                        
                        <h6 class="fw-bold mt-4">สิทธิประโยชน์</h6>
                        <ul>
                            ${intern.benefits.map(ben => `<li>${ben}</li>`).join('')}
                        </ul>
                        
                        <div class="row mt-4">
                            <div class="col-6">
                                <strong>ระยะเวลา:</strong> ${intern.duration}
                            </div>
                            <div class="col-6">
                                <strong>เบี้ยเลี้ยง:</strong> ${intern.allowance}
                            </div>
                            <div class="col-6 mt-2">
                                <strong>เริ่มงาน:</strong> ${formatDate(intern.startDate)}
                            </div>
                            <div class="col-6 mt-2">
                                <strong>ปิดรับสมัคร:</strong> ${formatDate(intern.applicationDeadline)}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                        <button type="button" class="btn btn-primary" onclick="applyInternship('${intern.internshipId}')">
                            <i class="bi bi-send me-2"></i>สมัครเลย
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#internshipDetailModal').remove();
    $('body').append(modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('internshipDetailModal'));
    modal.show();
    
    $('#internshipDetailModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

function applyInternship(internshipId) {
    // Close any open modals
    $('.modal').modal('hide');
    
    // Show alert (in production, this would redirect to application form)
    alert('กำลังพาคุณไปยังหน้าสมัครงาน...\n\nในระบบจริงจะมีฟอร์มสมัครงานให้กรอกข้อมูล');
    
    // In production:
    // window.location.href = `apply.html?type=internship&id=${internshipId}`;
}

// ========================================
// Utility Functions
// ========================================
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 
                   'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() + 543}`;
}

function formatDateAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'วันนี้';
    if (diffDays === 1) return 'เมื่อวาน';
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`;
    return `${Math.floor(diffDays / 30)} เดือนที่แล้ว`;
}
