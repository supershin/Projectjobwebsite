// ========================================
// EMPLOYER EDIT JOB FUNCTION
// ========================================

function editJob(id) {
    // Get job data from MOCK_JOBS
    const jobData = getJobById(id);
    
    if (!jobData) {
        showNotification('ไม่พบข้อมูลงาน', 'error');
        return;
    }
    
    const modalHtml = `
        <div class="modal fade" id="editJobModal" tabindex="-1">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-gradient border-0 text-white">
                        <h5 class="modal-title fw-bold">
                            <i class="bi bi-pencil-square me-2"></i>แก้ไขประกาศงาน
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form id="editJobForm">
                            <input type="hidden" id="editJobId" value="${jobData.id}">
                            <div class="row g-4">
                                <!-- แบบงาน -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-grid-3x3 text-primary me-2"></i>แบบงาน
                                    </label>
                                    <select class="form-select" id="editJobPattern">
                                        <option value="">กรอกเลือกจากตัวอย่าง</option>
                                        <option value="office" ${jobData.jobPattern === 'office' ? 'selected' : ''}>งานออฟฟิศ</option>
                                        <option value="remote" ${jobData.jobPattern === 'remote' ? 'selected' : ''}>งาน Remote</option>
                                        <option value="hybrid" ${jobData.jobPattern === 'hybrid' ? 'selected' : ''}>งาน Hybrid</option>
                                        <option value="onsite" ${jobData.jobPattern === 'onsite' ? 'selected' : ''}>งาน Onsite</option>
                                    </select>
                                </div>

                                <!-- ตำแหน่ง -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-briefcase text-primary me-2"></i>ตำแหน่ง <span class="text-danger">*</span>
                                    </label>
                                    <select class="form-select" id="editJobPosition" required>
                                        <option value="">เลือกตำแหน่งงาน</option>
                                        <option value="developer" ${jobData.jobPosition === 'developer' ? 'selected' : ''}>นักพัฒนาซอฟต์แวร์</option>
                                        <option value="designer" ${jobData.jobPosition === 'designer' ? 'selected' : ''}>นักออกแบบ</option>
                                        <option value="marketing" ${jobData.jobPosition === 'marketing' ? 'selected' : ''}>นักการตลาด</option>
                                        <option value="sales" ${jobData.jobPosition === 'sales' ? 'selected' : ''}>พนักงานขาย</option>
                                        <option value="engineer" ${jobData.jobPosition === 'engineer' ? 'selected' : ''}>วิศวกร</option>
                                        <option value="accountant" ${jobData.jobPosition === 'accountant' ? 'selected' : ''}>นักบัญชี</option>
                                        <option value="hr" ${jobData.jobPosition === 'hr' ? 'selected' : ''}>ฝ่ายทรัพยากรบุคคล</option>
                                        <option value="other" ${jobData.jobPosition === 'other' ? 'selected' : ''}>อื่นๆ</option>
                                    </select>
                                </div>

                                <!-- ชื่อประกาศ -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-text-left text-primary me-2"></i>ชื่อประกาศ
                                    </label>
                                    <input type="text" class="form-control" id="editJobTitle" maxlength="100" 
                                           placeholder="กรอกชื่อประกาศงาน..." value="${jobData.jobTitle}">
                                    <div class="d-flex justify-content-between align-items-start mt-2">
                                        <div>
                                            <small class="text-muted">
                                                <i class="bi bi-info-circle text-danger me-1"></i>
                                                <strong>Note:</strong> ชื่อประกาศตรงตามงานจริง ทั้งนี้ผู้ใช้ต้นเจอนิเม่าค้นได้
                                            </small>
                                            <br>
                                            <small class="text-warning">
                                                <i class="bi bi-lightbulb-fill me-1"></i>
                                                <strong>Tip:</strong> ให้คำสำคัญง่ายต่อการค้นหาเพิ่มโอกาสค้นพบประกาศ
                                            </small>
                                        </div>
                                        <span class="badge bg-secondary" id="editTitleCounter">${jobData.jobTitle.length}/100 ตัวอักษร</span>
                                    </div>
                                </div>

                                <!-- ตำแหน่งจำกัดงวน -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-calendar-x text-primary me-2"></i>ตำแหน่งจำกัดงวน
                                    </label>
                                    <div class="d-flex gap-4 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editLimitDuration" id="editLimitYes" value="yes" ${jobData.limitDuration === 'yes' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editLimitYes">
                                                ใช่ ❌
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editLimitDuration" id="editLimitNo" value="no" ${jobData.limitDuration === 'no' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editLimitNo">
                                                ไม่ใช่ ⭕
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- ตำแหน่งจำกัดงานพิเศษ (with NEW badge) -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-star text-primary me-2"></i>ตำแหน่งจำกัดงานพิเศษ
                                        <span class="badge bg-success ms-2">NEW</span>
                                    </label>
                                    <div class="form-check form-switch mt-2">
                                        <input class="form-check-input" type="checkbox" id="editSpecialPosition" style="width: 50px; height: 25px;" ${jobData.specialPosition ? 'checked' : ''}>
                                        <label class="form-check-label ms-2" for="editSpecialPosition">
                                            เปิดใช้งาน
                                        </label>
                                    </div>
                                </div>

                                <!-- ประเภทงาน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-tag text-primary me-2"></i>ประเภทงาน
                                    </label>
                                    <div class="d-flex flex-wrap gap-3 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editJobType" id="editFulltime" value="fulltime" ${jobData.jobType === 'fulltime' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editFulltime">
                                                งานประจำ ⭕
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editJobType" id="editParttime" value="parttime" ${jobData.jobType === 'parttime' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editParttime">
                                                งานพาร์ทไทม์
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editJobType" id="editFreelance" value="freelance" ${jobData.jobType === 'freelance' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editFreelance">
                                                ฟรีแลนซ์
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editJobType" id="editTemporary" value="temporary" ${jobData.jobType === 'temporary' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editTemporary">
                                                ร่วมงานชั่วคราวและเป็นทีม
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- จำนวน -->
                                <div class="col-md-4">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-people text-primary me-2"></i>จำนวน
                                    </label>
                                    <select class="form-select" id="editQuantity">
                                        <option value="1" ${jobData.quantity === '1' ? 'selected' : ''}>1</option>
                                        <option value="2" ${jobData.quantity === '2' ? 'selected' : ''}>2</option>
                                        <option value="3" ${jobData.quantity === '3' ? 'selected' : ''}>3</option>
                                        <option value="4" ${jobData.quantity === '4' ? 'selected' : ''}>4</option>
                                        <option value="5" ${jobData.quantity === '5' ? 'selected' : ''}>5</option>
                                        <option value="10" ${jobData.quantity === '10' ? 'selected' : ''}>10</option>
                                        <option value="20" ${jobData.quantity === '20' ? 'selected' : ''}>20+</option>
                                    </select>
                                </div>

                                <!-- เพศ -->
                                <div class="col-md-4">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-gender-ambiguous text-primary me-2"></i>เพศ
                                    </label>
                                    <select class="form-select" id="editGender">
                                        <option value="any" ${jobData.gender === 'any' ? 'selected' : ''}>ไม่ระบุเพศ</option>
                                        <option value="male" ${jobData.gender === 'male' ? 'selected' : ''}>ชาย</option>
                                        <option value="female" ${jobData.gender === 'female' ? 'selected' : ''}>หญิง</option>
                                    </select>
                                </div>

                                <!-- อายุ -->
                                <div class="col-md-4">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-calendar-range text-primary me-2"></i>อายุ
                                    </label>
                                    <select class="form-select" id="editAge">
                                        <option value="any" ${jobData.age === 'any' ? 'selected' : ''}>ไม่ระบุอายุ</option>
                                        <option value="18-25" ${jobData.age === '18-25' ? 'selected' : ''}>18-25 ปี</option>
                                        <option value="25-35" ${jobData.age === '25-35' ? 'selected' : ''}>25-35 ปี</option>
                                        <option value="35-45" ${jobData.age === '35-45' ? 'selected' : ''}>35-45 ปี</option>
                                        <option value="45+" ${jobData.age === '45+' ? 'selected' : ''}>45+ ปี</option>
                                    </select>
                                </div>

                                <!-- ประเภทเงินเดือน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-cash text-primary me-2"></i>ประเภทเงินเดือน
                                    </label>
                                    <div class="d-flex flex-wrap gap-3 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editSalaryType" id="editNoSalary" value="no" ${jobData.salaryType === 'no' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editNoSalary">
                                                ไม่มี
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editSalaryType" id="editNotSpecified" value="notspecified" ${jobData.salaryType === 'notspecified' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editNotSpecified">
                                                ไม่เจาะจงระบุพิมพ์ทั้ง ⭕
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editSalaryType" id="editNegotiable" value="negotiable" ${jobData.salaryType === 'negotiable' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editNegotiable">
                                                ระบุขั้งามารถ
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- การศึกษา -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-mortarboard text-primary me-2"></i>การศึกษา
                                    </label>
                                    <select class="form-select" id="editEducation">
                                        <option value="">===เลือกระดับการศึกษา===</option>
                                        <option value="high-school" ${jobData.education === 'high-school' ? 'selected' : ''}>มัธยมศึกษา</option>
                                        <option value="vocational" ${jobData.education === 'vocational' ? 'selected' : ''}>ปวช./ปวส.</option>
                                        <option value="bachelor" ${jobData.education === 'bachelor' ? 'selected' : ''}>ปริญญาตรี</option>
                                        <option value="master" ${jobData.education === 'master' ? 'selected' : ''}>ปริญญาโท</option>
                                        <option value="doctorate" ${jobData.education === 'doctorate' ? 'selected' : ''}>ปริญญาเอก</option>
                                    </select>
                                </div>

                                <!-- ประสบการณ์ -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-award text-primary me-2"></i>ประสบการณ์
                                    </label>
                                    <select class="form-select" id="editExperience">
                                        <option value="0" ${jobData.experience === '0' ? 'selected' : ''}>0</option>
                                        <option value="1" ${jobData.experience === '1' ? 'selected' : ''}>1 ปี</option>
                                        <option value="2" ${jobData.experience === '2' ? 'selected' : ''}>2 ปี</option>
                                        <option value="3" ${jobData.experience === '3' ? 'selected' : ''}>3 ปี</option>
                                        <option value="5" ${jobData.experience === '5' ? 'selected' : ''}>5 ปี</option>
                                        <option value="10" ${jobData.experience === '10' ? 'selected' : ''}>10+ ปี</option>
                                    </select>
                                </div>

                                <!-- ที่พักจ้างปัจจุบัน -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-building text-primary me-2"></i>ที่พักจ้างปัจจุบัน
                                    </label>
                                    <div class="d-flex gap-4 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editCurrentEmployment" id="editAnyEmployment" value="any" ${jobData.currentEmployment === 'any' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editAnyEmployment">
                                                ไม่จำเพาะ ⭕
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editCurrentEmployment" id="editNoEmployment" value="no" ${jobData.currentEmployment === 'no' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editNoEmployment">
                                                ไม่มี
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- ที่พักจ้างหลายหัวที่ -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-buildings text-primary me-2"></i>ที่พักจ้างหลายหัวที่
                                    </label>
                                    <div class="d-flex gap-4 mt-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editMultiplePositions" id="editAnyMultiple" value="any" ${jobData.multiplePositions === 'any' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editAnyMultiple">
                                                ไม่จำเพาะ ⭕
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="editMultiplePositions" id="editNoMultiple" value="no" ${jobData.multiplePositions === 'no' ? 'checked' : ''}>
                                            <label class="form-check-label" for="editNoMultiple">
                                                ไม่มี
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- รายละเอียดงาน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-file-text text-primary me-2"></i>รายละเอียดงาน (Job Description)
                                    </label>
                                    <textarea class="form-control" id="editJobDescription" rows="6" 
                                              placeholder="อธิบายรายละเอียดงาน หน้าที่ความรับผิดชอบ...">${jobData.jobDescription}</textarea>
                                </div>

                                <!-- คุณสมบัติผู้สมัครงาน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-list-check text-primary me-2"></i>คุณสมบัติผู้สมัครงาน (Qualification)
                                    </label>
                                    <textarea class="form-control" id="editQualification" rows="6" 
                                              placeholder="ระบุคุณสมบัติที่ต้องการ เช่น ทักษะ ความรู้ ประสบการณ์...">${jobData.qualification}</textarea>
                                </div>

                                <!-- สวัสดิการ -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-gift text-primary me-2"></i>สวัสดิการ (Welfare)
                                    </label>
                                    <textarea class="form-control" id="editWelfare" rows="6" 
                                              placeholder="ระบุสวัสดิการที่บริษัทมอบให้ เช่น ประกันสุขภาพ โบนัส...">${jobData.welfare}</textarea>
                                </div>

                                <!-- เงินเดือน -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-currency-dollar text-primary me-2"></i>เงินเดือน
                                    </label>
                                    <select class="form-select" id="editSalary">
                                        <option value="0-10000" ${jobData.salary === '0-10000' ? 'selected' : ''}>0 - 10,000</option>
                                        <option value="10000-20000" ${jobData.salary === '10000-20000' ? 'selected' : ''}>10,000 - 20,000</option>
                                        <option value="20000-30000" ${jobData.salary === '20000-30000' ? 'selected' : ''}>20,000 - 30,000</option>
                                        <option value="30000-40000" ${jobData.salary === '30000-40000' ? 'selected' : ''}>30,000 - 40,000</option>
                                        <option value="40000-50000" ${jobData.salary === '40000-50000' ? 'selected' : ''}>40,000 - 50,000</option>
                                        <option value="50000+" ${jobData.salary === '50000+' ? 'selected' : ''}>50,000+</option>
                                    </select>
                                </div>

                                <!-- ประเทศ -->
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-flag text-primary me-2"></i>ประเทศ
                                    </label>
                                    <select class="form-select" id="editCountry">
                                        <option value="thailand" ${jobData.country === 'thailand' ? 'selected' : ''}>ประเทศไทย</option>
                                        <option value="singapore" ${jobData.country === 'singapore' ? 'selected' : ''}>สิงคโปร์</option>
                                        <option value="japan" ${jobData.country === 'japan' ? 'selected' : ''}>ญี่ปุ่น</option>
                                        <option value="usa" ${jobData.country === 'usa' ? 'selected' : ''}>สหรัฐอเมริกา</option>
                                    </select>
                                </div>

                                <!-- สถานที่ปฏิบัติงาน -->
                                <div class="col-12">
                                    <label class="form-label fw-semibold">
                                        <i class="bi bi-geo-alt text-primary me-2"></i>สถานที่ปฏิบัติงาน
                                    </label>
                                    <select class="form-select" id="editLocation">
                                        <option value="">===กรุณาเลือกจังหวัด===</option>
                                        <option value="bangkok" ${jobData.location === 'bangkok' ? 'selected' : ''}>กรุงเทพมหานคร</option>
                                        <option value="chiang-mai" ${jobData.location === 'chiang-mai' ? 'selected' : ''}>เชียงใหม่</option>
                                        <option value="phuket" ${jobData.location === 'phuket' ? 'selected' : ''}>ภูเก็ต</option>
                                        <option value="chonburi" ${jobData.location === 'chonburi' ? 'selected' : ''}>ชลบุรี</option>
                                        <option value="nonthaburi" ${jobData.location === 'nonthaburi' ? 'selected' : ''}>นนทบุรี</option>
                                        <option value="pathum-thani" ${jobData.location === 'pathum-thani' ? 'selected' : ''}>ปทุมธานี</option>
                                        <option value="samut-prakan" ${jobData.location === 'samut-prakan' ? 'selected' : ''}>สมุทรปราการ</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-0 bg-light">
                        <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>ยกเลิก
                        </button>
                        <button type="button" class="btn btn-primary px-4" onclick="updateJob()">
                            <i class="bi bi-check-circle-fill me-2"></i>บันทึกการแก้ไข
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#editJobModal').remove();
    $('body').append(modalHtml);
    
    // Character counter for job title
    $('#editJobTitle').on('input', function() {
        const length = $(this).val().length;
        $('#editTitleCounter').text(`${length}/100 ตัวอักษร`);
    });
    
    $('#editJobModal').modal('show');
}

function updateJob() {
    const jobId = $('#editJobId').val();
    showNotification('บันทึกการแก้ไขงานสำเร็จ! (Job ID: ' + jobId + ')', 'success');
    $('#editJobModal').modal('hide');
    setTimeout(() => {
        loadEmployerJobs();
    }, 1000);
}

// Mock function to get job data by ID
function getJobById(id) {
    const MOCK_JOBS = [
        {
            id: 1,
            jobPattern: 'remote',
            jobPosition: 'developer',
            jobTitle: 'Senior Frontend Developer - React.js Expert',
            limitDuration: 'no',
            specialPosition: true,
            jobType: 'fulltime',
            quantity: '2',
            gender: 'any',
            age: '25-35',
            salaryType: 'negotiable',
            education: 'bachelor',
            experience: '5',
            currentEmployment: 'any',
            multiplePositions: 'any',
            jobDescription: 'เรากำลังมองหา Senior Frontend Developer ที่มีประสบการณ์ในการพัฒนา Web Application ด้วย React.js และ TypeScript มีความเข้าใจในการออกแบบ UI/UX ที่ดี และสามารถทำงานร่วมกับทีมได้อย่างมีประสิทธิภาพ',
            qualification: '- ปริญญาตรี สาขาวิทยาการคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง\n- มีประสบการณ์ 5 ปีขึ้นไป ในการพัฒนา Frontend\n- มีความชำนาญใน React.js, TypeScript, HTML5, CSS3\n- มีความรู้เรื่อง State Management (Redux, MobX)\n- สามารถใช้ Git ได้เป็นอย่างดี',
            welfare: '- เงินเดือนและโบนัสตามผลงาน\n- ประกันสังคมและประกันสุขภาพ\n- ทำงาน 5 วันต่อสัปดาห์\n- วันหยุดพักผ่อนประจำปี 10 วัน\n- ค่าอาหารกลางวัน\n- เงินช่วยเหลือค่าเดินทาง',
            salary: '50000+',
            country: 'thailand',
            location: 'bangkok'
        },
        // Add more mock jobs here if needed
    ];

    return MOCK_JOBS.find(job => job.id === id);
}