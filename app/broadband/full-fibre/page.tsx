import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostcodeChecker from "@/components/PostcodeChecker";
import PackageCard, { Package } from "@/components/PackageCard";
import TrustBadges from "@/components/TrustBadges";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import { db } from "@/lib/db";
import { packages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function getPackages(): Promise<Package[]> {
    const allPackages = await db.query.packages.findMany({
        where: eq(packages.isActive, true),
        orderBy: (packages, { asc }) => [asc(packages.sortOrder)],
    });

    return allPackages.map((pkg, index) => {
        // Extract speed number for upload speed (symmetric for full fibre)
        const speedMatch = pkg.speed.match(/(\d+)/);
        const speedNum = speedMatch ? speedMatch[1] : pkg.speed;

        return {
            id: pkg.id,
            name: pkg.name,
            speed: pkg.speed.replace(' ', ''),
            uploadSpeed: `${speedNum}Mbps`,
            price: pkg.price,
            description: pkg.description,
            features: JSON.parse(pkg.features),
            isPopular: pkg.isPopular || false,
            contractLength: 24,
            routerIncluded: true,
            badge: index === allPackages.length - 1 ? 'Fastest' : undefined,
        };
    });
}

const faqs = [
    {
        question: "What is Full Fibre broadband?",
        answer: "Full Fibre (also known as FTTP - Fibre to the Premises) delivers fibre optic cables directly to your home, providing the fastest and most reliable broadband speeds available. Unlike part-fibre connections, there's no copper cable involved, meaning you get consistently fast speeds even during peak times."
    },
    {
        question: "How do I know if Full Fibre is available at my address?",
        answer: "Simply enter your postcode in our availability checker above. We'll instantly show you which packages are available at your specific address. Full Fibre coverage is expanding rapidly across the UK, and we're adding new areas every week."
    },
    {
        question: "What equipment do I need?",
        answer: "We provide everything you need including a high-performance Wi-Fi router. Our engineers will install an Optical Network Terminal (ONT) in your home during the installation visit. There's no need to purchase any additional equipment."
    },
    {
        question: "Is there a setup fee?",
        answer: "No, installation is completely free for all our Full Fibre packages. A qualified engineer will visit your property to install the necessary equipment and ensure everything is working perfectly."
    },
    {
        question: "Can I keep my existing phone number?",
        answer: "Yes, if you're switching from another provider, we can port your existing landline number to our Digital Voice service. This process is seamless and you won't experience any downtime."
    },
];

export default async function FullFibrePage() {
    const fullFibrePackages = await getPackages();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Available in your area
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Full Fibre Broadband
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            Experience ultrafast speeds up to 900Mbps with our Full Fibre packages.
                            Symmetric upload and download speeds, perfect for streaming, gaming, and working from home.
                        </p>
                        <div className="flex flex-wrap gap-4 mb-10">
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
                                Free installation
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                No price rises
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Full Fibre Package</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        All packages include unlimited data, free installation, and our price lock guarantee.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {fullFibrePackages.map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="/broadband/compare" className="text-blue-600 font-semibold hover:underline">
                        Compare all packages →
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Full Fibre?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: "⚡",
                                title: "Ultrafast Speeds",
                                desc: "Up to 900Mbps download and upload speeds for seamless streaming and gaming"
                            },
                            {
                                icon: "📶",
                                title: "Reliable Connection",
                                desc: "Fibre direct to your home means no slowdowns during peak times"
                            },
                            {
                                icon: "🏠",
                                title: "Work From Home",
                                desc: "Perfect for video calls, large file uploads, and multiple devices"
                            },
                            {
                                icon: "🔒",
                                title: "Future Proof",
                                desc: "Full Fibre infrastructure ready for tomorrow's technology needs"
                            },
                        ].map((feature, i) => (
                            <div key={i} className="text-center p-6">
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
                <FAQAccordion items={faqs} title="Full Fibre FAQs" />
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-slate-900 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to upgrade to Full Fibre?</h2>
                    <p className="text-slate-300 mb-8 text-lg">
                        Check availability at your address and get connected in as little as 2 weeks.
                    </p>
                    <PostcodeChecker variant="dark" showResults={false} />
                </div>
            </section>

            <Footer />
        </div>
    );
}
