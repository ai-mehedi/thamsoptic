"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { Check, Loader2, ArrowLeft } from 'lucide-react';

interface OrderData {
    postcode: string;
    address: string;
    town: string;
    packageId: string;
    packageName: string;
    packageSpeed: string;
    packagePrice: number;
}

interface Package {
    id: string;
    name: string;
    speed: string;
    price: number;
    description: string;
    features: string[];
    isPopular: boolean;
}

function CheckoutContent() {
    const searchParams = useSearchParams();
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postcode: '',
        notes: '',
    });

    useEffect(() => {
        async function initCheckout() {
            // First check sessionStorage (from PostcodeChecker flow)
            const stored = sessionStorage.getItem('orderData');
            if (stored) {
                const data = JSON.parse(stored) as OrderData;
                setOrderData(data);
                setFormData(prev => ({
                    ...prev,
                    address: data.address,
                    postcode: data.postcode,
                }));
                setLoading(false);
                return;
            }

            // If no sessionStorage, check URL parameter
            const packageId = searchParams.get('packageId') || searchParams.get('package');
            if (packageId) {
                try {
                    const response = await fetch('/api/packages');
                    const result = await response.json();
                    const packages: Package[] = result.packages || [];
                    const pkg = packages.find(p => p.id === packageId);

                    if (pkg) {
                        setOrderData({
                            postcode: '',
                            address: '',
                            town: '',
                            packageId: pkg.id,
                            packageName: pkg.name,
                            packageSpeed: pkg.speed,
                            packagePrice: pkg.price,
                        });
                    }
                } catch (err) {
                    console.error('Error fetching package:', err);
                }
            }
            setLoading(false);
        }

        initCheckout();
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    packageId: orderData?.packageId,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setOrderNumber(result.orderNumber);
                setIsComplete(true);
                sessionStorage.removeItem('orderData');
            } else {
                setError(result.error || 'Failed to submit order');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
                <Navbar />
                <div className="py-16 px-4 max-w-2xl mx-auto text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-800 mx-auto mb-4" />
                    <p className="text-slate-600">Loading package details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!orderData && !isComplete) {
        return (
            <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
                <Navbar />
                <div className="py-16 px-4 max-w-2xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">No package selected</h1>
                    <p className="text-slate-600 mb-6">Please check your postcode first to see available packages.</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Go to Homepage
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    if (isComplete) {
        return (
            <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
                <Navbar />
                <div className="py-16 px-4 max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Order Submitted!</h1>
                        <p className="text-slate-600 mb-2">
                            Thank you for your order. Your order number is:
                        </p>
                        <p className="text-2xl font-bold text-blue-800 mb-6">{orderNumber}</p>
                        <p className="text-slate-600 mb-8">
                            We&apos;ve received your order and will contact you shortly at <strong>{formData.email}</strong> to arrange installation.
                        </p>

                        <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                            <h3 className="font-bold mb-4">What happens next?</h3>
                            <ol className="space-y-3 text-sm">
                                <li className="flex gap-3">
                                    <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                    <span>Our team will review your order and check availability.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                    <span>We&apos;ll contact you within 24-48 hours to confirm details and schedule installation.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                    <span>An engineer will visit to complete the installation at your chosen time.</span>
                                </li>
                            </ol>
                        </div>

                        <Link href="/" className="inline-flex items-center gap-2 bg-blue-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-900 transition-colors">
                            Return Home
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
            <Navbar />

            <div className="py-8 px-4 max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to home
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-200 p-8">
                            <h1 className="text-2xl font-bold mb-6">Complete Your Order</h1>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="07123 456789"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Installation Address *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Postcode *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.postcode}
                                        onChange={(e) => setFormData({...formData, postcode: e.target.value.toUpperCase()})}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes (optional)</label>
                                    <textarea
                                        rows={3}
                                        value={formData.notes}
                                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                        placeholder="Any special requirements or preferred contact times..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                                    />
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" required className="w-5 h-5 rounded border-slate-300 text-blue-800 mt-0.5" />
                                        <span className="text-sm text-slate-600">
                                            I agree to the{' '}
                                            <Link href="/legal/terms" className="text-blue-800 hover:underline">Terms of Service</Link> and{' '}
                                            <Link href="/legal/privacy" className="text-blue-800 hover:underline">Privacy Policy</Link>.
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-xl font-bold transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Order'
                                    )}
                                </button>

                                <p className="text-xs text-slate-500 text-center">
                                    No payment required now. We&apos;ll contact you to confirm details and arrange installation.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
                            <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                            <div className="space-y-4 pb-4 border-b border-slate-100">
                                <div>
                                    <div className="font-semibold text-lg">{orderData?.packageName}</div>
                                    <div className="text-sm text-slate-500">{orderData?.packageSpeed}</div>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-600">Monthly price</span>
                                    <span className="font-bold text-xl">£{orderData?.packagePrice.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Setup fee</span>
                                    <span className="text-green-600 font-medium">FREE</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="space-y-2">
                                    {['Unlimited data', 'No price rises', 'Free installation', 'WiFi 6 router included', 'UK support 24/7'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                            <Check className="w-4 h-4 text-green-600" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function Checkout() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
                <Navbar />
                <div className="py-16 px-4 max-w-2xl mx-auto text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-800 mx-auto mb-4" />
                    <p className="text-slate-600">Loading...</p>
                </div>
                <Footer />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
