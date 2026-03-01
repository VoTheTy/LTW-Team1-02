import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ChevronRight, MapPin, CreditCard, Truck,
    ShieldCheck, CheckCircle2, Wallet, Building2, Banknote,
    Package, CircleDot, Circle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

/* -------- Constants -------- */

const STEPS = ['Giao hàng', 'Thanh toán', 'Xác nhận'];

const PAYMENT_METHODS = [
    { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: <Banknote size={20} strokeWidth={1.5} />, desc: 'Thanh toán bằng tiền mặt khi nhận hàng' },
    { id: 'bank', label: 'Chuyển khoản ngân hàng', icon: <Building2 size={20} strokeWidth={1.5} />, desc: 'Chuyển khoản trực tiếp qua tài khoản ngân hàng' },
    { id: 'card', label: 'Thẻ tín dụng / ghi nợ', icon: <CreditCard size={20} strokeWidth={1.5} />, desc: 'Visa, Mastercard, JCB' },
    { id: 'ewallet', label: 'Ví điện tử', icon: <Wallet size={20} strokeWidth={1.5} />, desc: 'MoMo, ZaloPay, VNPay' },
];

/* -------- Sub-components -------- */

const StepIndicator = ({ current }) => (
    <div className="flex items-center justify-center gap-2 mb-12">
        {STEPS.map((step, i) => (
            <React.Fragment key={step}>
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i < current ? 'bg-green-500 text-white' :
                            i === current ? 'bg-[#2997ff] text-white' :
                                'bg-gray-200 text-[#86868b]'
                        }`}>
                        {i < current ? <CheckCircle2 size={16} /> : i + 1}
                    </div>
                    <span className={`text-sm font-medium hidden sm:inline ${i <= current ? 'text-[#1d1d1f]' : 'text-[#86868b]'
                        }`}>{step}</span>
                </div>
                {i < STEPS.length - 1 && (
                    <div className={`w-12 h-[2px] rounded-full transition-all duration-300 ${i < current ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                )}
            </React.Fragment>
        ))}
    </div>
);

const FormField = ({ label, id, type = 'text', placeholder, value, onChange, required = true, colSpan = false }) => (
    <div className={colSpan ? 'sm:col-span-2' : ''}>
        <label htmlFor={id} className="block text-sm font-medium text-[#1d1d1f] mb-1.5">{label}</label>
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm text-[#1d1d1f] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2997ff]/40 transition-all"
        />
    </div>
);

const PaymentOption = ({ method, selected, onSelect }) => (
    <button
        onClick={() => onSelect(method.id)}
        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${selected === method.id
                ? 'border-[#2997ff] bg-[#2997ff]/5'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
    >
        <div className={`flex-shrink-0 ${selected === method.id ? 'text-[#2997ff]' : 'text-[#86868b]'}`}>
            {method.icon}
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-sm text-[#1d1d1f]">{method.label}</p>
            <p className="text-xs text-[#86868b] mt-0.5">{method.desc}</p>
        </div>
        {selected === method.id
            ? <CircleDot size={20} className="text-[#2997ff] flex-shrink-0" />
            : <Circle size={20} className="text-gray-300 flex-shrink-0" />
        }
    </button>
);

const OrderItem = ({ item }) => (
    <div className="flex gap-4 py-3">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f5f5f7] flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow min-w-0">
            <p className="text-sm font-medium text-[#1d1d1f] truncate">{item.name}</p>
            <p className="text-xs text-[#86868b]">SL: {item.qty}</p>
        </div>
        <p className="text-sm font-semibold text-[#1d1d1f] flex-shrink-0">
            {(item.priceRaw * item.qty).toLocaleString('vi-VN')} ₫
        </p>
    </div>
);

const OrderSummary = ({ cart, subtotal }) => {
    const shipping = subtotal >= 2000000 ? 0 : 30000;
    const total = subtotal + shipping;

    return (
        <div className="bg-[#f5f5f7] rounded-3xl p-6 sticky top-28">
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-5 flex items-center gap-2">
                <Package size={18} strokeWidth={1.5} />
                Đơn hàng của bạn
            </h3>

            <div className="divide-y divide-gray-200 mb-5">
                {cart.map(item => <OrderItem key={item.id} item={item} />)}
            </div>

            <div className="space-y-2.5 text-sm border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between text-[#86868b]">
                    <span>Tạm tính</span>
                    <span className="text-[#1d1d1f] font-medium">{subtotal.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-[#86868b]">
                    <span>Phí vận chuyển</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-500' : 'text-[#1d1d1f]'}`}>
                        {shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString('vi-VN')} ₫`}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="font-bold text-[#1d1d1f]">Tổng cộng</span>
                <span className="font-bold text-xl text-[#2997ff]">{total.toLocaleString('vi-VN')} ₫</span>
            </div>

            <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#86868b]">
                    <Truck size={13} className="text-[#2997ff]" strokeWidth={1.5} />Giao hàng nhanh toàn quốc
                </div>
                <div className="flex items-center gap-2 text-xs text-[#86868b]">
                    <ShieldCheck size={13} className="text-[#2997ff]" strokeWidth={1.5} />Bảo hành chính hãng
                </div>
            </div>
        </div>
    );
};

/* -------- Step Forms -------- */

const ShippingForm = ({ formData, onChange }) => (
    <motion.div
        key="shipping"
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
    >
        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2 flex items-center gap-2">
            <MapPin size={22} className="text-[#2997ff]" strokeWidth={1.5} />
            Thông tin giao hàng
        </h2>
        <p className="text-[#86868b] text-sm mb-8">Vui lòng nhập địa chỉ nhận hàng chính xác</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Họ và tên" id="fullName" placeholder="Nguyễn Văn A" value={formData.fullName} onChange={onChange('fullName')} />
            <FormField label="Số điện thoại" id="phone" type="tel" placeholder="0912 345 678" value={formData.phone} onChange={onChange('phone')} />
            <FormField label="Email" id="email" type="email" placeholder="email@example.com" value={formData.email} onChange={onChange('email')} />
            <FormField label="Tỉnh / Thành phố" id="city" placeholder="TP. Hồ Chí Minh" value={formData.city} onChange={onChange('city')} />
            <FormField label="Quận / Huyện" id="district" placeholder="Quận 1" value={formData.district} onChange={onChange('district')} />
            <FormField label="Phường / Xã" id="ward" placeholder="Phường Bến Nghé" value={formData.ward} onChange={onChange('ward')} />
            <FormField label="Địa chỉ chi tiết" id="address" placeholder="Số nhà, tên đường..." value={formData.address} onChange={onChange('address')} colSpan />
            <div className="sm:col-span-2">
                <label htmlFor="note" className="block text-sm font-medium text-[#1d1d1f] mb-1.5">Ghi chú</label>
                <textarea
                    id="note"
                    rows={3}
                    placeholder="Ghi chú cho người giao hàng (tuỳ chọn)"
                    value={formData.note}
                    onChange={onChange('note')}
                    className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-sm text-[#1d1d1f] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2997ff]/40 resize-none transition-all"
                />
            </div>
        </div>
    </motion.div>
);

const PaymentForm = ({ selectedMethod, onSelect }) => (
    <motion.div
        key="payment"
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
    >
        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2 flex items-center gap-2">
            <CreditCard size={22} className="text-[#2997ff]" strokeWidth={1.5} />
            Phương thức thanh toán
        </h2>
        <p className="text-[#86868b] text-sm mb-8">Chọn phương thức thanh toán phù hợp với bạn</p>

        <div className="space-y-3">
            {PAYMENT_METHODS.map(method => (
                <PaymentOption key={method.id} method={method} selected={selectedMethod} onSelect={onSelect} />
            ))}
        </div>
    </motion.div>
);

const ConfirmationStep = ({ formData, paymentMethod, cart, subtotal }) => {
    const shipping = subtotal >= 2000000 ? 0 : 30000;
    const total = subtotal + shipping;
    const pm = PAYMENT_METHODS.find(m => m.id === paymentMethod);

    return (
        <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2 flex items-center gap-2">
                <CheckCircle2 size={22} className="text-green-500" strokeWidth={1.5} />
                Xác nhận đơn hàng
            </h2>
            <p className="text-[#86868b] text-sm mb-8">Vui lòng kiểm tra lại thông tin trước khi đặt hàng</p>

            {/* Shipping info summary */}
            <div className="bg-[#f5f5f7] rounded-2xl p-5 mb-5">
                <h4 className="text-sm font-bold text-[#1d1d1f] mb-3 flex items-center gap-2">
                    <MapPin size={15} className="text-[#2997ff]" /> Địa chỉ giao hàng
                </h4>
                <p className="text-sm text-[#1d1d1f] font-medium">{formData.fullName}</p>
                <p className="text-sm text-[#86868b]">{formData.phone} • {formData.email}</p>
                <p className="text-sm text-[#86868b] mt-1">{formData.address}, {formData.ward}, {formData.district}, {formData.city}</p>
                {formData.note && <p className="text-sm text-[#86868b] mt-1 italic">Ghi chú: {formData.note}</p>}
            </div>

            {/* Payment summary */}
            <div className="bg-[#f5f5f7] rounded-2xl p-5 mb-5">
                <h4 className="text-sm font-bold text-[#1d1d1f] mb-3 flex items-center gap-2">
                    <CreditCard size={15} className="text-[#2997ff]" /> Thanh toán
                </h4>
                <div className="flex items-center gap-3">
                    <span className="text-[#2997ff]">{pm?.icon}</span>
                    <span className="text-sm font-medium text-[#1d1d1f]">{pm?.label}</span>
                </div>
            </div>

            {/* Products */}
            <div className="bg-[#f5f5f7] rounded-2xl p-5">
                <h4 className="text-sm font-bold text-[#1d1d1f] mb-3 flex items-center gap-2">
                    <Package size={15} className="text-[#2997ff]" /> Sản phẩm ({cart.length})
                </h4>
                <div className="divide-y divide-gray-200">
                    {cart.map(item => <OrderItem key={item.id} item={item} />)}
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
                    <span className="font-bold text-[#1d1d1f]">Tổng thanh toán</span>
                    <span className="font-bold text-xl text-[#2997ff]">{total.toLocaleString('vi-VN')} ₫</span>
                </div>
            </div>
        </motion.div>
    );
};

/* -------- Main Page -------- */

const CheckoutPage = () => {
    const { cart, subtotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [formData, setFormData] = useState({
        fullName: '', phone: '', email: '',
        city: '', district: '', ward: '',
        address: '', note: '',
    });

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const canProceed = () => {
        if (step === 0) {
            return formData.fullName && formData.phone && formData.email && formData.city && formData.district && formData.ward && formData.address;
        }
        if (step === 1) return !!paymentMethod;
        return true;
    };

    const handleNext = () => {
        if (step < 2) setStep(s => s + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep(s => s - 1);
    };

    const handlePlaceOrder = () => {
        clearCart();
        navigate('/order-success');
    };

    // Redirect if cart empty
    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white font-sans">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-48 text-center px-6">
                    <Package size={48} className="text-[#86868b] mb-4" strokeWidth={1.5} />
                    <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2">Chưa có sản phẩm nào</h2>
                    <p className="text-[#86868b] mb-8">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
                    <Link to="/">
                        <button className="bg-[#2997ff] hover:bg-[#147ce5] text-white px-8 py-3.5 rounded-full font-semibold transition-all">
                            Quay lại cửa hàng
                        </button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
                <StepIndicator current={step} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main form area */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {step === 0 && <ShippingForm formData={formData} onChange={handleChange} />}
                            {step === 1 && <PaymentForm selectedMethod={paymentMethod} onSelect={setPaymentMethod} />}
                            {step === 2 && <ConfirmationStep formData={formData} paymentMethod={paymentMethod} cart={cart} subtotal={subtotal} />}
                        </AnimatePresence>

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                            <button
                                onClick={step === 0 ? () => navigate('/cart') : handleBack}
                                className="flex items-center gap-1.5 text-sm text-[#86868b] hover:text-[#1d1d1f] font-medium transition-colors"
                            >
                                <ArrowLeft size={16} />
                                {step === 0 ? 'Quay lại giỏ hàng' : 'Quay lại'}
                            </button>

                            {step < 2 ? (
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                    className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 ${canProceed()
                                            ? 'bg-[#2997ff] hover:bg-[#147ce5] text-white'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Tiếp tục <ChevronRight size={18} />
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handlePlaceOrder}
                                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 shadow-lg shadow-green-500/30"
                                >
                                    <CheckCircle2 size={18} />
                                    Đặt hàng
                                </motion.button>
                            )}
                        </div>
                    </div>

                    {/* Sidebar summary */}
                    <div className="lg:col-span-1">
                        <OrderSummary cart={cart} subtotal={subtotal} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CheckoutPage;
