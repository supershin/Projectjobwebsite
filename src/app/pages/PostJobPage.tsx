import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Briefcase, 
  Plus, 
  X,
  Loader2,
  MapPin,
  DollarSign,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

export function PostJobPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    company: user?.name || '',
    location: '',
    type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship',
    category: '',
    salary: '',
    description: '',
    requirements: [''],
    benefits: [''],
    expiryDate: '',
    status: 'active' as 'active' | 'draft'
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'requirements' | 'benefits', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'requirements' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'benefits', index: number) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.company || !formData.location || !formData.category || !formData.salary || !formData.description) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const requirements = formData.requirements.filter(r => r.trim());
    const benefits = formData.benefits.filter(b => b.trim());

    if (requirements.length === 0) {
      toast.error('กรุณาระบุคุณสมบัติที่ต้องการอย่างน้อย 1 ข้อ');
      return;
    }

    setLoading(true);
    try {
      const jobData = {
        ...formData,
        requirements,
        benefits,
        employerId: user!.id,
        employerName: user!.name,
        companyLogo: undefined
      };

      const newJob = await api.createJob(jobData);
      
      // Show payment info
      toast.success('ประกาศงานสำเร็จ!');
      
      // Create payment record
      await api.createPayment(newJob.id);
      
      navigate(`/jobs/${newJob.id}`);
    } catch (error) {
      console.error('Failed to create job:', error);
      toast.error('เกิดข้อผิดพลาดในการประกาศงาน');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'employer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</h2>
          <Button onClick={() => navigate('/jobs')}>กลับไปหน้างานทั้งหมด</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ประกาศงาน</h1>
          <p className="text-gray-600">เพิ่มตำแหน่งงานใหม่และหาคนที่เหมาะสม</p>
        </div>

        {/* Pricing Info */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">ค่าบริการต่อ 1 ประกาศ</h3>
              <p className="text-white/90">ประกาศงานของคุณจะแสดงเป็นเวลา 30 วัน</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">฿299</p>
              <p className="text-sm text-white/80">ต่อ 1 ประกาศ</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ตำแหน่งงาน *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="เช่น Frontend Developer"
                className="rounded-xl"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อบริษัท *
              </label>
              <Input
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="ชื่อบริษัทของคุณ"
                className="rounded-xl"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                สถานที่ *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="เช่น Bangkok, Thailand หรือ Remote"
                  className="pl-11 rounded-xl"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ประเภทงาน *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-300 focus:outline-none"
                disabled={loading}
              >
                <option value="full-time">เต็มเวลา</option>
                <option value="part-time">พาร์ทไทม์</option>
                <option value="contract">สัญญาจ้าง</option>
                <option value="freelance">ฟรีแลนซ์</option>
                <option value="internship">ฝึกงาน</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หมวดหมู่ *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-300 focus:outline-none"
                disabled={loading}
              >
                <option value="">เลือกหมวดหมู่</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Operations">Operations</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เงินเดือน *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={formData.salary}
                  onChange={(e) => handleChange('salary', e.target.value)}
                  placeholder="เช่น 40,000 - 60,000 บาท"
                  className="pl-11 rounded-xl"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              วันหมดเขต
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleChange('expiryDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="pl-11 rounded-xl"
                disabled={loading}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">ถ้าไม่ระบุ จะตั้งค่าเป็น 30 วันจากวันนี้</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รายละเอียดงาน *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="อธิบายรายละเอียดของตำแหน่งงาน..."
              rows={6}
              className="rounded-xl"
              disabled={loading}
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              คุณสมบัติที่ต้องการ *
            </label>
            <div className="space-y-3">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={req}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    placeholder="เช่น React.js, TypeScript, 2+ years experience"
                    className="flex-1 rounded-xl"
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    onClick={() => removeArrayItem('requirements', index)}
                    variant="outline"
                    size="icon"
                    disabled={formData.requirements.length === 1 || loading}
                    className="rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addArrayItem('requirements')}
                variant="outline"
                className="w-full rounded-xl"
                disabled={loading}
              >
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มคุณสมบัติ
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              สวัสดิการ
            </label>
            <div className="space-y-3">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                    placeholder="เช่น ประกันสุขภาพ, โบนัสประจำปี"
                    className="flex-1 rounded-xl"
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    onClick={() => removeArrayItem('benefits', index)}
                    variant="outline"
                    size="icon"
                    disabled={formData.benefits.length === 1 || loading}
                    className="rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addArrayItem('benefits')}
                variant="outline"
                className="w-full rounded-xl"
                disabled={loading}
              >
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มสวัสดิการ
              </Button>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              สถานะ
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={(e) => handleChange('status', e.target.value)}
                  disabled={loading}
                  className="w-4 h-4 text-purple-600"
                />
                <span>เปิดรับสมัครทันที</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={(e) => handleChange('status', e.target.value)}
                  disabled={loading}
                  className="w-4 h-4 text-purple-600"
                />
                <span>บันทึกแบบร่าง</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-xl font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  กำลังประกาศงาน...
                </>
              ) : (
                <>
                  <Briefcase className="w-5 h-5 mr-2" />
                  ประกาศงาน
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="px-8 py-6 rounded-xl"
              disabled={loading}
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}