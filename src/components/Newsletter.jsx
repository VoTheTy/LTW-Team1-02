import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-apple-blue/10 text-apple-blue mb-6"
                >
                    <Mail size={32} strokeWidth={1.5} />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl font-bold text-apple-dark mb-4 tracking-tight"
                >
                    Luôn cập nhật thông tin
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-apple-textMuted text-lg mb-10"
                >
                    Đăng ký nhận bản tin để không bỏ lỡ các sản phẩm mới và ưu đãi độc quyền dành cho chuyên gia y tế.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="email"
                        placeholder="Địa chỉ email của bạn"
                        className="flex-grow bg-apple-gray text-apple-dark rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all text-lg placeholder:text-gray-400"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-apple-dark hover:bg-black text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 text-lg sm:w-auto w-full"
                    >
                        Đăng ký
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Newsletter;
