import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Edit2, Trash2, Briefcase, Award, Mail } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';

type Skill = {
    id: number;
    name: string;
    category: string;
};

type Work = {
    id: number;
    title: string;
    description: string;
    image: string;
};

type Contact = {
    id: number;
    name: string;
    email: string;
    message: string;
    date: string;
};

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'skills' | 'work' | 'contacts'>('skills');

    // Sample data
    const [skills, setSkills] = useState<Skill[]>([
        { id: 1, name: 'Video Editing', category: 'Production' },
        { id: 2, name: 'Social Media Marketing', category: 'Marketing' },
        { id: 3, name: 'Graphic Design', category: 'Design' },
    ]);

    const [works, setWorks] = useState<Work[]>([
        { id: 1, title: 'Campus Event 2024', description: 'Annual university celebration', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400' },
        { id: 2, title: 'Sports Highlights', description: 'Basketball championship coverage', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400' },
    ]);

    const [contacts, setContacts] = useState<Contact[]>([
        { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Interested in video production services', date: '2024-01-20' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Need help with social media campaign', date: '2024-01-22' },
    ]);

    const tabs = [
        { id: 'skills', label: 'Skills', icon: <Award size={20} />, count: skills.length },
        { id: 'work', label: 'Work', icon: <Briefcase size={20} />, count: works.length },
        { id: 'contacts', label: 'Contacts', icon: <Mail size={20} />, count: contacts.length },
    ];

    return (
        <>
            <CustomCursor />
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f0b1e 0%, #1a1535 100%)',
                padding: '2rem'
            }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginBottom: '3rem'
                    }}
                >
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(to right, #7c3aed, #fbbf24)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Admin Dashboard
                    </h1>
                    <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>
                        Manage your viral media content
                    </p>
                </motion.div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                }}>
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.id as any)}
                            style={{
                                padding: '1rem 2rem',
                                background: activeTab === tab.id
                                    ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                                    : 'rgba(255,255,255,0.05)',
                                border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontSize: '1rem',
                                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                                transition: 'all 0.3s ease',
                                boxShadow: activeTab === tab.id ? '0 4px 20px rgba(124, 58, 237, 0.4)' : 'none'
                            }}
                        >
                            {tab.icon}
                            {tab.label}
                            <span style={{
                                background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(251,191,36,0.2)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.875rem',
                                fontWeight: 'bold'
                            }}>
                                {tab.count}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'skills' && <SkillsSection skills={skills} setSkills={setSkills} />}
                    {activeTab === 'work' && <WorkSection works={works} setWorks={setWorks} />}
                    {activeTab === 'contacts' && <ContactsSection contacts={contacts} setContacts={setContacts} />}
                </motion.div>
            </div>
        </>
    );
}

// Skills Section
function SkillsSection({ skills, setSkills }: { skills: Skill[], setSkills: (skills: Skill[]) => void }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: '', category: '' });

    const handleAdd = () => {
        if (newSkill.name && newSkill.category) {
            setSkills([...skills, { id: Date.now(), ...newSkill }]);
            setNewSkill({ name: '', category: '' });
            setShowAddForm(false);
        }
    };

    const handleDelete = (id: number) => {
        setSkills(skills.filter(s => s.id !== id));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Skills Management</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={20} />
                    Add Skill
                </motion.button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        marginBottom: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Skill Name"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                            style={{
                                padding: '0.75rem',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                            style={{
                                padding: '0.75rem',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <button onClick={handleAdd} className="btn">Save Skill</button>
                </motion.div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {skills.map((skill) => (
                    <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            position: 'relative'
                        }}
                    >
                        <div style={{ marginBottom: '1rem' }}>
                            <span style={{
                                background: 'rgba(124,58,237,0.2)',
                                color: '#a78bfa',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>
                                {skill.category}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '1rem' }}>{skill.name}</h3>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    padding: '0.5rem',
                                    background: 'rgba(251,191,36,0.2)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fbbf24',
                                    cursor: 'pointer'
                                }}
                            >
                                <Edit2 size={16} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(skill.id)}
                                style={{
                                    padding: '0.5rem',
                                    background: 'rgba(239,68,68,0.2)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#ef4444',
                                    cursor: 'pointer'
                                }}
                            >
                                <Trash2 size={16} />
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Work Section
function WorkSection({ works, setWorks }: { works: Work[], setWorks: (works: Work[]) => void }) {
    const handleDelete = (id: number) => {
        setWorks(works.filter(w => w.id !== id));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Work Portfolio</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={20} />
                    Add Work
                </motion.button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {works.map((work) => (
                    <motion.div
                        key={work.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            height: '200px',
                            backgroundImage: `url(${work.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '0.5rem' }}>{work.title}</h3>
                            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>{work.description}</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(251,191,36,0.2)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fbbf24',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDelete(work.id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(239,68,68,0.2)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Contacts Section
function ContactsSection({ contacts, setContacts }: { contacts: Contact[], setContacts: (contacts: Contact[]) => void }) {
    const handleDelete = (id: number) => {
        setContacts(contacts.filter(c => c.id !== id));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', color: 'white' }}>Contact Messages</h2>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {contacts.map((contact) => (
                    <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 5 }}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            gap: '1rem',
                            alignItems: 'start'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', color: 'white' }}>{contact.name}</h3>
                                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{contact.date}</span>
                            </div>
                            <p style={{ color: '#a78bfa', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{contact.email}</p>
                            <p style={{ color: '#d1d5db', lineHeight: 1.6 }}>{contact.message}</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(contact.id)}
                            style={{
                                padding: '0.5rem',
                                background: 'rgba(239,68,68,0.2)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#ef4444',
                                cursor: 'pointer'
                            }}
                        >
                            <Trash2 size={20} />
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
