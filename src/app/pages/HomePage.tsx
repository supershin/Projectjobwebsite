import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  Zap,
  Search,
  MapPin,
  ArrowRight,
  Star,
  Shield,
  Clock
} from 'lucide-react';
import { useState } from 'react';

export function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    navigate(`/jobs?search=${searchQuery}&location=${location}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 -z-10" />
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-sm">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                แพลตฟอร์มหางานสำหรับ Gen Z
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                ค้นหางาน
              </span>
              <br />
              <span className="text-gray-900">ที่ใช่สำหรับคุณ</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              เชื่อมต่อกับโอกาสใหม่ๆ สร้างอาชีพในฝัน เริ่มต้นได้ทันที
            </p>

            {/* Search Box */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ตำแหน่งงาน, บริษัท, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              
              <div className="flex-1 md:max-w-xs flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="สถานที่"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              
              <Button 
                onClick={handleSearch}
                className="px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold"
              >
                <Search className="w-5 h-5 mr-2" />
                ค้นหา
              </Button>
            </div>

            {/* Popular Categories */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="text-sm text-gray-600">หมวดหมู่ยอดนิยม:</span>
              {['Technology', 'Design', 'Marketing', 'Sales', 'Finance'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigate(`/jobs?category=${cat}`)}
                  className="px-4 py-1.5 bg-white hover:bg-purple-50 rounded-full text-sm text-gray-700 hover:text-purple-600 border border-gray-200 hover:border-purple-300 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, label: 'ตำแหน่งงาน', value: '10,000+', color: 'purple' },
              { icon: Users, label: 'ผู้ใช้งาน', value: '50,000+', color: 'pink' },
              { icon: TrendingUp, label: 'บริษัท', value: '2,000+', color: 'cyan' },
              { icon: Star, label: 'ความสำเร็จ', value: '95%', color: 'yellow' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 flex items-center justify-center`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ทำไมต้อง <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">JobHub</span>
            </h2>
            <p className="text-xl text-gray-600">แพลตฟอร์มที่ออกแบบมาเพื่อคุณโดยเฉพาะ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'สมัครง่าย รวดเร็ว',
                description: 'ระบบที่ใช้งานง่าย สมัครงานได้ในไม่กี่คลิก',
                gradient: 'from-purple-500 to-purple-600'
              },
              {
                icon: Shield,
                title: 'ปลอดภัย เชื่อถือได้',
                description: 'ข้อมูลของคุณได้รับการปกป้องอย่างดี',
                gradient: 'from-pink-500 to-pink-600'
              },
              {
                icon: Clock,
                title: 'อัพเดตตลอดเวลา',
                description: 'งานใหม่ทุกวัน ไม่พลาดโอกาสดีๆ',
                gradient: 'from-cyan-500 to-cyan-600'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            เข้าร่วมกับเราวันนี้ และค้นพบโอกาสใหม่ๆ ที่รอคุณอยู่
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg rounded-xl"
            >
              สมัครสมาชิก
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate('/jobs')}
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-6 text-lg rounded-xl"
            >
              ดูงานทั้งหมด
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl">JobHub</span>
          </div>
          <p className="text-gray-400 mb-6">แพลตฟอร์มหางานออนไลน์สำหรับคนรุ่นใหม่</p>
          <p className="text-gray-500 text-sm">© 2026 JobHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
