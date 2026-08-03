import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
        height: 'auto',
        opacity: 1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function ExperienceCard({ card, index }) {
    const [expanded, setExpanded] = useState(false);
    const isFullWidth = card.fullWidth;

    const toggleExpand = () => {
        setExpanded((prev) => !prev);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand();
        }
    };

    return (
        <motion.article
            className={`experience-card ${isFullWidth ? 'experience-card--full' : ''}`}
            variants={cardVariants}
            whileHover={{
                scale: 1.02,
                y: -6,
                transition: { duration: 0.25, ease: 'easeOut' },
            }}
            onHoverStart={() => {}}
            onHoverEnd={() => {}}
            layout
        >
            <div className="experience-card__inner">
                {/* Badge */}
                <span
                    className="experience-card__badge"
                    style={{ '--badge-color': card.badgeColor }}
                >
                    {card.badge}
                </span>

                {/* Icon + Title Row */}
                <div className="experience-card__header">
                    <span className="experience-card__icon" aria-hidden="true">
                        {card.icon}
                    </span>
                    <div className="experience-card__titles">
                        <h3 className="experience-card__title">{card.title}</h3>
                        <p className="experience-card__subtitle">{card.subtitle}</p>
                        {card.year && (
                            <span className="experience-card__year">{card.year}</span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="experience-card__description">{card.description}</p>

                {/* Achievements (Education) */}
                {card.achievements && (
                    <div className="experience-card__tags">
                        {card.achievements.map((achievement) => (
                            <span key={achievement} className="experience-card__tag experience-card__tag--achievement">
                                {achievement}
                            </span>
                        ))}
                    </div>
                )}

                {/* Skills (Internship) - always visible */}
                {card.skills && (
                    <div className="experience-card__tags">
                        {card.skills.map((skill) => (
                            <span key={skill} className="experience-card__tag experience-card__tag--skill">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {/* Projects list (Personal Projects) - always visible */}
                {card.projects && (
                    <ul className="experience-card__list">
                        {card.projects.map((project) => (
                            <li key={project} className="experience-card__list-item">
                                <span className="experience-card__list-bullet">•</span>
                                {project}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Expandable Content */}
                {(card.highlights || card.technologies || card.currentlyLearning || card.careerGoal) && (
                    <>
                        {/* Expand/Collapse Toggle */}
                        <button
                            className="experience-card__toggle"
                            onClick={toggleExpand}
                            onKeyDown={handleKeyDown}
                            aria-expanded={expanded}
                            aria-label={expanded ? 'Show less details' : 'Show more details'}
                            type="button"
                        >
                            <span>{expanded ? 'Show less' : 'Show more'}</span>
                            <motion.span
                                className="experience-card__toggle-icon"
                                animate={{ rotate: expanded ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                aria-hidden="true"
                            >
                                ↓
                            </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                            {expanded && (
                                <motion.div
                                    className="experience-card__expandable"
                                    variants={contentVariants}
                                    initial="collapsed"
                                    animate="expanded"
                                    exit="collapsed"
                                >
                                    <div className="experience-card__expandable-inner">
                                        {/* Capstone Highlights */}
                                        {card.highlights && (
                                            <div className="experience-card__expand-section">
                                                <h4 className="experience-card__expand-title">Highlights</h4>
                                                <ul className="experience-card__expand-list">
                                                    {card.highlights.map((item) => (
                                                        <li key={item} className="experience-card__expand-item">
                                                            <span className="experience-card__check" aria-hidden="true">✔</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Capstone Technologies */}
                                        {card.technologies && (
                                            <div className="experience-card__expand-section">
                                                <h4 className="experience-card__expand-title">Technologies</h4>
                                                <div className="experience-card__tags">
                                                    {card.technologies.map((tech) => (
                                                        <span key={tech} className="experience-card__tag experience-card__tag--tech">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Continuous Learning - Currently Learning */}
                                        {card.currentlyLearning && (
                                            <div className="experience-card__expand-section">
                                                <h4 className="experience-card__expand-title">Currently Learning</h4>
                                                <div className="experience-card__tags">
                                                    {card.currentlyLearning.map((item) => (
                                                        <span key={item} className="experience-card__tag experience-card__tag--learning">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Career Goal */}
                                        {card.careerGoal && (
                                            <div className="experience-card__expand-section">
                                                <h4 className="experience-card__expand-title">Career Goal</h4>
                                                <p className="experience-card__goal-text">{card.careerGoal}</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </motion.article>
    );
}

