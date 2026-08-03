import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Ferrofluid from '../components/Ferrofluid';
import CharacterCard from '../components/CharacterCard';
import PlayerProfileCard from '../components/PlayerProfileCard';
import StatsCard from '../components/StatsCard';
import ProfileDetailsCard from '../components/ProfileDetailsCard';
import AchievementsCard from '../components/AchievementsCard';
import ContactCard from '../components/ContactCard';

function Profile() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        document.documentElement.classList.add('profile-active');
        document.body.classList.add('profile-active');
        const timer = setTimeout(() => setVisible(true), 100);
        return () => {
            clearTimeout(timer);
            document.documentElement.classList.remove('profile-active');
            document.body.classList.remove('profile-active');
        };
    }, []);

    return (
        <div className={`profile-page ${visible ? 'profile-page--visible' : ''}`}>
            <div className="ferrofluid-backdrop" aria-hidden="true">
                <Ferrofluid
                    colors={['#7C3AED', '#A855F7', '#06B6D4']}
                    speed={0.35}
                    scale={1.25}
                    turbulence={0.9}
                    fluidity={0.12}
                    rimWidth={0.18}
                    sharpness={2.3}
                    shimmer={1.1}
                    glow={1.6}
                    flowDirection="down"
                    opacity={0.5}
                    mouseInteraction={false}
                    dpr={1}
                />
            </div>

            {/* Enhanced background layers */}
            <div className="aaa-bg-layer" aria-hidden="true">
                <div className="aaa-bg-hex" aria-hidden="true" />
                <div className="aaa-bg-particles" aria-hidden="true">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <span key={i} className="aaa-bg-particle" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 8) * 0.7}s` }} />
                    ))}
                </div>
                <div className="aaa-bg-circuits" aria-hidden="true">
                    <span /><span /><span />
                </div>
                <div className="aaa-bg-bloom" aria-hidden="true" />
                <div className="aaa-bg-scan" aria-hidden="true" />
            </div>

            <div className="profile-dashboard">
                {/* Top Bar */}
                <div className="profile-topbar">
                    <Link to="/" className="profile-back">
                        <span className="profile-back-arrow" aria-hidden="true">←</span>
                        Back to Home
                    </Link>
                    <motion.div
                        className="profile-heading"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="profile-heading-accent" aria-hidden="true">◆</span>
                        <h1>Character Profile</h1>
                        <span className="profile-heading-accent" aria-hidden="true">◆</span>
                    </motion.div>
                    <div className="profile-topbar-spacer" aria-hidden="true" />
                </div>

                {/* Character Profile Grid — 3 column RPG layout */}
                <div className="aaa-dash-grid">
                    {/* LEFT COLUMN — Character Showcase */}
                    <div className="aaa-col aaa-col--left">
                        <div className="aaa-col-inner">
                            <CharacterCard />
                        </div>
                    </div>

                    {/* CENTER COLUMN — Identity & Information */}
                    <div className="aaa-col aaa-col--center">
                        <div className="aaa-col-inner">
                            <PlayerProfileCard />
                            <ProfileDetailsCard />
                            <ContactCard />
                        </div>
                    </div>

                    {/* RIGHT COLUMN — Stats & Achievements */}
                    <div className="aaa-col aaa-col--right">
                        <div className="aaa-col-inner">
                            <StatsCard />
                            <AchievementsCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
