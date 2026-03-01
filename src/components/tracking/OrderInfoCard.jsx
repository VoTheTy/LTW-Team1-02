import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Phone,
    CreditCard,
    Truck as TruckIcon,
    Hash,
    Calendar,
} from 'lucide-react';

/**
 * A single info row used inside OrderInfoCard.
 */
const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#2997ff]/10 flex items-center justify-center shrink-0 mt-0.5">
            <Icon size={14} className="text-[#2997ff]" strokeWidth={2} />
        </div>
        <div className="min-w-0">
            <p className="text-[11px] text-[#86868b] font-medium uppercase tracking-wider">
                {label}
            </p>
            <p className="text-sm text-[#1d1d1f] font-medium mt-0.5 break-words">
                {value}
            </p>
        </div>
    </div>
);

/**
 * Card showing shipping / customer info for an order.
 *
 * @param {object} props
 * @param {object} props.order - The full order object
 */
const OrderInfoCard = ({ order }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
    >
        <h3 className="text-base font-bold text-[#1d1d1f]">Thông tin giao hàng</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow icon={MapPin} label="Địa chỉ" value={order.customer.address} />
            <InfoRow icon={Phone} label="Điện thoại" value={order.customer.phone} />
            <InfoRow icon={TruckIcon} label="Đơn vị vận chuyển" value={order.shippingCarrier} />
            <InfoRow icon={Hash} label="Mã vận đơn" value={order.trackingNumber} />
            <InfoRow icon={CreditCard} label="Thanh toán" value={order.paymentMethod} />
            <InfoRow icon={Calendar} label="Dự kiến giao" value={order.estimatedDelivery} />
        </div>
    </motion.div>
);

export default OrderInfoCard;
