import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ role: 'franchise', name: 'Franchise Partner' }); // mock user
    const [loading, setLoading] = useState(false);

    const login = (role) => {
        setUser({ role, name: `User (${role})` });
        localStorage.setItem('token', 'mock_token');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
