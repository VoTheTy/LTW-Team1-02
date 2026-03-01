import React from 'react';
import {
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    PackageCheck,
} from 'lucide-react';
import { STATUS_CONFIG } from '../../data/mockOrders';

const STATUS_ICONS = {
    placed: Clock,
    confirmed: PackageCheck,
    shipping: Truck,
    delivered: CheckCircle2,
    cancelled: XCircle,
};

/**
 * Reusable order status badge.
 *
 * @param {object} props
 * @param {string} props.status - One of ORDER_STATUSES values
 * @param {'sm'|'md'} [props.size='md']
 */
const StatusBadge = ({ status, size = 'md' }) => {
    const config = STATUS_CONFIG[status];
    if (!config) return null;
    const Icon = STATUS_ICONS[status] || Clock;

    const sizeClasses =
        size === 'sm'
            ? 'px-2 py-1 text-[10px] gap-1'
            : 'px-3 py-1.5 text-xs gap-1.5';

    return (
        <span
            className={`inline-flex items-center rounded-full font-semibold ${config.color} ${sizeClasses}`}
        >
            <Icon size={size === 'sm' ? 12 : 14} strokeWidth={2} />
            {config.label}
        </span>
    );
};

export default StatusBadge;
