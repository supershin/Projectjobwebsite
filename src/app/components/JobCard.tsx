import { Link } from 'react-router';
import { Job } from '../services/api';
import { MapPin, Briefcase, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-lg object-cover" />
            ) : (
              <Briefcase className="w-8 h-8 text-purple-600" />
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors mb-1 truncate">
              {job.title}
            </h3>
            <p className="text-gray-600 mb-3">{job.company}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                <Briefcase className="w-3 h-3" />
                {job.type === 'full-time' ? 'เต็มเวลา' : 
                 job.type === 'part-time' ? 'พาร์ทไทม์' :
                 job.type === 'contract' ? 'สัญญาจ้าง' :
                 job.type === 'freelance' ? 'ฟรีแลนซ์' : 'ฝึกงาน'}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">
                {job.category}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">เงินเดือน</p>
                <p className="font-semibold text-purple-600">{job.salary}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(job.postedDate).toLocaleDateString('th-TH', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {job.applicantsCount} คน
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Button */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            ดูรายละเอียด
          </Button>
        </div>
      </div>
    </Link>
  );
}
