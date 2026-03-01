import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import {
    AuthLayout,
    FormInput,
    PasswordInput,
    SocialLoginButton,
} from '../components/auth';

/* ───────── Brand panel content ───────── */

const STATS = [
    { value: '5,000+', label: 'Sản phẩm' },
    { value: '50K+', label: 'Khách hàng' },
    { value: '120+', label: 'Thương hiệu' },
];

const StatsRow = () => (
    <div className="flex gap-8">
        {STATS.map((s) => (
            <div key={s.label}>
                <p className="text-white text-xl font-bold">{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
            </div>
        ))}
    </div>
);

const BRAND_CONFIG = {
    gradientFrom: 'from-[#2997ff]/20',
    heading: (
        <>
            Thiết bị Y tế
            <br />
            Cao cấp dành cho
            <br />
            Chuyên gia
        </>
    ),
    description:
        'Đăng nhập để quản lý đơn hàng, theo dõi giao hàng và nhận ưu đãi độc quyền từ MediEquip.',
    extraContent: <StatsRow />,
};

/* ───────── Login Page ───────── */

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: integrate auth
    };

    return (
        <AuthLayout brand={BRAND_CONFIG}>
            {/* Header */}
            <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                Đăng nhập
            </h1>
            <p className="text-[#86868b] mb-8">Chào mừng bạn quay trở lại</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                    label="Email"
                    icon={Mail}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                />

                <PasswordInput
                    label="Mật khẩu"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                />

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-[#2997ff] focus:ring-[#2997ff]/40"
                        />
                        <span className="text-sm text-[#86868b]">Ghi nhớ đăng nhập</span>
                    </label>
                    <Link
                        to="/forgot-password"
                        className="text-sm text-[#2997ff] hover:text-[#147ce5] font-medium transition-colors"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>

                {/* Submit */}
                <motion.button
                    whileHover={{ scale: 1.01, boxShadow: '0 10px 40px rgba(41,151,255,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#2997ff] hover:bg-[#147ce5] text-white py-3.5 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-400/20"
                >
                    Đăng nhập <ArrowRight size={16} />
                </motion.button>
            </form>

            {/* Social login */}
            <SocialLoginButton label="Đăng nhập với Google" />

            {/* Register link */}
            <p className="text-center text-sm text-[#86868b] mt-8">
                Chưa có tài khoản?{' '}
                <Link
                    to="/register"
                    className="text-[#2997ff] hover:text-[#147ce5] font-semibold transition-colors"
                >
                    Đăng ký ngay
                </Link>
            </p>
        </AuthLayout>
    );
};

export default LoginPage;
