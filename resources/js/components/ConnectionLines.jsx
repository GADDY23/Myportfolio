import { motion } from 'framer-motion';
import { useMemo } from 'react';

const rowTolerance = 12;

function groupRows(categoryPositions) {
    return Object.entries(categoryPositions)
        .map(([id, position]) => ({ id, ...position }))
        .sort((a, b) => a.y - b.y || a.x - b.x)
        .reduce((rows, category) => {
            const row = rows.find((item) => Math.abs(item.y - category.y) < rowTolerance);
            if (row) {
                row.items.push(category);
            } else {
                rows.push({ y: category.y, items: [category] });
            }
            return rows;
        }, []);
}

export default function ConnectionLines({ categoryPositions, corePosition, selectedCategory, hoveredCategory, childPositions = {}, reduceMotion }) {
    const rows = useMemo(() => {
        if (!corePosition || !categoryPositions) return [];
        return groupRows(categoryPositions).map((row) => ({
            ...row,
            busY: Math.max(corePosition.y + 24, row.y - 24),
            minX: Math.min(...row.items.map((item) => item.x)),
            maxX: Math.max(...row.items.map((item) => item.x)),
        }));
    }, [categoryPositions, corePosition]);

    const branch = useMemo(() => {
        if (!selectedCategory || !categoryPositions[selectedCategory]) return null;
        const parent = categoryPositions[selectedCategory];
        const children = childPositions[selectedCategory] || [];
        if (!children.length) return null;

        return {
            parent,
            children,
            busY: parent.y + 28,
            minX: Math.min(parent.x, ...children.map((child) => child.x)),
            maxX: Math.max(parent.x, ...children.map((child) => child.x)),
        };
    }, [selectedCategory, categoryPositions, childPositions]);

    if (!rows.length) return null;

    const transition = (delay = 0) => ({
        duration: reduceMotion ? 0.01 : 0.28,
        delay: reduceMotion ? 0 : delay,
        ease: 'easeOut',
    });

    return (
        <svg className="skill-connections" aria-hidden="true">
            {/* Core-to-category buses: one clean trunk and one rail per category row. */}
            {rows.map((row, rowIndex) => (
                <motion.g key={`row-${rowIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition(rowIndex * 0.04)}>
                    <path
                        d={`M ${corePosition.x} ${corePosition.y} V ${row.busY} H ${row.minX} M ${corePosition.x} ${row.busY} H ${row.maxX}`}
                        className="skill-connection-rail"
                    />
                    {row.items.map((category) => {
                        const active = selectedCategory === category.id || hoveredCategory === category.id;
                        return (
                            <motion.path
                                key={category.id}
                                d={`M ${category.x} ${row.busY} V ${category.y}`}
                                className={`skill-connection-drop ${active ? 'skill-connection-drop--active' : ''}`}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={transition(0.08 + rowIndex * 0.04)}
                            />
                        );
                    })}
                </motion.g>
            ))}

            {/* The selected category receives its own compact child rail. */}
            {branch && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition(0.08)}>
                    <motion.path
                        d={`M ${branch.parent.x} ${branch.parent.y} V ${branch.busY} H ${branch.minX} M ${branch.parent.x} ${branch.busY} H ${branch.maxX}`}
                        className="skill-connection-branch-rail"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={transition()}
                    />
                    {branch.children.map((child, index) => (
                        <motion.path
                            key={`child-${index}`}
                            d={`M ${child.x} ${branch.busY} V ${child.y}`}
                            className="skill-connection-branch-drop"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={transition(0.06 + index * 0.03)}
                        />
                    ))}
                </motion.g>
            )}
        </svg>
    );
}
