// Admin School View Page
let currentSchool = null;

$(document).ready(function() {
    loadSchoolDetail();
});

async function loadSchoolDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const schoolId = urlParams.get('id');
    
    if (!schoolId) {
        alert('ไม่พบ School ID');
        window.location.href = 'dashboard.html?mode=admin&view=schools';
        return;
    }
    
    try {
        const response = await fetch('./data/hospitality-schools.json');
        const schools = await response.json();
        currentSchool = schools.find(s => s.schoolId === schoolId);
        
        if (!currentSchool) {
            alert('ไม่พบข้อมูลสถาบัน');
            window.location.href = 'dashboard.html?mode=admin&view=schools';
            return;
        }
        
        displaySchoolDetail();
    } catch (error) {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาด');
    }
}

function displaySchoolDetail() {
    const html = `
        <!-- Cover Image -->
        <div class="row mb-4">
            <div class="col-12">
                <div style="height: 300px; border-radius: 12px; overflow: hidden; position: relative;">
                    <img src="${currentSchool.coverImage}" alt="${currentSchool.schoolName}" style="width: 100%; height: 100%; object-fit: cover;">
                    <div style="position: absolute; bottom: 30px; left: 30px;">
                        <img src="${currentSchool.logo}" alt="${currentSchool.schoolName}" style="width: 120px; height: 120px; object-fit: contain; background: white; padding: 10px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                    </div>
                    ${currentSchool.verified ? '<span class="badge bg-success position-absolute top-0 end-0 m-3"><i class="bi bi-patch-check-fill me-2"></i>Verified</span>' : ''}
                    ${currentSchool.featured ? '<span class="badge bg-warning position-absolute" style="top: 50px; right: 12px;"><i class="bi bi-star-fill me-2"></i>Featured</span>' : ''}
                </div>
            </div>
        </div>

        <!-- Basic Info -->
        <div class="row mb-4">
            <div class="col-md-8">
                <h2 class="fw-bold mb-2">${currentSchool.schoolName}</h2>
                <h5 class="text-muted mb-3">${currentSchool.shortName}</h5>
                <p class="lead">${currentSchool.description}</p>
                <div class="mb-3">
                    <span class="badge bg-primary me-2">${currentSchool.type}</span>
                    <span class="badge bg-info">${currentSchool.location}</span>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="fw-bold mb-3"><i class="bi bi-info-circle me-2"></i>ข้อมูลพื้นฐาน</h6>
                        <p class="mb-2"><strong>School ID:</strong><br><code>${currentSchool.schoolId}</code></p>
                        <p class="mb-2"><strong>Established:</strong><br>${currentSchool.establishedYear || '-'}</p>
                        <p class="mb-0"><strong>Website:</strong><br><a href="${currentSchool.website}" target="_blank">${currentSchool.website}</a></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact -->
        <div class="card mb-4">
            <div class="card-header bg-white">
                <h6 class="fw-bold mb-0"><i class="bi bi-geo-alt me-2"></i>ที่อยู่และการติดต่อ</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Address:</strong><br>${currentSchool.address}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Email:</strong> ${currentSchool.contactEmail}</p>
                        <p><strong>Phone:</strong> ${currentSchool.contactPhone}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Programs -->
        ${currentSchool.programs && currentSchool.programs.length > 0 ? `
            <div class="card mb-4">
                <div class="card-header bg-white">
                    <h6 class="fw-bold mb-0"><i class="bi bi-book me-2"></i>หลักสูตร</h6>
                </div>
                <div class="card-body">
                    ${currentSchool.programs.map(p => `
                        <div class="border rounded p-3 mb-3">
                            <h6 class="fw-bold">${p.name}</h6>
                            <div class="row">
                                <div class="col-md-6"><strong>Degree:</strong> ${p.degree}</div>
                                <div class="col-md-6"><strong>Duration:</strong> ${p.duration}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}

        <!-- Stats -->
        ${currentSchool.jobPlacementRate || currentSchool.tuitionFee ? `
            <div class="row">
                ${currentSchool.jobPlacementRate ? `
                    <div class="col-md-6 mb-3">
                        <div class="card bg-success text-white">
                            <div class="card-body">
                                <h6 class="fw-bold"><i class="bi bi-graph-up me-2"></i>Job Placement Rate</h6>
                                <h3>${currentSchool.jobPlacementRate}</h3>
                            </div>
                        </div>
                    </div>
                ` : ''}
                ${currentSchool.tuitionFee ? `
                    <div class="col-md-6 mb-3">
                        <div class="card bg-primary text-white">
                            <div class="card-body">
                                <h6 class="fw-bold"><i class="bi bi-currency-dollar me-2"></i>Tuition Fee</h6>
                                <h3>${currentSchool.tuitionFee}</h3>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        ` : ''}
    `;
    
    $('#schoolDetailContent').html(html);
}

function editSchool() {
    window.location.href = `admin-school-edit.html?id=${currentSchool.schoolId}`;
}
