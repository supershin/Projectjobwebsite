import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { api, Job } from '../services/api';
import { JobCard } from '../components/JobCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Search, 
  Filter, 
  MapPin,
  Briefcase,
  X,
  Loader2
} from 'lucide-react';

export function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Technology',
    'Design',
    'Marketing',
    'Sales',
    'Finance',
    'Human Resources',
    'Operations',
    'Customer Service',
    'Other'
  ];

  const jobTypes = [
    { value: 'full-time', label: 'เต็มเวลา' },
    { value: 'part-time', label: 'พาร์ทไทม์' },
    { value: 'contract', label: 'สัญญาจ้าง' },
    { value: 'freelance', label: 'ฟรีแลนซ์' },
    { value: 'internship', label: 'ฝึกงาน' }
  ];

  useEffect(() => {
    loadJobs();
  }, [searchParams]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const filters = {
        search: searchParams.get('search') || undefined,
        location: searchParams.get('location') || undefined,
        category: searchParams.get('category') || undefined,
        type: searchParams.get('type') || undefined,
      };
      const data = await api.getJobs(filters);
      setJobs(data);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params: Record<string, string> = {};
    if (searchQuery) params.search = searchQuery;
    if (location) params.location = location;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedType) params.type = selectedType;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setSelectedCategory('');
    setSelectedType('');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || location || selectedCategory || selectedType;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            งานทั้งหมด
          </h1>
          <p className="text-gray-600">
            พบ {jobs.length} ตำแหน่งงานที่เหมาะกับคุณ
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="ค้นหาตำแหน่งงาน, บริษัท..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 py-6 rounded-xl border-gray-200 focus:border-purple-300"
              />
            </div>
            
            <div className="flex-1 md:max-w-xs relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="สถานที่"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 py-6 rounded-xl border-gray-200 focus:border-purple-300"
              />
            </div>

            <Button
              onClick={handleSearch}
              className="px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
            >
              <Search className="w-5 h-5 mr-2" />
              ค้นหา
            </Button>

            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="px-8 py-6 rounded-xl border-2"
            >
              <Filter className="w-5 h-5 mr-2" />
              ฟิลเตอร์
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมวดหมู่
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ประเภทงาน
                </label>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value === selectedType ? '' : type.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedType === type.value
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Briefcase className="w-4 h-4 inline mr-1" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-200 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">ฟิลเตอร์ที่ใช้:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {searchQuery}
                  <button onClick={() => { setSearchQuery(''); handleSearch(); }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {location && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                  {location}
                  <button onClick={() => { setLocation(''); handleSearch(); }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">
                  {selectedCategory}
                  <button onClick={() => { setSelectedCategory(''); handleSearch(); }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedType && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  {jobTypes.find(t => t.value === selectedType)?.label}
                  <button onClick={() => { setSelectedType(''); handleSearch(); }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
              >
                ล้างทั้งหมด
              </button>
            </div>
          )}
        </div>

        {/* Job List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบตำแหน่งงาน</h3>
            <p className="text-gray-600 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาดูนะคะ</p>
            <Button onClick={clearFilters} variant="outline">
              ล้างฟิลเตอร์
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
