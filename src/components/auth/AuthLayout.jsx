import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BrandPanel from './BrandPanel';

/**
 * Common auth page layout: brand panel (left) + form area (right).
 *
 * @param {object} props
 * @param {object} props.brand - Props forwarded to BrandPanel
 * @param {React.ReactNode} props.children - Form content
 */
const AuthLayout = ({ brand, children }) => (
    <div className="min-h-screen bg-[#f5f5f7] font-sans flex">
        {/* Left: Brand panel */}
        <BrandPanel {...brand} />

        {/* Right: Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                {/* Mobile Logo — hidden on desktop where BrandPanel is visible */}
                <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
                    <div className="w-8 h-8 rounded-lg bg-[#2997ff] flex items-center justify-center text-white font-bold text-base">
                        M
                    </div>
                    <span className="font-semibold text-xl tracking-tight text-[#1d1d1f]">
                        MediEquip
                    </span>
                </Link>

                {children}
            </motion.div>
        </div>
    </div>
);

export default AuthLayout;
