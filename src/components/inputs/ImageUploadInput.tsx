import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle } from 'lucide-react';

interface ImageUploadInputProps {
    label: string;
    onImageSelected: (file: File | null) => void;
    initialImage?: string;
    error?: string;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ label, onImageSelected, initialImage, error }) => {
    const [preview, setPreview] = useState<string | null>(initialImage || null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
            onImageSelected(file);
        };
        reader.readAsDataURL(file);
    };

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        onImageSelected(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text-muted)'
            }}>
                {label}
            </label>

            <motion.div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                animate={{
                    borderColor: isDragging ? 'var(--color-purple-primary)' : 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: isDragging ? 'rgba(124, 58, 237, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    scale: isDragging ? 1.02 : 1
                }}
                whileHover={{ borderColor: 'var(--color-purple-primary)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                style={{
                    border: '2px dashed',
                    borderRadius: '16px',
                    padding: '2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                <AnimatePresence mode="wait">
                    {preview ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        >
                            <img
                                src={preview}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%)',
                                opacity: 0,
                                transition: 'opacity 0.3s'
                            }} className="image-overlay" />

                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: '#ef4444' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearImage}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(4px)'
                                }}
                            >
                                <X size={18} />
                            </motion.button>

                            <div style={{
                                position: 'absolute',
                                bottom: '1rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(124, 58, 237, 0.9)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                backdropFilter: 'blur(4px)'
                            }}>
                                <CheckCircle size={16} /> Image Selected
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            <div style={{
                                width: '64px',
                                height: '64px',
                                margin: '0 auto 1rem',
                                background: 'rgba(124, 58, 237, 0.1)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Upload size={32} color="var(--color-purple-primary)" />
                            </div>
                            <h4 style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 600 }}>Click or Drag Image</h4>
                            <p style={{ fontSize: '0.875rem' }}>SVG, PNG, JPG or GIF (max. 3MB)</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {error && (
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        display: 'block',
                        marginTop: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#ef4444'
                    }}
                >
                    {error}
                </motion.span>
            )}
        </div>
    );
};

export default ImageUploadInput;
