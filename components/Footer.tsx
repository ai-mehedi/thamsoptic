import Link from "next/link";
import Image from "next/image";
import CookieConsent from "./CookieConsent";
import {
    Phone,
    Mail,
    MapPin,
    MessageCircle,
    Shield,
    Star,
    Wifi,
    CreditCard
} from "lucide-react";

export default function Footer() {
    return (
        <>
            <footer className="bg-slate-950 text-white pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Company Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="flex items-center">
                                <Image
                                    src="/logo.png"
                                    alt="ABStation"
                                    width={180}
                                    height={40}
                                    className="h-10 w-auto brightness-0 invert"
                                />
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Premium UK fibre broadband provider. Committed to honest pricing, exceptional service, and reliable connectivity for homes across the United Kingdom.
                            </p>
                            <div className="space-y-3 text-sm text-slate-400">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>50 New Lydenburg Street<br />London, SE7 8NE<br />United Kingdom</span>
                                </div>
                            </div>
                        </div>

                        {/* Broadband */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">Broadband</h4>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li><Link href="/broadband/full-fibre" className="hover:text-blue-400 transition-colors">Full Fibre Broadband</Link></li>
                                <li><Link href="/broadband/superfast" className="hover:text-blue-400 transition-colors">Superfast Fibre</Link></li>
                                <li><Link href="/broadband/bundles" className="hover:text-blue-400 transition-colors">Broadband & Phone</Link></li>
                                <li><Link href="/broadband/compare" className="hover:text-blue-400 transition-colors">Compare Packages</Link></li>
                                <li><Link href="/broadband/coverage" className="hover:text-blue-400 transition-colors">Check Coverage</Link></li>
                                <li><Link href="/broadband/offers" className="hover:text-blue-400 transition-colors">Special Offers</Link></li>
                            </ul>
                        </div>

                        {/* Support & Company */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li><Link href="/support" className="hover:text-blue-400 transition-colors">Help Centre</Link></li>
                                <li><Link href="/support/status" className="hover:text-blue-400 transition-colors">Service Status</Link></li>
                                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                                <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link href="/support/faqs" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
                                <li><Link href="/support/installation" className="hover:text-blue-400 transition-colors">Installation Guide</Link></li>
                            </ul>
                        </div>

                        {/* Connect With Us */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">Connect With Us</h4>
                            <ul className="space-y-4 text-sm">
                                <li>
                                    <a href="https://wa.me/4402081236644" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-green-400 transition-colors">
                                        <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                            </svg>
                                        </div>
                                        <span>Join on WhatsApp</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://t.me/abstation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors">
                                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                            </svg>
                                        </div>
                                        <span>Join on Telegram</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="skype:abstation?chat" className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors">
                                        <div className="w-10 h-10 bg-sky-600/20 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324m11.084-4.882l-.029.135-.044-.24c.015.045.044.074.059.12.12-.675.181-1.363.181-2.052 0-1.529-.301-3.012-.898-4.42-.569-1.348-1.395-2.562-2.427-3.596-1.049-1.033-2.247-1.856-3.595-2.426-1.318-.631-2.801-.93-4.328-.93-.72 0-1.444.07-2.143.204l.119.06-.239-.033.119-.025C8.91.274 7.829 0 6.731 0c-1.789 0-3.47.698-4.736 1.967C.729 3.235.032 4.923.032 6.716c0 1.143.292 2.265.844 3.258l.02-.124.041.239-.06-.115c-.114.645-.172 1.299-.172 1.955 0 1.53.3 3.017.884 4.416.568 1.362 1.378 2.576 2.427 3.609 1.034 1.05 2.247 1.857 3.595 2.442 1.394.601 2.877.898 4.404.898.659 0 1.334-.06 1.977-.179l-.119-.062.24.046-.135.03c1.002.569 2.126.871 3.294.871 1.783 0 3.459-.69 4.733-1.963 1.259-1.259 1.962-2.951 1.962-4.749 0-1.138-.299-2.262-.853-3.266"/>
                                            </svg>
                                        </div>
                                        <span>Join on Skype</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Bar */}
                    <div className="border-t border-b border-slate-800 py-8 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-800/20 rounded-xl flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400">Sales & Support</div>
                                    <a href="tel:+4402081236644" className="font-bold text-white hover:text-blue-400 transition-colors">+44 (0) 208 123 6644</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-800/20 rounded-xl flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400">Email Us</div>
                                    <a href="mailto:sales@abstation.net" className="font-bold text-white hover:text-blue-400 transition-colors">sales@abstation.net</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400">Live Chat</div>
                                    <div className="font-bold text-white">Available 24/7</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div className="mb-8">
                        <h5 className="text-sm font-semibold text-slate-400 mb-4">Legal & Policies</h5>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                            <Link href="/legal/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                            <Link href="/legal/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                            <Link href="/legal/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
                            <Link href="/legal/complaints" className="hover:text-blue-400 transition-colors">Complaints Procedure</Link>
                            <Link href="/legal/acceptable-use" className="hover:text-blue-400 transition-colors">Acceptable Use Policy</Link>
                            <button className="hover:text-blue-400 transition-colors">Cookie Settings</button>
                        </div>
                    </div>

                    {/* Regulatory Info */}
                    <div className="bg-slate-900/50 rounded-xl p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                            <div>
                                <div className="text-slate-400 mb-1">Trading As</div>
                                <div className="text-slate-300">ABStation</div>
                            </div>
                            <div>
                                <div className="text-slate-400 mb-1">Registered Company</div>
                                <div className="text-slate-300">Thames Network Company Limited<br />(Company No. 08207668)</div>
                            </div>
                            <div>
                                <div className="text-slate-400 mb-1">Registered Address</div>
                                <div className="text-slate-300">50 New Lydenburg Street<br />London, SE7 8NE</div>
                            </div>
                            <div>
                                <div className="text-slate-400 mb-1">VAT Registration</div>
                                <div className="text-slate-300">GB 162960889</div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mb-8 py-6 border-t border-b border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Shield className="w-6 h-6" />
                            <span className="text-sm font-medium">Ofcom Registered</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Star className="w-6 h-6 text-green-500" />
                            <span className="text-sm font-medium">Trusted Provider</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Wifi className="w-6 h-6" />
                            <span className="text-sm font-medium">Full Fibre Network</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <CreditCard className="w-6 h-6" />
                            <span className="text-sm font-medium">Secure Payments</span>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
                        <p>© {new Date().getFullYear()} ABStation. All rights reserved. ABStation is a trading name of Thames Network Company Limited, registered in England and Wales (Company No. 08207668).</p>
                        <p className="text-slate-600">
                            VAT No: GB 162960889
                        </p>
                    </div>
                </div>
            </footer>

            {/* Cookie Consent Banner */}
            <CookieConsent />
        </>
    );
}
