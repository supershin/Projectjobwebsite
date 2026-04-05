// ========================================
// Authentication JavaScript
// ========================================

$(document).ready(function() {
    setupLoginForm();
    setupRegisterForm();
    setupPasswordToggle();
    checkUserTypeFromURL();
});

// Setup login form
function setupLoginForm() {
    $('#loginForm').on('submit', async function(e) {
        e.preventDefault();
        
        const email = $('#email').val();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');
        
        // Validate
        if (!email || !password) {
            showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
            return;
        }
        
        try {
            // Show loading
            const submitBtn = $(this).find('button[type="submit"]');
            const originalText = submitBtn.html();
            submitBtn.html('<span class="spinner-border spinner-border-sm me-2"></span>กำลังเข้าสู่ระบบ...').prop('disabled', true);
            
            // Call API (or use demo accounts)
            const result = await loginUser(email, password);
            
            if (result.success) {
                // Save user data
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', result.token);
                
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                showNotification('เข้าสู่ระบบสำเร็จ!', 'success');
                
                // Redirect based on role
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showNotification('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'error');
                submitBtn.html(originalText).prop('disabled', false);
            }
        } catch (error) {
            showNotification('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
            submitBtn.html(originalText).prop('disabled', false);
        }
    });
}

// Setup register form
function setupRegisterForm() {
    $('#registerForm').on('submit', async function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const acceptTerms = $('#acceptTerms').is(':checked');
        const userType = $('input[name="userType"]:checked').val();
        
        // Validate
        if (!name || !email || !password || !confirmPassword) {
            showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
            return;
        }
        
        if (password.length < 8) {
            showNotification('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร', 'warning');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('รหัสผ่านไม่ตรงกัน', 'warning');
            return;
        }
        
        if (!acceptTerms) {
            showNotification('กรุณายอมรับเงื่อนไขการใช้งาน', 'warning');
            return;
        }
        
        try {
            // Show loading
            const submitBtn = $(this).find('button[type="submit"]');
            const originalText = submitBtn.html();
            submitBtn.html('<span class="spinner-border spinner-border-sm me-2"></span>กำลังสมัครสมาชิก...').prop('disabled', true);
            
            // Call API
            const result = await registerUser({
                name,
                email,
                phone,
                password,
                role: userType
            });
            
            if (result.success) {
                // Save user data
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', result.token);
                
                showNotification('สมัครสมาชิกสำเร็จ!', 'success');
                
                // Redirect
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showNotification(result.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก', 'error');
                submitBtn.html(originalText).prop('disabled', false);
            }
        } catch (error) {
            showNotification('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
            submitBtn.html(originalText).prop('disabled', false);
        }
    });
}

// Login user (with demo accounts)
async function loginUser(email, password) {
    // Demo accounts
    const demoAccounts = [
        {
            email: 'user@demo.com',
            password: 'demo123',
            user: {
                id: '1',
                name: 'ผู้ใช้ทั่วไป',
                email: 'user@demo.com',
                role: 'user',
                avatar: 'https://ui-avatars.com/api/?name=User&background=random'
            }
        },
        {
            email: 'employer@demo.com',
            password: 'demo123',
            user: {
                id: '2',
                name: 'นายจ้าง',
                email: 'employer@demo.com',
                role: 'employer',
                avatar: 'https://ui-avatars.com/api/?name=Employer&background=random'
            }
        },
        {
            email: 'admin@demo.com',
            password: 'demo123',
            user: {
                id: '3',
                name: 'แอดมิน',
                email: 'admin@demo.com',
                role: 'admin',
                avatar: 'https://ui-avatars.com/api/?name=Admin&background=random'
            }
        }
    ];
    
    // Check demo accounts first
    const demoAccount = demoAccounts.find(acc => acc.email === email && acc.password === password);
    
    if (demoAccount) {
        return {
            success: true,
            user: demoAccount.user,
            token: 'demo_token_' + Math.random().toString(36)
        };
    }
    
    // In production, call your .NET API here
    // const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    // });
    // return await response.json();
    
    return { success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
}

// Register user
async function registerUser(data) {
    // In production, call your .NET API here
    // const response = await fetch(`${API_BASE_URL}/auth/register`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
    // return await response.json();
    
    // Mock success for demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
        success: true,
        user: {
            id: Math.random().toString(36),
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: data.role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`
        },
        token: 'token_' + Math.random().toString(36)
    };
}

// Setup password toggle
function setupPasswordToggle() {
    $(document).on('click', '#togglePassword', function() {
        const passwordInput = $(this).siblings('input');
        const icon = $(this).find('i');
        
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('bi-eye').addClass('bi-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });
}

// Check user type from URL
function checkUserTypeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    
    if (type === 'employer') {
        $('#typeEmployer').prop('checked', true);
    }
}

// ========================================
// Notification Function
// ========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = $('<div>')
        .addClass(`alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show notification-toast`)
        .css({
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: '9999',
            minWidth: '300px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        })
        .html(`
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `);
    
    // Append to body
    $('body').append(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.fadeOut(300, function() {
            $(this).remove();
        });
    }, 3000);
}

// ========================================
// Export functions for use in other scripts
// ========================================
if (typeof window !== 'undefined') {
    window.showNotification = showNotification;
}
