// ========================================
// JOB DATA MODEL - Standard Job Object
// ========================================

/**
 * Standard Job Object Model (20 fields)
 * ใช้สำหรับทุก mode: User, Employer, Admin
 */

// Mock Job Data - ข้อมูลงานตัวอย่าง
const MOCK_JOBS = [
    {
        // Basic Info
        id: 1,
        companyId: 1,
        companyName: 'TechCorp Thailand Co., Ltd.',
        companyLogo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff',
        
        // 20 Fields from Post Job Form
        jobPattern: 'hybrid',              // 1. แบบงาน (office/remote/hybrid/onsite)
        jobPosition: 'developer',          // 2. ตำแหน่ง (developer/designer/marketing/sales/engineer/accountant/hr/other)
        jobTitle: 'Senior Frontend Developer - React.js Expert',  // 3. ชื่อประกาศ
        limitDuration: 'no',               // 4. ตำแหน่งจำกัดงวน (yes/no)
        specialPosition: true,             // 5. ตำแหน่งจำกัดงานพิเศษ (boolean)
        jobType: 'fulltime',               // 6. ประเภทงาน (fulltime/parttime/freelance/temporary)
        quantity: '2',                     // 7. จำนวน (1/2/3/4/5/10/20)
        gender: 'any',                     // 8. เพศ (any/male/female)
        age: '25-35',                      // 9. อายุ (any/18-25/25-35/35-45/45+)
        salaryType: 'negotiable',          // 10. ประเภทเงินเดือน (no/notspecified/negotiable)
        education: 'bachelor',             // 11. การศึกษา (high-school/vocational/bachelor/master/doctorate)
        experience: '5',                   // 12. ประสบการณ์ (0/1/2/3/5/10)
        currentEmployment: 'any',          // 13. ที่พักจ้างปัจจุบัน (any/no)
        multiplePositions: 'any',          // 14. ที่พักจ้างหลายหัวที่ (any/no)
        jobDescription: 'เรากำลังมองหา Senior Frontend Developer ที่มีประสบการณ์ในการพัฒนา Web Application ด้วย React.js และ TypeScript มีความเข้าใจในการออกแบบ UI/UX ที่ดี และสามารถทำงานร่วมกับทีมได้อย่างมีประสิทธิภาพ', // 15. รายละเอียดงาน
        qualification: '- ปริญญาตรี สาขาวิทยาการคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง\n- มีประสบการณ์ 5 ปีขึ้นไป ในการพัฒนา Frontend\n- มีความชำนาญใน React.js, TypeScript, HTML5, CSS3\n- มีความรู้เรื่อง State Management (Redux, MobX)\n- สามารถใช้ Git ได้เป็นอย่างดี', // 16. คุณสมบัติผู้สมัครงาน
        welfare: '- เงินเดือนและโบนัสตามผลงาน\n- ประกันสังคมและประกันสุขภาพ\n- ทำงาน 5 วันต่อสัปดาห์\n- วันหยุดพักผ่อนประจำปี 10 วัน\n- ค่าอาหารกลางวัน\n- เงินช่วยเหลือค่าเดินทาง', // 17. สวัสดิการ
        salary: '50000+',                  // 18. เงินเดือน (0-10000/10000-20000/20000-30000/30000-40000/40000-50000/50000+)
        country: 'thailand',               // 19. ประเทศ (thailand/singapore/japan/usa)
        location: 'bangkok',               // 20. สถานที่ปฏิบัติงาน (bangkok/chiang-mai/phuket/etc.)
        
        // Display Fields (derived from main fields)
        salaryDisplay: '50,000 - 80,000 บาท',
        locationDisplay: 'กรุงเทพมหานคร',
        jobTypeDisplay: 'งานประจำ',
        jobPatternDisplay: 'Hybrid',
        
        // Meta Info
        postedDate: '2026-03-05',
        postedDateDisplay: '3 วันที่แล้ว',
        views: 320,
        applicants: 45,
        status: 'active',                  // active/closed/pending/draft
        statusText: 'เปิดรับสมัคร',
        statusClass: 'success'
    },
    {
        id: 2,
        companyId: 2,
        companyName: 'Creative Studio Co., Ltd.',
        companyLogo: 'https://ui-avatars.com/api/?name=CS&background=10b981&color=fff',
        
        jobPattern: 'office',
        jobPosition: 'designer',
        jobTitle: 'UX/UI Designer - Mobile App Specialist',
        limitDuration: 'no',
        specialPosition: false,
        jobType: 'fulltime',
        quantity: '1',
        gender: 'any',
        age: 'any',
        salaryType: 'notspecified',
        education: 'bachelor',
        experience: '3',
        currentEmployment: 'any',
        multiplePositions: 'any',
        jobDescription: 'ออกแบบ UI/UX สำหรับ Mobile Application และ Web Application โดยมุ่งเน้นความสวยงามและใช้งานง่าย มีความเข้าใจในหลักการ Design Thinking และ User-Centered Design',
        qualification: '- ปริญญาตรี สาขาออกแบบ หรือสาขาที่เกี่ยวข้อง\n- มีประสบการณ์ 3 ปีขึ้นไป ในการออกแบบ UI/UX\n- ชำนาญใช้ Figma, Adobe XD, Sketch\n- มี Portfolio ผลงานที่โดดเด่น\n- มีความคิดสร้างสรรค์และทันสมัย',
        welfare: '- เงินเดือนตามตกลง\n- ประกันสังคมและประกันชีวิต\n- โบนัสประจำปี\n- ทำงาน 5 วัน/สัปดาห์\n- สภาพแวดล้อมทำงานสร้างสรรค์',
        salary: '30000-40000',
        country: 'thailand',
        location: 'bangkok',
        
        salaryDisplay: '35,000 - 50,000 บาท',
        locationDisplay: 'กรุงเทพมหานคร',
        jobTypeDisplay: 'งานประจำ',
        jobPatternDisplay: 'Office',
        
        postedDate: '2026-03-03',
        postedDateDisplay: '5 วันที่แล้ว',
        views: 280,
        applicants: 32,
        status: 'active',
        statusText: 'เปิดรับสมัคร',
        statusClass: 'success'
    },
    {
        id: 3,
        companyId: 3,
        companyName: 'Digital Marketing Agency',
        companyLogo: 'https://ui-avatars.com/api/?name=DA&background=f59e0b&color=fff',
        
        jobPattern: 'remote',
        jobPosition: 'marketing',
        jobTitle: 'Digital Marketing Manager',
        limitDuration: 'yes',
        specialPosition: true,
        jobType: 'fulltime',
        quantity: '1',
        gender: 'any',
        age: '25-35',
        salaryType: 'negotiable',
        education: 'bachelor',
        experience: '5',
        currentEmployment: 'any',
        multiplePositions: 'no',
        jobDescription: 'วางแผนและดำเนินการ Digital Marketing Strategy ทั้งหมดของบริษัท รวมถึง SEO, SEM, Social Media Marketing, Content Marketing และ Email Marketing',
        qualification: '- ปริญญาตรี สาขาการตลาด หรือสาขาที่เกี่ยวข้อง\n- มีประสบการณ์ 5 ปีขึ้นไป ในงาน Digital Marketing\n- เข้าใจ Google Analytics, Google Ads, Facebook Ads\n- มีทักษะการวิเคราะห์ข้อมูลที่ดี\n- มีความคิดสร้างสรรค์และทันเทรนด์',
        welfare: '- เงินเดือนสูง + คอมมิชชั่น\n- ทำงานจากที่ไหนก็ได้ (Remote)\n- ประกันสุขภาพกลุ่ม\n- โบนัสตามผลงาน\n- อบรมและพัฒนาทักษะ',
        salary: '40000-50000',
        country: 'thailand',
        location: 'chiang-mai',
        
        salaryDisplay: '45,000 - 60,000 บาท',
        locationDisplay: 'เชียงใหม่',
        jobTypeDisplay: 'งานประจำ',
        jobPatternDisplay: 'Remote',
        
        postedDate: '2026-03-01',
        postedDateDisplay: '7 วันที่แล้ว',
        views: 195,
        applicants: 28,
        status: 'active',
        statusText: 'เปิดรับสมัคร',
        statusClass: 'success'
    },
    {
        id: 4,
        companyId: 4,
        companyName: 'Startup Hub Thailand',
        companyLogo: 'https://ui-avatars.com/api/?name=SH&background=ef4444&color=fff',
        
        jobPattern: 'hybrid',
        jobPosition: 'developer',
        jobTitle: 'Full Stack Developer (Node.js + React)',
        limitDuration: 'no',
        specialPosition: false,
        jobType: 'fulltime',
        quantity: '3',
        gender: 'any',
        age: 'any',
        salaryType: 'notspecified',
        education: 'bachelor',
        experience: '3',
        currentEmployment: 'any',
        multiplePositions: 'any',
        jobDescription: 'พัฒนา Web Application ทั้ง Frontend และ Backend โดยใช้ Node.js, React.js, และ MongoDB ร่วมงานกับทีมที่มีประสบการณ์และพัฒนาผลิตภัณฑ์ที่น่าสนใจ',
        qualification: '- ปริญญาตรี สาขาคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง\n- มีประสบการณ์ 3 ปีขึ้นไป\n- ชำนาญ Node.js, Express.js, React.js\n- เข้าใจ RESTful API และ Database (MongoDB, MySQL)\n- สามารถใช้ Git ได้เป็นอย่างดี',
        welfare: '- เงินเดือนตามประสบการณ์\n- ประกันสังคม\n- โบนัสประจำปี\n- ทำงาน Hybrid (3 วัน office, 2 วัน remote)\n- สภาพแวดล้อมทำงานแบบ Startup',
        salary: '40000-50000',
        country: 'thailand',
        location: 'bangkok',
        
        salaryDisplay: '40,000 - 70,000 บาท',
        locationDisplay: 'กรุงเทพมหานคร',
        jobTypeDisplay: 'งานประจำ',
        jobPatternDisplay: 'Hybrid',
        
        postedDate: '2026-02-28',
        postedDateDisplay: '10 วันที่แล้ว',
        views: 412,
        applicants: 58,
        status: 'active',
        statusText: 'เปิดรับสมัคร',
        statusClass: 'success'
    },
    {
        id: 5,
        companyId: 1,
        companyName: 'TechCorp Thailand Co., Ltd.',
        companyLogo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff',
        
        jobPattern: 'office',
        jobPosition: 'engineer',
        jobTitle: 'DevOps Engineer - Cloud Infrastructure',
        limitDuration: 'no',
        specialPosition: true,
        jobType: 'fulltime',
        quantity: '1',
        gender: 'any',
        age: '25-45',
        salaryType: 'negotiable',
        education: 'bachelor',
        experience: '5',
        currentEmployment: 'any',
        multiplePositions: 'any',
        jobDescription: 'จัดการและดูแล Cloud Infrastructure (AWS/Azure) ทำ CI/CD Pipeline, Automation, Monitoring และ Security สำหรับระบบของบริษัท',
        qualification: '- ปริญญาตรี สาขาวิศวกรรม หรือสาขาที่เกี่ยวข้อง\n- มีประสบการณ์ 5 ปีขึ้นไป ในงาน DevOps\n- ชำนาญ Docker, Kubernetes, Jenkins\n- มีประสบการณ์กับ AWS หรือ Azure\n- เข้าใจ Infrastructure as Code (Terraform)',
        welfare: '- เงินเดือนสูงตามความสามารถ\n- ประกันสุขภาพครอบครัว\n- โบนัสประจำปี 3-6 เดือน\n- ค่าเทรนนิ่งและ Certification\n- ทำงาน 5 วัน/สัปดาห์',
        salary: '50000+',
        country: 'thailand',
        location: 'bangkok',
        
        salaryDisplay: '60,000 - 90,000 บาท',
        locationDisplay: 'กรุงเทพมหานคร',
        jobTypeDisplay: 'งานประจำ',
        jobPatternDisplay: 'Office',
        
        postedDate: '2026-02-25',
        postedDateDisplay: '2 สัปดาห์ที่แล้ว',
        views: 256,
        applicants: 22,
        status: 'active',
        statusText: 'เปิดรับสมัคร',
        statusClass: 'success'
    },
    {
        id: 6,
        companyId: 5,
        companyName: 'Global Finance Corp',
        companyLogo: 'https://ui-avatars.com/api/?name=GF&background=8b5cf6&color=fff',
        
        jobPattern: 'office',
        jobPosition: 'accountant',
        jobTitle: 'Senior Accountant - Tax & Audit',
        limitDuration: 'no',
        specialPosition: false,
        jobType: 'fulltime',
        quantity: '2',
        gender: 'any',
        age: 'any',
        salaryType: 'notspecified',
        education: 'bachelor',
        experience: '3',
        currentEmployment: 'any',
        multiplePositions: 'any',
        jobDescription: 'ทำงานด้านบัญชีและการเงิน จัดทำงบการเงิน ภาษี และ Audit ให้กับบริษัทและลูกค้า',
        qualification: '- ปริญญาตรี สาขาบัญชี\n- มีใบอนุญาต CPA (พิจารณาพิเศษ)\n- มีประสบการณ์ 3-5 ปี\n- เข้าใจระบบ ERP และ Accounting Software\n- มีความละเอียดรอบคอบและความรับผิดชอบสูง',
        welfare: '- เงินเดือนและค่าคอมมิชชั่น\n- ประกันสังคมและประกันสุขภาพ\n- โบนัสประจำปี\n- ค่าเดินทาง\n- วันหยุดตามกฎหมาย',
        salary: '30000-40000',
        country: 'thailand',
        location: 'bangkok',
        
        salaryDisplay: '35,000 - 50,000 บาท',
        locationDisplay: 'กรุงเทพมหานคร',
        jobTypeDisplay: 'งานประจำ',
        jobPatternDisplay: 'Office',
        
        postedDate: '2026-02-20',
        postedDateDisplay: '3 สัปดาห์ที่แล้ว',
        views: 189,
        applicants: 35,
        status: 'closed',
        statusText: 'ปิดรับสมัครแล้ว',
        statusClass: 'danger'
    },
    {
        id: 7,
        companyId: 6,
        companyName: 'HR Solutions Thailand',
        companyLogo: 'https://ui-avatars.com/api/?name=HR&background=ec4899&color=fff',
        
        jobPattern: 'hybrid',
        jobPosition: 'hr',
        jobTitle: 'HR Manager - Talent Acquisition',
        limitDuration: 'no',
        specialPosition: false,
        jobType: 'fulltime',
        quantity: '1',
        gender: 'any',
        age: '30-45',
        salaryType: 'negotiable',
        education: 'bachelor',
        experience: '5',
        currentEmployment: 'any',
        multiplePositions: 'any',
        jobDescription: 'วางแผนและดำเนินการสรรหาพนักงานทุกตำแหน่ง จัดการกระบวนการสัมภาษณ์ Onboarding และ Employee Engagement',
        qualification: '- ปริญญาตรี สาขาทรัพยากรบุคคล หรือสาขาที่เกี่ยวข้อง\n- มีประสบการณ์ 5 ปีขึ้นไป ในงาน HR/Recruitment\n- มีทักษะการสื่อสารและการนำเสนอที่ดี\n- เข้าใจกฎหมายแรงงาน\n- มีความเป็นมืออาชีพและกระตือรือร้น',
        welfare: '- เงินเดือนสูงตามประสบการณ์\n- ประกันสุขภาพกลุ่ม\n- โบนัสตามผลงาน\n- ทำงาน Hybrid\n- โอกาสเติบโตในสายงาน',
        salary: '40000-50000',
        country: 'thailand',
        location: 'bangkok',
        
        salaryDisplay: '45,000 - 65,000 บาท',
        locationDisplay: 'กรุงเทพมหานคร',
        jobTypeDisplay: 'งานประจำ',
        jobPatternDisplay: 'Hybrid',
        
        postedDate: '2026-03-04',
        postedDateDisplay: '4 วันที่แล้ว',
        views: 234,
        applicants: 19,
        status: 'active',
        statusText: 'เปิดรับสมัคร',
        statusClass: 'success'
    },
    {
        id: 8,
        companyId: 3,
        companyName: 'Digital Marketing Agency',
        companyLogo: 'https://ui-avatars.com/api/?name=DA&background=f59e0b&color=fff',
        
        jobPattern: 'remote',
        jobPosition: 'other',
        jobTitle: 'Content Writer & Social Media Manager',
        limitDuration: 'no',
        specialPosition: false,
        jobType: 'parttime',
        quantity: '2',
        gender: 'any',
        age: '22-35',
        salaryType: 'notspecified',
        education: 'bachelor',
        experience: '2',
        currentEmployment: 'any',
        multiplePositions: 'any',
        jobDescription: 'เขียน Content สำหรับ Website, Blog และ Social Media จัดการ Social Media ของลูกค้า สร้าง Engagement และวิเคราะห์ผลลัพธ์',
        qualification: '- ปริญญาตรี สาขานิเทศศาสตร์ หรือสาขาที่เกี่ยวข้อง\n- มีประสบการณ์ 2 ปีขึ้นไป\n- เขียนภาษาไทยและภาษาอังกฤษได้ดี\n- มีความคิดสร้างสรรค์และทันเทรนด์\n- มีทักษะการใช้ Canva หรือ Adobe',
        welfare: '- ค่าตอบแทนรายเดือน\n- ทำงาน Part-time Remote\n- ยืดหยุ่นเวลาทำงาน\n- โอกาสเติบโตเป็น Full-time\n- สภาพแวดล้อมทำงานดี',
        salary: '20000-30000',
        country: 'thailand',
        location: 'chiang-mai',
        
        salaryDisplay: '20,000 - 30,000 บาท',
        locationDisplay: 'เชียงใหม่',
        jobTypeDisplay: 'งานพาร์ทไทม์',
        jobPatternDisplay: 'Remote',
        
        postedDate: '2026-03-02',
        postedDateDisplay: '6 วันที่แล้ว',
        views: 345,
        applicants: 67,
        status: 'active',
        statusText: 'เปิดรับสมัคร',
        statusClass: 'success'
    },
    {
        id: 9,
        companyId: 1,
        companyName: 'TechCorp Thailand Co., Ltd.',
        companyLogo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff',
        
        jobPattern: 'office',
        jobPosition: 'developer',
        jobTitle: 'Mobile Developer (iOS/Android)',
        limitDuration: 'no',
        specialPosition: true,
        jobType: 'fulltime',
        quantity: '2',
        gender: 'any',
        age: 'any',
        salaryType: 'negotiable',
        education: 'bachelor',
        experience: '3',
        currentEmployment: 'any',
        multiplePositions: 'any',
        jobDescription: 'พัฒนา Mobile Application สำหรับ iOS และ Android โดยใช้ React Native หรือ Flutter ร่วมงานกับทีม Design และ Backend',
        qualification: '- ปริญญาตรี สาขาคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง\n- มีประสบการณ์ 3 ปีขึ้นไป\n- ชำนาญ React Native หรือ Flutter\n- เข้าใจ iOS/Android Development\n- มี Portfolio แอพที่เผยแพร่แล้ว',
        welfare: '- เงินเดือนตามความสามารถ\n- ประกันสุขภาพครอบครัว\n- โบนัสประจำปี\n- ค่าโทรศัพท์\n- MacBook หรือ Laptop สเปคสูง',
        salary: '40000-50000',
        country: 'thailand',
        location: 'bangkok',
        
        salaryDisplay: '45,000 - 70,000 บาท',
        locationDisplay: 'กรุงเทพมหานคร',
        jobTypeDisplay: 'งานประจำ',
        jobPatternDisplay: 'Office',
        
        postedDate: '2026-02-26',
        postedDateDisplay: '12 วันที่แล้ว',
        views: 298,
        applicants: 41,
        status: 'pending',
        statusText: 'รออนุมัติ',
        statusClass: 'warning'
    },
    {
        id: 10,
        companyId: 7,
        companyName: 'E-Commerce Solutions',
        companyLogo: 'https://ui-avatars.com/api/?name=EC&background=14b8a6&color=fff',
        
        jobPattern: 'remote',
        jobPosition: 'sales',
        jobTitle: 'Sales Executive - B2B Solutions',
        limitDuration: 'yes',
        specialPosition: false,
        jobType: 'fulltime',
        quantity: '5',
        gender: 'any',
        age: '23-40',
        salaryType: 'negotiable',
        education: 'bachelor',
        experience: '2',
        currentEmployment: 'any',
        multiplePositions: 'any',
        jobDescription: 'ขายโซลูชัน E-Commerce ให้กับธุรกิจ B2B ค้นหาลูกค้าใหม่ นำเสนอผลิตภัณฑ์ และปิดการขาย รายได้ดีมีคอมมิชชั่น',
        qualification: '- ปริญญาตรี ทุกสาขา\n- มีประสบการณ์ขาย 2 ปีขึ้นไป (B2B จะพิจารณาพิเศษ)\n- มีทักษะการนำเสนอและการสื่อสารที่ดี\n- มีรถยนต์และใบขับขี่\n- มีใจรักงานขายและชอบความท้าทาย',
        welfare: '- เงินเดือนฐาน + คอมมิชชั่นสูง\n- ทำงาน Remote/ออกพบลูกค้า\n- ประกันสังคม\n- โบนัสตามยอดขาย\n- ค่าน้ำมันและค่าเดินทาง',
        salary: '20000-30000',
        country: 'thailand',
        location: 'bangkok',
        
        salaryDisplay: '25,000 - 40,000 บาท + คอมมิชชั่น',
        locationDisplay: 'กรุงเทพมหานคร',
        jobTypeDisplay: 'งานประจำ',
        jobPatternDisplay: 'Remote',
        
        postedDate: '2026-03-06',
        postedDateDisplay: '2 วันที่แล้ว',
        views: 445,
        applicants: 89,
        status: 'active',
        statusText: 'เปิดรับสมัคร',
        statusClass: 'success'
    }
];

// Helper Functions
function getJobById(id) {
    return MOCK_JOBS.find(job => job.id === parseInt(id));
}

function getJobsByCompany(companyId) {
    return MOCK_JOBS.filter(job => job.companyId === parseInt(companyId));
}

function getJobsByStatus(status) {
    return MOCK_JOBS.filter(job => job.status === status);
}

function getActiveJobs() {
    return MOCK_JOBS.filter(job => job.status === 'active');
}

function getJobsByPosition(position) {
    return MOCK_JOBS.filter(job => job.jobPosition === position);
}

function getJobsByLocation(location) {
    return MOCK_JOBS.filter(job => job.location === location);
}

// Display Mapping Functions
function getJobTypeDisplay(jobType) {
    const mapping = {
        'fulltime': 'งานประจำ',
        'parttime': 'งานพาร์ทไทม์',
        'freelance': 'ฟรีแลนซ์',
        'temporary': 'ร่วมงานชั่วคราวและเป็นทีม'
    };
    return mapping[jobType] || jobType;
}

function getJobPatternDisplay(jobPattern) {
    const mapping = {
        'office': 'Office',
        'remote': 'Remote',
        'hybrid': 'Hybrid',
        'onsite': 'Onsite'
    };
    return mapping[jobPattern] || jobPattern;
}

function getJobPositionDisplay(jobPosition) {
    const mapping = {
        // Original positions
        'developer': 'นักพัฒนาซอฟต์แวร์',
        'designer': 'นักออกแบบ',
        'marketing': 'นักการตลาด',
        'sales': 'พนักงานขาย',
        'engineer': 'วิศวกร',
        'accountant': 'นักบัญชี',
        'hr': 'ฝ่ายทรัพยากรบุคคล',
        'other': 'อื่นๆ',
        
        // Hotel Department Positions
        'front-office': 'งานแผนกต้อนรับ (Front Office)',
        'housekeeping': 'งานแผนกแม่บ้าน (Housekeeping)',
        'engineering': 'งานแผนกวิศวกรรม (Engineering)',
        'food-beverage': 'งานแผนกอาหารและเครื่องดื่ม (Food & Beverage)',
        'culinary': 'งานแผนกครัว (Culinary/Kitchen)',
        'human-resources': 'งานแผนกทรัพยากรบุคคล (Human Resources)',
        'sales-marketing': 'งานแผนกขายและการตลาด (Sales & Marketing)',
        'revenue-reservation': 'งานแผนกรายได้และรับจองห้องพัก (Revenue & Reservation)',
        'finance-accounting': 'งานแผนกบัญชีและการเงิน (Finance & Accounting)',
        'hotel-management': 'งานระดับผู้จัดการและผู้บริหาร (Hotel Management)'
    };
    return mapping[jobPosition] || jobPosition;
}

function getLocationDisplay(location) {
    const mapping = {
        'bangkok': 'กรุงเทพมหานคร',
        'chiang-mai': 'เชียงใหม่',
        'phuket': 'ภูเก็ต',
        'chonburi': 'ชลบุรี',
        'nonthaburi': 'นนทบุรี',
        'pathum-thani': 'ปทุมธานี',
        'samut-prakan': 'สมุทรปราการ'
    };
    return mapping[location] || location;
}

function getEducationDisplay(education) {
    const mapping = {
        'high-school': 'มัธยมศึกษา',
        'vocational': 'ปวช./ปวส.',
        'bachelor': 'ปริญญาตรี',
        'master': 'ปริญญาโท',
        'doctorate': 'ปริญญาเอก'
    };
    return mapping[education] || education;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MOCK_JOBS,
        getJobById,
        getJobsByCompany,
        getJobsByStatus,
        getActiveJobs,
        getJobsByPosition,
        getJobsByLocation,
        getJobTypeDisplay,
        getJobPatternDisplay,
        getJobPositionDisplay,
        getLocationDisplay,
        getEducationDisplay
    };
}