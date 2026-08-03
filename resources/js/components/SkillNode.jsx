import { motion } from 'framer-motion';

export default function SkillNode({ skill, accent, isSelected, isExpanded, onClick, index, categoryId }) {
    return (
        <motion.button
            className="skill-node"
            type="button"
            onClick={() => onClick(skill)}
            aria-label={`${skill.name} - ${skill.type}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: isExpanded ? 1 : 0,
                opacity: isExpanded ? 1 : 0,
            }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
                delay: isExpanded ? 0.05 * index : 0,
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
                    duration: 2,
                    repeat: Infinity,
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

