interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    rating: number;
    location?: string;
}

export default function TestimonialCard({ quote, author, role, rating, location }: TestimonialCardProps) {
    return (
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className={`w-5 h-5 ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                ))}
            </div>

            {/* Quote */}
            <p className="text-slate-700 leading-relaxed mb-6">
                &ldquo;{quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <div className="font-semibold text-slate-900">{author}</div>
                    <div className="text-sm text-slate-500">{role}</div>
                    {location && (
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {location}
                        </div>
                    )}
                </div>
            </div>

            {/* Trustpilot Badge */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2">
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-4 h-4 bg-green-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    ))}
                </div>
                <span className="text-xs text-slate-500">Verified on Trustpilot</span>
            </div>
        </div>
    );
}
