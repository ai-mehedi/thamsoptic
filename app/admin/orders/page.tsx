"use client";
import { useEffect, useState } from 'react';
import { Search, Filter, Phone, Mail, MapPin, Package, ChevronDown, Check } from 'lucide-react';

interface Order {
    id: string;
    orderNumber: string;
    status: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
    packageName: string;
    packageSpeed: string;
    packagePrice: number;
    notes: string | null;
    createdAt: string;
}

const statuses = ['PENDING', 'CONTACTED', 'SCHEDULED', 'INSTALLED', 'CANCELLED'];

const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    CONTACTED: 'bg-blue-100 text-blue-700 border-blue-200',
    SCHEDULED: 'bg-purple-100 text-purple-700 border-purple-200',
    INSTALLED: 'bg-green-100 text-green-700 border-green-200',
    CANCELLED: 'bg-red-100 text-red-700 border-red-200',
};

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            const response = await fetch('/api/admin/orders');
            const data = await response.json();
            setOrders(data.orders || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(orderId: string, newStatus: string) {
        try {
            const response = await fetch('/api/admin/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: orderId, status: newStatus }),
            });

            if (response.ok) {
                setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
                if (selectedOrder?.id === orderId) {
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'ALL' || order.status === filter;
        const matchesSearch = search === '' ||
            order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
            order.firstName.toLowerCase().includes(search.toLowerCase()) ||
            order.lastName.toLowerCase().includes(search.toLowerCase()) ||
            order.email.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
                <p className="text-slate-600">Manage customer broadband orders</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilter('ALL')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'ALL' ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        >
                            All ({orders.length})
                        </button>
                        {statuses.map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                {status} ({orders.filter(o => o.status === status).length})
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading orders...</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No orders found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Order</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Customer</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Package</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Date</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50">
                                        <td className="py-3 px-4">
                                            <span className="font-semibold text-slate-900">{order.orderNumber}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-slate-900">{order.firstName} {order.lastName}</div>
                                            <div className="text-sm text-slate-500">{order.email}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-slate-900">{order.packageName}</div>
                                            <div className="text-sm text-slate-500">£{order.packagePrice?.toFixed(2)}/mo</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-slate-600">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-blue-800 hover:underline text-sm font-medium"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">Order {selectedOrder.orderNumber}</h2>
                                <p className="text-sm text-slate-500">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Status Update */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Update Status</label>
                                <div className="flex gap-2 flex-wrap">
                                    {statuses.map(status => (
                                        <button
                                            key={status}
                                            onClick={() => updateStatus(selectedOrder.id, status)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors flex items-center gap-1 ${
                                                selectedOrder.status === status
                                                    ? statusColors[status]
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            {selectedOrder.status === status && <Check className="w-4 h-4" />}
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                                <h3 className="font-semibold text-slate-900">Customer Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-500">Name:</span>
                                        <span className="ml-2 font-medium">{selectedOrder.firstName} {selectedOrder.lastName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        <a href={`mailto:${selectedOrder.email}`} className="text-blue-800 hover:underline">{selectedOrder.email}</a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <a href={`tel:${selectedOrder.phone}`} className="text-blue-800 hover:underline">{selectedOrder.phone}</a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        <span>{selectedOrder.address}, {selectedOrder.postcode}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Package Info */}
                            <div className="bg-blue-50 rounded-xl p-4">
                                <div className="flex items-center gap-3">
                                    <Package className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{selectedOrder.packageName}</h3>
                                        <p className="text-sm text-slate-600">{selectedOrder.packageSpeed} - £{selectedOrder.packagePrice?.toFixed(2)}/month</p>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {selectedOrder.notes && (
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Customer Notes</h3>
                                    <p className="text-slate-600 bg-slate-50 rounded-lg p-3 text-sm">{selectedOrder.notes}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-slate-200">
                                <a
                                    href={`mailto:${selectedOrder.email}?subject=ABStation Order ${selectedOrder.orderNumber}`}
                                    className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-xl font-semibold text-center transition-colors"
                                >
                                    Send Email
                                </a>
                                <a
                                    href={`tel:${selectedOrder.phone}`}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-center transition-colors"
                                >
                                    Call Customer
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
