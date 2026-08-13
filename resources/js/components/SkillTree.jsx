import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
    const [positions, setPositions] = useState({ core: null, categories: {}, children: {}, width: 0 });
    const shouldReduceMotion = useReducedMotion();

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
            const getCenter = (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top + rect.height / 2,
                };
            };
            const corePos = coreEl
                ? getCenter(coreEl)
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
                    catPositions[cat.id] = getCenter(el);
                }
            });

            const childPositions = {};
            container.querySelectorAll('.skill-node').forEach((el) => {
                const categoryId = el.dataset.categoryId;
                if (categoryId) {
                    childPositions[categoryId] ??= [];
                    childPositions[categoryId].push(getCenter(el));
                }
            });

            setPositions({
                core: corePos,
                categories: catPositions,
                children: childPositions,
                width: containerRect.width,
            });
        };

        // Delay to ensure DOM is rendered
        const timer = setTimeout(calculatePositions, 100);
        const expandedTimer = setTimeout(calculatePositions, 360);
        window.addEventListener('resize', calculatePositions);

        return () => {
            clearTimeout(timer);
            clearTimeout(expandedTimer);
            window.removeEventListener('resize', calculatePositions);
        };
    }, [expandedCategory]);

    const expandedCategoryData = expandedCategory
        ? skillCategories.find((c) => c.id === expandedCategory)
        : null;

    const branchWidth = 176;
    const parentX = expandedCategory ? positions.categories[expandedCategory]?.x : null;
    const safeAnchorX = parentX && positions.width
        ? Math.min(Math.max(parentX, branchWidth / 2), positions.width - branchWidth / 2)
        : null;
    const branchOffset = safeAnchorX && positions.width
        ? safeAnchorX - positions.width / 2
        : 0;

    return (
        <div className={`skill-tree-container ${selectedCategory ? 'skill-tree-container--has-selection' : ''}`} ref={containerRef}>
            <ConnectionLines
                categoryPositions={positions.categories}
                corePosition={positions.core}
                selectedCategory={selectedCategory}
                hoveredCategory={hoveredCategory}
                childPositions={positions.children}
                reduceMotion={shouldReduceMotion}
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
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {expandedCategoryData && (
                    <motion.div
                        key={expandedCategoryData.id}
                        className="skill-tree-nodes"
                        style={{ '--branch-offset': `${branchOffset}px` }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.28, ease: 'easeOut' }}
                    >
                        <div className="skill-tree-nodes-inner">
                            {expandedCategoryData.skills.map((skill, skillIndex) => (
                                <SkillNode
                                    key={skill.id}
                                    skill={skill}
                                    accent={expandedCategoryData.accent}
                                    isSelected={selectedSkill?.id === skill.id}
                                    isExpanded={true}
                                    onClick={handleSkillClick}
                                    index={skillIndex}
                                    categoryId={expandedCategoryData.id}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

