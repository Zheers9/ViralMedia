import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Portfolio() {
    const { t } = useLanguage();

    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/work')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error("Failed to load portfolio", err));
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
                            style={{
                                height: '300px',
                                backgroundColor: '#1a1a1a', // Fallback color
                                backgroundImage: project.image ? `url('${project.image}')` : undefined,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '16px',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'none'
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
                                <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                                    {project.category || 'Portfolio'}
                                </span>
                                <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{project.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
