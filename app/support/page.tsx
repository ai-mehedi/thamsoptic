import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";

const categories = [
    { icon: "🌐", title: "Broadband", desc: "Speed issues, connection problems, router setup", href: "#broadband" },
    { icon: "📞", title: "Phone & VoIP", desc: "Digital Voice, call quality, voicemail", href: "#phone" },
    { icon: "💳", title: "Billing", desc: "Payments, invoices, account changes", href: "#billing" },
    { icon: "📦", title: "Orders", desc: "Track orders, installation, delivery", href: "#orders" },
    { icon: "🔧", title: "Technical", desc: "Equipment, settings, troubleshooting", href: "#technical" },
    { icon: "🏠", title: "Moving Home", desc: "Transfer your service to a new address", href: "#moving" },
];

const generalFAQs = [
    {
        question: "What is ABStation?",
        answer: "ABStation (part of Thames Network Company Limited) is an internet service provider offering high-speed broadband and fiber optic internet services to customers in the United Kingdom. We own and operate our own fibre optic backbone network, providing speeds up to 10 Gbps."
    },
    {
        question: "How can I subscribe to ABStation internet services?",
        answer: "To subscribe to ABStation internet services, you can visit our website and use the postcode checker to see available packages in your area, or contact our customer support team at +44 (0) 208 123 6644. They will guide you through the subscription process and help you choose the best plan for your needs."
    },
    {
        question: "How fast is ABStation internet?",
        answer: "ABStation offers high-speed internet services, including fiber optic connections with speeds up to 10 Gbps. The actual speed you experience will depend on the plan you choose, the technology available in your area, and other factors such as network congestion and the capability of your devices."
    },
    {
        question: "What types of internet plans does ABStation offer?",
        answer: "ABStation offers a range of internet plans to suit different requirements. We provide options for both residential and business customers, including Essential Fibre (150 Mbps), Superfast Fibre (500 Mbps), Ultrafast Fibre (1 Gbps), and Business 10G (10 Gbps). All plans include Fiber VoIP, no BT line required, and flexible contracts."
    },
    {
        question: "Can I use my own modem and router with ABStation?",
        answer: "Yes, in most cases, you can use your own modem and router with ABStation services. However, it is important to ensure that your equipment is compatible with our network. Our customer support team can provide you with the necessary information and recommendations. We also include a free WiFi 6 router with all packages."
    },
    {
        question: "Does ABStation have a fair usage policy?",
        answer: "ABStation offers truly unlimited data with no fair usage policy restrictions. There are no catches, no caps and no hidden penalties, so your home or business can make full use of ultrafast download and upload speeds without worrying about throttling."
    },
    {
        question: "Do I need a BT phone line?",
        answer: "No! ABStation operates on its own independent fibre optic backbone network, completely separate from BT/Openreach infrastructure. You don't need a BT line - our service includes Fiber VoIP for your phone needs."
    },
];

const technicalFAQs = [
    {
        question: "How do I check if there's an outage in my area?",
        answer: "Visit our Service Status page to check for any known issues in your area. You can also sign up for outage notifications via email or SMS. Our Network Operations Centre monitors the network 24/7 and often resolves issues before customers are affected."
    },
    {
        question: "How do I reset my router?",
        answer: "To reset your router: 1) Locate the reset button (usually a small hole on the back). 2) Use a paperclip to press and hold the button for 10 seconds. 3) Wait 2-3 minutes for the router to restart. 4) Reconnect using the default credentials on the router label. Note: This will reset all custom settings."
    },
    {
        question: "Why is my internet slow?",
        answer: "Slow speeds can be caused by: WiFi interference (try moving closer to the router), too many connected devices, router placement (avoid corners and enclosed spaces), or peak usage times. Run a speed test at different times and locations. If speeds are consistently below your package, contact us."
    },
    {
        question: "How do I change my WiFi password?",
        answer: "Log in to your router admin panel (usually 192.168.1.1) using the admin credentials on your router label. Navigate to Wireless Settings > Security and enter your new password. Remember to reconnect all your devices with the new password."
    },
];

const billingFAQs = [
    {
        question: "How do I view or download my bills?",
        answer: "Log in to your account and go to the Bills section. You can view, download PDFs, and update your payment method. Bills are generated on the 15th of each month and payment is taken 5 days later."
    },
    {
        question: "Can I upgrade or downgrade my package?",
        answer: "Yes! Contact our team or log in to your account to change your package. Upgrades take effect within 24 hours. Downgrades apply from your next billing date. With our no-commitment approach, there's flexibility to change packages as your needs change."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept Direct Debit, debit cards, and credit cards. Direct Debit is our preferred method as it ensures uninterrupted service and may qualify for additional discounts."
    },
];

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help?</h1>
                    <p className="text-xl text-blue-100 mb-8">
                        Search our help centre or browse categories below
                    </p>
                    <div className="bg-white rounded-full p-2 flex items-center max-w-xl mx-auto shadow-lg">
                        <svg className="w-6 h-6 text-slate-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for help..."
                            className="flex-1 px-4 py-3 outline-none text-slate-900 bg-transparent"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-8 px-4 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
                    <Link href="/support/status" className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Service Status
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Live Chat
                    </Link>
                    <a href="tel:+4402081236644" className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        +44 (0) 208 123 6644
                    </a>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, i) => (
                        <Link
                            key={i}
                            href={cat.href}
                            className="p-6 bg-white rounded-2xl border border-slate-200 text-center hover:border-blue-300 hover:shadow-lg transition-all group"
                        >
                            <div className="text-3xl mb-3">{cat.icon}</div>
                            <h3 className="font-bold mb-1 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                            <p className="text-xs text-slate-500">{cat.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* General FAQs */}
            <section className="py-16 px-4 bg-white" id="general">
                <div className="max-w-4xl mx-auto">
                    <FAQAccordion items={generalFAQs} title="General Questions" />
                </div>
            </section>

            {/* Technical FAQs */}
            <section className="py-16 px-4 bg-slate-50" id="technical">
                <div className="max-w-4xl mx-auto">
                    <FAQAccordion items={technicalFAQs} title="Technical Support" />
                </div>
            </section>

            {/* Billing FAQs */}
            <section className="py-16 px-4 bg-white" id="billing">
                <div className="max-w-4xl mx-auto">
                    <FAQAccordion items={billingFAQs} title="Billing & Payments" />
                </div>
            </section>

            {/* Contact Options */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Still Need Help?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                            💬
                        </div>
                        <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                        <p className="text-slate-600 mb-4 text-sm">Chat with our UK-based support team. Average wait time: 2 minutes.</p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors">
                            Start Chat
                        </button>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                            📞
                        </div>
                        <h3 className="text-xl font-bold mb-2">Call Us</h3>
                        <p className="text-slate-600 mb-4 text-sm">Available 24/7 for technical support. 8am-8pm for sales & billing.</p>
                        <a href="tel:+4402081236644" className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-semibold transition-colors">
                            +44 (0) 208 123 6644
                        </a>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
                            ✉️
                        </div>
                        <h3 className="text-xl font-bold mb-2">Email Us</h3>
                        <p className="text-slate-600 mb-4 text-sm">We&apos;ll respond within 24 hours. Include your account number for faster help.</p>
                        <Link href="/contact" className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-semibold transition-colors">
                            Send Message
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
