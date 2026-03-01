import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Edit3, Check, X } from 'lucide-react';

/**
 * Read-only display of a single field.
 */
const FieldDisplay = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#f5f5f7] flex items-center justify-center shrink-0 mt-0.5">
            <Icon size={16} className="text-[#86868b]" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
            <p className="text-[11px] text-[#86868b] font-medium uppercase tracking-wider">
                {label}
            </p>
            <p className="text-sm text-[#1d1d1f] font-medium mt-0.5">{value || '—'}</p>
        </div>
    </div>
);

/**
 * Editable field for edit mode.
 */
const FieldEdit = ({ label, value, onChange, type = 'text', placeholder }) => (
    <div>
        <label className="block text-[11px] text-[#86868b] font-medium uppercase tracking-wider mb-1.5">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3.5 py-2.5 bg-[#f5f5f7] rounded-xl text-sm text-[#1d1d1f] placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2997ff]/40 focus:border-transparent transition-all"
        />
    </div>
);

/**
 * Personal information card with view/edit toggle.
 *
 * @param {object} props
 * @param {object} props.user - The user object
 */
const PersonalInfoCard = ({ user }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
    });

    const update = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

    const handleSave = () => {
        // TODO: call API to save
        setEditing(false);
    };

    const handleCancel = () => {
        setForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
            birthday: user.birthday,
        });
        setEditing(false);
    };

    const genderLabel =
        user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác';
    const birthdayDisplay = user.birthday
        ? new Date(user.birthday).toLocaleDateString('vi-VN')
        : '—';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-[#1d1d1f]">
                    Thông tin cá nhân
                </h3>
                {!editing ? (
                    <button
                        onClick={() => setEditing(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#2997ff] hover:bg-[#2997ff]/5 transition-colors"
                    >
                        <Edit3 size={14} /> Chỉnh sửa
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleCancel}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[#86868b] hover:bg-gray-100 transition-colors"
                        >
                            <X size={14} /> Hủy
                        </button>
                        <button
                            onClick={handleSave}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#2997ff] hover:bg-[#147ce5] transition-colors"
                        >
                            <Check size={14} /> Lưu
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            {editing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FieldEdit
                        label="Họ và tên"
                        value={form.name}
                        onChange={update('name')}
                        placeholder="Nguyễn Văn A"
                    />
                    <FieldEdit
                        label="Email"
                        value={form.email}
                        onChange={update('email')}
                        type="email"
                        placeholder="email@example.com"
                    />
                    <FieldEdit
                        label="Số điện thoại"
                        value={form.phone}
                        onChange={update('phone')}
                        type="tel"
                        placeholder="0912 345 678"
                    />
                    <FieldEdit
                        label="Ngày sinh"
                        value={form.birthday}
                        onChange={update('birthday')}
                        type="date"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldDisplay icon={User} label="Họ và tên" value={user.name} />
                    <FieldDisplay icon={Mail} label="Email" value={user.email} />
                    <FieldDisplay icon={Phone} label="Số điện thoại" value={user.phone} />
                    <FieldDisplay icon={Calendar} label="Ngày sinh" value={birthdayDisplay} />
                </div>
            )}
        </motion.div>
    );
};

export default PersonalInfoCard;
