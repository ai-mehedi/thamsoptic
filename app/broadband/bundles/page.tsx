import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostcodeChecker from "@/components/PostcodeChecker";
import TrustBadges from "@/components/TrustBadges";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";

const bundles = [
    {
        id: 'bundle-65-phone',
        name: 'Superfast 65 + Phone',
        speed: '65Mbps',
        price: 34.99,
        originalPrice: 42.99,
        callPlan: 'Pay As You Go',
        features: [
            '65Mbps average download speed',
            'Unlimited broadband',
            'Digital Voice included',
            'Keep your existing number',
            'Free router included',
        ],
        isPopular: false,
    },
    {
        id: 'bundle-150-anytime',
        name: 'Full Fibre 150 + Anytime Calls',
        speed: '150Mbps',
        price: 44.99,
        originalPrice: 54.99,
        callPlan: 'Anytime Calls to UK Landlines & Mobiles',
        features: [
            '150Mbps symmetric speeds',
            'Unlimited broadband',
            'Unlimited UK calls included',
            'Keep your existing number',
            'Premium router included',
            'Static IP available',
        ],
        isPopular: true,
    },
    {
        id: 'bundle-500-anytime',
        name: 'Full Fibre 500 + Anytime Calls',
        speed: '500Mbps',
        price: 54.99,
        originalPrice: 69.99,
        callPlan: 'Anytime Calls + International',
        features: [
            '500Mbps symmetric speeds',
            'Unlimited broadband',
            'Unlimited UK & international calls',
            'Keep your existing number',
            'Wi-Fi 6E router included',
            'Static IP included',
            'Priority support',
        ],
        isPopular: false,
        badge: 'Best Bundle',
    },
];

const faqs = [
    {
        question: "What is Digital Voice?",
        answer: "Digital Voice is our modern phone service that works over your broadband connection. It offers crystal-clear call quality, works with your existing handsets, and includes features like voicemail-to-email, call blocking, and an app to make calls from your mobile using your home number."
    },
    {
        question: "Can I keep my existing phone number?",
        answer: "Yes, we can port your existing landline number to our Digital Voice service. The process is handled during your setup and there's no interruption to your service."
    },
    {
        question: "What happens to my phone if the internet goes down?",
        answer: "As Digital Voice relies on your broadband connection, you'll need an internet connection to make calls. However, our network has 99.9% uptime. For emergencies, you can use the ABStation app on your mobile to make calls using your home number."
    },
    {
        question: "What's included in Anytime Calls?",
        answer: "Anytime Calls includes unlimited calls to UK landlines and mobiles, any time of day. Our international bundle adds unlimited calls to 50+ international destinations including USA, Canada, Australia, and most of Europe."
    },
];

export default function BundlesPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Save up to £180/year
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Broadband & Phone Bundles
                        </h1>
                        <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                            Combine ultrafast broadband with our Digital Voice phone service.
                            Crystal-clear calls, modern features, and one simple bill.
                        </p>
                        <div className="flex flex-wrap gap-4 mb-10">
                            <div className="flex items-center gap-2 text-sm">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Keep your number
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                HD voice quality
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Free calls app
                            </div>
                        </div>
                    </div>
                    <PostcodeChecker variant="dark" />
                </div>
            </section>

            <TrustBadges />

            {/* Bundles Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Best Bundle Deals</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Get more value by combining broadband and phone. All bundles include Digital Voice with modern calling features.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {bundles.map((bundle, i) => (
                        <div key={bundle.id} className={`relative bg-white rounded-2xl border-2 overflow-hidden ${
                            bundle.isPopular
                                ? 'border-purple-600 shadow-xl shadow-purple-100 scale-[1.02]'
                                : 'border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all'
                        }`}>
                            {bundle.isPopular && (
                                <div className="absolute top-0 left-0 right-0 bg-purple-600 text-white text-center py-2 text-xs font-bold uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            {bundle.badge && !bundle.isPopular && (
                                <div className="absolute top-4 right-4">
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                        {bundle.badge}
                                    </span>
                                </div>
                            )}

                            <div className={`p-8 ${bundle.isPopular ? 'pt-12' : ''}`}>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{bundle.name}</h3>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-4xl font-extrabold text-slate-900">{bundle.speed}</span>
                                </div>
                                <div className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                                    {bundle.callPlan}
                                </div>

                                <div className="border-t border-slate-100 pt-6 mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-slate-900">£{bundle.price}</span>
                                        <span className="text-slate-500">/month</span>
                                    </div>
                                    {bundle.originalPrice && (
                                        <p className="text-sm text-slate-500 mt-1">
                                            <span className="line-through">£{bundle.originalPrice}</span>
                                            <span className="text-green-600 font-semibold ml-2">
                                                Save £{((bundle.originalPrice - bundle.price) * 24).toFixed(0)} over 24 months
                                            </span>
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {bundle.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm">
                                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-slate-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={`/checkout?package=${bundle.id}`}
                                    className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${
                                        bundle.isPopular
                                            ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/20'
                                            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                    }`}
                                >
                                    Choose Bundle
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <p className="text-slate-600 mb-2">Just need broadband?</p>
                    <Link href="/broadband/compare" className="text-purple-600 font-semibold hover:underline">
                        View broadband-only packages →
                    </Link>
                </div>
            </section>

            {/* Digital Voice Features */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center">Digital Voice Features</h2>
                    <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                        More than just a phone line. Modern calling features included with every bundle.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: "📱",
                                title: "ABStation App",
                                desc: "Make and receive calls on your mobile using your home number"
                            },
                            {
                                icon: "📧",
                                title: "Voicemail to Email",
                                desc: "Get voicemail messages delivered straight to your inbox"
                            },
                            {
                                icon: "🚫",
                                title: "Call Blocking",
                                desc: "Block nuisance calls and protect yourself from scammers"
                            },
                            {
                                icon: "📞",
                                title: "Call Forwarding",
                                desc: "Forward calls to your mobile when you're away from home"
                            },
                        ].map((feature, i) => (
                            <div key={i} className="text-center p-6 bg-slate-50 rounded-2xl">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-slate-600 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <FAQAccordion items={faqs} title="Bundle FAQs" />
            </section>

            <Footer />
        </div>
    );
}
