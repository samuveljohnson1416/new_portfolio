import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserPersona = 'RECRUITER' | 'CLIENT' | 'STUDENT';

interface PersonaContextType {
    persona: UserPersona;
    setPersona: (persona: UserPersona) => void;
    getRecommendation: () => string;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
    const [persona, setPersona] = useState<UserPersona>('RECRUITER');

    const getRecommendation = () => {
        switch (persona) {
            case 'RECRUITER':
                return "Focusing on enterprise-grade code, scalable architecture, and full-stack capabilities.";
            case 'CLIENT':
                return "Highlighting delivered value, user experience, and business solutions.";
            case 'STUDENT':
                return "Showing learning journey, tutorials, and fundamental concepts.";
            default:
                return "Welcome!";
        }
    };

    return (
        <PersonaContext.Provider value={{ persona, setPersona, getRecommendation }}>
            {children}
        </PersonaContext.Provider>
    );
};

export const usePersona = () => {
    const context = useContext(PersonaContext);
    if (!context) {
        throw new Error('usePersona must be used within a PersonaProvider');
    }
    return context;
};
