import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostcodeChecker from "@/components/PostcodeChecker";
import TrustBadges from "@/components/TrustBadges";
import FAQAccordion from "@/components/FAQAccordion";

const faqs = [
    {
        question: "How do I check if broadband is available at my address?",
        answer: "Enter your postcode in the search box above. Our system connects directly to Openreach to check what services are available at your specific address. You'll see all available packages based on the technology available to you."
    },
    {
        question: "What's the difference between FTTP and FTTC?",
        answer: "FTTP (Fibre to the Premises) delivers fibre optic cables directly to your home, offering speeds up to 500Mbps or more. FTTC (Fibre to the Cabinet) uses fibre to the street cabinet, then copper to your home, typically offering speeds up to 80Mbps. FTTP is faster and more reliable."
    },
    {
        question: "Why are some packages not available at my address?",
        answer: "Package availability depends on the infrastructure at your location. Some areas only have copper connections, while others have full fibre. We show you all packages available based on the actual technology at your address."
    },
    {
        question: "What is special pricing?",
        answer: "Some addresses qualify for special promotional pricing based on network infrastructure investments in the area. If eligible, you'll automatically see discounted prices when you check your address."
    },
    {
        question: "How long does installation take?",
        answer: "Most installations are completed within 2 weeks of ordering. For Full Fibre connections, an engineer visit is required. For FTTC connections, a self-install option may be available."
    },
];

const packageDetails = [
    {
        name: "Broadband Anywhere Essential",
        speed: "37 Mbit/s",
        technology: "FTTC/Copper",
        price: "From £16.50/mo",
        features: [
            "37 Mbps download speed",
            "Unlimited data usage",
            "Free router included",
            "24/7 UK support",
            "Perfect for light browsing",
        ],
        ideal: "Singles & couples with light internet usage",
    },
    {
        name: "Broadband Anywhere Plus",
        speed: "68.36 Mbit/s",
        technology: "FTTC",
        price: "£34.99/mo",
        features: [
            "68 Mbps download speed",
            "Unlimited data usage",
            "Free Wi-Fi router",
            "24/7 UK support",
            "Great for streaming & gaming",
        ],
        ideal: "Families with multiple devices",
    },
    {
        name: "Broadband Anywhere Ultra",
        speed: "500 Mbit/s",
        technology: "FTTP",
        price: "From £30.00/mo",
        features: [
            "500 Mbps download speed",
            "Unlimited data usage",
            "Premium Wi-Fi 6 router",
            "Static IP available",
            "Priority support",
        ],
        ideal: "Power users, gamers & home offices",
    },
];

export default function PackagesPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Powered by Openreach
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Check Your Broadband Packages
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            Enter your postcode to see real-time availability and pricing for your address.
                            We check directly with Openreach to show you exactly what&apos;s available.
                        </p>
                    </div>
                    <PostcodeChecker variant="dark" />
                </div>
            </section>

            <TrustBadges />

            {/* All Packages Overview */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Broadband Packages</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Check your postcode above to see which packages are available at your address
                        and get personalized pricing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packageDetails.map((pkg, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
                                index === 2 ? 'border-blue-500' : 'border-transparent'
                            }`}
                        >
                            {index === 2 && (
                                <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                        {pkg.technology}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                                <div className="text-3xl font-bold text-blue-600 mb-1">{pkg.speed}</div>
                                <div className="text-slate-500 text-sm mb-4">{pkg.price}</div>

                                <ul className="space-y-3 mb-6">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4 border-t border-slate-100">
                                    <p className="text-xs text-slate-500">
                                        <strong>Ideal for:</strong> {pkg.ideal}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Enter Postcode",
                                desc: "Type your postcode to search for addresses in your area"
                            },
                            {
                                step: "2",
                                title: "Select Address",
                                desc: "Choose your exact address from the list of matches"
                            },
                            {
                                step: "3",
                                title: "View Packages",
                                desc: "See all available packages based on your line technology"
                            },
                            {
                                step: "4",
                                title: "Order Online",
                                desc: "Select your package and complete your order"
                            },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Explained */}
            <section className="py-20 px-4 bg-slate-100">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Understanding Broadband Technology</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2">FTTP (Full Fibre)</h3>
                            <p className="text-slate-600 text-sm mb-3">
                                Fibre optic cable runs directly to your home. Offers the fastest speeds up to 1Gbps
                                with symmetric upload/download.
                            </p>
                            <div className="text-xs text-slate-500">
                                <strong>Speeds:</strong> 100Mbps - 1Gbps
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2">FTTC (Part Fibre)</h3>
                            <p className="text-slate-600 text-sm mb-3">
                                Fibre to the street cabinet, then copper to your home. Good speeds up to 80Mbps,
                                widely available across the UK.
                            </p>
                            <div className="text-xs text-slate-500">
                                <strong>Speeds:</strong> 35Mbps - 80Mbps
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2">SOGEA (Voice over Fibre)</h3>
                            <p className="text-slate-600 text-sm mb-3">
                                Broadband without a phone line. Uses the same FTTC technology but doesn&apos;t
                                require an active landline service.
                            </p>
                            <div className="text-xs text-slate-500">
                                <strong>Speeds:</strong> 35Mbps - 80Mbps
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <FAQAccordion items={faqs} title="Frequently Asked Questions" />
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-slate-900 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get connected?</h2>
                    <p className="text-slate-300 mb-8 text-lg">
                        Check your address now and see what packages are available to you.
                    </p>
                    <PostcodeChecker variant="dark" showResults={false} />
                </div>
            </section>

            <Footer />
        </div>
    );
}
