import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        // ლოკალიდან ჩატვირთვა ან სისტემური პრეფერენციის გამოყენება
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);

        // კლასის დამატება html ელემენტზე
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);

            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};