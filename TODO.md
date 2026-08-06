# TODO

## Task: Refactor Experience / Timeline into a modern game-themed zig-zag UI

## Step 1: Update content data (experienceData.js)
- [x] 1. Improve Education description to be impact-focused with a metric
- [x] 2. Improve Internship description to be impact-focused with a metric
- [x] 3. Add `featured: true` flag to Capstone project
- [x] 4. Enhance Capstone description with problem-solved emphasis and metrics

## Step 2: Update ExperienceSection.jsx layout
- [x] 1. Add `featured` prop handling for Capstone card (special styling/class)
- [x] 2. Keep zig-zag `isLeft = index % 2 === 0` logic (Edu LEFT, Internship RIGHT, Capstone LEFT)
- [x] 3. Ensure metrics/achievements display for all cards
- [x] 4. Add game-style interactivity (hover shine, node pulse, level-up badge)

## Step 3: Update app.css for zig-zag + centered line + game theme
- [x] 1. Center the timeline line at 50% (both left/right cards on either side)
- [x] 2. Convert `.timeline-item-wrapper` to 3-column grid (card | node | card)
- [x] 3. Left cards text-right with connector on right; right cards text-left with connector on left
- [x] 4. Reduce card padding and vertical gaps for one-screen fit
- [x] 5. Add Capstone featured styling (gradient border, glow, pulse animation)
- [x] 6. Add game-style card hover effects (scanline sweep, node glow)
- [x] 7. Ensure responsive stacking below 980px (line on left, all cards full width)

## Step 4: Build & Verify
- [x] 1. Rebuild assets (`npm run build`)
- [x] 2. Verify zig-zag layout, centered line, capstone highlight, one-screen fit
- [x] 3. Verify mobile responsiveness
