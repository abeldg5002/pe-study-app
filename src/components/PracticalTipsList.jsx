import React from 'react';
import { Lightbulb } from 'lucide-react';
import clsx from 'clsx';

export default function PracticalTipsList({ tips, color }) {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
                <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4", color ? color.replace('bg-', 'bg-opacity-50 bg-') : "bg-yellow-50")}>
                    <Lightbulb size={32} className="text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Puntos Clave para Supuestos</h3>
                <p className="text-gray-500 mt-2">Usa estos argumentos para justificar tu respuesta en el examen práctico.</p>
            </div>

            <div className="space-y-4">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                        <div className="shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed font-medium">
                            {tip}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
