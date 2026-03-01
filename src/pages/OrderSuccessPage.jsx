import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderSuccessPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            <div className="max-w-2xl mx-auto px-6 pt-40 pb-32 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8"
                >
                    <CheckCircle2 size={48} className="text-green-500" strokeWidth={1.5} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold text-[#1d1d1f] tracking-tight mb-4"
                >
                    Đặt hàng thành công!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#86868b] text-lg mb-4 max-w-md mx-auto"
                >
                    Cảm ơn bạn đã tin tưởng MediEquip. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#f5f5f7] rounded-2xl p-6 mb-10 max-w-sm mx-auto"
                >
                    <div className="flex items-center gap-3 justify-center mb-3">
                        <Package size={20} className="text-[#2997ff]" strokeWidth={1.5} />
                        <span className="text-sm font-semibold text-[#1d1d1f]">Mã đơn hàng</span>
                    </div>
                    <p className="text-2xl font-bold text-[#2997ff] tracking-widest">
                        ME-{Date.now().toString().slice(-8)}
                    </p>
                    <p className="text-xs text-[#86868b] mt-2">Vui lòng lưu lại mã này để theo dõi đơn hàng</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/">
                        <button className="bg-[#2997ff] hover:bg-[#147ce5] text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2">
                            Tiếp tục mua hàng <ArrowRight size={16} />
                        </button>
                    </Link>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default OrderSuccessPage;
