import { motion } from 'framer-motion';

export default function CategoryNode({ category, isSelected, isHovered, onClick, onHover, onLeave, index }) {
    const accentVar = {
        '--cat-accent': category.accent,
        '--cat-accent-rgb': category.accent === '#3B82F6' ? '59,130,246' :
            category.accent === '#8B5CF6' ? '139,92,246' :
            category.accent === '#10B981' ? '16,185,129' :
            category.accent === '#F59E0B' ? '245,158,11' :
            category.accent === '#06B6D4' ? '6,182,212' :
            '244,243,255',
    };

    return (
        <motion.button
            className={`skill-category-node ${isSelected ? 'skill-category-node--selected' : ''}`}
            type="button"
            style={accentVar}
            onClick={onClick}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            aria-label={`${category.label} - ${category.skills.length} skills`}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
                delay: 0.15 + index * 0.08,
            }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className="skill-category-circle"
                animate={
                    isSelected
                        ? {
                              boxShadow: [
                                  `0 0 15px rgba(var(--cat-accent-rgb),0.4), 0 0 30px rgba(var(--cat-accent-rgb),0.2)`,
                                  `0 0 22px rgba(var(--cat-accent-rgb),0.6), 0 0 45px rgba(var(--cat-accent-rgb),0.3)`,
                                  `0 0 15px rgba(var(--cat-accent-rgb),0.4), 0 0 30px rgba(var(--cat-accent-rgb),0.2)`,
                              ],
                          }
                        : {}
                }
                transition={{
                    duration: 2,
                    repeat: isSelected ? Infinity : 0,
                    ease: 'easeInOut',
                }}
            >
                <span className="skill-category-icon">{category.icon}</span>
            </motion.div>
            <motion.span
                className="skill-category-label"
                animate={{ color: isSelected ? category.accent : 'rgba(231,228,255,0.78)' }}
            >
                {category.label}
            </motion.span>
            <motion.span
                className="skill-category-count"
                animate={{ opacity: isSelected ? 1 : 0.5 }}
            >
                {category.skills.length} skills
            </motion.span>
        </motion.button>
    );
}

