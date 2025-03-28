import React, { useEffect, useRef } from 'react';
import './Cursor.scss';

const Cursor: React.FC = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorRingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        const cursorRing = cursorRingRef.current;

        if (!cursorDot || !cursorRing) return;

        // Performance optimization using transforms and requestAnimationFrame
        let mouseX = 0;
        let mouseY = 0;
        let dotX = 0;
        let dotY = 0;
        let ringX = 0;
        let ringY = 0;

        const updateCursor = () => {
            // Smooth cursor movement with subtle lag
            dotX += (mouseX - dotX) * 0.4;
            dotY += (mouseY - dotY) * 0.4;
            ringX += (mouseX - ringX) * 0.1; // Slower follow for ring
            ringY += (mouseY - ringY) * 0.1;

            // Apply transforms for better performance than direct top/left
            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

            requestAnimationFrame(updateCursor);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseEnter = () => {
            cursorDot.classList.remove('hidden');
            cursorRing.classList.remove('hidden');
        };

        const handleMouseLeave = () => {
            cursorDot.classList.add('hidden');
            cursorRing.classList.add('hidden');
        };

        const handleLinkHover = () => {
            cursorDot.classList.add('cursor--active');
            cursorRing.classList.add('cursor--active');
        };

        const handleLinkLeave = () => {
            cursorDot.classList.remove('cursor--active');
            cursorRing.classList.remove('cursor--active');
        };

        // Start animation loop
        requestAnimationFrame(updateCursor);

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Find all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleLinkHover);
            el.addEventListener('mouseleave', handleLinkLeave);
        });

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);

            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleLinkHover);
                el.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursorDotRef} className="cursor cursor--dot hidden"></div>
            <div ref={cursorRingRef} className="cursor cursor--ring hidden"></div>
        </>
    );
};

export default Cursor;
