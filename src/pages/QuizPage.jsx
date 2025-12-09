import React, { useState, useMemo } from 'react';
import { topics } from '../data';
import QuizRunner from '../components/QuizRunner';
import { Filter } from 'lucide-react';

export default function QuizPage() {
    const [selectedTopicId, setSelectedTopicId] = useState('all');

    const allQuestions = useMemo(() => {
        if (selectedTopicId === 'all') {
            return topics.flatMap(t => t.quiz);
        }
        return topics.find(t => t.id === selectedTopicId)?.quiz || [];
    }, [selectedTopicId]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Simulacro de Examen</h1>
                    <p className="text-gray-500 text-sm">Pon a prueba tus conocimientos con preguntas tipo test.</p>
                </div>

                <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                    <Filter size={16} className="text-gray-400 ml-2" />
                    <select
                        value={selectedTopicId}
                        onChange={(e) => setSelectedTopicId(e.target.value)}
                        className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer outline-none pr-8"
                    >
                        <option value="all">Todos los Temas ({topics.reduce((acc, t) => acc + t.quiz.length, 0)})</option>
                        {topics.map(t => (
                            <option key={t.id} value={t.id}>{t.title.split(':')[0]} ({t.quiz.length})</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 min-h-[500px]">
                {allQuestions.length > 0 ? (
                    <QuizRunner questions={allQuestions} />
                ) : (
                    <p className="text-gray-500 text-center py-10">No hay preguntas disponibles.</p>
                )}
            </div>
        </div>
    );
}
