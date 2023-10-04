// AuthContext.js
import { AUTH_TOKEN } from 'components/constants';
import { createContext, useContext, useEffect, useState } from 'react';
import {Buffer} from 'buffer';

function parseJwt(token: string) {
    if(!token) return null;
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}


function decodeUser(token: string): User {
    let decodedToken = parseJwt(token);
    //console.log('Decoded token', decodedToken);
    let user: User = {id: decodedToken?.data.iduser, firstname: decodedToken?.data.nome, lastname: decodedToken?.data.cognome};
    return user;
}

interface User {
    id: string,
    firstname: string,
    lastname: string
}

const AuthContext = createContext({
    token: null as string|null,
    user: null as User|null,
    login: (token: string) => {}, 
    logout: () => {}, 
    isAuthenticated: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string|null>(() => sessionStorage.getItem(AUTH_TOKEN));
    const [user, setUser] = useState<User|null>(() => {
        const token = sessionStorage.getItem(AUTH_TOKEN) as string;
        const user = decodeUser(token);
        return user;
        //console.log('Decoded token', decodedToken);
    });

    useEffect(() => {
        if(!!token) sessionStorage.setItem(AUTH_TOKEN, token);
    }, [token]);
    
    const login = (token: string) => {
        sessionStorage.setItem(AUTH_TOKEN, token);
        // Decode the token if needed and set the user in state
        const user = decodeUser(token);

        setUser(user);

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
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
