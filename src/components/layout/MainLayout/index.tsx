import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Cursor from '../../ui/Cursor';
import Loader from '../../ui/Loader';
import './MainLayout.scss';

const MainLayout: React.FC = () => {
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true);

    // იმიტირება საიტის ჩატვირთვის
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // სქროლის დაბრუნება თავში გვერდის ცვლილებისას
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="main-layout">
                    <Cursor />
                    <Header />
                    <main className="main-layout__content">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default MainLayout;