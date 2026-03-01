import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Animated floating particles for the brand panel background.
 */
const FloatingParticles = () => {
    const particles = useMemo(
        () =>
            Array.from({ length: 6 }, (_, i) => ({
                id: i,
                size: 60 + Math.random() * 100,
                x: Math.random() * 100,
                y: Math.random() * 100,
                duration: 15 + Math.random() * 10,
                delay: Math.random() * 5,
            })),
        []
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white/5"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

/**
 * Left branding panel used on Login / Register pages.
 *
 * @param {object} props
 * @param {string} props.gradientFrom - Tailwind gradient-from class, e.g. "from-[#2997ff]/20"
 * @param {string} props.heading - JSX or string for the main heading
 * @param {string} props.description
 * @param {React.ReactNode} [props.extraContent] - Stats or benefits list
 */
const BrandPanel = ({ gradientFrom, heading, description, extraContent }) => (
    <div className="hidden lg:flex w-1/2 bg-[#1d1d1f] relative overflow-hidden items-center justify-center">
        {/* Gradient overlay */}
        <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} via-transparent to-[#1d1d1f]`}
        />

        {/* Animated particles */}
        <FloatingParticles />

        {/* Grid pattern overlay */}
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage:
                    'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            }}
        />

        {/* Content */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 px-16 max-w-lg"
        >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mb-12">
                <div className="w-10 h-10 rounded-xl bg-[#2997ff] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                    M
                </div>
                <span className="text-white font-semibold text-2xl tracking-tight">
                    MediEquip
                </span>
            </Link>

            {/* Heading */}
            <h2 className="text-white text-4xl font-bold tracking-tight leading-tight mb-5">
                {heading}
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base leading-relaxed">{description}</p>

            {/* Extra content (stats / benefits) */}
            {extraContent && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-12"
                >
                    {extraContent}
                </motion.div>
            )}
        </motion.div>
    </div>
);

export default BrandPanel;
