import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Edit3, Check, X, Plus, Home, Building2 } from 'lucide-react';

/**
 * Address management card with view/edit.
 *
 * @param {object} props
 * @param {object} props.address - { street, ward, district, city }
 */
const AddressCard = ({ address }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ ...address });

    const update = (key) => (e) =>
        setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const fullAddress = `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;

    const handleSave = () => {
        // TODO: call API
        setEditing(false);
    };

    const handleCancel = () => {
        setForm({ ...address });
        setEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-[#1d1d1f]">Địa chỉ</h3>
                <div className="flex gap-2">
                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#2997ff] hover:bg-[#2997ff]/5 transition-colors"
                        >
                            <Edit3 size={14} /> Chỉnh sửa
                        </button>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>

            {editing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { key: 'street', label: 'Số nhà, Đường', placeholder: '123 Nguyễn Huệ' },
                        { key: 'ward', label: 'Phường/Xã', placeholder: 'Phường Bến Nghé' },
                        { key: 'district', label: 'Quận/Huyện', placeholder: 'Quận 1' },
                        { key: 'city', label: 'Tỉnh/Thành phố', placeholder: 'TP. Hồ Chí Minh' },
                    ].map((field) => (
                        <div key={field.key}>
                            <label className="block text-[11px] text-[#86868b] font-medium uppercase tracking-wider mb-1.5">
                                {field.label}
                            </label>
                            <input
                                type="text"
                                value={form[field.key]}
                                onChange={update(field.key)}
                                placeholder={field.placeholder}
                                className="w-full px-3.5 py-2.5 bg-[#f5f5f7] rounded-xl text-sm text-[#1d1d1f] placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2997ff]/40 focus:border-transparent transition-all"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-3">
                    {/* Default address */}
                    <div className="flex items-start gap-3 p-4 bg-[#f5f5f7] rounded-xl border border-blue-100">
                        <div className="w-9 h-9 rounded-lg bg-[#2997ff]/10 flex items-center justify-center shrink-0">
                            <Home size={16} className="text-[#2997ff]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-semibold text-[#1d1d1f]">Nhà riêng</p>
                                <span className="text-[10px] font-bold text-[#2997ff] bg-[#2997ff]/10 px-2 py-0.5 rounded-full">
                                    Mặc định
                                </span>
                            </div>
                            <p className="text-sm text-[#86868b]">{fullAddress}</p>
                        </div>
                    </div>

                    {/* Add button */}
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-gray-300 text-sm text-[#86868b] hover:text-[#2997ff] hover:border-[#2997ff]/30 transition-colors">
                        <Plus size={16} /> Thêm địa chỉ mới
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default AddressCard;
