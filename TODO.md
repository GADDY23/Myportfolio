# TODO: Remove HomeSection + Redesign About section

## Remove HomeSection from home page
- [x] Remove `HomeSection` import from `App.jsx`
- [x] Remove `'Home'` from `navigation` array
- [x] Remove `Home` from `sectionMessages`
- [x] Change initial `activeSection` to `'About'`
- [x] Remove `Home` case from `ferrofluidOpacity`
- [x] Remove `Home` case from `sectionAnimation`
- [x] Remove `{activeSection === 'Home' && <HomeSection />}` render
- [x] Delete `resources/js/components/HomeSection.jsx`

## Redesign About section (Tailwind CSS)
- [x] Rewrite `AboutSection.jsx` with clean, professional 2-column layout
- [x] Left: ABOUT ME label, bold headline, short paragraph
- [x] Right: Mission / Focus / Growth glass cards with hover effects
- [x] Responsive (stacks on mobile), dark theme, purple/blue accents
- [x] Verify build
