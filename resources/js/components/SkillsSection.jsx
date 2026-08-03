import { useState } from 'react';
import { motion } from 'framer-motion';
import SkillTree from './SkillTree';
import SkillDetailsPanel from './SkillDetailsPanel';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function SkillsSection() {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSkillSelect = (skill) => {
        setSelectedSkill(skill);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        // Don't clear selected skill when changing categories
    };

    return (
        <section className="skills-section" aria-label="Skills">
            <motion.div
                className="skills-section-inner"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                {/* Section Header */}
                <motion.div className="skills-section-header" variants={itemVariants}>
                    <span className="skills-section-label">SKILLS</span>
                    <h2 className="skills-section-heading">
                        Technologies and tools I use to build modern web applications and provide reliable technical support.
                    </h2>
                    <p className="skills-section-subtitle">
                        Every skill represents practical experience gained through academic projects, internships, and continuous learning.
                    </p>
                </motion.div>

                {/* Main Content: Tree + Details */}
                <motion.div className="skills-section-layout" variants={itemVariants}>
                    {/* LEFT: Skill Tree (60%) */}
                    <div className="skills-section-tree">
                        <SkillTree
                            onSkillSelect={handleSkillSelect}
                            selectedSkill={selectedSkill}
                            onCategorySelect={handleCategorySelect}
                            selectedCategory={selectedCategory}
                        />
                    </div>

                    {/* RIGHT: Details Panel (40%) */}
                    <div className="skills-section-details">
                        <SkillDetailsPanel selectedSkill={selectedSkill} />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

