import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// --- Flag Icons Component ---
const FlagIcon = ({ country, size = 24 }: { country: 'iq' | 'gb' | 'krd', size?: number }) => {
    if (country === 'gb') {
        return (
            <svg width={size} height={size} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="30" fill="#012169" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="white" strokeWidth="6" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
                <path d="M30,0 L30,30 M0,15 L60,15" stroke="white" strokeWidth="10" />
                <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6" />
            </svg>
        );
    }
    if (country === 'iq') {
        return (
            <svg width={size} height={size} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="40" fill="white" />
                <rect y="0" width="60" height="13.33" fill="#CE1126" />
                <rect y="26.66" width="60" height="13.33" fill="black" />
                <text x="30" y="24" fontSize="10" textAnchor="middle" fill="#007A3D" fontFamily="serif" fontWeight="bold">الله اكبر</text>
            </svg>
        );
    }
    if (country === 'krd') {
        return (
            <svg width={size} height={size} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="40" fill="white" />
                <rect y="0" width="60" height="13.33" fill="#CE1126" />
                <rect y="26.66" width="60" height="13.33" fill="#007A3D" />
                <g transform="translate(30, 20)">
                    <circle r="5" fill="#FFC000" />
                    {[...Array(21)].map((_, i) => (
                        <path
                            key={i}
                            d="M0,-8 L2,-5 L0,-4 L-2,-5 Z"
                            fill="#FFC000"
                            transform={`rotate(${i * (360 / 21)})`}
                        />
                    ))}
                </g>
            </svg>
        );
    }
    return null;
};

// --- Language Dropdown Component ---
const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', label: 'English (UK)', name: 'English', flag: 'gb' },
        { code: 'ar', label: 'العربية (Iraq)', name: 'العربية', flag: 'iq' },
        { code: 'ku', label: 'کوردی (Kurdistan)', name: 'کوردی', flag: 'krd' }
    ] as const;

    const currentLang = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        // Only attach click outside listener for desktop dropdown
        if (!mobile) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [mobile]);

    const handleSelect = (code: 'en' | 'ar' | 'ku') => {
        setLanguage(code);
        setIsOpen(false);
    };

    if (mobile) {
        return (
            <div style={{ width: '100%', maxWidth: '200px', margin: '0 auto', position: 'relative' }}>
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                        color: 'white'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <FlagIcon country={currentLang.flag} size={24} />
                        <span style={{ fontSize: '1rem', fontWeight: 600 }}>{currentLang.name}</span>
                    </div>
                    <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{
                                overflow: 'hidden',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            {languages.map((lang) => (
                                <motion.button
                                    key={lang.code}
                                    onClick={() => handleSelect(lang.code)}
                                    whileTap={{ background: 'rgba(255,255,255,0.1)' }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: language === lang.code ? 'rgba(255,255,255,0.05)' : 'transparent',
                                        border: 'none',
                                        width: '100%',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid rgba(255,255,255,0.02)'
                                    }}
                                >
                                    <FlagIcon country={lang.flag} size={20} />
                                    <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: language === lang.code ? 700 : 400 }}>
                                        {lang.name}
                                    </span>
                                    {language === lang.code && (
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24', marginLeft: 'auto' }} />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50px',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    color: 'white',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <FlagIcon country={currentLang.flag} size={20} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{currentLang.name}</span>
                <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '120%',
                            right: document.dir === 'rtl' ? 'auto' : 0,
                            left: document.dir === 'rtl' ? 0 : 'auto',
                            background: 'rgba(20, 20, 30, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            minWidth: '220px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            zIndex: 1000
                        }}
                    >
                        {languages.map((lang) => (
                            <motion.button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                whileHover={{ background: 'rgba(255,255,255,0.1)' }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.75rem 1rem',
                                    background: 'transparent',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    width: '100%',
                                    textAlign: 'left'
                                }}
                            >
                                <FlagIcon country={lang.flag} size={24} />
                                <span style={{ color: 'white', fontSize: '0.95rem', fontWeight: language === lang.code ? 700 : 400 }}>
                                    {lang.label}
                                </span>
                                {language === lang.code && (
                                    <motion.div
                                        layoutId="activeLang"
                                        style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: '#fbbf24',
                                            marginLeft: 'auto'
                                        }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Navbar() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    }, []);

    const navLinks = [
        { name: t('nav_services'), href: '/#services' },
        { name: t('nav_portfolio'), href: '/#portfolio' },
        { name: t('nav_contact'), href: '/links' },
    ];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close mobile menu on resize if screen becomes large
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 900) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuVariants = {
        closed: {
            x: '100%',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        },
        open: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    } as const;

    const linkVariants = {
        closed: { x: 50, opacity: 0 },
        open: { x: 0, opacity: 1 }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 100,
                    background: scrolled ? 'rgba(15, 11, 30, 0.8)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(10px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    transition: 'all 0.4s ease'
                }}
            >
                <style>{`
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: flex !important;
                    }
                    .mobile-menu {
                        display: flex !important;
                    }

                    @media (min-width: 900px) {
                        .desktop-nav {
                            display: flex !important;
                        }
                        .mobile-toggle {
                            display: none !important;
                        }
                        .mobile-menu {
                            display: none !important;
                        }
                    }
                `}</style>

                {/* Logo */}
                <div style={{ zIndex: 101 }}>
                    <a href="#" style={{
                        fontWeight: 900,
                        fontSize: '1.8rem',
                        color: 'white',
                        textDecoration: 'none',
                        letterSpacing: '-1px'
                    }}>
                        VM<span style={{ color: 'var(--color-purple-primary)' }}>.</span>
                    </a>
                </div>

                {/* Desktop Navigation */}
                <div className="desktop-nav" style={{ gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="nav-link"
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {item.name}
                            <motion.span
                                className="underline"
                                style={{
                                    position: 'absolute',
                                    bottom: -4,
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    background: 'var(--color-purple-primary)',
                                    originX: 0
                                }}
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    ))}

                    <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)' }}></div>

                    {/* Desktop Language Switcher */}
                    <LanguageSwitcher />

                    {isAuthenticated ? (
                        <Link to="/admin" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    padding: 0,
                                    background: 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
                                }}
                            >
                                <User size={20} />
                            </motion.button>
                        </Link>
                    ) : (
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '0.8rem 1rem',
                                    background: 'transparent',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '50px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {t('nav_signin')}
                            </motion.button>
                        </Link>
                    )}

                    <Link to="/links">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '0.8rem 1.8rem',
                                background: 'white',
                                color: 'var(--color-bg)',
                                border: 'none',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            {t('nav_letstalk')}
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Toggle Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mobile-toggle"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        zIndex: 101,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px'
                    }}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </motion.button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '100%',
                            height: '100vh',
                            background: 'var(--color-bg)',
                            zIndex: 99,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem'
                        }}
                    >
                        {/* Background decoration */}
                        <div style={{
                            position: 'absolute',
                            top: '-20%',
                            right: '-20%',
                            width: '600px',
                            height: '600px',
                            background: 'radial-gradient(circle, var(--color-purple-primary) 0%, transparent 70%)',
                            opacity: 0.2,
                            filter: 'blur(80px)',
                            pointerEvents: 'none'
                        }}></div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            textAlign: 'center',
                            width: '100%',
                            maxWidth: '300px'
                        }}>
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        position: 'relative'
                                    }}
                                >
                                    <motion.div
                                        variants={linkVariants}
                                        whileHover={{ scale: 1.1, color: 'var(--color-yellow)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                    </motion.div>
                                </Link>
                            ))}

                            <motion.div variants={linkVariants} style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '100%' }} />

                            {/* Mobile Language Switcher */}
                            <motion.div variants={linkVariants}>
                                <LanguageSwitcher mobile />
                            </motion.div>

                            <motion.div variants={linkVariants}>
                                {isAuthenticated ? (
                                    <Link to="/admin" onClick={() => setIsOpen(false)} style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <User size={24} /> {t('admin_dashboard')}
                                    </Link>
                                ) : (
                                    <Link to="/login" onClick={() => setIsOpen(false)} style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        position: 'relative'
                                    }}>
                                        {t('nav_accesslogin')}
                                    </Link>
                                )}
                            </motion.div>
                        </div>

                        <motion.div
                            variants={linkVariants}
                            style={{ marginTop: '3rem' }}
                        >
                            <Link to="/links" onClick={() => setIsOpen(false)}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '1rem 3rem',
                                        background: 'var(--color-purple-primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50px',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                        boxShadow: '0 0 20px var(--color-purple-glow)'
                                    }}
                                >
                                    {t('nav_getintouch')}
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
