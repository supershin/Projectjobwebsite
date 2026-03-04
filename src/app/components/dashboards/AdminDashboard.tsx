import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api, User, Job, Payment } from '../../services/api';
import { Button } from '../ui/button';
import { 
  Users, 
  Briefcase, 
  DollarSign,
  TrendingUp,
  Shield,
  Eye,
  Ban,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

export function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'jobs' | 'payments'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, jobsData, paymentsData] = await Promise.all([
        api.getAllUsers(),
        api.getJobs(),
        api.getAllPayments()
      ]);
      
      setUsers(usersData);
      setJobs(jobsData);
      setPayments(paymentsData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      await api.updateUserStatus(userId, action);
      toast.success('อัพเดตสถานะผู้ใช้สำเร็จ');
      loadData();
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('เกิดข้อผิดพลาดในการอัพเดตสถานะ');
    }
  };

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const employersCount = users.filter(u => u.role === 'employer').length;
  const jobSeekersCount = users.filter(u => u.role === 'user').length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          <Shield className="inline-block w-10 h-10 mr-3 text-purple-600" />
          Admin Dashboard
        </h1>
        <p className="text-gray-600">จัดการระบบและตรวจสอบข้อมูลทั้งหมด</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{users.length}</h3>
          <p className="text-gray-600">ผู้ใช้ทั้งหมด</p>
          <p className="text-xs text-gray-500 mt-2">
            {employersCount} ผู้ประกาศ • {jobSeekersCount} ผู้หางาน
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{jobs.length}</h3>
          <p className="text-gray-600">ประกาศงานทั้งหมด</p>
          <p className="text-xs text-gray-500 mt-2">
            {jobs.filter(j => j.status === 'active').length} เปิดรับสมัคร
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">฿{totalRevenue.toLocaleString()}</h3>
          <p className="text-gray-600">รายได้ทั้งหมด</p>
          <p className="text-xs text-gray-500 mt-2">
            {payments.length} ธุรกรรม
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {jobs.reduce((sum, j) => sum + j.applicantsCount, 0)}
          </h3>
          <p className="text-gray-600">ใบสมัครทั้งหมด</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg mb-6">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6 overflow-x-auto">
            {[
              { id: 'overview', label: 'ภาพรวม', icon: TrendingUp },
              { id: 'users', label: 'ผู้ใช้', icon: Users },
              { id: 'jobs', label: 'งาน', icon: Briefcase },
              { id: 'payments', label: 'การเงิน', icon: DollarSign }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">ระบบทำงานปกติ ✨</h3>
                <p className="text-white/90">
                  แพลตฟอร์มมีผู้ใช้งาน {users.length} คน และประกาศงาน {jobs.length} ตำแหน่ง
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">ผู้ใช้ล่าสุด</h4>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((u) => (
                      <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{u.name}</p>
                          <p className="text-sm text-gray-500">{u.email}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                          {u.role === 'employer' ? 'ผู้ประกาศ' : 'ผู้หางาน'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4">งานล่าสุด</h4>
                  <div className="space-y-3">
                    {jobs.slice(0, 5).map((j) => (
                      <div key={j.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{j.title}</p>
                          <p className="text-sm text-gray-500">{j.company}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          j.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {j.status === 'active' ? 'เปิด' : 'ปิด'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">จัดการผู้ใช้</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">ชื่อ</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">อีเมล</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">บทบาท</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">วันที่สมัคร</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{u.name}</td>
                        <td className="py-3 px-4 text-gray-600">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                            {u.role === 'admin' ? 'แอดมิน' : 
                             u.role === 'employer' ? 'ผู้ประกาศ' : 'ผู้หางาน'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {new Date(u.createdAt).toLocaleDateString('th-TH')}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toast.info('ดูรายละเอียดผู้ใช้')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">จัดการประกาศงาน</h3>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-900">{job.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {job.status === 'active' ? 'เปิด' : 'ปิด'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{job.company} • {job.location}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>{job.applicantsCount} ผู้สมัคร</span>
                          <span>โพสต์: {new Date(job.postedDate).toLocaleDateString('th-TH')}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        ดู
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">ประวัติการเงิน</h3>
              {payments.length === 0 ? (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">ยังไม่มีธุรกรรม</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ผู้ประกาศ</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">จำนวน</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">สถานะ</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">วันที่</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-600">{p.id.slice(0, 8)}</td>
                          <td className="py-3 px-4">{p.employerId}</td>
                          <td className="py-3 px-4 font-medium">฿{p.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              p.status === 'completed' 
                                ? 'bg-green-100 text-green-700' 
                                : p.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {p.status === 'completed' ? 'สำเร็จ' : 
                               p.status === 'pending' ? 'รอดำเนินการ' : 'ล้มเหลว'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(p.paymentDate).toLocaleDateString('th-TH')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}