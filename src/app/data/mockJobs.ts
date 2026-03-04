export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  category: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  employerId: string;
  employerName: string;
  postedDate: string;
  expiryDate: string;
  status: 'active' | 'closed' | 'draft';
  applicantsCount: number;
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Startup Co.",
    companyLogo: "https://source.unsplash.com/100x100/?tech,company",
    location: "Bangkok, Thailand",
    type: "full-time",
    category: "Technology",
    salary: "40,000 - 60,000 บาท",
    description: "เราต้องการ Frontend Developer ที่มีความสามารถและหลงใหล่ในการสร้าง UI/UX ที่ยอดเยี่ยม คุณจะได้ทำงานกับทีมที่มีความคิดสร้างสรรค์และใช้เทคโนโลยีล่าสุดในการพัฒนาผลิตภัณฑ์",
    requirements: [
      "มีประสบการณ์ในการพัฒนา Web Application ด้วย React.js อย่างน้อย 2 ปี",
      "มีความรู้เกี่ยวกับ TypeScript และ JavaScript ES6+",
      "มีประสบการณ์ในการใช้ Tailwind CSS หรือ CSS Framework อื่นๆ",
      "เข้าใจหลักการทำงานของ RESTful API และการ integrate กับ Backend",
      "มีทักษะในการแก้ปัญหาและทำงานเป็นทีมได้ดี"
    ],
    benefits: [
      "ประกันสุขภาพ",
      "โบนัสประจำปี",
      "Work from Home",
      "อุปกรณ์ทำงานครบ",
      "ฝึกอบรมและพัฒนาทักษะ"
    ],
    employerId: "emp1",
    employerName: "Tech Startup Co.",
    postedDate: "2026-03-01",
    expiryDate: "2026-04-01",
    status: "active",
    applicantsCount: 15
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Creative Agency",
    companyLogo: "https://source.unsplash.com/100x100/?design,creative",
    location: "Remote",
    type: "full-time",
    category: "Design",
    salary: "35,000 - 50,000 บาท",
    description: "ต้องการ Designer ที่สามารถสร้างประสบการณ์ผู้ใช้ที่น่าประทับใจ มีความคิดสร้างสรรค์ และทำงานร่วมกับทีม Product อย่างใกล้ชิด",
    requirements: [
      "มีประสบการณ์ด้าน UX/UI Design อย่างน้อย 2 ปี",
      "ชำนาญการใช้ Figma, Adobe XD หรือเครื่องมือ Design อื่นๆ",
      "มีความเข้าใจในหลักการ User Research และ Usability Testing",
      "สามารถสร้าง Prototype และ Wireframe ได้",
      "มี Portfolio ที่แสดงผลงาน"
    ],
    benefits: [
      "ทำงานที่ไหนก็ได้",
      "ค่าอุปกรณ์",
      "ฝึกอบรม",
      "โบนัสตามผลงาน"
    ],
    employerId: "emp2",
    employerName: "Creative Agency",
    postedDate: "2026-03-02",
    expiryDate: "2026-04-02",
    status: "active",
    applicantsCount: 8
  },
  {
    id: "3",
    title: "Marketing Manager",
    company: "E-commerce Giant",
    companyLogo: "https://source.unsplash.com/100x100/?ecommerce,business",
    location: "Chiang Mai, Thailand",
    type: "full-time",
    category: "Marketing",
    salary: "50,000 - 80,000 บาท",
    description: "หา Marketing Manager ที่มีประสบการณ์ในด้าน Digital Marketing เพื่อวางกลยุทธ์และดูแล Campaign ต่างๆ ของบริษัท",
    requirements: [
      "มีประสบการณ์ด้าน Digital Marketing อย่างน้อย 3 ปี",
      "มีความรู้เกี่ยวกับ SEO, SEM, Social Media Marketing",
      "สามารถวิเคราะห์ข้อมูลและทำ Report ได้",
      "มีทักษะในการบริหารทีม",
      "สามารถใช้เครื่องมือ Analytics ต่างๆ ได้"
    ],
    benefits: [
      "ประกันสุขภาพครอบครัว",
      "โบนัสตามผลงาน",
      "ส่วนลดสินค้า",
      "ลาพักร้อน 15 วัน"
    ],
    employerId: "emp3",
    employerName: "E-commerce Giant",
    postedDate: "2026-03-03",
    expiryDate: "2026-04-03",
    status: "active",
    applicantsCount: 23
  },
  {
    id: "4",
    title: "Backend Developer (Node.js)",
    company: "FinTech Solutions",
    companyLogo: "https://source.unsplash.com/100x100/?fintech,technology",
    location: "Bangkok, Thailand",
    type: "full-time",
    category: "Technology",
    salary: "50,000 - 80,000 บาท",
    description: "เราต้องการ Backend Developer ที่มีประสบการณ์ในการพัฒนา API และระบบ Backend ด้วย Node.js สำหรับแพลตฟอร์มทางการเงิน",
    requirements: [
      "มีประสบการณ์พัฒนา Backend ด้วย Node.js อย่างน้อย 3 ปี",
      "มีความรู้เกี่ยวกับ Express.js, NestJS หรือ Framework อื่นๆ",
      "มีประสบการณ์ทำงานกับ Database (MongoDB, PostgreSQL, MySQL)",
      "เข้าใจหลักการ Security และ Authentication",
      "มีความรู้เกี่ยวกับ Microservices และ Cloud Platform"
    ],
    benefits: [
      "ประกันสุขภาพพรีเมียม",
      "โบนัส 4-6 เดือน",
      "กองทุนสำรองเลี้ยงชีพ",
      "ค่าเดินทาง"
    ],
    employerId: "emp4",
    employerName: "FinTech Solutions",
    postedDate: "2026-02-28",
    expiryDate: "2026-03-30",
    status: "active",
    applicantsCount: 32
  },
  {
    id: "5",
    title: "Data Analyst",
    company: "Data Analytics Co.",
    companyLogo: "https://source.unsplash.com/100x100/?data,analytics",
    location: "Remote",
    type: "full-time",
    category: "Technology",
    salary: "45,000 - 65,000 บาท",
    description: "ต้องการ Data Analyst ที่สามารถวิเคราะห์ข้อมูลและนำเสนอ Insights ที่มีคุณค่าต่อธุรกิจ",
    requirements: [
      "มีประสบการณ์ด้าน Data Analysis อย่างน้อย 2 ปี",
      "ชำนาญ SQL และเครื่องมือ BI เช่น Tableau, Power BI",
      "มีความรู้เกี่ยวกับ Python หรือ R สำหรับการวิเคราะห์ข้อมูล",
      "สามารถทำ Data Visualization ได้",
      "มีทักษะในการนำเสนอข้อมูลและสื่อสาร"
    ],
    benefits: [
      "Work from Anywhere",
      "ฝึกอบรมต่อเนื่อง",
      "ประกันสุขภาพ",
      "โบนัสประจำปี"
    ],
    employerId: "emp5",
    employerName: "Data Analytics Co.",
    postedDate: "2026-02-27",
    expiryDate: "2026-03-29",
    status: "active",
    applicantsCount: 18
  },
  {
    id: "6",
    title: "Product Manager",
    company: "SaaS Company",
    companyLogo: "https://source.unsplash.com/100x100/?saas,product",
    location: "Bangkok, Thailand",
    type: "full-time",
    category: "Operations",
    salary: "60,000 - 90,000 บาท",
    description: "หา Product Manager ที่มีประสบการณ์ในการพัฒนาและบริหารจัดการผลิตภัณฑ์ SaaS",
    requirements: [
      "มีประสบการณ์ด้าน Product Management อย่างน้อย 3 ปี",
      "เข้าใจ Product Development Lifecycle",
      "สามารถทำ Market Research และ Competitor Analysis",
      "มีทักษะในการทำ Roadmap และ Prioritization",
      "มีประสบการณ์ทำงานกับทีม Engineering และ Design"
    ],
    benefits: [
      "ประกันสุขภาพ + OPD",
      "โบนัสตามผลงาน",
      "Stock Options",
      "Flexible Working Hours"
    ],
    employerId: "emp6",
    employerName: "SaaS Company",
    postedDate: "2026-02-26",
    expiryDate: "2026-03-28",
    status: "active",
    applicantsCount: 12
  }
];
