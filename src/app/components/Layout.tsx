import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { Briefcase, Menu, X, User, LogOut, LayoutDashboard, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { AuthProvider, useAuth } from '../context/AuthContext';

function LayoutContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'หน้าแรก' },
    { path: '/jobs', label: 'ค้นหางาน' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                JobZone
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {user.role === 'employer' && (
                    <Button
                      onClick={() => navigate('/employer/dashboard')}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  )}
                  {user.role === 'admin' && (
                    <Button
                      onClick={() => navigate('/admin/dashboard')}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin
                    </Button>
                  )}
                  <Button
                    onClick={() => navigate('/profile')}
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    {user.name}
                  </Button>
                  <Button onClick={handleLogout} variant="ghost" size="sm">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => navigate('/login')} variant="ghost">
                    เข้าสู่ระบบ
                  </Button>
                  <Button onClick={() => navigate('/register')} className="bg-gradient-to-r from-purple-600 to-pink-600">
                    สมัครสมาชิก
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg ${
                    location.pathname === link.path
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  {user.role === 'employer' && (
                    <button
                      onClick={() => {
                        navigate('/employer/dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                  )}
                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        navigate('/admin/dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin
                    </button>
                  )}
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    โปรไฟล์
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-red-600 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    ออกจากระบบ
                  </button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    เข้าสู่ระบบ
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    สมัครสมาชิก
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  JobZone
                </span>
              </div>
              <p className="text-sm text-gray-600">
                แพลตฟอร์มหางานออนไลน์สำหรับคนรุ่นใหม่
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">สำหรับผู้หางาน</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/jobs" className="hover:text-purple-600">ค้นหางาน</Link></li>
                <li><Link to="/profile" className="hover:text-purple-600">โปรไฟล์</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">สำหรับนายจ้าง</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/employer/dashboard" className="hover:text-purple-600">ประกาศงาน</Link></li>
                <li><Link to="/employer/dashboard" className="hover:text-purple-600">จัดการใบสมัคร</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">ติดต่อเรา</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Email: contact@jobzone.com</li>
                <li>Tel: 02-xxx-xxxx</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 JobZone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Layout() {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}
