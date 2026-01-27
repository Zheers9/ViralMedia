import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function Hero() {
    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Transform mouse position to parallax values
    const bgX = useTransform(x, [-window.innerWidth / 2, window.innerWidth / 2], [-20, 20]);
    const bgY = useTransform(y, [-window.innerHeight / 2, window.innerHeight / 2], [-20, 20]);

    const blob1X = useTransform(x, [-window.innerWidth / 2, window.innerWidth / 2], [-50, 50]);
    const blob1Y = useTransform(y, [-window.innerHeight / 2, window.innerHeight / 2], [-50, 50]);

    const blob2X = useTransform(x, [-window.innerWidth / 2, window.innerWidth / 2], [30, -30]);
    const blob2Y = useTransform(y, [-window.innerHeight / 2, window.innerHeight / 2], [30, -30]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate mouse position relative to center of screen
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX.set(e.clientX - centerX);
            mouseY.set(e.clientY - centerY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Image with Parallax */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-5%',
                    left: '-5%',
                    width: '110%',
                    height: '110%',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    x: bgX,
                    y: bgY,
                    zIndex: -3
                }}
            />

            {/* Dark Overlay for better text readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.85) 100%)',
                zIndex: -2
            }} />

            {/* Animated Background Elements with Parallax */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(40px)',
                    x: blob1X,
                    y: blob1Y,
                    zIndex: -1
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(40px)',
                    x: blob2X,
                    y: blob2Y,
                    zIndex: -1
                }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 7, repeat: Infinity }}
            />

            <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        fontSize: 'clamp(3rem, 10vw, 8rem)',
                        fontWeight: 900,
                        lineHeight: 0.9,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, #f3f4f6, #9ca3af)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em'
                    }}
                >
                    VIRAL <span style={{ color: 'transparent', WebkitTextStroke: '2px #fbbf24' }}>MEDIA</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                        color: '#9ca3af',
                        maxWidth: '600px',
                        margin: '0 auto 3rem auto'
                    }}
                >
                    Reinventing University Media with <span style={{ color: '#fbbf24' }}>shocking</span> creativity.
                </motion.p>

                <motion.button
                    className="btn"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    Explore Work
                </motion.button>
            </div>

            <motion.div
                style={{ position: 'absolute', bottom: 40 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div style={{
                    width: 20,
                    height: 35,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: 15,
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 5
                }}>
                    <div style={{ width: 4, height: 8, background: '#fbbf24', borderRadius: 2 }} />
                </div>
            </motion.div>
        </section>
    );
}
