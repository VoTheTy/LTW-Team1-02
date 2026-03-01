import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Package,
    Truck,
    MapPin,
    Shield,
    Heart,
    Bell,
    HelpCircle,
    LogOut,
    ChevronRight,
} from 'lucide-react';

const MENU_SECTIONS = [
    {
        title: 'Đơn hàng',
        items: [
            { icon: Package, label: 'Đơn hàng của tôi', to: '/my-orders', badge: null },
            { icon: Truck, label: 'Theo dõi đơn hàng', to: '/order-tracking', badge: null },
            { icon: MapPin, label: 'Sổ địa chỉ', to: '#', badge: '2' },
        ],
    },
    {
        title: 'Tài khoản',
        items: [
            { icon: Heart, label: 'Sản phẩm yêu thích', to: '#', badge: null },
            { icon: Bell, label: 'Thông báo', to: '#', badge: '3' },
            { icon: Shield, label: 'Bảo mật', to: '#', badge: null },
        ],
    },
    {
        title: 'Hỗ trợ',
        items: [
            { icon: HelpCircle, label: 'Trung tâm trợ giúp', to: '#', badge: null },
        ],
    },
];

/**
 * Sidebar navigation menu for profile sections.
 */
const QuickLinksCard = () => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5"
    >
        {MENU_SECTIONS.map((section) => (
            <div key={section.title}>
                <p className="text-[11px] text-[#86868b] font-semibold uppercase tracking-wider mb-2 px-1">
                    {section.title}
                </p>
                <div className="space-y-0.5">
                    {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                to={item.to}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#2997ff] transition-all group"
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={1.5}
                                    className="text-[#86868b] group-hover:text-[#2997ff] transition-colors"
                                />
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                    <span className="text-[10px] font-bold text-white bg-[#2997ff] min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center">
                                        {item.badge}
                                    </span>
                                )}
                                <ChevronRight
                                    size={16}
                                    className="text-gray-300 group-hover:text-[#2997ff] group-hover:translate-x-0.5 transition-all"
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        ))}

        {/* Logout */}
        <div className="border-t border-gray-100 pt-3">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full">
                <LogOut size={18} strokeWidth={1.5} />
                <span>Đăng xuất</span>
            </button>
        </div>
    </motion.div>
);

export default QuickLinksCard;
