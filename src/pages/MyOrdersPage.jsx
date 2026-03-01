import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    ChevronRight,
    Search,
    ShoppingBag,
    Filter,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { StatusBadge } from '../components/tracking';
import { getAllOrders, ORDER_STATUSES } from '../data/mockOrders';

/* ═══════════════════ Constants ═══════════════════ */

const FILTER_TABS = [
    { key: 'all', label: 'Tất cả' },
    { key: ORDER_STATUSES.PLACED, label: 'Chờ xác nhận' },
    { key: ORDER_STATUSES.CONFIRMED, label: 'Đã xác nhận' },
    { key: ORDER_STATUSES.SHIPPING, label: 'Đang giao' },
    { key: ORDER_STATUSES.DELIVERED, label: 'Đã giao' },
    { key: ORDER_STATUSES.CANCELLED, label: 'Đã hủy' },
];

/* ═══════════════════ Sub-components ═══════════════════ */

/**
 * Filter tab bar for order status filtering.
 */
const FilterTabs = ({ active, onChange, counts }) => (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTER_TABS.map((tab) => {
            const isActive = active === tab.key;
            const count = counts[tab.key] || 0;

            return (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`relative whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                            ? 'bg-[#2997ff] text-white shadow-md shadow-blue-400/20'
                            : 'bg-white text-[#86868b] hover:text-[#1d1d1f] border border-gray-200 hover:border-gray-300'
                        }`}
                >
                    {tab.label}
                    {count > 0 && (
                        <span
                            className={`ml-1.5 text-[10px] font-bold ${isActive ? 'text-white/80' : 'text-[#86868b]'
                                }`}
                        >
                            ({count})
                        </span>
                    )}
                </button>
            );
        })}
    </div>
);

/**
 * Single order card in the list.
 */
const OrderCard = ({ order, index }) => {
    const firstImage = order.items[0]?.image;
    const extraCount = order.items.length - 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            layout
        >
            <Link
                to={`/orders/${order.id}`}
                className="block bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 p-5 group"
            >
                <div className="flex items-start gap-4">
                    {/* Product image stack */}
                    <div className="relative shrink-0">
                        <img
                            src={firstImage}
                            alt={order.items[0]?.name}
                            className="w-20 h-20 rounded-xl object-cover bg-[#f5f5f7] border border-gray-100"
                        />
                        {extraCount > 0 && (
                            <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-[#1d1d1f] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                                +{extraCount}
                            </div>
                        )}
                    </div>

                    {/* Order info */}
                    <div className="flex-1 min-w-0">
                        {/* Top row: ID + status */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                                <p className="text-base font-bold text-[#1d1d1f] tracking-tight">
                                    {order.id}
                                </p>
                                <p className="text-xs text-[#86868b] mt-0.5">
                                    {order.placedAtDisplay}
                                </p>
                            </div>
                            <StatusBadge status={order.status} size="sm" />
                        </div>

                        {/* Product names */}
                        <p className="text-sm text-[#86868b] truncate mb-3">
                            {order.items.map((i) => i.name).join(', ')}
                        </p>

                        {/* Bottom row: total + arrow */}
                        <div className="flex items-center justify-between">
                            <p className="text-base font-bold text-[#1d1d1f]">{order.total}</p>
                            <div className="flex items-center gap-1 text-[#86868b] group-hover:text-[#2997ff] transition-colors">
                                <span className="text-xs font-medium">Chi tiết</span>
                                <ChevronRight
                                    size={16}
                                    className="group-hover:translate-x-0.5 transition-transform"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

/**
 * Empty state when no orders match the filter.
 */
const EmptyState = ({ isFiltered }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
    >
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={28} className="text-[#86868b]" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">
            {isFiltered ? 'Không có đơn hàng nào' : 'Chưa có đơn hàng'}
        </h3>
        <p className="text-sm text-[#86868b] mb-6 max-w-sm mx-auto">
            {isFiltered
                ? 'Không tìm thấy đơn hàng phù hợp với bộ lọc hiện tại.'
                : 'Hãy bắt đầu mua sắm để có đơn hàng đầu tiên!'}
        </p>
        {!isFiltered && (
            <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#2997ff] hover:bg-[#147ce5] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-blue-400/20"
            >
                Bắt đầu mua sắm
            </Link>
        )}
    </motion.div>
);

/* ═════════════════════ MAIN PAGE ═════════════════════ */

const MyOrdersPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const allOrders = useMemo(() => getAllOrders(), []);

    /* ── Computed counts per status ── */
    const counts = useMemo(() => {
        const c = { all: allOrders.length };
        allOrders.forEach((o) => {
            c[o.status] = (c[o.status] || 0) + 1;
        });
        return c;
    }, [allOrders]);

    /* ── Filtered + searched orders ── */
    const filteredOrders = useMemo(() => {
        let result = allOrders;
        if (activeFilter !== 'all') {
            result = result.filter((o) => o.status === activeFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            result = result.filter(
                (o) =>
                    o.id.toLowerCase().includes(q) ||
                    o.items.some((item) => item.name.toLowerCase().includes(q))
            );
        }
        return result;
    }, [allOrders, activeFilter, searchQuery]);

    return (
        <div className="min-h-screen bg-[#f5f5f7] font-sans">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#2997ff]/10 flex items-center justify-center">
                            <Package size={20} className="text-[#2997ff]" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                            Đơn hàng của tôi
                        </h1>
                    </div>
                    <p className="text-[#86868b] ml-[52px]">
                        Theo dõi và quản lý tất cả đơn hàng
                    </p>
                </motion.div>

                {/* Search bar */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mb-5"
                >
                    <div className="relative group">
                        <Search
                            size={18}
                            strokeWidth={1.5}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#2997ff] transition-colors"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tìm theo mã đơn hoặc tên sản phẩm..."
                            className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-sm text-[#1d1d1f] placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2997ff]/40 focus:border-transparent transition-all"
                        />
                    </div>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="mb-6"
                >
                    <FilterTabs
                        active={activeFilter}
                        onChange={setActiveFilter}
                        counts={counts}
                    />
                </motion.div>

                {/* Orders list */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, i) => (
                                <OrderCard key={order.id} order={order} index={i} />
                            ))
                        ) : (
                            <EmptyState
                                key="empty"
                                isFiltered={activeFilter !== 'all' || searchQuery.trim()}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MyOrdersPage;
