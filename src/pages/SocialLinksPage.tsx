import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CustomCursor from '../components/CustomCursor';
import { Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type SocialLink = {
    id: number;
    platform: string;
    url: string;
    icon: string;
    bgColor: string;
    textColor: string;
};

export default function SocialLinksPage() {
    const { t } = useLanguage();
    const [links, setLinks] = useState<SocialLink[]>([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/social_links');
                const data = await res.json();
                if (Array.isArray(data)) {
                    // Separate phone number from links
                    const phoneData = data.find((item: any) => item.platform === '__PHONE__');
                    if (phoneData) {
                        setPhoneNumber(phoneData.url);
                        setLinks(data.filter((item: any) => item.platform !== '__PHONE__'));
                    } else {
                        setLinks(data);
                    }
                }
            } catch (err) {
                console.error("Failed to load social links", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLinks();
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0b1e 0%, #1a1535 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            position: 'relative'
        }}>
            <CustomCursor />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                    <ArrowLeft size={16} /> {t('back_to_home')}
                </Link>

                <div
                    style={{
                        width: '120px',
                        height: '120px',
                        background: 'linear-gradient(135deg, #7c3aed, #fbbf24)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        boxShadow: '0 0 40px rgba(124, 58, 237, 0.4)',
                        border: '4px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'white', letterSpacing: '-2px', margin: 0 }}>VM.</h1>
                </div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>
                    Viral Media
                </h2>

                <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '1rem', maxWidth: '80%' }}>
                    {t('hero_subtitle')}
                </p>

                {/* Phone Number Display */}
                {phoneNumber && (
                    <a
                        href={`tel:${phoneNumber}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: '#fbbf24',
                            textDecoration: 'none',
                            marginBottom: '3rem',
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(251, 191, 36, 0.1)',
                            borderRadius: '12px',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            transition: 'all 0.2s'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        {phoneNumber}
                    </a>
                )}

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {loading ? (
                        <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading...</p>
                    ) : links.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '2rem' }}>No links available yet.</p>
                    ) : (
                        links.map((link) => (
                            <motion.a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1.25rem 1.5rem',
                                    background: link.bgColor || 'rgba(255,255,255,0.05)',
                                    color: link.textColor || 'white',
                                    borderRadius: '16px',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '32px', display: 'flex', justifyContent: 'center' }}>
                                        <Share2 size={24} />
                                    </div>
                                    <span>{link.platform}</span>
                                </div>
                                <Share2 size={18} style={{ opacity: 0.7 }} />
                            </motion.a>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
