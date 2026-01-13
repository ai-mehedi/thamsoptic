"use client";
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';

export default function PaymentSuccess() {
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get order number from session storage
        const pendingOrder = sessionStorage.getItem('pendingOrderNumber');
        if (pendingOrder) {
            setOrderNumber(pendingOrder);
            // Clear the session storage
            sessionStorage.removeItem('pendingOrderNumber');
            sessionStorage.removeItem('orderData');
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
                <Navbar />
                <div className="py-16 px-4 max-w-2xl mx-auto text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-800 mx-auto mb-4" />
                    <p className="text-slate-600">Processing your payment...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
            <Navbar />
            <div className="py-16 px-4 max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Payment Setup Complete!</h1>

                    {orderNumber && (
                        <>
                            <p className="text-slate-600 mb-2">
                                Your order has been confirmed. Your order number is:
                            </p>
                            <p className="text-2xl font-bold text-blue-800 mb-6">{orderNumber}</p>
                        </>
                    )}

                    <p className="text-slate-600 mb-8">
                        Your Direct Debit has been set up successfully. We&apos;ll be in touch shortly to arrange your installation.
                    </p>

                    <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                        <h3 className="font-bold mb-4">What happens next?</h3>
                        <ol className="space-y-3 text-sm">
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                <span>Our team will review your order and confirm availability at your address.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                <span>We&apos;ll contact you within 24-48 hours to schedule your installation date.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                <span>An engineer will visit to complete the installation at your chosen time.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                                <span>Your first payment will be collected via Direct Debit after installation.</span>
                            </li>
                        </ol>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                        <p className="text-sm text-blue-800">
                            <strong>Direct Debit Guarantee:</strong> Your payments are protected by the Direct Debit Guarantee.
                            You can cancel at any time by contacting your bank.
                        </p>
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
