import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { api, Job, Payment } from '../../services/api';
import { Button } from '../ui/button';
import { 
  Briefcase, 
  PlusCircle, 
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

export function EmployerDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [allJobs, paymentData] = await Promise.all([
        api.getJobs(),
        api.getMyPayments()
      ]);
      
      // Filter jobs by employer
      const myJobs = allJobs.filter(j => j.employerId === user?.id);
      setJobs(myJobs);
      setPayments(paymentData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบประกาศงานนี้?')) {
      return;
    }

    try {
      await api.deleteJob(jobId);
      toast.success('ลบประกาศงานสำเร็จ');
      loadData();
    } catch (error) {
      console.error('Failed to delete job:', error);
      toast.error('เกิดข้อผิดพลาดในการลบประกาศงาน');
    }
  };

  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicantsCount, 0);
  const activeJobs = jobs.filter(j => j.status === 'active').length;
  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          สวัสดี, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">จัดการประกาศงานและตรวจสอบผู้สมัครของคุณ</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{jobs.length}</h3>
          <p className="text-gray-600">ประกาศงานทั้งหมด</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{activeJobs}</h3>
          <p className="text-gray-600">ประกาศที่เปิดอยู่</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalApplicants}</h3>
          <p className="text-gray-600">ผู้สมัครทั้งหมด</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">฿{totalSpent.toLocaleString()}</h3>
          <p className="text-gray-600">ค่าใช้จ่ายทั้งหมด</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">พร้อมหาคนเก่งมาร่วมทีมหรือยัง?</h2>
            <p className="text-white/90">ประกาศงานใหม่และเริ่มรับสมัครคนเก่งๆ เข้าทีมของคุณ</p>
          </div>
          <Link to="/post-job">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold whitespace-nowrap">
              <PlusCircle className="w-5 h-5 mr-2" />
              ประกาศงานใหม่
            </Button>
          </Link>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ประกาศงานของคุณ</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลด...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ยังไม่มีประกาศงาน</h3>
            <p className="text-gray-600 mb-6">เริ่มต้นประกาศงานแรกของคุณและหาคนที่เหมาะสมกันเถอะ!</p>
            <Link to="/post-job">
              <Button>
                <PlusCircle className="w-5 h-5 mr-2" />
                ประกาศงานใหม่
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : job.status === 'closed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {job.status === 'active' ? 'เปิดรับสมัคร' : 
                         job.status === 'closed' ? 'ปิดรับสมัคร' : 'แบบร่าง'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{job.company} • {job.location}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.applicantsCount} ผู้สมัคร
                      </span>
                      <span>
                        โพสต์: {new Date(job.postedDate).toLocaleDateString('th-TH')}
                      </span>
                      <span>
                        หมดเขต: {new Date(job.expiryDate).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">ดู</span>
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast.info('ฟีเจอร์แก้ไขจะเพิ่มเร็วๆ นี้')}
                    >
                      <Edit className="w-4 h-4 md:mr-2" />
                      <span className="hidden md:inline">แก้ไข</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2" />
                      <span className="hidden md:inline">ลบ</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}