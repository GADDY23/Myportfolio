import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoreNode from './CoreNode';
import CategoryNode from './CategoryNode';
import SkillNode from './SkillNode';
import ConnectionLines from './ConnectionLines';
import { skillCategories } from '../data/skillData';

export default function SkillTree({ onSkillSelect, selectedSkill, onCategorySelect, selectedCategory }) {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [coreActive, setCoreActive] = useState(false);
    const containerRef = useRef(null);
    const [positions, setPositions] = useState({ core: null, categories: {} });

    const handleCategoryClick = useCallback((categoryId) => {
        const newExpanded = expandedCategory === categoryId ? null : categoryId;
        setExpandedCategory(newExpanded);
        onCategorySelect(newExpanded);
        if (newExpanded !== categoryId) {
            setCoreActive(false);
        } else {
            setCoreActive(true);
        }
    }, [expandedCategory, onCategorySelect]);

    const handleCoreClick = useCallback(() => {
        if (expandedCategory) {
            setExpandedCategory(null);
            onCategorySelect(null);
        }
        setCoreActive(!coreActive);
    }, [expandedCategory, onCategorySelect, coreActive]);

    const handleSkillClick = useCallback((skill) => {
        onSkillSelect(skill);
    }, [onSkillSelect]);

    const handleCategoryHover = useCallback((categoryId) => {
        setHoveredCategory(categoryId);
    }, []);

    const handleCategoryLeave = useCallback(() => {
        setHoveredCategory(null);
    }, []);

    // Calculate positions for connection lines
    useEffect(() => {
        const calculatePositions = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();

            // Core node position (center)
            const coreEl = container.querySelector('.skill-core-node');
            const corePos = coreEl
                ? {
                      x: coreEl.offsetLeft + coreEl.offsetWidth / 2,
                      y: coreEl.offsetTop + coreEl.offsetHeight / 2,
                  }
                : { x: containerRect.width / 2, y: 60 };

            // Category positions
            const catPositions = {};
            const catEls = container.querySelectorAll('.skill-category-node');
            catEls.forEach((el) => {
                const id = el.getAttribute('aria-label')?.toLowerCase().replace(/\s+skills$/, '').replace(/\s+/g, '');
                // Map the aria-label back to category id
                const cat = skillCategories.find((c) =>
                    el.getAttribute('aria-label')?.startsWith(c.label)
                );
                if (cat) {
                    catPositions[cat.id] = {
                        x: el.offsetLeft + el.offsetWidth / 2,
                        y: el.offsetTop + el.offsetHeight / 2,
                    };
                }
            });

            setPositions({ core: corePos, categories: catPositions });
        };

        // Delay to ensure DOM is rendered
        const timer = setTimeout(calculatePositions, 100);
        window.addEventListener('resize', calculatePositions);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculatePositions);
        };
    }, [expandedCategory]);

    const selectedCategoryData = selectedCategory
        ? skillCategories.find((c) => c.id === selectedCategory)
        : null;

    return (
        <div className="skill-tree-container" ref={containerRef}>
            <ConnectionLines
                categoryPositions={positions.categories}
                corePosition={positions.core}
                selectedCategory={selectedCategory}
                hoveredCategory={hoveredCategory}
            />

            {/* Core Node - Center */}
            <div className="skill-tree-core-wrapper">
                <CoreNode
                    isActive={coreActive}
                    onClick={handleCoreClick}
                />
            </div>

            {/* Category Nodes - Surrounding the core */}
            <div className="skill-tree-categories">
                {skillCategories.map((category, index) => (
                    <div key={category.id} className="skill-tree-category-wrapper">
                        <CategoryNode
                            category={category}
                            isSelected={selectedCategory === category.id}
                            isHovered={hoveredCategory === category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            onHover={() => handleCategoryHover(category.id)}
                            onLeave={handleCategoryLeave}
                            index={index}
                        />
                        {/* Expanded skill nodes for this category */}
                        <AnimatePresence>
                            {expandedCategory === category.id && (
                                <motion.div
                                    className="skill-tree-nodes"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <div className="skill-tree-nodes-inner">
                                        {category.skills.map((skill, skillIndex) => (
                                            <SkillNode
                                                key={skill.id}
                                                skill={skill}
                                                accent={category.accent}
                                                isSelected={selectedSkill?.id === skill.id}
                                                isExpanded={true}
                                                onClick={handleSkillClick}
                                                index={skillIndex}
                                                categoryId={category.id}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}

