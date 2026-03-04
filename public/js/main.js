// ========================================
// Main JavaScript - Common Functions
// ========================================

// API Configuration
const API_BASE_URL = '/api'; // เปลี่ยนเป็น URL ของ .NET API ของคุณ

// Navbar Scroll Effect
$(window).on('scroll', function() {
    const navbar = $('.navbar');
    if ($(window).scrollTop() > 50) {
        navbar.addClass('scrolled');
    } else {
        navbar.removeClass('scrolled');
    }
});

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Update navbar based on login status
function updateNavbar() {
    const user = getCurrentUser();
    const navbar = $('.navbar-nav');
    
    if (user) {
        // User is logged in - show user menu
        navbar.html(`
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random" 
                         alt="${user.name}" class="rounded-circle me-2" width="32" height="32">
                    <span>${user.name}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="dashboard.html"><i class="bi bi-speedometer2"></i> Dashboard</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-person"></i> โปรไฟล์</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-gear"></i> ตั้งค่า</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right"></i> ออกจากระบบ</a></li>
                </ul>
            </li>
        `);
    }
}

// Logout function
$(document).on('click', '#logoutBtn', function(e) {
    e.preventDefault();
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Show success message
    showNotification('ออกจากระบบสำเร็จ', 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
});

// Show notification
function showNotification(message, type = 'info') {
    const alertClass = type === 'success' ? 'alert-success' : 
                       type === 'error' ? 'alert-danger' : 
                       type === 'warning' ? 'alert-warning' : 'alert-info';
    
    const alert = $(`
        <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `);
    
    $('body').append(alert);
    
    setTimeout(() => {
        alert.alert('close');
    }, 3000);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('th-TH', options);
}

// Format relative time
function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'วันนี้';
    if (diffDays === 1) return 'เมื่อวาน';
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} เดือนที่แล้ว`;
    return `${Math.floor(diffDays / 365)} ปีที่แล้ว`;
}

// Format job type
function formatJobType(type) {
    const types = {
        'full-time': 'งานประจำ',
        'part-time': 'งานพาร์ทไทม์',
        'contract': 'สัญญาจ้าง',
        'freelance': 'ฟรีแลนซ์',
        'internship': 'ฝึกงาน'
    };
    return types[type] || type;
}

// API Helper Functions
const API = {
    // GET request
    get: async function(endpoint) {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: headers
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            // Return mock data for demo
            return this.getMockData(endpoint);
        }
    },
    
    // POST request
    post: async function(endpoint, data) {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },
    
    // PUT request
    put: async function(endpoint, data) {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API PUT Error:', error);
            throw error;
        }
    },
    
    // DELETE request
    delete: async function(endpoint) {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: headers
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API DELETE Error:', error);
            throw error;
        }
    },
    
    // Get mock data for demo
    getMockData: function(endpoint) {
        // Load from JSON files
        if (endpoint.includes('/jobs')) {
            return fetch('./data/jobs.json').then(res => res.json());
        }
        return Promise.resolve([]);
    }
};

// Initialize on page load
$(document).ready(function() {
    updateNavbar();
});