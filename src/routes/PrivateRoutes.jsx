import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = ({ children, requiredRole }) => {
    const { user, loading, userData } = useAuth()
    const location = useLocation();

    if (loading) return <Loading />;

    if (user && user.uid) {
        if (requiredRole) {
            if (userData?.role === requiredRole) {
                return children;
            } else {
                return <Navigate to="/" replace />;
            }
        }
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};


export default PrivateRoutes;
