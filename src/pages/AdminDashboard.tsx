import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
    LayoutDashboard,
    Briefcase,
    Award,
    Mail,
    Settings,
    Search,
    Bell,
    User,
    LogOut,
    Plus,
    Eye,
    Users,
    Edit2,
    Trash2
} from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import StarField from '../components/StarField';
import { ToastContainer, type ToastMessage, type ToastType } from '../components/Toast';



// --- Types ---
type Skill = { id: number; name: string; category: string };
type Work = { id: number; title: string; description: string; image: string; category?: string };
type Contact = { id: number; name: string; email: string; message: string; date: string };

// --- Constants ---
const API_URL = 'http://localhost:3001/api';

const initialStats = [
    { label: 'Total Views', value: '2.4M', change: '+12%', icon: Eye, color: '#fbbf24' },
    { label: 'Projects', value: '142', change: '+5%', icon: Briefcase, color: '#7c3aed' },
    { label: 'Clients', value: '89', change: '+18%', icon: Users, color: '#34d399' },
    { label: 'Skills', value: '24', change: '+2', icon: Award, color: '#f472b6' },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
        whileTap={{ scale: 0.95 }}
        style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.5rem',
            background: active ? 'linear-gradient(90deg, rgba(124, 58, 237, 0.15) 0%, transparent 100%)' : 'transparent',
            border: 'none',
            borderLeft: active ? '3px solid #7c3aed' : '3px solid transparent',
            color: active ? '#fff' : '#9ca3af',
            cursor: 'pointer',
            textAlign: 'left',
            fontSize: '0.95rem',
            fontWeight: active ? 600 : 500,
            transition: 'color 0.2s',
            marginBottom: '0.5rem'
        }}
    >
        <Icon size={20} color={active ? '#7c3aed' : 'currentColor'} />
        {label}
    </motion.button>
);

const StatCard = ({ stat, index }: { stat: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
        style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '20px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backdropFilter: 'blur(10px)'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: `${stat.color}20` }}>
                <stat.icon size={24} color={stat.color} />
            </div>
            <span style={{
                color: '#34d399',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                background: 'rgba(52, 211, 153, 0.1)',
                padding: '0.25rem 0.5rem',
                borderRadius: '20px'
            }}>
                {stat.change}
            </span>
        </div>
        <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>{stat.value}</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{stat.label}</p>
        </div>
    </motion.div>
);

// --- Modal Component (Portal) ---
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    // Prevent scrolling when modal is open
    if (typeof document !== 'undefined') {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 9998,
                        }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-40%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-40%' }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)', // Use translate for centering along with left/top 50%
                            width: '90%',
                            maxWidth: '500px',
                            background: '#1a1535',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            borderRadius: '24px',
                            padding: '2rem',
                            zIndex: 9999,
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', margin: 0 }}>{title}</h3>
                            <motion.button
                                whileHover={{ rotate: 90, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#9ca3af',
                                    cursor: 'pointer',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%'
                                }}
                            >
                                <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>&times;</span>
                            </motion.button>
                        </div>
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

// --- Sub-Components (Standard State) ---

function SkillsSection({ showToast }: { showToast: (msg: string, type: ToastType) => void }) {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [skillToDelete, setSkillToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '', category: '' });

    const fetchSkills = async () => {
        try {
            const res = await fetch(`${API_URL}/skills`);
            const data = await res.json();
            if (Array.isArray(data)) setSkills(data);
        } catch (err) {
            console.error(err);
            showToast("Failed to load skills", "error");
        }
    };

    useState(() => {
        fetchSkills();
    });

    const handleSave = async () => {
        if (!formData.name) {
            showToast("Please enter a skill name!", "error");
            return;
        }

        try {
            let res;
            if (editingSkill) {
                res = await fetch(`${API_URL}/skills/${editingSkill.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                res = await fetch(`${API_URL}/skills`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }

            if (res.ok) {
                showToast(editingSkill ? "Skill updated!" : "Skill added!", "success");
                fetchSkills(); // Refresh
                closeModal();
            } else {
                showToast("Failed to save skill", "error");
            }
        } catch (err) {
            showToast("Error saving skill", "error");
        }
    };

    const openAddModal = () => {
        setEditingSkill(null);
        setFormData({ name: '', category: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (skill: Skill) => {
        setEditingSkill(skill);
        setFormData({ name: skill.name, category: skill.category });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSkill(null);
        setFormData({ name: '', category: '' });
    };

    const confirmDelete = async () => {
        if (skillToDelete) {
            try {
                const res = await fetch(`${API_URL}/skills/${skillToDelete}`, { method: 'DELETE' });
                if (res.ok) {
                    setSkills(skills.filter(s => s.id !== skillToDelete));
                    setSkillToDelete(null);
                    showToast("Skill deleted successfully.", "success");
                } else {
                    showToast("Failed to delete skill", "error");
                }
            } catch (err) {
                showToast("Error deleting skill", "error");
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Skills Management</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <motion.button onClick={openAddModal} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '0.5rem 1rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={18} /> Add Skill
                    </motion.button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingSkill ? "Edit Skill" : "Add New Skill"}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>Skill Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Video Editing"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', outline: 'none', fontSize: '1rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>Category</label>
                        <input
                            type="text"
                            placeholder="e.g. Production"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', outline: 'none', fontSize: '1rem' }}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        style={{ marginTop: '1rem', padding: '1rem', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)' }}
                    >
                        {editingSkill ? "Update Skill" : "Save Skill"}
                    </motion.button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={!!skillToDelete} onClose={() => setSkillToDelete(null)} title="Confirm Delete">
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#d1d5db', marginBottom: '2rem', fontSize: '1.1rem' }}>Are you sure you want to delete this skill? This action cannot be undone.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button onClick={() => setSkillToDelete(null)} style={{ padding: '0.75rem 2rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', fontWeight: 600 }}>No, Cancel</button>
                        <button onClick={confirmDelete} style={{ padding: '0.75rem 2rem', background: '#ef4444', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Yes, Delete</button>
                    </div>
                </div>
            </Modal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {skills.map(skill => (
                    <motion.div key={skill.id} layout initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontWeight: 600, fontSize: '1.1rem' }}>{skill.name}</h3>
                                <span style={{ fontSize: '0.8rem', color: '#a78bfa', background: 'rgba(124, 58, 237, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>{skill.category}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <motion.button onClick={() => openEditModal(skill)} whileHover={{ scale: 1.1 }} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.5rem', borderRadius: '8px', color: 'white', cursor: 'pointer' }}><Edit2 size={16} /></motion.button>
                                <motion.button onClick={() => setSkillToDelete(skill.id)} whileHover={{ scale: 1.1 }} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '0.5rem', borderRadius: '8px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function WorkSection({ showToast }: { showToast: (msg: string, type: ToastType) => void }) {
    const [works, setWorks] = useState<Work[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingWork, setEditingWork] = useState<Work | null>(null);
    const [workToDelete, setWorkToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });

    const fetchWorks = async () => {
        try {
            const res = await fetch(`${API_URL}/work`);
            const data = await res.json();
            if (Array.isArray(data)) setWorks(data);
        } catch (err) {
            showToast("Failed to load work", "error");
        }
    };

    useState(() => {
        fetchWorks();
    });

    const handleSave = async () => {
        if (!formData.title) {
            showToast("Please enter a project title!", "error");
            return;
        }

        try {
            let res;
            if (editingWork) {
                res = await fetch(`${API_URL}/work/${editingWork.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                res = await fetch(`${API_URL}/work`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }

            if (res.ok) {
                showToast(editingWork ? "Project updated!" : "Project added!", "success");
                fetchWorks();
                closeModal();
            } else {
                showToast("Failed to save project", "error");
            }
        } catch (err) {
            showToast("Error saving project", "error");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`${API_URL}/upload/work`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setFormData(prev => ({ ...prev, image: data.path }));
                showToast("Image uploaded!", "success");
            } else {
                showToast("Upload failed", "error");
            }
        } catch (err) {
            showToast("Error uploading image", "error");
        }
    };

    const openAddModal = () => {
        setEditingWork(null);
        setFormData({ title: '', description: '', image: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (work: Work) => {
        setEditingWork(work);
        setFormData({ title: work.title, description: work.description, image: work.image });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingWork(null);
        setFormData({ title: '', description: '', image: '' });
    };

    const confirmDelete = async () => {
        if (workToDelete) {
            try {
                const res = await fetch(`${API_URL}/work/${workToDelete}`, { method: 'DELETE' });
                if (res.ok) {
                    setWorks(works.filter(w => w.id !== workToDelete));
                    setWorkToDelete(null);
                    showToast("Project deleted.", "success");
                } else {
                    showToast("Failed to delete project", "error");
                }
            } catch (err) {
                showToast("Error deleting project", "error");
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Work Portfolio</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <motion.button onClick={openAddModal} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '0.5rem 1rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={18} /> Add Work
                    </motion.button>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingWork ? "Edit Project" : "Add New Project"}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>Project Title</label>
                        <input type="text" placeholder="Project Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', outline: 'none' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>Description</label>
                        <input type="text" placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', outline: 'none' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>Image</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ color: 'white' }}
                                />
                            </div>
                            {formData.image && (
                                <div style={{ fontSize: '0.8rem', color: '#34d399' }}>
                                    Current Image: {formData.image}
                                </div>
                            )}
                        </div>
                    </div>
                    <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ marginTop: '1rem', padding: '1rem', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)' }}>
                        {editingWork ? "Update Project" : "Add Project"}
                    </motion.button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={!!workToDelete} onClose={() => setWorkToDelete(null)} title="Confirm Delete">
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#d1d5db', marginBottom: '2rem', fontSize: '1.1rem' }}>Are you sure you want to delete this project?</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button onClick={() => setWorkToDelete(null)} style={{ padding: '0.75rem 2rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', fontWeight: 600 }}>No</button>
                        <button onClick={confirmDelete} style={{ padding: '0.75rem 2rem', background: '#ef4444', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Yes</button>
                    </div>
                </div>
            </Modal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {works.map(work => (
                    <motion.div key={work.id} whileHover={{ y: -5 }} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ height: '180px', background: `url(${work.image}) center/cover` }} />
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>{work.title}</h3>
                            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1rem' }}>{work.description}</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => openEditModal(work)} style={{ flex: 1, padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Edit2 size={14} /> Edit</button>
                                <button onClick={() => setWorkToDelete(work.id)} style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '8px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function ContactsSection({ showToast }: { showToast: (msg: string, type: ToastType) => void }) {
    const [contacts, setContacts] = useState<Contact[]>([]);

    const fetchContacts = async () => {
        try {
            const res = await fetch(`${API_URL}/contact`);
            const data = await res.json();
            if (Array.isArray(data)) setContacts(data);
        } catch (err) {
            showToast("Failed to load contacts", "error");
        }
    };

    useState(() => {
        fetchContacts();
    });
    const [contactToDelete, setContactToDelete] = useState<number | null>(null);

    const confirmDelete = async () => {
        if (contactToDelete) {
            try {
                const res = await fetch(`${API_URL}/contact/${contactToDelete}`, { method: 'DELETE' });
                if (res.ok) {
                    setContacts(contacts.filter(c => c.id !== contactToDelete));
                    setContactToDelete(null);
                    showToast("Message deleted.", "success");
                } else {
                    showToast("Failed to delete message", "error");
                }
            } catch (err) {
                showToast("Error deleting message", "error");
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>Contact Messages</h2>

            <Modal isOpen={!!contactToDelete} onClose={() => setContactToDelete(null)} title="Confirm Delete">
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#d1d5db', marginBottom: '2rem', fontSize: '1.1rem' }}>Are you sure you want to delete this message?</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button onClick={() => setContactToDelete(null)} style={{ padding: '0.75rem 2rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', fontWeight: 600 }}>No</button>
                        <button onClick={confirmDelete} style={{ padding: '0.75rem 2rem', background: '#ef4444', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Yes</button>
                    </div>
                </div>
            </Modal>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {contacts.map(contact => (
                    <motion.div key={contact.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#0f0b1e' }}>{contact.name.charAt(0)}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{contact.name} <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 400 }}>&lt;{contact.email}&gt;</span></h4>
                                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{contact.date}</span>
                            </div>
                            <p style={{ color: '#d1d5db' }}>{contact.message}</p>
                        </div>
                        <button onClick={() => setContactToDelete(contact.id)} style={{ padding: '0.5rem', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0.5 }}><Trash2 size={18} /></button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (message: string, type: ToastType) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#0f0b1e',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <CustomCursor />
            <ToastContainer toasts={toasts} removeToast={removeToast} />

            {/* Background Ambience */}
            <div style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 0 }}>
                <StarField />
            </div>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                style={{
                    width: '280px',
                    background: 'rgba(15, 11, 30, 0.6)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 10,
                    position: 'relative'
                }}
            >
                <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', background: '#7c3aed', borderRadius: '8px' }} />
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>ViralMedia.</h1>
                </div>

                <nav style={{ flex: 1, padding: '1rem 0' }}>
                    <p style={{ padding: '0 1.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Menu</p>
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={Briefcase} label="Work" active={activeTab === 'work'} onClick={() => setActiveTab('work')} />
                    <SidebarItem icon={Award} label="Skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
                    <SidebarItem icon={Mail} label="Contacts" active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')} />
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                    <SidebarItem icon={LogOut} label="Logout" active={false} onClick={() => {
                        localStorage.removeItem('isAuthenticated');
                        window.location.href = '/login';
                    }} />
                </div>
            </motion.aside>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 5, maxHeight: '100vh', overflowY: 'auto', position: 'relative' }}>

                {/* Header */}
                <header style={{
                    padding: '1.5rem 3rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(15, 11, 30, 0.4)',
                    backdropFilter: 'blur(10px)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 20
                }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.5rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '50px',
                                color: 'white',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <motion.button whileHover={{ scale: 1.1 }} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', position: 'relative' }}>
                            <Bell size={20} />
                            <span style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }} />
                        </motion.button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => setShowProfileMenu(!showProfileMenu)}>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Miqdad</p>
                                <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Admin</p>
                            </div>
                            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #fbbf24)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={20} color="white" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div style={{ padding: '3rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div style={{ marginBottom: '3rem' }}>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome back, Miqdad! 👋</h2>
                                    <p style={{ color: '#9ca3af' }}>Here's what's happening with your content today.</p>
                                </div>

                                {/* Stats Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                                    {initialStats.map((stat, i) => (
                                        <StatCard key={i} stat={stat} index={i} />
                                    ))}
                                </div>

                                {/* Recent Activity Graphic (Simulated) */}
                                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Engagement Overview</h3>
                                        <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', color: '#9ca3af', fontSize: '0.85rem' }}>This Week</button>
                                    </div>
                                    {/* Simulated Chart Bars */}
                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '1rem' }}>
                                        {[40, 65, 35, 85, 55, 95, 70].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ duration: 1, delay: i * 0.1, type: 'spring' }}
                                                style={{
                                                    width: '100%',
                                                    background: i === 5 ? 'linear-gradient(to top, #7c3aed, #a78bfa)' : 'rgba(255,255,255,0.05)',
                                                    borderRadius: '8px 8px 0 0',
                                                    position: 'relative'
                                                }}
                                            >
                                                <div style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', color: '#6b7280', fontSize: '0.75rem' }}>
                                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                            </motion.div>
                        )}

                        {activeTab === 'skills' && <SkillsSection showToast={addToast} />}
                        {activeTab === 'work' && <WorkSection showToast={addToast} />}
                        {activeTab === 'contacts' && <ContactsSection showToast={addToast} />}

                        {/* Placeholder for Settings */}
                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                style={{ textAlign: 'center', padding: '4rem' }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Settings</h2>
                                <p style={{ color: '#9ca3af' }}>Configure your dashboard preferences here.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
