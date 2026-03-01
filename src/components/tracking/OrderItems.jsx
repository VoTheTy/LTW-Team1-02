import React from 'react';
import { motion } from 'framer-motion';

/**
 * Displays the list of ordered products.
 *
 * @param {object} props
 * @param {Array} props.items - Array of { name, quantity, price, image }
 */
const OrderItems = ({ items }) => (
    <div className="space-y-4">
        {items.map((item, i) => (
            <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-4 p-3 bg-[#f5f5f7] rounded-xl"
            >
                {/* Product image */}
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-white border border-gray-100"
                />

                {/* Product info */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1d1d1f] truncate">
                        {item.name}
                    </p>
                    <p className="text-xs text-[#86868b] mt-0.5">
                        Số lượng: {item.quantity}
                    </p>
                </div>

                {/* Price */}
                <p className="text-sm font-bold text-[#1d1d1f] whitespace-nowrap">
                    {item.price}
                </p>
            </motion.div>
        ))}
    </div>
);

export default OrderItems;
