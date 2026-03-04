import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { 
  Briefcase, 
  User, 
  LogOut, 
  Menu, 
  X,
  Home,
  PlusCircle,
  LayoutDashboard
} from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              JobHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              หน้าแรก
            </Link>
            <Link 
              to="/jobs" 
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Briefcase className="w-4 h-4" />
              งานทั้งหมด
            </Link>
            
            {user ? (
              <>
                {user.role === 'employer' && (
                  <Link 
                    to="/post-job" 
                    className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    ประกาศงาน
                  </Link>
                )}
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                    <User className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">{user.name}</span>
                    <span className="text-xs px-2 py-0.5 bg-white rounded-full text-purple-600">
                      {user.role === 'admin' ? 'แอดมิน' : user.role === 'employer' ? 'ผู้ประกาศงาน' : 'ผู้หางาน'}
                    </span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => navigate('/login')}
                  variant="ghost"
                  className="text-gray-700 hover:text-purple-600"
                >
                  เข้าสู่ระบบ
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  สมัครสมาชิก
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-700"
            >
              <Home className="w-4 h-4" />
              หน้าแรก
            </Link>
            <Link 
              to="/jobs" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-700"
            >
              <Briefcase className="w-4 h-4" />
              งานทั้งหมด
            </Link>
            
            {user ? (
              <>
                {user.role === 'employer' && (
                  <Link 
                    to="/post-job" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-700"
                  >
                    <PlusCircle className="w-4 h-4" />
                    ประกาศงาน
                  </Link>
                )}
                <Link 
                  to="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-700"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">{user.name}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-white rounded-full text-purple-600">
                    {user.role === 'admin' ? 'แอดมิน' : user.role === 'employer' ? 'ผู้ประกาศงาน' : 'ผู้หางาน'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <div className="space-y-2">
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
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  สมัครสมาชิก
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
