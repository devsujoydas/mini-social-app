import { Navigate, useLocation } from 'react-router-dom';  
import { useAuth } from '../hooks/useAuth';

const AuthPrivateRoutes = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (user) return <Navigate to="/" replace state={{ from: location }} />;

    return children;
};

export default AuthPrivateRoutes;
