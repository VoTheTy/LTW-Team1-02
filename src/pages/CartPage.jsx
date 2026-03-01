import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Truck, ShieldCheck, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

/* -------- Sub-components -------- */

const EmptyCart = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-32 text-center"
    >
        <div className="w-24 h-24 rounded-full bg-[#f5f5f7] flex items-center justify-center mb-6">
            <ShoppingBag size={40} className="text-[#86868b]" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2">Giỏ hàng trống</h2>
        <p className="text-[#86868b] mb-8 max-w-xs">Bạn chưa thêm sản phẩm nào vào giỏ. Hãy khám phá cửa hàng của chúng tôi!</p>
        <Link to="/">
            <button className="bg-[#2997ff] hover:bg-[#147ce5] text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300">
                Tiếp tục mua hàng
            </button>
        </Link>
    </motion.div>
);

const CartItem = ({ item, onUpdateQty, onRemove }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30, height: 0 }}
        transition={{ duration: 0.3 }}
        className="flex gap-5 py-6 border-b border-gray-100 last:border-none"
    >
        {/* Image */}
        <Link to={`/product/${item.id}`} className="flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#f5f5f7]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
        </Link>

        {/* Info */}
        <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start gap-2">
                <div>
                    <Link to={`/product/${item.id}`}>
                        <h3 className="font-semibold text-[#1d1d1f] hover:text-[#2997ff] transition-colors truncate">{item.name}</h3>
                    </Link>
                    <p className="text-[#86868b] text-sm mt-0.5">{item.desc}</p>
                </div>
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 p-1"
                >
                    <Trash2 size={16} strokeWidth={1.5} />
                </button>
            </div>

            <div className="flex items-center justify-between mt-4">
                {/* Qty Controls */}
                <div className="flex items-center gap-0 border border-gray-200 rounded-full w-fit">
                    <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="w-9 h-9 flex items-center justify-center text-[#1d1d1f] hover:bg-gray-100 rounded-l-full transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-9 text-center font-semibold text-sm text-[#1d1d1f] select-none">{item.qty}</span>
                    <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="w-9 h-9 flex items-center justify-center text-[#1d1d1f] hover:bg-gray-100 rounded-r-full transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {/* Price */}
                <p className="font-bold text-[#1d1d1f] text-base">
                    {(item.priceRaw * item.qty).toLocaleString('vi-VN')} ₫
                </p>
            </div>
        </div>
    </motion.div>
);

const CouponInput = () => {
    const [code, setCode] = useState('');
    const [applied, setApplied] = useState(false);

    const handleApply = () => {
        if (code.trim()) setApplied(true);
    };

    return (
        <div className="flex gap-2 mt-4">
            <div className="relative flex-grow">
                <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" strokeWidth={1.5} />
                <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    value={code}
                    onChange={e => { setCode(e.target.value); setApplied(false); }}
                    className="w-full pl-9 pr-3 py-3 bg-[#f5f5f7] rounded-full text-sm text-[#1d1d1f] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2997ff]/30"
                />
            </div>
            <button
                onClick={handleApply}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${applied ? 'bg-green-500 text-white' : 'bg-[#1d1d1f] hover:bg-black text-white'
                    }`}
            >
                {applied ? 'Đã áp dụng!' : 'Áp dụng'}
            </button>
        </div>
    );
};

const OrderSummary = ({ subtotal, itemCount }) => {
    const shipping = subtotal >= 2000000 ? 0 : 30000;
    const total = subtotal + shipping;

    return (
        <div className="bg-[#f5f5f7] rounded-3xl p-6 sticky top-28">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-6">Tóm tắt đơn hàng</h2>

            <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-[#86868b]">
                    <span>Tạm tính ({itemCount} sản phẩm)</span>
                    <span className="text-[#1d1d1f] font-medium">{subtotal.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-[#86868b]">
                    <span>Phí vận chuyển</span>
                    <span className={shipping === 0 ? 'text-green-500 font-medium' : 'text-[#1d1d1f] font-medium'}>
                        {shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString('vi-VN')} ₫`}
                    </span>
                </div>
                {subtotal > 0 && subtotal < 2000000 && (
                    <p className="text-xs text-[#86868b] bg-white rounded-xl px-3 py-2">
                        💡 Mua thêm <span className="text-[#2997ff] font-semibold">{(2000000 - subtotal).toLocaleString('vi-VN')} ₫</span> để được miễn phí vận chuyển
                    </p>
                )}
            </div>

            {/* Coupon */}
            <div className="border-t border-gray-200 pt-5 mb-5">
                <p className="text-sm font-medium text-[#1d1d1f] mb-1">Mã giảm giá</p>
                <CouponInput />
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-5 mb-6">
                <span className="font-bold text-[#1d1d1f] text-base">Tổng cộng</span>
                <span className="font-bold text-2xl text-[#2997ff]">{total.toLocaleString('vi-VN')} ₫</span>
            </div>

            <Link to="/checkout">
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-[#2997ff] hover:bg-[#147ce5] text-white font-semibold py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-base mb-4"
                >
                    Tiến hành thanh toán
                    <ChevronRight size={18} />
                </motion.button>
            </Link>

            {/* Trust */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#86868b]">
                    <Truck size={14} className="text-[#2997ff]" strokeWidth={1.5} />
                    Giao hàng nhanh toàn quốc
                </div>
                <div className="flex items-center gap-2 text-xs text-[#86868b]">
                    <ShieldCheck size={14} className="text-[#2997ff]" strokeWidth={1.5} />
                    Bảo hành chính hãng 2 năm
                </div>
            </div>
        </div>
    );
};

/* -------- Main Page -------- */

const CartPage = () => {
    const { cart, removeFromCart, updateQty, totalItems, subtotal } = useCart();

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-[#1d1d1f] tracking-tight">Giỏ hàng</h1>
                        {totalItems > 0 && (
                            <p className="text-[#86868b] mt-1">{totalItems} sản phẩm</p>
                        )}
                    </div>
                    <Link to="/" className="flex items-center gap-1.5 text-sm text-[#2997ff] hover:text-[#147ce5] transition-colors font-medium">
                        <ArrowLeft size={16} />
                        Tiếp tục mua hàng
                    </Link>
                </div>

                {cart.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <AnimatePresence>
                                {cart.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQty={updateQty}
                                        onRemove={removeFromCart}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <OrderSummary subtotal={subtotal} itemCount={totalItems} />
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CartPage;
