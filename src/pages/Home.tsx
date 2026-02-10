import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

export default function Home() {
    return (
        <main style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <CustomCursor />
            <Navbar />

            <Hero />
            <Services />
            <Portfolio />
            <Contact />
        </main>
    );
}
