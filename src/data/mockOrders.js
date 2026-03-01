/**
 * Mock order data used across Order Tracking, My Orders, and Order Detail pages.
 * Replace with API calls when integrating backend.
 */

export const ORDER_STATUSES = {
    PLACED: 'placed',
    CONFIRMED: 'confirmed',
    SHIPPING: 'shipping',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
};

/**
 * Human-readable status labels + colors.
 */
export const STATUS_CONFIG = {
    [ORDER_STATUSES.PLACED]: {
        label: 'Chờ xác nhận',
        color: 'bg-yellow-100 text-yellow-700',
        dotColor: 'bg-yellow-400',
    },
    [ORDER_STATUSES.CONFIRMED]: {
        label: 'Đã xác nhận',
        color: 'bg-blue-100 text-blue-700',
        dotColor: 'bg-blue-400',
    },
    [ORDER_STATUSES.SHIPPING]: {
        label: 'Đang giao hàng',
        color: 'bg-indigo-100 text-indigo-700',
        dotColor: 'bg-indigo-400',
    },
    [ORDER_STATUSES.DELIVERED]: {
        label: 'Đã giao thành công',
        color: 'bg-green-100 text-green-700',
        dotColor: 'bg-green-400',
    },
    [ORDER_STATUSES.CANCELLED]: {
        label: 'Đã hủy',
        color: 'bg-red-100 text-red-700',
        dotColor: 'bg-red-400',
    },
};

/* ═══════════════════ Order data ═══════════════════ */

export const MOCK_ORDERS = {
    'ME-20260222': {
        id: 'ME-20260222',
        status: ORDER_STATUSES.SHIPPING,
        placedAt: '2026-02-20T10:30:00',
        placedAtDisplay: '20/02/2026 10:30',
        estimatedDelivery: '23/02/2026',
        shippingCarrier: 'Giao Hàng Nhanh',
        trackingNumber: 'GHN-987654321',
        customer: {
            name: 'Nguyễn Văn A',
            phone: '0912 345 678',
            address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
        },
        paymentMethod: 'Visa **** 4242',
        items: [
            {
                name: 'Littmann Classic III',
                quantity: 1,
                price: '2.450.000 ₫',
                image:
                    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=200&auto=format&fit=crop',
            },
            {
                name: 'Máy đo Spo2 Beurer',
                quantity: 2,
                price: '950.000 ₫',
                image:
                    'https://i.pinimg.com/1200x/f7/ca/2b/f7ca2b3e900ad5bbee3aafd6308b3c42.jpg',
            },
        ],
        subtotal: '4.350.000 ₫',
        shipping: 'Miễn phí',
        discount: '-200.000 ₫',
        total: '4.150.000 ₫',
        timeline: [
            { status: ORDER_STATUSES.PLACED, label: 'Đơn hàng đã đặt', description: 'Đơn hàng của bạn đã được tiếp nhận thành công.', time: '20/02/2026 10:30', completed: true },
            { status: ORDER_STATUSES.CONFIRMED, label: 'Đã xác nhận', description: 'Đơn hàng đã được xác nhận và đang chuẩn bị.', time: '20/02/2026 14:15', completed: true },
            { status: ORDER_STATUSES.SHIPPING, label: 'Đang vận chuyển', description: 'Đơn hàng đang trên đường giao đến bạn.', time: '21/02/2026 08:00', completed: true },
            { status: ORDER_STATUSES.DELIVERED, label: 'Đã giao hàng', description: 'Đơn hàng sẽ được giao đến bạn.', time: 'Dự kiến 23/02/2026', completed: false },
        ],
    },

    'ME-20260215': {
        id: 'ME-20260215',
        status: ORDER_STATUSES.DELIVERED,
        placedAt: '2026-02-15T09:00:00',
        placedAtDisplay: '15/02/2026 09:00',
        estimatedDelivery: '18/02/2026',
        shippingCarrier: 'Viettel Post',
        trackingNumber: 'VP-123456789',
        customer: {
            name: 'Nguyễn Văn A',
            phone: '0912 345 678',
            address: '456 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
        },
        paymentMethod: 'COD — Thanh toán khi nhận hàng',
        items: [
            {
                name: 'Omron M3 Comfort',
                quantity: 1,
                price: '1.850.000 ₫',
                image:
                    'https://i.pinimg.com/736x/dd/c9/d1/ddc9d1bded6fd22d6e60cad210da06e9.jpg',
            },
        ],
        subtotal: '1.850.000 ₫',
        shipping: '30.000 ₫',
        discount: '0 ₫',
        total: '1.880.000 ₫',
        timeline: [
            { status: ORDER_STATUSES.PLACED, label: 'Đơn hàng đã đặt', description: 'Đơn hàng của bạn đã được tiếp nhận thành công.', time: '15/02/2026 09:00', completed: true },
            { status: ORDER_STATUSES.CONFIRMED, label: 'Đã xác nhận', description: 'Đơn hàng đã được xác nhận và chuẩn bị giao.', time: '15/02/2026 11:30', completed: true },
            { status: ORDER_STATUSES.SHIPPING, label: 'Đang vận chuyển', description: 'Đơn hàng đã được bàn giao cho đơn vị vận chuyển.', time: '16/02/2026 07:45', completed: true },
            { status: ORDER_STATUSES.DELIVERED, label: 'Đã giao hàng', description: 'Đơn hàng đã giao thành công. Cảm ơn bạn!', time: '18/02/2026 15:20', completed: true },
        ],
    },

    'ME-20260210': {
        id: 'ME-20260210',
        status: ORDER_STATUSES.CONFIRMED,
        placedAt: '2026-02-10T14:20:00',
        placedAtDisplay: '10/02/2026 14:20',
        estimatedDelivery: '14/02/2026',
        shippingCarrier: 'J&T Express',
        trackingNumber: 'JT-555666777',
        customer: {
            name: 'Nguyễn Văn A',
            phone: '0912 345 678',
            address: '789 Trần Hưng Đạo, Quận 5, TP. Hồ Chí Minh',
        },
        paymentMethod: 'Momo',
        items: [
            {
                name: 'Braun NTW500',
                quantity: 1,
                price: '1.200.000 ₫',
                image:
                    'https://i.pinimg.com/1200x/d0/49/a7/d049a7de39cffbdfb567e0de6c7affcb.jpg',
            },
            {
                name: 'Littmann Classic III',
                quantity: 1,
                price: '2.450.000 ₫',
                image:
                    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=200&auto=format&fit=crop',
            },
        ],
        subtotal: '3.650.000 ₫',
        shipping: 'Miễn phí',
        discount: '0 ₫',
        total: '3.650.000 ₫',
        timeline: [
            { status: ORDER_STATUSES.PLACED, label: 'Đơn hàng đã đặt', description: 'Đơn hàng đã được tiếp nhận.', time: '10/02/2026 14:20', completed: true },
            { status: ORDER_STATUSES.CONFIRMED, label: 'Đã xác nhận', description: 'Đơn hàng đang được chuẩn bị.', time: '10/02/2026 16:00', completed: true },
            { status: ORDER_STATUSES.SHIPPING, label: 'Đang vận chuyển', description: 'Chờ bàn giao cho đơn vị vận chuyển.', time: '', completed: false },
            { status: ORDER_STATUSES.DELIVERED, label: 'Đã giao hàng', description: 'Đơn hàng sẽ được giao đến bạn.', time: 'Dự kiến 14/02/2026', completed: false },
        ],
    },

    'ME-20260105': {
        id: 'ME-20260105',
        status: ORDER_STATUSES.CANCELLED,
        placedAt: '2026-01-05T16:45:00',
        placedAtDisplay: '05/01/2026 16:45',
        estimatedDelivery: '—',
        shippingCarrier: '—',
        trackingNumber: '—',
        customer: {
            name: 'Nguyễn Văn A',
            phone: '0912 345 678',
            address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
        },
        paymentMethod: 'Visa **** 4242 — Đã hoàn tiền',
        items: [
            {
                name: 'Omron M3 Comfort',
                quantity: 1,
                price: '1.850.000 ₫',
                image:
                    'https://i.pinimg.com/736x/dd/c9/d1/ddc9d1bded6fd22d6e60cad210da06e9.jpg',
            },
        ],
        subtotal: '1.850.000 ₫',
        shipping: '30.000 ₫',
        discount: '0 ₫',
        total: '1.880.000 ₫',
        timeline: [
            { status: ORDER_STATUSES.PLACED, label: 'Đơn hàng đã đặt', description: 'Đơn hàng đã được tiếp nhận.', time: '05/01/2026 16:45', completed: true },
            { status: ORDER_STATUSES.CANCELLED, label: 'Đã hủy', description: 'Đơn hàng đã được hủy theo yêu cầu. Tiền đã hoàn lại.', time: '06/01/2026 09:00', completed: true },
        ],
    },

    'ME-20261201': {
        id: 'ME-20261201',
        status: ORDER_STATUSES.DELIVERED,
        placedAt: '2025-12-01T08:10:00',
        placedAtDisplay: '01/12/2025 08:10',
        estimatedDelivery: '04/12/2025',
        shippingCarrier: 'Giao Hàng Nhanh',
        trackingNumber: 'GHN-111222333',
        customer: {
            name: 'Nguyễn Văn A',
            phone: '0912 345 678',
            address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
        },
        paymentMethod: 'Chuyển khoản ngân hàng',
        items: [
            {
                name: 'Máy đo Spo2 Beurer',
                quantity: 1,
                price: '950.000 ₫',
                image:
                    'https://i.pinimg.com/1200x/f7/ca/2b/f7ca2b3e900ad5bbee3aafd6308b3c42.jpg',
            },
            {
                name: 'Braun NTW500',
                quantity: 1,
                price: '1.200.000 ₫',
                image:
                    'https://i.pinimg.com/1200x/d0/49/a7/d049a7de39cffbdfb567e0de6c7affcb.jpg',
            },
        ],
        subtotal: '2.150.000 ₫',
        shipping: 'Miễn phí',
        discount: '-100.000 ₫',
        total: '2.050.000 ₫',
        timeline: [
            { status: ORDER_STATUSES.PLACED, label: 'Đơn hàng đã đặt', description: 'Đơn hàng đã được tiếp nhận.', time: '01/12/2025 08:10', completed: true },
            { status: ORDER_STATUSES.CONFIRMED, label: 'Đã xác nhận', description: 'Đã xác nhận và đóng gói.', time: '01/12/2025 14:00', completed: true },
            { status: ORDER_STATUSES.SHIPPING, label: 'Đang vận chuyển', description: 'Bàn giao cho đơn vị vận chuyển.', time: '02/12/2025 09:00', completed: true },
            { status: ORDER_STATUSES.DELIVERED, label: 'Đã giao hàng', description: 'Giao hàng thành công.', time: '03/12/2025 16:30', completed: true },
        ],
    },
};

/* ═══════════════════ Helpers ═══════════════════ */

/**
 * Simulates an API lookup by order ID.
 */
export const findOrderById = (orderId) => {
    const normalized = orderId.trim().toUpperCase();
    return MOCK_ORDERS[normalized] ?? null;
};

/**
 * Returns all orders as an array, sorted by date (newest first).
 */
export const getAllOrders = () =>
    Object.values(MOCK_ORDERS).sort(
        (a, b) => new Date(b.placedAt) - new Date(a.placedAt)
    );

/**
 * Filters orders by status.
 * @param {'all'|string} status
 */
export const getOrdersByStatus = (status) => {
    const all = getAllOrders();
    if (status === 'all') return all;
    return all.filter((o) => o.status === status);
};
