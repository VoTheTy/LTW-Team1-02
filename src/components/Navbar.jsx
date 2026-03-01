import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Sản phẩm', to: '/#sản-phẩm' },
    { label: 'Danh mục', to: '/#danh-mục' },
    { label: 'Về chúng tôi', to: '/#about' },
    { label: 'Liên hệ', to: '/#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm py-3'
                : 'bg-white/60 backdrop-blur-sm py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#2997ff] flex items-center justify-center text-white font-bold text-base">
                            M
                        </div>
                        <span className="font-semibold text-xl tracking-tight text-[#1d1d1f]">MediEquip</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-7">
                        {NAV_LINKS.map(({ label, to }) => (
                            <Link
                                key={label}
                                to={to}
                                className="text-sm font-medium text-[#1d1d1f]/75 hover:text-[#2997ff] transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-5 text-[#1d1d1f]">
                        <button className="hover:text-[#2997ff] transition-colors">
                            <Search size={20} strokeWidth={1.5} />
                        </button>
                        <Link to="/login" className="hover:text-[#2997ff] transition-colors">
                            <User size={20} strokeWidth={1.5} />
                        </Link>

                        {/* Cart icon with real badge */}
                        <Link to="/cart" className="relative hover:text-[#2997ff] transition-colors">
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            <AnimatePresence>
                                {totalItems > 0 && (
                                    <motion.span
                                        key="badge"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1.5 -right-1.5 bg-[#2997ff] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center"
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        <button className="md:hidden">
                            <Menu size={22} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
