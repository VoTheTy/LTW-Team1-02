import React from 'react';

/**
 * Reusable form input with icon.
 * @param {object} props
 * @param {string} props.label
 * @param {React.ElementType} props.icon - Lucide icon component
 * @param {string} [props.error] - Error message
 * @param {React.ReactNode} [props.suffix] - Right-side element (e.g. toggle button)
 * @param {string} [props.borderColor] - Custom border color class
 */
const FormInput = ({
    label,
    icon: Icon,
    error,
    suffix,
    borderColor,
    className = '',
    ...inputProps
}) => {
    const borderClass =
        borderColor || 'border-gray-200 focus:ring-[#2997ff]/40 focus:border-transparent';

    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-[#1d1d1f] mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <Icon
                        size={18}
                        strokeWidth={1.5}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#2997ff] transition-colors"
                    />
                )}
                <input
                    {...inputProps}
                    className={`w-full ${Icon ? 'pl-11' : 'pl-4'} ${suffix ? 'pr-12' : 'pr-4'} py-3.5 bg-white rounded-xl text-sm text-[#1d1d1f] placeholder:text-gray-400 border ${borderClass} focus:outline-none focus:ring-2 transition-all duration-200`}
                />
                {suffix && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {suffix}
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
        </div>
    );
};

export default FormInput;
