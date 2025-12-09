import React, { useState } from 'react';
import { topics } from '../data';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function SyllabusPage() {
    const [openTopics, setOpenTopics] = useState({});

    const toggleTopic = (id) => {
        setOpenTopics(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Temario Completo</h1>
                <p className="text-gray-500 text-sm">Lectura profunda de todos los contenidos teóricos.</p>
            </header>

            <div className="space-y-4">
                {topics.map((topic) => (
                    <div key={topic.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        <button
                            onClick={() => toggleTopic(topic.id)}
                            className={clsx(
                                "w-full flex items-center justify-between p-6 text-left transition-colors",
                                openTopics[topic.id] ? "bg-gray-50" : "hover:bg-gray-50"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={clsx("p-2 rounded-lg", topic.color, topic.textColor)}>
                                    <BookOpen size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">{topic.title}</h2>
                            </div>
                            {openTopics[topic.id] ? <ChevronDown className="text-gray-400" /> : <ChevronRight className="text-gray-400" />}
                        </button>

                        {openTopics[topic.id] && (
                            <div className="p-8 prose prose-indigo max-w-none border-t border-gray-100">
                                <div dangerouslySetInnerHTML={{ __html: topic.content }} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
