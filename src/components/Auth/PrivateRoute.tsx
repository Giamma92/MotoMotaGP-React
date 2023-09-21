import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Replace with your actual context import

const PrivateRoute = ({ children }: any) => {
    let authContext: any = useAuth();

    return authContext.isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;

    // return (
    //     <Route
    //     {...rest}
    //     render={(props: any) =>
    //         state.isAuthenticated 
    //         ? <Component {...props} />
    //         : <Navigate  to="/login" />
    //     }
    //     />
    // );
};

export default PrivateRoute;
