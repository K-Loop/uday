import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Progress from './components/Progress.jsx';

import Home from './pages/Home.jsx';
import Collections from './pages/Collections.jsx';
import Craft from './pages/Craft.jsx';
import Studio from './pages/Studio.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import { AmbientGlowProvider, useAmbientGlow } from './context/AmbientGlowContext.jsx';

function GlobalAmbientBackground() {
    const { glowColor } = useAmbientGlow();

    return (
        <div
            aria-hidden
            className="fixed inset-0 pointer-events-none -z-0 overflow-hidden transition-opacity duration-1000 ease-out"
            style={{ opacity: glowColor ? 1 : 0 }}
        >
            {/* Massive central radial glow illuminating the whole screen */}
            <div
                className="absolute inset-0 transition-all duration-1000 ease-out"
                style={{
                    background: glowColor
                        ? `radial-gradient(ellipse 90% 80% at 50% 50%, ${glowColor} 0%, transparent 75%)`
                        : 'transparent',
                }}
            />
            {/* Secondary atmospheric diffusion layer */}
            <div
                className="absolute inset-0 transition-all duration-1000 ease-out"
                style={{
                    background: glowColor
                        ? `radial-gradient(circle at 50% 40%, ${glowColor} 0%, transparent 60%)`
                        : 'transparent',
                    filter: 'blur(80px)',
                }}
            />
        </div>
    );
}

export default function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (!pathname.startsWith('/collections')) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return (
        <AmbientGlowProvider>
            <div className="relative min-h-screen bg-[#0b0b0b] text-[#F4F0E8] overflow-x-hidden">
                <GlobalAmbientBackground />
                <Progress />
                <a href="#main" className="sr-only focus:not-sr-only">
                    Skip to content
                </a>
                <Navbar />
                <div id="main" className="relative z-10">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/collections/:slug?" element={<Collections />} />
                        <Route path="/craft" element={<Craft />} />
                        <Route path="/studio" element={<Studio />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </AmbientGlowProvider>
    );
}
