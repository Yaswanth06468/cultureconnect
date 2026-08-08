import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('dark');
        root.classList.add('light');
        localStorage.setItem('theme', 'light');
    }, []);

    const toggleTheme = () => {};
    const setMode = () => {};

    return (
        <ThemeContext.Provider value={{ theme: 'light', isDark: false, toggleTheme, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;

