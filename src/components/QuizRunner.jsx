import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export default function QuizRunner({ questions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const currentQuestion = questions[currentIndex];

    const handleOptionClick = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === currentQuestion.correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setCompleted(true);
        }
    };

    const restart = () => {
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setCompleted(false);
    };

    if (completed) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Test Finalizado</h3>
                <p className="text-gray-500 mb-6">
                    Has acertado {score} de {questions.length} preguntas ({percentage}%).
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-8 max-w-md mx-auto overflow-hidden">
                    <div
                        className={clsx("h-full rounded-full transition-all duration-1000",
                            percentage >= 50 ? "bg-green-500" : "bg-red-500"
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <button
                    onClick={restart}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                >
                    <RefreshCw size={20} />
                    Repetir Test
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Pregunta {currentIndex + 1} de {questions.length}</span>
                <span className="text-sm font-medium text-indigo-600">Puntuación: {score}</span>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 leading-relaxed">
                    {currentQuestion.question}
                </h3>
            </div>

            <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                    let stateStyles = "border-gray-200 hover:bg-gray-50 hover:border-indigo-300";

                    if (isAnswered) {
                        if (index === currentQuestion.correct) {
                            stateStyles = "bg-green-50 border-green-200 text-green-800";
                        } else if (index === selectedOption) {
                            stateStyles = "bg-red-50 border-red-200 text-red-800";
                        } else {
                            stateStyles = "opacity-50 border-gray-100";
                        }
                    } else if (selectedOption === index) {
                        stateStyles = "bg-indigo-50 border-indigo-500 text-indigo-700";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(index)}
                            disabled={isAnswered}
                            className={clsx(
                                "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group",
                                stateStyles
                            )}
                        >
                            <span>{option}</span>
                            {isAnswered && index === currentQuestion.correct && <CheckCircle size={20} className="text-green-600" />}
                            {isAnswered && index === selectedOption && index !== currentQuestion.correct && <XCircle size={20} className="text-red-600" />}
                        </button>
                    );
                })}
            </div>

            {isAnswered && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className={clsx("p-4 rounded-xl mb-6 flex gap-3",
                        selectedOption === currentQuestion.correct ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                    )}>
                        <AlertCircle className="shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="font-bold mb-1">
                                {selectedOption === currentQuestion.correct ? "¡Correcto!" : "Incorrecto"}
                            </p>
                            <p className="text-sm opacity-90">{currentQuestion.explanation}</p>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-bold shadow-lg shadow-indigo-200"
                        >
                            Siguiente Pregunta
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
