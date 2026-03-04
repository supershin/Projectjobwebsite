import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { mockJobs } from '../data/mockJobs';

export default function JobsPage() {
  const [searchParams] = useSearchParams();
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    type: '',
    location: '',
    salary: '',
  });

  useEffect(() => {
    let filtered = [...mockJobs];

    if (filters.search) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      type: '',
      location: '',
      salary: '',
    });
  };

  return (
    <>
      <style>{`
        .page-header {
          padding: 120px 0 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
        }

        .filters-sidebar {
          background: #ffffff;
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid #e5e7eb;
          position: sticky;
          top: 100px;
        }

        .job-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 1.5rem;
          padding: 1.75rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .job-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .job-card:hover::before {
          transform: scaleY(1);
        }

        .job-card:hover {
          box-shadow: 0 20px 40px rgba(124, 58, 237, 0.15);
          transform: translateY(-4px);
          border-color: #7c3aed;
        }

        .company-logo {
          width: 64px;
          height: 64px;
          border-radius: 1rem;
          object-fit: cover;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .job-card:hover .company-logo {
          transform: scale(1.1) rotate(3deg);
          border-color: #7c3aed;
        }

        .job-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .job-badge-primary {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.05));
          color: #7c3aed;
          border: 1px solid rgba(124, 58, 237, 0.2);
        }

        .job-badge-success {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
      `}</style>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">ค้นหางาน</h1>
          <p className="lead">ค้นพบตำแหน่งงานที่เหมาะกับคุณจาก {mockJobs.length}+ ตำแหน่ง</p>
        </div>
      </section>

      {/* Jobs Content */}
      <section className="jobs-content py-5">
        <div className="container">
          <div className="row">
            {/* Filters Sidebar */}
            <div className="col-lg-3 mb-4">
              <div className="filters-sidebar">
                <h5 className="fw-bold mb-4">กรองงาน</h5>
                
                {/* Search */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">ค้นหา</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="ชื่อตำแหน่ง, บริษัท..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">หมวดหมู่</label>
                  <select 
                    className="form-select"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="Technology">เทคโนโลยี</option>
                    <option value="Design">ดีไซน์</option>
                    <option value="Marketing">การตลาด</option>
                    <option value="Sales">ขาย</option>
                    <option value="Customer Service">บริการลูกค้า</option>
                    <option value="Finance">การเงิน</option>
                    <option value="HR">ทรัพยากรบุคคล</option>
                    <option value="Operations">ปฏิบัติการ</option>
                  </select>
                </div>

                {/* Job Type Filter */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">ประเภทงาน</label>
                  <select 
                    className="form-select"
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="full-time">งานประจำ</option>
                    <option value="part-time">งานพาร์ทไทม์</option>
                    <option value="contract">สัญญาจ้าง</option>
                    <option value="freelance">ฟรีแลนซ์</option>
                    <option value="internship">ฝึกงาน</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">สถานที่</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="กรุงเทพ, เชียงใหม่..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  />
                </div>

                <button 
                  className="btn btn-outline-secondary w-100" 
                  onClick={clearFilters}
                >
                  <i className="bi bi-x-circle"></i> ล้างตัวกรอง
                </button>
              </div>
            </div>

            {/* Jobs List */}
            <div className="col-lg-9">
              {/* Sort and Count */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="mb-0">พบ <span>{filteredJobs.length}</span> ตำแหน่ง</h5>
                </div>
              </div>

              {/* Jobs Container */}
              <div>
                {filteredJobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <div className="d-flex align-items-start">
                          <img src={job.companyLogo} alt={job.company} className="company-logo me-3" />
                          <div className="flex-grow-1">
                            <h5 className="mb-1">
                              <Link to={`/jobs/${job.id}`} className="text-decoration-none text-dark">
                                {job.title}
                              </Link>
                            </h5>
                            <p className="text-muted mb-2">{job.company}</p>
                            <div className="d-flex flex-wrap gap-2">
                              <span className="job-badge job-badge-primary">
                                <i className="bi bi-geo-alt"></i> {job.location}
                              </span>
                              <span className="job-badge job-badge-success">
                                <i className="bi bi-briefcase"></i> {job.type}
                              </span>
                              <span className="job-badge job-badge-primary">
                                <i className="bi bi-tag"></i> {job.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-md-end mt-3 mt-md-0">
                        <h6 className="text-primary mb-2">{job.salary}</h6>
                        <Link to={`/jobs/${job.id}`} className="btn btn-primary">
                          ดูรายละเอียด <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredJobs.length === 0 && (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#9ca3af' }}></i>
                    <h5 className="mt-3 text-muted">ไม่พบงานที่ตรงกับเงื่อนไข</h5>
                    <p className="text-muted">ลองเปลี่ยนเงื่อนไขการค้นหา</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
