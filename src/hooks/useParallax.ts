import { useEffect, useRef } from 'react';

interface ParallaxOptions {
    speed?: number;
    direction?: 'vertical' | 'horizontal';
    reverse?: boolean;
}

const useParallax = ({
                         speed = 0.1,
                         direction = 'vertical',
                         reverse = false,
                     }: ParallaxOptions = {}) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const multiplier = reverse ? -1 : 1;

            if (direction === 'vertical') {
                element.style.transform = `translateY(${scrollPosition * speed * multiplier}px)`;
            } else {
                element.style.transform = `translateX(${scrollPosition * speed * multiplier}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [speed, direction, reverse]);

    return ref;
};

export default useParallax;