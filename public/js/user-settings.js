// User Settings Page JavaScript
$(document).ready(function() {
    // Load saved settings from localStorage
    function loadSettings() {
        const settings = {
            emailNotif: localStorage.getItem('emailNotif') !== 'false',
            jobAlerts: localStorage.getItem('jobAlerts') !== 'false',
            appUpdates: localStorage.getItem('appUpdates') !== 'false',
            marketing: localStorage.getItem('marketing') === 'true',
            profileVisibility: localStorage.getItem('profileVisibility') !== 'false',
            resumeSearch: localStorage.getItem('resumeSearch') !== 'false',
            language: localStorage.getItem('language') || 'th'
        };

        // Apply settings to UI
        $('#emailNotif').prop('checked', settings.emailNotif);
        $('#jobAlerts').prop('checked', settings.jobAlerts);
        $('#appUpdates').prop('checked', settings.appUpdates);
        $('#marketing').prop('checked', settings.marketing);
        $('#profileVisibility').prop('checked', settings.profileVisibility);
        $('#resumeSearch').prop('checked', settings.resumeSearch);
        $('#languageSelect').val(settings.language);
    }

    // Save setting to localStorage
    function saveSetting(key, value) {
        localStorage.setItem(key, value);
        const currentLang = localStorage.getItem('language') || 'th';
        const successText = currentLang === 'th' ? 'บันทึกการตั้งค่าเรียบร้อยแล้ว' : 'Settings saved successfully';
        
        // Show success message (you can replace with a toast notification)
        console.log(successText);
    }

    // Change Email
    $('#changeEmailBtn').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        const promptText = currentLang === 'th' ? 'กรุณากรอกอีเมลใหม่:' : 'Please enter your new email:';
        const currentEmail = 'somchai@example.com';
        
        const newEmail = prompt(promptText, currentEmail);
        if (newEmail && newEmail !== currentEmail) {
            // In production, this would call the API
            const successText = currentLang === 'th' 
                ? 'เปลี่ยนอีเมลสำเร็จ กรุณายืนยันอีเมลใหม่' 
                : 'Email changed successfully. Please verify your new email.';
            alert(successText);
        }
    });

    // Change Password
    $('#changePasswordBtn').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        const promptText1 = currentLang === 'th' ? 'กรุณากรอกรหัสผ่านปัจจุบัน:' : 'Please enter your current password:';
        const promptText2 = currentLang === 'th' ? 'กรุณากรอกรหัสผ่านใหม่:' : 'Please enter your new password:';
        const promptText3 = currentLang === 'th' ? 'กรุณายืนยันรหัสผ่านใหม่:' : 'Please confirm your new password:';
        
        const currentPassword = prompt(promptText1);
        if (currentPassword) {
            const newPassword = prompt(promptText2);
            if (newPassword) {
                const confirmPassword = prompt(promptText3);
                if (confirmPassword === newPassword) {
                    // In production, this would call the API
                    const successText = currentLang === 'th' 
                        ? 'เปลี่ยนรหัสผ่านสำเร็จ' 
                        : 'Password changed successfully';
                    alert(successText);
                } else {
                    const errorText = currentLang === 'th' 
                        ? 'รหัสผ่านไม่ตรงกัน' 
                        : 'Passwords do not match';
                    alert(errorText);
                }
            }
        }
    });

    // Change Phone
    $('#changePhoneBtn').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        const promptText = currentLang === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์ใหม่:' : 'Please enter your new phone number:';
        const currentPhone = '08-1234-5678';
        
        const newPhone = prompt(promptText, currentPhone);
        if (newPhone && newPhone !== currentPhone) {
            // In production, this would call the API
            const successText = currentLang === 'th' 
                ? 'เปลี่ยนเบอร์โทรศัพท์สำเร็จ' 
                : 'Phone number changed successfully';
            alert(successText);
        }
    });

    // Notification Settings
    $('#emailNotif').on('change', function() {
        saveSetting('emailNotif', $(this).is(':checked'));
    });

    $('#jobAlerts').on('change', function() {
        saveSetting('jobAlerts', $(this).is(':checked'));
    });

    $('#appUpdates').on('change', function() {
        saveSetting('appUpdates', $(this).is(':checked'));
    });

    $('#marketing').on('change', function() {
        saveSetting('marketing', $(this).is(':checked'));
    });

    // Privacy Settings
    $('#profileVisibility').on('change', function() {
        const isChecked = $(this).is(':checked');
        saveSetting('profileVisibility', isChecked);
        
        const currentLang = localStorage.getItem('language') || 'th';
        const message = isChecked
            ? (currentLang === 'th' ? 'โปรไฟล์ของคุณจะมองเห็นได้โดยนายจ้าง' : 'Your profile is now visible to employers')
            : (currentLang === 'th' ? 'โปรไฟล์ของคุณถูกซ่อนจากนายจ้าง' : 'Your profile is now hidden from employers');
        
        console.log(message);
    });

    $('#resumeSearch').on('change', function() {
        const isChecked = $(this).is(':checked');
        saveSetting('resumeSearch', isChecked);
        
        const currentLang = localStorage.getItem('language') || 'th';
        const message = isChecked
            ? (currentLang === 'th' ? 'นายจ้างสามารถค้นหาเรซูเม่ของคุณได้' : 'Employers can now search your resume')
            : (currentLang === 'th' ? 'นายจ้างไม่สามารถค้นหาเรซูเม่ของคุณได้' : 'Employers cannot search your resume');
        
        console.log(message);
    });

    // Language Settings
    $('#languageSelect').on('change', function() {
        const newLang = $(this).val();
        const currentLang = localStorage.getItem('language') || 'th';
        
        if (newLang !== currentLang) {
            localStorage.setItem('language', newLang);
            
            // Reload page to apply new language
            const confirmText = currentLang === 'th' 
                ? 'หน้าเว็บจะรีโหลดเพื่อเปลี่ยนภาษา' 
                : 'The page will reload to change the language';
            
            alert(confirmText);
            location.reload();
        }
    });

    // Delete Account
    $('#deleteAccountBtn').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        
        const warningText = currentLang === 'th' 
            ? 'คำเตือน: การดำเนินการนี้ไม่สามารถย้อนกลับได้!\n\nการลบบัญชีจะทำให้:\n- ข้อมูลส่วนตัวทั้งหมดถูกลบ\n- ใบสมัครงานทั้งหมดถูกยกเลิก\n- เรซูเม่และไฟล์ทั้งหมดถูกลบ\n- ไม่สามารถเข้าสู่ระบบได้อีก\n\nคุณแน่ใจหรือไม่ที่จะลบบัญชี?' 
            : 'Warning: This action cannot be undone!\n\nDeleting your account will:\n- Remove all personal data\n- Cancel all job applications\n- Delete all resumes and files\n- Prevent future login\n\nAre you sure you want to delete your account?';
        
        if (confirm(warningText)) {
            const confirmText = currentLang === 'th' 
                ? 'กรุณาพิมพ์ "DELETE" เพื่อยืนยันการลบบัญชี:' 
                : 'Please type "DELETE" to confirm account deletion:';
            
            const confirmation = prompt(confirmText);
            
            if (confirmation === 'DELETE') {
                // In production, this would call the API to delete the account
                const successText = currentLang === 'th' 
                    ? 'บัญชีของคุณถูกลบเรียบร้อยแล้ว' 
                    : 'Your account has been deleted';
                
                alert(successText);
                
                // Clear all localStorage and redirect to home
                localStorage.clear();
                window.location.href = 'index.html';
            } else if (confirmation !== null) {
                const errorText = currentLang === 'th' 
                    ? 'การยืนยันไม่ถูกต้อง' 
                    : 'Confirmation failed';
                alert(errorText);
            }
        }
    });

    // Initial load
    loadSettings();

    // Show success message with better UX (optional)
    window.showSuccessMessage = function(message) {
        // You can implement a toast notification here
        // For now, we'll use console.log
        console.log('✓ ' + message);
    };
});
