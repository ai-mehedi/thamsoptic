import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Zap, Award, Clock, MapPin, Phone, Mail, Network, Cable, PhoneCall, Wrench, Building2, Home, User, Wifi, Eye, Server, HeadphonesIcon, Gauge, Infinity, BadgeCheck } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero */}
            <section className="relative py-24 px-4 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                    alt="Modern office"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-slate-900/90" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-white">12+ Years of Experience</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">About ABStation</h1>
                    <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                        A private broadband internet service provider with 12 years of experience. Buffer-free browsing for UK homes and businesses.
                    </p>
                </div>
            </section>

            {/* Experience the Hyper Speed */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Hyper Speed</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Fibre-optic connectivity designed for every need - from individuals to large enterprises</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Building2,
                                title: "Business",
                                desc: "Fiber-optic connectivity can lend a great advantage to companies of all sizes, particularly organizations who use the cloud for apps or data storage.",
                                color: "blue"
                            },
                            {
                                icon: Home,
                                title: "Residential",
                                desc: "Fiber Internet connectivity offers significant reliability advantages over copper Internet connectivity, due to the fact that fiber is much stronger than copper.",
                                color: "green"
                            },
                            {
                                icon: User,
                                title: "Individual",
                                desc: "Full Fibre is our most reliable and fastest ever broadband. Built to power busy online homes it delivers incredible speeds up to 10 Gbps.",
                                color: "purple"
                            },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            const bgColors: Record<string, string> = {
                                blue: "bg-blue-100 text-blue-800",
                                green: "bg-green-100 text-green-800",
                                purple: "bg-purple-100 text-purple-800"
                            };
                            return (
                                <div key={i} className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-slate-100">
                                    <div className={`w-16 h-16 ${bgColors[item.color]} rounded-2xl flex items-center justify-center mb-6`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-2xl mb-4">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Wifi,
                                title: "Stable Connections",
                                desc: "ABStation is a private broadband internet service provider with 12 years of experience delivering rock-solid connectivity."
                            },
                            {
                                icon: Gauge,
                                title: "Buffer Free Browsing",
                                desc: "Full Fibre is our most reliable and fastest ever broadband. Built to power busy online homes it delivers incredible speeds up to 10 Gbps."
                            },
                            {
                                icon: HeadphonesIcon,
                                title: "24/7 Customer Support",
                                desc: "Our UK-based support team is available around the clock. Calls to UK landlines beginning with 01, 02, 03, 0845 and 0870 numbers."
                            },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="text-center p-8">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <Icon className="w-8 h-8 text-blue-300" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                                    <p className="text-blue-100 leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block bg-blue-100 text-blue-800 text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                            Our Story
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Building the future of connectivity</h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                ABStation is a trading name of Thames Network Company Limited, established in 2012 with a simple mission: to provide reliable, high-speed internet connectivity to homes and businesses across the United Kingdom.
                            </p>
                            <p>
                                What sets us apart is that <strong>we own and operate our own fibre optic backbone network</strong>. We&apos;re not reselling BT or Openreach infrastructure – we&apos;ve built our own network from the ground up, giving us complete control over quality and reliability.
                            </p>
                            <p>
                                Based in London, we offer speeds up to <strong>10 Gbps</strong> with fiber VoIP included as standard. Our network is completely separate from BT lines, and we offer flexible contracts with no long-term commitment required.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                            alt="Team working"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-blue-800 text-white p-6 rounded-xl shadow-xl">
                            <div className="text-4xl font-bold">10+</div>
                            <div className="text-blue-200">Years of Service</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reasons to Choose */}
            <section className="py-20 px-4 bg-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Reasons to Choose ABStation</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Why thousands of UK homes and businesses trust us for their connectivity</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BadgeCheck,
                                title: "Available & Affordable",
                                desc: "Our ultrafast fiber, ultra-reliable and unlimited network can bring you broadband speed of up to 10Gbps. We have a wide range of affordable business FTTP broadband packages."
                            },
                            {
                                icon: Shield,
                                title: "Unbeatable Price Guarantee",
                                desc: "Our FTTP products give you the flexibility to match the delivery of gigabit-speed broadband services and dedicated VOIP channels to ensure QoS for those services key to your business."
                            },
                            {
                                icon: Infinity,
                                title: "No Data Limits",
                                desc: "Speeds of up to 10Gbps with unlimited data. There are no catches, no caps and no hidden penalties, so your business can make use of ultrafast download speeds."
                            },
                            {
                                icon: Eye,
                                title: "Full Network Visibility",
                                desc: "Our Network Operations Centre allows us to identify, diagnose, and respond to any potential network issues promptly - often before our customers are affected."
                            },
                            {
                                icon: Server,
                                title: "Resilient Connectivity",
                                desc: "NOC operations are protected by resilient pure fiber connections direct to our core network, reinforced by emergency power supplies."
                            },
                            {
                                icon: HeadphonesIcon,
                                title: "Fully Staffed 24/7/365",
                                desc: "Our expert technical support team maintain a full presence around the clock, every day of the year. We're always here when you need us."
                            },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                        <Icon className="w-7 h-7 text-blue-800" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Shield, title: "Transparency", desc: "No hidden fees, no mid-contract price rises. What you see is what you pay." },
                        { icon: Users, title: "Customer First", desc: "UK-based support team available when you need us. Real people, real help." },
                        { icon: Zap, title: "Innovation", desc: "Investing in the latest technology to deliver ultrafast, reliable connectivity." },
                        { icon: Award, title: "Quality", desc: "Premium service at fair prices. We never compromise on quality." },
                    ].map((value, i) => {
                        const Icon = value.icon;
                        return (
                            <div key={i} className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    <Icon className="w-7 h-7 text-blue-800" />
                                </div>
                                <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                                <p className="text-slate-600 text-sm">{value.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* What Makes Us Different */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">We&apos;re not just another broadband provider – we own and operate our own infrastructure</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Network, title: "Own Backbone Network", desc: "We built and operate our own fibre optic backbone - complete independence from BT/Openreach." },
                        { icon: PhoneCall, title: "Fiber VoIP Included", desc: "Crystal-clear VoIP phone service included free. Keep your existing number when you switch." },
                        { icon: Cable, title: "No BT Line Required", desc: "Our network is completely separate from BT infrastructure. True network independence." },
                        { icon: Wrench, title: "Custom Network Build", desc: "Need a bespoke solution? We can build custom network infrastructure for businesses." },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                    <Icon className="w-7 h-7 text-blue-800" />
                                </div>
                                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                                <p className="text-slate-600 text-sm">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-4 bg-blue-800 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { num: "50,000+", label: "Happy Customers" },
                            { num: "500+", label: "Areas Covered" },
                            { num: "10 Gig", label: "Max Speed" },
                            { num: "99.9%", label: "Network Uptime" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.num}</div>
                                <div className="text-blue-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Info */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-8">Company Information</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
                            <div>
                                <div className="text-sm text-slate-500 mb-1">Trading Name</div>
                                <div className="font-semibold text-lg">ABStation</div>
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 mb-1">Registered Company</div>
                                <div className="font-semibold text-lg">Thames Network Company Limited</div>
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 mb-1">Company Registration Number</div>
                                <div className="font-semibold text-lg">08207668</div>
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 mb-1">VAT Number</div>
                                <div className="font-semibold text-lg">GB 162960889</div>
                            </div>
                            <div>
                                <div className="text-sm text-slate-500 mb-1">Registered in</div>
                                <div className="font-semibold text-lg">England and Wales</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-blue-800" />
                                </div>
                                <div>
                                    <div className="font-semibold mb-1">Address</div>
                                    <div className="text-slate-600">
                                        50 New Lydenburg Street<br />
                                        London, SE7 8NE<br />
                                        United Kingdom
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-blue-800" />
                                </div>
                                <div>
                                    <div className="font-semibold mb-1">Phone</div>
                                    <a href="tel:+4402081236644" className="text-blue-800 hover:underline">+44 (0) 208 123 6644</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-blue-800" />
                                </div>
                                <div>
                                    <div className="font-semibold mb-1">Email</div>
                                    <a href="mailto:sales@abstation.net" className="text-blue-800 hover:underline">sales@abstation.net</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <div className="font-semibold mb-1">Support Hours</div>
                                    <div className="text-slate-600">24/7 Technical Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 bg-slate-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get connected?</h2>
                    <p className="text-slate-400 text-lg mb-8">Check if our ultrafast fibre broadband is available at your address.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/broadband/coverage" className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-colors">
                            Check Availability
                        </Link>
                        <Link href="/contact" className="border border-slate-600 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
