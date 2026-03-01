import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import FormInput from './FormInput';

/**
 * Password input with show/hide toggle.
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.error]
 * @param {string} [props.borderColor]
 */
const PasswordInput = ({ label, error, borderColor, ...inputProps }) => {
    const [visible, setVisible] = useState(false);

    const toggleButton = (
        <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-[#86868b] hover:text-[#1d1d1f] transition-colors"
            aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
        >
            {visible ? (
                <EyeOff size={18} strokeWidth={1.5} />
            ) : (
                <Eye size={18} strokeWidth={1.5} />
            )}
        </button>
    );

    return (
        <FormInput
            {...inputProps}
            type={visible ? 'text' : 'password'}
            label={label}
            icon={Lock}
            suffix={toggleButton}
            error={error}
            borderColor={borderColor}
        />
    );
};

export default PasswordInput;
