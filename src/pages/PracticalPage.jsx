import React, { useState } from 'react';
import { ChevronRight, RotateCcw, CheckCircle, ClipboardList } from 'lucide-react';
import clsx from 'clsx';

const decisionTree = [
    {
        id: 'neae',
        label: 'Atención a la Diversidad (NEAE)',
        description: 'Adaptaciones para alumnos con necesidades específicas.',
        options: [
            {
                id: 'down',
                label: 'Síndrome de Down',
                result: [
                    "Refuerzo positivo constante.",
                    "Aprendizaje por imitación (tú haces, él repite).",
                    "Explicaciones lentas y acompañadas.",
                    "Evitar la complejidad abstracta."
                ]
            },
            {
                id: 'tea',
                label: 'Autismo (TEA)',
                result: [
                    "Anticipación: Estructurar el entorno y explicar qué va a pasar antes.",
                    "Uso de pictogramas o apoyo visual.",
                    "Actuar sin prisas y evitar contacto físico forzado.",
                    "Respetar sus rutinas."
                ]
            },
            {
                id: 'tdah',
                label: 'Hiperactividad (TDAH)',
                result: [
                    "Tareas cortas y de éxito rápido (para la autoestima).",
                    "Actividades de relajación.",
                    "Darle roles activos (ayudante) para canalizar energía.",
                    "Evitar largas explicaciones verbales."
                ]
            },
            {
                id: 'altas',
                label: 'Altas Capacidades',
                result: [
                    "Ambiente dinámico y retos intelectuales.",
                    "Fomentar que se sientan aceptados por el grupo.",
                    "Dar roles de liderazgo o mayor complejidad en la tarea.",
                    "Evitar la repetición mecánica."
                ]
            },
            {
                id: 'motoras',
                label: 'Dificultades Motoras',
                result: [
                    "Eliminar barreras arquitectónicas.",
                    "Adaptar material (ej. balones de espuma, implementos ligeros).",
                    "Dar tiempos de descanso.",
                    "Diseño de actividades empáticas (ej. vóley sentado)."
                ]
            }
        ]
    },
    {
        id: 'session',
        label: 'Diseño de Sesión (Contenidos)',
        description: 'Pautas metodológicas según el contenido a trabajar.',
        options: [
            {
                id: 'habilidades',
                label: 'Habilidades Motrices',
                result: [
                    "Define qué tipo de habilidad es (Locomotriz, Manipulativa, etc.).",
                    "Trabaja desde la vivencia y la exploración.",
                    "Evita la automatización temprana.",
                    "Usa juegos que requieran ajuste motor."
                ]
            },
            {
                id: 'deportes',
                label: 'Iniciación Deportiva',
                result: [
                    "Usa el Modelo Comprensivo (Teaching Games for Understanding).",
                    "No pongas filas de niños esperando.",
                    "Juegos modificados (ej: 3x3 en medio campo) para aumentar participación.",
                    "Enseña la táctica antes que la técnica."
                ]
            },
            {
                id: 'fisica',
                label: 'Condición Física y Salud',
                result: [
                    "Nunca hables de 'entrenamiento' o 'rendimiento'.",
                    "Habla de 'Juegos de persecución' (resistencia) o 'trepa' (fuerza).",
                    "Justifícalo siempre desde la Salud y creación de hábitos.",
                    "Controla la frecuencia cardíaca (100-115 ppm en 6-8 años)."
                ]
            },
            {
                id: 'expresion',
                label: 'Expresión Corporal',
                result: [
                    "Usa la desinhibición primero (caminar ocupando espacios).",
                    "Empieza por el trabajo individual antes de exponerlos al grupo.",
                    "Usa soportes musicales variados.",
                    "Fomenta la creatividad y no la imitación de modelos cerrados."
                ]
            }
        ]
    },
    {
        id: 'theory',
        label: 'Justificación Teórica',
        description: 'Argumentos para la defensa de la programación.',
        options: [
            {
                id: 'arnold',
                label: 'Modelo de Arnold',
                result: [
                    "Educación EN el movimiento (Práctica/Disfrute).",
                    "Educación ACERCA del movimiento (Teórica/Salud).",
                    "Educación A TRAVÉS del movimiento (Valores/Social).",
                    "Es la justificación más completa para cualquier sesión."
                ]
            },
            {
                id: 'parlebas',
                label: 'Praxiología Motriz',
                result: [
                    "La sesión desarrolla la 'Conducta Motriz', no solo el movimiento.",
                    "Analiza la Lógica Interna de la tarea (Incertidumbre).",
                    "Fomenta la Sociomotricidad (relación con otros).",
                    "Justifica el uso del juego como portador de significado."
                ]
            }
        ]
    }
];

export default function PracticalPage() {
    const [history, setHistory] = useState([]); // Array of selections
    const [currentStep, setCurrentStep] = useState(decisionTree); // Current options to show
    const [finalResult, setFinalResult] = useState(null);

    const handleSelect = (option) => {
        const newHistory = [...history, option.label];
        setHistory(newHistory);

        if (option.result) {
            setFinalResult(option.result);
            setCurrentStep(null);
        } else if (option.options) {
            setCurrentStep(option.options);
        }
    };

    const reset = () => {
        setHistory([]);
        setCurrentStep(decisionTree);
        setFinalResult(null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Asistente de Supuestos Prácticos</h1>
                <p className="text-gray-500 text-sm">Árbol de decisión para encontrar los puntos clave de tu defensa.</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 min-h-[500px]">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto pb-2">
                    <button onClick={reset} className="hover:text-indigo-600 font-medium flex items-center gap-1">
                        <ClipboardList size={16} />
                        Inicio
                    </button>
                    {history.map((step, index) => (
                        <React.Fragment key={index}>
                            <ChevronRight size={14} />
                            <span className="font-medium text-gray-900 whitespace-nowrap">{step}</span>
                        </React.Fragment>
                    ))}
                </div>

                {/* Selection Step */}
                {currentStep && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {currentStep.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option)}
                                className="text-left p-6 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                            >
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 mb-2">
                                    {option.label}
                                </h3>
                                {option.description && (
                                    <p className="text-sm text-gray-500 group-hover:text-indigo-600/80">
                                        {option.description}
                                    </p>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Final Result */}
                {finalResult && (
                    <div className="animate-in zoom-in-95 duration-300">
                        <div className="bg-green-50 rounded-2xl p-8 border border-green-100 mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <CheckCircle size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-green-900">Puntos Clave a Mencionar</h3>
                            </div>
                            <ul className="space-y-4">
                                {finalResult.map((point, index) => (
                                    <li key={index} className="flex gap-3 text-gray-700 font-medium">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2.5 shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={reset}
                                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                            >
                                <RotateCcw size={20} />
                                Nueva Consulta
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
