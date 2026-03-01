import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1d1d1f] text-gray-300 pt-20 pb-10 font-sans border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="space-y-6">
                        <h3 className="text-white text-2xl font-bold tracking-tight">MediEquip</h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                            MediEquip cam kết mang đến những thiết bị y tế tiêu chuẩn quốc tế, phục vụ sự nghiệp chăm sóc sức khỏe cộng đồng với sự tận tâm và chuyên nghiệp nhất.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <Facebook size={20} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <Instagram size={20} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <Twitter size={20} strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-semibold mb-6 tracking-wide uppercase">Về MediEquip</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Câu chuyện thương hiệu</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Tin tức & Sự kiện</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Đối tác</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-semibold mb-6 tracking-wide uppercase">Hỗ trợ khách hàng</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Đổi trả hàng</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Phương thức thanh toán</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-semibold mb-6 tracking-wide uppercase">Liên hệ</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-apple-blue flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                <span>Quận 1, TPHCM</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-apple-blue flex-shrink-0" strokeWidth={1.5} />
                                <span>1900 6789</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-apple-blue flex-shrink-0" strokeWidth={1.5} />
                                <span>support@mediequip.vn</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p className="mb-4 md:mb-0">&copy; 2024 MediEquip Premium Medical Store. Bảo lưu mọi quyền.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Quyền riêng tư</a>
                        <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
                        <a href="#" className="hover:text-white transition-colors">Bản đồ trang web</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
