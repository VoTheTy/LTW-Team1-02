import React from 'react';
import { motion } from 'framer-motion';

/**
 * Order price summary card.
 *
 * @param {object} props
 * @param {object} props.order - The order object with subtotal, shipping, discount, total
 */
const OrderSummaryCard = ({ order }) => {
    const rows = [
        { label: 'Tạm tính', value: order.subtotal },
        { label: 'Phí vận chuyển', value: order.shipping },
        { label: 'Giảm giá', value: order.discount, highlight: true },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 p-6"
        >
            <h3 className="text-base font-bold text-[#1d1d1f] mb-4">
                Tổng thanh toán
            </h3>

            <div className="space-y-3">
                {rows.map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                        <span className="text-[#86868b]">{row.label}</span>
                        <span
                            className={`font-medium ${row.highlight ? 'text-green-500' : 'text-[#1d1d1f]'
                                }`}
                        >
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between">
                <span className="text-base font-bold text-[#1d1d1f]">Tổng cộng</span>
                <span className="text-lg font-bold text-[#2997ff]">{order.total}</span>
            </div>
        </motion.div>
    );
};

export default OrderSummaryCard;
