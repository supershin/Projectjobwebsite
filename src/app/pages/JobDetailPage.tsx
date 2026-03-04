import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { api, Job } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Users,
  Building2,
  DollarSign,
  Calendar,
  CheckCircle,
  Upload,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const data = await api.getJobById(id);
      setJob(data);
    } catch (error) {
      console.error('Failed to load job:', error);
      toast.error('ไม่สามารถโหลดข้อมูลงานได้');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleApply = async () => {
    if (!user) {
      toast.error('กรุณาเข้าสู่ระบบก่อนสมัครงาน');
      navigate('/login');
      return;
    }

    if (!resumeFile) {
      toast.error('กรุณาอัพโหลด Resume');
      return;
    }

    setApplying(true);
    try {
      await api.submitResume({
        jobId: id!,
        file: resumeFile,
        coverLetter
      });
      
      toast.success('สมัครงานสำเร็จ! ทีมงานจะติดต่อกลับเร็วๆ นี้');
      setShowApplyForm(false);
      setCoverLetter('');
      setResumeFile(null);
    } catch (error) {
      console.error('Failed to apply:', error);
      toast.error('เกิดข้อผิดพลาดในการสมัครงาน');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบตำแหน่งงาน</h2>
          <Button onClick={() => navigate('/jobs')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปหน้างานทั้งหมด
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/jobs')}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับ
        </Button>

        {/* Job Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Company Logo */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="w-20 h-20 rounded-xl object-cover" />
              ) : (
                <Building2 className="w-12 h-12 text-purple-600" />
              )}
            </div>

            {/* Job Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  job.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {job.status === 'active' ? 'เปิดรับสมัคร' : 'ปิดรับสมัคร'}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {job.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{job.company}</p>

              <div className="flex flex-wrap gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {job.type === 'full-time' ? 'เต็มเวลา' : 
                   job.type === 'part-time' ? 'พาร์ทไทม์' :
                   job.type === 'contract' ? 'สัญญาจ้าง' :
                   job.type === 'freelance' ? 'ฟรีแลนซ์' : 'ฝึกงาน'}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(job.postedDate).toLocaleDateString('th-TH')}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {job.applicantsCount} ผู้สมัคร
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex flex-col gap-3">
              {user?.role === 'user' && job.status === 'active' && (
                <Button
                  onClick={() => setShowApplyForm(!showApplyForm)}
                  className="px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold"
                >
                  สมัครงาน
                </Button>
              )}
              {!user && (
                <Button
                  onClick={() => navigate('/login')}
                  className="px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold"
                >
                  เข้าสู่ระบบเพื่อสมัคร
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Apply Form */}
        {showApplyForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 animate-in slide-in-from-top">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">สมัครงาน</h2>
            
            <div className="space-y-6">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อัพโหลด Resume (PDF, DOC, DOCX) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    {resumeFile ? (
                      <p className="text-purple-600 font-medium">{resumeFile.name}</p>
                    ) : (
                      <>
                        <p className="text-gray-600 mb-1">คลิกเพื่ออัพโหลดไฟล์</p>
                        <p className="text-sm text-gray-400">หรือลากไฟล์มาวางที่นี่</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  จดหมายสมัครงาน (Cover Letter)
                </label>
                <Textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="บอกเราว่าทำไมคุณถึงเหมาะกับตำแหน่งนี้..."
                  rows={6}
                  className="rounded-xl"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  onClick={handleApply}
                  disabled={applying || !resumeFile}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-xl font-semibold"
                >
                  {applying ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      กำลังส่งใบสมัคร...
                    </>
                  ) : (
                    'ส่งใบสมัคร'
                  )}
                </Button>
                <Button
                  onClick={() => setShowApplyForm(false)}
                  variant="outline"
                  className="px-8 py-6 rounded-xl"
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Job Details */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">รายละเอียดงาน</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">คุณสมบัติที่ต้องการ</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">สวัสดิการ</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">ข้อมูลงาน</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">วันที่ประกาศ</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(job.postedDate).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">วันหมดเขต</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(job.expiryDate).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ผู้สมัครทั้งหมด</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {job.applicantsCount} คน
                  </p>
                </div>
              </div>
            </div>

            {/* Company Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-4">เกี่ยวกับบริษัท</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">{job.company}</p>
                  <p className="text-sm text-white/80">{job.employerName}</p>
                </div>
              </div>
              <p className="text-sm text-white/90">
                บริษัทชั้นนำในอุตสาหกรรม {job.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
