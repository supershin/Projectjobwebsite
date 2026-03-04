// ========================================
// Post Job Page JavaScript
// ========================================

$(document).ready(function() {
    // Check if user is logged in and is employer
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    const user = getCurrentUser();
    if (user.role !== 'employer' && user.role !== 'admin') {
        showNotification('คุณไม่มีสิทธิ์เข้าถึงหน้านี้', 'error');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        return;
    }
    
    setupFormHandlers();
});

// Setup form handlers
function setupFormHandlers() {
    // Add requirement
    $('#addRequirement').on('click', function() {
        const newInput = `
            <div class="input-group mb-2 requirement-item">
                <input type="text" class="form-control requirement-input" placeholder="เช่น มีประสบการณ์ 2 ปีขึ้นไป">
                <button class="btn btn-outline-danger remove-requirement" type="button">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `;
        $('#requirementsContainer').append(newInput);
    });
    
    // Remove requirement
    $(document).on('click', '.remove-requirement', function() {
        $(this).closest('.requirement-item').remove();
    });
    
    // Add benefit
    $('#addBenefit').on('click', function() {
        const newInput = `
            <div class="input-group mb-2 benefit-item">
                <input type="text" class="form-control benefit-input" placeholder="เช่น ประกันสุขภาพ">
                <button class="btn btn-outline-danger remove-benefit" type="button">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `;
        $('#benefitsContainer').append(newInput);
    });
    
    // Remove benefit
    $(document).on('click', '.remove-benefit', function() {
        $(this).closest('.benefit-item').remove();
    });
    
    // Save draft
    $('#saveDraftBtn').on('click', function() {
        saveJob('draft');
    });
    
    // Submit form
    $('#postJobForm').on('submit', function(e) {
        e.preventDefault();
        saveJob('active');
    });
}

// Save job
async function saveJob(status) {
    // Collect form data
    const jobData = {
        title: $('#jobTitle').val(),
        company: $('#companyName').val(),
        category: $('#jobCategory').val(),
        type: $('#jobType').val(),
        location: $('#jobLocation').val(),
        salary: $('#jobSalary').val(),
        description: $('#jobDescription').val(),
        requirements: [],
        benefits: [],
        expiryDate: $('#expiryDate').val(),
        status: status
    };
    
    // Collect requirements
    $('.requirement-input').each(function() {
        const value = $(this).val().trim();
        if (value) {
            jobData.requirements.push(value);
        }
    });
    
    // Collect benefits
    $('.benefit-input').each(function() {
        const value = $(this).val().trim();
        if (value) {
            jobData.benefits.push(value);
        }
    });
    
    // Validate
    if (!jobData.title || !jobData.company || !jobData.category || !jobData.type || 
        !jobData.location || !jobData.salary || !jobData.description) {
        showNotification('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'warning');
        return;
    }
    
    if (jobData.requirements.length === 0) {
        showNotification('กรุณาเพิ่มคุณสมบัติที่ต้องการอย่างน้อย 1 รายการ', 'warning');
        return;
    }
    
    try {
        // Show loading
        const submitBtn = status === 'draft' ? $('#saveDraftBtn') : $('#postJobForm button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<span class="spinner-border spinner-border-sm me-2"></span>กำลังบันทึก...').prop('disabled', true);
        
        if (status === 'active') {
            // Show payment modal for active jobs
            submitBtn.html(originalText).prop('disabled', false);
            showPaymentModal(jobData);
        } else {
            // Save draft directly
            const result = await saveJobToDraft(jobData);
            
            if (result.success) {
                showNotification('บันทึกแบบร่างสำเร็จ!', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showNotification('เกิดข้อผิดพลาดในการบันทึก', 'error');
                submitBtn.html(originalText).prop('disabled', false);
            }
        }
    } catch (error) {
        console.error('Error saving job:', error);
        showNotification('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
    }
}

// Show payment modal
function showPaymentModal(jobData) {
    // Store job data temporarily
    window.pendingJobData = jobData;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
    modal.show();
}

// Confirm payment
$('#confirmPaymentBtn').on('click', async function() {
    const paymentMethod = $('input[name="paymentMethod"]:checked').val();
    
    if (!paymentMethod) {
        showNotification('กรุณาเลือกวิธีการชำระเงิน', 'warning');
        return;
    }
    
    try {
        // Show loading
        const originalText = $(this).html();
        $(this).html('<span class="spinner-border spinner-border-sm me-2"></span>กำลังชำระเงิน...').prop('disabled', true);
        
        // Process payment
        const paymentResult = await processPayment({
            method: paymentMethod,
            amount: 299
        });
        
        if (paymentResult.success) {
            // Save job after payment success
            const jobResult = await publishJob(window.pendingJobData);
            
            if (jobResult.success) {
                // Close modal
                $('#paymentModal').modal('hide');
                
                showNotification('ชำระเงินและประกาศงานสำเร็จ!', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showNotification('เกิดข้อผิดพลาดในการประกาศงาน', 'error');
                $(this).html(originalText).prop('disabled', false);
            }
        } else {
            showNotification('การชำระเงินล้มเหลว กรุณาลองใหม่', 'error');
            $(this).html(originalText).prop('disabled', false);
        }
    } catch (error) {
        console.error('Payment error:', error);
        showNotification('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
        $(this).html(originalText).prop('disabled', false);
    }
});

// Save job to draft (mock function)
async function saveJobToDraft(jobData) {
    // In production, call your .NET API
    // const response = await fetch(`${API_BASE_URL}/jobs/draft`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify(jobData)
    // });
    // return await response.json();
    
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
        success: true,
        jobId: Math.random().toString(36).substr(2, 9)
    };
}

// Process payment (mock function)
async function processPayment(paymentData) {
    // In production, call your .NET API or payment gateway
    // const response = await fetch(`${API_BASE_URL}/payments/process`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify(paymentData)
    // });
    // return await response.json();
    
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
        success: true,
        transactionId: Math.random().toString(36).substr(2, 9)
    };
}

// Publish job (mock function)
async function publishJob(jobData) {
    // In production, call your .NET API
    // const response = await fetch(`${API_BASE_URL}/jobs`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify(jobData)
    // });
    // return await response.json();
    
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
        success: true,
        jobId: Math.random().toString(36).substr(2, 9)
    };
}
