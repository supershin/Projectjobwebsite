// =========================================
// ADMIN SALARY MANAGEMENT
// =========================================

// Mock Salary Data (จะเชื่อม API ภายหลัง)
let salaryData = [];

// Load Salaries Page
function loadAdminSalaries() {
    $('#dashboardTitle').text('จัดการข้อมูลเงินเดือน (Salary Insights)');
    
    $('#dashboardContent').html(`
        <div class="row mb-4">
            <div class="col">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-currency-dollar text-primary me-2"></i>
                                รายการข้อมูลเงินเดือน
                            </h5>
                            <button class="btn btn-primary" onclick="showAddSalaryForm()">
                                <i class="bi bi-plus-circle me-1"></i> เพิ่มข้อมูลเงินเดือน
                            </button>
                        </div>
                        
                        <!-- Filters -->
                        <div class="row g-3 mb-4">
                            <div class="col-md-3">
                                <input type="text" class="form-control" id="searchSalary" placeholder="ค้นหาตำแหน่งงาน...">
                            </div>
                            <div class="col-md-2">
                                <select class="form-select" id="filterDepartment">
                                    <option value="">ทุกแผนก</option>
                                    <option value="Front Office">Front Office</option>
                                    <option value="Kitchen">Kitchen</option>
                                    <option value="F&B">F&B</option>
                                    <option value="Housekeeping">Housekeeping</option>
                                    <option value="Sales & Marketing">Sales & Marketing</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select class="form-select" id="filterLevel">
                                    <option value="">ทุกระดับ</option>
                                    <option value="Entry Level">Entry Level</option>
                                    <option value="Mid Level">Mid Level</option>
                                    <option value="Management">Management</option>
                                    <option value="Executive">Executive</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select class="form-select" id="filterLocation">
                                    <option value="">ทุกพื้นที่</option>
                                    <option value="Bangkok">Bangkok</option>
                                    <option value="Phuket">Phuket</option>
                                    <option value="Chiang Mai">Chiang Mai</option>
                                    <option value="Pattaya">Pattaya</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-outline-primary w-100" onclick="filterSalaries()">
                                    <i class="bi bi-funnel me-1"></i>กรอง
                                </button>
                            </div>
                        </div>
                        
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>ตำแหน่งงาน</th>
                                        <th>แผนก</th>
                                        <th>ระดับ</th>
                                        <th>พื้นที่</th>
                                        <th>เงินเดือนเฉลี่ย</th>
                                        <th>ช่วงเงินเดือน</th>
                                        <th>ความต้องการ</th>
                                        <th>การจัดการ</th>
                                    </tr>
                                </thead>
                                <tbody id="salaryTableBody">
                                    <tr>
                                        <td colspan="8" class="text-center">
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    loadSalaryData();
}

// Load Salary Data
async function loadSalaryData() {
    try {
        const response = await fetch('./data/salary-data.json');
        salaryData = await response.json();
        displaySalaryTable(salaryData);
    } catch (error) {
        console.error('Error loading salary data:', error);
        $('#salaryTableBody').html('<tr><td colspan="8" class="text-center text-danger">เกิดข้อผิดพลาดในการโหลดข้อมูล</td></tr>');
    }
}

// Display Salary Table
function displaySalaryTable(data) {
    if (data.length === 0) {
        $('#salaryTableBody').html('<tr><td colspan="8" class="text-center text-muted">ไม่พบข้อมูล</td></tr>');
        return;
    }
    
    let html = '';
    data.forEach(salary => {
        const demandBadge = salary.demand === 'High' ? 'bg-success' : salary.demand === 'Medium' ? 'bg-warning' : 'bg-secondary';
        html += `
            <tr>
                <td>
                    <strong>${salary.jobTitleTH}</strong><br>
                    <small class="text-muted">${salary.jobTitle}</small>
                </td>
                <td><span class="badge bg-primary">${salary.department}</span></td>
                <td><span class="badge bg-info">${salary.level}</span></td>
                <td><i class="bi bi-geo-alt"></i> ${salary.location}</td>
                <td><strong class="text-primary">${formatCurrency(salary.salaryRange.average)}</strong></td>
                <td>
                    <small>${formatCurrency(salary.salaryRange.min)} - ${formatCurrency(salary.salaryRange.max)}</small>
                </td>
                <td><span class="badge ${demandBadge}">${salary.demand}</span></td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <a href="admin-salary-view.html?id=${salary.positionId}" class="btn btn-outline-info" title="ดูรายละเอียด">
                            <i class="bi bi-eye"></i>
                        </a>
                        <a href="admin-salary-edit.html?id=${salary.positionId}" class="btn btn-outline-warning" title="แก้ไข">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <button class="btn btn-outline-danger" onclick="deleteSalary('${salary.positionId}')" title="ลบ">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    $('#salaryTableBody').html(html);
}

// Filter Salaries
function filterSalaries() {
    const search = $('#searchSalary').val().toLowerCase();
    const dept = $('#filterDepartment').val();
    const level = $('#filterLevel').val();
    const location = $('#filterLocation').val();
    
    let filtered = salaryData;
    
    if (search) {
        filtered = filtered.filter(s => 
            s.jobTitle.toLowerCase().includes(search) || 
            s.jobTitleTH.toLowerCase().includes(search)
        );
    }
    if (dept) filtered = filtered.filter(s => s.department === dept);
    if (level) filtered = filtered.filter(s => s.level === level);
    if (location) filtered = filtered.filter(s => s.location === location);
    
    displaySalaryTable(filtered);
}

// Show Add Salary Form
function showAddSalaryForm() {
    window.location.href = 'admin-salary-add.html';
}

// Delete Salary
function deleteSalary(positionId) {
    if (confirm('คุณต้องการลบข้อมูลเงินเดือนนี้หรือไม่?')) {
        // TODO: Call API to delete
        alert('ลบข้อมูลเรียบร้อย (ต้องเชื่อม API)');
        loadSalaryData();
    }
}

// =========================================
// ADMIN MARKET TRENDS MANAGEMENT
// =========================================

let marketTrendsData = null;

// Load Market Trends Page
function loadAdminMarketTrends() {
    $('#dashboardTitle').text('จัดการแนวโน้มตลาดแรงงาน');
    
    $('#dashboardContent').html(`
        <div class="row mb-4">
            <div class="col">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-graph-up-arrow text-success me-2"></i>
                                จัดการแนวโน้มตลาดแรงงาน
                            </h5>
                            <button class="btn btn-success" onclick="showEditMarketTrends()">
                                <i class="bi bi-pencil me-1"></i> แก้ไขข้อมูล
                            </button>
                        </div>
                        
                        <div class="row g-4" id="marketTrendsOverview">
                            <div class="col-12">
                                <div class="text-center">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Sections for editing -->
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="mb-0"><i class="bi bi-building me-2"></i>Department Demand</h6>
                            <a href="admin-market-trends-edit.html?section=departments" class="btn btn-sm btn-outline-primary">
                                <i class="bi bi-pencil"></i> แก้ไข
                            </a>
                        </div>
                        <div id="departmentList"></div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="mb-0"><i class="bi bi-geo-alt me-2"></i>Location Trends</h6>
                            <a href="admin-market-trends-edit.html?section=locations" class="btn btn-sm btn-outline-primary">
                                <i class="bi bi-pencil"></i> แก้ไข
                            </a>
                        </div>
                        <div id="locationList"></div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="mb-0"><i class="bi bi-rocket me-2"></i>Emerging Roles</h6>
                            <a href="admin-market-trends-edit.html?section=emerging" class="btn btn-sm btn-outline-primary">
                                <i class="bi bi-pencil"></i> แก้ไข
                            </a>
                        </div>
                        <div id="emergingList"></div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="mb-0"><i class="bi bi-lightbulb me-2"></i>Skills in Demand</h6>
                            <a href="admin-market-trends-edit.html?section=skills" class="btn btn-sm btn-outline-primary">
                                <i class="bi bi-pencil"></i> แก้ไข
                            </a>
                        </div>
                        <div id="skillsList"></div>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    loadMarketTrendsData();
}

// Load Market Trends Data
async function loadMarketTrendsData() {
    try {
        const response = await fetch('./data/market-trends.json');
        marketTrendsData = await response.json();
        displayMarketTrendsOverview();
        displayMarketTrendsSections();
    } catch (error) {
        console.error('Error loading market trends:', error);
        $('#marketTrendsOverview').html('<div class="col-12 text-center text-danger">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>');
    }
}

// Display Market Trends Overview
function displayMarketTrendsOverview() {
    const html = `
        <div class="col-md-3">
            <div class="card bg-success text-white">
                <div class="card-body text-center">
                    <h3>${marketTrendsData.overview.averageSalaryIncrease}</h3>
                    <p class="mb-0">การเติบโตเฉลี่ย</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-primary text-white">
                <div class="card-body text-center">
                    <h3>${marketTrendsData.overview.totalOpenPositions}</h3>
                    <p class="mb-0">ตำแหน่งว่าง</p>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <strong>Top Demand:</strong> ${marketTrendsData.overview.topDemandDepartments.join(', ')}
                </div>
            </div>
        </div>
    `;
    $('#marketTrendsOverview').html(html);
}

// Display Market Trends Sections
function displayMarketTrendsSections() {
    // Departments
    let deptHtml = '<ul class="list-unstyled">';
    marketTrendsData.departmentDemand.slice(0, 5).forEach(dept => {
        deptHtml += `<li class="mb-2"><span class="badge bg-primary">${dept.department}</span> - ${dept.demand}</li>`;
    });
    deptHtml += '</ul>';
    $('#departmentList').html(deptHtml);
    
    // Locations
    let locHtml = '<ul class="list-unstyled">';
    marketTrendsData.locationTrends.slice(0, 5).forEach(loc => {
        locHtml += `<li class="mb-2"><i class="bi bi-geo-alt"></i> ${loc.location} - ${formatCurrency(loc.avgSalary)}</li>`;
    });
    locHtml += '</ul>';
    $('#locationList').html(locHtml);
    
    // Emerging Roles
    let emerHtml = '<ul class="list-unstyled">';
    marketTrendsData.emergingRoles.slice(0, 4).forEach(role => {
        emerHtml += `<li class="mb-2"><span class="badge bg-success">${role.role}</span></li>`;
    });
    emerHtml += '</ul>';
    $('#emergingList').html(emerHtml);
    
    // Skills
    let skillsHtml = '<ul class="list-unstyled">';
    marketTrendsData.skillsInDemand.slice(0, 4).forEach(skill => {
        skillsHtml += `<li class="mb-2"><span class="badge bg-warning text-dark">${skill.skill}</span> - ${skill.salaryImpact}</li>`;
    });
    skillsHtml += '</ul>';
    $('#skillsList').html(skillsHtml);
}

// Show Edit Market Trends Form
function showEditMarketTrends() {
    window.location.href = 'admin-market-trends-edit.html';
}

// Helper: Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 0
    }).format(amount);
}

// Search on Enter
$(document).ready(function() {
    $('#searchSalary').on('keypress', function(e) {
        if (e.which === 13) {
            filterSalaries();
        }
    });
});
