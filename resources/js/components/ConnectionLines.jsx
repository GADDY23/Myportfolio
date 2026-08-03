import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function ConnectionLines({ categoryPositions, corePosition, selectedCategory, hoveredCategory }) {
    const lines = useMemo(() => {
        if (!corePosition || !categoryPositions) return [];

        return Object.entries(categoryPositions).map(([id, pos]) => {
            const isActive = selectedCategory === id || hoveredCategory === id;
            const category = id;
            return {
                id,
                x1: corePosition.x,
                y1: corePosition.y,
                x2: pos.x,
                y2: pos.y,
                isActive,
                category,
            };
        });
    }, [corePosition, categoryPositions, selectedCategory, hoveredCategory]);

    if (lines.length === 0) return null;

    return (
        <svg
            className="skill-connections"
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        >
            {lines.map((line) => (
                <motion.line
                    key={line.id}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={line.isActive ? '#8B5CF6' : 'rgba(139,92,246,0.2)'}
                    strokeWidth={line.isActive ? 2 : 1}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: line.isActive ? 0.8 : 0.3,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: 'easeOut',
                    }}
                    style={{
                        transition: 'stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease',
                    }}
                />
            ))}
            {/* Glow overlay for active lines */}
            {lines.filter(l => l.isActive).map((line) => (
                <motion.line
                    key={`glow-${line.id}`}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#8B5CF6"
                    strokeWidth={4}
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{ filter: 'blur(4px)' }}
                />
            ))}
        </svg>
    );
}

