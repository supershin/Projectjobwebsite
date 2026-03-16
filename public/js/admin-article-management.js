// ========================================
// ADMIN: Hotel Insights (Articles) Management
// Complete CRUD Operations
// ========================================

// Load all articles
function loadAdminArticles() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold">
                            <i class="bi bi-newspaper me-2"></i>
                            จัดการบทความ Hotel Insights
                        </h5>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-primary" onclick="showAddArticleModal()">
                            <i class="bi bi-plus-circle me-2"></i>เพิ่มบทความใหม่
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- Filters -->
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="articleSearchInput" placeholder="ค้นหาบทความ...">
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="articleCategoryFilter">
                            <option value="">ทุกหมวดหมู่</option>
                            <option value="Career Advice">Career Advice</option>
                            <option value="Industry Trends">Industry Trends</option>
                            <option value="Leadership">Leadership</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="articleStatusFilter">
                            <option value="">ทุกสถานะ</option>
                            <option value="published">เผยแพร่แล้ว</option>
                            <option value="draft">แบบร่าง</option>
                            <option value="featured">Featured</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-outline-secondary w-100" onclick="clearArticleFilters()">
                            <i class="bi bi-arrow-clockwise me-2"></i>รีเซ็ต
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="stat-card bg-primary text-white">
                            <div class="stat-icon"><i class="bi bi-newspaper"></i></div>
                            <div class="stat-number" id="totalArticlesCount">0</div>
                            <div class="stat-label">บทความทั้งหมด</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-success text-white">
                            <div class="stat-icon"><i class="bi bi-check-circle"></i></div>
                            <div class="stat-number" id="publishedArticlesCount">0</div>
                            <div class="stat-label">เผยแพร่แล้ว</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-warning text-white">
                            <div class="stat-icon"><i class="bi bi-star-fill"></i></div>
                            <div class="stat-number" id="featuredArticlesCount">0</div>
                            <div class="stat-label">Featured</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-info text-white">
                            <div class="stat-icon"><i class="bi bi-eye-fill"></i></div>
                            <div class="stat-number" id="totalViewsCount">0</div>
                            <div class="stat-label">รวมยอดดู</div>
                        </div>
                    </div>
                </div>

                <!-- Articles Table -->
                <div class="table-responsive">
                    <table class="table table-hover align-middle" id="articlesTable">
                        <thead class="table-light">
                            <tr>
                                <th width="50">Featured</th>
                                <th>บทความ</th>
                                <th>หมวดหมู่</th>
                                <th>ผู้เขียน</th>
                                <th>วันที่เผยแพร่</th>
                                <th>สถิติ</th>
                                <th>สถานะ</th>
                                <th width="200">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody id="articlesTableBody">
                            <tr>
                                <td colspan="8" class="text-center py-5">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    <p class="mt-3 text-muted">กำลังโหลดข้อมูล...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);

    // Load articles data
    loadArticlesData();

    // Setup event listeners
    setupArticleFilters();
}

// Load articles data from JSON
let allArticlesData = [];

async function loadArticlesData() {
    try {
        const response = await fetch('./data/insights.json');
        allArticlesData = await response.json();
        
        // Update stats
        updateArticleStats();
        
        // Display articles
        displayArticles(allArticlesData);
    } catch (error) {
        console.error('Error loading articles:', error);
        $('#articlesTableBody').html(`
            <tr>
                <td colspan="8" class="text-center py-5">
                    <i class="bi bi-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
                    <p class="mt-3 text-danger">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                </td>
            </tr>
        `);
    }
}

// Display articles in table
function displayArticles(articles) {
    if (articles.length === 0) {
        $('#articlesTableBody').html(`
            <tr>
                <td colspan="8" class="text-center py-5">
                    <i class="bi bi-inbox" style="font-size: 3rem; color: var(--gray-400);"></i>
                    <p class="mt-3 text-muted">ไม่พบบทความ</p>
                </td>
            </tr>
        `);
        return;
    }

    const rows = articles.map(article => {
        const categoryClass = getCategoryClass(article.category);
        return `
            <tr data-article-id="${article.articleId}">
                <td class="text-center">
                    ${article.featured ? '<i class="bi bi-star-fill text-warning" style="font-size: 1.2rem;"></i>' : '-'}
                </td>
                <td>
                    <div class="d-flex align-items-center gap-3">
                        <img src="${article.featuredImage}" alt="${article.title}" 
                             style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                        <div>
                            <div class="fw-bold mb-1">${article.title}</div>
                            <small class="text-muted">${article.excerpt.substring(0, 60)}...</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge ${categoryClass}">${article.category}</span>
                </td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <img src="${article.author.avatar}" alt="${article.author.name}" 
                             style="width: 32px; height: 32px; border-radius: 50%;">
                        <div>
                            <small class="fw-semibold d-block">${article.author.name}</small>
                            <small class="text-muted">${article.author.position}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <small>${formatDate(article.publishDate)}</small>
                    <br>
                    <small class="text-muted"><i class="bi bi-clock me-1"></i>${article.readTime} min</small>
                </td>
                <td>
                    <small class="d-block"><i class="bi bi-eye me-1"></i>${formatNumber(article.views)} views</small>
                    <small class="d-block"><i class="bi bi-heart me-1"></i>${article.likes} likes</small>
                    <small class="d-block"><i class="bi bi-chat me-1"></i>${article.comments} comments</small>
                </td>
                <td>
                    <span class="badge bg-success">Published</span>
                </td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="viewArticleDetails('${article.articleId}')" title="ดูรายละเอียด">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-outline-success" onclick="editArticle('${article.articleId}')" title="แก้ไข">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger" onclick="deleteArticle('${article.articleId}', '${article.title.replace(/'/g, "\\'")}')" title="ลบ">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    $('#articlesTableBody').html(rows);
}

// Update statistics
function updateArticleStats() {
    const total = allArticlesData.length;
    const published = allArticlesData.filter(a => a.publishDate).length;
    const featured = allArticlesData.filter(a => a.featured).length;
    const totalViews = allArticlesData.reduce((sum, a) => sum + a.views, 0);

    $('#totalArticlesCount').text(total);
    $('#publishedArticlesCount').text(published);
    $('#featuredArticlesCount').text(featured);
    $('#totalViewsCount').text(formatNumber(totalViews));
}

// Setup filters
function setupArticleFilters() {
    $('#articleSearchInput').on('input', filterArticles);
    $('#articleCategoryFilter').on('change', filterArticles);
    $('#articleStatusFilter').on('change', filterArticles);
}

// Filter articles
function filterArticles() {
    const searchTerm = $('#articleSearchInput').val().toLowerCase();
    const category = $('#articleCategoryFilter').val();
    const status = $('#articleStatusFilter').val();

    let filtered = allArticlesData.filter(article => {
        const matchSearch = article.title.toLowerCase().includes(searchTerm) || 
                          article.excerpt.toLowerCase().includes(searchTerm);
        const matchCategory = !category || article.category === category;
        
        let matchStatus = true;
        if (status === 'featured') {
            matchStatus = article.featured;
        } else if (status === 'published') {
            matchStatus = article.publishDate;
        }

        return matchSearch && matchCategory && matchStatus;
    });

    displayArticles(filtered);
}

// Clear filters
function clearArticleFilters() {
    $('#articleSearchInput').val('');
    $('#articleCategoryFilter').val('');
    $('#articleStatusFilter').val('');
    displayArticles(allArticlesData);
}

// ========================================
// VIEW: View Article Details
// ========================================
function viewArticleDetails(articleId) {
    window.location.href = `admin-article-view.html?id=${articleId}`;
}

// ========================================
// ADD: Add New Article
// ========================================
function showAddArticleModal() {
    window.location.href = 'admin-article-add.html';
}

// ========================================
// EDIT: Edit Article
// ========================================
function editArticle(articleId) {
    window.location.href = `admin-article-edit.html?id=${articleId}`;
}

// ========================================
// DELETE: Delete Article
// ========================================
function deleteArticle(articleId, title) {
    if (!confirm(`คุณต้องการลบบทความ "${title}" ใช่หรือไม่?\n\nการกระทำนี้ไม่สามารถย้อนกลับได้!`)) {
        return;
    }

    const articleIndex = allArticlesData.findIndex(a => a.articleId === articleId);
    if (articleIndex === -1) return;

    allArticlesData.splice(articleIndex, 1);

    // Update display
    updateArticleStats();
    displayArticles(allArticlesData);

    // Show success message
    showSuccessAlert('ลบสำเร็จ!', `${title} ถูกลบออกจากระบบแล้ว`, 'warning');
}

// ========================================
// Utility Functions
// ========================================
function getCategoryClass(category) {
    switch(category) {
        case 'Career Advice': return 'bg-primary';
        case 'Industry Trends': return 'bg-success';
        case 'Leadership': return 'bg-purple';
        default: return 'bg-secondary';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 
                   'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() + 543}`;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

function showSuccessAlert(title, message, type = 'success') {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" 
             role="alert" style="z-index: 9999; min-width: 400px;">
            <i class="bi bi-check-circle-fill me-2"></i>
            <strong>${title}</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $('body').append(alertHtml);
    
    setTimeout(() => {
        $('.alert').fadeOut(300, function() {
            $(this).remove();
        });
    }, 3000);
}
