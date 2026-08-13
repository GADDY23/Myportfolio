import { motion, useReducedMotion } from 'framer-motion';

export default function SkillNode({ skill, accent, isSelected, isExpanded, onClick, index, categoryId }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.button
            className="skill-node"
            type="button"
            onClick={() => onClick(skill)}
            aria-label={`${skill.name} - ${skill.type}`}
            data-category-id={categoryId}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            animate={{
                opacity: isExpanded ? 1 : 0,
                y: isExpanded || shouldReduceMotion ? 0 : -8,
            }}
            transition={{
                duration: shouldReduceMotion ? 0.01 : 0.25,
                ease: 'easeOut',
                delay: shouldReduceMotion ? 0 : 0.04 * index,
            }}
            whileHover={{ scale: isExpanded ? 1.08 : 1 }}
            whileTap={{ scale: isExpanded ? 0.95 : 1 }}
            style={{
                '--node-accent': accent,
                '--node-accent-rgb': accent === '#3B82F6' ? '59,130,246' :
                    accent === '#8B5CF6' ? '139,92,246' :
                    accent === '#10B981' ? '16,185,129' :
                    accent === '#F59E0B' ? '245,158,11' :
                    accent === '#06B6D4' ? '6,182,212' :
                    '244,243,255',
            }}
        >
            <motion.div
                className={`skill-node-circle ${isSelected ? 'skill-node-circle--selected' : ''}`}
                animate={
                    isSelected
                        ? {
                              boxShadow: [
                                  `0 0 12px rgba(var(--node-accent-rgb),0.4), 0 0 24px rgba(var(--node-accent-rgb),0.2)`,
                                  `0 0 18px rgba(var(--node-accent-rgb),0.6), 0 0 36px rgba(var(--node-accent-rgb),0.3)`,
                                  `0 0 12px rgba(var(--node-accent-rgb),0.4), 0 0 24px rgba(var(--node-accent-rgb),0.2)`,
                              ],
                          }
                        : {}
                }
                transition={{
                    duration: shouldReduceMotion ? 0.01 : 2,
                    repeat: shouldReduceMotion ? 0 : Infinity,
                    ease: 'easeInOut',
                }}
            >
                <span className="skill-node-icon">{skill.icon}</span>
            </motion.div>
            <motion.span
                className="skill-node-name"
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={{ delay: isExpanded ? 0.05 * index + 0.1 : 0 }}
            >
                {skill.name}
            </motion.span>
            {skill.confidence === 'Learning' && (
                <motion.span
                    className="skill-node-learning"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: isExpanded ? 1 : 0, scale: isExpanded ? 1 : 0 }}
                    transition={{ delay: isExpanded ? 0.05 * index + 0.2 : 0 }}
                >
                    Learning
                </motion.span>
            )}
        </motion.button>
    );
}

