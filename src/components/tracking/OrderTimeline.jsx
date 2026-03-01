import React from 'react';
import { motion } from 'framer-motion';
import {
    ClipboardCheck,
    PackageCheck,
    Truck,
    CircleCheckBig,
} from 'lucide-react';

/* ── Icon map for each status ── */

const STATUS_ICONS = {
    placed: ClipboardCheck,
    confirmed: PackageCheck,
    shipping: Truck,
    delivered: CircleCheckBig,
};

/**
 * Vertical order tracking timeline with animated steps.
 *
 * @param {object} props
 * @param {Array} props.steps - Array of timeline step objects
 *   { status, label, description, time, completed }
 */
const OrderTimeline = ({ steps }) => (
    <div className="relative">
        {steps.map((step, i) => {
            const Icon = STATUS_ICONS[step.status] || ClipboardCheck;
            const isLast = i === steps.length - 1;
            const isActive = step.completed && (!steps[i + 1]?.completed);

            return (
                <motion.div
                    key={step.status}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex gap-4"
                >
                    {/* Vertical line + dot */}
                    <div className="flex flex-col items-center">
                        {/* Icon circle */}
                        <div
                            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isActive
                                    ? 'bg-[#2997ff] text-white shadow-lg shadow-blue-400/30 ring-4 ring-[#2997ff]/20'
                                    : step.completed
                                        ? 'bg-[#2997ff] text-white'
                                        : 'bg-gray-100 text-[#86868b]'
                                }`}
                        >
                            <Icon size={18} strokeWidth={1.5} />

                            {/* Pulse ring for active step */}
                            {isActive && (
                                <span className="absolute inset-0 rounded-full animate-ping bg-[#2997ff]/20" />
                            )}
                        </div>

                        {/* Connecting line */}
                        {!isLast && (
                            <div className="relative w-0.5 flex-1 my-1">
                                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                                {step.completed && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: '100%' }}
                                        transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                                        className="absolute inset-x-0 top-0 bg-[#2997ff] rounded-full"
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                        <p
                            className={`text-sm font-semibold leading-tight ${step.completed ? 'text-[#1d1d1f]' : 'text-[#86868b]'
                                }`}
                        >
                            {step.label}
                        </p>
                        <p className="text-xs text-[#86868b] mt-1">{step.description}</p>
                        <p
                            className={`text-[11px] mt-1.5 font-medium ${isActive ? 'text-[#2997ff]' : 'text-[#86868b]/70'
                                }`}
                        >
                            {step.time}
                        </p>
                    </div>
                </motion.div>
            );
        })}
    </div>
);

export default OrderTimeline;
