import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    KeyRound,
    CheckCircle2,
    RotateCcw,
} from 'lucide-react';
import {
    AuthLayout,
    FormInput,
    PasswordInput,
    PasswordStrength,
    PASSWORD_RULES,
} from '../components/auth';

/* ─────────────────────── Constants ─────────────────────── */

const STEPS = { EMAIL: 0, OTP: 1, RESET: 2, SUCCESS: 3 };
const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 60;

const BRAND_CONFIG = {
    gradientFrom: 'from-amber-500/15',
    heading: (
        <>
            Khôi phục
            <br />
            tài khoản
            <br />
            của bạn
        </>
    ),
    description:
        'Đừng lo lắng! Chỉ cần vài bước đơn giản, bạn sẽ lấy lại quyền truy cập vào tài khoản MediEquip của mình.',
    extraContent: (
        <div className="space-y-4">
            {[
                { icon: '📧', text: 'Nhận mã xác thực qua email' },
                { icon: '🔐', text: 'Đặt mật khẩu mới an toàn' },
                { icon: '✅', text: 'Đăng nhập lại ngay lập tức' },
            ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-300 text-sm">{item.text}</span>
                </div>
            ))}
        </div>
    ),
};

/* ─────────────── Slide animation variants ─────────────── */

const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

const slideTransition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };

/* ─────────────────── Step Indicator ─────────────────── */

const StepIndicator = ({ currentStep }) => {
    const labels = ['Email', 'Xác thực', 'Mật khẩu mới'];

    return (
        <div className="flex items-center gap-2 mb-8">
            {labels.map((label, i) => {
                const isActive = i === currentStep;
                const isDone = i < currentStep;

                return (
                    <React.Fragment key={label}>
                        {i > 0 && (
                            <div
                                className={`flex-1 h-px transition-colors duration-300 ${isDone ? 'bg-[#2997ff]' : 'bg-gray-200'
                                    }`}
                            />
                        )}
                        <div className="flex items-center gap-1.5">
                            <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isDone
                                        ? 'bg-[#2997ff] text-white'
                                        : isActive
                                            ? 'bg-[#2997ff]/10 text-[#2997ff] ring-2 ring-[#2997ff]/30'
                                            : 'bg-gray-100 text-[#86868b]'
                                    }`}
                            >
                                {isDone ? <CheckCircle2 size={14} /> : i + 1}
                            </div>
                            <span
                                className={`text-xs font-medium hidden sm:inline transition-colors ${isActive ? 'text-[#1d1d1f]' : 'text-[#86868b]'
                                    }`}
                            >
                                {label}
                            </span>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

/* ──────────────────── OTP Input ──────────────────── */

const OtpInput = ({ value, onChange }) => {
    const inputRefs = useRef([]);

    const handleChange = (index, digit) => {
        if (!/^\d?$/.test(digit)) return;
        const newOtp = value.split('');
        newOtp[index] = digit;
        onChange(newOtp.join(''));

        // Auto-focus next input
        if (digit && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        onChange(pasted.padEnd(OTP_LENGTH, ''));
        const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
        inputRefs.current[focusIdx]?.focus();
    };

    return (
        <div className="flex gap-2.5 justify-center">
            {Array.from({ length: OTP_LENGTH }, (_, i) => (
                <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[i] || ''}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    className={`w-12 h-14 text-center text-xl font-bold rounded-xl border bg-white text-[#1d1d1f] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2997ff]/40 focus:border-transparent ${value[i] ? 'border-[#2997ff]/50 shadow-sm' : 'border-gray-200'
                        }`}
                />
            ))}
        </div>
    );
};

/* ─────────────── Countdown Timer ─────────────── */

const useCountdown = (initialSeconds) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (!isRunning || seconds <= 0) return;
        const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(timer);
    }, [isRunning, seconds]);

    const restart = useCallback(() => {
        setSeconds(initialSeconds);
        setIsRunning(true);
    }, [initialSeconds]);

    return { seconds, isExpired: seconds <= 0, restart };
};

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(STEPS.EMAIL);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { seconds, isExpired, restart } = useCountdown(COUNTDOWN_SECONDS);

    /* ── Navigation ── */

    const goTo = (nextStep) => {
        setDirection(nextStep > step ? 1 : -1);
        setStep(nextStep);
    };

    /* ── Handlers ── */

    const handleSendOtp = (e) => {
        e.preventDefault();
        // TODO: call API to send OTP
        restart();
        goTo(STEPS.OTP);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        // TODO: call API to verify OTP
        goTo(STEPS.RESET);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        // TODO: call API to reset password
        goTo(STEPS.SUCCESS);
    };

    const handleResend = () => {
        setOtp('');
        restart();
        // TODO: call API to resend OTP
    };

    /* ── Derived state ── */

    const passwordStrength = PASSWORD_RULES.filter((r) => r.test(newPassword)).length;
    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
    const canResetPw = passwordsMatch && passwordStrength >= 3;

    /* ── Render ── */

    return (
        <AuthLayout brand={BRAND_CONFIG}>
            {/* Step indicator (hidden on success) */}
            {step !== STEPS.SUCCESS && <StepIndicator currentStep={step} />}

            <AnimatePresence mode="wait" custom={direction}>
                {/* ═══════ Step 1: Enter Email ═══════ */}
                {step === STEPS.EMAIL && (
                    <motion.div
                        key="email"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-[#2997ff]/10 flex items-center justify-center mx-auto mb-5">
                                <Mail size={28} className="text-[#2997ff]" strokeWidth={1.5} />
                            </div>
                            <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                                Quên mật khẩu?
                            </h1>
                            <p className="text-[#86868b] text-sm leading-relaxed max-w-sm mx-auto">
                                Nhập email đã đăng ký và chúng tôi sẽ gửi mã xác thực để khôi phục
                                tài khoản của bạn.
                            </p>
                        </div>

                        <form onSubmit={handleSendOtp} className="space-y-5">
                            <FormInput
                                label="Email"
                                icon={Mail}
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                            />

                            <motion.button
                                whileHover={{ scale: 1.01, boxShadow: '0 10px 40px rgba(41,151,255,0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-[#2997ff] hover:bg-[#147ce5] text-white py-3.5 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-400/20"
                            >
                                Gửi mã xác thực <ArrowRight size={16} />
                            </motion.button>
                        </form>

                        <p className="text-center text-sm text-[#86868b] mt-8">
                            Nhớ mật khẩu rồi?{' '}
                            <Link
                                to="/login"
                                className="text-[#2997ff] hover:text-[#147ce5] font-semibold transition-colors"
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </motion.div>
                )}

                {/* ═══════ Step 2: Enter OTP ═══════ */}
                {step === STEPS.OTP && (
                    <motion.div
                        key="otp"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-5">
                                <ShieldCheck size={28} className="text-green-500" strokeWidth={1.5} />
                            </div>
                            <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                                Xác thực email
                            </h1>
                            <p className="text-[#86868b] text-sm leading-relaxed max-w-sm mx-auto">
                                Chúng tôi đã gửi mã {OTP_LENGTH} số đến{' '}
                                <span className="text-[#1d1d1f] font-medium">{email}</span>
                            </p>
                        </div>

                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <OtpInput value={otp} onChange={setOtp} />

                            {/* Countdown / Resend */}
                            <div className="text-center">
                                {isExpired ? (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className="inline-flex items-center gap-1.5 text-sm text-[#2997ff] hover:text-[#147ce5] font-medium transition-colors"
                                    >
                                        <RotateCcw size={14} /> Gửi lại mã
                                    </button>
                                ) : (
                                    <p className="text-sm text-[#86868b]">
                                        Gửi lại mã sau{' '}
                                        <span className="text-[#1d1d1f] font-semibold tabular-nums">
                                            {seconds}s
                                        </span>
                                    </p>
                                )}
                            </div>

                            <motion.button
                                whileHover={
                                    otp.length === OTP_LENGTH
                                        ? { scale: 1.01, boxShadow: '0 10px 40px rgba(41,151,255,0.3)' }
                                        : {}
                                }
                                whileTap={otp.length === OTP_LENGTH ? { scale: 0.98 } : {}}
                                type="submit"
                                disabled={otp.replace(/ /g, '').length < OTP_LENGTH}
                                className={`w-full py-3.5 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${otp.replace(/ /g, '').length >= OTP_LENGTH
                                        ? 'bg-[#2997ff] hover:bg-[#147ce5] text-white shadow-lg shadow-blue-400/20'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Xác nhận <ArrowRight size={16} />
                            </motion.button>
                        </form>

                        {/* Back link */}
                        <button
                            type="button"
                            onClick={() => goTo(STEPS.EMAIL)}
                            className="flex items-center gap-1.5 text-sm text-[#86868b] hover:text-[#1d1d1f] font-medium transition-colors mx-auto mt-6"
                        >
                            <ArrowLeft size={14} /> Thay đổi email
                        </button>
                    </motion.div>
                )}

                {/* ═══════ Step 3: New Password ═══════ */}
                {step === STEPS.RESET && (
                    <motion.div
                        key="reset"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-5">
                                <KeyRound size={28} className="text-purple-500" strokeWidth={1.5} />
                            </div>
                            <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                                Đặt mật khẩu mới
                            </h1>
                            <p className="text-[#86868b] text-sm leading-relaxed max-w-sm mx-auto">
                                Tạo mật khẩu mới an toàn cho tài khoản của bạn. Hãy chọn mật khẩu
                                mạnh và dễ nhớ.
                            </p>
                        </div>

                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div>
                                <PasswordInput
                                    label="Mật khẩu mới"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                                <PasswordStrength password={newPassword} />
                            </div>

                            <PasswordInput
                                label="Xác nhận mật khẩu mới"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                borderColor={
                                    confirmPassword
                                        ? passwordsMatch
                                            ? 'border-green-400 focus:ring-green-400/40 focus:border-transparent'
                                            : 'border-red-300 focus:ring-red-300/40 focus:border-transparent'
                                        : undefined
                                }
                                error={
                                    confirmPassword && !passwordsMatch
                                        ? 'Mật khẩu không khớp'
                                        : undefined
                                }
                            />

                            <motion.button
                                whileHover={
                                    canResetPw
                                        ? { scale: 1.01, boxShadow: '0 10px 40px rgba(41,151,255,0.3)' }
                                        : {}
                                }
                                whileTap={canResetPw ? { scale: 0.98 } : {}}
                                type="submit"
                                disabled={!canResetPw}
                                className={`w-full py-3.5 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 mt-2 ${canResetPw
                                        ? 'bg-[#2997ff] hover:bg-[#147ce5] text-white shadow-lg shadow-blue-400/20'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Đổi mật khẩu <ArrowRight size={16} />
                            </motion.button>
                        </form>
                    </motion.div>
                )}

                {/* ═══════ Step 4: Success ═══════ */}
                {step === STEPS.SUCCESS && (
                    <motion.div
                        key="success"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                        className="text-center py-8"
                    >
                        {/* Animated checkmark */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                            className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 250, damping: 12, delay: 0.3 }}
                            >
                                <CheckCircle2 size={40} className="text-green-500" strokeWidth={1.5} />
                            </motion.div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-3"
                        >
                            Đổi mật khẩu thành công!
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-[#86868b] text-sm leading-relaxed max-w-sm mx-auto mb-8"
                        >
                            Mật khẩu của bạn đã được cập nhật. Bây giờ bạn có thể đăng nhập với
                            mật khẩu mới.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 bg-[#2997ff] hover:bg-[#147ce5] text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 shadow-lg shadow-blue-400/20"
                            >
                                Đăng nhập ngay <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
