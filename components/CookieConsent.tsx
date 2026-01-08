"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings, Check } from 'lucide-react';

interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        setPreferences({
            necessary: true,
            analytics: true,
            marketing: true,
        });
        localStorage.setItem('cookieConsent', JSON.stringify({
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
        }));
        setIsVisible(false);
    };

    const handleAcceptNecessary = () => {
        localStorage.setItem('cookieConsent', JSON.stringify({
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
        }));
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem('cookieConsent', JSON.stringify({
            ...preferences,
            timestamp: new Date().toISOString(),
        }));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                {!showPreferences ? (
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Cookie className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 text-lg mb-2">We value your privacy</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic.
                                    By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies. Read our{' '}
                                    <Link href="/legal/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link> and{' '}
                                    <Link href="/legal/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                                </p>
                            </div>
                            <button
                                onClick={handleAcceptNecessary}
                                className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-6">
                            <button
                                onClick={handleAcceptAll}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                Accept All
                            </button>
                            <button
                                onClick={handleAcceptNecessary}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
                            >
                                Necessary Only
                            </button>
                            <button
                                onClick={() => setShowPreferences(true)}
                                className="text-slate-600 hover:text-slate-900 px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <Settings className="w-4 h-4" />
                                Manage Preferences
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-900 text-lg">Cookie Preferences</h3>
                            <button
                                onClick={() => setShowPreferences(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <div className="font-semibold text-slate-900">Necessary Cookies</div>
                                    <p className="text-sm text-slate-500">Required for the website to function. Cannot be disabled.</p>
                                </div>
                                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-not-allowed">
                                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <div className="font-semibold text-slate-900">Analytics Cookies</div>
                                    <p className="text-sm text-slate-500">Help us understand how visitors use our website.</p>
                                </div>
                                <button
                                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${preferences.analytics ? 'bg-blue-600' : 'bg-slate-300'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all ${preferences.analytics ? 'right-0.5' : 'left-0.5'}`}></div>
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <div className="font-semibold text-slate-900">Marketing Cookies</div>
                                    <p className="text-sm text-slate-500">Used to deliver relevant advertisements.</p>
                                </div>
                                <button
                                    onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${preferences.marketing ? 'bg-blue-600' : 'bg-slate-300'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all ${preferences.marketing ? 'right-0.5' : 'left-0.5'}`}></div>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            <button
                                onClick={handleSavePreferences}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                Save Preferences
                            </button>
                            <button
                                onClick={() => setShowPreferences(false)}
                                className="text-slate-600 hover:text-slate-900 px-4 py-2.5 text-sm font-medium transition-colors"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
