// Resume Detail Page - Load and Display Resume Information
$(document).ready(function() {
    loadResumeDetail();
});

function loadResumeDetail() {
    // Get resume ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('id');
    
    if (!resumeId) {
        showNotification('ไม่พบข้อมูล Resume', 'error');
        setTimeout(() => {
            window.location.href = 'dashboard.html?view=search-resume';
        }, 2000);
        return;
    }
    
    // Mock resume data
    const resumeData = getResumeData(resumeId);
    
    if (!resumeData) {
        showNotification('ไม่พบข้อมูล Resume', 'error');
        setTimeout(() => {
            window.location.href = 'dashboard.html?view=search-resume';
        }, 2000);
        return;
    }
    
    // Populate resume data
    populateResumeData(resumeData);
}

function getResumeData(id) {
    const resumes = {
        '1': {
            id: 1,
            name: 'สมชาย ใจดี',
            position: 'Senior Frontend Developer',
            photo: 'https://ui-avatars.com/api/?name=สมชาย+ใจดี&size=200&background=6366f1&color=fff&bold=true',
            email: 'somchai.jaidee@email.com',
            phone: '081-234-5678',
            location: 'กรุงเทพฯ',
            experience: '5 ปี',
            salary: '60,000 - 80,000 บาท',
            linkedin: 'https://linkedin.com/in/somchai-jaidee',
            updateDate: '5 มีนาคม 2026',
            summary: 'Frontend Developer ที่มีประสบการณ์มากกว่า 5 ปีในการพัฒนา Web Applications โดยเชี่ยวชาญด้าน React.js, Vue.js และ TypeScript มีความสามารถในการออกแบบ UI/UX ที่ตอบสนองต่อผู้ใช้งาน และมีประสบการณ์ในการทำงานร่วมกับทีมขนาดใหญ่ในองค์กรระดับสากล',
            skills: ['React.js', 'Vue.js', 'TypeScript', 'Node.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'REST API', 'GraphQL', 'Redux'],
            experiences: [
                {
                    position: 'Senior Frontend Developer',
                    company: 'Tech Giant Co., Ltd.',
                    period: '2021 - ปัจจุบัน',
                    description: 'พัฒนาและดูแล Web Applications ขนาดใหญ่ด้วย React.js และ TypeScript, ทำงานร่วมกับทีม UX/UI ในการออกแบบและพัฒนา Features ใหม่ๆ, ปรับปรุง Performance ของเว็บไซต์ให้เร็วขึ้น 40%'
                },
                {
                    position: 'Frontend Developer',
                    company: 'StartUp Innovation',
                    period: '2019 - 2021',
                    description: 'พัฒนา SaaS Platform ด้วย Vue.js, ทำงานร่วมกับ Backend Team ในการ Integrate APIs, สร้าง Reusable Components สำหรับใช้ทั่วทั้ง Platform'
                },
                {
                    position: 'Junior Frontend Developer',
                    company: 'Digital Agency Plus',
                    period: '2018 - 2019',
                    description: 'พัฒนาเว็บไซต์สำหรับลูกค้าต่างๆ ด้วย HTML, CSS, JavaScript และ jQuery, เรียนรู้ Best Practices ในการพัฒนา Web Applications'
                }
            ],
            education: [
                {
                    degree: 'ปริญญาตรี วิทยาศาสตรบัณฑิต',
                    major: 'วิทยาการคอมพิวเตอร์',
                    university: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี',
                    year: '2014 - 2018',
                    gpa: '3.45'
                }
            ],
            languages: [
                { language: 'ไทย', level: 'เจ้าของภาษา' },
                { language: 'อังกฤษ', level: 'ดีมาก (TOEIC 850)' },
                { language: 'ญี่ปุ่น', level: 'พื้นฐาน (JLPT N4)' }
            ],
            certifications: [
                { name: 'AWS Certified Developer - Associate', year: '2023' },
                { name: 'React Advanced Certification', year: '2022' },
                { name: 'Professional Scrum Master I (PSM I)', year: '2021' }
            ],
            portfolio: [
                { name: 'E-commerce Platform', url: 'https://github.com/somchai/ecommerce', description: 'Full-stack E-commerce platform built with React, Node.js, and MongoDB' },
                { name: 'Dashboard Analytics', url: 'https://github.com/somchai/dashboard', description: 'Real-time analytics dashboard using React and D3.js' },
                { name: 'Personal Website', url: 'https://somchai.dev', description: 'Personal portfolio website showcasing projects and blog posts' }
            ],
            viewCount: 127,
            downloadCount: 23,
            availability: 'available'
        },
        '2': {
            id: 2,
            name: 'สมหญิง รักดี',
            position: 'UX/UI Designer',
            photo: 'https://ui-avatars.com/api/?name=สมหญิง+รักดี&size=200&background=10b981&color=fff&bold=true',
            email: 'somying.rakdee@email.com',
            phone: '082-345-6789',
            location: 'เชียงใหม่',
            experience: '3 ปี',
            salary: '40,000 - 55,000 บาท',
            linkedin: 'https://linkedin.com/in/somying-rakdee',
            updateDate: '5 มีนาคม 2026',
            summary: 'UX/UI Designer ที่มีความหลงใหลในการสร้างประสบการณ์ที่ดีให้กับผู้ใช้งาน มีประสบการณ์ในการออกแบบ Mobile Apps และ Web Applications โดยใช้เครื่องมืออย่าง Figma, Adobe XD และ Sketch มีความเข้าใจในหลักการ Design Thinking และ User-Centered Design',
            skills: ['Figma', 'Adobe XD', 'Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Prototyping', 'Wireframing', 'User Research', 'Usability Testing', 'Design System'],
            experiences: [
                {
                    position: 'UX/UI Designer',
                    company: 'Digital Creative Studio',
                    period: '2022 - ปัจจุบัน',
                    description: 'ออกแบบ UI/UX สำหรับ Mobile Apps และ Websites, ทำ User Research และ Usability Testing, สร้าง Design System สำหรับองค์กร'
                },
                {
                    position: 'Junior UX/UI Designer',
                    company: 'App Development Co.',
                    period: '2021 - 2022',
                    description: 'ช่วยออกแบบ Mobile Applications, สร้าง Wireframes และ Prototypes, ทำงานร่วมกับ Developers ในการ Implement Designs'
                }
            ],
            education: [
                {
                    degree: 'ปริญญาตรี ศิลปบัณฑิต',
                    major: 'ออกแบบนิเทศศิลป์',
                    university: 'มหาวิทยาลัยศิลปากร',
                    year: '2017 - 2021',
                    gpa: '3.68'
                }
            ],
            languages: [
                { language: 'ไทย', level: 'เจ้าของภาษา' },
                { language: 'อังกฤษ', level: 'ดี (IELTS 6.5)' }
            ],
            certifications: [
                { name: 'Google UX Design Professional Certificate', year: '2023' },
                { name: 'Interaction Design Foundation - UX Design', year: '2022' }
            ],
            portfolio: [
                { name: 'Banking App Redesign', url: 'https://behance.net/somying/banking-app', description: 'Complete redesign of a banking mobile application' },
                { name: 'E-learning Platform', url: 'https://behance.net/somying/elearning', description: 'UX/UI design for online learning platform' },
                { name: 'Food Delivery App', url: 'https://behance.net/somying/food-app', description: 'Mobile app design for food delivery service' }
            ],
            viewCount: 89,
            downloadCount: 15,
            availability: 'available'
        },
        '3': {
            id: 3,
            name: 'ธนา ทำดี',
            position: 'Marketing Manager',
            photo: 'https://ui-avatars.com/api/?name=ธนา+ทำดี&size=200&background=f59e0b&color=fff&bold=true',
            email: 'thana.tamdee@email.com',
            phone: '083-456-7890',
            location: 'กรุงเทพฯ',
            experience: '4 ปี',
            salary: '50,000 - 70,000 บาท',
            linkedin: 'https://linkedin.com/in/thana-tamdee',
            updateDate: '4 มีนาคม 2026',
            summary: 'Marketing Manager ที่มีประสบการณ์ด้าน Digital Marketing และ Brand Management มีความเชี่ยวชาญในการวางกลยุทธ์การตลาด, SEO/SEM, Social Media Marketing และ Content Marketing มีผลงานที่ประสบความสำเร็จในการเพิ่มยอดขายและสร้าง Brand Awareness',
            skills: ['Digital Marketing', 'SEO', 'SEM', 'Google Analytics', 'Facebook Ads', 'Google Ads', 'Content Marketing', 'Social Media Marketing', 'Email Marketing', 'Marketing Strategy'],
            experiences: [
                {
                    position: 'Marketing Manager',
                    company: 'E-commerce Leader Co.',
                    period: '2023 - ปัจจุบัน',
                    description: 'วางกลยุทธ์การตลาดออนไลน์, บริหารทีม Marketing 5 คน, เพิ่มยอดขายผ่าน Online Channels 150% ในปีแรก'
                },
                {
                    position: 'Digital Marketing Specialist',
                    company: 'Retail Chain Group',
                    period: '2021 - 2023',
                    description: 'ทำ SEO/SEM Campaigns, จัดการ Social Media Ads, วิเคราะห์ข้อมูลและปรับปรุงกลยุทธ์การตลาด'
                }
            ],
            education: [
                {
                    degree: 'ปริญญาตรี บริหารธุรกิจบัณฑิต',
                    major: 'การตลาด',
                    university: 'จุฬาลงกรณ์มหาวิทยาลัย',
                    year: '2016 - 2020',
                    gpa: '3.52'
                }
            ],
            languages: [
                { language: 'ไทย', level: 'เจ้าของภาษา' },
                { language: 'อังกฤษ', level: 'ดีมาก (TOEIC 900)' }
            ],
            certifications: [
                { name: 'Google Ads Certification', year: '2023' },
                { name: 'Facebook Blueprint Certification', year: '2023' },
                { name: 'Google Analytics Individual Qualification', year: '2022' }
            ],
            portfolio: [
                { name: 'Campaign Case Study: Summer Sale 2023', url: '#', description: 'Increased sales by 200% during summer campaign period' },
                { name: 'Brand Relaunch Strategy', url: '#', description: 'Successfully relaunched brand with 50% increase in brand awareness' }
            ],
            viewCount: 64,
            downloadCount: 11,
            availability: 'available'
        },
        '4': {
            id: 4,
            name: 'จิราพร สวยงาม',
            position: 'Backend Developer',
            photo: 'https://ui-avatars.com/api/?name=จิราพร+สวยงาม&size=200&background=ec4899&color=fff&bold=true',
            email: 'jiraporn.suayngam@email.com',
            phone: '084-567-8901',
            location: 'กรุงเทพฯ',
            experience: '6 ปี',
            salary: '70,000 - 90,000 บาท',
            linkedin: 'https://linkedin.com/in/jiraporn-suayngam',
            updateDate: '3 มีนาคม 2026',
            summary: 'Backend Developer ที่มีประสบการณ์สูงในการพัฒนา Scalable Backend Systems และ RESTful APIs โดยใช้ Node.js, Python และ PostgreSQL มีความเชี่ยวชาญด้าน Microservices Architecture, Database Design และ Cloud Services (AWS, Google Cloud)',
            skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Express.js', 'Django', 'REST API', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'Microservices'],
            experiences: [
                {
                    position: 'Senior Backend Developer',
                    company: 'FinTech Solutions Ltd.',
                    period: '2022 - ปัจจุบัน',
                    description: 'พัฒนา Backend Systems สำหรับ Payment Platform, ออกแบบ Database Architecture, ปรับปรุง API Performance และ Scalability'
                },
                {
                    position: 'Backend Developer',
                    company: 'Cloud Tech Corp.',
                    period: '2019 - 2022',
                    description: 'พัฒนา Microservices บน Node.js และ Python, ทำงานกับ Docker และ Kubernetes, Integrate ระบบกับ Third-party APIs'
                }
            ],
            education: [
                {
                    degree: 'ปริญญาตรี วิศวกรรมศาสตรบัณฑิต',
                    major: 'วิศวกรรมคอมพิวเตอร์',
                    university: 'มหาวิทยาลัยเกษตรศาสตร์',
                    year: '2014 - 2018',
                    gpa: '3.71'
                }
            ],
            languages: [
                { language: 'ไทย', level: 'เจ้าของภาษา' },
                { language: 'อังกฤษ', level: 'ดีมาก (TOEIC 880)' }
            ],
            certifications: [
                { name: 'AWS Certified Solutions Architect', year: '2023' },
                { name: 'MongoDB Certified Developer', year: '2022' }
            ],
            portfolio: [
                { name: 'Payment Gateway System', url: 'https://github.com/jiraporn/payment-gateway', description: 'Scalable payment processing system handling 10k+ transactions/day' },
                { name: 'API Microservices', url: 'https://github.com/jiraporn/microservices-api', description: 'Microservices architecture with Docker and Kubernetes' }
            ],
            viewCount: 156,
            downloadCount: 34,
            availability: 'available'
        },
        '5': {
            id: 5,
            name: 'วิชัย กล้าหาญ',
            position: 'Data Analyst',
            photo: 'https://ui-avatars.com/api/?name=วิชัย+กล้าหาญ&size=200&background=06b6d4&color=fff&bold=true',
            email: 'wichai.klahan@email.com',
            phone: '085-678-9012',
            location: 'ภูเก็ต',
            experience: '2 ปี',
            salary: '35,000 - 50,000 บาท',
            linkedin: 'https://linkedin.com/in/wichai-klahan',
            updateDate: '3 มีนาคม 2026',
            summary: 'Data Analyst ที่มีความสนใจในการวิเคราะห์ข้อมูลและสร้าง Data Visualization มีความเชี่ยวชาญในการใช้ Python, SQL และ Tableau ในการวิเคราะห์ข้อมูลและสร้าง Dashboard เพื่อสนับสนุนการตัดสินใจทางธุรกิจ',
            skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Excel', 'Data Visualization', 'Statistical Analysis', 'Pandas', 'NumPy', 'Jupyter Notebook'],
            experiences: [
                {
                    position: 'Data Analyst',
                    company: 'Hospitality Group',
                    period: '2022 - ปัจจุบัน',
                    description: 'วิเคราะห์ข้อมูลลูกค้าและสร้าง Dashboard สำหรับ Management, ทำ A/B Testing และวิเคราะห์ผลลัพธ์, สร้าง Reports อัตโนมัติด้วย Python'
                }
            ],
            education: [
                {
                    degree: 'ปริญญาตรี วิทยาศาสตรบัณฑิต',
                    major: 'สถิติประยุกต์',
                    university: 'มหาวิทยาลัยสงขลานครินทร์',
                    year: '2018 - 2022',
                    gpa: '3.42'
                }
            ],
            languages: [
                { language: 'ไทย', level: 'เจ้าของภาษา' },
                { language: 'อังกฤษ', level: 'ดี (TOEIC 750)' }
            ],
            certifications: [
                { name: 'Google Data Analytics Professional Certificate', year: '2023' },
                { name: 'Tableau Desktop Specialist', year: '2022' }
            ],
            portfolio: [
                { name: 'Sales Dashboard', url: 'https://public.tableau.com/wichai/sales', description: 'Interactive sales dashboard with real-time data' },
                { name: 'Customer Analysis Project', url: 'https://github.com/wichai/customer-analysis', description: 'Python-based customer segmentation and analysis' }
            ],
            viewCount: 43,
            downloadCount: 8,
            availability: 'available'
        },
        '6': {
            id: 6,
            name: 'นภัสวรรณ รักเรียน',
            position: 'HR Manager',
            photo: 'https://ui-avatars.com/api/?name=นภัสวรรณ+รักเรียน&size=200&background=8b5cf6&color=fff&bold=true',
            email: 'napatsawan.rakrian@email.com',
            phone: '086-789-0123',
            location: 'กรุงเทพฯ',
            experience: '7 ปี',
            salary: '55,000 - 75,000 บาท',
            linkedin: 'https://linkedin.com/in/napatsawan-rakrian',
            updateDate: '2 มีนาคม 2026',
            summary: 'HR Manager ที่มีประสบการณ์สูงด้านการบริหารทรัพยากรบุคคล มีความเชี่ยวชาญในการ Recruitment, Training & Development, Performance Management และ Employee Relations มีความเข้าใจกฎหมายแรงงานเป็นอย่างดี',
            skills: ['Recruitment', 'HRIS', 'Labor Law', 'Performance Management', 'Training & Development', 'Employee Relations', 'Compensation & Benefits', 'Organizational Development'],
            experiences: [
                {
                    position: 'HR Manager',
                    company: 'Manufacturing Excellence Co.',
                    period: '2021 - ปัจจุบัน',
                    description: 'บริหารทีม HR 8 คน, พัฒนาระบบ Performance Management ใหม่, ลด Turnover Rate ลง 30%'
                },
                {
                    position: 'Senior HR Officer',
                    company: 'Retail Chain Group',
                    period: '2018 - 2021',
                    description: 'ดูแลการ Recruit พนักงานทุกระดับ, พัฒนา Training Programs, ดูแล Employee Relations'
                }
            ],
            education: [
                {
                    degree: 'ปริญญาโท บริหารธุรกิจมหาบัณฑิต',
                    major: 'การจัดการทรัพยากรมนุษย์',
                    university: 'มหาวิทยาลัยธรรมศาสตร์',
                    year: '2016 - 2018',
                    gpa: '3.85'
                }
            ],
            languages: [
                { language: 'ไทย', level: 'เจ้าของภาษา' },
                { language: 'อังกฤษ', level: 'ดีมาก (TOEIC 920)' }
            ],
            certifications: [
                { name: 'Professional in Human Resources (PHR)', year: '2023' },
                { name: 'SHRM Certified Professional (SHRM-CP)', year: '2022' }
            ],
            portfolio: [],
            viewCount: 78,
            downloadCount: 19,
            availability: 'available'
        },
        '7': {
            id: 7,
            name: 'สุรชัย แข็งแรง',
            position: 'DevOps Engineer',
            photo: 'https://ui-avatars.com/api/?name=สุรชัย+แข็งแรง&size=200&background=ef4444&color=fff&bold=true',
            email: 'surachai.kaengrang@email.com',
            phone: '087-890-1234',
            location: 'กรุงเทพฯ',
            experience: '4 ปี',
            salary: '65,000 - 85,000 บาท',
            linkedin: 'https://linkedin.com/in/surachai-kaengrang',
            updateDate: '2 มีนาคม 2026',
            summary: 'DevOps Engineer ที่มีประสบการณ์ในการ Setup และบริหารระบบ CI/CD, Container Orchestration และ Cloud Infrastructure มีความเชี่ยวชาญด้าน Docker, Kubernetes, AWS และ Automation Tools',
            skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'GitLab CI/CD', 'Terraform', 'Ansible', 'Linux', 'Shell Scripting', 'Monitoring', 'Prometheus', 'Grafana'],
            experiences: [
                {
                    position: 'DevOps Engineer',
                    company: 'Cloud Solutions Inc.',
                    period: '2021 - ปัจจุบัน',
                    description: 'Setup และดูแล Kubernetes Clusters, สร้าง CI/CD Pipelines, Automate Infrastructure ด้วย Terraform'
                },
                {
                    position: 'System Administrator',
                    company: 'IT Services Co.',
                    period: '2019 - 2021',
                    description: 'ดูแลระบบ Linux Servers, Setup Monitoring Systems, ทำ Backup และ Disaster Recovery Planning'
                }
            ],
            education: [
                {
                    degree: 'ปริญญาตรี วิศวกรรมศาสตรบัณฑิต',
                    major: 'วิศวกรรมคอมพิวเตอร์',
                    university: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ',
                    year: '2015 - 2019',
                    gpa: '3.35'
                }
            ],
            languages: [
                { language: 'ไทย', level: 'เจ้าของภาษา' },
                { language: 'อังกฤษ', level: 'ดี (TOEIC 780)' }
            ],
            certifications: [
                { name: 'AWS Certified DevOps Engineer', year: '2023' },
                { name: 'Certified Kubernetes Administrator (CKA)', year: '2022' }
            ],
            portfolio: [
                { name: 'Infrastructure as Code', url: 'https://github.com/surachai/terraform-aws', description: 'Terraform modules for AWS infrastructure' },
                { name: 'CI/CD Pipeline', url: 'https://github.com/surachai/cicd-pipeline', description: 'Automated CI/CD pipeline with Jenkins and Docker' }
            ],
            viewCount: 92,
            downloadCount: 21,
            availability: 'available'
        },
        '8': {
            id: 8,
            name: 'ปิยะนุช ใจเย็น',
            position: 'Content Writer',
            photo: 'https://ui-avatars.com/api/?name=ปิยะนุช+ใจเย็น&size=200&background=f97316&color=fff&bold=true',
            email: 'piyanuch.jaiyen@email.com',
            phone: '088-901-2345',
            location: 'เชียงใหม่',
            experience: '3 ปี',
            salary: '30,000 - 45,000 บาท',
            linkedin: 'https://linkedin.com/in/piyanuch-jaiyen',
            updateDate: '1 มีนาคม 2026',
            summary: 'Content Writer ที่มีความหลงใหลในการเขียน มีประสบการณ์ในการเขียน SEO Content, Blog Posts, Social Media Content และ Product Descriptions มีความสามารถในการวิจัย Keyword และเขียน Content ที่ Engage กับกลุ่มเป้าหมาย',
            skills: ['SEO Writing', 'Copywriting', 'Content Strategy', 'Blog Writing', 'Social Media Content', 'Proofreading', 'WordPress', 'Google Analytics'],
            experiences: [
                {
                    position: 'Content Writer',
                    company: 'Digital Marketing Agency',
                    period: '2022 - ปัจจุบัน',
                    description: 'เขียน Content สำหรับเว็บไซต์และ Social Media ของลูกค้า, ทำ Keyword Research และ SEO Optimization, เพิ่ม Organic Traffic 80%'
                },
                {
                    position: 'Junior Content Writer',
                    company: 'E-commerce Startup',
                    period: '2021 - 2022',
                    description: 'เขียน Product Descriptions และ Blog Posts, ช่วยวางแผน Content Calendar'
                }
            ],
            education: [
                {
                    degree: 'ปริญญาตรี ศิลปศาสตรบัณฑิต',
                    major: 'ภาษาอังกฤษ',
                    university: 'มหาวิทยาลัยเชียงใหม่',
                    year: '2017 - 2021',
                    gpa: '3.58'
                }
            ],
            languages: [
                { language: 'ไทย', level: 'เจ้าของภาษา' },
                { language: 'อังกฤษ', level: 'ดีมาก (IELTS 7.0)' }
            ],
            certifications: [
                { name: 'HubSpot Content Marketing Certification', year: '2023' },
                { name: 'Google Digital Marketing Certificate', year: '2022' }
            ],
            portfolio: [
                { name: 'Content Portfolio', url: 'https://medium.com/@piyanuch', description: 'Collection of published articles and blog posts' },
                { name: 'SEO Case Study', url: '#', description: 'Increased organic traffic by 200% in 6 months' }
            ],
            viewCount: 37,
            downloadCount: 7,
            availability: 'available'
        },
        '9': {
            id: 9,
            name: 'ธีรพงษ์ เจริญ',
            position: 'Mobile Developer',
            photo: 'https://ui-avatars.com/api/?name=ธีรพงษ์+เจริญ&size=200&background=14b8a6&color=fff&bold=true',
            email: 'teerapong.charoen@email.com',
            phone: '089-012-3456',
            location: 'กรุงเทพฯ',
            experience: '5 ปี',
            salary: '60,000 - 80,000 บาท',
            linkedin: 'https://linkedin.com/in/teerapong-charoen',
            updateDate: '1 มีนาคม 2026',
            summary: 'Mobile Developer ที่มีประสบการณ์ในการพัฒนา iOS และ Android Applications โดยใช้ React Native และ Flutter มีความเชี่ยวชาญในการทำ Cross-platform Development และ Native Mobile Development',
            skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS Development', 'Android Development', 'Firebase', 'REST API', 'Git', 'App Store Publishing'],
            experiences: [
                {
                    position: 'Senior Mobile Developer',
                    company: 'Mobile First Company',
                    period: '2022 - ปัจจุบัน',
                    description: 'พัฒนา Mobile Apps ด้วย React Native และ Flutter, Lead ทีม Mobile Developer 4 คน, Publish Apps ที่มี Downloads มากกว่า 500k'
                },
                {
                    position: 'Mobile Developer',
                    company: 'Tech Startup',
                    period: '2019 - 2022',
                    description: 'พัฒนา Native iOS และ Android Apps, Integrate APIs และ Push Notifications, Optimize App Performance'
                }
            ],
            education: [
                {
                    degree: 'ปริญญาตรี วิทยาศาสตรบัณฑิต',
                    major: 'วิทยาการคอมพิวเตอร์',
                    university: 'มหาวิทยาลัยมหิดล',
                    year: '2015 - 2019',
                    gpa: '3.62'
                }
            ],
            languages: [
                { language: 'ไทย', level: 'เจ้าของภาษา' },
                { language: 'อังกฤษ', level: 'ดีมาก (TOEIC 860)' }
            ],
            certifications: [
                { name: 'Google Associate Android Developer', year: '2023' },
                { name: 'Flutter Certified Developer', year: '2022' }
            ],
            portfolio: [
                { name: 'Shopping App', url: 'https://apps.apple.com/app/shopping', description: 'E-commerce mobile app with 100k+ downloads' },
                { name: 'Fitness Tracker', url: 'https://play.google.com/store/apps/fitness', description: 'Health and fitness tracking app built with Flutter' }
            ],
            viewCount: 112,
            downloadCount: 28,
            availability: 'available'
        }
    };
    
    return resumes[id];
}

function populateResumeData(data) {
    // Header
    $('#profilePhoto').attr('src', data.photo);
    $('#candidateName').text(data.name);
    $('#candidatePosition').text(data.position);
    $('#candidateLocation').text(data.location);
    $('#candidateExperience').text(data.experience);
    $('#updateDate').text(data.updateDate);
    $('#candidateEmail').text(data.email);
    $('#candidatePhone').text(data.phone);
    $('#candidateSalary').text(data.salary);
    $('#candidateLinkedin').attr('href', data.linkedin);
    
    // Summary
    $('#candidateSummary').text(data.summary);
    
    // Skills
    const skillsHtml = data.skills.map(skill => 
        `<span class="badge bg-primary px-3 py-2 me-2 mb-2" style="font-size: 0.9rem;">${skill}</span>`
    ).join('');
    $('#candidateSkills').html(skillsHtml);
    
    // Work Experiences
    const experiencesHtml = data.experiences.map((exp, index) => `
        <div class="mb-4 ${index !== data.experiences.length - 1 ? 'pb-4 border-bottom' : ''}">
            <h5 class="fw-bold mb-1">${exp.position}</h5>
            <h6 class="text-primary mb-2">${exp.company}</h6>
            <p class="text-muted mb-2"><i class="bi bi-calendar3 me-1"></i>${exp.period}</p>
            <p class="mb-0">${exp.description}</p>
        </div>
    `).join('');
    $('#candidateExperiences').html(experiencesHtml);
    
    // Education
    const educationHtml = data.education.map(edu => `
        <div class="mb-3">
            <h5 class="fw-bold mb-1">${edu.degree}</h5>
            <h6 class="text-primary mb-1">${edu.major}</h6>
            <p class="text-muted mb-1">${edu.university}</p>
            <p class="text-muted mb-0">
                <i class="bi bi-calendar3 me-1"></i>${edu.year} • 
                <i class="bi bi-star-fill text-warning me-1"></i>GPA: ${edu.gpa}
            </p>
        </div>
    `).join('');
    $('#candidateEducation').html(educationHtml);
    
    // Languages
    const languagesHtml = data.languages.map(lang => `
        <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
            <strong>${lang.language}</strong>
            <span class="badge bg-info">${lang.level}</span>
        </div>
    `).join('');
    $('#candidateLanguages').html(languagesHtml);
    
    // Certifications
    if (data.certifications && data.certifications.length > 0) {
        const certificationsHtml = data.certifications.map(cert => `
            <div class="d-flex align-items-start mb-3">
                <i class="bi bi-patch-check-fill text-success fs-5 me-2"></i>
                <div>
                    <strong class="d-block">${cert.name}</strong>
                    <small class="text-muted">${cert.year}</small>
                </div>
            </div>
        `).join('');
        $('#candidateCertifications').html(certificationsHtml);
    } else {
        $('#candidateCertifications').html('<p class="text-muted">ไม่มีข้อมูล</p>');
    }
    
    // Portfolio
    if (data.portfolio && data.portfolio.length > 0) {
        const portfolioHtml = data.portfolio.map(item => `
            <div class="mb-3 p-3 bg-light rounded">
                <h6 class="fw-bold mb-1">
                    <a href="${item.url}" target="_blank" class="text-decoration-none">
                        ${item.name} <i class="bi bi-box-arrow-up-right ms-1"></i>
                    </a>
                </h6>
                <p class="text-muted mb-0 small">${item.description}</p>
            </div>
        `).join('');
        $('#candidatePortfolio').html(portfolioHtml);
    } else {
        $('#candidatePortfolio').html('<p class="text-muted">ไม่มีข้อมูล</p>');
    }
    
    // Stats
    $('#viewCount').text(data.viewCount);
    $('#downloadCount').text(data.downloadCount);
    $('#lastUpdate').text(data.updateDate);
}

// Actions
function contactCandidate() {
    $('#contactModal').modal('show');
}

function downloadResume() {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('id');
    showNotification('กำลังดาวน์โหลด Resume...', 'info');
    
    // Simulate download
    setTimeout(() => {
        showNotification('ดาวน์โหลด Resume สำเร็จ', 'success');
        // In real application, trigger actual file download
        // window.open(`/api/resumes/${resumeId}/download`, '_blank');
    }, 1500);
}

function saveCandidate() {
    showNotification('บันทึกผู้สมัครเรียบร้อย', 'success');
}

function shareResume() {
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('candidateName').textContent,
            text: 'ดู Resume ของ ' + document.getElementById('candidateName').textContent,
            url: window.location.href
        }).then(() => {
            showNotification('แชร์สำเร็จ', 'success');
        }).catch(console.error);
    } else {
        // Fallback: Copy link
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('คัดลอกลิงก์แล้ว', 'success');
        });
    }
}

function sendContactMessage() {
    const subject = $('#subject').val();
    const message = $('#message').val();
    
    if (!subject || !message) {
        showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
    }
    
    showNotification('กำลังส่งข้อความ...', 'info');
    
    // Simulate sending message
    setTimeout(() => {
        showNotification('ส่งข้อความสำเร็จ', 'success');
        $('#contactModal').modal('hide');
        $('#contactForm')[0].reset();
    }, 1500);
}

// Notification function
function showNotification(message, type) {
    const bgClass = {
        'success': 'bg-success',
        'error': 'bg-danger',
        'warning': 'bg-warning',
        'info': 'bg-info'
    }[type] || 'bg-primary';
    
    const notification = $(`
        <div class="position-fixed top-0 end-0 p-3" style="z-index: 9999;">
            <div class="toast show ${bgClass} text-white" role="alert">
                <div class="toast-body">
                    <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
                    ${message}
                </div>
            </div>
        </div>
    `);
    
    $('body').append(notification);
    
    setTimeout(() => {
        notification.fadeOut(() => notification.remove());
    }, 3000);
}
