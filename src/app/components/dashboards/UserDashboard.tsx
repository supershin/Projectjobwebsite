import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { api, Resume } from '../../services/api';
import { Button } from '../ui/button';
import { 
  Briefcase, 
  FileText, 
  User,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

export function UserDashboard() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await api.getMyResumes();
      setResumes(data);
    } catch (error) {
      console.error('Failed to load resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      reviewed: 'bg-blue-100 text-blue-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    
    const labels = {
      pending: 'รอตรวจสอบ',
      reviewed: 'กำลังพิจารณา',
      accepted: 'ผ่านการคัดเลือก',
      rejected: 'ไม่ผ่านการคัดเลือก'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          สวัสดี, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">ยินดีต้อนรับสู่แดชบอร์ดของคุณ</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{resumes.length}</h3>
          <p className="text-gray-600">งานที่สมัคร</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {resumes.filter(r => r.status === 'pending').length}
          </h3>
          <p className="text-gray-600">รอตรวจสอบ</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {resumes.filter(r => r.status === 'accepted').length}
          </h3>
          <p className="text-gray-600">ผ่านคัดเลือก</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {resumes.filter(r => r.status === 'rejected').length}
          </h3>
          <p className="text-gray-600">ไม่ผ่านคัดเลือก</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-4">เริ่มต้นหางาน</h2>
        <p className="text-white/90 mb-6">ค้นหางานที่เหมาะกับคุณและสมัครได้ทันที</p>
        <Link to="/jobs">
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
            <Briefcase className="w-5 h-5 mr-2" />
            ดูงานทั้งหมด
          </Button>
        </Link>
      </div>

      {/* Application History */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ประวัติการสมัครงาน</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลด...</p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ยังไม่มีการสมัครงาน</h3>
            <p className="text-gray-600 mb-6">เริ่มค้นหาและสมัครงานที่คุณสนใจกันเถอะ!</p>
            <Link to="/jobs">
              <Button>
                <Briefcase className="w-5 h-5 mr-2" />
                ดูงานทั้งหมด
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      ตำแหน่งงาน #{resume.jobId}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      สมัครเมื่อ {new Date(resume.submittedAt).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {getStatusBadge(resume.status)}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      <strong>Resume:</strong> {resume.fileName}
                    </p>
                  </div>
                  <Link to={`/jobs/${resume.jobId}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      ดูงาน
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}