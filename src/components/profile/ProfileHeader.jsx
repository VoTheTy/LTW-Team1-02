import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { TIER_CONFIG } from '../../data/mockUser';

/**
 * Profile header with avatar, name, email, and membership tier badge.
 *
 * @param {object} props
 * @param {object} props.user - The user object
 */
const ProfileHeader = ({ user }) => {
    const tier = TIER_CONFIG[user.tier];
    const initials = user.name
        .split(' ')
        .map((w) => w[0])
        .slice(-2)
        .join('')
        .toUpperCase();

    const memberDate = new Date(user.memberSince).toLocaleDateString('vi-VN', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8"
        >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2997ff] to-[#147ce5] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-400/20">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full rounded-2xl object-cover"
                            />
                        ) : (
                            initials
                        )}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#86868b] hover:text-[#2997ff] hover:border-[#2997ff]/30 transition-all shadow-sm opacity-0 group-hover:opacity-100">
                        <Camera size={14} strokeWidth={2} />
                    </button>
                </div>

                {/* Info */}
                <div className="text-center sm:text-left flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
                            {user.name}
                        </h1>
                        {/* Tier badge */}
                        <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${tier.bgColor} ${tier.textColor}`}
                        >
                            {tier.icon} Thành viên {tier.label}
                        </span>
                    </div>
                    <p className="text-sm text-[#86868b]">{user.email}</p>
                    <p className="text-xs text-[#86868b] mt-1">
                        Thành viên từ {memberDate}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileHeader;
