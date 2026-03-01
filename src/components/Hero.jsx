import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="w-full bg-[#f5f5f7] overflow-hidden pt-24 pb-0">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

                    {/* Left: Text Content */}
                    <div className="flex flex-col justify-center pb-16 lg:pb-24">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-[#2997ff] font-semibold text-sm uppercase tracking-widest mb-4"
                        >
                            Thiết bị y tế cao cấp
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="text-[#1d1d1f] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
                        >
                            Dành cho<br />
                            <span className="text-[#1d1d1f]">Chuyên gia</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                            className="text-[#86868b] text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
                        >
                            Nâng tầm chất lượng chăm sóc sức khỏe với các giải pháp y tế chính xác và đáng tin cậy nhất từ các thương hiệu hàng đầu thế giới.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button className="bg-[#2997ff] hover:bg-[#147ce5] text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 shadow-lg shadow-blue-400/30">
                                Mua ngay
                            </button>
                            <button className="bg-white text-[#1d1d1f] border border-gray-200 hover:border-gray-400 px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300">
                                Tìm hiểu thêm ↓
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="flex gap-10 mt-14"
                        >
                            {[
                                { value: '5,000+', label: 'Sản phẩm' },
                                { value: '120+', label: 'Thương hiệu' },
                                { value: '50K+', label: 'Khách hàng' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-2xl font-bold text-[#1d1d1f]">{stat.value}</p>
                                    <p className="text-sm text-[#86868b] mt-0.5">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Product Showcase Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="relative flex justify-center items-end"
                    >
                        {/* Background blob */}
                        <div className="absolute bottom-0 right-0 w-[90%] h-[90%] bg-gradient-to-br from-blue-100 to-teal-100 rounded-[2.5rem] z-0" />

                        {/* Main image */}
                        <img
                            src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1200&auto=format&fit=crop"
                            alt="Medical Equipment"
                            className="relative z-10 w-full max-w-md object-cover rounded-[2rem] shadow-2xl"
                            style={{ maxHeight: '600px', objectPosition: 'center top' }}
                        />

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.5, ease: 'backOut' }}
                            className="absolute top-8 -left-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">✓</div>
                            <div>
                                <p className="text-xs font-bold text-[#1d1d1f]">Hàng chính hãng</p>
                                <p className="text-[10px] text-[#86868b]">Được kiểm định quốc tế</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.5, ease: 'backOut' }}
                            className="absolute bottom-12 -left-6 z-20 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-lg">🚚</div>
                            <div>
                                <p className="text-xs font-bold text-[#1d1d1f]">Giao hàng nhanh</p>
                                <p className="text-[10px] text-[#86868b]">Toàn quốc trong 24h</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
