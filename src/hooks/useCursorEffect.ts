import { useEffect } from 'react';

interface CursorEffectOptions {
    targetSelector?: string;
    hoverClass?: string;
}

const useCursorEffect = ({
                             targetSelector = 'a, button, .interactive',
                             hoverClass = 'hover',
                         }: CursorEffectOptions = {}) => {
    useEffect(() => {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');

        if (!cursor || !follower) return;

        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            cursor.setAttribute('style', `transform: translate3d(${clientX}px, ${clientY}px, 0)`);

            setTimeout(() => {
                follower.setAttribute('style', `transform: translate3d(${clientX}px, ${clientY}px, 0)`);
            }, 100);
        };

        const handleMouseEnter = () => {
            cursor.classList.remove('hidden');
            follower.classList.remove('hidden');
        };

        const handleMouseLeave = () => {
            cursor.classList.add('hidden');
            follower.classList.add('hidden');
        };

        const handleLinkHover = () => {
            cursor.classList.add(hoverClass);
            follower.classList.add(hoverClass);
        };

        const handleLinkLeave = () => {
            cursor.classList.remove(hoverClass);
            follower.classList.remove(hoverClass);
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        const links = document.querySelectorAll(targetSelector);
        links.forEach(link => {
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
        });

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);

            links.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover);
                link.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, [targetSelector, hoverClass]);
};

export default useCursorEffect;