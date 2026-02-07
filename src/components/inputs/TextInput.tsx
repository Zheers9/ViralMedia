import React, { useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface TextInputProps extends Omit<HTMLMotionProps<"input">, "ref"> {
    label: string;
    icon?: LucideIcon;
    error?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, icon: Icon, error, className, onFocus, onBlur, placeholder, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(props.defaultValue || '');

    // We use a CSS-based approach for the label position to handle autofill correctly
    // The label will be positioned absolutely.
    // When the input has value (handled by required + valid pseudo class usually, or JS check)
    // For React controlled inputs, we can rely on props.value being truthy

    // Check if value is controlled (props.value provided) or uncontrolled (use internal state)
    const value = props.value !== undefined ? props.value : internalValue;
    const hasValue = value && String(value).length > 0;
    const active = isFocused || hasValue;

    return (
        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
                {Icon && (
                    <Icon
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
                )}

                <motion.input
                    {...(props as any)}
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
                        padding: Icon ? '1.5rem 1rem 0.5rem 3rem' : '1.5rem 1rem 0.5rem 1rem', // More top padding for label space inside
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid',
                        borderColor: isFocused ? 'var(--color-purple-primary)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        boxShadow: isFocused ? '0 0 0 4px rgba(124, 58, 237, 0.1)' : 'none',
                        transition: 'all 0.3s ease',
                        height: '56px', // Fixed height for consistency
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
                        left: Icon ? '3rem' : '1rem',
                        top: '50%',
                        translateY: '-50%', // Centered vertically initially
                        pointerEvents: 'none',
                        fontWeight: 500,
                        zIndex: 1,
                        transformOrigin: 'left center', // Scale from left
                        marginTop: active ? '-8px' : '0px' // Slight manual adjustment
                    }}
                >
                    {label}
                </motion.label>
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

export default TextInput;
