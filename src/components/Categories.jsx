import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Activity, Scissors, ShieldPlus, Thermometer, Bed } from 'lucide-react';

const categories = [
    { name: 'Ống nghe', icon: <Stethoscope size={40} className="text-apple-blue mb-4" strokeWidth={1.5} /> },
    { name: 'Máy đo huyết áp', icon: <Activity size={40} className="text-apple-blue mb-4" strokeWidth={1.5} /> },
    { name: 'Dụng cụ phẫu thuật', icon: <Scissors size={40} className="text-apple-blue mb-4" strokeWidth={1.5} /> },
    { name: 'Bảo hộ y tế (PPE)', icon: <ShieldPlus size={40} className="text-apple-blue mb-4" strokeWidth={1.5} /> },
    { name: 'Nhiệt kế', icon: <Thermometer size={40} className="text-apple-blue mb-4" strokeWidth={1.5} /> },
    { name: 'Giường bệnh', icon: <Bed size={40} className="text-apple-blue mb-4" strokeWidth={1.5} /> },
];

const Categories = () => {
    return (
        <section id="danh-mục" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-bold text-apple-dark mb-3 tracking-tight"
                        >
                            Danh mục nổi bật
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-apple-textMuted text-lg"
                        >
                            Khám phá các dòng sản phẩm y tế chuyên dụng.
                        </motion.p>
                    </div>
                    <motion.a
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        href="#"
                        className="hidden md:flex text-apple-blue hover:text-apple-blueHover font-medium items-center gap-1 transition-colors"
                    >
                        Xem tất cả danh mục
                        <span aria-hidden="true">&rarr;</span>
                    </motion.a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-apple-gray hover:bg-gray-200 transition-colors duration-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px]"
                        >
                            {cat.icon}
                            <h3 className="font-semibold text-apple-dark text-lg">{cat.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
