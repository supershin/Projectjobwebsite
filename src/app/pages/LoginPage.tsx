import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Briefcase, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('เข้าสู่ระบบสำเร็จ!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'user' | 'employer' | 'admin') => {
    setLoading(true);
    try {
      await login(
        `${role}@demo.com`,
        'demo123'
      );
      toast.success('เข้าสู่ระบบสำเร็จ!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              JobHub
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">ยินดีต้อนรับกลับ!</h1>
          <p className="text-gray-600">เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="pl-11 py-6 rounded-xl"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 py-6 rounded-xl"
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-xl font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ยังไม่มีบัญชี?{' '}
              <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Login */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <p className="text-sm text-gray-600 mb-4 text-center">
            <strong>ทดลองใช้งาน (Demo):</strong>
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => handleDemoLogin('user')}
              disabled={loading}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              ผู้หางาน
            </Button>
            <Button
              onClick={() => handleDemoLogin('employer')}
              disabled={loading}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              ผู้ประกาศงาน
            </Button>
            <Button
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              แอดมิน
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}