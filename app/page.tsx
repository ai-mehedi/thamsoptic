import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostcodeChecker from "@/components/PostcodeChecker";
import TrustBadges from "@/components/TrustBadges";
import { db } from "@/lib/db";
import { packages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
    Zap,
    Wifi,
    Phone,
    MessageSquare,
    Check,
    Star,
    Gauge,
    Home,
    Gift,
    Shield,
    Clock,
    Network,
    Cable,
    PhoneCall,
    FileCheck,
    Wrench,
    Rocket,
} from "lucide-react";

interface Package {
    id: string;
    name: string;
    speed: string;
    price: number;
    description: string;
    features: string[];
    isPopular: boolean;
}

async function getPackages(): Promise<Package[]> {
    const allPackages = await db.query.packages.findMany({
        where: eq(packages.isActive, true),
        orderBy: (packages, { asc }) => [asc(packages.sortOrder)],
    });

    return allPackages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        speed: pkg.speed,
        price: pkg.price,
        description: pkg.description,
        features: JSON.parse(pkg.features),
        isPopular: pkg.isPopular || false,
    }));
}

export default async function HomePage() {
    const pkgs = await getPackages();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-24 text-center px-4 overflow-hidden min-h-[550px] flex items-center">
                {/* Background Image */}
                <Image
                    src="/steptodown.com416334.jpg"
                    alt="Fibre optic cables glowing"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-slate-900/50 to-blue-900/70" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
                        Ultrafast Full Fibre
                    </h1>
                    <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-6">
                        Up To 10 Gig Speed
                    </p>
                    <p className="text-lg text-blue-100 max-w-xl mx-auto mb-10">
                        Own backbone network. Fiber VoIP included. No BT line needed.
                    </p>

                    {/* Postcode Checker - Prominent */}
                    <div className="max-w-2xl mx-auto">
                        <p className="text-white text-sm font-medium mb-3">Check availability at your address</p>
                        <PostcodeChecker variant="dark" />
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-8 px-4 max-w-7xl mx-auto mt-8 relative z-0">
                <TrustBadges layout="horizontal" />
            </section>

            {/* Categories Grid */}
            <section className="pb-20 px-4 max-w-7xl mx-auto pt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { name: "Full Fibre", href: "/broadband/full-fibre", icon: Zap },
                        { name: "Superfast", href: "/broadband/superfast", icon: Gauge },
                        { name: "Home Fibre", href: "/broadband/home-fast", icon: Home },
                        { name: "Bundles", href: "/broadband/bundles", icon: Phone },
                        { name: "Offers", href: "/broadband/offers", icon: Gift },
                        { name: "Support", href: "/support", icon: MessageSquare },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={i}
                                href={item.href}
                                className="aspect-square bg-white rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-600 hover:text-blue-800 hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100"
                            >
                                <Icon className="w-8 h-8" />
                                <span className="text-xs font-bold tracking-wide uppercase">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start border-t border-slate-100">
                <div className="md:w-1/3 space-y-6">
                    <h2 className="text-4xl font-bold leading-tight text-slate-900">Trusted by homes across the UK</h2>
                    <p className="text-slate-600 text-base leading-relaxed">
                        ABStation provides reliable, high-speed fibre broadband to homes and businesses. Part of Thames Network Company Limited, we&apos;re committed to honest pricing and exceptional UK-based support.
                    </p>
                    <Link href="/about" className="flex items-center gap-2 text-blue-800 font-bold group w-fit">
                        <span>Learn more about us</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                    {[
                        { num: "50K+", label: "Happy Customers" },
                        { num: "10+", label: "Years of Service" },
                        { num: "10", sub: "Gig", label: "Maximum Speed" }
                    ].map((stat, i) => (
                        <div key={i} className="pl-6 border-l-4 border-blue-100 hover:border-blue-800 transition-colors">
                            <div className="text-5xl font-bold text-blue-800 mb-2 flex items-baseline gap-1">
                                {stat.num}
                                {stat.sub && <span className="text-2xl text-blue-400">{stat.sub}</span>}
                            </div>
                            <p className="text-slate-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Blue Bar */}
            <div className="bg-blue-900 text-white py-6 px-4">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-semibold tracking-wide uppercase opacity-90">
                    {["Own Backbone Network", "Fiber VoIP Included", "No BT Line", "No Commitment", "Up to 10 Gig"].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            {feature}
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Why choose ABStation for your broadband?</h2>
                        <p className="text-slate-600">Join thousands of happy customers who trust us for their home connectivity.</p>
                    </div>
                    <Link href="/broadband/compare" className="border border-slate-300 bg-white px-6 py-3 rounded-full text-sm font-bold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
                        Compare All Packages
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Own Optic Backbone", desc: "We own and operate our own fibre optic backbone network - not reselling BT or Openreach infrastructure.", icon: Network },
                        { title: "Fiber VoIP Included", desc: "Crystal-clear VoIP phone service included free. Keep your existing number when you switch.", icon: PhoneCall },
                        { title: "No BT Line Required", desc: "Completely separate from BT infrastructure. True independence with our own network.", icon: Cable },
                        { title: "No Commitment", desc: "Flexible contracts with no long-term commitment required. Stay because you want to, not because you have to.", icon: FileCheck }
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} className="p-8 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 bg-blue-50 text-blue-800 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-slate-900">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Second row of features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                    {[
                        { title: "Up to 10 Gig Speed", desc: "Blazing fast speeds up to 10 Gbps for power users, businesses, and future-proof connectivity.", icon: Rocket },
                        { title: "Custom Network Build", desc: "Bespoke network solutions for businesses. We can build infrastructure to meet your specific needs.", icon: Wrench },
                        { title: "UK-Based Support", desc: "Our friendly team is based right here in the UK. Call us 24/7 for technical support.", icon: Phone },
                        { title: "WiFi 6 Router Included", desc: "Latest generation router included free. Whole-home coverage with mesh extenders available.", icon: Wifi }
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} className="p-8 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 bg-blue-50 text-blue-800 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-slate-900">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-4 bg-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Getting started is easy</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Switch to ABStation in three simple steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Check availability", desc: "Enter your postcode to see which packages are available at your address.", icon: Home },
                            { step: "2", title: "Choose your plan", desc: "Select the speed that's right for you. No hidden fees, no surprises.", icon: Check },
                            { step: "3", title: "Get connected", desc: "We'll arrange installation at a time that suits you. Start enjoying ultrafast broadband.", icon: Zap }
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-white rounded-2xl p-8 relative">
                                    <div className="absolute -top-4 left-8 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        {item.step}
                                    </div>
                                    <div className="w-12 h-12 bg-blue-50 text-blue-800 rounded-xl mb-6 flex items-center justify-center mt-4">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-3 text-slate-900">{item.title}</h3>
                                    <p className="text-slate-600">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Pricing Section - Dynamic from Database */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Simple, honest pricing</h2>
                    <p className="text-slate-500 text-lg">No hidden fees. No mid-contract price rises. Just great fibre broadband.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pkgs.slice(0, 3).map((pkg, i) => {
                        const priceStr = pkg.price.toFixed(2);
                        const [pricePound, pricePence] = priceStr.split('.');
                        return (
                            <div key={pkg.id} className={`p-10 rounded-3xl border transition-all duration-300 ${pkg.isPopular ? 'border-blue-800 shadow-2xl shadow-blue-100 ring-1 ring-blue-800 relative bg-white scale-105 z-10' : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-200'}`}>
                                {pkg.isPopular && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-800 text-white text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-md">Most Popular</span>}
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{pkg.name}</div>
                                <div className="flex items-start mb-6">
                                    <span className="text-3xl font-bold tracking-tight mt-2">£</span>
                                    <span className="text-7xl font-extrabold tracking-tighter text-slate-900">{pricePound}</span>
                                    <div className="flex flex-col justify-end ml-1 mb-2">
                                        <span className="text-2xl font-bold text-slate-900">.{pricePence}</span>
                                        <span className="text-sm text-slate-500">/month</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">{pkg.speed} average speed</p>
                                <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-8">{pkg.description}</p>
                                <Link href="/broadband/compare" className={`w-full py-4 rounded-xl font-bold mb-8 transition-all active:scale-95 block text-center ${pkg.isPopular ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-lg shadow-blue-900/20' : 'bg-white border-2 border-slate-200 text-slate-900 hover:border-slate-900'}`}>
                                    Get Started
                                </Link>
                                <ul className="space-y-4 text-sm text-slate-600 font-medium">
                                    {pkg.features.slice(0, 5).map((feature, j) => (
                                        <li key={j} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
                <p className="text-center text-sm text-slate-500 mt-8">
                    All prices include VAT. 24-month contract. £0 setup fee. <Link href="/broadband/compare" className="text-blue-800 hover:underline">See all packages →</Link>
                </p>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 bg-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Star className="w-8 h-8 text-green-500" fill="currentColor" />
                            <span className="text-2xl font-bold">Customer Reviews</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-8 h-8 text-green-500" fill="currentColor" />
                            ))}
                        </div>
                        <p className="text-slate-600">Rated <strong>4.8 out of 5</strong> based on customer reviews</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Sarah M.",
                                location: "Manchester",
                                rating: 5,
                                title: "Best broadband I've ever had!",
                                review: "Switched and couldn't be happier. The speed is incredible and when I had a question, the support team answered within minutes. Highly recommend!"
                            },
                            {
                                name: "James P.",
                                location: "London",
                                rating: 5,
                                title: "Finally, honest pricing",
                                review: "So refreshing to have a provider that doesn't increase prices mid-contract. The installation was quick and professional. Been with them for a year now."
                            },
                            {
                                name: "Emma T.",
                                location: "Bristol",
                                rating: 5,
                                title: "Brilliant customer service",
                                review: "Had an issue with my router and they sent a replacement next day. The UK-based support team actually knew what they were talking about!"
                            }
                        ].map((review, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                                <div className="flex items-center gap-1 mb-3">
                                    {Array.from({ length: review.rating }).map((_, j) => (
                                        <Star key={j} className="w-5 h-5 text-green-500" fill="currentColor" />
                                    ))}
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">{review.title}</h4>
                                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{review.review}</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900 text-sm">{review.name}</div>
                                        <div className="text-xs text-slate-500">{review.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coverage CTA */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="flex-1 relative z-10">
                        <div className="inline-block bg-blue-800/20 text-blue-400 text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                            Expanding Network
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Full fibre coverage growing every day
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            We&apos;re bringing true fibre optic broadband to more areas across the UK. Check if your area is covered or register your interest.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/broadband/coverage" className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                                Check Coverage
                            </Link>
                            <Link href="/contact" className="border border-slate-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                                Register Interest
                            </Link>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="grid grid-cols-2 gap-4 text-white">
                            {[
                                { value: "500+", label: "Areas Covered" },
                                { value: "10", label: "Gig Speeds" },
                                { value: "24/7", label: "UK Support" },
                                { value: "99.9%", label: "Uptime" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
                                    <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                                    <div className="text-sm text-slate-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 bg-blue-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                                <Phone className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="text-blue-200 text-sm">Call us</div>
                                <a href="tel:+4402081236644" className="font-bold text-xl hover:text-blue-200 transition-colors">+44 (0) 208 123 6644</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                                <MessageSquare className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="text-blue-200 text-sm">Email us</div>
                                <a href="mailto:sales@abstation.net" className="font-bold text-xl hover:text-blue-200 transition-colors">sales@abstation.net</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                                <Clock className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="text-blue-200 text-sm">Support hours</div>
                                <div className="font-bold text-xl">24/7 Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
