// AuthContext.js
import { AUTH_TOKEN } from 'components/constants';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    token: null as string|null, 
    login: (token: string) => {}, 
    logout: () => {}, 
    isAuthenticated: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string|null>(() => sessionStorage.getItem(AUTH_TOKEN));

    useEffect(() => {
        if(!!token) sessionStorage.setItem(AUTH_TOKEN, token);
    }, [token]);
    
    const login = (token: string) => {
        sessionStorage.setItem(AUTH_TOKEN, token);
        // Decode the token if needed and set the user in state
        setToken(token);
    };

    const logout = () => {
        sessionStorage.removeItem(AUTH_TOKEN);
        setToken(null);
    };

    const isAuthenticated = () => {
        // Implement token verification here
        return !!token && token !== '';
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
