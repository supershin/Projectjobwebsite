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
    // Navigate to article detail page
    window.location.href = `article-detail.html?id=${articleId}`;
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