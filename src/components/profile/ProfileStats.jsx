import React from 'react';
import { motion } from 'framer-motion';
import { Package, Wallet, Star, MapPin } from 'lucide-react';

const STAT_ITEMS = [
    { key: 'totalOrders', label: 'Đơn hàng', icon: Package, color: 'bg-blue-50 text-[#2997ff]' },
    { key: 'totalSpent', label: 'Tổng chi tiêu', icon: Wallet, color: 'bg-green-50 text-green-500' },
    { key: 'points', label: 'Điểm tích lũy', icon: Star, color: 'bg-amber-50 text-amber-500' },
    { key: 'savedAddresses', label: 'Địa chỉ lưu', icon: MapPin, color: 'bg-purple-50 text-purple-500' },
];

/**
 * Stats cards grid showing key user metrics.
 *
 * @param {object} props
 * @param {object} props.stats - { totalOrders, totalSpent, points, savedAddresses }
 */
const ProfileStats = ({ stats }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const value = stats[item.key];

            return (
                <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                    className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:shadow-gray-100 transition-all duration-300"
                >
                    <div
                        className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center mb-3`}
                    >
                        <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <p className="text-lg font-bold text-[#1d1d1f]">{value}</p>
                    <p className="text-xs text-[#86868b] mt-0.5">{item.label}</p>
                </motion.div>
            );
        })}
    </div>
);

export default ProfileStats;
