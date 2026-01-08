"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
    ChevronDown,
    Menu,
    X,
    Wifi,
    HeadphonesIcon,
    Phone,
    HelpCircle,
    Activity,
    MessageSquare,
    Zap,
    Home,
    Gauge,
    Gift
} from 'lucide-react';

const menuItems = {
    broadband: {
        title: "Broadband",
        icon: Wifi,
        items: [
            { name: "Full Fibre Broadband", desc: "Ultrafast speeds up to 900Mbps", href: "/broadband/full-fibre", badge: "Popular", icon: Zap },
            { name: "Superfast Fibre", desc: "Reliable speeds up to 80Mbps", href: "/broadband/superfast", badge: null, icon: Gauge },
            { name: "Broadband & Phone", desc: "Bundle and save with digital voice", href: "/broadband/bundles", badge: null, icon: Phone },
            { name: "Compare All Packages", desc: "Find the perfect plan for you", href: "/broadband/compare", badge: null, icon: Activity },
        ]
    },
    residential: {
        title: "Home Fibre",
        icon: Home,
        items: [
            { name: "Home Starter", desc: "Perfect for everyday browsing", href: "/broadband/home-starter", badge: null, icon: Wifi },
            { name: "Home Fast", desc: "Stream & work from home", href: "/broadband/home-fast", badge: "Popular", icon: Zap },
            { name: "Home Ultrafast", desc: "Ultimate speed for power users", href: "/broadband/home-ultrafast", badge: null, icon: Gauge },
            { name: "New Customer Offers", desc: "Exclusive deals for new joiners", href: "/broadband/offers", badge: "Save", icon: Gift },
        ]
    },
    support: {
        title: "Support",
        icon: HeadphonesIcon,
        items: [
            { name: "Help Centre", desc: "FAQs & guides", href: "/support", badge: null, icon: HelpCircle },
            { name: "Service Status", desc: "Check network status", href: "/support/status", badge: null, icon: Activity },
            { name: "Contact Us", desc: "Get in touch", href: "/contact", badge: null, icon: MessageSquare },
        ]
    }
};

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
                {/* Top Bar */}
                <div className="bg-blue-800 text-white text-xs py-2 px-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                All systems operational
                            </span>
                            <a href="tel:+4402081236644" className="hidden sm:inline hover:text-blue-200 transition-colors">Sales: <strong>+44 (0) 208 123 6644</strong></a>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="mailto:sales@abstation.net" className="hover:text-blue-200 transition-colors">sales@abstation.net</a>
                            <Link href="/support" className="hover:text-blue-200 transition-colors">Help</Link>
                            <Link href="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>

                {/* Main Nav */}
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="ABStation"
                                width={180}
                                height={40}
                                className="h-10 w-auto"
                                priority
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-1">
                            {Object.entries(menuItems).map(([key, menu]) => (
                                <div
                                    key={key}
                                    className="relative"
                                    onMouseEnter={() => setActiveMenu(key)}
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    <button className={`px-4 py-5 text-sm font-medium transition-colors flex items-center gap-1 ${activeMenu === key ? 'text-blue-800' : 'text-slate-700 hover:text-blue-800'}`}>
                                        {menu.title}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === key ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown */}
                                    {activeMenu === key && (
                                        <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {menu.items.map((item, i) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                    <Link
                                                        key={i}
                                                        href={item.href}
                                                        className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
                                                    >
                                                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-800 group-hover:bg-blue-100 transition-colors mt-0.5">
                                                            <ItemIcon className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-slate-900 text-sm">{item.name}</span>
                                                                {item.badge && (
                                                                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full uppercase">{item.badge}</span>
                                                                )}
                                                            </div>
                                                            <span className="text-xs text-slate-500">{item.desc}</span>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link href="/broadband/coverage" className="px-4 py-5 text-sm font-medium text-slate-700 hover:text-blue-800 transition-colors">
                                Coverage
                            </Link>
                            <Link href="/about" className="px-4 py-5 text-sm font-medium text-slate-700 hover:text-blue-800 transition-colors">
                                About Us
                            </Link>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            <Link href="/broadband/compare" className="bg-blue-800 hover:bg-blue-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md">
                                Check Availability
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 text-slate-700"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-200">
                        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
                            {Object.entries(menuItems).map(([key, menu]) => (
                                <div key={key} className="space-y-2">
                                    <div className="font-semibold text-slate-900 text-sm uppercase tracking-wider">{menu.title}</div>
                                    <div className="space-y-1 pl-2">
                                        {menu.items.map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.href}
                                                className="block py-2 text-slate-600 hover:text-blue-800 transition-colors text-sm"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-slate-100 space-y-2">
                                <Link href="/broadband/coverage" className="block py-2 text-slate-700 font-medium">Coverage</Link>
                                <Link href="/about" className="block py-2 text-slate-700 font-medium">About Us</Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
