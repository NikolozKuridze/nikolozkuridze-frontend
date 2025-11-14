import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminStore } from '../../store/adminStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, verifyToken } = useAdminStore();

  useEffect(() => {
    const verify = async () => {
      await verifyToken();
      setLoading(false);
    };

    verify();
  }, [verifyToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
