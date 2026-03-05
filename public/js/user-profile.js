// User Profile Page JavaScript
$(document).ready(function() {
    const currentLang = localStorage.getItem('language') || 'th';

    // Mock Data
    const profileData = {
        name: 'สมชาย ใจดี',
        nameEn: 'Somchai Jaidee',
        title: 'Full Stack Developer',
        location: 'กรุงเทพมหานคร, ประเทศไทย',
        locationEn: 'Bangkok, Thailand',
        email: 'somchai@example.com',
        phone: '08-1234-5678',
        about: 'นักพัฒนาเว็บที่มีประสบการณ์ 5 ปี เชี่ยวชาญด้าน React, Node.js และ MongoDB มีความหลงใหลในการสร้างประสบการณ์ผู้ใช้ที่ดีและพัฒนาโซลูชันที่มีประสิทธิภาพ',
        aboutEn: 'Web developer with 5 years of experience, specializing in React, Node.js, and MongoDB. Passionate about creating great user experiences and developing efficient solutions.',
        experiences: [
            {
                title: 'Senior Full Stack Developer',
                titleTh: 'นักพัฒนาเว็บฟูลสแตกอาวุโส',
                company: 'Tech Innovate Co.',
                companyTh: 'บริษัท เทค อินโนเวท จำกัด',
                period: '2023 - Present',
                periodTh: '2566 - ปัจจุบัน',
                description: 'Leading development of enterprise web applications using React and Node.js',
                descriptionTh: 'นำทีมพัฒนาเว็บแอปพลิเคชันองค์กรโดยใช้ React และ Node.js'
            },
            {
                title: 'Full Stack Developer',
                titleTh: 'นักพัฒนาเว็บฟูลสแตก',
                company: 'Digital Solutions',
                companyTh: 'ดิจิทัล โซลูชั่น',
                period: '2021 - 2023',
                periodTh: '2564 - 2566',
                description: 'Developed and maintained multiple web applications',
                descriptionTh: 'พัฒนาและดูแลเว็บแอปพลิเคชันหลายโปรเจ็กต์'
            }
        ],
        education: [
            {
                degree: 'Bachelor of Science in Computer Science',
                degreeTh: 'วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์',
                school: 'Chulalongkorn University',
                schoolTh: 'จุฬาลงกรณ์มหาวิทยาลัย',
                period: '2016 - 2020',
                periodTh: '2559 - 2563'
            }
        ],
        skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Express.js', 'Git', 'Docker', 'AWS', 'JavaScript', 'HTML/CSS'],
        resumes: [
            {
                name: 'Resume_SomchaiJaidee_2026.pdf',
                size: '245 KB',
                uploadDate: '2026-03-01'
            }
        ]
    };

    // Render experience
    function renderExperience() {
        const list = $('#experienceList');
        const currentLang = localStorage.getItem('language') || 'th';
        
        let html = '';
        profileData.experiences.forEach((exp, index) => {
            const title = currentLang === 'th' ? exp.titleTh : exp.title;
            const company = currentLang === 'th' ? exp.companyTh : exp.company;
            const period = currentLang === 'th' ? exp.periodTh : exp.period;
            const description = currentLang === 'th' ? exp.descriptionTh : exp.description;

            html += `
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="fw-bold mb-1">${title}</h6>
                            <p class="text-muted mb-1">${company}</p>
                            <p class="text-muted mb-2"><small><i class="bi bi-calendar"></i> ${period}</small></p>
                            <p class="mb-0">${description}</p>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-secondary me-1" onclick="editExperience(${index})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteExperience(${index})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                    ${index < profileData.experiences.length - 1 ? '<hr>' : ''}
                </div>
            `;
        });

        list.html(html || '<p class="text-muted">ยังไม่มีข้อมูลประสบการณ์การทำงาน</p>');
    }

    // Render education
    function renderEducation() {
        const list = $('#educationList');
        const currentLang = localStorage.getItem('language') || 'th';
        
        let html = '';
        profileData.education.forEach((edu, index) => {
            const degree = currentLang === 'th' ? edu.degreeTh : edu.degree;
            const school = currentLang === 'th' ? edu.schoolTh : edu.school;
            const period = currentLang === 'th' ? edu.periodTh : edu.period;

            html += `
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="fw-bold mb-1">${degree}</h6>
                            <p class="text-muted mb-1">${school}</p>
                            <p class="text-muted mb-0"><small><i class="bi bi-calendar"></i> ${period}</small></p>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-secondary me-1" onclick="editEducation(${index})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteEducation(${index})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                    ${index < profileData.education.length - 1 ? '<hr>' : ''}
                </div>
            `;
        });

        list.html(html || '<p class="text-muted">ยังไม่มีข้อมูลการศึกษา</p>');
    }

    // Render skills
    function renderSkills() {
        const list = $('#skillsList');
        
        let html = '';
        profileData.skills.forEach((skill, index) => {
            html += `
                <span class="skill-badge">
                    ${skill}
                    <i class="bi bi-x-circle ms-2" style="cursor: pointer;" onclick="removeSkill(${index})"></i>
                </span>
            `;
        });

        list.html(html || '<p class="text-muted">ยังไม่มีทักษะ</p>');
    }

    // Render resumes
    function renderResumes() {
        const list = $('#resumeList');
        const currentLang = localStorage.getItem('language') || 'th';
        const uploadedText = currentLang === 'th' ? 'อัปโหลดเมื่อ' : 'Uploaded on';
        
        let html = '';
        profileData.resumes.forEach((resume, index) => {
            html += `
                <div class="resume-file">
                    <div>
                        <i class="bi bi-file-earmark-pdf text-danger"></i>
                        <strong class="ms-2">${resume.name}</strong>
                        <span class="text-muted ms-3">${resume.size}</span>
                        <span class="text-muted ms-3">${uploadedText}: ${resume.uploadDate}</span>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-primary me-2">
                            <i class="bi bi-download"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteResume(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        list.html(html);
    }

    // Update profile display based on language
    function updateProfileDisplay() {
        const currentLang = localStorage.getItem('language') || 'th';
        
        $('#profileName').text(currentLang === 'th' ? profileData.name : profileData.nameEn);
        $('#profileLocation').text(currentLang === 'th' ? profileData.location : profileData.locationEn);
        $('#profileAbout').text(currentLang === 'th' ? profileData.about : profileData.aboutEn);
    }

    // Edit profile button
    $('#editProfileBtn').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        alert(currentLang === 'th' ? 'ฟีเจอร์นี้จะเชื่อมต่อกับ Backend API' : 'This feature will connect to Backend API');
    });

    // Edit about button
    $('#editAboutBtn').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        const newAbout = prompt(
            currentLang === 'th' ? 'แก้ไขข้อมูลเกี่ยวกับคุณ:' : 'Edit your about:',
            $('#profileAbout').text()
        );
        if (newAbout) {
            $('#profileAbout').text(newAbout);
            if (currentLang === 'th') {
                profileData.about = newAbout;
            } else {
                profileData.aboutEn = newAbout;
            }
        }
    });

    // Add experience button
    $('#addExperienceBtn').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        alert(currentLang === 'th' ? 'เปิด Modal สำหรับเพิ่มประสบการณ์' : 'Open modal to add experience');
    });

    // Add education button
    $('#addEducationBtn').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        alert(currentLang === 'th' ? 'เปิด Modal สำหรับเพิ่มการศึกษา' : 'Open modal to add education');
    });

    // Add skill button
    $('#addSkillBtn').on('click', function() {
        const currentLang = localStorage.getItem('language') || 'th';
        const newSkill = prompt(currentLang === 'th' ? 'เพิ่มทักษะ:' : 'Add skill:');
        if (newSkill) {
            profileData.skills.push(newSkill);
            renderSkills();
        }
    });

    // Remove skill
    window.removeSkill = function(index) {
        profileData.skills.splice(index, 1);
        renderSkills();
    };

    // Upload area click
    $('#uploadArea').on('click', function() {
        $('#resumeInput').click();
    });

    // File upload
    $('#resumeInput').on('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const currentLang = localStorage.getItem('language') || 'th';
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert(currentLang === 'th' ? 'ไฟล์มีขนาดใหญ่เกิน 5MB' : 'File size exceeds 5MB');
                return;
            }

            // Validate file type
            const allowedTypes = ['.pdf', '.doc', '.docx'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            if (!allowedTypes.includes(fileExtension)) {
                alert(currentLang === 'th' ? 'กรุณาอัปโหลดไฟล์ PDF, DOC หรือ DOCX เท่านั้น' : 'Please upload PDF, DOC, or DOCX files only');
                return;
            }

            // Add to mock data
            profileData.resumes.push({
                name: file.name,
                size: Math.round(file.size / 1024) + ' KB',
                uploadDate: new Date().toISOString().split('T')[0]
            });

            renderResumes();
            
            const successText = currentLang === 'th' ? 'อัปโหลดไฟล์สำเร็จ' : 'File uploaded successfully';
            alert(successText);
        }
    });

    // Delete resume
    window.deleteResume = function(index) {
        const currentLang = localStorage.getItem('language') || 'th';
        const confirmText = currentLang === 'th' ? 'คุณแน่ใจหรือไม่ที่จะลบไฟล์นี้?' : 'Are you sure you want to delete this file?';
        
        if (confirm(confirmText)) {
            profileData.resumes.splice(index, 1);
            renderResumes();
        }
    };

    // Edit/Delete experience
    window.editExperience = function(index) {
        const currentLang = localStorage.getItem('language') || 'th';
        alert(currentLang === 'th' ? 'เปิด Modal สำหรับแก้ไขประสบการณ์' : 'Open modal to edit experience');
    };

    window.deleteExperience = function(index) {
        const currentLang = localStorage.getItem('language') || 'th';
        const confirmText = currentLang === 'th' ? 'คุณแน่ใจหรือไม่ที่จะลบประสบการณ์นี้?' : 'Are you sure you want to delete this experience?';
        
        if (confirm(confirmText)) {
            profileData.experiences.splice(index, 1);
            renderExperience();
        }
    };

    // Edit/Delete education
    window.editEducation = function(index) {
        const currentLang = localStorage.getItem('language') || 'th';
        alert(currentLang === 'th' ? 'เปิด Modal สำหรับแก้ไขการศึกษา' : 'Open modal to edit education');
    };

    window.deleteEducation = function(index) {
        const currentLang = localStorage.getItem('language') || 'th';
        const confirmText = currentLang === 'th' ? 'คุณแน่ใจหรือไม่ที่จะลบข้อมูลการศึกษานี้?' : 'Are you sure you want to delete this education?';
        
        if (confirm(confirmText)) {
            profileData.education.splice(index, 1);
            renderEducation();
        }
    };

    // Initial render
    updateProfileDisplay();
    renderExperience();
    renderEducation();
    renderSkills();
    renderResumes();

    // Re-render on language change
    $(document).on('languageChanged', function() {
        updateProfileDisplay();
        renderExperience();
        renderEducation();
        renderResumes();
    });
});
