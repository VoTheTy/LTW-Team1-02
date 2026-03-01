import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const PASSWORD_RULES = [
    { test: (pw) => pw.length >= 8, label: 'Ít nhất 8 ký tự' },
    { test: (pw) => /[A-Z]/.test(pw), label: 'Có ít nhất 1 chữ hoa' },
    { test: (pw) => /[0-9]/.test(pw), label: 'Có ít nhất 1 số' },
];

/**
 * Visual password strength indicator with rule checklist.
 * @param {object} props
 * @param {string} props.password
 */
const PasswordStrength = ({ password }) => {
    if (!password) return null;

    const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;

    const barColor =
        passed === 3 ? 'bg-green-500' : passed === 2 ? 'bg-yellow-400' : 'bg-red-400';

    return (
        <div className="mt-2.5 space-y-1.5">
            {/* Strength bars */}
            <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-all duration-300 ${i < passed ? barColor : 'bg-gray-200'
                            }`}
                    />
                ))}
            </div>

            {/* Rule labels */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                {PASSWORD_RULES.map((r) => (
                    <span
                        key={r.label}
                        className={`text-[11px] flex items-center gap-1 transition-colors ${r.test(password) ? 'text-green-500' : 'text-[#86868b]'
                            }`}
                    >
                        <CheckCircle2 size={12} />
                        {r.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PasswordStrength;
