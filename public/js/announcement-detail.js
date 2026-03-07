// ========================================
// ANNOUNCEMENT DETAIL PAGE
// ========================================

// Mock data for announcements (ในการใช้งานจริงจะดึงจาก Backend API)
const announcementsData = {
    1: {
        id: 1,
        title: 'การปรับปรุงเว็บไซต์',
        date: '5 มีนาคม 2026',
        time: '14:30',
        author: 'Admin Team',
        content: `
            <p class="lead mb-4">เริ่มต้นการปรับปรุงเว็บไซต์เพื่อเพิ่มประสิทธิภาพและประสบการณ์การใช้งานที่ดีขึ้น</p>
            
            <h5 class="fw-bold mt-4 mb-3">รายละเอียดการปรับปรุง</h5>
            <p>ทีมงาน JobHub มีความยินดีที่จะแจ้งให้ทราบว่า เราได้เริ่มต้นโครงการปรับปรุงเว็บไซต์ครั้งใหญ่เพื่อมอบประสบการณ์การใช้งานที่ดีขึ้นให้กับทุกท่าน</p>
            
            <h6 class="fw-bold mt-4 mb-2">สิ่งที่จะได้รับการปรับปรุง:</h6>
            <ul class="mb-3">
                <li>ปรับปรุงความเร็วในการโหลดหน้าเว็บ</li>
                <li>ออกแบบ UI/UX ใหม่ให้ใช้งานง่ายขึ้น</li>
                <li>เพิ่มฟีเจอร์การค้นหางานที่แม่นยำยิ่งขึ้น</li>
                <li>ปรับปรุงระบบการแจ้งเตือน</li>
                <li>เพิ่มความปลอดภัยของข้อมูล</li>
            </ul>
            
            <div class="alert alert-info">
                <h6 class="fw-bold mb-2"><i class="bi bi-calendar-event"></i> กำหนดการ</h6>
                <p class="mb-0">การปรับปรุงจะดำเนินการในช่วง 5-12 มีนาคม 2026 และอาจมีการหยุดให้บริการชั่วคราวในบางช่วงเวลา เราจะแจ้งให้ทราบล่วงหน้าอีกครั้ง</p>
            </div>
            
            <p>หากมีคำถามหรือข้อสงสัยเพิ่มเติม กรุณาติดต่อทีมสนับสนุนของเรา ขอบคุณที่ใช้บริการ JobHub</p>
        `,
        priority: 'normal',
        target: 'all',
        isRead: false
    },
    2: {
        id: 2,
        title: 'โปรโมชั่นใหม่สำหรับนายจ้าง',
        date: '4 มีนาคม 2026',
        time: '10:00',
        author: 'Marketing Team',
        content: `
            <p class="lead mb-4">โปรโมชั่นพิเศษสำหรับนายจ้างใหม่ รับส่วนลด 20% สำหรับแพ็คเกจ Pro ในเดือนแรก</p>
            
            <h5 class="fw-bold mt-4 mb-3">รายละเอียดโปรโมชั่น</h5>
            <p>เราขอแจ้งข่าวดีสำหรับนายจ้างที่สนใจใช้บริการของเราในการประกาศรับสมัครงาน</p>
            
            <div class="card bg-warning bg-opacity-10 border-warning mb-4">
                <div class="card-body">
                    <h4 class="text-center mb-3"><span class="badge bg-warning text-dark">ส่วนลด 20%</span></h4>
                    <h6 class="fw-bold mb-2">เงื่อนไข:</h6>
                    <ul class="mb-3">
                        <li>สำหรับนายจ้างที่สมัครใหม่เท่านั้น</li>
                        <li>ใช้ได้กับแพ็คเกจ Pro เท่านั้น</li>
                        <li>ระยะเวลาโปรโมชั่น: 4-31 มีนาคม 2026</li>
                        <li>จำกัดเพียง 100 ท่านแรกเท่านั้น</li>
                    </ul>
                </div>
            </div>
            
            <h6 class="fw-bold mt-4 mb-2">แพ็คเกจ Pro ประกอบด้วย:</h6>
            <ul class="mb-3">
                <li>ประกาศงานได้ไม่จำกัดจำนวน (30 วัน/ตำแหน่ง)</li>
                <li>แสดงผลบนหน้าแรก (Featured Job)</li>
                <li>ระบบค้นหา Resume ขั้นสูง</li>
                <li>การวิเคราะห์และรายงานผล</li>
                <li>การสนับสนุนแบบเร่งด่วน</li>
            </ul>
            
            <div class="text-center mt-4">
                <a href="register.html?type=employer&promo=PRO20" class="btn btn-warning btn-lg">
                    <i class="bi bi-star-fill"></i> สมัครเลย และรับส่วนลด
                </a>
            </div>
        `,
        priority: 'important',
        target: 'employer',
        isRead: false
    },
    3: {
        id: 3,
        title: 'ฟีเจอร์ใหม่สำหรับผู้สมัครงาน',
        date: '3 มีนาคม 2026',
        time: '16:45',
        author: 'Product Team',
        content: `
            <p class="lead mb-4">เพิ่มฟีเจอร์การติดตามประวัติการสมัครงานของผู้ใช้อย่างละเอียด</p>
            
            <h5 class="fw-bold mt-4 mb-3">ฟีเจอร์ใหม่</h5>
            <p>เราได้พัฒนาฟีเจอร์ใหม่เพื่ออำนวยความสะดวกให้กับผู้สมัครงานในการติดตามสถานะการสมัครงาน</p>
            
            <h6 class="fw-bold mt-4 mb-2">สิ่งที่คุณจะได้:</h6>
            <div class="row g-3 mb-4">
                <div class="col-md-6">
                    <div class="card h-100 border-primary">
                        <div class="card-body">
                            <h6 class="fw-bold text-primary"><i class="bi bi-graph-up"></i> ติดตามสถานะ</h6>
                            <p class="mb-0 small">ดูสถานะการสมัครงานแบบเรียลไทม์</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 border-success">
                        <div class="card-body">
                            <h6 class="fw-bold text-success"><i class="bi bi-bell"></i> การแจ้งเตือน</h6>
                            <p class="mb-0 small">รับการแจ้งเตือนทันทีเมื่อมีการเปลี่ยนแปลง</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 border-warning">
                        <div class="card-body">
                            <h6 class="fw-bold text-warning"><i class="bi bi-calendar-check"></i> ประวัติการสมัคร</h6>
                            <p class="mb-0 small">ดูประวัติการสมัครงานทั้งหมดของคุณ</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 border-info">
                        <div class="card-body">
                            <h6 class="fw-bold text-info"><i class="bi bi-file-text"></i> จัดการเอกสาร</h6>
                            <p class="mb-0 small">จัดเก็บและจัดการ Resume ของคุณ</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="alert alert-success">
                <h6 class="fw-bold mb-2"><i class="bi bi-rocket-takeoff"></i> วิธีการใช้งาน</h6>
                <p class="mb-0">ฟีเจอร์นี้จะพร้อมใช้งานทันทีใน Dashboard ของคุณ ไปที่เมนู "ใบสมัครของฉัน" เพื่อเริ่มใช้งาน</p>
            </div>
        `,
        priority: 'important',
        target: 'user',
        isRead: false
    },
    4: {
        id: 4,
        title: 'การปรับปรุงระบบชำระเงิน',
        date: '2 มีนาคม 2026',
        time: '11:20',
        author: 'Tech Team',
        content: `
            <p class="lead mb-4">ปรับปรุงระบบชำระเงินเพื่อเพิ่มความปลอดภัยและประสิทธิภาพ</p>
            
            <h5 class="fw-bold mt-4 mb-3">การอัพเกรดระบบ</h5>
            <p>เราได้ทำการปรับปรุงระบบชำระเงินให้มีความปลอดภัยและรวดเร็วยิ่งขึ้น</p>
            
            <h6 class="fw-bold mt-4 mb-2">สิ่งที่เปลี่ยนแปลง:</h6>
            <ul class="mb-3">
                <li>เพิ่มการเข้ารหัสข้อมูลแบบ SSL 256-bit</li>
                <li>รองรับช่องทางการชำระเงินเพิ่มเติม (PromptPay, True Money Wallet)</li>
                <li>ลดเวลาในการตรวจสอบการชำระเงิน</li>
                <li>ใบเสร็จอิเล็กทรอนิกส์แบบ Real-time</li>
            </ul>
            
            <div class="alert alert-info">
                <h6 class="fw-bold mb-2"><i class="bi bi-shield-check"></i> ความปลอดภัย</h6>
                <p class="mb-0">ข้อมูลการชำระเงินของคุณได้รับการปกป้องด้วยมาตรฐานสากล PCI DSS Level 1</p>
            </div>
        `,
        priority: 'normal',
        target: 'employer',
        isRead: true
    },
    5: {
        id: 5,
        title: 'การปรับปรุงการแจ้งเตือน',
        date: '1 มีนาคม 2026',
        time: '09:00',
        author: 'Product Team',
        content: `
            <p class="lead mb-4">ปรับปรุงการแจ้งเตือนเพื่อให้ผู้ใช้ได้รับข้อมูลทันท่วงที</p>
            
            <h5 class="fw-bold mt-4 mb-3">ระบบแจ้งเตือนใหม่</h5>
            <p>เราได้พัฒนาระบบการแจ้งเตือนให้มีประสิทธิภาพมากขึ้น</p>
            
            <h6 class="fw-bold mt-4 mb-2">ช่องทางการแจ้งเตือน:</h6>
            <ul class="mb-3">
                <li>การแจ้งเตือนบนเว็บไซต์ (Web Push Notification)</li>
                <li>อีเมล</li>
                <li>SMS (สำหรับข่าวสารสำคัญ)</li>
                <li>Mobile App (เร็วๆ นี้)</li>
            </ul>
            
            <div class="alert alert-success">
                <h6 class="fw-bold mb-2"><i class="bi bi-gear"></i> ตั้งค่าการแจ้งเตือน</h6>
                <p class="mb-0">คุณสามารถปรับแต่งการแจ้งเตือนได้ที่ Dashboard > ตั้งค่า > การแจ้งเตือน</p>
            </div>
        `,
        priority: 'normal',
        target: 'all',
        isRead: true
    }
};

// Get announcement ID from URL
const urlParams = new URLSearchParams(window.location.search);
const announcementId = parseInt(urlParams.get('id')) || 1;

// Load announcement on page load
$(document).ready(function() {
    loadAnnouncementDetail(announcementId);
    loadRelatedAnnouncements(announcementId);
});

// Load announcement detail
function loadAnnouncementDetail(id) {
    const announcement = announcementsData[id];
    
    if (!announcement) {
        // Announcement not found
        $('#announcementHeader').html(`
            <div class="text-center">
                <i class="bi bi-exclamation-triangle fs-1 text-warning"></i>
                <h4 class="mt-3">ไม่พบข่าวสารที่ต้องการ</h4>
            </div>
        `);
        $('#announcementBody').html('');
        return;
    }
    
    // Priority badge
    let priorityBadge = '';
    if (announcement.priority === 'urgent') {
        priorityBadge = '<span class="badge bg-danger ms-2"><i class="bi bi-exclamation-triangle-fill"></i> เร่งด่วน</span>';
    } else if (announcement.priority === 'important') {
        priorityBadge = '<span class="badge bg-warning text-dark ms-2"><i class="bi bi-exclamation-circle-fill"></i> สำคัญ</span>';
    }
    
    // Target badge
    let targetBadge = '';
    if (announcement.target === 'employer') {
        targetBadge = '<span class="badge bg-success ms-2"><i class="bi bi-building"></i> นายจ้าง</span>';
    } else if (announcement.target === 'user') {
        targetBadge = '<span class="badge bg-info ms-2"><i class="bi bi-person"></i> ผู้สมัครงาน</span>';
    } else {
        targetBadge = '<span class="badge bg-secondary ms-2"><i class="bi bi-people"></i> ทุกคน</span>';
    }
    
    // Render header
    $('#announcementHeader').html(`
        <div class="d-flex align-items-start gap-3">
            <div class="flex-shrink-0">
                <div class="rounded-3 bg-primary bg-opacity-10 p-3 shadow-sm">
                    <i class="bi bi-megaphone-fill fs-2 text-primary"></i>
                </div>
            </div>
            <div class="flex-grow-1">
                <h3 class="fw-bold mb-2">
                    ${announcement.title}
                    ${priorityBadge}
                    ${targetBadge}
                </h3>
                <div class="d-flex flex-wrap gap-3 text-muted">
                    <small><i class="bi bi-calendar3"></i> ${announcement.date}</small>
                    <small><i class="bi bi-clock"></i> ${announcement.time}</small>
                    <small><i class="bi bi-person-circle"></i> ${announcement.author}</small>
                </div>
            </div>
        </div>
    `);
    
    // Render body
    $('#announcementBody').html(announcement.content);
    
    // Mark as read (ในการใช้งานจริงจะส่งไปยัง Backend)
    if (!announcement.isRead) {
        announcement.isRead = true;
    }
}

// Load related announcements
function loadRelatedAnnouncements(currentId) {
    const relatedIds = Object.keys(announcementsData)
        .map(id => parseInt(id))
        .filter(id => id !== currentId)
        .slice(0, 3);
    
    let html = '';
    relatedIds.forEach(id => {
        const ann = announcementsData[id];
        const priorityColor = ann.priority === 'urgent' ? 'danger' : ann.priority === 'important' ? 'warning' : 'primary';
        
        html += `
            <div class="col-md-4">
                <a href="announcement-detail.html?id=${ann.id}" class="text-decoration-none">
                    <div class="card h-100 border-${priorityColor} hover-shadow" style="transition: all 0.3s ease;">
                        <div class="card-body">
                            <div class="d-flex align-items-start mb-2">
                                <i class="bi bi-megaphone-fill text-${priorityColor} me-2"></i>
                                <h6 class="fw-bold mb-0 text-dark">${ann.title}</h6>
                            </div>
                            <small class="text-muted d-block mb-2">
                                <i class="bi bi-clock"></i> ${ann.date}
                            </small>
                            ${ann.priority === 'important' ? '<span class="badge bg-warning text-dark">สำคัญ</span>' : ''}
                            ${ann.priority === 'urgent' ? '<span class="badge bg-danger">เร่งด่วน</span>' : ''}
                        </div>
                    </div>
                </a>
            </div>
        `;
    });
    
    $('#relatedAnnouncements').html(html);
}

// Share announcement function
function shareAnnouncement() {
    const announcement = announcementsData[announcementId];
    const shareUrl = window.location.href;
    const shareText = `${announcement.title} - JobHub`;
    
    if (navigator.share) {
        navigator.share({
            title: shareText,
            text: announcement.content.substring(0, 100) + '...',
            url: shareUrl
        }).then(() => {
            showNotification('แชร์สำเร็จ!', 'success');
        }).catch(() => {
            // Fallback to copy to clipboard
            copyToClipboard(shareUrl);
        });
    } else {
        // Fallback to copy to clipboard
        copyToClipboard(shareUrl);
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showNotification('คัดลอกลิงก์สำเร็จ!', 'success');
}
