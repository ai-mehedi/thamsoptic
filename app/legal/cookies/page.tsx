import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <div className="py-16 px-4 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
                    <p className="text-slate-600">Last updated: January 2024</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We use cookies for the following purposes:
                        </p>

                        <h3 className="text-lg font-bold mt-6 mb-3">Essential Cookies</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to your actions such as logging in or filling in forms.
                        </p>
                        <div className="bg-slate-50 rounded-lg p-4 text-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="pb-2">Cookie Name</th>
                                        <th className="pb-2">Purpose</th>
                                        <th className="pb-2">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600">
                                    <tr className="border-b">
                                        <td className="py-2">session_id</td>
                                        <td>Maintains your login session</td>
                                        <td>Session</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2">csrf_token</td>
                                        <td>Security - prevents CSRF attacks</td>
                                        <td>Session</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">cookie_consent</td>
                                        <td>Stores your cookie preferences</td>
                                        <td>1 year</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-lg font-bold mt-6 mb-3">Analytics Cookies</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                        </p>
                        <div className="bg-slate-50 rounded-lg p-4 text-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="pb-2">Cookie Name</th>
                                        <th className="pb-2">Purpose</th>
                                        <th className="pb-2">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600">
                                    <tr className="border-b">
                                        <td className="py-2">_ga</td>
                                        <td>Google Analytics - distinguishes users</td>
                                        <td>2 years</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">_gid</td>
                                        <td>Google Analytics - distinguishes users</td>
                                        <td>24 hours</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-lg font-bold mt-6 mb-3">Marketing Cookies</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            These cookies are used to track visitors across websites to display relevant advertisements.
                        </p>
                        <div className="bg-slate-50 rounded-lg p-4 text-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="pb-2">Cookie Name</th>
                                        <th className="pb-2">Purpose</th>
                                        <th className="pb-2">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600">
                                    <tr className="border-b">
                                        <td className="py-2">_fbp</td>
                                        <td>Facebook - tracks visits for advertising</td>
                                        <td>3 months</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">_gcl_au</td>
                                        <td>Google Ads - conversion tracking</td>
                                        <td>3 months</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            You can manage your cookie preferences at any time by:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Clicking the &quot;Cookie Settings&quot; link in our website footer</li>
                            <li>Adjusting your browser settings to block or delete cookies</li>
                            <li>Using browser add-ons that block tracking</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            Note: Blocking essential cookies may prevent parts of our website from working correctly.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Browser Settings</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Most browsers allow you to control cookies through their settings. Links to popular browser help pages:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                            <li>Chrome: chrome://settings/cookies</li>
                            <li>Firefox: about:preferences#privacy</li>
                            <li>Safari: Preferences &gt; Privacy</li>
                            <li>Edge: edge://settings/privacy</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you have questions about our use of cookies, please contact us at privacy@Thamesoptic.co.uk.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
