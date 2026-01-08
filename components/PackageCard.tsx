import Link from 'next/link';

export interface Package {
    id: string;
    name: string;
    speed: string;
    uploadSpeed: string;
    price: number;
    originalPrice?: number;
    description: string;
    features: string[];
    contractLength: number;
    isPopular?: boolean;
    badge?: string;
    routerIncluded: boolean;
}

interface PackageCardProps {
    pkg: Package;
    showDetails?: boolean;
}

export default function PackageCard({ pkg, showDetails = true }: PackageCardProps) {
    return (
        <div className={`relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
            pkg.isPopular
                ? 'border-blue-600 shadow-xl shadow-blue-100 scale-[1.02]'
                : 'border-slate-200 hover:border-blue-300 hover:shadow-lg'
        }`}>
            {/* Popular Badge */}
            {pkg.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-xs font-bold uppercase tracking-wider">
                    Most Popular
                </div>
            )}

            {/* Custom Badge */}
            {pkg.badge && !pkg.isPopular && (
                <div className="absolute top-4 right-4">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {pkg.badge}
                    </span>
                </div>
            )}

            <div className={`p-8 ${pkg.isPopular ? 'pt-12' : ''}`}>
                {/* Package Name */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">{pkg.description}</p>
                </div>

                {/* Speed */}
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-extrabold text-slate-900">{pkg.speed}</span>
                    <div className="text-slate-500 text-sm">
                        <div>download</div>
                    </div>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                    {pkg.uploadSpeed} upload
                </p>

                {/* Price */}
                <div className="border-t border-slate-100 pt-6 mb-6">
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-slate-900">£{pkg.price.toFixed(2)}</span>
                        <span className="text-slate-500">/month</span>
                    </div>
                    {pkg.originalPrice && (
                        <p className="text-sm text-slate-500 mt-1">
                            <span className="line-through">£{pkg.originalPrice.toFixed(2)}</span>
                            <span className="text-green-600 font-semibold ml-2">
                                Save £{((pkg.originalPrice - pkg.price) * pkg.contractLength).toFixed(0)} over contract
                            </span>
                        </p>
                    )}
                    <p className="text-xs text-slate-400 mt-2">
                        {pkg.contractLength}-month contract • £0 setup
                    </p>
                </div>

                {/* Features */}
                {showDetails && (
                    <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-slate-600">{feature}</span>
                            </li>
                        ))}
                        {pkg.routerIncluded && (
                            <li className="flex items-start gap-3 text-sm">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                    </svg>
                                </div>
                                <span className="text-slate-600">Wi-Fi router included</span>
                            </li>
                        )}
                    </ul>
                )}

                {/* CTA */}
                <Link
                    href={`/checkout?package=${pkg.id}`}
                    className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${
                        pkg.isPopular
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                >
                    Choose Plan
                </Link>
            </div>
        </div>
    );
}
