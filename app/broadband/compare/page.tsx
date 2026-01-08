"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostcodeChecker from "@/components/PostcodeChecker";
import TrustBadges from "@/components/TrustBadges";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Zap, Shield, Phone, Wifi, Check, Loader2 } from "lucide-react";

interface Package {
    id: string;
    name: string;
    speed: string;
    price: number;
    description: string;
    features: string[];
    isPopular: boolean;
}

export default function ComparePage() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<'price' | 'speed'>('price');

    useEffect(() => {
        async function fetchPackages() {
            try {
                const response = await fetch('/api/packages');
                const data = await response.json();
                setPackages(data.packages || []);
            } catch (error) {
                console.error('Error fetching packages:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPackages();
    }, []);

    const sortedPackages = [...packages].sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        // Extract number from speed string (e.g., "500 Mbps" -> 500)
        const speedA = parseInt(a.speed) || 0;
        const speedB = parseInt(b.speed) || 0;
        return speedB - speedA;
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Compare All Packages</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Find the perfect broadband package for your needs. All packages include unlimited data and free installation.
                    </p>
                    <PostcodeChecker variant="dark" showResults={false} />
                </div>
            </section>

            <TrustBadges />

            {/* Sort Controls */}
            <section className="py-8 px-4 max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
                    <div className="text-slate-600">
                        Showing <span className="font-bold text-slate-900">{packages.length}</span> packages
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 outline-none"
                        >
                            <option value="price">Price (low to high)</option>
                            <option value="speed">Speed (high to low)</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="py-8 px-4 max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-800" />
                        <span className="ml-3 text-slate-600">Loading packages...</span>
                    </div>
                ) : packages.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                        No packages available at the moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedPackages.map((pkg) => {
                            const priceStr = pkg.price.toFixed(2);
                            const [pricePound, pricePence] = priceStr.split('.');
                            return (
                                <div
                                    key={pkg.id}
                                    className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                                        pkg.isPopular
                                            ? 'border-blue-800 shadow-xl shadow-blue-100 relative'
                                            : 'border-slate-200 hover:border-blue-300 hover:shadow-lg'
                                    }`}
                                >
                                    {pkg.isPopular && (
                                        <div className="bg-blue-800 text-white text-center py-2 text-sm font-bold uppercase tracking-wider">
                                            Most Popular
                                        </div>
                                    )}
                                    <div className="p-8">
                                        <div className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-2">{pkg.name}</div>
                                        <div className="text-3xl font-bold text-slate-900 mb-2">{pkg.speed}</div>
                                        <div className="flex items-baseline mb-6">
                                            <span className="text-2xl font-bold">£</span>
                                            <span className="text-5xl font-extrabold text-slate-900">{pricePound}</span>
                                            <span className="text-xl font-bold text-slate-900">.{pricePence}</span>
                                            <span className="text-slate-500 ml-1">/month</span>
                                        </div>
                                        <p className="text-slate-600 mb-6">{pkg.description}</p>

                                        <Link
                                            href={`/checkout?packageId=${pkg.id}`}
                                            className={`w-full py-4 rounded-xl font-bold transition-all block text-center mb-6 ${
                                                pkg.isPopular
                                                    ? 'bg-blue-800 text-white hover:bg-blue-900'
                                                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                            }`}
                                        >
                                            Get Started
                                        </Link>

                                        <ul className="space-y-3">
                                            {pkg.features.map((feature, j) => (
                                                <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center">Included With Every Package</h2>
                    <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                        All ABStation broadband packages come with these great features as standard
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Zap, title: "Unlimited Data", desc: "No caps, no throttling, no worries" },
                            { icon: Wifi, title: "Free Router", desc: "WiFi 6 router included with every package" },
                            { icon: Phone, title: "UK Support", desc: "24/7 UK-based customer service" },
                            { icon: Shield, title: "Price Lock", desc: "No mid-contract price rises guaranteed" },
                        ].map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div key={i} className="text-center p-6 bg-slate-50 rounded-2xl">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-7 h-7 text-blue-800" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-slate-600 text-sm">{feature.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 bg-blue-800 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to switch?</h2>
                    <p className="text-blue-100 mb-8 text-lg">
                        Enter your postcode to see exact speeds available at your address.
                    </p>
                    <PostcodeChecker variant="dark" showResults={false} />
                </div>
            </section>

            <Footer />
        </div>
    );
}
