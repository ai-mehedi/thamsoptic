import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostcodeChecker from "@/components/PostcodeChecker";
import PackageCard, { Package } from "@/components/PackageCard";
import TrustBadges from "@/components/TrustBadges";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";

const superfastPackages: Package[] = [
    {
        id: 'sf-35',
        name: 'Superfast 35',
        speed: '35Mbps',
        uploadSpeed: '10Mbps',
        price: 24.99,
        description: 'Great for light browsing & email',
        features: [
            'Unlimited downloads',
            'No mid-contract price rises',
            '30-day satisfaction guarantee',
        ],
        contractLength: 18,
        routerIncluded: true,
        isPopular: false,
        badge: 'Best Value',
    },
    {
        id: 'sf-65',
        name: 'Superfast 65',
        speed: '65Mbps',
        uploadSpeed: '18Mbps',
        price: 29.99,
        originalPrice: 34.99,
        description: 'Perfect for streaming & smart home',
        features: [
            'Unlimited downloads',
            'No mid-contract price rises',
            '30-day satisfaction guarantee',
            'Static IP available',
        ],
        contractLength: 18,
        routerIncluded: true,
        isPopular: true,
    },
    {
        id: 'sf-80',
        name: 'Superfast 80',
        speed: '80Mbps',
        uploadSpeed: '20Mbps',
        price: 34.99,
        description: 'Ideal for busy households',
        features: [
            'Unlimited downloads',
            'No mid-contract price rises',
            '30-day satisfaction guarantee',
            'Static IP included',
            'Priority support',
        ],
        contractLength: 18,
        routerIncluded: true,
        isPopular: false,
    },
];

const faqs = [
    {
        question: "What is Superfast Fibre broadband?",
        answer: "Superfast Fibre (FTTC - Fibre to the Cabinet) uses fibre optic cables from the exchange to your local street cabinet, then existing copper lines to your home. This provides speeds of up to 80Mbps, which is ideal for most households."
    },
    {
        question: "What's the difference between Superfast and Full Fibre?",
        answer: "Superfast uses a mix of fibre and copper cables, while Full Fibre is 100% fibre optic all the way to your home. Full Fibre offers faster speeds and more reliable performance, but Superfast is more widely available and more affordable."
    },
    {
        question: "Is Superfast fast enough for my needs?",
        answer: "Superfast 65Mbps is suitable for most households with 3-5 people, supporting multiple HD streams, video calls, and smart home devices simultaneously. For larger households or 4K streaming, consider our Full Fibre options."
    },
    {
        question: "How long does installation take?",
        answer: "If you already have an active phone line, we can usually activate your service within 10-14 working days. If you need a new line installation, this may take slightly longer."
    },
];

export default function SuperfastPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Widely available across the UK
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Superfast Fibre Broadband
                        </h1>
                        <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                            Reliable speeds up to 80Mbps at affordable prices. Perfect for streaming,
                            browsing, and keeping the whole family connected.
                        </p>
                        <div className="flex flex-wrap gap-4 mb-10">
                            <div className="flex items-center gap-2 text-sm">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                From £24.99/month
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Unlimited data
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Free router
                            </div>
                        </div>
                    </div>
                    <PostcodeChecker variant="dark" />
                </div>
            </section>

            <TrustBadges />

            {/* Packages Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Superfast Fibre Packages</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Our most affordable fibre packages with reliable speeds for everyday use.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {superfastPackages.map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <p className="text-slate-600 mb-4">Want even faster speeds?</p>
                    <Link href="/broadband/full-fibre" className="text-blue-600 font-semibold hover:underline">
                        Check Full Fibre availability →
                    </Link>
                </div>
            </section>

            {/* Speed Comparison */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">What can you do with Superfast?</h2>
                    <div className="space-y-4">
                        {[
                            { speed: '35Mbps', activities: 'HD streaming on 2-3 devices, video calls, web browsing' },
                            { speed: '65Mbps', activities: '4K streaming, gaming, smart home devices, WFH' },
                            { speed: '80Mbps', activities: 'Multiple 4K streams, large downloads, busy households' },
                        ].map((tier, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 rounded-xl">
                                <div className="w-24 text-center">
                                    <div className="text-2xl font-bold text-emerald-600">{tier.speed}</div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-700">{tier.activities}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <FAQAccordion items={faqs} title="Superfast Fibre FAQs" />
            </section>

            <Footer />
        </div>
    );
}
