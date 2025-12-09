import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Check, X, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

export default function FlashcardDeck({ cards, color }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [reviewQueue, setReviewQueue] = useState([]);
    const [knownCount, setKnownCount] = useState(0);

    // Reset state when cards change (e.g. changing topic)
    useEffect(() => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setCompleted(false);
        setReviewQueue([]);
        setKnownCount(0);
    }, [cards]);

    const currentCard = cards[currentIndex];

    const handleFlip = () => setIsFlipped(!isFlipped);

    const handleNext = (known) => {
        setIsFlipped(false);

        if (known) {
            setKnownCount(prev => prev + 1);
        } else {
            setReviewQueue(prev => [...prev, currentCard]);
        }

        // Wait for flip back animation
        setTimeout(() => {
            if (currentIndex < cards.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                // End of main deck
                if (reviewQueue.length > 0 && known) {
                    // If we just finished and marked as known, but have review queue
                    // Actually, the logic is: finish main deck -> ask to review missed ones?
                    // For simplicity: just show completion screen.
                    setCompleted(true);
                } else if (!known) {
                    // Just added to review queue and it was the last one
                    setCompleted(true);
                } else {
                    setCompleted(true);
                }
            }
        }, 200);
    };

    const restart = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setCompleted(false);
        setReviewQueue([]);
        setKnownCount(0);
    };

    if (completed) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Sesión Completada!</h3>
                <p className="text-gray-500 mb-8">
                    Has repasado {cards.length} conceptos.
                    {reviewQueue.length > 0 ? ` Necesitas repasar ${reviewQueue.length}.` : " ¡Perfecto!"}
                </p>
                <button
                    onClick={restart}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                >
                    <RefreshCw size={20} />
                    Empezar de nuevo
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto perspective-1000">
            <div className="mb-4 flex justify-between text-sm text-gray-400 font-medium">
                <span>Tarjeta {currentIndex + 1} de {cards.length}</span>
                <span>{knownCount} Dominadas</span>
            </div>

            <div
                className="relative h-80 cursor-pointer group"
                onClick={handleFlip}
            >
                <motion.div
                    className={clsx(
                        "w-full h-full absolute inset-0 rounded-2xl shadow-lg border border-gray-100 p-8 flex items-center justify-center text-center backface-hidden transition-colors duration-300",
                        color ? color : "bg-white"
                    )}
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Concepto</p>
                        <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                            {currentCard.front}
                        </h3>
                        <p className="text-sm text-gray-400 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            Clic para girar
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full h-full absolute inset-0 rounded-2xl shadow-lg bg-white border border-gray-200 p-8 flex items-center justify-center text-center backface-hidden"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 360 : 180 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div>
                        <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">Definición</p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {currentCard.back}
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                    className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium border border-red-100"
                >
                    <X size={20} />
                    Repasar
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                    className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors font-medium border border-green-100"
                >
                    <Check size={20} />
                    Lo sabía
                </button>
            </div>
        </div>
    );
}
