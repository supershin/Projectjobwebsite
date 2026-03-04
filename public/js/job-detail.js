// ========================================
// Job Detail Page JavaScript
// ========================================

let currentJob = null;

$(document).ready(function() {
    loadJobDetail();
});

// Load job detail
async function loadJobDetail() {
    try {
        // Get job ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');
        
        if (!jobId) {
            showError('ไม่พบรหัสงาน');
            return;
        }
        
        // Load jobs from JSON
        const response = await fetch('./data/jobs.json');
        const jobs = await response.json();
        
        // Find job by ID
        currentJob = jobs.find(job => job.id === jobId);
        
        if (!currentJob) {
            showError('ไม่พบงานที่ค้นหา');
            return;
        }
        
        displayJobDetail(currentJob);
    } catch (error) {
        console.error('Error loading job:', error);
        showError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    }
}

// Display job detail
function displayJobDetail(job) {
    // Update page title
    document.title = `${job.title} - ${job.company} - JobHub`;
    
    // Company logo
    $('#companyLogo').attr('src', job.companyLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}`);
    
    // Job header
    $('#jobTitle').text(job.title);
    $('#companyName').text(job.company);
    $('#jobLocation').text(job.location);
    $('#jobType').text(formatJobType(job.type));
    $('#jobCategory').text(job.category);
    $('#jobSalary').text(job.salary);
    
    // Job description
    $('#jobDescription').html(job.description);
    
    // Requirements
    const requirementsList = $('#jobRequirements');
    requirementsList.empty();
    job.requirements.forEach(req => {
        requirementsList.append(`
            <li class="mb-2">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                ${req}
            </li>
        `);
    });
    
    // Benefits
    const benefitsContainer = $('#jobBenefits');
    benefitsContainer.empty();
    job.benefits.forEach(benefit => {
        benefitsContainer.append(`
            <span class="badge badge-custom me-2 mb-2">
                <i class="bi bi-star-fill"></i> ${benefit}
            </span>
        `);
    });
    
    // Job info sidebar
    $('#postedDate').text(formatDate(job.postedDate));
    $('#expiryDate').text(formatDate(job.expiryDate));
    $('#applicantsCount').text(job.applicantsCount);
    
    // Status badge
    const statusBadge = $('#jobStatus');
    statusBadge.removeClass('bg-success bg-danger bg-warning');
    
    if (job.status === 'active') {
        statusBadge.addClass('bg-success').text('เปิดรับสมัคร');
    } else if (job.status === 'closed') {
        statusBadge.addClass('bg-danger').text('ปิดรับสมัคร');
    } else {
        statusBadge.addClass('bg-warning').text('แบบร่าง');
    }
}

// Show error
function showError(message) {
    const container = $('.job-detail-content .container');
    container.html(`
        <div class="text-center py-5">
            <i class="bi bi-exclamation-circle" style="font-size: 4rem; color: var(--danger);"></i>
            <h3 class="mt-3">${message}</h3>
            <a href="jobs.html" class="btn btn-primary-custom mt-3">กลับไปหน้างานทั้งหมด</a>
        </div>
    `);
}

// Submit application
function submitApplication() {
    if (!isLoggedIn()) {
        showNotification('กรุณาเข้าสู่ระบบก่อนสมัครงาน', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    const name = $('#applicantName').val();
    const email = $('#applicantEmail').val();
    const phone = $('#applicantPhone').val();
    const resumeFile = $('#resumeFile')[0].files[0];
    const coverLetter = $('#coverLetter').val();
    
    // Validate
    if (!name || !email || !phone || !resumeFile) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    // In production, you would upload the file and send data to API
    // For demo, just show success message
    
    showNotification('ส่งใบสมัครสำเร็จ!', 'success');
    
    // Close modal
    $('#applyModal').modal('hide');
    
    // Reset form
    $('#applyForm')[0].reset();
    
    // Update applicants count
    if (currentJob) {
        currentJob.applicantsCount++;
        $('#applicantsCount').text(currentJob.applicantsCount);
    }
}

// Share functions
function shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function shareOnTwitter() {
    const url = window.location.href;
    const text = `${currentJob.title} at ${currentJob.company}`;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
}

function shareOnLine() {
    const url = window.location.href;
    const text = `${currentJob.title} at ${currentJob.company}`;
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showNotification('คัดลอกลิงก์สำเร็จ', 'success');
    });
}

// Save job
$('#saveJobBtn').on('click', function() {
    if (!isLoggedIn()) {
        showNotification('กรุณาเข้าสู่ระบบก่อนบันทึกงาน', 'warning');
        return;
    }
    
    // Toggle saved state
    const icon = $(this).find('i');
    if (icon.hasClass('bi-bookmark')) {
        icon.removeClass('bi-bookmark').addClass('bi-bookmark-fill');
        $(this).removeClass('btn-outline-primary').addClass('btn-primary');
        showNotification('บันทึกงานสำเร็จ', 'success');
    } else {
        icon.removeClass('bi-bookmark-fill').addClass('bi-bookmark');
        $(this).removeClass('btn-primary').addClass('btn-outline-primary');
        showNotification('ยกเลิกการบันทึก', 'info');
    }
});
