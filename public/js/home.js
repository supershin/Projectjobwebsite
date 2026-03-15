// ========================================
// Home Page JavaScript
// ========================================

$(document).ready(function() {
    loadFeaturedJobs();
    setupCategoryHandlers();
    setupSearchHandler();
});

// Load featured jobs
async function loadFeaturedJobs() {
    try {
        // Load jobs from JSON file
        const response = await fetch('./data/jobs.json');
        const jobs = await response.json();
        
        // Take first 6 jobs as featured
        const featuredJobs = jobs.slice(0, 6);
        
        displayFeaturedJobs(featuredJobs);
    } catch (error) {
        console.error('Error loading jobs:', error);
    }
}

// Display featured jobs
function displayFeaturedJobs(jobs) {
    const container = $('#featuredJobsContainer');
    container.empty();
    
    if (jobs.length === 0) {
        container.html('<div class="col-12"><p class="text-center text-muted">ไม่พบงานที่แสดง</p></div>');
        return;
    }
    
    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        container.append(jobCard);
    });
}

// Create job card HTML
function createJobCard(job) {
    return `
        <div class="col-md-6 col-lg-4 fade-in">
            <div class="job-card">
                <div class="d-flex align-items-start mb-3">
                    <img src="${job.companyLogo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(job.company)}" 
                         alt="${job.company}" class="company-logo me-3">
                    <div class="flex-grow-1">
                        <h5 class="mb-1 fw-bold">
                            <a href="job-detail.html?id=${job.id}" class="text-decoration-none text-dark">
                                ${job.title}
                            </a>
                        </h5>
                        <p class="text-primary mb-2">${job.company}</p>
                        <div class="d-flex flex-wrap gap-2 mb-2">
                            <span class="job-badge job-badge-primary">
                                <i class="bi bi-geo-alt"></i> ${job.location}
                            </span>
                            <span class="job-badge job-badge-success">
                                <i class="bi bi-briefcase"></i> ${formatJobType(job.type)}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="text-gradient mb-0">${job.salary}</h6>
                        <small class="text-muted">${formatRelativeTime(job.postedDate)}</small>
                    </div>
                    <a href="job-detail.html?id=${job.id}" class="btn btn-sm btn-primary-custom">
                        ดูรายละเอียด <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Setup category handlers
function setupCategoryHandlers() {
    $('.category-card').on('click', function() {
        const department = $(this).data('category'); // Still using data-category attribute
        window.location.href = `jobs.html?department=${encodeURIComponent(department)}`;
    });
}

// Setup search handler
function setupSearchHandler() {
    $('#searchBtn').on('click', function() {
        const searchQuery = $('#searchInput').val();
        if (searchQuery.trim()) {
            window.location.href = `jobs.html?search=${encodeURIComponent(searchQuery)}`;
        }
    });
    
    $('#searchInput').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            $('#searchBtn').click();
        }
    });
}