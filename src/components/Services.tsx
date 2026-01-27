import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Share2, PenTool, Zap } from 'lucide-react';
import { useRef } from 'react';

const services = [
    {
        icon: <Camera size={60} />,
        title: "Video Production",
        desc: "Cinematic storytelling for campus events and promotional content. We capture the essence of university life with stunning visuals.",
        bgImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80"
    },
    {
        icon: <Share2 size={60} />,
        title: "Social Growth",
        desc: "Viral strategies to explode your university's online presence. We turn academic content into engaging social media phenomena.",
        bgImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80"
    },
    {
        icon: <PenTool size={60} />,
        title: "Creative Branding",
        desc: "Bold visual identities that stand out in the academic world. We create memorable brands that resonate with students.",
        bgImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&q=80"
    },
    {
        icon: <Zap size={60} />,
        title: "Live Coverage",
        desc: "Real-time, high-energy coverage of sports and ceremonies. We bring the excitement of campus events to life.",
        bgImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
    }
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div id="services" ref={containerRef} style={{ position: 'relative' }}>
            {/* Vertical Progress Line */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: '2rem',
                    top: '20%',
                    bottom: '20%',
                    width: '4px',
                    background: 'rgba(255,255,255,0.1)',
                    zIndex: 100,
                    borderRadius: '2px'
                }}
            >
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(180deg, #7c3aed, #fbbf24)',
                        borderRadius: '2px',
                        scaleY: scrollYProgress,
                        transformOrigin: 'top',
                        boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                    }}
                />
            </motion.div>

            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    padding: '6rem 2rem 2rem 2rem',
                    textAlign: 'center',
                    background: '#0a0a0a'
                }}
            >
                <h2 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    marginBottom: '1rem',
                    background: 'linear-gradient(to right, #7c3aed, #fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Our Power
                </h2>
                <p style={{ color: '#9ca3af', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Scroll to explore our capabilities
                </p>
            </motion.div>

            {/* Service Sections */}
            {services.map((service, index) => (
                <ServiceSection key={index} service={service} />
            ))}
        </div>
    );
}

function ServiceSection({ service }: { service: typeof services[0] }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

    return (
        <section
            ref={sectionRef}
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Image */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${service.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    scale: scale,
                    zIndex: -2
                }}
            />

            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.85) 100%)',
                zIndex: -1
            }} />

            {/* Content */}
            <motion.div
                className="container"
                style={{
                    opacity,
                    y,
                    textAlign: 'center',
                    zIndex: 1
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    viewport={{ once: true }}
                    style={{
                        color: '#fbbf24',
                        marginBottom: '2rem',
                        display: 'inline-block'
                    }}
                >
                    {service.icon}
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        marginBottom: '1.5rem',
                        fontWeight: 900,
                        background: 'linear-gradient(to right, #f3f4f6, #9ca3af)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    {service.title}
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                        color: '#d1d5db',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.8
                    }}
                >
                    {service.desc}
                </motion.p>
            </motion.div>
        </section>
    );
}
