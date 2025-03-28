import React, { useEffect, useRef } from 'react';
import './Cursor.scss';

const Cursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // კურსორის პოზიციონირება
            cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;

            // მიმყოლი კურსორის პოზიციონირება მცირე დაყოვნებით
            setTimeout(() => {
                follower.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
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
            cursor.classList.add('hover');
            follower.classList.add('hover');
        };

        const handleLinkLeave = () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        // აღმოაჩენს ყველა ინტერაქტიულ ელემენტს
        const links = document.querySelectorAll('a, button, .interactive');
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
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor hidden"></div>
            <div ref={followerRef} className="cursor-follower hidden"></div>
        </>
    );
};

export default Cursor;