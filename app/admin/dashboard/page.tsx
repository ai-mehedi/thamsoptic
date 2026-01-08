"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Package, MapPin, MessageSquare, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface Stats {
    orders: { total: number; pending: number; };
    packages: number;
    coverage: number;
    contacts: { total: number; new: number; };
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ orders: { total: 0, pending: 0 }, packages: 0, coverage: 0, contacts: { total: 0, new: 0 } });
    const [recentOrders, setRecentOrders] = useState<Array<{ orderNumber: string; firstName: string; lastName: string; packageName: string; status: string; createdAt: string }>>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [ordersRes, packagesRes, coverageRes, contactsRes] = await Promise.all([
                    fetch('/api/admin/orders'),
                    fetch('/api/admin/packages'),
                    fetch('/api/admin/coverage'),
                    fetch('/api/admin/contacts'),
                ]);

                const ordersData = await ordersRes.json();
                const packagesData = await packagesRes.json();
                const coverageData = await coverageRes.json();
                const contactsData = await contactsRes.json();

                setStats({
                    orders: {
                        total: ordersData.orders?.length || 0,
                        pending: ordersData.orders?.filter((o: { status: string }) => o.status === 'PENDING').length || 0,
                    },
                    packages: packagesData.packages?.length || 0,
                    coverage: coverageData.coverageAreas?.length || 0,
                    contacts: {
                        total: contactsData.contacts?.length || 0,
                        new: contactsData.contacts?.filter((c: { status: string }) => c.status === 'NEW').length || 0,
                    },
                });

                setRecentOrders(ordersData.orders?.slice(0, 5) || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        }

        fetchData();
    }, []);

    const statCards = [
        { label: 'Total Orders', value: stats.orders.total, subValue: `${stats.orders.pending} pending`, icon: ShoppingCart, color: 'blue', href: '/admin/orders' },
        { label: 'Packages', value: stats.packages, subValue: 'Active packages', icon: Package, color: 'green', href: '/admin/packages' },
        { label: 'Coverage Areas', value: stats.coverage, subValue: 'Postcodes covered', icon: MapPin, color: 'purple', href: '/admin/coverage' },
        { label: 'Contact Requests', value: stats.contacts.total, subValue: `${stats.contacts.new} new`, icon: MessageSquare, color: 'amber', href: '/admin/contacts' },
    ];

    const statusColors: Record<string, string> = {
        PENDING: 'bg-amber-100 text-amber-700',
        CONTACTED: 'bg-blue-100 text-blue-700',
        SCHEDULED: 'bg-purple-100 text-purple-700',
        INSTALLED: 'bg-green-100 text-green-700',
        CANCELLED: 'bg-red-100 text-red-700',
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600">Welcome to the ABStation admin panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={stat.label} href={stat.href} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                                    <p className="text-sm text-slate-500 mt-1">{stat.subValue}</p>
                                </div>
                                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border border-slate-200">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
                    <Link href="/admin/orders" className="text-sm text-blue-800 hover:underline font-medium">View all</Link>
                </div>
                <div className="divide-y divide-slate-100">
                    {recentOrders.length === 0 ? (
                        <div className="p-6 text-center text-slate-500">No orders yet</div>
                    ) : (
                        recentOrders.map((order) => (
                            <div key={order.orderNumber} className="p-4 flex items-center justify-between hover:bg-slate-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                                        <ShoppingCart className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{order.orderNumber}</p>
                                        <p className="text-sm text-slate-500">{order.firstName} {order.lastName} - {order.packageName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}>
                                        {order.status}
                                    </span>
                                    <span className="text-sm text-slate-400">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/admin/orders?status=PENDING" className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors">
                    <Clock className="w-8 h-8 text-amber-600" />
                    <div>
                        <p className="font-semibold text-amber-900">Pending Orders</p>
                        <p className="text-sm text-amber-700">{stats.orders.pending} orders need attention</p>
                    </div>
                </Link>
                <Link href="/admin/contacts?status=NEW" className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                    <div>
                        <p className="font-semibold text-blue-900">New Contacts</p>
                        <p className="text-sm text-blue-700">{stats.contacts.new} new enquiries</p>
                    </div>
                </Link>
                <Link href="/admin/coverage" className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                    <div>
                        <p className="font-semibold text-green-900">Expand Coverage</p>
                        <p className="text-sm text-green-700">Add new postcode areas</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
