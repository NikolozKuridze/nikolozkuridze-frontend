import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
    theme: ThemeType;
    toggleTheme: () => void;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>('light');

    // Initialize theme based on saved preference or system preference
    useEffect(() => {
        const initializeTheme = () => {
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme') as ThemeType | null;

            if (savedTheme) {
                return savedTheme;
            }

            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }

            // Default to light mode
            return 'light';
        };

        const initialTheme = initializeTheme();
        setTheme(initialTheme);

        // Apply theme to document
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            const savedTheme = localStorage.getItem('theme');
            // Only auto switch if user hasn't manually set a preference
            if (!savedTheme) {
                setTheme(e.matches ? 'dark' : 'light');
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            }
        };
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';

            // Save to localStorage
            localStorage.setItem('theme', newTheme);

            // Apply to document
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
