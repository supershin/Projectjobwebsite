// ========================================
// JOB FUNCTIONS - Updated to use Job Data Model
// ========================================

/**
 * Override generateEmployerJobsList function to use MOCK_JOBS
 */
function generateEmployerJobsList(type) {
    // Get jobs from MOCK_JOBS
    const companyId = 1; // Current company ID (in real app, get from session)
    let jobs = getJobsByCompany(companyId);
    
    // Filter by type
    const filteredJobs = jobs.filter(j => {
        if (type === 'closed') {
            return j.status === 'closed';
        } else {
            return j.status === 'active' || j.status === 'pending';
        }
    });
    
    if (filteredJobs.length === 0) {
        return `
            <div class="text-center py-5">
                <i class="bi bi-inbox fs-1 text-muted"></i>
                <p class="text-muted mt-3">ไม่มีงาน${type === 'closed' ? 'ที่ปิดรับแล้ว' : 'ที่เปิดรับอยู่'}</p>
            </div>
        `;
    }
    
    return `
        <div class="row g-4">
            ${filteredJobs.map(job => `
                <div class="col-lg-6">
                    <div class="card job-card h-100 shadow-sm border-0">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h5 class="fw-bold mb-2">${job.jobTitle}</h5>
                                    <p class="text-muted mb-2">
                                        <i class="bi bi-geo-alt me-1"></i>${job.locationDisplay}
                                        <span class="mx-2">•</span>
                                        <i class="bi bi-cash me-1"></i>${job.salaryDisplay}
                                    </p>
                                    <div class="d-flex gap-2 flex-wrap">
                                        <span class="badge bg-primary text-white px-3 py-2">${job.jobTypeDisplay}</span>
                                        <span class="badge bg-info text-white px-3 py-2">${job.jobPatternDisplay}</span>
                                        ${job.specialPosition ? '<span class="badge bg-success text-white px-2 py-1"><i class="bi bi-star-fill me-1"></i>พิเศษ</span>' : ''}
                                    </div>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-light" data-bs-toggle="dropdown">
                                        <i class="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" href="#" onclick="editJob(${job.id}); return false;"><i class="bi bi-pencil me-2"></i>แก้ไข</a></li>
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
                                    <i class="bi bi-clock me-1"></i>โพสต์เมื่อ ${job.postedDateDisplay}
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

/**
 * Override generateSavedJobCards function to use MOCK_JOBS
 */
function generateSavedJobCards() {
    const jobs = getActiveJobs().slice(0, 4); // Get first 4 active jobs
    
    return jobs.map(job => `
        <div class="col-md-6 col-lg-4">
            <div class="card job-card h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${job.companyLogo}" alt="${job.companyName}" class="rounded me-3" width="48" height="48">
                        <div>
                            <h6 class="mb-0 fw-bold">${job.jobTitle}</h6>
                            <small class="text-muted">${job.companyName}</small>
                        </div>
                    </div>
                    <p class="text-muted small mb-2">
                        <i class="bi bi-geo-alt me-1"></i>${job.locationDisplay}
                        <span class="mx-2">•</span>
                        ${job.jobTypeDisplay}
                    </p>
                    <p class="text-primary fw-bold mb-3">
                        <i class="bi bi-cash me-1"></i>${job.salaryDisplay}
                    </p>
                    <div class="d-flex gap-2">
                        <a href="job-detail.html?id=${job.id}" class="btn btn-sm btn-outline-primary flex-fill">
                            <i class="bi bi-eye me-1"></i>ดูรายละเอียด
                        </a>
                        <button class="btn btn-sm btn-outline-danger" onclick="unsaveJob(${job.id})">
                            <i class="bi bi-bookmark-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Override generateImprovedSavedJobCards function to use MOCK_JOBS
 */
function generateImprovedSavedJobCards() {
    const jobs = getActiveJobs().slice(0, 4);
    
    return jobs.map(job => `
        <div class="col-md-6 col-lg-4">
            <div class="card job-card h-100 shadow-sm border-0">
                <div class="card-body">
                    <div class="d-flex align-items-start mb-3">
                        <img src="${job.companyLogo}" alt="${job.companyName}" class="rounded me-3" width="56" height="56">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold">${job.jobTitle}</h6>
                            <small class="text-muted d-block mb-1">${job.companyName}</small>
                            <span class="badge bg-primary bg-opacity-10 text-primary px-2 py-1">${job.jobTypeDisplay}</span>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="unsaveJob(${job.id})" title="ลบออกจากรายการที่บันทึก">
                            <i class="bi bi-bookmark-fill"></i>
                        </button>
                    </div>
                    
                    <div class="mb-3">
                        <small class="text-muted d-block mb-2">
                            <i class="bi bi-geo-alt text-danger me-1"></i>${job.locationDisplay}
                        </small>
                        <small class="text-muted d-block mb-2">
                            <i class="bi bi-cash text-success me-1"></i>${job.salaryDisplay}
                        </small>
                        <small class="text-muted d-block">
                            <i class="bi bi-laptop text-info me-1"></i>${job.jobPatternDisplay}
                        </small>
                    </div>
                    
                    <a href="job-detail.html?id=${job.id}" class="btn btn-outline-primary btn-sm w-100">
                        <i class="bi bi-eye me-1"></i>ดูรายละเอียดและสมัคร
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Override generateAdminJobsList function to use MOCK_JOBS
 */
function generateAdminJobsList() {
    const jobs = MOCK_JOBS;
    
    return `
        <div class="list-group list-group-flush">
            ${jobs.map(job => `
                <div class="list-group-item p-3 hover-shadow job-item" data-status="${job.status}">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img src="${job.companyLogo}" alt="${job.companyName}" class="rounded" width="56" height="56">
                        </div>
                        <div class="col">
                            <h6 class="mb-1 fw-bold">${job.jobTitle}</h6>
                            <small class="text-muted d-block">
                                <i class="bi bi-building me-1"></i>${job.companyName}
                            </small>
                            <small class="text-muted">
                                <i class="bi bi-geo-alt me-1"></i>${job.locationDisplay}
                                <span class="mx-2">•</span>
                                <i class="bi bi-cash me-1"></i>${job.salaryDisplay}
                                <span class="mx-2">•</span>
                                <i class="bi bi-calendar3 me-1"></i>${job.postedDateDisplay}
                            </small>
                        </div>
                        <div class="col-auto">
                            <span class="badge bg-${job.statusClass} px-3 py-2">${job.statusText}</span>
                        </div>
                        <div class="col-auto">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" onclick="viewJobDetailAdmin(${job.id})">
                                    <i class="bi bi-eye me-1"></i> ดู
                                </button>
                                ${job.status === 'pending' ? `
                                    <button class="btn btn-sm btn-outline-success" onclick="approveJobAdmin(${job.id})" title="อนุมัติ">
                                        <i class="bi bi-check-circle"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" onclick="rejectJobAdmin(${job.id})" title="ปฏิเสธ">
                                        <i class="bi bi-x-circle"></i>
                                    </button>
                                ` : ''}
                                <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item" href="#" onclick="editJobAdmin(${job.id})"><i class="bi bi-pencil me-2"></i>แก้ไข</a></li>
                                    <li><a class="dropdown-item" href="#" onclick="viewJobStats(${job.id})"><i class="bi bi-graph-up me-2"></i>สถิติ</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item text-danger" href="#" onclick="deleteJobAdmin(${job.id})"><i class="bi bi-trash me-2"></i>ลบ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * View Job Detail - Show full job information
 */
function viewJobDetailAdmin(id) {
    const job = getJobById(id);
    if (!job) {
        showNotification('ไม่พบข้อมูลงาน', 'error');
        return;
    }
    
    const modalHtml = `
        <div class="modal fade" id="jobDetailModal" tabindex="-1">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header bg-gradient text-white border-0">
                        <h5 class="modal-title fw-bold">
                            <i class="bi bi-briefcase-fill me-2"></i>${job.jobTitle}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Company Info -->
                        <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
                            <img src="${job.companyLogo}" alt="${job.companyName}" class="rounded me-3" width="80" height="80">
                            <div>
                                <h5 class="mb-1 fw-bold">${job.companyName}</h5>
                                <p class="text-muted mb-2">
                                    <i class="bi bi-geo-alt me-1"></i>${job.locationDisplay}
                                    <span class="mx-2">•</span>
                                    <i class="bi bi-cash me-1"></i>${job.salaryDisplay}
                                </p>
                                <div class="d-flex gap-2">
                                    <span class="badge bg-primary">${job.jobTypeDisplay}</span>
                                    <span class="badge bg-info">${job.jobPatternDisplay}</span>
                                    <span class="badge bg-${job.statusClass}">${job.statusText}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Job Details -->
                        <div class="row g-4">
                            <div class="col-md-6">
                                <h6 class="fw-bold mb-3"><i class="bi bi-info-circle me-2"></i>ข้อมูลพื้นฐาน</h6>
                                <table class="table table-sm">
                                    <tr><td class="text-muted">ตำแหน่ง:</td><td>${getJobPositionDisplay(job.jobPosition)}</td></tr>
                                    <tr><td class="text-muted">จำนวนที่รับ:</td><td>${job.quantity} ตำแหน่ง</td></tr>
                                    <tr><td class="text-muted">เพศ:</td><td>${job.gender === 'any' ? 'ไม่ระบุ' : job.gender === 'male' ? 'ชาย' : 'หญิง'}</td></tr>
                                    <tr><td class="text-muted">อายุ:</td><td>${job.age === 'any' ? 'ไม่ระบุ' : job.age + ' ปี'}</td></tr>
                                    <tr><td class="text-muted">การศึกษา:</td><td>${getEducationDisplay(job.education)}</td></tr>
                                    <tr><td class="text-muted">ประสบการณ์:</td><td>${job.experience === '0' ? 'ไม่จำเป็นต้องมีประสบการณ์' : job.experience + ' ปี'}</td></tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold mb-3"><i class="bi bi-graph-up me-2"></i>สถิติ</h6>
                                <table class="table table-sm">
                                    <tr><td class="text-muted">จำนวนผู้สมัคร:</td><td class="fw-bold text-success">${job.applicants} คน</td></tr>
                                    <tr><td class="text-muted">จำนวนการดู:</td><td class="fw-bold text-info">${job.views} ครั้ง</td></tr>
                                    <tr><td class="text-muted">วันที่ประกาศ:</td><td>${job.postedDate}</td></tr>
                                    <tr><td class="text-muted">งานพิเศษ:</td><td>${job.specialPosition ? '<span class="badge bg-success">ใช่</span>' : '<span class="badge bg-secondary">ไม่</span>'}</td></tr>
                                    <tr><td class="text-muted">จำกัดงวน:</td><td>${job.limitDuration === 'yes' ? '<span class="badge bg-warning">ใช่</span>' : '<span class="badge bg-secondary">ไม่</span>'}</td></tr>
                                </table>
                            </div>
                        </div>
                        
                        <hr>
                        
                        <!-- Job Description -->
                        <div class="mb-4">
                            <h6 class="fw-bold mb-3"><i class="bi bi-file-text me-2"></i>รายละเอียดงาน</h6>
                            <p class="text-muted">${job.jobDescription}</p>
                        </div>
                        
                        <!-- Qualification -->
                        <div class="mb-4">
                            <h6 class="fw-bold mb-3"><i class="bi bi-list-check me-2"></i>คุณสมบัติผู้สมัคร</h6>
                            <pre class="text-muted" style="white-space: pre-wrap; font-family: inherit;">${job.qualification}</pre>
                        </div>
                        
                        <!-- Welfare -->
                        <div class="mb-4">
                            <h6 class="fw-bold mb-3"><i class="bi bi-gift me-2"></i>สวัสดิการ</h6>
                            <pre class="text-muted" style="white-space: pre-wrap; font-family: inherit;">${job.welfare}</pre>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>ปิด
                        </button>
                        ${job.status === 'pending' ? `
                            <button type="button" class="btn btn-success" onclick="approveJobAdmin(${job.id}); $('#jobDetailModal').modal('hide');">
                                <i class="bi bi-check-circle me-2"></i>อนุมัติ
                            </button>
                            <button type="button" class="btn btn-danger" onclick="rejectJobAdmin(${job.id}); $('#jobDetailModal').modal('hide');">
                                <i class="bi bi-x-circle me-2"></i>ปฏิเสธ
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#jobDetailModal').remove();
    $('body').append(modalHtml);
    $('#jobDetailModal').modal('show');
}

/**
 * Approve Job (Admin)
 */
function approveJobAdmin(id) {
    showNotification('อนุมัติงานสำเร็จ! (Job ID: ' + id + ')', 'success');
    setTimeout(() => {
        if (typeof loadAdminJobs === 'function') {
            loadAdminJobs();
        }
    }, 1000);
}

/**
 * Reject Job (Admin)
 */
function rejectJobAdmin(id) {
    if (confirm('ยืนยันการปฏิเสธงานนี้?')) {
        showNotification('ปฏิเสธงานแล้ว (Job ID: ' + id + ')', 'info');
        setTimeout(() => {
            if (typeof loadAdminJobs === 'function') {
                loadAdminJobs();
            }
        }, 1000);
    }
}

/**
 * Delete Job (Admin)
 */
function deleteJobAdmin(id) {
    if (confirm('ยืนยันการลบงานนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
        showNotification('ลบงานสำเร็จ (Job ID: ' + id + ')', 'success');
        setTimeout(() => {
            if (typeof loadAdminJobs === 'function') {
                loadAdminJobs();
            }
        }, 1000);
    }
}

// Additional helper functions
function unsaveJob(id) {
    showNotification('ลบออกจากรายการที่บันทึกแล้ว', 'success');
    // Reload the saved jobs section
    setTimeout(() => {
        if (typeof loadUserSavedJobs === 'function') {
            loadUserSavedJobs();
        }
    }, 500);
}

function viewJobStats(id) {
    showNotification('กำลังโหลดสถิติงาน... (Job ID: ' + id + ')', 'info');
}

// Edit Job - Redirect to edit page
function editJob(id) {
    window.location.href = `employer-edit-job.html?id=${id}`;
}

// Delete Job
function deleteJob(id) {
    if (confirm('ยืนยันการลบงานนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
        showNotification('ลบงานสำเร็จ (Job ID: ' + id + ')', 'success');
        setTimeout(() => {
            if (typeof loadEmployerJobs === 'function') {
                loadEmployerJobs();
            }
        }, 1000);
    }
}