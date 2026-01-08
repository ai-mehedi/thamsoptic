import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <div className="py-16 px-4 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-slate-600">Last updated: January 2024</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Thamesoptic Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            We are registered with the Information Commissioner&apos;s Office (ICO) under registration number ZA123456. Our registered address is 123 Tech Street, London, EC1A 1AA.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">We collect information you provide directly to us:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                            <li>Name, address, email address, and telephone number</li>
                            <li>Payment information (processed securely by our payment provider)</li>
                            <li>Account login credentials</li>
                            <li>Communications you send to us</li>
                            <li>Service usage information</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed">
                            We may also collect information automatically when you use our services, including IP addresses, device information, and browsing data through cookies.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">We use your information to:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send technical notices and support messages</li>
                            <li>Respond to your comments and questions</li>
                            <li>Send marketing communications (with your consent)</li>
                            <li>Comply with legal obligations</li>
                            <li>Protect against fraud and abuse</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">4. Legal Basis for Processing (GDPR)</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">We process your data under the following legal bases:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li><strong>Contract:</strong> Processing necessary for the performance of our contract with you</li>
                            <li><strong>Legal Obligation:</strong> Processing necessary to comply with UK law</li>
                            <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate business interests</li>
                            <li><strong>Consent:</strong> Where you have given us explicit consent (e.g., marketing)</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">5. Data Sharing</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">We may share your information with:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Network operators (Openreach, CityFibre) to provision your service</li>
                            <li>Payment processors (Stripe) to handle transactions</li>
                            <li>Customer service providers</li>
                            <li>Legal authorities when required by law</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            We do not sell your personal information to third parties.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">Under UK GDPR, you have the right to:</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                            <li><strong>Erasure:</strong> Request deletion of your data (right to be forgotten)</li>
                            <li><strong>Restrict Processing:</strong> Request limitation of how we use your data</li>
                            <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                            <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
                            <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            To exercise these rights, contact us at privacy@Thamesoptic.co.uk.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We retain your personal data for as long as your account is active, plus 7 years after account closure to comply with legal and regulatory requirements. Some data may be retained longer if required by law.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">8. Security</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We implement appropriate technical and organisational measures to protect your data, including encryption, access controls, and regular security assessments. However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">9. International Transfers</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Your data is primarily processed within the UK and EEA. Where we transfer data outside these areas, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            For privacy enquiries or to exercise your rights, contact our Data Protection Officer:
                        </p>
                        <div className="bg-slate-50 p-6 rounded-xl">
                            <p className="text-slate-700">
                                <strong>Email:</strong> privacy@Thamesoptic.co.uk<br />
                                <strong>Post:</strong> Data Protection Officer, Thamesoptic Ltd, 123 Tech Street, London, EC1A 1AA<br />
                                <strong>Phone:</strong> 0800 123 4567
                            </p>
                        </div>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            If you are not satisfied with our response, you have the right to complain to the Information Commissioner&apos;s Office (ICO) at ico.org.uk.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
