import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <div className="py-16 px-4 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-slate-600">Last updated: January 2024</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            By accessing or using the services provided by Thamesoptic Ltd (Company Number: 12345678), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">2. Description of Services</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Thamesoptic provides broadband internet, telephone, web hosting, and related telecommunications services to residential and business customers in the United Kingdom. Service specifications, speeds, and availability vary by location and package.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">3. Eligibility</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            To use our services, you must:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Be at least 18 years old</li>
                            <li>Be a UK resident with a valid UK address</li>
                            <li>Have the legal authority to enter into this agreement</li>
                            <li>Provide accurate and complete registration information</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">4. Contract Duration</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Your contract begins when we confirm your order. The minimum term is specified in your order confirmation (typically 12, 18, or 24 months). After the minimum term, your contract continues on a rolling monthly basis unless cancelled with 30 days&apos; notice.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">5. Pricing and Payment</h2>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Prices are as quoted at the time of order unless otherwise agreed</li>
                            <li>We will not increase prices during your minimum contract term (price lock guarantee)</li>
                            <li>Payment is due monthly in advance by Direct Debit or card</li>
                            <li>Late payment may result in a £10 administration fee</li>
                            <li>VAT is included for residential customers; business customers may be shown prices excluding VAT</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">6. Service Level</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We aim to provide reliable service with minimal disruption. However:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Broadband speeds are &quot;up to&quot; and may vary based on your line and network conditions</li>
                            <li>We may need to perform maintenance which could temporarily affect service</li>
                            <li>Business customers may have enhanced SLAs as specified in their contract</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">7. Acceptable Use</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            You must not use our services to:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Engage in unlawful activities</li>
                            <li>Send spam or unsolicited communications</li>
                            <li>Distribute malware or conduct cyber attacks</li>
                            <li>Infringe intellectual property rights</li>
                            <li>Excessively burden our network infrastructure</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            Breach of acceptable use may result in suspension or termination of service.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">8. Equipment</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Equipment supplied by us (routers, ONTs) remains our property and must be returned within 14 days of contract termination. A charge may apply for unreturned or damaged equipment.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">9. Cancellation Rights</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            You have the right to cancel within 14 days of receiving order confirmation without penalty (cooling-off period). To cancel:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Contact us at support@Thamesoptic.co.uk or call 0800 123 4567</li>
                            <li>If service has been activated, you&apos;ll pay for service used during the cooling-off period</li>
                            <li>Early termination within your minimum term may incur charges</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">10. Liability</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We are not liable for indirect or consequential losses. Our total liability is limited to the charges paid by you in the 12 months preceding the claim. Nothing in these terms limits our liability for death, personal injury, or fraud.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">11. Complaints</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you have a complaint, please contact us first at complaints@Thamesoptic.co.uk. We aim to resolve complaints within 8 weeks. If unresolved, you may refer to the Communications Ombudsman. See our Complaints Procedure for details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
                        <p className="text-slate-600 leading-relaxed">
                            These terms are governed by English law. Disputes will be subject to the exclusive jurisdiction of the English courts.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
