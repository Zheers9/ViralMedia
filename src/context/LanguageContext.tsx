import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../data/translations';

export type Language = 'en' | 'ar' | 'ku';
type Translations = typeof translations.en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof Translations | string, params?: Record<string, string>) => string;
    dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('ar'); // Default to Arabic

    useEffect(() => {
        document.documentElement.dir = translations[language].direction;
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: keyof Translations | string, params?: Record<string, string>) => {
        // @ts-ignore
        let text = translations[language][key] || translations['en'][key] || key;

        if (params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                text = text.replace(`{${paramKey}}`, paramValue);
            });
        }

        return text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir: translations[language].direction as 'ltr' | 'rtl' }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
