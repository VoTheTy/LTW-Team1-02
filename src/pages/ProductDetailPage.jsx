import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Truck, ShieldCheck, ChevronRight, Minus, Plus, CheckCircle2, Zap, Bell } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

/* ---------- Sub-components ---------- */

const Breadcrumb = ({ productName }) => (
    <nav className="flex items-center gap-1.5 text-sm text-[#86868b] mb-8">
        {['Trang chủ', 'Sản phẩm', 'Sản phẩm bán chạy', productName].map((crumb, i, arr) => (
            <React.Fragment key={crumb}>
                <Link to="#" className="hover:text-[#2997ff] transition-colors">{crumb}</Link>
                {i < arr.length - 1 && <ChevronRight size={14} />}
            </React.Fragment>
        ))}
    </nav>
);

const StarRating = ({ rating, reviewCount }) => (
    <div className="flex items-center gap-2 mb-3">
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16}
                    fill={i < rating ? '#f59e0b' : 'transparent'}
                    color={i < rating ? '#f59e0b' : '#d1d5db'}
                    strokeWidth={1.5}
                />
            ))}
        </div>
        <span className="text-[#86868b] text-sm">({reviewCount} đánh giá)</span>
    </div>
);

const ThumbnailGallery = ({ images, activeIdx, onSelect }) => (
    <div className="flex gap-3 mt-4">
        {images.map((src, i) => (
            <button
                key={i}
                onClick={() => onSelect(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeIdx === i ? 'border-[#2997ff] shadow-md' : 'border-transparent hover:border-gray-300'
                    }`}
            >
                <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            </button>
        ))}
    </div>
);

const QuantitySelector = ({ qty, onDecrease, onIncrease }) => (
    <div className="flex items-center gap-0 border border-gray-200 rounded-full w-fit">
        <button onClick={onDecrease} className="w-10 h-10 flex items-center justify-center text-[#1d1d1f] hover:bg-gray-100 rounded-l-full transition-colors">
            <Minus size={16} />
        </button>
        <span className="w-10 text-center font-semibold text-[#1d1d1f] text-sm select-none">{qty}</span>
        <button onClick={onIncrease} className="w-10 h-10 flex items-center justify-center text-[#1d1d1f] hover:bg-gray-100 rounded-r-full transition-colors">
            <Plus size={16} />
        </button>
    </div>
);

const SpecsTable = ({ specs }) => (
    <div className="divide-y divide-gray-100">
        {specs.map(({ label, value }) => (
            <div key={label} className="flex py-4 gap-4">
                <span className="w-48 flex-shrink-0 text-[#86868b] text-sm">{label}</span>
                <span className="text-[#1d1d1f] text-sm font-medium">{value}</span>
            </div>
        ))}
    </div>
);

const RelatedProducts = ({ currentId, allProducts }) => {
    const related = allProducts.filter(p => p.id !== currentId).slice(0, 4);
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                        <div className="p-4">
                            <h4 className="font-semibold text-sm text-[#1d1d1f] mb-1 truncate">{product.name}</h4>
                            <p className="text-[#2997ff] font-bold text-sm mb-3">{product.price}</p>
                            <button className="w-full text-xs bg-[#f5f5f7] hover:bg-[#2997ff] hover:text-white text-[#1d1d1f] font-semibold py-2 rounded-full transition-all duration-300">
                                Thêm vào giỏ
                            </button>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
};

/* ---------- Main Page ---------- */

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === id) ?? products[1];

    const { addToCart } = useCart();
    const [activeThumb, setActiveThumb] = useState(0);
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* === PRODUCT MAIN === */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">
                <Breadcrumb productName={product.name} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Images */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div className="w-full aspect-square bg-[#f5f5f7] rounded-3xl overflow-hidden">
                            <img
                                src={product.thumbnails[activeThumb]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                        </div>
                        <ThumbnailGallery images={product.thumbnails} activeIdx={activeThumb} onSelect={setActiveThumb} />
                    </motion.div>

                    {/* Right: Info */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <span className="inline-block bg-[#2997ff]/10 text-[#2997ff] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                            {product.badge}
                        </span>

                        <h1 className="text-4xl font-bold text-[#1d1d1f] tracking-tight mb-3">{product.name}</h1>

                        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

                        <p className="text-3xl font-bold text-[#2997ff] mb-6">{product.price}</p>

                        {/* Features */}
                        <ul className="space-y-3 mb-8">
                            {product.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-[#1d1d1f]">
                                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        {/* Quantity + Add to cart */}
                        <div className="flex items-center gap-4 mb-6">
                            <QuantitySelector qty={qty} onDecrease={() => setQty(q => Math.max(1, q - 1))} onIncrease={() => setQty(q => q + 1)} />
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleAddToCart}
                                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-base transition-all duration-300 ${added ? 'bg-green-500 text-white' : 'bg-[#2997ff] hover:bg-[#147ce5] text-white'
                                    }`}
                            >
                                <ShoppingCart size={18} />
                                {added ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
                            </motion.button>
                        </div>

                        {/* Trust badges */}
                        <div className="flex gap-6 pt-5 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-xs text-[#86868b]">
                                <Truck size={16} className="text-[#2997ff]" strokeWidth={1.5} />
                                Giao hàng miễn phí toàn quốc
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#86868b]">
                                <ShieldCheck size={16} className="text-[#2997ff]" strokeWidth={1.5} />
                                Bảo hành chính hãng 2 năm
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === FEATURE HIGHLIGHT === */}
            <section className="bg-[#f5f5f7] py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-3">Thiết kế cho cuộc sống khoẻ mạnh</h2>
                        <p className="text-[#86868b] max-w-2xl mx-auto text-base">{product.description}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="rounded-3xl overflow-hidden h-72 lg:h-96 bg-[#0d1b2a] relative shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1200&auto=format&fit=crop"
                                alt="Feature highlight"
                                className="w-full h-full object-cover opacity-70"
                            />
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="font-bold text-xl">Dễ sử dụng</p>
                                <p className="text-gray-300 text-sm mt-1">Thiết kế tay cầm ergonomic, phù hợp cho tất cả mọi người</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: <Zap size={22} className="text-[#2997ff]" strokeWidth={1.5} />, title: 'Công nghệ IntelliWrap 360°', desc: 'Đảm bảo que băng gắn chính xác lên cánh tay bất kỳ góc độ, cho kết quả đáng tin cậy.' },
                                { icon: <Bell size={22} className="text-[#f59e0b]" strokeWidth={1.5} />, title: 'Cảnh báo cử động người dùng', desc: 'Tự động phát hiện khi người dùng cử động trong lúc đo và thông báo để đặt lại.' },
                                { icon: <ShieldCheck size={22} className="text-green-500" strokeWidth={1.5} />, title: 'Chỉ báo tăng huyết áp', desc: 'Màu sắc đèn LED phân loại kết quả theo tiêu chuẩn WHO, giúp bạn đọc dễ dàng nhận biết.' },
                            ].map(({ icon, title, desc }) => (
                                <div key={title} className="flex gap-5 items-start">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">{icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-[#1d1d1f] mb-1">{title}</h4>
                                        <p className="text-[#86868b] text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* === SPECS === */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-12">
                    <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight text-center mb-12">Thông số kỹ thuật</h2>
                    <SpecsTable specs={product.specs} />
                </div>
            </section>

            {/* === RELATED PRODUCTS === */}
            <section className="bg-[#f5f5f7] py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">Sản phẩm liên quan</h2>
                        <Link to="/" className="text-[#2997ff] hover:underline text-sm font-medium">Xem tất cả →</Link>
                    </div>
                    <RelatedProducts currentId={product.id} allProducts={products} />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProductDetailPage;
