import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { geminiService } from '../services/gemini';
import { getAllProjects } from '../services/githubService';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const PortfolioChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Samuvel's AI Assistant. Ask me anything about his skills, projects, or experience!",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            // Fetch simplified project list for context
            const projects = await getAllProjects();
            const simpleProjects = projects.map(p => ({
                title: p.title,
                desc: p.description,
                tech: p.tech
            })).slice(0, 5); // Limit to top 5 to save tokens

            const reply = await geminiService.chat(userMsg.text, simpleProjects);

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: reply,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I lost connection to the server. Please try again.",
                sender: 'bot',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Search/Fab Trigger */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg shadow-neon-green/20 transition-colors ${isOpen ? 'bg-transparent pointer-events-none opacity-0' : 'bg-neon-green text-dark-bg'
                    }`}
            >
                <MessageSquare size={24} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-6 right-6 w-full max-w-[350px] md:max-w-[400px] h-[500px] bg-dark-card border border-neon-green/30 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col font-mono"
                    >
                        {/* Header */}
                        <div className="bg-dark-bg/95 backdrop-blur-sm p-4 border-b border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green/20">
                                        <Bot size={20} className="text-neon-green" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-dark-card animate-pulse"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Portfolio Assistant</h3>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Sparkles size={10} className="text-neon-blue" />
                                        <span>Powered by Gemini AI</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-bg/50 scrollbar-thin scrollbar-thumb-gray-700">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                ? 'bg-neon-green text-dark-bg rounded-br-none font-semibold'
                                                : 'bg-dark-card border border-gray-700 text-gray-200 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-dark-card border border-gray-700 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                                        <Loader2 size={16} className="text-neon-green animate-spin" />
                                        <span className="text-xs text-gray-400">Thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-dark-bg border-t border-gray-800">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about my projects..."
                                    className="w-full bg-dark-card text-white text-sm rounded-xl py-3 pl-4 pr-12 border border-gray-700 focus:border-neon-green focus:outline-none placeholder:text-gray-600 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputText.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-neon-green/10 text-neon-green rounded-lg hover:bg-neon-green hover:text-dark-bg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neon-green transition-all"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PortfolioChat;
