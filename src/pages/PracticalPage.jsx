import React, { useState } from 'react';
import { gameIdeas } from '../data';
import { ClipboardList, Plus, Trash2, ChevronDown, ChevronUp, Save } from 'lucide-react';
import clsx from 'clsx';

export default function PracticalPage() {
    const [sessionData, setSessionData] = useState({
        course: '',
        students: '',
        theme: '',
        neaeType: 'none', // 'blind', 'deaf', 'motor', 'none'
    });

    const [selectedGames, setSelectedGames] = useState([]);
    const [showGameBank, setShowGameBank] = useState(false);

    const handleInputChange = (e) => {
        setSessionData({ ...sessionData, [e.target.name]: e.target.value });
    };

    const addGame = (game) => {
        setSelectedGames([...selectedGames, { ...game, id: Date.now() }]); // Unique ID for list
        setShowGameBank(false);
    };

    const removeGame = (id) => {
        setSelectedGames(selectedGames.filter(g => g.id !== id));
    };

    const getNeaeAdaptation = (game) => {
        if (sessionData.neaeType === 'none') return "Selecciona un tipo de NEAE arriba para ver la adaptación.";
        return game.neae[sessionData.neaeType] || "No hay adaptación específica registrada para este NEAE en este juego.";
    };

    return (
        <div className="space-y-8 pb-20">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Diseñador de Sesiones (Supuestos)</h1>
                <p className="text-gray-500 text-sm">Estructura oficial de examen: Contexto, Vinculación, Desarrollo y Evaluación.</p>
            </header>

            {/* 1. CABECERA: Contextualización */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">1</div>
                    <h2 className="text-lg font-bold text-gray-900">Contextualización</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                        <input
                            type="text" name="course" placeholder="Ej: 4º Primaria"
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nº Estudiantes</label>
                        <input
                            type="text" name="students" placeholder="Ej: 24 alumnos"
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NEAE (Caso)</label>
                        <select
                            name="neaeType"
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            onChange={handleInputChange}
                            value={sessionData.neaeType}
                        >
                            <option value="none">Ninguno / General</option>
                            <option value="blind">Discapacidad Visual (Ceguera)</option>
                            <option value="deaf">Discapacidad Auditiva (Hipoacusia)</option>
                            <option value="motor">Discapacidad Motora</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Temática</label>
                    <input
                        type="text" name="theme" placeholder="Ej: Habilidades Motrices Básicas"
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={handleInputChange}
                    />
                </div>
            </section>

            {/* 2. VINCULACIÓN CURRICULAR */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">2</div>
                    <h2 className="text-lg font-bold text-gray-900">Vinculación Curricular</h2>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl text-indigo-900 text-sm leading-relaxed border border-indigo-100">
                    <p className="font-medium">Competencia Específica 2:</p>
                    <p>«Esta sesión contribuye a la Competencia Específica 2: Adaptar los elementos propios del esquema corporal y las capacidades físicas... para resolver problemas en situaciones motrices».</p>
                </div>
            </section>

            {/* 3. DESARROLLO DE LA SESIÓN */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">3</div>
                        <h2 className="text-lg font-bold text-gray-900">Desarrollo (Parte Principal)</h2>
                    </div>
                    <button
                        onClick={() => setShowGameBank(!showGameBank)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                        <Plus size={16} /> Añadir Juego
                    </button>
                </div>

                {/* Game Bank Modal/Dropdown */}
                {showGameBank && (
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-lg animate-in fade-in slide-in-from-top-2">
                        <h3 className="font-bold text-gray-700 mb-3">Banco de Recursos</h3>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                            {gameIdeas.map((category, idx) => (
                                <div key={idx}>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{category.category}</h4>
                                    <div className="space-y-2">
                                        {category.games.map((game, gIdx) => (
                                            <button
                                                key={gIdx}
                                                onClick={() => addGame(game)}
                                                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center group"
                                            >
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">{game.name}</span>
                                                <Plus size={14} className="text-gray-300 group-hover:text-indigo-600" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Selected Games List */}
                <div className="space-y-4">
                    {selectedGames.length === 0 && (
                        <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
                            No has añadido juegos aún. Pulsa "Añadir Juego".
                        </div>
                    )}

                    {selectedGames.map((game, index) => (
                        <div key={game.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group">
                            <button
                                onClick={() => removeGame(game.id)}
                                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>

                            <h3 className="text-lg font-bold text-indigo-600 mb-4">{index + 1}. {game.name}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <p className="font-bold text-gray-700 mb-1">Descripción:</p>
                                    <p className="text-gray-600 mb-3">{game.description}</p>

                                    <p className="font-bold text-gray-700 mb-1">Variante:</p>
                                    <p className="text-gray-600 mb-3">{game.variant}</p>

                                    <p className="font-bold text-gray-700 mb-1">Material:</p>
                                    <p className="text-gray-600">{game.material}</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-1">Objetivo Motor:</p>
                                        <p className="text-gray-600">{game.objective}</p>
                                    </div>

                                    <div className={clsx("p-3 rounded-lg border", sessionData.neaeType !== 'none' ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-100")}>
                                        <p className={clsx("font-bold mb-1 flex items-center gap-2", sessionData.neaeType !== 'none' ? "text-yellow-800" : "text-gray-500")}>
                                            ADAPTACIÓN NEAE {sessionData.neaeType !== 'none' && <span className="text-xs bg-yellow-200 px-2 py-0.5 rounded-full uppercase">{sessionData.neaeType}</span>}
                                        </p>
                                        <p className={clsx("text-sm", sessionData.neaeType !== 'none' ? "text-yellow-900" : "text-gray-400 italic")}>
                                            {getNeaeAdaptation(game)}
                                        </p>
                                    </div>

                                    <div className="h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                        [Espacio para Dibujo Esquemático]
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. INSTRUMENTO DE EVALUACIÓN */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">4</div>
                    <h2 className="text-lg font-bold text-gray-900">Instrumento de Evaluación (Rúbrica)</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-3 font-bold text-gray-700 w-1/4">Criterio de Evaluación</th>
                                <th className="p-3 font-bold text-gray-700 w-1/4">Bajo (0 ptos)</th>
                                <th className="p-3 font-bold text-gray-700 w-1/4">Medio (0.5 ptos)</th>
                                <th className="p-3 font-bold text-gray-700 w-1/4">Alto (1 pto)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="p-3 font-medium text-gray-900">Adapta sus movimientos a las situaciones motrices (CE.2)</td>
                                <td className="p-3 text-gray-600">Tiene dificultades para ajustar su movimiento al espacio/compañero.</td>
                                <td className="p-3 text-gray-600">Realiza los movimientos pero con falta de control o precisión en ocasiones.</td>
                                <td className="p-3 text-gray-600">Realiza movimientos precisos y ajustados a la situación de juego.</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium text-gray-900">Participa activamente respetando normas</td>
                                <td className="p-3 text-gray-600">No respeta las normas o muestra pasividad.</td>
                                <td className="p-3 text-gray-600">Participa pero necesita recordatorios sobre las normas.</td>
                                <td className="p-3 text-gray-600">Participa con entusiasmo y respeta siempre las normas y compañeros.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
