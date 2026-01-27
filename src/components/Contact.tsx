import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section id="contact" style={{ padding: '8rem 0', background: '#0a0a0a', position: 'relative' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}
                >
                    Ready to go <span className="text-yellow">Viral</span>?
                </motion.h2>

                <motion.form
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <input
                            type="text"
                            placeholder="Name"
                            style={inputStyle}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            style={inputStyle}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        style={inputStyle}
                    />
                    <textarea
                        rows={5}
                        placeholder="Tell us about your project..."
                        style={inputStyle}
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn"
                        style={{ marginTop: '1rem', width: '100%', borderRadius: '8px' }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>

                <footer style={{ marginTop: '6rem', color: '#6b7280', fontSize: '0.9rem' }}>
                    &copy; 2026 Viral Media. All rights reserved.
                </footer>
            </div>
        </section>
    );
}

const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '1rem',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    width: '100%'
};
