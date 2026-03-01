import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { products } from '../data/products';

const BestSellers = () => {
    return (
        <section id="sản-phẩm" className="py-24 bg-[#f5f5f7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-[#1d1d1f] mb-4 tracking-tight"
                    >
                        Sản phẩm bán chạy
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[#86868b] text-lg max-w-2xl mx-auto"
                    >
                        Sản phẩm được các chuyên gia y tế tin dùng hàng đầu tại Việt Nam.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100"
                        >
                            {/* Image */}
                            <div className="aspect-square bg-gray-50 overflow-hidden m-4 rounded-2xl">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                />
                            </div>

                            {/* Info */}
                            <div className="px-5 pb-5 flex-grow flex flex-col text-center">
                                <h3 className="font-bold text-base text-[#1d1d1f] mb-1">{product.name}</h3>
                                <p className="text-sm text-[#86868b] mb-3 leading-relaxed flex-grow">{product.desc}</p>

                                {/* Stars */}
                                <div className="flex justify-center items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={13}
                                            fill={i < product.rating ? '#f59e0b' : 'transparent'}
                                            color={i < product.rating ? '#f59e0b' : '#d1d5db'}
                                            strokeWidth={1.5}
                                        />
                                    ))}
                                </div>

                                <div className="text-xl font-bold text-[#1d1d1f] mb-4 tracking-tight">{product.price}</div>

                                <Link to={`/product/${product.id}`}>
                                    <button className="w-full bg-[#2997ff] hover:bg-[#147ce5] text-white font-semibold py-3 rounded-full transition-all duration-300">
                                        Xem chi tiết
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
