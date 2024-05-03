import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    if (loading) return <h1>Loading...</h1>;
    if (!user) return navigate('/');

    return <>{children}</>;
}
