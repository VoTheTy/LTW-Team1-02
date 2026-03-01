import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, Check } from 'lucide-react';

/**
 * Security settings card with change-password form.
 */
const SecurityCard = () => {
    const [changing, setChanging] = useState(false);
    const [form, setForm] = useState({
        current: '',
        newPw: '',
        confirm: '',
    });
    const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });

    const update = (key) => (e) =>
        setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const toggleShow = (key) =>
        setShowPw((prev) => ({ ...prev, [key]: !prev[key] }));

    const handleSave = () => {
        // TODO: call API
        setChanging(false);
        setForm({ current: '', newPw: '', confirm: '' });
    };

    const PasswordField = ({ label, field }) => (
        <div>
            <label className="block text-[11px] text-[#86868b] font-medium uppercase tracking-wider mb-1.5">
                {label}
            </label>
            <div className="relative">
                <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]"
                    strokeWidth={1.5}
                />
                <input
                    type={showPw[field] ? 'text' : 'password'}
                    value={form[field]}
                    onChange={update(field)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#f5f5f7] rounded-xl text-sm text-[#1d1d1f] placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2997ff]/40 focus:border-transparent transition-all"
                />
                <button
                    type="button"
                    onClick={() => toggleShow(field)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                >
                    {showPw[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 p-6"
        >
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                        <Shield size={18} className="text-green-500" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#1d1d1f]">Bảo mật</h3>
                        <p className="text-xs text-[#86868b]">Quản lý mật khẩu và bảo mật</p>
                    </div>
                </div>
                {!changing && (
                    <button
                        onClick={() => setChanging(true)}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-[#2997ff] border border-[#2997ff]/20 hover:bg-[#2997ff]/5 transition-colors"
                    >
                        Đổi mật khẩu
                    </button>
                )}
            </div>

            {changing && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 mt-2"
                >
                    <PasswordField label="Mật khẩu hiện tại" field="current" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <PasswordField label="Mật khẩu mới" field="newPw" />
                        <PasswordField label="Xác nhận mật khẩu" field="confirm" />
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={() => {
                                setChanging(false);
                                setForm({ current: '', newPw: '', confirm: '' });
                            }}
                            className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#86868b] hover:bg-gray-100 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSave}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#2997ff] hover:bg-[#147ce5] transition-colors shadow-md shadow-blue-400/20"
                        >
                            <Check size={14} /> Cập nhật mật khẩu
                        </button>
                    </div>
                </motion.div>
            )}

            {!changing && (
                <div className="flex items-center gap-3 p-3 bg-green-50/50 rounded-xl">
                    <Check size={16} className="text-green-500" />
                    <p className="text-sm text-green-700 font-medium">
                        Mật khẩu đã được cập nhật lần cuối 30 ngày trước
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default SecurityCard;
