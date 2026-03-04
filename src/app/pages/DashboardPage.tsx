import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';
import { UserDashboard } from '../components/dashboards/UserDashboard';
import { EmployerDashboard } from '../components/dashboards/EmployerDashboard';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';

export function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 pt-20">
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'employer' && <EmployerDashboard />}
      {user.role === 'user' && <UserDashboard />}
    </div>
  );
}
