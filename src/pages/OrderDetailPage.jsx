import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Copy,
    Check,
    Printer,
    RotateCcw,
    MessageCircle,
    Package,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    OrderTimeline,
    OrderItems,
    OrderInfoCard,
    OrderSummaryCard,
    StatusBadge,
} from '../components/tracking';
import { findOrderById, ORDER_STATUSES } from '../data/mockOrders';

/* ═══════════ Copy Button (reused from tracking) ═══════════ */

const CopyButton = ({ text }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="text-[#86868b] hover:text-[#2997ff] transition-colors"
            title="Sao chép"
        >
            {copied ? (
                <Check size={16} className="text-green-500" />
            ) : (
                <Copy size={16} />
            )}
        </button>
    );
};

/* ═══════════ Quick Action Button ═══════════ */

const ActionButton = ({ icon: Icon, label, variant = 'outline', onClick }) => {
    const base = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200';
    const styles = {
        outline: `${base} bg-white border border-gray-200 text-[#1d1d1f] hover:border-gray-300 hover:shadow-sm`,
        primary: `${base} bg-[#2997ff] text-white hover:bg-[#147ce5] shadow-md shadow-blue-400/20`,
        danger: `${base} bg-white border border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50`,
    };

    return (
        <button onClick={onClick} className={styles[variant]}>
            <Icon size={16} strokeWidth={1.5} />
            {label}
        </button>
    );
};

/* ═══════════ Not Found state ═══════════ */

const OrderNotFound = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-24"
    >
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Package size={36} className="text-[#86868b]" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-[#1d1d1f] mb-3">
            Không tìm thấy đơn hàng
        </h1>
        <p className="text-[#86868b] mb-8 max-w-sm mx-auto">
            Đơn hàng bạn tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Link
            to="/my-orders"
            className="inline-flex items-center gap-2 bg-[#2997ff] hover:bg-[#147ce5] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-blue-400/20"
        >
            <ArrowLeft size={16} /> Quay lại danh sách
        </Link>
    </motion.div>
);

/* ═════════════════════ MAIN PAGE ═════════════════════ */

const OrderDetailPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const order = useMemo(() => findOrderById(orderId || ''), [orderId]);

    if (!order) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] font-sans">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                    <OrderNotFound />
                </main>
                <Footer />
            </div>
        );
    }

    const isCancelled = order.status === ORDER_STATUSES.CANCELLED;
    const isDelivered = order.status === ORDER_STATUSES.DELIVERED;

    return (
        <div className="min-h-screen bg-[#f5f5f7] font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    {/* Back button */}
                    <button
                        onClick={() => navigate('/my-orders')}
                        className="inline-flex items-center gap-1.5 text-sm text-[#86868b] hover:text-[#2997ff] font-medium transition-colors mb-4"
                    >
                        <ArrowLeft size={16} /> Đơn hàng của tôi
                    </button>

                    {/* Title row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
                                    {order.id}
                                </h1>
                                <CopyButton text={order.id} />
                                <StatusBadge status={order.status} />
                            </div>
                            <p className="text-sm text-[#86868b]">
                                Ngày đặt: {order.placedAtDisplay}
                            </p>
                        </div>

                        {/* Quick actions */}
                        <div className="flex flex-wrap gap-2">
                            {!isCancelled && !isDelivered && (
                                <ActionButton
                                    icon={RotateCcw}
                                    label="Hủy đơn"
                                    variant="danger"
                                    onClick={() => { }}
                                />
                            )}
                            {isDelivered && (
                                <ActionButton
                                    icon={RotateCcw}
                                    label="Mua lại"
                                    variant="primary"
                                    onClick={() => { }}
                                />
                            )}
                            <ActionButton
                                icon={MessageCircle}
                                label="Hỗ trợ"
                                onClick={() => { }}
                            />
                            <ActionButton
                                icon={Printer}
                                label="In"
                                onClick={() => window.print()}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left column: Timeline */}
                    <div className="lg:col-span-1 space-y-6">
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

                        {/* Summary card (mobile: bottom, desktop: left sidebar) */}
                        <div className="lg:block hidden">
                            <OrderSummaryCard order={order} />
                        </div>
                    </div>

                    {/* Right column: Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Products */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="bg-white rounded-2xl border border-gray-100 p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-[#1d1d1f]">
                                    Sản phẩm đã đặt
                                </h3>
                                <span className="text-xs text-[#86868b] font-medium bg-gray-100 px-2.5 py-1 rounded-full">
                                    {order.items.reduce((acc, i) => acc + i.quantity, 0)} sản phẩm
                                </span>
                            </div>
                            <OrderItems items={order.items} />
                        </motion.div>

                        {/* Shipping info */}
                        <OrderInfoCard order={order} />

                        {/* Summary card (mobile only) */}
                        <div className="lg:hidden">
                            <OrderSummaryCard order={order} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderDetailPage;
