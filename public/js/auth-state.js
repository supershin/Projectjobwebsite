/**
 * Authentication State Manager
 * จัดการ state ของผู้ใช้ที่ login และอัพเดท UI
 */

(function() {
    'use strict';

    // ฟังก์ชันหลักสำหรับอัพเดท navbar เมื่อ login
    function updateNavbarWithUserInfo() {
        // ดึงข้อมูลผู้ใช้จาก localStorage
        const userDataStr = localStorage.getItem('user');
        const isLoggedIn = localStorage.getItem('token');
        
        if (!isLoggedIn || !userDataStr) {
            // ถ้ายังไม่ได้ login ให้แสดง login/register buttons
            updateNavbarForGuest();
            return;
        }
        
        try {
            const userData = JSON.parse(userDataStr);
            updateNavbarForLoggedInUser(userData);
        } catch (e) {
            console.error('Error parsing user data:', e);
            updateNavbarForGuest();
        }
    }
    
    // อัพเดท navbar สำหรับผู้ใช้ที่ login แล้ว
    function updateNavbarForLoggedInUser(userData) {
        // อัพเดทชื่อผู้ใช้
        const navUserName = document.getElementById('navUserName');
        if (navUserName) {
            navUserName.textContent = userData.name || 'User';
        }
        
        // อัพเดทรูปโปรไฟล์
        const navUserAvatar = document.getElementById('navUserAvatar');
        if (navUserAvatar && userData.avatar) {
            navUserAvatar.src = userData.avatar;
        } else if (navUserAvatar && userData.name) {
            navUserAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`;
        }
        
        // ซ่อน Login/Register buttons และแสดง user dropdown
        const loginButton = document.querySelector('a[href="login.html"]');
        const registerButton = document.querySelector('a[href="register.html"]');
        
        if (loginButton && loginButton.parentElement) {
            loginButton.parentElement.style.display = 'none';
        }
        
        if (registerButton && registerButton.parentElement) {
            registerButton.parentElement.style.display = 'none';
        }
        
        // แสดง Dashboard menu item ถ้ายังไม่มี
        addDashboardMenuItem(userData);
    }
    
    // อัพเดท navbar สำหรับผู้ใช้ที่ยังไม่ได้ login
    function updateNavbarForGuest() {
        // ซ่อน user dropdown ถ้ามี
        const userDropdown = document.querySelector('.navbar-nav .nav-item.dropdown:not(.language-switcher)');
        if (userDropdown && !userDropdown.querySelector('[href*="dashboard"]')) {
            // ถ้าไม่ใช่ dropdown ของ menu อื่น ให้ซ่อน
            const dropdownLinks = userDropdown.querySelectorAll('a');
            let isDashboardDropdown = false;
            dropdownLinks.forEach(link => {
                if (link.href && link.href.includes('dashboard')) {
                    isDashboardDropdown = true;
                }
            });
            
            if (isDashboardDropdown) {
                userDropdown.style.display = 'none';
            }
        }
        
        // แสดง Login/Register buttons
        const loginButton = document.querySelector('a[href="login.html"]');
        const registerButton = document.querySelector('a[href="register.html"]');
        
        if (loginButton && loginButton.parentElement) {
            loginButton.parentElement.style.display = 'block';
        }
        
        if (registerButton && registerButton.parentElement) {
            registerButton.parentElement.style.display = 'block';
        }
    }
    
    // เพิ่ม Dashboard menu item สำหรับผู้ใช้ที่ login
    function addDashboardMenuItem(userData) {
        const navbar = document.querySelector('.navbar-nav');
        if (!navbar) return;
        
        // ตรวจสอบว่ามี Dashboard menu อยู่แล้วหรือไม่
        const existingDashboard = navbar.querySelector('a[href="dashboard.html"]');
        if (existingDashboard) return;
        
        // สร้าง Dashboard menu item
        const dashboardItem = document.createElement('li');
        dashboardItem.className = 'nav-item';
        dashboardItem.innerHTML = `<a class="nav-link" href="dashboard.html"><i class="bi bi-speedometer2 me-1"></i>Dashboard</a>`;
        
        // แทรกก่อน Language Switcher
        const langSwitcher = navbar.querySelector('.language-switcher');
        if (langSwitcher) {
            navbar.insertBefore(dashboardItem, langSwitcher);
        }
    }
    
    // ฟังก์ชัน logout
    window.logout = function() {
        if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
            // ลบข้อมูลจาก localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('rememberMe');
            
            // Redirect ไปหน้าแรก
            window.location.href = 'index.html';
        }
    };
    
    // เรียกใช้งานเมื่อ DOM โหลดเสร็จ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateNavbarWithUserInfo);
    } else {
        updateNavbarWithUserInfo();
    }
    
    // Listen for storage changes (เช่น login จากหน้าอื่น)
    window.addEventListener('storage', function(e) {
        if (e.key === 'user' || e.key === 'token') {
            updateNavbarWithUserInfo();
        }
    });
    
})();
