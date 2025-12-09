import React, { useState, useMemo } from 'react';
import { topics } from '../data';
import { BookOpen, ChevronDown, ChevronRight, Bookmark, FileText } from 'lucide-react';
import clsx from 'clsx';

export default function SyllabusPage() {
    const [openTopics, setOpenTopics] = useState({});

    const toggleTopic = (id) => {
        setOpenTopics(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Function to split the HTML content into sections based on <h3> tags
    const processContent = (htmlContent) => {
        if (!htmlContent) return [];

        // Split by <h3> tag
        const parts = htmlContent.split('<h3');

        const sections = parts.map((part, index) => {
            if (index === 0 && !part.trim()) return null; // Skip empty start
            if (index === 0 && part.trim()) return { title: 'Introducción', body: part }; // Content before first h3

            // Re-add the opening bracket we lost in split if needed, but actually we split by '<h3'
            // So 'part' starts with '>Title</h3>...' or ' class="...">Title</h3>...'

            const closingIndex = part.indexOf('</h3>');
            if (closingIndex === -1) return { title: 'Sección', body: part };

            // Extract title (remove potential attributes like > or class="..">)
            let rawTitle = part.substring(0, closingIndex);
            // Remove the leading '>' or '...>'
            rawTitle = rawTitle.substring(rawTitle.indexOf('>') + 1);

            const body = part.substring(closingIndex + 5); // 5 is length of </h3>

            return { title: rawTitle, body };
        }).filter(Boolean);

        return sections;
    };

    return (
        <div className="space-y-8 pb-20">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Temario Completo</h1>
                <p className="text-gray-500 mt-2">Lectura estructurada y optimizada para el estudio.</p>
            </header>

            <div className="space-y-6">
                {topics.map((topic) => {
                    const sections = useMemo(() => processContent(topic.content), [topic.content]);
                    const isOpen = openTopics[topic.id];

                    return (
                        <div key={topic.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => toggleTopic(topic.id)}
                                className={clsx(
                                    "w-full flex items-center justify-between p-6 text-left transition-colors",
                                    isOpen ? "bg-gray-50 border-b border-gray-100" : "hover:bg-gray-50"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={clsx("p-3 rounded-xl shadow-sm", topic.color, topic.textColor)}>
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{topic.title}</h2>
                                        <p className="text-sm text-gray-500 mt-1">{sections.length} secciones de estudio</p>
                                    </div>
                                </div>
                                {isOpen ? <ChevronDown className="text-gray-400" /> : <ChevronRight className="text-gray-400" />}
                            </button>

                            {isOpen && (
                                <div className="p-6 bg-gray-50/50 space-y-6">
                                    {sections.map((section, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                            <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2 border-b border-indigo-50 pb-2">
                                                <Bookmark size={18} className="text-indigo-400" />
                                                {section.title}
                                            </h3>
                                            <div
                                                className="prose prose-indigo prose-sm max-w-none text-gray-600 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: section.body }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
