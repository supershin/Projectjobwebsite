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
    const hotel = allHotelsData.find(h => h.hotelId === hotelId);
    if (!hotel) return;

    const modalHtml = `
        <div class="modal fade" id="viewHotelModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="bi bi-building me-2"></i>
                            รายละเอียดโรงแรม
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-3 text-center">
                                <img src="${hotel.logo}" alt="${hotel.brandName}" class="img-fluid rounded" style="max-height: 150px;">
                            </div>
                            <div class="col-md-9">
                                <h4 class="fw-bold">${hotel.brandName}</h4>
                                <p class="text-muted mb-3">${hotel.hotelName}</p>
                                <p class="fst-italic">"${hotel.tagline}"</p>
                                
                                <div class="row g-3 mt-3">
                                    <div class="col-6">
                                        <strong>Hotel ID:</strong><br>
                                        <code>${hotel.hotelId}</code>
                                    </div>
                                    <div class="col-6">
                                        <strong>Employer ID:</strong><br>
                                        <code>${hotel.employerId}</code>
                                    </div>
                                    <div class="col-6">
                                        <strong>Location:</strong><br>
                                        ${hotel.location}
                                    </div>
                                    <div class="col-6">
                                        <strong>Hotel Type:</strong><br>
                                        ${hotel.hotelType}
                                    </div>
                                    <div class="col-6">
                                        <strong>Company Size:</strong><br>
                                        ${hotel.companySize}
                                    </div>
                                    <div class="col-6">
                                        <strong>Open Positions:</strong><br>
                                        <span class="badge bg-info">${hotel.openPositions} ตำแหน่ง</span>
                                    </div>
                                    <div class="col-12">
                                        <strong>Status:</strong><br>
                                        ${hotel.verified ? '<span class="badge bg-success"><i class="bi bi-patch-check-fill me-1"></i>Verified</span>' : '<span class="badge bg-warning">Pending</span>'}
                                        ${hotel.featured ? '<span class="badge bg-primary ms-1"><i class="bi bi-star-fill me-1"></i>Featured</span>' : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="my-4">

                        <div class="row">
                            <div class="col-12">
                                <h6 class="fw-bold mb-3">Cover Image</h6>
                                <img src="${hotel.coverImage}" alt="Cover" class="img-fluid rounded" style="max-height: 200px;">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                        <a href="hotel-profile.html?id=${hotel.hotelId}" target="_blank" class="btn btn-primary">
                            <i class="bi bi-box-arrow-up-right me-2"></i>ดูหน้าโปรไฟล์
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    $('#viewHotelModal').remove();
    
    // Add and show modal
    $('body').append(modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('viewHotelModal'));
    modal.show();
    
    // Remove modal from DOM when hidden
    $('#viewHotelModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

// ========================================
// ADD: Add New Hotel
// ========================================
function showAddHotelModal() {
    const modalHtml = `
        <div class="modal fade" id="addHotelModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="bi bi-plus-circle me-2"></i>
                            เพิ่มโรงแรมพันธมิตรใหม่
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addHotelForm">
                            <!-- Basic Information -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-info-circle me-2"></i>ข้อมูลพื้นฐาน
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Brand Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="brandName" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Hotel Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="hotelName" required>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Tagline <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="tagline" placeholder="Where Luxury Meets...">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Location <span class="text-danger">*</span></label>
                                    <select class="form-select" id="location" required>
                                        <option value="">เลือกสถานที่</option>
                                        <option value="Bangkok">Bangkok</option>
                                        <option value="Phuket">Phuket</option>
                                        <option value="Chiang Mai">Chiang Mai</option>
                                        <option value="Pattaya">Pattaya</option>
                                        <option value="Samui">Samui</option>
                                        <option value="Hua Hin">Hua Hin</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Hotel Type <span class="text-danger">*</span></label>
                                    <select class="form-select" id="hotelType" required>
                                        <option value="">เลือกประเภท</option>
                                        <option value="5-Star Luxury Hotel">5-Star Luxury Hotel</option>
                                        <option value="5-Star Beach Resort">5-Star Beach Resort</option>
                                        <option value="4-Star Hotel">4-Star Hotel</option>
                                        <option value="Boutique Hotel">Boutique Hotel</option>
                                        <option value="Business Hotel">Business Hotel</option>
                                        <option value="Resort & Spa">Resort & Spa</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Company Size</label>
                                    <select class="form-select" id="companySize">
                                        <option value="">เลือกขนาด</option>
                                        <option value="1-50 employees">1-50 employees</option>
                                        <option value="51-200 employees">51-200 employees</option>
                                        <option value="201-500 employees">201-500 employees</option>
                                        <option value="500+ employees">500+ employees</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Employer ID</label>
                                    <input type="text" class="form-control" id="employerId" placeholder="emp001">
                                    <small class="text-muted">ถ้าไม่ระบุ ระบบจะสร้างให้อัตโนมัติ</small>
                                </div>
                            </div>

                            <!-- Images -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-image me-2"></i>รูปภาพ
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Logo URL</label>
                                    <input type="url" class="form-control" id="logoUrl" placeholder="https://...">
                                    <small class="text-muted">หรือใช้ UI Avatars อัตโนมัติ</small>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Cover Image URL</label>
                                    <input type="url" class="form-control" id="coverImageUrl" placeholder="https://...">
                                </div>
                            </div>

                            <!-- Status -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-toggles me-2"></i>สถานะ
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-4">
                                    <label class="form-label">Open Positions</label>
                                    <input type="number" class="form-control" id="openPositions" value="0" min="0">
                                </div>
                                <div class="col-md-4">
                                    <div class="form-check form-switch mt-4">
                                        <input class="form-check-input" type="checkbox" id="verified">
                                        <label class="form-check-label" for="verified">
                                            <i class="bi bi-patch-check text-success me-1"></i>Verified
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-check form-switch mt-4">
                                        <input class="form-check-input" type="checkbox" id="featured">
                                        <label class="form-check-label" for="featured">
                                            <i class="bi bi-star text-warning me-1"></i>Featured
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-primary" onclick="saveNewHotel()">
                            <i class="bi bi-check-circle me-2"></i>บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#addHotelModal').remove();
    $('body').append(modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('addHotelModal'));
    modal.show();
    
    $('#addHotelModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

// Save new hotel
function saveNewHotel() {
    // Validate form
    const form = document.getElementById('addHotelForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Get form data
    const brandName = $('#brandName').val();
    const hotelName = $('#hotelName').val();
    const tagline = $('#tagline').val();
    const location = $('#location').val();
    const hotelType = $('#hotelType').val();
    const companySize = $('#companySize').val();
    const employerId = $('#employerId').val() || 'emp' + String(Math.random()).substr(2, 6);
    const openPositions = parseInt($('#openPositions').val()) || 0;
    const verified = $('#verified').is(':checked');
    const featured = $('#featured').is(':checked');

    // Generate hotel ID
    const hotelId = 'hotel' + String(Date.now()).substr(-6);

    // Generate logo if not provided
    let logo = $('#logoUrl').val();
    if (!logo) {
        logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(brandName)}&background=${Math.random().toString(16).substr(2,6)}&color=fff&size=200`;
    }

    // Get cover image
    const coverImage = $('#coverImageUrl').val() || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80';

    // Create new hotel object
    const newHotel = {
        hotelId,
        employerId,
        brandName,
        hotelName,
        logo,
        coverImage,
        tagline,
        location,
        hotelType,
        companySize: companySize || '100+ employees',
        openPositions,
        featured,
        verified
    };

    // Add to array (in production, this would be an API call)
    allHotelsData.unshift(newHotel);

    // Update display
    updateHotelStats();
    displayHotels(allHotelsData);

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('addHotelModal')).hide();

    // Show success message
    showSuccessAlert('เพิ่มโรงแรมสำเร็จ!', `${hotelName} ถูกเพิ่มเข้าระบบแล้ว`);
}

// ========================================
// EDIT: Edit Hotel
// ========================================
function editHotel(hotelId) {
    const hotel = allHotelsData.find(h => h.hotelId === hotelId);
    if (!hotel) return;

    const modalHtml = `
        <div class="modal fade" id="editHotelModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="bi bi-pencil me-2"></i>
                            แก้ไขโรงแรม: ${hotel.hotelName}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editHotelForm">
                            <input type="hidden" id="editHotelId" value="${hotel.hotelId}">
                            
                            <!-- Basic Information -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-info-circle me-2"></i>ข้อมูลพื้นฐาน
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Brand Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="editBrandName" value="${hotel.brandName}" required>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Hotel Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="editHotelName" value="${hotel.hotelName}" required>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Tagline <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="editTagline" value="${hotel.tagline}">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Location <span class="text-danger">*</span></label>
                                    <select class="form-select" id="editLocation" required>
                                        <option value="Bangkok" ${hotel.location === 'Bangkok' ? 'selected' : ''}>Bangkok</option>
                                        <option value="Phuket" ${hotel.location === 'Phuket' ? 'selected' : ''}>Phuket</option>
                                        <option value="Chiang Mai" ${hotel.location === 'Chiang Mai' ? 'selected' : ''}>Chiang Mai</option>
                                        <option value="Pattaya" ${hotel.location === 'Pattaya' ? 'selected' : ''}>Pattaya</option>
                                        <option value="Samui" ${hotel.location === 'Samui' ? 'selected' : ''}>Samui</option>
                                        <option value="Hua Hin" ${hotel.location === 'Hua Hin' ? 'selected' : ''}>Hua Hin</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Hotel Type <span class="text-danger">*</span></label>
                                    <select class="form-select" id="editHotelType" required>
                                        <option value="5-Star Luxury Hotel" ${hotel.hotelType === '5-Star Luxury Hotel' ? 'selected' : ''}>5-Star Luxury Hotel</option>
                                        <option value="5-Star Beach Resort" ${hotel.hotelType === '5-Star Beach Resort' ? 'selected' : ''}>5-Star Beach Resort</option>
                                        <option value="4-Star Hotel" ${hotel.hotelType === '4-Star Hotel' ? 'selected' : ''}>4-Star Hotel</option>
                                        <option value="Boutique Hotel" ${hotel.hotelType === 'Boutique Hotel' ? 'selected' : ''}>Boutique Hotel</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Company Size</label>
                                    <input type="text" class="form-control" id="editCompanySize" value="${hotel.companySize}">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Employer ID</label>
                                    <input type="text" class="form-control" id="editEmployerId" value="${hotel.employerId}" readonly>
                                </div>
                            </div>

                            <!-- Images -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-image me-2"></i>รูปภาพ
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label">Logo URL</label>
                                    <input type="url" class="form-control" id="editLogoUrl" value="${hotel.logo}">
                                    <img src="${hotel.logo}" alt="Logo Preview" class="img-thumbnail mt-2" style="max-height: 100px;">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Cover Image URL</label>
                                    <input type="url" class="form-control" id="editCoverImageUrl" value="${hotel.coverImage}">
                                    <img src="${hotel.coverImage}" alt="Cover Preview" class="img-thumbnail mt-2" style="max-height: 100px;">
                                </div>
                            </div>

                            <!-- Status -->
                            <h6 class="fw-bold mb-3">
                                <i class="bi bi-toggles me-2"></i>สถานะ
                            </h6>
                            <div class="row g-3 mb-4">
                                <div class="col-md-4">
                                    <label class="form-label">Open Positions</label>
                                    <input type="number" class="form-control" id="editOpenPositions" value="${hotel.openPositions}" min="0">
                                </div>
                                <div class="col-md-4">
                                    <div class="form-check form-switch mt-4">
                                        <input class="form-check-input" type="checkbox" id="editVerified" ${hotel.verified ? 'checked' : ''}>
                                        <label class="form-check-label" for="editVerified">
                                            <i class="bi bi-patch-check text-success me-1"></i>Verified
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-check form-switch mt-4">
                                        <input class="form-check-input" type="checkbox" id="editFeatured" ${hotel.featured ? 'checked' : ''}>
                                        <label class="form-check-label" for="editFeatured">
                                            <i class="bi bi-star text-warning me-1"></i>Featured
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-success" onclick="updateHotel()">
                            <i class="bi bi-save me-2"></i>บันทึกการแก้ไข
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#editHotelModal').remove();
    $('body').append(modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('editHotelModal'));
    modal.show();
    
    $('#editHotelModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

// Update hotel
function updateHotel() {
    const hotelId = $('#editHotelId').val();
    const hotelIndex = allHotelsData.findIndex(h => h.hotelId === hotelId);
    
    if (hotelIndex === -1) return;

    // Update hotel data
    allHotelsData[hotelIndex] = {
        ...allHotelsData[hotelIndex],
        brandName: $('#editBrandName').val(),
        hotelName: $('#editHotelName').val(),
        tagline: $('#editTagline').val(),
        location: $('#editLocation').val(),
        hotelType: $('#editHotelType').val(),
        companySize: $('#editCompanySize').val(),
        logo: $('#editLogoUrl').val(),
        coverImage: $('#editCoverImageUrl').val(),
        openPositions: parseInt($('#editOpenPositions').val()) || 0,
        verified: $('#editVerified').is(':checked'),
        featured: $('#editFeatured').is(':checked')
    };

    // Update display
    updateHotelStats();
    displayHotels(allHotelsData);

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('editHotelModal')).hide();

    // Show success message
    showSuccessAlert('อัพเดทสำเร็จ!', 'ข้อมูลโรงแรมถูกอัพเดทแล้ว');
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
