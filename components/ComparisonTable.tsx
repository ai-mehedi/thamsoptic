const providers = [
    { name: 'Thamesoptic', recommended: true, priceHike: false, ukSupport: true, noContract: true, rating: '4.8' },
    { name: 'BT', recommended: false, priceHike: true, ukSupport: false, noContract: false, rating: '3.2' },
    { name: 'Virgin Media', recommended: false, priceHike: true, ukSupport: false, noContract: false, rating: '3.0' },
    { name: 'Sky', recommended: false, priceHike: true, ukSupport: false, noContract: false, rating: '3.4' },
    { name: 'TalkTalk', recommended: false, priceHike: true, ukSupport: false, noContract: false, rating: '2.8' },
];

const features = [
    { key: 'recommended', label: 'Which? Recommended', icon: '✓' },
    { key: 'priceHike', label: 'No Mid-Contract Price Rises', icon: '✓', invert: true },
    { key: 'ukSupport', label: '100% UK-Based Support', icon: '🇬🇧' },
    { key: 'noContract', label: 'Flexible Contracts', icon: '✓' },
];

export default function ComparisonTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
                <thead>
                    <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-4 font-semibold text-slate-600 text-sm">Provider</th>
                        {features.map((feature) => (
                            <th key={feature.key} className="text-center py-4 px-4 font-semibold text-slate-600 text-sm">
                                {feature.label}
                            </th>
                        ))}
                        <th className="text-center py-4 px-4 font-semibold text-slate-600 text-sm">Trustpilot</th>
                    </tr>
                </thead>
                <tbody>
                    {providers.map((provider, i) => (
                        <tr
                            key={provider.name}
                            className={`border-b border-slate-100 ${i === 0 ? 'bg-blue-50' : ''}`}
                        >
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                    {i === 0 && (
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">N</span>
                                        </div>
                                    )}
                                    <span className={`font-semibold ${i === 0 ? 'text-blue-600' : 'text-slate-700'}`}>
                                        {provider.name}
                                    </span>
                                    {i === 0 && (
                                        <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">
                                            You are here
                                        </span>
                                    )}
                                </div>
                            </td>
                            {features.map((feature) => {
                                const value = provider[feature.key as keyof typeof provider];
                                const hasFeature = feature.invert ? !value : value;
                                return (
                                    <td key={feature.key} className="text-center py-4 px-4">
                                        {hasFeature ? (
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full text-sm font-bold">
                                                ✓
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-400 rounded-full text-sm">
                                                ✗
                                            </span>
                                        )}
                                    </td>
                                );
                            })}
                            <td className="text-center py-4 px-4">
                                <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="font-bold text-slate-700 text-sm">{provider.rating}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
