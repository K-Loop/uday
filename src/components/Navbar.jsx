import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, ease } from '../utils/constants.js';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.08] bg-[#0b0b0b]/85 backdrop-blur-xl text-[#F4F0E8] transition-all duration-300">
            <div className="mx-auto flex max-w-[1560px] items-center justify-between px-6 py-4 md:px-12">
                {/* Left: Pill links */}
                <div className="hidden lg:flex items-center gap-3">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-300 ${
                                isActive
                                    ? 'border border-[#C5A880]/60 bg-[#C5A880]/10 text-[#C5A880]'
                                    : 'border border-white/10 text-[#F4F0E8]/70 hover:border-white/30 hover:text-[#F4F0E8]'
                            }`
                        }
                    >
                        HOME ✦
                    </NavLink>
                    <NavLink
                        to="/collections"
                        className={({ isActive }) =>
                            `rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-300 ${
                                isActive
                                    ? 'border border-[#C5A880]/60 bg-[#C5A880]/10 text-[#C5A880]'
                                    : 'border border-white/10 text-[#F4F0E8]/70 hover:border-white/30 hover:text-[#F4F0E8]'
                            }`
                        }
                    >
                        COLLECTIONS ✦
                    </NavLink>
                </div>

                {/* Center: Brand Monogram / Logo */}
                <Link to="/" className="text-center group">
                    <span className="font-serif text-2xl md:text-3xl font-normal tracking-[0.22em] text-[#F4F0E8] transition-colors group-hover:text-[#C5A880]">
                        • UDAY ARTS •
                    </span>
                    <span className="block text-[8px] uppercase tracking-[0.35em] text-[#C5A880] mt-0.5">
                        Murals · Reliefs · Sculpture
                    </span>
                </Link>

                {/* Right: Secondary Links & Commission */}
                <div className="hidden lg:flex items-center gap-6">
                    <NavLink
                        to="/craft"
                        className={({ isActive }) =>
                            `text-xs uppercase tracking-[0.2em] transition-colors ${
                                isActive ? 'text-[#C5A880]' : 'text-[#F4F0E8]/70 hover:text-[#F4F0E8]'
                            }`
                        }
                    >
                        Our Craft
                    </NavLink>
                    <NavLink
                        to="/studio"
                        className={({ isActive }) =>
                            `text-xs uppercase tracking-[0.2em] transition-colors ${
                                isActive ? 'text-[#C5A880]' : 'text-[#F4F0E8]/70 hover:text-[#F4F0E8]'
                            }`
                        }
                    >
                        Studio
                    </NavLink>
                    <Link
                        to="/contact"
                        className="rounded-full border border-white/20 bg-transparent px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-[#F4F0E8] transition-all duration-300 hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-[#0b0b0b]"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile hamburger menu toggle */}
                <div className="flex items-center gap-3 lg:hidden">
                    <Link
                        to="/contact"
                        className="rounded-full border border-white/20 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#C5A880]"
                    >
                        Contact
                    </Link>
                    <button
                        className="p-2 text-[#F4F0E8] hover:text-[#C5A880] transition-colors"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="lg:hidden overflow-hidden border-t border-white/10 bg-[#0e0e0e]/98 text-[#F4F0E8]"
                    >
                        <div className="flex flex-col gap-5 px-6 py-8">
                            {nav.map(([n, p]) => (
                                <Link
                                    key={p}
                                    to={p}
                                    className="font-serif text-2xl tracking-wider hover:text-[#C5A880] transition-colors"
                                >
                                    {n}
                                </Link>
                            ))}
                            <Link
                                to="/contact"
                                className="mt-2 inline-flex items-center justify-center rounded-full bg-[#C5A880] px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#0b0b0b]"
                            >
                                Commission a Work
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

