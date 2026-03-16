// ========================================
// ADMIN: Hotel Partners Management
// Complete CRUD Operations
// ========================================

// Load all hotels
function loadAdminHotels() {
    $('#dashboardContent').html(`
        <div class="card shadow-sm">
            <div class="card-header bg-white py-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col">
                        <h5 class="mb-0 fw-bold">
                            <i class="bi bi-building-fill-add me-2"></i>
                            จัดการโรงแรมพันธมิตร
                        </h5>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-primary" onclick="showAddHotelModal()">
                            <i class="bi bi-plus-circle me-2"></i>เพิ่มโรงแรมใหม่
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- Filters -->
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="hotelSearchInput" placeholder="ค้นหาโรงแรม, แบรนด์...">
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="hotelLocationFilter">
                            <option value="">ทุกสถานที่</option>
                            <option value="Bangkok">Bangkok</option>
                            <option value="Phuket">Phuket</option>
                            <option value="Chiang Mai">Chiang Mai</option>
                            <option value="Pattaya">Pattaya</option>
                            <option value="Samui">Samui</option>
                            <option value="Hua Hin">Hua Hin</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="hotelStatusFilter">
                            <option value="">ทุกสถานะ</option>
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                            <option value="featured">Featured</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-outline-secondary w-100" onclick="clearHotelFilters()">
                            <i class="bi bi-arrow-clockwise me-2"></i>รีเซ็ต
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="stat-card bg-primary text-white">
                            <div class="stat-icon"><i class="bi bi-building"></i></div>
                            <div class="stat-number" id="totalHotelsCount">0</div>
                            <div class="stat-label">โรงแรมทั้งหมด</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-success text-white">
                            <div class="stat-icon"><i class="bi bi-patch-check"></i></div>
                            <div class="stat-number" id="verifiedHotelsCount">0</div>
                            <div class="stat-label">Verified</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-warning text-white">
                            <div class="stat-icon"><i class="bi bi-star-fill"></i></div>
                            <div class="stat-number" id="featuredHotelsCount">0</div>
                            <div class="stat-label">Featured</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-info text-white">
                            <div class="stat-icon"><i class="bi bi-briefcase"></i></div>
                            <div class="stat-number" id="totalOpenPositions">0</div>
                            <div class="stat-label">ตำแหน่งเปิดรับ</div>
                        </div>
                    </div>
                </div>

                <!-- Hotels Table -->
                <div class="table-responsive">
                    <table class="table table-hover align-middle" id="hotelsTable">
                        <thead class="table-light">
                            <tr>
                                <th width="60">Logo</th>
                                <th>โรงแรม</th>
                                <th>สถานที่</th>
                                <th>ประเภท</th>
                                <th>ตำแหน่ง</th>
                                <th>สถานะ</th>
                                <th width="200">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody id="hotelsTableBody">
                            <tr>
                                <td colspan="7" class="text-center py-5">
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

    // Load hotels data
    loadHotelsData();

    // Setup event listeners
    setupHotelFilters();
}

// Load hotels data from JSON
let allHotelsData = [];

async function loadHotelsData() {
    try {
        const response = await fetch('./data/hotels.json');
        allHotelsData = await response.json();
        
        // Update stats
        updateHotelStats();
        
        // Display hotels
        displayHotels(allHotelsData);
    } catch (error) {
        console.error('Error loading hotels:', error);
        $('#hotelsTableBody').html(`
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="bi bi-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
                    <p class="mt-3 text-danger">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                </td>
            </tr>
        `);
    }
}

// Display hotels in table
function displayHotels(hotels) {
    if (hotels.length === 0) {
        $('#hotelsTableBody').html(`
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="bi bi-inbox" style="font-size: 3rem; color: var(--gray-400);"></i>
                    <p class="mt-3 text-muted">ไม่พบโรงแรม</p>
                </td>
            </tr>
        `);
        return;
    }

    const rows = hotels.map(hotel => `
        <tr data-hotel-id="${hotel.hotelId}">
            <td>
                <img src="${hotel.logo}" alt="${hotel.brandName}" 
                     style="width: 50px; height: 50px; object-fit: contain; border-radius: 8px; border: 1px solid #e5e7eb;">
            </td>
            <td>
                <div class="fw-bold">${hotel.brandName}</div>
                <small class="text-muted">${hotel.hotelName}</small>
            </td>
            <td>
                <i class="bi bi-geo-alt-fill text-primary me-1"></i>
                ${hotel.location}
            </td>
            <td>
                <small class="text-muted">${hotel.hotelType}</small>
            </td>
            <td>
                <span class="badge bg-info">${hotel.openPositions} ตำแหน่ง</span>
            </td>
            <td>
                ${hotel.verified ? '<span class="badge bg-success"><i class="bi bi-patch-check-fill me-1"></i>Verified</span>' : '<span class="badge bg-warning">Pending</span>'}
                ${hotel.featured ? '<span class="badge bg-primary ms-1"><i class="bi bi-star-fill me-1"></i>Featured</span>' : ''}
            </td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewHotelDetails('${hotel.hotelId}')" title="ดูรายละเอียด">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-success" onclick="editHotel('${hotel.hotelId}')" title="แก้ไข">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteHotel('${hotel.hotelId}', '${hotel.hotelName}')" title="ลบ">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    $('#hotelsTableBody').html(rows);
}

// Update statistics
function updateHotelStats() {
    const total = allHotelsData.length;
    const verified = allHotelsData.filter(h => h.verified).length;
    const featured = allHotelsData.filter(h => h.featured).length;
    const totalPositions = allHotelsData.reduce((sum, h) => sum + h.openPositions, 0);

    $('#totalHotelsCount').text(total);
    $('#verifiedHotelsCount').text(verified);
    $('#featuredHotelsCount').text(featured);
    $('#totalOpenPositions').text(totalPositions);
}

// Setup filters
function setupHotelFilters() {
    $('#hotelSearchInput').on('input', filterHotels);
    $('#hotelLocationFilter').on('change', filterHotels);
    $('#hotelStatusFilter').on('change', filterHotels);
}

// Filter hotels
function filterHotels() {
    const searchTerm = $('#hotelSearchInput').val().toLowerCase();
    const location = $('#hotelLocationFilter').val();
    const status = $('#hotelStatusFilter').val();

    let filtered = allHotelsData.filter(hotel => {
        const matchSearch = hotel.hotelName.toLowerCase().includes(searchTerm) ||
                          hotel.brandName.toLowerCase().includes(searchTerm);
        const matchLocation = !location || hotel.location === location;
        
        let matchStatus = true;
        if (status === 'verified') matchStatus = hotel.verified;
        else if (status === 'pending') matchStatus = !hotel.verified;
        else if (status === 'featured') matchStatus = hotel.featured;

        return matchSearch && matchLocation && matchStatus;
    });

    displayHotels(filtered);
}

// Clear filters
function clearHotelFilters() {
    $('#hotelSearchInput').val('');
    $('#hotelLocationFilter').val('');
    $('#hotelStatusFilter').val('');
    displayHotels(allHotelsData);
}

// ========================================
// VIEW: View Hotel Details
// ========================================
function viewHotelDetails(hotelId) {
    window.location.href = `admin-hotel-view.html?id=${hotelId}`;
}

// ========================================
// ADD: Add New Hotel
// ========================================
function showAddHotelModal() {
    window.location.href = 'admin-hotel-add.html';
}

// ========================================
// EDIT: Edit Hotel
// ========================================
function editHotel(hotelId) {
    window.location.href = `admin-hotel-edit.html?id=${hotelId}`;
}

// ========================================
// DELETE: Delete Hotel
// ========================================
function deleteHotel(hotelId, hotelName) {
    // Confirm deletion
    if (!confirm(`คุณต้องการลบ "${hotelName}" ใช่หรือไม่?\n\nการกระทำนี้ไม่สามารถย้อนกลับได้!`)) {
        return;
    }

    // Find and remove hotel
    const hotelIndex = allHotelsData.findIndex(h => h.hotelId === hotelId);
    if (hotelIndex === -1) return;

    allHotelsData.splice(hotelIndex, 1);

    // Update display
    updateHotelStats();
    displayHotels(allHotelsData);

    // Show success message
    showSuccessAlert('ลบสำเร็จ!', `${hotelName} ถูกลบออกจากระบบแล้ว`, 'warning');
}

// ========================================
// Utility Functions
// ========================================
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
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        $('.alert').fadeOut(300, function() {
            $(this).remove();
        });
    }, 3000);
}