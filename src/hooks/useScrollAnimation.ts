import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
    threshold?: number;
    once?: boolean;
}

const useScrollAnimation = ({
                                threshold = 0.2,
                                once = true,
                            }: ScrollAnimationProps = {}) => {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    if (once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold,
            }
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold, once]);

    return { ref, isVisible };
};

export default useScrollAnimation;