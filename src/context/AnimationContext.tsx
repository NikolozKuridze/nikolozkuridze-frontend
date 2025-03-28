import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextProps {
    prefersReducedMotion: boolean;
    toggleReducedMotion: () => void;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
        // მომხმარებლის პრეფერენციის შემოწმება
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    const toggleReducedMotion = () => {
        setPrefersReducedMotion((prev) => !prev);
    };

    return (
        <AnimationContext.Provider value={{ prefersReducedMotion, toggleReducedMotion }}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimation = (): AnimationContextProps => {
    const context = useContext(AnimationContext);
    if (context === undefined) {
        throw new Error('useAnimation must be used within an AnimationProvider');
    }
    return context;
};