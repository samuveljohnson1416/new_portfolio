import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Target, Loader2, BarChart2 } from 'lucide-react';
import { geminiService, ProjectAnalysis } from '../services/gemini';

interface ProjectDNAProps {
    projectDescription: string;
    techStack: string[];
}

const ProjectDNA = ({ projectDescription, techStack }: ProjectDNAProps) => {
    const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const analyze = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (analysis) {
            setShow(!show);
            return;
        }

        setLoading(true);
        setShow(true);

        try {
            const result = await geminiService.analyzeProject(projectDescription, techStack);
            if (result) {
                setAnalysis(result);
            }
        } catch (error) {
            console.error('Analysis failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 border-t border-gray-800 pt-3">
            <button
                onClick={analyze}
                className="flex items-center gap-2 text-xs font-mono text-neon-blue hover:text-white transition-colors"
            >
                <Sparkles size={14} />
                {analysis ? (show ? 'Hide AI Analysis' : 'Show AI DNA') : 'Analyze Project DNA'}
            </button>

            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {loading ? (
                            <div className="py-4 flex items-center gap-2 text-xs text-gray-500 font-mono">
                                <Loader2 size={14} className="animate-spin text-neon-blue" />
                                <span>Decoding project structure...</span>
                            </div>
                        ) : analysis ? (
                            <div className="py-4 space-y-3">
                                {/* Score Bar */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-mono text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Brain size={12} className="text-neon-pink" /> Complexity
                                        </span>
                                        <span>{analysis.complexityScore}/100</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${analysis.complexityScore}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-neon-blue to-neon-pink"
                                        />
                                    </div>
                                </div>

                                {/* Role Fit */}
                                <div className="flex items-start gap-2 bg-neon-green/5 p-2 rounded border border-neon-green/10">
                                    <Target size={14} className="text-neon-green mt-0.5" />
                                    <div>
                                        <div className="text-[10px] text-neon-green uppercase tracking-wide font-bold">Best Role Fit</div>
                                        <div className="text-sm text-gray-200 font-mono">{analysis.roleFit}</div>
                                    </div>
                                </div>

                                {/* Key Skills */}
                                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono flex-wrap">
                                    <BarChart2 size={10} />
                                    <span>Detected Skills:</span>
                                    {analysis.keySkills.map(s => (
                                        <span key={s} className="text-gray-300 bg-gray-800 px-1.5 rounded">{s}</span>
                                    ))}
                                </div>

                                {/* One-liner */}
                                <p className="text-xs text-gray-400 italic">"{analysis.analysis}"</p>
                            </div>
                        ) : (
                            <div className="py-2 text-xs text-red-400">Analysis unavailable.</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDNA;
