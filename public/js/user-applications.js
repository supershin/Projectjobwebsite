// User Applications Page JavaScript
$(document).ready(function() {
    // Mock Data - ข้อมูลตัวอย่างใบสมัครงาน
    const mockApplications = [
        {
            id: 1,
            jobTitle: 'Senior Frontend Developer',
            jobTitleTh: 'นักพัฒนา Frontend อาวุโส',
            company: 'Tech Innovate Co.',
            companyTh: 'บริษัท เทค อินโนเวท จำกัด',
            logo: '🚀',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            salary: '50,000 - 80,000',
            appliedDate: '2026-02-28',
            status: 'interview',
            interviewDate: '2026-03-10',
            jobType: 'Full-time'
        },
        {
            id: 2,
            jobTitle: 'UX/UI Designer',
            jobTitleTh: 'นักออกแบบ UX/UI',
            company: 'Creative Studio',
            companyTh: 'สตูดิโอสร้างสรรค์',
            logo: '🎨',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            salary: '40,000 - 60,000',
            appliedDate: '2026-03-01',
            status: 'reviewing',
            jobType: 'Full-time'
        },
        {
            id: 3,
            jobTitle: 'Digital Marketing Specialist',
            jobTitleTh: 'ผู้เชี่ยวชาญการตลาดดิจิทัล',
            company: 'Marketing Pro',
            companyTh: 'มาร์เก็ตติ้ง โปร',
            logo: '📱',
            location: 'Chiang Mai',
            locationTh: 'เชียงใหม่',
            salary: '35,000 - 50,000',
            appliedDate: '2026-02-25',
            status: 'pending',
            jobType: 'Remote'
        },
        {
            id: 4,
            jobTitle: 'Project Manager',
            jobTitleTh: 'ผู้จัดการโครงการ',
            company: 'Global Solutions',
            companyTh: 'โกลบอล โซลูชั่น',
            logo: '📊',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            salary: '60,000 - 90,000',
            appliedDate: '2026-02-20',
            status: 'rejected',
            jobType: 'Full-time'
        },
        {
            id: 5,
            jobTitle: 'Data Analyst',
            jobTitleTh: 'นักวิเคราะห์ข้อมูล',
            company: 'Data Insights Inc.',
            companyTh: 'ดาต้า อินไซต์ จำกัด',
            logo: '📈',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            salary: '45,000 - 65,000',
            appliedDate: '2026-02-15',
            status: 'accepted',
            jobType: 'Hybrid'
        }
    ];

    let currentFilter = 'all';

    // Get translation for status
    function getStatusText(status) {
        const currentLang = localStorage.getItem('language') || 'th';
        const statusMap = {
            'pending': currentLang === 'th' ? 'รอดำเนินการ' : 'Pending',
            'reviewing': currentLang === 'th' ? 'กำลังพิจารณา' : 'Reviewing',
            'interview': currentLang === 'th' ? 'นัดสัมภาษณ์' : 'Interview Scheduled',
            'rejected': currentLang === 'th' ? 'ไม่ผ่านการคัดเลือก' : 'Not Selected',
            'accepted': currentLang === 'th' ? 'ผ่านการคัดเลือก' : 'Accepted'
        };
        return statusMap[status] || status;
    }

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const currentLang = localStorage.getItem('language') || 'th';
        
        if (currentLang === 'th') {
            const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
            return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
        } else {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        }
    }

    // Render applications
    function renderApplications(filter = 'all') {
        const container = $('#applicationsContainer');
        const emptyState = $('#emptyState');
        const currentLang = localStorage.getItem('language') || 'th';
        
        let filteredApplications = mockApplications;
        if (filter !== 'all') {
            filteredApplications = mockApplications.filter(app => app.status === filter);
        }

        if (filteredApplications.length === 0) {
            container.hide();
            emptyState.show();
            return;
        }

        container.show();
        emptyState.hide();

        let html = '';
        filteredApplications.forEach(app => {
            const jobTitle = currentLang === 'th' ? app.jobTitleTh : app.jobTitle;
            const company = currentLang === 'th' ? app.companyTh : app.company;
            const location = currentLang === 'th' ? app.locationTh : app.location;
            const appliedText = currentLang === 'th' ? 'สมัครเมื่อ' : 'Applied on';
            const interviewText = currentLang === 'th' ? 'สัมภาษณ์วันที่' : 'Interview on';
            const viewDetailsText = currentLang === 'th' ? 'ดูรายละเอียด' : 'View Details';
            const withdrawText = currentLang === 'th' ? 'ถอนใบสมัคร' : 'Withdraw';

            html += `
                <div class="application-card">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <div class="company-logo">
                                ${app.logo}
                            </div>
                        </div>
                        <div class="col">
                            <h5 class="mb-1">${jobTitle}</h5>
                            <div class="text-muted mb-2">
                                <i class="bi bi-building"></i> ${company}
                                <span class="mx-2">•</span>
                                <i class="bi bi-geo-alt"></i> ${location}
                                <span class="mx-2">•</span>
                                <i class="bi bi-cash"></i> ฿${app.salary}
                            </div>
                            <div>
                                <span class="status-badge status-${app.status}">${getStatusText(app.status)}</span>
                                <span class="text-muted ms-3">
                                    <i class="bi bi-calendar"></i> ${appliedText}: ${formatDate(app.appliedDate)}
                                </span>
                                ${app.status === 'interview' && app.interviewDate ? `
                                    <span class="text-success ms-3">
                                        <i class="bi bi-calendar-check"></i> ${interviewText}: ${formatDate(app.interviewDate)}
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                        <div class="col-auto">
                            <a href="job-detail.html?id=${app.id}" class="btn btn-outline-primary btn-sm me-2">
                                <i class="bi bi-eye"></i> ${viewDetailsText}
                            </a>
                            ${app.status === 'pending' || app.status === 'reviewing' ? `
                                <button class="btn btn-outline-danger btn-sm" onclick="withdrawApplication(${app.id})">
                                    <i class="bi bi-x-circle"></i> ${withdrawText}
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        container.html(html);
    }

    // Filter applications
    $('#statusFilter button').on('click', function() {
        $('#statusFilter button').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('status');
        renderApplications(currentFilter);
    });

    // Withdraw application
    window.withdrawApplication = function(id) {
        const currentLang = localStorage.getItem('language') || 'th';
        const confirmText = currentLang === 'th' 
            ? 'คุณแน่ใจหรือไม่ที่จะถอนใบสมัครงานนี้?' 
            : 'Are you sure you want to withdraw this application?';
        
        if (confirm(confirmText)) {
            // In production, this would call the API
            const successText = currentLang === 'th' 
                ? 'ถอนใบสมัครสำเร็จ' 
                : 'Application withdrawn successfully';
            alert(successText);
            
            // Remove from mock data and re-render
            const index = mockApplications.findIndex(app => app.id === id);
            if (index > -1) {
                mockApplications.splice(index, 1);
                renderApplications(currentFilter);
            }
        }
    };

    // Initial render
    renderApplications();

    // Re-render on language change
    $(document).on('languageChanged', function() {
        renderApplications(currentFilter);
    });
});
