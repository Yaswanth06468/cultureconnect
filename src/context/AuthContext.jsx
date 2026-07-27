import { createContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data.user);
                    } else {
                        localStorage.removeItem('token');
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Failed to fetch user', error);
                }
            }
            setIsLoading(false);
        };

        fetchUser();
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
