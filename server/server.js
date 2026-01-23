import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Define paths first
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load env vars from .env.local
dotenv.config({ path: join(__dirname, '../.env.local') });

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Load Resume Data
const resumeDataPath = join(__dirname, '../src/constants/resumeData.json');
let resumeData = {};

try {
    const data = fs.readFileSync(resumeDataPath, 'utf8');
    resumeData = JSON.parse(data);
    console.log('Resume data loaded successfully');
} catch (error) {
    console.error('Error loading resume data:', error);
}

// System Prompt Utilities
const generateSystemPrompt = (context) => `
You are the AI Assistant for Samuvel Johnson's interactive portfolio.
Your goal is to answer visitor questions, analyze projects, and act as an interviewer.

CONTEXT - SAMUVEL'S RESUME:
${JSON.stringify(resumeData, null, 2)}

CONTEXT - AVAILABLE TOOLS:
- You know about Samuvel's Experience, Education, Skills, and Certifications.
- If asked about projects, use the user-provided list (which will be sent in the prompt).

TONE & STYLE:
- Professional, yet friendly and enthusiastic.
- Be concise. Don't write long paragraphs unless asked.
- If acting as an INTERVIEWER, be strict but fair.
- If analyzing a project, be analytical and provide metrics (Complexity 0-100).
`;

// --- ENDPOINTS ---

// 1. Ask My Portfolio (Chat)
app.post('/api/chat', async (req, res) => {
    try {
        const { message, projectContext } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API Key not configured on server' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: generateSystemPrompt() + `\n\nAdditional Project Context: ${JSON.stringify(projectContext)}` }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to represent Samuvel Johnson." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error('Chat Error:', error);
        res.status(500).json({ error: 'Failed to process chat request' });
    }
});

// 2. Project DNA Analyzer
app.post('/api/analyze-project', async (req, res) => {
    try {
        const { projectDescription, techStack } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API Key not configured' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        const prompt = `
      Analyze this software project. 
      Description: ${projectDescription}
      Tech Stack: ${techStack}

      Return ONLY a JSON object with this structure (no markdown):
      {
        "complexityScore": <number 0-100>,
        "keySkills": [<string array of top 3 skills demonstrated>],
        "roleFit": "<Best job title fit, e.g. Frontend Engineer, Full Stack Dev>",
        "analysis": "<One sentence sharp summary>"
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Cleanup markup if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonStr);

        res.json(data);
    } catch (error) {
        console.error('Analysis Error:', error);
        res.status(500).json({ error: 'Failed to analyze project' });
    }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../dist')));
    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, '../dist/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
