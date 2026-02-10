import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import StarField from '../components/StarField';
import TextInput from '../components/inputs/TextInput';
import PasswordInput from '../components/inputs/PasswordInput';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [navigate]);

    // Pre-computed SHA-256 hashes for 'adminviral' and 'adminq1w2e3r$'
    const USER_HASH = 'ca2910d9b75c284d555d92b00d8fe3a03e26e48e18f20a7ef6ac1fed2af9f2af';
    const PASS_HASH = 'd1e06ddd9f87e14a703af58bec78f4b951ce9afa7a87c4da6727e452bc556118';

    const hashString = async (string: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Artificial delay to prevent timing attacks and simulate network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            const hashedEmail = await hashString(email);
            const hashedPass = await hashString(password);

            if (hashedEmail === USER_HASH && hashedPass === PASS_HASH) {
                // Set authentication flag
                localStorage.setItem('isAuthenticated', 'true');
                // Store timestamp for session expiry (optional but good practice)
                localStorage.setItem('loginTimestamp', Date.now().toString());
                navigate('/admin');
            } else {
                setError('Invalid username or password');
                setIsLoading(false);
            }
        } catch (err) {
            setError('An error occurred during login');
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at top right, #1a1625 0%, #0f0b1e 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <StarField />

            {/* Gradient Overlay for better text visibility */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, #0f0b1e 90%)',
                zIndex: 1,
                pointerEvents: 'none'
            }} />

            <CustomCursor />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    padding: '3rem 2rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    zIndex: 10
                }}
            >
                <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(to right, #fff, #9ca3af)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {t('login_welcome')}
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>{t('login_subtitle')}</p>
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.5)',
                            color: '#fca5a5', // light red
                            padding: '0.75rem',
                            borderRadius: '12px',
                            marginBottom: '1.5rem',
                            fontSize: '0.875rem',
                            textAlign: 'center'
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem', position: 'relative' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'var(--color-text)'
                        }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={20} style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--color-text-muted)'
                            }} />
                            <input
                                type="text"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="adminviral"
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-purple-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <PasswordInput
                            label={t('login_password')}
                            required
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </motion.div>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px var(--color-purple-glow)' }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'var(--color-purple-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: isLoading ? 'wait' : 'pointer',
                            opacity: isLoading ? 0.7 : 1,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {isLoading ? t('login_loading') : (
                            <>
                                {t('login_button')} <ArrowRight size={20} />
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
