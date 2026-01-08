import { Star, Shield, Headphones, Award } from 'lucide-react';

interface TrustBadgesProps {
    layout?: 'horizontal' | 'vertical';
    showAll?: boolean;
}

export default function TrustBadges({ layout = 'horizontal', showAll = true }: TrustBadgesProps) {
    const badges = [
        {
            icon: Star,
            iconColor: 'text-green-500',
            bgColor: 'bg-green-50',
            title: 'Trustpilot',
            subtitle: 'Rated 4.8/5',
        },
        {
            icon: Shield,
            iconColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
            title: 'Ofcom Registered',
            subtitle: 'Regulated Provider',
        },
        {
            icon: Headphones,
            iconColor: 'text-purple-600',
            bgColor: 'bg-purple-50',
            title: 'UK Support',
            subtitle: '24/7 Available',
        },
        {
            icon: Award,
            iconColor: 'text-amber-600',
            bgColor: 'bg-amber-50',
            title: 'Which? Recommended',
            subtitle: 'Provider 2024',
        },
    ];

    const displayBadges = showAll ? badges : badges.slice(0, 3);

    if (layout === 'vertical') {
        return (
            <div className="space-y-4">
                {displayBadges.map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${badge.bgColor} rounded-lg flex items-center justify-center`}>
                                <Icon className={`w-5 h-5 ${badge.iconColor}`} />
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900 text-sm">{badge.title}</div>
                                <div className="text-xs text-slate-500">{badge.subtitle}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {displayBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                    <div key={i} className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
                        <div className={`w-10 h-10 ${badge.bgColor} rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${badge.iconColor}`} />
                        </div>
                        <div>
                            <div className="font-semibold text-slate-900 text-sm">{badge.title}</div>
                            <div className="text-xs text-slate-500">{badge.subtitle}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
