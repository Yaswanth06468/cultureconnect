import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, isLoading } = useContext(AuthContext);
    const storedRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (requireAdmin) {
        const isAdmin = user?.role === 'admin' || storedRole === 'admin';
        if (!token || !isAdmin) {
            return <Navigate to="/admin/login" replace />;
        }
    } else {
        if (!user && !token) {
            return <Navigate to="/login" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
