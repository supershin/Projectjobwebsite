import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .navbar {
          padding: 0.75rem 0;
          background: rgba(15, 15, 35, 0.8) !important;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          padding: 0.5rem 0;
          background: rgba(15, 15, 35, 0.95) !important;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
        }

        .navbar-brand {
          font-family: 'Poppins', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: #ffffff !important;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .navbar-brand i {
          background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px rgba(124, 58, 237, 0.5));
        }

        .navbar-brand:hover {
          transform: scale(1.05);
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.85) !important;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem !important;
          border-radius: 0.75rem;
          position: relative;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%);
          transition: width 0.3s ease;
        }

        .nav-link:hover::before {
          width: 60%;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #ffffff !important;
          background-color: rgba(124, 58, 237, 0.15);
          box-shadow: 0 0 15px rgba(124, 58, 237, 0.2);
        }

        .nav-link.active::before {
          width: 60%;
        }

        .btn-primary-custom {
          background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%) !important;
          color: #ffffff !important;
          border: none !important;
          font-weight: 600;
          padding: 0.6rem 1.75rem !important;
          border-radius: 9999px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
        }

        .btn-primary-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .btn-primary-custom:hover::before {
          left: 100%;
        }

        .btn-primary-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.6);
        }

        .navbar-toggler {
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.5rem 0.75rem;
        }

        .navbar-toggler:focus {
          box-shadow: 0 0 0 0.2rem rgba(124, 58, 237, 0.3);
        }

        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.85%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        .footer {
          background-color: #111827;
          color: #9ca3af;
        }

        .footer h5, .footer h6 {
          color: #ffffff;
        }

        .footer a {
          color: #6b7280;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer a:hover {
          color: #ffffff;
        }

        .social-links a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #1f2937;
          color: #ffffff;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background-color: #7c3aed;
          transform: translateY(-3px);
        }
      `}</style>

      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-briefcase-fill"></i> JobHub
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                  to="/"
                >
                  หน้าแรก
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`} 
                  to="/jobs"
                >
                  งานทั้งหมด
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link 
                      className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} 
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button 
                      className="nav-link btn btn-link" 
                      onClick={logout}
                    >
                      ออกจากระบบ
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link 
                      className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} 
                      to="/login"
                    >
                      เข้าสู่ระบบ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      className="nav-link btn btn-primary-custom ms-2" 
                      to="/register"
                    >
                      สมัครสมาชิก
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-briefcase-fill"></i> JobHub
            </h5>
            <p className="text-muted">แพลตฟอร์มหางานออนไลน์ที่ทันสมัยสำหรับคนรุ่นใหม่</p>
            <div className="social-links">
              <a href="#" className="me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="me-3"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold mb-3">เกี่ยวกับเรา</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted">เกี่ยวกับ JobHub</a></li>
              <li><a href="#" className="text-muted">ทีมงาน</a></li>
              <li><a href="#" className="text-muted">ร่วมงานกับเรา</a></li>
              <li><a href="#" className="text-muted">ติดต่อเรา</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold mb-3">สำหรับผู้หางาน</h6>
            <ul className="list-unstyled">
              <li><Link to="/jobs" className="text-muted">ค้นหางาน</Link></li>
              <li><Link to="/register" className="text-muted">สร้างบัญชี</Link></li>
              <li><a href="#" className="text-muted">คำแนะนำ</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold mb-3">สำหรับนายจ้าง</h6>
            <ul className="list-unstyled">
              <li><Link to="/post-job" className="text-muted">ประกาศงาน</Link></li>
              <li><Link to="/register?type=employer" className="text-muted">สมัครสมาชิก</Link></li>
              <li><a href="#" className="text-muted">ราคา</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold mb-3">ช่วยเหลือ</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted">ศูนย์ช่วยเหลือ</a></li>
              <li><a href="#" className="text-muted">เงื่อนไขการใช้</a></li>
              <li><a href="#" className="text-muted">นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <div className="text-center text-muted">
          <small>&copy; 2026 JobHub. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
