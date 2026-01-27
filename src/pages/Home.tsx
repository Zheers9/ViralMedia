import CustomCursor from '../components/CustomCursor';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

export default function Home() {
    return (
        <main style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <CustomCursor />

            {/* Navigation (Simple Overlay) */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 50,
                mixBlendMode: 'difference'
            }}>
                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: 'white' }}>VM.</div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    {['Services', 'Portfolio', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </nav>

            <Hero />
            <Services />
            <Portfolio />
            <Contact />
        </main>
    );
}
