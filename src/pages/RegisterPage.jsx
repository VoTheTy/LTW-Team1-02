import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, User, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
    AuthLayout,
    FormInput,
    PasswordInput,
    PasswordStrength,
    PASSWORD_RULES,
    SocialLoginButton,
} from '../components/auth';

/* ───────── Brand panel content ───────── */

const BENEFITS = [
    'Miễn phí vận chuyển đơn từ 2 triệu',
    'Bảo hành chính hãng lên đến 5 năm',
    'Ưu đãi thành viên độc quyền',
];

const BenefitsList = () => (
    <div className="space-y-4">
        {BENEFITS.map((txt) => (
            <div key={txt} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-400 shrink-0" strokeWidth={2} />
                <span className="text-gray-300 text-sm">{txt}</span>
            </div>
        ))}
    </div>
);

const BRAND_CONFIG = {
    gradientFrom: 'from-green-500/10',
    heading: (
        <>
            Tham gia cộng đồng
            <br />
            chuyên gia Y tế
            <br />
            của chúng tôi
        </>
    ),
    description:
        'Đăng ký để nhận ưu đãi đặc biệt, theo dõi đơn hàng và trải nghiệm mua sắm thiết bị y tế cao cấp.',
    extraContent: <BenefitsList />,
};

/* ───────── Register Page ───────── */

const RegisterPage = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPw: '',
    });
    const [agreed, setAgreed] = useState(false);

    const update = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const passwordStrength = PASSWORD_RULES.filter((r) => r.test(form.password)).length;
    const passwordsMatch =
        form.password && form.confirmPw && form.password === form.confirmPw;
    const canSubmit = agreed && passwordsMatch && passwordStrength >= 3;

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: integrate auth
    };

    return (
        <AuthLayout brand={BRAND_CONFIG}>
            {/* Header */}
            <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                Tạo tài khoản
            </h1>
            <p className="text-[#86868b] mb-8">Đăng ký miễn phí chỉ trong vài giây</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <FormInput
                    label="Họ và tên"
                    icon={User}
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Nguyễn Văn A"
                />

                {/* Phone + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                        label="Số điện thoại"
                        icon={Phone}
                        type="tel"
                        required
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder="0912 345 678"
                    />
                    <FormInput
                        label="Email"
                        icon={Mail}
                        type="email"
                        required
                        value={form.email}
                        onChange={update('email')}
                        placeholder="email@example.com"
                    />
                </div>

                {/* Password */}
                <div>
                    <PasswordInput
                        label="Mật khẩu"
                        required
                        value={form.password}
                        onChange={update('password')}
                        placeholder="••••••••"
                    />
                    <PasswordStrength password={form.password} />
                </div>

                {/* Confirm password */}
                <PasswordInput
                    label="Xác nhận mật khẩu"
                    required
                    value={form.confirmPw}
                    onChange={update('confirmPw')}
                    placeholder="••••••••"
                    borderColor={
                        form.confirmPw
                            ? passwordsMatch
                                ? 'border-green-400 focus:ring-green-400/40 focus:border-transparent'
                                : 'border-red-300 focus:ring-red-300/40 focus:border-transparent'
                            : undefined
                    }
                    error={
                        form.confirmPw && !passwordsMatch ? 'Mật khẩu không khớp' : undefined
                    }
                />

                {/* Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-1 select-none">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#2997ff] focus:ring-[#2997ff]/40 mt-0.5"
                    />
                    <span className="text-sm text-[#86868b] leading-relaxed">
                        Tôi đồng ý với{' '}
                        <a href="#" className="text-[#2997ff] hover:underline">
                            Điều khoản sử dụng
                        </a>{' '}
                        và{' '}
                        <a href="#" className="text-[#2997ff] hover:underline">
                            Chính sách bảo mật
                        </a>
                    </span>
                </label>

                {/* Submit */}
                <motion.button
                    whileHover={
                        canSubmit
                            ? { scale: 1.01, boxShadow: '0 10px 40px rgba(41,151,255,0.3)' }
                            : {}
                    }
                    whileTap={canSubmit ? { scale: 0.98 } : {}}
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full py-3.5 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 mt-2 ${canSubmit
                            ? 'bg-[#2997ff] hover:bg-[#147ce5] text-white shadow-lg shadow-blue-400/20'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Tạo tài khoản <ArrowRight size={16} />
                </motion.button>
            </form>

            {/* Social login */}
            <SocialLoginButton label="Đăng ký với Google" />

            {/* Login link */}
            <p className="text-center text-sm text-[#86868b] mt-8">
                Đã có tài khoản?{' '}
                <Link
                    to="/login"
                    className="text-[#2997ff] hover:text-[#147ce5] font-semibold transition-colors"
                >
                    Đăng nhập
                </Link>
            </p>
        </AuthLayout>
    );
};

export default RegisterPage;
