import React, { useState } from 'react';
import { gameIdeas, competencies } from '../data';
import { ClipboardList, Plus, Trash2, ChevronDown, ChevronUp, Save, Wand2, Copy } from 'lucide-react';
import clsx from 'clsx';

export default function PracticalPage() {
    const [sessionData, setSessionData] = useState({
        course: '',
        students: '',
        theme: '',
        neaeType: 'none',
        competencyId: 2, // Default to CE.2
        evalInstrument: 'rubric' // 'rubric', 'checklist', 'scale'
    });

    const [selectedGames, setSelectedGames] = useState([]);
    const [showGameBank, setShowGameBank] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(null);

    const handleInputChange = (e) => {
        setSessionData({ ...sessionData, [e.target.name]: e.target.value });
    };

    const addGame = (game) => {
        setSelectedGames([...selectedGames, { ...game, id: Date.now() }]);
        setShowGameBank(false);
    };

    const removeGame = (id) => {
        setSelectedGames(selectedGames.filter(g => g.id !== id));
    };

    const getNeaeAdaptation = (game) => {
        if (sessionData.neaeType === 'none') return "Selecciona un tipo de NEAE arriba para ver la adaptación.";
        return game.neae[sessionData.neaeType] || "No hay adaptación específica registrada para este NEAE en este juego.";
    };

    const getCompetencyText = () => {
        const comp = competencies.find(c => c.id == sessionData.competencyId);
        return comp ? comp.description : '';
    };

    const generateExamText = () => {
        const comp = competencies.find(c => c.id == sessionData.competencyId);
        const neaeLabel = {
            none: "Ninguno", blind: "Discapacidad Visual", deaf: "Discapacidad Auditiva",
            motor: "Discapacidad Motora", down: "Síndrome de Down", tea: "TEA",
            tdah: "TDAH", high_cap: "Altas Capacidades"
        }[sessionData.neaeType];

        let text = `SUPUESTO PRÁCTICO: DISEÑO DE SESIÓN\n\n`;
        text += `1. CONTEXTUALIZACIÓN\n`;
        text += `Curso: ${sessionData.course || '[Indicar Curso]'}\n`;
        text += `Nº Alumnos: ${sessionData.students || '[Indicar Nº]'}\n`;
        text += `Temática: ${sessionData.theme || '[Indicar Tema]'}\n`;
        text += `Atención a la Diversidad (NEAE): ${neaeLabel}\n\n`;

        text += `2. VINCULACIÓN CURRICULAR\n`;
        text += `La sesión contribuye principalmente a la ${comp.title}: "${comp.description}".\n\n`;

        text += `3. DESARROLLO DE LA SESIÓN\n`;
        text += `Objetivo Principal: Desarrollar ${sessionData.theme || 'los contenidos propuestos'} a través de una metodología lúdica e inclusiva.\n\n`;

        text += `A) FASE DE ANIMACIÓN (Calentamiento)\n`;
        text += `- Movilidad Articular: Tobillos, rodillas, caderas, hombros y cuello (5 min).\n`;
        text += `- Juego de Activación: "Pilla-Pilla por parejas". Activación general y subida de pulsaciones.\n\n`;

        text += `B) PARTE PRINCIPAL (Juegos Específicos)\n`;
        selectedGames.forEach((game, index) => {
            text += `${index + 1}. ${game.name.toUpperCase()}\n`;
            text += `   - Descripción: ${game.description}\n`;
            text += `   - Variante: ${game.variant}\n`;
            text += `   - Objetivo: ${game.objective}\n`;
            if (sessionData.neaeType !== 'none') {
                text += `   - ADAPTACIÓN NEAE (${neaeLabel}): ${game.neae[sessionData.neaeType]}\n`;
            }
            text += `\n`;
        });

        text += `C) VUELTA A LA CALMA\n`;
        text += `- Reflexión grupal sobre lo aprendido y aseo personal.\n\n`;

        text += `4. EVALUACIÓN\n`;
        text += `Instrumento seleccionado: ${sessionData.evalInstrument === 'rubric' ? 'Rúbrica' : sessionData.evalInstrument === 'checklist' ? 'Lista de Control' : 'Escala de Valoración'}.\n`;
        text += `Criterios a evaluar:\n`;
        text += `- Participación activa y respeto a las normas.\n`;
        text += `- Adquisición de las habilidades motrices trabajadas.\n`;

        setGeneratedText(text);
    };

    return (
        <div className="space-y-8 pb-20">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Diseñador de Sesiones (Supuestos)</h1>
                <p className="text-gray-500 text-sm">Configura tu sesión y genera el texto listo para el examen.</p>
            </header>

            {/* 1. CONTEXTUALIZACIÓN */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">1</div>
                    <h2 className="text-lg font-bold text-gray-900">Contextualización</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                        <input type="text" name="course" placeholder="Ej: 4º Primaria" className="w-full p-2 border rounded-lg" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nº Estudiantes</label>
                        <input type="text" name="students" placeholder="Ej: 24" className="w-full p-2 border rounded-lg" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Temática</label>
                        <input type="text" name="theme" placeholder="Ej: Equilibrio" className="w-full p-2 border rounded-lg" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NEAE (Caso)</label>
                        <select name="neaeType" className="w-full p-2 border rounded-lg" onChange={handleInputChange} value={sessionData.neaeType}>
                            <option value="none">Ninguno / General</option>
                            <option value="blind">Discapacidad Visual</option>
                            <option value="deaf">Discapacidad Auditiva</option>
                            <option value="motor">Discapacidad Motora</option>
                            <option value="down">Síndrome de Down</option>
                            <option value="tea">TEA (Autismo)</option>
                            <option value="tdah">TDAH</option>
                            <option value="high_cap">Altas Capacidades</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* 2. VINCULACIÓN CURRICULAR */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">2</div>
                    <h2 className="text-lg font-bold text-gray-900">Vinculación Curricular</h2>
                </div>
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Competencia Específica Principal</label>
                    <select
                        name="competencyId"
                        className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={handleInputChange}
                        value={sessionData.competencyId}
                    >
                        {competencies.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                    </select>
                    <div className="bg-indigo-50 p-4 rounded-xl text-indigo-900 text-sm leading-relaxed border border-indigo-100">
                        <p className="font-medium">Descripción Oficial:</p>
                        <p>«{getCompetencyText()}»</p>
                    </div>
                </div>
            </section>

            {/* 3. DESARROLLO */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">3</div>
                        <h2 className="text-lg font-bold text-gray-900">Desarrollo (Juegos)</h2>
                    </div>
                    <button
                        onClick={() => setShowGameBank(!showGameBank)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                        <Plus size={16} /> Añadir Juego
                    </button>
                </div>

                {/* Game Bank */}
                {showGameBank && (
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-lg animate-in fade-in slide-in-from-top-2 max-h-96 overflow-y-auto">
                        <h3 className="font-bold text-gray-700 mb-3 sticky top-0 bg-white pb-2 border-b">Banco de Recursos</h3>
                        <div className="space-y-2">
                            {gameIdeas.map((category, idx) => (
                                <div key={idx} className="border rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
                                        className="w-full p-3 bg-gray-50 text-left font-bold text-gray-700 flex justify-between items-center hover:bg-gray-100"
                                    >
                                        {category.category}
                                        {expandedCategory === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {expandedCategory === idx && (
                                        <div className="p-2 bg-white space-y-4">
                                            {category.subcategories ? (
                                                category.subcategories.map((sub, sIdx) => (
                                                    <div key={sIdx}>
                                                        <h5 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2 ml-2">{sub.name}</h5>
                                                        <div className="space-y-1">
                                                            {sub.games.map((game, gIdx) => (
                                                                <button
                                                                    key={gIdx}
                                                                    onClick={() => addGame(game)}
                                                                    className="w-full text-left p-2 hover:bg-indigo-50 rounded-lg flex justify-between items-center group text-sm"
                                                                >
                                                                    <span className="text-gray-700 group-hover:text-indigo-700">{game.name}</span>
                                                                    <Plus size={14} className="text-gray-300 group-hover:text-indigo-600" />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                // Fallback for old structure if any
                                                category.games.map((game, gIdx) => (
                                                    <button key={gIdx} onClick={() => addGame(game)} className="w-full text-left p-2 hover:bg-indigo-50 rounded-lg text-sm">
                                                        {game.name}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Selected Games */}
                <div className="space-y-4">
                    {selectedGames.length === 0 && (
                        <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
                            No has añadido juegos aún.
                        </div>
                    )}
                    {selectedGames.map((game, index) => (
                        <div key={game.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group">
                            <button onClick={() => removeGame(game.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500">
                                <Trash2 size={18} />
                            </button>
                            <h3 className="text-lg font-bold text-indigo-600 mb-2">{index + 1}. {game.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{game.description}</p>
                            <div className={clsx("p-3 rounded-lg border text-sm", sessionData.neaeType !== 'none' ? "bg-yellow-50 border-yellow-200 text-yellow-900" : "bg-gray-50 border-gray-100 text-gray-500")}>
                                <strong>Adaptación NEAE:</strong> {getNeaeAdaptation(game)}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. EVALUACIÓN */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">4</div>
                    <h2 className="text-lg font-bold text-gray-900">Evaluación</h2>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instrumento de Evaluación</label>
                    <select
                        name="evalInstrument"
                        className="w-full p-2 border rounded-lg"
                        onChange={handleInputChange}
                        value={sessionData.evalInstrument}
                    >
                        <option value="rubric">Rúbrica (Matriz de desempeño)</option>
                        <option value="checklist">Lista de Control (Sí/No)</option>
                        <option value="scale">Escala de Valoración (1-5)</option>
                    </select>
                </div>

                {sessionData.evalInstrument === 'rubric' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="p-2 font-bold text-gray-700">Criterio</th>
                                    <th className="p-2 font-bold text-gray-700">En Proceso</th>
                                    <th className="p-2 font-bold text-gray-700">Conseguido</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr>
                                    <td className="p-2">Participación</td>
                                    <td className="p-2 text-gray-500">A veces participa.</td>
                                    <td className="p-2 text-gray-500">Participa activamente.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {sessionData.evalInstrument === 'checklist' && (
                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                        <p>☐ Respeta las normas del juego.</p>
                        <p>☐ Coopera con los compañeros.</p>
                        <p>☐ Aplica las habilidades motrices correctamente.</p>
                    </div>
                )}
                {sessionData.evalInstrument === 'scale' && (
                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                        <p>1. Participación: (1) (2) (3) (4) (5)</p>
                        <p>2. Respeto: (1) (2) (3) (4) (5)</p>
                    </div>
                )}
            </section>

            {/* GENERATOR ACTION */}
            <div className="sticky bottom-4 z-10">
                <button
                    onClick={generateExamText}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                    <Wand2 size={24} /> Generar Redacción de Examen
                </button>
            </div>

            {/* GENERATED OUTPUT */}
            {generatedText && (
                <section className="bg-gray-900 text-gray-100 p-6 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Wand2 className="text-purple-400" /> Texto Generado
                        </h2>
                        <button
                            onClick={() => navigator.clipboard.writeText(generatedText)}
                            className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                        >
                            <Copy size={14} /> Copiar
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={generatedText}
                        className="w-full h-96 bg-gray-800 border border-gray-700 rounded-xl p-4 font-mono text-sm leading-relaxed text-gray-300 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">Este texto es una base sólida. Personalízalo con tu estilo antes de escribirlo en el examen.</p>
                </section>
            )}
        </div>
    );
}
