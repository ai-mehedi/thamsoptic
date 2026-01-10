"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Loader2, Check, AlertTriangle, X, Home, ChevronRight } from 'lucide-react';

interface OpenreachAddress {
    thoroughfareNumber: string;
    thoroughfareName: string;
    subPremisesName: string;
    premisesName: string;
    postTown: string;
    postCode: string;
    country: string;
    districtCode: string;
    refNum: string;
}

interface Package {
    id: string;
    name: string;
    speed: string;
    price: number;
    description: string;
    features: string[];
    isPopular: boolean;
    technology?: string;
}

interface PostcodeCheckerProps {
    variant?: 'default' | 'dark' | 'hero';
    showResults?: boolean;
}

export default function PostcodeChecker({ variant = 'default', showResults = true }: PostcodeCheckerProps) {
    const router = useRouter();
    const [postcode, setPostcode] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [isCheckingLine, setIsCheckingLine] = useState(false);
    const [result, setResult] = useState<'available' | 'unavailable' | null>(null);
    const [packages, setPackages] = useState<Package[]>([]);
    const [addresses, setAddresses] = useState<OpenreachAddress[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<OpenreachAddress | null>(null);
    const [validatedPostcode, setValidatedPostcode] = useState('');
    const [error, setError] = useState('');

    const validatePostcode = (pc: string) => {
        const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;
        return postcodeRegex.test(pc.trim());
    };

    const formatAddressLine = (address: OpenreachAddress, full: boolean = false): string => {
        const parts = [];
        if (address.subPremisesName && address.subPremisesName !== 'null') {
            parts.push(address.subPremisesName);
        }
        if (address.premisesName && address.premisesName !== 'null') {
            parts.push(address.premisesName);
        }
        if (address.thoroughfareNumber && address.thoroughfareNumber !== 'null') {
            parts.push(address.thoroughfareNumber);
        }
        if (address.thoroughfareName && address.thoroughfareName !== 'null') {
            parts.push(address.thoroughfareName);
        }

        if (full) {
            if (address.postTown && address.postTown !== 'null') {
                parts.push(address.postTown);
            }
            if (address.postCode && address.postCode !== 'null') {
                parts.push(address.postCode);
            }
            if (address.country && address.country !== 'null') {
                parts.push(address.country);
            }
            return parts.join(', ') || 'Unknown Address';
        }

        return parts.join(' ') || 'Unknown Address';
    };

    const handleCheck = async () => {
        setError('');
        setResult(null);
        setPackages([]);
        setSelectedAddress(null);
        setAddresses([]);

        if (!postcode.trim()) {
            setError('Please enter your postcode');
            return;
        }

        if (!validatePostcode(postcode)) {
            setError('Please enter a valid UK postcode');
            return;
        }

        setIsChecking(true);

        try {
            // Call Openreach Address Search API
            const response = await fetch(
                `/api/openreach/address-search?postcode=${encodeURIComponent(postcode.trim().replace(/\s/g, ''))}`
            );
            const data = await response.json();

            if (data.success && data.addresses && data.addresses.length > 0) {
                setAddresses(data.addresses);
                setValidatedPostcode(data.postcode);
                setShowModal(true);
            } else if (data.error) {
                // API error (connection failed)
                setError(data.error);
            } else {
                // No addresses found - show error, NOT "coming soon"
                setError('No addresses found for this postcode. Please check and try again.');
            }
        } catch (err) {
            console.error('Postcode check error:', err);
            setError('Unable to connect to address lookup service. Please try again later.');
        } finally {
            setIsChecking(false);
        }
    };

    const handleSelectAddress = async (address: OpenreachAddress) => {
        setSelectedAddress(address);
        setShowModal(false);
        setIsCheckingLine(true);

        try {
            // Call Openreach Line Check API
            const response = await fetch(
                `/api/openreach/line-check?refnum=${encodeURIComponent(address.refNum)}&districtcode=${encodeURIComponent(address.districtCode)}`
            );
            const data = await response.json();

            if (data.success && data.hasService && data.packages.length > 0) {
                setPackages(data.packages);
                setResult('available');
            } else {
                setResult('unavailable');
            }
        } catch (err) {
            console.error('Line check error:', err);
            setResult('unavailable');
        } finally {
            setIsCheckingLine(false);
        }
    };

    const handleSelectPackage = (pkg: Package) => {
        if (!selectedAddress) return;

        const orderData = {
            postcode: selectedAddress.postCode,
            address: formatAddressLine(selectedAddress),
            town: selectedAddress.postTown,
            thoroughfareNumber: selectedAddress.thoroughfareNumber,
            thoroughfareName: selectedAddress.thoroughfareName,
            subPremisesName: selectedAddress.subPremisesName,
            premisesName: selectedAddress.premisesName,
            districtCode: selectedAddress.districtCode,
            refNum: selectedAddress.refNum,
            packageId: pkg.id,
            packageName: pkg.name,
            packageSpeed: pkg.speed,
            packagePrice: pkg.price,
            technology: pkg.technology,
        };

        sessionStorage.setItem('orderData', JSON.stringify(orderData));
        router.push('/checkout');
    };

    const handleRegisterInterest = () => {
        router.push(`/contact?postcode=${encodeURIComponent(postcode)}&interest=true`);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setAddresses([]);
    };

    const baseStyles = {
        default: 'bg-white border border-slate-200 shadow-lg',
        dark: 'bg-white shadow-2xl shadow-blue-900/30',
        hero: 'bg-white shadow-xl shadow-blue-100/50 border border-slate-100',
    };

    const buttonStyles = {
        default: 'bg-blue-800 hover:bg-blue-900',
        dark: 'bg-blue-800 hover:bg-blue-700',
        hero: 'bg-blue-800 hover:bg-blue-900',
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className={`${baseStyles[variant]} rounded-full p-2 flex items-center transition-all`}>
                <div className="flex-1 flex items-center gap-3 px-4">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                        placeholder="Enter your postcode (e.g. SW1A 1AA)"
                        className="flex-1 py-3 outline-none text-slate-700 bg-transparent placeholder:text-slate-400 text-sm font-medium"
                        onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    />
                </div>
                <button
                    onClick={handleCheck}
                    disabled={isChecking}
                    className={`${buttonStyles[variant]} text-white px-6 py-3 rounded-full font-semibold text-sm transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2 shadow-md`}
                >
                    {isChecking ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Checking...
                        </>
                    ) : (
                        'Check Availability'
                    )}
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-3 text-center font-medium">{error}</p>
            )}

            {/* Address Selection Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-blue-800 text-white p-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">Select Your Address</h2>
                                <p className="text-blue-100 text-sm mt-0.5">
                                    {validatedPostcode} - {addresses.length} addresses found
                                </p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="overflow-y-auto max-h-[60vh]">
                            <div className="p-2">
                                {addresses.map((address, index) => (
                                    <button
                                        key={`${address.refNum}-${index}`}
                                        onClick={() => handleSelectAddress(address)}
                                        className="w-full text-left p-4 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-4 group"
                                    >
                                        <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center text-slate-500 group-hover:text-blue-800 transition-colors">
                                            <Home className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-slate-900">
                                                {formatAddressLine(address, true)}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-slate-100 p-4 bg-slate-50">
                            <p className="text-xs text-slate-500 text-center">
                                Can&apos;t find your address? <button className="text-blue-800 hover:underline font-medium">Contact us</button>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Checking Line Status */}
            {isCheckingLine && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6 animate-in fade-in duration-300">
                    <div className="flex items-center gap-4">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        <div>
                            <h3 className="font-bold text-blue-800">Checking available services...</h3>
                            <p className="text-blue-700 text-sm">Please wait while we check what&apos;s available at your address</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Package Selection */}
            {showResults && result === 'available' && selectedAddress && packages.length > 0 && !isCheckingLine && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-green-800">Great news! Broadband is available</h3>
                                <p className="text-green-700 text-sm">
                                    {formatAddressLine(selectedAddress)}, {selectedAddress.postTown}, {selectedAddress.postCode}
                                </p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-4">Choose your package:</h3>
                    <div className="space-y-3">
                        {packages.map((pkg) => (
                            <button
                                key={pkg.id}
                                onClick={() => handleSelectPackage(pkg)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                                    pkg.isPopular
                                        ? 'border-blue-800 bg-blue-50'
                                        : 'border-slate-200 bg-white hover:border-blue-300'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-900">{pkg.name}</span>
                                            {pkg.isPopular && (
                                                <span className="text-xs bg-blue-800 text-white px-2 py-0.5 rounded-full font-medium">Popular</span>
                                            )}
                                            {pkg.technology && (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                                    {pkg.technology}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600">{pkg.speed} - {pkg.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-slate-900">£{pkg.price.toFixed(2)}</div>
                                        <div className="text-xs text-slate-500">/month</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Not Available - Register Interest */}
            {showResults && result === 'unavailable' && !isCheckingLine && (
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-amber-800 text-lg">Coming soon to your area</h3>
                            <p className="text-amber-700 text-sm mt-1">
                                We&apos;re expanding our network. Register your interest and we&apos;ll notify you when service becomes available.
                            </p>
                            <button
                                onClick={handleRegisterInterest}
                                className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                            >
                                Register Interest
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
