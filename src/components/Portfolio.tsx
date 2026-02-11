import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

import workData from '../data/work/data.json';

const getImagePath = (path: string) => {
    if (!path || path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};

export default function Portfolio() {
    const { t } = useLanguage();

    const [projects, setProjects] = useState<any[]>(workData);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    useEffect(() => {
        // Optional: specific logic if needed on mount, but data is now static
        // Keep fetch if you want to support local dynamic updates, but fallback is handled by initial state
        fetch('http://localhost:3001/api/work')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(() => console.log("Using static portfolio data"));
    }, []);

    return (
        <section id="portfolio" style={{ padding: '8rem 0' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: '3rem',
                        marginBottom: '4rem',
                        textAlign: 'right',
                        marginRight: '1rem',
                        borderRight: '5px solid #fbbf24',
                        paddingRight: '1rem'
                    }}
                >
                    {t('portfolio_title')}
                </motion.h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.03 }}
                            onClick={() => setSelectedProject(project)}
                            style={{
                                height: '300px',
                                backgroundColor: '#1a1a1a', // Fallback color
                                backgroundImage: project.image ? `url('${getImagePath(project.image)}')` : undefined,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '16px',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '2rem'
                            }}>
                                {project.category && (
                                    <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                                        {project.category}
                                    </span>
                                )}
                                <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{project.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 50,
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: '#050816',
                                maxWidth: '900px',
                                width: '92%',
                                borderRadius: '1.25rem',
                                overflow: 'hidden',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.7)',
                                color: 'white',
                                border: '1px solid rgba(148,163,184,0.25)'
                            }}
                        >
                            {selectedProject.image && (
                                <div style={{ maxHeight: '420px', overflow: 'hidden', position: 'relative' }}>
                                    <motion.img
                                        src={getImagePath(selectedProject.image)}
                                        alt={selectedProject.title}
                                        initial={{ scale: 1.05, y: 0 }}
                                        animate={{
                                            scale: [1.05, 1.12, 1.05],
                                            y: [0, -18, 0]
                                        }}
                                        transition={{
                                            duration: 16,
                                            repeat: Infinity,
                                            repeatType: 'mirror',
                                            ease: 'easeInOut'
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transformOrigin: 'center center',
                                            filter: 'saturate(1.05) contrast(1.05)'
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1) 40%, transparent)'
                                        }}
                                    />
                                </div>
                            )}
                            <div style={{ padding: '1.9rem 2.1rem', position: 'relative' }}>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '1.3rem',
                                        right: '1.7rem',
                                        background: 'rgba(15,23,42,0.85)',
                                        borderRadius: '999px',
                                        border: '1px solid rgba(148,163,184,0.5)',
                                        color: '#E5E7EB',
                                        fontSize: '1.3rem',
                                        cursor: 'pointer',
                                        width: '2.1rem',
                                        height: '2.1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        lineHeight: 1,
                                        transition: 'background 0.15s ease, transform 0.15s ease'
                                    }}
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                                {selectedProject.category && (
                                    <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                                        {selectedProject.category}
                                    </span>
                                )}
                                <h3 style={{ fontSize: '2.1rem', margin: '0.65rem 0 1.1rem' }}>
                                    {selectedProject.title}
                                </h3>
                                <p style={{ lineHeight: 1.8, color: '#D1D5DB', whiteSpace: 'pre-line', fontSize: '0.98rem' }}>
                                    {selectedProject.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
