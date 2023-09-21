import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Replace with your actual context import

const PrivateOutlet = () => {
    let authContext: any = useAuth();

    return authContext.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
