import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import StarField from '../components/StarField';
import TextInput from '../components/inputs/TextInput';
import PasswordInput from '../components/inputs/PasswordInput';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            navigate('/admin');
        }, 1500);
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
                        Welcome Back
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Enter your credentials to access the admin panel.</p>
                </motion.div>

                <form onSubmit={handleSubmit}>
                    <motion.div variants={itemVariants}>
                        <TextInput
                            label="Email Address"
                            icon={Mail}
                            type="email"
                            required
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <PasswordInput
                            label="Password"
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
                        {isLoading ? 'Signing in...' : (
                            <>
                                Sign In <ArrowRight size={20} />
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
