import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env.local') });

console.log('API Key:', process.env.GEMINI_API_KEY ? 'Found ✓' : 'MISSING ✗');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function test() {
    try {
        console.log('Sending test prompt to Gemini...');
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("Say 'Hello World' in one line");
        const response = await result.response;
        console.log('\n✅ SUCCESS! Gemini replied:');
        console.log(response.text());
    } catch (error) {
        console.log('\n❌ ERROR:', error.message);
        if (error.message.includes('429')) {
            console.log('\n⚠️  Rate limit still active. You need a NEW API key.');
        }
    }
}

test();
