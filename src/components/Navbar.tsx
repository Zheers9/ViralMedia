import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
    }, [isOpen]);

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
                <div className="desktop-nav" style={{ display: 'none', gap: '3rem', alignItems: 'center' }}>
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
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
                        </a>
                    ))}

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
                        Let's Talk
                    </motion.button>
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
                        display: 'flex',
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
                            display: 'flex',
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
                            gap: '2.5rem',
                            textAlign: 'center'
                        }}>
                            {navLinks.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    variants={linkVariants}
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
                                    whileHover={{ scale: 1.1, color: 'var(--color-yellow)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>

                        <motion.div
                            variants={linkVariants}
                            style={{ marginTop: '4rem' }}
                        >
                            <motion.button
                                onClick={() => setIsOpen(false)}
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
                                Get in Touch
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
