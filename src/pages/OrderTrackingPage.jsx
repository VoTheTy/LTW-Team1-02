import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Package,
    ArrowLeft,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    Copy,
    Check,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    OrderTimeline,
    OrderItems,
    OrderInfoCard,
    OrderSummaryCard,
} from '../components/tracking';
import { findOrderById, ORDER_STATUSES } from '../data/mockOrders';

/* ═════════════════════ Helpers ═════════════════════ */

const STATUS_CONFIG = {
    [ORDER_STATUSES.PLACED]: {
        label: 'Đã đặt hàng',
        color: 'bg-yellow-100 text-yellow-700',
        icon: Clock,
    },
    [ORDER_STATUSES.CONFIRMED]: {
        label: 'Đã xác nhận',
        color: 'bg-blue-100 text-blue-700',
        icon: CheckCircle2,
    },
    [ORDER_STATUSES.SHIPPING]: {
        label: 'Đang giao hàng',
        color: 'bg-indigo-100 text-indigo-700',
        icon: Truck,
    },
    [ORDER_STATUSES.DELIVERED]: {
        label: 'Đã giao thành công',
        color: 'bg-green-100 text-green-700',
        icon: CheckCircle2,
    },
    [ORDER_STATUSES.CANCELLED]: {
        label: 'Đã hủy',
        color: 'bg-red-100 text-red-700',
        icon: XCircle,
    },
};

/* ═══════════════ Status Badge component ═══════════════ */

const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status];
    if (!config) return null;
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.color}`}
        >
            <Icon size={14} strokeWidth={2} />
            {config.label}
        </span>
    );
};

/* ═══════════════ Copy Button ═══════════════ */

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="text-[#86868b] hover:text-[#2997ff] transition-colors"
            title="Sao chép mã đơn hàng"
        >
            {copied ? (
                <Check size={16} className="text-green-500" />
            ) : (
                <Copy size={16} />
            )}
        </button>
    );
};

/* ═══════════════ Search Form (initial view) ═══════════════ */

const SearchForm = ({ onSearch }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) {
            setError('Vui lòng nhập mã đơn hàng');
            return;
        }
        const order = findOrderById(input);
        if (!order) {
            setError('Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã.');
            return;
        }
        setError('');
        onSearch(order);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg mx-auto text-center"
        >
            {/* Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-20 h-20 rounded-2xl bg-[#2997ff]/10 flex items-center justify-center mx-auto mb-6"
            >
                <Package size={36} className="text-[#2997ff]" strokeWidth={1.5} />
            </motion.div>

            <h1 className="text-4xl font-bold text-[#1d1d1f] tracking-tight mb-3">
                Theo dõi đơn hàng
            </h1>
            <p className="text-[#86868b] mb-8 max-w-sm mx-auto">
                Nhập mã đơn hàng để xem trạng thái vận chuyển và thông tin chi tiết
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                    <Search
                        size={20}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#2997ff] transition-colors"
                    />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            if (error) setError('');
                        }}
                        placeholder="VD: ME-20260222"
                        className={`w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-base text-[#1d1d1f] placeholder:text-gray-400 border focus:outline-none focus:ring-2 focus:ring-[#2997ff]/40 focus:border-transparent transition-all ${error ? 'border-red-300' : 'border-gray-200'
                            }`}
                    />
                </div>

                {/* Error message */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="text-sm text-red-400 flex items-center justify-center gap-1.5"
                        >
                            <XCircle size={14} /> {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{
                        scale: 1.01,
                        boxShadow: '0 10px 40px rgba(41,151,255,0.3)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#2997ff] hover:bg-[#147ce5] text-white py-4 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-400/20"
                >
                    Tra cứu đơn hàng <Search size={16} />
                </motion.button>
            </form>

            {/* Demo hint */}
            <p className="text-xs text-[#86868b] mt-6">
                Thử với mã:{' '}
                <button
                    type="button"
                    onClick={() => setInput('ME-20260222')}
                    className="text-[#2997ff] hover:underline font-medium"
                >
                    ME-20260222
                </button>{' '}
                hoặc{' '}
                <button
                    type="button"
                    onClick={() => setInput('ME-20260215')}
                    className="text-[#2997ff] hover:underline font-medium"
                >
                    ME-20260215
                </button>
            </p>
        </motion.div>
    );
};

/* ═══════════════ Order Result view ═══════════════ */

const OrderResult = ({ order, onBack }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
    >
        {/* Back + Order ID header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-1.5 text-sm text-[#86868b] hover:text-[#2997ff] font-medium transition-colors mb-3"
                >
                    <ArrowLeft size={16} /> Tra cứu đơn khác
                </button>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
                        Đơn hàng {order.id}
                    </h1>
                    <CopyButton text={order.id} />
                </div>
            </div>
            <StatusBadge status={order.status} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Timeline */}
            <div className="lg:col-span-1">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl border border-gray-100 p-6"
                >
                    <h3 className="text-base font-bold text-[#1d1d1f] mb-6">
                        Trạng thái đơn hàng
                    </h3>
                    <OrderTimeline steps={order.timeline} />
                </motion.div>
            </div>

            {/* Right column: Details */}
            <div className="lg:col-span-2 space-y-6">
                {/* Items */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-white rounded-2xl border border-gray-100 p-6"
                >
                    <h3 className="text-base font-bold text-[#1d1d1f] mb-4">
                        Sản phẩm ({order.items.length})
                    </h3>
                    <OrderItems items={order.items} />
                </motion.div>

                {/* Info + Summary row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <OrderInfoCard order={order} />
                    <OrderSummaryCard order={order} />
                </div>
            </div>
        </div>
    </motion.div>
);

/* ═════════════════════ MAIN PAGE ═════════════════════ */

const OrderTrackingPage = () => {
    const [order, setOrder] = useState(null);

    return (
        <div className="min-h-screen bg-[#f5f5f7] font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <AnimatePresence mode="wait">
                    {order ? (
                        <OrderResult
                            key="result"
                            order={order}
                            onBack={() => setOrder(null)}
                        />
                    ) : (
                        <div key="search" className="pt-10">
                            <SearchForm onSearch={setOrder} />
                        </div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};

export default OrderTrackingPage;
