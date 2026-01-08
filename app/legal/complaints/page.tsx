import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ComplaintsPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <div className="py-16 px-4 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Complaints Procedure</h1>
                    <p className="text-slate-600">How we handle your complaints - Ofcom approved code of practice</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We aim to provide excellent service, but we understand things can sometimes go wrong. When they do, we want to resolve your concerns quickly and fairly. This code of practice explains how to make a complaint and what you can expect from us.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">How to Make a Complaint</h2>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                            <h3 className="text-lg font-bold mb-3 text-blue-900">Step 1: Contact Us</h3>
                            <p className="text-blue-800 mb-4">The quickest way to resolve most issues:</p>
                            <ul className="list-disc pl-6 text-blue-800 space-y-2">
                                <li><strong>Phone:</strong> 0800 123 4567 (24/7 for technical issues, 8am-8pm for billing)</li>
                                <li><strong>Email:</strong> complaints@Thamesoptic.co.uk</li>
                                <li><strong>Post:</strong> Customer Relations Team, Thamesoptic Ltd, 123 Tech Street, London, EC1A 1AA</li>
                                <li><strong>Online:</strong> <Link href="/contact" className="underline">Contact form</Link></li>
                            </ul>
                        </div>

                        <p className="text-slate-600 leading-relaxed mb-4">
                            When contacting us, please provide:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Your account number</li>
                            <li>Your contact details</li>
                            <li>A description of the issue</li>
                            <li>What resolution you&apos;re seeking</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">What Happens Next</h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <div>
                                    <h3 className="font-bold">Acknowledgement</h3>
                                    <p className="text-slate-600">We&apos;ll acknowledge your complaint within 2 working days and assign it to a case handler.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <div>
                                    <h3 className="font-bold">Investigation</h3>
                                    <p className="text-slate-600">We&apos;ll investigate your complaint thoroughly, keeping you updated on progress.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <div>
                                    <h3 className="font-bold">Resolution</h3>
                                    <p className="text-slate-600">We aim to resolve complaints within 10 working days. Complex issues may take longer.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                                <div>
                                    <h3 className="font-bold">Response</h3>
                                    <p className="text-slate-600">We&apos;ll provide a written response explaining our findings and any action taken.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">If You&apos;re Not Satisfied</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            If you&apos;re not happy with our initial response, you can:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Ask for your complaint to be escalated to a manager</li>
                            <li>Request a &quot;Deadlock Letter&quot; if we cannot resolve the issue</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Alternative Dispute Resolution (ADR)</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            If we cannot resolve your complaint within 8 weeks, or if we issue a deadlock letter, you may refer your complaint to the Communications Ombudsman free of charge.
                        </p>

                        <div className="bg-slate-50 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Communications Ombudsman</h3>
                            <p className="text-slate-600">
                                <strong>Website:</strong> commsombudsman.org<br />
                                <strong>Phone:</strong> 0330 440 1614<br />
                                <strong>Email:</strong> enquiry@commsombudsman.org<br />
                                <strong>Post:</strong> Communications Ombudsman, P.O. Box 730, Warrington, WA4 6WU
                            </p>
                        </div>

                        <p className="text-slate-600 leading-relaxed mt-4">
                            The Ombudsman is an independent service approved by Ofcom. Their decision is binding on us but not on you.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Vulnerable Customers</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We provide additional support for vulnerable customers. If you or someone on your account has specific needs (including disabilities, serious illness, or mental health conditions), please let us know so we can provide appropriate assistance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Useful Information</h2>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Ofcom (the communications regulator): <strong>ofcom.org.uk</strong></li>
                            <li>Citizens Advice: <strong>citizensadvice.org.uk</strong> or 0808 223 1133</li>
                            <li>This code of practice is available in large print, Braille, or audio format on request</li>
                        </ul>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
