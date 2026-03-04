// ========================================
// Jobs Page JavaScript
// ========================================

let allJobs = [];
let filteredJobs = [];
let currentPage = 1;
const jobsPerPage = 9;

$(document).ready(function() {
    loadJobs();
    setupFilterHandlers();
    setupSortHandler();
    
    // Load filters from URL parameters
    loadFiltersFromURL();
});

// Load jobs from JSON
async function loadJobs() {
    try {
        const response = await fetch('./data/jobs.json');
        allJobs = await response.json();
        filteredJobs = [...allJobs];
        
        applyFilters();
        displayJobs();
        updateJobsCount();
    } catch (error) {
        console.error('Error loading jobs:', error);
    }
}

// Load filters from URL
function loadFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('category')) {
        $('#filterCategory').val(urlParams.get('category'));
    }
    if (urlParams.has('type')) {
        $('#filterType').val(urlParams.get('type'));
    }
    if (urlParams.has('search')) {
        $('#filterSearch').val(urlParams.get('search'));
    }
    if (urlParams.has('location')) {
        $('#filterLocation').val(urlParams.get('location'));
    }
}

// Apply filters
function applyFilters() {
    const searchTerm = $('#filterSearch').val().toLowerCase();
    const category = $('#filterCategory').val();
    const type = $('#filterType').val();
    const location = $('#filterLocation').val().toLowerCase();
    const salary = $('#filterSalary').val();
    
    filteredJobs = allJobs.filter(job => {
        // Search filter
        if (searchTerm && !job.title.toLowerCase().includes(searchTerm) && 
            !job.company.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Category filter
        if (category && job.category !== category) {
            return false;
        }
        
        // Type filter
        if (type && job.type !== type) {
            return false;
        }
        
        // Location filter
        if (location && !job.location.toLowerCase().includes(location)) {
            return false;
        }
        
        // Salary filter (basic implementation)
        if (salary) {
            // This would need more sophisticated parsing in production
            // For now, just check if salary range exists
            if (!job.salary) {
                return false;
            }
        }
        
        return true;
    });
    
    currentPage = 1;
}

// Display jobs
function displayJobs() {
    const container = $('#jobsContainer');
    container.empty();
    
    if (filteredJobs.length === 0) {
        container.html(`
            <div class="text-center py-5">
                <i class="bi bi-search" style="font-size: 3rem; color: var(--gray-400);"></i>
                <h4 class="mt-3">ไม่พบงานที่ค้นหา</h4>
                <p class="text-muted">ลองปรับเงื่อนไขการค้นหาใหม่</p>
            </div>
        `);
        $('#pagination').empty();
        return;
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToDisplay = filteredJobs.slice(startIndex, endIndex);
    
    // Display jobs
    jobsToDisplay.forEach(job => {
        const jobCard = createJobListItem(job);
        container.append(jobCard);
    });
    
    // Update pagination
    updatePagination();
}

// Create job list item
function createJobListItem(job) {
    return `
        <div class="card mb-3 job-card">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <div class="d-flex align-items-start">
                            <img src="${job.companyLogo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(job.company)}" 
                                 alt="${job.company}" class="company-logo me-3">
                            <div>
                                <h5 class="mb-1 fw-bold">
                                    <a href="job-detail.html?id=${job.id}" class="text-decoration-none text-dark">
                                        ${job.title}
                                    </a>
                                </h5>
                                <p class="text-primary mb-2">${job.company}</p>
                                <div class="d-flex flex-wrap gap-2">
                                    <span class="job-badge job-badge-primary">
                                        <i class="bi bi-geo-alt"></i> ${job.location}
                                    </span>
                                    <span class="job-badge job-badge-success">
                                        <i class="bi bi-briefcase"></i> ${formatJobType(job.type)}
                                    </span>
                                    <span class="job-badge job-badge-warning">
                                        <i class="bi bi-tag"></i> ${job.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 text-md-end mt-3 mt-md-0">
                        <h5 class="text-gradient mb-2">${job.salary}</h5>
                        <small class="text-muted d-block mb-3">${formatRelativeTime(job.postedDate)}</small>
                        <a href="job-detail.html?id=${job.id}" class="btn btn-primary-custom">
                            ดูรายละเอียด <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Update jobs count
function updateJobsCount() {
    $('#jobsCount').text(filteredJobs.length);
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const pagination = $('#pagination');
    pagination.empty();
    
    if (totalPages <= 1) return;
    
    // Previous button
    pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">ก่อนหน้า</a>
        </li>
    `);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            pagination.append(`
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            pagination.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
        }
    }
    
    // Next button
    pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">ถัดไป</a>
        </li>
    `);
}

// Setup filter handlers
function setupFilterHandlers() {
    $('#applyFilters').on('click', function() {
        applyFilters();
        displayJobs();
        updateJobsCount();
    });
    
    $('#clearFilters').on('click', function() {
        $('#filterSearch').val('');
        $('#filterCategory').val('');
        $('#filterType').val('');
        $('#filterLocation').val('');
        $('#filterSalary').val('');
        
        filteredJobs = [...allJobs];
        currentPage = 1;
        displayJobs();
        updateJobsCount();
    });
    
    // Enter key in search
    $('#filterSearch').on('keypress', function(e) {
        if (e.which === 13) {
            $('#applyFilters').click();
        }
    });
}

// Setup sort handler
function setupSortHandler() {
    $('#sortBy').on('change', function() {
        const sortBy = $(this).val();
        
        switch(sortBy) {
            case 'newest':
                filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
                break;
            case 'oldest':
                filteredJobs.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
                break;
            case 'salary-high':
                // Simple sort by first number in salary string
                filteredJobs.sort((a, b) => {
                    const salaryA = parseInt(a.salary.replace(/[^\d]/g, ''));
                    const salaryB = parseInt(b.salary.replace(/[^\d]/g, ''));
                    return salaryB - salaryA;
                });
                break;
            case 'salary-low':
                filteredJobs.sort((a, b) => {
                    const salaryA = parseInt(a.salary.replace(/[^\d]/g, ''));
                    const salaryB = parseInt(b.salary.replace(/[^\d]/g, ''));
                    return salaryA - salaryB;
                });
                break;
        }
        
        displayJobs();
    });
}

// Pagination click handler
$(document).on('click', '#pagination a', function(e) {
    e.preventDefault();
    const page = parseInt($(this).data('page'));
    if (page > 0 && page <= Math.ceil(filteredJobs.length / jobsPerPage)) {
        currentPage = page;
        displayJobs();
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    }
});
