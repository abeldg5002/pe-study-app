import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { topics } from '../data';
import { ArrowLeft, Brain, GraduationCap, ClipboardList } from 'lucide-react';
import clsx from 'clsx';
import FlashcardDeck from '../components/FlashcardDeck';
import QuizRunner from '../components/QuizRunner';
import PracticalTipsList from '../components/PracticalTipsList';

export default function TopicView() {
    const { topicId } = useParams();
    const topic = topics.find(t => t.id === topicId);
    const [activeTab, setActiveTab] = useState('flashcards');

    if (!topic) {
        return <Navigate to="/" replace />;
    }

    const tabs = [
        { id: 'flashcards', label: 'Memorizar', icon: Brain },
        { id: 'quiz', label: 'Test', icon: GraduationCap },
        { id: 'practical', label: 'Supuestos', icon: ClipboardList },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
                    <p className="text-gray-500 text-sm">Modo de Estudio Profundo</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            activeTab === tab.id
                                ? "bg-white text-indigo-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 min-h-[400px]">
                {activeTab === 'flashcards' && (
                    <FlashcardDeck cards={topic.flashcards} color={topic.color} />
                )}
                {activeTab === 'quiz' && (
                    <QuizRunner questions={topic.quiz} />
                )}
                {activeTab === 'practical' && (
                    <PracticalTipsList tips={topic.practicalTips} color={topic.color} />
                )}
            </div>
        </div>
    );
}
