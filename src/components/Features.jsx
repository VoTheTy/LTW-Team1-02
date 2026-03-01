import React from 'react';
import { ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <ShieldCheck className="text-apple-blue" size={24} strokeWidth={1.5} />,
        title: 'Sản phẩm chính hãng',
        desc: 'Cam kết chất lượng 100%'
    },
    {
        icon: <Truck className="text-apple-blue" size={24} strokeWidth={1.5} />,
        title: 'Giao hàng toàn quốc',
        desc: 'Nhanh chóng và an toàn'
    },
    {
        icon: <CreditCard className="text-apple-blue" size={24} strokeWidth={1.5} />,
        title: 'Thanh toán an toàn',
        desc: 'Bảo mật tuyệt đối'
    },
    {
        icon: <Headphones className="text-apple-blue" size={24} strokeWidth={1.5} />,
        title: 'Hỗ trợ 24/7',
        desc: 'Tư vấn từ chuyên gia'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.8
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const Features = () => {
    return (
        <div className="w-full bg-white py-12 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {features.map((item, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                            <div className="flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-semibold text-apple-dark mb-1 text-sm md:text-base">{item.title}</h4>
                                <p className="text-apple-textMuted text-xs md:text-sm">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Features;
