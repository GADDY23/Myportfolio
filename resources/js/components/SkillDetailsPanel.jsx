import { motion, AnimatePresence } from 'framer-motion';

const confidenceColors = {
    Advanced: '#10B981',
    Intermediate: '#8B5CF6',
    Learning: '#F59E0B',
};

export default function SkillDetailsPanel({ selectedSkill }) {
    return (
        <div className="skill-details-panel">
            <AnimatePresence mode="wait">
                {selectedSkill ? (
                    <motion.div
                        key={selectedSkill.id}
                        className="skill-details-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {/* Header */}
                        <div className="skill-details-header">
                            <span className="skill-details-icon">{selectedSkill.icon}</span>
                            <div className="skill-details-title-group">
                                <h3 className="skill-details-name">{selectedSkill.name}</h3>
                                <span className="skill-details-type">{selectedSkill.type}</span>
                            </div>
                        </div>

                        {/* Category Badge */}
                        <div
                            className="skill-details-category-badge"
                            style={{
                                '--badge-accent': getCategoryAccent(selectedSkill.category),
                            }}
                        >
                            {selectedSkill.category}
                        </div>

                        {/* Description */}
                        <p className="skill-details-description">{selectedSkill.description}</p>

                        {/* Projects */}
                        <div className="skill-details-section">
                            <h4 className="skill-details-section-title">Projects</h4>
                            <ul className="skill-details-list">
                                {selectedSkill.projects.map((project) => (
                                    <li key={project} className="skill-details-list-item">
                                        <span className="skill-details-bullet">▹</span>
                                        <span>{project}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Experience */}
                        <div className="skill-details-section">
                            <h4 className="skill-details-section-title">Experience</h4>
                            <span className="skill-details-experience-tag">
                                {selectedSkill.experience}
                            </span>
                        </div>

                        {/* Confidence */}
                        <div className="skill-details-section">
                            <h4 className="skill-details-section-title">Confidence</h4>
                            <div className="skill-details-confidence">
                                <div
                                    className="skill-details-confidence-bar"
                                    style={{
                                        '--confidence-width': getConfidenceWidth(selectedSkill.confidence),
                                        '--confidence-color': confidenceColors[selectedSkill.confidence] || '#8B5CF6',
                                    }}
                                >
                                    <motion.div
                                        className="skill-details-confidence-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: getConfidenceWidth(selectedSkill.confidence) }}
                                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                                    />
                                </div>
                                <span
                                    className="skill-details-confidence-label"
                                    style={{ color: confidenceColors[selectedSkill.confidence] }}
                                >
                                    {selectedSkill.confidence}
                                </span>
                            </div>
                        </div>

                        {/* Related Skills */}
                        {selectedSkill.relatedSkills && selectedSkill.relatedSkills.length > 0 && (
                            <div className="skill-details-section">
                                <h4 className="skill-details-section-title">Related Skills</h4>
                                <div className="skill-details-related">
                                    {selectedSkill.relatedSkills.map((related) => (
                                        <span key={related} className="skill-details-related-badge">
                                            {related}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        className="skill-details-empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="skill-details-empty-icon">✦</div>
                        <h3 className="skill-details-empty-title">Select a Skill</h3>
                        <p className="skill-details-empty-text">
                            Click on any technology node in the skill tree to view details about my experience and proficiency.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function getCategoryAccent(category) {
    const accents = {
        Frontend: '#3B82F6',
        Backend: '#8B5CF6',
        Database: '#10B981',
        Tools: '#F59E0B',
        'IT Support': '#06B6D4',
        'Professional Skills': '#F4F3FF',
    };
    return accents[category] || '#8B5CF6';
}

function getConfidenceWidth(confidence) {
    const widths = {
        Advanced: '85%',
        Intermediate: '60%',
        Learning: '35%',
    };
    return widths[confidence] || '50%';
}

