import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return localStorage.getItem('token') ? { role: 'franchise', name: 'Franchise Partner' } : null;
    });
    const [loading, setLoading] = useState(false);

    const login = (role, token, refreshToken) => {
        setUser({ role, name: `User (${role})` });
        if (token) {
            localStorage.setItem('token', token);
        }
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
