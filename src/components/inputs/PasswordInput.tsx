import React, { useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps extends Omit<HTMLMotionProps<"input">, "ref"> {
    label?: string;
    error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label = "Password", error, onFocus, onBlur, placeholder, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(props.defaultValue || '');

    const value = props.value !== undefined ? props.value : internalValue;
    const hasValue = value && String(value).length > 0;
    const active = isFocused || hasValue;

    return (
        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
                <Lock
                    size={20}
                    style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: isFocused ? 'var(--color-purple-primary)' : 'var(--color-text-muted)',
                        transition: 'color 0.3s ease',
                        zIndex: 2
                    }}
                />

                <motion.input
                    {...(props as any)}
                    type={showPassword ? "text" : "password"}
                    onChange={(e: any) => {
                        setInternalValue(e.target.value);
                        if (props.onChange) props.onChange(e);
                    }}
                    onFocus={(e: any) => {
                        setIsFocused(true);
                        if (onFocus) onFocus(e);
                    }}
                    onBlur={(e: any) => {
                        setIsFocused(false);
                        if (onBlur) onBlur(e);
                    }}
                    style={{
                        width: '100%',
                        padding: '1.5rem 3rem 0.5rem 3rem', // Padding for icon + label space + eye icon
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid',
                        borderColor: isFocused ? 'var(--color-purple-primary)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        boxShadow: isFocused ? '0 0 0 4px rgba(124, 58, 237, 0.1)' : 'none',
                        transition: 'all 0.3s ease',
                        height: '56px',
                        ...props.style
                    }}
                />

                <motion.label
                    initial={false}
                    animate={{
                        y: active ? -8 : 0,
                        x: active ? 0 : 0,
                        scale: active ? 0.85 : 1,
                        color: isFocused ? 'var(--color-purple-primary)' : 'var(--color-text-muted)'
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'absolute',
                        left: '3rem',
                        top: '50%',
                        translateY: '-50%',
                        pointerEvents: 'none',
                        fontWeight: 500,
                        zIndex: 1,
                        transformOrigin: 'left center',
                        marginTop: active ? '-8px' : '0px'
                    }}
                >
                    {label}
                </motion.label>

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: isFocused ? 'var(--color-purple-primary)' : 'var(--color-text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        transition: 'color 0.3s ease',
                        zIndex: 3
                    }}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

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

export default PasswordInput;
