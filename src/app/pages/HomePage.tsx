import { Link } from 'react-router';
import { useState } from 'react';
import { mockJobs } from '../data/mockJobs';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Navigate to jobs page with search query
    window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`;
  };

  const handleCategoryClick = (category: string) => {
    window.location.href = `/jobs?category=${encodeURIComponent(category)}`;
  };

  const featuredJobs = mockJobs.slice(0, 6);

  const categories = [
    { icon: '💻', name: 'เทคโนโลยี', count: '350+', value: 'Technology' },
    { icon: '🎨', name: 'ดีไซน์', count: '180+', value: 'Design' },
    { icon: '📱', name: 'การตลาด', count: '220+', value: 'Marketing' },
    { icon: '💰', name: 'ขาย', count: '190+', value: 'Sales' },
    { icon: '🎧', name: 'บริการลูกค้า', count: '140+', value: 'Customer Service' },
    { icon: '📊', name: 'การเงิน', count: '160+', value: 'Finance' },
  ];

  return (
    <>
      <style>{`
        /* Hero Section Styles */
        .hero-section {
          padding: 140px 0 100px;
          background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%);
          color: #ffffff;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%);
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(5%, 5%) rotate(120deg);
          }
          66% {
            transform: translate(-5%, 5%) rotate(240deg);
          }
        }

        .hero-section::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(2px 2px at 60% 70%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(1px 1px at 80% 10%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(1px 1px at 90% 60%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(2px 2px at 33% 80%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(1px 1px at 10% 90%, rgba(255, 255, 255, 0.3), transparent);
          background-size: 200% 200%;
          animation: particlesFloat 20s linear infinite;
          opacity: 0.6;
        }

        @keyframes particlesFloat {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .hero-section .container {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-family: 'Poppins', sans-serif;
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          animation: titleSlideIn 1s ease-out;
        }

        @keyframes titleSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .text-gradient {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
          filter: drop-shadow(0 0 30px rgba(251, 191, 36, 0.5));
        }

        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .hero-section .lead {
          font-size: 1.25rem;
          font-weight: 400;
          opacity: 0.95;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .search-box {
          max-width: 650px;
          animation: fadeInUp 1s ease-out 0.4s both;
          position: relative;
        }

        .search-box::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
          border-radius: 9999px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .search-box:hover::before {
          opacity: 1;
        }

        .search-box .form-control {
          padding: 1.25rem 1.75rem;
          border: none;
          border-radius: 9999px;
          font-size: 1.05rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .search-box .form-control:focus {
          background: #ffffff;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(124, 58, 237, 0.2);
          transform: translateY(-2px);
          outline: none;
        }

        .search-box .btn-primary-custom {
          padding: 1.25rem 2.5rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%);
          border: none;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4);
          transition: all 0.3s ease;
        }

        .search-box .btn-primary-custom:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(124, 58, 237, 0.6);
        }

        .badge-custom {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 0.65rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .badge-custom:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .hero-image {
          animation: fadeInRight 1s ease-out 0.6s both;
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-image img {
          animation: float 6s ease-in-out infinite;
          border-radius: 2rem;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
          border: 3px solid rgba(255, 255, 255, 0.2);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(1deg);
          }
          50% {
            transform: translateY(-25px) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) rotate(-1deg);
          }
        }

        /* Category Card Styles */
        .category-card {
          padding: 2rem 1.5rem;
          background: #ffffff;
          border: 2px solid transparent;
          border-radius: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .category-card > * {
          position: relative;
          z-index: 1;
        }

        .category-card:hover::before {
          opacity: 0.05;
        }

        .category-card:hover {
          border-color: #7c3aed;
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 35px rgba(124, 58, 237, 0.2);
        }

        .category-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .category-card:hover .category-icon {
          transform: scale(1.2) rotate(5deg);
        }

        /* Job Card Styles */
        .job-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 1.5rem;
          padding: 1.75rem;
          transition: all 0.3s ease;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .job-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .job-card:hover::before {
          transform: scaleY(1);
        }

        .job-card:hover {
          box-shadow: 0 20px 40px rgba(124, 58, 237, 0.15);
          transform: translateY(-8px);
          border-color: #7c3aed;
        }

        .company-logo {
          width: 64px;
          height: 64px;
          border-radius: 1rem;
          object-fit: cover;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .job-card:hover .company-logo {
          transform: scale(1.1) rotate(3deg);
          border-color: #7c3aed;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .job-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .job-badge-primary {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.05));
          color: #7c3aed;
          border: 1px solid rgba(124, 58, 237, 0.2);
        }

        .job-badge-success {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        /* Responsive */
        @media (max-width: 991px) {
          .hero-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 767px) {
          .hero-title {
            font-size: 2rem;
          }
          .hero-section {
            padding: 100px 0 60px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4 hero-title">
                ค้นหางานที่ใช่<br />
                <span className="text-gradient">สำหรับคุณ</span>
              </h1>
              <p className="lead mb-4">แพลตฟอร์มหางานออนไลน์ที่ทันสมัย เชื่อมต่อผู้หางานกับบริษัทชั้นนำ</p>
              <div className="search-box mb-4">
                <div className="input-group input-group-lg">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="ค้นหาตำแหน่งงาน หรือ บริษัท..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button className="btn btn-primary-custom" type="button" onClick={handleSearch}>
                    <i className="bi bi-search"></i> ค้นหา
                  </button>
                </div>
              </div>
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge-custom">🔥 1000+ ตำแหน่งงาน</span>
                <span className="badge-custom">⚡ อัพเดททุกวัน</span>
                <span className="badge-custom">💼 100+ บริษัท</span>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-image">
                <img src="https://source.unsplash.com/600x500/?workspace,office" alt="Hero" className="img-fluid rounded-4 shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">หมวดหมู่ยอดนิยม</h2>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-2">
                <div className="category-card text-center" onClick={() => handleCategoryClick(category.value)}>
                  <div className="category-icon">{category.icon}</div>
                  <h6 className="mt-3">{category.name}</h6>
                  <small className="text-muted">{category.count} งาน</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs-section py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="fw-bold">งานแนะนำ</h2>
            <Link to="/jobs" className="btn btn-outline-primary">
              ดูทั้งหมด <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="row g-4">
            {featuredJobs.map((job) => (
              <div key={job.id} className="col-md-6 col-lg-4">
                <div className="job-card">
                  <div className="d-flex align-items-start mb-3">
                    <img src={job.companyLogo} alt={job.company} className="company-logo me-3" />
                    <div className="flex-grow-1">
                      <h5 className="mb-1">
                        <Link to={`/jobs/${job.id}`} className="text-decoration-none text-dark">
                          {job.title}
                        </Link>
                      </h5>
                      <p className="text-muted mb-2">{job.company}</p>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="job-badge job-badge-primary">
                          <i className="bi bi-geo-alt"></i> {job.location}
                        </span>
                        <span className="job-badge job-badge-success">
                          <i className="bi bi-briefcase"></i> {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-primary mb-0">{job.salary}</h6>
                      <small className="text-muted">ต่อเดือน</small>
                    </div>
                    <Link to={`/jobs/${job.id}`} className="btn btn-sm btn-primary">
                      ดูรายละเอียด <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">ทำไมต้องเลือก JobHub?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card text-center p-4 bg-white rounded-3 border">
                <div className="feature-icon" style={{ fontSize: '3rem' }}>🚀</div>
                <h4 className="mt-4 mb-3">สมัครง่าย รวดเร็ว</h4>
                <p className="text-muted">สมัครงานได้ภายในไม่กี่คลิก ระบบจัดการประวัติและเรซูเม่อัตโนมัติ</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center p-4 bg-white rounded-3 border">
                <div className="feature-icon" style={{ fontSize: '3rem' }}>🔔</div>
                <h4 className="mt-4 mb-3">แจ้งเตือนงานใหม่</h4>
                <p className="text-muted">รับการแจ้งเตือนเมื่อมีงานใหม่ที่ตรงกับความสนใจของคุณ</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center p-4 bg-white rounded-3 border">
                <div className="feature-icon" style={{ fontSize: '3rem' }}>💼</div>
                <h4 className="mt-4 mb-3">บริษัทชั้นนำ</h4>
                <p className="text-muted">เข้าถึงตำแหน่งงานจากบริษัทชั้นนำและสตาร์ทอัพดังทั่วประเทศ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-4">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
          <p className="lead mb-4">สร้างบัญชีและเริ่มค้นหางานในฝันของคุณวันนี้</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/register" className="btn btn-light btn-lg">สมัครสมาชิกฟรี</Link>
            <Link to="/register?type=employer" className="btn btn-outline-light btn-lg">สำหรับนายจ้าง</Link>
          </div>
        </div>
      </section>
    </>
  );
}
