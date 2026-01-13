"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ShoppingCart, MessageSquare, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';

interface Admin {
    id: string;
    email: string;
    name: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Skip auth check on login page
    const isLoginPage = pathname === '/admin';

    useEffect(() => {
        if (isLoginPage) {
            setLoading(false);
            return;
        }

        async function checkAuth() {
            try {
                const response = await fetch('/api/admin/auth');
                if (response.ok) {
                    const data = await response.json();
                    setAdmin(data.admin);
                } else {
                    router.push('/admin');
                }
            } catch {
                router.push('/admin');
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [isLoginPage, router]);

    const handleLogout = async () => {
        await fetch('/api/admin/auth', { method: 'DELETE' });
        router.push('/admin');
    };

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
            </div>
        );
    }

    const navItems = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
        { href: '/admin/packages', label: 'Packages', icon: Package },
        { href: '/admin/contacts', label: 'Contacts', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 p-4 z-40 flex items-center justify-between">
                <Image src="/logo.png" alt="ABStation" width={120} height={30} className="h-8 w-auto" />
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-600">
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200`}>
                <div className="p-6">
                    <Image src="/logo.png" alt="ABStation" width={140} height={35} className="h-9 w-auto brightness-0 invert" />
                    <p className="text-slate-400 text-xs mt-2">Admin Panel</p>
                </div>

                <nav className="px-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-blue-800 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-2 mb-2">
                        <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {admin?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{admin?.name}</p>
                            <p className="text-xs text-slate-400 truncate">{admin?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
                {children}
            </main>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
        </div>
    );
}
