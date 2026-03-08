// ========================================
// ADMIN DATA MODEL - Mock Data & Functions
// ========================================

/**
 * Admin Data Structure
 */
const ADMIN_ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MODERATOR: 'moderator'
};

const ADMIN_STATUS = {
    ACTIVE: 'active',
    SUSPENDED: 'suspended',
    INACTIVE: 'inactive'
};

/**
 * Mock Admin Users
 */
const MOCK_ADMINS = [
    {
        id: 1,
        username: 'superadmin',
        email: 'super@jobhub.com',
        firstName: 'สมชาย',
        lastName: 'ดีเลิศ',
        role: ADMIN_ROLES.SUPER_ADMIN,
        status: ADMIN_STATUS.ACTIVE,
        avatar: 'https://ui-avatars.com/api/?name=Somchai+Delert&background=6366f1&color=fff',
        createdDate: '2024-01-01',
        lastLogin: '2026-03-08 09:30:00',
        permissions: {
            manageUsers: true,
            manageEmployers: true,
            manageJobs: true,
            manageAdmins: true,
            managePayments: true,
            manageReports: true,
            systemSettings: true
        },
        phone: '081-234-5678',
        department: 'IT & Operations'
    },
    {
        id: 2,
        username: 'admin01',
        email: 'admin01@jobhub.com',
        firstName: 'สมหญิง',
        lastName: 'ใจดี',
        role: ADMIN_ROLES.ADMIN,
        status: ADMIN_STATUS.ACTIVE,
        avatar: 'https://ui-avatars.com/api/?name=Somying+Jaidee&background=10b981&color=fff',
        createdDate: '2024-02-15',
        lastLogin: '2026-03-08 08:15:00',
        permissions: {
            manageUsers: true,
            manageEmployers: true,
            manageJobs: true,
            manageAdmins: false,
            managePayments: true,
            manageReports: true,
            systemSettings: false
        },
        phone: '082-345-6789',
        department: 'Customer Support'
    },
    {
        id: 3,
        username: 'moderator01',
        email: 'mod01@jobhub.com',
        firstName: 'ประเสริฐ',
        lastName: 'มั่นคง',
        role: ADMIN_ROLES.MODERATOR,
        status: ADMIN_STATUS.ACTIVE,
        avatar: 'https://ui-avatars.com/api/?name=Prasert+Mankong&background=f59e0b&color=fff',
        createdDate: '2024-05-20',
        lastLogin: '2026-03-07 18:45:00',
        permissions: {
            manageUsers: false,
            manageEmployers: false,
            manageJobs: true,
            manageAdmins: false,
            managePayments: false,
            manageReports: false,
            systemSettings: false
        },
        phone: '083-456-7890',
        department: 'Content Moderation'
    },
    {
        id: 4,
        username: 'admin02',
        email: 'admin02@jobhub.com',
        firstName: 'วิภา',
        lastName: 'สุขใจ',
        role: ADMIN_ROLES.ADMIN,
        status: ADMIN_STATUS.ACTIVE,
        avatar: 'https://ui-avatars.com/api/?name=Wipa+Sukchai&background=ec4899&color=fff',
        createdDate: '2024-06-10',
        lastLogin: '2026-03-08 07:20:00',
        permissions: {
            manageUsers: true,
            manageEmployers: true,
            manageJobs: true,
            manageAdmins: false,
            managePayments: false,
            manageReports: true,
            systemSettings: false
        },
        phone: '084-567-8901',
        department: 'HR & Recruitment'
    },
    {
        id: 5,
        username: 'moderator02',
        email: 'mod02@jobhub.com',
        firstName: 'นพดล',
        lastName: 'รักษ์งาม',
        role: ADMIN_ROLES.MODERATOR,
        status: ADMIN_STATUS.SUSPENDED,
        avatar: 'https://ui-avatars.com/api/?name=Nopadol+Rakngam&background=ef4444&color=fff',
        createdDate: '2024-08-15',
        lastLogin: '2026-02-20 16:30:00',
        permissions: {
            manageUsers: false,
            manageEmployers: false,
            manageJobs: true,
            manageAdmins: false,
            managePayments: false,
            manageReports: false,
            systemSettings: false
        },
        phone: '085-678-9012',
        department: 'Content Moderation'
    },
    {
        id: 6,
        username: 'admin03',
        email: 'admin03@jobhub.com',
        firstName: 'จิราพร',
        lastName: 'ศรีสุข',
        role: ADMIN_ROLES.ADMIN,
        status: ADMIN_STATUS.ACTIVE,
        avatar: 'https://ui-avatars.com/api/?name=Jiraporn+Srisuk&background=8b5cf6&color=fff',
        createdDate: '2024-09-01',
        lastLogin: '2026-03-08 10:00:00',
        permissions: {
            manageUsers: true,
            manageEmployers: true,
            manageJobs: true,
            manageAdmins: false,
            managePayments: true,
            manageReports: true,
            systemSettings: false
        },
        phone: '086-789-0123',
        department: 'Finance'
    }
];

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get all admins
 */
function getAllAdmins() {
    return MOCK_ADMINS;
}

/**
 * Get admin by ID
 */
function getAdminById(id) {
    return MOCK_ADMINS.find(admin => admin.id === parseInt(id));
}

/**
 * Get admins by role
 */
function getAdminsByRole(role) {
    return MOCK_ADMINS.filter(admin => admin.role === role);
}

/**
 * Get admins by status
 */
function getAdminsByStatus(status) {
    return MOCK_ADMINS.filter(admin => admin.status === status);
}

/**
 * Get active admins
 */
function getActiveAdmins() {
    return getAdminsByStatus(ADMIN_STATUS.ACTIVE);
}

/**
 * Get suspended admins
 */
function getSuspendedAdmins() {
    return getAdminsByStatus(ADMIN_STATUS.SUSPENDED);
}

/**
 * Get role display name
 */
function getAdminRoleDisplay(role) {
    switch(role) {
        case ADMIN_ROLES.SUPER_ADMIN:
            return 'Super Admin';
        case ADMIN_ROLES.ADMIN:
            return 'Admin';
        case ADMIN_ROLES.MODERATOR:
            return 'Moderator';
        default:
            return role;
    }
}

/**
 * Get role badge class
 */
function getAdminRoleBadgeClass(role) {
    switch(role) {
        case ADMIN_ROLES.SUPER_ADMIN:
            return 'bg-danger';
        case ADMIN_ROLES.ADMIN:
            return 'bg-primary';
        case ADMIN_ROLES.MODERATOR:
            return 'bg-warning';
        default:
            return 'bg-secondary';
    }
}

/**
 * Get status display name
 */
function getAdminStatusDisplay(status) {
    switch(status) {
        case ADMIN_STATUS.ACTIVE:
            return 'ใช้งาน';
        case ADMIN_STATUS.SUSPENDED:
            return 'ระงับ';
        case ADMIN_STATUS.INACTIVE:
            return 'ไม่ใช้งาน';
        default:
            return status;
    }
}

/**
 * Get status badge class
 */
function getAdminStatusBadgeClass(status) {
    switch(status) {
        case ADMIN_STATUS.ACTIVE:
            return 'bg-success';
        case ADMIN_STATUS.SUSPENDED:
            return 'bg-danger';
        case ADMIN_STATUS.INACTIVE:
            return 'bg-secondary';
        default:
            return 'bg-secondary';
    }
}

/**
 * Get admin stats
 */
function getAdminStats() {
    return {
        total: MOCK_ADMINS.length,
        active: getActiveAdmins().length,
        suspended: getSuspendedAdmins().length,
        superAdmins: getAdminsByRole(ADMIN_ROLES.SUPER_ADMIN).length,
        admins: getAdminsByRole(ADMIN_ROLES.ADMIN).length,
        moderators: getAdminsByRole(ADMIN_ROLES.MODERATOR).length
    };
}

/**
 * Format last login time
 */
function formatLastLogin(datetime) {
    const date = new Date(datetime);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    
    if (diff < 60) return 'เมื่อสักครู่';
    if (diff < 3600) return Math.floor(diff / 60) + ' นาทีที่แล้ว';
    if (diff < 86400) return Math.floor(diff / 3600) + ' ชั่วโมงที่แล้ว';
    if (diff < 604800) return Math.floor(diff / 86400) + ' วันที่แล้ว';
    
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Get permissions count
 */
function getPermissionsCount(admin) {
    const perms = admin.permissions;
    return Object.values(perms).filter(v => v === true).length;
}

/**
 * Search admins
 */
function searchAdmins(query) {
    const lowerQuery = query.toLowerCase();
    return MOCK_ADMINS.filter(admin => {
        return admin.username.toLowerCase().includes(lowerQuery) ||
               admin.email.toLowerCase().includes(lowerQuery) ||
               admin.firstName.toLowerCase().includes(lowerQuery) ||
               admin.lastName.toLowerCase().includes(lowerQuery) ||
               (admin.firstName + ' ' + admin.lastName).toLowerCase().includes(lowerQuery);
    });
}

console.log('✅ Admin Data Model loaded successfully');
console.log(`📊 Total Admins: ${MOCK_ADMINS.length}`);
console.log(`✅ Active: ${getActiveAdmins().length}`);
console.log(`⛔ Suspended: ${getSuspendedAdmins().length}`);
