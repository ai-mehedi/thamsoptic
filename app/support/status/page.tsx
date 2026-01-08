import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const services = [
    { name: 'Broadband Network', status: 'operational', uptime: '99.99%' },
    { name: 'Full Fibre Network', status: 'operational', uptime: '99.99%' },
    { name: 'Digital Voice', status: 'operational', uptime: '99.98%' },
    { name: 'Customer Portal', status: 'operational', uptime: '99.95%' },
    { name: 'Email Services', status: 'operational', uptime: '99.97%' },
    { name: 'DNS Servers', status: 'operational', uptime: '100%' },
];

const recentIncidents = [
    {
        date: '2 Jan 2024',
        title: 'Scheduled Maintenance - Core Network',
        status: 'completed',
        desc: 'Planned maintenance window for network upgrades. All services remained available.',
        duration: '2 hours',
    },
    {
        date: '28 Dec 2023',
        title: 'Intermittent connectivity - London Region',
        status: 'resolved',
        desc: 'Some customers in the London area experienced brief connection drops. Issue was identified and resolved.',
        duration: '45 minutes',
    },
];

export default function ServiceStatusPage() {
    const allOperational = services.every(s => s.status === 'operational');

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Status Banner */}
            <section className={`py-12 px-4 ${allOperational ? 'bg-green-600' : 'bg-amber-500'} text-white`}>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        {allOperational ? (
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        ) : (
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {allOperational ? 'All Systems Operational' : 'Some Services Degraded'}
                        </h1>
                    </div>
                    <p className="text-lg opacity-90">
                        Last updated: {new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
                    </p>
                </div>
            </section>

            {/* Services Status */}
            <section className="py-12 px-4 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Service Status</h2>
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    {services.map((service, i) => (
                        <div key={i} className={`flex items-center justify-between p-5 ${i < services.length - 1 ? 'border-b border-slate-100' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${
                                    service.status === 'operational' ? 'bg-green-500' :
                                    service.status === 'degraded' ? 'bg-amber-500' :
                                    'bg-red-500'
                                }`}></div>
                                <span className="font-medium">{service.name}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-sm text-slate-500">Uptime: {service.uptime}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    service.status === 'operational' ? 'bg-green-100 text-green-700' :
                                    service.status === 'degraded' ? 'bg-amber-100 text-amber-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Uptime Chart Placeholder */}
            <section className="py-8 px-4 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">90-Day Uptime</h2>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="flex gap-1 h-12">
                        {Array.from({ length: 90 }).map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 rounded-sm ${
                                    Math.random() > 0.02 ? 'bg-green-500' : 'bg-amber-400'
                                }`}
                                title={`Day ${90 - i}`}
                            ></div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-sm text-slate-500">
                        <span>90 days ago</span>
                        <span>Today</span>
                    </div>
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                            <span className="text-sm text-slate-600">No issues</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-amber-400 rounded-sm"></div>
                            <span className="text-sm text-slate-600">Partial outage</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                            <span className="text-sm text-slate-600">Major outage</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Incidents */}
            <section className="py-12 px-4 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
                <div className="space-y-4">
                    {recentIncidents.map((incident, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="text-sm text-slate-500 mb-1">{incident.date}</div>
                                    <h3 className="font-bold text-lg">{incident.title}</h3>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    incident.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                    incident.status === 'resolved' ? 'bg-green-100 text-green-700' :
                                    'bg-amber-100 text-amber-700'
                                }`}>
                                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                                </span>
                            </div>
                            <p className="text-slate-600 text-sm">{incident.desc}</p>
                            <div className="mt-3 text-xs text-slate-500">Duration: {incident.duration}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Subscribe */}
            <section className="py-12 px-4 max-w-4xl mx-auto">
                <div className="bg-slate-900 text-white rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Get Status Updates</h2>
                    <p className="text-slate-300 mb-6">
                        Subscribe to receive notifications about service outages and maintenance windows.
                    </p>
                    <div className="flex gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-white/50 text-white placeholder:text-slate-400"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-8 px-4 max-w-4xl mx-auto text-center">
                <p className="text-slate-600">
                    Experiencing issues not shown here?{' '}
                    <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
                        Contact our support team
                    </Link>
                </p>
            </section>

            <Footer />
        </div>
    );
}
