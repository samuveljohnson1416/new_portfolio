/**
 * Gemini AI Service
 * Communicates with the backend proxy to handle AI features
 */

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

export interface ChatResponse {
    reply: string;
}

export interface ProjectAnalysis {
    complexityScore: number;
    keySkills: string[];
    roleFit: string;
    analysis: string;
}

export const geminiService = {
    /**
     * Send a message to the AI Chatbot
     * @param message User's question
     * @param projectContext Optional context about projects (e.g. top projects)
     */
    async chat(message: string, projectContext: any = []): Promise<string> {
        try {
            const response = await fetch(`${API_BASE}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, projectContext }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data: ChatResponse = await response.json();
            return data.reply;
        } catch (error) {
            console.error('Gemini Chat Error:', error);
            return "I'm having trouble connecting to my brain right now. Please try again later!";
        }
    },

    /**
     * Analyze a project to generate "DNA"
     */
    async analyzeProject(projectDescription: string, techStack: string[]): Promise<ProjectAnalysis | null> {
        try {
            const response = await fetch(`${API_BASE}/analyze-project`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectDescription,
                    techStack: techStack.join(', ')
                }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            return await response.json();
        } catch (error) {
            console.error('Gemini Analysis Error:', error);
            return null;
        }
    }
};
