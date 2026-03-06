// ========================================
// Dashboard JavaScript - Version 2.0
// Designed for JobHub with Modern Gen Z UI
// ========================================

let currentUser = null;
let currentView = 'overview';

$(document).ready(function() {
    // Check if user is logged in
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = getCurrentUser();
    
    // Update user info
    updateUserInfo();
    
    // Get view from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    currentView = urlParams.get('view') || 'overview';
    
    // Load dashboard based on role
    loadDashboard();
    
    // Setup logout button
    $('#logoutBtn').on('click', function(e) {
        e.preventDefault();
        logout();
    });
});

// Update user info in navbar
function updateUserInfo() {
    $('#userName').text(currentUser.name);
    $('#userAvatar').attr('src', currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=random`);
}

// Load dashboard based on role
function loadDashboard() {
    switch(currentUser.role) {
        case 'user':
            loadUserDashboard();
            break;
        case 'employer':
            loadEmployerDashboard();
            break;
        case 'admin':
            loadAdminDashboard();
            break;
        default:
            loadUserDashboard();
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Placeholder action functions
function viewApplication(id) { alert('View application ' + id); }
function cancelApplication(id) { alert('Cancel application ' + id); }
function unsaveJob(id) { alert('Unsave job ' + id); }
function applyJob(id) { alert('Apply to job ' + id); }
function addSkill() { alert('Add skill'); }
function addExperience() { alert('Add experience'); }
function removeExperience(id) { alert('Remove experience ' + id); }
function saveProfile() { alert('Save profile'); }
function changePassword() { alert('Change password'); }
function deleteAccount() { alert('Delete account'); }
function viewApplicant(id) { alert('View applicant ' + id); }
function acceptApplicant(id) { alert('Accept applicant ' + id); }
function rejectApplicant(id) { alert('Reject applicant ' + id); }
function editJob(id) { alert('Edit job ' + id); }
function viewJobApplicants(id) { alert('View job applicants ' + id); }
function closeJob(id) { alert('Close job ' + id); }
function deleteJob(id) { alert('Delete job ' + id); }
function publishJob(id) { alert('Publish job ' + id); }
function viewResume(id) { alert('View resume ' + id); }
function contactApplicant(id) { alert('Contact applicant ' + id); }
function upgradePackage() { alert('Upgrade package'); }
function buyPackage(type) { alert('Buy package: ' + type); }
function saveCompanyProfile() { alert('Save company profile'); }
function viewUser(id) { alert('View user ' + id); }
function suspendUser(id) { alert('Suspend user ' + id); }
function deleteUser(id) { alert('Delete user ' + id); }
function activateUser(id) { alert('Activate user ' + id); }
function viewEmployer(id) { alert('View employer ' + id); }
function deleteEmployer(id) { alert('Delete employer ' + id); }

// Load user dashboard - placeholder
function loadUserDashboard() {
    console.log('Loading user dashboard');
}

// Load employer dashboard - placeholder
function loadEmployerDashboard() {
    console.log('Loading employer dashboard');
}

// Load admin dashboard - placeholder
function loadAdminDashboard() {
    console.log('Loading admin dashboard');
}
