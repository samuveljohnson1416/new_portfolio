'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Briefcase, GraduationCap, Users } from 'lucide-react';

export type UserPersona = 'RECRUITER' | 'CLIENT' | 'STUDENT';

export const PERSONAS: { id: UserPersona; label: string; icon: typeof Briefcase }[] = [
    { id: 'RECRUITER', label: 'Recruiter', icon: Briefcase },
    { id: 'CLIENT', label: 'Client', icon: Users },
    { id: 'STUDENT', label: 'Student', icon: GraduationCap },
];

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
                return "Start with the resume and case studies: two internships, shipped projects and the stack behind them.";
            case 'CLIENT':
                return "Start with the case studies: the problem each project solved and what shipped.";
            case 'STUDENT':
                return "Start with the notes: real bugs, what I learned from them and the repos behind them.";
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
