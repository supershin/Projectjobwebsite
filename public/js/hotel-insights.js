// ========================================
// Hotel Insights - Main JavaScript
// ========================================

let allArticles = [];
let currentCategory = 'all';
let articlesPerPage = 9;
let currentPage = 1;

$(document).ready(function() {
    // Load articles
    loadArticles();
    
    // Setup event listeners
    setupEventListeners();
});

// ========================================
// Load Articles
// ========================================
async function loadArticles() {
    try {
        const response = await fetch('./data/insights.json');
        allArticles = await response.json();
        
        // Display featured article
        displayFeaturedArticle();
        
        // Display articles
        displayArticles();
    } catch (error) {
        console.error('Error loading articles:', error);
        $('#articlesGrid').html(`
            <div class="col-12 text-center py-5">
                <i class="bi bi-exclamation-triangle text-danger" style="font-size: 4rem;"></i>
                <h5 class="mt-3 text-danger">ไม่สามารถโหลดบทความได้</h5>
            </div>
        `);
    }
}

// ========================================
// Display Featured Article
// ========================================
function displayFeaturedArticle() {
    const featured = allArticles.find(a => a.featured && a.trending);
    if (!featured) return;

    const categoryClass = getCategoryClass(featured.category);
    
    const html = `
        <div class="featured-article">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <div class="featured-content">
                        <div class="featured-badge">
                            <i class="bi bi-star-fill"></i>
                            Featured Article
                        </div>
                        <span class="category-badge ${categoryClass}">${featured.category}</span>
                        <h2>${featured.title}</h2>
                        <div class="article-meta">
                            <span><i class="bi bi-person me-1"></i>${featured.author.name}</span>
                            <span>•</span>
                            <span><i class="bi bi-calendar me-1"></i>${formatDate(featured.publishDate)}</span>
                            <span>•</span>
                            <span><i class="bi bi-clock me-1"></i>${featured.readTime} min read</span>
                        </div>
                        <p class="article-excerpt">${featured.excerpt}</p>
                        <button class="btn btn-light btn-lg" onclick="viewArticle('${featured.articleId}')">
                            <i class="bi bi-book me-2"></i>อ่านทันที
                        </button>
                    </div>
                </div>
                <div class="col-md-6">
                    <img src="${featured.featuredImage}" alt="${featured.title}" style="width: 100%; height: 400px; object-fit: cover;">
                </div>
            </div>
        </div>
    `;
    
    $('#featuredArticle').html(html);
}

// ========================================
// Display Articles
// ========================================
function displayArticles() {
    // Filter articles
    let filtered = allArticles;
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(a => a.category === currentCategory);
    }
    
    // Search filter
    const searchTerm = $('#articleSearch').val().toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(a => 
            a.title.toLowerCase().includes(searchTerm) ||
            a.excerpt.toLowerCase().includes(searchTerm) ||
            a.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // Remove featured from list if showing all
    if (currentCategory === 'all') {
        filtered = filtered.filter(a => !(a.featured && a.trending));
    }
    
    // Pagination
    const startIndex = 0;
    const endIndex = currentPage * articlesPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    
    if (filtered.length === 0) {
        $('#articlesGrid').html(`
            <div class="col-12 text-center py-5">
                <i class="bi bi-inbox" style="font-size: 4rem; color: var(--gray-400);"></i>
                <h5 class="mt-3 text-muted">ไม่พบบทความ</h5>
            </div>
        `);
        $('#loadMoreContainer').hide();
        return;
    }
    
    const html = paginated.map(article => createArticleCard(article)).join('');
    $('#articlesGrid').html(html);
    
    // Show/hide load more button
    if (endIndex < filtered.length) {
        $('#loadMoreContainer').show();
    } else {
        $('#loadMoreContainer').hide();
    }
}

// ========================================
// Create Article Card
// ========================================
function createArticleCard(article) {
    const categoryClass = getCategoryClass(article.category);
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="article-card">
                <img src="${article.featuredImage}" alt="${article.title}" class="article-image">
                <div class="article-body">
                    <span class="category-badge ${categoryClass}">${article.category}</span>
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span><i class="bi bi-calendar me-1"></i>${formatDate(article.publishDate)}</span>
                        <span>•</span>
                        <span><i class="bi bi-clock me-1"></i>${article.readTime} min</span>
                    </div>
                    <p class="article-excerpt">${article.excerpt}</p>
                    
                    <!-- Tags -->
                    <div class="mb-3">
                        ${article.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    
                    <!-- Author Info -->
                    <div class="author-info">
                        <img src="${article.author.avatar}" alt="${article.author.name}" class="author-avatar">
                        <div class="flex-grow-1">
                            <div class="author-name">${article.author.name}</div>
                            <div class="author-position">${article.author.position}</div>
                        </div>
                    </div>
                    
                    <!-- Stats -->
                    <div class="article-stats">
                        <div class="stat-item">
                            <i class="bi bi-eye"></i>
                            <span>${formatNumber(article.views)}</span>
                        </div>
                        <div class="stat-item">
                            <i class="bi bi-heart"></i>
                            <span>${article.likes}</span>
                        </div>
                        <div class="stat-item">
                            <i class="bi bi-chat"></i>
                            <span>${article.comments}</span>
                        </div>
                    </div>
                    
                    <!-- Read More Button -->
                    <div class="mt-3">
                        <button class="btn btn-primary w-100" onclick="viewArticle('${article.articleId}')">
                            <i class="bi bi-book me-2"></i>อ่านเพิ่มเติม
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// View Article Detail
// ========================================
function viewArticle(articleId) {
    const article = allArticles.find(a => a.articleId === articleId);
    if (!article) return;
    
    const categoryClass = getCategoryClass(article.category);
    
    const modalHtml = `
        <div class="modal fade" id="articleModal" tabindex="-1">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body px-5">
                        <!-- Hero Image -->
                        <img src="${article.featuredImage}" alt="${article.title}" 
                             style="width: 100%; height: 400px; object-fit: cover; border-radius: 16px; margin-bottom: 30px;">
                        
                        <!-- Category & Meta -->
                        <span class="category-badge ${categoryClass}">${article.category}</span>
                        <h1 class="display-5 fw-bold mt-3 mb-3">${article.title}</h1>
                        
                        <div class="d-flex align-items-center gap-3 mb-4 pb-4 border-bottom">
                            <img src="${article.author.avatar}" alt="${article.author.name}" 
                                 style="width: 60px; height: 60px; border-radius: 50%;">
                            <div>
                                <div class="fw-bold">${article.author.name}</div>
                                <div class="text-muted small">${article.author.position}</div>
                            </div>
                            <div class="ms-auto text-muted small">
                                <div><i class="bi bi-calendar me-2"></i>${formatDate(article.publishDate)}</div>
                                <div><i class="bi bi-clock me-2"></i>${article.readTime} min read</div>
                            </div>
                        </div>
                        
                        <!-- Stats -->
                        <div class="d-flex gap-4 mb-4">
                            <div class="stat-item">
                                <i class="bi bi-eye me-2"></i>
                                <strong>${formatNumber(article.views)}</strong> views
                            </div>
                            <div class="stat-item">
                                <i class="bi bi-heart me-2"></i>
                                <strong>${article.likes}</strong> likes
                            </div>
                            <div class="stat-item">
                                <i class="bi bi-chat me-2"></i>
                                <strong>${article.comments}</strong> comments
                            </div>
                        </div>
                        
                        <!-- Content -->
                        <div class="article-content mb-4" style="font-size: 1.125rem; line-height: 1.75;">
                            <p class="lead">${article.excerpt}</p>
                            ${article.content}
                        </div>
                        
                        <!-- Tags -->
                        <div class="mb-4 pb-4 border-top pt-4">
                            <h6 class="fw-bold mb-3">Tags:</h6>
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        
                        <!-- Share Buttons -->
                        <div class="mb-4">
                            <h6 class="fw-bold mb-3">Share this article:</h6>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-primary" onclick="shareArticle('facebook', '${article.articleId}')">
                                    <i class="bi bi-facebook"></i>
                                </button>
                                <button class="btn btn-outline-info" onclick="shareArticle('twitter', '${article.articleId}')">
                                    <i class="bi bi-twitter"></i>
                                </button>
                                <button class="btn btn-outline-success" onclick="shareArticle('line', '${article.articleId}')">
                                    <i class="bi bi-line"></i>
                                </button>
                                <button class="btn btn-outline-secondary" onclick="copyLink('${article.articleId}')">
                                    <i class="bi bi-link-45deg"></i> Copy Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#articleModal').remove();
    $('body').append(modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('articleModal'));
    modal.show();
    
    $('#articleModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
    
    // Increment view count (in production, call API)
    article.views++;
}

// ========================================
// Event Listeners
// ========================================
function setupEventListeners() {
    // Category pills
    $('.category-pill').on('click', function() {
        $('.category-pill').removeClass('active');
        $(this).addClass('active');
        
        currentCategory = $(this).data('category');
        currentPage = 1;
        displayArticles();
    });
    
    // Search
    $('#articleSearch').on('input', function() {
        currentPage = 1;
        displayArticles();
    });
    
    // Load more
    $('#loadMoreBtn').on('click', function() {
        currentPage++;
        displayArticles();
        
        // Scroll to new content
        $('html, body').animate({
            scrollTop: $('#articlesGrid').offset().top - 100
        }, 500);
    });
}

// ========================================
// Utility Functions
// ========================================
function getCategoryClass(category) {
    switch(category) {
        case 'Career Advice': return 'career';
        case 'Industry Trends': return 'trends';
        case 'Leadership': return 'leadership';
        default: return 'career';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 
                   'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() + 543}`;
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

function shareArticle(platform, articleId) {
    const article = allArticles.find(a => a.articleId === articleId);
    if (!article) return;
    
    const url = encodeURIComponent(window.location.origin + '/hotel-insights.html?article=' + articleId);
    const text = encodeURIComponent(article.title);
    
    let shareUrl;
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'line':
            shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyLink(articleId) {
    const url = window.location.origin + '/hotel-insights.html?article=' + articleId;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert('คัดลอกลิงก์แล้ว!');
        });
    } else {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('คัดลอกลิงก์แล้ว!');
    }
}

// Check if direct link to article
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article');
    if (articleId) {
        setTimeout(() => {
            viewArticle(articleId);
        }, 500);
    }
});
