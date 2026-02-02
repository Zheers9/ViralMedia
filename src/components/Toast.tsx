import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export type ToastType = 'success' | 'error';
export type ToastMessage = { id: number; message: string; type: ToastType };

const Toast = ({ message, type, onClose }: { message: string, type: ToastType, onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            style={{
                background: type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${type === 'success' ? '#10b981' : '#ef4444'}`,
                padding: '1rem 1.5rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                color: 'white',
                minWidth: '300px',
                pointerEvents: 'auto'
            }}
        >
            {type === 'success' ? <CheckCircle color="#10b981" size={24} /> : <XCircle color="#ef4444" size={24} />}
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{message}</span>
        </motion.div>
    );
};

export const ToastContainer = ({ toasts, removeToast }: { toasts: ToastMessage[], removeToast: (id: number) => void }) => (
    <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100002, // Higher than modal
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        pointerEvents: 'none'
    }}>
        <AnimatePresence>
            {toasts.map(toast => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
            ))}
        </AnimatePresence>
    </div>
);
