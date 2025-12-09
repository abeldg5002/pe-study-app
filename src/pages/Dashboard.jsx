import React from 'react';
import { Link } from 'react-router-dom';
import { topics } from '../data';
import { ArrowRight, BookOpen, Brain, Trophy } from 'lucide-react';
import clsx from 'clsx';

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Hola, Opositor</h1>
                <p className="text-gray-500 mt-2">Prepárate para tu próxima sesión de estudio profundo.</p>
            </header>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Temas Completados</p>
                        <p className="text-2xl font-bold text-gray-900">0/6</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                        <Brain size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Flashcards Dominadas</p>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Precisión Test</p>
                        <p className="text-2xl font-bold text-gray-900">0%</p>
                    </div>
                </div>
            </div>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tus Temas de Estudio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((topic) => (
                        <Link
                            key={topic.id}
                            to={`/topic/${topic.id}`}
                            className={clsx(
                                "group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                                "bg-white border-gray-100"
                            )}
                        >
                            <div className={clsx("absolute top-0 left-0 w-full h-2 rounded-t-2xl", topic.color)} />

                            <div className="mb-4">
                                <span className={clsx("text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider", topic.color, topic.textColor)}>
                                    {topic.id.replace('-', ' ')}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                {topic.title.split(': ')[1] || topic.title}
                            </h3>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Brain size={16} />
                                    <span>{topic.flashcards.length} cards</span>
                                </div>
                                <span className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    <ArrowRight size={18} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
