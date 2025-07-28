import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const AuthPrivateRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (user) return <Navigate to="/" replace state={{ from: location }} />;

    return children;
};

export default AuthPrivateRoutes;
