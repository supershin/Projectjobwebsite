// User Saved Jobs Page JavaScript
$(document).ready(function() {
    // Mock Data - ข้อมูลตัวอย่างงานที่บันทึก
    let savedJobs = [
        {
            id: 1,
            jobTitle: 'Full Stack Developer',
            jobTitleTh: 'นักพัฒนาเว็บฟูลสแตก',
            company: 'Startup Hub',
            companyTh: 'สตาร์ทอัพ ฮับ',
            logo: '💻',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            salary: '60,000 - 90,000',
            jobType: 'Full-time',
            savedDate: '2026-03-04',
            tags: ['React', 'Node.js', 'MongoDB']
        },
        {
            id: 2,
            jobTitle: 'Product Designer',
            jobTitleTh: 'นักออกแบบผลิตภัณฑ์',
            company: 'Design Co.',
            companyTh: 'ดีไซน์ จำกัด',
            logo: '🎨',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            salary: '45,000 - 70,000',
            jobType: 'Full-time',
            savedDate: '2026-03-03',
            tags: ['Figma', 'UI/UX', 'Design System']
        },
        {
            id: 3,
            jobTitle: 'Content Marketing Manager',
            jobTitleTh: 'ผู้จัดการการตลาดเนื้อหา',
            company: 'Media Plus',
            companyTh: 'มีเดีย พลัส',
            logo: '📝',
            location: 'Remote',
            locationTh: 'ทำงานจากที่บ้าน',
            salary: '40,000 - 60,000',
            jobType: 'Remote',
            savedDate: '2026-03-01',
            tags: ['SEO', 'Content Strategy', 'Social Media']
        },
        {
            id: 4,
            jobTitle: 'Business Analyst',
            jobTitleTh: 'นักวิเคราะห์ธุรกิจ',
            company: 'Consulting Group',
            companyTh: 'กลุ่มที่ปรึกษา',
            logo: '📊',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            salary: '50,000 - 75,000',
            jobType: 'Hybrid',
            savedDate: '2026-02-28',
            tags: ['SQL', 'Power BI', 'Analytics']
        },
        {
            id: 5,
            jobTitle: 'DevOps Engineer',
            jobTitleTh: 'วิศวกร DevOps',
            company: 'Cloud Tech',
            companyTh: 'คลาวด์ เทค',
            logo: '☁️',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            salary: '70,000 - 100,000',
            jobType: 'Full-time',
            savedDate: '2026-02-26',
            tags: ['AWS', 'Docker', 'Kubernetes']
        }
    ];

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

    // Get job type translation
    function getJobTypeText(type) {
        const currentLang = localStorage.getItem('language') || 'th';
        const typeMap = {
            'Full-time': currentLang === 'th' ? 'งานประจำ' : 'Full-time',
            'Part-time': currentLang === 'th' ? 'งานพาร์ทไทม์' : 'Part-time',
            'Remote': currentLang === 'th' ? 'ทำงานจากที่บ้าน' : 'Remote',
            'Hybrid': currentLang === 'th' ? 'Hybrid' : 'Hybrid'
        };
        return typeMap[type] || type;
    }

    // Render saved jobs
    function renderSavedJobs() {
        const container = $('#savedJobsContainer');
        const emptyState = $('#emptyState');
        const savedCount = $('#savedCount');
        const currentLang = localStorage.getItem('language') || 'th';

        if (savedJobs.length === 0) {
            container.hide();
            emptyState.show();
            savedCount.text('0');
            return;
        }

        container.show();
        emptyState.hide();
        savedCount.text(savedJobs.length);

        const savedText = currentLang === 'th' ? 'บันทึกเมื่อ' : 'Saved on';
        const applyText = currentLang === 'th' ? 'สมัครเลย' : 'Apply Now';
        const viewText = currentLang === 'th' ? 'ดูรายละเอียด' : 'View Details';
        const removeText = currentLang === 'th' ? 'ลบ' : 'Remove';

        let html = '';
        savedJobs.forEach(job => {
            const jobTitle = currentLang === 'th' ? job.jobTitleTh : job.jobTitle;
            const company = currentLang === 'th' ? job.companyTh : job.company;
            const location = currentLang === 'th' ? job.locationTh : job.location;

            html += `
                <div class="job-card">
                    <div class="saved-badge">
                        <i class="bi bi-bookmark-fill"></i> ${savedText}: ${formatDate(job.savedDate)}
                    </div>
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <div class="company-logo">
                                ${job.logo}
                            </div>
                        </div>
                        <div class="col">
                            <h5 class="mb-1">${jobTitle}</h5>
                            <div class="text-muted mb-2">
                                <i class="bi bi-building"></i> ${company}
                                <span class="mx-2">•</span>
                                <i class="bi bi-geo-alt"></i> ${location}
                                <span class="mx-2">•</span>
                                <span class="badge bg-secondary">${getJobTypeText(job.jobType)}</span>
                            </div>
                            <div class="mb-2">
                                <i class="bi bi-cash text-success"></i> 
                                <strong>฿${job.salary}</strong>
                            </div>
                            <div>
                                ${job.tags.map(tag => `<span class="badge bg-light text-dark me-1">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <div class="col-auto">
                            <a href="job-detail.html?id=${job.id}" class="btn btn-primary-custom btn-sm mb-2 w-100">
                                <i class="bi bi-send"></i> ${applyText}
                            </a>
                            <a href="job-detail.html?id=${job.id}" class="btn btn-outline-primary btn-sm mb-2 w-100">
                                <i class="bi bi-eye"></i> ${viewText}
                            </a>
                            <button class="btn btn-outline-danger btn-sm w-100" onclick="removeSavedJob(${job.id})">
                                <i class="bi bi-trash"></i> ${removeText}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        container.html(html);
    }

    // Sort saved jobs
    $('#sortSavedJobs').on('change', function() {
        const sortBy = $(this).val();
        
        switch(sortBy) {
            case 'recent':
                savedJobs.sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate));
                break;
            case 'oldest':
                savedJobs.sort((a, b) => new Date(a.savedDate) - new Date(b.savedDate));
                break;
            case 'salary-high':
                savedJobs.sort((a, b) => {
                    const salaryA = parseInt(a.salary.split('-')[1].replace(/,/g, ''));
                    const salaryB = parseInt(b.salary.split('-')[1].replace(/,/g, ''));
                    return salaryB - salaryA;
                });
                break;
            case 'salary-low':
                savedJobs.sort((a, b) => {
                    const salaryA = parseInt(a.salary.split('-')[0].replace(/,/g, ''));
                    const salaryB = parseInt(b.salary.split('-')[0].replace(/,/g, ''));
                    return salaryA - salaryB;
                });
                break;
        }
        
        renderSavedJobs();
    });

    // Remove saved job
    window.removeSavedJob = function(id) {
        const currentLang = localStorage.getItem('language') || 'th';
        const confirmText = currentLang === 'th' 
            ? 'คุณแน่ใจหรือไม่ที่จะลบงานนี้?' 
            : 'Are you sure you want to remove this job?';
        
        if (confirm(confirmText)) {
            savedJobs = savedJobs.filter(job => job.id !== id);
            renderSavedJobs();
            
            const successText = currentLang === 'th' 
                ? 'ลบงานเรียบร้อยแล้ว' 
                : 'Job removed successfully';
            // You can add a toast notification here instead of alert
        }
    };

    // Clear all saved jobs
    $('#clearAllSaved').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        const confirmText = currentLang === 'th' 
            ? 'คุณแน่ใจหรือไม่ที่จะลบงานที่บันทึกทั้งหมด?' 
            : 'Are you sure you want to remove all saved jobs?';
        
        if (confirm(confirmText)) {
            savedJobs = [];
            renderSavedJobs();
            
            const successText = currentLang === 'th' 
                ? 'ลบงานทั้งหมดเรียบร้อยแล้ว' 
                : 'All saved jobs removed successfully';
            alert(successText);
        }
    });

    // Initial render
    renderSavedJobs();

    // Re-render on language change
    $(document).on('languageChanged', function() {
        renderSavedJobs();
    });
});
