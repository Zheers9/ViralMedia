import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();
    return (
        <section id="contact" style={{ padding: '8rem 0', background: '#0a0a0a', position: 'relative' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}
                >
                    {t('contact_title')} <span className="text-yellow">{t('contact_title_highlight')}</span>?
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
                            placeholder={t('contact_name_placeholder')}
                            style={inputStyle}
                        />
                        <input
                            type="email"
                            placeholder={t('contact_email_placeholder')}
                            style={inputStyle}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder={t('contact_subject_placeholder')}
                        style={inputStyle}
                    />
                    <textarea
                        rows={5}
                        placeholder={t('contact_message_placeholder')}
                        style={inputStyle}
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn"
                        style={{ marginTop: '1rem', width: '100%', borderRadius: '8px' }}
                    >
                        {t('contact_send_btn')}
                    </motion.button>
                </motion.form>

                <footer style={{ marginTop: '6rem', color: '#6b7280', fontSize: '0.9rem' }}>
                    {t('footer_rights')}
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
