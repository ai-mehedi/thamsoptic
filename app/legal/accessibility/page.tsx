import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AccessibilityPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <div className="py-16 px-4 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
                    <p className="text-slate-600">Our commitment to making our services accessible to everyone</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Thamesoptic Ltd is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Conformance Status</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Our website includes the following features:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Clear, consistent navigation throughout the site</li>
                            <li>Descriptive link text and headings</li>
                            <li>Alt text for meaningful images</li>
                            <li>Sufficient colour contrast</li>
                            <li>Resizable text without loss of functionality</li>
                            <li>Keyboard navigation support</li>
                            <li>Form labels and error messages</li>
                            <li>Skip to main content link</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Assistive Technologies</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Our website is designed to be compatible with:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                            <li>Screen magnification software</li>
                            <li>Speech recognition software</li>
                            <li>Keyboard-only navigation</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Known Limitations</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We are aware of the following limitations:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Some older PDF documents may not be fully accessible. We are working to replace these with accessible versions.</li>
                            <li>Live chat may have limited accessibility features. Please use phone or email as alternatives.</li>
                            <li>Some third-party content may not meet accessibility standards.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Alternative Formats</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We can provide information in alternative formats on request:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Large print documents</li>
                            <li>Braille</li>
                            <li>Audio format</li>
                            <li>Easy-read versions</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            Please contact us at accessibility@Thamesoptic.co.uk to request alternative formats.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Accessible Customer Service</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We offer the following accessible services:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li><strong>Relay UK:</strong> For customers who are deaf, hard of hearing, or have a speech impairment</li>
                            <li><strong>Priority Fault Repair:</strong> Available for customers who rely on their connection for medical equipment</li>
                            <li><strong>Bills in alternative formats:</strong> Available on request</li>
                            <li><strong>Third-party bill management:</strong> We can speak to a nominated person on your behalf</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Feedback</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We welcome feedback on the accessibility of our website and services. Please let us know if you encounter any barriers:
                        </p>
                        <div className="bg-slate-50 rounded-xl p-6">
                            <p className="text-slate-700">
                                <strong>Email:</strong> accessibility@Thamesoptic.co.uk<br />
                                <strong>Phone:</strong> 0800 123 4567 (ask for the accessibility team)<br />
                                <strong>Post:</strong> Accessibility Team, Thamesoptic Ltd, 123 Tech Street, London, EC1A 1AA
                            </p>
                        </div>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            We aim to respond to feedback within 5 working days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Enforcement</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you are not satisfied with our response, you can contact the Equality Advisory Support Service (EASS) at equalityadvisoryservice.com or call 0808 800 0082.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
