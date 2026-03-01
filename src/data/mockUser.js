/**
 * Mock user profile data.
 * Replace with real API / auth context when integrating backend.
 */

export const MOCK_USER = {
    id: 'USR-001',
    avatar: null, // null = show initials
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '0912 345 678',
    gender: 'male',
    birthday: '1990-05-15',
    address: {
        street: '123 Nguyễn Huệ',
        ward: 'Phường Bến Nghé',
        district: 'Quận 1',
        city: 'TP. Hồ Chí Minh',
    },
    memberSince: '2025-06-01',
    tier: 'gold', // 'silver' | 'gold' | 'platinum'
    stats: {
        totalOrders: 12,
        totalSpent: '28.500.000 ₫',
        points: 2850,
        savedAddresses: 2,
    },
};

export const TIER_CONFIG = {
    silver: {
        label: 'Bạc',
        color: 'from-gray-400 to-gray-500',
        textColor: 'text-gray-600',
        bgColor: 'bg-gray-100',
        icon: '🥈',
    },
    gold: {
        label: 'Vàng',
        color: 'from-amber-400 to-yellow-500',
        textColor: 'text-amber-600',
        bgColor: 'bg-amber-50',
        icon: '🥇',
    },
    platinum: {
        label: 'Bạch Kim',
        color: 'from-indigo-400 to-purple-500',
        textColor: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        icon: '💎',
    },
};
