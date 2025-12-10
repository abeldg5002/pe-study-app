import React, { useState, useEffect } from 'react';
import { gameIdeas, competencies, neaeMagicFormulas } from '../data';
import { ClipboardList, Plus, Trash2, ChevronDown, ChevronUp, Save, Wand2, Copy, Sparkles, X, Search, Check } from 'lucide-react';
import clsx from 'clsx';

export default function PracticalPage() {
    // Load initial state from localStorage if available
    const [sessionData, setSessionData] = useState(() => {
        const saved = localStorage.getItem('pe-session-data');
        return saved ? JSON.parse(saved) : {
            course: '',
            students: '',
            theme: '',
            neaeType: 'none',
            competencyId: 2, // Default to CE.2
            evalInstrument: 'rubric' // 'rubric', 'checklist', 'scale'
        };
    });

    const [selectedGames, setSelectedGames] = useState(() => {
        const saved = localStorage.getItem('pe-selected-games');
        return saved ? JSON.parse(saved) : [];
    });

    const [showGameBank, setShowGameBank] = useState(false);
    const [showNeaeTable, setShowNeaeTable] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [copied, setCopied] = useState(false);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('pe-session-data', JSON.stringify(sessionData));
    }, [sessionData]);

    useEffect(() => {
        localStorage.setItem('pe-selected-games', JSON.stringify(selectedGames));
    }, [selectedGames]);

    const handleInputChange = (e) => {
        setSessionData({ ...sessionData, [e.target.name]: e.target.value });
    };

    const addGame = (game) => {
        setSelectedGames([...selectedGames, { ...game, id: Date.now() }]);
        setShowGameBank(false);
        setSearchTerm(''); // Reset search
    };

    const removeGame = (id) => {
        setSelectedGames(selectedGames.filter(g => g.id !== id));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getNeaeAdaptation = (game) => {
        if (sessionData.neaeType === 'none') return "Selecciona un tipo de NEAE arriba para ver la adaptación.";
        return game.neae[sessionData.neaeType] || "No hay adaptación específica registrada para este NEAE en este juego.";
    };

    const getCompetencyText = () => {
        const comp = competencies.find(c => c.id == sessionData.competencyId);
        return comp ? comp.description : '';
    };

    // Filter games based on search term
    const filteredGameIdeas = gameIdeas.map(category => {
        const categoryMatches = category.category.toLowerCase().includes(searchTerm.toLowerCase());

        if (category.subcategories) {
            const filteredSubcats = category.subcategories.map(sub => {
                const games = sub.games.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
                if (games.length > 0) return { ...sub, games };
                return null;
            }).filter(Boolean);

            if (filteredSubcats.length > 0 || categoryMatches) {
                return { ...category, subcategories: filteredSubcats.length > 0 ? filteredSubcats : category.subcategories };
            }
        } else {
            const games = category.games.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (games.length > 0 || categoryMatches) return { ...category, games: games.length > 0 ? games : category.games };
        }
        return null;
    }).filter(Boolean);

    // Dynamic Evaluation Criteria Generator
    const getEvaluationCriteria = () => {
        const criteria = [
            {
                concept: "Actitud y Valores",
                description: "Participa activamente, respeta las normas y a los compañeros.",
                rubric: ["No participa o es disruptivo.", "Participa pero a veces incumple normas.", "Participa activamente y fomenta el buen clima."]
            }
        ];

        selectedGames.forEach(game => {
            // Clean objective to make it a criterion
            let obj = game.objective.charAt(0).toLowerCase() + game.objective.slice(1);
            if (obj.endsWith('.')) obj = obj.slice(0, -1);

            criteria.push({
                concept: `Juego: ${game.name}`,
                description: `Capacidad para ${obj} en situación de juego.`,
                rubric: [
                    `Tiene dificultades para ${obj}.`,
                    `Muestra progreso al ${obj} con ayuda.`,
                    `Consigue ${obj} con autonomía y eficacia.`
                ]
            });
        });

        return criteria;
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
        text += `Atención a la Diversidad (NEAE): ${neaeLabel}\n`;

        if (sessionData.neaeType !== 'none' && neaeMagicFormulas[sessionData.neaeType]) {
            text += `Medidas Generales de Intervención: "${neaeMagicFormulas[sessionData.neaeType].formula}"\n`;
        }
        text += `\n`;

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
        text += `Indicadores de Logro (Aplicados a la sesión):\n`;

        const criteria = getEvaluationCriteria();

        if (sessionData.evalInstrument === 'rubric') {
            criteria.forEach(c => {
                text += `- ${c.concept}: \n`;
                text += `  * Nivel 1 (No conseguido): ${c.rubric[0]}\n`;
                text += `  * Nivel 2 (En proceso): ${c.rubric[1]}\n`;
                text += `  * Nivel 3 (Conseguido): ${c.rubric[2]}\n`;
            });
        } else if (sessionData.evalInstrument === 'checklist') {
            criteria.forEach(c => {
                text += `- [ ] ${c.description} (SÍ/NO)\n`;
            });
        } else {
            criteria.forEach(c => {
                text += `- (1-5) ${c.description}\n`;
            });
        }

        setGeneratedText(text);
    };

    const criteria = getEvaluationCriteria();

    return (
        <div className="space-y-8 pb-20 relative">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Diseñador de Sesiones (Supuestos)</h1>
                <p className="text-gray-500 text-sm">Configura tu sesión y genera el texto listo para el examen.</p>
            </header>

            {/* NEAE Magic Formulas Modal */}
            {showNeaeTable && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b flex justify-between items-center bg-indigo-600 text-white">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Sparkles className="text-yellow-300" /> Fórmulas Mágicas NEAE
                            </h3>
                            <button onClick={() => setShowNeaeTable(false)} className="hover:bg-indigo-700 p-2 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-6">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-indigo-50 text-indigo-900">
                                        <th className="p-4 rounded-tl-lg font-bold">NEAE (Trastorno)</th>
                                        <th className="p-4 font-bold">Características Clave</th>
                                        <th className="p-4 rounded-tr-lg font-bold">FÓRMULA MÁGICA (Para el examen)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-indigo-100">
                                    {Object.entries(neaeMagicFormulas).map(([key, data]) => (
                                        <tr key={key} className="hover:bg-gray-50">
                                            <td className="p-4 font-bold text-gray-800">{data.label}</td>
                                            <td className="p-4 text-gray-600 text-sm">{data.characteristics}</td>
                                            <td className="p-4 text-indigo-700 font-medium text-sm bg-indigo-50/30 italic">"{data.formula}"</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t bg-gray-50 text-right">
                            <button onClick={() => setShowNeaeTable(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. CONTEXTUALIZACIÓN */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">1</div>
                    <h2 className="text-lg font-bold text-gray-900">Contextualización</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                        <input type="text" name="course" value={sessionData.course} placeholder="Ej: 4º Primaria" className="w-full p-2 border rounded-lg" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nº Estudiantes</label>
                        <input type="text" name="students" value={sessionData.students} placeholder="Ej: 24" className="w-full p-2 border rounded-lg" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Temática</label>
                        <input type="text" name="theme" value={sessionData.theme} placeholder="Ej: Equilibrio" className="w-full p-2 border rounded-lg" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between items-center">
                            NEAE (Caso)
                            <button
                                onClick={() => setShowNeaeTable(true)}
                                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-bold bg-indigo-50 px-2 py-0.5 rounded-full transition-colors"
                            >
                                <Sparkles size={10} /> Ver Fórmulas
                            </button>
                        </label>
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
                        <div className="sticky top-0 bg-white pb-2 border-b z-10 space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-gray-700">Banco de Recursos</h3>
                                <button onClick={() => setShowGameBank(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar juego (ej: pilla, balón, relevos)..."
                                    className="w-full pl-9 p-2 bg-gray-50 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="space-y-2 mt-3">
                            {filteredGameIdeas.length === 0 && (
                                <p className="text-center text-gray-400 text-sm py-4">No se encontraron juegos.</p>
                            )}
                            {filteredGameIdeas.map((category, idx) => (
                                <div key={idx} className="border rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
                                        className="w-full p-3 bg-gray-50 text-left font-bold text-gray-700 flex justify-between items-center hover:bg-gray-100"
                                    >
                                        {category.category}
                                        {expandedCategory === idx || searchTerm ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {(expandedCategory === idx || searchTerm) && (
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
                                    <th className="p-2 font-bold text-gray-700 w-1/4">Criterio / Indicador</th>
                                    <th className="p-2 font-bold text-gray-700 w-1/4">Nivel 1 (No Conseguido)</th>
                                    <th className="p-2 font-bold text-gray-700 w-1/4">Nivel 2 (En Proceso)</th>
                                    <th className="p-2 font-bold text-gray-700 w-1/4">Nivel 3 (Conseguido)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {criteria.map((c, idx) => (
                                    <tr key={idx}>
                                        <td className="p-3 font-medium text-gray-900">{c.concept}</td>
                                        <td className="p-3 text-gray-500 bg-red-50/30">{c.rubric[0]}</td>
                                        <td className="p-3 text-gray-500 bg-yellow-50/30">{c.rubric[1]}</td>
                                        <td className="p-3 text-gray-700 font-medium bg-green-50/30">{c.rubric[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {sessionData.evalInstrument === 'checklist' && (
                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2">
                        {criteria.map((c, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                                <span>{c.description}</span>
                            </div>
                        ))}
                    </div>
                )}
                {sessionData.evalInstrument === 'scale' && (
                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-3">
                        {criteria.map((c, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-4">
                                <span>{idx + 1}. {c.description}</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <div key={n} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-400">
                                            {n}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
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
                            onClick={handleCopy}
                            className={clsx(
                                "text-xs px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-300",
                                copied ? "bg-green-500 text-white" : "bg-gray-700 hover:bg-gray-600"
                            )}
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? "¡Copiado!" : "Copiar"}
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
