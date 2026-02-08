import { useState, useEffect } from 'react';
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
    Trash2,
    Menu,
    X
} from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import StarField from '../components/StarField';
import { ToastContainer, type ToastMessage, type ToastType } from '../components/Toast';
import TextInput from '../components/inputs/TextInput';
import ImageUploadInput from '../components/inputs/ImageUploadInput';
import { useLanguage } from '../context/LanguageContext';

// --- Types ---
type Skill = { id: number; name: string; category: string };
type Work = { id: number; title: string; description: string; image: string };
type Contact = { id: number; name: string; email: string; message: string; date: string };

// --- Mock Data ---
const initialSkills: Skill[] = [
    { id: 1, name: 'Video Editing', category: 'Production' },
    { id: 2, name: 'Social Media Marketing', category: 'Marketing' },
    { id: 3, name: 'Graphic Design', category: 'Design' },
];

const initialWorks: Work[] = [
    { id: 1, title: 'Campus Event 2024', description: 'Annual university celebration', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400' },
    { id: 2, title: 'Sports Highlights', description: 'Basketball championship coverage', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400' },
];

const initialContacts: Contact[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Interested in video production services', date: '2024-01-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Need help with social media campaign', date: '2024-01-22' },
];

const initialStats = [
    { label: 'stats_views', value: '2.4M', change: '+12%', icon: Eye, color: '#fbbf24' },
    { label: 'stats_projects', value: '142', change: '+5%', icon: Briefcase, color: '#7c3aed' },
    { label: 'stats_clients', value: '89', change: '+18%', icon: Users, color: '#34d399' },
    { label: 'stats_skills', value: '24', change: '+2', icon: Award, color: '#f472b6' },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
        whileTap={{ scale: 0.95 }}
        className={`sidebar-item ${active ? 'active' : ''}`}
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

const StatCard = ({ stat, index }: { stat: any, index: number }) => {
    const { t } = useLanguage();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
            className="stat-card"
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
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{t(stat.label)}</p>
            </div>
        </motion.div>
    );
};

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="modal-backdrop"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-40%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-40%' }}
                        className="modal-content"
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', margin: 0 }}>{title}</h3>
                            <motion.button
                                whileHover={{ rotate: 90, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="modal-close-btn"
                            >
                                <X size={24} />
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

// --- Sub-Components ---
function SkillsSection({ showToast }: { showToast: (msg: string, type: ToastType) => void }) {
    const [skills, setSkills] = useState<Skill[]>(initialSkills);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [skillToDelete, setSkillToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '', category: '' });
    const { t } = useLanguage();

    const handleSave = () => {
        if (!formData.name) {
            showToast(t('toast_skill_name_error'), "error");
            return;
        }
        if (editingSkill) {
            setSkills(skills.map(s => s.id === editingSkill.id ? { ...s, ...formData } : s));
            showToast(t('toast_skill_updated'), "success");
        } else {
            setSkills([...skills, { id: Date.now(), ...formData }]);
            showToast(t('toast_skill_added'), "success");
        }
        closeModal();
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

    const confirmDelete = () => {
        if (skillToDelete) {
            setSkills(skills.filter(s => s.id !== skillToDelete));
            setSkillToDelete(null);
            showToast(t('toast_skill_deleted'), "success");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="section-header">
                <h2 className="section-title">{t('skills_management')}</h2>
                <motion.button onClick={openAddModal} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="action-button">
                    <Plus size={18} /> {t('add_skill')}
                </motion.button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingSkill ? t('edit_skill') : t('add_new_skill')}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <TextInput label={t('skill_name')} placeholder="e.g. Video Editing" value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} />
                    <TextInput label={t('category')} placeholder="e.g. Production" value={formData.category} onChange={(e: any) => setFormData({ ...formData, category: e.target.value })} />
                    <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="primary-button">
                        {editingSkill ? t('update_skill') : t('save_skill')}
                    </motion.button>
                </div>
            </Modal>
            <Modal isOpen={!!skillToDelete} onClose={() => setSkillToDelete(null)} title={t('confirm_delete')}>
                <div className="delete-modal-content">
                    <p>{t('confirm_delete_skill')}</p>
                    <div className="modal-actions">
                        <button onClick={() => setSkillToDelete(null)} className="cancel-button">{t('cancel')}</button>
                        <button onClick={confirmDelete} className="delete-button">{t('delete')}</button>
                    </div>
                </div>
            </Modal>
            <div className="grid-container">
                {skills.map(skill => (
                    <motion.div key={skill.id} layout className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 className="card-title">{skill.name}</h3>
                                <span className="card-tag">{skill.category}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <motion.button onClick={() => openEditModal(skill)} whileHover={{ scale: 1.1 }} className="icon-button"><Edit2 size={16} /></motion.button>
                                <motion.button onClick={() => setSkillToDelete(skill.id)} whileHover={{ scale: 1.1 }} className="icon-button danger"><Trash2 size={16} /></motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function WorkSection({ showToast }: { showToast: (msg: string, type: ToastType) => void }) {
    const { t } = useLanguage();
    const [works, setWorks] = useState<Work[]>(initialWorks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingWork, setEditingWork] = useState<Work | null>(null);
    const [workToDelete, setWorkToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });

    const handleSave = () => {
        if (!formData.title) {
            showToast(t('toast_project_title_error'), "error");
            return;
        }
        if (editingWork) {
            setWorks(works.map(w => w.id === editingWork.id ? { ...w, ...formData } : w));
            showToast(t('toast_project_updated'), "success");
        } else {
            setWorks([...works, { id: Date.now(), ...formData }]);
            showToast(t('toast_project_added'), "success");
        }
        closeModal();
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

    const confirmDelete = () => {
        if (workToDelete) {
            setWorks(works.filter(w => w.id !== workToDelete));
            setWorkToDelete(null);
            showToast(t('toast_project_deleted'), "success");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="section-header">
                <h2 className="section-title">{t('work_portfolio')}</h2>
                <motion.button onClick={openAddModal} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="action-button">
                    <Plus size={18} /> {t('add_work')}
                </motion.button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingWork ? t('edit_project') : t('add_new_project')}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <TextInput label={t('project_title')} placeholder="Project Title" value={formData.title} onChange={(e: any) => setFormData({ ...formData, title: e.target.value })} />
                    <TextInput label={t('description')} placeholder="Description" value={formData.description} onChange={(e: any) => setFormData({ ...formData, description: e.target.value })} />
                    <ImageUploadInput label={t('project_image')} initialImage={formData.image} onImageSelected={(file) => setFormData({ ...formData, image: file ? URL.createObjectURL(file) : '' })} />
                    <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="primary-button">
                        {editingWork ? t('update_project') : t('add_project')}
                    </motion.button>
                </div>
            </Modal>
            <Modal isOpen={!!workToDelete} onClose={() => setWorkToDelete(null)} title={t('confirm_delete')}>
                <div className="delete-modal-content">
                    <p>{t('confirm_delete_project')}</p>
                    <div className="modal-actions">
                        <button onClick={() => setWorkToDelete(null)} className="cancel-button">{t('no')}</button>
                        <button onClick={confirmDelete} className="delete-button">{t('yes')}</button>
                    </div>
                </div>
            </Modal>
            <div className="grid-container large">
                {works.map(work => (
                    <motion.div key={work.id} whileHover={{ y: -5 }} className="work-card">
                        <div className="work-image" style={{ background: `url(${work.image}) center/cover` }} />
                        <div style={{ padding: '1.5rem' }}>
                            <h3 className="work-title">{work.title}</h3>
                            <p className="work-desc">{work.description}</p>
                            <div className="action-buttons">
                                <button onClick={() => openEditModal(work)} className="edit-btn"><Edit2 size={14} /> Edit</button>
                                <button onClick={() => setWorkToDelete(work.id)} className="delete-btn"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function ContactsSection({ showToast }: { showToast: (msg: string, type: ToastType) => void }) {
    const { t } = useLanguage();
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [contactToDelete, setContactToDelete] = useState<number | null>(null);

    const confirmDelete = () => {
        if (contactToDelete) {
            setContacts(contacts.filter(c => c.id !== contactToDelete));
            setContactToDelete(null);
            showToast(t('toast_message_deleted'), "success");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>{t('contact_messages')}</h2>
            <Modal isOpen={!!contactToDelete} onClose={() => setContactToDelete(null)} title={t('confirm_delete')}>
                <div className="delete-modal-content">
                    <p>{t('confirm_delete_message')}</p>
                    <div className="modal-actions">
                        <button onClick={() => setContactToDelete(null)} className="cancel-button">{t('no')}</button>
                        <button onClick={confirmDelete} className="delete-button">{t('yes')}</button>
                    </div>
                </div>
            </Modal>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {contacts.map(contact => (
                    <motion.div key={contact.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="contact-card">
                        <div className="contact-avatar">{contact.name.charAt(0)}</div>
                        <div style={{ flex: 1 }}>
                            <div className="contact-header">
                                <h4>{contact.name} <span>&lt;{contact.email}&gt;</span></h4>
                                <span className="contact-date">{contact.date}</span>
                            </div>
                            <p className="contact-message">{contact.message}</p>
                        </div>
                        <button onClick={() => setContactToDelete(contact.id)} className="icon-button danger"><Trash2 size={18} /></button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default function AdminDashboard() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const addToast = (message: string, type: ToastType) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <div className="admin-container">
            <style>{`
                .admin-container {
                    display: flex;
                    min-height: 100vh;
                    background: #0f0b1e;
                    color: white;
                    font-family: "Inter", sans-serif;
                    position: relative;
                    overflow: hidden;
                }
                
                /* Sidebar Styles */
                .sidebar {
                    width: 280px;
                    background: rgba(15, 11, 30, 0.6);
                    backdrop-filter: blur(20px);
                    border-right: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    flex-direction: column;
                    z-index: 50;
                    position: relative;
                }

                .sidebar-overlay {
                    display: none;
                }

                .mobile-toggle-btn {
                    display: none;
                }

                .main-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    z-index: 5;
                    max-height: 100vh;
                    overflow-y: auto;
                    position: relative;
                }

                .top-header {
                    padding: 1.5rem 3rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    background: rgba(15, 11, 30, 0.4);
                    backdrop-filter: blur(10px);
                    position: sticky;
                    top: 0;
                    z-index: 20;
                }

                .search-container {
                     position: relative;
                     width: 300px;
                }

                .dashboard-content {
                    padding: 3rem;
                    max-width: 1600px;
                    margin: 0 auto;
                    width: 100%;
                }

                /* Mobile/Responsive Styles */
                @media (max-width: 1024px) {
                    .sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        transform: translateX(-100%);
                        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        width: 280px;
                        background: rgba(15, 11, 30, 0.95);
                    }

                    .sidebar.open {
                        transform: translateX(0);
                    }

                    .sidebar-overlay {
                        display: block;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.5);
                        backdrop-filter: blur(5px);
                        z-index: 40;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.3s;
                    }

                    .sidebar-overlay.open {
                        opacity: 1;
                        pointer-events: auto;
                    }

                    .mobile-toggle-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(255,255,255,0.1);
                        border: none;
                        color: white;
                        padding: 0.5rem;
                        border-radius: 8px;
                        margin-right: 1rem;
                        cursor: pointer;
                    }

                    .top-header {
                        padding: 1rem 1.5rem;
                    }

                    .search-container {
                        display: none; /* Hide on mobile for now or make it collapsible */
                    }

                    .dashboard-content {
                        padding: 1.5rem;
                    }
                }

                /* Component Classes */
                .stat-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 20px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    backdrop-filter: blur(10px);
                }
                .stat-value { font-size: 1.8rem; font-weight: 700; color: white; margin-bottom: 0.25rem; }
                .stat-label { color: #9ca3af; font-size: 0.9rem; }

                .modal-backdrop {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 9998;
                }
                .modal-content {
                    position: fixed; top: 50%; left: 50%;
                    width: 90%; max-width: 500px;
                    background: #1a1535;
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    border-radius: 24px; padding: 2rem; z-index: 9999;
                }
                .modal-close-btn {
                    background: transparent; border: none; color: #9ca3af; cursor: pointer;
                    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%;
                }
                
                .primary-button {
                    margin-top: 1rem; padding: 1rem;
                    background: linear-gradient(135deg, #7c3aed, #6d28d9);
                    border: none; border-radius: 12px; color: white; font-weight: 700;
                    cursor: pointer; font-size: 1rem; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
                }

                .section-header { display: flex; justify-content: space-between; margin-bottom: 2rem; align-items: center; }
                .section-title { font-size: 1.75rem; font-weight: 700; }
                .action-button {
                    padding: 0.5rem 1rem; background: #7c3aed; color: white; border: none;
                    border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;
                }
                
                .delete-modal-content { text-align: center; }
                .delete-modal-content p { color: #d1d5db; margin-bottom: 2rem; font-size: 1.1rem; }
                .modal-actions { display: flex; gap: 1rem; justify-content: center; }
                .cancel-button { padding: 0.75rem 2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 12px; color: white; cursor: pointer; font-weight: 600; }
                .delete-button { padding: 0.75rem 2rem; background: #ef4444; border: none; border-radius: 12px; color: white; cursor: pointer; font-weight: 600; }

                .grid-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
                .grid-container.large { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
                
                .card { background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); }
                .card-title { font-weight: 600; font-size: 1.1rem; }
                .card-tag { font-size: 0.8rem; color: #a78bfa; background: rgba(124, 58, 237, 0.1); padding: 0.2rem 0.5rem; border-radius: 10px; }
                .icon-button { background: rgba(255,255,255,0.05); border: none; padding: 0.5rem; border-radius: 8px; color: white; cursor: pointer; }
                .icon-button.danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

                .work-card { background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
                .work-image { height: 180px; }
                .work-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; }
                .work-desc { color: #9ca3af; font-size: 0.9rem; margin-bottom: 1rem; }
                .action-buttons { display: flex; gap: 0.5rem; }
                .edit-btn { flex: 1; padding: 0.5rem; background: rgba(255,255,255,0.05); border: none; border-radius: 8px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
                .delete-btn { padding: 0.5rem; background: rgba(239,68,68,0.1); border: none; border-radius: 8px; color: #ef4444; cursor: pointer; }

                .contact-card { display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); }
                .contact-avatar { width: 40px; height: 40px; border-radius: 50%; background: #a78bfa; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #0f0b1e; }
                .contact-header { display: flex; justify-content: space-between; margin-bottom: 0.25rem; }
                .contact-header h4 { font-size: 1rem; font-weight: 600; }
                .contact-header span { font-size: 0.8rem; color: #9ca3af; font-weight: 400; }
                .contact-date { font-size: 0.8rem; color: #9ca3af; }
                .contact-message { color: #d1d5db; }
            `}</style>
            <CustomCursor />
            <ToastContainer toasts={toasts} removeToast={removeToast} />

            {/* Background Ambience */}
            <div style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 0 }}>
                <StarField />
            </div>

            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
                className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}
            >
                <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '32px', height: '32px', background: '#7c3aed', borderRadius: '8px' }} />
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>ViralMedia.</h1>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '1rem 0' }}>
                    <p style={{ padding: '0 1.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>{t('admin_menu')}</p>
                    <SidebarItem icon={LayoutDashboard} label={t('admin_dashboard')} active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={Briefcase} label={t('admin_work')} active={activeTab === 'work'} onClick={() => { setActiveTab('work'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={Award} label={t('admin_skills')} active={activeTab === 'skills'} onClick={() => { setActiveTab('skills'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={Mail} label={t('admin_contacts')} active={activeTab === 'contacts'} onClick={() => { setActiveTab('contacts'); setIsMobileMenuOpen(false); }} />
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <SidebarItem icon={Settings} label={t('admin_settings')} active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={LogOut} label={t('admin_logout')} active={false} onClick={() => window.location.href = '/'} />
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="main-content">

                {/* Header */}
                <header className="top-header">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button className="mobile-toggle-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <Menu size={24} />
                        </button>

                        <div className="search-container">
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                            <input
                                type="text"
                                placeholder={t('admin_search')}
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
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <motion.button whileHover={{ scale: 1.1 }} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', position: 'relative' }}>
                            <Bell size={20} />
                            <span style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }} />
                        </motion.button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => setShowProfileMenu(!showProfileMenu)}>
                            <div style={{ textAlign: 'right', display: 'none', gap: '0.25rem' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Miqdad</p>
                            </div>
                            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #fbbf24)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={20} color="white" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="dashboard-content">
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
                                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t('admin_welcome_user', { name: "Miqdad" })}</h2>
                                    <p style={{ color: '#9ca3af' }}>{t('admin_subtitle')}</p>
                                </div>

                                {/* Stats Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                                    {initialStats.map((stat, i) => (
                                        <StatCard key={i} stat={stat} index={i} />
                                    ))}
                                </div>

                                {/* Recent Activity Graphic */}
                                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{t('engagement_overview')}</h3>
                                    </div>
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

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                style={{ textAlign: 'center', padding: '4rem' }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{t('settings_title')}</h2>
                                <p style={{ color: '#9ca3af' }}>{t('settings_subtitle')}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
